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
    title: "Multi-Bureau Command Center",
    description: "The only dashboard in India that pulls live data from CIBIL, Experian, Equifax, and CRIF. See every score, every discrepancy, all in one premium interface.",
    icon: Layout,
    color: "#2563EB", // brandBlue
    screen: "overview"
  },
  {
    title: "Real-Time Dispute Tracker",
    description: "No more black holes. Track every dispute filing with official reference IDs, current status, and direct links to bureau evidence packs.",
    icon: FileSearch,
    color: "#EF4444", // brandRed
    screen: "disputes"
  },
  {
    title: "Document Vault",
    description: "Bank-grade encrypted storage for your PAN, Aadhaar, and credit reports. Secure, fast, and accessible only to you and your assigned expert.",
    icon: Lock,
    color: "#10B981", // brandGreen
    screen: "vault"
  },
  {
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
  const phoneScale = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.85, 1, 1, 0.85])
  const phoneX = useTransform(smoothProgress, [0, 0.1, 0.9, 1], ["15%", "0%", "0%", "-15%"])
  // Dynamic Background Colors
  const bgColor = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ["#0A0A0A", "#0F172A", "#18181B", "#0A0A0A", "#0A0A0A"])
  const glowColor = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ["#2563EB", "#EF4444", "#10B981", "#F59E0B", "#2563EB"])
  const glowOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={containerRef} style={{ backgroundColor: bgColor }} className="relative h-[800vh] bg-grain">
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

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-24 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Side: Content */}
          <div className="relative h-[300px] lg:h-[400px] flex flex-col justify-center gpu-accelerated z-20">
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
                    className="inline-flex items-center gap-3 mb-4 lg:mb-8"
                  >
                    <div className="h-px w-8 bg-white/20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Premium Module 0{i + 1}</span>
                  </motion.div>
                  <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tighter leading-[1.0] lg:leading-[0.9] mb-4 lg:mb-8">
                    {feature.title.split(" ").map((w, idx) => (
                      <span key={idx} className={idx === feature.title.split(" ").length - 1 ? "text-white/40" : ""}>{w} </span>
                    ))}
                  </h2>
                  <p className="text-sm lg:text-xl text-white/50 leading-relaxed max-w-lg font-medium hidden sm:block">
                    {feature.description}
                  </p>
                  <div className="mt-6 lg:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                     <button className="h-12 lg:h-14 px-6 lg:px-8 rounded-full bg-white text-brandNavy font-bold text-xs lg:text-sm uppercase tracking-widest hover:bg-white/90 transition-all hover:-translate-y-1 active:scale-95 shadow-xl">
                        Open Feature
                     </button>
                     <button className="flex items-center gap-2 text-white/50 font-bold text-[10px] lg:text-xs uppercase tracking-widest hover:text-white transition-colors group">
                        User Guide <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                     </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Side: Phone Showcase */}
          <div className="relative flex justify-center perspective-2000 mt-0 lg:mt-0 scale-[0.8] sm:scale-100 origin-top lg:origin-center">
            <motion.div
              style={{
                rotateY: phoneRotateY,
                rotateX: phoneRotateX,
                scale: phoneScale,
                x: phoneX,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[280px] sm:w-[300px] h-[580px] sm:h-[600px] bg-black rounded-[45px] sm:rounded-[50px] border-[6px] sm:border-[8px] border-white/5 shadow-2xl overflow-hidden"
            >
              {/* Phone Content Swapper */}
              <div className="relative w-full h-full bg-white overflow-hidden">
                 {/* Status Bar */}
                 <div className="absolute top-0 left-0 w-full h-10 px-8 flex justify-between items-end pb-1 z-50 text-black">
                    <span className="text-[12px] font-bold">9:41</span>
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
                    <div className="p-6 pt-12">
                       <h3 className="text-xl font-bold text-brandNavy font-display">Multi-Bureau</h3>
                       <p className="text-[10px] text-slate-400 font-bold mb-6">Live Credit Monitoring</p>
                       
                       <div className="space-y-4">
                          {[
                            { name: 'CIBIL', score: 742, color: '#10B981' },
                            { name: 'EXPERIAN', score: 738, color: '#2563EB' },
                            { name: 'CRIF', score: 745, color: '#F59E0B' },
                            { name: 'EQUIFAX', score: 732, color: '#EF4444' },
                          ].map(b => (
                            <div key={b.name} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex justify-between items-center">
                               <div>
                                  <div className="text-[9px] font-black text-slate-400">{b.name}</div>
                                  <div className="text-xl font-black text-brandNavy font-display">{b.score}</div>
                               </div>
                               <div className="w-10 h-10 rounded-full border-4 border-slate-100 flex items-center justify-center" style={{ borderColor: b.color + '20' }}>
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.color }} />
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
                    <div className="p-6 pt-12">
                       <h3 className="text-xl font-bold text-brandNavy font-display">Active Disputes</h3>
                       <p className="text-[10px] text-slate-400 font-bold mb-6">12 Actions in Progress</p>

                       <div className="space-y-3">
                          {[
                            { title: 'Wrong Settlement', bureau: 'CIBIL', status: 'In Review', id: 'REF: #8291' },
                            { title: 'Fake Loan Entry', bureau: 'EXPERIAN', status: 'Disputed', id: 'REF: #8295' },
                            { title: 'Address Conflict', bureau: 'CRIF', status: 'Resolved', id: 'REF: #8102' },
                            { title: 'Duplicate Acc', bureau: 'EQUIFAX', status: 'In Review', id: 'REF: #8299' },
                          ].map((d, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                               <div className="flex justify-between items-start mb-2">
                                  <span className="text-[9px] font-bold text-brandNavy bg-brandNavy/5 px-2 py-0.5 rounded-md">{d.bureau}</span>
                                  <span className={`text-[9px] font-bold ${d.status === 'Resolved' ? 'text-brandGreen' : 'text-brandBlue'}`}>{d.status}</span>
                               </div>
                               <div className="text-xs font-bold text-brandNavy mb-1">{d.title}</div>
                               <div className="text-[10px] text-slate-400">{d.id}</div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </PhoneScreen>

                 {/* Screen 3: Vault */}
                 <PhoneScreen 
                    progress={smoothProgress} 
                    range={[0.5, 0.75]}
                    bg="white"
                 >
                    <div className="p-6 pt-12 h-full flex flex-col">
                       <h3 className="text-xl font-bold text-brandNavy font-display">Secure Vault</h3>
                       <p className="text-[10px] text-slate-400 font-bold mb-6">256-bit AES Encryption</p>

                       <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="p-4 rounded-2xl bg-brandBlue/5 border border-brandBlue/10 flex flex-col items-center text-center">
                             <div className="w-10 h-10 rounded-xl bg-brandBlue/10 flex items-center justify-center mb-3">
                                <ShieldCheck className="w-5 h-5 text-brandBlue" />
                             </div>
                             <div className="text-[10px] font-bold text-brandNavy">Identity</div>
                          </div>
                          <div className="p-4 rounded-2xl bg-brandRed/5 border border-brandRed/10 flex flex-col items-center text-center">
                             <div className="w-10 h-10 rounded-xl bg-brandRed/10 flex items-center justify-center mb-3">
                                <FileSearch className="w-5 h-5 text-brandRed" />
                             </div>
                             <div className="text-[10px] font-bold text-brandNavy">Reports</div>
                          </div>
                       </div>

                       <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100">
                             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-brandGreen" />
                             </div>
                             <div className="flex-1">
                                <div className="text-[10px] font-bold text-brandNavy">PAN_Card.pdf</div>
                                <div className="text-[8px] text-slate-400">Verified • 1.2 MB</div>
                             </div>
                             <Download className="w-3 h-3 text-slate-300" />
                          </div>
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100">
                             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-brandGreen" />
                             </div>
                             <div className="flex-1">
                                <div className="text-[10px] font-bold text-brandNavy">CIBIL_Report_May.pdf</div>
                                <div className="text-[8px] text-slate-400">Verified • 2.4 MB</div>
                             </div>
                             <Download className="w-3 h-3 text-slate-300" />
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
                    <div className="p-6 pt-12 h-full flex flex-col">
                       <h3 className="text-xl font-bold text-brandNavy font-display">Expert Support</h3>
                       <p className="text-[10px] text-slate-400 font-bold mb-6">Assigned: Ankur Sharma</p>

                       <div className="flex-1 space-y-4">
                          <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none bg-white text-[11px] text-slate-600 shadow-sm">
                             Hi Hardik, we've drafted the dispute for the SBI credit card entry. Ready for review?
                          </div>
                          <div className="max-w-[80%] p-3 rounded-2xl rounded-tr-none bg-brandBlue text-white text-[11px] ml-auto shadow-md">
                             Yes, looks good. Let's file it.
                          </div>
                          <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none bg-white text-[11px] text-slate-600 shadow-sm">
                             Great. Filing now. You'll see the ref ID in the dispute tracker in 5 mins.
                          </div>
                       </div>

                       <div className="mt-4 flex gap-2">
                          <div className="flex-1 h-10 rounded-full bg-white border border-slate-200 px-4 flex items-center text-[10px] text-slate-400">
                             Type a message...
                          </div>
                          <div className="w-10 h-10 rounded-full bg-brandNavy flex items-center justify-center">
                             <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                       </div>
                    </div>
                 </PhoneScreen>
              </div>

              {/* Home Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full z-50" />
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
