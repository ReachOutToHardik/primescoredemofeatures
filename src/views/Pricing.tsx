'use client'

import { Check } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Link from 'next/link'

export default function Pricing() {
  const plan = {
    name: 'PrimeScore Report Fetch & Dashboard Access',
    price: 299,
    description: 'A one-time fee to pull your official credit reports from all four bureaus and keep them securely stored on our interactive dashboard forever.',
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
      primescore: '₹299 One-time (No recurring fees)', 
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
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24">
      {/* Premium minimal header */}
      <section className="pt-28 sm:pt-36 text-center">
        <Reveal>
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center rounded-full bg-brandRed/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-brandRed uppercase">
              One-Time Payment
            </span>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl leading-none">
              One-time fetch. Lifetime dashboard access.
            </h1>
            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-textSecondary">
              Pay ₹299 once to pull your official 4-bureau credit reports and keep them saved securely in your PrimeScore account forever. Zero monthly subscriptions. Zero ad spam.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pricing Card Section */}
      <section className="mt-12 flex justify-center">
        <div className="w-full max-w-4xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brandNavy/8 bg-white p-6 sm:p-10 shadow-card">
              {/* Decorative Subtle Accent Gradient */}
              <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-br from-brandRed/5 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative grid gap-8 md:grid-cols-12 md:items-stretch">
                {/* Left side inside card: Core Pricing & CTA */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-brandNavy">{plan.name}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-textSecondary">
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 md:mt-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-5xl font-black text-brandNavy">₹299</span>
                      <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">one-time payment</span>
                    </div>
                    <p className="mt-1 text-[10px] font-semibold text-textSecondary uppercase tracking-wider">
                      No recurring charges · No automatic renewals
                    </p>
                    
                    <div className="mt-6">
                      <Link href="/contact">
                        <Button as="div" className="w-full py-3.5 text-center text-sm font-bold shadow-glowRed">
                          Fetch My Credit Reports
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider for desktop */}
                <div className="hidden md:block md:col-span-1 border-r border-brandNavy/6 my-2"></div>

                {/* Right side inside card: Detailed feature list */}
                <div className="md:col-span-6 flex flex-col justify-center">
                  <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brandNavy mb-4">
                    What is included:
                  </h4>
                  <ul className="grid gap-3.5 text-xs sm:text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                          <Check className="h-3 w-3 stroke-[2.5px]" />
                        </div>
                        <span className="text-brandNavy font-medium leading-normal">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust guarantees bar */}
      <section className="mt-8 max-w-4xl mx-auto grid gap-4 sm:grid-cols-3">
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-brandNavy/6 bg-night/30 p-4 text-center">
            <div className="text-xs font-bold text-brandNavy uppercase tracking-wider">Pay Once, Keep Forever</div>
            <div className="mt-1 text-[11px] text-textSecondary leading-relaxed">No recurring subscriptions or hidden membership cards. Your credit report data stays saved on your dashboard.</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-brandNavy/6 bg-night/30 p-4 text-center">
            <div className="text-xs font-bold text-brandNavy uppercase tracking-wider">Zero Spams or Ad Leads</div>
            <div className="mt-1 text-[11px] text-textSecondary leading-relaxed">Unlike free checkers, we do not monetize your scores by selling your contact number to loan brokers or banks.</div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-brandNavy/6 bg-night/30 p-4 text-center">
            <div className="text-xs font-bold text-brandNavy uppercase tracking-wider">Startup India Recognized</div>
            <div className="mt-1 text-[11px] text-textSecondary leading-relaxed">Primescore operates as an officially recognized credit consultancy startup under the DPIIT (Govt. of India).</div>
          </div>
        </Reveal>
      </section>

      {/* Comparison Grid */}
      <section className="mt-20 max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Compare</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              How we compare
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-textSecondary leading-relaxed">
              Why thousands of Indian credit builders use PrimeScore instead of free ad-supported check apps.
            </p>
          </div>
        </Reveal>

        {/* Desktop Comparison Table */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-brandNavy/8 bg-white sm:block">
          <div className="grid grid-cols-12 border-b border-brandNavy/8 bg-night/60 p-4 text-xs font-semibold uppercase tracking-wider text-brandNavy">
            <div className="col-span-3">Feature</div>
            <div className="col-span-3 text-success font-bold">PrimeScore (₹299 One-time)</div>
            <div className="col-span-3">Free Score Apps</div>
            <div className="col-span-3">Traditional Bureaus</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.metric} className="grid grid-cols-12 border-b border-brandNavy/6 p-4 text-xs last:border-b-0 items-center">
              <div className="col-span-3 font-bold text-brandNavy pr-3">{row.metric}</div>
              <div className="col-span-3 font-semibold text-success pr-3 flex items-start gap-1.5">
                <Check className="h-3.5 w-3.5 stroke-[3px] shrink-0 text-success" />
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
            <div key={row.metric} className="rounded-xl border border-brandNavy/8 bg-white p-4">
              <div className="font-bold text-brandNavy uppercase tracking-wider mb-2.5">{row.metric}</div>
              <div className="grid gap-2">
                <div className="flex items-start gap-1.5">
                  <span className="text-textSecondary font-medium shrink-0">PrimeScore:</span>
                  <span className="font-semibold text-brandNavy flex items-center gap-1">
                    <Check className="h-3 w-3 stroke-[3px] text-success shrink-0" /> {row.primescore}
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
