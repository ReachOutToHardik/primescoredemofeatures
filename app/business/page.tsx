import type { Metadata } from 'next'
import Business from '../../src/views/Business'

export const metadata: Metadata = {
  title: 'Primescore for Business | Corporate Credit Audits & Vendor Monitoring',
  description: 'Dispute commercial reporting errors, correct company PAN mappings, audit duplicate loan lines, and track supplier credit risks.',
}

export default function BusinessPage() {
  return <Business />
}
