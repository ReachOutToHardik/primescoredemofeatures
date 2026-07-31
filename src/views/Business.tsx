'use client'

import React from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { AlertCircle, CheckCircle2, Building2, Activity, ShieldCheck, Mail, Phone, Clock, FileCheck, ChevronDown, Sparkles, RefreshCw, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion'


type IssueType = 'Commercial Credit Audit' | 'Vendor Risk Monitoring' | 'Company dispute' | 'Not sure'

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

  // Scroll tracking and progress indicator
  const { scrollYProgress, scrollY } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Hero section parallax values
  const heroImageY = useTransform(scrollY, [0, 800], [0, 150])
  const heroImageScale = useTransform(scrollY, [0, 800], [1, 1.15])
  const heroTextOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const heroTextY = useTransform(scrollY, [0, 450], [0, 60])

  // Staggered grid animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18
      }
    }
  }

  // Timeline scroll-linked animations
  const processRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start start", "end end"]
  })
  const processLineWidth = useTransform(processScroll, [0.10, 0.85], ["0%", "100%"])

  // Pinned triggers for smooth step lighting as screen remains locked
  const act1 = useTransform(processScroll, [0.10, 0.20], [0, 1])
  const act2 = useTransform(processScroll, [0.25, 0.35], [0, 1])
  const act3 = useTransform(processScroll, [0.40, 0.50], [0, 1])
  const act4 = useTransform(processScroll, [0.55, 0.65], [0, 1])
  const act5 = useTransform(processScroll, [0.70, 0.80], [0, 1])

  // Step 1: Red Theme (Submit Inquiry)
  const bg1 = useTransform(act1, [0, 1], ["rgba(255,255,255,0.8)", "#EF4444"])
  const textCol1 = useTransform(act1, [0, 1], ["#EF4444", "#ffffff"])
  const scale1 = useTransform(act1, [0, 1], [1, 1.15])
  const borderCol1 = useTransform(act1, [0, 1], ["#e2e8f0", "#EF4444"])
  const shadow1 = useTransform(act1, [0, 1], ["none", "0 0 20px rgba(239,68,68,0.3)"])
  const bodyOpacity1 = useTransform(act1, [0, 1], [0.5, 1])

  // Step 2: Yellow/Amber Theme (CCR & CRIF Pull)
  const bg2 = useTransform(act2, [0, 1], ["rgba(255,255,255,0.8)", "#F59E0B"])
  const textCol2 = useTransform(act2, [0, 1], ["#F59E0B", "#ffffff"])
  const scale2 = useTransform(act2, [0, 1], [1, 1.15])
  const borderCol2 = useTransform(act2, [0, 1], ["#e2e8f0", "#F59E0B"])
  const shadow2 = useTransform(act2, [0, 1], ["none", "0 0 20px rgba(245,158,11,0.3)"])
  const bodyOpacity2 = useTransform(act2, [0, 1], [0.5, 1])

  // Step 3: Green/Emerald Theme (Error Identification)
  const bg3 = useTransform(act3, [0, 1], ["rgba(255,255,255,0.8)", "#10B981"])
  const textCol3 = useTransform(act3, [0, 1], ["#10B981", "#ffffff"])
  const scale3 = useTransform(act3, [0, 1], [1, 1.15])
  const borderCol3 = useTransform(act3, [0, 1], ["#e2e8f0", "#10B981"])
  const shadow3 = useTransform(act3, [0, 1], ["none", "0 0 20px rgba(16,185,129,0.3)"])
  const bodyOpacity3 = useTransform(act3, [0, 1], [0.5, 1])

  // Step 4: Blue Theme (Dispute Filing)
  const bg4 = useTransform(act4, [0, 1], ["rgba(255,255,255,0.8)", "#2563EB"])
  const textCol4 = useTransform(act4, [0, 1], ["#2563EB", "#ffffff"])
  const scale4 = useTransform(act4, [0, 1], [1, 1.15])
  const borderCol4 = useTransform(act4, [0, 1], ["#e2e8f0", "#2563EB"])
  const shadow4 = useTransform(act4, [0, 1], ["none", "0 0 20px rgba(37,99,235,0.3)"])
  const bodyOpacity4 = useTransform(act4, [0, 1], [0.5, 1])

  // Step 5: Indigo Theme (Ongoing Monitoring)
  const bg5 = useTransform(act5, [0, 1], ["rgba(255,255,255,0.8)", "#4F46E5"])
  const textCol5 = useTransform(act5, [0, 1], ["#4F46E5", "#ffffff"])
  const scale5 = useTransform(act5, [0, 1], [1, 1.15])
  const borderCol5 = useTransform(act5, [0, 1], ["#e2e8f0", "#4F46E5"])
  const shadow5 = useTransform(act5, [0, 1], ["none", "0 0 20px rgba(79,70,229,0.3)"])
  const bodyOpacity5 = useTransform(act5, [0, 1], [0.5, 1])

  const nodeStyles = useMemo(() => [
    { bg: bg1, text: textCol1, scale: scale1, border: borderCol1, shadow: shadow1, opacity: bodyOpacity1 },
    { bg: bg2, text: textCol2, scale: scale2, border: borderCol2, shadow: shadow2, opacity: bodyOpacity2 },
    { bg: bg3, text: textCol3, scale: scale3, border: borderCol3, shadow: shadow3, opacity: bodyOpacity3 },
    { bg: bg4, text: textCol4, scale: scale4, border: borderCol4, shadow: shadow4, opacity: bodyOpacity4 },
    { bg: bg5, text: textCol5, scale: scale5, border: borderCol5, shadow: shadow5, opacity: bodyOpacity5 },
  ], [bg1, bg2, bg3, bg4, bg5, textCol1, textCol2, textCol3, textCol4, textCol5, scale1, scale2, scale3, scale4, scale5, borderCol1, borderCol2, borderCol3, borderCol4, borderCol5, shadow1, shadow2, shadow3, shadow4, shadow5, bodyOpacity1, bodyOpacity2, bodyOpacity3, bodyOpacity4, bodyOpacity5])

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

