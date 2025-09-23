'use client'

import { categories } from '@/lib'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Clean academic pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm20 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Clean academic header */}
        <div className={`academic-header academic-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-cs rounded-2xl mb-8 shadow-lg">
            <i className="fas fa-microscope text-white text-2xl"></i>
          </div>
          <h1 className="academic-title">
            <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              PaperTrends
            </span>
          </h1>
          <p className="academic-subtitle">
            Advanced topic modeling analysis for academic research trends
          </p>
        </div>
        
        {/* Research domains with clean styling */}
        <div className="max-w-6xl mx-auto">
          <div className={`academic-fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-12 text-center">
              Research Domains
            </h2>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 academic-fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            {categories.map((category, index) => {
              const gradientMap: { [key: string]: string } = {
                'cs': 'bg-gradient-cs',
                'math': 'bg-gradient-math',
                'physics': 'bg-gradient-physics',
                'biology': 'bg-gradient-bio',
                'economics': 'bg-gradient-econ',
                'statistics': 'bg-gradient-stat',
                'engineering': 'bg-gradient-eng',
                'other': 'bg-gradient-other'
              }
              const gradientClass = gradientMap[category.id] || 'bg-gradient-cs'
              
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="category-card group focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  style={{ 
                    animationDelay: `${600 + index * 100}ms`,
                    transitionDelay: '0ms'
                  }}
                >
                  <div className={`w-14 h-14 ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <i className={`${category.emoji} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
                    {category.name}
                  </h3>
                  <p className="academic-label">
                    {category.subcategoryGroups?.reduce((total, group) => total + group.subcategories.length, 0) || 0} research areas
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
