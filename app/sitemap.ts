import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const CITIES = [
  'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar',
  'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar', 'Jhunjhunu', 'Chittorgarh', 'Jaisalmer', 'Nagaur',
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
  'Pune', 'Lucknow', 'Kanpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
  'Vadodara', 'Ghaziabad', 'Ludhiana'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://primescore.in'
  
  const coreRoutes = [
    '',
    '/services',
    '/how-it-works',
    '/pricing',
    '/about',
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

  return [...coreRoutes, ...cityRoutes]
}
