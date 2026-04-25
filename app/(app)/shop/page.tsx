'use client'

import { useState } from 'react'
import {
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Check,
  Sparkles,
  Search,
  ShoppingCart,
  Monitor,
  Shirt,
  Home,
  Package,
  X,
} from 'lucide-react'
import { shopProducts, shopCategories } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type CartItem = { id: string; qty: number }
type CheckoutState = 'idle' | 'cart' | 'processing' | 'success'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  shirt: Shirt,
  home: Home,
  'shopping-bag': Package,
}

const productEmojis: Record<string, string> = {
  phone: '📱',
  laptop: '💻',
  shoe: '👟',
  coffee: '☕',
  dress: '👗',
  tv: '📺',
}

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle')

  function addToCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id, qty: 1 }]
    })
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (!existing) return prev
      if (existing.qty === 1) return prev.filter((i) => i.id !== id)
      return prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i)
    })
  }

  function getQty(id: string) {
    return cart.find((i) => i.id === id)?.qty ?? 0
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, item) => {
    const product = shopProducts.find((p) => p.id === item.id)
    return s + (product?.price ?? 0) * item.qty
  }, 0)

  const filtered = shopProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory ? p.category === activeCategory : true
    return matchSearch && matchCat
  })

  function handleCheckout() {
    setCheckoutState('processing')
    setTimeout(() => setCheckoutState('success'), 2000)
  }

  if (checkoutState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-10 w-10 text-emerald-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Order Placed!</h2>
          <p className="text-sm text-muted-foreground mt-2 text-balance max-w-sm">
            Your order for ETB {totalPrice.toLocaleString()} has been placed and will be delivered within 2–3 business days.
          </p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 w-full max-w-sm space-y-2">
          {cart.map((item) => {
            const product = shopProducts.find((p) => p.id === item.id)
            if (!product) return null
            return (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{product.name} x{item.qty}</span>
                <span className="font-semibold">ETB {(product.price * item.qty).toLocaleString()}</span>
              </div>
            )
          })}
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="text-sm font-bold">Total paid</span>
            <span className="text-sm font-bold text-emerald-600">ETB {totalPrice.toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={() => { setCart([]); setCheckoutState('idle') }}
          className="text-sm text-primary font-medium hover:underline"
        >
          Continue shopping
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-4 border-b border-border bg-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <ShoppingBag className="h-5 w-5 text-gold" />
        </div>
        <div className="flex-1">
          <h1 className="text-base font-bold text-foreground">Dashen Shop</h1>
          <p className="text-xs text-muted-foreground">Pay directly from your Dashen account</p>
        </div>
        {/* Cart button */}
        <button
          onClick={() => setCheckoutState(checkoutState === 'cart' ? 'idle' : 'cart')}
          className="relative flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 hover:bg-muted transition-colors"
        >
          <ShoppingCart className="h-4 w-4 text-foreground" />
          <span className="text-sm font-semibold text-foreground">{totalItems > 0 ? `ETB ${totalPrice.toLocaleString()}` : 'Cart'}</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 mb-5 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors',
                !activeCategory
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/30'
              )}
            >
              All
            </button>
            {shopCategories.map((cat) => {
              const Icon = categoryIcons[cat.icon] ?? Package
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border transition-colors',
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:border-primary/30'
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Flow AI banner */}
          <div className="flex items-center gap-3 rounded-2xl bg-gold-light border border-gold/30 px-4 py-2.5 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-gold-foreground shrink-0" />
            <p className="text-xs text-foreground/70">
              <span className="font-semibold text-gold-foreground">Flow AI:</span> Samsung Galaxy A55 is trending today — 328 Dashen customers bought it this month.
            </p>
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 gap-3 text-muted-foreground">
              <ShoppingBag className="h-10 w-10" />
              <p className="text-sm">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((product) => {
                const qty = getQty(product.id)
                return (
                  <div
                    key={product.id}
                    className="rounded-2xl bg-card border border-border p-4 flex flex-col gap-3 hover:border-primary/30 transition-colors"
                  >
                    {/* Product image placeholder */}
                    <div className="flex h-28 items-center justify-center rounded-xl bg-muted text-4xl">
                      {productEmojis[product.image] ?? '📦'}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-foreground leading-tight">{product.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        <span className="text-[10px] text-muted-foreground">{product.rating} ({product.sold} sold)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">ETB {product.price.toLocaleString()}</p>
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(product.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-[10px] font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="h-3 w-3" /> Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                          >
                            <Minus className="h-3 w-3 text-foreground" />
                          </button>
                          <span className="text-xs font-bold text-foreground w-4 text-center">{qty}</span>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 transition-colors"
                          >
                            <Plus className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Cart drawer */}
        {checkoutState === 'cart' && (
          <div className="w-80 shrink-0 border-l border-border bg-card flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">Your Cart ({totalItems})</h2>
              <button
                onClick={() => setCheckoutState('idle')}
                className="p-1 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center py-12 gap-3 text-muted-foreground">
                  <ShoppingCart className="h-8 w-8" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => {
                  const product = shopProducts.find((p) => p.id === item.id)
                  if (!product) return null
                  return (
                    <div key={item.id} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-xl shrink-0">
                        {productEmojis[product.image] ?? '📦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{product.name}</p>
                        <p className="text-[10px] text-muted-foreground">ETB {product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => removeFromCart(item.id)} className="flex h-5 w-5 items-center justify-center rounded-md bg-card hover:bg-muted transition-colors">
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => addToCart(item.id)} className="flex h-5 w-5 items-center justify-center rounded-md bg-primary hover:bg-primary/90 transition-colors">
                          <Plus className="h-2.5 w-2.5 text-white" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">ETB {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Pay ETB {totalPrice.toLocaleString()}
                </button>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-gold-foreground shrink-0" />
                  <span>Paid instantly from your Dashen account. No card needed.</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
