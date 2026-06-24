import { createClient } from '@supabase/supabase-js'
import BlogPostClient from '../../../../src/views/BlogPost'
import { getDictionary } from '../../../../src/lib/get-dictionary'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params
  if (!supabase) return { title: 'Article Not Found' }
  const { data: post } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  
  if (!post) return { title: 'Article Not Found' }
  return {
    title: `${post.title} | Primescore`,
    description: post.excerpt,
    alternates: {
      canonical: `https://www.primescore.in/${locale}/blog/${slug}`,
      languages: {
        'en-IN': `https://www.primescore.in/blog/${slug}`,
        'hi-IN': `https://www.primescore.in/hi/blog/${slug}`,
        'ta-IN': `https://www.primescore.in/ta/blog/${slug}`,
        'te-IN': `https://www.primescore.in/te/blog/${slug}`,
        'kn-IN': `https://www.primescore.in/kn/blog/${slug}`,
        'ml-IN': `https://www.primescore.in/ml/blog/${slug}`,
        'mr-IN': `https://www.primescore.in/mr/blog/${slug}`,
        'gu-IN': `https://www.primescore.in/gu/blog/${slug}`,
        'bn-IN': `https://www.primescore.in/bn/blog/${slug}`,
        'pa-IN': `https://www.primescore.in/pa/blog/${slug}`,
      }
    }
  }
}

export default async function LocalizedBlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale)
  
  if (!supabase) return <BlogPostClient initialPost={null} dict={dict} locale={locale} />
  const { data: post } = await supabase.from('blogs').select('*').eq('slug', slug).single()
  
  return <BlogPostClient initialPost={post} dict={dict} locale={locale} />
}
