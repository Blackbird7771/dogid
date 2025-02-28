#!/bin/bash

# Print environment information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Ensure sharp is properly installed
echo "Ensuring sharp package is installed..."
npm install --no-save sharp@0.33.2

# Build the Next.js app
echo "Building Next.js application..."
npm run build

# Success message
echo "Build completed successfully!" 