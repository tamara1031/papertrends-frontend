export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12 border-t border-slate-700/60 shadow-2xl shadow-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-cs rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
              <i className="fas fa-chart-line text-white text-sm"></i>
            </div>
            <span className="text-lg font-bold text-white">PaperTrends</span>
          </div>
          <p className="text-slate-400 mb-6">Open source research trend analysis platform</p>
          
          <p className="text-sm text-slate-500">&copy; 2024 PaperTrends. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
