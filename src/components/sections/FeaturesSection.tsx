import { Card } from '@/components/ui'

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-t border-slate-200/60 dark:border-slate-700/60 relative">
      {/* Decorative section indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 border-4 border-slate-200/60 dark:border-slate-700/60 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/25">
          <i className="fas fa-tools text-white text-xl"></i>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            Research Analysis Tools
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto font-medium">
            Comprehensive tools for understanding research landscapes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card variant="research" className="p-8 group">
            <div className="w-16 h-16 bg-gradient-ai rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <i className="fas fa-search text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Discover New Topics
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Find emerging research themes and unexplored areas across related fields.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card variant="research" className="p-8 group">
            <div className="w-16 h-16 bg-gradient-math rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <i className="fas fa-chart-pie text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Understand Research Scale
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              See research scope and competition levels in your chosen field.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card variant="research" className="p-8 group">
            <div className="w-16 h-16 bg-gradient-physics rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <i className="fas fa-clock text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Track Historical Evolution
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              See when research fields started and how they evolved over time.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
