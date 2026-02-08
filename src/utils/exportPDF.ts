import type { StoryData } from './storage';

// Since jsPDF is a library, we'll create a simple HTML export that can be printed to PDF
// This avoids needing external dependencies

export const exportToPDF = (data: StoryData, sections: Array<{ id: string; title: string; subtitle: string }>) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timeline of "Us" - ${new Date(data.lastSaved).toLocaleDateString()}</title>
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
      background: linear-gradient(to bottom, #D4D4F5, #B8B5E8);
      padding: 40px 20px;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 60px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
    
    h1 {
      text-align: center;
      color: #5B4D9D;
      font-size: 48px;
      margin-bottom: 20px;
      border-bottom: 3px solid #FF6B7A;
      padding-bottom: 20px;
    }
    
    .date {
      text-align: center;
      color: #999;
      margin-bottom: 60px;
      font-style: italic;
    }
    
    .section {
      margin-bottom: 60px;
      page-break-inside: avoid;
    }
    
    .section-number {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #5B4D9D;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    
    .section h2 {
      color: #5B4D9D;
      font-size: 32px;
      margin-bottom: 10px;
    }
    
    .section .subtitle {
      color: #888;
      font-size: 18px;
      margin-bottom: 20px;
      font-style: italic;
    }
    
    .section .story {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #FF6B7A;
      white-space: pre-wrap;
      color: #333;
      line-height: 1.8;
    }
    
    .photo {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 10px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .heart {
      text-align: center;
      font-size: 32px;
      margin: 20px 0;
    }
    
    .footer {
      margin-top: 80px;
      text-align: center;
      color: #999;
      font-size: 14px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
    
    @media print {
      body {
        background: white;
      }
      .container {
        box-shadow: none;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>❤️ Timeline of "Us" ❤️</h1>
    <p class="date">Created on ${new Date(data.lastSaved).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}</p>
    
    ${sections.map((section, index) => {
      const story = data.stories[section.id] || '';
      const photo = data.photos[section.id];
      
      if (!story && !photo) return '';
      
      return `
        <div class="section">
          <div class="section-number">${index + 1}</div>
          <h2>${section.title}</h2>
          <p class="subtitle">${section.subtitle}</p>
          ${photo ? `<img src="${photo}" alt="${section.title}" class="photo" />` : ''}
          ${story ? `<div class="story">${story}</div>` : '<div class="story"><em>No story written yet...</em></div>'}
          <div class="heart">❤️</div>
        </div>
      `;
    }).join('')}
    
    <div class="footer">
      <p><em>This page remembers nothing. You do.</em></p>
      <p>Timeline of "Us" - A love story</p>
    </div>
  </div>
</body>
</html>
  `;

  return html;
};

export const downloadPDF = (html: string, filename: string = 'timeline-of-us.html') => {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
