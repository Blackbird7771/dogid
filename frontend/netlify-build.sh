#!/bin/bash

# Print environment information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Working directory: $(pwd)"
echo "Directory contents: $(ls -la)"

# Install dependencies with error handling
echo "Installing dependencies..."
npm install --legacy-peer-deps || { echo "Failed to install dependencies"; exit 1; }

# Build the application
echo "Building the application..."
npm run build || { echo "Failed to build the application"; exit 1; }

# Create the output directory if it doesn't exist
mkdir -p out

# Verify the build output
if [ -d ".next" ]; then
  echo "Build successful. .next directory exists."
else
  echo "Build failed. .next directory does not exist."
  exit 1
fi

echo "Netlify build completed successfully!" 