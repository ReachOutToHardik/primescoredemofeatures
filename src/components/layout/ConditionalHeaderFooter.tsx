'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppWidget from '../ui/WhatsAppWidget'
import TimedPopup from '../ui/TimedPopup'

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/business') || pathname?.startsWith('/dashboard')) return null
  return <Navbar />
}

export function ConditionalFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/business') || pathname?.startsWith('/dashboard')) return null
  return (
    <>
      <Footer />
      <TimedPopup />
      <WhatsAppWidget />
    </>
  )
}
