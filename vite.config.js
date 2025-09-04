import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'react-app',
  base: '/react/',
  plugins: [react()],
  build: {
    outDir: '../public/react',
    emptyOutDir: true,
  },
});

