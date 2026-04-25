'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { fxRates } from '@/lib/mock-data'

export function FxTicker() {
  const [timeStr, setTimeStr] = useState<string | null>(null)

  useEffect(() => {
    function update() {
      setTimeStr(
        new Date().toLocaleTimeString('en-ET', { hour: '2-digit', minute: '2-digit' })
      )
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="flex items-center gap-0">
        <div className="flex items-center gap-2 px-4 py-2 bg-gold text-gold-foreground shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-widest">Live FX</span>
        </div>
        <div className="flex items-center gap-6 px-6 py-2 overflow-x-auto scrollbar-thin">
          {fxRates.map((rate) => (
            <div key={rate.pair} className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-semibold text-primary-foreground/80">{rate.pair}</span>
              <span className="text-xs font-bold text-primary-foreground">{rate.rate.toFixed(2)}</span>
              <span
                className={`flex items-center gap-0.5 text-[10px] font-medium ${
                  rate.direction === 'up' ? 'text-emerald-300' : 'text-red-300'
                }`}
              >
                {rate.direction === 'up' ? (
                  <TrendingUp className="h-2.5 w-2.5" />
                ) : (
                  <TrendingDown className="h-2.5 w-2.5" />
                )}
                {rate.direction === 'up' ? '+' : ''}
                {rate.change.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="ml-auto px-4 py-2 shrink-0">
          {timeStr && (
            <span className="text-[10px] text-primary-foreground/50">
              Updated: {timeStr}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
