'use client'
import React from 'react'

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileUp,
  Lock,
  Radar,
  ShieldCheck,
  TrendingUp,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { faqs, services, testimonials } from '../data/primescore'
import Button from '../components/ui/Button'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import FAQAccordion from '../components/ui/FAQAccordion'
import Reveal from '../components/ui/Reveal'
import HeroInteractive from '../components/ui/HeroInteractive'
import dynamic from 'next/dynamic'

const DashboardPreview3D = dynamic(() => import('../components/ui/DashboardPreview3D'), { ssr: false })
const Carousel3D = dynamic(() => import('../components/ui/Carousel3D'), { ssr: false })
const CreditImpactCalculator = dynamic(() => import('../components/ui/CreditImpactCalculator'), { ssr: false })
const FeatureScrollShowcase = dynamic(() => import('../components/ui/FeatureScrollShowcase'), { ssr: false })
const BureauFlow = dynamic(() => import('../components/ui/BureauFlow'), { ssr: false })
import { useMemo, useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'


function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="rounded-[2rem] border border-brandNavy/10 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brandNavy/20 hover:shadow-elevated">
      <div className="flex items-center gap-4">
        {t.avatar ? (
          <img 
            src={t.avatar} 
            alt={t.name} 
            referrerPolicy="no-referrer"
            className="h-12 w-12 rounded-full object-cover border border-brandNavy/5" 
          />
        ) : (
          <div className="grid h-12 w-12 place-items-center rounded-full bg-brandNavy text-white font-display text-lg font-bold">
            {t.name.split(' ').map((w: string) => w[0]).join('')}
          </div>
        )}
        <div>
          <div className="text-base font-bold text-brandNavy">{t.name}</div>
          <div className="text-sm font-medium text-textSecondary">{t.role}</div>
        </div>
      </div>
      <p className="mt-6 text-base italic leading-relaxed text-textSecondary">
        "{t.quote}"
      </p>
    </div>
  )
}

function TestimonialCarousel({ items }: { items: any[] }) {
  const [idx, setIdx] = useState(0)

  const next = () => setIdx((i) => (i + 1) % items.length)
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % items.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <Reveal key={idx}>
          <TestimonialCard t={items[idx]} />
        </Reveal>
      </div>
      <div className="mt-8 flex gap-4">
        <button onClick={prev} className="grid h-12 w-12 place-items-center rounded-full bg-brandNavy/5 text-brandNavy transition-colors hover:bg-brandNavy/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button onClick={next} className="grid h-12 w-12 place-items-center rounded-full bg-brandNavy/5 text-brandNavy transition-colors hover:bg-brandNavy/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  )
}

const serviceIcons: Record<string, typeof ShieldCheck> = {
  rectification: ShieldCheck,
  settlement: Lock,
  'card-disputes': FileUp,
  monitoring: Radar,
  coaching: TrendingUp,
  emi: Brain,
}

function ScrollLinkedDashboard() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [25, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <motion.div 
      ref={ref}
      style={{ scale, rotateX, opacity }}
      className="w-full flex justify-center"
    >
      <DashboardPreview3D />
    </motion.div>
  )
}

