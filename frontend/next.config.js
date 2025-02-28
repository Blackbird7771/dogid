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
    // Disable image optimization in production if causing issues
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // Ensure environment variables are available
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://localhost:8000',
  },
  // Add experimental configuration for path resolution
  experimental: {
    esmExternals: 'loose',
  },
  // Add output configuration for better Netlify compatibility
  output: 'export',
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,
  // Prevent Netlify from trying to use serverless functions
  target: 'serverless',
}

module.exports = nextConfig 