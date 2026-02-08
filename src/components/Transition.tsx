import { useEffect, useState } from 'react';

interface TransitionProps {
  isVisible: boolean;
}

export default function Transition({ isVisible }: TransitionProps) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section
      className={`min-h-screen flex items-center justify-center py-20 transition-all duration-2000 bg-gradient-to-br from-valentine-light via-valentine-bg to-valentine-pink/30 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center max-w-2xl px-6 space-y-12">
        {/* Main message */}
        <div 
          className={`transition-all duration-2000 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-4xl md:text-5xl lg:text-6xl font-light text-valentine-purple leading-relaxed">
            Before the future,
            <br />
            <span className="text-valentine-purple/80">let's remember.</span>
          </p>
        </div>

        {/* Subtle visual element */}
        <div 
          className={`flex justify-center gap-2 transition-all duration-2000 delay-700 ${
            showText ? 'opacity-60' : 'opacity-0'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-valentine-coral animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-valentine-coral animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-2 h-2 rounded-full bg-valentine-coral animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </section>
  );
}
