'use client'

import { motion } from 'framer-motion'
import { FileText, FileUp, ScanSearch, ShieldCheck, TrendingUp } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import { disputeItems, errorTypeStats, howItWorksSteps } from '../data/primescore'

const iconMap = {
  upload: FileUp,
  scan: ScanSearch,
  file: FileText,
  track: ShieldCheck,
  rise: TrendingUp,
} as const

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-20">
      <section className="pt-12 sm:pt-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Process</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              How Primescore works
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              System-led anomaly detection plus expert review, then a disciplined dispute workflow.
              Every step is documented, timed, and visible.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <div className="grid gap-5">
          {howItWorksSteps.map((s, idx) => {
            const Icon = iconMap[s.icon]
            return (
              <Reveal key={s.number} delay={idx * 0.04}>
                <div className="rounded-2xl border border-brandNavy/8 bg-white p-6 shadow-card sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brandRed/10">
                      {Icon ? <Icon className="h-6 w-6 text-brandRed" /> : null}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm text-textSecondary">{s.number}</span>
                          <h3 className="font-display text-xl font-bold text-brandNavy">{s.title}</h3>
                        </div>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brandNavy/[0.04] px-3 py-1 text-xs font-medium text-textSecondary">
                          <span className="font-mono font-semibold text-brandRed">{s.eta}</span>
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-textSecondary">{s.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="mt-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">What we dispute</p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
                Common CIBIL errors we correct
              </h2>
              <div className="mt-6 grid gap-2.5">
                {disputeItems.map((x, i) => (
                  <div key={x} className="flex items-center gap-3 rounded-xl border border-brandNavy/6 bg-white px-4 py-3.5">
                    <span className="font-mono text-xs text-textSecondary/50">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm font-medium text-brandNavy">{x}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Success rates</p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
                Resolution by error type
              </h2>
              <div className="mt-6 rounded-2xl border border-brandNavy/8 bg-white p-6 shadow-card">
                <div className="grid gap-5">
                  {errorTypeStats.map((row) => (
                    <div key={row.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-brandNavy">{row.label}</span>
                        <span className="font-mono text-brandNavy">{row.rate}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brandNavy/8">
                        <motion.div
                          className="h-full rounded-full bg-brandRed"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.rate}%` }}
                          viewport={{ once: true, amount: 0.7 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 rounded-xl border border-brandNavy/6 bg-night/50 p-5 text-sm leading-relaxed text-textSecondary">
                We correct inaccuracies with a clean, auditable method — so the improvement is stable and lender-friendly.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
