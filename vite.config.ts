import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (ducal7.github.io) is served from the domain root, so base = '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Split long-lived vendor code into its own chunk so app edits don't
        // bust the framer-motion/react cache for returning visitors.
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
