'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DashboardIntroLoaderProps {
  onComplete?: () => void
  duration?: number
}

export default function DashboardIntroLoader({ onComplete, duration = 1200 }: DashboardIntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden select-none pointer-events-none"
        >
          {/* Centered Minimal Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center p-4"
          >
            <motion.img
              animate={{
                scale: [1, 1.03, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              src="/lightmode_Logo.png"
              alt="PrimeScore"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
