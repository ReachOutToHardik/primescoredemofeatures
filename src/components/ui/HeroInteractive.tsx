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
      className="relative flex min-h-[calc(100svh-64px)] items-center pb-12 pt-12 sm:pb-16 sm:pt-16 overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Static Blue Blurs */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-brandBlue/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brandBlue/5 blur-[120px] pointer-events-none" />

      <div className="w-full relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
          {/* Left Text */}
          <div className="flex flex-col items-center lg:items-start relative z-20">
            <h1 className="font-display text-[44px] font-black leading-[1.0] tracking-tighter text-brandNavy sm:text-[68px] lg:text-[82px]">
              Your Entire Credit Profile.<br className="hidden lg:block" />
              <span className="text-brandRed">One Dashboard.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-textSecondary font-medium"
            >
              The only platform in India that tracks every dispute across all 4 bureaus in real-time. Watch your CIBIL, Experian, Equifax, and CRIF scores climb live.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto"
            >
              <Link href="/dashboard" className="w-full sm:w-auto group">
                <Button as="div" className="w-full sm:w-auto h-16 px-10 text-base shadow-xl transition-all hover:shadow-2xl group-hover:-translate-y-1 bg-brandRed text-white hover:bg-[#D41018] rounded-full font-bold uppercase tracking-widest">
                  Open My Dashboard
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button as="div" variant="surface" className="w-full sm:w-auto h-16 px-10 text-base font-bold bg-white border-brandNavy/10 hover:bg-white/80 transition-all hover:-translate-y-1 rounded-full uppercase tracking-widest">
                  Talk To Expert
                </Button>
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
