import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('x-forwarded-host') || request.headers.get('host') || ''
  const hostnameFromHeader = hostHeader.split(':')[0].toLowerCase()
  const hostnameFromUrl = request.nextUrl.hostname.toLowerCase()

  // Redirect all non-www traffic to www with full path preserved
  if (hostnameFromHeader === 'primescore.in' || hostnameFromUrl === 'primescore.in') {
    const pathname = request.nextUrl.pathname
    const search = request.nextUrl.search
    // Explicitly construct the https www URL to avoid internal URL issues
    const redirectUrl = `https://www.primescore.in${pathname}${search}`
    return NextResponse.redirect(redirectUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
