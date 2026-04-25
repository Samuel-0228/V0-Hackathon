'use client'

import { useState } from 'react'
import { Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { aiInsights } from '@/lib/mock-data'
import Link from 'next/link'

export function AiInsightStrip() {
  const [index, setIndex] = useState(0)
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())

  const visible = aiInsights.filter((_, i) => !dismissed.has(i))
  if (visible.length === 0) return null

  const currentInsight = aiInsights[index]
  const next = () => setIndex((i) => (i + 1) % aiInsights.length)
  const prev = () => setIndex((i) => (i - 1 + aiInsights.length) % aiInsights.length)

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-gold-light border border-gold/30 px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold shrink-0">
        <Sparkles className="h-4 w-4 text-gold-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-gold-foreground uppercase tracking-widest mb-0.5">Flow AI Insight</p>
        <p className="text-xs text-foreground/80 leading-relaxed">{currentInsight}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={prev} className="p-1 rounded-lg hover:bg-gold/20 transition-colors" aria-label="Previous insight">
          <ChevronLeft className="h-3.5 w-3.5 text-gold-foreground" />
        </button>
        <span className="text-[10px] text-gold-foreground/60 min-w-[24px] text-center">
          {index + 1}/{aiInsights.length}
        </span>
        <button onClick={next} className="p-1 rounded-lg hover:bg-gold/20 transition-colors" aria-label="Next insight">
          <ChevronRight className="h-3.5 w-3.5 text-gold-foreground" />
        </button>
      </div>
      <Link
        href="/flow-ai"
        className="shrink-0 text-[10px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors px-3 py-1.5 rounded-lg"
      >
        Ask Flow
      </Link>
      <button
        onClick={() => setDismissed((d) => new Set([...d, index]))}
        className="p-1 rounded-lg hover:bg-gold/20 transition-colors shrink-0"
        aria-label="Dismiss insight"
      >
        <X className="h-3 w-3 text-gold-foreground/60" />
      </button>
    </div>
  )
}
