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

export const dynamic = 'force-dynamic'

export default async function CityServicePage({ params }: Props) {
  const { city } = await params
  return <CityService city={city} />
}
