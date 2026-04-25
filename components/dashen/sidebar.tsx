'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MessageSquare,
  Tv2,
  Plane,
  ShoppingBag,
  CreditCard,
  Settings,
  Bell,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/flow-ai', label: 'Flow AI', icon: MessageSquare, badge: 'AI' },
  { href: '/dstv', label: 'DSTV', icon: Tv2 },
  { href: '/flights', label: 'Flights', icon: Plane },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
]

const bottomItems = [
  { href: '#cards', label: 'Cards', icon: CreditCard },
  { href: '#notifications', label: 'Notifications', icon: Bell },
  { href: '#settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-sidebar-border">
        <Image
          src="/dashen-logo.png"
          alt="Dashen Bank"
          width={44}
          height={44}
          className="rounded-lg shrink-0"
        />
        <div>
          <p className="text-sm font-bold text-sidebar-foreground leading-tight">Dashen Bank</p>
          <p className="text-[10px] text-sidebar-primary font-medium tracking-wide uppercase">Flow AI</p>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 rounded-lg p-2 bg-sidebar-accent/60">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 shrink-0">
            <span className="text-xs font-bold text-gold">AH</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">Amir Haile</p>
            <p className="text-[10px] text-sidebar-foreground/60 truncate">Premium Member</p>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/40 shrink-0 ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Main Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-gold text-gold-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
            Account
          </p>
          {bottomItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom tagline */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-foreground/40 leading-relaxed">
          Dashen Flow AI v1.0
          <br />
          Market-Aware Financial Agent
        </p>
      </div>
    </aside>
  )
}