function ParallaxShape({ delay = 0, className = "" }: { delay?: number, className?: string }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -150 + delay * 50])
  
  return (
    <motion.div 
      style={{ y }} 
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-20 ${className}`} 
    />
  )
}

export default function Home() {
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', phone: '', message: '', preferredDate: '', preferredTime: '' })
  const [ctaStatus, setCtaStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [ctaError, setCtaError] = useState('')
  const [ctaMarketingOptIn, setCtaMarketingOptIn] = useState(true)

  const todayStr = useMemo(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [])

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ctaForm.email.trim() || !ctaForm.name.trim()) return
    
    // Save to Supabase
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from('leads').insert([{
          source_page: 'home_page',
          name: ctaForm.name,
          email: ctaForm.email,
          phone: ctaForm.phone,
          preferred_date: ctaForm.preferredDate,
          preferred_time: ctaForm.preferredTime,
          message: ctaForm.message,
          marketing_opt_in: ctaMarketingOptIn
        }]);
        if (error) {
          console.error('Supabase SQL Error:', error);
          alert('Supabase Insert Error: ' + error.message);
        }
      } else {
        console.error('Supabase credentials missing in env');
        alert('Supabase credentials missing in AWS environment variables!');
      }
    } catch (err: any) {
      console.error('Failed to save to Supabase', err);
      alert('Supabase catch Error: ' + err.message);
    }
    
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
        from_phone: 'Not provided (Home Page)',
        issue_type: 'General Inquiry (Home Page)',
        preferred_date: ctaForm.preferredDate || 'Not selected',
        preferred_time: ctaForm.preferredTime || 'Not selected',
        message: ctaForm.message,
        marketing_opt_in: ctaMarketingOptIn ? 'YES' : 'NO',
        to_name: 'Primescore Support',
        to_email: ctaForm.email, // explicitly passing so the user template can use it
      }

      // Send to Admin (original)
      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      // Send to User (new auto-reply template)
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', templateParams, publicKey)

      // Wait for both to finish
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
              phone: 'Not provided (Home Page)',
              issueType: 'General Inquiry (Home Page)',
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
      setCtaForm({ name: '', email: '', message: '', preferredDate: '', preferredTime: '' })
      setTimeout(() => setCtaStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setCtaStatus('error')
      setCtaError('Failed to send message. Please try again or use WhatsApp.')
    }
  }

  const statItems = useMemo(
    () => [
      { label: 'Clients Supported', value: 50000, suffix: '+' },
      { label: 'Value Unlocked', value: 2400, prefix: '₹', suffix: ' Cr+' },
      { label: 'Cases Tracked', value: 97, suffix: '%' },
      { label: 'Avg. Turnaround', value: 90, suffix: ' Days' },
    ],
    [],
  )

  return (
    <div className="bg-white">
      <div data-theme="light">
        <HeroInteractive />
      </div>



      {/* ═══ FEATURE SCROLL SHOWCASE (MOTION GRAPHIC) ═══ */}
      <div data-theme="dark">
        <FeatureScrollShowcase />
      </div>


      {/* ═══ SERVICES ═══ */}
      <section className="py-24 sm:py-32 bg-[#F1F7FF] relative overflow-hidden" id="services" data-theme="light">
        <ParallaxShape delay={2} className="top-1/4 -right-20 h-96 w-96 bg-brandBlue/10 blur-[120px]" />
        <ParallaxShape delay={4} className="bottom-1/4 -left-20 h-96 w-96 bg-brandRed/5 blur-[120px]" />
        
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Asymmetric header: big left text, right link */}
          <Reveal>
            <div className="flex items-end justify-between gap-8 border-b border-brandNavy/10 pb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 bg-brandRed/10 rounded-full px-3 py-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brandRed">Our Expertise</p>
                </div>
                <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-6xl lg:text-7xl leading-[0.95]">
                  What we fix<br /><span className="text-brandBlue">for you.</span>
                </h2>
              </div>
              <Link href="/services" className="shrink-0 hidden sm:block">
                <Button as="div" variant="ghost" className="h-14 px-8 border-brandNavy/20 text-sm font-bold rounded-full hover:bg-brandNavy hover:text-white transition-all text-brandNavy">
                  All services <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Reveal>

          {/* 2-col left feature + 4-col mini cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, idx) => {
              const Icon = serviceIcons[s.id] || ShieldCheck
              const isFeatured = idx === 0
              return (
                <Reveal key={s.id} delay={idx * 0.05}>
                  <div className={`group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${
                    isFeatured 
                      ? 'border-brandRed/20 bg-white lg:row-span-2' 
                      : 'border-brandNavy/8 bg-white hover:border-brandRed/20'
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-brandNavy/5 group-hover:bg-brandRed/10 transition-colors">
                        <Icon className="h-5 w-5 text-brandNavy group-hover:text-brandRed transition-colors" />
                      </div>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-brandNavy">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-textSecondary">{s.short}</p>
                    <Link href="/services" className="mt-5">
                      <div className="text-sm font-semibold text-brandRed flex items-center gap-1.5 hover:gap-2.5 transition-all">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  </div>
                </Reveal>
              )
            })}
        </div>
        </div>
      </section>

      {/* ═══ CREDIT IMPACT CALCULATOR ═══ */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-brandBlue/5 blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <Reveal>
            <CreditImpactCalculator />
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 sm:py-32 bg-[#F1F5F9]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Testimonials</p>
                <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl md:text-6xl max-w-2xl">
                  Trusted by Thousands <span className="text-textSecondary/50">Across India</span>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Desktop Marquee (hidden on mobile) */}
          <div className="mt-16 hidden h-[700px] grid-cols-3 gap-6 overflow-hidden md:grid relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            {/* Column 1 - Up */}
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials.slice(0, 7), ...testimonials.slice(0, 7)].map((t, idx) => (
                <TestimonialCard key={`col1-${idx}`} t={t} />
              ))}
            </motion.div>

            {/* Column 2 - Down */}
            <motion.div
              animate={{ y: ['-50%', '0%'] }}
              transition={{ ease: 'linear', duration: 45, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials.slice(7, 14), ...testimonials.slice(7, 14)].map((t, idx) => (
                <TestimonialCard key={`col2-${idx}`} t={t} />
              ))}
            </motion.div>

            {/* Column 3 - Up */}
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials.slice(14), ...testimonials.slice(14)].map((t, idx) => (
                <TestimonialCard key={`col3-${idx}`} t={t} />
              ))}
            </motion.div>
          </div>

          {/* Mobile Carousel (hidden on desktop) */}
          <div className="mt-12 md:hidden">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* ═══ RECOGNITION & CERTIFICATION ═══ */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 text-center">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Accreditations</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
                Certified & <span className="text-brandBlue">Recognized By</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-10 lg:gap-20 opacity-80 hover:opacity-100 transition-all duration-700">
               <img src="/trusted%20by/DPIIT%20startupindia.png" alt="DPIIT & Startup India" className="h-10 lg:h-16 w-auto object-contain transition-all duration-500" />
               <img src="/trusted%20by/IStart.png" alt="iStart Rajasthan" className="h-10 lg:h-16 w-auto object-contain transition-all duration-500" />
               <img src="/trusted%20by/MSME.png" alt="MSME" className="h-10 lg:h-16 w-auto object-contain transition-all duration-500" />
               <img src="/trusted%20by/RBIH.png" alt="RBIH" className="h-10 lg:h-16 w-auto object-contain transition-all duration-500" />
               <img src="/trusted%20by/I-hub.png" alt="I-hub" className="h-10 lg:h-16 w-auto object-contain transition-all duration-500" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FAQ & INQUIRY ═══ */}
      <section className="py-24 sm:py-32 bg-[#F8FAFC]">
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

      {/* ═══ 3D FEATURE CAROUSEL ═══ */}
      <Carousel3D />
    </div>
  )
}

