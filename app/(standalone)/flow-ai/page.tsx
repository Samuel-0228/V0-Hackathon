'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Send, Sparkles, Tv2, Plane, TrendingUp, Wallet, ShoppingBag, PiggyBank, Bot, ArrowLeft, CreditCard, Zap, Gift, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Role = 'user' | 'assistant'
interface Message {
  id: string
  role: Role
  text: string
  streaming?: boolean
}

const quickPrompts = [
  { label: 'My balance',   icon: Wallet,    text: 'What is my current account balance?' },
  { label: 'FX rates',     icon: TrendingUp, text: 'What are the latest FX rates today?' },
  { label: 'DSTV status',  icon: Tv2,       text: 'Check my DSTV subscription status' },
  { label: 'Book flight',  icon: Plane,     text: 'Show me available flights from Addis Ababa' },
  { label: 'Virtual card', icon: CreditCard, text: 'How do I use my virtual Mastercard for international payments?' },
  { label: 'Get a loan',   icon: Zap,       text: 'How do I apply for a microloan through Sahay?' },
  { label: 'Dashen Edil',  icon: Gift,      text: 'How does the Dashen Edil loyalty program work?' },
  { label: 'Zoorya ERP',   icon: Building2, text: 'Tell me about the Zoorya ERP tool for my business' },
  { label: 'Savings goal', icon: PiggyBank, text: 'How am I doing on my Dubai savings goal?' },
  { label: 'My spending',  icon: ShoppingBag, text: 'Summarize my spending for April' },
  { label: 'Open account', icon: Wallet,    text: 'How can I open a new account using Fayda Digital ID?' },
  { label: 'Pay utility',  icon: Zap,       text: 'How do I pay my electricity bill in the app?' },
]

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

export default function FlowAiPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    const assistantId = crypto.randomUUID()

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

      // Mark streaming done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, text: accumulated, streaming: false } : m
        )
      )
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, text: 'Sorry, I could not process that request. Please try again.', streaming: false }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-secondary">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-4 border-b border-border bg-card shrink-0">
        <Link
          href="/"
          className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Image src="/dashen-logo.png" alt="Dashen Bank" width={40} height={40} className="rounded-lg shrink-0" />
        <div>
          <h1 className="text-base font-bold text-foreground">Flow AI</h1>
          <p className="text-xs text-muted-foreground">Your market-aware financial agent</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* Welcome state */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center py-10 gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <Sparkles className="h-8 w-8 text-gold" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Hello, Amir! I&apos;m Flow.</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-md text-balance">
                  Your AI-powered Dashen Super App agent. Ask me about any of the 200+ mini-apps — balances, FX rates, flights, loans, DSTV, Dashen Edil, Zoorya ERP, and more.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3 w-full mt-2">
                {quickPrompts.map((qp) => {
                  const Icon = qp.icon
                  return (
                    <button
                      key={qp.label}
                      onClick={() => sendMessage(qp.text)}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:bg-muted/60 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-xs font-semibold text-foreground">{qp.label}</span>
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

                {/* Bubble */}
                <div className={cn(
                  'max-w-xl rounded-2xl px-4 py-3 text-sm',
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
              </div>
            )
          })}

          {/* Thinking dots (before first token) */}
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

      {/* Input */}
      <div className="border-t border-border bg-card px-8 py-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 rounded-2xl border border-border bg-background px-4 py-3 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Flow anything about your finances..."
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed max-h-32 scrollbar-thin"
            />
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
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Flow AI answers from real Dashen Super App data. No external API required.
          </p>
        </div>
      </div>
    </div>
  )
}
