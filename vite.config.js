import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build the app for the site root (no /react in URLs)
export default defineConfig(() => ({
  root: 'react-app',
  base: '/',
  plugins: [react()],
  server: {
    open: '/',
  },
  build: {
    // Emit to the project-level public/ so Cloudflare Pages serves at root
    outDir: '../public',
    // Avoid clearing other static assets (legacy/, fonts/, redirects, headers)
    emptyOutDir: false,
  },
}));
