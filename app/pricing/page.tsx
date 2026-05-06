import type { Metadata } from 'next'
import Pricing from '../../src/views/Pricing'

export const metadata: Metadata = {
  title: 'Pricing — Transparent Credit Repair Plans',
  description: 'View Primescore pricing plans for credit rectification. No hidden fees. Choose a plan that fits your needs and start your credit recovery journey today.',
}

export default function PricingPage() {
  return <Pricing />
}
