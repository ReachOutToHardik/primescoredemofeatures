import type { Metadata } from 'next'
import EmiCalculator from '../../../src/views/tools/EmiCalculator'

export const metadata: Metadata = {
  title: 'EMI Calculator — Calculate Your Loan EMI Instantly',
  description: 'Use our free EMI calculator to calculate your monthly loan installment, total interest payable, and total amount for home, car or personal loans.',
}

export default function EmiPage() {
  return <EmiCalculator />
}
