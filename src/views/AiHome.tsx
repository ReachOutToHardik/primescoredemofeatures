'use client'

import React from 'react'
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  FileUp,
  FileSearch,
  Lock,
  Radar,
  Scale,
  ShieldCheck,
  TrendingUp,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { faqs, services, testimonials } from '../data/primescore'
import Button from '../components/ui/Button'
import FAQAccordion from '../components/ui/FAQAccordion'
import Reveal from '../components/ui/Reveal'
import HeroInteractive from '../components/ui/HeroInteractive'
import dynamic from 'next/dynamic'
import { useMemo, useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

const Carousel3D = dynamic(() => import('../components/ui/Carousel3D'), { ssr: false })
const CreditImpactCalculator = dynamic(() => import('../components/ui/CreditImpactCalculator'), { ssr: false })
const ParthScrollShowcase = dynamic(() => import('../components/ui/ParthScrollShowcase'), { ssr: false })

/* ─── AI Chipset Background Pattern ─── */
function AiChipsetBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="chipset-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Base Grid */}
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.3" />
            
            {/* CPU / Logic Block */}
            <rect x="40" y="40" width="40" height="40" rx="4" fill="none" stroke="#818cf8" strokeWidth="1.5" />
            <rect x="45" y="45" width="30" height="30" rx="2" fill="none" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.7" />
            <circle cx="60" cy="60" r="8" fill="#818cf8" fillOpacity="0.2" />
            
            {/* Data Buses */}
            <path d="M 80 50 L 120 50 L 140 70 L 200 70" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 80 60 L 110 60 L 130 80 L 180 80 L 200 60" fill="none" stroke="#818cf8" strokeWidth="0.5" />
            <path d="M 80 70 L 100 70 L 120 90 L 120 200" fill="none" stroke="#6366f1" strokeWidth="1" />
            
            {/* Micro-nodes */}
            <circle cx="120" cy="50" r="2" fill="#a78bfa" />
            <circle cx="140" cy="70" r="1.5" fill="#a78bfa" />
            <circle cx="100" cy="70" r="2" fill="#6366f1" />
            <circle cx="120" cy="90" r="1.5" fill="#6366f1" />
            
            {/* Secondary Logic Block */}
            <rect x="140" y="120" width="24" height="24" rx="2" fill="none" stroke="#818cf8" strokeWidth="1" />
            <circle cx="152" cy="132" r="4" fill="#a78bfa" fillOpacity="0.3" />
            
            {/* Complex Traces */}
            <path d="M 40 50 L 0 50" fill="none" stroke="#818cf8" strokeWidth="1" />
            <path d="M 60 40 L 60 0" fill="none" stroke="#6366f1" strokeWidth="1" />
            <path d="M 50 80 L 50 140 L 70 160 L 120 160" fill="none" stroke="#a78bfa" strokeWidth="0.5" />
            <path d="M 140 132 L 100 132 L 80 112 L 0 112" fill="none" stroke="#6366f1" strokeWidth="1" />
            <path d="M 164 132 L 184 132 L 200 148" fill="none" stroke="#818cf8" strokeWidth="1" />
            <path d="M 152 144 L 152 200" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 152 120 L 152 90 L 172 70 L 200 70" fill="none" stroke="#6366f1" strokeWidth="0.5" />
            
            {/* Memory Modules */}
            <rect x="10" y="140" width="8" height="20" rx="1" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <rect x="25" y="140" width="8" height="20" rx="1" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 14 140 L 14 112" fill="none" stroke="#6366f1" strokeWidth="0.5" />
            <path d="M 29 140 L 29 112" fill="none" stroke="#6366f1" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chipset-pattern)" />
      </svg>
      {/* Subtle overlay gradient to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#06040f_80%)]" />
    </div>
  )
}

/* ─── Tracing Lines: animated dots racing along SVG tracks ─── */
function TracingLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="pt-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pt-glow-lg" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Track lines (static, faint) ── */}
        <path d="M -100 185 L 1540 185" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.1" />
        <path d="M -100 430 L 1540 430" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.08" />
        <path d="M -100 590 L 900 590" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.07" />
        <path d="M 280 -20 L 780 720" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.07" />
        <path d="M 940 -20 L 520 720" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.06" />
        <path d="M 1120 -20 L 1540 280" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.07" />
        {/* vertical connectors */}
        <path d="M 510 185 L 510 430" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.08" />
        <path d="M 920 185 L 920 430" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.08" />
        <path d="M 920 430 L 920 590" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.06" />

        {/* ── Intersection pulse nodes ── */}
        {[
          { cx: 510, cy: 185, c: '#6366f1', dur: '2s', delay: '0s' },
          { cx: 920, cy: 185, c: '#818cf8', dur: '2.4s', delay: '0.6s' },
          { cx: 510, cy: 430, c: '#a78bfa', dur: '3s', delay: '1s' },
          { cx: 920, cy: 430, c: '#6366f1', dur: '2.2s', delay: '1.5s' },
          { cx: 920, cy: 590, c: '#818cf8', dur: '2.8s', delay: '0.3s' },
        ].map((n, i) => (
          <g key={i} filter="url(#pt-glow)">
            <circle cx={n.cx} cy={n.cy} r="3" fill={n.c} fillOpacity="0.6">
              <animate attributeName="r" values="2;4.5;2" dur={n.dur} begin={n.delay} repeatCount="indefinite" />
              <animate attributeName="fillOpacity" values="0.3;0.9;0.3" dur={n.dur} begin={n.delay} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* ── Moving dots (comet + halo pairs) ── */}

        {/* Right on top track */}
        <g filter="url(#pt-glow-lg)">
          <circle r="6" fill="#6366f1" fillOpacity="0.25">
            <animateMotion dur="9s" repeatCount="indefinite" path="M -100 185 L 1540 185" />
          </circle>
        </g>
        <g filter="url(#pt-glow)">
          <circle r="2.5" fill="#a5b4fc">
            <animateMotion dur="9s" repeatCount="indefinite" path="M -100 185 L 1540 185" />
          </circle>
        </g>

        {/* Second dot on top track, offset */}
        <g filter="url(#pt-glow)">
          <circle r="1.8" fill="#818cf8">
            <animateMotion dur="9s" begin="4.5s" repeatCount="indefinite" path="M -100 185 L 1540 185" />
          </circle>
        </g>

        {/* Left on middle track */}
        <g filter="url(#pt-glow-lg)">
          <circle r="6" fill="#a78bfa" fillOpacity="0.2">
            <animateMotion dur="12s" begin="2s" repeatCount="indefinite" path="M 1540 430 L -100 430" />
          </circle>
        </g>
        <g filter="url(#pt-glow)">
          <circle r="2.5" fill="#c4b5fd">
            <animateMotion dur="12s" begin="2s" repeatCount="indefinite" path="M 1540 430 L -100 430" />
          </circle>
        </g>

        {/* Second dot on middle track */}
        <g filter="url(#pt-glow)">
          <circle r="1.8" fill="#818cf8">
            <animateMotion dur="12s" begin="8s" repeatCount="indefinite" path="M 1540 430 L -100 430" />
          </circle>
        </g>

        {/* Right on bottom track */}
        <g filter="url(#pt-glow)">
          <circle r="2" fill="#818cf8">
            <animateMotion dur="10s" begin="5s" repeatCount="indefinite" path="M -100 590 L 900 590" />
          </circle>
        </g>

        {/* Diagonal down-right */}
        <g filter="url(#pt-glow-lg)">
          <circle r="5" fill="#6366f1" fillOpacity="0.2">
            <animateMotion dur="10s" begin="1s" repeatCount="indefinite" path="M 280 -20 L 780 720" />
          </circle>
        </g>
        <g filter="url(#pt-glow)">
          <circle r="2" fill="#818cf8">
            <animateMotion dur="10s" begin="1s" repeatCount="indefinite" path="M 280 -20 L 780 720" />
          </circle>
        </g>

        {/* Diagonal down-left */}
        <g filter="url(#pt-glow)">
          <circle r="2" fill="#a78bfa">
            <animateMotion dur="11s" begin="4s" repeatCount="indefinite" path="M 940 -20 L 520 720" />
          </circle>
        </g>

        {/* Partial diagonal top-right */}
        <g filter="url(#pt-glow)">
          <circle r="2" fill="#6366f1">
            <animateMotion dur="7s" begin="2s" repeatCount="indefinite" path="M 1120 -20 L 1540 280" />
          </circle>
        </g>

        {/* Vertical down (left connector) */}
        <g filter="url(#pt-glow)">
          <circle r="1.5" fill="#6366f1">
            <animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M 510 185 L 510 430" />
          </circle>
        </g>

        {/* Vertical up (right connector) */}
        <g filter="url(#pt-glow)">
          <circle r="1.5" fill="#818cf8">
            <animateMotion dur="4.5s" begin="3s" repeatCount="indefinite" path="M 920 430 L 920 185" />
          </circle>
        </g>

        {/* Vertical down (right connector 2) */}
        <g filter="url(#pt-glow)">
          <circle r="1.5" fill="#a78bfa">
            <animateMotion dur="3.5s" begin="2.5s" repeatCount="indefinite" path="M 920 430 L 920 590" />
          </circle>
        </g>
      </svg>
    </div>
  )
}

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

