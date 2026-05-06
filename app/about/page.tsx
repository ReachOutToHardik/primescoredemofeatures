import type { Metadata } from 'next'
import About from '../../src/views/About'

export const metadata: Metadata = {
  title: 'About Us — Primescore Credit Experts',
  description: 'Learn about Primescore, an iStart (Govt. of Rajasthan) recognized startup helping Indians recover their financial freedom through expert credit rectification.',
}

export default function AboutPage() {
  return <About />
}
