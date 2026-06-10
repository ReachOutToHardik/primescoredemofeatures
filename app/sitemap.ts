import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-static'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const CITIES = [
  'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar',
  'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar', 'Jhunjhunu', 'Chittorgarh', 'Jaisalmer', 'Nagaur',
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
  'Pune', 'Lucknow', 'Kanpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana'
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://primescore.in'
  
  const coreRoutes = [
    '',
    '/services',
    '/pricing',
    '/about',
    '/blog',
    '/contact',
    '/tools/ifsc',
    '/tools/emi',
    '/tools/emi-comparison',
    '/tools/gst',
    '/tools/sip',
    '/tools/fd',
    '/privacy',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/tools') ? 0.9 : 0.8,
  }))

  const cityRoutes = CITIES.map(city => ({
    url: `${baseUrl}/services/credit-rectification/${city.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data: blogs } = await supabase.from('blogs').select('slug, published_at')

  const blogRoutes = (blogs || []).map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...coreRoutes, ...cityRoutes, ...blogRoutes]
}
