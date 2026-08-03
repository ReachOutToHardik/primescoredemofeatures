/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'primescore.in' }],
        destination: 'https://www.primescore.in/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
