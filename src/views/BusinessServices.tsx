'use client'

import React, { useState } from 'react'
import {
  ShieldCheck,
  Building,
  UserCheck,
  Search,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  FileText,
  Briefcase
} from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Link from 'next/link'

const B2B_SERVICES = [
  {
    id: 'audit',
    title: 'Commercial CIBIL Audit',
    tag: 'REGULATORY & ERRORS',
    description: 'Line-by-line review of your Company Credit Report (CCR). We identify duplicate profiles, registry mismatch records, and disputed loan lines that hamper bank approval.',
    icon: ShieldCheck,
    deliverables: [
      'Comprehensive registry error verification mapping',
      'Evidence file formulation with supporting documents',
      'Direct dispute communication drafts & filing assistance',
      'Director-level and company credit reports dual audit'
    ]
  },
  {
    id: 'vendor',
    title: 'Vendor Credit Monitoring',
    tag: 'RISK MANAGEMENT',
    description: 'Track the credit performance of critical suppliers, vendors, and clients. Protect your supply chain from sudden defaults or credit deterioration.',
    icon: Search,
    deliverables: [
      'Automated credit score updates on key vendor profiles',
      'Early warning signals on negative filings or classification changes',
      'Custom risk threshold notifications',
      'Quarterly portfolio health check reports'
    ]
  },
  {
    id: 'director',
    title: 'Director Score Alignment',
    tag: 'PERSONAL CREDIT FOR BUSINESS',
    description: 'Lenders evaluate personal directors\' scores alongside the commercial report. We audit and rectifiy directors\' files simultaneously to support commercial underwriting.',
    icon: UserCheck,
    deliverables: [
      'Clean linkage mapping between director files & company accounts',
      'Days Past Due (DPD) error rectification on director reports',
      'Reduction of invalid inquiry spikes',
      'Consolidated reports score optimization'
    ]
  }
]

export default function BusinessServices() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'How does Commercial CIBIL Audit differ from consumer credit repair?',
      a: 'Consumer credit repair deals with personal loan histories. A Commercial CIBIL Audit reviews the Company Credit Report (CCR) which involves commercial accounts, partner structures, banking consortia filings, and director guarantees.'
    },
    {
      q: 'How long does vendor risk monitoring take to set up?',
      a: 'Setup takes less than 48 hours. Once you submit the list of vendor entities and authorization forms (where applicable), we initiate baseline monitoring and configure alerts.'
    },
    {
      q: 'Will checking vendor profiles impact their credit score?',
      a: 'No. The monitoring check is processed as a soft audit inquiry. It has zero negative impact on the vendor or supplier\'s credit score.'
    }
  ]

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-slate-50/50 border-b border-slate-100 py-24 sm:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <Reveal>
            <div className="max-w-5xl text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3 block">
                B2B SERVICES
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-brandNavy leading-tight tracking-tight max-w-4xl">
                Premium commercial credit <span className="text-[#2563EB]">rectification & monitoring.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-textSecondary font-light leading-relaxed max-w-2xl">
                We work directly with company credit reports (CCR), resolving registry classification issues, duplicate loan listings, and coordinating score alignments to clear business borrowing pathways.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/business/pricing">
                  <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-xs">
                    View Corporate Pricing
                  </Button>
                </Link>
                <Link href="/business/contact">
                  <Button variant="ghost" className="border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-xs">
                    Talk to an Analyst
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. CORE B2B SERVICES LIST */}
      <section className="py-24 border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <Reveal>
            <div className="max-w-2xl mb-16 text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3 block">
                CAPABILITIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy">
                Engineered for corporate credit profiles
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {B2B_SERVICES.map((service, index) => {
              const Icon = service.icon
              // Set up custom gradients per card type for clean premium visual aesthetics
              const gradientClass = service.id === 'audit' 
                ? 'from-blue-50/70 via-indigo-50/30 to-white' 
                : service.id === 'vendor' 
                ? 'from-emerald-50/50 via-teal-50/20 to-white' 
                : 'from-violet-50/60 via-purple-50/25 to-white'

              const hoverBorderClass = service.id === 'audit' 
                ? 'hover:border-[#2563EB]/40' 
                : service.id === 'vendor' 
                ? 'hover:border-emerald-500/40' 
                : 'hover:border-purple-500/40'

              const iconBgClass = service.id === 'audit' 
                ? 'bg-blue-100/50 text-[#2563EB]' 
                : service.id === 'vendor' 
                ? 'bg-emerald-100/50 text-emerald-600' 
                : 'bg-purple-100/50 text-purple-600'

              return (
                <Reveal key={service.id} delay={index * 0.1}>
                  <div className={`bg-gradient-to-br ${gradientClass} border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group ${hoverBorderClass}`}>
                    <div>
                      <div className={`h-12 w-12 rounded-2xl ${iconBgClass} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#2563EB]">
                        {service.tag}
                      </span>
                      <h3 className="font-display text-xl font-extrabold text-brandNavy mt-2 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-textSecondary font-light leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-brandNavy mb-3">
                        Key Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((item, dIndex) => (
                          <li key={dIndex} className="flex items-start gap-2.5 text-xs text-textSecondary">
                            <span className="text-[#2563EB] font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <Reveal>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3 block">
                  WHY PRIMESCORE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy max-w-xl leading-tight">
                  Registry error mitigation handled by commercial experts
                </h2>
                <p className="mt-6 text-sm sm:text-base text-textSecondary font-light leading-relaxed">
                  Unlike personal files, corporate reports have many points of entry and complexity. Banking consortia, partner credit lines, and corporate registrations must all be mapped accurately.
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brandNavy mb-1">Evidentiary Auditing</h4>
                      <p className="text-[11px] text-textSecondary">We draft documentation mapping directly to CIBIL & CRIF registries.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563EB] shrink-0">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-brandNavy mb-1">Consortia Alignment</h4>
                      <p className="text-[11px] text-textSecondary">Correct duplicate listings across multiple lender networks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 sm:p-10 shadow-sm relative overflow-hidden">
                <h3 className="font-display text-2xl font-black text-brandNavy mb-4">
                  Preliminary Report Review
                </h3>
                <p className="text-xs text-textSecondary leading-relaxed mb-6 font-light">
                  Initiate a baseline review of your Company Credit Report with our corporate desk analysts. No obligations, zero hard inquiries.
                </p>
                <Link href="/business/contact">
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
                    Request Consultation
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="py-24">
        <div className="mx-auto max-w-[800px] px-6 sm:px-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB] mb-3 block">
                FAQ
              </span>
              <h2 className="font-display text-3xl font-black text-brandNavy">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-bold text-sm text-brandNavy hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs text-textSecondary leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
