import { useEffect, useState } from 'react';
import PhotoUpload from './PhotoUpload';

interface TimelineSectionProps {
  section: {
    id: string;
    title: string;
    subtitle: string;
    placeholder: string;
  };
  index: number;
  isVisible: boolean;
  userStory: string;
  photo: string | null;
  onStoryChange: (id: string, value: string) => void;
  onPhotoChange: (id: string, photo: string | null) => void;
  sectionRef: (el: HTMLElement | null) => void;
}

export default function TimelineSection({
  section,
  index,
  isVisible,
  userStory,
  photo,
  onStoryChange,
  onPhotoChange,
  sectionRef
}: TimelineSectionProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 transition-opacity duration-1500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-2xl w-full relative">
        {/* Photo as subtle memory layer - responsive positioning */}
        {photo && showContent && (
          <div 
            className="absolute inset-0 -inset-x-8 sm:-inset-x-12 md:-inset-x-16 -inset-y-12 sm:-inset-y-16 md:-inset-y-24 rounded-2xl sm:rounded-3xl overflow-hidden transition-opacity duration-2000 delay-700"
            style={{ opacity: 0.08 }}
          >
            <img 
              src={photo} 
              alt="" 
              className="w-full h-full blur-xl sm:blur-2xl scale-110"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        )}

        {/* Content card - responsive padding */}
        <div className="relative z-10 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg space-y-6 sm:space-y-8 md:space-y-10">
          {/* Guide text - responsive text sizing */}
          <div 
            className={`text-center transition-all duration-1200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-valentine-purple leading-relaxed px-2">
              {section.subtitle}
            </h3>
          </div>

          {/* User input area - responsive sizing */}
          <div 
            className={`transition-all duration-1200 delay-300 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <textarea
              value={userStory}
              onChange={(e) => onStoryChange(section.id, e.target.value)}
              placeholder={section.placeholder}
              className="w-full min-h-[120px] sm:min-h-[140px] px-4 sm:px-6 py-4 sm:py-5 border border-valentine-purple/10 focus:outline-none focus:ring-2 focus:ring-valentine-coral/30 focus:border-valentine-coral/30 resize-none bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl text-valentine-purple placeholder:text-valentine-purple/40 placeholder:italic text-center font-light text-base sm:text-lg md:text-xl leading-relaxed shadow-sm transition-all duration-300"
            />
          </div>

          {/* Photo upload section */}
          <div 
            className={`transition-all duration-1200 delay-500 ${
              showContent ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <PhotoUpload
              sectionId={section.id}
              photo={photo}
              onPhotoChange={onPhotoChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
