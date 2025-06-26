import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';

import { fcmSwEnvPlugin } from './config/vitePlugins';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [
        eslint({
          emitWarning: true,
          emitError: true,
        }),
        react(),
        tailwindcss(),
        fcmSwEnvPlugin(),
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    };
  } else {
    return {
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
      build: {
        target: 'es2022',
        rollupOptions: {
          input: {
            main: './index.html',
            'firebase-messaging-sw': './src/firebase-messaging-sw.js',
          },
          output: {
            entryFileNames: (chunkInfo) => {
              return chunkInfo.name === 'firebase-messaging-sw' ? '[name].js' : 'assets/[name]-[hash].js';
            },
          },
        },
      },
    };
  }
});
