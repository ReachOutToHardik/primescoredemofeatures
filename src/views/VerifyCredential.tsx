'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Calendar, Award, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'

interface Credential {
  id: string
  intern_name: string
  role: string
  start_date: string
  end_date: string
  issue_date: string
  status: 'active' | 'revoked'
}

export default function VerifyCredential({ id }: { id: string }) {
  const [credential, setCredential] = useState<Credential | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchCredential = async () => {
      try {
        if (!supabase) {
          setLoading(false)
          return
        }
        const { data, error } = await supabase
          .from('intern_credentials')
          .select('*')
          .eq('id', id)
          .single()

        if (error || !data) {
          setError(true)
        } else {
          setCredential(data)
        }
      } catch (err) {
        console.error('Error fetching credential:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCredential()
  }, [id])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-body text-brandNavy pt-28 pb-24 flex items-center justify-center relative overflow-hidden" data-theme="light">
      {/* Background lights */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-heroRadial opacity-[0.8]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brandBlue/10 blur-[150px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl px-4 relative z-10">
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-full border-2 border-t-brandBlue border-brandNavy/15 animate-spin" />
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verifying credential ledger...</p>
          </div>
        ) : error || !credential ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-3xl border border-red-500/20 bg-white p-10 text-center shadow-md backdrop-blur-md max-w-md mx-auto"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-500/10 mx-auto mb-6 text-red-500">
              <XCircle className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black text-brandNavy mb-2">Invalid Credential ID</h1>
            <p className="text-textSecondary text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              This certificate code could not be verified in the Primescore credential registry. Please check the URL or check with the issuer.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brandBlue hover:text-blue-600 transition-colors">
              Return to Homepage
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-10 items-center w-full">
            
            {/* 1. The Verification Registry Card */}
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-2xl rounded-3xl border border-brandNavy/10 bg-white p-8 sm:p-12 shadow-card backdrop-blur-xl overflow-hidden"
            >
              {/* Hologram/Gold seal overlay */}
              <div className="absolute top-0 right-0 h-40 w-40 translate-x-12 -translate-y-12 rounded-full bg-brandBlue/20 blur-3xl pointer-events-none" />

              {/* Top Seal Banner */}
              <div className="flex justify-between items-center gap-4 flex-col sm:flex-row pb-8 border-b border-brandNavy/10">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 bg-emerald-500/10 rounded-full px-3 py-1 w-max">
                    <ShieldCheck className="h-4 w-4" /> SECURELY VERIFIED
                  </div>
                  <h1 className="text-xs font-mono text-textSecondary mt-2">Ledger ID: {credential.id}</h1>
                </div>
                <img id="primescore-logo" src="/lightmode_Logo.png" alt="Primescore" className="h-8 w-auto" />
              </div>

              {/* Recipient Details */}
              <div className="mt-8 text-center sm:text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-textSecondary">This certifies that</p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-brandNavy mt-3 font-display">{credential.intern_name}</h2>
                <p className="text-textSecondary mt-6 text-sm sm:text-base leading-relaxed">
                  has successfully completed their internship at Primescore. They served as an active contributor in the domain of <span className="text-brandNavy font-bold">{credential.role}</span>.
                </p>
              </div>

              {/* Date Details */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 bg-slate-50 p-5 rounded-2xl border border-brandNavy/5">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tenure Period</p>
                  <div className="flex items-center gap-2 mt-1.5 text-sm text-brandNavy font-semibold">
                    <Calendar className="h-4 w-4 text-brandBlue" />
                    {formatDate(credential.start_date)} – {formatDate(credential.end_date)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date of Issuance</p>
                  <div className="flex items-center gap-2 mt-1.5 text-sm text-brandNavy font-semibold">
                    <Award className="h-4 w-4 text-brandBlue" />
                    {formatDate(credential.issue_date)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Separator / Headline */}
            <div className="text-center mt-2 flex flex-col items-center">
              <div className="h-px w-20 bg-slate-200 mb-3" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Verifiable Internship Certificate</h4>
            </div>

            {/* 2. The Visual Certificate Card */}
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative w-full aspect-[297/210] rounded-2xl border border-brandNavy/10 bg-white shadow-2xl overflow-hidden"
              style={{
                backgroundImage: "url('/certificate_bg.png')",
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 md:p-14 lg:p-16 pointer-events-none select-text">
                {/* Top Spacer to push content down past the background header */}
                <div className="h-[28%] sm:h-[30%]" />

                {/* Certifying Paragraph Section */}
                <div className="text-center flex-grow flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-20">
                  <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-slate-400 uppercase tracking-[0.25em] font-bold">
                    This is to certify that
                  </p>
                  <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#1A254B] tracking-tight mt-1 sm:mt-2.5 mb-1.5 sm:mb-3">
                    {credential.intern_name}
                  </h3>
                  <p className="text-[7px] sm:text-[10px] md:text-[12px] lg:text-sm text-slate-600 font-medium leading-relaxed max-w-xl sm:max-w-2xl mt-1 sm:mt-2">
                    has successfully completed a professional internship program as a{" "}
                    <span className="font-bold text-[#1A254B]">{credential.role}</span>{" "}
                    at <span className="font-semibold text-brandBlue">Primescore</span> from{" "}
                    <span className="font-bold text-[#1A254B]">{formatDate(credential.start_date)}</span> to{" "}
                    <span className="font-bold text-[#1A254B]">{formatDate(credential.end_date)}</span> and has demonstrated outstanding dedication and conduct.
                  </p>
                </div>

                {/* Bottom Footer Section */}
                <div className="h-[25%] sm:h-[28%] flex items-end justify-between px-2 sm:px-6 pb-1 sm:pb-3">
                  {/* Left Corner: Date of Issuance & Credential ID */}
                  <div className="text-left font-body text-[5px] sm:text-[7px] md:text-[8px] lg:text-[10px] leading-normal text-slate-500">
                    <div className="font-bold text-[#1A254B] uppercase tracking-wider">Date of Issuance</div>
                    <div className="font-semibold text-slate-700 mt-0.5">{formatDate(credential.issue_date)}</div>
                    <div className="font-mono text-slate-450 mt-1 uppercase tracking-wide">ID: {credential.id}</div>
                  </div>

                  {/* Right Corner: Verification Info */}
                  <div className="text-right font-body text-[4px] sm:text-[6px] md:text-[7px] lg:text-[8px] leading-normal text-slate-400 font-mono">
                    <div>Verify authenticity at:</div>
                    <div className="font-semibold text-brandBlue">primescore.in/verify/{credential.id}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
