import vue from '@vitejs/plugin-vue';
import viteFonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

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
        target: 'https://desafio-aeduca.onrender.com',
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix
        changeOrigin: true, // Helps with cross-origin issues
      },
    },
  },
  plugins: [
    eslint(),
    // https://www.npmjs.com/package/vite-plugin-vuetify
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    viteFonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    moduleDirectories: ['../../../node_modules'],
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
});
