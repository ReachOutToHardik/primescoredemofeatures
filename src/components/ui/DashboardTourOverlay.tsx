'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  X,
  RotateCcw,
  CheckCircle2
} from 'lucide-react'

export interface StepItem {
  id: string
  title: string
  subtitle: string
  description: string
  targetId: string
  placement: 'below' | 'above' | 'right'
}

const TOUR_STEPS_DESKTOP: StepItem[] = [
  {
    id: 'step-1',
    title: 'Your Details & Average Score',
    subtitle: 'STEP 1 OF 5',
    description: 'Here you can see your unified average credit score (589), personal details (PAN, Mobile, DOB), and options to fetch or download your multi-bureau report.',
    targetId: 'tour-profile-card',
    placement: 'below'
  },
  {
    id: 'step-2',
    title: 'Multi-Bureau Credit Reports',
    subtitle: 'STEP 2 OF 5',
    description: 'These are all your official credit reports fetched side-by-side: Equifax (547), Experian (488), CRIF High Mark (611), and TransUnion CIBIL (708).',
    targetId: 'tour-bureau-cards',
    placement: 'below'
  },
  {
    id: 'step-3',
    title: 'Discrepancy Alerts & Error Scanner',
    subtitle: 'STEP 3 OF 5',
    description: 'PrimeScore scans all 4 reports to flag duplicate accounts, mismatched PAN details, and wrong classification errors hurting your score.',
    targetId: 'tour-discrepancy-alerts',
    placement: 'above'
  },
  {
    id: 'step-4',
    title: 'Sidebar Navigation & Dispute Desk',
    subtitle: 'STEP 4 OF 5',
    description: 'Use the left sidebar menu to navigate bureau reports, submit formal dispute filings, or manage your credit repair services.',
    targetId: 'tour-sidebar-nav',
    placement: 'right'
  },
  {
    id: 'step-5',
    title: 'Sign Up for Full Access',
    subtitle: 'STEP 5 OF 5',
    description: 'Ready to repair and optimize your real credit profile? Click below to sign up now and unlock live multi-bureau dispute filings & expert monitoring.',
    targetId: 'tour-signup-btn',
    placement: 'below'
  }
]

const TOUR_STEPS_MOBILE: StepItem[] = [
  {
    id: 'step-m1',
    title: 'Average Score & Quick Actions',
    subtitle: 'STEP 1 OF 5',
    description: 'Track your average score gauge (589), fetch fresh report updates, or download your combined multi-bureau PDF report in one tap.',
    targetId: 'tour-mobile-profile-card',
    placement: 'below'
  },
  {
    id: 'step-m2',
    title: 'Verified Personal Identifiers',
    subtitle: 'STEP 2 OF 5',
    description: 'Verify your linked PAN card (XXGQ5764X), mobile number, and date of birth across bureau records.',
    targetId: 'tour-mobile-info-cards',
    placement: 'below'
  },
  {
    id: 'step-m3',
    title: 'All 4 Credit Bureau Scores',
    subtitle: 'STEP 3 OF 5',
    description: 'Inspect individual report scores for Equifax (547), Experian (488), CRIF (611), and TransUnion CIBIL (708).',
    targetId: 'tour-mobile-bureau-cards',
    placement: 'above'
  },
  {
    id: 'step-m4',
    title: 'Mobile Navigation App Bar',
    subtitle: 'STEP 4 OF 5',
    description: 'Switch between Dashboard, Bureau Reports, Dispute Desk, and Profile using the mobile bottom navigation bar.',
    targetId: 'tour-mobile-bottom-nav',
    placement: 'above'
  },
  {
    id: 'step-m5',
    title: 'Sign Up for Full Access',
    subtitle: 'STEP 5 OF 5',
    description: 'Ready to repair your real credit profile? Click below to sign up and start filing live disputes with banks & credit bureaus.',
    targetId: 'tour-signup-btn',
    placement: 'below'
  }
]

