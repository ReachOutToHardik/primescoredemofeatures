'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Web3Forms Configuration
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const ACCESS_KEY = '3b227acb-f76a-4120-8568-797ad9dd59b5'

export default function Dashboard() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Countdown target. Change this during local testing.
  // For local testing: Set to target current time plus 5 seconds (uncomment below line)
  // const targetDate = useMemo(() => new Date(Date.now() + 5000).getTime(), [])
  
  // Production date: July 19, 2026 at 1:00 PM IST (07:30 UTC) — uncomment for prod:
  // const targetDate = useMemo(() => new Date('2026-07-19T07:30:00Z').getTime(), [])
  // 10-second test (comment out for prod):
  const targetDate = useMemo(() => new Date(Date.now() + 10000).getTime(), [])
  useEffect(() => {
    let fired = false

    const updateTime = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        if (!fired) {
          fired = true
          setIsRedirecting(true)
          
          // Trigger dynamic imports of canvas-confetti
          import('canvas-confetti').then((confetti) => {
            confetti.default({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.55 }
            })
          })
          // No auto-redirect — user must click "Open Dashboard"
        }
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      // 1. Submit to Supabase table
      const { supabase } = await import('../lib/supabase')
      if (supabase) {
        const { error: dbError } = await supabase
          .from('dashboard_wishlist')
          .insert([{ email: email.trim(), status: 'Pending' }])
        
        if (dbError) {
          console.error('Supabase DB Insert Error:', dbError)
        }
      }

      // 2. Submit to Web3Forms
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          email: email,
          subject: 'New Waitlist Signup for Primescore Dashboard',
          from_name: 'Primescore Waitlist',
        }),
      })

      if (res.status === 200) {
        // Send Premium Welcome Email via EmailJS (Waitlist specific account)
        try {
          await emailjs.send(
            'service_z29eucm',
            'template_7fkqtv5',
            {
              from_email: email,
              to_email: email, // Keeping just in case
            },
            '4OCw45XN2GQNAs8uy'
          )
        } catch (emailError) {
          console.error('EmailJS Error:', emailError)
        }

        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error('Submit Error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-white px-4 sm:px-6 relative overflow-hidden selection:bg-brandNavy/10">
      
      {/* Ultra-Premium Background Effects (Safe & Intense 3D Blue-Green Flares) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-brandNavy/[0.06] to-transparent pointer-events-none" />
      
      {/* Intense Safe 3D Blue & Green Light Flares */}
      <div className="absolute top-[10%] left-[15%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-br from-brandBlue/25 to-cyan-500/10 rounded-full filter blur-[130px] pointer-events-none animate-pulse opacity-90" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[10%] right-[15%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-gradient-to-tr from-[#10b981]/25 to-emerald-400/10 rounded-full filter blur-[130px] pointer-events-none animate-pulse opacity-90" style={{ animationDuration: '9s' }} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brandNavy/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl w-full text-center relative z-10"
      >


        <h1 className="text-5xl sm:text-[80px] font-medium tracking-tight text-brandNavy mb-8 leading-[1.05]">
          The new standard in <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-brandNavy to-brandNavy/60">credit resolution.</span>
        </h1>

        <p className="text-lg sm:text-xl text-textSecondary mb-14 max-w-2xl mx-auto font-light leading-relaxed">
          We are launching the entirely rebuilt Primescore Dashboard. 
          Join the exclusive waitlist today to secure a <strong className="text-brandNavy font-semibold">40% discount on your first payment</strong>.
        </p>

        {/* Premium Countdown */}
        <div className="flex justify-center gap-6 sm:gap-12 mb-16">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="text-4xl sm:text-6xl font-light text-brandNavy tracking-tighter tabular-nums mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-textSecondary font-semibold">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Premium Form */}
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white border border-brandNavy/10 shadow-sm max-w-md mx-auto"
          >
            <CheckCircle2 className="w-5 h-5 text-brandNavy" />
            <span className="font-medium text-brandNavy">You're on the list. Keep an eye on your inbox.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brandNavy/20 to-brandRed/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 pl-8 pr-[160px] rounded-full border border-brandNavy/10 bg-white/80 backdrop-blur-md shadow-sm text-brandNavy placeholder:text-textSecondary/50 focus:outline-none focus:border-brandNavy/30 focus:ring-4 focus:ring-brandNavy/5 transition-all text-lg"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-2 top-2 bottom-2 px-8 rounded-full bg-brandNavy text-white text-sm font-medium hover:bg-brandNavy/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 shadow-md"
              >
                {status === 'loading' ? 'Joining...' : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            {status === 'error' && (
              <p className="absolute -bottom-8 left-0 w-full text-center text-xs text-brandRed font-medium">
                Something went wrong. Please check your connection and try again.
              </p>
            )}
          </form>
        )}
      </motion.div>

      {/* Transition Screen */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Chess pattern with logo in alternating squares */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#0d0d0d',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3C!-- dark squares --%3E%3Crect width='48' height='48' fill='%230d0d0d'/%3E%3Crect x='48' y='48' width='48' height='48' fill='%230d0d0d'/%3E%3C!-- light squares with logo --%3E%3Crect x='48' width='48' height='48' fill='%23181818'/%3E%3Crect y='48' width='48' height='48' fill='%23181818'/%3E%3C!-- logo in top-right square --%3E%3Cg transform='translate(60,12)' opacity='0.13'%3E%3Crect width='24' height='24' rx='7' fill='url(%23g1)'/%3E%3Ctext x='12' y='17' text-anchor='middle' font-family='system-ui' font-size='9' font-weight='800' fill='%230B1220'%3EPS%3C/text%3E%3C/g%3E%3C!-- logo in bottom-left square --%3E%3Cg transform='translate(12,60)' opacity='0.13'%3E%3Crect width='24' height='24' rx='7' fill='url(%23g2)'/%3E%3Ctext x='12' y='17' text-anchor='middle' font-family='system-ui' font-size='9' font-weight='800' fill='%230B1220'%3EPS%3C/text%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' y1='0' x2='24' y2='24' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F5C842'/%3E%3Cstop offset='1' stop-color='%234F8EF7'/%3E%3C/linearGradient%3E%3ClinearGradient id='g2' x1='0' y1='0' x2='24' y2='24' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23F5C842'/%3E%3Cstop offset='1' stop-color='%234F8EF7'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E")`,
                backgroundSize: '96px 96px'
              }}
            />

            {/* Subtle dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)' }} />

            {/* Card */}
            <AnimatePresence>
              {!bannerOpen && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    width: 360,
                    padding: '48px 40px',
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  {/* Dark mode logo */}
                  <img
                    src="/Darkmode_Logo.png"
                    alt="Primescore"
                    style={{ height: 28, width: 'auto', marginBottom: 36, opacity: 0.9 }}
                  />

                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 14 }}>Dashboard</p>

                  <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 10 }}>
                    We&apos;re live.
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: 300, lineHeight: 1.6, marginBottom: 36 }}>
                    Your dashboard is ready and waiting.
                  </p>

                  <button
                    onClick={() => setBannerOpen(true)}
                    style={{
                      width: '100%',
                      background: '#fff',
                      color: '#000',
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      padding: '12px 0',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Open Dashboard
                  </button>

                  <p style={{ marginTop: 18, color: 'rgba(255,255,255,0.18)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                    dashboard.primescore.in
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* White banner expand from center */}
            <AnimatePresence>
              {bannerOpen && (
                <motion.div
                  key="banner"
                  initial={{ scaleX: 0, scaleY: 0.5, opacity: 0 }}
                  animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 20,
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transformOrigin: '50% 50%'
                  }}
                  onAnimationComplete={() => {
                    setTimeout(() => {
                      window.location.href = 'https://dashboard.primescore.in'
                    }, 900)
                  }}
                >
                  <motion.img
                    src="/lightmode_Logo.png"
                    alt="Primescore"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ height: 32, width: 'auto', marginBottom: 28 }}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 120 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
                    style={{ height: 1, background: 'rgba(0,0,0,0.1)', marginBottom: 24 }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    style={{ color: 'rgba(0,0,0,0.28)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.3em', textTransform: 'uppercase' }}
                  >
                    Redirecting
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
