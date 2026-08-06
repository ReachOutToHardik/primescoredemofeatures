'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import DashboardIntroLoader from '../components/ui/DashboardIntroLoader'
import DashboardTourOverlay from '../components/ui/DashboardTourOverlay'
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  CreditCard,
  Share2,
  User,
  Settings,
  Headphones,
  LogOut,
  RefreshCw,
  Download,
  ChevronDown,
  Info,
  Smartphone,
  Calendar,
  CreditCard as PanIcon,
  ExternalLink
} from 'lucide-react'

export default function DashboardDemoView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'enquiries' | 'comparison'>('overview')
  const [isCreditReportsOpen, setIsCreditReportsOpen] = useState(true)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#F4F6F9] text-slate-800 flex flex-col font-sans selection:bg-[#253B7E]/10">
      {/* Premium Dashboard Logo Intro Animation */}
      <DashboardIntroLoader onComplete={() => setIsIntroComplete(true)} />
      {/* Top Banner Marquee */}
      <div className="w-full bg-[#0B132B] text-white py-2 px-4 flex items-center justify-between overflow-hidden border-b border-slate-800/80 shrink-0 shadow-md z-50">
        {/* Marquee Ticker Container */}
        <div className="overflow-hidden flex-1 relative mr-4">
          <div className="whitespace-nowrap animate-marquee flex items-center gap-8 text-xs font-medium">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="bg-[#F59E0B] text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded tracking-wide shadow-sm">
                  INTERACTIVE DEMO
                </span>
                <span className="text-slate-200 text-xs">
                  Sample Multi-Bureau Credit Dashboard preview for <strong className="text-white font-extrabold">DEMO USER</strong>
                </span>
                <span className="text-amber-400 font-bold ml-2">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign Up for Full Access Button */}
        <a
          id="tour-signup-btn"
          href="https://dashboard.primescore.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Sign Up for Full Access</span>
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.25]" />
        </a>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">

        {/* Left Sidebar */}
        <aside id="tour-sidebar-nav" className="w-full lg:w-[240px] bg-white border-r border-slate-200/80 p-4 lg:py-6 lg:px-4 flex flex-col justify-between shrink-0 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden z-20">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 px-2">
              <Link href="/">
                <img src="/lightmode_Logo.png" alt="PrimeScore" className="h-10 w-auto object-contain" />
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all bg-[#EEF2FF] text-[#4F46E5] font-semibold"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Dashboard</span>
                </div>
              </Link>

              {/* Credit Reports Dropdown */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsCreditReportsOpen(!isCreditReportsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-0 select-none"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 stroke-[1.75]" />
                    <span className="text-[13px]">Credit Reports</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isCreditReportsOpen ? 'rotate-180 text-[#4F46E5]' : ''}`} />
                </button>

                {isCreditReportsOpen && (
                  <div className="ml-7 mt-1 space-y-0.5 pl-2">
                    {['CIBIL', 'Experian', 'Equifax', 'CRIF'].map((bureau) => (
                      <a
                        key={bureau}
                        href="https://dashboard.primescore.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#4F46E5] hover:bg-indigo-50/60 transition-all focus:outline-none"
                      >
                        {bureau}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/dashboard/disputes"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Disputes</span>
                </div>
              </Link>

              <a
                href="https://dashboard.primescore.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Subscription</span>
                </div>
              </a>

              <a
                href="https://dashboard.primescore.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Refer & Earn</span>
                </div>
              </a>

              <a
                href="https://dashboard.primescore.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Profile</span>
                </div>
              </a>
            </nav>
          </div>

          {/* User Profile Footer Section */}
          <div className="pt-6 space-y-3">
            {/* User Tile */}
            <div className="flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-full bg-[#0E1726] text-white font-semibold flex items-center justify-center text-xs shadow-sm shrink-0">
                D
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate tracking-tight">YOUR NAME</h4>
                <p className="text-[11px] text-slate-400">Premium Member</p>
              </div>
            </div>

            {/* Sign Up Button */}
            <a
              href="https://dashboard.primescore.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Sign Up</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Bottom Nav Links */}
            <div className="space-y-2 text-xs text-slate-600 pt-2 px-1">
              <a href="https://dashboard.primescore.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-1 hover:text-slate-900 transition-colors">
                <Settings className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span className="text-[13px]">Settings</span>
              </a>
              <a href="https://dashboard.primescore.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-1 hover:text-slate-900 transition-colors">
                <Headphones className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span className="text-[13px]">Contact Support</span>
              </a>
              <Link href="/" className="flex items-center gap-3 py-1 hover:text-slate-900 transition-colors">
                <LogOut className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span className="text-[13px]">Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Dashboard Workspace */}
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-5">

          {/* User Profile Card */}
          <div id="tour-profile-card" className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-4">

            {/* Top row: Score + Info + Action Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

              {/* Left Score + User Info */}
              <div className="flex items-center gap-5">
                {/* Arc Score Gauge */}
                <div className="relative w-28 h-20 flex items-center justify-center pt-2">
                  <svg className="w-28 h-28 overflow-visible" viewBox="0 0 100 100">
                    {/* Background Arc */}
                    <path
                      d="M 12 68 A 42 42 0 1 1 88 68"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    {/* Amber Score Arc */}
                    <path
                      d="M 12 68 A 42 42 0 1 1 88 68"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeDasharray="210"
                      strokeDashoffset="75"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 text-center">
                    <span className="text-2xl font-bold text-slate-900 leading-none">589</span>
                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider mt-1">Average Score</span>
                  </div>
                </div>

                {/* User Details */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold flex items-center justify-center text-base shadow-sm">
                    D
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">YOUR NAME</h2>
                    <p className="text-xs text-slate-400 font-medium">GENDER</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Last Fetched */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">
                  Last fetched: <strong className="text-slate-600 font-semibold">13 Jul, 12:38 pm</strong>
                </span>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href="https://dashboard.primescore.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-2 border-[#10B981] hover:bg-emerald-50 text-[#059669] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#059669]" />
                    <span>Sign Up Now</span>
                  </a>
                  <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                    <Download className="w-3.5 h-3.5" /> Download Multi Bureau Report
                  </button>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Credit Report Overview
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom 3 Information Pill Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">

              {/* PAN */}
              <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PAN</span>
                  <span className="text-xs font-bold text-slate-800 font-mono tracking-tight">XXGQ5764X</span>
                </div>
              </div>

              {/* Mobile */}
              <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">MOBILE</span>
                  <span className="text-xs font-bold text-slate-800 font-mono tracking-tight">+91 77239XXXXX</span>
                </div>
              </div>

              {/* DOB */}
              <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DOB</span>
                  <span className="text-xs font-bold text-slate-800 tracking-tight">30 Apr 1992</span>
                </div>
              </div>

            </div>

          </div>

          {/* Tabs Pill Navigation */}
          <div className="bg-[#EBEFF5]/60 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'accounts', label: 'Accounts' },
              { id: 'enquiries', label: 'Enquiries' },
              { id: 'comparison', label: 'Comparison' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[100px] py-2.5 px-4 rounded-xl transition-all text-center ${activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">

              {/* 4 Bureau Score Cards */}
              <div id="tour-bureau-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { bureau: 'EQUIFAX INDIA', score: 547, status: 'Poor', dotColor: 'bg-red-500', statusColor: 'text-red-500', stroke: '#EF4444', total: 16, active: 1, closed: 15 },
                  { bureau: 'EXPERIAN INDIA', score: 488, status: 'Poor', dotColor: 'bg-red-500', statusColor: 'text-red-500', stroke: '#EF4444', total: 27, active: 5, closed: 22 },
                  { bureau: 'CRIF HIGH MARK', score: 611, status: 'Fair', dotColor: 'bg-amber-500', statusColor: 'text-amber-600', stroke: '#F59E0B', total: 28, active: 5, closed: 23 },
                  { bureau: 'TRANSUNION CIBIL', score: 708, status: 'Good', dotColor: 'bg-teal-500', statusColor: 'text-teal-600', stroke: '#0D9488', total: 27, active: 5, closed: 22 },
                ].map((b, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm flex flex-col justify-between">
                    <div>
                      {/* Title Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-2 h-2 rounded-full ${b.dotColor}`} />
                        <span className="text-[11px] font-bold text-slate-700 tracking-wide">{b.bureau}</span>
                      </div>

                      {/* Donut Gauge + Status & Counts */}
                      <div className="flex items-center gap-4">
                        {/* Gauge */}
                        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="9" fill="transparent" />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              stroke={b.stroke}
                              strokeWidth="9"
                              fill="transparent"
                              strokeDasharray="238.7"
                              strokeDashoffset="80"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute text-center leading-none">
                            <span className="text-lg font-bold text-slate-900 block">{b.score}</span>
                            <span className="text-[8px] text-slate-400 font-bold">/900</span>
                          </div>
                        </div>

                        {/* Details Right */}
                        <div className="flex-1 space-y-1 text-xs">
                          <div className="mb-1">
                            <span className={`text-xs font-bold ${b.statusColor}`}>{b.status}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-500 text-[11px]">
                            <span>Accounts</span>
                            <span className="font-bold text-slate-800">{b.total}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-500 text-[11px]">
                            <span>Active</span>
                            <span className="font-bold text-slate-800">{b.active}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-500 text-[11px]">
                            <span>Closed</span>
                            <span className="font-bold text-slate-800">{b.closed}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Fetched: 13 Jul, 12:38 pm</span>
                      <button className="text-[#4F46E5] hover:underline flex items-center gap-1 font-semibold">
                        <Download className="w-3 h-3" /> Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discrepancy Alerts & Credit Mix Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* Discrepancy Alerts Box (7 cols) */}
                <div id="tour-discrepancy-alerts" className="lg:col-span-7 bg-[#FFFDF5] rounded-2xl p-5 border border-amber-200/80 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Discrepancy Alerts</span>
                    </div>
                    <button className="text-xs font-bold text-amber-700 hover:underline">
                      View All (34) &gt;
                    </button>
                  </div>

                  <p className="text-xs text-amber-900/80 font-medium">
                    We found <strong className="text-amber-900">34 potential issue(s)</strong> across your bureau reports that may be impacting your score.
                  </p>

                  {/* Alert Items */}
                  <div className="space-y-2.5">

                    {/* Item 1 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Suit Filed</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">Experian</span>
                        <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded">CRITICAL</span>
                      </div>
                      <button className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all">
                        Raise a Request
                      </button>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Name Mismatch (PAN vs Report)</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">CRIF</span>
                        <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded">MEDIUM</span>
                      </div>
                      <button className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all">
                        Raise a Request
                      </button>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">Name Variation Across Bureaus</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">CRIF</span>
                        <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded">MEDIUM</span>
                      </div>
                      <button className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all">
                        Raise a Request
                      </button>
                    </div>

                  </div>

                  {/* Big Banner Button */}
                  <button className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm">
                    Review &amp; Dispute
                  </button>
                </div>

                {/* Credit Mix Visual Box (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Credit Mix</h3>

                    <div className="flex items-center justify-between gap-4 py-2">
                      {/* Donut */}
                      <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="38" stroke="#4F46E5" strokeWidth="11" fill="transparent" strokeDasharray="238.7" strokeDashoffset="114" />
                          <circle cx="50" cy="50" r="38" stroke="#EF4444" strokeWidth="11" fill="transparent" strokeDasharray="238.7" strokeDashoffset="197" />
                          <circle cx="50" cy="50" r="38" stroke="#F59E0B" strokeWidth="11" fill="transparent" strokeDasharray="238.7" strokeDashoffset="220" />
                          <circle cx="50" cy="50" r="38" stroke="#0D9488" strokeWidth="11" fill="transparent" strokeDasharray="238.7" strokeDashoffset="231" />
                        </svg>
                        <div className="absolute text-center leading-none">
                          <span className="text-xl font-black text-slate-900 block">29</span>
                          <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wider">ACCOUNTS</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex-1 space-y-2 text-[11px] font-medium text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Personal Loan</span>
                          <span className="font-bold text-slate-800">52%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Gold Loan</span>
                          <span className="font-bold text-slate-800">35%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Credit Card</span>
                          <span className="font-bold text-slate-800">10%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500" /> Priority Sector Gold Loan</span>
                          <span className="font-bold text-slate-800">3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ACCOUNTS */}
          {activeTab === 'accounts' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Active Accounts Breakdown (29)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-2">Account Name</th>
                      <th className="py-2.5 px-2">Type</th>
                      <th className="py-2.5 px-2">Bureaus</th>
                      <th className="py-2.5 px-2 text-right">Balance</th>
                      <th className="py-2.5 px-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[
                      { name: 'SMICC (****8568)', type: 'Personal Loan', bureaus: 'CIBIL, CRIF, Experian', balance: '₹3,964', status: 'Active' },
                      { name: 'SMICC (****3844)', type: 'Personal Loan', bureaus: 'CIBIL, CRIF, Experian, Equifax', balance: '₹2,631', status: 'Active' },
                      { name: 'IOB (****2158)', type: 'Gold Loan', bureaus: 'CIBIL, CRIF, Experian', balance: '₹288,000', status: 'Active' },
                      { name: 'FEDBANKFSL (****0484)', type: 'Gold Loan', bureaus: 'CIBIL, CRIF, Experian', balance: '₹39,822', status: 'Active' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-bold text-slate-900">{row.name}</td>
                        <td className="py-3 px-2 text-slate-600">{row.type}</td>
                        <td className="py-3 px-2 text-slate-500">{row.bureaus}</td>
                        <td className="py-3 px-2 text-right font-bold text-slate-800">{row.balance}</td>
                        <td className="py-3 px-2 text-center">
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Recent Credit Enquiries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-2">Lender</th>
                      <th className="py-2.5 px-2">Purpose</th>
                      <th className="py-2.5 px-2 text-right">Amount</th>
                      <th className="py-2.5 px-2 text-center">Date</th>
                      <th className="py-2.5 px-2 text-right">Bureau</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[
                      { lender: 'XXXXXXXXXX', purpose: 'Two-Wheeler Loan', amount: '₹5,000', date: '27-Jun-2026', bureau: 'Experian' },
                      { lender: 'BAJAJ FIN LTD', purpose: 'Other', amount: '₹1', date: '29-May-2026', bureau: 'CIBIL' },
                      { lender: 'CANARA BANK', purpose: 'Personal Loan', amount: '₹215,000', date: '02-Jul-2025', bureau: 'CIBIL' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-bold text-slate-900">{row.lender}</td>
                        <td className="py-3 px-2 text-slate-600">{row.purpose}</td>
                        <td className="py-3 px-2 text-right font-bold text-slate-800">{row.amount}</td>
                        <td className="py-3 px-2 text-center text-slate-500">{row.date}</td>
                        <td className="py-3 px-2 text-right font-semibold text-slate-700">{row.bureau}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Bureau Comparison Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-2">Metric</th>
                      <th className="py-2.5 px-2 text-center text-teal-600">CIBIL</th>
                      <th className="py-2.5 px-2 text-center text-amber-600">CRIF</th>
                      <th className="py-2.5 px-2 text-center text-red-600">EXPERIAN</th>
                      <th className="py-2.5 px-2 text-center text-red-600">EQUIFAX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[
                      { metric: 'Total Accounts', cibil: 27, crif: 28, experian: 27, equifax: 16 },
                      { metric: 'Active Accounts', cibil: 5, crif: 5, experian: 5, equifax: 1 },
                      { metric: 'Credit Score', cibil: 708, crif: 611, experian: 488, equifax: 547 },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-bold text-slate-900">{row.metric}</td>
                        <td className="py-3 px-2 text-center font-bold text-teal-600">{row.cibil}</td>
                        <td className="py-3 px-2 text-center font-bold text-amber-600">{row.crif}</td>
                        <td className="py-3 px-2 text-center font-bold text-red-600">{row.experian}</td>
                        <td className="py-3 px-2 text-center font-bold text-red-600">{row.equifax}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Guided Product Walkthrough Tour Overlay (starts after loading intro ends) */}
      {isIntroComplete && <DashboardTourOverlay />}
    </div>
  )
}
