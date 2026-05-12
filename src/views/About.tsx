
'use client'

import { ShieldCheck, Sparkles, Target, Users } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-brandBlue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-brandRed/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24 relative z-10">
        <section className="pt-20 sm:pt-28">
          <Reveal>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-1 w-10 bg-brandRed rounded-full" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandRed">Our Mission</p>
              </div>
              <h1 className="font-display text-5xl font-black tracking-tight text-brandNavy sm:text-7xl lg:text-8xl leading-[0.95]">
                Fair credit for <br /><span className="text-brandBlue">every Indian.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-textSecondary font-medium">
                A single inaccurate tag can block home loans, business credit, even rentals. Primescore exists to
                correct what's wrong — with documentation, discipline, and absolute transparency.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="mt-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2.5rem] border border-brandNavy/5 bg-white/80 p-8 shadow-sm backdrop-blur-md sm:p-12 transition-all hover:shadow-elevated group">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandNavy/30">Founding story</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-brandNavy group-hover:text-brandRed transition-colors">
                  Built from the gap we saw
                </h2>
                <div className="mt-8 space-y-6">
                  <p className="text-base leading-relaxed text-textSecondary">
                    Too many people were being rejected for loans because of errors they didn't create — and
                    couldn't navigate. The dispute ecosystem is fragmented: unclear timelines, weak drafts, no tracking.
                  </p>
                  <p className="text-base leading-relaxed text-textSecondary">
                    We built Primescore like a premium rectification desk: audit → evidence → filing → follow-ups →
                    clean outcomes, with a dashboard that shows the truth in real time.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[2.5rem] border border-brandNavy/5 bg-white/80 p-8 shadow-sm backdrop-blur-md sm:p-12 transition-all hover:shadow-elevated">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandNavy/30">Values</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-brandNavy">
                  The Primescore standard
                </h2>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {[
                    { t: 'Trust', d: 'Clear drafts, transparent timelines.', i: ShieldCheck },
                    { t: 'Transparency', d: 'Track every filing with reference IDs.', i: Sparkles },
                    { t: 'Technology', d: 'System-led detection + expert judgement.', i: Target },
                    { t: 'India-first', d: 'Built for Indian lenders and bureau cycles.', i: Users },
                  ].map((v, i) => (
                    <motion.div 
                      key={v.t} 
                      whileHover={{ y: -5 }}
                      className="rounded-2xl border border-brandNavy/5 bg-brandNavy/[0.02] p-5 transition-colors hover:bg-white hover:border-brandRed/10 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brandRed/5 text-brandRed">
                          <v.i className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-bold text-brandNavy">{v.t}</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-textSecondary">{v.d}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="mt-24 border-t border-brandNavy/5 pt-24">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandRed mb-4">Credibility</p>
              <h2 className="font-display text-4xl font-black text-brandNavy tracking-tight">Recognized & <span className="text-brandBlue">Supported By</span></h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { 
                title: 'DPIIT', 
                subtitle: 'Govt. of India', 
                desc: 'Recognized by the Department for Promotion of Industry and Internal Trade, Ministry of Commerce & Industry.' 
              },
              { 
                title: 'iStart Rajasthan', 
                subtitle: 'Jodhpur Hub', 
                desc: 'Incubated and supported by iStart Rajasthan, the flagship startup initiative of the Government of Rajasthan.' 
              },
              { 
                title: 'Startup India', 
                subtitle: 'National Initiative', 
                desc: 'Proudly part of the Startup India initiative, empowering the next generation of Indian entrepreneurs.' 
              }
            ].map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <div className="group relative rounded-[2rem] border border-brandNavy/5 bg-slate-50/50 p-8 text-center transition-all hover:bg-white hover:shadow-elevated hover:border-brandRed/10">
                  <div className="mb-4 text-2xl font-display font-black text-brandNavy group-hover:text-brandRed transition-colors">
                    {r.title}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brandBlue mb-4">
                    {r.subtitle}
                  </div>
                  <p className="text-xs leading-relaxed text-textSecondary font-medium">
                    {r.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
