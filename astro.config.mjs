// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://papertrends.vercel.app',
  integrations: [react()],
  
  // Enable static site generation
  output: 'static',
  
  // Configure build options
  build: {
    assets: 'assets'
  },
  
  // Vite configuration
  vite: {
    plugins: [
      tailwindcss({
        configFile: './tailwind.config.mjs'
      })
    ],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  },
  
  // Performance optimizations
  compressHTML: true,
  
  // Security headers
  security: {
    checkOrigin: true
  }
});