// Interactive Credit Report Simulator Component
function InteractiveCreditReport() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.5 })

  const [isCorrected, setIsCorrected] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isInView && !isCorrected && !isScanning) {
      const delayTimer = setTimeout(() => {
        setIsScanning(true)
        setProgress(0)
      }, 700) // Delay starting for natural entry
      return () => clearTimeout(delayTimer)
    }
  }, [isInView])

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsScanning(false)
            setIsCorrected(true)
            return 100
          }
          return prev + 10 // Faster simulation steps
        })
      }, 85)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  const score = isScanning
    ? Math.floor(640 + (progress / 100) * 100)
    : isCorrected
    ? 740
    : 640

  return (
    <div ref={containerRef} className="w-full max-w-[340px] mx-auto bg-white border border-slate-200/80 rounded-2xl shadow-lg overflow-hidden text-slate-700">
      {/* Mock Header/Browser bar */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200/60 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 block opacity-80" />
          <span className="w-2 h-2 rounded-full bg-amber-500 block opacity-80" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 block opacity-80" />
        </div>
        <div className="text-[8px] font-mono tracking-[0.15em] text-slate-500 uppercase select-none font-bold">
          Credit CCR — Profile Analyzer
        </div>
        <div className="w-6" />
      </div>

      <div className="p-3.5 space-y-3.5">
        {/* Profile Card Header matching average score display */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 font-black text-xs">
              H
            </div>
            <div className="text-left">
              <div className="font-extrabold text-[10px] text-slate-900 tracking-tight leading-none">Hardik Industries</div>
              <div className="text-[7.5px] font-mono text-slate-500 mt-0.5 leading-none">PAN: KMMP****R</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-[7px] uppercase tracking-wider text-slate-400 font-bold leading-none">Score</div>
              <div className={`text-base font-black transition-colors duration-500 leading-none mt-0.5 ${isCorrected ? 'text-emerald-600' : 'text-rose-600'}`}>
                {score}
              </div>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <div className="text-[7px] uppercase tracking-wider text-slate-400 font-bold leading-none">Status</div>
              <div className={`text-[8.5px] font-bold mt-0.5 uppercase leading-none ${isCorrected ? 'text-emerald-600' : 'text-rose-600 animate-pulse'}`}>
                {isScanning ? 'Syncing...' : isCorrected ? 'Clean' : '3 Flags'}
              </div>
            </div>
          </div>
        </div>

        {/* Loan Account Lines */}
        <div className="space-y-1.5">
          {[
            { id: 1, label: 'HDFC TERM LOAN — ₹45L', status: 'ACTIVE', type: 'normal' },
            { id: 2, label: 'HDFC TERM LOAN — ₹45L (DUPLICATE)', status: 'ERROR', type: 'error', desc: 'Duplicate liability reports double outstanding debt' },
            { id: 3, label: 'ICICI CC LIMIT — ₹12L', status: 'ACTIVE', type: 'normal' },
            { id: 4, label: 'PAN MISMATCH — SBI OD', status: 'FLAGGED', type: 'warning', desc: 'Registry mismatch halts credit approvals' },
            { id: 5, label: 'KOTAK BIZ LOAN — ₹80L', status: 'ACTIVE', type: 'normal' },
            { id: 6, label: 'WRONG CLASSIFICATION — AXIS', status: 'ERROR', type: 'error', desc: 'Outdated classification reports wrong write-offs' },
          ].map((row) => {
            const isRowResolved = isCorrected && row.type !== 'normal';
            return (
              <div
                key={row.id}
                className={`p-2.5 rounded-lg border transition-all duration-500 ${
                  isScanning && row.type !== 'normal'
                    ? 'border-blue-200 bg-blue-50/40 opacity-85'
                    : isRowResolved
                    ? 'border-emerald-100 bg-emerald-50/30 opacity-90'
                    : row.type === 'error'
                    ? 'border-rose-100 bg-rose-50/40'
                    : row.type === 'warning'
                    ? 'border-amber-100 bg-amber-50/40'
                    : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1 h-1 rounded-full ${
                      isRowResolved
                        ? 'bg-emerald-500'
                        : row.type === 'error'
                        ? 'bg-rose-500'
                        : row.type === 'warning'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`} />
                    <span className={`text-[9.5px] font-bold tracking-tight transition-all duration-500 ${isRowResolved ? 'text-slate-400 line-through font-normal' : 'text-slate-700'}`}>
                      {row.label}
                    </span>
                  </div>

                  <span className={`px-1 py-0.5 rounded text-[7px] font-black tracking-wider uppercase border leading-none ${
                    isRowResolved
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : row.type === 'error'
                      ? 'bg-rose-50 text-rose-700 border-rose-100'
                      : row.type === 'warning'
                      ? 'bg-amber-50 text-amber-700 border-amber-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  }`}>
                    {isRowResolved ? 'RESOLVED' : row.status}
                  </span>
                </div>

                {/* Subtext description when there is error/warning */}
                {row.desc && !isRowResolved && (
                  <p className="mt-1 ml-2.5 text-[8px] text-slate-400 leading-normal">
                    {row.desc}
                  </p>
                )}
                {row.desc && isRowResolved && (
                  <p className="mt-1 ml-2.5 text-[8px] text-emerald-600 leading-normal flex items-center gap-1 font-semibold">
                    ✓ Cleaned & merged by Primescore Audit Desk
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button & State Bar */}
        <div className="pt-2.5 border-t border-slate-100 flex flex-col items-center gap-2.5">
          {isScanning && (
            <div className="w-full">
              <div className="flex justify-between text-[8px] text-slate-400 mb-1 font-bold tracking-wide">
                <span>Disputing & reconciling records...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {!isScanning && (
            <div className="w-full flex items-center justify-between gap-2.5">
              <p className="text-[9px] text-slate-400 leading-tight">
                {isCorrected
                  ? "✓ Bureau reconciliation complete. Score boosted."
                  : "⌛ Reconciling profile records..."}
              </p>
              {isCorrected && (
                <button
                  onClick={() => {
                    setIsCorrected(false)
                    setProgress(0)
                  }}
                  className="px-2 py-1 rounded bg-slate-50 hover:bg-slate-100 text-[8px] font-bold text-slate-600 border border-slate-200/60 transition-colors"
                >
                  Replay
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

  const issueTypes: IssueType[] = [
    'Commercial Credit Audit',
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
    <div className="w-full bg-white text-slate-900">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 z-[9999] origin-left"
        style={{ scaleX }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-slate-950 text-white border-b border-slate-900 overflow-hidden">
        {/* Background Image - Parallax layout */}
        <motion.div 
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none select-none overflow-hidden z-0 opacity-40 lg:opacity-50 origin-top-right"
        >
          <img 
            src="/images/meeting1.jpg" 
            alt="PrimeScore Business Workspace Backdrop" 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient to merge the image seamlessly into the deep slate background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </motion.div>
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_50%)] z-0" />
        
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
          {/* Hero Content with fade/shift on scroll */}
          <motion.div 
            style={{ opacity: heroTextOpacity, y: heroTextY }}
            className="lg:col-span-9 flex flex-col items-start relative z-10"
          >
            <Reveal>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Your company's credit profile <span className="text-blue-500">deserves more</span> than a checklist.
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                Primescore's commercial audit desk reviews your CCR, disputes bureau errors, reconciles bank records, and monitors supplier credit risk — all under a single transparent engagement fee.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button href="#audit-form" className="!bg-blue-600 hover:!bg-blue-700 text-white font-semibold transition-all">
                  Request Commercial Audit
                </Button>
                <a href="#capabilities" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white transition-colors gap-1.5 px-4 py-2.5">
                  See How It Works <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 shrink-0 h-3.5 w-3.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </Reveal>
          </motion.div>
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
                  Banks see your Credit profile before they see your pitch deck.
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
                <InteractiveCreditReport />
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

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                num: '01',
                label: 'AUDITS',
                title: 'Commercial Credit Audit',
                body: 'We pull your Company Credit Report (CCR), map every account line, and identify duplicate profiles, PAN mismatches, incorrect account status codes, and registry anomalies. We then file formal disputes with Credit bureaus, CRIF, and the relevant bank.',
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
              <motion.div 
                key={svc.num} 
                variants={cardVariants}
                className={`bg-white rounded-2xl border p-8 transition-all duration-300 hover:shadow-md ${svc.accent} h-full flex flex-col`}
              >
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
              </motion.div>
            ))}
          </motion.div>
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
      <section ref={processRef} className="relative h-[250vh] border-b border-slate-100 overflow-visible bg-white">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="mx-auto max-w-[1280px] w-full px-6 sm:px-10 py-6">
            <Reveal>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 bg-[#2563EB]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">Our Process</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-brandNavy max-w-xl leading-tight">
                  Inquiry to clean bureau record in 5 steps.
                </h2>
              </div>
            </Reveal>
            <div className="relative grid lg:grid-cols-5 gap-6 overflow-visible">
              {/* Background line tracker with glowing scroll overlay */}
              <div className="hidden lg:block absolute top-7 left-16 right-16 h-[3px] bg-slate-200 z-0">
                <motion.div 
                  style={{ width: processLineWidth }}
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(37,99,235,0.6)] origin-left"
                />
              </div>
              
              {[
                { n: '01', title: 'Submit Inquiry', body: 'Fill our commercial request form. Routed to a live analyst within 2 hours.' },
                { n: '02', title: 'CCR & CRIF Pull', body: 'We obtain bureau reports for both your company and directors simultaneously.' },
                { n: '03', title: 'Error Identification', body: 'We map duplicate lines, mismatches, and misclassified accounts against bank records.' },
                { n: '04', title: 'Dispute Filing', body: 'Formal documentation compiled and filed with Credit bureaus, CRIF, and relevant banks.' },
                { n: '05', title: 'Ongoing Monitoring', body: 'Monthly and quarterly bureau reports delivered. New issues flagged proactively.' },
              ].map((step, i) => {
                const style = nodeStyles[i]
                return (
                  <div key={step.n} className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                    <motion.div 
                      style={{ 
                        backgroundColor: style.bg,
                        color: style.text,
                        scale: style.scale,
                        borderColor: style.border,
                        boxShadow: style.shadow
                      }}
                      className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-3 relative z-10 transition-all duration-300 backdrop-blur-xs"
                    >
                      <span className="text-[10px] font-black tracking-wider">{step.n}</span>
                    </motion.div>
                    <motion.div style={{ opacity: style.opacity }} className="transition-all duration-300">
                      <h3 className="text-sm font-bold text-brandNavy mb-2">{step.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.body}</p>
                    </motion.div>
                  </div>
                )
              })}
            </div>
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
              { q: 'What is a business credit score?', a: 'A business credit score reflects your company\'s financial credibility and repayment history. Banks and lenders use it to evaluate loan applications, working capital limits, and business financing.' },
              { q: 'Can PrimeScore improve my company\'s credit profile?', a: 'Yes. We help identify reporting errors, incorrect loan information, duplicate accounts, and other issues affecting your business credit profile.' },
              { q: 'Why is business credit important?', a: 'A strong business credit profile improves your chances of obtaining loans, credit lines, vendor financing, and better interest rates.' },
              { q: 'Can incorrect loan reporting affect business funding?', a: 'Yes. Incorrect defaults, overdue payments, or duplicate loan entries may reduce your eligibility for business finance.' },
              { q: 'Do you work with multiple credit bureaus?', a: 'Yes. We assist businesses in resolving issues across relevant credit bureaus and financial institutions.' },
              { q: 'Can new businesses build a healthy credit profile?', a: 'Yes. Maintaining timely repayments, proper financial records, and responsible credit usage helps establish a strong business credit history.' }
            ].map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} isOpen={activeFaqIndex === index} onToggle={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY LOGOS STRIP (COLORFUL & VIBRANT - BELOW FAQ) ───── */}
      <section className="bg-slate-50/70 border-b border-slate-100 py-12">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <div className="flex flex-col items-center justify-center gap-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#2563EB]">
              Trusted By & Supported Under
            </span>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-95 transition-all duration-300">
              <img src="/trusted by/MSME.png" alt="MSME Logo" className="h-12 sm:h-15 w-auto object-contain hover:scale-105 transition-transform duration-200" />
              <img src="/trusted by/RBIH.png" alt="RBIH Logo" className="h-12 sm:h-15 w-auto object-contain hover:scale-105 transition-transform duration-200" />
              <img src="/trusted by/DPIIT startupindia.png" alt="DPIIT Startup India Logo" className="h-9 sm:h-12 w-auto object-contain hover:scale-105 transition-transform duration-200" />
              <img src="/trusted by/IStart.png" alt="iStart Logo" className="h-12 sm:h-15 w-auto object-contain hover:scale-105 transition-transform duration-200" />
              <img src="/trusted by/I-hub.png" alt="i-Hub Logo" className="h-12 sm:h-15 w-auto object-contain hover:scale-105 transition-transform duration-200" />
            </div>
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
                <p className="mt-4 text-base text-textSecondary font-light leading-relaxed">
                  Find out what's hiding in your Company Credit Report. Our commercial desk offers a free preliminary assessment of your CCR for qualified corporate entities. Discuss your reporting requirements here.
                </p>

                <div className="mt-12 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brandNavy shadow-sm shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2563EB]">Direct Email Link</h4>
                      <a href="mailto:info@primescore.in" className="text-base text-brandNavy font-semibold hover:underline">info@primescore.in</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brandNavy shadow-sm shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2563EB]">Operational Hours</h4>
                      <p className="text-sm text-textSecondary font-medium">Monday – Saturday, 10 AM to 6 PM IST</p>
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
                        {['Commercial Credit Audit', 'Vendor Risk Monitoring', 'Company dispute', 'Not sure'].map((type) => {
                          const isSelected = form.issueType === type
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, issueType: type as any }))}
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
