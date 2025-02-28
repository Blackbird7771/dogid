/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next.js 14 needs this for static exports
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Environment variables
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://localhost:8000',
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
  // Add trailing slash for better static hosting compatibility
  trailingSlash: true,
}

module.exports = nextConfig 