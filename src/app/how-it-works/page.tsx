import { HowItWorksContent } from '@/components/sections'

export const metadata = {
  title: 'How It Works - PaperTrends',
  description: 'Learn how PaperTrends uses advanced topic modeling and data visualization techniques to analyze academic research trends.',
  keywords: 'topic modeling, research analysis, data visualization, academic trends, machine learning',
  openGraph: {
    title: 'How It Works - PaperTrends',
    description: 'Learn how PaperTrends uses advanced topic modeling and data visualization techniques to analyze academic research trends.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/how-it-works`,
    siteName: 'PaperTrends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works - PaperTrends',
    description: 'Learn how PaperTrends uses advanced topic modeling and data visualization techniques to analyze academic research trends.',
  },
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
