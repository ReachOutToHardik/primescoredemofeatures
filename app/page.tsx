import type { Metadata } from 'next'
import Home from '../src/views/Home'

export const metadata: Metadata = {
  title: 'Primescore — Fix Your CIBIL Score. Unlock Your Future.',
  description: 'Primescore helps you dispute credit report errors and boost your CIBIL score legally in 90 days. Trusted by 50,000+ Indians.',
}

export default function HomePage() {
  return <Home />
}
