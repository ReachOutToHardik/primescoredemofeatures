import type { Metadata } from 'next'
import Services from '../../src/views/Services'

export const metadata: Metadata = {
  title: 'Services — Credit Repair, CIBIL Dispute & Score Improvement',
  description: 'Explore Primescore services: credit report rectification, loan settlement dispute, credit card error removal, and ongoing score monitoring.',
}

export default function ServicesPage() {
  return <Services />
}
