'use client'

import { useState, useMemo } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import Button from '../../components/ui/Button'
import Link from 'next/link'

export default function EmiComparisonCalculator() {
  // Inputs
  const [amount, setAmount] = useState(1000000)
  const [term, setTerm] = useState(20) // in years
  const [startDate, setStartDate] = useState(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })

  const [rate1, setRate1] = useState(10.0)
  const [rate2, setRate2] = useState(11.0)
  const [rate3, setRate3] = useState(12.0)

  // Amortization table visibility per rate
  const [activeAmortization, setActiveAmortization] = useState<number | null>(null)

  // Calculations for a given interest rate
  const getLoanDetails = (rate: number) => {
    const r = rate / 12 / 100
    const n = term * 12
    const emi = r ? amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : amount / n
    const totalPayments = emi * n
    const totalInterest = totalPayments - amount
    
    // Calculate Last EMI Date
    let lastEmiDate = 'N/A'
    if (startDate) {
      const date = new Date(startDate)
      date.setMonth(date.getMonth() + n - 1)
      lastEmiDate = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    // Generate Amortization Schedule
    const schedule = []
    let balance = amount
    for (let i = 1; i <= n; i++) {
      const interestPaid = balance * r
      const principalPaid = emi - interestPaid
      balance = Math.max(0, balance - principalPaid)
      
      const paymentDate = new Date(startDate)
      paymentDate.setMonth(paymentDate.getMonth() + i - 1)

      schedule.push({
        month: i,
        date: paymentDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        emi,
        interestPaid,
        principalPaid,
        balance
      })
    }

    return {
      emi,
      totalInterest,
      totalPayments,
      periods: n,
      lastEmiDate,
      schedule
    }
  }

  const opt1 = useMemo(() => getLoanDetails(rate1), [amount, term, startDate, rate1])
  const opt2 = useMemo(() => getLoanDetails(rate2), [amount, term, startDate, rate2])
  const opt3 = useMemo(() => getLoanDetails(rate3), [amount, term, startDate, rate3])

  // Chart distribution
  const chart1 = useMemo(() => {
    const total = opt1.totalPayments
    return {
      interestPct: Math.round((opt1.totalInterest / total) * 100) || 0,
      principalPct: Math.round((amount / total) * 100) || 0
    }
  }, [opt1, amount])

  const chart2 = useMemo(() => {
    const total = opt2.totalPayments
    return {
      interestPct: Math.round((opt2.totalInterest / total) * 100) || 0,
      principalPct: Math.round((amount / total) * 100) || 0
    }
  }, [opt2, amount])

  const chart3 = useMemo(() => {
    const total = opt3.totalPayments
    return {
      interestPct: Math.round((opt3.totalInterest / total) * 100) || 0,
      principalPct: Math.round((amount / total) * 100) || 0
    }
  }, [opt3, amount])

  return (
    <div className="py-20 lg:py-24 min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Dynamic Welcoming Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 sm:text-5xl">
            EMI Comparison Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Compare up to three loan offers side-by-side. Analyze monthly payments, total interest burden, and amortization schedules instantly.
          </p>
        </div>

        {/* Main Controls Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: Sliders */}
            <div className="grid gap-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Loan Settings</h3>
              
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Loan amount</label>
                  <div className="flex items-center bg-green-50 text-[#10b981] font-bold px-3 py-1.5 rounded-md">
                    <span className="mr-1">₹</span>
                    <input 
                      type="number" 
                      value={amount} 
                      onChange={e => setAmount(Number(e.target.value))} 
                      className="bg-transparent outline-none w-24 text-right" 
                    />
                  </div>
                </div>
                <input
                  type="range" min="100000" max="20000000" step="50000"
                  value={amount} onChange={e => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-gray-700 font-medium">Loan tenure</label>
                  <div className="flex items-center bg-green-50 text-[#10b981] font-bold px-3 py-1.5 rounded-md">
                    <input 
                      type="number" 
                      value={term} 
                      onChange={e => setTerm(Number(e.target.value))} 
                      className="bg-transparent outline-none w-12 text-right" 
                    />
                    <span className="ml-1">Yr</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="40" step="1"
                  value={term} onChange={e => setTerm(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-gray-700 font-medium block mb-3">EMI start date</label>
                <div className="relative flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus-within:border-[#10b981] transition-colors w-full sm:w-64">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2.5" />
                  <input 
                    type="date" 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)} 
                    className="bg-transparent outline-none w-full text-gray-800 font-semibold text-sm" 
                  />
                </div>
              </div>
            </div>

            {/* Right: Interest Comparative inputs */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-6">Compare Rates (p.a)</h3>
                
                <div className="space-y-6">
                  {/* Rate 1 */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Interest Rate 1</span>
                    <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md w-28">
                      <input 
                        type="number" step="0.05"
                        value={rate1} onChange={e => setRate1(Number(e.target.value))} 
                        className="bg-transparent outline-none w-full text-right" 
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>

                  {/* Rate 2 */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Interest Rate 2</span>
                    <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md w-28">
                      <input 
                        type="number" step="0.05"
                        value={rate2} onChange={e => setRate2(Number(e.target.value))} 
                        className="bg-transparent outline-none w-full text-right" 
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>

                  {/* Rate 3 */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Interest Rate 3</span>
                    <div className="flex items-center bg-blue-50 text-[#4f46e5] font-bold px-3 py-1.5 rounded-md w-28">
                      <input 
                        type="number" step="0.05"
                        value={rate3} onChange={e => setRate3(Number(e.target.value))} 
                        className="bg-transparent outline-none w-full text-right" 
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button 
                  onClick={() => {
                    const element = document.getElementById('comparison-results')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full h-12 bg-[#4f46e5] hover:bg-[#3b32c4] text-white font-bold rounded-xl transition-colors shadow-sm"
                >
                  Compare EMI
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ═══ COMPARISON RESULTS SECTION ═══ */}
        <div id="comparison-results" className="scroll-mt-6">
          
          {/* 3 Column Cards Layout matching User's layout */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            
            {/* Column A */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-gray-50 py-4 px-6 border-b border-gray-100 text-center">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-500">Rate</span>
                  <div className="text-2xl font-black text-gray-900 mt-0.5">{rate1.toFixed(2)}%</div>
                </div>
                <div className="divide-y divide-gray-50 text-sm">
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium text-gray-900">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600 font-bold">EMI</span>
                    <span className="font-extrabold text-gray-900">₹{Math.round(opt1.emi).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium text-gray-900">₹{Math.round(opt1.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600">Total Payments</span>
                    <span className="font-bold text-gray-900">₹{Math.round(opt1.totalPayments).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Periods</span>
                    <span className="font-medium text-gray-900">{opt1.periods} months</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600">Last EMI Date</span>
                    <span className="font-medium text-gray-900">{opt1.lastEmiDate}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                <button 
                  onClick={() => setActiveAmortization(activeAmortization === 1 ? null : 1)}
                  className="w-full text-xs font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg py-2.5 transition-colors text-center"
                >
                  Check Amortization Table
                </button>
              </div>
            </div>

            {/* Column B */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-gray-50 py-4 px-6 border-b border-gray-100 text-center">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-500">Rate</span>
                  <div className="text-2xl font-black text-gray-900 mt-0.5">{rate2.toFixed(2)}%</div>
                </div>
                <div className="divide-y divide-gray-50 text-sm">
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium text-gray-900">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600 font-bold">EMI</span>
                    <span className="font-extrabold text-gray-900">₹{Math.round(opt2.emi).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium text-gray-900">₹{Math.round(opt2.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600">Total Payments</span>
                    <span className="font-bold text-gray-900">₹{Math.round(opt2.totalPayments).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Periods</span>
                    <span className="font-medium text-gray-900">{opt2.periods} months</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600">Last EMI Date</span>
                    <span className="font-medium text-gray-900">{opt2.lastEmiDate}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                <button 
                  onClick={() => setActiveAmortization(activeAmortization === 2 ? null : 2)}
                  className="w-full text-xs font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg py-2.5 transition-colors text-center"
                >
                  Check Amortization Table
                </button>
              </div>
            </div>

            {/* Column C */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="bg-gray-50 py-4 px-6 border-b border-gray-100 text-center">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-500">Rate</span>
                  <div className="text-2xl font-black text-gray-900 mt-0.5">{rate3.toFixed(2)}%</div>
                </div>
                <div className="divide-y divide-gray-50 text-sm">
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium text-gray-900">₹{amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600 font-bold">EMI</span>
                    <span className="font-extrabold text-gray-900">₹{Math.round(opt3.emi).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium text-gray-900">₹{Math.round(opt3.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600">Total Payments</span>
                    <span className="font-bold text-gray-900">₹{Math.round(opt3.totalPayments).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <span className="text-gray-600">Periods</span>
                    <span className="font-medium text-gray-900">{opt3.periods} months</span>
                  </div>
                  <div className="flex justify-between py-4 px-6 bg-gray-50/20">
                    <span className="text-gray-600">Last EMI Date</span>
                    <span className="font-medium text-gray-900">{opt3.lastEmiDate}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                <button 
                  onClick={() => setActiveAmortization(activeAmortization === 3 ? null : 3)}
                  className="w-full text-xs font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg py-2.5 transition-colors text-center"
                >
                  Check Amortization Table
                </button>
              </div>
            </div>

          </div>

          {/* Amortization Table Drawer */}
          {activeAmortization && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Amortization Schedule — Option {activeAmortization === 1 ? 'A' : activeAmortization === 2 ? 'B' : 'C'}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Monthly payouts showing principal breakdown at {activeAmortization === 1 ? rate1 : activeAmortization === 2 ? rate2 : rate3}% Rate.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveAmortization(null)}
                  className="text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-200 rounded px-2.5 py-1"
                >
                  Close Table
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl max-h-80 overflow-y-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 text-[10px] uppercase font-bold tracking-wider text-gray-500 border-b border-gray-100 sticky top-0 backdrop-blur-md">
                    <tr>
                      <th className="py-3.5 px-5">Month</th>
                      <th className="py-3.5 px-5">Date</th>
                      <th className="py-3.5 px-5">EMI Payout</th>
                      <th className="py-3.5 px-5">Principal Paid</th>
                      <th className="py-3.5 px-5">Interest Paid</th>
                      <th className="py-3.5 px-5">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs font-mono text-gray-600">
                    {(activeAmortization === 1 ? opt1 : activeAmortization === 2 ? opt2 : opt3).schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50/60 transition-colors">
                        <td className="py-3 px-5 font-semibold text-gray-900">{row.month}</td>
                        <td className="py-3 px-5 text-gray-700">{row.date}</td>
                        <td className="py-3 px-5 font-semibold text-gray-900">₹{Math.round(row.emi).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-5 text-emerald-600 font-semibold">₹{Math.round(row.principalPaid).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-5 text-rose-600 font-semibold">₹{Math.round(row.interestPaid).toLocaleString('en-IN')}</td>
                        <td className="py-3 px-5 font-semibold text-gray-800">₹{Math.round(row.balance).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Clean Flat Side-by-Side Savings / Differences tables */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            
            {/* EMI Difference */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#fdf2f2] py-4 px-6 border-b border-gray-100 text-center">
                <h3 className="text-sm font-bold text-gray-900">EMI Difference</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="py-3.5 px-5">{rate1.toFixed(2)}%</th>
                      <th className="py-3.5 px-5">{rate2.toFixed(2)}%</th>
                      <th className="py-3.5 px-5">{rate3.toFixed(2)}%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm font-bold text-gray-800 font-mono divide-x divide-gray-50">
                      <td className="py-4.5 px-5">₹{Math.round(opt1.emi).toLocaleString('en-IN')}</td>
                      <td className="py-4.5 px-5 bg-gray-50/20">₹{Math.round(opt2.emi).toLocaleString('en-IN')}</td>
                      <td className="py-4.5 px-5">₹{Math.round(opt3.emi).toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Interest Difference */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#fdf2f2] py-4 px-6 border-b border-gray-100 text-center">
                <h3 className="text-sm font-bold text-gray-900">Total Interest Difference</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="py-3.5 px-5">{rate1.toFixed(2)}%</th>
                      <th className="py-3.5 px-5">{rate2.toFixed(2)}%</th>
                      <th className="py-3.5 px-5">{rate3.toFixed(2)}%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm font-bold text-gray-800 font-mono divide-x divide-gray-50">
                      <td className="py-4.5 px-5">₹{Math.round(opt1.totalInterest).toLocaleString('en-IN')}</td>
                      <td className="py-4.5 px-5 bg-gray-50/20">₹{Math.round(opt2.totalInterest).toLocaleString('en-IN')}</td>
                      <td className="py-4.5 px-5">₹{Math.round(opt3.totalInterest).toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Repayment Distribution Distribution Charts */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm mb-16">
            <h3 className="text-lg font-bold text-gray-900 mb-8 text-center">Repayment Chart</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Option 1 */}
              <div className="flex flex-col items-center p-5 border border-gray-100 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Repayment Chart</span>
                <span className="text-base font-bold text-gray-900 mt-1 mb-6">Rate - {rate1.toFixed(2)}%</span>
                
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#d5dfff" strokeWidth="12" />
                    <circle 
                      cx="50" cy="50" r="42" fill="none" stroke="#4f46e5" strokeWidth="12"
                      strokeDasharray="263.89"
                      strokeDashoffset={263.89 - (263.89 * chart1.interestPct) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Interest</span>
                    <div className="text-base font-bold text-gray-900">{chart1.interestPct}%</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1 text-[11px] font-medium text-gray-500 w-full pt-4 border-t border-gray-50">
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <span className="font-bold text-gray-900">{chart1.principalPct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest:</span>
                    <span className="font-bold text-gray-900">{chart1.interestPct}%</span>
                  </div>
                </div>
              </div>

              {/* Option 2 */}
              <div className="flex flex-col items-center p-5 border border-gray-100 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Repayment Chart</span>
                <span className="text-base font-bold text-gray-900 mt-1 mb-6">Rate - {rate2.toFixed(2)}%</span>
                
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#d5dfff" strokeWidth="12" />
                    <circle 
                      cx="50" cy="50" r="42" fill="none" stroke="#4f46e5" strokeWidth="12"
                      strokeDasharray="263.89"
                      strokeDashoffset={263.89 - (263.89 * chart2.interestPct) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Interest</span>
                    <div className="text-base font-bold text-gray-900">{chart2.interestPct}%</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1 text-[11px] font-medium text-gray-500 w-full pt-4 border-t border-gray-50">
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <span className="font-bold text-gray-900">{chart2.principalPct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest:</span>
                    <span className="font-bold text-gray-900">{chart2.interestPct}%</span>
                  </div>
                </div>
              </div>

              {/* Option 3 */}
              <div className="flex flex-col items-center p-5 border border-gray-100 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Repayment Chart</span>
                <span className="text-base font-bold text-gray-900 mt-1 mb-6">Rate - {rate3.toFixed(2)}%</span>
                
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#d5dfff" strokeWidth="12" />
                    <circle 
                      cx="50" cy="50" r="42" fill="none" stroke="#4f46e5" strokeWidth="12"
                      strokeDasharray="263.89"
                      strokeDashoffset={263.89 - (263.89 * chart3.interestPct) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Interest</span>
                    <div className="text-base font-bold text-gray-900">{chart3.interestPct}%</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-1 text-[11px] font-medium text-gray-500 w-full pt-4 border-t border-gray-50">
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <span className="font-bold text-gray-900">{chart3.principalPct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest:</span>
                    <span className="font-bold text-gray-900">{chart3.interestPct}%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* CIBIL Improvement CTA Banner */}
        <div className="bg-[#4f46e5] rounded-3xl p-6 sm:p-10 text-white mb-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-white">How to Get the Lowest Interest Rate Offer?</h3>
            <p className="mt-2 text-sm text-white/70 max-w-xl">
              Banks offer their lowest interest tiers (like Rate 1) exclusively to borrowers with high credit ratings. If your CIBIL score is holding you back, let Primescore experts resolve disputes and raise your eligibility.
            </p>
          </div>
          <Link href="/contact" className="shrink-0">
            <div className="inline-flex h-12 items-center justify-center bg-white text-[#4f46e5] px-6 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer">
              Boost CIBIL Eligibility
            </div>
          </Link>
        </div>

        {/* Indian Context Prototyping prose */}
        <div className="prose prose-lg prose-gray max-w-none text-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Indian Borrowers Compare EMIs Side-by-Side</h2>
          <p className="mb-6 leading-relaxed">
            In India, loan agreements are long-term obligations (often spanning 15 to 30 years for home acquisitions). Securing a small reduction in the annual percentage interest rate yields colossal financial savings over time. For example, negotiating a drop from 12% to 10% on a ₹10 Lakh loan saves you thousands in monthly cash flow and lakhs in overall interest payouts. Always calculate and cross-reference your options before signing banking drafts.
          </p>
        </div>

      </div>
    </div>
  )
}
