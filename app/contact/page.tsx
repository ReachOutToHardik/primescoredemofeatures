import type { Metadata } from 'next'
import Contact from '../../src/views/Contact'

export const metadata: Metadata = {
  title: 'Contact Us — Speak to a Credit Expert',
  description: 'Get in touch with Primescore. Book a free consultation with our credit repair experts and start your journey to a better CIBIL score today.',
}

export default function ContactPage() {
  return <Contact />
}
