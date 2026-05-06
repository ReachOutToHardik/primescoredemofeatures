import type { Metadata } from 'next'
import Blog from '../../src/views/Blog'

export const metadata: Metadata = {
  title: 'Knowledge Hub — Credit & Finance Guides for Indians',
  description: 'Expert articles and guides on improving CIBIL score, understanding credit bureaus, loan settlement, and managing your personal finances in India.',
}

export default function BlogPage() {
  return <Blog />
}
