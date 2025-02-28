#!/bin/bash

# Print environment information
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
npm ci

# Build the Next.js app
npm run build

# Success message
echo "Build completed successfully!" 