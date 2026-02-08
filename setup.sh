#!/bin/bash

# Valentine Timeline - Setup Script
# This script helps you set up the project structure

echo "🎨 Setting up Valentine Timeline project..."
echo ""

# Create directory structure
echo "📁 Creating directories..."
mkdir -p src/components
mkdir -p src/data
mkdir -p src/utils

echo "✅ Directories created!"
echo ""
echo "📄 Project structure:"
echo "valentine-timeline/"
echo "├── src/"
echo "│   ├── components/"
echo "│   │   ├── Hero.tsx"
echo "│   │   ├── TimelineSection.tsx"
echo "│   │   ├── PhotoUpload.tsx"
echo "│   │   ├── ActionButtons.tsx"
echo "│   │   └── Footer.tsx"
echo "│   ├── data/"
echo "│   │   └── sections.ts"
echo "│   ├── utils/"
echo "│   │   ├── storage.ts"
echo "│   │   └── exportPDF.ts"
echo "│   ├── App.tsx"
echo "│   ├── main.tsx"
echo "│   └── index.css"
echo "├── index.html"
echo "├── package.json"
echo "├── tailwind.config.js"
echo "├── postcss.config.js"
echo "├── tsconfig.json"
echo "├── tsconfig.node.json"
echo "└── vite.config.ts"
echo ""
echo "🚀 Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Start dev server: npm run dev"
echo "3. Open http://localhost:5173"
echo ""
echo "💝 Happy coding!"
