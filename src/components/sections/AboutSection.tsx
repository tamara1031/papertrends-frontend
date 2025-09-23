'use client'

import { Card } from '@/components/ui'
import { useEffect, useState } from 'react'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('about-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about-section" className="academic-section bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`academic-header academic-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="academic-title text-slate-800 dark:text-slate-200">
            Open Academic Platform
          </h2>
          <p className="academic-subtitle">
            Built for researchers, by researchers. Free and open source academic analysis tools.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className={`academic-fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
            <Card variant="research" className="academic-card h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fas fa-gift text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 text-center">
                100% Free Access
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center">
                Completely free to use with no hidden costs, subscription fees, or usage limits. 
                Access all features and analysis tools without any commercial barriers or restrictions.
              </p>
            </Card>
          </div>
          
          <div className={`academic-fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '800ms' }}>
            <Card variant="research" className="academic-card h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i className="fab fa-github text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 text-center">
                Open Source & MIT License
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-6">
                Fully transparent and auditable codebase under MIT license. Contribute, modify, and extend 
                the platform freely. Built with modern web technologies and open source best practices.
              </p>
              <div className="text-center">
                <a 
                  href="https://github.com/tamara1031/papertrends-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-gradient-primary btn-hover-scale px-6 py-3"
                >
                  <i className="fab fa-github mr-2"></i>
                  View Source Code
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
