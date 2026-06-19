'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

type InstrumentType = 'HOME' | 'PERSONAL' | 'CAR'

interface InstrumentConfig {
  minAmount: number
  maxAmount: number
  defaultAmount: number
  amountStep: number
  minTenure: number
  maxTenure: number
  defaultTenure: number
  tenureStep: number
  badRate: number
  goodRate: number
  amountLabelMin: string
  amountLabelMax: string
  tenureLabelMin: string
  tenureLabelMax: string
}

const INSTRUMENT_CONFIGS: Record<InstrumentType, InstrumentConfig> = {
  HOME: {
    minAmount: 300000,
    maxAmount: 10000000, // 1 Crore
    defaultAmount: 3000000, // 30 Lakhs
    amountStep: 100000,
    minTenure: 1,
    maxTenure: 20,
    defaultTenure: 15,
    tenureStep: 1,
    badRate: 9.8,
    goodRate: 8.4,
    amountLabelMin: '₹3 Lakh',
    amountLabelMax: '₹1 Crore',
    tenureLabelMin: '1 Year',
    tenureLabelMax: '20 Years'
  },
  PERSONAL: {
    minAmount: 100000,
    maxAmount: 5000000, // 50 Lakhs
    defaultAmount: 300000, // 3 Lakhs
    amountStep: 50000,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 5,
    tenureStep: 1,
    badRate: 17.5,
    goodRate: 11.5,
    amountLabelMin: '₹1 Lakh',
    amountLabelMax: '₹50 Lakh',
    tenureLabelMin: '1 Year',
    tenureLabelMax: '7 Years'
  },
  CAR: {
    minAmount: 200000,
    maxAmount: 3000000, // 30 Lakhs
    defaultAmount: 1000000, // 10 Lakhs
    amountStep: 50000,
    minTenure: 1,
    maxTenure: 7,
    defaultTenure: 5,
    tenureStep: 1,
    badRate: 12.5,
    goodRate: 9.2,
    amountLabelMin: '₹2 Lakh',
    amountLabelMax: '₹30 Lakh',
    tenureLabelMin: '1 Year',
    tenureLabelMax: '7 Years'
  }
}

