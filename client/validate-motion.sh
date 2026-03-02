#!/bin/bash

echo "================================"
echo "Motion Import Validation Script"
echo "================================"
echo ""

# Check if framer-motion is installed
echo "1. Checking framer-motion installation..."
if npm list framer-motion > /dev/null 2>&1; then
    echo "   ✅ framer-motion is installed"
    npm list framer-motion | grep framer-motion
else
    echo "   ❌ framer-motion is NOT installed"
    echo "   Installing framer-motion..."
    npm install framer-motion
fi

echo ""
echo "2. Verifying imports in all files..."

# Files that should have motion imports
files=(
    "src/components/Navbar.jsx"
    "src/components/ProjectCard.jsx"
    "src/components/CertificateCard.jsx"
    "src/sections/HomeSection.jsx"
    "src/sections/AboutSection.jsx"
    "src/sections/ProjectsSection.jsx"
    "src/sections/EngineeringHighlightsSection.jsx"
    "src/sections/GitHubSection.jsx"
    "src/sections/CertificatesSection.jsx"
    "src/sections/ContactSection.jsx"
)

all_good=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        if grep -q "import.*motion.*from.*framer-motion" "$file"; then
            echo "   ✅ $file"
        else
            echo "   ❌ $file - MISSING IMPORT"
            all_good=false
        fi
    else
        echo "   ⚠️  $file - FILE NOT FOUND"
    fi
done

echo ""
echo "3. Running build test..."
if npm run build > /dev/null 2>&1; then
    echo "   ✅ Build successful"
else
    echo "   ❌ Build failed"
    all_good=false
fi

echo ""
echo "================================"
if [ "$all_good" = true ]; then
    echo "✅ ALL CHECKS PASSED - PRODUCTION READY"
else
    echo "❌ SOME CHECKS FAILED - REVIEW ABOVE"
fi
echo "================================"
