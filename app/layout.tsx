import type { Metadata } from 'next'
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google'
import '../src/index.css'
import Navbar from '../src/components/layout/Navbar'
import Footer from '../src/components/layout/Footer'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Preloader from '../src/components/ui/Preloader'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Primescore — Fix Your CIBIL Score. Unlock Your Future.',
    template: '%s | Primescore',
  },
  description:
    'Primescore helps you dispute credit report errors, remove illegitimate defaults, and boost your CIBIL score legally in 90 days. Trusted by 50,000+ Indians.',
  keywords: ['credit repair India', 'CIBIL score repair', 'credit rectification services', 'boost CIBIL score', 'Primescore'],
  icons: {
    icon: '/primescore-logo-tab.png',
    apple: '/primescore-logo-tab.png',
  },
  openGraph: {
    title: 'Primescore — Credit Rectification Experts',
    description: 'Fix your credit score legally and unlock your financial future.',
    siteName: 'Primescore',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen bg-night font-body text-brandNavy overflow-x-hidden">
        <Preloader />
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-heroRadial" />
          <div className="absolute inset-0 bg-dots opacity-[0.4]" />
        </div>
        <Navbar />
        <main className="relative w-full overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12">
            {children}
          </div>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
