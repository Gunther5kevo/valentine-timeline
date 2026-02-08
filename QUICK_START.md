# Quick Start Guide 🚀

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
cd valentine-timeline
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Open in Browser
The terminal will show you a local URL (usually `http://localhost:5173`)

---

## 📸 What You'll See

### Hero Section
Beautiful landing page with floating hearts and an invitation to scroll.

### Timeline Sections (6 total)
1. **Beginning** - Where your story starts
2. **First Met** - That important moment
3. **First Laugh** - The moment everything felt lighter
4. **First Memory** - The one you keep returning to
5. **Today** - Where you are now
6. **Forever?** - The question that matters

### Each Section Has:
- 💜 A numbered badge
- ❤️ A heartbeat animation
- 📸 Photo upload area (drag & drop or click)
- ✍️ Text area for your story
- 🎨 Beautiful gradient backgrounds

---

## 🎯 How to Use

### Adding Photos
**Three ways to add photos:**

1. **Click to Upload**
   - Click on the photo upload box
   - Select an image from your device
   - Photo appears instantly

2. **Drag & Drop**
   - Drag an image from your desktop
   - Drop it on the photo upload box
   - Watch it upload smoothly

3. **Manage Photos**
   - Hover over any photo
   - Click "Change Photo" to replace
   - Click "Remove" to delete

**Supported formats:** JPG, PNG, WebP, GIF  
**Recommended size:** Keep photos under 2MB each

### Writing Your Story
1. Click in any text area
2. Write your memories
3. Text automatically saves when you click "Save Locally"

### Saving Your Timeline
Click **"💾 Save Locally"**
- Saves all text
- Saves all photos
- Saves everything in your browser
- No account needed!

### Loading Your Timeline
Click **"✨ Load Story"**
- Restores all saved content
- Brings back all photos
- Perfect for continuing later

### Exporting to Share
Click **"📥 Export PDF"**
- Downloads an HTML file
- Includes all photos and text
- Open it and print to PDF (Ctrl/Cmd + P)
- Share with your loved one! 💕

### Starting Fresh
Click **"🌸 Begin Again"**
- Confirms before clearing
- Removes all content
- Gives you a clean slate

---

## 💡 Pro Tips

### For Best Results
- Use landscape photos (they look better!)
- Write from the heart (not for Instagram)
- Take your time with each section
- Save often while creating
- Export when you're done

### Photo Tips
- **Compress large photos** before uploading
- **Use meaningful images** - not just selfies
- **One photo per section** tells the story best
- **Quality over quantity** - pick your favorites

### Story Writing Tips
- Keep it personal and intimate
- Don't worry about perfect grammar
- Write like you're talking to them
- Include small details that matter
- It's okay to be vulnerable

---

## 🔍 Understanding the Interface

### Color Scheme
- **Purple** (#5B4D9D) - Main brand color
- **Coral** (#FF6B7A) - Accent/action color
- **Pink** (#FFB8C1) - Soft highlights
- **Light Purple** - Background gradient

### Animations
- **Heartbeat**: ❤️ pulses when sections appear
- **Fade In**: Sections smoothly appear on scroll
- **Hover Effects**: Buttons scale on hover
- **Scroll**: Smooth scrolling between sections

### Responsive Design
- **Desktop**: Full experience with wide sections
- **Tablet**: Optimized for touch
- **Mobile**: Single column, easy scrolling

---

## 🛠️ File Structure Overview

```
src/
├── components/           # Reusable UI components
│   ├── Hero.tsx         # Landing section
│   ├── TimelineSection.tsx  # Section wrapper
│   ├── PhotoUpload.tsx  # Photo handling
│   ├── ActionButtons.tsx    # Save/Load buttons
│   └── Footer.tsx       # Footer info
├── data/
│   └── sections.ts      # Timeline data
├── utils/
│   ├── storage.ts       # Save/Load logic
│   └── exportPDF.ts     # Export functionality
└── App.tsx              # Main component
```

---

## 🚀 Building for Production

### Create Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Anywhere
Upload the `dist` folder to:
- **Netlify** (drag & drop)
- **Vercel** (connect GitHub)
- **GitHub Pages** (free hosting)
- **Any static host**

---

## 🎨 Customization Ideas

### Change Section Content
Edit `src/data/sections.ts`:
```typescript
{
  id: 'custom-moment',
  title: 'Our Special Day',
  subtitle: 'The day everything changed...',
  placeholder: 'Tell the story...'
}
```

### Adjust Colors
Edit `tailwind.config.js`:
```javascript
'valentine-purple': '#YourColor',
'valentine-coral': '#YourColor',
```

### Modify Animations
Edit `tailwind.config.js`:
```javascript
animation: {
  'heartbeat': 'heartbeat 2s ease-in-out',
}
```

---

## ❓ Common Questions

### Q: Are my photos private?
**A:** Yes! Photos never leave your browser. They're stored locally as base64.

### Q: Can I access this on multiple devices?
**A:** Not automatically. But you can export and import the HTML file.

### Q: How big can my photos be?
**A:** Keep each under 2MB. Browser storage is typically 5-10MB total.

### Q: Can I add more than 6 sections?
**A:** Yes! Edit `src/data/sections.ts` to add more.

### Q: What if I accidentally delete everything?
**A:** Always export a backup! Once deleted from localStorage, it's gone.

### Q: Can I change the order of sections?
**A:** Yes, reorder them in `src/data/sections.ts`.

---

## 🐛 Troubleshooting

### Photos Not Showing
- Check file size (< 2MB)
- Try JPG or PNG format
- Clear browser cache
- Check console for errors (F12)

### "Storage Full" Error
- Remove some photos
- Export your timeline
- Clear old localStorage data
- Use browser's "Clear Data" feature

### Animations Laggy
- Close other browser tabs
- Update your browser
- Check CPU usage
- Reduce photo sizes

### Can't Save/Load
- Check if localStorage is enabled
- Try in a different browser
- Check if in incognito mode (saves won't persist)

---

## 💕 Making It Yours

This is your love story. Make it:
- **Personal**: Use inside jokes and memories
- **Honest**: Write what you really feel
- **Visual**: Let photos speak too
- **Timeless**: Create something you'll treasure

Remember: There's no right way to tell your story. Just yours.

---

## 🎁 Sharing Your Timeline

### Option 1: Export HTML
1. Click "Export PDF"
2. Open the HTML file
3. Print to PDF
4. Share via email/text

### Option 2: Host Online
1. Build for production
2. Deploy to free hosting
3. Share the URL
4. Keep it private or public

### Option 3: Screenshot
1. Scroll through your timeline
2. Take screenshots
3. Create a photo album
4. Share digitally or print

---

## 💌 Final Thoughts

This isn't just code. It's a love letter builder.

Take your time. Be honest. Add photos that matter. Write words that resonate.

When you're done, you'll have something beautiful that's truly *yours*.

Enjoy creating your Timeline of "Us"! ❤️

---

*This page remembers nothing. You do.* 💕
