import type { Metadata } from 'next'
import EmiComparisonCalculator from '../../../src/views/tools/EmiComparisonCalculator'

export const metadata: Metadata = {
  title: 'EMI Comparison Calculator — Compare Loan Offers Side-by-Side',
  description: 'Use our free EMI Comparison calculator to compare two loan offers side-by-side. See monthly savings, total interest saved, and total payments.',
}

export default function EmiComparisonPage() {
  return <EmiComparisonCalculator />
}
