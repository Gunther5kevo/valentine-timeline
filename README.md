# A Quiet Journey 💕

A contemplative Valentine experience that unfolds slowly, like memory itself.

This is not a form. It's a journey.

## ✨ The Experience

### The Journey
1. **Invitation** - "This is not a form. It's a journey."
2. **Six Moments** - Each unfolds as you scroll
3. **The Pause** - "Before the future, let's remember."
4. **The Recap** - Your journey plays back as a gentle montage
5. **The Question** - "Will you continue this one?"
6. **Keep the Moment** - Optional: save, export, or print

### Core Principles
- **The story feels complete even if you add nothing**
- Poetic fixed text stands on its own
- User input is optional, never required
- Images appear softly, like memory
- No technical language
- No pressure to create

### What Makes This Different
- Photos never dominate - they fade softly behind text
- Each moment appears one at a time
- Recap animation shows your journey before the question
- The question is reworded: "Will you continue this one?" 
- Gentle celebration, not explosions
- Save options only appear after you choose to continue

## 🎨 Design Philosophy

**Minimal. Poetic. Quiet confidence.**

- Light, font-weight gentle
- Slow, intentional animations
- Photos blurred and subtle (8% opacity backgrounds)
- No bright colors, no loud effects
- Empty states must still feel meaningful

## 📖 The Six Moments

1. **First Met** - "Some moments don't announce themselves."
2. **First Laugh** - "The laugh that made everything lighter."
3. **A Moment** - "The one you return to without trying."
4. **Growing** - "Things change quietly. Then all at once."
5. **Today** - "Still here. Still learning. Still choosing."
6. **Tomorrow** - "Not a promise. Just a hope."

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🛠️ Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Vite
- LocalStorage (auto-saves as you type)

## 💡 Key Features

### Automatic Story Preservation
- Auto-saves while you type
- Auto-saves when you upload photos
- Loads saved story on page refresh
- Nothing sent to servers

### The Recap Montage
- 10-15 second journey through all moments
- Soft cross-fades between sections
- Shows fixed text + user text + photos
- Skippable but meaningful
- Creates emotional bridge before the question

### The Question
Not: "Will you be my Valentine?"
But: "Will you continue this one?"

More universal. More powerful. Softer.

### Gentle Celebration
- No confetti explosions
- Slow-rising hearts
- Warm glow
- Calm joy
- Message: "Then let's keep going."

## 🎯 Usage

This is for quiet moments.
For reflection.
For remembering.

Not for:
- Loud gestures
- Quick interactions
- Data collection
- Social sharing (though you can export)

Perfect for:
- Thoughtful Valentine's expressions
- Anniversary reflections
- Memory keeping
- Intimate storytelling

## 🔒 Privacy

- Everything stays in your browser
- No accounts, no tracking
- Auto-saves locally
- Export control in your hands
- "This page remembers nothing. You do."

## 📄 License

Made with quiet intention for moments worth remembering.

---

*Scroll slowly. Let each moment arrive.* 💕

## ✨ Features

### 📸 Photo Memories
- Upload photos for each milestone
- Drag & drop or click to add images
- Photos stored locally with your stories
- Each moment becomes more vivid with visuals

### 📝 Your Story
- 7 meaningful timeline sections
- New "Growing Closer" section added
- New "Our Future" section added
- **💕 Romantic Proposal Section** - "Will You Be My Valentine?"
- Editable text areas for each moment
- Beautiful scroll animations
- Heartbeat effects as sections appear
- Interactive proposal with Yes/No buttons
- Celebration animation on acceptance

### 💾 Save & Share
- Save locally in your browser
- Export as HTML/PDF to share
- Load your saved stories anytime
- Start fresh whenever you want

### 🔒 Privacy First
- No accounts or sign-ups
- No data sent to servers
- No tracking or analytics
- Everything stays in your browser
- Export control in your hands

