import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginSass from 'vite-plugin-sass';

export default defineConfig({
  plugins: [react(), vitePluginSass()],
  server: {
    https: false,
    port: 5173,
    proxy: {
      '/server': {
        target: 'http://localhost:8800',
        changeOrigin: true
      }
    }
  }
});