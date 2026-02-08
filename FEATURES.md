# Features Documentation 📋

## Overview
Timeline of "Us" is a privacy-first, photo-enhanced love story builder with no accounts, no tracking, and complete user control.

---

## 📸 Photo Management

### Upload Methods
**1. Click Upload**
- Single click on upload area
- Native file picker opens
- Select any image format
- Instant preview

**2. Drag & Drop**
- Drag from desktop/folder
- Drop on designated area
- Visual feedback on hover
- Smooth upload animation

**3. Photo Management**
- Hover to reveal controls
- "Change Photo" button
- "Remove" button
- Confirmation on remove

### Supported Formats
- JPG/JPEG
- PNG
- WebP
- GIF

### Technical Details
- Photos stored as base64 in localStorage
- Automatic compression for large files
- Max recommended size: 2MB per photo
- Total storage: ~5-10MB (browser dependent)

### User Experience
- Preview before upload
- Crop/adjust in future versions
- Full-width display in timeline
- Maintains aspect ratio
- Rounded corners for aesthetic
- Shadow effects on hover

---

## ✍️ Story Writing

### Text Areas
- Expandable text fields
- Placeholder guidance
- Auto-resize on content
- No character limits
- Rich formatting support (future)

### Content Management
- Auto-save on "Save Locally"
- Draft preservation
- Clear content warnings
- Undo/redo (future feature)

### Writing Experience
- Focus states with coral borders
- Smooth transitions
- Non-intrusive placeholders
- Comfortable font sizes
- Optimal line spacing

---

## 💾 Data Persistence

### Save Functionality
**What Gets Saved:**
- All text content
- All photos (base64)
- Section order
- Timestamp of last save

**How It Works:**
- Click "Save Locally"
- Data serialized to JSON
- Stored in browser localStorage
- Success notification
- Error handling for full storage

### Load Functionality
**What Gets Loaded:**
- Previously saved text
- Previously saved photos
- Maintains section order
- Shows last saved date (future)

**How It Works:**
- Click "Load Story"
- Retrieves from localStorage
- Deserializes JSON data
- Populates all fields
- Success confirmation

### Storage Details
- **Key**: `valentine-timeline-data`
- **Format**: JSON
- **Size**: ~5-10MB typical limit
- **Persistence**: Until cleared
- **Security**: Local only, never transmitted

---

## 📥 Export & Sharing

### Export Feature
**Export to HTML:**
- Generates standalone HTML file
- Embeds all photos (base64)
- Includes all text content
- Formatted for printing
- Beautiful layout preserved

**How to Use:**
1. Click "Export PDF"
2. HTML file downloads
3. Open in any browser
4. Print to PDF (Ctrl/Cmd + P)
5. Save or share the PDF

**Export Contents:**
- Timeline title
- Creation date
- All 6 sections with:
  - Section numbers
  - Titles and subtitles
  - Photos (if added)
  - Written stories
  - Heart separators
- Privacy footer

### PDF Generation
**Print Settings (Recommended):**
- Paper: Letter or A4
- Orientation: Portrait
- Margins: Default
- Background graphics: ON
- Headers/footers: OFF

**Quality:**
- High-res photos
- Clean typography
- Proper page breaks
- Print-optimized colors

---

## 🎨 Design System

### Color Palette
```css
Primary Purple: #5B4D9D
Coral/Red: #FF6B7A
Light Pink: #FFB8C1
Light Purple BG: #D4D4F5
Gradient BG: #B8B5E8
```

### Typography
- **Headers**: Bold, large, purple
- **Body**: Regular, comfortable reading
- **Placeholders**: Italic, muted
- **Font Stack**: System fonts for performance

### Spacing
- **Sections**: 32rem apart (8 × 4rem)
- **Content Padding**: 8-12 (responsive)
- **Card Spacing**: Generous, breathable
- **Line Height**: 1.6-1.8 for readability

### Animations
**Heartbeat:**
- Duration: 1.5s
- Easing: ease-in-out
- Scale: 1.0 → 1.1 → 1.0
- Infinite loop

**Fade In:**
- Duration: 1s
- Easing: ease-out
- Opacity: 0 → 1
- Translate: 20px up

**Scroll Triggers:**
- Intersection Observer API
- Threshold: 30% visible
- Once per section
- Staggered appearance

---

## 🔒 Privacy & Security

### Data Location
- **Local Storage Only**
- Never sent to servers
- Never tracked or analyzed
- Never shared with third parties
- Completely user-controlled

