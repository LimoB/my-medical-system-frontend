// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'; // safe for Azure build

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(new URL('.', import.meta.url).pathname, 'src'), //  ESM-compatible replacement for __dirname
    },
  },
  server: {
    host: true,
    port: 5173,
    // Removed HTTPS config — only needed locally, not in Azure
  },
});
