'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  ShieldCheck, 
  TrendingUp, 
  FileSearch, 
  MessageSquare, 
  Layout, 
  Lock,
  ArrowRight,
  Download,
  CheckCircle2,
  AlertCircle,
  Wifi,
  Signal,
  Battery
} from 'lucide-react'

const features = [
  {
    badge: "01 // Multi-Bureau Sync",
    title: "Multi-Bureau Command Center",
    description: "The only dashboard in India that pulls live data from CIBIL, Experian, Equifax, and CRIF. See every score, every discrepancy, all in one premium interface.",
    icon: Layout,
    color: "#2563EB", // brandBlue
    screen: "overview"
  },
  {
    badge: "02 // Resolution Engine",
    title: "Real-Time Dispute Tracker",
    description: "No more black holes. Track every dispute filing with official reference IDs, current status, and direct links to bureau evidence packs.",
    icon: FileSearch,
    color: "#EF4444", // brandRed
    screen: "disputes"
  },
  {
    badge: "03 // Smart Diagnostics",
    title: "Unified AI Score Audit",
    description: "Instantly detect score variance, credit utilization spikes, and critical late payment records across all bureaus in one automated audit report.",
    icon: TrendingUp,
    color: "#10B981", // brandGreen
    screen: "audit"
  },
  {
    badge: "04 // Dedicated Consultation",
    title: "Direct Expert Access",
    description: "Skip the call center. Chat directly with your credit rectification specialist. Get strategy updates and advice delivered straight to your dashboard.",
    icon: MessageSquare,
    color: "#F59E0B", // brandYellow
    screen: "chat"
  }
]

