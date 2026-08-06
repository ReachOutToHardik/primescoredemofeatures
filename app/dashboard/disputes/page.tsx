import type { Metadata } from 'next'
import DashboardDisputesView from '../../../src/views/DashboardDisputesView'

export const metadata: Metadata = {
  title: 'Rectification Cases & Disputes — Primescore',
  description: 'Manage and track the progress of your multi-bureau credit disputes.',
}

export default function DisputesPage() {
  return <DashboardDisputesView />
}
