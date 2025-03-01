const fs = require('fs');
const path = require('path');

// Create out directory if it doesn't exist
const outDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(outDir)) {
  console.log('Creating out directory...');
  fs.mkdirSync(outDir, { recursive: true });
}

// Check if .next directory exists
const nextDir = path.join(__dirname, '..', '.next');
if (!fs.existsSync(nextDir)) {
  console.log('No .next directory found. Creating fallback page...');
  const fallbackHtml = '<html><head><title>DogID</title></head><body><h1>DogID</h1><p>Site is being built.</p></body></html>';
  fs.writeFileSync(path.join(outDir, 'index.html'), fallbackHtml);
  process.exit(0);
}

// Create _next directory in out
const outNextDir = path.join(outDir, '_next');
if (!fs.existsSync(outNextDir)) {
  fs.mkdirSync(outNextDir, { recursive: true });
}

// Copy static files
const staticDir = path.join(nextDir, 'static');
if (fs.existsSync(staticDir)) {
  console.log('Copying static files...');
  copyDir(staticDir, path.join(outNextDir, 'static'));
}

// Find and copy HTML files
console.log('Copying HTML files...');
findAndCopyHtmlFiles(nextDir, outDir);

// If no index.html exists, create one
if (!fs.existsSync(path.join(outDir, 'index.html'))) {
  console.log('No index.html found. Creating one...');
  // Try to find a page HTML file to use as index
  const files = fs.readdirSync(outDir).filter(file => file.endsWith('.html'));
  if (files.length > 0) {
    // Use the first HTML file found
    const content = fs.readFileSync(path.join(outDir, files[0]), 'utf8');
    fs.writeFileSync(path.join(outDir, 'index.html'), content);
  } else {
    // Create a fallback index
    const fallbackHtml = '<html><head><title>DogID</title></head><body><h1>DogID</h1><p>Site is being built.</p></body></html>';
    fs.writeFileSync(path.join(outDir, 'index.html'), fallbackHtml);
  }
}

console.log('Post-build process completed successfully!');

// Helper function to copy a directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper function to find and copy HTML files
function findAndCopyHtmlFiles(dir, outDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findAndCopyHtmlFiles(srcPath, outDir);
    } else if (entry.name.endsWith('.html')) {
      // For HTML files, copy to the out directory
      const destPath = path.join(outDir, entry.name);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
} 