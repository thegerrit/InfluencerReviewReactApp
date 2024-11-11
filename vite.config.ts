import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {

      input: {

        main: resolve(__dirname, 'index.html'), // Entry point for "index.html"

        search: resolve(__dirname, 'src/pages/search.html'), // Entry point for "pages/search.html"
        browse: resolve(__dirname, 'src/pages/browse.html'), // Entry point for "pages/browse.html"
        login: resolve(__dirname, 'src/pages/login.html'), // Entry point for "pages/login.html"
        signup: resolve(__dirname, 'src/pages/signup.html'), // Entry point for "pages/signup.html"
        influencer: resolve(__dirname, 'src/pages/influencer.html'), // Entry point for "pages/influencer.html"
        AddInfluencer: resolve(__dirname, 'src/pages/AddInfluencer.html'), // Entry point for "pages/addInfluencer.html" 

      }

    }

  }
})
