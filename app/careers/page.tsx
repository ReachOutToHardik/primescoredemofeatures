import type { Metadata } from 'next'
import Careers from '../../src/views/Careers'

export const metadata: Metadata = {
  title: 'Careers & Internships | Primescore',
  description: 'Join the team building India\'s first autonomous credit recovery engine. We are looking for engineers, copywriters, and credit experts.',
}

export default function CareersPage() {
  return <Careers />
}
