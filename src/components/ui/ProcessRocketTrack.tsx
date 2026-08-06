'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  Rocket,
  ArrowRight,
  FileText,
  Search,
  FileCheck,
  ShieldCheck,
  Clock
} from 'lucide-react'

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Submit Inquiry',
    description: 'Fill our commercial audit request form. Our team reviews your company profile within 2 hours.',
    iconTag: 'Form & SLA',
    icon: FileText
  },
  {
    step: '02',
    title: 'CCR & Report Pull',
    description: 'We obtain your Company Credit Report from CIBIL and CRIF, plus director-level bureau pulls.',
    iconTag: '4 Bureaus',
    icon: Search
  },
  {
    step: '03',
    title: 'Error Identification',
    description: 'Our analysts map duplicate lines, PAN mismatches, incorrect account classifications, and registry errors.',
    iconTag: 'Audit Desk',
    icon: FileCheck
  },
  {
    step: '04',
    title: 'Dispute Filing',
    description: 'Formal dispute documentation is compiled and submitted to the relevant bureaus and banks on your behalf.',
    iconTag: 'Direct Legal',
    icon: ShieldCheck
  },
  {
    step: '05',
    title: 'Ongoing Monitoring',
    description: 'Monthly and quarterly reports are delivered for the duration of your plan. We flag new issues proactively.',
    iconTag: '24/7 Desk',
    icon: Clock
  }
]

export default function ProcessRocketTrack() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll tracking with Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Physics spring for silky smooth 60fps inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.0001
  })

  // Hardware accelerated horizontal slide for track (0% to -52%)
  const trackX = useTransform(smoothProgress, [0, 1], ['0%', '-52%'])

  // Rocket horizontal movement (140px to 1980px)
  const rocketX = useTransform(smoothProgress, [0, 1], [140, 1980])
  
  // Sine wave Y offset matching the SVG path curve
  const rocketY = useTransform(smoothProgress, (p) => 190 + Math.sin(p * Math.PI * 4) * 45)
  const rocketRotate = useTransform(smoothProgress, (p) => Math.cos(p * Math.PI * 4) * 22)

  // SVG progress path dashoffset
  const pathDashoffset = useTransform(smoothProgress, [0, 1], [2400, 0])

  return (
    <section id="process" ref={containerRef} className="relative h-[320vh] border-b border-slate-200 bg-[#FCFCFC] scroll-mt-20">
      
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="mx-auto max-w-[1280px] w-full px-6 sm:px-10 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#2563EB]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563EB]">OUR PROCESS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#0A2342] leading-tight">
            From inquiry to clean bureau record.
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl">
            A structured, 5-step commercial audit & dispute resolution workflow engineered for speed, accuracy, and bureau compliance.
          </p>
        </div>

        {/* Horizontal Scrolling Canvas Stage */}
        <div className="relative w-full h-[460px] overflow-hidden">
          
          {/* Hardware Accelerated Sliding Track Wrapper */}
          <motion.div
            style={{
              x: trackX,
              willChange: 'transform'
            }}
            className="absolute left-0 top-0 h-full w-[2300px] pointer-events-none"
          >
            {/* Middle Wavy SVG Path Line (Weaving between top and bottom cards) */}
            <div className="absolute top-[135px] left-0 w-[2200px] h-[110px] z-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 2200 110" preserveAspectRatio="none">
                {/* Dashed Background Wave */}
                <path
                  d="M 140 55 Q 370 0, 600 55 T 1060 55 T 1520 55 T 1980 55"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                />
                {/* Active Blue Progress Wave Path */}
                <motion.path
                  d="M 140 55 Q 370 0, 600 55 T 1060 55 T 1520 55 T 1980 55"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="4"
                  strokeDasharray="2400"
                  style={{ strokeDashoffset: pathDashoffset }}
                />
              </svg>
            </div>

            {/* Flying Rocket Icon (Riding directly along the wavy SVG path) */}
            <motion.div
              style={{
                x: rocketX,
                y: rocketY,
                rotate: rocketRotate,
                translateX: '-50%',
                translateY: '-50%',
                willChange: 'transform'
              }}
              className="absolute z-30"
            >
              <div className="relative flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xl border-2 border-white">
                  <Rocket className="h-6 w-6 transform rotate-45 text-white" />
                </div>
                {/* Rocket Thrust Glow Trail */}
                <span className="absolute -left-3 h-2.5 w-4 bg-gradient-to-l from-blue-500 to-transparent rounded-full animate-pulse opacity-80" />
              </div>
            </motion.div>

            {/* Alternating Step Cards (Positioned Above and Below the Wave Line) */}
            <div className="absolute inset-0 pointer-events-auto">
              {PROCESS_STEPS.map((item, idx) => {
                const stepThreshold = idx / 4
                
                // Alternating layout: EVEN indices (0, 2, 4) sit ABOVE the wave line; ODD indices (1, 3) sit BELOW
                const isTopCard = idx % 2 === 0
                const cardLeft = 60 + idx * 430
                const cardTop = isTopCard ? 10 : 230

                return (
                  <StepCardItem
                    key={item.step}
                    item={item}
                    idx={idx}
                    cardLeft={cardLeft}
                    cardTop={cardTop}
                    smoothProgress={smoothProgress}
                    threshold={stepThreshold}
                  />
                )
              })}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

function StepCardItem({
  item,
  idx,
  cardLeft,
  cardTop,
  smoothProgress,
  threshold
}: {
  item: typeof PROCESS_STEPS[0]
  idx: number
  cardLeft: number
  cardTop: number
  smoothProgress: any
  threshold: number
}) {
  const IconComp = item.icon

  // Smooth active highlight threshold
  const borderOpacity = useTransform(smoothProgress, [threshold - 0.08, threshold], [0.7, 1])
  const cardScale = useTransform(smoothProgress, [threshold - 0.08, threshold], [0.98, 1.02])

  return (
    <motion.div
      style={{
        left: `${cardLeft}px`,
        top: `${cardTop}px`,
        opacity: borderOpacity,
        scale: cardScale,
        willChange: 'transform, opacity'
      }}
      className="absolute w-[370px] h-[210px] bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs transition-colors duration-200 flex flex-col justify-between group hover:border-[#2563EB]/60 hover:shadow-md"
    >
      <div>
        {/* Step Number Badge & Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="h-8 w-8 rounded-xl font-extrabold text-xs flex items-center justify-center shadow-xs font-mono bg-[#0A2342] text-white group-hover:bg-[#2563EB] transition-colors">
            {item.step}
          </span>
          <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 rounded-md">
            {item.iconTag}
          </span>
        </div>

        {/* Step Title & Description */}
        <div className="flex items-center gap-2 mb-1.5">
          <IconComp className="h-4 w-4 text-[#2563EB] shrink-0" />
          <h3 className="font-display text-base font-bold text-[#0A2342] group-hover:text-[#2563EB] transition-colors">
            {item.title}
          </h3>
        </div>
        
        <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Step Footer Indicator */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
        <span>Step {idx + 1} of 5</span>
        <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
      </div>
    </motion.div>
  )
}
