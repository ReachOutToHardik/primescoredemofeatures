'use client'

import React from 'react'
import Reveal from '../../../src/components/ui/Reveal'

export default function CibilAuditPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 sm:px-8 pt-32 pb-24">
      <Reveal>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">
          COMMERCIAL SOLUTIONS
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-brandNavy sm:text-5xl">
          Commercial CIBIL Profile Audits
        </h1>
        <p className="mt-6 text-base text-textSecondary max-w-2xl leading-relaxed">
          Dispute inaccurate account classifications, resolve duplicated loan lines, and reconcile PAN mapping errors across Indian business credit bureaus.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border border-slate-100 p-8 rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brandNavy">Profile Scrubbing</h3>
          <p className="text-xs leading-relaxed text-textSecondary mt-2">
            Detailed scrubbing of Company Credit Reports to flag wrong addresses and data conflicts.
          </p>
        </div>
        <div className="border border-slate-100 p-8 rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brandNavy">Duplicate Account Merges</h3>
          <p className="text-xs leading-relaxed text-textSecondary mt-2">
            Consolidating duplicate loan listings that negatively affect your credit limit capacity.
          </p>
        </div>
        <div className="border border-slate-100 p-8 rounded-2xl bg-white shadow-sm">
          <h3 className="text-lg font-bold text-brandNavy">PAN Link Corrections</h3>
          <p className="text-xs leading-relaxed text-textSecondary mt-2">
            Resolving wrong credit accounts linked to your business due to manual PAN entry mistakes.
          </p>
        </div>
      </div>
    </div>
  )
}
