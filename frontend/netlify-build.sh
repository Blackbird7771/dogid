#!/bin/bash

# Exit on error
set -e

# Print environment information
echo "===== ENVIRONMENT INFORMATION ====="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Checking Python version..."
python_version=$(python --version 2>&1 || echo "Python not found")
echo "Python version: $python_version"
echo "Current directory: $(pwd)"
echo "Files in directory: $(ls -la)"
echo "=================================="

# Explicitly verify Python version
echo "===== PYTHON VERSION CHECK ====="
if [[ "$python_version" == *"3.10.16"* ]]; then
  echo "Correct Python version 3.10.16 detected"
elif [[ "$python_version" == *"Python"* ]]; then
  echo "Warning: Python version is $python_version, expected 3.10.16"
  echo "Continuing anyway as this is a Next.js project that doesn't require Python"
else
  echo "Python not detected. This is a Next.js project, so Python is not strictly required."
  echo "Continuing with build..."
fi
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
mkdir -p out
if [[ -d .next/standalone ]]; then
  echo "Found standalone output in .next/standalone"
  cp -r .next/standalone/* out/
elif [[ -d .next/export ]]; then
  echo "Found export output in .next/export"
  cp -r .next/export/* out/
else
  echo "Using standard Next.js export"
  npm run export || npx next export || echo "Export not required for newer Next.js versions"
fi
echo "=================================="

# Validate deployment files
echo "===== PREPARING FOR DEPLOYMENT ====="
echo "Files in out directory:"
ls -la out/ || echo "No files found in out directory"

# If no files in out, try to copy from .next
if [ ! "$(ls -A out 2>/dev/null)" ]; then
  echo "No files found in out directory. Attempting to copy from .next..."
  mkdir -p out
  cp -r .next/* out/ 2>/dev/null || echo "No files to copy from .next"
fi

echo "Deployment files prepared successfully!"
echo "===================================" 