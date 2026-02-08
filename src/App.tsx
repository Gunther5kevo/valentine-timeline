import { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import TimelineSection from './components/TimelineSection';
import Transition from './components/Transition';
import Recap from './components/Recap';
import Proposal from './components/Proposal';
import KeepMoment from './components/KeepMoment';
import Footer from './components/Footer';
import { sections } from './data/sections';
import { storage, type StoryData } from './utils/storage';
import { exportToPDF, downloadPDF } from './utils/exportPDF';
import { exportAsImage, exportAsStoryTemplate } from './utils/exportImage';

function App() {
  const [userStories, setUserStories] = useState<Record<string, string>>({});
  const [userPhotos, setUserPhotos] = useState<Record<string, string | null>>({});
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  const transitionRef = useRef<HTMLElement | null>(null);
  const [transitionVisible, setTransitionVisible] = useState(false);
  
  const [showRecap, setShowRecap] = useState(false);
  const [recapComplete, setRecapComplete] = useState(false);
  
  const proposalRef = useRef<HTMLElement | null>(null);
  const [proposalVisible, setProposalVisible] = useState(false);
  
  const [showKeepMoment, setShowKeepMoment] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const data = storage.load();
    if (data) {
      setUserStories(data.stories || {});
      setUserPhotos(data.photos || {});
    }
  }, []);

  // Observer for timeline sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Observer for transition
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTransitionVisible(true);
            // Trigger recap after transition is visible
            setTimeout(() => setShowRecap(true), 2000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Observer for proposal (only shows after recap completes)
  useEffect(() => {
    if (!recapComplete) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProposalVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (proposalRef.current) {
      observer.observe(proposalRef.current);
    }

    return () => observer.disconnect();
  }, [recapComplete]);

  const handleStoryChange = (id: string, value: string) => {
    setUserStories((prev) => ({ ...prev, [id]: value }));
    // Auto-save after typing
    setTimeout(() => {
      const data: StoryData = {
        stories: { ...userStories, [id]: value },
        photos: userPhotos,
        lastSaved: new Date().toISOString()
      };
      storage.save(data);
    }, 1000);
  };

  const handlePhotoChange = (id: string, photo: string | null) => {
    setUserPhotos((prev) => ({ ...prev, [id]: photo }));
    // Auto-save after photo upload
    const data: StoryData = {
      stories: userStories,
      photos: { ...userPhotos, [id]: photo },
      lastSaved: new Date().toISOString()
    };
    storage.save(data);
  };

  const handleRecapComplete = () => {
    setRecapComplete(true);
    setShowRecap(false);
  };

  const handleContinue = () => {
    setShowKeepMoment(true);
    // Smooth scroll to KeepMoment section
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleBeginAgain = () => {
    if (confirm('Start fresh? This will clear your current story.')) {
      setUserStories({});
      setUserPhotos({});
      storage.clear();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSave = () => {
    const data: StoryData = {
      stories: userStories,
      photos: userPhotos,
      lastSaved: new Date().toISOString()
    };
    storage.save(data);
    alert('Your moment has been saved.');
  };

  const handleExport = () => {
    const data: StoryData = {
      stories: userStories,
      photos: userPhotos,
      lastSaved: new Date().toISOString()
    };
    
    const html = exportToPDF(data, sections);
    downloadPDF(html, `our-story-${new Date().toISOString().split('T')[0]}.html`);
    
    alert('Story exported. Open the file and print to PDF.');
  };

  const handleExportImage = async () => {
    const data: StoryData = {
      stories: userStories,
      photos: userPhotos,
      lastSaved: new Date().toISOString()
    };
    
    try {
      await exportAsImage(data, sections);
      alert('Story exported as image!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export. Please try again.');
    }
  };

  const handleExportStoryTemplate = async () => {
    const data: StoryData = {
      stories: userStories,
      photos: userPhotos,
      lastSaved: new Date().toISOString()
    };
    
    try {
      await exportAsStoryTemplate(data, sections);
      alert('Story template exported! Perfect for Instagram stories.');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export template. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-bg via-valentine-light to-valentine-pink/20 overflow-x-hidden">
      <Hero />

      {/* Timeline Sections */}
      <div className="space-y-0 bg-gradient-to-b from-transparent via-valentine-bg/50 to-valentine-light/80">
        {sections.map((section, index) => (
          <TimelineSection
            key={section.id}
            section={section}
            index={index}
            isVisible={visibleSections.has(section.id)}
            userStory={userStories[section.id] || ''}
            photo={userPhotos[section.id] || null}
            onStoryChange={handleStoryChange}
            onPhotoChange={handlePhotoChange}
            sectionRef={(el) => (sectionRefs.current[section.id] = el)}
          />
        ))}
      </div>

      {/* Transition - The Pause */}
      <div ref={transitionRef}>
        <Transition isVisible={transitionVisible} />
      </div>

      {/* Recap - The Journey Remembered */}
      {showRecap && (
        <Recap
          isVisible={showRecap}
          sections={sections}
          stories={userStories}
          photos={userPhotos}
          onComplete={handleRecapComplete}
        />
      )}

      {/* Only show proposal and beyond after recap completes */}
      {recapComplete && (
        <>
          {/* The Question */}
          <div ref={proposalRef}>
            <Proposal
              isVisible={proposalVisible}
              onContinue={handleContinue}
              onBeginAgain={handleBeginAgain}
            />
          </div>

          {/* Keep the Moment */}
          <KeepMoment
            isVisible={showKeepMoment}
            onSave={handleSave}
            onExport={handleExport}
            onExportImage={handleExportImage}
            onExportStoryTemplate={handleExportStoryTemplate}
          />

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
