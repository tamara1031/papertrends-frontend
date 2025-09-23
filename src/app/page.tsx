import { HeroSection, FeaturesSection, AboutSection } from '@/components/sections'

export const metadata = {
  title: 'PaperTrends - Academic Research Trend Analysis',
  description: 'Visualize academic research trends and discover insights across research domains.',
  keywords: 'research trends, academic analysis, data visualization, research insights',
  openGraph: {
    title: 'PaperTrends - Academic Research Trend Analysis',
    description: 'Visualize academic research trends and discover insights across research domains.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: 'PaperTrends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaperTrends - Academic Research Trend Analysis',
    description: 'Visualize academic research trends and discover insights across research domains.',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
    </>
  )
}
