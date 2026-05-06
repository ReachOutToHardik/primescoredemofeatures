'use client'

import { ShieldCheck, Sparkles, Target, Users } from 'lucide-react'
import Reveal from '../components/ui/Reveal'



export default function About() {
  return (
    <div className="pb-20">
      <section className="pt-12 sm:pt-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">About us</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              We believe every Indian deserves fair credit.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              A single inaccurate tag can block home loans, business credit, even rentals. Primescore exists to
              correct what's wrong — with documentation, discipline, and transparency.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-brandNavy/8 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Founding story</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-brandNavy">
                Built from the gap we saw
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-textSecondary">
                Too many people were being rejected for loans because of errors they didn't create — and
                couldn't navigate. The dispute ecosystem is fragmented: unclear timelines, weak drafts, no tracking.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-textSecondary">
                We built Primescore like a premium rectification desk: audit → evidence → filing → follow-ups →
                clean outcomes, with a dashboard that shows the truth in real time.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-brandNavy/8 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Values</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-brandNavy">
                The Primescore standard
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { t: 'Trust', d: 'Clear drafts, transparent timelines.', i: ShieldCheck },
                  { t: 'Transparency', d: 'Track every filing with reference IDs.', i: Sparkles },
                  { t: 'Technology', d: 'System-led detection + expert judgement.', i: Target },
                  { t: 'India-first', d: 'Built for Indian lenders and bureau cycles.', i: Users },
                ].map((v) => (
                  <div key={v.t} className="rounded-xl border border-brandNavy/6 bg-night/50 p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-brandRed/10">
                        <v.i className="h-4 w-4 text-brandRed" />
                      </div>
                      <span className="text-sm font-semibold text-brandNavy">{v.t}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-textSecondary">{v.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


    </div>
  )
}
