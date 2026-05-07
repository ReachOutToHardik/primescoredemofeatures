'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

const tabImages: Record<string, string> = {
  'Overview': '/dashboard/overview.png',
  'Accounts': '/dashboard/account.png',
  'Enquiries': '/dashboard/enquiries.png',
  'Comparison': '/dashboard/comparision.png',
}

function ImagePlaceholder({ title }: { title: string }) {
  const imgSrc = tabImages[title] || tabImages['Overview']

  return (
    <Reveal>
      <div className="group relative w-full overflow-hidden rounded-2xl border border-brandNavy/8 bg-white shadow-card lg:h-auto">
        {/* Desktop view: full height, standard hover effect */}
        <motion.div
          className="hidden w-full lg:block"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <img
            src={imgSrc}
            alt={`${title} view`}
            className="h-auto w-full object-cover"
          />
        </motion.div>

        {/* Mobile view: fixed height, auto-pan/zoom effect */}
        <div className="h-[350px] w-full lg:hidden">
          <motion.img
            src={imgSrc}
            alt={`${title} view`}
            className="h-full w-full object-cover"
            animate={{
              objectPosition: ["0% 0%", "100% 0%", "0% 0%"],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </Reveal>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview')

  const tabs = [
    { id: 'Overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'Accounts', icon: FileText, label: 'Accounts' },
    { id: 'Enquiries', icon: Bell, label: 'Enquiries' },
    { id: 'Comparison', icon: ShieldCheck, label: 'Comparison' },
  ]

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12 pb-20">
      <section className="pt-12 sm:pt-16">
        <Reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-textSecondary">Dashboard</p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-brandNavy sm:text-5xl">
              Your Primescore Dashboard
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-textSecondary">
              Preview of what clients see: score movement, active disputes, documents, and next actions.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mt-12">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <Reveal>
            <aside className="sticky top-20 hidden h-fit rounded-2xl border border-brandNavy/8 bg-white p-4 shadow-card lg:block">
              <div className="flex items-center gap-3 px-2 pb-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brandRed/12 font-display text-sm font-bold text-brandRed">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brandNavy">Client</div>
                  <div className="font-mono text-xs text-textSecondary">PS-28419</div>
                </div>
              </div>

              <div className="grid gap-1">
                {tabs.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setActiveTab(x.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${activeTab === x.id
                        ? 'bg-brandNavy/[0.04] font-semibold text-brandNavy'
                        : 'text-textSecondary hover:bg-brandNavy/[0.04] hover:text-brandNavy'
                      }`}
                  >
                    <x.icon className="h-4 w-4" />
                    <span>{x.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-brandRed/8 p-3">
                <div className="text-sm font-semibold text-brandNavy">Book Expert Call</div>
                <div className="mt-0.5 text-xs text-textSecondary">15 min · Clear next steps</div>
                <Button className="mt-3 h-9 w-full text-xs">Schedule</Button>
              </div>
            </aside>
          </Reveal>

          {/* Main content */}
          <div className="grid min-w-0 gap-6">
            {/* Mobile Tabs */}
            <Reveal>
              <div className="flex w-full items-center justify-between rounded-2xl border border-brandNavy/8 bg-white p-1.5 shadow-sm lg:hidden">
                {tabs.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setActiveTab(x.id)}
                    className={`flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${activeTab === x.id
                        ? 'bg-brandNavy/[0.06] text-brandNavy shadow-sm scale-[0.98]'
                        : 'text-textSecondary hover:bg-brandNavy/[0.04] hover:text-brandNavy'
                      }`}
                  >
                    <x.icon className={`h-5 w-5 transition-all ${activeTab === x.id ? 'stroke-[2.5px]' : ''}`} />
                    <span className={`text-[10px] tracking-wide sm:text-xs ${activeTab === x.id ? 'font-bold' : 'font-medium'}`}>
                      {x.label}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <ImagePlaceholder title={activeTab} />
          </div>
        </div>
      </section>
    </div>
  )
}
