# Deployment Guide - Cloudflare Pages

This guide covers deploying PaperTrends to Cloudflare Pages, a fast and reliable static hosting platform.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install the Cloudflare CLI tool
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, etc.)

## Installation

### Install Wrangler CLI

```bash
# Install globally
npm install -g wrangler

# Or use npx (recommended)
npx wrangler --version
```

### Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate with your Cloudflare account.

## Deployment Methods

### Method 1: Git Integration (Recommended)

This method automatically deploys when you push to your repository.

#### 1. Connect Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Choose **Connect to Git**
4. Select your Git provider (GitHub, GitLab, etc.)
5. Choose your repository: `papertrends-astro`

#### 2. Configure Build Settings

```
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: / (leave empty)
```

#### 3. Environment Variables (if needed)

If your project requires environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add variables for different environments:
   - **Production**: `NODE_VERSION=18`
   - **Preview**: `NODE_VERSION=18`

#### 4. Deploy

1. Click **Save and Deploy**
2. Cloudflare will automatically build and deploy your site
3. Your site will be available at `https://your-project-name.pages.dev`

### Method 2: Wrangler CLI

This method allows you to deploy directly from your local machine.

#### 1. Configure Wrangler

Create a `wrangler.toml` file in your project root:

```toml
name = "papertrends-astro"
compatibility_date = "2024-01-01"

[env.production]
name = "papertrends-astro"

[env.preview]
name = "papertrends-astro-preview"
```

#### 2. Deploy Commands

```bash
# Build the project
npm run build

# Deploy to production
npx wrangler pages deploy dist

# Deploy to preview
npx wrangler pages deploy dist --env preview
```

#### 3. Custom Domain (Optional)

```bash
# Add custom domain
npx wrangler pages domain add your-domain.com your-project-name
```

## Build Configuration

### Astro Configuration

Ensure your `astro.config.mjs` is properly configured:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://your-domain.com', // Update with your actual domain
  integrations: [react()],
  output: 'static', // Important for static hosting
  build: {
    assets: 'assets'
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});
```

### Package.json Scripts

Your `package.json` should include these scripts:

```json
{
  "scripts": {
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "npm run build && npx wrangler pages deploy dist"
  }
}
```

## Performance Optimization

### Build Optimization

1. **Enable Compression**: Cloudflare automatically compresses your assets
2. **Optimize Images**: Use WebP format and appropriate sizing
3. **Minimize JavaScript**: Astro automatically minimizes JavaScript bundles
4. **CSS Optimization**: Tailwind CSS purges unused styles

### Caching Strategy

Cloudflare Pages automatically handles:
- **Static Assets**: Long-term caching with versioned filenames
- **HTML Files**: Short-term caching with revalidation
- **API Responses**: Configurable caching headers

### Core Web Vitals

Astro's static generation provides excellent Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## Custom Domain Setup

### 1. Add Domain to Cloudflare

1. Go to **Pages** → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name
4. Follow the DNS configuration instructions

### 2. DNS Configuration

Add these DNS records to your domain provider:

```
Type: CNAME
Name: www
Value: your-project-name.pages.dev

Type: A
Name: @
Value: 192.0.2.1 (Cloudflare IP)
```

### 3. SSL Certificate

Cloudflare automatically provides SSL certificates for custom domains.

## Environment-Specific Deployments

### Production Environment

```bash
# Deploy to production
npm run build
npx wrangler pages deploy dist --env production
```

### Preview Environment

```bash
# Deploy to preview
npm run build
npx wrangler pages deploy dist --env preview
```

### Staging Environment

```bash
# Deploy to staging
npm run build
npx wrangler pages deploy dist --env staging
```

## Monitoring and Analytics

### Cloudflare Analytics

1. Go to **Analytics** → **Web Analytics**
2. Enable analytics for your Pages project
3. View metrics including:
   - Page views
   - Unique visitors
   - Core Web Vitals
   - Geographic distribution

### Performance Monitoring

Monitor your site's performance:
- **Page Speed Insights**: Google's performance tool
- **WebPageTest**: Detailed performance analysis
- **Cloudflare Speed Test**: CDN performance metrics

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint
```

#### Deployment Issues

```bash
# Check Wrangler configuration
npx wrangler pages project list

# Check deployment status
npx wrangler pages deployment list --project-name=papertrends-astro
```

#### Performance Issues

1. **Check Bundle Size**: Use `npm run build` to see bundle sizes
2. **Optimize Images**: Compress and resize images
3. **Review Dependencies**: Remove unused dependencies
4. **Enable Compression**: Ensure Cloudflare compression is enabled

### Debug Commands

```bash
# Preview build locally
npm run preview

# Check Astro configuration
npx astro info

# Validate project structure
npx astro check
```

## Security Considerations

### Content Security Policy

Add CSP headers in your Astro configuration:

```javascript
export default defineConfig({
  // ... other config
  vite: {
    plugins: [
      // Add CSP plugin if needed
    ]
  }
});
```

### HTTPS Enforcement

Cloudflare automatically enforces HTTPS for all Pages projects.

### DDoS Protection

Cloudflare provides automatic DDoS protection for all Pages projects.

## Backup and Recovery

### Git Repository Backup

Ensure your code is backed up in Git:
- Regular commits and pushes
- Tagged releases for stable versions
- Branch protection rules

### Data Backup

For any dynamic data:
- Regular database backups
- Export static data to JSON files
- Version control for configuration files

## Scaling Considerations

### Traffic Scaling

Cloudflare Pages automatically scales with traffic:
- Global CDN distribution
- Automatic scaling
- No server management required

### Performance Scaling

- **Edge Computing**: Use Cloudflare Workers for dynamic functionality
- **Caching**: Leverage Cloudflare's caching for better performance
- **Image Optimization**: Use Cloudflare Image Resizing

## Cost Optimization

### Cloudflare Pages Pricing

- **Free Tier**: 500 builds/month, unlimited bandwidth
- **Pro Tier**: $20/month for additional features
- **Custom Domains**: Free SSL certificates

### Optimization Tips

1. **Minimize Builds**: Use branch-based deployments efficiently
2. **Optimize Assets**: Compress images and minimize code
3. **Use CDN**: Leverage Cloudflare's global network
4. **Monitor Usage**: Track bandwidth and build usage

## Support and Resources

### Documentation

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)

### Community

- [Cloudflare Community](https://community.cloudflare.com/)
- [Astro Discord](https://astro.build/chat)
- [GitHub Issues](https://github.com/papertrends/papertrends-astro/issues)

---

For additional support, please refer to the [README.md](README.md) or create an issue in the repository.
