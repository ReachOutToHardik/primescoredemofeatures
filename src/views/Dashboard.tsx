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
  
  // 10-second test for instant reload preview
  const targetDate = useMemo(() => new Date(Date.now() + 10000).getTime(), [])
  // Production date: July 19, 2026 at 1:00 PM IST (07:30 UTC) — uncomment for prod:
  // const targetDate = useMemo(() => new Date('2026-07-19T07:30:00Z').getTime(), [])
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

    // Preload assets asynchronously in non-blocking chunks
    const preloadAssets = () => {
      // Chunk 1: Preload Audio (with idle deferral)
      setTimeout(() => {
        const audio = new Audio()
        audio.src = '/launch-sound.mp3'
        audio.preload = 'auto'
      }, 50)

      // Chunk 2: Preload images
      setTimeout(() => {
        const bannerImg = new Image()
        bannerImg.src = '/images/primescore-chess-banner.png'

        const darkLogoImg = new Image()
        darkLogoImg.src = '/Darkmode_Logo.png'
      }, 200)
    }

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => preloadAssets())
      } else {
        preloadAssets()
      }
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
            {/* Background Chess Tiled Image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("/images/primescore-chess-banner.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.18)'
              }}
            />

            {/* Blurred glass overlay */}
            <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(3px)', background: 'rgba(0,0,0,0.4)' }} />

            {/* Audio object */}
            <audio id="launch-audio" src="/launch-sound.mp3" preload="auto" />

            {/* Card */}
            <AnimatePresence>
              {!bannerOpen && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    width: 380,
                    padding: '48px 40px',
                    background: 'rgba(10, 15, 30, 0.75)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0px', // sharp corners
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Dark mode logo */}
                  <img
                    src="/Darkmode_Logo.png"
                    alt="Primescore"
                    style={{ height: 26, width: 'auto', marginBottom: 36, opacity: 0.95 }}
                  />

                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 12 }}>System Status</p>

                  <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 10 }}>
                    Primescore is Live
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 300, lineHeight: 1.6, marginBottom: 32 }}>
                    The operational portal is now accessible. Prepare for dashboard initialization.
                  </p>

                  <button
                    onClick={() => {
                      setBannerOpen(true)
                      const audio = document.getElementById('launch-audio') as HTMLAudioElement
                      if (audio) {
                        audio.volume = 0.8
                        audio.play().catch(err => console.log('Audio playback interaction block:', err))
                      }
                    }}
                    style={{
                      width: '100%',
                      background: '#fff',
                      color: '#000',
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      padding: '13px 0',
                      border: 'none',
                      borderRadius: '0px', // sharp corners
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(255,255,255,0.1)'
                    }}
                  >
                    LAUNCH DASHBOARD
                  </button>

                  <p style={{ marginTop: 18, color: 'rgba(255,255,255,0.15)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                    dashboard.primescore.in
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

                  {/* Clean 3-second Transition sequence with spinning logo, stinger, and fireworks */}
                  <AnimatePresence>
                    {bannerOpen && (
                      <motion.div
                        key="banner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          zIndex: 20,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'radial-gradient(circle at 50% 50%, #0c1236 0%, #030619 60%, #01020a 100%)',
                          overflow: 'hidden'
                        }}
                        onAnimationComplete={() => {
                          // Trigger massive fireworks confetti shower
                          import('canvas-confetti').then((confetti) => {
                            // First, fire a massive initial center burst
                            confetti.default({
                              particleCount: 150,
                              spread: 80,
                              origin: { y: 0.5 }
                            });

                            // Then, run the continuous side fireworks stream
                            const duration = 2.5 * 1000
                            const end = Date.now() + duration

                            const frame = () => {
                              confetti.default({
                                particleCount: 8,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0, y: 0.8 }
                              })
                              confetti.default({
                                particleCount: 8,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1, y: 0.8 }
                              })

                              if (Date.now() < end) {
                                requestAnimationFrame(frame)
                              }
                            }
                            frame()
                          })

                          // Redirect after 3 seconds
                          setTimeout(() => {
                            window.location.href = 'https://dashboard.primescore.in'
                          }, 3200)
                        }}
                      >
                        {/* Stinger Door Reveal */}
                        <StingerReveal />

                         {/* Elegant non-AI spring-loaded upscale logo transition */}
                         <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                           <motion.img
                             src="/Darkmode_Logo.png"
                             alt="Primescore"
                             initial={{ scale: 0.4, opacity: 0 }}
                             animate={{ scale: [0.4, 1.15, 1], opacity: 1 }}
                             transition={{ 
                               duration: 1.1, 
                               ease: [0.25, 1, 0.5, 1],
                               delay: 0.1
                             }}
                             style={{ height: 72, width: 'auto', margin: '0 auto' }}
                           />
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// StingerReveal Component - creates a cool center split stinger door slide open animation
function StingerReveal() {
  const [stingerActive, setStingerActive] = useState(false)

  useEffect(() => {
    // Activates in the final 1.5 seconds of the transition (1.5 seconds in)
    const trigger = setTimeout(() => {
      setStingerActive(true)
    }, 1500)

    return () => clearTimeout(trigger)
  }, [])

  if (!stingerActive) return null

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 18, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
      {/* Underlying matching white landing screen revealed as doors split */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: '#ffffff', 
          zIndex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        {/* Cool modern blue spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '3px solid rgba(37, 99, 235, 0.12)',
            borderTopColor: '#2563EB'
          }}
        />
        <p style={{ marginTop: 20, color: '#1e293b', fontSize: 11, fontWeight: 600, fontFamily: 'monospace', letterSpacing: '0.15em' }}>
          LOADING DASHBOARD...
        </p>
      </div>

      {/* Top half sliding upward */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        style={{
          flex: 1,
          background: 'linear-gradient(180deg, #1e293b, #0f172a)',
          borderBottom: '2px solid #2563EB',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 2
        }}
      />
      {/* Bottom half sliding downward */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        style={{
          flex: 1,
          background: 'linear-gradient(0deg, #1e293b, #0f172a)',
          borderTop: '2px solid #2563EB',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
          zIndex: 2
        }}
      />
    </div>
  )
}
