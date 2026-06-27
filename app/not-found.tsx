'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, BookOpen, Calculator, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-12 relative overflow-hidden bg-night">
      {/* Background blobs for premium depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandRed/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brandNavy/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Error Code */}
        <div className="inline-flex items-center justify-center mb-4">
          <span className="text-8xl md:text-9xl font-display font-black tracking-tight bg-gradient-to-r from-brandRed via-brandNavy to-brandNavy bg-clip-text text-transparent select-none">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-brandNavy mb-4 leading-tight">
          Page Lost in the Credit Maze
        </h1>
        <p className="text-textSecondary text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The link might be broken, outdated, or moved. Let's get you back on track to financial clarity.
        </p>

        {/* Grid of helpful paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 bg-white/70 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-sm hover:shadow group"
          >
            <div className="p-2.5 bg-brandBlue/10 text-brandBlue rounded-xl group-hover:scale-110 transition-transform">
              <Home size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-brandNavy">Return Home</div>
              <div className="text-xs text-textSecondary">Back to landing page</div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-3 p-4 bg-white/70 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-sm hover:shadow group"
          >
            <div className="p-2.5 bg-brandRed/10 text-brandRed rounded-xl group-hover:scale-110 transition-transform">
              <BookOpen size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-brandNavy">Knowledge Hub</div>
              <div className="text-xs text-textSecondary">Read credit guides</div>
            </div>
          </Link>

          <Link
            href="/tools/fd"
            className="flex items-center gap-3 p-4 bg-white/70 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-sm hover:shadow group"
          >
            <div className="p-2.5 bg-brandYellow/10 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
              <Calculator size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-brandNavy">Financial Tools</div>
              <div className="text-xs text-textSecondary">Calculate FD & EMI</div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-3 p-4 bg-white/70 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all shadow-sm hover:shadow group"
          >
            <div className="p-2.5 bg-brandGreen/10 text-brandGreen rounded-xl group-hover:scale-110 transition-transform">
              <HelpCircle size={18} />
            </div>
            <div>
              <div className="font-bold text-sm text-brandNavy">Consult Experts</div>
              <div className="text-xs text-textSecondary">Connect with advisors</div>
            </div>
          </Link>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-brandNavy hover:text-brandRed transition-colors py-2 px-4 border border-slate-200 hover:border-slate-300 rounded-full bg-white shadow-sm"
        >
          <ArrowLeft size={14} />
          Go Back
        </button>
      </div>
    </div>
  )
}
