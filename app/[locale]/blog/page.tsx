import { createClient } from '@supabase/supabase-js'
import Blog from '../../../src/views/Blog'
import { getDictionary } from '../../../src/lib/get-dictionary'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const title = dict?.blog?.title || 'Knowledge Hub'
  const subtitle = dict?.blog?.subtitle || 'Expert guides and CIBIL improvement insights.'
  
  return {
    title: `${title} | Primescore`,
    description: subtitle,
    alternates: {
      canonical: `https://www.primescore.in/${locale}/blog`,
      languages: {
        'en-IN': 'https://www.primescore.in/blog',
        'hi-IN': 'https://www.primescore.in/hi/blog',
        'ta-IN': 'https://www.primescore.in/ta/blog',
        'te-IN': 'https://www.primescore.in/te/blog',
        'kn-IN': 'https://www.primescore.in/kn/blog',
        'ml-IN': 'https://www.primescore.in/ml/blog',
        'mr-IN': 'https://www.primescore.in/mr/blog',
        'gu-IN': 'https://www.primescore.in/gu/blog',
        'bn-IN': 'https://www.primescore.in/bn/blog',
        'pa-IN': 'https://www.primescore.in/pa/blog',
      }
    }
  }
}

export default async function LocalizedBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  
  if (!supabaseUrl || !supabaseKey) {
    return <Blog initialBlogs={[]} dict={dict} locale={locale} />
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data: blogs } = await supabase.from('blogs').select('*').order('published_at', { ascending: false })
  
  return <Blog initialBlogs={blogs || []} dict={dict} locale={locale} />
}
