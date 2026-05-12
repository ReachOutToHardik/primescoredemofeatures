'use client'

import { ShieldCheck, Sparkles, Target, Users, Mail, ChevronRight } from 'lucide-react'
import { FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6'
import Reveal from '../components/ui/Reveal'
import { motion } from 'framer-motion'
import Image from 'next/image'

const teamImages = [
  "/about/1778576601195-682511650-IMG_7994.JPG",
  "/about/1778576601199-467388510-IMG_7427.JPG",
  "/about/1778576601364-367645446-IMG_7996.JPG",
  "/about/1778576601566-671629370-IMG_7426.JPG",
  "/about/1778576601574-893335231-IMG_7425.JPG",
  "/about/1778576610529-76709075-IMG_7431.JPG"
]

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

        {/* Leadership Section */}
        <section className="mt-32">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandRed mb-4">Leadership</p>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-brandNavy tracking-tight">
                Meet our <span className="text-brandBlue">Founders</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            <Reveal>
              <div className="group relative rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 p-8 text-center transition-all hover:shadow-elevated hover:bg-white">
                <div className="relative mx-auto mb-8 h-48 w-48 rounded-full bg-brandNavy flex items-center justify-center text-4xl font-display font-bold text-white shadow-2xl">
                   SS
                   <div className="absolute -inset-2 rounded-full border border-brandNavy/10 animate-[spin_10s_linear_infinite]" />
                </div>
                <h3 className="text-2xl font-display font-black text-brandNavy">Sawai Singh</h3>
                <p className="text-sm font-bold text-brandRed uppercase tracking-widest mt-2">Founder</p>
                <div className="mt-6 flex justify-center gap-4">
                  <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brandBlue hover:border-brandBlue transition-all">
                    <FaLinkedin className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brandNavy hover:border-brandNavy transition-all">
                    <FaXTwitter className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group relative rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 p-8 text-center transition-all hover:shadow-elevated hover:bg-white">
                <div className="relative mx-auto mb-8 h-48 w-48 rounded-full bg-brandRed flex items-center justify-center text-4xl font-display font-bold text-white shadow-2xl">
                   KS
                   <div className="absolute -inset-2 rounded-full border border-brandRed/10 animate-[spin_12s_linear_infinite]" />
                </div>
                <h3 className="text-2xl font-display font-black text-brandNavy">Karan Singh</h3>
                <p className="text-sm font-bold text-brandBlue uppercase tracking-widest mt-2">Co-Founder</p>
                <div className="mt-6 flex justify-center gap-4">
                  <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brandBlue hover:border-brandBlue transition-all">
                    <FaLinkedin className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brandNavy hover:border-brandNavy transition-all">
                    <FaXTwitter className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Team Gallery Section */}
        <section className="mt-32">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-end justify-between gap-6 mb-16">
               <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandRed mb-4">Our Culture</p>
                  <h2 className="font-display text-4xl sm:text-6xl font-black text-brandNavy tracking-tight leading-none">
                    Life at <span className="text-brandBlue">Primescore</span>
                  </h2>
               </div>
               <p className="text-textSecondary font-medium max-w-sm mb-2">
                 We are a team of dedicated professionals committed to fixing the Indian credit ecosystem.
               </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamImages.map((src, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm border border-slate-200">
                  <Image 
                    src={src} 
                    alt={`Primescore Team ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-bold tracking-widest uppercase text-[10px]">Quality Service Hub</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
