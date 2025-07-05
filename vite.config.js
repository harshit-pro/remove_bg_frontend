import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build:{
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper asset handling
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
});