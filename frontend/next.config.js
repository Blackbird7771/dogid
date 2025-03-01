/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable image optimization for Netlify compatibility
  images: {
    domains: ['images.dog.ceo', 'dog.ceo'],
    unoptimized: true,
  },
  output: 'export',
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
  // Environment variables
  env: {
    API_URL: process.env.API_URL || 'https://api.dogid.app',
  },
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 