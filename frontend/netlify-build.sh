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
npm ci --production=false --no-optional
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

# Copy necessary files for deployment
echo "===== PREPARING FOR DEPLOYMENT ====="
cp -r public .next/
echo "Deployment files prepared successfully!"
echo "===================================" 