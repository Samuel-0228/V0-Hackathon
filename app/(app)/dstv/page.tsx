'use client'

import { useState } from 'react'
import { Tv2, Check, Plus, AlertCircle, Sparkles, Clock, Shield } from 'lucide-react'
import { dstvPackages, dstvAddons } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type PaymentState = 'idle' | 'confirm' | 'processing' | 'success'

export default function DstvPage() {
  const [selectedPackage, setSelectedPackage] = useState('compact-plus')
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set())
  const [paymentState, setPaymentState] = useState<PaymentState>('idle')

  const pkg = dstvPackages.find((p) => p.id === selectedPackage)!
  const addonTotal = dstvAddons
    .filter((a) => selectedAddons.has(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  const total = pkg.price + addonTotal

  function toggleAddon(id: string) {
    setSelectedAddons((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handlePay() {
    if (paymentState === 'idle') {
      setPaymentState('confirm')
    } else if (paymentState === 'confirm') {
      setPaymentState('processing')
      setTimeout(() => setPaymentState('success'), 2000)
    }
  }

  if (paymentState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-10 w-10 text-emerald-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground text-balance">Payment Successful!</h2>
          <p className="text-sm text-muted-foreground mt-2 text-balance max-w-sm">
            Your DSTV {pkg.name} subscription has been renewed. Your next bill date is May 28, 2025.
          </p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 w-full max-w-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Package</span>
            <span className="font-semibold">DSTV {pkg.name}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Amount paid</span>
            <span className="font-semibold text-emerald-600">ETB {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono text-xs text-muted-foreground">DSH-{Date.now().toString().slice(-8)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-gold-light border border-gold/30 rounded-xl px-4 py-2.5">
          <Sparkles className="h-3.5 w-3.5 text-gold-foreground shrink-0" />
          <span>Flow AI tip: Set up auto-renewal to never miss a payment!</span>
        </div>
        <button
          onClick={() => {
            setPaymentState('idle')
            setSelectedAddons(new Set())
          }}
          className="text-sm text-primary font-medium hover:underline"
        >
          Back to DSTV
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 px-8 py-5 border-b border-border bg-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
          <Tv2 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground">DSTV</h1>
          <p className="text-xs text-muted-foreground">Renew or upgrade your subscription</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* Current subscription banner */}
          <div className="flex items-center gap-3 rounded-2xl bg-orange-50 border border-orange-200 p-4 mb-6">
            <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-900">Current: Compact Plus — Expires in 3 days</p>
              <p className="text-xs text-orange-700 mt-0.5">Renew before April 28 to keep your channels uninterrupted.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-orange-700">
              <Clock className="h-3.5 w-3.5" />
              <span>Apr 28</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Package selector */}
            <div className="col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-foreground">Choose a Package</h2>
              <div className="grid grid-cols-2 gap-3">
                {dstvPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={cn(
                      'relative text-left rounded-2xl border-2 p-4 transition-all',
                      selectedPackage === pkg.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/30'
                    )}
                  >
                    {pkg.tag && (
                      <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-gold text-gold-foreground uppercase tracking-wide">
                        {pkg.tag}
                      </span>
                    )}
                    {selectedPackage === pkg.id && (
                      <div className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                    <p className="text-sm font-bold text-foreground mb-1">DSTV {pkg.name}</p>
                    <p className="text-lg font-bold text-primary">
                      ETB {pkg.price.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground">/mo</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">{pkg.channels} channels</p>
                    <p className="text-xs text-foreground/70 mt-1.5">{pkg.highlight}</p>
                  </button>
                ))}
              </div>

              {/* Add-ons */}
              <div className="mt-4">
                <h2 className="text-sm font-bold text-foreground mb-3">Add-ons (Optional)</h2>
                <div className="space-y-2">
                  {dstvAddons.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        'w-full flex items-center justify-between rounded-xl border px-4 py-3 transition-all',
                        selectedAddons.has(addon.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-primary/30'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors',
                            selectedAddons.has(addon.id)
                              ? 'border-primary bg-primary'
                              : 'border-border'
                          )}
                        >
                          {selectedAddons.has(addon.id) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="text-sm font-medium text-foreground">{addon.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        +ETB {addon.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-foreground">Order Summary</h2>
              <div className="rounded-2xl bg-card border border-border p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-semibold">DSTV {pkg.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base price</span>
                  <span>ETB {pkg.price.toLocaleString()}</span>
                </div>
                {dstvAddons
                  .filter((a) => selectedAddons.has(a.id))
                  .map((a) => (
                    <div key={a.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{a.name}</span>
                      <span>ETB {a.price.toLocaleString()}</span>
                    </div>
                  ))}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">ETB {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                  <Shield className="h-3 w-3 shrink-0" />
                  <span>Secured by Dashen Bank. Instant activation.</span>
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={paymentState === 'processing'}
                className={cn(
                  'w-full rounded-xl py-3.5 text-sm font-bold transition-all',
                  paymentState === 'confirm'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : paymentState === 'processing'
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                {paymentState === 'idle' && `Pay ETB ${total.toLocaleString()}`}
                {paymentState === 'confirm' && 'Confirm & Pay Now'}
                {paymentState === 'processing' && 'Processing...'}
              </button>

              {paymentState === 'confirm' && (
                <p className="text-[10px] text-muted-foreground text-center">
                  ETB {total.toLocaleString()} will be deducted from your main account.
                </p>
              )}

              <div className="flex items-center gap-2 rounded-xl bg-gold-light border border-gold/30 px-3 py-2.5">
                <Sparkles className="h-3.5 w-3.5 text-gold-foreground shrink-0" />
                <p className="text-[10px] text-foreground/70">
                  <span className="font-semibold text-gold-foreground">Flow AI:</span> Renewing today saves you the hassle — USD/ETB is up today so your ETB goes further.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
