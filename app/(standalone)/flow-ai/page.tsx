'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Send, Sparkles, Tv2, Plane, TrendingUp, Wallet, ShoppingBag,
  PiggyBank, Bot, ArrowLeft, CreditCard, Zap, Gift, Building2,
  Mic, MicOff, Volume2, VolumeX, Navigation,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'user' | 'assistant'
interface Message {
  id: string
  role: Role
  text: string
  streaming?: boolean
  action?: NavAction
}

interface NavAction {
  type: 'navigate' | 'pay' | 'book'
  label: string
  href: string
}

const quickPrompts = [
  { label: 'My balance',        icon: Wallet,     text: 'What is my current account balance?' },
  { label: 'FX rates',          icon: TrendingUp, text: 'What are the latest FX rates today?' },
  { label: 'DSTV status',       icon: Tv2,        text: 'Check my DSTV subscription status' },
  { label: 'Book flight',       icon: Plane,      text: 'Show me available flights from Addis Ababa' },
  { label: 'Virtual card',      icon: CreditCard, text: 'How do I use my virtual Mastercard?' },
  { label: 'Get a loan',        icon: Zap,        text: 'How do I apply for a microloan through Sahay?' },
  { label: 'Dashen Edil',       icon: Gift,       text: 'How does the Dashen Edil loyalty program work?' },
  { label: 'Zoorya ERP',        icon: Building2,  text: 'Tell me about the Zoorya ERP tool for my business' },
  { label: 'Savings goal',      icon: PiggyBank,  text: 'How am I doing on my Dubai savings goal?' },
  { label: 'My spending',       icon: ShoppingBag,text: 'Summarize and analyze my transaction history' },
  { label: 'Pay DSTV',          icon: Tv2,        text: 'Pay my monthly DSTV subscription' },
  { label: 'Airline ticket',    icon: Plane,      text: 'Buy me an airline ticket' },
]

// Navigation intent patterns — matched before the knowledge base
const NAV_INTENTS: {
  patterns: string[]
  label: string
  href: string
  type: NavAction['type']
  confirmation: string
}[] = [
  {
    patterns: ['pay my dstv', 'pay dstv', 'renew dstv', 'pay my subscription', 'pay subscription', 'dstv payment'],
    label: 'Open DSTV Payment',
    href: '/dstv',
    type: 'pay',
    confirmation: 'I\'ll take you to the DSTV mini-app to renew your **Compact Plus** subscription (ETB 2,100). Tap the button below to proceed.',
  },
  {
    patterns: ['buy ticket', 'buy airline', 'buy me a ticket', 'buy me an airline', 'book a flight', 'book flight', 'airline ticket', 'book me a flight', 'i want to fly', 'find me a flight'],
    label: 'Open Flight Booking',
    href: '/flights',
    type: 'book',
    confirmation: 'Opening the MyTravel flight booking engine for you. I can see ADD-DXB is available at **ETB 28,500** — 12% below your last booking. Tap below to search and book.',
  },
  {
    patterns: ['open shop', 'go to shop', 'take me to shop', 'open shopping', 'go shopping'],
    label: 'Open Shop',
    href: '/shop',
    type: 'navigate',
    confirmation: 'Opening the Dashen E-Commerce mini-app for you.',
  },
  {
    patterns: ['go to dashboard', 'open dashboard', 'home', 'go home', 'back to dashboard'],
    label: 'Go to Dashboard',
    href: '/',
    type: 'navigate',
    confirmation: 'Taking you back to your dashboard.',
  },
]

function detectNavIntent(text: string): typeof NAV_INTENTS[number] | null {
  const lower = text.toLowerCase().trim()
  for (const intent of NAV_INTENTS) {
    for (const pattern of intent.patterns) {
      if (lower.includes(pattern)) return intent
    }
  }
  return null
}

function MarkdownText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span className="leading-relaxed">
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} />
        )
      )}
    </span>
  )
}

