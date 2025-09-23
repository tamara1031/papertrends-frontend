import { Card } from '@/components/ui'

export default function AboutSection() {
  return (
    <section className="pb-8 pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200/60 dark:border-slate-700/60 relative">
      {/* Decorative section indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 border-4 border-slate-200/60 dark:border-slate-700/60 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/25">
          <i className="fas fa-heart text-white text-xl"></i>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Completely Free
            </span>
            <span className="text-slate-800 dark:text-slate-200"> & </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Open Source
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto font-medium">
            A research analysis tool built for the community, completely free and open source
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card variant="research" className="p-10 text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-green-500/25">
              <i className="fas fa-gift text-white text-3xl"></i>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Completely Free
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              No hidden costs, no premium tiers, no subscriptions. Access all features at zero cost.
            </p>
          </Card>
          
          <Card variant="research" className="p-10 text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-blue-500/25">
              <i className="fab fa-github text-white text-3xl"></i>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Open Source
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Transparent, auditable, and community-driven. View, modify, and contribute to the code.
            </p>
          </Card>
        </div>
        
      </div>
    </section>
  )
}
