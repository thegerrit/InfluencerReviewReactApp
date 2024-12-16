import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Get the version from package.json
import { version } from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/html/index.html'),
        search: resolve(__dirname, 'src/pages/html/search.html'),
        browse: resolve(__dirname, 'src/pages/html/browse.html'),
        influencer: resolve(__dirname, 'src/pages/html/influencer.html'),
        AddInfluencer: resolve(__dirname, 'src/pages/html/AddInfluencer.html'),
        userProfile: resolve(__dirname, 'src/pages/html/userProfile.html'),
        setDisplayName: resolve(__dirname, 'src/pages/html/setDisplayName.html'),
        reviewHistory: resolve(__dirname, 'src/pages/html/reviewHistory.html'),
        contactUs: resolve(__dirname, 'src/pages/html/ContactUs.html'),
        privacyPolicy: resolve(__dirname, 'src/pages/html/PrivacyPolicy.html'),
        communityGuidelines: resolve(__dirname, 'src/pages/html/CommunityGuidelines.html'),
      },
      output: {
        entryFileNames: `assets/[name].${version}.[hash].js`,
        chunkFileNames: `assets/[name].${version}.[hash].js`,
        assetFileNames: `assets/[name].${version}.[hash][extname]`,
      },
    },
    // Enable asset hashing
    assetsDir: 'assets',
    manifest: true,
  }
})