// Pick the best available English voice (prefer natural-sounding ones)
function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) return null
  // Preferred voices in order
  const preferred = [
    'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Zira',
    'Samantha', 'Karen', 'Daniel', 'Google UK English Female',
  ]
  for (const name of preferred) {
    const v = voices.find((vc) => vc.name.includes(name))
    if (v) return v
  }
  return voices.find((v) => v.lang.startsWith('en')) || voices[0]
}

// Speak a string using the Web Speech API
function speak(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const clean = text.replace(/\*\*/g, '').replace(/\n/g, ' ').replace(/[#*_~`]/g, '')
  const utt = new SpeechSynthesisUtterance(clean)
  const voice = pickVoice()
  if (voice) utt.voice = voice
  utt.lang = 'en-US'
  utt.rate = 1.05
  utt.pitch = 1.05
  utt.volume = 1
  if (onEnd) utt.onend = onEnd
  window.speechSynthesis.speak(utt)
}

export default function FlowAiPage() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Detect Web Speech API support and load voices
  useEffect(() => {
    if (typeof window === 'undefined') return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasRecognition = !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
    const hasSynthesis = !!window.speechSynthesis
    setVoiceReady(hasRecognition && hasSynthesis)

    if (hasSynthesis) {
      // Voices load asynchronously — trigger load
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }

    // Cleanup speech on unmount
    return () => {
      window.speechSynthesis?.cancel()
      recognitionRef.current?.stop?.()
    }
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`
    }
  }, [input])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    const assistantId = crypto.randomUUID()

    // Check for navigation intent first
    const navIntent = detectNavIntent(trimmed)

    if (navIntent) {
      const assistantMsg: Message = {
        id: assistantId,
        role: 'assistant',
        text: navIntent.confirmation,
        streaming: false,
        action: { type: navIntent.type, label: navIntent.label, href: navIntent.href },
      }
      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setInput('')
      if (voiceEnabled) speak(navIntent.confirmation)
      // Auto-navigate after short delay for "go home"
      if (navIntent.type === 'navigate' && navIntent.href === '/') {
        setTimeout(() => router.push('/'), 1200)
      }
      return
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: 'assistant', text: '', streaming: true },
    ])
    setIsLoading(true)
    setInput('')

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/flow-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userText: trimmed }),
        signal: abortRef.current.signal,
      })

      if (!res.ok || !res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, text: accumulated, streaming: true } : m
          )
        )
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, text: accumulated, streaming: false } : m
        )
      )

      // Speak the response if voice is enabled
      if (voiceEnabled && accumulated) {
        setIsSpeaking(true)
        speak(accumulated, () => setIsSpeaking(false))
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      const errorMsg = 'Sorry, I could not process that request. Please try again.'
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, text: errorMsg, streaming: false } : m
        )
      )
      if (voiceEnabled) speak(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, voiceEnabled, router])

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function toggleVoiceInput() {
    if (typeof window === 'undefined') return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Try Chrome or Edge.')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognition.onresult = (event: { results: { transcript: string }[][] }) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setTimeout(() => sendMessage(transcript), 300)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  function toggleSpeech() {
    if (isSpeaking) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
    }
    setVoiceEnabled((v) => !v)
  }

  return (
    <div className="flex flex-col h-screen bg-secondary">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-3.5 border-b border-border bg-card shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Image src="/dashen-logo.png" alt="Dashen Bank" width={38} height={38} className="rounded-lg shrink-0" />
        <div>
          <h1 className="text-sm font-bold text-foreground leading-tight">Flow AI</h1>
          <p className="text-[10px] text-muted-foreground">Market-Aware Financial Agent</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Voice output toggle */}
          {voiceReady && (
            <button
              onClick={toggleSpeech}
              title={voiceEnabled ? 'Mute voice responses' : 'Unmute voice responses'}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                voiceEnabled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {voiceEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span>{voiceEnabled ? 'Voice On' : 'Muted'}</span>
            </button>
          )}

          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* Welcome state */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center py-6 gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <Sparkles className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Hello, Amir! I&apos;m Flow.</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-md text-balance">
                  Your AI-powered Dashen Super App agent. Speak or type commands like &quot;pay my DSTV&quot; or &quot;buy me an airline ticket&quot; and I&apos;ll take you there.
                </p>
              </div>

              {/* Voice CTA banner */}
              {voiceReady && (
                <button
                  onClick={toggleVoiceInput}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-5 py-3 transition-all border-2',
                    isListening
                      ? 'bg-red-50 border-red-400 text-red-700'
                      : 'bg-primary/5 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50'
                  )}
                >
                  <span className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl',
                    isListening ? 'bg-red-500 animate-pulse' : 'bg-primary'
                  )}>
                    {isListening
                      ? <MicOff className="h-5 w-5 text-white" />
                      : <Mic className="h-5 w-5 text-primary-foreground" />
                    }
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold">
                      {isListening ? 'Listening...' : 'Tap to Speak'}
                    </span>
                    <span className="text-[10px] opacity-80">
                      {isListening ? 'Speak your command now' : 'Try voice commands hands-free'}
                    </span>
                  </div>
                </button>
              )}

              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Or pick a quick prompt</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-4 gap-2.5 w-full">
                {quickPrompts.map((qp) => {
                  const Icon = qp.icon
                  return (
                    <button
                      key={qp.label}
                      onClick={() => sendMessage(qp.text)}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3.5 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-[11px] font-semibold text-foreground leading-tight">{qp.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user'
            return (
              <div key={msg.id} className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
                {/* Avatar */}
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-xl shrink-0 mt-0.5',
                  isUser ? 'bg-primary' : 'bg-gold'
                )}>
                  {isUser
                    ? <span className="text-[10px] font-bold text-white">AH</span>
                    : <Bot className="h-4 w-4 text-gold-foreground" />
                  }
                </div>

                <div className="flex flex-col gap-2 max-w-xl">
                  {/* Bubble */}
                  <div className={cn(
                    'rounded-2xl px-4 py-3 text-sm',
                    isUser
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-card border border-border text-foreground rounded-tl-sm'
                  )}>
                    {msg.text
                      ? <MarkdownText text={msg.text} />
                      : <span className="text-muted-foreground italic text-xs">Thinking...</span>
                    }
                    {msg.streaming && (
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-primary/60 animate-pulse rounded-sm align-middle" />
                    )}
                  </div>

                  {/* Navigation action button */}
                  {msg.action && (
                    <Link
                      href={msg.action.href}
                      className="self-start flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      {msg.action.label}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}

          {/* Thinking indicator */}
          {isLoading && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.text === '' && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold shrink-0">
                <Bot className="h-4 w-4 text-gold-foreground" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-3">
                {[0, 0.15, 0.3].map((delay, i) => (
                  <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${delay}s` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-border bg-card px-6 py-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className={cn(
            'flex items-end gap-2 rounded-2xl border bg-background px-4 py-2.5 transition-all',
            isListening ? 'border-red-400 ring-2 ring-red-200' : 'border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20'
          )}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isListening ? 'Listening...' : 'Ask Flow anything or give a command...'}
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed scrollbar-thin"
              style={{ maxHeight: '128px' }}
            />

            {/* Voice input button */}
            <button
              onClick={toggleVoiceInput}
              title={isListening ? 'Stop listening' : 'Speak a command'}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-xl transition-colors shrink-0',
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              )}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            >
              {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
            </button>

            {/* Send button */}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-xl transition-colors shrink-0',
                input.trim() && !isLoading
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-[10px] text-muted-foreground">
              Try: &quot;pay my DSTV&quot; · &quot;buy me an airline ticket&quot; · &quot;analyze my transactions&quot;
            </p>
            {isSpeaking && (
              <span className="flex items-center gap-1 text-[10px] text-primary font-medium">
                <Volume2 className="h-3 w-3" /> Speaking...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
