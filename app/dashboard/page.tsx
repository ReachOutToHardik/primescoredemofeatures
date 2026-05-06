import type { Metadata } from 'next'
import Dashboard from '../../src/views/Dashboard'

export const metadata: Metadata = {
  title: 'Dashboard — Track Your Credit Score Progress',
  description: 'Monitor your credit score improvement journey with the Primescore dashboard.',
}

export default function DashboardPage() {
  return <Dashboard />
}
