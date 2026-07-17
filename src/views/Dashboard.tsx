'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import emailjs from '@emailjs/browser'
import * as THREE from 'three'

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
                      // Audio play is now deferred to trigger exactly with the logo animation reveal at 8.2s
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

                  {/* Elegant 13-second Transition sequence with Text Announcements, Confetti, Clip Wipe & Iris Reveal */}
                  <AnimatePresence>
                    {bannerOpen && (
                      <motion.div
                        key="banner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          zIndex: 20,
                          background: 'radial-gradient(circle at 50% 50%, #0c1236 0%, #030619 60%, #01020a 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}
                        onAnimationComplete={() => {
                          // Play the futuristic synth ident intro track at 12.5s
                          setTimeout(() => {
                            const audio = document.getElementById('launch-audio') as HTMLAudioElement
                            if (audio) {
                              audio.volume = 0.8
                              audio.play().catch(err => console.log('Deferred audio playback error:', err))
                            }
                          }, 12500);

                          // Confetti fires at 14.5s
                          setTimeout(() => {
                            import('canvas-confetti').then((confetti) => {
                              confetti.default({ particleCount: 180, spread: 90, origin: { y: 0.5 } });
                              const duration = 3 * 1000;
                              const end = Date.now() + duration;
                              const frame = () => {
                                  confetti.default({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0, y: 0.8 } });
                                  confetti.default({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1, y: 0.8 } });
                                  if (Date.now() < end) requestAnimationFrame(frame);
                              };
                              frame();
                            });
                          }, 14500);

                          // Redirect at 21.0s
                          setTimeout(() => {
                            window.location.href = 'https://dashboard.primescore.in'
                          }, 21000)
                        }}
                      >
                        {/* 21st.dev Floating Particles Background */}
                        <FloatingParticles 
                          particleCount={2500} 
                          particleColor1="#2563EB" 
                          particleColor2="#3B82F6" 
                          cameraDistance={900} 
                          rotationSpeed={0.06} 
                          particleSize={14}
                        />

                        {/* Clip-Wipe & Iris Reveal Animation Overlays */}
                        <IrisStingerReveal />

                        {/* Staggered stack of all announcement texts introduced sequentially, then faded out */}
                        <ElegantAnnouncer />

                        {/* Elegant non-AI spring-loaded upscale logo transition with elegant wobble - absolutely centered */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '50%', 
                          left: '50%', 
                          transform: 'translate3d(-50%, -50%, 0)', 
                          zIndex: 10, 
                          textAlign: 'center' 
                        }}>
                          <motion.img
                            src="/Darkmode_Logo.png"
                            alt="Primescore"
                            initial={{ scale: 0.3, rotate: -8, opacity: 0 }}
                            animate={{ scale: [0.3, 1.15, 0.96, 1.02, 1], rotate: [0, 8, -4, 2, 0], opacity: 1 }}
                            transition={{ 
                              duration: 1.4, 
                              ease: [0.34, 1.56, 0.64, 1],
                              delay: 13.0
                            }}
                            style={{ height: 85, width: 'auto', margin: '0 auto' }}
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

