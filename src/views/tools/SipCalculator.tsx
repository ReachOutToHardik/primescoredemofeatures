'use client'

import { useState } from 'react'

export default function SipCalculator() {
  const [monthlySip, setMonthlySip] = useState(5000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const i = rate / 100 / 12
  const n = years * 12
  
  // SIP Formula: M = P × ({[1 + i]^n – 1} / i) × (1 + i)
  const totalValue = monthlySip * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
  const investedAmount = monthlySip * n
  const wealthGained = totalValue - investedAmount

  const gainPercentage = (wealthGained / totalValue) * 100 || 0
  const circumference = 2 * Math.PI * 60
  const gainDashoffset = circumference - (gainPercentage / 100) * circumference

  return (
    <div className="py-20 lg:py-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            SIP Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            See how much your monthly investments can grow over time.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="grid gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Monthly investment</label>
                  <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md">
                    <span className="mr-1">₹</span>
                    <input type="number" value={monthlySip} onChange={e => setMonthlySip(Number(e.target.value))} className="bg-transparent outline-none w-24 text-right" />
                  </div>
                </div>
                <input
                  type="range" min="500" max="100000" step="500"
                  value={monthlySip} onChange={e => setMonthlySip(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Expected return rate (p.a)</label>
                  <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md">
                    <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="bg-transparent outline-none w-16 text-right" />
                    <span className="ml-1">%</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="30" step="0.1"
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
                  type="range" min="1" max="40" step="1"
                  value={years} onChange={e => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4f46e5]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-[#d5dfff]" />
                  <span>Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-[#4f46e5]" />
                  <span>Returns</span>
                </div>
              </div>

              <div className="flex justify-center mb-12 relative">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="#d5dfff" strokeWidth="20" />
                  <circle
                    cx="70" cy="70" r="60" fill="none" stroke="#4f46e5" strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={gainDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-xs text-gray-500 uppercase">Growth</span>
                   <span className="text-xl font-bold text-brandNavy">{Math.round((totalValue/investedAmount - 1) * 100)}%</span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Invested amount</span>
                  <span className="font-medium text-gray-900">₹{investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Est. returns</span>
                  <span className="font-medium text-brandRed">₹{Math.round(wealthGained).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-gray-900 pt-4 border-t border-gray-100">
                  <span>Total value</span>
                  <span>₹{Math.round(totalValue).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 prose prose-lg prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an SIP?</h2>
          <p className="text-gray-600 mb-6">
            A Systematic Investment Plan (SIP) is a method of investing in mutual funds where you contribute a fixed amount regularly (monthly, quarterly, etc.) rather than making a one-time lump sum payment. This approach helps in averaging the cost of purchase and instills financial discipline.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of SIP Investing</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Power of Compounding:</strong> Reinvested returns generate their own returns, leading to exponential growth over long periods.</li>
            <li><strong>Rupee Cost Averaging:</strong> You buy more units when prices are low and fewer when prices are high, reducing the overall average cost per unit.</li>
            <li><strong>Financial Discipline:</strong> Automating your savings ensures you stay committed to your long-term goals.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
