'use client'

import { useState } from 'react'
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, RefreshCw, Send } from 'lucide-react'
import { accountBalance } from '@/lib/mock-data'

function formatETB(n: number) {
  return new Intl.NumberFormat('en-ET', { minimumFractionDigits: 2 }).format(n)
}

const quickActions = [
  { label: 'Send', icon: Send },
  { label: 'Receive', icon: ArrowDownLeft },
  { label: 'Transfer', icon: RefreshCw },
  { label: 'Top Up', icon: ArrowUpRight },
]

export function BalanceCard() {
  const [visible, setVisible] = useState(true)

  return (
    <div
      className="relative overflow-hidden rounded-2xl text-white"
      style={{
        background: 'linear-gradient(135deg, oklch(0.22 0.07 255) 0%, oklch(0.30 0.10 255) 60%, oklch(0.25 0.09 265) 100%)',
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-10"
        style={{ background: 'oklch(0.72 0.14 75)' }}
      />
      <div
        className="absolute -bottom-12 -left-6 h-36 w-36 rounded-full opacity-10"
        style={{ background: 'oklch(0.72 0.14 75)' }}
      />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs font-medium text-white/60 uppercase tracking-widest">Main Account</p>
            <p className="text-[10px] text-white/40 mt-0.5">Dashen Commercial Bank • ETB</p>
          </div>
          <button
            onClick={() => setVisible((v) => !v)}
            className="flex items-center gap-1.5 text-[10px] text-white/60 hover:text-white transition-colors"
            aria-label={visible ? 'Hide balance' : 'Show balance'}
          >
            {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {visible ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Balance */}
        <div className="mb-5">
          <p className="text-[10px] text-white/50 mb-1">Available Balance</p>
          <p className="text-4xl font-bold tracking-tight leading-none">
            {visible ? `ETB ${formatETB(accountBalance.etb)}` : 'ETB ••••••'}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-[10px] text-white/50">USD Account</p>
              <p className="text-sm font-semibold text-white/90">
                {visible ? `$${formatETB(accountBalance.usd)}` : '$••••'}
              </p>
            </div>
            <div className="w-px h-7 bg-white/20" />
            <div>
              <p className="text-[10px] text-white/50">Savings</p>
              <p className="text-sm font-semibold text-white/90">
                {visible ? `ETB ${formatETB(accountBalance.savings)}` : 'ETB ••••'}
              </p>
            </div>
            <div className="ml-auto">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-1.5 rounded-xl py-3 bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon className="h-4 w-4 text-white" />
              <span className="text-[10px] text-white/80 font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
