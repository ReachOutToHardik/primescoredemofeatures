'use client'

import { useState } from 'react'

export default function CreditImpactCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000) // 50 Lakhs
  const [tenureYears, setTenureYears] = useState(20) // 20 years

  const badRate = 12.5
  const goodRate = 8.5

  // EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]
  // P = Principal, R = Monthly Interest Rate, N = Number of Months
  const calculateEMI = (principal: number, rate: number, years: number) => {
    const r = rate / 12 / 100
    const n = years * 12
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return emi
  }

  const badEMI = calculateEMI(loanAmount, badRate, tenureYears)
  const goodEMI = calculateEMI(loanAmount, goodRate, tenureYears)

  const badTotalInterest = (badEMI * tenureYears * 12) - loanAmount
  const goodTotalInterest = (goodEMI * tenureYears * 12) - loanAmount

  const totalSavings = badTotalInterest - goodTotalInterest

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="rounded-[2.5rem] border border-brandNavy/10 bg-white p-6 sm:p-12 shadow-card relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-brandBlue/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Cost of Bad Credit</p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
          See How Much A Bad Score Costs You
        </h2>
        <p className="mt-4 text-textSecondary">
          A low CIBIL score doesn't just mean loan rejections—it means you pay significantly more in interest over the life of your loan.
        </p>
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-2">
        {/* Controls */}
        <div className="flex flex-col justify-center gap-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-semibold text-brandNavy">Home Loan Amount</label>
              <span className="font-bold text-brandRed">{formatCurrency(loanAmount)}</span>
            </div>
            <input 
              type="range" 
              min={1000000} 
              max={20000000} 
              step={100000} 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-brandNavy/10 rounded-lg appearance-none cursor-pointer accent-brandRed"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-semibold text-brandNavy">Loan Tenure (Years)</label>
              <span className="font-bold text-brandRed">{tenureYears} Years</span>
            </div>
            <input 
              type="range" 
              min={5} 
              max={30} 
              step={1} 
              value={tenureYears} 
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-brandNavy/10 rounded-lg appearance-none cursor-pointer accent-brandRed"
            />
          </div>

          <div className="mt-4 p-5 rounded-2xl bg-brandBlue/10 border border-brandBlue/20 text-center">
            <div className="text-sm font-semibold text-brandBlue uppercase tracking-wider mb-1">Your Total Savings with Primescore</div>
            <div className="font-display text-4xl font-black text-brandBlue">
              {formatCurrency(totalSavings)}
            </div>
          </div>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Bad Score */}
          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6 flex flex-col">
            <div className="text-center pb-4 border-b border-red-100">
              <div className="text-sm font-bold text-red-600 uppercase tracking-wide">Bad Score (&lt;650)</div>
              <div className="text-2xl font-black text-red-700 mt-1">{badRate}% <span className="text-sm font-medium">Interest</span></div>
            </div>
            <div className="pt-6 flex flex-col gap-4">
              <div>
                <div className="text-xs text-red-600/70 font-semibold uppercase">Monthly EMI</div>
                <div className="text-xl font-bold text-red-900">{formatCurrency(badEMI)}</div>
              </div>
              <div>
                <div className="text-xs text-red-600/70 font-semibold uppercase">Total Interest Paid</div>
                <div className="text-xl font-bold text-red-900">{formatCurrency(badTotalInterest)}</div>
              </div>
            </div>
          </div>

          {/* Good Score */}
          <div className="rounded-2xl border border-brandBlue/20 bg-brandBlue/5 p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 text-brandBlue opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div className="text-center pb-4 border-b border-brandBlue/10 relative z-10">
              <div className="text-sm font-bold text-brandBlue uppercase tracking-wide">Primescore (750+)</div>
              <div className="text-2xl font-black text-brandBlue mt-1">{goodRate}% <span className="text-sm font-medium">Interest</span></div>
            </div>
            <div className="pt-6 flex flex-col gap-4 relative z-10">
              <div>
                <div className="text-xs text-brandBlue/70 font-semibold uppercase">Monthly EMI</div>
                <div className="text-xl font-bold text-brandBlue">{formatCurrency(goodEMI)}</div>
              </div>
              <div>
                <div className="text-xs text-brandBlue/70 font-semibold uppercase">Total Interest Paid</div>
                <div className="text-xl font-bold text-brandBlue">{formatCurrency(goodTotalInterest)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
