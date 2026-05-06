'use client'

import { Check } from 'lucide-react'
import { useMemo, useState } from 'react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Link from 'next/link'

type Billing = 'oneTime' | 'monthly'

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>('oneTime')

  const plans = useMemo(
    () => [
      {
        key: 'starter',
        name: 'Starter',
        oneTime: 999,
        monthly: 399,
        highlight: false,
        description: 'Quick audits and straightforward dispute cases.',
        features: [
          'Credit report audit summary',
          'Up to 2 dispute filings',
          'Email + WhatsApp updates',
          'Basic score hygiene checklist',
        ],
      },
      {
        key: 'pro',
        name: 'Pro',
        oneTime: 2499,
        monthly: 999,
        highlight: true,
        description: 'Serious score recovery with expert follow-ups.',
        features: [
          'Deep audit + expert review',
          'Up to 6 dispute filings',
          'Progress dashboard tracking',
          'Structured follow-ups + escalations',
          'One expert call included',
        ],
      },
      {
        key: 'premium',
        name: 'Premium',
        oneTime: 4999,
        monthly: 1999,
        highlight: false,
        description: 'White-glove handling for complex profiles.',
        features: [
          'Priority review & drafting',
          'Up to 12 dispute filings',
          'Dedicated credit expert',
          'Weekly progress reviews',
          'Monitoring + rapid disputes',
        ],
      },
    ],
    [],
  )

  const priceLabel = (plan: (typeof plans)[number]) => {
    const value = billing === 'oneTime' ? plan.oneTime : plan.monthly
    const suffix = billing === 'oneTime' ? '' : '/mo'
    return `₹${value.toLocaleString('en-IN')}${suffix}`
  }

  const featureRows = [
    { label: 'Expert-led report audit', starter: true, pro: true, premium: true },
    { label: 'Dispute drafting + filing', starter: 'Up to 2', pro: 'Up to 6', premium: 'Up to 12' },
    { label: 'Progress dashboard', starter: false, pro: true, premium: true },
    { label: 'Escalations & follow-ups', starter: false, pro: true, premium: true },
    { label: 'Dedicated expert', starter: false, pro: false, premium: true },
    { label: 'Monitoring & alerts', starter: false, pro: false, premium: true },
    { label: 'Money-back guarantee', starter: true, pro: true, premium: true },
  ] as const

  return (
    <div className="pb-20">
      <section className="pt-12 sm:pt-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Pricing</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              Choose one-time rectification, or monthly coverage for ongoing monitoring + guidance.
            </p>
            <div className="mt-7 inline-flex rounded-xl border border-brandNavy/8 bg-night/50 p-1">
              {(['oneTime', 'monthly'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  className={[
                    'rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200',
                    billing === b
                      ? 'bg-brandRed text-white shadow-sm'
                      : 'text-textSecondary hover:text-brandNavy',
                  ].join(' ')}
                >
                  {b === 'oneTime' ? 'One-time' : 'Monthly'}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, idx) => (
            <Reveal key={p.key} delay={idx * 0.04}>
              <div
                className={[
                  'relative flex flex-col rounded-2xl border bg-white p-6 sm:p-7',
                  p.highlight
                    ? 'border-brandRed/30 shadow-glowRed ring-1 ring-brandRed/10'
                    : 'border-brandNavy/8 shadow-card',
                ].join(' ')}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-6 rounded-full bg-brandRed px-3 py-0.5 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <div>
                  <h3 className="font-display text-xl font-bold text-brandNavy">{p.name}</h3>
                  <p className="mt-1 text-sm text-textSecondary">{p.description}</p>
                </div>

                <div className="mt-5 font-display text-4xl font-black tracking-tight text-brandNavy">
                  {priceLabel(p)}
                </div>
                <p className="mt-1 text-xs text-textSecondary">
                  {billing === 'monthly' ? 'Cancel anytime' : 'One-time payment'}
                </p>

                <div className="mt-6 grid gap-2.5">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm">
                      <div className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-brandNavy">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Link href="/contact">
                    <Button className="w-full" variant={p.highlight ? 'primary' : 'ghost'}>
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Money-back guarantee */}
      <section className="mt-14">
        <Reveal>
          <div className="rounded-2xl bg-brandNavy p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  100% money-back if no improvement in 90 days
                </h3>
                <p className="mt-1.5 text-sm text-white/50">
                  Eligible when filed disputes conclude and your profile shows no improvement.
                </p>
              </div>
              <Link href="/contact">
                <Button variant="ghost" className="w-full border-white/20 text-white hover:border-white/40 hover:bg-white/10 sm:w-auto">
                  Check eligibility
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Feature comparison */}
      <section className="mt-24">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Compare</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              Feature comparison
            </h2>
          </div>
        </Reveal>

        {/* Desktop */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-brandNavy/8 bg-white sm:block">
          <div className="grid grid-cols-4 border-b border-brandNavy/8 bg-night/60 p-5 text-sm font-semibold text-brandNavy">
            <div>Feature</div>
            <div>Starter</div>
            <div>Pro</div>
            <div>Premium</div>
          </div>
          {featureRows.map((row) => (
            <div key={row.label} className="grid grid-cols-4 border-b border-brandNavy/6 p-5 text-sm last:border-b-0">
              <div className="font-medium text-brandNavy">{row.label}</div>
              <div>{renderValue(row.starter)}</div>
              <div>{renderValue(row.pro)}</div>
              <div>{renderValue(row.premium)}</div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="mt-10 grid gap-3 sm:hidden">
          {featureRows.map((row) => (
            <div key={row.label} className="rounded-xl border border-brandNavy/8 bg-white p-4">
              <div className="text-sm font-semibold text-brandNavy">{row.label}</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div><span className="text-textSecondary">Starter: </span>{renderValueCompact(row.starter)}</div>
                <div><span className="text-textSecondary">Pro: </span>{renderValueCompact(row.pro)}</div>
                <div><span className="text-textSecondary">Premium: </span>{renderValueCompact(row.premium)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function renderValue(v: boolean | string) {
  if (typeof v === 'string') return <span className="font-mono text-brandNavy">{v}</span>
  return v ? (
    <span className="inline-flex items-center gap-1.5 text-success">
      <Check className="h-4 w-4" /> Yes
    </span>
  ) : (
    <span className="text-textSecondary/50">—</span>
  )
}

function renderValueCompact(v: boolean | string) {
  if (typeof v === 'string') return <span className="font-medium text-brandNavy">{v}</span>
  return v ? <span className="font-medium text-success">✓</span> : <span className="text-textSecondary/50">—</span>
}
