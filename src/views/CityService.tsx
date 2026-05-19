'use client'

import Link from 'next/link'
import { MapPin, CheckCircle2, Phone, Mail } from 'lucide-react'

export default function CityService({ city }: { city?: string }) {
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ') : ''

  return (
    <div className="bg-white min-h-screen">
      {/* Official Header Section */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm uppercase tracking-wider mb-4">
                <MapPin className="h-4 w-4" />
                <span>Authorized Service in {cityName}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Expert CIBIL &amp; Credit Rectification Services in {cityName}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Primescore provides professional assistance to residents of {cityName} for resolving credit report inaccuracies, removing illegitimate defaults, and improving creditworthiness through a document-backed legal process.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-[#10b981] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-[#0da673] transition-colors shadow-sm">
                  Consult an Expert
                </Link>
                <a href="tel:+916350671636" className="flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Information Blocks */}
      <section className="py-20 bg-gray-50/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How We Assist Clients in {cityName}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Comprehensive Report Analysis</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our team performs a detailed audit of your credit reports from CIBIL, Experian, and Equifax to identify errors, duplicate accounts, or outdated &quot;Settled&quot; statuses that are dragging down your score.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
                  <span>Identification of clerical errors by banks</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
                  <span>Verification of payment records</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Legal Dispute Resolution</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We handle the end-to-end communication with credit bureaus and financial institutions in {cityName}. Our process is strictly governed by the Credit Information Companies (Regulation) Act.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
                  <span>Formal legal dispute filings</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
                  <span>Persistent follow-ups for resolution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Standards</h2>
            <div className="w-20 h-1.5 bg-[#10b981] mx-auto rounded-full" />
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[#10b981] font-bold">01</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">No False Promises</h4>
                <p className="text-gray-600 leading-relaxed">
                  We do not promise &quot;overnight&quot; score jumps. Credit rectification is a systematic legal process that typically takes 60-90 days for the bureaus to update their records.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[#10b981] font-bold">02</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Data Privacy</h4>
                <p className="text-gray-600 leading-relaxed">
                  Your financial data is handled with the highest level of confidentiality. We are an iStart (Govt. of Rajasthan) recognized startup committed to ethical financial practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Local Contact CTA */}
      <section className="py-20 bg-brandNavy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Our {cityName} Experts Today</h2>
          <p className="text-white/70 mb-10 text-lg">
            Schedule a free consultation to review your credit report and understand your rectification options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto bg-[#10b981] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#0da673] transition-all">
              Book a Consultation
            </Link>
            <a href="mailto:info@primescore.in" className="flex items-center gap-2 text-white hover:text-[#10b981] transition-colors">
              <Mail className="h-5 w-5" /> info@primescore.in
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
