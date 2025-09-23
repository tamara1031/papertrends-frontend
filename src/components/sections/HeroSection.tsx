import { categories } from '@/lib'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-cs rounded-3xl mb-8 shadow-2xl">
            <i className="fas fa-chart-line text-white text-3xl"></i>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              PaperTrends
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Visualize academic research trends and discover insights across diverse research domains
          </p>
        </div>
        
        {/* Category Grid */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-12 text-center">
            Explore Research Domains
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => {
              // Map category IDs to their corresponding gradient classes
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
                  className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 text-center hover:scale-105 active:scale-95 cursor-pointer select-none touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <div className={`w-16 h-16 ${gradientClass} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-active:scale-95 transition-transform duration-300 shadow-xl shadow-blue-500/25`}>
                    <i className={`${category.emoji} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
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
