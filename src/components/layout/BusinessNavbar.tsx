'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export default function BusinessNavbar() {
  const pathname = usePathname()

  const links = [
    { to: '/business', label: 'Overview' },
    { to: '/business/cibil-audit', label: 'CIBIL Audit' },
    { to: '/business/vendor-tracking', label: 'Vendor Monitoring' },
    { to: '/business/identity-security', label: 'Identity Security' },
    { to: '/business/pricing', label: 'Pricing' },
    { to: '/business/resources', label: 'Resources' },
  ]

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-[100] backdrop-blur-md bg-white/95">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Left Logo block */}
        <Link href="/business" className="flex items-center gap-3 shrink-0">
          <img 
            src="/Logo-primescore.png" 
            alt="Primescore Business" 
            className="h-10 w-auto object-contain"
          />
          <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-slate-900 text-white rounded-md">
            Commercial
          </span>
        </Link>

        {/* Center menu links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = pathname === l.to
            return (
              <Link
                key={l.to}
                href={l.to}
                className={[
                  'text-xs font-bold uppercase tracking-wider transition-colors py-2 relative',
                  isActive 
                    ? 'text-brandNavy' 
                    : 'text-textSecondary hover:text-brandNavy'
                ].join(' ')}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brandNavy rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            href="/business#audit-form" 
            className="inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-brandNavy hover:bg-brandNavy/95 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all"
          >
            <span className="hidden sm:inline">Request Consultation</span>
            <span className="inline sm:hidden">Consult</span>
            <ArrowRight className="h-3 w-3 ml-1 sm:ml-1.5 shrink-0" />
          </Link>
        </div>

      </div>
    </header>
  )
}
