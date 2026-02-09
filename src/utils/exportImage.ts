import type { StoryData } from './storage';

// Simple SVG-based export that works without external dependencies
export const exportAsImage = async (
  data: StoryData, 
  sections: Array<{ id: string; title: string; subtitle: string }>
) => {
  // For now, we'll export as a downloadable HTML that can be screenshot
  // This avoids the html2canvas dependency issue
  const html = generateStoryHTML(data, sections);
  
  // Download as HTML file
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `our-story-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  alert('Story exported as HTML! Open the file and use your browser\'s screenshot tool (or print to PDF) to save as an image.');
};

export const exportAsStoryTemplate = async (
  data: StoryData,
  sections: Array<{ id: string; title: string; subtitle: string }>
) => {
  // Get all sections that have photos
  const sectionsWithPhotos = sections.filter(s => data.photos[s.id]);
  
  if (sectionsWithPhotos.length === 0) {
    alert('Please add at least one photo to create a story template.');
    return;
  }
  
  // Create ONE HTML file with all stories that can be navigated
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080, initial-scale=1.0">
  <title>Our Love Story - All Templates</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
      background: #000;
      width: 100vw;
      height: 100vh;
      position: fixed;
    }
    
    .story-container {
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 1080px;
      max-height: 1920px;
      margin: 0 auto;
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
      .story-container {
        width: 100vw;
        height: 100vh;
      }
    }
    
    .story {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #FFF5F7 0%, #FFE5E9 50%, #FFD6DC 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 40px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .story {
        padding: 40px 20px;
      }
    }
    
    .story.active {
      opacity: 1;
      z-index: 1;
    }
    
    .content {
      text-align: center;
      color: #5B4D9D;
      max-width: 900px;
      width: 100%;
    }
    
    .heart {
      font-size: 72px;
      margin-bottom: 40px;
    }
    
    @media (max-width: 768px) {
      .heart {
        font-size: 48px;
        margin-bottom: 20px;
      }
    }
    
    h1 {
      font-size: 64px;
      font-weight: 300;
      margin: 0 0 30px 0;
      line-height: 1.2;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 36px;
        margin: 0 0 15px 0;
      }
    }
    
    .subtitle {
      font-size: 28px;
      color: #888;
      font-style: italic;
      margin-bottom: 60px;
      line-height: 1.4;
    }
    
    @media (max-width: 768px) {
      .subtitle {
        font-size: 18px;
        margin-bottom: 30px;
      }
    }
    
    .photo-frame {
      margin: 0 auto 50px;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      border: 10px solid white;
    }
    
    @media (max-width: 768px) {
      .photo-frame {
        width: 280px;
        height: 280px;
        margin: 0 auto 30px;
        border: 6px solid white;
      }
    }
    
    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    
    .story-box {
      background: rgba(255,255,255,0.9);
      padding: 40px 50px;
      border-radius: 30px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.1);
      margin-bottom: 50px;
    }
    
    @media (max-width: 768px) {
      .story-box {
        padding: 20px 25px;
        border-radius: 20px;
        margin-bottom: 30px;
      }
    }
    
    .story-text {
      font-size: 24px;
      line-height: 1.7;
      color: #333;
    }
    
    @media (max-width: 768px) {
      .story-text {
        font-size: 16px;
        line-height: 1.6;
      }
    }
    
    .footer {
      margin-top: 60px;
    }
    
    @media (max-width: 768px) {
      .footer {
        margin-top: 30px;
      }
    }
    
    .footer p {
      font-size: 20px;
      color: #999;
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .footer p {
        font-size: 14px;
      }
    }
    
    .footer .date {
      font-size: 18px;
      color: #BBB;
      margin-top: 10px;
    }
    
    @media (max-width: 768px) {
      .footer .date {
        font-size: 12px;
        margin-top: 5px;
      }
    }
    
    /* Navigation */
    .nav-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      display: flex;
      pointer-events: none;
    }
    
    .nav-left, .nav-right {
      flex: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      pointer-events: auto;
    }
    
    .nav-left {
      justify-content: flex-start;
      padding-left: 40px;
    }
    
    .nav-right {
      justify-content: flex-end;
      padding-right: 40px;
    }
    
    @media (max-width: 768px) {
      .nav-left {
        padding-left: 15px;
      }
      .nav-right {
        padding-right: 15px;
      }
    }
    
    .nav-arrow {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #5B4D9D;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      opacity: 0.7;
    }
    
    @media (max-width: 768px) {
      .nav-arrow {
        width: 45px;
        height: 45px;
        font-size: 22px;
      }
    }
    
    .nav-arrow:hover {
      opacity: 1;
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      background: white;
    }
    
    .nav-arrow:active {
      transform: scale(0.95);
    }
    
    .nav-left .nav-arrow {
      opacity: 0.5;
    }
    
    .nav-left .nav-arrow.visible {
      opacity: 0.7;
    }
    
    .nav-right .nav-arrow {
      opacity: 0.7;
    }
    
    .nav-right .nav-arrow.hidden {
      opacity: 0.3;
      pointer-events: none;
    }
    
    /* Progress bars */
    .progress-container {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 960px;
      max-width: calc(100% - 40px);
      display: flex;
      gap: 8px;
      z-index: 20;
    }
    
    @media (max-width: 768px) {
      .progress-container {
        top: 15px;
        gap: 4px;
        max-width: calc(100% - 20px);
      }
    }
    
    .progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      .progress-bar {
        height: 3px;
      }
    }
    
    .progress-fill {
      height: 100%;
      background: white;
      width: 0%;
      transition: width 0.3s ease;
    }
    
    .progress-bar.active .progress-fill {
      width: 100%;
    }
    
    .progress-bar.completed .progress-fill {
      width: 100%;
    }
    
    /* Page indicator */
    .page-indicator {
      position: fixed;
      top: 40px;
      right: 40px;
      background: rgba(255,255,255,0.9);
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 18px;
      color: #5B4D9D;
      font-weight: 500;
      z-index: 20;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
      .page-indicator {
        top: auto;
        bottom: 20px;
        right: 20px;
        padding: 8px 16px;
        font-size: 14px;
        border-radius: 20px;
      }
    }
    
    /* Instructions overlay */
    .instructions {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.9);
      color: white;
      padding: 40px 60px;
      border-radius: 20px;
      text-align: center;
      z-index: 100;
      animation: fadeOut 3s forwards;
      max-width: 90%;
    }
    
    @media (max-width: 768px) {
      .instructions {
        padding: 30px 25px;
        border-radius: 15px;
      }
    }
    
    @keyframes fadeOut {
      0%, 80% { opacity: 1; }
      100% { opacity: 0; pointer-events: none; }
    }
    
    .instructions h2 {
      font-size: 32px;
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    @media (max-width: 768px) {
      .instructions h2 {
        font-size: 22px;
        margin-bottom: 15px;
      }
    }
    
    .instructions p {
      font-size: 18px;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .instructions p {
        font-size: 14px;
      }
    }
    
    /* Screenshot button */
    .screenshot-btn {
      position: fixed;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      background: #FF6B7A;
      color: white;
      padding: 16px 32px;
      border-radius: 30px;
      font-size: 18px;
      cursor: pointer;
      z-index: 20;
      border: none;
      box-shadow: 0 4px 12px rgba(255,107,122,0.4);
      transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .screenshot-btn {
        bottom: 80px;
        padding: 12px 24px;
        font-size: 14px;
        border-radius: 25px;
      }
    }
    
    .screenshot-btn:hover {
      transform: translateX(-50%) scale(1.05);
      box-shadow: 0 6px 16px rgba(255,107,122,0.6);
    }
    
    @media print {
      @page {
        size: 1080px 1920px;
        margin: 0;
      }
      .nav-overlay, .progress-container, .page-indicator, .screenshot-btn, .instructions {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="instructions">
    <h2>📱 How to Use</h2>
    <p>Click left/right or use arrow keys to navigate</p>
    <p>Screenshot each slide for Instagram Stories (1080x1920)</p>
  </div>

  <div class="progress-container" id="progressContainer">
    ${sectionsWithPhotos.map((_, i) => `
      <div class="progress-bar" id="progress-${i}">
        <div class="progress-fill"></div>
      </div>
    `).join('')}
  </div>
  
  <div class="page-indicator" id="pageIndicator">1 of ${sectionsWithPhotos.length}</div>
  
  <button class="screenshot-btn" onclick="alert('Use your device screenshot tool:\\n\\nWindows: Win + Shift + S\\nMac: Cmd + Shift + 4\\niOS: Power + Volume Up\\nAndroid: Power + Volume Down')">
    📸 How to Screenshot
  </button>

  <div class="story-container">
    ${sectionsWithPhotos.map((section, index) => {
      const photo = data.photos[section.id];
      const story = data.stories[section.id] || '';
      
      return `
        <div class="story ${index === 0 ? 'active' : ''}" data-index="${index}">
          <div class="content">
            <div class="heart">❤️</div>
            <h1>${section.title}</h1>
            <p class="subtitle">${section.subtitle}</p>
            
            <div class="photo-frame">
              <img src="${photo}" alt="${section.title}" />
            </div>
            
            ${story ? `
              <div class="story-box">
                <p class="story-text">"${story.length > 180 ? story.slice(0, 180) + '...' : story}"</p>
              </div>
            ` : ''}
            
            <div class="footer">
              <p>Timeline of "Us"</p>
              <p class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
          </div>
        </div>
      `;
    }).join('')}
  </div>

  <div class="nav-overlay">
    <div class="nav-left" onclick="prevStory()">
      <div class="nav-arrow" id="leftArrow">
        ←
      </div>
    </div>
    <div class="nav-right" onclick="nextStory()">
      <div class="nav-arrow" id="rightArrow">
        →
      </div>
    </div>
  </div>

  <script>
    let currentIndex = 0;
    const totalStories = ${sectionsWithPhotos.length};
    
    function updateStory() {
      // Update stories
      document.querySelectorAll('.story').forEach((story, i) => {
        story.classList.toggle('active', i === currentIndex);
      });
      
      // Update progress bars
      document.querySelectorAll('.progress-bar').forEach((bar, i) => {
        bar.classList.remove('active', 'completed');
        if (i < currentIndex) bar.classList.add('completed');
        if (i === currentIndex) bar.classList.add('active');
      });
      
      // Update page indicator
      document.getElementById('pageIndicator').textContent = 
        (currentIndex + 1) + ' of ' + totalStories;
      
      // Update arrow visibility
      const leftArrow = document.getElementById('leftArrow');
      const rightArrow = document.getElementById('rightArrow');
      
      if (currentIndex === 0) {
        leftArrow.classList.remove('visible');
      } else {
        leftArrow.classList.add('visible');
      }
      
      if (currentIndex === totalStories - 1) {
        rightArrow.classList.add('hidden');
      } else {
        rightArrow.classList.remove('hidden');
      }
    }
    
    function nextStory() {
      if (currentIndex < totalStories - 1) {
        currentIndex++;
        updateStory();
      }
    }
    
    function prevStory() {
      if (currentIndex > 0) {
        currentIndex--;
        updateStory();
      }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextStory();
      if (e.key === 'ArrowLeft') prevStory();
    });
    
    // Touch swipe
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextStory();
        else prevStory();
      }
    });
    
    // Initialize arrow states
    updateStory();
  </script>
</body>
</html>
  `;
  
  // Download the single HTML file
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `love-story-templates-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  alert(`✨ Created your story templates!\n\n📱 Instructions:\n1. Open the HTML file\n2. Click through each slide (${sectionsWithPhotos.length} total)\n3. Screenshot each one (1080x1920)\n4. Send to your special someone!\n\nNavigation:\n• Click left/right sides\n• Use arrow keys\n• Swipe on mobile`);
};

// Helper function to generate full story HTML
function generateStoryHTML(data: StoryData, sections: Array<{ id: string; title: string; subtitle: string }>) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Story - ${new Date(data.lastSaved).toLocaleDateString()}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #5B4D9D;
      background: linear-gradient(135deg, #FFF5F7 0%, #FFE5E9 100%);
      padding: 60px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .container {
      background: white;
      padding: 60px;
      border-radius: 30px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    }
    
    .header {
      text-align: center;
      margin-bottom: 60px;
      border-bottom: 3px solid #FF6B7A;
      padding-bottom: 30px;
    }
    
    h1 {
      font-size: 56px;
      font-weight: 300;
      margin-bottom: 20px;
    }
    
    .date {
      color: #999;
      font-size: 18px;
      font-style: italic;
    }
    
    .section {
      margin-bottom: 60px;
      page-break-inside: avoid;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .section-number {
      width: 60px;
      height: 60px;
      background: #5B4D9D;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 24px;
      margin-right: 20px;
      flex-shrink: 0;
    }
    
    .section-title {
      flex: 1;
    }
    
    .section-title h2 {
      font-size: 36px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    
    .section-title .subtitle {
      color: #888;
      font-size: 18px;
      font-style: italic;
    }
    
    .photo {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      object-position: center;
      border-radius: 20px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .story {
      background: #F9F9FB;
      padding: 30px 40px;
      border-radius: 15px;
      border-left: 5px solid #FF6B7A;
      white-space: pre-wrap;
      line-height: 1.8;
      color: #333;
      font-size: 18px;
    }
    
    .heart-divider {
      text-align: center;
      font-size: 32px;
      margin: 30px 0;
    }
    
    .footer {
      margin-top: 80px;
      text-align: center;
      padding-top: 40px;
      border-top: 2px solid #FFE5E9;
      color: #999;
      font-size: 14px;
    }
    
    .footer p {
      margin: 10px 0;
    }
    
    .footer .tagline {
      font-style: italic;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
        padding: 40px;
      }
    }
    
    @media (max-width: 768px) {
      body {
        padding: 20px 10px;
      }
      .container {
        padding: 30px 20px;
      }
      h1 {
        font-size: 36px;
      }
      .section-number {
        width: 50px;
        height: 50px;
        font-size: 20px;
      }
      .section-title h2 {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>❤️ Our Story ❤️</h1>
      <p class="date">${new Date(data.lastSaved).toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </div>
    
    ${sections.map((section, index) => {
      const story = data.stories[section.id] || '';
      const photo = data.photos[section.id];
      
      if (!story && !photo) return '';
      
      return `
        <div class="section">
          <div class="section-header">
            <div class="section-number">${index + 1}</div>
            <div class="section-title">
              <h2>${section.title}</h2>
              <p class="subtitle">${section.subtitle}</p>
            </div>
          </div>
          
          ${photo ? `<img src="${photo}" alt="${section.title}" class="photo" />` : ''}
          
          ${story ? `<div class="story">${story}</div>` : '<div class="story"><em>No story written yet...</em></div>'}
          
          <div class="heart-divider">❤️</div>
        </div>
      `;
    }).join('')}
    
    <div class="footer">
      <p class="tagline">This page remembers nothing. You do.</p>
      <p>Timeline of "Us" - Created with love</p>
    </div>
  </div>
</body>
</html>
  `;
}