export default function AiHome() {
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', message: '', preferredDate: '', preferredTime: '' })
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
        from_phone: 'Not provided (AI Home Page)',
        issue_type: 'AI Sandbox Inquiry (AI Home Page)',
        preferred_date: ctaForm.preferredDate || 'Not selected',
        preferred_time: ctaForm.preferredTime || 'Not selected',
        message: ctaForm.message,
        marketing_opt_in: ctaMarketingOptIn ? 'YES' : 'NO',
        to_name: 'Primescore Support',
        to_email: ctaForm.email,
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

  return (
    <div className="bg-white">
      <div data-theme="light">
        <HeroInteractive />
      </div>

      {/* ═══ INTRODUCING PARTH (ULTRA-MINIMALIST / PREMIUM) ═══ */}
      <section className="relative bg-black py-32 sm:py-48 overflow-hidden" data-theme="dark">
        {/* Subtle top border/gradient to transition from the white hero */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-[1200px] px-6 grid lg:grid-cols-[1fr_0.8fr] gap-16 items-center">
          
          {/* Left Column: Typography & Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left"
            >
              <h2 className="text-5xl sm:text-[80px] font-medium tracking-tight text-white leading-none mb-10">
                Meet Parth.
              </h2>
              
              <p className="text-2xl sm:text-3xl text-slate-400 leading-[1.4] font-light max-w-2xl tracking-tight">
                An autonomous resolution engine that reads bureau data, maps anomalies to RBI directives, and drafts legally-binding disputes. <br className="hidden sm:block"/><span className="text-white font-normal mt-2 inline-block">Zero human intervention required.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 border-t border-white/10 pt-12"
            >
              <div>
                <div className="text-4xl font-medium text-white tracking-tight mb-2">99.8%</div>
                <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Parse Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-medium text-white tracking-tight mb-2">&lt;90s</div>
                <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Dispute Assembly</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-4xl font-medium text-white tracking-tight mb-2">24/7</div>
                <div className="text-sm text-slate-500 font-medium tracking-wide uppercase">Node Dispatching</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Tech Data Matrix */}
          <style>{`
            @keyframes matrix-pulse {
              0%, 100% { opacity: 0.08; transform: scale(1); background: rgba(255,255,255,0.15); }
              50% { opacity: 1; transform: scale(1.6); background: rgb(99,102,241); }
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex justify-end items-center h-[500px] overflow-hidden"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* CSS-only Matrix Grid */}
              <div
                className="grid gap-[8px]"
                style={{
                  gridTemplateColumns: 'repeat(16, 1fr)',
                  transform: 'perspective(1000px) rotateX(45deg) rotateZ(-30deg) scale(1.5)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {Array.from({ length: 256 }).map((_, i) => {
                  const col = i % 16
                  const row = Math.floor(i / 16)
                  const delay = ((col * 0.15) + (row * 0.1)) % 3
                  return (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        animation: `matrix-pulse 3s ease-in-out ${delay.toFixed(2)}s infinite`,
                      }}
                    />
                  )
                })}
              </div>

              {/* Edge fade overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,black_70%)] pointer-events-none" />

              {/* Scanning line */}
              <motion.div
                animate={{ y: [-150, 150] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent pointer-events-none blur-[1px]"
                style={{ transform: 'rotate(-30deg)' }}
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══ PARTH AI FEATURE SCROLL SHOWCASE (SARVAM STYLE LIGHT CANVAS) ═══ */}
      <div data-theme="light">
        <ParthScrollShowcase />
      </div>

      {/* ═══ SERVICES ═══ */}
      <section className="py-24 sm:py-32 bg-[#F1F7FF] relative overflow-hidden" id="services" data-theme="light">
        <ParallaxShape delay={2} className="top-1/4 -right-20 h-96 w-96 bg-brandBlue/10 blur-[120px]" />
        <ParallaxShape delay={4} className="bottom-1/4 -left-20 h-96 w-96 bg-brandRed/5 blur-[120px]" />
        
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 relative z-10">
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

          {/* Desktop Marquee */}
          <div className="mt-16 hidden h-[700px] grid-cols-3 gap-6 overflow-hidden md:grid relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 35, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials.slice(0, 7), ...testimonials.slice(0, 7)].map((t, idx) => (
                <TestimonialCard key={`col1-${idx}`} t={t} />
              ))}
            </motion.div>

            <motion.div
              animate={{ y: ['-50%', '0%'] }}
              transition={{ ease: 'linear', duration: 45, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials.slice(7, 14), ...testimonials.slice(7, 14)].map((t, idx) => (
                <TestimonialCard key={`col2-${idx}`} t={t} />
              ))}
            </motion.div>

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

          {/* Mobile Carousel */}
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
