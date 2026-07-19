'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Launch() {
  const [bannerOpen, setBannerOpen] = useState(false)

  // Preload assets asynchronously
  useEffect(() => {
    const preloadAssets = () => {
      setTimeout(() => {
        const audio = new Audio()
        audio.src = '/launch-sound.mp3'
        audio.preload = 'auto'
      }, 50)
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
  }, [])

  // Continuous confetti loop on the Launch Dashboard screen
  useEffect(() => {
    let intervalId: any = null
    if (!bannerOpen) {
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default;

        // Fire confetti every 100ms instead of every animation frame to prevent lag
        intervalId = setInterval(() => {
          if (bannerOpen) {
            clearInterval(intervalId)
            return
          }
          
          // Left side cannon (increased particleCount to 4)
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.85 },
            colors: ['#0A2540', '#00D4B6', '#FF3B30', '#007AFF', '#FFCC00'],
            zIndex: 100000
          })

          // Right side cannon (increased particleCount to 4)
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.85 },
            colors: ['#0A2540', '#00D4B6', '#FF3B30', '#007AFF', '#FFCC00'],
            zIndex: 100000
          })

          // Drop subtle red, blue, and yellow confetti from the top with custom large sizes
          const topColors = ['#FF3B30', '#007AFF', '#FFCC00'] // Red, Blue, Yellow
          const chosenColor = topColors[Math.floor(Math.random() * topColors.length)]
          
          // Randomly trigger standard size or double size big confetti
          const sizeScalar = Math.random() > 0.4 ? 1.8 : 1.0; 
          
          confetti({
            particleCount: 2,
            startVelocity: 8,
            spread: 360,
            origin: { x: Math.random(), y: -0.1 },
            colors: [chosenColor],
            scalar: sizeScalar, // Apply random larger scale
            zIndex: 100000
          })
        }, 100)
      })
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [bannerOpen])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000' }}>
      
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
              width: 440, // Wider card to accommodate larger typography
              padding: '56px 48px',
              background: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '28px', // smooth rounded corners
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Enlarged Clean Light-Mode Logo */}
            <img
              src="/lightmode_Logo.png"
              alt="Primescore"
              style={{ height: 54, width: 'auto', marginBottom: 42 }}
            />

            {/* Enlarged Title */}
            <h2 style={{ color: '#091e42', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 14 }}>
              Primescore is Live
            </h2>
            
            {/* Enlarged Description */}
            <p style={{ color: '#5e6c84', fontSize: 16, fontWeight: 400, lineHeight: 1.6, marginBottom: 44 }}>
              The portal is fully operational. Tap launch to initialize the dashboard experience.
            </p>

            {/* Enlarged Action Button */}
            <button
              onClick={() => {
                setBannerOpen(true)
              }}
              style={{
                width: '100%',
                background: '#091e42',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '0.02em',
                padding: '18px 0',
                border: 'none',
                borderRadius: '16px', // smooth rounded button
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(9, 30, 66, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              Launch Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video transition playing Change_last_frame_line_of_visi.mp4 */}
      <AnimatePresence>
        {bannerOpen && (
          <VideoTransitionOverlay 
            onComplete={() => {
              // Redirect is now disabled. Keep screen in screensaver mode.
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function VideoTransitionOverlay({ onComplete }: { onComplete: () => void }) {
  const [wipeDone, setWipeDone] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Only play video once the stinger wipe has fully finished covering the screen
    if (wipeDone && videoRef.current) {
      // Play transition sound effect
      const aud = document.getElementById('launch-audio') as HTMLAudioElement
      if (aud) {
        aud.currentTime = 0
        aud.play().catch(() => {})
      }

      videoRef.current.play().catch(err => {
        console.log("Auto-play blocked or failed: ", err)
      })
    }
  }, [wipeDone])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        background: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}
    >
      {/* 1. Stinger transition overlay clip wipe (always covering) */}
      <motion.div
        initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}
        animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          setWipeDone(true)
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000000',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {wipeDone && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {!videoEnded ? (
              <video
                ref={videoRef}
                src="https://github.com/user-attachments/assets/d71eb038-d212-45da-8248-f5779a535680"
                playsInline
                autoPlay
                onEnded={() => {
                  setVideoEnded(true)
                  onComplete()
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0
                }}
              />
            ) : (
              /* Premium white screen-saver background with static logo, text, and confetti */
              <ScreensaverEndScreen />
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

function ScreensaverEndScreen() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let intervalId: any = null
    import('canvas-confetti').then((confettiModule) => {
      const confetti = confettiModule.default;

      // Run identical confetti loop on the screensaver page using global confetti instance
      intervalId = setInterval(() => {
        // Left side cannon
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.85 },
          colors: ['#0A2540', '#00D4B6', '#FF3B30', '#007AFF', '#FFCC00'],
          zIndex: 100000
        })

        // Right side cannon
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.85 },
          colors: ['#0A2540', '#00D4B6', '#FF3B30', '#007AFF', '#FFCC00'],
          zIndex: 100000
        })

        // Drop subtle red, blue, and yellow confetti from the top with custom large sizes
        const topColors = ['#FF3B30', '#007AFF', '#FFCC00'] // Red, Blue, Yellow
        const chosenColor = topColors[Math.floor(Math.random() * topColors.length)]
        const sizeScalar = Math.random() > 0.4 ? 1.8 : 1.0; 
        
        confetti({
          particleCount: 2,
          startVelocity: 8,
          spread: 360,
          origin: { x: Math.random(), y: -0.1 },
          colors: [chosenColor],
          scalar: sizeScalar,
          zIndex: 100000
        })
      }, 100)
    })
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Static Logo (Centered on white background) */}
      <img 
        src="/lightmode_Logo.png"
        alt="Primescore logo"
        style={{
          maxHeight: '110px',
          width: 'auto',
          filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.06))',
          opacity: 0.95,
          position: 'relative',
          zIndex: 99999,
          marginBottom: 16
        }}
      />
      
      <p
        style={{
          color: '#5e6c84',
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 99999,
          fontFamily: 'inherit'
        }}
      >
        is live now
      </p>
    </motion.div>
  )
}
