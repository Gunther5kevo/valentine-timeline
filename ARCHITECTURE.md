# Component Architecture 🏗️

## Component Hierarchy

```
App.tsx (Root)
├── Hero.tsx
├── TimelineSection.tsx (× 6)
│   ├── PhotoUpload.tsx
│   └── Textarea (native)
├── ActionButtons.tsx
└── Footer.tsx
```

---

## Detailed Component Breakdown

### 🎯 App.tsx
**Purpose:** Root application component, manages global state

**Responsibilities:**
- State management (stories, photos, visibility)
- Intersection Observer setup
- Save/Load/Clear handlers
- Export functionality
- Coordinates all child components

**State:**
```typescript
- userStories: Record<string, string>
- userPhotos: Record<string, string | null>
- visibleSections: Set<string>
- sectionRefs: Record<string, HTMLElement | null>
```

**Key Functions:**
```typescript
handleStoryChange(id: string, value: string)
handlePhotoChange(id: string, photo: string | null)
handleSaveLocally()
handleLoadLocally()
handleClear()
handleExport()
```

**Props Passed Down:**
- Section data
- User stories
- User photos
- Handler functions
- Visibility state

---

### 🎨 Hero.tsx
**Purpose:** Landing page hero section

**Features:**
- Animated floating hearts background
- Main title and tagline
- Scroll indicator
- Responsive typography

**Structure:**
```tsx
<header>
  <div> {/* Floating hearts */}
    {20 hearts with random positions}
  </div>
  <div> {/* Content */}
    <h1>Timeline of "Us"</h1>
    <p>Subtitle</p>
  </div>
  <div> {/* Scroll indicator */}
    <svg>Arrow down</svg>
  </div>
</header>
```

**Styling:**
- Min-height: 100vh
- Centered flex layout
- Absolute positioned hearts
- Staggered animations

---

### 📖 TimelineSection.tsx
**Purpose:** Individual timeline section wrapper

**Props:**
```typescript
interface TimelineSectionProps {
  section: Section
  index: number
  isVisible: boolean
  userStory: string
  photo: string | null
  onStoryChange: (id: string, value: string) => void
  onPhotoChange: (id: string, photo: string | null) => void
  sectionRef: (el: HTMLElement | null) => void
}
```

**Features:**
- Section number badge
- Heartbeat animation on appear
- Photo upload integration
- Story textarea
- Scroll-triggered visibility

**Structure:**
```tsx
<section>
  <div> {/* Number badge + line */}
    <div>{index + 1}</div>
    <div>{/* gradient line */}</div>
  </div>
  
  {isVisible && <div>❤️</div>}
  
  <div> {/* Content card */}
    <h2>{title}</h2>
    <p>{subtitle}</p>
    <PhotoUpload {...props} />
    <textarea {...props} />
  </div>
</section>
```

**Local State:**
```typescript
showHeart: boolean (delayed after isVisible)
```

**Styling:**
- Fade-in animation
- Translate-y animation
- White card with backdrop blur
- Hover shadow effect

---

### 📸 PhotoUpload.tsx
**Purpose:** Handle photo upload, display, and management

**Props:**
```typescript
interface PhotoUploadProps {
  sectionId: string
  photo: string | null
  onPhotoChange: (sectionId: string, photo: string | null) => void
}
```

**Local State:**
```typescript
isDragging: boolean
fileInputRef: RefObject<HTMLInputElement>
```

**Features:**
1. **Upload Area** (when no photo)
   - Click to upload
   - Drag & drop
   - Visual feedback on drag
   - File type validation

2. **Photo Display** (when photo exists)
   - Full-width image
   - Hover overlay
   - "Change Photo" button
   - "Remove" button

**Key Functions:**
```typescript
handleFileSelect(file: File)
handleDrop(e: DragEvent)
handleDragOver(e: DragEvent)
handleDragLeave()
handleInputChange(e: ChangeEvent)
handleRemovePhoto()
```

**File Handling:**
```typescript
// Convert to base64
const reader = new FileReader()
reader.onloadend = () => {
  onPhotoChange(sectionId, reader.result as string)
}
reader.readAsDataURL(file)
```

**Styling States:**
- Default: Dashed border
- Dragging: Coral border + scale
- Hover: Lighter background
- Photo view: Full opacity overlay on hover

---

### 🎬 ActionButtons.tsx
**Purpose:** Save, load, export, and clear actions

**Props:**
```typescript
interface ActionButtonsProps {
  onSave: () => void
  onLoad: () => void
  onClear: () => void
  onExport: () => void
}
```

**Structure:**
```tsx
<section>
  <div> {/* Gradient card */}
    <h2>Will you continue the story?</h2>
    <p>Subtitle</p>
    
    <div> {/* Button group */}
      <button onClick={onSave}>💾 Save Locally</button>
      <button onClick={onLoad}>✨ Load Story</button>
      <button onClick={onExport}>📥 Export PDF</button>
      <button onClick={onClear}>🌸 Begin Again</button>
    </div>
    
    <div> {/* Info text */}
      <p>💡 Your story is saved in your browser</p>
    </div>
  </div>
</section>
```

**Button Hierarchy:**
- Primary: Save (solid white)
- Secondary: Load, Export (translucent)
- Tertiary: Clear (bordered)

**Responsive:**
- Desktop: Horizontal row
- Mobile: Vertical stack

