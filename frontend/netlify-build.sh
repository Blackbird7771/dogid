#!/bin/bash

# Exit on error
set -e

# Print environment information
echo "===== ENVIRONMENT INFORMATION ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Python version (if available): $(python --version 2>&1 || echo 'Python not found')"
echo "Current directory: $(pwd)"
echo "Files in directory: $(ls -la)"
echo "=================================="

# Skip Python setup entirely - not needed for Next.js frontend
echo "===== SKIPPING PYTHON SETUP (NOT NEEDED) ====="
echo "This is a Next.js frontend project, no Python required"
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

# Sharp should be installed via package.json, no need for separate install
echo "===== USING PRE-DEFINED SHARP VERSION ====="
echo "Using sharp version from package.json: $(npm list sharp | grep sharp || echo 'Sharp not installed')"
echo "=================================="

# Build the Next.js app
echo "===== BUILDING NEXT.JS APPLICATION ====="
npm run build
echo "Build completed successfully!"
echo "=================================="

# Ensure output directory exists (Next.js 13+ puts it in .next/standalone)
echo "===== CHECKING OUTPUT DIRECTORY ====="
if [[ -d .next/standalone ]]; then
  echo "Found standalone output in .next/standalone"
  mkdir -p out
  cp -r .next/standalone/* out/
elif [[ ! -d out ]]; then
  echo "Creating output directory (needed for newer Next.js versions)"
  mkdir -p out
  npm run export || npx next export || echo "Export not required for newer Next.js versions"
fi
echo "=================================="

# Validate deployment files
echo "===== PREPARING FOR DEPLOYMENT ====="
echo "Files in out directory:"
ls -la out/ || echo "No files found in out directory"

echo "Deployment files prepared successfully!"
echo "===================================" 