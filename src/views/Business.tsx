'use client'

import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { AlertCircle, CheckCircle2, Building2, Activity, ShieldCheck, Mail, Phone, Clock, FileCheck, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'


type IssueType = 'Commercial CIBIL Audit' | 'Vendor Risk Monitoring' | 'Company dispute' | 'Not sure'

type FormState = {
  companyName: string
  contactName: string
  email: string
  phone: string
  issueType: IssueType
  message: string
}

export default function Business() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)

  const [form, setForm] = useState<FormState>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    issueType: 'Not sure',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email.trim() || !form.companyName.trim()) return

    setStatus('sending')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = 'template_37a3wfs'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !publicKey) {
      setStatus('error')
      setErrorMessage('Form configuration is missing. Please contact us via WhatsApp.')
      return
    }

    try {
      const emailjs = (await import('@emailjs/browser')).default
      const templateParams = {
        from_name: `${form.contactName} (${form.companyName})`,
        from_email: form.email,
        from_phone: form.phone,
        issue_type: `B2B: ${form.issueType}`,
        message: form.message,
        to_name: 'Primescore Support',
        to_email: form.email
      }

      // Send to Admin email template
      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      // Send to User confirmation auto-reply template
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', templateParams, publicKey)

      await Promise.all([adminPromise, userPromise])

      // Send to Google Sheets Webhook connection
      const sheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbw5YhcVQoyohMfXIMUu7LjuYNLskdNF6ttGScqDk7H3wwPkgfC5y-BMYTivdnn6tZj4Ag/exec'
      if (sheetWebhookUrl) {
        try {
          await fetch(sheetWebhookUrl, {
            method: 'POST',
            body: JSON.stringify({
              name: `${form.contactName} (${form.companyName})`,
              email: form.email,
              phone: form.phone,
              issueType: `B2B: ${form.issueType}`,
              message: form.message,
              timestamp: new Date().toISOString()
            }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
          })
        } catch (sheetErr) {
          console.error('Failed to send to Google Sheets:', sheetErr)
        }
      }

      // Save to Supabase commercial_leads table (for admin panel)
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey)
          await supabase.from('commercial_leads').insert([{
            source_page: 'business_page',
            company_name: form.companyName,
            contact_name: form.contactName,
            email: form.email,
            phone: form.phone,
            service_type: form.issueType,
            message: form.message,
            status: 'New'
          }])
        }
      } catch (dbErr) {
        console.error('Failed to save commercial lead to DB:', dbErr)
      }

      setStatus('sent')
      setErrorMessage('')
      setForm({ companyName: '', contactName: '', email: '', phone: '', issueType: 'Not sure', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('B2B Form Submit Error:', err)
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or use WhatsApp.')
    }
  }

// Glitch decodification animation component - Declared at top level to follow hooks guidelines
function GlitchValue({ stat }: { stat: { value: string; label: string } }) {
  // Use target value as base to ensure server-side render matches initial client render
  const [val, setVal] = useState(stat.value)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Initialize with randomized symbols on mount to kick off the effect on client
    setVal(stat.value.replace(/./g, () => Math.floor(Math.random() * 10).toString()))

    const target = stat.value
    const chars = "₹+0123456789%ABCDEFGH"
    let iterations = 0
    const interval = setInterval(() => {
      setVal(prev => {
        return prev.split("").map((char, index) => {
          if (index < iterations) {
            return target[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        }).join("")
      })
      if (iterations >= target.length) {
        clearInterval(interval)
      }
      iterations += 1/3
    }, 40)
    return () => clearInterval(interval)
  }, []) // Empty dependency array forces this to execute strictly once on mount

  return mounted ? <span className="font-mono">{val}</span> : <span className="font-mono">{stat.value}</span>
}

