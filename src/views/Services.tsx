'use client'

import React, { useState } from 'react'
import {
  Activity,
  ArrowRight,
  BadgeIndianRupee,
  FileWarning,
  Handshake,
  LineChart,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  Phone,
  Check,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  MessageSquare,
  FileText,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { services, faqs } from '../data/primescore'
import FAQAccordion from '../components/ui/FAQAccordion'

const iconById = {
  rectification: ShieldCheck,
  settlement: Handshake,
  'card-disputes': FileWarning,
  monitoring: Activity,
  coaching: LineChart,
  emi: Wallet,
} as const

const fixesByService: Record<string, string[]> = {
  rectification: [
    'Corrects false late payment (DPD) marks',
    'Deletes double-reported active loan entries',
    'Corrects name, DOB, or PAN card mismatch errors',
    'Disputes unauthorized bank search inquiries'
  ],
  settlement: [
    'Negotiates standard loan settlement terms with banks',
    'Verifies settlement letter authenticity before you pay',
    'Obtains official bank No Objection Certificates (NOC)',
    'Helps remove negative settlement CIBIL tags'
  ],
  'card-disputes': [
    'Resolves long-standing credit card defaults',
    'Clears "Written-off" accounts from credit history',
    'Disputes incorrect unpaid balance calculations',
    'Updates report markers to a clean "Closed" status'
  ],
  monitoring: [
    'Monitors new PAN inquiries to block identity theft',
    'Alerts you immediately when account statuses change',
    'Provides monthly bureau score status reviews',
    'Fast-tracks priority disputes for any fresh errors'
  ],
  coaching: [
    'Draws a simple 90-day plan to cross the 750+ mark',
    'Teaches optimal credit utilization ratios',
    'Helps structure safe mixture of loans',
    'Provides weekly credit hygiene checklists'
  ],
  emi: [
    'Analyzes court case records and legal notice warnings',
    'Coordinates directly with bank legal advocates',
    'Drafts proper court settlement proposals',
    'Deletes the active "Suit Filed" marker post-resolution'
  ]
}

const ISSUES = [
  {
    id: 'rectification',
    problem: 'Incorrect Late Payments (DPD)',
    badState: '30 / 60 DPD Overdue ❌',
    goodState: '000 (No Dues) ✅',
    summary: 'You paid your EMI on time, but the bank incorrectly reported delayed payments.',
    seoHeading: 'Fix Incorrect CIBIL Late Payments & DPD Records',
    icon: ShieldCheck
  },
  {
    id: 'settlement',
    problem: 'Settled Loan Accounts',
    badState: 'Settled status ❌',
    goodState: 'Closed & Resolved ✅',
    summary: 'You cleared your loan, but the negative "Settled" status blocks future approvals.',
    seoHeading: 'Remove Negative "Settled" Status From CIBIL Report',
    icon: Handshake
  },
  {
    id: 'card-disputes',
    problem: 'Written-Off Defaults',
    badState: 'Written-off ❌',
    goodState: 'Closed / NOC Issued ✅',
    summary: 'An old dispute or credit card balance is reported as a bank loss (Written-off).',
    seoHeading: 'Resolve Written-Off Status & CIBIL Default Records',
    icon: FileWarning
  },
  {
    id: 'emi',
    problem: 'Active Litigation / Suit Filed',
    badState: 'Suit Filed status ❌',
    goodState: 'Suit Dismissed / Closed ✅',
    summary: 'The bank has filed a legal court case against you, visible on your credit history.',
    seoHeading: 'Remove Suit Filed Markers From Credit Profile',
    icon: Wallet
  },
  {
    id: 'duplicate-loans',
    problem: 'Duplicate Loan Entries',
    badState: 'Duplicate Accounts ❌',
    goodState: 'Clean / Single Entry ✅',
    summary: 'A single loan is reported multiple times, artificially doubling your total debt.',
    seoHeading: 'Fix Duplicate Active Loans & Bureau Accounts',
    icon: Activity
  },
  {
    id: 'coaching',
    problem: 'CIBIL stuck below 750',
    badState: '620 Score ❌',
    goodState: '750+ Excellent ✅',
    summary: 'No active defaults, but your score is low and you face constant credit rejection.',
    seoHeading: '90-Day Credit Builder Guide to Cross 750+',
    icon: LineChart
  }
]

export default function Services() {
  const [selectedIssueId, setSelectedIssueId] = useState<string>('rectification')
  
  const currentService = services.find((s) => s.id === selectedIssueId) || services[0]
  const currentIssue = ISSUES.find((i) => i.id === selectedIssueId) || ISSUES[0]
  const currentFixes = fixesByService[selectedIssueId] || []

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24 text-brandNavy bg-night">
      {/* 1. HERO SECTION */}
      <section className="pt-24 sm:pt-36">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brandNavy/10 bg-brandNavy/[0.03] px-3.5 py-1 text-xs font-semibold text-brandNavy mb-5">
              <Sparkles className="h-3.5 w-3.5 text-brandRed animate-pulse" />
              <span>RBI Guidelines Compliant Credit Repair</span>
            </div>
            
            <h1 className="font-display text-4xl font-black tracking-tight text-brandNavy sm:text-6xl max-w-4xl leading-[1.1]">
              CIBIL Score Repair &amp; <span className="text-brandRed">Credit Rectification</span>
            </h1>
            
            <p className="mt-6 max-w-3xl text-base sm:text-lg leading-relaxed text-textSecondary">
              Simple, document-backed legal credit repair services in India. We help you dispute incorrect late payments, 
              negotiate loan closures, remove negative defaults, and resolve court markers from your credit history.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm font-semibold text-brandNavy/75 border-b border-brandNavy/10 pb-8">
              <div className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-brandGreen" />
                <span>iStart Govt. Recognized Startup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-brandGreen" />
                <span>90-Day Average Resolution Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-brandGreen" />
                <span>100% Legal, Document-Backed Process</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. BENTO DIAGNOSTIC CENTER */}
      <section className="mt-14">
        <Reveal>
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Diagnostic Locator</span>
            <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-brandNavy sm:text-3xl">
              CIBIL Resolution Diagnostic Center
            </h2>
            <p className="mt-1.5 text-sm text-textSecondary max-w-2xl">
              Select your specific credit issue below. Our bento command board will dynamically load the exact bank resolution pathway.
            </p>
          </div>

          {/* Diagnostic Grid of Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ISSUES.map((issue) => {
              const IssueIcon = issue.icon
              const isSelected = selectedIssueId === issue.id
              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={[
                    'group text-left p-5 rounded-xl border transition-all duration-200 outline-none flex flex-col justify-between h-full relative overflow-hidden',
                    isSelected
                      ? 'border-brandNavy bg-brandNavy text-white shadow-glowNavy scale-[1.01]'
                      : 'border-brandNavy/10 bg-white hover:border-brandNavy/25 hover:bg-brandNavy/[0.01] text-brandNavy'
                  ].join(' ')}
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className={[
                        'p-2.5 rounded-lg transition-colors',
                        isSelected ? 'bg-white/10 text-white' : 'bg-brandNavy/5 text-brandNavy/70 group-hover:bg-brandNavy/10'
                      ].join(' ')}>
                        <IssueIcon className="h-5 w-5" />
                      </div>
                      
                      {/* Interactive Badge Stamp */}
                      <span className={[
                        'text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border',
                        isSelected ? 'bg-white/10 border-white/20 text-brandYellow' : 'bg-red-50 border-red-100 text-brandRed'
                      ].join(' ')}>
                        {issue.badState.replace(' ❌', '')}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold leading-tight">{issue.problem}</h3>
                    <p className={[
                      'mt-2 text-xs leading-relaxed',
                      isSelected ? 'text-white/80' : 'text-textSecondary'
                    ].join(' ')}>{issue.summary}</p>
                  </div>

                  {/* Click trigger indicator */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-bold transition-all">
                    <span className={isSelected ? 'text-brandYellow' : 'text-brandRed'}>
                      {isSelected ? 'Viewing Resolution Board' : 'View resolution steps'}
                    </span>
                    <ArrowRight className={[
                      'h-3.5 w-3.5 transition-transform',
                      isSelected ? 'translate-x-1 text-brandYellow' : 'group-hover:translate-x-1 text-brandRed'
                    ].join(' ')} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* DYNAMIC BENTO GRID PANEL */}
          <div className="mt-8 rounded-2xl border border-brandNavy/8 bg-white p-5 sm:p-8 lg:p-10 shadow-card">
            
            {/* Bento Grid layout */}
            <div className="grid gap-6 lg:grid-cols-12">
              
              {/* TILE 1: Visual Credit File Simulator (Understanding element) */}
              <div className="lg:col-span-7 border border-brandNavy/6 rounded-xl bg-brandNavy/[0.005] p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-brandNavy/5 pb-3.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>Credit file simulation</span>
                    </span>
                    <span className="text-[10px] font-mono text-brandRed bg-brandRed/10 px-2 py-0.5 rounded font-bold">
                      TRANSFORMATION PREVIEW
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-black text-brandNavy tracking-tight leading-snug">
                    {currentIssue.seoHeading}
                  </h3>
                  
                  <p className="mt-2 text-xs sm:text-sm text-textSecondary leading-relaxed">
                    {currentService.description}
                  </p>

                  {/* Simulator Grid */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {/* Before */}
                    <div className="rounded-lg border border-red-100 bg-red-50/40 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brandRed">Status (Before)</div>
                      <div className="mt-1.5 font-display text-xs font-bold text-brandNavy">ACC: ****1948</div>
                      <div className="mt-3 flex flex-col gap-0.5 text-xs">
                        <span className="text-textSecondary">Report Marker:</span>
                        <span className="font-bold text-brandRed">{currentIssue.badState}</span>
                      </div>
                    </div>

                    {/* After */}
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 h-8 w-8 rounded-full bg-brandGreen/10" />
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brandGreen">Status (After Primescore)</div>
                      <div className="mt-1.5 font-display text-xs font-bold text-brandNavy">ACC: ****1948</div>
                      <div className="mt-3 flex flex-col gap-0.5 text-xs">
                        <span className="text-textSecondary">Report Marker:</span>
                        <span className="font-bold text-brandGreen font-semibold">{currentIssue.goodState}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-textSecondary bg-brandNavy/[0.03] p-3 rounded-lg">
                  <Info className="h-4.5 w-4.5 text-brandBlue shrink-0 mt-0.5" />
                  <span>
                    <strong>Resolution Path:</strong> We dispute this directly with bank litigation teams &amp; credit bureaus using CIC Act regulatory guidelines.
                  </span>
                </div>
              </div>

              {/* TILE 2: What We Resolve Checklist (High delivering detail) */}
              <div className="lg:col-span-5 border border-brandNavy/6 rounded-xl bg-brandNavy/[0.005] p-5 sm:p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary block mb-3.5">
                  Direct Deliverables
                </span>
                <h4 className="font-display text-base font-bold text-brandNavy mb-4">
                  What we correct in this service:
                </h4>
                
                <ul className="space-y-3">
                  {currentFixes.map((fix) => (
                    <li key={fix} className="flex items-start gap-2.5 text-xs sm:text-sm text-brandNavy/80">
                      <CheckCircle2 className="h-4.5 w-4.5 text-brandGreen shrink-0 mt-0.5" />
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-brandNavy/5 pt-5 text-xs text-textSecondary">
                  <span className="font-bold text-brandNavy block mb-1">Guaranteed Transparency:</span>
                  All changes are reflected directly inside credit report updates from CIBIL, Experian, and Equifax.
                </div>
              </div>

              {/* TILE 3: The Escalation Timeline Roadmap (Workflow timeline) */}
              <div className="lg:col-span-8 border border-brandNavy/6 rounded-xl bg-brandNavy/[0.005] p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5 border-b border-brandNavy/5 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary">
                    Escalation Milestones
                  </span>
                  <span className="text-[10px] font-mono font-bold text-brandRed bg-brandRed/5 px-2 py-0.5 rounded">
                    30-90 Days SLA
                  </span>
                </div>

                <div className="relative border-l border-brandNavy/10 pl-5 ml-2 space-y-6">
                  {currentService.timeline.map((step, sIdx) => (
                    <div key={step.title} className="relative group/step">
                      {/* Timeline node */}
                      <div className="absolute -left-[26px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-white border-2 border-brandNavy/35 group-hover/step:border-brandRed transition-colors">
                        <div className="h-1 w-1 rounded-full bg-brandNavy/10" />
                      </div>

                      <div className="grid gap-1 sm:grid-cols-12 sm:items-start">
                        {/* Title and ETA */}
                        <div className="sm:col-span-5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-bold text-brandNavy/40">STAGE 0{sIdx + 1}</span>
                            <span className="font-mono text-[9px] font-bold text-brandRed bg-brandRed/5 px-1.5 py-0.25 rounded">
                              {step.eta}
                            </span>
                          </div>
                          <h5 className="mt-0.5 font-display text-sm font-bold text-brandNavy leading-tight">
                            {step.title}
                          </h5>
                        </div>
                        {/* Detail text */}
                        <p className="sm:col-span-7 text-xs leading-relaxed text-textSecondary sm:mt-1">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TILE 4: Pricing & Actions */}
              <div className="lg:col-span-4 border border-brandNavy/6 rounded-xl bg-brandNavy/95 text-white p-5 sm:p-6 flex flex-col justify-between shadow-glowNavy relative overflow-hidden">
                <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 h-32 w-32 rounded-full bg-brandRed/10 blur-xl pointer-events-none" />
                
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Pricing &amp; Details</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black tracking-tight">{currentService.priceRange}</span>
                  </div>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed">
                    A flat structure with zero hidden or recurring monthly retainers. All invoices are provided with a complete tax breakdown.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-white/95 border-t border-white/10 pt-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brandYellow shrink-0" />
                      <span>Dedicated Case Analyst</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brandYellow shrink-0" />
                      <span>RBI Dispute ID tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brandYellow shrink-0" />
                      <span>NOC validity confirmation</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 space-y-2.5">
                  <Link href="/contact" className="w-full block">
                    <button
                      type="button"
                      className="w-full h-11 bg-white text-brandNavy hover:bg-white/95 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 active:scale-[0.97] flex items-center justify-center shadow-sm"
                    >
                      Book Case Assessment
                    </button>
                  </Link>
                  <a href="tel:+916350671636" className="w-full block">
                    <button
                      type="button"
                      className="w-full h-11 border border-white/20 bg-transparent text-white hover:bg-white/5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5"
                    >
                      <Phone className="h-4 w-4 text-white/70" /> 
                      <span>Talk to Advisor</span>
                    </button>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </Reveal>
      </section>

      {/* 3. CAPABILITY MATRIX */}
      <section className="mt-24">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Capability Matrix</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              Primescore vs Competitors vs DIY
            </h2>
            <p className="mt-2 text-sm text-textSecondary max-w-xl mx-auto">
              How our structured, legally-backed escalation pipeline compares to manual or generic options.
            </p>
          </div>
        </Reveal>

        {/* Desktop Table View */}
        <div className="mt-6 hidden overflow-hidden rounded-xl border border-brandNavy/8 bg-white sm:block shadow-card">
          <div className="grid grid-cols-4 gap-0 border-b border-brandNavy/8 bg-brandNavy text-white text-sm font-bold">
            <div className="p-5">Audit &amp; Filing Capabilities</div>
            <div className="p-5 bg-brandNavy/95 text-brandYellow flex items-center gap-1.5">
              <span>Primescore Advantage</span>
            </div>
            <div className="p-5 opacity-70">DIY (Do It Yourself)</div>
            <div className="p-5 opacity-70">Other Platforms</div>
          </div>
          {[
            { k: 'Line-by-line detailed bureau audit', a: 'Yes (expert reviewed)', b: 'Time-consuming', c: 'Inconsistent' },
            { k: 'Evidence pack + custom legal drafting', a: 'Yes (RBI & CIC Act backed)', b: 'Very complex to draft', c: 'Basic boilerplate templates' },
            { k: 'Reference ID & escalation tracking', a: 'Provided on client dashboard', b: 'Manual tracking with banks', c: 'No real-time visibility' },
            { k: 'Multi-institutional follow-ups', a: 'Structured automated alerts', b: 'Often dropped or ignored', c: 'Limited support tickets' },
            { k: 'Minimal-access data confidentiality', a: 'iStart Govt recognized security', b: 'N/A (your own files)', c: 'Varies widely' },
          ].map((row) => (
            <div key={row.k} className="grid grid-cols-4 gap-0 border-b border-brandNavy/6 text-sm last:border-b-0 text-textSecondary">
              <div className="p-5 font-semibold text-brandNavy">{row.k}</div>
              <div className="p-5 font-bold text-brandGreen bg-brandRed/[0.005] flex items-center gap-1.5">
                <Check className="h-4.5 w-4.5 text-brandGreen shrink-0" />
                <span>{row.a}</span>
              </div>
              <div className="p-5 text-textSecondary">{row.b}</div>
              <div className="p-5 text-textSecondary">{row.c}</div>
            </div>
          ))}
        </div>

        {/* Mobile Comparison Cards */}
        <div className="mt-6 grid gap-4 sm:hidden">
          {[
            { k: 'Line-by-line detailed bureau audit', a: 'Yes (expert reviewed)', b: 'Time-consuming', c: 'Inconsistent' },
            { k: 'Evidence pack + custom legal drafting', a: 'Yes (RBI & CIC Act backed)', b: 'Very complex to draft', c: 'Basic boilerplate templates' },
            { k: 'Reference ID & escalation tracking', a: 'Provided on client dashboard', b: 'Manual tracking with banks', c: 'No real-time visibility' },
            { k: 'Multi-institutional follow-ups', a: 'Structured automated alerts', b: 'Often dropped or ignored', c: 'Limited support tickets' },
            { k: 'Minimal-access data confidentiality', a: 'iStart Govt recognized security', b: 'N/A', c: 'Varies widely' },
          ].map((row) => (
            <div key={row.k} className="rounded-xl border border-brandNavy/8 bg-white p-5 shadow-sm">
              <div className="text-sm font-bold text-brandNavy">{row.k}</div>
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-dashed border-brandNavy/5 pb-2">
                  <span className="text-textSecondary font-medium">Primescore:</span>
                  <span className="font-bold text-brandGreen flex items-center gap-1">
                    <Check className="h-4.5 w-4.5 text-brandGreen" /> {row.a}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-dashed border-brandNavy/5 pb-2">
                  <span className="text-textSecondary font-medium">DIY:</span>
                  <span className="text-textSecondary">{row.b}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-textSecondary font-medium">Others:</span>
                  <span className="text-textSecondary">{row.c}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="mt-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Answers</p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-textSecondary leading-relaxed">
                Learn more about RBI regulations, bureau timelines, and how the legal dispute mechanism works in India.
              </p>
            </div>
            
            <div className="lg:col-span-8 bg-white rounded-xl border border-brandNavy/8 px-6 sm:px-8 shadow-card">
              <FAQAccordion items={faqs} dark={false} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 5. DYNAMIC CTA SECTION */}
      <section className="mt-24">
        <Reveal>
          <div className="relative rounded-2xl border border-brandNavy/10 bg-brandNavy p-8 sm:p-12 text-white overflow-hidden shadow-glowNavy">
            {/* Background vector decorations */}
            <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-brandRed/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-brandBlue/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-brandYellow mb-4">
                  <Info className="h-3.5 w-3.5" />
                  <span>Free Initial CIBIL Health Assessment</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                  Not sure which service resolves your CIBIL errors?
                </h3>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  Upload your credit report for a secure, line-by-line audit. A Primescore credit consultant will map your exact CIBIL anomalies to the right legal dispute pipeline in one brief call.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link href="/contact" className="w-full">
                  <button
                    type="button"
                    className="w-full h-12 bg-white text-brandNavy hover:bg-white/95 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 active:scale-[0.97] flex items-center justify-center shadow-sm"
                  >
                    Book Free Assessment
                  </button>
                </Link>
                <a href="https://wa.me/916350671636" target="_blank" rel="noopener noreferrer" className="w-full">
                  <button
                    type="button"
                    className="w-full h-12 border border-white/20 text-white hover:bg-white/5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4.5 w-4.5 text-brandGreen" /> 
                    <span>WhatsApp Support</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
