'use client'

import React, { useState, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ShieldCheck,
  Activity,
  ChevronDown,
  ArrowRight,
  BarChart3,
  Users,
  CheckCircle2,
  Lock,
  FileText,
  ShieldAlert,
  Mail,
  Phone,
  AlertCircle,
  Factory,
  Truck,
  Building2,
  Coins,
  Globe,
  Cpu,
  Wrench,
  Briefcase
} from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

export default function BusinessServices() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Form State & Handler
  type IssueType = 'Commercial Credit Audit' | 'Vendor Risk Monitoring' | 'Company dispute' | 'Not sure'
  type FormState = {
    companyName: string
    contactName: string
    email: string
    phone: string
    issueType: IssueType
    message: string
  }
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState<FormState>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    issueType: 'Not sure',
    message: ''
  })

  // Timeline scroll-linked animations for BusinessServices
  const processRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start start", "end end"]
  })
  const processLineWidth = useTransform(processScroll, [0.22, 0.80], ["0%", "100%"])

  // Snappier 10% scroll triggers for crisp updates
  const act1 = useTransform(processScroll, [0.22, 0.32], [0, 1])
  const act2 = useTransform(processScroll, [0.34, 0.44], [0, 1])
  const act3 = useTransform(processScroll, [0.46, 0.56], [0, 1])
  const act4 = useTransform(processScroll, [0.58, 0.68], [0, 1])
  const act5 = useTransform(processScroll, [0.70, 0.80], [0, 1])

  // Step 1: Brand Blue Outline
  const borderCol1 = useTransform(act1, [0, 1], ["rgba(226,232,240,0.8)", "#2563EB"])
  const textCol1 = useTransform(act1, [0, 1], ["#94a3b8", "#2563EB"])
  const scale1 = useTransform(act1, [0, 1], [1, 1.12])
  const shadow1 = useTransform(act1, [0, 1], ["none", "0 0 15px rgba(37,99,235,0.15)"])
  const bodyOpacity1 = useTransform(act1, [0, 1], [0.5, 1])

  // Step 2: Brand Blue Outline
  const borderCol2 = useTransform(act2, [0, 1], ["rgba(226,232,240,0.8)", "#2563EB"])
  const textCol2 = useTransform(act2, [0, 1], ["#94a3b8", "#2563EB"])
  const scale2 = useTransform(act2, [0, 1], [1, 1.12])
  const shadow2 = useTransform(act2, [0, 1], ["none", "0 0 15px rgba(37,99,235,0.15)"])
  const bodyOpacity2 = useTransform(act2, [0, 1], [0.5, 1])

  // Step 3: Brand Blue Outline
  const borderCol3 = useTransform(act3, [0, 1], ["rgba(226,232,240,0.8)", "#2563EB"])
  const textCol3 = useTransform(act3, [0, 1], ["#94a3b8", "#2563EB"])
  const scale3 = useTransform(act3, [0, 1], [1, 1.12])
  const shadow3 = useTransform(act3, [0, 1], ["none", "0 0 15px rgba(37,99,235,0.15)"])
  const bodyOpacity3 = useTransform(act3, [0, 1], [0.5, 1])

  // Step 4: Brand Blue Outline
  const borderCol4 = useTransform(act4, [0, 1], ["rgba(226,232,240,0.8)", "#2563EB"])
  const textCol4 = useTransform(act4, [0, 1], ["#94a3b8", "#2563EB"])
  const scale4 = useTransform(act4, [0, 1], [1, 1.12])
  const shadow4 = useTransform(act4, [0, 1], ["none", "0 0 15px rgba(37,99,235,0.15)"])
  const bodyOpacity4 = useTransform(act4, [0, 1], [0.5, 1])

  // Step 5: Brand Blue Outline
  const borderCol5 = useTransform(act5, [0, 1], ["rgba(226,232,240,0.8)", "#2563EB"])
  const textCol5 = useTransform(act5, [0, 1], ["#94a3b8", "#2563EB"])
  const scale5 = useTransform(act5, [0, 1], [1, 1.12])
  const shadow5 = useTransform(act5, [0, 1], ["none", "0 0 15px rgba(37,99,235,0.15)"])
  const bodyOpacity5 = useTransform(act5, [0, 1], [0.5, 1])

  const nodeStyles = useMemo(() => [
    { border: borderCol1, text: textCol1, scale: scale1, shadow: shadow1, opacity: bodyOpacity1 },
    { border: borderCol2, text: textCol2, scale: scale2, shadow: shadow2, opacity: bodyOpacity2 },
    { border: borderCol3, text: textCol3, scale: scale3, shadow: shadow3, opacity: bodyOpacity3 },
    { border: borderCol4, text: textCol4, scale: scale4, shadow: shadow4, opacity: bodyOpacity4 },
    { border: borderCol5, text: textCol5, scale: scale5, shadow: shadow5, opacity: bodyOpacity5 },
  ], [borderCol1, borderCol2, borderCol3, borderCol4, borderCol5, textCol1, textCol2, textCol3, textCol4, textCol5, scale1, scale2, scale3, scale4, scale5, shadow1, shadow2, shadow3, shadow4, shadow5, bodyOpacity1, bodyOpacity2, bodyOpacity3, bodyOpacity4, bodyOpacity5])

  const issueTypes: IssueType[] = [
    'Commercial Credit Audit',
    'Vendor Risk Monitoring',
    'Company dispute',
    'Not sure'
  ]

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

      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', templateParams, publicKey)

      await Promise.all([adminPromise, userPromise])

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

      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey)
          await supabase.from('commercial_leads').insert([{
            source_page: 'business_services_page',
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

  const steps = [
    { title: 'Corporate Consultation', desc: 'Map corporate credit structures, associate partners, and fetch registry reports.', icon: Users },
    { title: 'Deep Bureau Mapping', desc: 'Identify overlapped corporate PAN accounts and erroneous overdue tags.', icon: BarChart3 },
    { title: 'Evidence Pack Compilation', desc: 'Align payment NOCs, corporate resolutions, and audit certifications.', icon: FileText },
    { title: 'Structured Dispute Filing', desc: 'Liaison with lenders and bureaus under strict SLA guidelines.', icon: ShieldCheck },
    { title: 'Continuous Risk Monitoring', desc: 'Track vendor scores and safeguard your commercial credit rank.', icon: Activity }
  ]

  const faqs = [
    { q: 'What is a business credit score?', a: 'A business credit score reflects your company\'s financial credibility and repayment history. Banks and lenders use it to evaluate loan applications, working capital limits, and business financing.' },
    { q: 'Can PrimeScore improve my company\'s credit profile?', a: 'Yes. We help identify reporting errors, incorrect loan information, duplicate accounts, and other issues affecting your business credit profile.' },
    { q: 'Why is business credit important?', a: 'A strong business credit profile improves your chances of obtaining loans, credit lines, vendor financing, and better interest rates.' },
    { q: 'Can incorrect loan reporting affect business funding?', a: 'Yes. Incorrect defaults, overdue payments, or duplicate loan entries may reduce your eligibility for business finance.' },
    { q: 'Do you work with multiple credit bureaus?', a: 'Yes. We assist businesses in resolving issues across relevant credit bureaus and financial institutions.' },
    { q: 'Can new businesses build a healthy credit profile?', a: 'Yes. Maintaining timely repayments, proper financial records, and responsible credit usage helps establish a strong business credit history.' }
  ]

  return (
    <div className="bg-white min-h-screen font-sans antialiased text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-slate-950 text-white border-b border-slate-900 overflow-hidden">
        {/* Background Image (Big in background, right aligned) */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none select-none overflow-hidden z-0 opacity-40 lg:opacity-50">
          <img
            src="/images/servicepageheroimg.jpg"
            alt="PrimeScore Business Services Backdrop"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient to merge the image seamlessly into the deep slate background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950 /60 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_50%)] z-0" />

        <div className="mx-auto max-w-[1280px] px-6 sm:px-8 relative z-10 grid lg:grid-cols-12 gap-16 items-center">
          {/* Hero Content (without color card block) */}
          <div className="lg:col-span-9 flex flex-col items-start relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                Enterprise Credit Solutions
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                Corporate Credit Audit & <span className="text-blue-500">Registry Integrity</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                Identify commercial bureau inaccuracies, resolve registry overlaps, and protect supplier risk profiles with India's premium B2B credit rectification desk.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button href="/business/contact" className="!bg-blue-600 hover:!bg-blue-700 text-white font-semibold transition-all">
                  Request Commercial Audit
                </Button>
                <a href="#storytelling" className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white transition-colors gap-1.5 px-4 py-2.5">
                  See How it Works <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Grid (Three simple cards outlining Commercial Credit Audit, Vendor Credit Monitoring, and Director Score Alignment) */}
      <section className="py-28 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-3">Capabilities</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Engineered for Corporate Credit Profiles
              </h2>
              <p className="mt-4 text-slate-600 text-sm">
                Clean and structured auditing blocks mapping directly to institutional records.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Card 1: Commercial Credit Audit */}
            <Reveal>
              <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#2563EB]/40">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-100/50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#2563EB]">
                    REGULATORY & ERRORS
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-slate-900 mt-2 mb-3">
                    Commercial Credit Audit
                  </h3>
                  <p className="text-xs sm:text-sm text-textSecondary font-light leading-relaxed mb-6">
                    Line-by-line review of your Company Credit Report (CCR). We identify duplicate profiles, registry mismatch records, and disputed loan lines that hamper bank approval.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      'Comprehensive registry error verification mapping',
                      'Evidence file formulation with supporting documents',
                      'Direct dispute communication drafts & filing assistance',
                      'Director-level and company credit reports dual audit'
                    ].map((item, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-2.5 text-xs text-textSecondary">
                        <span className="text-[#2563EB] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Vendor Credit Monitoring */}
            <Reveal delay={0.1}>
              <div className="bg-gradient-to-br from-emerald-50/50 via-teal-50/20 to-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-emerald-500/40">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100/50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                    <Activity className="h-6 w-6" />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-600">
                    RISK MANAGEMENT
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-slate-900 mt-2 mb-3">
                    Vendor Credit Monitoring
                  </h3>
                  <p className="text-xs sm:text-sm text-textSecondary font-light leading-relaxed mb-6">
                    Track the credit performance of critical suppliers, vendors, and clients. Protect your supply chain from sudden defaults or credit deterioration.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      'Automated credit score updates on key vendor profiles',
                      'Early warning signals on negative filings or classification changes',
                      'Custom risk threshold notifications',
                      'Quarterly portfolio health check reports'
                    ].map((item, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-2.5 text-xs text-textSecondary">
                        <span className="text-[#2563EB] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Director Score Alignment */}
            <Reveal delay={0.2}>
              <div className="bg-gradient-to-br from-violet-50/60 via-purple-50/25 to-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-purple-500/40">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-100/50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-purple-600">
                    PERSONAL CREDIT FOR BUSINESS
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-slate-900 mt-2 mb-3">
                    Director Score Alignment
                  </h3>
                  <p className="text-xs sm:text-sm text-textSecondary font-light leading-relaxed mb-6">
                    Lenders evaluate personal directors\' scores alongside the commercial report. We audit and rectifiy directors\' files simultaneously to support commercial underwriting.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      'Clean linkage mapping between director files & company accounts',
                      'Days Past Due (DPD) error rectification on director reports',
                      'Reduction of invalid inquiry spikes',
                      'Consolidated reports score optimization'
                    ].map((item, dIndex) => (
                      <li key={dIndex} className="flex items-start gap-2.5 text-xs text-textSecondary">
                        <span className="text-[#2563EB] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Enterprise Storytelling Section */}
      <section id="storytelling" className="py-28 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                The Journey of Enterprise Credit Cleanliness
              </h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Why clean commercial data matters. When reporting errors occur, credit lines freeze and procurement slows. Here is how PrimeScore bridges the registry gap.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Step 1: Problem */}
            <Reveal>
              <div className="flex flex-col h-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 p-4 font-mono text-3xl font-black text-slate-100 select-none">01</div>
                <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950 mb-3">The Problem</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  A business applies for a working capital expansion. Due to legacy data migrations, a bank marks an already closed loan facility as "Active & Overdue" on credit bureaus.
                </p>
                <div className="text-xs font-semibold text-red-600 bg-red-50/50 px-3 py-1.5 rounded-lg inline-self-start">
                  Outcome: Expansion rejected
                </div>
              </div>
            </Reveal>

            {/* Step 2: Solution */}
            <Reveal delay={0.1}>
              <div className="flex flex-col h-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 p-4 font-mono text-3xl font-black text-slate-100 select-none">02</div>
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950 mb-3">PrimeScore Intervention</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  Our corporate audit desk maps all public registries. We compile clear evidence files (NOCs, account statements) and draft legal disputes based on RBI guidelines.
                </p>
                <div className="text-xs font-semibold text-blue-600 bg-blue-50/50 px-3 py-1.5 rounded-lg inline-self-start">
                  Outcome: Direct Bank Coordination
                </div>
              </div>
            </Reveal>

            {/* Step 3: Outcome */}
            <Reveal delay={0.2}>
              <div className="flex flex-col h-full bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-0 right-0 p-4 font-mono text-3xl font-black text-slate-100 select-none">03</div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950 mb-3">The Outcome</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  Bureaus verify and correct the records within 30-45 days. The company's Credit Rank rebounds to 2, and the expansion facility gets approved.
                </p>
                <div className="text-xs font-semibold text-emerald-600 bg-emerald-50/50 px-3 py-1.5 rounded-lg inline-self-start">
                  Outcome: Working Capital Unlocked
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Business Workflow Timeline */}
      <section ref={processRef} className="relative h-[250vh] border-b border-slate-100 overflow-visible bg-slate-50">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="mx-auto max-w-[1280px] w-full px-6 sm:px-8 py-6">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Our Connected Resolution Workflow
                </h2>
                <p className="mt-4 text-slate-600">
                  A seamless credit-desk liaison pipeline that aligns banks, bureaus, and businesses.
                </p>
              </div>
            </Reveal>

            {/* Connected horizontal visual flow */}
            <div className="grid gap-6 md:grid-cols-5 relative overflow-visible">
              {/* Connecting Line (desktop only) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[3px] bg-slate-200 z-0">
                <motion.div
                  style={{ width: processLineWidth }}
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(37,99,235,0.6)] origin-left"
                />
              </div>

              {steps.map((step, idx) => {
                const IconComp = step.icon
                const style = nodeStyles[idx]
                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10">
                    <motion.div
                      style={{
                        borderColor: style.border,
                        color: style.text,
                        scale: style.scale,
                        boxShadow: style.shadow
                      }}
                      className="h-16 w-16 rounded-full bg-white border flex items-center justify-center mb-4 relative z-10 transition-all duration-300 backdrop-blur-xs"
                    >
                      <IconComp className="h-6 w-6" />
                    </motion.div>
                    <motion.div style={{ opacity: style.opacity }} className="transition-all duration-300">
                      <div className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">Step {idx + 1}</div>
                      <h4 className="font-display font-bold text-slate-900 text-sm mb-1.5">{step.title}</h4>
                      <p className="text-slate-600 text-xs leading-relaxed max-w-xs">{step.desc}</p>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Business Impact Metrics & Industries Supported */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Glowing backdrop spotlights */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-[1280px] px-6 sm:px-8 relative z-10">
          {/* Industry Focus Section */}
          <div>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-3">Sectors Supported</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Industries We Serve
              </h2>
              <p className="mt-4 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed font-light">
                Our credit auditing and bureau dispute filing procedures are tailored to meet the specific compliance frameworks of major Indian sectors.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Manufacturing & Engineering', icon: Factory, desc: 'Reconciling heavy capital machinery leases and working capital limits.' },
                { title: 'Supply Chain & Logistical Hubs', icon: Truck, desc: 'Tracking trade creditor delays and multi-location transport lines.' },
                { title: 'Real Estate Developers', icon: Building2, desc: 'Auditing complex construction finance loans and escrow accounts.' },
                { title: 'NBFCs & Micro-Lenders', icon: Coins, desc: 'Resolving institutional pool buyout reports and refinancing mismatches.' },
                { title: 'B2B Wholesale Traders', icon: Briefcase, desc: 'Disputing buyer credit defaults and invoice-backed trade credit entries.' },
                { title: 'Export-Import Houses', icon: Globe, desc: 'Managing foreign currency loan classifications and buyer LCs.' },
                { title: 'IT Services & SaaS Entities', icon: Cpu, desc: 'Monitoring vendor subscriptions, software assets, and term loan lines.' },
                { title: 'Automobile Component Vendors', icon: Wrench, desc: 'Scrubbing registry records for auxiliary component supply facilities.' }
              ].map((ind, idx) => {
                const Icon = ind.icon
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className="bg-white/[0.01] border border-white/5 hover:border-blue-500/40 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group hover:bg-white/[0.03]">
                      <div>
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2">{ind.title}</h4>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-light">{ind.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 text-center mb-12">
              Commercial Credit FAQs
            </h2>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-display text-sm font-bold text-slate-900 focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-xs leading-relaxed text-slate-500 border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* TRUSTED BY LOGOS STRIP (COLORFUL & VIBRANT - ABOVE CONTACT FORM) */}
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
                      <Button type="submit" disabled={status === 'sending'} className="px-6 py-4 bg-[#ef4444] hover:bg-[#ef4444]/95 text-white text-sm font-bold uppercase tracking-wider transition-all rounded-xl w-full justify-center shadow-md border-0">
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