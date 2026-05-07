'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Lock, ShieldCheck, Award, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'
import DashboardPreview3D from './DashboardPreview3D'
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
  const background = useMotionTemplate`radial-gradient(circle 600px at ${glowX}px ${glowY}px, rgba(228,30,38,0.06), transparent 80%)`

  return (
    <section
      className="relative flex min-h-[calc(100svh-64px)] items-center pb-12 pt-12 sm:pb-16 sm:pt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 mix-blend-multiply"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ background }}
      />
      
      {/* Background Grid Pattern for high-tech SaaS feel */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Static Blue Blurs */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-brandBlue/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brandBlue/10 blur-[120px] pointer-events-none" />

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[2%] top-[15%] hidden lg:flex items-center gap-3 rounded-2xl border border-brandNavy/10 bg-white/90 p-4 shadow-2xl backdrop-blur-xl z-30"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brandGreen/10">
          <TrendingUp className="h-6 w-6 text-brandGreen" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-textSecondary">Average Increase</div>
          <div className="font-display text-xl font-black text-brandNavy">+120 Points</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[20%] left-[45%] hidden lg:flex items-center gap-3 rounded-2xl border border-brandRed/10 bg-white/90 p-4 shadow-2xl backdrop-blur-xl z-30"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brandRed/10">
          <ShieldCheck className="h-5 w-5 text-brandRed" />
        </div>
        <div>
          <div className="font-bold text-brandNavy">Dispute Resolved</div>
          <div className="text-xs text-textSecondary">Late payment removed</div>
        </div>
      </motion.div>

      <div className="w-full relative z-10 mx-auto">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
          {/* Left Text */}
          <div className="flex flex-col items-center lg:items-start relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full border border-brandNavy/10 bg-white/50 backdrop-blur-md p-1 pr-4 shadow-sm"
            >
              <div className="flex -space-x-2 pl-2">
                {[...Array(4)].map((_, i) => (
                  <img key={i} className="h-7 w-7 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 12}`} alt="User" />
                ))}
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <span className="text-xs font-bold text-brandNavy">Trusted by 50,000+ Indians</span>
            </motion.div>

            <h1 className="mt-8 font-display text-[42px] font-black leading-[1.05] tracking-tight text-brandNavy sm:text-[64px] lg:text-[76px] flex flex-wrap justify-center lg:justify-start gap-x-[0.25em]">
              {words.map((word, i) => {
                const isHighlight = word.includes('CIBIL') || word.includes('Repair') || word.includes('Rectification')
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 150, damping: 12 }}
                    className={`inline-block ${isHighlight ? 'text-brandRed' : ''}`}
                  >
                    {word}
                  </motion.span>
                )
              })}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-textSecondary sm:text-lg font-medium"
            >
              Don't let a bad credit score dictate your life. We execute a legally-backed, document-driven dispute process to delete errors and recover your score in{' '}
              <span className="font-bold text-brandNavy bg-brandYellow/30 px-1.5 py-0.5 rounded text-black">90 days or less</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto"
            >
              <Link href="/contact" className="w-full sm:w-auto group">
                <Button as="div" className="relative w-full sm:w-auto h-14 px-8 text-base shadow-xl transition-all hover:shadow-2xl group-hover:-translate-y-1 overflow-hidden bg-brandRed text-white hover:bg-[#D41018]">
                  <span className="relative flex items-center gap-2">Talk To A Credit Expert <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button as="div" variant="surface" className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-white/50 backdrop-blur-md border-brandNavy/10 hover:bg-white hover:border-brandNavy/20 transition-all hover:-translate-y-1">
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm font-semibold text-brandNavy/70"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brandRed/10"><Lock className="h-4 w-4 text-brandRed" /></div>
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brandNavy/5"><ShieldCheck className="h-4 w-4 text-brandNavy" /></div>
                <span>RBI Guidelines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brandYellow/20"><Award className="h-4 w-4 text-[#b38500]" /></div>
                <span>Money-Back Guarantee</span>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:justify-self-end w-full pt-10 lg:pt-0 relative z-10"
          >
            <DashboardPreview3D />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
