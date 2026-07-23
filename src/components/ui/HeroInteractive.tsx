
'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Lock, Award, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Button from './Button'
import PhoneShowcase from './PhoneShowcase'
import PhoneShowcaseDesktop from './PhoneShowcaseDesktop'
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
  const background = useMotionTemplate`radial-gradient(circle 600px at ${glowX}px ${glowY}px, rgba(37,99,235,0.05), transparent 80%)`

  return (
    <section
      className="relative flex min-h-[100svh] items-center pb-12 pt-20 lg:pt-24 sm:pb-16 overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mesh Gradient Background - Light Version */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brandBlue/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-brandRed/5 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] left-[20%] w-[60%] h-[30%] bg-brandYellow/[0.03] blur-[120px] rounded-full"
        />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      {/* Background Grid Pattern - Light Version */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="w-full relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] text-center lg:text-left">
          {/* Left Text */}
          <div className="flex flex-col items-center lg:items-start relative z-20">
            <h1 className="font-display text-4xl font-black leading-[1.0] tracking-tighter text-brandNavy sm:text-6xl lg:text-[76px] flex flex-col items-center lg:items-start text-center lg:text-left w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}>
                <span className="text-brandNavy">Most platforms</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }} className="mt-1 lg:mt-2">
                <span className="text-brandNavy/40">show your score.</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }} 
                className="mt-2 lg:mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <span className="font-handwriting text-brandRed text-[60px] sm:text-[90px] lg:text-[110px] leading-none -rotate-2 origin-bottom-left">We</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue via-brandBlue to-brandNavy leading-none pb-2">go further.</span>
              </motion.div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-textSecondary font-medium"
            >
              Finding every error, filing every dispute, fixing your credit health across all bureaus. Watch your <span className="text-brandGreen font-bold">CIBIL</span>, <span className="text-brandBlue font-bold">Experian</span>, <span className="text-brandRed font-bold">Equifax</span>, and <span className="text-brandYellow font-bold">CRIF</span> scores climb live.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a href="https://dashboard.primescore.in" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <div className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brandNavy hover:bg-slate-900 px-8 text-xs font-black uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
                  <span>Open Dashboard</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-emerald-400" />
                </div>
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <div className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brandNavy/20 hover:border-brandNavy/30 bg-white hover:bg-slate-50 text-brandNavy px-8 text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]">
                  <span>Talk to expert</span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Showcase: Phone on Mobile, Phone Desktop on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:justify-self-end w-full relative z-10 mt-16 lg:mt-0"
          >
            <div className="block lg:hidden">
              <PhoneShowcase />
            </div>
            <div className="hidden lg:block relative lg:-right-4">
              <PhoneShowcaseDesktop />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  )
}
