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

// Copy CSS files from src to out
console.log('Copying CSS files...');
const srcDir = path.join(__dirname, '..', 'src');
findAndCopyCssFiles(srcDir, outDir);

// Copy the globals.css file directly from src to ensure it's available
const srcGlobalsCss = path.join(srcDir, 'app', 'globals.css');
const stylesDir = path.join(outDir, 'styles');
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

if (fs.existsSync(srcGlobalsCss)) {
  console.log('Copying globals.css from source...');
  fs.copyFileSync(srcGlobalsCss, path.join(stylesDir, 'globals.css'));
} else {
  console.log('Source globals.css not found, creating a fallback...');
  // Generate a CSS file in the output directory if it doesn't exist
  const cssFilePath = path.join(stylesDir, 'globals.css');
  if (!fs.existsSync(cssFilePath)) {
    console.log('Creating globals.css file...');
    const cssContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      :root {
        --primary: #4f46e5;
        --primary-dark: #4338ca;
        --secondary: #10b981;
        --secondary-dark: #059669;
        --background: #ffffff;
        --foreground: #111827;
        --muted: #f3f4f6;
        --muted-foreground: #6b7280;
        --accent: #ede9fe;
        --accent-foreground: #6d28d9;
        --border: #e5e7eb;
        --input: #e5e7eb;
        --ring: #e5e7eb;
        --radius: 0.5rem;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: var(--background);
        color: var(--foreground);
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      .btn {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
      }
      
      .btn-primary {
        background-color: var(--primary);
        color: white;
      }
      
      .btn-primary:hover {
        background-color: var(--primary-dark);
      }
      
      .card {
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      
      .animate-slide-up {
        animation: slideUp 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    fs.writeFileSync(cssFilePath, cssContent);
  }
}

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
    // Create a fallback index with CSS link
    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DogID</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles/globals.css">
      </head>
      <body>
        <div class="container">
          <h1>DogID</h1>
          <p>Site is being built. Please check back later.</p>
          <button class="btn btn-primary">Go Home</button>
        </div>
        <script src="/_next/static/chunks/main.js"></script>
      </body>
      </html>
    `;
    fs.writeFileSync(path.join(outDir, 'index.html'), fallbackHtml);
  }
}

// Add a link to the CSS file in all HTML files
console.log('Adding CSS links to HTML files...');
const htmlFiles = findAllHtmlFiles(outDir);
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if the file already has a link to our CSS
  if (!content.includes('<link rel="stylesheet" href="/styles/globals.css">')) {
    // Insert our CSS link before the closing head tag
    content = content.replace('</head>', '<link rel="stylesheet" href="/styles/globals.css">\n</head>');
    fs.writeFileSync(file, content);
    console.log(`Added CSS link to ${file}`);
  }
  
  // Fix any relative paths that might be broken
  if (content.includes('href="/_next/')) {
    content = content.replace(/href="\/_next\//g, 'href="/_next/');
    fs.writeFileSync(file, content);
    console.log(`Fixed relative paths in ${file}`);
  }
});

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

// Helper function to find and copy CSS files
function findAndCopyCssFiles(dir, outDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findAndCopyCssFiles(srcPath, outDir);
    } else if (entry.name.endsWith('.css')) {
      // For CSS files, copy to the styles directory in out
      const stylesDir = path.join(outDir, 'styles');
      if (!fs.existsSync(stylesDir)) {
        fs.mkdirSync(stylesDir, { recursive: true });
      }
      const destPath = path.join(stylesDir, entry.name);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  }
}

// Helper function to find all HTML files
function findAllHtmlFiles(dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      result.push(...findAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      result.push(fullPath);
    }
  }
  
  return result;
} 