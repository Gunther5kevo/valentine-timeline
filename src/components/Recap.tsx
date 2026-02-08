import { useEffect, useState } from 'react';
import type { Section } from '../data/sections';

interface RecapProps {
  isVisible: boolean;
  sections: Section[];
  stories: Record<string, string>;
  photos: Record<string, string | null>;
  onComplete: () => void;
}

export default function Recap({ isVisible, sections, stories, photos, onComplete }: RecapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (!isVisible || isSkipped) return;

    const duration = 3000;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= sections.length - 1) {
          clearInterval(interval);
          // Complete after last section
          setTimeout(() => onComplete(), 1500);
          return prev;
        }
        return prev + 1;
      });
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [isVisible, sections.length, isSkipped, onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    onComplete();
  };

  if (!isVisible) return null;

  const currentSection = sections[currentIndex];
  const currentStory = stories[currentSection?.id];
  const currentPhoto = photos[currentSection?.id];

  // Recap slideshow
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-valentine-bg via-valentine-light to-valentine-bg z-50 overflow-hidden">
      {/* Photo layer - more visible with image */}
      <div className="absolute inset-0">
        {currentPhoto ? (
          <div className="relative w-full h-full">
            {/* Darkened overlay for text readability */}
            <div className="absolute inset-0 bg-valentine-purple/10 backdrop-blur-sm z-10" />
            
            {/* The actual photo - no distortion with proper object-fit */}
            <img 
              src={currentPhoto} 
              alt="" 
              className="w-full h-full object-cover object-center transition-opacity duration-1000"
              style={{ 
                opacity: 0.35,
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        ) : (
          // Gradient if no photo
          <div className="w-full h-full bg-gradient-to-br from-valentine-light/50 to-valentine-pink/30" />
        )}
      </div>

      {/* Content container - improved mobile responsiveness */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        {/* Main content area */}
        <div className="max-w-3xl w-full text-center space-y-6 sm:space-y-10">
          {/* Section subtitle - poetic line - responsive text */}
          <div className="transition-all duration-1000 animate-fade-in">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-valentine-purple mb-4 sm:mb-8 leading-relaxed drop-shadow-sm px-2">
              {currentSection?.subtitle}
            </h3>
          </div>

          {/* Photo preview if exists - circular frame - responsive sizing */}
          {currentPhoto && (
            <div className="flex justify-center mb-4 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl ring-4 sm:ring-8 ring-white/40">
                <img 
                  src={currentPhoto} 
                  alt="" 
                  className="w-full h-full"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            </div>
          )}

          {/* User story - responsive padding and text */}
          {currentStory && (
            <div className="transition-all duration-1000 animate-fade-in bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl mx-2" style={{ animationDelay: '0.5s' }}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-valentine-purple font-light leading-relaxed">
                "{currentStory.slice(0, 200)}{currentStory.length > 200 ? '...' : ''}"
              </p>
            </div>
          )}

          {/* If no story, show just the photo with subtitle */}
          {!currentStory && currentPhoto && (
            <p className="text-valentine-purple/70 text-base sm:text-lg italic animate-fade-in px-4" style={{ animationDelay: '0.5s' }}>
              A moment worth remembering
            </p>
          )}
        </div>

        {/* Bottom section - progress and tagline - responsive positioning */}
        <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 right-0 space-y-3 sm:space-y-6">
          {/* Progress dots - responsive sizing */}
          <div className="flex justify-center gap-2 sm:gap-3 px-4">
            {sections.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? 'bg-valentine-coral w-8 sm:w-10 shadow-lg'
                    : idx < currentIndex
                    ? 'bg-valentine-coral/50 w-2 sm:w-2.5'
                    : 'bg-valentine-coral/20 w-2 sm:w-2.5'
                }`}
              />
            ))}
          </div>

          {/* Tagline - responsive text */}
          <p className="text-valentine-purple/70 text-xs sm:text-sm md:text-base italic text-center px-4 sm:px-6">
            Moments become memories. Memories become stories.
          </p>
        </div>
      </div>

      {/* Skip button - responsive positioning and sizing */}
      <button
        onClick={handleSkip}
        className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 text-valentine-purple/60 hover:text-valentine-purple transition-colors text-xs sm:text-sm font-light px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/20"
      >
        skip →
      </button>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }

        @keyframes heartbeat {
          0%, 100% { 
            transform: scale(1); 
          }
          25% { 
            transform: scale(1.1); 
          }
          50% { 
            transform: scale(1); 
          }
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
