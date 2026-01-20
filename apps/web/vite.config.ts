import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const PORT = parseInt(process.env.VITE_PORT || '20193', 10);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: PORT,
    host: true,
  },
});

