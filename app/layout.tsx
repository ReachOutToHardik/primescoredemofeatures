import type { Metadata } from 'next'
import { Sora, DM_Sans, JetBrains_Mono, Caveat } from 'next/font/google'
import '../src/index.css'
import Navbar from '../src/components/layout/Navbar'
import Footer from '../src/components/layout/Footer'
import Preloader from '../src/components/ui/Preloader'
import AiChatWidget from '../src/components/ui/AiChatWidget'

const sora = Sora({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-outfit' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })


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
    <html lang="en" className={`${sora.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <body className="relative min-h-screen bg-night font-body text-brandNavy">
        <Preloader />
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-heroRadial" />
          <div className="absolute inset-0 bg-dots opacity-[0.4]" />
        </div>
        <Navbar />
        <main className="relative w-full">
          {children}
        </main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  )
}
