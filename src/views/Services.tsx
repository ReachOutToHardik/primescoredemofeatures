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
  Scale,
  Clock,
  Check,
  Info,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { services } from '../data/primescore'
import FAQAccordion from '../components/ui/FAQAccordion'
import CreditImpactCalculator from '../components/ui/CreditImpactCalculator'

const iconById = {
  rectification: ShieldCheck,
  settlement: Handshake,
  'card-disputes': FileWarning,
  monitoring: Activity,
  coaching: LineChart,
  emi: Scale,
} as const

const imageById = {
  rectification: '/service/1779181760377-905109645-CIBIL-Score-Rectification.jpeg',
  settlement: '/service/1779181760372-867672048-Loan-Settlement-Negotiation.jpeg',
  'card-disputes': '/service/1779181760370-183828100-Written-off-Account-Resolution.jpeg',
  monitoring: '/service/1779181760448-994722974-Credit-Report-Monitoring.jpeg',
  coaching: '/service/1779181760374-904786478-Personal-Finance-Coaching.jpeg',
  emi: '/service/1779181760376-7477191-Suit-Filed-Case-Assistance.jpeg',
} as const

const comparisonRows = [
  { k: 'Line-by-line bureau audit', a: 'Yes (expert reviewed)', b: 'Time-consuming', c: 'Inconsistent' },
  { k: 'Evidence pack + legal drafting', a: 'Yes', b: 'Hard', c: 'Template-level' },
  { k: 'Tracking reference IDs', a: 'Dashboard', b: 'Manual', c: 'Partial' },
  { k: 'Escalations & follow-ups', a: 'Structured', b: 'Often skipped', c: 'Limited' },
  { k: 'Confidential handling', a: 'Minimal-access', b: 'N/A', c: 'Varies' },
] as const

const faqs = [
  {
    q: 'What is credit score rectification?',
    a: 'Credit score rectification (or credit repair) is the legal process of disputing inaccurate, outdated, or unverifiable entries on your credit report. We correct false late payments and errors to improve your overall CIBIL score.',
  },
  {
    q: 'How long does CIBIL dispute resolution take?',
    a: 'Under RBI guidelines, bureaus and banks have 30 days to resolve a dispute. Most simple errors are fixed in 30-45 days, while complex cases like loan settlements may take 60-90 days.',
  },
  {
    q: 'Can incorrect late payments (DPD) be removed?',
    a: 'Yes. If a late payment or Days Past Due (DPD) was marked incorrectly due to a bank error or technical glitch, we can file a legal dispute to have it completely removed from your credit history.',
  },
  {
    q: 'Does loan settlement affect my CIBIL score?',
    a: 'Yes, a "Settled" status damages your score for up to 7 years because the loan was closed for less than the total amount due. We help negotiate proper closures and dispute invalid settlement markers.',
  },
  {
    q: 'How much CIBIL score improvement is possible?',
    a: 'Removing a single false late payment can boost your score by 20-50 points. For major errors like false defaults, clients often see improvements of over 100 points, rapidly crossing the 750+ mark.',
  },
  {
    q: 'How does Primescore help fix my credit?',
    a: 'Primescore is India’s trusted credit consultancy. We legally dispute errors directly with banks and bureaus, and provide a live dashboard so you can track your CIBIL score recovery in real-time.',
  },
]

