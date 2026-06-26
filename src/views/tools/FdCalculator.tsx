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
        
        <div className="mt-20 prose prose-lg prose-slate max-w-none border-t border-gray-100 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Fixed Deposit (FD) and How Does the Calculator Help?</h2>
          <p className="text-gray-600 mb-6 text-base font-light leading-relaxed">
            A Fixed Deposit (FD) is a secure financial instrument provided by banks or Non-Banking Financial Companies (NBFCs) in India. It offers a higher rate of interest than a standard savings account until a specified maturity date. Using a reliable <strong>fixed deposit calculator</strong> is essential to estimate the final <strong>fd amount calculator</strong> yields before making an investment.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How is FD Interest Calculated?</h2>
          <p className="text-gray-600 mb-6 text-base font-light leading-relaxed">
            Most Indian financial institutions calculate compound interest on a quarterly basis. This <strong>fd interest calculator</strong> utilizes the standard quarterly compounding formula:
          </p>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-250/30 mb-6 text-center font-mono text-sm text-gray-800 max-w-xs mx-auto">
            A = P &times; (1 + r / n)<sup>n &times; t</sup>
          </div>
          <p className="text-gray-600 mb-6 text-base font-light leading-relaxed">
            Where <strong>P</strong> is the principal investment amount, <strong>r</strong> is the annual interest rate, <strong>t</strong> is the tenure in years, and <strong>n</strong> represents the compounding frequency per year (n = 4 for a <strong>fd quarterly interest calculator</strong>). The difference between the maturity value (A) and principal (P) is the total interest earned.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Fixed Deposit Return Calculator</h2>
          <p className="text-gray-600 mb-6 text-base font-light leading-relaxed">
            This <strong>fixed deposit return calculator</strong> makes it incredibly easy to compare various scenarios. Simply adjust the sliders or type the values:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 text-base font-light space-y-2">
            <li><strong>Total Investment:</strong> Set the initial principal amount you want to lock in.</li>
            <li><strong>Rate of Interest:</strong> Enter the active interest rate offered by your chosen bank.</li>
            <li><strong>Time Period:</strong> Set the tenure of your deposit in years.</li>
          </ul>
          <p className="text-gray-600 mb-6 text-base font-light leading-relaxed">
            Our <strong>fixed deposit interest calculator</strong> instantly visualizes the principal versus the interest yield in a clean interactive chart.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Checking Bank FD Interest Rates</h2>
          <p className="text-gray-600 mb-6 text-base font-light leading-relaxed">
            To maximize your returns, check the latest <strong>fd interest rates calculator</strong> schedules across banks. Senior citizens typically receive an additional 0.50% to 0.75% interest premium. Always use an accurate <strong>fd rate calculator</strong> to determine the post-tax yields as interest earned above ₹40,000 (₹50,000 for senior citizens) is subject to Tax Deducted at Source (TDS).
          </p>

          {/* On-page FAQs matching Schema */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 border-t border-gray-100 pt-8">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 mb-2">How does a Fixed Deposit (FD) calculator work?</h3>
              <p className="text-gray-650 text-sm font-light leading-relaxed">
                An FD calculator computes the interest earned and maturity value of your investment based on the principal amount, tenure, and applicable interest rate. Primescore's FD return calculator compounds interest quarterly, which is the standard methodology followed by Indian banks.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 mb-2">What is a fixed deposit return calculator?</h3>
              <p className="text-gray-650 text-sm font-light leading-relaxed">
                A fixed deposit return calculator is an online tool that helps investors determine the returns they will get upon maturity. By entering the investment amount, duration, and FD interest rate, the tool instantly displays the maturity value and interest earned.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-bold text-gray-900 mb-2">How is quarterly compounding interest calculated on an FD?</h3>
              <p className="text-gray-650 text-sm font-light leading-relaxed">
                FD quarterly interest is calculated using the compound interest formula: A = P(1 + r/n)^(n*t), where P is the principal amount, r is the annual rate of interest, t is the time in years, and n is the compounding frequency per year (n = 4 for quarterly compounding).
              </p>
            </div>
            <div className="pb-4">
              <h3 className="text-base font-bold text-gray-900 mb-2">Which bank offers the highest FD interest rates?</h3>
              <p className="text-gray-650 text-sm font-light leading-relaxed">
                FD interest rates vary by bank, investment tenure, and whether the investor is a senior citizen. Most leading Indian banks offer interest rates ranging from 6% to 8% per annum. You can use our FD rate calculator to check returns for any custom interest rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
