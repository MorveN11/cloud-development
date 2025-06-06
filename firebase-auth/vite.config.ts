import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      emitWarning: true,
      emitError: true,
      failOnError: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
