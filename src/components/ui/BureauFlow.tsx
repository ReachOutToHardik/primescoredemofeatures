'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const bureaus = [
  { name: 'CIBIL', color: '#E4131B', score: 648 },
  { name: 'Experian', color: '#0066CC', score: 712 },
  { name: 'Equifax', color: '#C8A000', score: 681 },
  { name: 'CRIF High Mark', color: '#1A7F4B', score: 695 },
]

const banks = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank']

function DrawPath({ d, stroke = '#9CA3AF', sw = 2, delay = 0, dur = 0.6, inView }: {
  d: string; stroke?: string; sw?: number; delay?: number; dur?: number; inView: boolean
}) {
  return (
    <motion.path d={d} stroke={stroke} strokeWidth={sw} strokeLinecap="round" fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ delay, duration: dur, ease: 'easeInOut' }}
    />
  )
}

function FT({ children, x, y, anchor = 'middle', size = 13, fill = '#374151', weight = 600, delay = 0, inView, italic = false }: {
  children: React.ReactNode; x: number; y: number; anchor?: string; size?: number; fill?: string; weight?: number; delay?: number; inView: boolean; italic?: boolean
}) {
  return (
    <motion.text x={x} y={y} textAnchor={anchor as any} fontSize={size} fill={fill}
      fontWeight={weight} fontStyle={italic ? 'italic' : 'normal'}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.35 }}>
      {children}
    </motion.text>
  )
}

// Sketch-style wobbly rectangle
function SR({ x, y, w, h, stroke = '#374151', sw = 2, delay = 0, inView }: {
  x: number; y: number; w: number; h: number; stroke?: string; sw?: number; delay?: number; inView: boolean
}) {
  const d = `M${x+5},${y+1} Q${x+w/2},${y-2} ${x+w-5},${y} Q${x+w+1},${y} ${x+w},${y+5} Q${x+w+1},${y+h/2} ${x+w},${y+h-5} Q${x+w},${y+h+1} ${x+w-5},${y+h} Q${x+w/2},${y+h+1} ${x+5},${y+h} Q${x-1},${y+h} ${x},${y+h-5} Q${x-1},${y+h/2} ${x},${y+5} Q${x},${y} ${x+5},${y+1}`
  return <DrawPath d={d} stroke={stroke} sw={sw} delay={delay} dur={0.45} inView={inView} />
}

