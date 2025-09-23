const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
  
  // Optional: Change the output directory `out` -> `dist` (keeping `out` for Cloudflare Pages)
  // distDir: 'out',
  
  // Image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Enable dynamic routing for 404 handling
  experimental: {
    // Remove deprecated experimental features
  },
  
  // Webpack configuration for better module resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  }
}

module.exports = nextConfig
