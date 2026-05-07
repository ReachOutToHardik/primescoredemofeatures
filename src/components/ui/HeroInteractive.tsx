'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Lock, ShieldCheck, Award } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'
import DashboardPreview3D from './DashboardPreview3D'
import { useState } from 'react'

const headline = "Fix Your CIBIL Score. Unlock Your Future."
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

  // Smooth glow position
  const glowX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const glowY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  const background = useMotionTemplate`radial-gradient(circle 600px at ${glowX}px ${glowY}px, rgba(228,30,38,0.08), transparent 80%)`

  return (
    <section
      className="relative flex min-h-[calc(100svh-64px)] items-center pb-12 pt-8 sm:pb-16 sm:pt-12 overflow-hidden"
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

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[5%] top-[5%] hidden lg:block rounded-xl border border-brandGreen/20 bg-white/80 p-3 shadow-lg backdrop-blur-md z-10"
      >
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-brandGreen animate-pulse shadow-[0_0_8px_rgba(99,168,49,0.8)]" />
          <span className="text-sm font-bold text-brandGreen">Score +120 Points</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[10%] left-[45%] hidden lg:block rounded-xl border border-brandYellow/20 bg-white/80 p-3 shadow-lg backdrop-blur-md z-10"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brandYellow drop-shadow-sm" />
          <span className="text-sm font-bold text-brandNavy">Dispute Resolved</span>
        </div>
      </motion.div>

      <div className="w-full relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] text-center lg:text-left">
          {/* Left Text */}
          <div className="flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brandNavy/10 bg-white px-3 py-1.5 text-xs font-bold text-brandNavy shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brandRed opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brandRed"></span>
              </span>
              Trusted by 50,000+ Indians
            </motion.div>

            <h1 className="mt-6 font-display text-[36px] font-black leading-[1.1] tracking-tight text-brandNavy sm:text-[56px] lg:text-[76px] flex flex-wrap justify-center lg:justify-start gap-x-[0.3em]">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 150, damping: 12 }}
                  className="inline-block"
                >
                  {word.includes('CIBIL') ? <span className="text-gradient">{word}</span> : word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-textSecondary sm:text-lg"
            >
              Stop letting a bad credit score dictate your life. We execute a legally-backed, document-driven dispute process to recover your score in{' '}
              <span className="font-bold text-brandRed">90 days or less</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center w-full sm:w-auto"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button as="div" className="w-full sm:w-auto h-12 px-8 text-base shadow-glowRed">
                  Check My Score Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button as="div" variant="ghost" className="w-full sm:w-auto h-12 px-8 text-base">
                  How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm font-medium text-textSecondary"
            >
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-brandRed" />
                <span>100% confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brandRed" />
                <span>Legally backed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-brandRed" />
                <span>Money-back guarantee</span>
              </div>
            </motion.div>
          </div>

          {/* Right 3D Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:justify-self-end w-full pt-10 lg:pt-0 relative z-20"
          >
            <DashboardPreview3D />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
