import type { Metadata } from 'next'
import AdminPortal from '../../src/views/AdminPortal'

export const metadata: Metadata = {
  title: 'Admin Portal - Primescore',
}

export default function AdminPage() {
  return <AdminPortal />
}
