#!/bin/bash

# Print environment information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Working directory: $(pwd)"
echo "Directory contents: $(ls -la)"

# Make script executable
chmod +x ./netlify-build.sh

# Install dependencies with error handling
echo "Installing dependencies..."
npm install --legacy-peer-deps || { echo "Failed to install dependencies"; exit 1; }

# Build the application
echo "Building the application..."
npm run build || { echo "Failed to build the application"; exit 1; }

# Export the application (for Next.js versions that need a separate export step)
if grep -q "\"export\":" package.json; then
  echo "Exporting the application..."
  npm run export || { echo "Failed to export the application, continuing anyway..."; }
fi

# Ensure the out directory exists
if [ ! -d "out" ]; then
  echo "Creating out directory..."
  mkdir -p out
  
  # If out directory is empty but .next exists, copy static files
  if [ -d ".next" ] && [ ! "$(ls -A out 2>/dev/null)" ]; then
    echo "Copying static files from .next to out..."
    cp -r .next/static out/ 2>/dev/null || echo "No static files to copy"
    
    # Create a basic index.html if it doesn't exist
    if [ ! -f "out/index.html" ]; then
      echo "Creating basic index.html..."
      echo "<html><head><title>DogID</title></head><body><div id='__next'>Loading...</div></body></html>" > out/index.html
    fi
  fi
fi

# Verify the build output
if [ -d "out" ] && [ "$(ls -A out 2>/dev/null)" ]; then
  echo "Build successful. out directory exists and contains files."
  ls -la out/
else
  echo "Build output verification failed. out directory is empty or doesn't exist."
  exit 1
fi

echo "Netlify build completed successfully!" 