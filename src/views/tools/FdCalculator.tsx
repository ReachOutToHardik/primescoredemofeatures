'use client'

import { useState } from 'react'

export default function FdCalculator() {
  const [investment, setInvestment] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)

  // Compound Interest Formula: A = P(1 + r/n)^nt
  // For FD in India, n is usually 4 (quarterly compounding)
  const n = 4
  const r = rate / 100
  const t = years
  const totalValue = investment * Math.pow(1 + r / n, n * t)
  const interestGained = totalValue - investment

  const interestPercentage = (interestGained / totalValue) * 100 || 0
  const circumference = 2 * Math.PI * 60
  const interestDashoffset = circumference - (interestPercentage / 100) * circumference

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            Fixed Deposit Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Calculate your maturity amount with quarterly compounding.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="grid gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Total investment</label>
                  <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md">
                    <span className="mr-1">₹</span>
                    <input type="number" value={investment} onChange={e => setInvestment(Number(e.target.value))} className="bg-transparent outline-none w-24 text-right" />
                  </div>
                </div>
                <input
                  type="range" min="1000" max="10000000" step="5000"
                  value={investment} onChange={e => setInvestment(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Rate of interest (p.a)</label>
                  <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md">
                    <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="bg-transparent outline-none w-16 text-right" />
                    <span className="ml-1">%</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="15" step="0.1"
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Time period</label>
                  <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md">
                    <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="bg-transparent outline-none w-12 text-right" />
                    <span className="ml-1">Yr</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="25" step="1"
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-[#d5dfff]" />
                  <span>Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-[#4f46e5]" />
                  <span>Interest</span>
                </div>
              </div>

              <div className="flex justify-center mb-12 relative">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="#d5dfff" strokeWidth="20" />
                  <circle
                    cx="70" cy="70" r="60" fill="none" stroke="#4f46e5" strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={interestDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-xs text-gray-500 uppercase">Yield</span>
                   <span className="text-xl font-bold text-brandNavy">{Math.round((totalValue/investment - 1) * 100)}%</span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Invested amount</span>
                  <span className="font-medium text-gray-900">₹{investment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total interest</span>
                  <span className="font-medium text-brandNavy">₹{Math.round(interestGained).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-gray-900 pt-4 border-t border-gray-100">
                  <span>Maturity value</span>
                  <span>₹{Math.round(totalValue).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 prose prose-lg prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Fixed Deposit (FD)?</h2>
          <p className="text-gray-600 mb-6">
            A Fixed Deposit (FD) is a financial instrument provided by banks or NBFCs which provides investors a higher rate of interest than a regular savings account, until the given maturity date. It is considered one of the safest investment options in India.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How FD Interest is Calculated</h2>
          <p className="text-gray-600 mb-6">
            In India, most banks compound FD interest on a quarterly basis. Our calculator uses this standard quarterly compounding method to give you the most accurate maturity estimate. The interest earned is taxable as per your income tax slab, unless it's a tax-saving FD with a 5-year lock-in.
          </p>
        </div>
      </div>
    </div>
  )
}
