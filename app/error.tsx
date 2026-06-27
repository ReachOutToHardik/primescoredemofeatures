'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an analytics or reporting service
    console.error('Unhandled Application Error:', error)
  }, [error])

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 pt-32 pb-12 relative overflow-hidden bg-night">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandRed/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brandNavy/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Warning Icon */}
        <div className="inline-flex items-center justify-center p-4 bg-brandRed/10 border border-brandRed/20 text-brandRed rounded-3xl mb-6 animate-bounce">
          <AlertTriangle size={36} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-display font-extrabold tracking-tight text-brandNavy mb-3">
          Something went wrong
        </h1>
        <p className="text-textSecondary text-sm mb-8 leading-relaxed max-w-sm mx-auto">
          An unexpected server error occurred. We have logged this event and are investigating. Let's try recovering the page.
        </p>

        {/* Error Code metadata if exists */}
        {error.digest && (
          <div className="mb-6 p-2 bg-slate-100 rounded-lg text-[10px] font-mono text-slate-400 select-all border border-slate-200">
            Error ID: {error.digest}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brandNavy text-white hover:bg-brandNavy/90 font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-[0.99] text-sm"
          >
            <RotateCcw size={16} />
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
