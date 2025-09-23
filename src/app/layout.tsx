import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers'
import { Layout } from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'PaperTrends - Academic Research Trend Analysis',
  description: 'Visualize academic research trends and discover insights across research domains. Open source platform for comprehensive research analysis.',
  keywords: 'research trends, academic analysis, data visualization, open source, research insights',
  authors: [{ name: 'PaperTrends Team' }],
  openGraph: {
    title: 'PaperTrends - Academic Research Trend Analysis',
    description: 'Visualize academic research trends and discover insights across research domains.',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: 'PaperTrends',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaperTrends - Academic Research Trend Analysis',
    description: 'Visualize academic research trends and discover insights across research domains.',
    creator: '@papertrends',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Layout>
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}