### 🎨 Beautiful Design
- Purple, coral, and pink gradients
- Smooth animations
- Responsive on all devices
- Clean, minimal interface

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
valentine-timeline/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Landing section
│   │   ├── TimelineSection.tsx   # Individual timeline section
│   │   ├── PhotoUpload.tsx       # Photo upload component
│   │   ├── Proposal.tsx          # 💕 Valentine proposal section
│   │   ├── ActionButtons.tsx     # Save/Load/Export buttons
│   │   └── Footer.tsx            # Footer with privacy info
│   ├── data/
│   │   └── sections.ts           # Timeline section data
│   ├── utils/
│   │   ├── storage.ts            # Local storage operations
│   │   └── exportPDF.ts          # PDF export functionality
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
└── tailwind.config.js
```

## 💡 Usage Guide

### Adding Photos
1. Scroll to any section
2. Click or drag & drop an image into the photo area
3. Photos are automatically saved with your story
4. Hover over photos to change or remove them

### Writing Your Story
1. Click in any text area
2. Write your memories for that moment
3. Stories auto-save when you click "Save Locally"

### Saving & Exporting
- **Save Locally ❤️**: Saves everything to your browser
- **Load Story ✨**: Restores your saved timeline
- **Export PDF 📥**: Downloads an HTML file you can print to PDF
- **Begin Again 🌸**: Clears everything for a fresh start

### Sharing Your Timeline
1. Click "Export PDF"
2. Open the downloaded HTML file
3. Print to PDF (Ctrl/Cmd + P)
4. Share the PDF with your loved one

## 🎯 Timeline Sections

1. **The Beginning** - Where your story starts
2. **When We First Met** - That important moment
3. **First Laugh Together** - When everything felt lighter
4. **A Special Memory** - The one you keep returning to
5. **Growing Closer** - When friendship became something more
6. **Here & Now** - Where you are now
7. **Our Future** - Dreams of tomorrow
8. **💕 The Big Question** - "Will You Be My Valentine?" with interactive proposal

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Storage**: Browser LocalStorage
- **Export**: HTML with embedded images

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'valentine-purple': '#5B4D9D',
  'valentine-coral': '#FF6B7A',
  'valentine-pink': '#FFB8C1',
}
```

### Add/Edit Sections
Modify `src/data/sections.ts`:
```typescript
export const sections = [
  {
    id: 'your-section',
    title: 'Your Title',
    subtitle: 'Your subtitle...',
    placeholder: 'Your placeholder...'
  }
]
```

### Adjust Animations
Edit animation timings in `tailwind.config.js`:
```javascript
animation: {
  'heartbeat': 'heartbeat 2s ease-in-out',
  'fade-in': 'fadeIn 1.5s ease-out',
}
```

## 🔒 Privacy & Storage

### What's Stored?
- Your text stories
- Your uploaded photos (as base64)
- Last saved timestamp

### Where?
- Only in your browser's localStorage
- Never sent to any server
- Never tracked or analyzed

### Storage Limits
- Most browsers: ~5-10MB total
- Photos are stored as base64
- Large photos are automatically compressed

### Clearing Data
- Click "Begin Again" in the app
- Or clear browser data manually
- Or delete localStorage via DevTools

## 🚀 Deployment

### Static Hosting
```bash
npm run build
# Upload 'dist' folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - Any static host
```

### Custom Domain
Most hosts support custom domains for free!

## 🐛 Troubleshooting

### Photos not showing?
- Check file size (keep under 2MB per photo)
- Ensure image format is supported (JPG, PNG, WebP)
- Clear browser cache

### Storage full?
- Remove some photos
- Export your timeline
- Start a new timeline

### Animations not working?
- Clear browser cache
- Check if JavaScript is enabled
- Try a different browser

## 💕 For Developers

This is intentionally simple:
- No backend needed
- No API calls
- No complex state management
- Pure React + TypeScript
- Easy to understand and modify

Feel free to:
- Add more sections
- Customize styling
- Add features
- Make it your own

## 📄 License

Free to use, modify, and share. Made with ❤️ for lovers everywhere.

---

*This page remembers nothing. You do.* 💕