// Interactive FAQ Accordion subcomponent - Declared at top level to conform to hooks guidelines
interface FAQItemProps {
  faq: { q: string; a: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="border border-slate-200/80 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left font-display text-sm font-bold text-brandNavy focus:outline-none"
      >
        <span>{faq.q}</span>
        <ChevronDown 
          className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen && mounted ? 'rotate-180 text-[#2563EB]' : ''}`} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && mounted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-xs leading-relaxed text-textSecondary border-t border-slate-200/40 pt-3 bg-white">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

  const issueTypes: IssueType[] = [
    'Commercial CIBIL Audit',
    'Vendor Risk Monitoring',
    'Company dispute',
    'Not sure'
  ]
  const stats = useMemo(() => [
    { value: '₹420Cr+', label: 'Disputed Credit Audited' },
    { value: '180+', label: 'Corporate Entities Supported' },
    { value: '100%', label: 'Bureau Compliant Operations' },
    { value: '2 Hrs', label: 'Response SLA Guaranteed' }
  ], [])

  const corporateTestimonials = useMemo(() => [
    { name: 'Anand Singhal', role: 'CFO, Singhal Logistics Pvt Ltd', text: 'Primescore identified four duplicate loan accounts on our bureau profile that were showing active balance lines. Our credit records were successfully corrected.' },
    { name: 'Meera Nair', role: 'Operations Director, Nair Autotech', text: 'Monitoring our supplier credit risk profiles helped us manage potential default risks before they affected our operations.' },
    { name: 'Rajesh Patel', role: 'Managing Director, Patel Agro Exports', text: 'Resolved an identity match error where another company\'s write-offs were reporting on our corporate record. The documentation team was prompt.' },
  ], [])

  return (
    <div className="w-full bg-white text-slate-900 overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-100">
        {/* Background grid texture */}
        <div className="absolute inset-0 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="biz-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#biz-grid)" />
          </svg>
          <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-gradient-to-bl from-blue-50/70 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 pt-20 pb-24">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-brandNavy leading-[1.08] mb-6">
                  Your company's credit profile deserves more than a checklist.
                </h1>
                <p className="text-base sm:text-lg text-textSecondary font-light leading-relaxed mb-10 max-w-xl">
                  Primescore's commercial audit desk reviews your CCR, disputes bureau errors, reconciles bank records, and monitors supplier credit risk — all under a single transparent engagement fee.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#audit-form"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-brandNavy text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brandNavy/90 transition-all shadow-md"
                  >
                    Request Commercial Audit
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 shrink-0 h-3.5 w-3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                  <a
                    href="#capabilities"
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 text-brandNavy text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all"
                  >
                    See How It Works
                  </a>
                </div>
              </div>

              {/* Stats panel */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: '₹420Cr+', l: 'Disputed Credit\nAudited', accent: '#2563EB' },
                  { n: '180+', l: 'Corporate Entities\nSupported', accent: '#E85C0D' },
                  { n: '100%', l: 'Bureau Compliant\nOperations', accent: '#10b981' },
                  { n: '2 Hrs', l: 'Response SLA\nGuaranteed', accent: '#0B192C' },
                ].map((s, i) => (
                  <div
                    key={s.l}
                    className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm relative overflow-hidden text-left"
                  >
                    <div
                      className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 blur-xl"
                      style={{ background: s.accent }}
                    />
                    <div className="text-3xl font-black text-brandNavy leading-none mb-2">{s.n}</div>
                    <div className="text-[11px] text-slate-500 font-medium leading-snug whitespace-pre-line">{s.l}</div>
                    <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: s.accent }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="relative pl-5 border-l-2 border-slate-200">
                <div className="font-display text-3xl sm:text-4xl font-black text-brandNavy">
                  <GlitchValue stat={stat} />
                </div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-brandRed" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brandRed">The Problem</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy leading-tight mb-6">
                  Banks see your CIBIL profile before they see your pitch deck.
                </h2>
                <p className="text-sm text-textSecondary font-light leading-relaxed mb-6">
                  A single duplicate account line can make your company appear to carry twice the debt it actually holds. Registry mismatches between your PAN and a lender's records can stall a working capital approval for months.
                </p>
                <p className="text-sm text-textSecondary font-light leading-relaxed">
                  Most companies discover these errors only after a bank rejection. By then, the timeline for dispute resolution — typically 30 to 90 days — has already disrupted operations. We catch them first.
                </p>
              </div>
              {/* SVG illustration: error discovery timeline */}
              <div className="relative">
                <svg viewBox="0 0 480 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto">
                  {/* Background card shape */}
                  <rect x="20" y="20" width="440" height="300" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
                  {/* Header bar */}
                  <rect x="20" y="20" width="440" height="44" rx="16" fill="#0B192C"/>
                  <rect x="20" y="48" width="440" height="16" fill="#0B192C"/>
                  <circle cx="48" cy="42" r="6" fill="#ef4444" opacity=".7"/>
                  <circle cx="68" cy="42" r="6" fill="#f59e0b" opacity=".7"/>
                  <circle cx="88" cy="42" r="6" fill="#22c55e" opacity=".7"/>
                  <text x="220" y="47" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="monospace" opacity=".8">CIBIL CCR — COMPANY CREDIT REPORT</text>
                  {/* Row items */}
                  {[
                    { y: 96, label: 'HDFC TERM LOAN — ₹45L', status: 'ACTIVE', color: '#22c55e', dot: '#22c55e' },
                    { y: 128, label: 'HDFC TERM LOAN — ₹45L (DUPLICATE)', status: 'ERROR', color: '#ef4444', dot: '#ef4444' },
                    { y: 160, label: 'ICICI CC LIMIT — ₹12L', status: 'ACTIVE', color: '#22c55e', dot: '#22c55e' },
                    { y: 192, label: 'PAN MISMATCH — SBI OD', status: 'FLAGGED', color: '#f59e0b', dot: '#f59e0b' },
                    { y: 224, label: 'KOTAK BIZ LOAN — ₹80L', status: 'ACTIVE', color: '#22c55e', dot: '#22c55e' },
                    { y: 256, label: 'WRONG CLASSIFICATION — AXIS', status: 'ERROR', color: '#ef4444', dot: '#ef4444' },
                  ].map((row) => (
                    <g key={row.y}>
                      <rect x="36" y={row.y - 14} width="408" height="26" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
                      <circle cx="54" cy={row.y} r="4" fill={row.dot}/>
                      <text x="68" y={row.y + 4} fontSize="9" fontWeight="600" fill="#0B192C" fontFamily="monospace">{row.label}</text>
                      <rect x="350" y={row.y - 10} width="80" height="18" rx="4" fill={row.dot} fillOpacity=".12"/>
                      <text x="390" y={row.y + 4} textAnchor="middle" fontSize="8" fontWeight="800" fill={row.color} fontFamily="monospace">{row.status}</text>
                    </g>
                  ))}
                  {/* Arrow pointing at errors */}
                  <line x1="445" y1="128" x2="445" y2="258" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2"/>
                  <text x="462" y="193" fontSize="9" fill="#ef4444" fontWeight="700" transform="rotate(90, 462, 193)" textAnchor="middle">3 ERRORS FLAGGED</text>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────── */}
      <section id="capabilities" className="bg-[#f8fafc] border-b border-slate-200">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Services</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy max-w-2xl leading-tight">
                Three services. One desk. Full coverage.
              </h2>
              <p className="mt-4 text-sm text-textSecondary font-light max-w-xl leading-relaxed">
                We handle the three areas where commercial credit errors cause the most damage — before your bank or vendor discovers them.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                label: 'AUDITS',
                title: 'Commercial CIBIL Audit',
                body: 'We pull your Company Credit Report (CCR), map every account line, and identify duplicate profiles, PAN mismatches, incorrect account status codes, and registry anomalies. We then file formal disputes with CIBIL, CRIF, and the relevant bank.',
                svg: (
                  <svg viewBox="0 0 52 52" fill="none" className="w-12 h-12">
                    <rect x="6" y="4" width="40" height="44" rx="5" fill="#EFF6FF" stroke="#0B192C" strokeWidth="1.5"/>
                    <path d="M14 16h24M14 22h24M14 28h16" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="38" cy="34" r="8" fill="#0B192C"/>
                    <path d="M35 34l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                accent: 'border-[#2563EB]/20 hover:border-[#2563EB]/50',
              },
              {
                num: '02',
                label: 'MONITORING',
                title: 'Vendor Risk Monitoring',
                body: 'Your supply chain is only as stable as your vendors\' credit health. We monitor the bureau profiles of your key suppliers and flag deteriorating credit indicators before they disrupt procurement or trigger payment defaults.',
                svg: (
                  <svg viewBox="0 0 52 52" fill="none" className="w-12 h-12">
                    <circle cx="26" cy="26" r="18" fill="#EFF6FF" stroke="#0B192C" strokeWidth="1.5"/>
                    <path d="M10 34 Q18 16 26 22 Q34 28 42 18" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="26" cy="22" r="3" fill="#E85C0D"/>
                    <circle cx="42" cy="18" r="3" fill="#2563EB"/>
                    <circle cx="10" cy="34" r="3" fill="#0B192C"/>
                  </svg>
                ),
                accent: 'border-emerald-200 hover:border-emerald-400',
              },
              {
                num: '03',
                label: 'DISPUTES',
                title: 'Bank & Bureau Disputes',
                body: 'When your company is incorrectly flagged by a lender — wrong write-off classification, identity match errors, or outdated NPA tags — we compile the evidence, draft the formal dispute communications, and manage the filing process end to end.',
                svg: (
                  <svg viewBox="0 0 52 52" fill="none" className="w-12 h-12">
                    <path d="M26 6 L10 14 v12 c0 10 6.5 19.5 16 22 9.5-2.5 16-12 16-22V14Z" fill="#FFF7ED" stroke="#0B192C" strokeWidth="1.5"/>
                    <path d="M18 26l6 6 10-10" stroke="#E85C0D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                accent: 'border-brandRed/20 hover:border-brandRed/50',
              },
            ].map((svc) => (
              <Reveal key={svc.num} delay={0.07 * parseInt(svc.num)}>
                <div className={`bg-white rounded-2xl border p-8 transition-all duration-300 hover:shadow-md ${svc.accent} h-full flex flex-col`}>
                  <div className="flex items-start justify-between mb-6">
                    {svc.svg}
                    <span className="text-[10px] font-black text-slate-300 tracking-widest">{svc.num} / {svc.label}</span>
                  </div>
                  <h3 className="text-base font-bold text-brandNavy mb-3">{svc.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{svc.body}</p>
                  <a href="#audit-form" className="mt-6 text-[11px] font-bold text-[#2563EB] uppercase tracking-wider inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                    Request this service
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center">
              {/* Left — persuasion copy */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-[#2563EB]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Why Primescore</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy leading-tight mb-6">
                  We don't hand you a report and wish you luck.
                </h2>
                <p className="text-sm text-textSecondary font-light leading-relaxed mb-8">
                  Generalist credit advisors give you a PDF and leave the dispute legwork to you. Our commercial desk handles everything — from identifying the error to writing the formal correspondence and tracking the resolution with the bureau.
                </p>
                <div className="space-y-4">
                  {[
                    'Bureau-trained analysts — not generalist consultants',
                    'Formal dispute documentation compiled and filed on your behalf',
                    'Director-level AND company bureau monitoring simultaneously',
                    'Fixed-fee engagement — no hidden retainers or per-dispute charges',
                    '2-hour response SLA on all commercial queries, Mon–Sat',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — partner orbit */}
              <div className="relative flex items-center justify-center h-[480px] w-full max-w-[480px] mx-auto overflow-visible">
                <style>{`
                  @keyframes bizOrbit { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
                  @keyframes bizCounter { 0%{transform:rotate(0deg)} 100%{transform:rotate(-360deg)} }
                  @keyframes bizPulse { 0%,100%{transform:scale(1);opacity:.12} 50%{transform:scale(1.08);opacity:.22} }
                  .biz-orbit-ring { position:absolute;width:480px;height:480px;border:1.5px dashed rgba(148,163,184,0.35);border-radius:50%;animation:bizOrbit 40s linear infinite; }
                  .biz-orbit-node { position:absolute;width:96px;height:96px;margin-left:-48px;margin-top:-48px;border-radius:50%;background:white;border:2px solid rgba(226,232,240,0.9);box-shadow:0 8px 24px -4px rgba(15,23,42,.1);display:flex;flex-direction:column;align-items:center;justify-content:center;animation:bizCounter 40s linear infinite; }
                  .biz-pulse { position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.14) 0%,transparent 70%);animation:bizPulse 4s ease-in-out infinite; }
                  .biz-hub { position:relative;z-index:20;width:148px;height:148px;border-radius:50%;background:white;border:2.5px solid rgba(226,232,240,0.9);box-shadow:0 16px 40px -8px rgba(15,23,42,.15);display:flex;align-items:center;justify-content:center;padding:1.5rem; }
                `}</style>
                <div className="biz-pulse" />
                <div className="absolute w-[240px] h-[240px] border border-slate-100/80 rounded-full" />
                <div className="biz-orbit-ring">
                  {[
                    { top: '0%', left: '50%', content: <img src="https://lmjservices.in/wp-content/uploads/2023/09/Screenshot-from-2023-09-30-11-40-45-1.png" alt="LMJ" className="w-[78%] h-auto object-contain rounded-full"/> },
                    { top: '25%', left: '93%', content: <span className="font-black text-[12px] text-[#2563EB] tracking-tight text-center leading-none">GANPATI<span className="block text-[9px] text-slate-400 font-bold mt-1">STEEL</span></span> },
                    { top: '75%', left: '93%', content: <span className="font-black text-[12px] text-brandNavy tracking-tight text-center leading-none">SINGHAL<span className="block text-[8px] text-[#2563EB] font-bold mt-1">LOGISTICS</span></span> },
                    { top: '100%', left: '50%', content: <span className="font-black text-[12px] text-brandRed tracking-tight text-center leading-none">NAIR<span className="block text-[8px] text-slate-400 font-bold mt-1">AUTOTECH</span></span> },
                    { top: '75%', left: '7%', content: <span className="font-black text-[12px] text-brandNavy tracking-tight text-center leading-none">PATEL<span className="block text-[8px] text-emerald-600 font-bold mt-1">AGRO</span></span> },
                    { top: '25%', left: '7%', content: <span className="font-black text-[11px] text-[#2563EB] tracking-tight text-center leading-none">+ MANY<span className="block text-[8px] text-slate-400 font-bold mt-1">MORE</span></span> },
                  ].map((node, i) => (
                    <div key={i} className="biz-orbit-node p-1.5" style={{ top: node.top, left: node.left }}>{node.content}</div>
                  ))}
                </div>
                <div className="biz-hub">
                  <img src="/Logo-primescore.png" alt="Primescore" className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS MARQUEE ─────────────────────────── */}
      <section className="bg-[#f8fafc] border-b border-slate-200 py-16">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 pb-4">
          <Reveal>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Partner Feedback</span>
              </div>
              <h2 className="font-display text-3xl font-black text-brandNavy max-w-xl">Heard from the desk of Owners & CFOs.</h2>
            </div>
          </Reveal>
        </div>
        {/* Added fixed height container with relative positioning so it takes up proper document flow space */}
        <div className="overflow-hidden relative w-full h-[220px] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 28, repeat: Infinity }}
            className="flex gap-5 absolute whitespace-nowrap"
          >
            {[...corporateTestimonials, ...corporateTestimonials].map((t, idx) => (
              <div key={idx} className="inline-block w-[380px] border border-slate-200 bg-white p-7 rounded-2xl shadow-sm whitespace-normal flex-col justify-between h-[190px] flex">
                <p className="text-xs text-textSecondary leading-relaxed">
                  "{t.text}"
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-brandNavy">{t.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Our Process</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy max-w-xl leading-tight">
                Inquiry to clean bureau record in 5 steps.
              </h2>
            </div>
          </Reveal>
          <div className="relative grid lg:grid-cols-5 gap-8">
            <div className="hidden lg:block absolute top-7 left-16 right-16 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
            {[
              { n: '01', title: 'Submit Inquiry', body: 'Fill our commercial request form. Routed to a live analyst within 2 hours.' },
              { n: '02', title: 'CCR & CRIF Pull', body: 'We obtain bureau reports for both your company and directors simultaneously.' },
              { n: '03', title: 'Error Identification', body: 'We map duplicate lines, mismatches, and misclassified accounts against bank records.' },
              { n: '04', title: 'Dispute Filing', body: 'Formal documentation compiled and filed with CIBIL, CRIF, and relevant banks.' },
              { n: '05', title: 'Ongoing Monitoring', body: 'Monthly and quarterly bureau reports delivered. New issues flagged proactively.' },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07}>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-5 relative z-10">
                    <span className="text-[10px] font-black text-[#2563EB] tracking-wider">{step.n}</span>
                  </div>
                  <h3 className="text-sm font-bold text-brandNavy mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────── */}
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-10">
          <div className="grid sm:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            {[
              { icon: <ShieldCheck className="h-5 w-5 text-[#2563EB]" />, title: '100% Bureau Compliant', body: 'All operations aligned with the Credit Information Companies (Regulation) Act, 2005 and RBI directives.' },
              { icon: <FileCheck className="h-5 w-5 text-[#2563EB]" />, title: 'Dispute Docs Drafted', body: 'We compile evidence, write the formal dispute communication, and file it — you don\'t touch the paperwork.' },
              { icon: <Activity className="h-5 w-5 text-[#2563EB]" />, title: '2-Hour Response SLA', body: 'A dedicated human analyst — not a bot — responds to every commercial query within 2 hours, Mon–Sat.' },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white px-8 py-7">
                <div className="mb-4">{icon}</div>
                <div className="text-sm font-bold text-brandNavy mb-1.5">{title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-[#f8fafc]">
        <div className="mx-auto max-w-[840px] px-6 sm:px-10 py-20">
          <Reveal>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#2563EB]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">FAQ</span>
              </div>
              <h2 className="font-display text-3xl font-black text-brandNavy">Common questions answered.</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {[
              { q: 'What is a Commercial CIBIL Audit?', a: 'A Commercial CIBIL Audit reviews your Company Credit Report (CCR) to detect inaccurate classifications, duplicate account profiles, or registry mismatches (e.g. wrong PAN linkage) which could negatively impact your credit profile.' },
              { q: 'How long does it take to identify duplicate profiles?', a: 'Our analysts typically complete preliminary file auditing and duplicate account reconciliation mapping within 48 to 72 hours of document submission.' },
              { q: 'Does auditing damage my company\'s credit score?', a: 'No. Checking or auditing your commercial bureau reports through our analyst desk does not count as a hard inquiry and has zero negative impact on your company\'s credit health.' },
              { q: 'What documents are required to initiate an audit?', a: 'We generally require a recent copy of your Company Credit Report (CCR) from CIBIL, along with company PAN details and basic loan account ledger logs for disputed line entries.' },
              { q: 'Can you monitor our vendors\' credit health too?', a: 'Yes. Our Vendor Risk Monitoring service tracks the CIBIL and CRIF profiles of your key suppliers and flags early warning signs of credit deterioration before they affect your supply chain.' },
            ].map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} isOpen={activeFaqIndex === index} onToggle={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="audit-form" className="w-full bg-[#f8fafc] border-t border-slate-200/80 py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            
            <Reveal>
              <div className="max-w-md">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2563EB]">CONTACT DESK</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-brandNavy sm:text-4xl">
                  Initiate Commercial Audit Consultation
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-textSecondary font-light">
                  Find out what's hiding in your Company Credit Report. Our commercial desk offers a free preliminary assessment of your CCR for qualified corporate entities. Discuss your reporting requirements here.
                </p>

                <div className="mt-12 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brandNavy shadow-sm">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2563EB]">Direct Email Link</h4>
                      <a href="mailto:info@primescore.in" className="text-xs text-textSecondary hover:underline">info@primescore.in</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brandNavy shadow-sm">
                      <Phone className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2563EB]">Operational Hours</h4>
                      <p className="text-xs text-textSecondary">Monday – Saturday, 10 AM to 6 PM IST</p>
                    </div>
                  </div>
                </div>

                {/* Google Map location embed */}
                <div className="mt-8 w-full h-[260px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
                  <iframe 
                    src="https://maps.google.com/maps?q=iStart%20Nest%20Incubation%20Center,%20Gov.%20Polytechnic%20College,%20Jodhpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm">
                {status === 'sent' ? (
                  <div className="flex flex-col py-8 animate-in fade-in zoom-in-95 duration-300 items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 text-emerald-500 shadow-sm">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-brandNavy mb-1">Details Submitted</h3>
                    <p className="text-textSecondary text-xs max-w-xs leading-relaxed">
                      A corporate analyst will review your profile details and reach out.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 mb-2">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-xs font-semibold">{errorMessage}</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="companyName">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={form.companyName}
                        onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                        placeholder="Company Name"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="contactName">
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        value={form.contactName}
                        onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                        placeholder="Contact Person Name"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="email">
                          Company Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                          placeholder="Company Email"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="phone">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors"
                          placeholder="Contact Number"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block">
                        Required Service
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {issueTypes.map((type) => {
                          const isSelected = form.issueType === type
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, issueType: type }))}
                              className={[
                                'px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border outline-none',
                                isSelected
                                  ? 'bg-brandNavy text-white border-brandNavy'
                                  : 'bg-white text-textSecondary border-slate-200 hover:border-brandNavy/35 hover:text-brandNavy'
                              ].join(' ')}
                            >
                              {type}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-brandNavy block" htmlFor="message">
                        Briefly state your requirements
                      </label>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        className="w-full px-4 py-3 text-sm text-brandNavy bg-white border border-slate-200 rounded-xl focus:border-[#2563EB] focus:outline-none transition-colors min-h-[90px] resize-none"
                        placeholder="Briefly state your requirements..."
                        required
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" disabled={status === 'sending'} className="px-6 py-4 bg-brandNavy text-white hover:bg-brandNavy/95 text-sm font-bold uppercase tracking-wider transition-all rounded-xl w-full justify-center shadow-md">
                        {status === 'sending' ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

      </section>
    </div>
  )
}

