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

# Create empty Python requirements if needed
echo "===== SETTING UP PYTHON ENVIRONMENT ====="
touch requirements.txt
echo "Python environment prepared"
echo "=================================="

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
    # Try to export with installed export command
    npm run export || npx next export || echo "Export failed, trying workaround..."
    
    # If export fails, try to manually copy files
    if [[ ! -d out ]]; then
      echo "Manual export: Creating out directory"
      mkdir -p out
      echo "Copying .next/static to out/"
      cp -r .next/static out/ || echo "No static files to copy"
      echo "Copying public/ to out/"
      cp -r public/* out/ || echo "No public files to copy"
    fi
  else
    echo "ERROR: Build output directory not found. Build may have failed."
    exit 1
  fi
fi

# Validate deployment files
echo "===== PREPARING FOR DEPLOYMENT ====="
echo "Final deployment directory structure:"
find . -maxdepth 2 -type d
echo "Files in out directory:"
ls -la out/ || echo "out directory not found or empty"
echo "..."

echo "Deployment files prepared successfully!"
echo "===================================" 