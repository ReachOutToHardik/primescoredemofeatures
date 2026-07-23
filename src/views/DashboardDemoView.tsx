'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  CreditCard,
  Share2,
  User,
  Settings,
  HelpCircle,
  LogOut,
  RefreshCw,
  Download,
  ChevronRight,
  ShieldAlert,
  PieChart as PieIcon,
  ArrowUpRight,
  Building2,
  FileCheck,
  Search,
  ExternalLink
} from 'lucide-react'

export default function DashboardDemoView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'enquiries' | 'comparison'>('overview')

  return (
    <div className="h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-brandBlue/10 overflow-hidden">
      
      {/* Top Demo Bar with High-Visibility Seamless Marquee */}
      <div className="bg-gradient-to-r from-slate-950 via-brandNavy to-slate-900 text-white px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between shadow-md overflow-hidden gap-4 border-b border-white/10 shrink-0">
        {/* Marquee track */}
        <div className="flex-1 overflow-hidden relative flex items-center">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-12 font-medium">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2.5 shrink-0">
                <span className="bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-widest shadow-sm">
                  Interactive Demo
                </span>
                <span className="text-slate-200">
                  Sample Multi-Bureau Credit Dashboard preview for <strong className="text-white font-extrabold underline decoration-amber-400/60">DEMO USER</strong>
                </span>
                <span className="text-amber-400/60 font-bold ml-4">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign Up CTA button */}
        <div className="shrink-0 z-10 pl-3 bg-slate-950/90 backdrop-blur-md">
          <a
            href="https://dashboard.primescore.in"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-1.5 rounded-lg text-xs transition-all inline-flex items-center gap-1.5 shadow-md hover:shadow-emerald-500/20 active:scale-95"
          >
            <span>Sign Up for Full Access</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Sidebar (Fixed layout, no empty space on scroll) */}
        <aside className="w-full lg:w-64 bg-white border-r border-slate-200/80 p-4 lg:p-6 flex flex-col justify-between shrink-0 h-auto lg:h-full overflow-y-auto">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 px-2">
              <Link href="/">
                <img src="/lightmode_Logo.png" alt="PrimeScore" className="h-8 w-auto object-contain" />
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {[
                { name: 'Dashboard', icon: LayoutDashboard, active: true },
                { name: 'Credit Reports', icon: FileText, active: false, badge: '4' },
                { name: 'Disputes', icon: AlertTriangle, active: false, badge: '34' },
                { name: 'Subscription', icon: CreditCard, active: false },
                { name: 'Refer & Earn', icon: Share2, active: false },
                { name: 'Profile', icon: User, active: false },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <a
                    key={idx}
                    href="https://dashboard.primescore.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      item.active
                        ? 'bg-brandBlue/10 text-brandBlue'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.name === 'Disputes' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-brandBlue/10 text-brandBlue'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </a>
                )
              })}
            </nav>
          </div>

          {/* User Profile Tile (Privacy Safe Demo Data) */}
          <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-brandNavy text-white font-bold flex items-center justify-center text-sm shadow-sm">
                DU
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">DEMO USER</h4>
                <p className="text-xs text-brandBlue font-medium">Sample Member</p>
              </div>
            </div>

            <a
              href="https://dashboard.primescore.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 border-emerald-500 bg-white hover:bg-emerald-500 text-emerald-600 hover:text-slate-950 font-black text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Sign Up Now
            </a>

            <div className="space-y-1 text-xs text-slate-500 pt-2">
              <a href="https://dashboard.primescore.in" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2.5 px-2 py-1.5 hover:text-slate-800 rounded transition-colors">
                <Settings className="w-3.5 h-3.5" /> Settings
              </a>
              <a href="https://dashboard.primescore.in" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-2.5 px-2 py-1.5 hover:text-slate-800 rounded transition-colors">
                <HelpCircle className="w-3.5 h-3.5" /> Contact Support
              </a>
              <Link href="/" className="w-full flex items-center gap-2.5 px-2 py-1.5 hover:text-red-600 rounded transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Back to Home
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 h-full">
          
          {/* Top Bar Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Multi Bureau Dashboard</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Sample credit report breakdown for DEMO USER</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://dashboard.primescore.in"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-emerald-500 bg-white hover:bg-emerald-500 text-emerald-600 hover:text-slate-950 px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Sign Up Now
              </a>
              <a
                href="https://dashboard.primescore.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brandBlue text-white hover:bg-blue-600 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Multi Bureau Report
              </a>
              <a
                href="https://dashboard.primescore.in"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm items-center gap-2 hidden lg:flex"
              >
                <FileCheck className="w-4 h-4 text-brandBlue" /> Credit Report Overview
              </a>
            </div>
          </div>

          {/* Average Score Banner Header */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Score Arc Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="10" fill="transparent" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    stroke="#F59E0B" 
                    strokeWidth="10" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    strokeDashoffset="85"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-slate-900 block leading-none">589</span>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Average Score</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sample Profile</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">DEMO USER</h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">PAN: ABCDE1234F · DOB: 15 Aug 1995</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile</span>
                <span className="font-bold text-slate-800">+91 9876543210</span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Discrepancy Alerts</span>
                <span className="font-bold text-red-600">34 Potential Issues</span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Fetched</span>
                <span className="font-bold text-slate-800">13 Jul, 12:38 pm</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 text-sm font-bold overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'accounts', label: 'Accounts' },
              { id: 'enquiries', label: 'Enquiries' },
              { id: 'comparison', label: 'Comparison' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 border-b-2 transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'border-brandBlue text-brandBlue bg-brandBlue/5 rounded-t-lg'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Bureau Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { bureau: 'EQUIFAX INDIA', score: 547, status: 'Poor', color: 'text-red-600', stroke: '#EF4444', total: 16, active: 1, closed: 15 },
                  { bureau: 'EXPERIAN INDIA', score: 488, status: 'Poor', color: 'text-red-600', stroke: '#EF4444', total: 27, active: 5, closed: 22 },
                  { bureau: 'CRIF HIGH MARK', score: 611, status: 'Fair', color: 'text-amber-600', stroke: '#F59E0B', total: 28, active: 5, closed: 23 },
                  { bureau: 'TRANSUNION CIBIL', score: 708, status: 'Good', color: 'text-emerald-600', stroke: '#10B981', total: 27, active: 5, closed: 22 },
                ].map((b, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-brandBlue/30 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{b.bureau}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          b.status === 'Good' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          b.status === 'Fair' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className={`text-4xl font-black ${b.color}`}>{b.score}</span>
                        <span className="text-xs text-slate-400 font-bold">/ 900</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-center py-2 bg-slate-50 rounded-xl text-xs">
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold">Accounts</span>
                          <span className="font-bold text-slate-800">{b.total}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold">Active</span>
                          <span className="font-bold text-emerald-600">{b.active}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 font-bold">Closed</span>
                          <span className="font-bold text-slate-600">{b.closed}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Fetched: 13 Jul, 12:38 pm</span>
                      <button className="text-brandBlue hover:underline flex items-center gap-1 font-bold">
                        Report <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Grid: Discrepancy Alerts + Credit Mix */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Discrepancy Alerts Box (2 cols) */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-amber-200/80 bg-gradient-to-br from-amber-50/20 to-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base">
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                      <span>Discrepancy Alerts</span>
                    </div>
                    <button className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1">
                      View All (34) <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600">
                    We found <strong>34 potential issue(s)</strong> across your bureau reports that may be impacting your score.
                  </p>

                  {/* Critical Issue Rows matching reference screenshot */}
                  <div className="space-y-3">
                    {[
                      { title: 'Suit Filed', bureau: 'Experian', level: 'CRITICAL', buttonText: 'Raise a Request', color: 'bg-red-600 text-white' },
                      { title: 'Name Mismatch (PAN vs Report)', bureau: 'CRIF', level: 'MEDIUM', buttonText: 'Raise a Request', color: 'bg-amber-500 text-white' },
                      { title: 'Name Variation Across Bureaus', bureau: 'CRIF', level: 'MEDIUM', buttonText: 'Raise a Request', color: 'bg-amber-500 text-white' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4 shadow-sm hover:border-amber-300 transition-all">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-slate-900">{item.title}</span>
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold">{item.bureau}</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${item.color}`}>
                              {item.level}
                            </span>
                          </div>
                        </div>

                        <a
                          href="https://dashboard.primescore.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shrink-0 inline-block"
                        >
                          {item.buttonText}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Main Action Button */}
                  <div className="pt-2">
                    <a
                      href="https://dashboard.primescore.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md block text-center"
                    >
                      Review &amp; Dispute
                    </a>
                  </div>
                </div>

                {/* Credit Mix Visual Box (1 col) */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <PieIcon className="w-4 h-4 text-brandBlue" /> Credit Mix
                    </h3>

                    {/* Donut representation matching screenshot */}
                    <div className="relative w-40 h-40 mx-auto my-4 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" stroke="#6366F1" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="114" />
                        <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="197" />
                        <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="220" />
                        <circle cx="50" cy="50" r="38" stroke="#10B981" strokeWidth="12" fill="transparent" strokeDasharray="238.7" strokeDashoffset="231" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-2xl font-black text-slate-900 block leading-none">29</span>
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">ACCOUNTS</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs font-medium text-slate-700 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Personal Loan</span>
                        <span className="font-mono font-bold">52%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Gold Loan</span>
                        <span className="font-mono font-bold">35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Credit Card</span>
                        <span className="font-mono font-bold">10%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Priority Sector Gold Loan</span>
                        <span className="font-mono font-bold">3%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: ACCOUNTS */}
          {activeTab === 'accounts' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Accounts Table (2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Active Accounts (29)</h3>
                  <button className="text-xs font-bold text-brandBlue hover:underline flex items-center gap-1">
                    View Full Ledger <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3 px-2">S.No.</th>
                        <th className="py-3 px-2">Account Name</th>
                        <th className="py-3 px-2">Type</th>
                        <th className="py-3 px-2">Bureau</th>
                        <th className="py-3 px-2 text-right">Reported Balance</th>
                        <th className="py-3 px-2 text-center">Status</th>
                        <th className="py-3 px-2 text-right">Last Reported</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {[
                        { sno: 1, name: 'SMICC', masked: '****8568', type: 'Personal Loan', bureaus: ['CIBIL', 'CRIF', 'Experian'], balance: '₹3,964', status: 'Active', date: '15-Jun-2026' },
                        { sno: 2, name: 'SMICC', masked: '****3844', type: 'Personal Loan', bureaus: ['CIBIL', 'CRIF', 'Experian', 'Equifax'], balance: '₹2,631', status: 'Active', date: '15-Jun-2026' },
                        { sno: 3, name: 'TUSHLIPL LICENCECANCELLED', masked: '****6935', type: 'Personal Loan', bureaus: ['CIBIL', 'Experian'], balance: '₹5,000', status: 'Active', date: '30-Nov-2019' },
                        { sno: 4, name: 'PCFIN LICENCECANCELLED', masked: '****3820', type: 'Personal Loan', bureaus: ['CIBIL', 'Experian'], balance: '₹0', status: 'Closed', date: '30-Sep-2019' },
                        { sno: 5, name: 'IOB', masked: '****2158', type: 'Gold Loan', bureaus: ['CIBIL', 'CRIF', 'Experian'], balance: '₹288,000', status: 'Active', date: '15-Jun-2026' },
                        { sno: 6, name: 'FEDBANKFSL', masked: '****0484', type: 'Gold Loan', bureaus: ['CIBIL', 'CRIF', 'Experian'], balance: '₹39,822', status: 'Active', date: '23-Jun-2026' },
                        { sno: 7, name: 'IOB', masked: '****1821', type: 'Gold Loan', bureaus: ['CIBIL', 'CRIF', 'Experian'], balance: '₹0', status: 'Closed', date: '15-Apr-2026' },
                        { sno: 8, name: 'IOB', masked: '****1447', type: 'Gold Loan', bureaus: ['CIBIL', 'CRIF', 'Experian', 'Equifax'], balance: '₹0', status: 'Closed', date: '15-Apr-2026' },
                      ].map((row) => (
                        <tr key={row.sno} className="hover:bg-slate-50">
                          <td className="py-3 px-2 font-mono text-slate-400">{row.sno}</td>
                          <td className="py-3 px-2">
                            <span className="font-bold text-slate-900 block">{row.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{row.masked}</span>
                          </td>
                          <td className="py-3 px-2 text-slate-600">{row.type}</td>
                          <td className="py-3 px-2">
                            <div className="flex flex-wrap gap-1">
                              {row.bureaus.map((b, bi) => (
                                <span key={bi} className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                                  b === 'CIBIL' ? 'bg-sky-100 text-sky-700' :
                                  b === 'CRIF' ? 'bg-emerald-100 text-emerald-700' :
                                  b === 'Experian' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                }`}>
                                  {b}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right font-mono font-bold text-slate-800">{row.balance}</td>
                          <td className="py-3 px-2 text-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              row.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right text-slate-400 text-[11px]">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Column: Discrepancy Alerts preview */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-amber-200/80 bg-gradient-to-br from-amber-50/20 to-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold text-base">
                      <ShieldAlert className="w-5 h-5 text-amber-600" />
                      <span>Discrepancy Alerts</span>
                    </div>
                    <button className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1">
                      View All (34) <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600">
                    We found <strong>34 potential issue(s)</strong> across your bureau reports.
                  </p>

                  <div className="space-y-2">
                    {[
                      { title: 'Suit Filed', bureau: 'Experian', level: 'CRITICAL', color: 'bg-red-600 text-white' },
                      { title: 'Name Mismatch (PAN vs Report)', bureau: 'CRIF', level: 'MEDIUM', color: 'bg-amber-500 text-white' },
                      { title: 'Name Variation Across Bureaus', bureau: 'CRIF', level: 'MEDIUM', color: 'bg-amber-500 text-white' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-sm">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 block">{item.title}</span>
                          <span className="text-[10px] text-slate-400">{item.bureau}</span>
                        </div>
                        <button className="bg-amber-500 text-white font-bold text-[10px] px-2.5 py-1.5 rounded">
                          Raise Request
                        </button>
                      </div>
                    ))}
                  </div>

                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md">
                    Review &amp; Dispute
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Credit Enquiries</h3>
                <span className="text-xs text-slate-400 font-bold">Total: 7 Enquiries</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3 px-2">Lender Name</th>
                      <th className="py-3 px-2">Purpose</th>
                      <th className="py-3 px-2 text-right">Amount</th>
                      <th className="py-3 px-2 text-center">Date</th>
                      <th className="py-3 px-2 text-right">Reported By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[
                      { lender: 'XXXXXXXXXX', purpose: 'Two-Wheeler Loan', amount: '₹5,000', date: '27-Jun-2026', bureau: 'Experian', color: 'bg-red-50 text-red-600' },
                      { lender: 'BAJAJ FIN LTD', purpose: 'Other', amount: '₹1', date: '29-May-2026', bureau: 'CIBIL', color: 'bg-sky-50 text-sky-600' },
                      { lender: 'MuthootFIN', purpose: 'Other', amount: '₹1', date: '11-Jul-2025', bureau: 'CIBIL', color: 'bg-sky-50 text-sky-600' },
                      { lender: 'CANARA BANK', purpose: 'Personal Loan', amount: '₹215,000', date: '02-Jul-2025', bureau: 'CIBIL', color: 'bg-sky-50 text-sky-600' },
                      { lender: 'MUTHOOTNAN', purpose: 'Other', amount: '₹1', date: '25-Jan-2025', bureau: 'CIBIL', color: 'bg-sky-50 text-sky-600' },
                      { lender: 'IIFL', purpose: 'Other', amount: '₹1', date: '20-Feb-2024', bureau: 'CIBIL', color: 'bg-sky-50 text-sky-600' },
                      { lender: 'KOTAK BANK', purpose: 'Other', amount: '₹100,000', date: '09-Jan-2024', bureau: 'CIBIL', color: 'bg-sky-50 text-sky-600' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3.5 px-2 font-bold text-slate-900">{row.lender}</td>
                        <td className="py-3.5 px-2 text-slate-600">{row.purpose}</td>
                        <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-800">{row.amount}</td>
                        <td className="py-3.5 px-2 text-center text-slate-500">{row.date}</td>
                        <td className="py-3.5 px-2 text-right">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${row.color}`}>
                            {row.bureau}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Credit Comparison Across Bureaus</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                        <th className="py-3.5 px-3">Metric</th>
                        <th className="py-3.5 px-3 text-center text-emerald-600">CIBIL</th>
                        <th className="py-3.5 px-3 text-center text-blue-600">CRIF</th>
                        <th className="py-3.5 px-3 text-center text-red-600">EXPERIAN</th>
                        <th className="py-3.5 px-3 text-center text-amber-600">EQUIFAX</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {[
                        { metric: 'Total Accounts', cibil: 27, crif: 28, experian: 27, equifax: 16 },
                        { metric: 'Active Accounts', cibil: 5, crif: 5, experian: 5, equifax: 1 },
                        { metric: 'Enquiries', cibil: 6, crif: 0, experian: 1, equifax: 0 },
                        { metric: 'Credit Score', cibil: 708, crif: 611, experian: 488, equifax: 547, highlight: true },
                        { metric: 'Last Fetched', cibil: '1 week ago', crif: '1 week ago', experian: '1 week ago', equifax: '1 week ago' },
                      ].map((row, idx) => (
                        <tr key={idx} className={row.highlight ? 'bg-slate-50 font-bold' : 'hover:bg-slate-50'}>
                          <td className="py-4 px-3 font-bold text-slate-900">{row.metric}</td>
                          <td className={`py-4 px-3 text-center font-mono ${row.highlight ? 'text-emerald-600 text-base font-black' : 'text-slate-700'}`}>{row.cibil}</td>
                          <td className={`py-4 px-3 text-center font-mono ${row.highlight ? 'text-amber-600 text-base font-black' : 'text-slate-700'}`}>{row.crif}</td>
                          <td className={`py-4 px-3 text-center font-mono ${row.highlight ? 'text-red-600 text-base font-black' : 'text-slate-700'}`}>{row.experian}</td>
                          <td className={`py-4 px-3 text-center font-mono ${row.highlight ? 'text-red-600 text-base font-black' : 'text-slate-700'}`}>{row.equifax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Highest Score</span>
                    <span className="text-3xl font-black text-emerald-600 block mt-1">708</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    CIBIL
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lowest Score</span>
                    <span className="text-3xl font-black text-red-600 block mt-1">488</span>
                  </div>
                  <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                    Experian
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Score</span>
                    <span className="text-3xl font-black text-amber-600 block mt-1">589</span>
                  </div>
                  <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                    Overall
                  </span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
