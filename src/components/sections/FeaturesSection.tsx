'use client'

import { Card } from '@/components/ui'
import { useEffect, useState } from 'react'

export default function FeaturesSection() {
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

    const element = document.getElementById('features-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: 'fas fa-search',
      gradient: 'bg-gradient-ai',
      title: 'Topic Discovery',
      description: 'Uncover emerging research themes and identify unexplored areas across academic domains using advanced topic modeling algorithms.',
      metric: '1000+',
      label: 'Topics Analyzed'
    },
    {
      icon: 'fas fa-chart-line',
      gradient: 'bg-gradient-math',
      title: 'Trend Analysis',
      description: 'Track research evolution over time and understand the historical development of academic fields with comprehensive temporal analysis.',
      metric: '5+',
      label: 'Years of Data'
    },
    {
      icon: 'fas fa-network-wired',
      gradient: 'bg-gradient-physics',
      title: 'Research Networks',
      description: 'Visualize connections between research topics and understand the interdisciplinary nature of academic knowledge.',
      metric: '50K+',
      label: 'Papers Processed'
    }
  ]

  return (
    <section id="features-section" className="academic-section bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`academic-header academic-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="academic-title text-slate-800 dark:text-slate-200">
            Research Analysis Platform
          </h2>
          <p className="academic-subtitle">
            Advanced topic modeling and trend analysis for academic research
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`academic-fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${200 + index * 200}ms` }}
            >
              <Card variant="research" className="academic-card h-full">
                <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                
                <div className="mb-6">
                  <div className="academic-metric text-blue-600 dark:text-blue-400">
                    {feature.metric}
                  </div>
                  <div className="academic-label">
                    {feature.label}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
