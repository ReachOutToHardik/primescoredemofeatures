import type { Metadata } from 'next'
import BusinessPricing from '../../../src/views/BusinessPricing'

export const metadata: Metadata = {
  title: 'Corporate Credit Pricing Plans | Primescore Business',
  description: 'Select standard half-yearly and yearly monitoring subscriptions or unlimited corporate credit rectification support models.',
}

export default function CorporatePricingPage() {
  return <BusinessPricing />
}
