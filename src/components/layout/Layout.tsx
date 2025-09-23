import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  showCategorySelector?: boolean
  currentCategory?: string
}

export default function Layout({ 
  children, 
  showCategorySelector = true, 
  currentCategory 
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        showCategorySelector={showCategorySelector} 
        currentCategory={currentCategory} 
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
