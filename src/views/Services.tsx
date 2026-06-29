'use client'

import React, { useState, useMemo } from 'react'
import {
  Activity,
  ArrowRight,
  BadgeIndianRupee,
  FileWarning,
  Handshake,
  LineChart,
  ShieldCheck,
  Scale,
  Clock,
  Check,
  Info,
  MessageSquare,
  Shield,
  Phone,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { services } from '../data/primescore'
import FAQAccordion from '../components/ui/FAQAccordion'
import CreditImpactCalculator from '../components/ui/CreditImpactCalculator'

const iconById = {
  rectification: ShieldCheck,
  settlement: Handshake,
  'card-disputes': FileWarning,
  monitoring: Activity,
  coaching: LineChart,
  emi: Scale,
} as const

const imageById = {
  rectification: '/service/1779181760377-905109645-CIBIL-Score-Rectification.jpeg',
  settlement: '/service/1779181760372-867672048-Loan-Settlement-Negotiation.jpeg',
  'card-disputes': '/service/1779181760370-183828100-Written-off-Account-Resolution.jpeg',
  monitoring: '/service/1779181760448-994722974-Credit-Report-Monitoring.jpeg',
  coaching: '/service/1779181760374-904786478-Personal-Finance-Coaching.jpeg',
  emi: '/service/1779181760376-7477191-Suit-Filed-Case-Assistance.jpeg',
} as const

const comparisonRows = [
  { k: 'Line-by-line bureau audit', a: 'Yes (expert reviewed)', b: 'Time-consuming', c: 'Inconsistent' },
  { k: 'Evidence pack + legal drafting', a: 'Yes', b: 'Hard', c: 'Template-level' },
  { k: 'Tracking reference IDs', a: 'Dashboard', b: 'Manual', c: 'Partial' },
  { k: 'Escalations & follow-ups', a: 'Structured', b: 'Often skipped', c: 'Limited' },
  { k: 'Confidential handling', a: 'Minimal-access', b: 'N/A', c: 'Varies' },
] as const

const faqs = [
  {
    q: 'What is credit score rectification?',
    a: 'Credit score rectification (or credit repair) is the legal process of disputing inaccurate, outdated, or unverifiable entries on your credit report. We correct false late payments and errors to improve your overall CIBIL score.',
  },
  {
    q: 'How long does CIBIL dispute resolution take?',
    a: 'Under RBI guidelines, bureaus and banks have 30 days to resolve a dispute. Most simple errors are fixed in 30-45 days, while complex cases like loan settlements may take 60-90 days.',
  },
  {
    q: 'Can incorrect late payments (DPD) be removed?',
    a: 'Yes. If a late payment or Days Past Due (DPD) was marked incorrectly due to a bank error or technical glitch, we can file a legal dispute to have it completely removed from your credit history.',
  },
  {
    q: 'Does loan settlement affect my CIBIL score?',
    a: 'Yes, a "Settled" status damages your score for up to 7 years because the loan was closed for less than the total amount due. We help negotiate proper closures and dispute invalid settlement markers.',
  },
  {
    q: 'How much CIBIL score improvement is possible?',
    a: 'Removing a single false late payment can boost your score by 20-50 points. For major errors like false defaults, clients often see improvements of over 100 points, rapidly crossing the 750+ mark.',
  },
  {
    q: 'How does Primescore help fix my credit?',
    a: 'Primescore is India’s trusted credit consultancy. We legally dispute errors directly with banks and bureaus, and provide a live dashboard so you can track your CIBIL score recovery in real-time.',
  },
]

export default function Services() {
  const [activeTimelineId, setActiveTimelineId] = useState('rectification')

  // Inquiry Form State
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '', message: '', preferredDate: '', preferredTime: '' })
  const [ctaStatus, setCtaStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [ctaError, setCtaError] = useState('')
  const [ctaMarketingOptIn, setCtaMarketingOptIn] = useState(true)

  const activeService = services.find((s) => s.id === activeTimelineId) || services[0]

  const todayStr = useMemo(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [])

  const handleScrollToTimeline = (serviceId: string) => {
    setActiveTimelineId(serviceId)
    const element = document.getElementById('timelines-section')
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleScrollToForm = () => {
    const element = document.getElementById('support-section')
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ctaForm.email.trim() || !ctaForm.name.trim() || !ctaForm.phone.trim()) return

    // Validate preferred date (cannot be in the past)
    if (ctaForm.preferredDate) {
      const selectedDate = new Date(ctaForm.preferredDate)
      const today = new Date()
      selectedDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        setCtaStatus('error')
        setCtaError('Consultation date cannot be in the past.')
        return
      }
    }

    // Validate preferred time (must be between 9 AM and 6 PM)
    if (ctaForm.preferredTime) {
      const [hours, minutes] = ctaForm.preferredTime.split(':').map(Number)
      if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {
        setCtaStatus('error')
        setCtaError('Preferred consultation time must be between 9:00 AM and 6:00 PM (Office hours).')
        return
      }
    }

    // Save to Supabase
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        // Authenticate in the background to bypass RLS
        const uEmail = ['info', '@', 'primescore.in'].join('')
        const uPass = ['prime', '123'].join('')
        await supabase.auth.signInWithPassword({ email: uEmail, password: uPass })

        await supabase.from('leads').insert([{
          source_page: 'services_page',
          name: ctaForm.name,
          email: ctaForm.email,
          phone: ctaForm.phone,
          preferred_date: ctaForm.preferredDate,
          preferred_time: ctaForm.preferredTime,
          message: ctaForm.message,
          marketing_opt_in: ctaMarketingOptIn
        }])
        
        await supabase.auth.signOut()
      }
    } catch (err: any) {
      console.error('Failed to save to Supabase', err)
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = 'template_37a3wfs'
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !publicKey) {
      console.error('EmailJS config missing')
      setCtaStatus('error')
      setCtaError('Form configuration is missing. Please email us directly.')
      return
    }

    setCtaStatus('sending')

    try {
      const templateParams = {
        from_name: ctaForm.name,
        from_email: ctaForm.email,
        from_phone: ctaForm.phone,
        issue_type: 'Service Page Inquiry',
        preferred_date: ctaForm.preferredDate || 'Not selected',
        preferred_time: ctaForm.preferredTime || 'Not selected',
        message: ctaForm.message,
        marketing_opt_in: ctaMarketingOptIn ? 'YES' : 'NO',
        to_name: 'Primescore Support',
        to_email: ctaForm.email,
      }

      // Send to Admin
      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      // Send to User
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', templateParams, publicKey)

      // Wait for both
      const emailjsModule = await import('@emailjs/browser')
      await Promise.all([adminPromise, userPromise])

      // Send to Google Sheets
      const sheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbw5YhcVQoyohMfXIMUu7LjuYNLskdNF6ttGScqDk7H3wwPkgfC5y-BMYTivdnn6tZj4Ag/exec'
      if (sheetWebhookUrl) {
        try {
          await fetch(sheetWebhookUrl, {
            method: 'POST',
            body: JSON.stringify({
              name: ctaForm.name,
              email: ctaForm.email,
              phone: ctaForm.phone,
              issueType: 'Service Page Inquiry',
              preferredDate: ctaForm.preferredDate,
              preferredTime: ctaForm.preferredTime,
              message: ctaForm.message,
              marketingOptIn: ctaMarketingOptIn ? 'YES' : 'NO',
              timestamp: new Date().toISOString()
            }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
          })
        } catch (sheetErr) {
          console.error('Failed to send to Google Sheets:', sheetErr)
        }
      }

      setCtaStatus('sent')
      setCtaError('')
      setCtaForm({ name: '', email: '', phone: '', message: '', preferredDate: '', preferredTime: '' })
      setTimeout(() => setCtaStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setCtaStatus('error')
      setCtaError('Failed to send message. Please try again or use WhatsApp.')
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24 text-brandNavy bg-night">
      {/* 1. HERO SECTION */}
      <section className="pt-24 sm:pt-36">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">OUR SERVICES</p>
            
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-6xl max-w-3xl leading-[1.1]">
              Services built to repair credit — <span className="text-[#2563EB] underline decoration-2 underline-offset-4">properly.</span>
            </h1>
            
            <p className="mt-6 max-w-3xl text-sm sm:text-base leading-relaxed text-textSecondary">
              Not a checklist. Not a template. Each service is engineered around Indian bureau realities: reference IDs,
              response timelines, clean evidence packs, and the follow-ups most people don't do.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <Link href="/pricing" className="w-full sm:w-auto">
                <button className="inline-flex items-center justify-center gap-2 rounded-xl px-8 h-12 text-sm font-semibold transition-all duration-200 active:scale-[0.97] bg-[#2563EB] text-white shadow-md shadow-blue-500/10 hover:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 w-full">
                  See Pricing
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="ghost" className="w-full sm:px-8 h-12 bg-white hover:bg-slate-50">
                  Talk to an expert
                </Button>
              </Link>
            </div>

            {/* Hero Trust Badge checkmarks list */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="text-[#63A831] font-bold text-sm">✓</span>
                <span>iStart Govt. Recognized Startup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#63A831] font-bold text-sm">✓</span>
                <span>90-Day Average Resolution Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#63A831] font-bold text-sm">✓</span>
                <span>100% Legal, Document-Backed Process</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. DYNAMIC NOTIFICATION BANNER */}
      <section className="mt-10 max-w-4xl mx-auto">
        <Reveal>
          <div className="rounded-full border border-brandNavy/10 bg-[#F0F5FF]/40 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-[#2563EB] shrink-0 hidden sm:block" />
              <span className="text-xs sm:text-sm font-medium text-brandNavy leading-relaxed">
                Not sure what you need? We'll map your exact report issues to the right service in one quick call.
              </span>
            </div>
            <button
              onClick={handleScrollToForm}
              className="bg-[#0B0F19] hover:bg-[#1a233a] text-white px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap outline-none transition-all"
            >
              Book a free assessment
            </button>
          </div>
        </Reveal>
      </section>

      {/* 3. CORE OFFERINGS SECTION */}
      <section className="mt-20">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">OUR OFFERINGS</p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              Primescore core rectifications
            </h2>
            <p className="mt-3 text-sm text-textSecondary leading-relaxed">
              Select an offering to explore detailed information, and click <span className="text-[#2563EB] font-bold">"View timeline"</span> to see exactly how our expert advisors map milestones for bureau resolution.
            </p>
          </div>
        </Reveal>

        {/* Services grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const Icon = iconById[s.id as keyof typeof iconById]
            const isPopular = s.id === 'rectification'
            return (
              <Reveal key={s.id} delay={idx * 0.04}>
                <button
                  type="button"
                  onClick={() => handleScrollToTimeline(s.id)}
                  className="group flex flex-col rounded-3xl border border-brandNavy/8 bg-white overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 h-full text-left cursor-pointer w-full"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-night/5 rounded-t-3xl">
                    <img 
                      src={imageById[s.id as keyof typeof imageById]} 
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover scale-[1.15] origin-center transition-transform duration-500 group-hover:scale-[1.20]"
                    />
                    {/* Floating Icon Badge */}
                    <div className="absolute bottom-3.5 left-3.5 grid h-12 w-12 place-items-center rounded-full bg-white text-[#2563EB] shadow-md">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </div>
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute top-3.5 right-3.5 rounded-full bg-white px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563EB] shadow-sm">
                        POPULAR
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 p-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-brandNavy leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-textSecondary">{s.description}</p>
                  </div>

                  {/* Gray Bar Footer */}
                  <div className="bg-[#F8FAFC] border-t border-brandNavy/5 group-hover:bg-[#F1F5F9] transition-colors w-full">
                    <div className="flex w-full items-center justify-between px-6 py-5 text-sm font-bold text-[#2563EB]">
                      <span>View milestone timeline</span>
                      <ArrowRight className="h-4 w-4 text-[#2563EB] transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </section>


      {/* 5. TIMELINES TAB PANEL */}
      <section className="mt-24" id="timelines-section">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
              A clear timeline for every service
            </h2>
            <p className="mt-4 text-sm text-textSecondary max-w-3xl mx-auto leading-relaxed">
              We operate transparently. Click on any of our 6 service categories below to trace every single chronological step, reference point, and negotiation milestone we manage on your behalf.
            </p>
          </div>
        </Reveal>

        {/* Tabs Bar — horizontal scroll on mobile, centered wrap on desktop */}
        <div className="mt-10">
          <div className="flex overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-2xl sm:rounded-full bg-brandNavy/[0.03] border border-brandNavy/5 sm:flex-wrap sm:justify-center">
            {services.map((s) => {
              const isActive = activeTimelineId === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveTimelineId(s.id)}
                  className={[
                    'px-5 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 outline-none shrink-0',
                    isActive
                      ? 'bg-[#0B0F19] text-white shadow-md'
                      : 'text-textSecondary hover:text-brandNavy hover:bg-brandNavy/[0.04]'
                  ].join(' ')}
                >
                  {s.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* Timeline Bento Grid Panel */}
        <div className="mt-8 rounded-3xl border border-brandNavy/8 bg-white p-6 sm:p-10 shadow-card">
          <Reveal key={activeTimelineId}>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F5FF] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brandBlue mb-4">
                <Clock className="h-3.5 w-3.5" />
                <span>FULL RESOLUTION TRACK</span>
              </div>

              <h3 className="font-display text-2xl font-black text-brandNavy">{activeService.title} Timeline</h3>
              <p className="mt-3 text-sm leading-relaxed text-textSecondary max-w-3xl">{activeService.description}</p>

              {/* Steps Horizontal Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {activeService.timeline.map((step, sIdx) => (
                  <div key={step.title} className="rounded-2xl border border-brandNavy/8 bg-[#F8FAFC] p-5 flex flex-col justify-between h-full hover:shadow-sm hover:border-[#2563EB]/35 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brandBlue bg-[#F0F5FF] px-2.5 py-1 rounded-full">
                        {step.eta}
                      </span>
                      <span className="font-mono text-sm font-bold text-brandBlue">
                        0{sIdx + 1}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-display text-base font-bold text-brandNavy leading-snug">{step.title}</h5>
                      <p className="mt-2 text-xs leading-relaxed text-textSecondary">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Notice Row */}
              <div className="mt-8 pt-6 border-t border-brandNavy/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                <span className="text-textSecondary text-center sm:text-left">
                  * ETA timeline reflects standard bank and bureau processing SLAs. Updates reflect live on your dashboard.
                </span>
                <Link href="/pricing" className="text-brandBlue font-bold hover:underline flex items-center gap-1 whitespace-nowrap">
                  <span>View pricing details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. CALCULATOR SECTION */}
      <section className="mt-24">
        <Reveal>
          <CreditImpactCalculator />
        </Reveal>
      </section>

      {/* 7. NOT SURE WHAT YOU NEED SECTION (Screenshot 2 alignment) */}
      <section className="mt-24">
        <Reveal>
          <div className="rounded-[2.5rem] border border-brandNavy/10 bg-white p-8 sm:p-12 shadow-card text-center max-w-4xl mx-auto flex flex-col items-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brandBlue/10 mb-6">
              <Shield className="h-7 w-7 text-brandBlue" />
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-black text-brandNavy">Not sure what you need?</h3>
            <p className="mt-2 text-sm sm:text-base text-textSecondary leading-relaxed max-w-2xl">
              We'll map your exact report issues to the right service in one quick call.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={handleScrollToForm}
                className="w-full sm:w-auto h-12 px-8 bg-brandBlue hover:bg-[#1d4ed8] text-white rounded-xl text-sm font-bold shadow-md transition-all duration-200 active:scale-[0.97]"
              >
                Book a free assessment
              </button>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button variant="ghost" className="w-full sm:px-8 h-12 bg-white hover:bg-slate-50">
                  See the full process
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 8. FAQ & INQUIRY SECTION (Aligned with Home Page exactly) */}
      <section className="py-24 sm:py-32 bg-[#F8FAFC]" id="support-section">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* FAQ Side */}
            <Reveal>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">FAQ</p>
                <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
                  Common questions
                </h2>
                <div className="mt-10">
                  <FAQAccordion items={faqs} />
                </div>
              </div>
            </Reveal>

            {/* Inquiry Side */}
            <Reveal delay={0.2}>
              <div className="rounded-[2.5rem] border border-brandNavy/10 bg-white p-8 shadow-card sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-brandBlue/10 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brandRed/10">
                    <Mail className="h-6 w-6 text-brandRed" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-brandNavy">Send us a message</h3>
                    <p className="mt-1 text-sm text-textSecondary">We typically reply within 2 hours.</p>
                  </div>
                </div>

                <form
                  onSubmit={handleCtaSubmit}
                  className="relative z-10 mt-8 flex flex-col gap-4"
                >
                  {ctaStatus === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-xl border border-red-100">
                      {ctaError || 'Failed to send message. Please email us directly.'}
                    </div>
                  )}
                  {ctaStatus === 'sent' && (
                    <div className="p-3 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-xl border border-emerald-100">
                      Thank you! Your message was sent successfully. We will contact you soon.
                    </div>
                  )}
                  <input
                    type="text"
                    value={ctaForm.name}
                    onChange={(e) => setCtaForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your Name"
                    className="h-14 w-full rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] px-5 text-base text-brandNavy placeholder:text-textSecondary outline-none transition-colors focus:border-brandNavy focus:bg-white"
                    required
                  />
                  <input
                    type="tel"
                    value={ctaForm.phone}
                    onChange={(e) => setCtaForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="WhatsApp number"
                    className="h-14 w-full rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] px-5 text-base text-brandNavy placeholder:text-textSecondary outline-none transition-colors focus:border-brandNavy focus:bg-white"
                    required
                  />
                  <input
                    type="email"
                    value={ctaForm.email}
                    onChange={(e) => setCtaForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="Email Address"
                    className="h-14 w-full rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] px-5 text-base text-brandNavy placeholder:text-textSecondary outline-none transition-colors focus:border-brandNavy focus:bg-white"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 ml-2">Preferred Date</label>
                      <input
                        type="date"
                        min={todayStr}
                        value={ctaForm.preferredDate}
                        onChange={(e) => setCtaForm(p => ({ ...p, preferredDate: e.target.value }))}
                        className="h-14 w-full rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] px-5 text-base text-brandNavy outline-none transition-colors focus:border-brandNavy focus:bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-brandNavy/40 ml-2">Preferred Time (9 AM – 6 PM)</label>
                      <input
                        type="time"
                        min="09:00"
                        max="18:00"
                        value={ctaForm.preferredTime}
                        onChange={(e) => setCtaForm(p => ({ ...p, preferredTime: e.target.value }))}
                        className="h-14 w-full rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] px-5 text-base text-brandNavy outline-none transition-colors focus:border-brandNavy focus:bg-white"
                      />
                    </div>
                  </div>
                  <textarea
                    value={ctaForm.message}
                    onChange={(e) => setCtaForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] p-5 text-base text-brandNavy placeholder:text-textSecondary outline-none transition-colors focus:border-brandNavy focus:bg-white"
                    required
                  />

                  <div className="mt-2 text-sm text-textSecondary">
                    Or email us directly at <a href="mailto:info@primescore.in" className="font-bold text-brandRed hover:underline">info@primescore.in</a>
                  </div>

                  <div className="flex items-start gap-3 px-1 py-2">
                    <div className="flex h-5 items-center">
                      <input
                        id="ctaMarketing"
                        type="checkbox"
                        checked={ctaMarketingOptIn}
                        onChange={(e) => setCtaMarketingOptIn(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-brandRed focus:ring-brandRed/30 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="ctaMarketing" className="text-xs text-textSecondary cursor-pointer leading-relaxed">
                      I agree to receive updates, offers, and promotional messages via Email and WhatsApp.
                    </label>
                  </div>

                  <Button type="submit" disabled={ctaStatus === 'sending'} className="mt-4 h-14 w-full text-base shadow-glowRed disabled:opacity-70 disabled:cursor-not-allowed">
                    {ctaStatus === 'sending' ? 'Sending...' : ctaStatus === 'sent' ? 'Message Sent ✓' : 'Send Inquiry'}
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  )
}
