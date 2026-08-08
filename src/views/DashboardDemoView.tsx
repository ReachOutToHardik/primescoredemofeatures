'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronLeft,
  Info,
  Smartphone,
  Calendar,
  CreditCard as PanIcon,
  ExternalLink,
  Phone,
  X
} from 'lucide-react'

export default function DashboardDemoView() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'enquiries' | 'comparison'>('overview')
  const [isCreditReportsOpen, setIsCreditReportsOpen] = useState(true)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  // Demo Feature Modal State
  const [demoModal, setDemoModal] = useState<{
    isOpen: boolean
    title: string
    description: string
    isDownloadOnly?: boolean
  } | null>(null)

  const openDemoModal = (title: string, description: string, isDownloadOnly = false) => {
    setDemoModal({
      isOpen: true,
      title,
      description,
      isDownloadOnly
    })
  }

  const closeDemoModal = () => {
    setDemoModal(null)
  }

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

      {/* Main Container Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">

        {/* ── DESKTOP LEFT SIDEBAR (hidden lg:flex) ── */}
        <aside id="tour-sidebar-nav" className="hidden lg:flex w-[240px] bg-white border-r border-slate-200/80 p-4 lg:py-6 lg:px-4 flex-col justify-between shrink-0 overflow-y-auto z-20">
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
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all bg-[#EEF2FF] text-[#4F46E5] font-semibold"
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
                      <button
                        key={bureau}
                        onClick={() => openDemoModal(`${bureau} Report Access`, `To view live line-by-line loan entries and credit score history for ${bureau}, sign up for full access or talk to our credit team.`)}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#4F46E5] hover:bg-indigo-50/60 transition-all focus:outline-none"
                      >
                        {bureau}
                      </button>
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

              <button
                type="button"
                onClick={() => openDemoModal("Access Subscription Management", "To manage your active credit repair plan, view billing invoices, or upgrade your package, sign up for full access or contact our team.")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Subscription</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openDemoModal("Access Refer & Earn Rewards", "To generate your unique referral link and claim credit audit cashback rewards, sign up for full access or speak with our team.")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Refer &amp; Earn</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openDemoModal("Access Account Profile & KYC", "To manage your verified KYC documents, personal details, and security preferences, sign up for full access or contact our team.")}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Profile</span>
                </div>
              </button>
            </nav>
          </div>

          {/* User Profile Footer Section */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-full bg-[#0E1726] text-white font-semibold flex items-center justify-center text-xs shadow-sm shrink-0">
                D
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate tracking-tight">DEMO USER</h4>
                <p className="text-[11px] text-slate-400">Premium Member</p>
              </div>
            </div>

            <a
              href="https://dashboard.primescore.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Sign Up</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="space-y-2 text-xs text-slate-600 pt-2 px-1">
              <button onClick={() => openDemoModal("Access Account Settings", "To customize your notifications, security, and dashboard layout, sign up for full access or contact our team.")} className="w-full flex items-center gap-3 py-1 hover:text-slate-900 transition-colors text-left">
                <Settings className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span className="text-[13px]">Settings</span>
              </button>
              <button onClick={() => openDemoModal("Access Support Desk", "To get 2-hour SLA response support from senior credit audit analysts, sign up for full access or call us directly.")} className="w-full flex items-center gap-3 py-1 hover:text-slate-900 transition-colors text-left">
                <Headphones className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span className="text-[13px]">Contact Support</span>
              </button>
              <Link href="/" className="flex items-center gap-3 py-1 hover:text-slate-900 transition-colors">
                <LogOut className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                <span className="text-[13px]">Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* ── DESKTOP MAIN WORKSPACE (hidden lg:block) ── */}
        <main className="hidden lg:block flex-1 h-full overflow-y-auto p-6 lg:p-7 space-y-5">

          {/* User Profile Card */}
          <div id="tour-profile-card" className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                {/* Arc Score Gauge */}
                <div className="relative w-28 h-20 flex items-center justify-center pt-2">
                  <svg className="w-28 h-28 overflow-visible" viewBox="0 0 100 100">
                    <path
                      d="M 12 68 A 42 42 0 1 1 88 68"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
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

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-bold flex items-center justify-center text-base shadow-sm">
                    D
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight">DEMO USER</h2>
                    <p className="text-xs text-slate-400 font-medium">Verified Profile</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">
                  Last fetched: <strong className="text-slate-600 font-semibold">13 Jul, 12:38 pm</strong>
                </span>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => openDemoModal("Refresh Credit Report & Scores", "You can refresh your latest report and updated scores across all 4 bureaus directly from here. Sign up for full access to fetch your live real-time credit updates.")}
                    className="bg-white border-2 border-[#10B981] hover:bg-emerald-50 text-[#059669] font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#059669]" />
                    <span>+ Refresh Now</span>
                  </button>
                  <button
                    onClick={() => openDemoModal("Download Unified 4-Bureau Report", "You can download your multi-bureau report which has all the data combined from all 4 bureaus (CIBIL, Experian, Equifax & CRIF) into one comprehensive PDF report.", true)}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Multi Bureau Report
                  </button>
                  <button
                    onClick={() => openDemoModal("Credit Report Overview & Analysis", "Access full line-by-line breakdown of all active loan accounts, credit utilization, and bureau status summaries. Sign up for full access or speak with our team.")}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Credit Report Overview
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PAN</span>
                  <span className="text-xs font-bold text-slate-800 font-mono tracking-tight">XXGQ5764X</span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-3.5 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-400 shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">MOBILE</span>
                  <span className="text-xs font-bold text-slate-800 font-mono tracking-tight">+91 77239XXXXX</span>
                </div>
              </div>

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
          <div className="bg-[#EBEFF5]/60 p-1 rounded-2xl flex items-center gap-1 text-xs font-bold overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'accounts', label: 'Accounts' },
              { id: 'enquiries', label: 'Enquiries' },
              { id: 'comparison', label: 'Comparison' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[100px] py-2.5 px-4 rounded-xl transition-all text-center ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div id="tour-bureau-cards" className="grid grid-cols-4 gap-4">
                {[
                  { bureau: 'EQUIFAX INDIA', score: 547, status: 'Poor', dotColor: 'bg-red-500', statusColor: 'text-red-500', stroke: '#EF4444', total: 16, active: 1, closed: 15 },
                  { bureau: 'EXPERIAN INDIA', score: 488, status: 'Poor', dotColor: 'bg-red-500', statusColor: 'text-red-500', stroke: '#EF4444', total: 27, active: 5, closed: 22 },
                  { bureau: 'CRIF HIGH MARK', score: 611, status: 'Fair', dotColor: 'bg-amber-500', statusColor: 'text-amber-600', stroke: '#F59E0B', total: 28, active: 5, closed: 23 },
                  { bureau: 'TRANSUNION CIBIL', score: 708, status: 'Good', dotColor: 'bg-teal-500', statusColor: 'text-teal-600', stroke: '#0D9488', total: 27, active: 5, closed: 22 },
                ].map((b, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-2 h-2 rounded-full ${b.dotColor}`} />
                        <span className="text-[11px] font-bold text-slate-700 tracking-wide">{b.bureau}</span>
                      </div>

                      <div className="flex items-center gap-4">
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

                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Fetched: 13 Jul, 12:38 pm</span>
                      <button
                        onClick={() => openDemoModal("Download Unified 4-Bureau Report", "You can download your multi-bureau report which has all the data combined from all 4 bureaus (CIBIL, Experian, Equifax & CRIF) into one comprehensive PDF report.", true)}
                        className="text-[#4F46E5] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3 h-3" /> Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discrepancies Box */}
              <div id="tour-discrepancy-alerts" className="bg-[#FFFDF5] rounded-2xl p-5 border border-amber-200/80 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Discrepancy Alerts</span>
                  </div>
                  <button onClick={() => openDemoModal("All 34 Discrepancy Alerts", "To view line-by-line flagged credit errors and submit disputes, sign up for full access or speak with our team.")} className="text-xs font-bold text-amber-700 hover:underline">
                    View All (34) &gt;
                  </button>
                </div>
                <p className="text-xs text-amber-900/80 font-medium">
                  We found <strong className="text-amber-900">34 potential issue(s)</strong> across your bureau reports that may be impacting your score.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* ── MOBILE WORKSPACE (block lg:hidden) - Native Mobile App UI ── */}
        <div className="block lg:hidden flex-1 overflow-y-auto bg-[#F8FAFC] pb-24 font-sans">
          
          {/* Top Mobile Bar */}
          <div className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors p-1" title="Back to Home">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <img src="/lightmode_Logo.png" alt="PrimeScore" className="h-7 w-auto object-contain" />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => openDemoModal("Theme Preferences", "To customize your theme preferences, sign up for full access or speak with our team.")} className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold shadow-2xs">
                🌙
              </button>
              <button onClick={() => openDemoModal("Access Account Profile & KYC", "To manage your verified KYC documents and profile details, sign up for full access or contact our team.")} className="w-9 h-9 rounded-full bg-[#0A2342] text-white font-extrabold flex items-center justify-center text-xs shadow-sm ring-2 ring-blue-500/20">
                D
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            
            {/* Title Header */}
            <div>
              <h1 className="text-2xl font-black text-slate-900 font-display tracking-tight">Multi Bureau</h1>
              <p className="text-xs text-slate-500 font-medium">Credit report for DEMO USER</p>
            </div>

            {/* CARD 1: Mobile Profile & Arc Gauge Card */}
            <div id="tour-mobile-profile-card" className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-3">
                {/* Arc Gauge */}
                <div className="relative w-28 h-20 flex items-center justify-center pt-2 shrink-0">
                  <svg className="w-28 h-28 overflow-visible" viewBox="0 0 100 100">
                    <path
                      d="M 12 68 A 42 42 0 1 1 88 68"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
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
                    <span className="text-2xl font-black text-slate-900 leading-none">589</span>
                    <span className="text-[9px] font-extrabold text-amber-500 uppercase tracking-wider mt-1">Average Score</span>
                  </div>
                </div>

                {/* User Avatar Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] font-black flex items-center justify-center text-lg shadow-sm border border-indigo-100">
                    D
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">DEMO USER</h3>
                    <p className="text-[11px] text-slate-400 font-bold">Client Profile</p>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-medium text-right pt-1">
                Last fetched: <strong className="text-slate-700 font-bold">13 Jul, 12:38 pm</strong>
              </div>

              {/* Action Buttons Row */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openDemoModal("Refresh Credit Report & Scores", "You can refresh your latest report and updated scores across all 4 bureaus directly from here. Sign up for full access to fetch your live real-time credit updates.")}
                    className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-xs py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>+ Refresh Now</span>
                  </button>

                  <button
                    onClick={() => openDemoModal("Download Unified 4-Bureau Report", "You can download your multi-bureau report which has all the data combined from all 4 bureaus (CIBIL, Experian, Equifax & CRIF) into one comprehensive PDF report.", true)}
                    className="bg-[#3730A3] hover:bg-[#312E81] text-white font-extrabold text-xs py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>

                <button
                  onClick={() => openDemoModal("Credit Report Overview & Analysis", "Access full line-by-line breakdown of all active loan accounts, credit utilization, and bureau status summaries. Sign up for full access or speak with our team.")}
                  className="w-full bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/80 text-[#4F46E5] font-extrabold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Credit Report Overview</span>
                </button>
              </div>
            </div>

            {/* CARD 2: Mobile Verification Info Pills */}
            <div id="tour-mobile-info-cards" className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-2xs flex flex-col items-center justify-center text-center gap-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0">
                  <PanIcon className="w-3.5 h-3.5" />
                </div>
                <div className="w-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block truncate">PAN</span>
                  <span className="text-[11px] font-black text-slate-900 font-mono tracking-tight block truncate">XXGQ5764X</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-2xs flex flex-col items-center justify-center text-center gap-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0">
                  <Smartphone className="w-3.5 h-3.5" />
                </div>
                <div className="w-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block truncate">MOBILE</span>
                  <span className="text-[11px] font-black text-slate-900 font-mono tracking-tight block truncate">77239XXXXX</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-2xs flex flex-col items-center justify-center text-center gap-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-500 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="w-full">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block truncate">DOB</span>
                  <span className="text-[11px] font-black text-slate-900 tracking-tight block truncate">30 Apr 1992</span>
                </div>
              </div>
            </div>

            {/* Mobile Tab Pills (All 4 Tabs Supported) */}
            <div className="bg-slate-200/60 p-1 rounded-2xl grid grid-cols-4 gap-1 text-[11px] sm:text-xs font-extrabold no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'accounts', label: 'Accounts' },
                { id: 'enquiries', label: 'Enquiries' },
                { id: 'comparison', label: 'Comparison' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-2.5 px-1 rounded-xl transition-all text-center truncate ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div id="tour-mobile-bureau-cards" className="space-y-3.5">
                  {[
                    { bureau: 'EQUIFAX INDIA', score: 547, status: 'Poor', dotColor: 'bg-red-500', statusColor: 'text-red-500', stroke: '#EF4444', total: 16, active: 1, closed: 15 },
                    { bureau: 'EXPERIAN INDIA', score: 488, status: 'Poor', dotColor: 'bg-red-500', statusColor: 'text-red-500', stroke: '#EF4444', total: 27, active: 5, closed: 22 },
                    { bureau: 'CRIF HIGH MARK', score: 611, status: 'Fair', dotColor: 'bg-amber-500', statusColor: 'text-amber-600', stroke: '#F59E0B', total: 28, active: 5, closed: 23 },
                    { bureau: 'TRANSUNION CIBIL', score: 708, status: 'Good', dotColor: 'bg-teal-500', statusColor: 'text-teal-600', stroke: '#0D9488', total: 27, active: 5, closed: 22 },
                  ].map((b, i) => (
                    <div key={i} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${b.dotColor}`} />
                          <span className="text-xs font-black text-slate-800 tracking-wide">{b.bureau}</span>
                        </div>
                        <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-slate-50 ${b.statusColor}`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
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
                            <span className="text-base font-black text-slate-900 block">{b.score}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center flex-1 ml-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-400 block uppercase">Accounts</span>
                            <span className="text-xs font-black text-slate-900">{b.total}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-400 block uppercase">Active</span>
                            <span className="text-xs font-black text-slate-900">{b.active}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-400 block uppercase">Closed</span>
                            <span className="text-xs font-black text-slate-900">{b.closed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FFFDF5] rounded-3xl p-5 border border-amber-200/80 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Discrepancy Alerts</span>
                    </div>
                    <button onClick={() => openDemoModal("All 34 Discrepancy Alerts", "To view line-by-line flagged credit errors and submit disputes, sign up for full access or speak with our team.")} className="text-xs font-extrabold text-amber-700 hover:underline">
                      View All (34) &gt;
                    </button>
                  </div>
                  <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                    We found <strong>34 potential issue(s)</strong> across your bureau reports that may be impacting your credit score.
                  </p>
                </div>
              </div>
            )}

            {/* TAB ACCOUNTS */}
            {activeTab === 'accounts' && (
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3.5">
                <h3 className="text-sm font-extrabold text-slate-900">Active &amp; Closed Accounts</h3>
                <div className="space-y-2.5">
                  {[
                    { name: 'BAJAJ FIN LTD', type: 'Consumer Loan', balance: '₹34,500', status: 'Active', color: 'bg-emerald-500' },
                    { name: 'CANARA BANK', type: 'Personal Loan', balance: '₹215,000', status: 'Active', color: 'bg-emerald-500' },
                    { name: 'HDFC BANK', type: 'Credit Card', balance: '₹0', status: 'Closed', color: 'bg-slate-400' },
                    { name: 'SMICC (****8568)', type: 'Personal Loan', balance: '₹3,964', status: 'Active', color: 'bg-emerald-500' },
                  ].map((acc, i) => (
                    <div key={i} className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-150 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-extrabold text-slate-900">{acc.name}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{acc.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-slate-900">{acc.balance}</div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-slate-500">
                          <span className={`w-1.5 h-1.5 rounded-full ${acc.color}`} />
                          {acc.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3.5">
                <h3 className="text-sm font-extrabold text-slate-900">Recent Credit Enquiries</h3>
                <div className="space-y-2.5">
                  {[
                    { lender: 'Experian Pull', purpose: 'Two-Wheeler Loan', amount: '₹5,000', date: '27-Jun-2026' },
                    { lender: 'BAJAJ FIN LTD', purpose: 'Consumer Finance', amount: '₹1', date: '29-May-2026' },
                    { lender: 'CANARA BANK', purpose: 'Personal Loan', amount: '₹215,000', date: '02-Jul-2025' },
                  ].map((enq, i) => (
                    <div key={i} className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-150 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-extrabold text-slate-900">{enq.lender}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{enq.purpose} • {enq.date}</div>
                      </div>
                      <div className="font-black text-slate-900">{enq.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB COMPARISON */}
            {activeTab === 'comparison' && (
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3.5">
                <h3 className="text-sm font-extrabold text-slate-900">Bureau Comparison Matrix</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { b: 'CIBIL', score: 708, col: 'text-teal-600', status: 'Good' },
                    { b: 'CRIF', score: 611, col: 'text-amber-600', status: 'Fair' },
                    { b: 'EXPERIAN', score: 488, col: 'text-red-500', status: 'Poor' },
                    { b: 'EQUIFAX', score: 547, col: 'text-red-500', status: 'Poor' },
                  ].map((matrix, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-150 text-center">
                      <div className="text-[10px] font-extrabold text-slate-400 uppercase">{matrix.b}</div>
                      <div className={`text-lg font-black my-0.5 ${matrix.col}`}>{matrix.score}</div>
                      <div className="text-[10px] font-extrabold text-slate-600">{matrix.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* CARD 4: Fixed Mobile Navigation App Bar */}
          <div id="tour-mobile-bottom-nav" className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2.5 flex justify-between items-center z-40 shadow-lg">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#4F46E5]">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Home</span>
            </Link>
            <button onClick={() => openDemoModal("Multi-Bureau Credit Reports", "To view and download official PDF reports from CIBIL, Experian, Equifax, and CRIF, sign up for full access or speak with our team.")} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-800">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Reports</span>
            </button>
            <Link href="/dashboard/disputes" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Disputes</span>
            </Link>
            <button onClick={() => openDemoModal("Access Account Profile & KYC", "To manage your verified KYC documents and personal details, sign up for full access or contact our team.")} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-800">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Profile</span>
            </button>
          </div>

        </div>

      </div>

      {/* Guided Product Walkthrough Tour Overlay */}
      {isIntroComplete && <DashboardTourOverlay />}

      {/* Interactive Demo Action Modal */}
      <AnimatePresence>
        {demoModal && demoModal.isOpen && (
          <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDemoModal}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="relative z-10 bg-white rounded-2xl p-6 max-w-sm sm:max-w-md w-full shadow-2xl border border-slate-200/90 text-left font-sans"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                <img src="/lightmode_Logo.png" alt="PrimeScore" className="h-6 w-auto object-contain" />
                <button
                  onClick={closeDemoModal}
                  className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#0A2342] font-display mb-2 leading-snug">
                {demoModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                {demoModal.description}
              </p>

              {/* Action Buttons */}
              {demoModal.isDownloadOnly ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                  <a
                    href="https://dashboard.primescore.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Sign Up for Full Access</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={closeDemoModal}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl transition-colors active:scale-95"
                  >
                    Back to Demo
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href="https://dashboard.primescore.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs py-3 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>Sign Up for Full Access</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="tel:+917728948413"
                      className="bg-[#0A2342] hover:bg-[#112D4E] text-white font-bold text-xs py-3 px-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call Credit Expert</span>
                    </a>
                  </div>

                  <button
                    onClick={closeDemoModal}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors active:scale-95"
                  >
                    Back to Demo
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
