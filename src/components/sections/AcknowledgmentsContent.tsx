import { Card } from '@/components/ui'

export default function AcknowledgmentsContent() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl">
            <i className="fas fa-heart text-white text-3xl"></i>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 dark:from-white dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Acknowledgments
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
            We gratefully acknowledge the contributions and resources that made this project possible
          </p>
        </div>

        <div className="space-y-8">
          {/* arXiv Acknowledgment */}
          <Card variant="research" className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mr-4">
                <i className="fas fa-book text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                arXiv.org
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                This project relies heavily on the open access research papers available through arXiv.org. 
                We are deeply grateful to the arXiv team and the global research community for making 
                scientific knowledge freely accessible.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                The research categories and classification system used in PaperTrends are based on 
                arXiv's category taxonomy, which provides a comprehensive and standardized way to 
                organize academic research across disciplines.
              </p>
              <div className="bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  arXiv Category Taxonomy
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Our research field categorization is based on the official arXiv category taxonomy 
                  available at <a href="https://arxiv.org/category_taxonomy" className="underline hover:no-underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">https://arxiv.org/category_taxonomy</a>. 
                  This ensures consistency with the broader academic community and facilitates 
                  cross-platform research discovery.
                </p>
              </div>
            </div>
          </Card>

          {/* Open Source Community */}
          <Card variant="research" className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mr-4">
                <i className="fab fa-github text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Open Source Community
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                PaperTrends is built on the foundation of numerous open source libraries and frameworks. 
                We extend our gratitude to the developers and maintainers of these projects for their 
                dedication to creating tools that benefit the entire research community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-lg rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Frontend Technologies</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    <li>• Next.js - React framework</li>
                    <li>• Tailwind CSS - Styling</li>
                    <li>• TypeScript - Type safety</li>
                    <li>• Font Awesome - Icons</li>
                    <li>• D3.js - Data visualization</li>
                  </ul>
                </div>
                <div className="bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-lg rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Data Processing</h4>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    <li>• BERTopic - Topic modeling</li>
                    <li>• SPECTER - Semantic embeddings</li>
                    <li>• Data visualization libraries</li>
                    <li>• Statistical analysis tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* D3.js Acknowledgment */}
          <Card variant="research" className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mr-4">
                <i className="fas fa-chart-bar text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                D3.js
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                PaperTrends uses D3.js (Data-Driven Documents) for creating interactive data visualizations, 
                including the hierarchical word cloud, theme river charts, and other dynamic visualizations. 
                D3.js is a powerful JavaScript library for manipulating documents based on data.
              </p>
              <div className="bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  License Information
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  D3.js is released under the BSD 3-Clause License. This permissive license allows for 
                  free use, modification, and distribution, including commercial use, with proper attribution.
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <p><strong>License:</strong> BSD 3-Clause License</p>
                  <p><strong>Repository:</strong> <a href="https://github.com/d3/d3" className="underline hover:no-underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">https://github.com/d3/d3</a></p>
                  <p><strong>Author:</strong> Mike Bostock</p>
                  <p><strong>Commercial Use:</strong> Permitted with attribution</p>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Attribution Notice:</strong> This project uses D3.js, which is licensed under the BSD 3-Clause License. 
                    The full license text is available at the D3.js repository.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* BERTopic Acknowledgment */}
          <Card variant="research" className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mr-4">
                <i className="fas fa-brain text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                BERTopic
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                PaperTrends uses BERTopic for advanced topic modeling. BERTopic is a topic modeling technique 
                that leverages BERT embeddings and c-TF-IDF to create dense clusters allowing for easily 
                interpretable topics whilst keeping important words in the topic descriptions.
              </p>
              <div className="bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  License Information
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  BERTopic is released under the MIT License. This permissive license allows for free use, 
                  modification, and distribution of the software.
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <p><strong>License:</strong> MIT License</p>
                  <p><strong>Repository:</strong> <a href="https://github.com/MaartenGr/BERTopic" className="underline hover:no-underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">https://github.com/MaartenGr/BERTopic</a></p>
                </div>
              </div>
            </div>
          </Card>

          {/* SPECTER Acknowledgment */}
          <Card variant="research" className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mr-4">
                <i className="fas fa-microscope text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                SPECTER
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                PaperTrends uses SPECTER (Scientific Paper Embeddings using Citation-informed Transformers) 
                for generating semantic embeddings of research papers. SPECTER is designed to generate 
                embeddings for scientific papers based on their citation network and content.
              </p>
              <div className="bg-slate-50/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-600/60 shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  License Information
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  SPECTER is released under the Apache License 2.0. This license allows for free use, 
                  modification, and distribution with proper attribution.
                </p>
                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                  <p><strong>License:</strong> Apache License 2.0</p>
                  <p><strong>Repository:</strong> <a href="https://github.com/allenai/specter" className="underline hover:no-underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">https://github.com/allenai/specter</a></p>
                  <p><strong>Organization:</strong> Allen Institute for AI</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Research Community */}
          <Card variant="research" className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 mr-4">
                <i className="fas fa-users text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                Research Community
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                We acknowledge the countless researchers, academics, and scientists whose work forms 
                the foundation of our analysis. Their dedication to advancing human knowledge through 
                rigorous research makes tools like PaperTrends possible and meaningful.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Special thanks to the researchers who have contributed to the development of topic 
                modeling techniques, natural language processing methods, and data visualization 
                approaches that enable us to extract meaningful insights from research literature.
              </p>
            </div>
          </Card>

          {/* Contact Information */}
          <Card variant="research" className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Get Involved
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                PaperTrends is an open source project. We welcome contributions, feedback, and suggestions 
                from the research community.
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://github.com/tamara1031/papertrends-frontend" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <i className="fab fa-github mr-2"></i>
                  View on GitHub
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
