import type { Metadata } from 'next'
import GstCalculator from '../../../src/views/tools/GstCalculator'

export const metadata: Metadata = {
  title: 'GST Calculator — Add or Remove GST Instantly',
  description: 'Free online GST calculator for India. Add or remove GST at 5%, 12%, 18%, or 28% slabs. Get instant CGST and SGST breakdown.',
}

export default function GstPage() {
  return <GstCalculator />
}
