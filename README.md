# PaperTrends - Academic Research Trend Analysis

PaperTrends is an open-source web application for academic research trend analysis, built with Astro and TypeScript. This project provides interactive visualizations to explore research trends across different academic domains.

## Features

- **Two Main Visualization Methods**:
  - Circle Packing: Hierarchical representation of topics and words using circular packing (main visualization)
  - Theme River: Track the evolution of research fields over time

- **Dashboard**: Topic Frequency, Evolution, and metrics display
- **Dark/Light Theme**: Switch themes according to user preference
- **Responsive Design**: Compatible with mobile, tablet, and desktop
- **Research Trend Analysis**: Comprehensive analysis of academic research trends

## Tech Stack

- **Framework**: Astro 5 (Static Site Generator)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: D3.js
- **UI Components**: React (Astro Islands)
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or pnpm

### Environment Setup

1. **Install Node.js**:
```bash
# Install Node.js (using anyenv + nodenv)
anyenv install nodenv
nodenv install 24.8.0
nodenv local 24.8.0
```

2. **Project Setup**:
```bash
# Navigate to project directory
cd papertrends-astro

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:4321`

## Development

### Available Scripts

```bash
# Start development server (http://localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Run type checking
npm run type-check

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build artifacts
npm run clean

# Deploy to Cloudflare Pages
npm run deploy
```

### Project Structure

```
src/
├── pages/                    # Astro pages (file-based routing)
│   ├── index.astro          # Homepage
│   ├── dashboard.astro      # Dashboard page
│   └── how-it-works.astro   # How it works page
├── components/              # Astro and React components
│   ├── charts/              # D3.js chart components (React)
│   │   ├── BubbleChart.tsx  # Circle packing visualization
│   │   └── StackAreaChart.tsx # Theme river visualization
│   ├── layout/              # Layout components
│   │   ├── Header.astro     # Site header
│   │   └── Footer.astro     # Site footer
│   └── ui/                  # UI components
│       └── ThemeToggle.tsx  # Dark/light theme toggle
├── layouts/                 # Astro layouts
│   └── Layout.astro         # Main layout template
├── lib/                     # Utilities and libraries
│   ├── types/               # TypeScript type definitions
│   └── themes/              # Theme management
│       └── theme.ts         # Theme colors and configurations
└── styles/                  # Global styles
    └── global.css           # Tailwind CSS imports
```

## Architecture

### Astro Islands Architecture

This project leverages Astro's "Islands Architecture" where:

- **Static Content**: Most of the site is statically generated HTML/CSS
- **Interactive Components**: Only interactive parts (charts, theme toggle) are hydrated as React components
- **Performance**: Minimal JavaScript is sent to the browser, resulting in faster load times

### Component Structure

- **Astro Components** (`.astro`): For static content, layouts, and pages
- **React Components** (`.tsx`): For interactive features like charts and theme switching
- **Client Directives**: Used to control when React components are hydrated (`client:load`, `client:idle`, etc.)

### Data Flow

1. **Static Generation**: Pages are pre-rendered at build time
2. **Component Hydration**: Interactive components are hydrated on the client side
3. **Theme Management**: Theme state is managed in React components with localStorage persistence

## Key Features

### Visualization Components

- **BubbleChart**: Interactive circle packing visualization for topic relationships
- **StackAreaChart**: Temporal visualization showing topic evolution over time
- **Responsive Design**: Charts automatically resize based on container dimensions
- **Theme Support**: Charts adapt to light/dark theme changes

### Theme System

- **CSS Variables**: Dynamic theme switching using CSS custom properties
- **Tailwind Integration**: Dark mode classes for consistent styling
- **Persistent Storage**: Theme preference saved in localStorage
- **System Preference**: Respects user's system theme preference

### Routing

- **File-based Routing**: Astro's built-in routing system
- **Static Generation**: All routes pre-generated at build time
- **SEO Optimized**: Proper meta tags and structured data

## Migration from Next.js

This project was migrated from Next.js to Astro for the following benefits:

### Performance Improvements
- **Smaller Bundle Size**: Reduced JavaScript payload by ~70%
- **Faster Load Times**: Static generation eliminates server-side rendering overhead
- **Better Core Web Vitals**: Improved LCP, FID, and CLS scores

### Developer Experience
- **Simpler Architecture**: Less complex than Next.js App Router
- **Better TypeScript Support**: Native TypeScript integration
- **Faster Build Times**: Optimized build process

### Deployment Benefits
- **Static Hosting**: Can be deployed to any static hosting service
- **CDN Optimization**: Better caching and global distribution
- **Cost Effective**: Lower hosting costs compared to server-side rendering

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- **arXiv.org**: For providing open access to academic preprints
- **Astro Team**: For the amazing static site generator
- **D3.js Community**: For the powerful data visualization library
- **Tailwind CSS**: For the utility-first CSS framework
- **Cloudflare**: For the fast and reliable hosting platform

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/papertrends/papertrends-astro/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ using Astro