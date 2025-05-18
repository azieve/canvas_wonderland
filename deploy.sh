#!/bin/bash

# Canvas Wonderland Local Deployment Script
# This script pushes changes to GitHub and then uploads them via FTP to the server

echo "===================================="
echo "Canvas Wonderland Deployment Script"
echo "===================================="

# 1. Ensure we're in the right directory
if [ ! -f "index.html" ]; then
    echo "Error: Please run this script from the canvas_wonderland directory"
    exit 1
fi

# 2. Run pre-deployment checks
echo ""
echo "🔍 Running pre-deployment checks..."
echo "------------------------------------"
chmod +x pre-deploy.sh
./pre-deploy.sh || { echo "❌ Pre-deployment checks failed!"; exit 1; }

# 3. Commit and push to GitHub
echo ""
echo "🚀 Pushing changes to GitHub..."
echo "------------------------------------"
read -p "Enter commit message: " commit_message
git add .
git commit -m "$commit_message"
git push origin development || { echo "❌ Failed to push to GitHub!"; exit 1; }

# 4. Merge to main branch
echo ""
echo "🔄 Merging to main branch..."
echo "------------------------------------"
git checkout main
git merge development
git push origin main || { echo "❌ Failed to push main branch to GitHub!"; exit 1; }
git checkout development

# 5. Upload to FTP server
echo ""
echo "📤 Uploading to FTP server..."
echo "------------------------------------"
echo "Using BlueHost FTP credentials:"
echo "Server: xnv.vxv.mybluehost.me"
echo "Username: canvas_ftp"
echo "Remote Path: /public_html/"

# Use lftp for better FTP handling
if ! command -v lftp &> /dev/null; then
    echo "lftp not found. Please install it with 'brew install lftp' (macOS) or 'apt-get install lftp' (Linux)"
    exit 1
fi

# Store the password securely
read -s -p "Enter FTP Password: " ftp_password
echo ""

# Connect and upload
lftp -c "
open -u canvas_ftp,'$ftp_password' xnv.vxv.mybluehost.me
lcd /Users/alonzieve/Documents/GitHub/canvas_wonderland
mirror -R --parallel=5 --exclude=.git/ --exclude=.github/ --exclude=node_modules/ --exclude=.DS_Store --exclude=*.sh --exclude=README.md ./ /public_html/
bye
"

echo ""
echo "✅ Deployment completed successfully!"
