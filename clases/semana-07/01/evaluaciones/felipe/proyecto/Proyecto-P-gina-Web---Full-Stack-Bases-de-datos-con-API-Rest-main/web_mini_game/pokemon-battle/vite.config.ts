import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative paths for assets when served from subdirectory
  build: {
    rollupOptions: {
      output: {
        // Stable filenames without hashes for easy referencing
        entryFileNames: 'assets/game.js',
        chunkFileNames: 'assets/game-[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'assets/game.css';
          return 'assets/[name][extname]';
        },
      },
    },
  },
})
