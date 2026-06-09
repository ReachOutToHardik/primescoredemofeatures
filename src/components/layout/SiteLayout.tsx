import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import AiChatWidget from '../ui/AiChatWidget'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-night font-body text-brandNavy overflow-x-hidden">
      {/* Subtle background texture — not the heavy multi-radial from before */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-heroRadial" />
        <div className="absolute inset-0 bg-dots opacity-[0.4]" />
      </div>

      <Navbar />
      <main className="relative">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12">{children}</div>
      </main>
      <Footer />
      <AiChatWidget />
    </div>
  )
}
