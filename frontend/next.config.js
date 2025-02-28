/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for Netlify
  images: {
    unoptimized: true, // Required for static export
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