export default function CreditImpactCalculator() {
  const [activeTab, setActiveTab] = useState<InstrumentType>('PERSONAL')
  const config = INSTRUMENT_CONFIGS[activeTab]

  const [amount, setAmount] = useState<Record<InstrumentType, number>>({
    HOME: INSTRUMENT_CONFIGS.HOME.defaultAmount,
    PERSONAL: INSTRUMENT_CONFIGS.PERSONAL.defaultAmount,
    CAR: INSTRUMENT_CONFIGS.CAR.defaultAmount
  })

  const [tenure, setTenure] = useState<Record<InstrumentType, number>>({
    HOME: INSTRUMENT_CONFIGS.HOME.defaultTenure,
    PERSONAL: INSTRUMENT_CONFIGS.PERSONAL.defaultTenure,
    CAR: INSTRUMENT_CONFIGS.CAR.defaultTenure
  })

  // Handle Tab Switch (keep values stored per tab)
  const handleTabChange = (tab: InstrumentType) => {
    setActiveTab(tab)
  }

  const currentAmount = amount[activeTab]
  const currentTenure = tenure[activeTab]

  // Calculations
  const calculateEMI = (principal: number, annualRate: number, years: number) => {
    const r = annualRate / 12 / 100
    const n = years * 12
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return emi
  }

  const badEMI = useMemo(() => calculateEMI(currentAmount, config.badRate, currentTenure), [currentAmount, config.badRate, currentTenure])
  const goodEMI = useMemo(() => calculateEMI(currentAmount, config.goodRate, currentTenure), [currentAmount, config.goodRate, currentTenure])

  const badTotalInterest = useMemo(() => (badEMI * currentTenure * 12) - currentAmount, [badEMI, currentTenure, currentAmount])
  const goodTotalInterest = useMemo(() => (goodEMI * currentTenure * 12) - currentAmount, [goodEMI, currentTenure, currentAmount])

  const totalSavings = useMemo(() => Math.max(0, badTotalInterest - goodTotalInterest), [badTotalInterest, goodTotalInterest])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val)
  }

  return (
    <div className="rounded-[2.5rem] border border-brandNavy/10 bg-[#0B1228] p-6 sm:p-12 text-white shadow-card relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/4 -translate-y-1/4 rounded-full bg-brandBlue/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">COST OF BAD CREDIT</p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
          See How Much A Bad Score Costs You
        </h2>
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Lenders charge a steep "risk premium" for poor credit. Slide the parameters to calculate your potential savings by matching your credit standing to a Prime rating (750+).
        </p>
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-12 items-center">
        
        {/* Controls (Left Side) */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          
          {/* Instrument Selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              SELECT CREDIT INSTRUMENT
            </label>
            <div className="grid grid-cols-3 gap-2 bg-[#151D33] p-1 rounded-xl border border-white/5">
              {(['HOME', 'PERSONAL', 'CAR'] as InstrumentType[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={[
                    'py-3 rounded-lg text-xs font-bold transition-all duration-200 outline-none',
                    activeTab === tab
                      ? 'bg-[#2563EB] text-white shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  ].join(' ')}
                >
                  {tab} LOAN
                </button>
              ))}
            </div>
          </div>

          {/* Loan Amount Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">LOAN AMOUNT</label>
              <span className="text-lg font-black text-[#2563EB]">{formatCurrency(currentAmount)}</span>
            </div>
            <input 
              type="range" 
              min={config.minAmount} 
              max={config.maxAmount} 
              step={config.amountStep} 
              value={currentAmount} 
              onChange={(e) => setAmount(p => ({ ...p, [activeTab]: Number(e.target.value) }))}
              className="w-full h-1.5 bg-[#151D33] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
              <span>{config.amountLabelMin}</span>
              <span>{config.amountLabelMax}</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">TENURE (YEARS)</label>
              <span className="text-lg font-black text-[#2563EB]">{currentTenure} Years</span>
            </div>
            <input 
              type="range" 
              min={config.minTenure} 
              max={config.maxTenure} 
              step={config.tenureStep} 
              value={currentTenure} 
              onChange={(e) => setTenure(p => ({ ...p, [activeTab]: Number(e.target.value) }))}
              className="w-full h-1.5 bg-[#151D33] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
              <span>{config.tenureLabelMin}</span>
              <span>{config.tenureLabelMax}</span>
            </div>
          </div>

        </div>

        {/* Calculations / Output (Right Side) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            
            {/* Bad Score */}
            <div className="rounded-2xl border border-red-500/20 bg-[#131B34] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                  BAD SCORE (&lt;650)
                </span>
                <span className="text-xs font-bold text-slate-400">Rate: {config.badRate}%</span>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">MONTHLY EMI</span>
                  <span className="text-lg font-black text-white">{formatCurrency(badEMI)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TOTAL INTEREST PAID</span>
                  <span className="text-sm font-bold text-white/90">{formatCurrency(badTotalInterest)}</span>
                </div>
              </div>
            </div>

            {/* Prime Score */}
            <div className="rounded-2xl border border-emerald-500/30 bg-[#131B34] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  PRIME SCORE (750+)
                </span>
                <span className="text-xs font-bold text-slate-400">Rate: {config.goodRate}%</span>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">MONTHLY EMI</span>
                  <span className="text-lg font-black text-brandGreen">{formatCurrency(goodEMI)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TOTAL INTEREST PAID</span>
                  <span className="text-sm font-bold text-white/90">{formatCurrency(goodTotalInterest)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Prime Advantage Savings Banner */}
          <div className="rounded-xl border border-brandGreen/20 bg-brandGreen/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left mt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brandGreen shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-brandGreen block leading-none">
                  PRIMESCORE FINANCIAL ADVANTAGE
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Save on overall credit borrowing cost by fixing CIBIL
                </span>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block sm:text-right leading-none">
                Potential Savings
              </span>
              <span className="text-xl font-black text-brandGreen block mt-0.5">
                {formatCurrency(totalSavings)}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
