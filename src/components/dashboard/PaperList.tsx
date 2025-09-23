'use client'

import { Paper } from '@/lib'

interface PaperListProps {
  papers: Paper[]
  keyword?: string
}

export default function PaperList({ papers, keyword }: PaperListProps) {
  if (papers.length === 0) {
    return (
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Related Papers</h2>
          <div className="w-8 h-8 bg-gradient-physics rounded-lg flex items-center justify-center">
            <i className="fas fa-file-alt text-white text-sm"></i>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-center py-8">
          {keyword ? `No papers found for "${keyword}"` : 'No related papers found.'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Related Papers
          {keyword && <span className="text-lg font-normal text-slate-600 dark:text-slate-400 ml-2">for "{keyword}"</span>}
        </h2>
        <div className="w-8 h-8 bg-gradient-physics rounded-lg flex items-center justify-center">
          <i className="fas fa-file-alt text-white text-sm"></i>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {papers.map((paper, index) => (
          <div 
            key={index}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 hover:scale-105"
          >
            <h3 className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200 line-clamp-2">{paper.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {paper.year}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
              {paper.abstract}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
