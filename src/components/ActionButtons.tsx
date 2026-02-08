interface ActionButtonsProps {
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
  onExport: () => void;
}

export default function ActionButtons({ onSave, onLoad, onClear, onExport }: ActionButtonsProps) {
  return (
    <section className="text-center py-20">
      <div className="bg-gradient-to-br from-valentine-purple to-valentine-coral rounded-3xl p-12 shadow-2xl text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Will you continue the story?
        </h2>
        <p className="text-white/90 mb-8 text-lg">
          Save your moments. Share your journey. Treasure your memories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <button
            onClick={onSave}
            className="px-8 py-4 bg-white text-valentine-coral rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
          >
            💾 Save Locally
          </button>
          <button
            onClick={onLoad}
            className="px-8 py-4 bg-white/20 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            ✨ Load Story
          </button>
          <button
            onClick={onExport}
            className="px-8 py-4 bg-white/20 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            📥 Export PDF
          </button>
          <button
            onClick={onClear}
            className="px-8 py-4 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-sm border-2 border-white/30"
          >
            🌸 Begin Again
          </button>
        </div>

        <div className="mt-8 text-white/70 text-sm">
          <p>💡 Your story is saved in your browser</p>
          <p className="mt-1">Share the exported PDF with your loved one</p>
        </div>
      </div>
    </section>
  );
}
