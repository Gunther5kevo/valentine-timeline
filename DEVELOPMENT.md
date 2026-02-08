# Development Guide 👨‍💻

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Code editor (VS Code recommended)
- Modern web browser

### Initial Setup
```bash
# Clone or download the project
cd valentine-timeline

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Development Commands

### Available Scripts
```bash
# Development server with HMR
npm run dev

# Type checking
npm run type-check  # (if added)

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if added)
npm run lint
```

---

## Project Structure

### Directory Layout
```
valentine-timeline/
├── public/              # Static assets (future)
├── src/
│   ├── components/      # React components
│   ├── data/           # Static data
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML entry
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind config
└── vite.config.ts      # Vite config
```

### File Naming Conventions
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or `*.types.ts`
- Styles: `*.css`

---

## Component Development

### Creating a New Component

1. **Create file in src/components/**
```tsx
// src/components/MyComponent.tsx
import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState('');
  
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Click me</button>
    </div>
  );
}
```

2. **Import and use**
```tsx
// In another component
import MyComponent from './components/MyComponent';

function App() {
  return (
    <MyComponent 
      title="Hello" 
      onAction={() => console.log('clicked')} 
    />
  );
}
```

### Component Best Practices
- Keep components small and focused
- Use TypeScript interfaces for props
- Export as default for main components
- Use named exports for utilities
- Add JSDoc comments for complex logic

---

## Styling

### Tailwind CSS Classes

#### Common Utilities
```tsx
// Layout
<div className="flex items-center justify-center">
<div className="grid grid-cols-3 gap-4">

// Spacing
<div className="p-4 m-2 space-y-4">

// Colors
<div className="bg-valentine-purple text-white">

// Responsive
<div className="text-sm md:text-lg lg:text-xl">
```

#### Custom Colors
Defined in `tailwind.config.js`:
```javascript
'valentine-purple': '#5B4D9D'
'valentine-coral': '#FF6B7A'
'valentine-pink': '#FFB8C1'
'valentine-light': '#B8B5E8'
'valentine-bg': '#D4D4F5'
```

### Adding New Styles

1. **Use Tailwind utilities first**
2. **For custom CSS, add to index.css**:
```css
@layer utilities {
  .custom-class {
    /* your styles */
  }
}
```

3. **Or add to tailwind.config.js**:
```javascript
extend: {
  utilities: {
    '.custom-utility': {
      property: 'value'
    }
  }
}
```

---

## TypeScript

### Type Definitions

#### Component Props
```typescript
interface ComponentProps {
  // Required
  title: string;
  count: number;
  
  // Optional
  description?: string;
  
  // Functions
  onClick: () => void;
  onChange: (value: string) => void;
  
  // Complex types
  items: Array<{ id: string; name: string }>;
  data: Record<string, any>;
}
```

#### Custom Types
```typescript
// In types.ts or component file
type Status = 'idle' | 'loading' | 'success' | 'error';

interface User {
  id: string;
  name: string;
  email: string;
}

type Callback<T> = (value: T) => void;
```

### Type Safety Tips
- Always define prop interfaces
- Use `Record<string, Type>` for objects
- Prefer `unknown` over `any`
- Use type guards for runtime checks

---

## State Management

### Component State
```tsx
import { useState } from 'react';

function MyComponent() {
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>([]);
  
  // Update state
  setText('new value');
  setItems([...items, 'new item']);
  
  return <div>{text}</div>;
}
```

### Lifting State Up
```tsx
// Parent component
function Parent() {
  const [sharedState, setSharedState] = useState('');
  
  return (
    <>
      <Child1 value={sharedState} onChange={setSharedState} />
      <Child2 value={sharedState} />
    </>
  );
}
```

### useEffect for Side Effects
```tsx
import { useEffect } from 'react';

function Component() {
  useEffect(() => {
    // Run on mount
    console.log('mounted');
    
    // Cleanup on unmount
    return () => {
      console.log('unmounted');
    };
  }, []); // Empty deps = run once
  
  useEffect(() => {
    // Run when value changes
    console.log('value changed');
  }, [value]);
}
```

---

## Working with Storage

### Using storage.ts utility
```typescript
import { storage } from './utils/storage';

// Save data
const data = {
  stories: { section1: 'text' },
  photos: { section1: 'base64...' },
  lastSaved: new Date().toISOString()
};
storage.save(data);

// Load data
const loaded = storage.load();
if (loaded) {
  console.log(loaded.stories);
}

// Clear data
storage.clear();
```

### localStorage Directly
```typescript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key') || '{}');

