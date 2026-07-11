'use client'

import React from 'react'
import Reveal from '../../../src/components/ui/Reveal'

export default function VendorTrackingPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 sm:px-8 pt-32 pb-24">
      <Reveal>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600">
          RISK MONITORING
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-brandNavy sm:text-5xl">
          Vendor Credit Risk Monitoring
        </h1>
        <p className="mt-6 text-base text-textSecondary max-w-2xl leading-relaxed">
          Monitor the financial stability of critical suppliers and customers dynamically. Avoid supply chain disruptions before credit defaults impact your business.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border border-slate-100 p-8 rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brandNavy">Risk Dashboard</h3>
          <p className="text-xs leading-relaxed text-textSecondary mt-2">
            Real-time rating monitoring dashboard for major vendors and trade counterparties.
          </p>
        </div>
        <div className="border border-slate-100 p-8 rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brandNavy">Default Alerts</h3>
          <p className="text-xs leading-relaxed text-textSecondary mt-2">
            Instant updates on score fluctuations, warning signals, or write-off filings.
          </p>
        </div>
        <div className="border border-slate-100 p-8 rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brandNavy">Trade Credit Evaluation</h3>
          <p className="text-xs leading-relaxed text-textSecondary mt-2">
            Analytical evaluation report modules to optimize limits before finalizing supplier agreements.
          </p>
        </div>
      </div>
    </div>
  )
}
