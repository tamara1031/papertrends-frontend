'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl mb-8 shadow-2xl mx-auto">
          <i className="fas fa-exclamation-triangle text-white text-3xl"></i>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
          <span className="bg-gradient-to-r from-slate-800 via-red-600 to-pink-600 dark:from-white dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          Page Not Found
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <i className="fas fa-home mr-2"></i>
            Go to Homepage
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Go Back
          </button>
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-600/80 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Looking for research insights?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Explore our research domains and discover academic trends across various fields.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
          >
            Browse Research Domains
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </main>
  )
}
