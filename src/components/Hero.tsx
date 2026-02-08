export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative bg-gradient-to-br from-valentine-light via-valentine-bg to-valentine-pink/30 overflow-hidden">
      {/* Floating hearts - subtle background - responsive count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-valentine-coral hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 20}px`,
              opacity: Math.random() * 0.12 + 0.08,
              animation: `float-very-gentle ${Math.random() * 20 + 25}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      {/* Main content - responsive text sizing */}
      <div className="relative z-10 text-center max-w-4xl space-y-10 sm:space-y-16 px-4">
        {/* Main heading - improved responsive sizing */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-valentine-purple leading-relaxed">
          This is a journey.
          <br />
          <span className="text-valentine-purple/80">Not a form.</span>
          <br />
          <span className="text-valentine-purple/80">Not a performance.</span>
        </h1>
        
        {/* Subtitle - responsive sizing */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-lg sm:text-xl md:text-2xl text-valentine-purple/70 font-light italic">
            Take your time. Feel each moment.
          </p>
          <p className="text-base sm:text-lg text-valentine-purple/60 font-light">
            Scroll when you're ready.
          </p>
        </div>
      </div>

      {/* Animated scroll indicator - responsive positioning */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 animate-gentle-bounce">
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-valentine-coral/40 rounded-full flex justify-center pt-1.5 sm:pt-2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-valentine-coral/60 rounded-full animate-scroll-dot" />
          </div>
          <p className="text-valentine-purple/40 text-xs font-light">scroll</p>
        </div>
      </div>

      <style>{`
        @keyframes float-very-gentle {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) translateX(8px) rotate(3deg);
          }
          66% {
            transform: translateY(-8px) translateX(-5px) rotate(-2deg);
          }
        }

        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scroll-dot {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(16px);
          }
        }

        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }

        .animate-scroll-dot {
          animation: scroll-dot 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
