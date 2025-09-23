'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/contexts'
import { categories } from '@/lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  showCategorySelector?: boolean
  currentCategory?: string
}

export default function Header({ showCategorySelector = true, currentCategory }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId) {
      router.push(`/category/${categoryId}`)
      setIsMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
              <div className="w-8 h-8 bg-gradient-cs rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <i className="fas fa-chart-line text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                PaperTrends
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link 
                href="/how-it-works" 
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                How it works
              </Link>
              <Link 
                href="/acknowledgments" 
                className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Acknowledgments
              </Link>
            </nav>
          </div>
          
          {/* Right side: Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Category Selector */}
            {showCategorySelector && (
              <div className="relative">
                <select 
                  value={currentCategory || ''}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="appearance-none bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/60 rounded-xl px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 cursor-pointer min-w-[180px] text-slate-700 dark:text-slate-200 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20"
                >
                  <option value="">Select Research Domain</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <i className="fas fa-chevron-down text-slate-500 dark:text-slate-400 text-xs"></i>
                </div>
              </div>
            )}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/60 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 group shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20"
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-slate-600 dark:text-slate-300 text-sm group-hover:scale-110 transition-transform duration-300`}></i>
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/60 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20"
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-slate-600 dark:text-slate-300 text-sm`}></i>
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/60 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-slate-600 dark:text-slate-300 text-sm`}></i>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-slate-200 dark:border-slate-700 py-4">
            <div className="space-y-1">
              {/* Navigation Links */}
              <Link 
                href="/how-it-works" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300"
              >
                How it works
              </Link>
              <Link 
                href="/acknowledgments" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300"
              >
                Acknowledgments
              </Link>
              
              {/* Category Selector */}
              {showCategorySelector && (
                <>
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Research Domains
                  </div>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300"
                    >
                      {category.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
