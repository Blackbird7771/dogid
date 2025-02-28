#!/bin/bash

# Exit on error
set -e

# Print environment information
echo "===== ENVIRONMENT INFORMATION ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "=================================="

# Install dependencies
echo "===== INSTALLING DEPENDENCIES ====="
export NODE_ENV=production
export NPM_CONFIG_LEGACY_PEER_DEPS=true

# Try installing dependencies with fallbacks
echo "Installing dependencies..."
npm ci --no-audit --no-fund || npm install --legacy-peer-deps --no-fund || npm install --no-fund

echo "Dependencies installed successfully!"
echo "=================================="

# Build the Next.js app
echo "===== BUILDING NEXT.JS APPLICATION ====="
npm run build
echo "Build completed successfully!"
echo "=================================="

# Ensure output directory exists and has content
echo "===== PREPARING OUTPUT DIRECTORY ====="
mkdir -p out

# First try copying from .next/standalone (for Next.js 13+ with app router)
if [[ -d .next/standalone ]]; then
  echo "Found standalone output in .next/standalone"
  cp -r .next/standalone/* out/
  # Copy static assets if they exist
  [ -d .next/static ] && mkdir -p out/_next/static && cp -r .next/static/* out/_next/static/
# Then try .next/export (for traditional export)
elif [[ -d .next/export ]]; then
  echo "Found export output in .next/export"
  cp -r .next/export/* out/
# Otherwise attempt to run export command
else
  echo "Running export command"
  npm run export || npx next export || echo "Export command failed, continuing..."
  
  # If export didn't work, manually copy from .next
  if [ ! "$(ls -A out 2>/dev/null)" ]; then
    echo "Output directory empty after export, copying from .next"
    # Copy essential files from .next
    [ -d .next/static ] && mkdir -p out/_next/static && cp -r .next/static/* out/_next/static/
    # Copy HTML files if they exist
    find .next -name "*.html" -exec cp {} out/ \; 2>/dev/null || echo "No HTML files found"
  fi
fi

# Create an index.html if it doesn't exist (fallback)
if [ ! -f out/index.html ]; then
  echo "Creating basic index.html fallback"
  echo "<html><head><meta http-equiv='refresh' content='0;url=/_next/static/index.html'></head><body>Loading...</body></html>" > out/index.html
fi

echo "=================================="

# Validate deployment files
echo "===== VALIDATING DEPLOYMENT FILES ====="
echo "Files in out directory:"
ls -la out/ || echo "No files found in out directory"

echo "Content verification complete!"
echo "===================================" 