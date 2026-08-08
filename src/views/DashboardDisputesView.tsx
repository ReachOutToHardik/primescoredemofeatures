'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import DashboardIntroLoader from '../components/ui/DashboardIntroLoader'
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
  ChevronDown,
  ChevronLeft,
  Plus,
  Folder,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react'

export default function DashboardDisputesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreditReportsOpen, setIsCreditReportsOpen] = useState(true)

  const disputesData = [
    {
      caseId: '#CR-BYZAJBPP',
      subject: 'TransUnion CIBIL Bureau Dispute',
      type: 'Closed Account Showing Overdue',
      date: 'Jul 19, 2026',
      status: 'Submitted',
      statusColor: 'bg-[#D1FAE5] text-[#059669]'
    },
    {
      caseId: '#CR-VNWIFJQ8',
      subject: 'TransUnion CIBIL Bureau Dispute',
      type: 'Closed Account Showing Overdue',
      date: 'Jul 07, 2026',
      status: 'In Progress',
      statusColor: 'bg-[#EEF2FF] text-[#4F46E5]'
    }
  ]

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-[#F4F6F9] text-slate-800 flex flex-col font-sans selection:bg-[#253B7E]/10">
      {/* Premium Dashboard Logo Intro Animation */}
      <DashboardIntroLoader />

      {/* Top Banner Marquee */}
      <div className="w-full bg-[#0B132B] text-white py-2 px-4 flex items-center justify-between overflow-hidden border-b border-slate-800/80 shrink-0 shadow-md z-50">
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

        <a
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

        {/* ── DESKTOP LEFT SIDEBAR (hidden lg:flex) ── */}
        <aside className="hidden lg:flex w-[240px] bg-white border-r border-slate-200/80 p-4 lg:py-6 lg:px-4 flex-col justify-between shrink-0 overflow-y-auto z-20">
          <div>
            <div className="flex items-center gap-2 mb-8 px-2">
              <Link href="/">
                <img src="/lightmode_Logo.png" alt="PrimeScore" className="h-10 w-auto object-contain" />
              </Link>
            </div>

            <nav className="space-y-1.5">
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 stroke-[1.75]" />
                  <span className="text-[13px]">Dashboard</span>
                </div>
              </Link>

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
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all bg-[#EEF2FF] text-[#4F46E5] font-semibold"
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
                  <span className="text-[13px]">Refer &amp; Earn</span>
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

        {/* ── DESKTOP MAIN DISPUTES WORKSPACE (hidden lg:block) ── */}
        <main className="hidden lg:block flex-1 h-full overflow-y-auto p-6 lg:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Rectification Cases</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Manage and track the progress of your credit disputes.
              </p>
            </div>

            <a
              href="https://dashboard.primescore.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B1B3A] hover:bg-[#2A2A56] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Case</span>
            </a>
          </div>

          {/* 4 Stat Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm relative overflow-hidden flex flex-col justify-between h-31">
              <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <Folder className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Total Cases</span>
                <span className="text-2xl font-bold text-slate-900 leading-none">2</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm relative overflow-hidden flex flex-col justify-between h-31">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">In Progress</span>
                <span className="text-2xl font-bold text-slate-900 leading-none">2</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm relative overflow-hidden flex flex-col justify-between h-31">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Resolved</span>
                <span className="text-2xl font-bold text-slate-900 leading-none">0</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm relative overflow-hidden flex flex-col justify-between h-31">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Action Required</span>
                <span className="text-2xl font-bold text-slate-900 leading-none">0</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFDF5] rounded-2xl p-5 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-medium text-amber-900">
                <strong className="font-semibold">34 detected issue(s)</strong> found in your credit profile that may need a rectification request.
              </span>
            </div>

            <a
              href="https://dashboard.primescore.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-emerald-500 bg-white hover:bg-emerald-50 text-emerald-600 font-extrabold text-xs px-4 py-2 rounded-full transition-all shadow-sm shrink-0 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Sign Up Now</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#4F46E5] shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button className="bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 font-medium text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter</span>
              </button>
              <button className="bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 font-medium text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] bg-slate-50/50">
                    <th className="py-3.5 px-5">CASE ID</th>
                    <th className="py-3.5 px-5">SUBJECT</th>
                    <th className="py-3.5 px-5">DISPUTE TYPE</th>
                    <th className="py-3.5 px-5">DATE INITIATED</th>
                    <th className="py-3.5 px-5">STATUS</th>
                    <th className="py-3.5 px-5 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {disputesData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-800 font-mono text-[11px]">
                        {row.caseId}
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-7.5 h-7.5 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-semibold text-slate-900">{row.subject}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-slate-600 font-normal">
                        {row.type}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 font-normal">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`text-[11px] font-medium px-3 py-1 rounded-full inline-block ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button className="text-slate-700 font-semibold text-xs hover:text-[#4F46E5] inline-flex items-center gap-1 transition-colors">
                          View &gt;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-100 text-[11px] text-slate-400 font-normal">
              Showing 1 to 2 of 2 cases
            </div>
          </div>
        </main>

        {/* ── MOBILE DISPUTES WORKSPACE (block lg:hidden) - Native Mobile App UI ── */}
        <div className="block lg:hidden flex-1 overflow-y-auto bg-[#F8FAFC] pb-24 font-sans">
          
          {/* Top Mobile Header Bar */}
          <div className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors p-1" title="Back to Dashboard">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <img src="/lightmode_Logo.png" alt="PrimeScore" className="h-7 w-auto object-contain" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold shadow-2xs">
                🌙
              </div>
              <div className="w-9 h-9 rounded-full bg-[#0A2342] text-white font-extrabold flex items-center justify-center text-xs shadow-sm ring-2 ring-blue-500/20">
                D
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            
            {/* Title Header & New Case CTA */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-black text-slate-900 font-display tracking-tight">Disputes Desk</h1>
                <p className="text-xs text-slate-500 font-medium">Track rectification case status</p>
              </div>

              <a
                href="https://dashboard.primescore.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1B1B3A] hover:bg-[#2A2A56] text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>New Case</span>
              </a>
            </div>

            {/* 4 Stat Cards 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-2">
                  <Folder className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Total Cases</span>
                <span className="text-xl font-black text-slate-900">2</span>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 block uppercase">In Progress</span>
                <span className="text-xl font-black text-slate-900">2</span>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Resolved</span>
                <span className="text-xl font-black text-slate-900">0</span>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Action Required</span>
                <span className="text-xl font-black text-slate-900">0</span>
              </div>
            </div>

            {/* Discrepancy Yellow Alert Banner */}
            <div className="bg-[#FFFDF5] rounded-3xl p-4 border border-amber-200/80 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>34 Discrepancy Issues Flagged</span>
              </div>
              <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
                Found 34 potential errors in your bureau reports that require formal legal dispute filings.
              </p>
              <a
                href="https://dashboard.primescore.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>File Disputes Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Case Cards List */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest px-1">Active Cases (2)</h3>
              
              {disputesData.map((row, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 font-mono tracking-wider">{row.caseId}</span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-snug">{row.subject}</h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{row.type}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">Initiated: {row.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Fixed Mobile Bottom App Bar Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2.5 flex justify-between items-center z-40 shadow-lg">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-800">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Home</span>
            </Link>
            <a href="https://dashboard.primescore.in/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-800">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Reports</span>
            </a>
            <Link href="/dashboard/disputes" className="flex flex-col items-center gap-1 text-[#4F46E5]">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Disputes</span>
            </Link>
            <a href="https://dashboard.primescore.in/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-800">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-extrabold">Profile</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}
