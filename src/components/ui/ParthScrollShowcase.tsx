'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  FileText,
  Bot,
  AlertCircle,
  CheckCircle2,
  Scale,
  UserCheck,
  Send,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  Clock,
} from 'lucide-react'

const phases = [
  {
    badge: '01 // BUREAU PARSER',
    title: 'Parth reads your credit report instantly.',
    description:
      'Upload your bureau report and Parth autonomously parses every line — converting messy, unstructured CIBIL language into clean, actionable dispute records in seconds.',
    bullets: [
      'Ingests CIBIL, Experian, CRIF & Equifax PDFs',
      'Extracts 100+ variables with 99.8% confidence',
      'Flags anomalies and discrepancies automatically',
    ],
    color: '#6366F1',
  },
  {
    badge: '02 // LEGAL COMPILER',
    title: 'Maps every error to RBI law. Automatically.',
    description:
      'No generic templates. Parth formulates each dispute argument specifically against the Credit Information Companies Rules (2005), Section 21 and active RBI master circulars.',
    bullets: [
      'Cross-references CIC Act 2005 and RBI directives',
      'Compiles legally binding dispute briefs instantly',
      'Attaches evidence packages with every claim',
    ],
    color: '#A855F7',
  },
  {
    badge: '03 // HUMAN AUDIT GATE',
    title: 'Experts verify before anything dispatches.',
    description:
      'Every AI-compiled case is audited by a senior PrimeScore credit legal specialist, who refines arguments and optimises the dispatch strategy before submission.',
    bullets: [
      'Senior legal advisors verify every AI-compiled draft',
      'Optimises dispatch strategy for each bank channel',
      '100% verified accuracy before any submission',
    ],
    color: '#F59E0B',
  },
  {
    badge: '04 // NODAL DISPATCH',
    title: 'Direct routing to bank portals, 24/7.',
    description:
      'Parth dispatches verified dispute packets directly to specific bank nodal officers and bureau API gateways, monitoring every update and auto-escalating delays around the clock.',
    bullets: [
      'Routes directly to dedicated bank nodal channels',
      'Simultaneous dispatch to CIBIL & bureau APIs',
      'Auto-monitors progress and escalates any delays',
    ],
    color: '#10B981',
  },
]

const toolbarItems = [
  { label: 'Parse', icon: FileText },
  { label: 'Compile', icon: Scale },
  { label: 'Verify', icon: UserCheck },
  { label: 'Dispatch', icon: Send },
  { label: 'Monitor', icon: ShieldCheck },
  { label: 'Complete', icon: CheckCircle2 },
]

