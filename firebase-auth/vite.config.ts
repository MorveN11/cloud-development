import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';

export default defineConfig({
  plugins: [
    eslint({
      emitWarning: true,
      emitError: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