export default function Services() {
  const [activeTimelineId, setActiveTimelineId] = useState('rectification')

  const activeService = services.find((s) => s.id === activeTimelineId) || services[0]

  const handleScrollToTimeline = (serviceId: string) => {
    setActiveTimelineId(serviceId)
    const element = document.getElementById('timelines-section')
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24 text-brandNavy bg-night">
      {/* 1. HERO / CORE OFFERINGS HEADER */}
      <section className="pt-24 sm:pt-36">
        <Reveal>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">OUR OFFERINGS</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              Primescore core rectifications
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              Select an offering to explore detailed information, and click <span className="text-[#2563EB] font-bold">"View timeline"</span> to see exactly how our expert advisors map milestones for bureau resolution.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 2. SERVICES CARDS GRID */}
      <section className="mt-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const Icon = iconById[s.id as keyof typeof iconById]
            const isPopular = s.id === 'rectification'
            return (
              <Reveal key={s.id} delay={idx * 0.04}>
                <div className="group flex flex-col rounded-3xl border border-brandNavy/8 bg-white p-5 shadow-card hover:shadow-elevated transition-all duration-300 h-full">
                  {/* Card Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-night/5 mb-6">
                    <img 
                      src={imageById[s.id as keyof typeof imageById]} 
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Floating Icon Badge */}
                    <div className="absolute bottom-3.5 left-3.5 grid h-12 w-12 place-items-center rounded-full bg-white text-[#2563EB] shadow-md">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </div>
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute top-3.5 right-3.5 rounded-full bg-white px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563EB] shadow-sm">
                        POPULAR
                      </div>
                    )}
                  </div>

                  <div className="flex-1 px-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-brandNavy leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-textSecondary">{s.description}</p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-brandNavy/5">
                    <button
                      type="button"
                      onClick={() => handleScrollToTimeline(s.id)}
                      className="flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors outline-none"
                    >
                      <span>View milestone timeline</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 3. COMPARISON MATRIX */}
      <section className="mt-24">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">COMPARISON</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              Primescore vs DIY vs other platforms
            </h2>
            <p className="mt-4 text-sm text-textSecondary max-w-xl mx-auto leading-relaxed">
              See how the direct expert intervention at Primescore compares against navigating credit resolution alone or with generic templates.
            </p>
          </div>
        </Reveal>

        {/* Desktop Table View */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-brandNavy/8 bg-white sm:block shadow-card">
          <div className="grid grid-cols-4 gap-0 border-b border-brandNavy/8 bg-[#F8FAFC] text-left text-sm font-bold text-brandNavy">
            <div className="p-5 uppercase tracking-wider text-xs">Capability</div>
            <div className="p-5 text-[#2563EB] flex items-center gap-1.5 bg-[#F0F5FF]/30">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]"></span>
              <span>PRIMESCORE</span>
            </div>
            <div className="p-5 opacity-70 uppercase tracking-wider text-xs">DIY (DO-IT-YOURSELF)</div>
            <div className="p-5 opacity-70 uppercase tracking-wider text-xs">OTHER PLATFORMS</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.k} className="grid grid-cols-4 gap-0 border-b border-brandNavy/6 text-sm last:border-b-0 text-textSecondary">
              <div className="p-5 font-bold text-brandNavy">{row.k}</div>
              <div className="p-5 font-bold text-brandGreen bg-[#F0F5FF]/20 flex items-center gap-1.5">
                <span className="text-[#63A831]">✓</span> {row.a}
              </div>
              <div className="p-5 text-textSecondary">{row.b}</div>
              <div className="p-5 text-textSecondary">{row.c}</div>
            </div>
          ))}
          {/* Dark Footer Bar */}
          <div className="bg-[#0B0F19] text-white p-5 text-xs font-semibold flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-white/60 text-sm">ⓘ</span>
              <span>Expert reviews and line-by-line documentation drafts are completely compiled in our in-house secure registry.</span>
            </div>
            <div className="text-brandGreen font-bold tracking-wider uppercase">
              100% COMPLIANT INTERVENTIONS
            </div>
          </div>
        </div>

        {/* Mobile Comparison Cards */}
        <div className="mt-10 grid gap-3 sm:hidden">
          {comparisonRows.map((row) => (
            <div key={row.k} className="rounded-xl border border-brandNavy/8 bg-white p-4 shadow-sm">
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

      {/* 4. TIMELINE ACCORDION / TABS */}
      <section className="mt-24" id="timelines-section">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              A clear timeline for every service
            </h2>
            <p className="mt-4 text-sm text-textSecondary max-w-3xl mx-auto leading-relaxed">
              We operate transparently. Click on any of our 6 service categories below to trace every single chronological step, reference point, and negotiation milestone we manage on your behalf.
            </p>
          </div>
        </Reveal>

        {/* Tabs Bar */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap lg:flex-nowrap justify-center gap-2 p-1.5 rounded-full bg-brandNavy/[0.03] border border-brandNavy/5 max-w-full overflow-x-auto no-scrollbar">
            {services.map((s) => {
              const isActive = activeTimelineId === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveTimelineId(s.id)}
                  className={[
                    'px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 outline-none',
                    isActive
                      ? 'bg-[#0B0F19] text-white shadow-md'
                      : 'text-textSecondary hover:text-brandNavy'
                  ].join(' ')}
                >
                  {s.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline Bento Grid Panel */}
        <div className="mt-8 rounded-3xl border border-brandNavy/8 bg-white p-6 sm:p-10 shadow-card">
          <Reveal key={activeTimelineId}>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brandBlue/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brandBlue mb-4">
                <Clock className="h-3.5 w-3.5" />
                <span>FULL RESOLUTION TRACK</span>
              </div>

              <h3 className="font-display text-2xl font-black text-brandNavy">{activeService.title} Timeline</h3>
              <p className="mt-3 text-sm leading-relaxed text-textSecondary max-w-3xl">{activeService.description}</p>

              {/* Steps Horizontal Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {activeService.timeline.map((step, sIdx) => (
                  <div key={step.title} className="rounded-2xl border border-brandNavy/8 bg-[#F8FAFC] p-5 flex flex-col justify-between h-full hover:shadow-sm hover:border-[#2563EB]/35 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brandBlue bg-brandBlue/10 px-2.5 py-1 rounded-full">
                        {step.eta}
                      </span>
                      <span className="font-mono text-sm font-bold text-brandBlue">
                        0{sIdx + 1}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-display text-base font-bold text-brandNavy leading-snug">{step.title}</h5>
                      <p className="mt-2 text-xs leading-relaxed text-textSecondary">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. CALCULATOR SECTION */}
      <section className="mt-24">
        <Reveal>
          <CreditImpactCalculator />
        </Reveal>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="mt-24">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">Answers</p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-textSecondary leading-relaxed">
                Learn more about RBI regulations, bureau timelines, and how the legal dispute mechanism works in India.
              </p>
            </div>
            
            <div className="lg:col-span-8 bg-white rounded-2xl border border-brandNavy/8 px-6 sm:px-8 shadow-card">
              <FAQAccordion items={faqs} dark={false} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7. Bottom CTA SECTION */}
      <section className="mt-24">
        <Reveal>
          <div className="relative rounded-[2.5rem] border border-brandNavy/10 bg-brandNavy p-8 sm:p-12 text-white overflow-hidden shadow-glowNavy">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-brandRed/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-brandBlue/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-brandYellow mb-4">
                  <Info className="h-3.5 w-3.5 text-brandYellow" />
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
