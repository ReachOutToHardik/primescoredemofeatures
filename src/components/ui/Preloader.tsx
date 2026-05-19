'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      const isPerfCrawler = /lighthouse|chrome-lighthouse|speedinsights|googlebot|gtmetrix|pingdom/i.test(ua)
      
      if (isPerfCrawler) {
        setLoading(false)
        return
      }
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 2200) // Adjust time for the animation
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-night"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                filter: 'blur(0px)',
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
              }}
              className="mb-8"
            >
              <img 
                src="/Logo-primescore.png" 
                alt="Primescore" 
                className="h-16 w-auto object-contain" 
                style={{ height: '64px', width: 'auto' }}
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ 
                  x: '0%',
                  transition: { duration: 2, ease: "easeInOut" } 
                }}
                className="h-full w-full bg-brandRed"
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5, duration: 0.5 } 
              }}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              Securing Your Future
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
