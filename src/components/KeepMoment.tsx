interface KeepMomentProps {
  isVisible: boolean;
  onSave: () => void;
  onExport: () => void;
  onExportImage: () => void;
  onExportStoryTemplate: () => void;
}

export default function KeepMoment({ isVisible, onSave, onExport, onExportImage, onExportStoryTemplate }: KeepMomentProps) {
  if (!isVisible) return null;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 bg-gradient-to-b from-valentine-bg to-valentine-light">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        <div className="space-y-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-valentine-purple/70 leading-relaxed mb-4 sm:mb-8 px-2">
            Choose how to share your story
          </p>
          <p className="text-sm sm:text-base text-valentine-purple/50 italic px-4">
            Export and send to your special someone, or save for yourself 💕
          </p>
        </div>

        {/* Export Options Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {/* Save locally */}
          <button
            onClick={onSave}
            className="group px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-valentine-purple border-2 border-valentine-purple/20 hover:border-valentine-purple rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">💾</span>
              <span>Save locally</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">Keep in browser</span>
            </div>
          </button>

          {/* Export as HTML/PDF */}
          <button
            onClick={onExport}
            className="group px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-valentine-coral border-2 border-valentine-coral/20 hover:border-valentine-coral rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">📄</span>
              <span>Export PDF</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">Print or save</span>
            </div>
          </button>

          {/* Export as Image */}
          <button
            onClick={onExportImage}
            className="group px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-valentine-pink border-2 border-valentine-pink/30 hover:border-valentine-pink rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">🖼️</span>
              <span>Full Story HTML</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">Screenshot it</span>
            </div>
          </button>

          {/* Export Story Template - RECOMMENDED */}
          <button
            onClick={onExportStoryTemplate}
            className="group relative px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-gradient-to-br hover:from-valentine-coral hover:to-valentine-pink border-2 border-valentine-coral hover:border-valentine-coral rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="absolute -top-3 -right-3 bg-valentine-coral text-white text-xs px-3 py-1 rounded-full shadow-md">
              Best for sharing!
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">📱</span>
              <span>Story Templates</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">Click through & screenshot</span>
            </div>
          </button>
        </div>

        {/* How to share instructions */}
        <div className="bg-valentine-light/50 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto">
          <h3 className="text-lg sm:text-xl font-light text-valentine-purple mb-4">💡 How to Share</h3>
          <ol className="text-left text-sm sm:text-base text-valentine-purple/70 space-y-2 leading-relaxed">
            <li className="flex gap-3">
              <span className="font-semibold">1.</span>
              <span>Click "Story Templates" to create ONE interactive file</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">2.</span>
              <span>Open the HTML file and click through each slide</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">3.</span>
              <span>Screenshot each slide (use arrow keys or click sides)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">4.</span>
              <span>Send all screenshots to your special someone 💕</span>
            </li>
          </ol>
        </div>

        {/* Print option - separate */}
        <button
          onClick={() => window.print()}
          className="block w-full sm:w-auto mx-auto px-8 sm:px-10 py-3 text-valentine-purple/70 hover:text-valentine-purple border border-valentine-coral/30 hover:border-valentine-coral/60 rounded-full transition-all duration-300 font-light text-base sm:text-lg"
        >
          🖨️ Print
        </button>

        <p className="text-valentine-purple/40 text-xs sm:text-sm italic pt-8 sm:pt-12 px-4">
          Nothing leaves your browser. This story is yours to share however you'd like.
        </p>
      </div>
    </section>
  );
}
