# PaperTrends Frontend

PaperTrends is an open-source web application for academic research trend analysis. Built with Next.js and TypeScript.

## Features

- **Two Main Visualization Methods**:
  - Circle Packing: Hierarchical representation of topics and words using circular packing (main visualization)
  - Theme River: Track the evolution of research fields over time

- **Dashboard**: Topic Frequency, Evolution, and metrics display
- **Dark/Light Theme**: Switch themes according to user preference
- **Responsive Design**: Compatible with mobile, tablet, and desktop
- **Category-based Analysis**: Supports arXiv categories

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: D3.js

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher

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
cd papertrends-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development

### Available Scripts

```bash
# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# TypeScript type checking
npm run type-check
```

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard related
│   │   ├── dashboard/     # Dashboard pages
│   │   └── category/[categoryId]/[subcategoryId]/
│   ├── (marketing)/       # Marketing related
│   │   ├── page.tsx       # Homepage
│   │   └── category/[categoryId]/
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/            # Layout related
│   ├── charts/            # Chart related
│   └── dashboard/         # Dashboard specific
├── lib/                   # Utilities and libraries
│   ├── data/              # Data related
│   ├── types/             # Type definitions
│   └── theme.tsx          # Theme management
└── hooks/                 # Custom hooks
```

## License

MIT License

## Deployment

### Cloudflare Pages

This project is configured for deployment to Cloudflare Pages with static export.

#### Prerequisites

1. **Install Wrangler CLI**:
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

#### Deployment Commands

```bash
# Build the project for static export
npm run build

# Deploy to Cloudflare Pages
npm run deploy

# Preview locally (optional)
npm run preview
```

#### Configuration

- **Static Export**: Configured in `next.config.js` with `output: 'export'`
- **Output Directory**: `out/` (default for Cloudflare Pages)
- **Wrangler Config**: `wrangler.toml` contains basic Cloudflare Pages settings

#### Environment Variables

If you need environment variables for your Cloudflare Pages deployment:

1. Go to your Cloudflare Pages dashboard
2. Navigate to Settings → Environment Variables
3. Add your required variables

## Contributing

Pull requests and issue reports are welcome.