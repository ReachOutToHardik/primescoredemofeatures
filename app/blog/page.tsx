import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import Blog from '../../src/views/Blog'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const metadata: Metadata = {
  title: 'Knowledge Hub — Credit & Finance Guides for Indians',
  description: 'Expert articles and guides on improving CIBIL score, understanding credit bureaus, loan settlement, and managing your personal finances in India.',
}

export default async function BlogPage() {
  if (!supabaseUrl || !supabaseKey) return <Blog initialBlogs={[]} />
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data: blogs } = await supabase.from('blogs').select('*').order('published_at', { ascending: false })
  
  return <Blog initialBlogs={blogs || []} />
}
