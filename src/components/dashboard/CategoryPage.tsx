import Link from 'next/link'
import { arxivCategories } from '@/lib'

interface CategoryPageProps {
  categoryId: string
}

export default function CategoryPage({ categoryId }: CategoryPageProps) {
  // Find category
  const category = arxivCategories.find(cat => cat.id === categoryId)!

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-600/60 shadow-lg shadow-slate-200/10 dark:shadow-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex-shrink-0">
              <i className="fas fa-home mr-1"></i>
              <span className="hidden sm:inline">Home</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-cs rounded-2xl flex items-center justify-center mr-6 shadow-xl shadow-blue-500/25">
              <i className={`${category.emoji} text-white text-2xl`}></i>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200">
                {category.name} <span className="text-2xl sm:text-3xl text-slate-500 dark:text-slate-400 font-mono">({category.id})</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mt-2 font-medium">
                Research areas in {category.name.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Subcategories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
              Research Areas
            </h2>
            
            {/* Render subcategories using subcategoryGroups */}
            <div className="space-y-8">
              {category.subcategoryGroups?.map((group) => {
                // Map category IDs to their corresponding gradient classes
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
                  <div key={group.id}>
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
                      <i className={`${group.emoji} mr-2`}></i>
                      {group.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {group.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/category/${categoryId}/${subcategory.id}`}
                          className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 hover:scale-105"
                        >
                          <div className="flex items-center">
                            <div className={`w-12 h-12 ${gradientClass} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-blue-500/25`}>
                              <i className={`${subcategory.emoji} text-white text-lg`}></i>
                            </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                    {subcategory.name} <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">({subcategory.id})</span>
                                  </h4>
                                </div>
                                <i className="fas fa-chevron-right text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors group-hover:translate-x-1 transition-transform duration-300"></i>
                              </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-600/80 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 p-8 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Research Areas</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {category.subcategoryGroups?.reduce((total, group) => total + group.subcategories.length, 0) || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </Link>
        </div>
      </div>
    </div>
  )
}
