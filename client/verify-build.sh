#!/bin/bash

echo "🔍 Verifying Portfolio Build..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
  echo "❌ dist folder not found. Running build..."
  npm run build
fi

# Check if index.html exists in dist
if [ ! -f "dist/index.html" ]; then
  echo "❌ index.html not found in dist folder"
  exit 1
fi

# Check if assets folder exists
if [ ! -d "dist/assets" ]; then
  echo "⚠️  Warning: assets folder not found in dist"
fi

echo "✅ Build verification complete!"
echo "📦 Contents of dist folder:"
ls -la dist/

echo ""
echo "🚀 Ready for deployment!"
echo "Netlify settings:"
echo "  Base directory: client"
echo "  Build command: npm run build"
echo "  Publish directory: dist"