// Remove
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

---

## Photo Handling

### FileReader API
```typescript
const handleFileSelect = (file: File) => {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Do something with base64
    };
    
    reader.onerror = () => {
      console.error('Failed to read file');
    };
    
    reader.readAsDataURL(file);
  }
};
```

### Drag & Drop
```tsx
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  handleFileSelect(file);
};

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
};

return (
  <div 
    onDrop={handleDrop}
    onDragOver={handleDragOver}
  >
    Drop here
  </div>
);
```

---

## Animations

### Tailwind Animations
```tsx
// In tailwind.config.js
animation: {
  'fade-in': 'fadeIn 1s ease-out',
  'heartbeat': 'heartbeat 1.5s ease-in-out'
}

keyframes: {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  }
}
```

### Usage
```tsx
<div className="animate-fade-in">
  Content
</div>
```

### Intersection Observer
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.3 }
  );
  
  // Observe elements
  const elements = document.querySelectorAll('.observe-me');
  elements.forEach(el => observer.observe(el));
  
  return () => observer.disconnect();
}, []);
```

---

## Debugging

### Browser DevTools

#### Console Logging
```typescript
console.log('Simple log');
console.error('Error message');
console.warn('Warning');
console.table({ key: 'value' });
```

#### React DevTools
1. Install React DevTools extension
2. Open DevTools
3. Go to "Components" tab
4. Inspect props and state

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Common fixes
- Add missing types
- Check import paths
- Verify prop interfaces
```

### Runtime Errors
```typescript
try {
  // Risky code
  localStorage.setItem('key', value);
} catch (error) {
  console.error('Failed:', error);
  // Handle gracefully
}
```

---

## Testing (Future)

### Unit Tests (Vitest)
```typescript
import { describe, it, expect } from 'vitest';
import { storage } from './storage';

describe('storage', () => {
  it('should save and load data', () => {
    const data = { stories: {}, photos: {} };
    storage.save(data);
    const loaded = storage.load();
    expect(loaded).toEqual(data);
  });
});
```

### Component Tests (React Testing Library)
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should handle button click', async () => {
  render(<MyComponent />);
  const button = screen.getByText('Click me');
  await userEvent.click(button);
  expect(screen.getByText('Clicked')).toBeInTheDocument();
});
```

---

## Performance

### Optimization Tips

1. **Memoization**
```typescript
import { useMemo, useCallback } from 'react';

const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

2. **Code Splitting**
```typescript
const LazyComponent = lazy(() => import('./LazyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

3. **Image Optimization**
- Compress before upload
- Use appropriate formats
- Lazy load images

---

## Git Workflow

### Branching
```bash
# Create feature branch
git checkout -b feature/photo-editing

# Work on feature
git add .
git commit -m "Add photo editing"

# Merge to main
git checkout main
git merge feature/photo-editing
```

### Commit Messages
```
feat: Add photo cropping
fix: Fix storage overflow bug
docs: Update README
style: Format code
refactor: Simplify PhotoUpload
```

---

## Common Tasks

### Adding a New Section
1. Edit `src/data/sections.ts`
2. Add new section object
3. Component will auto-render

### Changing Colors
1. Edit `tailwind.config.js`
2. Update color values
3. Save and see changes

### Adding a Feature
1. Create new component
2. Add to App.tsx
3. Test thoroughly
4. Update docs

---

## Troubleshooting

### Hot Module Replacement Not Working
```bash
# Restart dev server
npm run dev
```

### TypeScript Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for type errors
npx tsc --noEmit

# Clear cache
rm -rf dist node_modules/.vite
npm run build
```

---

## Code Quality

### Prettier (Add if needed)
```bash
npm install -D prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### ESLint (Add if needed)
```bash
npm install -D eslint @typescript-eslint/parser
```

---

## Best Practices

### Do's ✅
- Write clean, readable code
- Add TypeScript types
- Use meaningful variable names
- Comment complex logic
- Test before committing
- Keep components small
- Follow existing patterns

### Don'ts ❌
- Don't use `any` type
- Don't ignore TypeScript errors
- Don't commit console.logs
- Don't over-optimize early
- Don't skip documentation
- Don't break existing features

---

## Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [VS Code](https://code.visualstudio.com)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

## Getting Help

### Steps to Debug
1. Check console for errors
2. Verify types are correct
3. Review recent changes
4. Test in different browser
5. Search error message
6. Ask for help with details

### Include When Asking
- Error message
- Code snippet
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS info

---

**Happy coding! 💻❤️**