export default function FeatureScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Mapping scroll to phone transforms
  const phoneRotateY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 20, -20, 15, 0])
  const phoneRotateX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 5, 12, -8, 0])
  const phoneScale = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.95, 1, 1, 0.95])
  const phoneX = useTransform(smoothProgress, [0, 0.1, 0.9, 1], ["5%", "0%", "0%", "-5%"])
  // Dynamic Background Colors
  const bgColor = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ["#0A0A0A", "#0F172A", "#18181B", "#0A0A0A", "#0A0A0A"])
  const glowColor = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ["#2563EB", "#EF4444", "#10B981", "#F59E0B", "#2563EB"])
  const glowOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={containerRef} style={{ backgroundColor: bgColor }} className="relative h-[450vh] bg-grain">
      {/* Sticky Container */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden gpu-accelerated">
        
        {/* Progress Indicator (Left Side) */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-10 z-50">
          {features.map((_, i) => {
            const start = i * 0.25
            const end = (i + 1) * 0.25
            const lineOpacity = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [0.1, 1, 1, 0.1])
            
            return (
              <div key={i} className="relative flex items-center justify-center">
                <motion.div 
                  style={{ opacity: lineOpacity }}
                  className="w-1 h-12 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div 
                    style={{ 
                      height: "100%", 
                      scaleY: useTransform(smoothProgress, [start, end], [0, 1]),
                      originY: 0,
                      backgroundColor: features[i].color 
                    }} 
                    className="w-full"
                  />
                </motion.div>
                <motion.div 
                   style={{ 
                     borderColor: useTransform(smoothProgress, [start, start + 0.05], ["rgba(255,255,255,0.1)", features[i].color]),
                     scale: useTransform(smoothProgress, [start, start + 0.05], [1, 1.2])
                   }}
                   className="absolute -top-4 w-3 h-3 rounded-full border-2 bg-black" 
                />
              </div>
            )
          })}
        </div>

        {/* Background Elements */}
        <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 pointer-none">
          <motion.div 
            style={{ backgroundColor: glowColor }}
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] blur-[120px] rounded-full opacity-20 gpu-accelerated" 
          />
          <motion.div 
            style={{ backgroundColor: glowColor }}
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] blur-[120px] rounded-full opacity-10 gpu-accelerated" 
          />
        </motion.div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-24 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-3 sm:gap-8 lg:gap-12 items-start lg:items-center relative z-10 pt-16 sm:pt-28 lg:pt-0">
          
          {/* Left Side: Content */}
          <div className="relative h-[220px] sm:h-[250px] lg:h-[400px] flex flex-col justify-center gpu-accelerated z-20">
            {features.map((feature, i) => {
              const start = i * 0.25
              const end = (i + 1) * 0.25
              
              // Only visible when in range
              const opacity = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0])
              const y = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [30, 0, 0, -30])
              const blur = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"])

              return (
                <motion.div
                  key={feature.title}
                  style={{ opacity, y, filter: blur }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-8"
                  >
                    <div className="h-px w-6 lg:w-8 bg-white/20" />
                    <span className="text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em] text-white/60">{feature.badge}</span>
                  </motion.div>
                  <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] lg:leading-[0.9] mb-2 sm:mb-4 lg:mb-8">
                    {feature.title.split(" ").map((w, idx) => (
                      <span key={idx} className={idx === feature.title.split(" ").length - 1 ? "text-white/40" : ""}>{w} </span>
                    ))}
                  </h2>
                  <p className="text-[13px] sm:text-base lg:text-xl text-white/50 leading-relaxed max-w-lg font-medium">
                    {feature.description}
                  </p>
                  <div className="mt-3 sm:mt-6 lg:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                     <button className="h-10 sm:h-14 px-6 sm:px-8 rounded-full bg-white text-brandNavy font-bold text-[10px] sm:text-sm uppercase tracking-widest hover:bg-white/90 transition-all shadow-xl">
                        Open Feature
                     </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Side: Phone Showcase */}
          <div className="relative flex justify-center perspective-2000 mt-2 sm:mt-12 lg:mt-0 origin-top lg:origin-center">
            <motion.div
              style={{
                rotateY: phoneRotateY,
                rotateX: phoneRotateX,
                scale: phoneScale,
                x: phoneX,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[240px] sm:w-[300px] h-[450px] sm:h-[600px] bg-black rounded-[38px] sm:rounded-[50px] border-[6px] sm:border-[8px] border-white/5 shadow-2xl overflow-hidden"
            >
              {/* Phone Content Swapper */}
              <div className="relative w-full h-full bg-white overflow-hidden">
                 {/* Status Bar */}
                 <div className="absolute top-0 left-0 w-full h-10 px-6 sm:px-8 flex justify-between items-end pb-1 z-50 text-black">
                    <span className="text-[11px] sm:text-[12px] font-bold">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Signal className="w-3 h-3" />
                      <Wifi className="w-3 h-3" />
                      <Battery className="w-3.5 h-3.5 fill-black" />
                    </div>
                 </div>

                 {/* Screen 1: Overview */}
                 <PhoneScreen 
                    progress={smoothProgress} 
                    range={[0, 0.25]}
                    bg="white"
                 >
                    <div className="p-4 pt-10 sm:p-6 sm:pt-12">
                       <h3 className="text-lg sm:text-xl font-bold text-brandNavy font-display">Multi-Bureau</h3>
                       <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold mb-4 sm:mb-6">Live Credit Monitoring</p>
                       
                       <div className="space-y-2.5 sm:space-y-4">
                          {[
                            { name: 'CIBIL', score: 742, color: '#10B981', trend: [40, 55, 75, 100] },
                            { name: 'EXPERIAN', score: 738, color: '#2563EB', trend: [45, 60, 80, 100] },
                            { name: 'CRIF', score: 745, color: '#F59E0B', trend: [60, 50, 75, 90] },
                            { name: 'EQUIFAX', score: 732, color: '#EF4444', trend: [90, 80, 60, 40] },
                          ].map(b => (
                            <div key={b.name} className="p-3 sm:p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                               <div>
                                  <div className="text-[8px] sm:text-[9px] font-black text-slate-400">{b.name}</div>
                                  <div className="text-base sm:text-xl font-black text-brandNavy font-display">{b.score}</div>
                               </div>
                               <div className="flex items-end gap-[3px] h-5 sm:h-6">
                                  {b.trend.map((h, i) => (
                                    <motion.div 
                                      key={i}
                                      initial={{ height: 0 }}
                                      whileInView={{ height: `${h}%` }}
                                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                                      className="w-1.5 sm:w-2 rounded-t-[2px]" 
                                      style={{ backgroundColor: i === 3 ? b.color : b.color + '40' }} 
                                    />
                                  ))}
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </PhoneScreen>

                 {/* Screen 2: Disputes */}
                 <PhoneScreen 
                    progress={smoothProgress} 
                    range={[0.25, 0.5]}
                    bg="#F8FAFC"
                 >
                    <div className="p-4 pt-10 sm:p-6 sm:pt-12">
                       <h3 className="text-lg sm:text-xl font-bold text-brandNavy font-display">Active Disputes</h3>
                       <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold mb-4 sm:mb-6">12 Actions in Progress</p>

                       <div className="space-y-2.5 sm:space-y-3">
                          {[
                            { title: 'Wrong Settlement', bureau: 'CIBIL', status: 'In Review', id: 'REF: #8291' },
                            { title: 'Fake Loan Entry', bureau: 'EXPERIAN', status: 'Disputed', id: 'REF: #8295' },
                            { title: 'Address Conflict', bureau: 'CRIF', status: 'Resolved', id: 'REF: #8102' },
                            { title: 'Duplicate Acc', bureau: 'EQUIFAX', status: 'In Review', id: 'REF: #8299' },
                          ].map((d, i) => (
                            <div key={i} className="p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                               <div className="flex justify-between items-start mb-1 sm:mb-2">
                                  <span className="text-[8px] sm:text-[9px] font-bold text-brandNavy bg-brandNavy/5 px-2 py-0.5 rounded-md">{d.bureau}</span>
                                  <span className={`text-[8px] sm:text-[9px] font-bold ${d.status === 'Resolved' ? 'text-brandGreen' : 'text-brandBlue'}`}>{d.status}</span>
                               </div>
                               <div className="text-[11px] sm:text-xs font-bold text-brandNavy mb-0.5 sm:mb-1">{d.title}</div>
                               <div className="text-[9px] sm:text-[10px] text-slate-400">{d.id}</div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </PhoneScreen>

                 {/* Screen 3: Smart Audit */}
                 <PhoneScreen 
                    progress={smoothProgress} 
                    range={[0.5, 0.75]}
                    bg="white"
                 >
                    <div className="p-4 pt-10 sm:p-6 sm:pt-12 h-full flex flex-col justify-between">
                       <div>
                          <h3 className="text-lg sm:text-xl font-bold text-brandNavy font-display">Unified Score Audit</h3>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold mb-3 sm:mb-6">Report Generated Successfully</p>

                          {/* Gauge simulation */}
                          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-brandNavy text-white mb-3 sm:mb-4 shadow-lg">
                             <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-brandGreen flex flex-col items-center justify-center shrink-0 text-center">
                                <span className="text-base sm:text-lg font-black font-display">742</span>
                                <span className="text-[5px] sm:text-[6px] uppercase tracking-wider text-white/70">Avg Score</span>
                             </div>
                             <div>
                                <div className="text-[11px] sm:text-xs font-bold">Good Standing</div>
                                <div className="text-[8px] sm:text-[9px] text-white/70">Experian variance detected (&gt;15 pts lower)</div>
                             </div>
                          </div>

                          {/* Action Required Card */}
                          <div className="p-3 sm:p-4 rounded-2xl border border-red-100 bg-red-50/50 mb-3 sm:mb-4">
                             <div className="flex items-center gap-1.5 mb-1">
                                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
                                <span className="text-[11px] sm:text-xs font-bold text-red-900">Critical Severity</span>
                             </div>
                             <div className="text-[10px] sm:text-[11px] font-bold text-red-800">Late Payment Record</div>
                             <div className="text-[8px] sm:text-[9px] text-red-600/80">HDFC Credit Card reported 30 days late.</div>
                          </div>
                       </div>

                       {/* Bottom Stat summary */}
                       <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 pb-3 sm:pb-8">
                          <div className="text-center p-2 rounded-xl bg-slate-50">
                             <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400">Accounts</div>
                             <div className="text-[11px] sm:text-xs font-black text-brandNavy font-display">8 <span className="text-[7px] sm:text-[8px] text-brandGreen font-normal">Active</span></div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-slate-50">
                             <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400">Util</div>
                             <div className="text-[11px] sm:text-xs font-black text-brandNavy font-display">22% <span className="text-[7px] sm:text-[8px] text-brandGreen font-normal">Excel</span></div>
                          </div>
                          <div className="text-center p-2 rounded-xl bg-slate-50">
                             <div className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-400">On-Time</div>
                             <div className="text-[11px] sm:text-xs font-black text-brandNavy font-display">98%</div>
                          </div>
                       </div>
                    </div>
                 </PhoneScreen>

                 {/* Screen 4: Chat */}
                 <PhoneScreen 
                    progress={smoothProgress} 
                    range={[0.75, 1]}
                    bg="#F1F5F9"
                 >
                    <div className="p-4 pt-10 sm:p-6 sm:pt-12 h-full flex flex-col justify-between pb-3 sm:pb-6">
                       <div>
                          <h3 className="text-lg sm:text-xl font-bold text-brandNavy font-display">Expert Support</h3>
                          <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold mb-4 sm:mb-6">Assigned: Ankur Sharma</p>

                          <div className="space-y-3 sm:space-y-4">
                             <div className="max-w-[85%] p-2.5 sm:p-3 rounded-2xl rounded-tl-none bg-white text-[10px] sm:text-[11px] text-slate-600 shadow-sm leading-relaxed">
                                Hi Hardik, we've drafted the dispute for the SBI credit card entry. Ready for review?
                             </div>
                             <div className="max-w-[85%] p-2.5 sm:p-3 rounded-2xl rounded-tr-none bg-brandBlue text-white text-[10px] sm:text-[11px] ml-auto shadow-md leading-relaxed">
                                Yes, looks good. Let's file it.
                             </div>
                             <div className="max-w-[85%] p-2.5 sm:p-3 rounded-2xl rounded-tl-none bg-white text-[10px] sm:text-[11px] text-slate-600 shadow-sm leading-relaxed">
                                Great. Filing now. You'll see the ref ID in the dispute tracker in 5 mins.
                             </div>
                          </div>
                       </div>

                       <div className="mt-3 sm:mt-4 flex gap-2">
                          <div className="flex-1 h-9 sm:h-10 rounded-full bg-white border border-slate-200 px-3 sm:px-4 flex items-center text-[9px] sm:text-[10px] text-slate-400">
                             Type a message...
                          </div>
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brandNavy flex items-center justify-center shrink-0">
                             <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                          </div>
                       </div>
                    </div>
                 </PhoneScreen>
              </div>

              {/* Home Bar */}
              <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-1 bg-black/10 rounded-full z-50" />
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

function PhoneScreen({ children, progress, range, bg }: { children: React.ReactNode, progress: any, range: [number, number], bg: string }) {
  const opacity = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [0, 1, 1, 0])
  const scale = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [0.95, 1, 1, 1.05])
  const y = useTransform(progress, [range[0] - 0.05, range[0], range[1], range[1] + 0.05], [20, 0, 0, -20])

  return (
    <motion.div
      style={{ opacity, scale, y, backgroundColor: bg }}
      className="absolute inset-0 z-10 origin-center"
    >
      {children}
    </motion.div>
  )
}