export default function BureauFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Layout
  const bkX = 30, bkW = 108, bkH = 32, bkGap = 48, bkY0 = 60
  const buX = 270, buW = 122, buH = 32, buGap = 44, buY0 = 50
  const psX = 530, psY = 40, psW = 158, psH = 196

  return (
    <div ref={ref} className="rounded-[2.5rem] border border-gray-200 bg-[#FAFAF8] p-6 sm:p-10 overflow-hidden">

      <div className="text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandRed">How It Works</p>
        <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-brandNavy sm:text-4xl">
          One Dashboard. All 4 Bureau Scores.
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-sm text-textSecondary">
          Banks silently report your data to 4 bureaus every month — including loans you never took. We catch every error across all 4 and dispute them at once.
        </p>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="min-w-[730px]">
          {!mounted ? (
            <div className="h-96 w-full animate-pulse rounded-2xl bg-gray-100" />
          ) : (
            <svg viewBox="0 0 730 400" className="w-full" style={{ fontFamily: 'var(--font-inter, DM Sans, system-ui, sans-serif)' }} aria-label="Diagram showing how banks report to credit bureaus and Primescore aggregates all scores">

              {/* ── WHITEBOARD BG LINES (ruled lines feel) ── */}
              {[80, 128, 176, 224, 272].map(y => (
                <line key={y} x1="0" y1={y} x2="730" y2={y} stroke="#F0EDE8" strokeWidth="1" />
              ))}

              {/* ══ SECTION: YOUR BANKS ══ */}
              {/* underline title */}
              <DrawPath d={`M${bkX},${bkY0-22} L${bkX+bkW},${bkY0-22}`} stroke="#9CA3AF" sw={1} delay={0.1} inView={inView} />
              <FT x={bkX+bkW/2} y={bkY0-26} size={12} fill="#9CA3AF" weight={700} delay={0.1} inView={inView}>YOUR BANKS</FT>

              {banks.map((bank, i) => {
                const y = bkY0 + i * bkGap
                return (
                  <g key={bank}>
                    <SR x={bkX} y={y} w={bkW} h={bkH} stroke="#6B7280" delay={i * 0.08} inView={inView} />
                    <FT x={bkX+bkW/2} y={y+20} size={14} fill="#111827" weight={700} delay={i * 0.08 + 0.25} inView={inView}>{bank}</FT>
                  </g>
                )
              })}

              {/* ══ FAN-OUT: Banks → Bureaus ══ */}
              {/* "reports to all 4 →" annotation */}
              <FT x={205} y={20} size={11} fill="#9CA3AF" weight={600} italic delay={0.7} inView={inView}>reports to all 4 →</FT>
              <DrawPath d={`M${150},${26} L${260},${26}`} stroke="#D1D5DB" sw={1} delay={0.7} inView={inView} />

              {banks.map((_, bi) =>
                bureaus.map((b, ri) => {
                  const fy = bkY0 + bi * bkGap + bkH / 2
                  const ty = buY0 + ri * buGap + buH / 2
                  const mx = (bkX + bkW + buX) / 2
                  return (
                    <DrawPath key={`${bi}-${ri}`}
                      d={`M${bkX+bkW},${fy} C${mx},${fy} ${mx},${ty} ${buX},${ty}`}
                      stroke={ri === bi ? b.color + '60' : '#E5E7EB'} sw={1.5}
                      delay={0.4 + bi * 0.04 + ri * 0.03} dur={0.5} inView={inView}
                    />
                  )
                })
              )}

              {/* ══ SECTION: 4 BUREAUS ══ */}
              <DrawPath d={`M${buX},${buY0-22} L${buX+buW},${buY0-22}`} stroke="#9CA3AF" sw={1} delay={0.4} inView={inView} />
              <FT x={buX+buW/2} y={buY0-26} size={12} fill="#9CA3AF" weight={700} delay={0.4} inView={inView}>4 CREDIT BUREAUS</FT>

              {bureaus.map((b, i) => {
                const y = buY0 + i * buGap
                return (
                  <g key={b.name}>
                    <SR x={buX} y={y} w={buW} h={buH} stroke={b.color} sw={2.2} delay={0.3 + i * 0.1} inView={inView} />
                    <FT x={buX+buW/2} y={y+20} size={14} fill={b.color} weight={700} delay={0.5 + i * 0.1} inView={inView}>{b.name}</FT>
                  </g>
                )
              })}

              {/* ══ CONVERGENCE: Bureaus → Primescore ══ */}
              {/* "we track all →" annotation */}
              <FT x={475} y={20} size={11} fill="#9CA3AF" weight={600} italic delay={1.2} inView={inView}>we track all →</FT>
              <DrawPath d={`M${430},${26} L${524},${26}`} stroke="#D1D5DB" sw={1} delay={1.2} inView={inView} />

              {bureaus.map((b, i) => {
                const fy = buY0 + i * buGap + buH / 2
                // Fan into different Y positions on the left edge of PS box
                const ty = psY + 50 + i * 38
                const mx = (buX + buW + psX) / 2
                return (
                  <g key={`conv-${i}`}>
                    <DrawPath
                      d={`M${buX+buW},${fy} C${mx},${fy} ${mx},${ty} ${psX},${ty}`}
                      stroke={b.color} sw={2} delay={1.0 + i * 0.12} dur={0.65} inView={inView}
                    />
                    {/* arrowhead */}
                    <motion.polygon
                      points={`${psX},${ty} ${psX-9},${ty-5} ${psX-9},${ty+5}`}
                      fill={b.color}
                      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1.7 + i * 0.12, duration: 0.2 }}
                    />
                  </g>
                )
              })}

              {/* ══ PRIMESCORE DASHBOARD ══ */}
              <SR x={psX} y={psY} w={psW} h={psH} stroke="#0F172A" sw={2.8} delay={1.5} inView={inView} />

              {/* Header bar */}
              <motion.rect x={psX+6} y={psY+6} width={psW-12} height={28} rx={3} fill="#E4131B"
                initial={{ scaleX: 0, opacity: 0 }} style={{ transformOrigin: `${psX+6}px ${psY+6}px` }}
                animate={inView ? { scaleX: 1, opacity: 1 } : {}} transition={{ delay: 1.8, duration: 0.35, ease: 'easeOut' }} />
              <FT x={psX+psW/2} y={psY+24} size={13} fill="white" weight={800} delay={1.9} inView={inView}>PRIMESCORE</FT>

              {/* Score rows */}
              {bureaus.map((b, i) => (
                <g key={`row-${i}`}>
                  <motion.rect x={psX+8} y={psY+42+i*38} width={psW-16} height={30} rx={3}
                    fill={b.color} initial={{ opacity: 0 }} animate={inView ? { opacity: 0.1 } : {}}
                    transition={{ delay: 1.9 + i * 0.1 }} />
                  <FT x={psX+18} y={psY+62+i*38} size={13} fill={b.color} weight={700} anchor="start" delay={2.0 + i * 0.1} inView={inView}>
                    {b.name.split(' ')[0]}
                  </FT>
                  <FT x={psX+psW-14} y={psY+62+i*38} size={13} fill="#374151" weight={700} anchor="end" delay={2.1 + i * 0.1} inView={inView}>
                    {b.score}
                  </FT>
                  {/* Pulsing live dot */}
                  <motion.circle cx={psX+psW-6} cy={psY+57+i*38} r={3} fill={b.color}
                    initial={{ opacity: 0 }} animate={inView ? { opacity: [1, 0.2, 1] } : {}}
                    transition={{ delay: 2.2 + i * 0.1, duration: 1.6, repeat: Infinity }} />
                </g>
              ))}

              {/* "All 4 live" label under PS box */}
              <FT x={psX+psW/2} y={psY+psH+18} size={12} fill="#9CA3AF" weight={600} delay={2.5} inView={inView}>
                All 4 — live & tracked
              </FT>

              {/* ══ WHITEBOARD ANNOTATIONS ══ */}
              {/* Loan fraud note — hand-drawn callout */}
              <DrawPath d={`M${buX+buW/2},${buY0+3*buGap+buH+5} Q${buX+buW/2},${buY0+3*buGap+buH+30} ${buX+buW+15},${buY0+3*buGap+buH+45}`}
                stroke="#E4131B" sw={1.2} delay={2.6} inView={inView} />
              <FT x={buX+buW+20} y={buY0+3*buGap+buH+42} size={11} fill="#E4131B" weight={700} delay={2.7} inView={inView} anchor="start">
                ← includes loans
              </FT>
              <FT x={buX+buW+20} y={buY0+3*buGap+buH+56} size={11} fill="#E4131B" weight={700} delay={2.75} inView={inView} anchor="start">
                you never took!
              </FT>

              {/* Star decoration */}
              <FT x={psX+psW+8} y={psY+18} size={18} fill="#FFB800" delay={2.4} inView={inView}>✦</FT>
              {/* Underline Primescore label */}
              <DrawPath d={`M${psX+8},${psY+psH+22} L${psX+psW-8},${psY+psH+22}`} stroke="#9CA3AF" sw={1} delay={2.6} inView={inView} />

              {/* Handwritten fact notes at the bottom */}
              <DrawPath d={`M${30},${310} L${690},${310}`} stroke="#E5E7EB" sw={1} delay={2.8} inView={inView} />

              {/* Note 1 */}
              <FT x={100} y={332} size={14} fill="#374151" weight={700} delay={2.85} inView={inView}>Banks report every month</FT>
              <FT x={100} y={350} size={12} fill="#6B7280" weight={400} delay={2.9} inView={inView} italic>Every EMI, every card payment.</FT>

              {/* divider */}
              <DrawPath d={`M${280},${315} L${280},${365}`} stroke="#E5E7EB" sw={1} delay={2.9} inView={inView} />

              {/* Note 2 */}
              <FT x={395} y={332} size={14} fill="#374151" weight={700} delay={2.95} inView={inView}>Scores differ by bureau</FT>
              <FT x={395} y={350} size={12} fill="#6B7280" weight={400} delay={3.0} inView={inView} italic>One says 650, another says 720.</FT>

              {/* divider */}
              <DrawPath d={`M${545},${315} L${545},${365}`} stroke="#E5E7EB" sw={1} delay={3.0} inView={inView} />

              {/* Note 3 */}
              <FT x={635} y={332} size={14} fill="#E4131B" weight={700} delay={3.05} inView={inView}>We fix all 4</FT>
              <FT x={635} y={350} size={12} fill="#6B7280" weight={400} delay={3.1} inView={inView} italic>Simultaneously. No gaps.</FT>

              <DrawPath d={`M${30},${368} L${690},${368}`} stroke="#E5E7EB" sw={1} delay={3.15} inView={inView} />

            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