// ─── Canvas helpers ──────────────────────────────────────────────────────────
function Node({
  icon: Icon,
  label,
  sublabel,
  accentColor,
  iconBg,
  className = '',
}: {
  icon: any
  label: string
  sublabel?: string
  accentColor: string
  iconBg: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-2.5 bg-white rounded-xl border border-slate-200/80 px-3.5 py-2.5 shadow-sm ${className}`}
    >
      <div
        className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: accentColor + '15' }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color: accentColor }} />
      </div>
      <div>
        <div className="text-[11px] font-bold text-slate-800">{label}</div>
        {sublabel && (
          <div className="text-[9px] text-slate-400 font-mono mt-0.5">
            {sublabel}
          </div>
        )}
      </div>
    </div>
  )
}

function Pipe({ color = '#e2e8f0', horizontal = false, className = '' }: { color?: string; horizontal?: boolean; className?: string }) {
  if (horizontal) {
    return <div className={`h-px w-8 ${className}`} style={{ backgroundColor: color }} />
  }
  return <div className={`w-px h-5 mx-auto ${className}`} style={{ backgroundColor: color }} />
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="text-[8.5px] font-bold px-2 py-0.5 rounded-full border font-mono"
      style={{ color, borderColor: color + '40', backgroundColor: color + '10' }}
    >
      {label}
    </div>
  )
}

// ─── Phase Canvases ──────────────────────────────────────────────────────────
function ParseCanvas() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-0 py-6 px-6 select-none">
      {/* Input */}
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
        <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
        <span className="text-[11px] font-bold text-slate-700 font-mono">
          cibil_report_hardik.pdf
        </span>
      </div>
      <Pipe color="#a5b4fc" />

      {/* Parth Engine */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-md w-full max-w-[260px]">
        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">
            Parth NLP Engine
          </div>
          <div className="text-[9px] text-indigo-500 font-mono mt-0.5 animate-pulse">
            parsing · flagging · scoring
          </div>
        </div>
      </div>

      {/* Fork */}
      <div className="flex items-start gap-10 mt-1">
        {/* Left branch */}
        <div className="flex flex-col items-center gap-1">
          <Pipe color="#fca5a5" />
          <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-sm">
            <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="text-[10px] font-bold text-red-800">Anomaly Found</span>
          </div>
          <Pipe color="#fca5a5" />
          <div className="bg-white border border-red-100 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-[9.5px] font-bold text-slate-600">Flag Dispute →</span>
          </div>
        </div>
        {/* Vertical divider */}
        <div className="w-px h-20 bg-slate-100 mt-6" />
        {/* Right branch */}
        <div className="flex flex-col items-center gap-1">
          <Pipe color="#6ee7b7" />
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[10px] font-bold text-emerald-800">Clean Record</span>
          </div>
          <Pipe color="#6ee7b7" />
          <div className="bg-white border border-emerald-100 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-[9.5px] font-bold text-slate-600">Monitor →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LegalCanvas() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-0 py-6 px-6 select-none">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
        <span className="text-[11px] font-bold text-slate-700">2 Anomalies Isolated</span>
      </div>
      <Pipe color="#d8b4fe" />

      {/* CIC Engine */}
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-md w-full max-w-[260px]">
        <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
          <Scale className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-[10px] font-black text-purple-900 uppercase tracking-widest">
            CIC Act Engine
          </div>
          <div className="text-[9px] text-purple-500 font-mono mt-0.5">
            Section 21 · RBI master directives
          </div>
        </div>
      </div>
      <Pipe color="#d8b4fe" />

      {/* Dispute brief */}
      <div className="bg-slate-900 rounded-xl px-4 py-3 w-full max-w-[290px] shadow-xl border border-slate-800">
        <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-1.5">
          <span className="text-[8.5px] font-mono font-bold text-purple-400 uppercase">
            DISPUTE_BRIEF_SBI.TXT
          </span>
          <Badge label="DRAFTED ✓" color="#a855f7" />
        </div>
        <p className="text-[8px] text-slate-400 leading-relaxed">
          Pursuant to Section 21 of the Credit Information Companies Rules 2005, we file this formal dispute for wrong DPD status reporting on SBI Card Account #8291...
        </p>
        <p className="text-[8px] text-purple-400 font-bold mt-1.5">
          Evidence ID: PS-CIB-SBI-992
        </p>
      </div>
    </div>
  )
}

function HumanCanvas() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-0 py-6 px-6 select-none">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
        <FileText className="w-4 h-4 text-purple-500 shrink-0" />
        <span className="text-[11px] font-bold text-slate-700">AI Compiled Dispute Draft</span>
      </div>
      <Pipe color="#fcd34d" />

      {/* Expert Gate */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 w-full max-w-[290px] shadow-md">
        <div className="flex items-center gap-3 mb-3 pb-2.5 border-b border-amber-100">
          <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/30">
            <UserCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-black text-amber-900 uppercase tracking-widest">
              Expert Audit Gate
            </div>
            <div className="text-[9px] text-amber-700 font-mono">
              Rajesh K. — Senior Legal Advisor
            </div>
          </div>
        </div>
        <div className="space-y-1.5 text-[9.5px]">
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <CheckSquare className="w-3 h-3 shrink-0" /> Anomaly evidence verified
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <CheckSquare className="w-3 h-3 shrink-0" /> Nodal strategy optimised
          </div>
          <div className="flex items-center gap-2 text-amber-700 font-semibold animate-pulse">
            <Clock className="w-3 h-3 shrink-0" /> Final approval in progress...
          </div>
        </div>
      </div>
      <Pipe color="#fcd34d" />

      {/* Outcome fork */}
      <div className="flex gap-5">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
          <span className="text-[9.5px] font-bold text-emerald-800">Approved</span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center shadow-sm opacity-30">
          <span className="text-[9.5px] font-bold text-slate-500">Revise</span>
        </div>
      </div>
    </div>
  )
}

function DispatchCanvas() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-0 py-5 px-6 select-none">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
        <span className="text-[11px] font-bold text-slate-700">Verified Dispute Package</span>
      </div>
      <Pipe color="#6ee7b7" />

      {/* Dispatch Router */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-md w-full max-w-[260px]">
        <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
          <Send className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">
            Parth Dispatch Router
          </div>
          <div className="text-[9px] text-emerald-600 font-mono mt-0.5 animate-pulse">
            routing · dispatching · tracking
          </div>
        </div>
      </div>

      {/* Three‑way fork */}
      <div className="flex items-start gap-3 mt-1 w-full justify-center">
        {[
          {
            label: 'CIBIL API',
            sub: 'Direct Sync',
            status: 'DISPATCHED',
            c: 'emerald',
          },
          {
            label: 'Experian Hub',
            sub: 'Secure Port',
            status: 'DISPATCHED',
            c: 'emerald',
          },
          {
            label: 'SBI Nodal',
            sub: 'e-Delivery',
            status: 'ROUTING',
            c: 'blue',
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <Pipe color={item.c === 'emerald' ? '#6ee7b7' : '#93c5fd'} />
            <div
              className={`border rounded-xl p-2 text-center shadow-sm ${
                item.c === 'emerald'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="text-[9px] font-black text-slate-800">{item.label}</div>
              <div className="text-[7.5px] font-mono text-slate-400 mt-0.5">{item.sub}</div>
              <div
                className={`text-[8px] font-black mt-1 ${
                  item.status === 'DISPATCHED'
                    ? 'text-emerald-600'
                    : 'text-blue-600 animate-pulse'
                }`}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2">
        <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="text-[9px] text-emerald-800 font-bold">24/7 Bureau Watcher Engaged</span>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ParthScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // ── Pre-declare ALL transforms (no hooks inside loops) ──
  // Left text per phase
  const t0op = useTransform(sp, [0, 0, 0.2, 0.25], [1, 1, 1, 0])
  const t0y  = useTransform(sp, [0, 0, 0.2, 0.25], [0, 0, 0, -28])
  const t0bl = useTransform(sp, [0, 0, 0.2, 0.25], ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'])

  const t1op = useTransform(sp, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0])
  const t1y  = useTransform(sp, [0.2, 0.25, 0.45, 0.5], [28, 0, 0, -28])
  const t1bl = useTransform(sp, [0.2, 0.25, 0.45, 0.5], ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'])

  const t2op = useTransform(sp, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0])
  const t2y  = useTransform(sp, [0.45, 0.5, 0.7, 0.75], [28, 0, 0, -28])
  const t2bl = useTransform(sp, [0.45, 0.5, 0.7, 0.75], ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'])

  const t3op = useTransform(sp, [0.7, 0.75, 1, 1], [0, 1, 1, 1])
  const t3y  = useTransform(sp, [0.7, 0.75, 1, 1], [28, 0, 0, 0])
  const t3bl = useTransform(sp, [0.7, 0.75, 1, 1], ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'])

  const textAnims = [
    { op: t0op, y: t0y, bl: t0bl },
    { op: t1op, y: t1y, bl: t1bl },
    { op: t2op, y: t2y, bl: t2bl },
    { op: t3op, y: t3y, bl: t3bl },
  ]

  // Canvas opacity per phase
  const c0op = useTransform(sp, [0, 0, 0.2, 0.25], [1, 1, 1, 0])
  const c1op = useTransform(sp, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0])
  const c2op = useTransform(sp, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0])
  const c3op = useTransform(sp, [0.7, 0.75, 1, 1], [0, 1, 1, 1])
  const canvasAnims = [c0op, c1op, c2op, c3op]
  const canvasComponents = [<ParseCanvas />, <LegalCanvas />, <HumanCanvas />, <DispatchCanvas />]

  // Progress bar indicators
  const b0op = useTransform(sp, [0, 0.05, 0.2, 0.25], [0.3, 1, 1, 0.3])
  const b0sc = useTransform(sp, [0, 0.25], [0, 1])
  const b1op = useTransform(sp, [0.25, 0.3, 0.45, 0.5], [0.3, 1, 1, 0.3])
  const b1sc = useTransform(sp, [0.25, 0.5], [0, 1])
  const b2op = useTransform(sp, [0.5, 0.55, 0.7, 0.75], [0.3, 1, 1, 0.3])
  const b2sc = useTransform(sp, [0.5, 0.75], [0, 1])
  const b3op = useTransform(sp, [0.75, 0.8, 1, 1], [0.3, 1, 1, 1])
  const b3sc = useTransform(sp, [0.75, 1], [0, 1])
  const barAnims = [
    { op: b0op, sc: b0sc },
    { op: b1op, sc: b1sc },
    { op: b2op, sc: b2sc },
    { op: b3op, sc: b3sc },
  ]

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-white border-t border-slate-100">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        {/* Subtle dot-grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#cbd5e115_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Left progress bar */}
        <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 z-50">
          {phases.map((phase, i) => (
            <div key={i} className="relative flex items-center justify-center">
              <motion.div
                style={{ opacity: barAnims[i].op }}
                className="w-[3px] h-10 bg-slate-200 rounded-full overflow-hidden"
              >
                <motion.div
                  style={{
                    height: '100%',
                    scaleY: barAnims[i].sc,
                    originY: 0,
                    backgroundColor: phase.color,
                  }}
                  className="w-full"
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16 xl:px-24 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

          {/* ── Left: Scrolling Text ───────────────────────────────── */}
          <div className="relative h-[260px] sm:h-[300px] lg:h-[400px] flex flex-col justify-center">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.badge}
                style={{ opacity: textAnims[i].op, y: textAnims[i].y, filter: textAnims[i].bl }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                {/* Phase badge */}
                <div className="inline-flex items-center gap-2 mb-5">
                  <div className="h-px w-6" style={{ backgroundColor: phase.color }} />
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.3em] font-mono"
                    style={{ color: phase.color }}
                  >
                    {phase.badge}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-brandNavy tracking-tight leading-[1.1] mb-4">
                  {phase.title}
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-textSecondary leading-relaxed mb-6 max-w-[460px]">
                  {phase.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {phase.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2.5 text-sm font-medium text-textSecondary">
                      <span className="mt-[3px] shrink-0 text-[13px]" style={{ color: phase.color }}>
                        ◆
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Right: Workflow Canvas ─────────────────────────────── */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden h-[400px] lg:h-[470px] relative">

              {/* Inner dot pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,#94a3b818_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

              {/* Phase canvas crossfades — single merged style prop, bottom offset clears the toolbar */}
              {canvasComponents.map((Canvas, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: canvasAnims[i], bottom: '44px' } as any}
                  className="absolute top-0 left-0 right-0 flex flex-col"
                >
                  {Canvas}
                </motion.div>
              ))}

              {/* ── Bottom Toolbar ── */}
              <div className="absolute bottom-0 left-0 right-0 h-11 border-t border-slate-200 bg-white/90 backdrop-blur-sm flex items-center justify-around px-3">
                {toolbarItems.map(({ label, icon: Icon }, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${i >= 4 ? 'opacity-40' : ''}`}
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[8px] font-semibold text-slate-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle glow ring matching active phase */}
            <motion.div
              style={{ opacity: c0op }}
              className="absolute -inset-px rounded-2xl pointer-events-none border-2 border-indigo-300/30"
            />
            <motion.div
              style={{ opacity: c1op }}
              className="absolute -inset-px rounded-2xl pointer-events-none border-2 border-purple-300/30"
            />
            <motion.div
              style={{ opacity: c2op }}
              className="absolute -inset-px rounded-2xl pointer-events-none border-2 border-amber-300/30"
            />
            <motion.div
              style={{ opacity: c3op }}
              className="absolute -inset-px rounded-2xl pointer-events-none border-2 border-emerald-300/30"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
