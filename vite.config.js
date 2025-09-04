import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use root URL in dev, keep /react/ in build output
export default defineConfig(({ command }) => ({
  root: 'react-app',
  base: command === 'serve' ? '/' : '/react/',
  plugins: [react()],
  server: {
    open: '/',
  },
  build: {
    outDir: '../public/react',
    emptyOutDir: true,
  },
}));
