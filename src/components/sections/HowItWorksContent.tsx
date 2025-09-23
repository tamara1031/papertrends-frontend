import { topicModelingInfo } from '@/lib'
import { Card } from '@/components/ui'

export default function HowItWorksContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-cs rounded-3xl mb-8 shadow-2xl">
              <i className="fas fa-cogs text-white text-3xl"></i>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Advanced topic modeling and data visualization techniques powering research trend analysis
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              {topicModelingInfo.title}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto font-medium">
              {topicModelingInfo.description}
            </p>
          </div>

          {/* Techniques Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {topicModelingInfo.techniques.map((technique: any, index: number) => (
              <Card 
                key={index}
                variant="research"
                className="p-8 group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-ai rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <i className={`${technique.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    {technique.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {technique.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <Card variant="research" className="p-10 mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                Why Topic Modeling?
              </h3>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto font-medium">
                Our advanced topic modeling approach provides unique insights into research trends
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topicModelingInfo.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-cs rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-lg font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Technical Details */}
          <Card variant="research" className="p-10">
            <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-12 text-center">
              Technical Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-math rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <i className="fas fa-file-alt text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">1. Data Collection</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Gather research papers from arXiv and other academic sources
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-physics rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <i className="fas fa-cogs text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">2. Topic Extraction</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Apply advanced algorithms to identify research themes and topics
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-bio rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <i className="fas fa-chart-line text-white text-2xl"></i>
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">3. Visualization</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Create interactive visualizations to explore research trends
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
