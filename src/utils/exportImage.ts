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
  
  // Show message first
  if (sectionsWithPhotos.length > 1) {
    alert(`Creating ${sectionsWithPhotos.length} story templates! Files will download one by one.`);
  }
  
  // Create a template for each photo with delay
  for (let index = 0; index < sectionsWithPhotos.length; index++) {
    const section = sectionsWithPhotos[index];
    const photo = data.photos[section.id];
    const story = data.stories[section.id] || '';
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080, initial-scale=1.0">
  <title>${section.title} - Story Template</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: 1080px;
      height: 1920px;
      background: linear-gradient(135deg, #FFF5F7 0%, #FFE5E9 50%, #FFD6DC 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 60px;
      position: relative;
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
    
    h1 {
      font-size: 64px;
      font-weight: 300;
      margin: 0 0 30px 0;
      line-height: 1.2;
    }
    
    .subtitle {
      font-size: 28px;
      color: #888;
      font-style: italic;
      margin-bottom: 60px;
      line-height: 1.4;
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
    
    .story-text {
      font-size: 24px;
      line-height: 1.7;
      color: #333;
    }
    
    .footer {
      margin-top: 60px;
    }
    
    .footer p {
      font-size: 20px;
      color: #999;
      font-style: italic;
    }
    
    .footer .date {
      font-size: 18px;
      color: #BBB;
      margin-top: 10px;
    }
    
    .page-indicator {
      position: absolute;
      top: 40px;
      right: 40px;
      background: rgba(255,255,255,0.8);
      padding: 10px 20px;
      border-radius: 20px;
      font-size: 16px;
      color: #5B4D9D;
      font-weight: 500;
    }
    
    @media print {
      @page {
        size: 1080px 1920px;
        margin: 0;
      }
      body {
        width: 1080px;
        height: 1920px;
      }
    }
  </style>
</head>
<body>
  ${sectionsWithPhotos.length > 1 ? `<div class="page-indicator">${index + 1} of ${sectionsWithPhotos.length}</div>` : ''}
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
</body>
</html>
    `;
    
    // Download with delay to prevent browser blocking
    await new Promise(resolve => {
      setTimeout(() => {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `story-${index + 1}-${section.id}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve(true);
      }, index * 500); // 500ms delay between downloads
    });
  }
  
  setTimeout(() => {
    alert(`✨ Created ${sectionsWithPhotos.length} story template${sectionsWithPhotos.length > 1 ? 's' : ''}!\n\nTo use:\n1. Open each HTML file in your browser\n2. Screenshot it (1080x1920)\n3. Share on Instagram Stories!`);
  }, sectionsWithPhotos.length * 500 + 200);
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
