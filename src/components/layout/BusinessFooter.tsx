'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaXTwitter, FaThreads } from 'react-icons/fa6'

export default function BusinessFooter() {
  const footerLink = 'text-xs text-textSecondary hover:text-[#2563EB] transition-colors duration-200'

  return (
    <footer className="w-full border-t border-brandNavy/8 bg-white py-16" data-theme="light">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        
        {/* Top Segment: 4 Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-b border-slate-100 pb-12">
          
          {/* Col 1: B2B Brand */}
          <div>
            <img src="/Logo-primescore.png" alt="Primescore Business" className="h-10 w-auto" />
            <p className="mt-4 text-xs text-textSecondary leading-relaxed">
              Verifiable commercial credit audits, registry risk monitoring, and direct dispute drafting support.
            </p>
            <div className="mt-6 flex items-center gap-4 text-textSecondary">
              <a href="https://www.facebook.com/profile.php?id=61561478021964" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] transition-colors"><FaFacebook className="h-4.5 w-4.5" /></a>
              <a href="https://x.com/Primescore_in" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><FaXTwitter className="h-4.5 w-4.5" /></a>
              <a href="http://instagram.com/primescore.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-colors"><FaInstagram className="h-4.5 w-4.5" /></a>
              <a href="http://linkedin.com/company/primescore" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] transition-colors"><FaLinkedin className="h-4.5 w-4.5" /></a>
              <a href="http://www.youtube.com/@PrimeScore-In" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors"><FaYoutube className="h-4.5 w-4.5" /></a>
              <a href="http://threads.com/@primescore.in" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><FaThreads className="h-4.5 w-4.5" /></a>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brandNavy">Solutions</div>
            <div className="mt-4 grid gap-2.5">
              <Link className={footerLink} href="/business">Business Home</Link>
              <Link className={footerLink} href="/business/about">About Us</Link>
              <Link className={footerLink} href="/business/services">Services</Link>
              <Link className={footerLink} href="/business/pricing">Corporate Pricing</Link>
            </div>
          </div>

          {/* Col 3: Resources */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brandNavy">Resources</div>
            <div className="mt-4 grid gap-2.5">
              <Link className={footerLink} href="/business/contact">Contact Support</Link>
              <Link className={footerLink} href="/about">Consumer About</Link>
              <Link className={footerLink} href="/contact">Consumer Contact</Link>
              <Link className={footerLink} href="/">Consumer Platform</Link>
            </div>
          </div>

          {/* Col 4: Corporate Address */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brandNavy">Corporate Desk</div>
            <div className="mt-4 text-xs text-textSecondary leading-relaxed">
              iStart Nest Incubation Center<br />
              Gov. Polytechnic College,<br />
              Jodhpur (Raj.) – 342001
              <div className="mt-3">
                Email: <a href="mailto:info@primescore.in" className="font-semibold text-brandNavy hover:underline">info@primescore.in</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Segment - Increased size to text-xs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-textSecondary">
          <div>
            © {new Date().getFullYear()} Primescore Fintech Private Limited. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
