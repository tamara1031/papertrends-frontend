'use client'

import { useState, useEffect, memo } from 'react'
import Link from 'next/link'
import { arxivCategories } from '@/lib'
import { StackAreaChart, BubbleChart } from '@/components/charts'
import { AnalysisData } from '@/lib'
import { getColorScale } from '@/lib'
import { DashboardProvider, useDashboard } from '@/lib/contexts'

interface SubcategoryPageProps {
  categoryId: string
  subcategoryId: string
}

const SubcategoryPageContent = memo(function SubcategoryPageContent({ categoryId, subcategoryId }: SubcategoryPageProps) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const dashboard = useDashboard()
  const { state, handlers } = dashboard

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Calculate basic statistics
  const totalPapers = analysisData ? Object.values(analysisData.topics.data).reduce((sum, topic) => sum + topic.count, 0) : 0
  const totalTopics = analysisData ? Object.values(analysisData.topics.data).length : 0
  
  // Get topic colors
  const topicColors = analysisData ? getColorScale(Object.keys(analysisData.topics.data)) : {}
  
  // Get category and subcategory
  const category = arxivCategories.find(cat => cat.id === categoryId)!
  let subcategory = null
  for (const group of category.subcategoryGroups) {
    subcategory = group.subcategories.find(sub => sub.id === subcategoryId)
    if (subcategory) break
  }

  // Load analysis data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const jsonPath = `/analysis/${categoryId}/${subcategoryId}.json`
        const response = await fetch(jsonPath)
        
        if (response.ok) {
          const data = await response.json()
          setAnalysisData(data)
        } else {
          setAnalysisData(null)
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading analysis data:', err)
        setError('Failed to load analysis data')
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [categoryId, subcategoryId])

  // Get papers to display
  const getPapersToShow = () => {
    if (!analysisData?.topics.papers) return []
    
    if (state.selectedTopic || state.selectedCategory) {
      const selectedName = state.selectedTopic || state.selectedCategory
      const topicInfo = Object.entries(analysisData.topics.data)
        .find(([, topic]) => topic.name === selectedName)
      if (topicInfo) {
        const [topicId] = topicInfo
        return analysisData.topics.papers[topicId] || []
      }
    }
    
    return Object.keys(analysisData.topics.papers)
      .map(topicId => analysisData.topics.papers[topicId] || [])
      .flat()
      .slice(0, 15)
  }

  const papersToShow = getPapersToShow()

  // subcategory is guaranteed to exist due to notFound() check in route
  const subcategoryData = subcategory!

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Analysis Data</h2>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we load the research analysis...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-2xl"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Container */}
      <header className="flex-shrink-0">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-2">
          {/* Compact Header */}
          <div className="mb-4">
            {/* Breadcrumb */}
          <nav className="mb-3">
            <ol className="flex items-center space-x-1 text-xs sm:text-sm overflow-x-auto">
              <li className="flex-shrink-0">
                <Link href="/" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  <span className="hidden sm:inline">Home</span>
                  <span className="sm:hidden">🏠</span>
                </Link>
              </li>
              <li className="flex-shrink-0"><i className="fas fa-chevron-right text-slate-400 text-xs"></i></li>
              <li className="flex-shrink-0">
                <Link href={`/category/${categoryId}`} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.id}</span>
                  <span className="hidden sm:inline text-xs font-mono ml-1">({category.id})</span>
                </Link>
              </li>
              <li className="flex-shrink-0"><i className="fas fa-chevron-right text-slate-400 text-xs"></i></li>
              <li className="flex-shrink-0">
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  <span className="hidden sm:inline">{subcategoryData.name}</span>
                  <span className="sm:hidden">{subcategoryData.id}</span>
                  <span className="hidden sm:inline text-slate-500 dark:text-slate-400 text-xs font-mono ml-1">({subcategoryData.id})</span>
                </span>
              </li>
            </ol>
          </nav>
          </div>

          {/* Enhanced Header with Integrated Metrics */}
          <div className="bg-gradient-to-r from-white via-slate-50/30 to-white dark:from-slate-800 dark:via-slate-900/30 dark:to-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-600/80 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 p-3 sm:p-4 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
              
              {/* Left Side - Title and Icon */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-cs rounded-xl shadow-lg">
                  <i className={`${subcategoryData.emoji} text-white text-lg sm:text-xl`}></i>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
                    {subcategoryData.name} 
                    <span className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-mono ml-1">({subcategoryData.id})</span>
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Research trends and analysis
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                
                {/* Papers Metric */}
                <div className="flex items-center space-x-1.5 p-2 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
                    <i className="fas fa-file-alt text-white text-xs"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">
                      {totalPapers.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Papers</p>
                  </div>
                </div>

                {/* Topics Metric */}
                <div className="flex items-center space-x-1.5 p-2 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0">
                    <i className="fas fa-tags text-white text-xs"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">
                      {totalTopics}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Topics</p>
                  </div>
                </div>

                {/* Period Metric */}
                <div className="flex items-center space-x-1.5 p-2 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/25 flex-shrink-0">
                    <i className="fas fa-calendar-alt text-white text-xs"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">
                      {analysisData?.metadata.period ? 
                        `${analysisData.metadata.period.start} - ${analysisData.metadata.period.end}` : 
                        'N/A'
                      }
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Period
                      {analysisData?.metadata.period && (
                        <span className="ml-1 px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-xs">
                          {(() => {
                            const start = new Date(analysisData.metadata.period.start + '-01')
                            const end = new Date(analysisData.metadata.period.end + '-01')
                            const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
                            return `${months}mo`
                          })()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Updated Metric */}
                <div className="flex items-center space-x-1.5 p-2 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
                    <i className="fas fa-clock text-white text-xs"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none">
                      {analysisData?.metadata.lastUpdated ? 
                        new Date(analysisData.metadata.lastUpdated).toLocaleDateString('en-US', { 
                          year: '2-digit',
                          month: 'short', 
                          day: 'numeric' 
                        }) : 
                        'N/A'
                      }
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Updated
                      {analysisData?.metadata.dataVersion && (
                        <span className="ml-1 px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
                          v{analysisData.metadata.dataVersion}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Topic Analysis */}
          <div className="col-span-1">
            <div className="container mx-auto">

            </div>
          </div>

          {/* Research Evolution */}
          <div className="col-span-1">
            <div className="container mx-auto">

            </div>
          </div>


          <div className="col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Research Evolution</h3>
              <div className="flex">
                {/* Chart */}
                <div className="flex-1">
                  {(analysisData as any)?.timeSeries ? (
                    <StackAreaChart 
                      data={(analysisData as any).timeSeries.data}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-32 text-slate-500 dark:text-slate-400">
                      <p>No data available</p>
                    </div>
                  )}
                </div>
                {/* Legend */}
                <div className="w-32 ml-4">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Legend</div>
                  <div className="space-y-1">
                    {analysisData?.topics.data && Object.entries(analysisData.topics.data).slice(0, 5).map(([id, topic]) => (
                      <div key={id} className="flex items-center text-xs">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: (topicColors as any)[id] || '#94a3b8' }}
                        ></div>
                        <span className="text-slate-600 dark:text-slate-400 truncate">{topic.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Related Papers */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Related Papers</h3>
              <div className="max-h-64 overflow-y-auto">
                {(analysisData as any)?.papers?.data ? (
                  <div className="space-y-2">
                    {(analysisData as any).papers.data.slice(0, 10).map((paper: any, index: number) => (
                      <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="block">
                          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-1">
                            {paper.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                            {paper.authors.join(', ')}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">
                            Published: {paper.year}
                          </p>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-slate-500 dark:text-slate-400">
                    <p>No papers available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
})

export default function SubcategoryPage({ categoryId, subcategoryId }: SubcategoryPageProps) {
  return (
    <DashboardProvider>
      <SubcategoryPageContent categoryId={categoryId} subcategoryId={subcategoryId} />
    </DashboardProvider>
  )
}