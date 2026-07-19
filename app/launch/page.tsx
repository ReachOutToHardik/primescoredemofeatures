import type { Metadata } from 'next'
import Launch from '../../src/views/Launch'

export const metadata: Metadata = {
  title: 'Launch — Initialize Primescore Portal',
  description: 'Enter the operational portal launch system.',
}

export default function LaunchPage() {
  return <Launch />
}
