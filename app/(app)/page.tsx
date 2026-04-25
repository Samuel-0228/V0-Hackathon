import { FxTicker } from '@/components/dashen/fx-ticker'
import { BalanceCard } from '@/components/dashen/balance-card'
import { SpendingChart } from '@/components/dashen/spending-chart'
import { TransactionsList } from '@/components/dashen/transactions-list'
import { AiInsightStrip } from '@/components/dashen/ai-insight-strip'
import { Bell, Search } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Top FX bar */}
      <FxTicker />

      {/* Page header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-card">
        <div>
          <h1 className="text-lg font-bold text-foreground text-balance">Good morning, Amir</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {new Date().toLocaleDateString('en-ET', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted hover:bg-muted/70 transition-colors" aria-label="Search">
            <Search className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-muted hover:bg-muted/70 transition-colors" aria-label="Notifications">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-secondary">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* AI Insight */}
          <AiInsightStrip />

          {/* Main grid */}
          <div className="grid grid-cols-5 gap-6">
            {/* Left column */}
            <div className="col-span-3 space-y-6">
              <BalanceCard />
              <SpendingChart />
            </div>

            {/* Right column */}
            <div className="col-span-2 space-y-6">
              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-card border border-border p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Income (Apr)</p>
                  <p className="text-lg font-bold text-foreground">ETB 82,000</p>
                  <p className="text-[10px] text-emerald-600 font-medium mt-1">+5.2% vs Mar</p>
                </div>
                <div className="rounded-2xl bg-card border border-border p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Spent (Apr)</p>
                  <p className="text-lg font-bold text-foreground">ETB 33,900</p>
                  <p className="text-[10px] text-orange-500 font-medium mt-1">+8.1% vs Mar</p>
                </div>
                <div className="rounded-2xl bg-card border border-border p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Saved (Apr)</p>
                  <p className="text-lg font-bold text-foreground">ETB 48,100</p>
                  <p className="text-[10px] text-emerald-600 font-medium mt-1">+2.3% vs Mar</p>
                </div>
                <div className="rounded-2xl bg-card border border-border p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">FX Saved</p>
                  <p className="text-lg font-bold text-foreground">ETB 1,840</p>
                  <p className="text-[10px] text-primary font-medium mt-1">Flow AI tip</p>
                </div>
              </div>

              {/* Transactions */}
              <TransactionsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
