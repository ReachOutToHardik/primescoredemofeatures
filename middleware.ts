import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  const path = url.pathname

  // 1. Force www. domain redirect (solves the Google non-www 404 issue)
  if (hostname === 'primescore.in') {
    const newUrl = new URL(request.url)
    newUrl.hostname = 'www.primescore.in'
    return NextResponse.redirect(newUrl, 301)
  }

  // 2. Catch old SEO patterns: /services/credit-rectification-in-udaipur
  const match = path.match(/^\/(?:services\/)?credit-rectification-in-?(.*)$/i)
  if (match && match[1]) {
    const city = match[1]
    const newUrl = new URL(`/services/credit-rectification/${city}`, request.url)
    // Ensure we redirect to the www domain if needed
    if (hostname === 'primescore.in') {
      newUrl.hostname = 'www.primescore.in'
    }
    return NextResponse.redirect(newUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
