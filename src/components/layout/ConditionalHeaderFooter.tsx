'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppWidget from '../ui/WhatsAppWidget'

export function ConditionalHeader() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <Navbar />
}

export function ConditionalFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return (
    <>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
