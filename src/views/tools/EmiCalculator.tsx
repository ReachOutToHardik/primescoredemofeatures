'use client'

import { useState } from 'react'

export default function EmiCalculator() {
  const [amount, setAmount] = useState(1000000)
  const [rate, setRate] = useState(6.5)
  const [tenure, setTenure] = useState(5)

  const r = rate / 12 / 100
  const n = tenure * 12
  const emi = r ? amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : amount / n
  const totalPayment = emi * n
  const totalInterest = totalPayment - amount

  const interestPercentage = (totalInterest / totalPayment) * 100 || 0

  const circumference = 2 * Math.PI * 60
  const interestDashoffset = circumference - (interestPercentage / 100) * circumference

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-24 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            EMI Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Calculate your monthly Equated Monthly Installment (EMI) easily.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: Sliders */}
            <div className="grid gap-8">
              {/* Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Loan amount</label>
                  <div className="flex items-center bg-green-50 text-[#10b981] font-bold px-3 py-1.5 rounded-md">
                    <span className="mr-1">₹</span>
                    <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="bg-transparent outline-none w-24 text-right" />
                  </div>
                </div>
                <input
                  type="range" min="100000" max="10000000" step="50000"
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
              </div>

              {/* Rate */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Rate of interest (p.a)</label>
                  <div className="flex items-center bg-green-50 text-[#10b981] font-bold px-3 py-1.5 rounded-md">
                    <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="bg-transparent outline-none w-16 text-right" />
                    <span className="ml-1">%</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="30" step="0.1"
                  value={rate} onChange={e => setRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Loan tenure</label>
                  <div className="flex items-center bg-green-50 text-[#10b981] font-bold px-3 py-1.5 rounded-md">
                    <input type="number" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="bg-transparent outline-none w-12 text-right" />
                    <span className="ml-1">Yr</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="30" step="1"
                  value={tenure} onChange={e => setTenure(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
              </div>
            </div>

            {/* Right: Chart & Summary */}
            <div>
              <div className="flex justify-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-[#d5dfff]" />
                  <span>Principal amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 rounded-full bg-[#4f46e5]" />
                  <span>Interest amount</span>
                </div>
              </div>

              <div className="flex justify-center mb-12 relative">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 140 140">
                  {/* Principal Circle */}
                  <circle cx="70" cy="70" r="60" fill="none" stroke="#d5dfff" strokeWidth="20" />
                  {/* Interest Circle */}
                  <circle
                    cx="70" cy="70" r="60" fill="none" stroke="#4f46e5" strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={interestDashoffset}
                  />
                </svg>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly EMI</span>
                  <span className="font-medium text-gray-900">₹{Math.round(emi || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Principal amount</span>
                  <span className="font-medium text-gray-900">₹{amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total interest</span>
                  <span className="font-medium text-gray-900">₹{Math.round(totalInterest || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-gray-900 pt-4">
                  <span>Total amount</span>
                  <span>₹{Math.round(totalPayment || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-20 prose prose-lg prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an EMI Calculator?</h2>
          <p className="text-gray-600 mb-6">
            An EMI (Equated Monthly Installment) calculator is a financial tool that helps you calculate the monthly amount you need to pay towards your loan repayment. Whether you are taking a home loan, car loan, or personal loan, this calculator provides an instant breakdown of your monthly obligations, total interest payable, and the overall cost of the loan.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">How is EMI Calculated?</h2>
          <p className="text-gray-600 mb-6">
            The mathematical formula used to calculate EMI is: <strong>E = P × r × (1 + r)^n / ((1 + r)^n - 1)</strong><br />
            Where:<br />
            <strong>E</strong> is the EMI amount.<br />
            <strong>P</strong> is the Principal loan amount.<br />
            <strong>r</strong> is the monthly interest rate (annual interest rate divided by 12).<br />
            <strong>n</strong> is the loan tenure in months.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Should You Use an EMI Calculator?</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
            <li><strong>Financial Planning:</strong> Knowing your EMI in advance helps you plan your monthly budget accurately.</li>
            <li><strong>Compare Loan Offers:</strong> You can adjust the interest rate and tenure to compare loans from different banks and financial institutions.</li>
            <li><strong>Save Time:</strong> It provides instant, error-free calculations compared to manual methods.</li>
            <li><strong>Decide the Right Tenure:</strong> A longer tenure means lower EMIs but higher total interest paid. The calculator helps you find the perfect balance.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Reducing Your EMI</h2>
          <p className="text-gray-600">
            To lower your monthly installments, consider making a larger down payment, negotiating for a lower interest rate based on a strong credit score, or opting for a slightly longer loan tenure. However, always remember that a longer tenure increases the total interest burden over the life of the loan. Use our free tool to experiment with different scenarios before committing.
          </p>
        </div>

      </div>
    </div>
  )
}
