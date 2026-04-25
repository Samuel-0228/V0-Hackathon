'use client'

import { useState } from 'react'
import {
  Plane,
  ArrowLeftRight,
  CalendarDays,
  Users,
  Sparkles,
  Clock,
  Check,
  ArrowRight,
} from 'lucide-react'
import { flightRoutes } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type Step = 'search' | 'results' | 'confirm' | 'success'

const destinations = [
  { code: 'DXB', city: 'Dubai', country: 'UAE' },
  { code: 'NBO', city: 'Nairobi', country: 'Kenya' },
  { code: 'JNB', city: 'Johannesburg', country: 'South Africa' },
  { code: 'LHR', city: 'London', country: 'UK' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'BOM', city: 'Mumbai', country: 'India' },
]

const cabins = ['Economy', 'Business', 'First Class']

export default function FlightsPage() {
  const [step, setStep] = useState<Step>('search')
  const [dest, setDest] = useState<string | null>(null)
  const [cabin, setCabin] = useState('Economy')
  const [passengers, setPassengers] = useState(1)
  const [date, setDate] = useState('2025-05-10')
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const flightResult = flightRoutes.find((f) => f.to === dest)
  const bookedFlight = flightRoutes.find((f) => f.id === selectedFlight)

  function handleSearch() {
    if (!dest) return
    setStep('results')
  }

  function handleBook() {
    if (!selectedFlight) return
    setStep('confirm')
  }

  function handleConfirm() {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setStep('success')
    }, 2000)
  }

  if (step === 'success' && bookedFlight) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Plane className="h-10 w-10 text-blue-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Booking Confirmed!</h2>
          <p className="text-sm text-muted-foreground mt-2 text-balance max-w-sm">
            Your flight from {bookedFlight.fromCity} to {bookedFlight.toCity} has been booked successfully.
          </p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-5 w-full max-w-sm space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{bookedFlight.from}</p>
              <p className="text-xs text-muted-foreground">{bookedFlight.fromCity}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Plane className="h-4 w-4 text-primary rotate-0" />
              <div className="text-[10px] text-muted-foreground">{bookedFlight.duration}</div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{bookedFlight.to}</p>
              <p className="text-xs text-muted-foreground">{bookedFlight.toCity}</p>
            </div>
          </div>
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="font-semibold">{date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Passengers</span>
              <span className="font-semibold">{passengers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cabin</span>
              <span className="font-semibold">{cabin}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-primary">ETB {(bookedFlight.price * passengers).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Booking ref</span>
            <span className="font-mono text-xs text-muted-foreground">ET-{Date.now().toString().slice(-6)}</span>
          </div>
        </div>
        <button
          onClick={() => { setStep('search'); setSelectedFlight(null); setDest(null) }}
          className="text-sm text-primary font-medium hover:underline"
        >
          Book another flight
        </button>
      </div>
    )
  }

  if (step === 'confirm' && bookedFlight) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Confirm Booking</h2>
          <p className="text-sm text-muted-foreground mt-1">Review your flight details before payment</p>
        </div>
        <div className="rounded-2xl bg-card border border-border p-6 w-full max-w-md space-y-4">
          {/* Route visual */}
          <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{bookedFlight.from}</p>
              <p className="text-xs text-muted-foreground">{bookedFlight.fromCity}</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 flex-1 px-4">
              <div className="w-full flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <Plane className="h-4 w-4 text-primary" />
                <div className="flex-1 h-px bg-border" />
              </div>
              <span className="text-[10px] text-muted-foreground">{bookedFlight.duration}</span>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{bookedFlight.to}</p>
              <p className="text-xs text-muted-foreground">{bookedFlight.toCity}</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              ['Airline', 'Ethiopian Airlines'],
              ['Departure', date],
              ['Passengers', `${passengers} adult${passengers > 1 ? 's' : ''}`],
              ['Cabin', cabin],
              ['Fare per person', `ETB ${bookedFlight.price.toLocaleString()}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold text-foreground">{value}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="text-sm font-bold">Total</span>
              <span className="text-lg font-bold text-primary">ETB {(bookedFlight.price * passengers).toLocaleString()}</span>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Payment of ETB {(bookedFlight.price * passengers).toLocaleString()} will be deducted from your main Dashen account.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full max-w-md">
          <button
            onClick={() => setStep('results')}
            className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {processing ? 'Processing...' : 'Confirm & Pay'}
          </button>
        </div>
      </div>
    )
  }

  if (step === 'results') {
    const results = dest ? flightRoutes.filter((f) => f.to === dest) : flightRoutes
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 px-8 py-5 border-b border-border bg-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-foreground">
              ADD → {dest ?? 'All routes'}
            </h1>
            <p className="text-xs text-muted-foreground">{date} · {passengers} passenger · {cabin}</p>
          </div>
          <button
            onClick={() => setStep('search')}
            className="text-xs text-primary font-medium hover:underline"
          >
            Modify search
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center gap-2 rounded-2xl bg-gold-light border border-gold/30 px-4 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-gold-foreground shrink-0" />
              <p className="text-xs text-foreground/70">
                <span className="font-semibold text-gold-foreground">Flow AI:</span> ADD-DXB is 12% below your last booking price. Great time to fly!
              </p>
            </div>

            {results.map((flight) => (
              <button
                key={flight.id}
                onClick={() => setSelectedFlight(flight.id)}
                className={cn(
                  'w-full text-left rounded-2xl border-2 p-5 transition-all',
                  selectedFlight === flight.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/30'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{flight.from}</p>
                      <p className="text-xs text-muted-foreground">{flight.fromCity}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-px w-8 bg-border" />
                        <Plane className="h-3.5 w-3.5" />
                        <div className="h-px w-8 bg-border" />
                      </div>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {flight.duration}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{flight.to}</p>
                      <p className="text-xs text-muted-foreground">{flight.toCity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">from</p>
                    <p className="text-xl font-bold text-primary">ETB {(flight.price * passengers).toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">{passengers} pax · {cabin}</p>
                  </div>
                  {selectedFlight === flight.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary ml-4">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
                    Ethiopian Airlines
                  </span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
                    {cabin}
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-0.5 ml-auto">
                    Available
                  </span>
                </div>
              </button>
            ))}

            <button
              onClick={handleBook}
              disabled={!selectedFlight}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              Continue to booking <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Search screen
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 px-8 py-5 border-b border-border bg-card">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Plane className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground">Flights</h1>
          <p className="text-xs text-muted-foreground">Book with your Dashen account — no card needed</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Flow AI tip */}
          <div className="flex items-center gap-3 rounded-2xl bg-gold-light border border-gold/30 px-4 py-3">
            <Sparkles className="h-4 w-4 text-gold-foreground shrink-0" />
            <p className="text-xs text-foreground/70">
              <span className="font-semibold text-gold-foreground">Flow AI:</span> Based on your travel history, Dubai is likely your next destination. ADD-DXB is at a great price right now.
            </p>
          </div>

          {/* Search form */}
          <div className="rounded-2xl bg-card border border-border p-6 space-y-5">
            {/* Route */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">From</label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">ADD — Addis Ababa</span>
                </div>
              </div>
              <button className="mt-5 flex h-9 w-9 items-center justify-center rounded-xl bg-muted hover:bg-muted/70 transition-colors" aria-label="Swap">
                <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="flex-1">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">To</label>
                <select
                  value={dest ?? ''}
                  onChange={(e) => setDest(e.target.value || null)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="">Select destination</option>
                  {destinations.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.code} — {d.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Passengers */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">Departure Date</label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">Passengers</label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    min={1}
                    max={9}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-foreground outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Cabin */}
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">Cabin Class</label>
              <div className="flex gap-2">
                {cabins.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCabin(c)}
                    className={cn(
                      'flex-1 rounded-xl py-2.5 text-xs font-semibold border transition-colors',
                      cabin === c
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!dest}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Plane className="h-4 w-4" /> Search Flights
            </button>
          </div>

          {/* Popular routes */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Popular Routes from ADD</h3>
            <div className="grid grid-cols-3 gap-3">
              {flightRoutes.map((route) => (
                <button
                  key={route.id}
                  onClick={() => { setDest(route.to); setStep('results') }}
                  className="rounded-2xl bg-card border border-border p-4 text-left hover:border-primary/30 transition-colors"
                >
                  <p className="text-xs font-bold text-foreground">{route.from} → {route.to}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{route.toCity}</p>
                  <p className="text-sm font-bold text-primary mt-2">ETB {route.price.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">{route.duration}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
