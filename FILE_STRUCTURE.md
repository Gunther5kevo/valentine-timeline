# 📁 Project File Structure

## Complete File Tree

```
valentine-timeline/
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tsconfig.node.json          # TypeScript config for Node
│   ├── vite.config.ts              # Vite build configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   └── .gitignore                  # Git ignore rules
│
├── 📄 Entry Files
│   └── index.html                  # HTML entry point
│
├── 📁 src/
│   │
│   ├── 📄 Main Files
│   │   ├── App.tsx                 # Root component (state management)
│   │   ├── main.tsx                # Application entry point
│   │   └── index.css               # Global styles
│   │
│   ├── 📁 components/              # React components
│   │   ├── Hero.tsx                # Landing hero section
│   │   ├── TimelineSection.tsx     # Individual timeline section
│   │   ├── PhotoUpload.tsx         # Photo upload & management
│   │   ├── ActionButtons.tsx       # Save/Load/Export buttons
│   │   └── Footer.tsx              # Footer with privacy info
│   │
│   ├── 📁 data/                    # Static data
│   │   └── sections.ts             # Timeline section definitions
│   │
│   └── 📁 utils/                   # Utility functions
│       ├── storage.ts              # localStorage operations
│       └── exportPDF.ts            # PDF export functionality
│
└── 📄 Documentation
    ├── README.md                   # Main documentation
    ├── QUICK_START.md              # Getting started guide
    ├── FEATURES.md                 # Feature documentation
    ├── ARCHITECTURE.md             # Technical architecture
    ├── DEPLOYMENT.md               # Deployment guide
    ├── DEVELOPMENT.md              # Developer guide
    ├── PROJECT_SUMMARY.md          # Complete overview
    └── setup.sh                    # Setup helper script
```

---

## File Descriptions

### Configuration Files (Root Level)

#### package.json
- Lists all dependencies (React, TypeScript, Tailwind, Vite)
- Defines npm scripts (dev, build, preview)
- Project metadata

#### tsconfig.json
- TypeScript compiler settings
- Strict mode enabled
- React JSX configuration

#### vite.config.ts
- Vite bundler configuration
- React plugin setup
- Build optimizations

#### tailwind.config.js
- Custom color palette (purple, coral, pink)
- Custom animations (heartbeat, fade-in)
- Content paths for purging

#### postcss.config.js
- PostCSS plugins
- Tailwind CSS processing
- Autoprefixer for browser compatibility

---

### Source Files (src/)

#### Main Files

**App.tsx** (299 lines)
- Root component
- Global state management
- Intersection Observer setup
- Save/Load/Export handlers

**main.tsx** (9 lines)
- React app initialization
- Root DOM render

**index.css** (18 lines)
- Tailwind directives
- Global styles
- Font configuration

---

#### Components (src/components/)

**Hero.tsx** (40 lines)
- Landing page hero
- Floating hearts animation
- Main title and tagline
- Scroll indicator

**TimelineSection.tsx** (85 lines)
- Timeline section wrapper
- Section number badge
- Heartbeat animation trigger
- Photo and text integration

**PhotoUpload.tsx** (120 lines)
- Photo upload handling
- Drag & drop support
- File validation
- Photo preview and controls

**ActionButtons.tsx** (55 lines)
- Save/Load/Export/Clear buttons
- Button group layout
- Responsive design
- Info text

**Footer.tsx** (25 lines)
- Privacy information
- Footer links
- Branding

---

#### Data (src/data/)

**sections.ts** (40 lines)
- Timeline section definitions
- Title, subtitle, placeholder text
- Section IDs
- Easy to modify

---

#### Utils (src/utils/)

**storage.ts** (60 lines)
- localStorage save/load operations
- Error handling
- Data serialization
- Export/import functions

**exportPDF.ts** (140 lines)
- HTML generation for export
- Inline CSS for portability
- Photo embedding (base64)
- Download functionality

---

## How Files Work Together

### Data Flow

```
User Action
    ↓
Event Handler (in Component)
    ↓
Callback to App.tsx
    ↓
State Update
    ↓
Re-render Components
    ↓
Updated UI
```

### Import Chain

```
index.html
    → main.tsx
        → App.tsx
            → Hero.tsx
            → TimelineSection.tsx
                → PhotoUpload.tsx
            → ActionButtons.tsx
            → Footer.tsx
            → sections.ts (data)
            → storage.ts (utils)
            → exportPDF.ts (utils)
```

---

## File Sizes (Approximate)

| File | Lines | Size | Purpose |
|------|-------|------|---------|
| App.tsx | 90 | 3KB | Main logic |
| Hero.tsx | 40 | 1.5KB | Landing page |
| TimelineSection.tsx | 85 | 3KB | Section wrapper |
| PhotoUpload.tsx | 120 | 4KB | Photo handling |
| ActionButtons.tsx | 55 | 2KB | Action buttons |
| Footer.tsx | 25 | 1KB | Footer |
| sections.ts | 40 | 1KB | Data |
| storage.ts | 60 | 2KB | Storage utils |
| exportPDF.ts | 140 | 5KB | Export utils |
| **Total** | **655** | **22.5KB** | All source |

---

## Key Files to Edit

### For Customization

**Most Common Changes:**
1. `src/data/sections.ts` - Change section content
2. `tailwind.config.js` - Change colors/animations
3. `src/components/TimelineSection.tsx` - Modify section layout
4. `src/components/Hero.tsx` - Change landing page

**Less Common:**
- `src/App.tsx` - Add features, change logic
- `src/utils/storage.ts` - Modify data handling
- `src/utils/exportPDF.ts` - Change export format

---

## Files You Can Ignore

**Don't Need to Touch:**
- `tsconfig.json` - Works out of the box
- `postcss.config.js` - Standard config
- `vite.config.ts` - Default Vite setup
- `.gitignore` - Standard ignore rules

---

## Adding New Files

### New Component
1. Create `src/components/NewComponent.tsx`
2. Import in `App.tsx`
3. Use in render

### New Utility
1. Create `src/utils/newUtil.ts`
2. Export functions
3. Import where needed

### New Data
1. Create `src/data/newData.ts`
2. Export data
3. Import in components

---

## File Dependencies

### App.tsx depends on:
- All components (Hero, TimelineSection, etc.)
- sections.ts (data)
- storage.ts (utils)
- exportPDF.ts (utils)

### TimelineSection.tsx depends on:
- PhotoUpload.tsx
- sections.ts (type definitions)

### PhotoUpload.tsx depends on:
- Nothing! (Pure component)

---

## Build Output

After running `npm run build`:

```
dist/
├── index.html           # Optimized HTML
├── assets/
│   ├── index-[hash].js  # Bundled JavaScript
│   └── index-[hash].css # Bundled CSS
```

Size: ~50KB gzipped total

---

## Quick Reference

### To modify section content:
→ `src/data/sections.ts`

### To change colors:
→ `tailwind.config.js`

### To add a new section type:
→ `src/components/TimelineSection.tsx`

### To change storage logic:
→ `src/utils/storage.ts`

### To modify export format:
→ `src/utils/exportPDF.ts`

---

*All files are in `/mnt/user-data/outputs/valentine-timeline/`*