import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
// This config is for the example/demo app
export default defineConfig({
  plugins: [react()],
  root: './examples',
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      // Allow importing library source directly during development
      mathex: resolve(__dirname, './src/index.ts'),
    },
  },
});
