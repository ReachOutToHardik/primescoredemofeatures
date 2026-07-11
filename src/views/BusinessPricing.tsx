'use client'

import React, { useState } from 'react'
import { Check, ArrowRight, ShieldCheck, FileText, Users, Phone, Mail } from 'lucide-react'
import Reveal from '../components/ui/Reveal'

const HALF_YEARLY_FEATURES = [
  { label: 'Company Credit Report', detail: 'Monthly · 6 months' },
  { label: "Director's Credit Report", detail: 'Monthly · 6 months' },
  { label: 'Company CRIF Credit Report', detail: 'Quarterly · 2 reports' },
  { label: "Director's CRIF Report", detail: 'Monthly · 6 months' },
  { label: 'Free Rectification', detail: '1 per user' },
]

const YEARLY_FEATURES = [
  { label: 'Company Credit Report', detail: 'Monthly · 12 months' },
  { label: "Director's Credit Report", detail: 'Monthly · 12 months' },
  { label: 'Company CRIF Credit Report', detail: 'Quarterly · 4 reports' },
  { label: "Director's CRIF Report", detail: 'Monthly · 12 months' },
  { label: 'Free Rectifications', detail: '2 per user' },
]

const WHY_US = [
  {
    title: 'Bureau-Level Expertise',
    body: 'Our analysts are trained specifically on CIBIL CCR, CRIF, Experian, and Equifax commercial report structures — not generalist consultants.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="8" width="36" height="32" rx="4" stroke="#0B192C" strokeWidth="2" fill="#EFF6FF"/>
        <path d="M14 20h20M14 26h14M14 32h8" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="30" r="7" fill="#0B192C"/>
        <path d="M33 30l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'End-to-End Dispute Filing',
    body: 'We don\'t hand you a checklist. We compile evidence, write formal communications, and file disputes directly with CIBIL, CRIF, and the relevant banks.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M10 38L20 18l8 12 6-8 8 16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="10" cy="38" r="2" fill="#E85C0D"/>
        <circle cx="20" cy="18" r="2" fill="#2563EB"/>
        <circle cx="28" cy="30" r="2" fill="#2563EB"/>
        <circle cx="34" cy="22" r="2" fill="#2563EB"/>
        <circle cx="42" cy="38" r="2" fill="#E85C0D"/>
        <rect x="4" y="6" width="8" height="8" rx="1" fill="#EFF6FF" stroke="#0B192C" strokeWidth="1.5"/>
        <path d="M6 10h4M6 12h2" stroke="#0B192C" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Director-Level Monitoring',
    body: 'Your directors\' personal CIBIL and CRIF scores are tied to your company\'s creditworthiness. We track both simultaneously — a gap most firms miss entirely.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="16" r="8" stroke="#0B192C" strokeWidth="2" fill="#EFF6FF"/>
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#0B192C" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 22l4 4-4 4" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="38" cy="26" r="5" fill="#0B192C"/>
        <path d="M36 26l1.5 1.5L40 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Zero Surprise Retainers',
    body: 'Fixed-term engagement contracts with no monthly auto-renewals, hidden escalation clauses, or post-audit "maintenance" fees. What you see is what you pay.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="10" width="32" height="28" rx="3" stroke="#0B192C" strokeWidth="2" fill="#EFF6FF"/>
        <path d="M24 20v8M21 25l3 3 3-3" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 16h16M16 32h8" stroke="#0B192C" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
        <circle cx="36" cy="34" r="6" fill="#0B192C"/>
        <path d="M33.5 34l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: '2-Hour Commercial SLA',
    body: 'Every commercial inquiry is routed to a dedicated desk. Our analysts respond within 2 hours on all business days — not a bot, a human analyst.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="16" stroke="#0B192C" strokeWidth="2" fill="#EFF6FF"/>
        <path d="M24 14v10l6 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="2" fill="#E85C0D"/>
      </svg>
    ),
  },
  {
    title: '100% Bureau Compliant',
    body: 'All filings and reports are processed within the legal framework set by the Credit Information Companies (Regulation) Act, 2005 and RBI directives.',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6L8 14v12c0 9.94 6.84 19.24 16 22 9.16-2.76 16-12.06 16-22V14L24 6z" stroke="#0B192C" strokeWidth="2" fill="#EFF6FF"/>
        <path d="M17 24l5 5 9-9" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const PROCESS_STEPS = [
  { n: '01', title: 'Submit Inquiry', body: 'Fill our commercial audit request form. Our team reviews your company profile within 2 hours.' },
  { n: '02', title: 'CCR & Report Pull', body: 'We obtain your Company Credit Report from CIBIL and CRIF, plus director-level bureau pulls.' },
  { n: '03', title: 'Error Identification', body: 'Our analysts map duplicate lines, PAN mismatches, incorrect account classifications, and registry errors.' },
  { n: '04', title: 'Dispute Filing', body: 'Formal dispute documentation is compiled and submitted to the relevant bureaus and banks on your behalf.' },
  { n: '05', title: 'Ongoing Monitoring', body: 'Monthly and quarterly reports are delivered for the duration of your plan. We flag new issues proactively.' },
]

export default function BusinessPricing() {
  const [activePlan, setActivePlan] = useState<'half' | 'yearly'>('yearly')

  return (
    <div className="w-full bg-white text-slate-900">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-100">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50/80 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-50/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 pt-20 pb-24">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-brandNavy leading-[1.08] mb-6">
                  Your company's credit profile deserves more than a checklist.
                </h1>
                <p className="text-base sm:text-lg text-textSecondary font-light leading-relaxed mb-10 max-w-xl">
                  Primescore's commercial audit desk reviews your CCR, disputes bureau errors, reconciles bank records, and monitors supplier credit risk — all under a single transparent engagement fee.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/business#audit-form"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-brandNavy text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brandNavy/90 transition-all shadow-md"
                  >
                    Request Commercial Audit
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-brandNavy text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all"
                  >
                    See How It Works
                  </a>
                </div>
              </div>

              {/* Stats panel */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '₹420Cr+', l: 'Disputed Credit\nAudited', accent: '#2563EB' },
                  { n: '180+', l: 'Corporate Entities\nSupported', accent: '#E85C0D' },
                  { n: '100%', l: 'Bureau Compliant\nOperations', accent: '#10b981' },
                  { n: '2 Hrs', l: 'Response SLA\nGuaranteed', accent: '#0B192C' },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 blur-xl"
                      style={{ background: s.accent }}
                    />
                    <div className="text-3xl font-black text-brandNavy leading-none mb-2">{s.n}</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-snug whitespace-pre-line">{s.l}</div>
                    <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: s.accent }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY PRIMESCORE ───────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="mb-14">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3">Why Primescore</p>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy max-w-2xl leading-tight">
                Most companies discover their credit errors only when the bank says no.
              </h2>
              <p className="mt-4 text-base text-textSecondary font-light max-w-2xl leading-relaxed">
                We work upstream — identifying duplicate loan lines, PAN mismatches, and classification errors before they affect your borrowing capacity, vendor negotiations, or regulatory standing.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group p-7 rounded-2xl border border-slate-200 bg-white hover:border-[#2563EB]/30 hover:shadow-md transition-all duration-300">
                  <div className="mb-5">{item.svg}</div>
                  <h3 className="text-sm font-bold text-brandNavy mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section id="how-it-works" className="bg-[#f8fafc] border-b border-slate-200">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="mb-14">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3">Our Process</p>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy max-w-xl leading-tight">
                From inquiry to clean bureau record.
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <div className="grid lg:grid-cols-5 gap-8 relative">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.07}>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5 relative z-10">
                      <span className="text-[10px] font-black text-[#2563EB] tracking-wider">{step.n}</span>
                    </div>
                    <h3 className="text-sm font-bold text-brandNavy mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3">Engagement Plans</p>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy leading-tight">
                  Transparent pricing.<br />No surprise retainers.
                </h2>
                <p className="mt-4 text-sm text-textSecondary font-light max-w-lg leading-relaxed">
                  Two plan durations. Two rectification tiers. All prices are fixed-term engagement contracts — no auto-renewals, no hidden escalation clauses.
                </p>
              </div>
              {/* Toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start lg:self-end">
                {(['half', 'yearly'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActivePlan(p)}
                    className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      activePlan === p
                        ? 'bg-white text-brandNavy shadow-sm'
                        : 'text-slate-500 hover:text-brandNavy'
                    }`}
                  >
                    {p === 'half' ? '6 Months' : '12 Months'}
                    {p === 'yearly' && activePlan !== 'yearly' && (
                      <span className="ml-2 text-[8px] bg-brandRed text-white px-1.5 py-0.5 rounded-full">BEST</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid lg:grid-cols-2 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

              {/* Standard Tier */}
              <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col bg-white">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">Standard</div>
                    <h3 className="text-2xl font-black text-brandNavy">Audit & Monitoring</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                </div>

                <div className="mb-8 pb-8 border-b border-slate-100">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-brandNavy tracking-tight">
                      {activePlan === 'half' ? '₹35,000' : '₹60,000'}
                    </span>
                    <span className="text-sm text-slate-400">+ GST</span>
                  </div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                    Fixed · {activePlan === 'half' ? '6-month' : '12-month'} engagement
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    1 free rectification per user included
                  </div>
                </div>

                <ul className="space-y-3.5 flex-1">
                  {(activePlan === 'half' ? HALF_YEARLY_FEATURES : YEARLY_FEATURES).map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full border border-emerald-200 bg-emerald-50 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-emerald-600 stroke-[3]" />
                      </div>
                      <div className="text-sm text-slate-700">
                        <span className="font-semibold">{f.label}</span>
                        <span className="text-slate-400 text-xs ml-1.5">— {f.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <a
                  href="/business#audit-form"
                  className="mt-10 flex items-center justify-center gap-2 w-full py-4 border-2 border-brandNavy text-brandNavy hover:bg-brandNavy hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200"
                >
                  Request Consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Unlimited Tier */}
              <div className="p-8 sm:p-10 bg-brandNavy flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,92,13,0.15)_0%,_transparent_55%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.12)_0%,_transparent_55%)] pointer-events-none" />

                {/* Decorative SVG */}
                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                  <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
                    <circle cx="120" cy="120" r="100" stroke="white" strokeWidth="1.5"/>
                    <circle cx="120" cy="120" r="70" stroke="white" strokeWidth="1"/>
                    <circle cx="120" cy="120" r="40" stroke="white" strokeWidth="0.5"/>
                    <line x1="20" y1="120" x2="220" y2="120" stroke="white" strokeWidth="0.5"/>
                    <line x1="120" y1="20" x2="120" y2="220" stroke="white" strokeWidth="0.5"/>
                  </svg>
                </div>

                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-2">Unlimited</div>
                    <h3 className="text-2xl font-black text-white">Rectification Plan</h3>
                  </div>
                  <span className="text-[9px] font-black text-brandRed bg-brandRed/10 border border-brandRed/20 px-2.5 py-1.5 rounded-lg uppercase tracking-widest">
                    Recommended
                  </span>
                </div>

                <div className="mb-8 pb-8 border-b border-white/10 relative z-10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-white tracking-tight">
                      {activePlan === 'half' ? '₹40,000' : '₹80,000'}
                    </span>
                    <span className="text-sm text-white/40">+ GST</span>
                  </div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider font-medium">
                    Fixed · {activePlan === 'half' ? '6-month' : '12-month'} engagement
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Unlimited rectifications — no cap, no additional charges
                  </div>
                </div>

                <ul className="space-y-3.5 flex-1 relative z-10">
                  {(activePlan === 'half' ? HALF_YEARLY_FEATURES : YEARLY_FEATURES).map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-white/70 stroke-[3]" />
                      </div>
                      <div className="text-sm text-white/75">
                        <span className="font-semibold text-white">{f.label}</span>
                        <span className="text-white/40 text-xs ml-1.5">— {f.detail}</span>
                      </div>
                    </li>
                  ))}
                  {/* Bonus row */}
                  <li className="flex items-start gap-3 mt-2 pt-4 border-t border-white/10">
                    <div className="mt-0.5 h-5 w-5 rounded-full border border-brandRed/40 bg-brandRed/15 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-brandRed stroke-[3]" />
                    </div>
                    <div className="text-sm">
                      <span className="font-black text-white">Unlimited Rectifications</span>
                      <span className="text-white/40 text-xs ml-1.5">— no per-dispute charges</span>
                    </div>
                  </li>
                </ul>

                <a
                  href="/business#audit-form"
                  className="relative z-10 mt-10 flex items-center justify-center gap-2 w-full py-4 bg-white text-brandNavy hover:bg-white/90 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 shadow-xl"
                >
                  Request Consultation
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Fine print */}
          <Reveal delay={0.1}>
            <p className="mt-6 text-xs text-slate-400 text-center">
              GST applicable at 18% · All plans are fixed-term contracts · Volume pricing available for group company portfolios
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── INCLUDED IN ALL PLANS ────────────────────────── */}
      <section className="bg-[#f8fafc] border-b border-slate-200">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-16">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-10">Included In All Plans</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            {[
              { icon: ShieldCheck, title: '100% Bureau Compliant', body: 'All filings processed under the Credit Information Companies (Regulation) Act, 2005 and RBI directives.' },
              { icon: FileText, title: 'Dispute Documentation Drafted', body: 'We compile evidence, write formal communications, and submit dispute filings to CIBIL, CRIF, and relevant banks.' },
              { icon: Users, title: 'Dedicated Analyst Desk', body: 'A human commercial analyst — not a chatbot — responds to every query within 2 hours, Monday to Saturday.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white px-8 py-8">
                <Icon className="h-6 w-6 text-[#2563EB] mb-4" />
                <div className="text-sm font-bold text-brandNavy mb-2">{title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ───────────────────────────────────── */}
      <section className="bg-brandNavy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(232,92,13,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight max-w-xl">
                Ready to clean up your company's credit profile?
              </h2>
              <p className="mt-3 text-sm text-white/60 font-light max-w-lg">
                Talk to our commercial desk and get a free preliminary assessment of your Company Credit Report.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="/business#audit-form"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-brandNavy text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all shadow-lg"
              >
                Request Audit
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:info@primescore.in"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
              >
                <Mail className="h-3.5 w-3.5" />
                info@primescore.in
              </a>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
