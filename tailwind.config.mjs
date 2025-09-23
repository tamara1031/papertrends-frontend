/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      backgroundImage: {
        'gradient-ai': 'linear-gradient(135deg, #8b5cf6, #ec4899, #ef4444)',
        'gradient-cs': 'linear-gradient(135deg, #3b82f6, #06b6d4, #14b8a6)',
        'gradient-math': 'linear-gradient(135deg, #10b981, #059669, #84cc16)',
        'gradient-physics': 'linear-gradient(135deg, #f97316, #f59e0b, #eab308)',
        'gradient-bio': 'linear-gradient(135deg, #059669, #10b981, #14b8a6)',
        'gradient-econ': 'linear-gradient(135deg, #f43f5e, #ec4899, #d946ef)',
        'gradient-stat': 'linear-gradient(135deg, #64748b, #6b7280, #71717a)',
        'gradient-eng': 'linear-gradient(135deg, #f97316, #f59e0b, #eab308)',
        'gradient-other': 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
      }
    },
  },
  plugins: [],
}