export default function DashboardTourOverlay({
  onComplete
}: {
  onComplete?: () => void
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const activeSteps = isMobile ? TOUR_STEPS_MOBILE : TOUR_STEPS_DESKTOP
  const currentStep = activeSteps[Math.min(currentStepIndex, activeSteps.length - 1)]
  const isFinalStep = currentStepIndex === activeSteps.length - 1

  useEffect(() => {
    if (!isVisible || !currentStep) return

    const updatePosition = () => {
      const el = document.getElementById(currentStep.targetId)
      if (el) {
        const rect = el.getBoundingClientRect()
        setTargetRect(rect)
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })

        // Calculate popover coordinates next to target element
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const popoverWidth = isMobile ? Math.min(340, windowWidth - 32) : 360
        const popoverHeight = 200

        let top = 0
        let left = 0

        if (isMobile) {
          left = Math.max(16, (windowWidth - popoverWidth) / 2)

          const spaceBelow = windowHeight - rect.bottom
          const spaceAbove = rect.top

          if (currentStep.placement === 'above' || (spaceBelow < popoverHeight + 70 && spaceAbove > popoverHeight + 20)) {
            top = Math.max(16, rect.top - popoverHeight - 12)
          } else {
            top = Math.min(windowHeight - popoverHeight - 75, rect.bottom + 12)
          }

          // If popover still overlaps target rect on small phones, force position outside rect bounds
          if (top < rect.bottom && top + popoverHeight > rect.top) {
            if (spaceAbove >= spaceBelow) {
              top = Math.max(12, rect.top - popoverHeight - 12)
            } else {
              top = Math.min(windowHeight - popoverHeight - 70, rect.bottom + 12)
            }
          }
        } else {
          if (currentStep.placement === 'below') {
            top = rect.bottom + 16
            left = Math.max(20, Math.min(rect.left + (rect.width / 2) - (popoverWidth / 2), windowWidth - popoverWidth - 20))
            if (top + popoverHeight > windowHeight - 20) {
              top = Math.max(20, rect.top - popoverHeight - 16)
            }
          } else if (currentStep.placement === 'above') {
            top = Math.max(20, rect.top - popoverHeight - 16)
            left = Math.max(20, Math.min(rect.left + (rect.width / 2) - (popoverWidth / 2), windowWidth - popoverWidth - 20))
          } else if (currentStep.placement === 'right') {
            top = Math.max(20, Math.min(rect.top + 60, windowHeight - popoverHeight - 20))
            left = rect.right + 20
            if (left + popoverWidth > windowWidth - 20) {
              left = Math.max(20, rect.left - popoverWidth - 20)
            }
          }
        }

        setPopoverPos({ top, left })
      } else {
        setTargetRect(null)
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [currentStepIndex, isVisible, currentStep, isMobile])

  const handleNext = () => {
    if (isFinalStep) {
      setIsVisible(false)
      if (onComplete) onComplete()
    } else {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    setIsVisible(false)
    if (onComplete) onComplete()
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => {
          setCurrentStepIndex(0)
          setIsVisible(true)
        }}
        className="fixed bottom-20 right-4 lg:bottom-5 lg:right-5 z-50 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Replay Tour</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
      {/* Spotlight Box Cutout using box-shadow */}
      {targetRect ? (
        <motion.div
          key={currentStep.id + '-cutout'}
          initial={false}
          animate={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
          className="fixed rounded-2xl border-2 border-white shadow-[0_0_0_9999px_rgba(15,23,42,0.85)] pointer-events-none z-[10000] ring-4 ring-indigo-500/40"
        />
      ) : (
        <div className="fixed inset-0 bg-slate-950/85 z-[10000]" onClick={handleSkip} />
      )}

      {/* Floating Pop-up Card Positioned Next to Spotlight Box */}
      {targetRect && (
        <motion.div
          key={currentStep.id + '-popover'}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: `${popoverPos.top}px`,
            left: `${popoverPos.left}px`,
          }}
          className="z-[10001] w-[340px] sm:w-[360px] bg-white rounded-xl border border-slate-200 shadow-2xl p-5 font-sans pointer-events-auto max-w-[calc(100vw-32px)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-500">
              {currentStep.subtitle}
            </span>
            <button
              onClick={handleSkip}
              className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded"
              title="Close Tutorial"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
            {currentStep.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">
            {currentStep.description}
          </p>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            {/* Step Dots */}
            <div className="flex items-center gap-1.5">
              {activeSteps.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentStepIndex
                      ? 'w-4 bg-slate-900'
                      : 'w-1.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Back
                </button>
              )}

              <button
                onClick={handleNext}
                className={`px-4 py-1.5 rounded-md text-xs font-bold text-white transition-all flex items-center gap-1 shadow-sm ${
                  isFinalStep
                    ? 'bg-[#10B981] hover:bg-[#059669] shadow-emerald-500/20'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                <span>{isFinalStep ? 'Finish' : 'Next'}</span>
                {isFinalStep ? <CheckCircle2 className="w-3.5 h-3.5 ml-0.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
