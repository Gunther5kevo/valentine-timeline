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
        <p className="text-2xl sm:text-3xl md:text-4xl font-light text-valentine-purple/70 leading-relaxed mb-8 sm:mb-12 px-2">
          Would you like to keep this moment?
        </p>

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
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">In your browser</span>
            </div>
          </button>

          {/* Export as HTML/PDF */}
          <button
            onClick={onExport}
            className="group px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-valentine-coral border-2 border-valentine-coral/20 hover:border-valentine-coral rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">📄</span>
              <span>Export as HTML</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">Print to PDF</span>
            </div>
          </button>

          {/* Export as Image */}
          <button
            onClick={onExportImage}
            className="group px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-valentine-pink border-2 border-valentine-pink/30 hover:border-valentine-pink rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">🖼️</span>
              <span>Full Story as HTML</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">Screenshot for image</span>
            </div>
          </button>

          {/* Export Story Template */}
          <button
            onClick={onExportStoryTemplate}
            className="group px-6 sm:px-8 py-4 sm:py-5 text-valentine-purple hover:text-white bg-white hover:bg-gradient-to-br hover:from-valentine-coral hover:to-valentine-pink border-2 border-valentine-pink/30 hover:border-valentine-coral rounded-2xl transition-all duration-300 font-light text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl sm:text-3xl">📱</span>
              <span>Social Templates</span>
              <span className="text-xs sm:text-sm text-valentine-purple/60 group-hover:text-white/80">One per photo</span>
            </div>
          </button>
        </div>

        {/* Print option - separate */}
        <button
          onClick={() => window.print()}
          className="block w-full sm:w-auto mx-auto px-8 sm:px-10 py-3 text-valentine-purple/70 hover:text-valentine-purple border border-valentine-coral/30 hover:border-valentine-coral/60 rounded-full transition-all duration-300 font-light text-base sm:text-lg"
        >
          🖨️ Print
        </button>

        <p className="text-valentine-purple/40 text-xs sm:text-sm italic pt-8 sm:pt-12 px-4">
          Nothing leaves your browser. This story is yours.
        </p>
      </div>
    </section>
  );
}
