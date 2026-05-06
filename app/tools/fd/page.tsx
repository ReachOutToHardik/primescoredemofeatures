import type { Metadata } from 'next'
import FdCalculator from '../../../src/views/tools/FdCalculator'

export const metadata: Metadata = {
  title: 'FD Calculator — Calculate Fixed Deposit Maturity',
  description: 'Free Fixed Deposit (FD) calculator for Indian banks. Calculate maturity value and total interest earned with quarterly compounding.',
}

export default function FdPage() {
  return <FdCalculator />
}
