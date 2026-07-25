import type { Metadata } from 'next'
import DashboardDisputesView from '../../../src/views/DashboardDisputesView'

export const metadata: Metadata = {
  title: 'Rectification Cases & Disputes — Primescore Dashboard',
  description: 'Manage and track the progress of your credit disputes across CIBIL, Experian, Equifax, and CRIF.',
}

export default function DisputesPage() {
  return <DashboardDisputesView />
}
