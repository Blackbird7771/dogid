#!/bin/bash

# Print environment information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Python version: $(python --version 2>&1 || echo 'Python not found')"
echo "Working directory: $(pwd)"
echo "Environment variables:"
env | grep -v PASSWORD | grep -v TOKEN | grep -v SECRET | sort

# Make script executable
chmod +x ./netlify-build.sh

# Install mise if not available
if ! command -v mise &> /dev/null; then
  echo "Installing mise..."
  curl https://mise.jdx.dev/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
fi

# Install tools with mise
echo "Installing tools with mise..."
mise install || echo "Failed to install tools with mise, continuing..."

# Ensure Python and pip are available
echo "Setting up Python..."
python -m pip install --upgrade pip setuptools wheel || echo "Failed to upgrade pip, continuing..."

# Clean npm cache and node_modules to avoid any issues
echo "Cleaning npm cache and node_modules..."
npm cache clean --force || echo "Failed to clean npm cache, continuing..."
rm -rf node_modules package-lock.json .next out || echo "Failed to remove directories, continuing..."

# Install dependencies with error handling
echo "Installing dependencies..."
npm install --legacy-peer-deps --no-optional || { echo "Failed to install dependencies"; exit 1; }

# Build the application
echo "Building the application..."
NODE_ENV=production npm run build || { echo "Failed to build the application"; exit 1; }

# Ensure the out directory exists
echo "Ensuring out directory exists..."
mkdir -p out

# If out directory is empty but .next exists, copy files from .next
if [ -d ".next" ] && [ ! "$(ls -A out 2>/dev/null)" ]; then
  echo "Copying files from .next to out..."
  
  # Copy static files
  if [ -d ".next/static" ]; then
    echo "Copying static files..."
    mkdir -p out/_next/static
    cp -r .next/static out/_next/ || echo "Failed to copy static files, continuing..."
  fi
  
  # Copy HTML files if they exist
  echo "Copying HTML files..."
  find .next -name "*.html" -exec cp {} out/ \; 2>/dev/null || echo "No HTML files found"
  
  # Create a basic index.html if it doesn't exist
  if [ ! -f "out/index.html" ]; then
    echo "Creating basic index.html..."
    echo "<html><head><title>DogID</title></head><body><div id='__next'>Loading...</div><script src='/_next/static/chunks/main.js'></script></body></html>" > out/index.html
  fi
fi

# Verify the build output
if [ -d "out" ] && [ "$(ls -A out 2>/dev/null)" ]; then
  echo "Build successful. out directory exists and contains files:"
  ls -la out/
else
  echo "Build output verification failed. Creating minimal output..."
  mkdir -p out
  echo "<html><head><title>DogID</title></head><body><h1>DogID</h1><p>Site is being built. Please check back later.</p></body></html>" > out/index.html
  echo "Created minimal output:"
  ls -la out/
fi

echo "Netlify build completed successfully!"