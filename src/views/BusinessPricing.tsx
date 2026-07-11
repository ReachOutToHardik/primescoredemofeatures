'use client'

import React from 'react'
import { Check, ShieldCheck, FileText, Users, Mail } from 'lucide-react'
import Reveal from '../components/ui/Reveal'

type PlanConfig = {
  title: string
  subtitle: string
  duration: string
  basePrice: string
  unlimitedPrice: string
  features: string[]
  freeRectificationsText: string
}

const PLANS: PlanConfig[] = [
  {
    title: 'Half Yearly Plan',
    subtitle: 'Standard audit & bureau monitoring',
    duration: '6 Months coverage',
    basePrice: '35,000',
    unlimitedPrice: '40,000',
    freeRectificationsText: 'One Free Rectification (Per User)',
    features: [
      'Monthly company credit report for 6 months',
      'Monthly Director\'s credit report for 6 months',
      'Quarterly company CRIF credit report for 6 months (2 reports)',
      'Monthly Director\'s CRIF Report for 6 months',
    ]
  },
  {
    title: 'Yearly Plan',
    subtitle: 'Comprehensive annual monitoring',
    duration: '12 Months coverage',
    basePrice: '60,000',
    unlimitedPrice: '80,000',
    freeRectificationsText: 'Two Free Rectifications (Per User)',
    features: [
      'Monthly company credit report for 12 months',
      'Monthly Director\'s credit report for 12 months',
      'Quarterly company CRIF credit report for 12 months (4 reports)',
      'Monthly Director\'s CRIF Report for 12 months',
    ]
  }
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
  return (
    <div className="w-full bg-white text-slate-900">

      {/* ── PREMIUM PRICING (ENGAGEMENT COSTS FIRST) ─────── */}
      <section className="bg-slate-50/50 border-b border-slate-100 py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <Reveal>
            <div className="max-w-2xl mb-16 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3">ENGAGEMENT COSTS</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0B192C] leading-tight">
                Simple plans, tailored execution.
              </h1>
              <p className="mt-4 text-sm text-textSecondary font-light leading-relaxed">
                Choose the duration of monitoring and audit support your enterprise requires. Options for standard or unlimited rectification packages are listed clearly below.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {PLANS.map((plan, idx) => {
              return (
                <Reveal key={plan.title} delay={idx * 0.08}>
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full p-8 sm:p-10 relative transition-all duration-300 hover:shadow-md hover:border-slate-300">
                    <div>
                      {/* Top Label info */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
                          {plan.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-brandNavy mb-1">{plan.title}</h3>
                      <p className="text-xs text-slate-400 mb-8">{plan.subtitle}</p>

                      {/* Pricing block 1: Standard Option */}
                      <div className="mb-6 pb-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Standard Tiers</div>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-3xl font-black text-brandNavy tracking-tight">₹{plan.basePrice}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">+ GST</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-slate-600">
                            {plan.freeRectificationsText}
                          </span>
                        </div>
                      </div>

                      {/* Pricing block 2: Unlimited Option */}
                      <div className="mb-8 pb-8 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-black uppercase text-brandNavy tracking-widest">Unlimited Rectification</div>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-3xl font-black text-[#2563EB] tracking-tight">₹{plan.unlimitedPrice}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">+ GST</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#2563EB]">
                            All rectifications included
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 shrink-0 h-4 w-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                              <Check className="h-2.5 w-2.5 text-[#2563EB] stroke-[3]" />
                            </div>
                            <span className="text-xs sm:text-sm text-slate-700 leading-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-12">
                      <a
                        href="/business#audit-form"
                        className="block text-center w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 bg-brandNavy text-white hover:bg-brandNavy/90 shadow-md"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 text-xs text-slate-400 text-center">
              GST applicable at 18% · Fixed-term contracts with zero surprises · Custom multi-entity billing available upon request.
            </p>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 shrink-0 h-3.5 w-3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
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
