import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginSass from 'vite-plugin-sass';

export default defineConfig({
  plugins: [react(), vitePluginSass()],
  
  // ===== MEMORY OPTIMIZATIONS =====
  build: {
    target: 'esnext', // Better for modern browsers
    chunkSizeWarningLimit: 1600, // Increase from default 500
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Isolate heavy libraries
          if (id.includes('lottie-web') || id.includes('three')) {
            return 'lottie';
          }
          if (id.includes('node_modules')) {
            return 'vendor'; // Other dependencies
          }
        }
      }
    }
  },

  // ===== DEV SERVER (unchanged) =====
  server: {
    port: 5173,
    proxy: {
      '/server': {
        target: 'http://localhost:8800',
        changeOrigin: true
      }
    }
  }
});