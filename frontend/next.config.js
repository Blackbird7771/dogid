/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel will handle the output
  // output: 'export', // Commented out for Vercel deployment
  // Image optimization can be enabled on Vercel
  images: {
    domains: ['images.unsplash.com'],
  },
  // Environment variables
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://localhost:8000',
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
  // Add trailing slash for better compatibility
  trailingSlash: true,
}

module.exports = nextConfig 