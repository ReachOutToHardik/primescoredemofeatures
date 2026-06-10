import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import BlogPostClient from '../../../src/views/BlogPost'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!supabase) return { title: 'Article Not Found' }
  const { data: post } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  if (!supabase) return <BlogPostClient initialPost={null} />
  const { data: post } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  
  return <BlogPostClient initialPost={post} />
}
