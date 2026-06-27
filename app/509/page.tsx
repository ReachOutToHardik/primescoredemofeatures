'use client'

import React from 'react'
import Link from 'next/link'
import { Activity, RefreshCw, Home } from 'lucide-react'

export default function BandwidthExceededPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-12 relative overflow-hidden bg-night">
      {/* Background blobs for premium depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandRed/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brandNavy/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Activity Icon */}
        <div className="inline-flex items-center justify-center p-4 bg-brandRed/10 border border-brandRed/20 text-brandRed rounded-3xl mb-6">
          <Activity size={36} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-brandNavy mb-3">
          509 — Bandwidth Peak Limit
        </h1>
        <p className="text-textSecondary text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          The server is experiencing high traffic volumes and has temporarily paused new incoming requests. Please reload in a few minutes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brandNavy text-white hover:bg-brandNavy/90 font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-[0.99] text-sm"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brandNavy hover:bg-slate-55 border border-slate-200 hover:border-slate-300 font-bold px-6 py-3 rounded-xl transition-all shadow-sm active:scale-[0.99] text-sm"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
