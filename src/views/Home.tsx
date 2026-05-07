'use client'

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
import DashboardPreview3D from '../components/ui/DashboardPreview3D'
import Carousel3D from '../components/ui/Carousel3D'
import { useMemo, useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'


function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="rounded-[2rem] border border-brandNavy/10 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brandNavy/20 hover:shadow-elevated">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-brandNavy text-white font-display text-lg font-bold">
          {t.name.split(' ').map((w: string) => w[0]).join('')}
        </div>
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

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1])
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [25, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

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
  const [ctaForm, setCtaForm] = useState({ name: '', email: '', message: '' })
  const [ctaStatus, setCtaStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ctaForm.email.trim() || !ctaForm.name.trim()) return
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS config missing')
      setCtaStatus('error')
      return
    }

    setCtaStatus('sending')

    try {
      const templateParams = {
        from_name: ctaForm.name,
        from_email: ctaForm.email,
        from_phone: 'Not provided (Home Page)',
        issue_type: 'General Inquiry (Home Page)',
        message: ctaForm.message,
        to_name: 'Primescore Support',
        to_email: ctaForm.email, // explicitly passing so the user template can use it
      }

      // Send to Admin (original)
      const adminPromise = emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      // Send to User (new auto-reply template)
      const userPromise = emailjs.send(serviceId, 'template_uom4pnf', templateParams, publicKey)

      // Wait for both to finish
      await Promise.all([adminPromise, userPromise])


      setCtaStatus('sent')
      setCtaForm({ name: '', email: '', message: '' })
      setTimeout(() => setCtaStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS Error:', err)
      setCtaStatus('error')
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
    <div className="pb-20">
      {/* ═══ HERO ═══ */}
      <HeroInteractive />

      {/* ═══ STATS ═══ */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-12">
        <div className="border-y border-brandNavy/5 bg-brandNavy px-4 py-12 sm:px-6 lg:px-12 text-white">
          <div className="mx-auto grid max-w-[1440px] gap-8 sm:grid-cols-4">
            {statItems.map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <div className="font-display text-4xl font-black tracking-tight sm:text-5xl text-white">
                    <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/70 uppercase tracking-widest">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="mt-32 relative" id="how">
        <ParallaxShape delay={1} className="top-0 -left-20 h-64 w-64 bg-brandRed/10" />
        <ParallaxShape delay={2} className="bottom-0 -right-20 h-96 w-96 bg-brandNavy/5" />
        
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              Three steps to a cleaner report
            </h2>
            <p className="mt-4 text-base text-textSecondary">We do the heavy lifting. You track the progress.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: FileUp,
              num: '01',
              title: 'Upload Your Report',
              desc: 'Quick onboarding. We only request essential documents through a secure, encrypted upload portal.',
            },
            {
              icon: Brain,
              num: '02',
              title: 'We Identify & Dispute',
              desc: 'Our experts detect disputable inaccuracies and prepare bureau-ready evidence packs backed by law.',
            },
            {
              icon: TrendingUp,
              num: '03',
              title: 'Score Recovers',
              desc: 'Corrections reflect — your credit strengthens and premium loan approvals become easier than ever.',
            },
          ].map((step, idx) => (
            <Reveal key={step.title} delay={idx * 0.08}>
              <div className="group relative overflow-hidden rounded-[2rem] border border-brandNavy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brandRed/30 hover:shadow-elevated">
                <div className="absolute -right-4 -top-4 text-[120px] font-black leading-none text-brandNavy/[0.03] transition-colors group-hover:text-brandRed/[0.05]">
                  {step.num}
                </div>
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brandRed/10 transition-colors group-hover:bg-brandRed">
                    <step.icon className="h-6 w-6 text-brandRed transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-brandNavy">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-textSecondary">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>



      {/* ═══ DASHBOARD HIGHLIGHT ═══ */}
      <section className="mt-32" id="dashboard-section">
        <Reveal>
          <div className="rounded-[3rem] bg-brandNavy px-6 py-16 sm:px-16 sm:py-20 lg:px-24 relative overflow-hidden">
            {/* Parallax Background Circles */}
            <motion.div 
              style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -100]) }}
              className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brandRed/10 blur-3xl pointer-events-none" 
            />
            
            <div className="grid items-center gap-12 lg:grid-cols-2 relative z-10">
              <div className="order-2 lg:order-1">
                <img src="/Logo-primescore.png" alt="Primescore" className="h-8 w-auto brightness-0 invert mb-8" />
                <h2 className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Total transparency.<br />No black boxes.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                  Unlike traditional agencies, we give you a live dashboard to track every dispute, reference ID, and score change. You are always in control of your financial data.
                </p>
                <div className="mt-10 grid gap-4">
                  {[
                    'Live case tracking & timelines',
                    'Direct chat with your credit expert',
                    'Secure document vault',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-brandGreen" />
                      <span className="text-base font-medium text-white">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <Link href="/dashboard">
                    <Button as="div" variant="white">View Sample Dashboard</Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:flex order-2 justify-center lg:-mr-12 perspective-1000">
                <ScrollLinkedDashboard />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="mt-32" id="services">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">Services</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
                Everything you need to repair credit
              </h2>
            </div>
            <Link href="/services" className="shrink-0">
              <Button as="div" variant="ghost" className="h-12 border-brandNavy/20">
                View all services <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => {
            const Icon = serviceIcons[s.id] || ShieldCheck
            return (
              <Reveal key={s.id} delay={idx * 0.05}>
                <div className="group flex h-full flex-col rounded-[2rem] border border-brandNavy/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brandRed/30 hover:shadow-elevated">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brandNavy/5">
                      <Icon className="h-6 w-6 text-brandNavy" />
                    </div>
                    <span className="rounded-full bg-brandYellow/10 px-3 py-1 font-mono text-xs font-bold text-brandYellow">
                      {s.priceRange}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-brandNavy">{s.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-textSecondary">{s.short}</p>
                  <Link href="/services" className="mt-8">
                    <Button as="div" variant="ghost" className="w-full text-brandNavy">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="mt-32">
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
              transition={{ ease: 'linear', duration: 180, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                <TestimonialCard key={`col1-${idx}`} t={t} />
              ))}
            </motion.div>

            {/* Column 2 - Down */}
            <motion.div
              animate={{ y: ['-50%', '0%'] }}
              transition={{ ease: 'linear', duration: 200, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                <TestimonialCard key={`col2-${idx}`} t={t} />
              ))}
            </motion.div>

            {/* Column 3 - Up */}
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ ease: 'linear', duration: 160, repeat: Infinity }}
              className="flex w-full flex-col gap-6"
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
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

      {/* ═══ FAQ & INQUIRY ═══ */}
      <section className="mt-32 mb-20">
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
                <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-brandRed/5 blur-3xl pointer-events-none" />
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
                      Failed to send message. Please email us directly.
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

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919680530334"
        target="_blank"
        rel="noreferrer noopener"
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 sm:bottom-8 sm:right-8"
        aria-label="Contact on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
    </div>
  )
}

