#!/bin/bash

# Exit on error
set -e

# Print environment information
echo "===== ENVIRONMENT INFORMATION ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "Files in directory: $(ls -la)"
echo "=================================="

# Create empty Python requirements if needed
echo "===== SETTING UP PYTHON ENVIRONMENT ====="
touch requirements.txt
echo "Python environment prepared"
echo "=================================="

# Install dependencies
echo "===== INSTALLING DEPENDENCIES ====="
export NODE_ENV=production
export NPM_CONFIG_LEGACY_PEER_DEPS=true

# Try installing dependencies with fallbacks
echo "Installing dependencies..."
npm ci --no-audit --no-fund || npm ci --legacy-peer-deps || npm install --no-fund

echo "Dependencies installed successfully!"
echo "=================================="

# Ensure sharp is properly installed
echo "===== INSTALLING SHARP PACKAGE ====="
npm install --no-save sharp@0.33.2
echo "Sharp package installed successfully!"
echo "=================================="

# Build the Next.js app
echo "===== BUILDING NEXT.JS APPLICATION ====="
npm run build
echo "Build completed successfully!"
echo "=================================="

# Export to static HTML
echo "===== EXPORTING TO STATIC HTML ====="
npm run export || npx next export
echo "=================================="

# Ensure the output directory exists
if [[ ! -d out ]]; then
  echo "ERROR: Output directory not found. Export may have failed."
  exit 1
fi

# Validate deployment files
echo "===== PREPARING FOR DEPLOYMENT ====="
echo "Files in out directory:"
ls -la out/

echo "Deployment files prepared successfully!"
echo "===================================" 