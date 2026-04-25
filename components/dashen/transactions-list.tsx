import {
  ShoppingBag,
  Plane,
  Tv2,
  ArrowRightLeft,
  ShoppingCart,
  Car,
  Wallet,
} from 'lucide-react'
import { transactions } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shopping: ShoppingBag,
  plane: Plane,
  tv: Tv2,
  transfer: ArrowRightLeft,
  groceries: ShoppingCart,
  transport: Car,
  income: Wallet,
}

const categoryColors: Record<string, string> = {
  Shopping: 'bg-purple-100 text-purple-700',
  Travel: 'bg-blue-100 text-blue-700',
  Entertainment: 'bg-orange-100 text-orange-700',
  'Transfer In': 'bg-emerald-100 text-emerald-700',
  Groceries: 'bg-amber-100 text-amber-700',
  Transport: 'bg-cyan-100 text-cyan-700',
  Income: 'bg-green-100 text-green-700',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ET', { month: 'short', day: 'numeric' })
}

export function TransactionsList() {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-card-foreground">Recent Transactions</h3>
        <button className="text-xs text-primary font-medium hover:underline">View all</button>
      </div>

      <div className="space-y-1">
        {transactions.map((tx) => {
          const Icon = iconMap[tx.icon] ?? Wallet
          const isIncome = tx.amount > 0
          return (
            <div
              key={tx.id}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted/60 transition-colors"
            >
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl shrink-0',
                  categoryColors[tx.category] ?? 'bg-muted text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{tx.merchant}</p>
                <p className="text-[10px] text-muted-foreground">{tx.category}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={cn('text-xs font-bold', isIncome ? 'text-emerald-600' : 'text-foreground')}>
                  {isIncome ? '+' : ''}ETB {Math.abs(tx.amount).toLocaleString()}
                </p>
                <p className="text-[10px] text-muted-foreground">{formatDate(tx.date)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
