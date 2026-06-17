/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
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
        source: '/services/credit-rectification-in-:city',
        destination: '/services/credit-rectification/:city',
        permanent: true,
      },
      {
        source: '/credit-rectification-in-:city',
        destination: '/services/credit-rectification/:city',
        permanent: true,
      },
      {
        source: '/services/credit-rectification-in:city', // Catches merged like 'inudaipur'
        destination: '/services/credit-rectification/:city',
        permanent: true,
      },
      {
        source: '/credit-rectification-in:city', // Catches merged like 'inudaipur'
        destination: '/services/credit-rectification/:city',
        permanent: true,
      }
    ]
  }
}

export default nextConfig
