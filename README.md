# PaperTrends Frontend

PaperTrends is an open-source static web application for academic research trend analysis. Built with Next.js and deployable to Cloudflare Pages.

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
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher

### Environment Setup with anyenv + nodenv + pnpm

1. **Install anyenv** (if not already installed):
 
Follow instructions at https://github.com/anyenv/anyenv
  
2. **Install nodenv**:
```bash
# Install nodenv
anyenv install nodenv

# Install the latest LTS version of Node.js
nodenv install 24.8.0
nodenv local 24.8.0

# Verify installed version
node --version
```

3. **Install pnpm**:
```bash
# Install pnpm globally
npm install -g pnpm@latest

# Verify version
pnpm --version
```

4. **Project Setup**:
```bash
# Navigate to project directory
cd /home/yamato/papertrends-frontend

# Install dependencies (automatically selects optimal package manager)
./install-deps.sh

# Or install manually
pnpm install    # if pnpm is available
# or
npm install     # if using npm
# or
yarn install    # if using yarn

# Start development server
pnpm dev        # if pnpm is available
# or
npm run dev     # if using npm
# or
yarn dev        # if using yarn
```

### Automated Setup Scripts

```bash
# Run setup script
./setup.sh

# Or install dependencies only
./install-deps.sh
```

## Development

### Available Scripts

```bash
# Start development server (http://localhost:3000)
pnpm dev          # or npm run dev / yarn dev

# Production build
pnpm build        # or npm run build / yarn build

# Start production server
pnpm start        # or npm start / yarn start

# Run linter
pnpm lint         # or npm run lint / yarn lint

# Auto-fix linter issues
pnpm lint:fix     # or npm run lint:fix / yarn lint:fix

# TypeScript type checking
pnpm type-check   # or npm run type-check / yarn type-check

# Export static site (for Cloudflare Pages)
pnpm export       # or npm run export / yarn export

# Clear cache
pnpm clean        # or npm run clean / yarn clean

# Analyze bundle size
pnpm analyze      # or npm run analyze / yarn analyze
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
│   │   ├── Header.tsx     # Header component
│   │   └── Footer.tsx     # Footer component
│   ├── charts/            # Chart related
│   │   ├── BubbleChart.tsx  # Bubble chart
│   │   └── StackAreaChart.tsx # Stack area chart
│   └── dashboard/         # Dashboard specific
│       ├── CategoryPageClient.tsx
│       ├── SubcategoryPageClient.tsx
│       └── PaperList.tsx
├── lib/                   # Utilities and libraries
│   ├── data/              # Data related
│   │   ├── index.ts       # Mock data
│   │   └── arxiv-categories.ts
│   ├── types/             # Type definitions
│   │   └── index.ts
│   └── theme.tsx          # Theme management
└── hooks/                 # Custom hooks
```

## Deployment to Cloudflare Pages

### Method 1: Via Cloudflare Pages Dashboard

1. **Prepare GitHub Repository**:
   - Push this project to a GitHub repository
   - Set repository as public or private

2. **Configure in Cloudflare Pages**:
   - Access [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Select GitHub repository
   - Create project with the following settings:
     - **Framework preset**: Next.js (Static HTML Export)
     - **Build command**: `pnpm run build`
     - **Build output directory**: `out`
     - **Root directory**: `/` (project root)

3. **Set Environment Variables** (if needed):
   - Set environment variables in Cloudflare Pages dashboard
   - `NEXT_PUBLIC_BASE_URL`: Set production base URL
   - Example: `https://your-domain.com/papertrends-frontend`
   - For local development, `http://localhost:3000` is used by default

4. **Deploy**:
   - Click "Save and Deploy"
   - Build will complete and deploy automatically

### Method 2: Using Wrangler CLI

1. **Install Wrangler**:
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Build Static Site**:
```bash
pnpm run build
```

4. **Deploy to Cloudflare Pages**:
```bash
pnpm dlx wrangler pages deploy out --project-name papertrends-frontend
```

### Method 3: Using GitHub Actions (Recommended)

1. **Create GitHub Actions Workflow File**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: papertrends-frontend
          directory: out
```

2. **Set GitHub Secrets**:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID

## Customization

### Changing Data

Edit the `src/lib/data/index.ts` file to modify the displayed data:

- `categories`: Research field categories
- `generateMockData()`: Mock data for charts
- `generateBubbleChartData()`: Mock data for Bubble Chart (main visualization)
- `papers`: Paper data to display

### Bubble Chart Data Structure (Main Visualization)

Bubble Chart is the main visualization method of this application. It requires data with the following JSON structure:

```json
{
  "topics": [
    {
      "name": "Topic Name",
      "frequency": number,
      "color": "Color Code (optional)",
      "words": [
        {
          "name": "Word Name",
          "size": number,
          "importance": number (0.0-1.0),
          "topic": "Parent Topic Name"
        }
      ]
    }
  ],
  "correlations": [
    {
      "source": "Topic Name",
      "target": "Topic Name",
      "strength": number (0.0-1.0)
    }
  ]
}
```

#### Data Field Descriptions

**Topics**
- `name`: Topic name (e.g., "Deep Learning", "Natural Language Processing")
- `frequency`: Topic occurrence frequency (reflected in circle size)
- `color`: Topic color (hex color code, optional)
- `words`: Array of words belonging to this topic

**Words**
- `name`: Word name (e.g., "neural networks", "transformer")
- `size`: Word size (reflected in circle size)
- `importance`: Word importance (0.0-1.0, reflected in circle size)
- `topic`: Parent topic name

**Correlations**
- `source`: Source topic name for correlation
- `target`: Target topic name for correlation
- `strength`: Correlation strength (0.0-1.0, used in force simulation)

#### Visualization Features

1. **Topic Level**: Outer large circles represent topics
   - Circle size based on `frequency`
   - Color from `color` field or auto-assigned

2. **Word Level**: Small circles packed inside topics represent words
   - Circle size based on `importance`
   - Displayed in topic color

3. **Correlations**: Force simulation represents relationships between topics
   - Force strength adjusted based on `strength` in `correlations` array
   - Topics positions interactively adjusted

### Environment Variables

Create a `.env.local` file to set the following environment variables:

```bash
# For local development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# For production
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Style Customization

Edit `src/app/globals.css` and `tailwind.config.js` to customize styles.

### Adding New Charts

Add new chart components to the `src/components/charts/` directory.

## Troubleshooting

### Common Issues

1. **Build Errors**:
   - Ensure Node.js version is 18.0.0 or higher
   - Re-run `pnpm install`
   - Delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install`

2. **D3.js Errors**:
   - Check browser console for errors
   - Verify D3.js version compatibility

3. **Cloudflare Pages Deployment Errors**:
   - Verify build command and output directory are correct
   - Check `next.config.js` configuration

### Log Checking

```bash
# Development server logs
pnpm dev

# Build logs
pnpm build

# Type check logs
pnpm type-check

# Linter logs
pnpm lint

# Cloudflare Pages build logs are available in the dashboard
```

## License

MIT License

## Contributing

Pull requests and issue reports are welcome.

## Support

If you encounter any issues, please report them via GitHub issues.