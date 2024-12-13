import express from 'express';
import functions from '@google-cloud/functions-framework';
import path from 'path';


// const express = require('express');
// const functions = require('@google-cloud/functions-framework');
// const path = require('path');


const app = express();
const __dirname = path.resolve();
const staticAssetsPath = path.join(__dirname, 'dist');
// console.log(staticAssetsPath);

// Serve static files from the Vite build directory
app.use(express.static(staticAssetsPath));

// Middleware to set MIME type for JavaScript files
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(staticAssetsPath, 'src/pages/html/search.html'));
  });

app.get('/browse', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/browse.html'));
});

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(staticAssetsPath, 'src/pages/html/login.html'));
// });

app.get('/influencer', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/influencer.html'));
});

app.get('/AddInfluencer', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/AddInfluencer.html'));
});

app.get('/userProfile', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/userProfile.html'));
});

app.get('/setDisplayName', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/setDisplayName.html'));
});

app.get('/reviewHistory', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/reviewHistory.html'));
});

app.get('/privacyPolicy', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/PrivacyPolicy.html'));
});

app.get('/ContactUs', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/ContactUs.html'));
});

app.get('/CommunityGuidelines', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/CommunityGuidelines.html'));
});

// Fallback to serving `index.html` for SPA (Single Page Application) routes
app.get('*', (req, res) => {
  res.sendFile(path.join(staticAssetsPath, 'src/pages/html/index.html'));
});



// Export the function for the functions framework
functions.http('serveViteApp', app);

// Register an HTTP function with the Functions Framework
// functions.http('myHttpFunction', (req, res) => {
//   // Your code here

//   // Send an HTTP response
// //   res.send('<p>Howdy there cowboy!</p>');
// res.send('./InfluencerReviewReactApp/dist/index.html')
// });