import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {

      input: {

        main: resolve(__dirname, 'src/pages/html/index.html'), // Entry point for "index.html"

        search: resolve(__dirname, 'src/pages/html/search.html'), // Entry point for "pages/search.html"
        browse: resolve(__dirname, 'src/pages/html/browse.html'), // Entry point for "pages/browse.html"
        // login: resolve(__dirname, 'src/pages/html/login.html'), // Entry point for "pages/login.html"
        influencer: resolve(__dirname, 'src/pages/html/influencer.html'), // Entry point for "pages/influencer.html"
        AddInfluencer: resolve(__dirname, 'src/pages/html/AddInfluencer.html'), // Entry point for "pages/addInfluencer.html" 
        userProfile: resolve(__dirname, 'src/pages/html/userProfile.html'), // Entry point for "pages/addInfluencer.html" 
        setDisplayName: resolve(__dirname, 'src/pages/html/setDisplayName.html'), // Entry point for "pages/setDisplayName.html" 
        reviewHistory: resolve(__dirname, 'src/pages/html/reviewHistory.html'), // Entry point for "pages/reviewHistory.html"
        contactUs: resolve(__dirname, 'src/pages/html/contactUs.html'), // Entry point for "pages/contactUs.html"
        privacyPolicy: resolve(__dirname, 'src/pages/html/privacyPolicy.html'), // Entry point for "pages/privacyPolicy.html"
        communityGuidelines: resolve(__dirname, 'src/pages/html/communityGuidelines.html'), // Entry point for "pages/communityGuidelines.html"
        // googleIconDark: resolve(__dirname, 'src/assets/web_dark_sq_ctn.svg'), // Entry point for dark theme Google icon
        // googleIconLight: resolve(__dirname, 'src/assets/web_light_sq_ctn.svg'), // Entry point for light theme Google icon
      }

    }

  }
})
