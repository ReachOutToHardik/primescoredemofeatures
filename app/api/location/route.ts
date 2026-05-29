import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP'
  const city = request.headers.get('x-vercel-ip-city') || 'Unknown City'
  const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown Region'
  const country = request.headers.get('x-vercel-ip-country') || 'Unknown Country'

  // If local development, we might not have vercel headers
  let location = `${city}, ${region}, ${country}`
  if (city === 'Unknown City' && country === 'Unknown Country') {
    location = 'Local Network / Unidentified'
  }

  return NextResponse.json({
    ip,
    location
  })
}
