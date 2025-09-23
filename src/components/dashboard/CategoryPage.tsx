'use client'

import Link from 'next/link'
import { arxivCategories } from '@/lib'
import { useEffect, useState } from 'react'

interface CategoryPageProps {
  categoryId: string
}

export default function CategoryPage({ categoryId }: CategoryPageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const category = arxivCategories.find(cat => cat.id === categoryId)!

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Academic Breadcrumb */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-600/60 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-sm overflow-x-auto">
            <Link href="/" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex-shrink-0 transition-colors">
              <i className="fas fa-home mr-1"></i>
              <span className="hidden sm:inline">Research Domains</span>
              <span className="sm:hidden">🏠</span>
            </Link>
            <i className="fas fa-chevron-right text-slate-400 text-xs flex-shrink-0"></i>
            <span className="text-slate-800 dark:text-slate-200 font-medium flex-shrink-0">
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.id}</span>
              <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-xs font-mono ml-1">({category.id})</span>
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Academic Header */}
        <div className={`academic-header academic-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-cs icon-container-base icon-container-gradient mr-6">
              <i className={`${category.emoji} text-white text-3xl`}></i>
            </div>
            <div className="text-center">
              <h1 className="academic-title text-slate-800 dark:text-slate-200">
                {category.name}
              </h1>
              <p className="academic-subtitle">
                Research areas in {category.name.toLowerCase()} • {category.id.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className={`academic-fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-12 text-center">
            Research Areas
          </h2>
          
          <div className="space-y-12">
            {category.subcategoryGroups?.map((group, groupIndex) => {
              const gradientMap: { [key: string]: string } = {
                'cs': 'bg-gradient-cs',
                'econ': 'bg-gradient-econ',
                'eess': 'bg-gradient-eng',
                'math': 'bg-gradient-math',
                'physics': 'bg-gradient-physics',
                'q-bio': 'bg-gradient-bio',
                'q-fin': 'bg-gradient-econ',
                'stat': 'bg-gradient-stat'
              };
              const gradientClass = gradientMap[category.id] || 'bg-gradient-cs';
              
              return (
                <div key={group.id} className={`academic-fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${400 + groupIndex * 200}ms` }}>
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-6 flex items-center justify-center">
                    <i className={`${group.emoji} mr-3`}></i>
                    {group.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {group.subcategories.map((subcategory, subIndex) => (
                      <Link
                        key={subcategory.id}
                        href={`/category/${categoryId}/${subcategory.id}`}
                        className="category-card group focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                        style={{ 
                          animationDelay: `${600 + groupIndex * 200 + subIndex * 100}ms`,
                          transitionDelay: '0ms'
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`w-12 h-12 ${gradientClass} rounded-xl flex items-center justify-center shadow-lg mr-4`}>
                            <i className={`${subcategory.emoji} text-white text-lg`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                              {subcategory.name}
                            </h4>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              {subcategory.id}
                            </p>
                          </div>
                          <i className="fas fa-chevron-right text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 group-hover:translate-x-1"></i>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
