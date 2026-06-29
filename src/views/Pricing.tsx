'use client'

import { Check } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Link from 'next/link'

export default function Pricing() {
  const plan = {
    name: 'Report Fetch & Lifetime Dashboard Access',
    price: 199,
    description: 'Pull your official credit reports from all four bureaus and store them securely on your interactive dashboard.',
    features: [
      'Official 4-Bureau Report Pull (CIBIL, Experian, Equifax, CRIF)',
      'Lifetime Interactive Dashboard Storage',
      'Detailed Inconsistency & Error Flagging summary',
      'Direct Portal Chat with Credit Experts to review your report',
      'Zero Monthly Subscription Fees or automatic renewals',
      'Minimal-Access Encrypted Document Vault security'
    ]
  }

  const comparisonRows = [
    { 
      metric: 'Pricing Model', 
      primescore: '₹199 One-time (No recurring fees)', 
      freeApps: 'Free (But constant spam & upselling)', 
      agencies: '₹5,000+ Upfront Retainers' 
    },
    { 
      metric: 'Bureaus Pulled', 
      primescore: 'All 4 Bureaus (CIBIL, Experian, Equifax, CRIF)', 
      freeApps: '1 Bureau only', 
      agencies: '1 Bureau only' 
    },
    { 
      metric: 'Data Longevity', 
      primescore: 'Stored securely on your dashboard forever', 
      freeApps: 'Do not store previous data (requires refreshes)', 
      agencies: 'Do not store previous data (static PDF/paper)' 
    },
    { 
      metric: 'Spam Policy', 
      primescore: 'Strict Zero-Spam. We never sell your number.', 
      freeApps: 'Spams you with loan and credit card calls', 
      agencies: 'Inconsistent support spam laws' 
    },
    { 
      metric: 'Expert Review', 
      primescore: 'Direct chat with credit analysts included', 
      freeApps: 'Robotic automated chats only', 
      agencies: 'Available only at high hourly rates' 
    }
  ] as const

  return (
    <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12 pb-24 bg-night">
      
      {/* Left-Aligned Premium Editorial Header */}
      <section className="pt-32 sm:pt-40 max-w-4xl">
        <Reveal>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brandBlue">
              Transparent Pricing
            </span>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-brandNavy sm:text-5xl lg:text-6xl leading-[1.1]">
              One-time fetch. <br className="hidden sm:inline" />
              Lifetime dashboard access.
            </h1>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-textSecondary max-w-2xl">
              Pay ₹199 once to pull your official 4-bureau credit reports and keep them saved securely in your PrimeScore account forever. Zero monthly subscriptions. Zero ad spam.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Main Pricing Grid */}
      <section className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-start">
        
        {/* Left Column: Plan Summary and Call to Action */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <Reveal>
            <div>
              <div className="text-xs font-bold text-brandBlue uppercase tracking-wider mb-2">Pricing Plan</div>
              <h3 className="font-display text-2xl font-bold text-brandNavy leading-tight">{plan.name}</h3>
              <p className="mt-3 text-xs leading-relaxed text-textSecondary">
                {plan.description}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold text-brandNavy tracking-tight">₹199</span>
                  <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">one-time payment</span>
                  <span className="text-[10px] font-semibold text-textSecondary/70">+GST</span>
                </div>
                <p className="mt-2 text-[10px] font-semibold text-textSecondary uppercase tracking-wider">
                  No recurring charges · No automatic renewals
                </p>
                
                <div className="mt-6">
                  <Link href="/contact">
                    <Button as="div" className="w-full py-4 text-center text-sm font-bold shadow-sm">
                      Fetch My Credit Reports
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Detailed feature inclusions */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-full flex flex-col justify-center">
          <Reveal delay={0.05}>
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brandNavy mb-5">
                What is included in your access:
              </h4>
              <ul className="grid gap-4 text-xs sm:text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3.5">
                    <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#10b981]/10 text-[#10b981]">
                      <Check className="h-3.5 w-3.5 stroke-[2.5px]" />
                    </div>
                    <span className="text-brandNavy font-medium leading-normal">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

      </section>

      {/* Trust Guarantees Section */}
      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">Pay Once, Keep Forever</div>
            <p className="text-[11px] text-textSecondary leading-relaxed">No recurring subscriptions or hidden membership cards. Your credit report data stays saved on your dashboard.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">Zero Spams or Ad Leads</div>
            <p className="text-[11px] text-textSecondary leading-relaxed">Unlike free checkers, we do not monetize your scores by selling your contact number to loan brokers or banks.</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">Startup India Recognized</div>
            <p className="text-[11px] text-textSecondary leading-relaxed">Primescore operates as an officially recognized credit consultancy startup under the DPIIT (Govt. of India).</p>
          </div>
        </Reveal>
      </section>

      {/* Comparison Grid */}
      <section className="mt-24">
        <Reveal>
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandBlue">Performance Matrix</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-brandNavy sm:text-4xl">
              How we compare
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-textSecondary leading-relaxed max-w-xl">
              Why thousands of Indian credit builders use PrimeScore instead of free ad-supported check apps.
            </p>
          </div>
        </Reveal>

        {/* Desktop Comparison Table */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white sm:block shadow-sm">
          <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50/50 p-4 text-xs font-bold uppercase tracking-wider text-brandNavy">
            <div className="col-span-3">Feature</div>
            <div className="col-span-3 text-[#10b981]">PrimeScore (₹199 One-time)</div>
            <div className="col-span-3">Free Score Apps</div>
            <div className="col-span-3">Traditional Bureaus</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.metric} className="grid grid-cols-12 border-b border-slate-100 p-4 text-xs last:border-b-0 items-center hover:bg-slate-50/20 transition-colors">
              <div className="col-span-3 font-bold text-brandNavy pr-3">{row.metric}</div>
              <div className="col-span-3 font-semibold text-[#10b981] pr-3 flex items-start gap-1.5">
                <Check className="h-4 w-4 stroke-[3px] shrink-0 text-[#10b981] mt-0.5" />
                <span>{row.primescore}</span>
              </div>
              <div className="col-span-3 text-textSecondary pr-3">{row.freeApps}</div>
              <div className="col-span-3 text-textSecondary">{row.agencies}</div>
            </div>
          ))}
        </div>

        {/* Mobile Comparison Layout */}
        <div className="mt-6 grid gap-4 sm:hidden text-xs">
          {comparisonRows.map((row) => (
            <div key={row.metric} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="font-bold text-brandNavy uppercase tracking-wider mb-2.5">{row.metric}</div>
              <div className="grid gap-2">
                <div className="flex items-start gap-1.5">
                  <span className="text-textSecondary font-medium shrink-0">PrimeScore:</span>
                  <span className="font-semibold text-brandNavy flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 stroke-[3px] text-[#10b981] shrink-0" /> {row.primescore}
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-textSecondary font-medium shrink-0">Free Apps:</span>
                  <span className="text-textSecondary">{row.freeApps}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-textSecondary font-medium shrink-0">Traditional:</span>
                  <span className="text-textSecondary">{row.agencies}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