### What We DON'T Do
- ❌ No user accounts
- ❌ No authentication
- ❌ No analytics
- ❌ No cookies
- ❌ No tracking pixels
- ❌ No external requests
- ❌ No cloud sync

### What Users Control
- ✅ Save locally or not
- ✅ Export when they want
- ✅ Clear anytime
- ✅ Share on their terms
- ✅ Complete ownership

### Technical Security
- XSS protection via React
- CSRF not applicable (no server)
- No SQL injection risk
- No authentication to hack
- Client-side only

---

## 📱 Responsive Design

### Desktop (1024px+)
- Full-width sections
- Large photos (max 64h)
- Multi-column buttons
- Spacious layout
- Hover effects enabled

### Tablet (768px - 1023px)
- Adjusted padding
- Optimized photo sizes
- Touch-friendly buttons
- Maintained readability

### Mobile (< 768px)
- Single column
- Full-width components
- Larger touch targets
- Vertical button stacks
- Optimized font sizes

### Accessibility
- Semantic HTML
- ARIA labels (future)
- Keyboard navigation
- Screen reader friendly
- High contrast ratios

---

## 🚀 Performance

### Optimization Techniques
- Code splitting via Vite
- Lazy loading (future)
- Image optimization
- Minimal dependencies
- Tree shaking enabled

### Loading Times
- Initial load: < 1s
- Interaction response: < 100ms
- Smooth 60fps animations
- No jank or stuttering

### Bundle Size
- React + ReactDOM: ~140KB
- Tailwind (purged): ~10KB
- Custom code: ~20KB
- Total (gzipped): ~50KB

---

## 🔮 Future Features

### Planned Enhancements
- [ ] Image cropping/editing
- [ ] Multiple photos per section
- [ ] Rich text formatting
- [ ] Custom section creation
- [ ] Theme customization
- [ ] Cloud backup (optional)
- [ ] Collaboration mode
- [ ] Mobile apps
- [ ] Print-ready templates
- [ ] Video support
- [ ] Audio notes
- [ ] Calendar integration

### Community Requests
We're open to suggestions! Future development based on user feedback.

---

## 🛠️ Technical Stack

### Core Technologies
- **React 18**: Modern hooks, concurrent features
- **TypeScript**: Type safety, better DX
- **Vite**: Fast builds, HMR
- **Tailwind CSS**: Utility-first styling

### Browser APIs
- **localStorage**: Data persistence
- **FileReader**: Photo uploads
- **Intersection Observer**: Scroll animations
- **Blob**: File exports

### Build Tools
- **PostCSS**: CSS processing
- **Autoprefixer**: Browser compatibility
- **TypeScript Compiler**: Type checking
- **Vite Plugin React**: JSX transformation

---

## 📊 Specifications

### Technical Limits
- **Max sections**: Unlimited (memory dependent)
- **Max photo size**: 2MB recommended
- **Total storage**: ~5-10MB browser limit
- **Supported browsers**: Modern evergreen
- **Min resolution**: 320px width

### Performance Targets
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

---

## 🎯 Use Cases

### Perfect For
- Valentine's Day gifts
- Anniversary presents
- Relationship milestones
- Long-distance couples
- Wedding memories
- First date recollections
- Proposal stories
- Family histories

### Not Designed For
- Public sharing (it's private!)
- Social media (no accounts)
- Group collaboration (single user)
- Commercial use
- Data collection

---

## 💡 Tips & Best Practices

### Photo Tips
- Use meaningful images
- Compress before uploading
- Landscape orientation works best
- Keep it personal, not polished
- Quality over quantity

### Writing Tips
- Write from the heart
- Be specific with details
- Include emotions, not just events
- It's okay to be vulnerable
- Grammar doesn't matter

### Workflow Tips
- Write drafts first
- Add photos last
- Save frequently
- Export backups
- Take your time

---

## 🐛 Known Limitations

### Browser Storage
- Limited to ~5-10MB total
- Cleared if browser data cleared
- Not synced across devices
- Incognito mode doesn't persist

### Photo Handling
- No editing capabilities
- Base64 increases size ~33%
- Large photos = slower load
- GIF animation limited

### Export
- HTML, not native PDF
- Requires print-to-PDF
- Page breaks not perfect
- Some formatting may vary

---

## 🔄 Updates & Maintenance

### Version History
- **v1.0.0**: Initial release with photos
- **v0.1.0**: Original text-only version

### Maintenance
- Regular security updates
- Bug fixes as reported
- Performance improvements
- Feature additions based on feedback

---

*Built with ❤️ for lovers everywhere*