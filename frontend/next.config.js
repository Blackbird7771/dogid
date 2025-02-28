/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure environment variables are available
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
  // Add experimental configuration for path resolution
  experimental: {
    esmExternals: 'loose',
  }
}

module.exports = nextConfig 