import express from 'express';
import functions from '@google-cloud/functions-framework';
import path from 'path';
import fs from 'fs';

const app = express();
const __dirname = path.resolve();
const staticAssetsPath = path.join(__dirname, 'dist');

// Load Vite's manifest
const manifestPath = path.join(staticAssetsPath, '.vite/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// Helper function to replace asset paths based on manifest
function replaceAssetPaths(html, manifest) {
  Object.keys(manifest).forEach(original => {
    const hashed = manifest[original].file;
    // Use a regex to replace all instances of the original asset path
    const regex = new RegExp(original, 'g');
    html = html.replace(regex, hashed);
  });
  return html;
}

// Middleware to set no-cache for HTML files
app.use((req, res, next) => {
  // if (req.path.endsWith('.js')) {
  //   res.setHeader('Content-Type', 'application/javascript');
  // }
  if (req.path.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-store');
  }
  next();
});

// Serve static files with caching
app.use(express.static(staticAssetsPath, {
  maxAge: '1y',
  immutable: true,
}));

const htmlPages = ['search', 'browse', 'influencer', 'AddInfluencer', 'userProfile', 'setDisplayName', 'reviewHistory', 'ContactUs', 'PrivacyPolicy', 'CommunityGuidelines'];

htmlPages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    // Read the HTML file
    let html = fs.readFileSync(path.join(staticAssetsPath, `src/pages/html/${page}.html`), 'utf-8');
    // Replace asset paths with hashed versions
    html = replaceAssetPaths(html, manifest);
    // Send the processed HTML
    res.send(html);
  });
});

// Fallback route
app.get('*', (req, res) => {
  // Read and process the fallback HTML
  let html = fs.readFileSync(path.join(staticAssetsPath, 'src/pages/html/index.html'), 'utf-8');
  html = replaceAssetPaths(html, manifest);
  res.send(html);
});

// Export the function
functions.http('serveViteApp', app);
