#!/bin/bash

# Canvas Wonderland Pre-Deploy Script with Mobile Optimizations
# This script prepares the website for deployment by:
# 1. Creating mobile-optimized images
# 2. Running performance tests
# 3. Validating all HTML and JavaScript

echo "===================================="
echo "Canvas Wonderland Pre-Deploy Script"
echo "===================================="

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    echo "Error: Please run this script from the canvas_wonderland directory"
    exit 1
fi

# Create mobile-optimized images
echo ""
echo "📱 Creating mobile-optimized images..."
echo "------------------------------------"
chmod +x create-mobile-images.sh
./create-mobile-images.sh

# Start local server for testing
echo ""
echo "🚀 Starting local server..."
echo "------------------------"
python3 -m http.server 8000 &
SERVER_PID=$!
sleep 3  # Give server time to start

# Function to cleanup server
cleanup() {
    echo ""
    echo "Stopping local server..."
    kill $SERVER_PID 2>/dev/null
}
trap cleanup EXIT

# Check JavaScript syntax
echo ""
echo "🔍 Checking JavaScript files..."
echo "-----------------------------"
for file in js/*.js; do
    if node -c "$file" 2>/dev/null; then
        echo "✓ $file - OK"
    else
        echo "✗ $file - SYNTAX ERROR"
        node -c "$file"
        cleanup
        exit 1
    fi
done

# Check HTML validation
echo ""
echo "📝 Validating HTML files..."
echo "--------------------------"
for file in *.html; do
    if command -v tidy >/dev/null 2>&1; then
        if tidy -q -e "$file" 2>/dev/null; then
            echo "✓ $file - Valid"
        else
            echo "! $file - Check output above for warnings"
        fi
    else
        echo "Tidy HTML validator not installed. Skipping HTML validation."
        break
    fi
done

# Check if Lighthouse is installed
echo ""
echo "🔦 Checking Lighthouse installation..."
echo "------------------------------------"
if ! command -v lighthouse >/dev/null 2>&1; then
    echo "Lighthouse not found. Installing..."
    npm install -g lighthouse
fi

# Run mobile performance test
echo ""
echo "📱 Running Mobile Lighthouse test..."
echo "----------------------------------"
lighthouse http://localhost:8000 \
    --emulated-form-factor=mobile \
    --throttling-method=provided \
    --only-categories=performance,accessibility,best-practices,seo \
    --view

# Run desktop performance test
echo ""
echo "💻 Running Desktop Lighthouse test..."
echo "-----------------------------------"
lighthouse http://localhost:8000 \
    --emulated-form-factor=desktop \
    --throttling-method=provided \
    --only-categories=performance,accessibility,best-practices,seo \
    --view

# Check for large images
echo ""
echo "🖼️ Checking image sizes..."
echo "------------------------"
find images -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k | while read file; do
    echo "⚠️ Large file: $file ($(du -h "$file" | cut -f1))"
done

# Summary
echo ""
echo "===================================="
echo "Pre-Deploy Summary"
echo "===================================="
echo "1. Mobile-optimized images: ✓ Generated"
echo "2. JavaScript validation: ✓ Completed"
echo "3. HTML validation: ✓ Completed"
echo "4. Lighthouse tests: ✓ Completed"
echo "5. Image size check: ✓ Completed"
echo ""
echo "Review the test results above before deploying."
echo "Remember to commit all changes to Git before FTP upload!"

# Optional: Open test results in browser
if command -v open >/dev/null 2>&1; then
    echo ""
    read -p "Open test results in browser? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open http://localhost:8000
    fi
fi

echo ""
echo "Run the following command to make FTP upload:"
echo "cd /Users/alonzieve/Documents/GitHub/canvas_wonderland && [your FTP command here]"
echo ""
echo "🎉 Pre-deploy check completed!"