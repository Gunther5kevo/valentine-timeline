# Deployment Guide 🚀

## Build Your Project

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Step 3: Test Production Build
```bash
npm run preview
```

---

## Deployment Options

### 🌟 Option 1: Netlify (Recommended - Easiest)

#### Method A: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag the `dist` folder onto Netlify
4. Done! Your site is live

#### Method B: GitHub Integration
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

**Benefits:**
- Free hosting
- Automatic SSL
- Custom domains
- Instant deploys
- Form handling
- Split testing

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### ⚡ Option 2: Vercel

#### Deploy Steps
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Done!

#### Or via Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub
3. Auto-detects Vite project
4. Deploy

**vercel.json** (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Benefits:**
- Edge network
- Instant cache invalidation
- Automatic previews
- Analytics
- Free SSL

---

### 🐙 Option 3: GitHub Pages

#### Setup
1. Install gh-pages: `npm install --save-dev gh-pages`

2. Add to package.json:
```json
{
  "homepage": "https://yourusername.github.io/valentine-timeline",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update vite.config.ts:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/valentine-timeline/'
})
```

4. Deploy:
```bash
npm run deploy
```

**Benefits:**
- Free hosting
- GitHub integration
- Version control
- Custom domains

---

### 🔵 Option 4: Cloudflare Pages

#### Deploy Steps
1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect repository
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

**Benefits:**
- Global CDN
- Unlimited bandwidth
- DDoS protection
- Web analytics
- Free

---

### 🪣 Option 5: AWS S3 + CloudFront

#### Setup S3 Bucket
```bash
# Create bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync dist/ s3://your-bucket-name

# Enable static hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html
```

#### Setup CloudFront
1. Create distribution
2. Set origin to S3 bucket
3. Enable SSL
4. Set default root object: `index.html`

**Benefits:**
- Ultimate control
- High performance
- Custom configurations
- Scalable

---

### 🔴 Option 6: Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Select dist as public directory
# Configure as SPA: Yes

# Deploy
firebase deploy
```

**firebase.json**:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Benefits:**
- Google infrastructure
- Free SSL
- Custom domains
- Analytics integration

---

### 💧 Option 7: DigitalOcean App Platform

#### Deploy Steps
1. Push to GitHub
2. Go to DigitalOcean
3. Create new app
4. Connect repository
5. Detect Vite build
6. Deploy

**Benefits:**
- Simple setup
- Auto-scaling
- Built-in CI/CD
- $5/month

---

## Custom Domain Setup

### For Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS:
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

### For Vercel
1. Go to Project Settings
2. Add domain
3. Follow DNS instructions
4. SSL auto-configured

### For GitHub Pages
1. Add CNAME file to `public/`:
```
yourdomain.com
```
2. Configure DNS:
```
Type: A
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

---

## Environment Variables

### If You Add API Keys (Future)

#### .env.local
```bash
VITE_API_KEY=your_key_here
VITE_API_URL=https://api.example.com
```

#### Access in Code
```typescript
const apiKey = import.meta.env.VITE_API_KEY
```

#### Platform-Specific

**Netlify:**
- Add in Site Settings → Environment Variables

**Vercel:**
- Add in Project Settings → Environment Variables

**GitHub Pages:**
- Use GitHub Secrets

---

## SSL/HTTPS

### Automatic (Most Platforms)
- Netlify: Auto
- Vercel: Auto
- Cloudflare: Auto
- Firebase: Auto

### Manual (S3)
- Use AWS Certificate Manager
- Attach to CloudFront distribution

**Important:** Always use HTTPS for localStorage security!

---

## Performance Optimization

### Pre-Deployment Checklist
- [ ] Run `npm run build`
- [ ] Check bundle size
- [ ] Test in production mode
- [ ] Optimize images
- [ ] Enable gzip/brotli
- [ ] Set cache headers

### Build Optimization
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
})
```

---

## Monitoring & Analytics

### Google Analytics (Optional)
```typescript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (Privacy-Focused)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Continuous Deployment

### GitHub Actions

**.github/workflows/deploy.yml**:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Testing Before Deploy

### Local Production Test
```bash
npm run build
npm run preview
```

### Check These:
- [ ] All photos load
- [ ] Save/Load works
- [ ] Export downloads correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Fast load time

### Browser Testing
- Chrome
- Firefox
- Safari
- Edge
- Mobile Safari
- Mobile Chrome

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Refresh
Add redirect rules for SPA:

**Netlify** (_redirects file in public/):
```
/*  /index.html  200
```

**Vercel** (vercel.json):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Images Not Loading
- Check relative paths
- Verify image imports
- Check build output

### localStorage Not Working
- Ensure HTTPS
- Check browser privacy settings
- Verify domain consistency

---

## Post-Deployment

### Share Your Site
- QR code generator
- Short URL service
- Social media cards

### Maintenance
- Monitor performance
- Check error logs
- Update dependencies
- Fix bugs reported
- Add features

### Backups
```bash
# Backup dist folder
tar -czf dist-backup-$(date +%Y%m%d).tar.gz dist/

# Backup to cloud
aws s3 cp dist-backup.tar.gz s3://backup-bucket/
```

---

## Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Netlify** | ✅ 100GB/mo | $19/mo | Beginners |
| **Vercel** | ✅ 100GB/mo | $20/mo | Developers |
| **GitHub Pages** | ✅ Unlimited | N/A | Open source |
| **Cloudflare** | ✅ Unlimited | $20/mo | High traffic |
| **Firebase** | ✅ 10GB/day | Pay-as-go | Google users |
| **AWS S3** | ❌ Pay-as-go | Variable | Enterprise |
| **DigitalOcean** | ❌ $5/mo | $5-50/mo | Full stack |

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] No sensitive data in code
- [ ] Environment variables secured
- [ ] Dependencies up to date
- [ ] XSS protection (React handles)
- [ ] CSP headers (optional)

---

## SEO Optimization

### meta tags (index.html)
```html
<meta name="description" content="A quiet place for your love story">
<meta name="keywords" content="love, timeline, valentine, couples">
<meta property="og:title" content="Timeline of Us">
<meta property="og:description" content="Create your love story">
<meta property="og:image" content="/preview.png">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:card" content="summary_large_image">
```

### Favicon
```html
<link rel="icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

---

## Final Checklist

Before launching:
- [ ] Test on all browsers
- [ ] Test on mobile devices
- [ ] Verify localStorage works
- [ ] Check photo uploads
- [ ] Test export functionality
- [ ] Optimize images
- [ ] Enable HTTPS
- [ ] Add custom domain
- [ ] Set up analytics (optional)
- [ ] Share with friends!

---

**🎉 Congratulations! Your Timeline is Live! 💕**

*Built with love, deployed with care* ❤️