'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { spendingData } from '@/lib/mock-data'

// Concrete colors — no CSS vars passed to Recharts
const COLORS = {
  groceries: '#b8860b',
  utilities: '#1e3a8a',
  transport: '#0e7490',
  dining: '#9d4edd',
}

function formatETB(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`
  return String(v)
}

export function SpendingChart() {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-card-foreground">Monthly Spending</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Nov 2024 – Apr 2025</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">This month</p>
          <p className="text-sm font-bold text-foreground">ETB 33,900</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={spendingData} barSize={10} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatETB}
            tick={{ fontSize: 10, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
            formatter={(value: number) => [`ETB ${value.toLocaleString()}`, undefined]}
          />
          <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
          <Bar dataKey="groceries" name="Groceries" fill={COLORS.groceries} radius={[3, 3, 0, 0]} />
          <Bar dataKey="utilities" name="Utilities" fill={COLORS.utilities} radius={[3, 3, 0, 0]} />
          <Bar dataKey="transport" name="Transport" fill={COLORS.transport} radius={[3, 3, 0, 0]} />
          <Bar dataKey="dining" name="Dining" fill={COLORS.dining} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
