import type { Metadata } from 'next'
import DashboardDemoView from '../../src/views/DashboardDemoView'

export const metadata: Metadata = {
  title: 'Multi-Bureau Credit Dashboard Demo — Primescore',
  description: 'Interactive preview of the Primescore Multi-Bureau Credit Dashboard. Track CIBIL, Experian, Equifax, and CRIF High Mark credit scores in one place.',
}

export default function DashboardPage() {
  return <DashboardDemoView />
}
