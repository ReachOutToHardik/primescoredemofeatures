import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import BlogPostClient from '../../../src/views/BlogPost'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const { data: blogs } = await supabase.from('blogs').select('slug')
  return (blogs || []).map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { data: post } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  
  return <BlogPostClient initialPost={post} />
}
