import type { Metadata } from 'next'
import SipCalculator from '../../../src/views/tools/SipCalculator'

export const metadata: Metadata = {
  title: 'SIP Calculator — Calculate Mutual Fund Returns',
  description: 'Use our SIP calculator to estimate the future value of your monthly mutual fund investments. Calculate compounding growth and wealth creation easily.',
}

export default function SipPage() {
  return <SipCalculator />
}
