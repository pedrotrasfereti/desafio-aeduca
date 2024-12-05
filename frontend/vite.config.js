import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  root: 'frontend',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
  plugins: [vue(), eslint()],
});
