
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
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-brandBlue/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-24 relative z-10">
        
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-center">
            <Reveal>
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="h-[2px] w-8 bg-brandRed" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brandRed">The Primescore Vision</p>
                </div>
                <h1 className="font-display text-5xl font-bold tracking-tight text-brandNavy sm:text-7xl lg:text-8xl leading-[1.05]">
                  Fair credit for <br /><span className="text-brandBlue/80">every Indian.</span>
                </h1>
                <p className="mt-10 text-lg leading-relaxed text-slate-500 font-medium max-w-lg">
                  A single inaccurate tag can block financial freedom. We correct what's wrong with absolute transparency and documentation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-video rounded-2xl border border-slate-100 overflow-hidden group max-w-lg ml-auto w-full shadow-lg">
                <Image 
                  src="/about/1778578171390-205641593-Untitled design (11).png"
                  alt="Primescore Founders"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Founding & Values Section */}
        <section className="mt-32">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="p-10 lg:p-14 rounded-3xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-6">Our Origins</p>
                <h2 className="font-display text-3xl font-bold text-brandNavy mb-8">Built from the gap we saw</h2>
                <div className="space-y-6 text-slate-500 leading-relaxed">
                  <p>Too many people were being rejected for loans because of errors they didn't create. The dispute ecosystem was fragmented and unclear.</p>
                  <p>We built Primescore as a premium rectification desk: audit, evidence, filing, and clean outcomes, visible in real time.</p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { t: 'Trust', d: 'Clear drafts, transparent timelines.', i: ShieldCheck },
                { t: 'Transparency', d: 'Track every filing with IDs.', i: Sparkles },
                { t: 'Technology', d: 'System-led detection.', i: Target },
                { t: 'India-first', d: 'Built for Indian lenders.', i: Users },
              ].map((v, i) => (
                <Reveal key={v.t} delay={i * 0.05}>
                  <div className="h-full p-8 rounded-2xl border border-slate-100 bg-white hover:border-brandBlue/20 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brandBlue transition-colors mb-6">
                      <v.i className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-brandNavy mb-2">{v.t}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mt-32 border-t border-slate-100 pt-32">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brandRed mb-4">Leadership</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brandNavy tracking-tight">Meet our founders</h2>
            </div>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-2 max-w-4xl mx-auto">
            <Reveal>
              <div className="group">
                <div className="aspect-[4/5] rounded-2xl bg-slate-50 border border-slate-100 mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
                     Sawai Singh
                   </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brandNavy">Sawai Singh</h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Founder</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brandBlue hover:border-brandBlue transition-all">
                      <FaLinkedin className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="group">
                <div className="aspect-[4/5] rounded-2xl bg-slate-50 border border-slate-100 mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300">
                     Karan Singh
                   </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brandNavy">Karan Singh</h3>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Co-Founder</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brandBlue hover:border-brandBlue transition-all">
                      <FaLinkedin className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Culture Section */}
        <section className="mt-32">
          <Reveal>
            <div className="mb-16">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brandRed mb-4">Culture</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brandNavy tracking-tight">Life at Primescore</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamImages.map((src, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <Image 
                    src={src} 
                    alt={`Team ${i + 1}`}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
