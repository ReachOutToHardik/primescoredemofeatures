import type { Metadata } from 'next'
import CityService from '../../../../src/views/CityService'

type Props = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ')
  return {
    title: `Credit Rectification in ${cityName} — CIBIL Score Repair Experts`,
    description: `Primescore provides expert credit rectification services in ${cityName}. Fix CIBIL errors, remove defaults, and improve your credit score in 90 days.`,
  }
}

export async function generateStaticParams() {
  const cities = [
    'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar',
    'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar', 'Jhunjhunu', 'Chittorgarh', 'Jaisalmer', 'Nagaur',
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
    'Pune', 'Lucknow', 'Kanpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana'
  ]
  return cities.map(city => ({
    city: city.toLowerCase().replace(/\s+/g, '-')
  }))
}

export default async function CityServicePage({ params }: Props) {
  const { city } = await params
  return <CityService city={city} />
}
