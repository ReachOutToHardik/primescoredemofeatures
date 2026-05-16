'use client'

import {
  Activity,
  ArrowRight,
  BadgeIndianRupee,
  FileWarning,
  Handshake,
  LineChart,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import Link from 'next/link'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { services } from '../data/primescore'

const iconById = {
  rectification: ShieldCheck,
  settlement: Handshake,
  'card-disputes': FileWarning,
  monitoring: Activity,
  coaching: LineChart,
  emi: Wallet,
} as const

export default function Services() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-20">
      {/* Hero */}
      <section className="pt-12 sm:pt-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Our Services</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              Services built to repair credit — properly.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              Not a checklist. Not a template. Each service is engineered around Indian bureau realities: reference IDs,
              response timelines, clean evidence packs, and the follow-ups most people don't do.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/pricing">
                <Button as="div" className="w-full sm:w-auto">See Pricing</Button>
              </Link>
              <Link href="/contact">
                <Button as="div" variant="ghost" className="w-full sm:w-auto">
                  Talk to an expert
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Service Cards */}
      <section className="mt-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const Icon = iconById[s.id as keyof typeof iconById]
            return (
              <Reveal key={s.id} delay={idx * 0.04}>
                <div className="group flex flex-col rounded-2xl border border-brandNavy/8 bg-white p-6 transition-all duration-300 hover:border-brandRed/25 hover:shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-brandRed/10">
                      {Icon ? <Icon className="h-5 w-5 text-brandRed" /> : null}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-brandNavy">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary">{s.description}</p>

                  <div className="mt-5">
                    <a href={`#details-${s.id}`}>
                      <Button variant="ghost" className="w-full">
                        View timeline <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mt-24">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Comparison</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              Primescore vs DIY vs other platforms
            </h2>
          </div>
        </Reveal>

        {/* Desktop table */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-brandNavy/8 bg-white sm:block">
          <div className="grid grid-cols-4 gap-0 border-b border-brandNavy/8 bg-night/60 text-left text-sm font-semibold text-brandNavy">
            <div className="p-5">Capability</div>
            <div className="p-5">Primescore</div>
            <div className="p-5">DIY</div>
            <div className="p-5">Other platforms</div>
          </div>
          {[
            { k: 'Line-by-line bureau audit', a: 'Yes (expert reviewed)', b: 'Time-consuming', c: 'Inconsistent' },
            { k: 'Evidence pack + legal drafting', a: 'Yes', b: 'Hard', c: 'Template-level' },
            { k: 'Tracking reference IDs', a: 'Dashboard', b: 'Manual', c: 'Partial' },
            { k: 'Escalations & follow-ups', a: 'Structured', b: 'Often skipped', c: 'Limited' },
            { k: 'Confidential handling', a: 'Minimal-access', b: 'N/A', c: 'Varies' },
          ].map((row) => (
            <div key={row.k} className="grid grid-cols-4 gap-0 border-b border-brandNavy/6 text-sm last:border-b-0">
              <div className="p-5 font-medium text-brandNavy">{row.k}</div>
              <div className="p-5 font-medium text-success">{row.a}</div>
              <div className="p-5 text-textSecondary">{row.b}</div>
              <div className="p-5 text-textSecondary">{row.c}</div>
            </div>
          ))}
        </div>

        {/* Mobile comparison */}
        <div className="mt-10 grid gap-3 sm:hidden">
          {[
            { k: 'Line-by-line bureau audit', a: 'Yes (expert reviewed)', b: 'Time-consuming', c: 'Inconsistent' },
            { k: 'Evidence pack + legal drafting', a: 'Yes', b: 'Hard', c: 'Template-level' },
            { k: 'Tracking reference IDs', a: 'Dashboard', b: 'Manual', c: 'Partial' },
            { k: 'Escalations & follow-ups', a: 'Structured', b: 'Often skipped', c: 'Limited' },
            { k: 'Confidential handling', a: 'Minimal-access', b: 'N/A', c: 'Varies' },
          ].map((row) => (
            <div key={row.k} className="rounded-xl border border-brandNavy/8 bg-white p-4">
              <div className="text-sm font-semibold text-brandNavy">{row.k}</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div><span className="text-textSecondary">Us: </span><span className="font-medium text-success">{row.a}</span></div>
                <div><span className="text-textSecondary">DIY: </span><span className="text-textSecondary">{row.b}</span></div>
                <div><span className="text-textSecondary">Others: </span><span className="text-textSecondary">{row.c}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timelines */}
      <section className="mt-24">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Process</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              A clear timeline for every service
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6">
          {services.map((s) => (
            <div key={s.id} id={`details-${s.id}`} className="scroll-mt-28">
              <Reveal>
                <div className="rounded-2xl border border-brandNavy/8 bg-white p-6 shadow-card sm:p-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-brandNavy">{s.title}</h3>
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-textSecondary">{s.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {s.timeline.map((t) => (
                      <div key={t.title} className="rounded-xl border border-brandNavy/6 bg-night/50 p-4">
                        <div className="font-mono text-xs text-textSecondary">{t.eta}</div>
                        <div className="mt-1.5 text-sm font-semibold text-brandNavy">{t.title}</div>
                        <div className="mt-1 text-xs leading-relaxed text-textSecondary">{t.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24">
        <Reveal>
          <div className="rounded-2xl border border-brandNavy/8 bg-white p-8 shadow-card">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brandRed/10">
                <BadgeIndianRupee className="h-6 w-6 text-brandRed" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-brandNavy">Not sure what you need?</h3>
                <p className="mt-1 text-sm text-textSecondary">
                  We'll map your exact report issues to the right service in one quick call.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button as="div" className="w-full sm:w-auto">Book a free assessment</Button>
              </Link>
              <Link href="/how-it-works">
                <Button as="div" variant="ghost" className="w-full sm:w-auto">
                  See the full process
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
