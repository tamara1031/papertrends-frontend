import { AcknowledgmentsContent } from '@/components/sections'

export const metadata = {
  title: 'Acknowledgments - PaperTrends',
  description: 'We gratefully acknowledge the contributions and resources that made this project possible.',
  keywords: 'acknowledgments, open source, research community, arxiv, d3js, bertopic, specter',
  openGraph: {
    title: 'Acknowledgments - PaperTrends',
    description: 'We gratefully acknowledge the contributions and resources that made this project possible.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/acknowledgments`,
    siteName: 'PaperTrends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acknowledgments - PaperTrends',
    description: 'We gratefully acknowledge the contributions and resources that made this project possible.',
  },
}

export default function AcknowledgmentsPage() {
  return <AcknowledgmentsContent />
}