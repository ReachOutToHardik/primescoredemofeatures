import type { Metadata } from 'next'
import Dashboard from '../../src/views/Dashboard'

export const metadata: Metadata = {
  title: 'Dashboard — Track Your Credit Score Progress',
  description: 'Monitor your credit score improvement journey with the Primescore dashboard.',
}

import { redirect } from 'next/navigation'

export default function DashboardPage() {
  redirect('https://dashboard.primescore.in')
}
