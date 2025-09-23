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

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-2 flex-1 flex flex-col min-h-0">
          {/* Dashboard Layout */}
          <div className="space-y-2 flex-1 flex flex-col min-h-0">
            {/* Main Content Grid - 2 Row Layout */}
            <div className="space-y-2 flex-1 flex flex-col">
              {/* First Row - Topic Analysis (flex4) + Research Evolution (flex6) */}
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-2 flex-1">
              {/* Topic Analysis - Left side, flex-4 */}
              <div className="lg:col-span-4 order-1">
                <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-600/80 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 p-2 sm:p-4 min-h-[400px] lg:h-full flex flex-col backdrop-blur-sm" style={{ width: '100%', minWidth: '300px' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Topic Analysis
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Interactive topic exploration</p>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="3"/>
                        <circle cx="18" cy="6" r="3"/>
                        <circle cx="6" cy="18" r="3"/>
                        <circle cx="18" cy="18" r="3"/>
                        <path d="M9 6h6M6 9v6M18 9v6M9 18h6"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-h-[300px] sm:min-h-[400px] lg:h-full flex flex-col">
                    <div className="flex-1 w-full bg-slate-50/30 dark:bg-slate-700/30 rounded-xl p-2 relative">
                      <div className="w-full h-full relative" style={{ minWidth: '300px' }}>
                        {analysisData?.topics ? (
                          <BubbleChart 
                            data={{
                              topics: Object.entries(analysisData.topics.data).map(([id, topic]) => ({
                                topic_id: parseInt(id),
                                frequency: topic.count
                              })),
                              correlationMatrix: analysisData.topics.correlations
                            }}
                            topicData={Object.values(analysisData.topics.data)}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-slate-500 dark:text-slate-400">
                            <div className="text-center p-4">
                              <i className="fas fa-chart-pie text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
                              <p className="text-sm sm:text-base">N/A</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Evolution - Right side, flex-6 */}
              <div className="lg:col-span-6 order-2">
                <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-600/80 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 p-2 sm:p-4 flex flex-col backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-0">
                        Research Evolution
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Trend analysis over time</p>
                    </div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <i className="fas fa-chart-area text-white text-xs sm:text-sm"></i>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:gap-3 lg:flex-row lg:gap-1">
                     {/* Chart */}
                     <div className="flex-1 flex items-center justify-center" style={{ height: '400px' }}>
                       {analysisData?.topics ? (
                         <StackAreaChart 
                           data={{
                             categories: Object.values(analysisData.topics.data).map(topic => topic.name),
                             data: Object.entries(analysisData.topics.series).map(([year, values]) => [year, ...values])
                           }}
                         />
                       ) : (
                         <div className="flex items-center justify-center h-full w-full text-slate-500 dark:text-slate-400">
                           <div className="text-center p-4">
                             <i className="fas fa-chart-area text-2xl sm:text-3xl mb-2"></i>
                             <p className="text-sm sm:text-base">N/A</p>
                           </div>
                         </div>
                       )}
                     </div>
                    
                    {/* Enhanced Legend - Mobile: Below Graph, Desktop: Side */}
                    <div className="w-full lg:w-48 h-auto lg:h-full bg-slate-50/80 dark:bg-slate-700/80 border border-slate-200/60 dark:border-slate-600/60 rounded-xl shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20 p-3 lg:p-1.5 backdrop-blur-sm flex-shrink-0 flex flex-col">
                      <h4 className="text-sm lg:text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 lg:mb-1 flex-shrink-0">
                        Topics
                      </h4>
                      <div className="flex-1 overflow-y-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-1.5 lg:flex lg:flex-col lg:space-y-0.5">
                            {analysisData?.topics ? (
                              Object.values(analysisData.topics.data).map((topic) => {
                                const topicNames = Object.values(analysisData.topics.data).map(t => t.name)
                                const color = getColorScale(topicNames)(topic.name)
                                
                                const isSelected = state.selectedTopic === topic.name || state.selectedCategory === topic.name
                                
                                return (
                                  <div
                                    key={topic.name}
                                    className={`group flex items-center space-x-2 lg:space-x-1 p-2 lg:p-1 rounded-lg lg:rounded transition-all duration-200 lg:flex-shrink-0 ${
                                      isSelected 
                                        ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600' 
                                        : 'bg-slate-50 dark:bg-slate-700'
                                    }`}
                                    title={topic.name}
                                  >
                                    <div
                                      className={`w-4 h-4 lg:w-3 lg:h-3 rounded-full flex-shrink-0 ${
                                        isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                                      }`}
                                      style={{ backgroundColor: color }}
                                    />
                                    <span className={`text-sm lg:text-xs truncate leading-tight ${
                                      isSelected 
                                        ? 'text-blue-700 dark:text-blue-300 font-semibold' 
                                        : 'text-slate-600 dark:text-slate-300'
                                    }`}>
                                      {topic.name.length > 20 ? topic.name.slice(0, 20) + '...' : topic.name}
                                    </span>
                                  </div>
                                )
                              })
                            ) : (
                              <div className="text-center text-slate-500 dark:text-slate-400 p-2">
                                <i className="fas fa-tags text-sm sm:text-lg mb-1"></i>
                                <p className="text-xs sm:text-sm">N/A</p>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
              {/* Second Row - Related Papers */}
              <div className="w-full flex-shrink-0">
                <div className="flex flex-col bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-600/80 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 backdrop-blur-sm">
                {/* Enhanced header */}
                <div className="bg-gradient-to-r from-slate-50/90 to-slate-100/90 dark:from-slate-700/90 dark:to-slate-800/90 border-b border-slate-200/60 dark:border-slate-600/60 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <i className="fas fa-file-alt text-white text-sm sm:text-base"></i>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
                          Related Papers
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Research papers and publications</p>
                      </div>
                    </div>
                    {(state.selectedTopic || state.selectedCategory) && (
                      <div className="flex items-center space-x-3">
                        <div className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                            Filtered by: {(state.selectedTopic || state.selectedCategory)?.slice(0, 20)}
                            {(state.selectedTopic || state.selectedCategory) && (state.selectedTopic || state.selectedCategory)!.length > 20 ? '...' : ''}
                          </span>
                        </div>
                        <button
                          onClick={handlers.handleClearSelection}
                          className="px-3 py-1.5 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                        >
                          Clear Filter
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Paper list */}
                <div className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {papersToShow.length === 0 ? (
                      <div className="flex items-center justify-center h-24 text-slate-500 dark:text-slate-400">
                        <div className="text-center p-4">
                          <i className="fas fa-file-alt text-base sm:text-lg mb-1"></i>
                          <p className="text-xs sm:text-sm">N/A</p>
                        </div>
                      </div>
                    ) : (
                      papersToShow.map((paper, index) => (
                        <div key={index} className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-600/60 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 group">
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              <a
                                href={`https://arxiv.org/abs/${paper.arxiv_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline block"
                                title={paper.title}
                              >
                                {paper.title}
                              </a>
                            </h4>
                            
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-4">
                              {paper.abstract}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-600/60">
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs font-mono">
                                  {paper.arxiv_id}
                                </span>
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                                  {paper.year}
                                </span>
                              </div>
                              <a
                                href={`https://arxiv.org/abs/${paper.arxiv_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                                title="View Abstract"
                              >
                                View Paper
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer Container - At the very bottom */}
      <footer className="flex-shrink-0 mt-8">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4">
          {/* Back Button - Left aligned */}
          <div className="flex justify-start">
            <Link
              href={`/category/${categoryId}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm border border-slate-200/80 dark:border-slate-600/80 text-slate-700 dark:text-slate-300 font-medium rounded-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/40 hover:border-blue-400/60 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all duration-300 group"
            >
              <i className="fas fa-arrow-left mr-1 group-hover:-translate-x-1 transition-transform duration-300"></i>
              Back to {category.name}
            </Link>
          </div>
        </div>
      </footer>

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