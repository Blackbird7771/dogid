#!/bin/bash

# Exit on error
set -e

# Print environment information
echo "===== ENVIRONMENT INFORMATION ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Python version: $(python --version 2>&1 || echo 'Python not available')"
echo "Current directory: $(pwd)"
echo "Files in directory: $(ls -la)"
echo "=================================="

# Fix line endings if needed
if [[ -f package.json ]]; then
  echo "Fixing line endings in package.json if needed"
  dos2unix package.json 2>/dev/null || echo "dos2unix not available, skipping"
fi

# Install dependencies
echo "===== INSTALLING DEPENDENCIES ====="
export NODE_ENV=production
npm ci --no-audit --no-fund
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

# Ensure the output directory exists
if [[ ! -d out ]]; then
  echo "OUTPUT DIRECTORY: Directory structure after build"
  ls -la
  
  # If .next exists but not out, we need to export
  if [[ -d .next ]]; then
    echo "Found .next directory, exporting to static HTML"
    npm run export || npx next export
  else
    echo "ERROR: Build output directory not found. Build may have failed."
    exit 1
  fi
fi

# Validate deployment files
echo "===== PREPARING FOR DEPLOYMENT ====="
echo "Final deployment directory structure:"
find out -type f | sort | head -n 20
echo "..."

echo "Deployment files prepared successfully!"
echo "===================================" 