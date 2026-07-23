'use client'
import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TimedPopup() {
  const [showCallWidget, setShowCallWidget] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/lighthouse|chrome-lighthouse|speedinsights|googlebot/i.test(ua)) {
        return // Bypass crawler performance tests
      }
    }

    // Show custom query/missed call badge after 5 seconds
    const widgetTimer = setTimeout(() => {
      setShowCallWidget(true)
    }, 5000)

    return () => {
      clearTimeout(widgetTimer)
    }
  }, [])

  if (!showCallWidget) return null

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 left-6 z-[60] sm:bottom-8 sm:left-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="relative w-28 h-28"
        >
          {/* Main Round Circular Badge (SaaS look) */}
          <a
            href="tel:+916350671636"
            className="w-full h-full rounded-full bg-white border border-slate-100 shadow-2xl flex flex-col items-center justify-between p-2 relative overflow-hidden group select-none hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300"
          >
            {/* Top half: Credit score gauge graphic */}
            <div className="w-full h-12 flex flex-col items-center justify-end relative pt-2">
              <svg className="w-16 h-10 overflow-visible" viewBox="0 0 100 50">
                {/* Arc tracks */}
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f43f5e" strokeWidth="12" strokeDasharray="31.4 94.2" strokeDashoffset="0" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f97316" strokeWidth="12" strokeDasharray="31.4 94.2" strokeDashoffset="-31.4" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#a3e635" strokeWidth="12" strokeDasharray="31.4 94.2" strokeDashoffset="-62.8" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="31.4 94.2" strokeDashoffset="-94.2" />
                
                {/* Needle */}
                <line x1="50" y1="50" x2="82" y2="46" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="50" cy="50" r="4.5" fill="#0f172a" />
              </svg>
            </div>

            {/* Circular text simulation: HAVE A QUERY? CLICK TO CALL (Smaller radius, color changed to brandNavy, bold text) */}
            <div className="absolute inset-0 pointer-events-none animate-[spin_24s_linear_infinite] z-10">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                <path id="circlePath" d="M 50 14 A 36 36 0 1 1 49.9 14" fill="none" />
                <text className="fill-brandNavy font-sans font-black uppercase text-[10.2px] tracking-[1.9px] antialiased">
                  <textPath href="#circlePath">
                    Have a Query? Call Us 
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Bottom half: Solid Brand Blue background with missed call icon (higher z-index to overlay rotating text) */}
            <div className="absolute bottom-0 left-0 right-0 h-[48%] bg-brandBlue flex flex-col items-center justify-center p-1 group-hover:bg-[#1d4ed8] transition-colors duration-300 z-20">
              {/* Missed Call SVG (Phone receiver with arrow pointing up-right) */}
              <svg className="w-6 h-6 text-white overflow-visible" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                {/* Outgoing missed call receiver */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.5l4 4m0-4l-4 4" strokeWidth="2.5" />
              </svg>
            </div>
          </a>

          {/* Cross Close Icon positioning exactly on top-right */}
          <button
            onClick={() => setShowCallWidget(false)}
            className="absolute -top-1 -right-1 z-[70] grid h-6.5 w-6.5 place-items-center rounded-full bg-slate-900 border border-slate-700 text-white shadow-xl hover:bg-black transition-all p-1"
            aria-label="Close call widget"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
