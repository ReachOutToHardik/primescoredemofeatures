import type { Metadata } from 'next'
import Home from '../../src/views/Home'

export const metadata: Metadata = {
  title: 'PrimeScore AI — Autonomous Credit Rectification',
  description: 'India\'s first AI agent built specifically to audit bureau reports, draft legally-backed bank disputes, and optimize your credit recovery journey 24/7.',
}

export default function AiHomePage() {
  return <Home />
}