---

### 🦶 Footer.tsx
**Purpose:** Privacy info and branding

**Structure:**
```tsx
<footer>
  <div>
    <p>This page remembers nothing. You do.</p>
    
    <div> {/* Privacy points */}
      <p>🔒 Privacy by Design</p>
      <div> {/* Checkmarks */}
        <span>✓ No accounts</span>
        <span>✓ No tracking</span>
        ...
      </div>
    </div>
    
    <div> {/* Made with love */}
      <p>Made with ❤️ for lovers everywhere</p>
    </div>
  </div>
</footer>
```

**Styling:**
- Centered text
- Muted colors
- Border separator
- Spacious padding

---

## Utility Modules

### 💾 storage.ts
**Purpose:** localStorage operations

**Interface:**
```typescript
interface StoryData {
  stories: Record<string, string>
  photos: Record<string, string | null>
  lastSaved: string
}
```

**Functions:**
```typescript
storage.save(data: StoryData): void
storage.load(): StoryData | null
storage.clear(): void
storage.export(data: StoryData): Blob
storage.import(file: File): Promise<StoryData>
```

**Error Handling:**
- Try-catch on all operations
- User-friendly error messages
- Graceful degradation
- Console logging for debugging

---

### 📄 exportPDF.ts
**Purpose:** HTML/PDF export generation

**Functions:**
```typescript
exportToPDF(
  data: StoryData,
  sections: Section[]
): string

downloadPDF(
  html: string,
  filename?: string
): void
```

**HTML Generation:**
- Inline CSS for portability
- Embedded base64 images
- Print-optimized layout
- Page break handling

**Features:**
- Responsive design
- Print-friendly colors
- Proper typography
- Section separators

---

## Data Flow

### 1. Photo Upload Flow
```
User selects file
    ↓
PhotoUpload.handleFileSelect()
    ↓
FileReader.readAsDataURL()
    ↓
onPhotoChange(sectionId, base64)
    ↓
App.handlePhotoChange()
    ↓
setUserPhotos({...photos, [id]: base64})
    ↓
Re-render TimelineSection
    ↓
PhotoUpload shows image
```

### 2. Save Flow
```
User clicks "Save Locally"
    ↓
App.handleSaveLocally()
    ↓
storage.save({stories, photos, lastSaved})
    ↓
localStorage.setItem('valentine-timeline-data', JSON)
    ↓
Success alert
```

### 3. Load Flow
```
User clicks "Load Story"
    ↓
App.handleLoadLocally()
    ↓
storage.load()
    ↓
localStorage.getItem('valentine-timeline-data')
    ↓
JSON.parse()
    ↓
setUserStories() + setUserPhotos()
    ↓
All sections re-render with data
```

### 4. Export Flow
```
User clicks "Export PDF"
    ↓
App.handleExport()
    ↓
exportToPDF(data, sections)
    ↓
Generate HTML string
    ↓
downloadPDF(html, filename)
    ↓
Create Blob + download link
    ↓
Browser downloads HTML file
```

---

## State Management Strategy

### Why No Redux/Context?
- Simple prop drilling is sufficient
- Only 2-3 levels deep
- Clear data flow
- Easy to debug
- Minimal boilerplate

### Lifting State Up
- App.tsx owns all state
- Children receive via props
- One-way data flow
- Predictable updates

### Local Component State
- PhotoUpload: `isDragging`
- TimelineSection: `showHeart`
- Minimal, UI-only state

---

## Performance Considerations

### Intersection Observer
```typescript
// Efficient scroll detection
const observer = new IntersectionObserver(
  entries => { /* ... */ },
  { threshold: 0.3 }
)
```

**Benefits:**
- No scroll event listeners
- Battery efficient
- Smooth performance
- Lazy animation triggers

### Image Optimization
- Base64 stored in memory
- No external requests
- Instant display
- Local caching

### Re-render Prevention
- Proper key props
- Stable function references
- Minimal state updates
- React.memo (if needed)

---

## Testing Strategy (Future)

### Unit Tests
- Storage utilities
- Export functions
- Data transformations
- Error handling

### Component Tests
- PhotoUpload interactions
- Form submissions
- Button clicks
- State updates

### Integration Tests
- Full user flows
- Save → Load
- Upload → Export
- Clear data

### E2E Tests
- Complete workflows
- Browser compatibility
- Mobile responsiveness
- Print output

---

## Accessibility (Future Enhancements)

### ARIA Labels
```tsx
<button
  onClick={onSave}
  aria-label="Save your timeline locally"
>
  💾 Save Locally
</button>
```

### Keyboard Navigation
- Tab order
- Enter/Space activation
- Escape to cancel
- Arrow key navigation

### Screen Readers
- Semantic HTML
- Alt text for images
- Label associations
- Status announcements

### Focus Management
- Visible focus states
- Skip links
- Focus trapping in modals
- Logical tab order

---

## Browser Compatibility

### Supported Browsers
- Chrome/Edge: 90+
- Firefox: 90+
- Safari: 14+
- Mobile browsers: Modern

### Required Features
- ES6+ JavaScript
- Intersection Observer API
- FileReader API
- localStorage API
- Flexbox & Grid
- CSS Custom Properties

### Polyfills
- None currently required
- Modern browsers only
- Progressive enhancement

---

*Built with React + TypeScript + Tailwind* ⚛️