import { useState } from 'react';

interface ProposalProps {
  isVisible: boolean;
  onContinue: () => void;
  onBeginAgain: () => void;
}

export default function Proposal({ isVisible, onContinue, onBeginAgain }: ProposalProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [heartsCreated, setHeartsCreated] = useState(false);

  const handleContinue = () => {
    setShowCelebration(true);
    
    // Create gentle rising hearts
    if (!heartsCreated) {
      setHeartsCreated(true);
      for (let i = 0; i < 20; i++) {
        setTimeout(() => createRisingHeart(), i * 200);
      }
    }
  };

  const createRisingHeart = () => {
    const heart = document.createElement('div');
    heart.className = 'fixed pointer-events-none z-50 text-3xl opacity-70';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.animation = 'rise-gently 6s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  };

  return (
    <>
      <section
        className={`min-h-screen flex items-center justify-center px-4 sm:px-6 transition-all duration-2000 bg-gradient-to-br from-valentine-light via-valentine-bg to-valentine-pink ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12 md:space-y-16">
          {/* Hearts decoration */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 text-4xl sm:text-5xl md:text-6xl animate-gentle-bounce">
            <span className="animate-heartbeat">❤️</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-heartbeat" style={{ animationDelay: '0.4s' }}>❤️</span>
          </div>

          {/* The Dedication */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 px-4">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-valentine-purple/70 leading-relaxed">
              Every moment, every memory...
            </p>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-valentine-purple leading-tight">
              This story was created for you
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-valentine-purple/60 leading-relaxed pt-4">
              Now it's time to save and share these memories ✨
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 sm:pt-8">
            <button
              onClick={handleContinue}
              className="w-full sm:w-auto px-12 sm:px-14 md:px-16 py-4 sm:py-5 bg-valentine-coral hover:bg-valentine-coral/90 text-white text-xl sm:text-2xl font-light rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Save & Share ❤️
            </button>

            <button
              onClick={onBeginAgain}
              className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-valentine-purple/50 hover:text-valentine-purple/70 text-base sm:text-lg font-light transition-all duration-300"
            >
              Start over
            </button>
          </div>
        </div>
      </section>

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-gradient-to-b from-valentine-coral/90 via-valentine-pink/80 to-valentine-light/90 backdrop-blur-sm z-50 flex items-center justify-center animate-gentle-glow">
          <div className="text-center space-y-6 sm:space-y-8 px-4 sm:px-6">
            <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 animate-gentle-pulse">💝</div>
            
            <p className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-relaxed">
              Let's preserve these memories
            </p>

            <p className="text-white/70 text-base sm:text-lg italic pt-6 sm:pt-8">
              Click anywhere to continue
            </p>
          </div>

          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => {
              setShowCelebration(false);
              onContinue();
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes rise-gently {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes gentle-glow {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
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

        .animate-gentle-glow {
          animation: gentle-glow 1.5s ease-out forwards;
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 2s ease-in-out infinite;
        }

        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </>
  );
}
