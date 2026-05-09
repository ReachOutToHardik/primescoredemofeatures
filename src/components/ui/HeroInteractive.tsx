'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Lock, ShieldCheck, Award, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'
import PhoneShowcase from './PhoneShowcase'
import { useState } from 'react'

const headline = "India's #1 Credit Repair & CIBIL Score Rectification Services"
const words = headline.split(' ')

export default function HeroInteractive() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const glowX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  const background = useMotionTemplate`radial-gradient(circle 600px at ${glowX}px ${glowY}px, rgba(37,99,235,0.08), transparent 80%)`

  return (
    <section
      className="relative flex min-h-[100svh] items-center pb-12 pt-28 lg:pt-32 sm:pb-16 overflow-hidden bg-[#0A0A0A] bg-grain"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid Pattern - Dark Version */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Animated Light Leaks */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-20 top-0 h-[600px] w-[600px] rounded-full bg-brandBlue/10 blur-[150px] pointer-events-none hidden sm:block" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-brandRed/10 blur-[150px] pointer-events-none hidden sm:block" 
      />

      <div className="w-full relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
          {/* Left Text */}
          <div className="flex flex-col items-center lg:items-start relative z-20">
            <h1 className="font-display text-4xl font-black leading-[1.0] tracking-tighter text-white sm:text-6xl lg:text-[82px] flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}>
                <span className="text-white">Your Entire</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }} className="mt-1 lg:mt-2">
                <span className="text-white/60">Credit Profile.</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }} 
                className="mt-2 lg:mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <span className="font-handwriting text-brandYellow text-[60px] sm:text-[90px] lg:text-[110px] leading-none -rotate-2 origin-bottom-left">One</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed via-brandRed to-brandOrange leading-none pb-2">Dashboard.</span>
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-white/50 font-medium"
            >
              The only platform in India that tracks every dispute across all <strong className="text-white font-bold">4 bureaus</strong> in real-time. Watch your <span className="text-brandGreen font-bold">CIBIL</span>, <span className="text-brandBlue font-bold">Experian</span>, <span className="text-brandRed font-bold">Equifax</span>, and <span className="text-brandYellow font-bold">CRIF</span> scores climb live.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center w-full sm:w-auto"
            >
              <Link href="/dashboard" className="w-full sm:w-auto group">
                <div className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-[11px] font-bold uppercase tracking-[0.25em] text-brandNavy transition-all duration-300 hover:scale-105 hover:shadow-glowNavy active:scale-95">
                  Open Dashboard <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto group flex items-center justify-center">
                <div className="flex h-14 items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 transition-all duration-300 hover:text-white">
                  Talk to expert
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Phone Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:justify-self-end w-full relative z-10"
          >
            <PhoneShowcase />
          </motion.div>
        </div>
      </div>
    </section>

  )
}
