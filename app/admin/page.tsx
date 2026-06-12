'use client'

import React from 'react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Welcome to Primescore Admin</h1>
          <p className="text-gray-500">Manage your business operations, leads, and content from here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Leads CRM Card */}
        <Link href="/admin/leads" className="group flex flex-col bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all h-full">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-5 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Leads CRM</h2>
          <p className="text-gray-500 mb-6 flex-1 text-sm">See the contacts and queries submitted on our website.</p>
          <div className="text-gray-900 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Open CRM <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </Link>
        
        {/* Blog Editor Card */}
        <Link href="/admin/blog-editor" className="group flex flex-col bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all h-full">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-5 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Blog Editor</h2>
          <p className="text-gray-500 mb-6 flex-1 text-sm">Write, edit, and publish articles to the Knowledge Hub using the rich text editor.</p>
          <div className="text-gray-900 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Open Editor <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </Link>

        {/* Analytics Card */}
        <Link href="/admin/analytics" className="group flex flex-col bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all h-full">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-5 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Live Analytics</h2>
          <p className="text-gray-500 mb-6 flex-1 text-sm">Track your website traffic instantly. Top pages, referrers, and live visitor trends.</p>
          <div className="text-gray-900 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            View Analytics <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </Link>

        {/* Access Control Card */}
        <Link href="/admin/team" className="group flex flex-col bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all h-full">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 mb-5 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Access Control</h2>
          <p className="text-gray-500 mb-6 flex-1 text-sm">Manage your team. Invite writers, assign sales reps, and control platform access.</p>
          <div className="text-gray-900 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Manage Team <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </Link>
      </div>
    </div>
  )
}
