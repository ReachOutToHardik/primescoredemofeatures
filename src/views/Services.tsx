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
  FileText
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
    'Drafts proper settlement proposals for court cases',
    'Deletes the active "Suit Filed" marker post-resolution'
  ]
}

const TABS = [
  { id: 'rectification', label: 'CIBIL Error Rectification', subtitle: 'Fix incorrect data & late payments', icon: ShieldCheck },
  { id: 'settlement', label: 'Loan Settlement Negotiation', subtitle: 'Close settled status correctly', icon: Handshake },
  { id: 'card-disputes', label: 'Written-Off Resolution', subtitle: 'Clear active default & loss markers', icon: FileWarning },
  { id: 'emi', label: 'Suit Filed Assistance', subtitle: 'Remove legal litigation case tags', icon: Wallet },
  { id: 'monitoring', label: 'Score Monitoring & Alerts', subtitle: 'Detect fraud & unauthorized queries', icon: Activity },
  { id: 'coaching', label: '750+ CIBIL Score Coaching', subtitle: 'Personal finance habits & advice', icon: LineChart },
]

const serviceMockups: Record<string, {
  accountName: string
  badLabel: string
  badValue: string
  goodLabel: string
  goodValue: string
  issueDescription: string
  seoHeading: string
  seoBody: string
}> = {
  rectification: {
    accountName: 'Personal Loan / Credit Card',
    badLabel: 'Late Payments (DPD)',
    badValue: '30 / 60 Days Overdue ❌',
    goodLabel: 'Corrected Status',
    goodValue: '000 (No Dues / Current) ✅',
    issueDescription: 'Incorrect late payment entries reported by the bank due to processing delays or technical glitches.',
    seoHeading: 'Fix Incorrect CIBIL Late Payments & DPD Records',
    seoBody: 'If you paid your EMI on time but the bank mistakenly reported a delay, we file legal disputes to correct your payment history and rebuild your credit score.'
  },
  settlement: {
    accountName: 'Settled Credit Card / Loan',
    badLabel: 'Account Status',
    badValue: 'Settled (Blocks Loans for 7 Years) ❌',
    goodLabel: 'Corrected Status',
    goodValue: 'Closed / No Dues (Clean Profile) ✅',
    issueDescription: 'You settled a loan with a bank, but the "Settled" tag remains on CIBIL, causing future loan rejections.',
    seoHeading: 'Remove Negative "Settled" Status From CIBIL Report',
    seoBody: 'We help you negotiate proper closure terms with your bank, secure a valid No Objection Certificate (NOC), and legally dispute old settlement markers.'
  },
  'card-disputes': {
    accountName: 'Written-Off Credit Card',
    badLabel: 'Account Status',
    badValue: 'Written-off (Severe Default) ❌',
    goodLabel: 'Corrected Status',
    goodValue: 'Closed / Post-Settled NOC ✅',
    issueDescription: 'The bank wrote off your outstanding balance as a loss. This severe status completely stops new loan approvals.',
    seoHeading: 'Resolve Written-Off Status & CIBIL Default Records',
    seoBody: 'We coordinate with bank recovery teams, resolve the underlying balance dispute, obtain clearance NOCs, and update the status to "Closed".'
  },
  emi: {
    accountName: 'Litigated Banking Account',
    badLabel: 'Legal Status',
    badValue: 'Suit Filed (Active Court Case) ❌',
    goodLabel: 'Corrected Status',
    goodValue: 'Suit Withdrawn / Account Closed ✅',
    issueDescription: 'The bank has filed a legal court case against you, which is visible on your CIBIL profile and blocks all credit.',
    seoHeading: 'Remove Suit Filed Markers From Credit Profile',
    seoBody: 'We assist you in drafting settlement proposals for bank advocates, coordinate litigation withdrawal, and remove the "Suit Filed" marker.'
  },
  monitoring: {
    accountName: 'Your PAN & Personal Identity',
    badLabel: 'Active Enquiries',
    badValue: '12 Unknown Inquiries (High Risk) ❌',
    goodLabel: 'Corrected Status',
    goodValue: 'Inquiries Cleaned & Monitored ✅',
    issueDescription: 'Identity theft, fake loans registered in your name, or credit bureaus tracking excessive bank searches.',
    seoHeading: 'Track CIBIL Score & Catch Fraudulent Inquiries',
    seoBody: 'We configure real-time alerts. If a financial institution checks your credit profile or opens an account without your consent, you can block it.'
  },
  coaching: {
    accountName: 'Overall Credit Profile',
    badLabel: 'CIBIL Score',
    badValue: '620 (Low Loan Eligibility) ❌',
    goodLabel: 'Target CIBIL',
    goodValue: '750+ (Excellent Credit Health) ✅',
    issueDescription: 'No major defaults or legal issues, but your credit score remains stuck and you keep getting rejected.',
    seoHeading: '90-Day Credit Builder Guide to Cross 750+',
    seoBody: 'Work one-on-one with Indian credit experts. We design a simple plan to pay credit card bills correctly, mix loans safely, and increase your score.'
  }
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('rectification')
  
  const currentService = services.find((s) => s.id === activeTab) || services[0]
  const currentMockup = serviceMockups[activeTab] || serviceMockups.rectification
  const currentFixes = fixesByService[activeTab] || []

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
            
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-textSecondary">
              Simple, document-backed legal credit repair services in India. We help you dispute incorrect late payments, 
              negotiate loan closures, remove negative defaults, and resolve court markers from your credit history.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-brandNavy/75 border-b border-brandNavy/10 pb-8">
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

      {/* 2. INTERACTIVE SERVICE CONSOLE */}
      <section className="mt-16">
        <Reveal>
          <div className="rounded-2xl border border-brandNavy/8 bg-white p-6 sm:p-8 lg:p-10 shadow-card">
            <div className="mb-8 border-b border-brandNavy/5 pb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Interactive Troubleshooter</span>
              <h2 className="mt-2 font-display text-2xl font-black tracking-tight text-brandNavy sm:text-3xl">
                CIBIL Resolution Command Center
              </h2>
              <p className="mt-1.5 text-sm text-textSecondary max-w-2xl">
                Select your credit issue on the left to see exactly how Primescore resolves it, what we fix, and the detailed resolution roadmap.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Left Column: Vertical Custom Navigation Tabs */}
              <div className="lg:col-span-4 space-y-2">
                {/* Desktop Tabs */}
                <div className="hidden lg:block space-y-2">
                  {TABS.map((tab) => {
                    const TabIcon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={[
                          'w-full text-left p-4 rounded-xl border transition-all duration-200 outline-none flex items-center gap-4 group',
                          isActive
                            ? 'border-brandNavy/15 bg-brandNavy/[0.03] shadow-sm font-semibold'
                            : 'border-transparent hover:bg-brandNavy/[0.01] hover:border-brandNavy/5'
                        ].join(' ')}
                      >
                        <div className={[
                          'p-2 rounded-lg transition-colors',
                          isActive ? 'bg-brandRed text-white shadow-glowRed' : 'bg-brandNavy/5 text-brandNavy/60 group-hover:bg-brandNavy/10'
                        ].join(' ')}>
                          <TabIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-brandNavy truncate">{tab.label}</div>
                          <div className="text-xs text-textSecondary truncate">{tab.subtitle}</div>
                        </div>
                        <ChevronRight className={[
                          'h-4 w-4 text-brandNavy/35 transition-transform group-hover:translate-x-0.5',
                          isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
                        ].join(' ')} />
                      </button>
                    )
                  })}
                </div>

                {/* Mobile Horizontal Pill Scroll */}
                <div className="lg:hidden flex gap-2.5 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 scroll-smooth">
                  {TABS.map((tab) => {
                    const TabIcon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={[
                          'flex items-center gap-2 px-4 py-3 rounded-full border text-xs font-bold whitespace-nowrap shrink-0 transition-all outline-none',
                          isActive
                            ? 'bg-brandNavy text-white border-brandNavy'
                            : 'bg-white text-brandNavy border-brandNavy/10 hover:border-brandNavy/25'
                        ].join(' ')}
                      >
                        <TabIcon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Dynamic Deep-Dive Console */}
              <div className="lg:col-span-8 border border-brandNavy/8 rounded-xl bg-brandNavy/[0.005] p-5 sm:p-8">
                {/* Heading */}
                <h3 className="font-display text-xl sm:text-2xl font-black text-brandNavy tracking-tight">
                  {currentMockup.seoHeading}
                </h3>
                
                {/* Explanation */}
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-textSecondary">
                  {currentMockup.seoBody}
                </p>

                {/* Visual Before/After Credit Report Preview */}
                <div className="mt-6 rounded-xl border border-brandNavy/10 bg-brandNavy/[0.01] p-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-brandNavy/5 pb-2.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-textSecondary flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Credit Report simulator</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase text-brandRed bg-brandRed/10 px-2 py-0.5 rounded">
                      CIBIL audit
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Before Card */}
                    <div className="rounded-lg border border-red-100 bg-red-50/40 p-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brandRed">Report Status (Before)</div>
                      <div className="mt-2 font-display text-sm font-bold text-brandNavy">{currentMockup.accountName}</div>
                      <div className="mt-4 flex flex-col gap-1 text-xs">
                        <span className="text-textSecondary">{currentMockup.badLabel}:</span>
                        <span className="font-bold text-brandRed">{currentMockup.badValue}</span>
                      </div>
                    </div>

                    {/* After Card */}
                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 h-10 w-10 rounded-full bg-brandGreen/10" />
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brandGreen">Report Status (After Primescore)</div>
                      <div className="mt-2 font-display text-sm font-bold text-brandNavy">{currentMockup.accountName}</div>
                      <div className="mt-4 flex flex-col gap-1 text-xs">
                        <span className="text-textSecondary">{currentMockup.goodLabel}:</span>
                        <span className="font-bold text-brandGreen">{currentMockup.goodValue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-start gap-2 text-xs text-textSecondary bg-brandNavy/[0.03] p-3 rounded-lg">
                    <Info className="h-4.5 w-4.5 text-brandBlue shrink-0 mt-0.5" />
                    <span>
                      <strong>Report Issue:</strong> {currentMockup.issueDescription}
                    </span>
                  </div>
                </div>

                {/* What We Resolve (The Checklist) */}
                <div className="mt-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brandNavy/40 mb-3.5">
                    What Primescore Resolves:
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {currentFixes.map((fix) => (
                      <li key={fix} className="flex items-start gap-2.5 text-xs sm:text-sm text-brandNavy/80">
                        <CheckCircle2 className="h-4.5 w-4.5 text-brandGreen shrink-0 mt-0.5" />
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal Resolution Pipeline (Timeline) */}
                <div className="mt-8 pt-8 border-t border-brandNavy/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brandNavy/40 mb-5 flex items-center gap-1.5">
                    <span>Legal Escalation Milestones</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-brandNavy/20"></span>
                    <span className="text-[10px] lowercase text-textSecondary font-normal">
                      tracked live on dashboard
                    </span>
                  </h4>

                  <div className="relative border-l border-brandNavy/10 pl-5 ml-2.5 space-y-6">
                    {currentService.timeline.map((step, sIdx) => (
                      <div key={step.title} className="relative group/step">
                        {/* Bullet point node */}
                        <div className="absolute -left-[26px] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-white border-2 border-brandNavy/35 group-hover/step:border-brandRed transition-colors">
                          <div className="h-1 w-1 rounded-full bg-brandNavy/10" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-mono text-[9px] font-bold text-brandNavy/40">STAGE 0{sIdx + 1}</span>
                            <span className="font-mono text-[9px] font-semibold text-brandRed bg-brandRed/10 px-1.5 py-0.25 rounded">
                              {step.eta}
                            </span>
                          </div>
                          <h5 className="mt-0.5 font-display text-sm font-bold text-brandNavy leading-tight">
                            {step.title}
                          </h5>
                          <p className="mt-1 text-xs leading-relaxed text-textSecondary">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transparency Pricing & CTAs */}
                <div className="mt-8 pt-8 border-t border-brandNavy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 block">Pricing Range</span>
                    <span className="text-lg font-black text-brandNavy">{currentService.priceRange}</span>
                    <span className="text-[10px] text-textSecondary block">No hidden fees, full invoice transparency</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                    <Link href="/contact" className="w-full sm:w-auto">
                      <Button variant="primary" className="w-full h-11 text-xs sm:text-sm shadow-glowRed">
                        Book Case Assessment
                      </Button>
                    </Link>
                    <a href="tel:+916350671636" className="w-full sm:w-auto">
                      <button
                        type="button"
                        className="w-full sm:w-auto h-11 border border-brandNavy/15 bg-transparent text-brandNavy hover:bg-brandNavy/[0.04] rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1.5"
                      >
                        <Phone className="h-4 w-4 text-brandNavy/65" /> 
                        <span>Talk to Advisor</span>
                      </button>
                    </a>
                  </div>
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
