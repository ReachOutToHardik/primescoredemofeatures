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
                          // Play the futuristic synth ident intro track at 7.5s (matching text fade out)
                          setTimeout(() => {
                            const audio = document.getElementById('launch-audio') as HTMLAudioElement
                            if (audio) {
                              audio.volume = 0.8
                              audio.play().catch(err => console.log('Deferred audio playback error:', err))
                            }
                          }, 7500);

                          // Confetti fires at 9.5s (after logo wobble has completed)
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
                          }, 9500);

                          // Redirect 2 seconds after the last transition (clip wipe / iris) initiates at 13.5s
                          setTimeout(() => {
                            window.location.href = 'https://dashboard.primescore.in'
                          }, 13500)
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
                              ease: [0.34, 1.56, 0.64, 1], // premium overshoot bounce
                              delay: 8.2 // triggers right after announcements fade out
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

// ElegantAnnouncer - Introduces each key block sequentially one-by-one, keeping them on screen in a list, then fades them all away at 7.5s
function ElegantAnnouncer() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const announcements = [
    { title: "PRIMESCORE CONSOLE", subtitle: "All four credit bureau reports in a single platform" },
    { title: "SECURE SOCKETS", subtitle: "Configuring banking-grade secure registry registry vaults" },
    { title: "ENCRYPTED CHANNELS", subtitle: "Establishing cryptographically signed gateway bridges" },
    { title: "LEDGER AUDIT", subtitle: "Synchronizing dispute resolution general parameters" }
  ];

  useEffect(() => {
    // Stagger introduction of each announcement block
    const introTimeouts = [
      setTimeout(() => setVisibleCount(1), 200),
      setTimeout(() => setVisibleCount(2), 1800),
      setTimeout(() => setVisibleCount(3), 3400),
      setTimeout(() => setVisibleCount(4), 5000),
      // Fade out the entire stack of announcements at 7.5s
      setTimeout(() => setFadeOut(true), 7500)
    ];

    return () => introTimeouts.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      animate={fadeOut ? { opacity: 0, y: -40, filter: 'blur(16px)' } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.3, 0, 0.1, 1] }}
      style={{ 
        zIndex: 10, 
        padding: '0 24px', 
        position: 'absolute', 
        inset: 0,
        display: 'flex', 
        flexDirection: 'column', 
        gap: '40px', 
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {announcements.map((item, idx) => (
        <div key={idx} style={{ width: '100%', maxWidth: 800 }}>
          <AnimatePresence>
            {visibleCount > idx && (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  textAlign: 'center',
                  padding: '10px'
                }}
              >
                <span 
                  style={{ 
                    color: '#3B82F6', 
                    fontSize: 18, 
                    fontWeight: 900, 
                    fontFamily: 'Inter, system-ui, sans-serif', 
                    letterSpacing: '0.4em', 
                    display: 'block', 
                    marginBottom: 12, 
                    textTransform: 'uppercase',
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                  }}
                >
                  {item.title}
                </span>
                <span 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: 32, 
                    fontWeight: 300, 
                    fontFamily: 'Inter, system-ui, sans-serif', 
                    letterSpacing: '0.05em', 
                    lineHeight: 1.4,
                    display: 'block',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {item.subtitle}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

// IrisStingerReveal Component - Performs a diagonal clip wipe cover followed by circular iris reveal
function IrisStingerReveal() {
  const [wipeActive, setWipeActive] = useState(false);
  const [irisActive, setIrisActive] = useState(false);

  useEffect(() => {
    // 1. Cover screen in diagonal clip wipe at 11.5 seconds
    const wipeTrigger = setTimeout(() => {
      setWipeActive(true);
    }, 11500);

    // 2. Open up / Reveal in circular Iris at 13 seconds
    const irisTrigger = setTimeout(() => {
      setIrisActive(true);
    }, 13000);

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
            {/* Spinning Loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: '3px solid rgba(37, 99, 235, 0.15)',
                borderTopColor: '#2563EB'
              }}
            />
            <p style={{ marginTop: 24, color: '#1e293b', fontSize: 11, fontWeight: 600, fontFamily: 'monospace', letterSpacing: '0.2em' }}>
              LAUNCHING SECURE CONSOLE
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FloatingParticlesProps {
  particleCount?: number
  particleColor1?: string
  particleColor2?: string 
  cameraDistance?: number
  rotationSpeed?: number
  particleSize?: number
  antigravityForce?: number
  activationRate?: number
  className?: string
}

export function FloatingParticles({
  particleCount = 1800,
  particleColor1 = "#3b82f6",
  particleColor2 = "#60a5fa", 
  cameraDistance = 900,
  rotationSpeed = 0.08,
  particleSize = 12,
  antigravityForce = 22,
  activationRate = 15,
  className = "",
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera
    animationId?: number
    movers?: any[]
    points?: THREE.Points
    points2?: THREE.Points
  }>({})

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Utility functions
    const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
    const getRadian = (degrees: number) => (degrees * Math.PI) / 180
    const getSpherical = (rad1: number, rad2: number, r: number) => {
      const x = Math.cos(rad1) * Math.cos(rad2) * r
      const z = Math.cos(rad1) * Math.sin(rad2) * r
      const y = Math.sin(rad1) * r
      return [x, y, z]
    }

    // Mover class for particle physics
    class Mover {
      position = new THREE.Vector3()
      velocity = new THREE.Vector3()
      acceleration = new THREE.Vector3()
      anchor = new THREE.Vector3()
      mass = 1
      is_active = false

      init(vector: THREE.Vector3) {
        this.position = vector.clone()
        this.velocity = vector.clone()
        this.anchor = vector.clone()
        this.acceleration.set(0, 0, 0)
        this.is_active = false
      }

      updatePosition() {
        this.position.copy(this.velocity)
      }

      updateVelocity() {
        this.acceleration.divideScalar(this.mass)
        this.velocity.add(this.acceleration)
      }

      applyForce(vector: THREE.Vector3) {
        this.acceleration.add(vector)
      }

      activate() {
        this.is_active = true
      }
    }

    // Initialize Three.js
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0) // transparent background
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 800, 1600)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(35, width / height, 1, 10000)
    camera.up.set(0, 1, 0)
    const cameraRad1 = getRadian(90)
    let cameraRad2 = getRadian(0)

    const setCameraPosition = () => {
      const points = getSpherical(cameraRad1, cameraRad2, cameraDistance)
      camera.position.set(points[0], points[1], points[2])
      camera.lookAt(0, 0, 0)
    }
    setCameraPosition()

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x333333, 1)
    const lightPoints = getSpherical(getRadian(60), getRadian(30), 1000)
    light.position.set(lightPoints[0], lightPoints[1], lightPoints[2])
    scene.add(light)

    // Create particle texture (no dot in center)
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!
      canvas.width = 200
      canvas.height = 200

      const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100)
      gradient.addColorStop(0.0, "rgba(255, 255, 255, 1)")
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.4)")
      gradient.addColorStop(1.0, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height) // no arc, just gradient

      const texture = new THREE.Texture(canvas)
      texture.minFilter = THREE.NearestFilter
      texture.needsUpdate = true
      return texture
    }

    const texture = createParticleTexture()

    // Create particles
    const movers: Mover[] = []
    const pointsGeometry = new THREE.BufferGeometry()
    const pointsGeometry2 = new THREE.BufferGeometry()

    const pointsMaterial = new THREE.PointsMaterial({
      color: particleColor1,
      size: particleSize,
      transparent: true,
      opacity: 0.8,
      map: texture,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })

    const pointsMaterial2 = new THREE.PointsMaterial({
      color: particleColor2,
      size: particleSize,
      transparent: true,
      opacity: 0.8,
      map: texture,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })

    const positions = new Float32Array(particleCount * 3)
    const positions2 = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const mover = new Mover()
      // Use higher minimum radius to keep the center completely clear
      const range = (Math.log(getRandomInt(2, 256)) / Math.log(256)) * 400 + 150
      const rad = getRadian(getRandomInt(0, 360))
      const x = Math.cos(rad) * range
      const z = Math.sin(rad) * range

      mover.init(new THREE.Vector3(x, 1000, z))
      mover.mass = getRandomInt(200, 500) / 100
      movers.push(mover)

      if (i % 2 === 0) {
        positions[i * 3] = x
        positions[i * 3 + 1] = 1000
        positions[i * 3 + 2] = z
      } else {
        positions2[i * 3] = x
        positions2[i * 3 + 1] = 1000
        positions2[i * 3 + 2] = z
      }
    }

    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    pointsGeometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3))

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    const points2 = new THREE.Points(pointsGeometry2, pointsMaterial2)

    scene.add(points)
    scene.add(points2)

    // Animation variables
    let lastTimeActivate = Date.now()
    const antigravity = new THREE.Vector3(0, antigravityForce, 0)

    const activateMovers = () => {
      let count = 0
      for (const mover of movers) {
        if (mover.is_active) continue
        mover.activate()
        mover.velocity.y = -300
        count++
        if (count >= activationRate) break
      }
    }

    const updateParticles = () => {
      const positionsArray = pointsGeometry.attributes.position.array as Float32Array
      const positionsArray2 = pointsGeometry2.attributes.position.array as Float32Array

      for (let i = 0; i < movers.length; i++) {
        const mover = movers[i]

        if (mover.is_active) {
          mover.applyForce(antigravity)
          mover.updateVelocity()
          mover.updatePosition()

          if (mover.position.y > 1000) {
            const range = (Math.log(getRandomInt(2, 256)) / Math.log(256)) * 250 + 50
            const rad = getRadian(getRandomInt(0, 360))
            const x = Math.cos(rad) * range
            const z = Math.sin(rad) * range
            mover.init(new THREE.Vector3(x, -300, z))
            mover.mass = getRandomInt(200, 500) / 100
          }
        }

        if (i % 2 === 0) {
          positionsArray[i * 3] = mover.position.x
          positionsArray[i * 3 + 1] = mover.position.y
          positionsArray[i * 3 + 2] = mover.position.z
        } else {
          positionsArray2[i * 3] = mover.position.x
          positionsArray2[i * 3 + 1] = mover.position.y
          positionsArray2[i * 3 + 2] = mover.position.z
        }
      }

      pointsGeometry.attributes.position.needsUpdate = true
      pointsGeometry2.attributes.position.needsUpdate = true
    }

    const rotateCamera = () => {
      cameraRad2 += getRadian(rotationSpeed)
      setCameraPosition()
    }

    const animate = () => {
      const now = Date.now()

      updateParticles()
      rotateCamera()
      renderer.render(scene, camera)

      if (now - lastTimeActivate > 10) {
        activateMovers()
        lastTimeActivate = now
      }

      sceneRef.current.animationId = requestAnimationFrame(animate)
    }

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Store references and start animation
    sceneRef.current = { renderer, scene, camera, movers, points, points2 }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)

      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId)
      }

      if (sceneRef.current.renderer && container.contains(sceneRef.current.renderer.domElement)) {
        container.removeChild(sceneRef.current.renderer.domElement)
      }

      sceneRef.current.renderer?.dispose()
      pointsGeometry.dispose()
      pointsGeometry2.dispose()
      pointsMaterial.dispose()
      pointsMaterial2.dispose()
      texture.dispose()
    }
  }, [
    particleCount,
    particleColor1,
    particleColor2, 
    cameraDistance,
    rotationSpeed,
    particleSize,
    antigravityForce,
    activationRate,
  ])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
        pointerEvents: "none"
      }}
    />
  )
}