function ElegantAnnouncer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const lines = [
    "Built from the ground up for speed and simplicity.",
    "Four major credit bureaus. One unified health report.",
    "Detecting invalid historical records damaging your score.",
    "The professional credit rectification console.",
    "Introducing..."
  ];

  useEffect(() => {
    // Show each line one by one in the exact middle, remaining on screen longer (2.8s gaps)
    const line1 = setTimeout(() => setCurrentIndex(0), 100);
    const line2 = setTimeout(() => setCurrentIndex(1), 2600);
    const line3 = setTimeout(() => setCurrentIndex(2), 5200);
    const line4 = setTimeout(() => setCurrentIndex(3), 7800);
    const line5 = setTimeout(() => setCurrentIndex(4), 10400);
    // Fade out the last line at 12.3s
    const fadeOutAll = setTimeout(() => setFadeOut(true), 12300);

    return () => {
      clearTimeout(line1);
      clearTimeout(line2);
      clearTimeout(line3);
      clearTimeout(line4);
      clearTimeout(line5);
      clearTimeout(fadeOutAll);
    };
  }, []);

  return (
    <div
      style={{ 
        zIndex: 10, 
        position: 'absolute', 
        inset: 0,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence mode="wait">
        {!fadeOut && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              textAlign: 'center',
              padding: '0 32px',
              maxWidth: 900
            }}
          >
            <p 
              style={{ 
                color: '#ffffff', 
                fontSize: 34, 
                fontWeight: 300, 
                fontFamily: 'Outfit, Inter, system-ui, sans-serif', 
                letterSpacing: '0.04em', 
                lineHeight: 1.45,
                textShadow: '0 2px 15px rgba(0,0,0,0.6)',
                margin: 0
              }}
            >
              {lines[currentIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// IrisStingerReveal Component - Performs a diagonal clip wipe cover followed by circular iris reveal
function IrisStingerReveal() {
  const [wipeActive, setWipeActive] = useState(false);
  const [irisActive, setIrisActive] = useState(false);

  useEffect(() => {
    // 1. Cover screen in diagonal clip wipe at 14.5 seconds
    const wipeTrigger = setTimeout(() => {
      setWipeActive(true);
    }, 14500);

    // 2. Open up / Reveal in circular Iris at 16 seconds
    const irisTrigger = setTimeout(() => {
      setIrisActive(true);
    }, 16000);

    return () => {
      clearTimeout(wipeTrigger);
      clearTimeout(irisTrigger);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 18, pointerEvents: 'none' }}>
      {/* 1. Diagonal Clip Wipe Cover Screen */}
      <AnimatePresence>
        {wipeActive && !irisActive && (
          <motion.div
            initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0f172a',
              zIndex: 2
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. Iris Circle Reveal screen (Wipe opens up to white match dashboard start screen) */}
      <AnimatePresence>
        {irisActive && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
             {/* Clean screen cover transition without loading elements */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FloatingParticlesProps {
  className?: string
}

export function FloatingParticles({ className = "" }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    // Configurable particle parameters
    const particleCount = 120
    const particles: Array<{
      x: number
      y: number
      r: number
      dx: number
      dy: number
      opacity: number
      fadeSpeed: number
    }> = []

    // Populate particles keeping the center clear
    const createParticle = (initRandomY = false) => {
      const angle = Math.random() * Math.PI * 2
      // Force particles to spawn away from center (at least 220px radius offset)
      const distance = 220 + Math.random() * 400
      
      const x = width / 2 + Math.cos(angle) * distance
      const y = initRandomY 
        ? Math.random() * height 
        : height / 2 + Math.sin(angle) * distance

      return {
        x,
        y,
        r: Math.random() * 2 + 1.2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -Math.random() * 0.6 - 0.2, // drifting upwards
        opacity: Math.random() * 0.5 + 0.1,
        fadeSpeed: 0.002 + Math.random() * 0.003
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true))
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Gradient color configuration matching dashboard colors
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Move particle
        p.x += p.dx
        p.y += p.dy

        // Draw glowing particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})` // Blue theme matching console branding
        ctx.shadowColor = '#3B82F6'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0 // reset shadow

        // Keep center clean: if a particle drifts too close to center, push it away
        const distToCenter = Math.hypot(p.x - width / 2, p.y - height / 2)
        if (distToCenter < 190) {
          const angle = Math.atan2(p.y - height / 2, p.x - width / 2)
          p.x = width / 2 + Math.cos(angle) * 192
          p.y = height / 2 + Math.sin(angle) * 192
          p.dx = Math.cos(angle) * 0.5
        }

        // Recycle particles drifting off screen
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(false)
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}
