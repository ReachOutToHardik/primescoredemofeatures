import type { Metadata } from 'next'
import HowItWorks from '../../src/views/HowItWorks'

export const metadata: Metadata = {
  title: 'How It Works — Our 3-Step Credit Rectification Process',
  description: 'Learn how Primescore helps you fix your CIBIL score in 3 simple steps. Upload your report, we dispute errors, and you see results in 90 days.',
}

export default function HowItWorksPage() {
  return <HowItWorks />
}
