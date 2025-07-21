// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 👈 Hardcoded path
    },
  },
  server: {
    host: true,
    port: 5173,
    // Remove HTTPS config — not needed in Azure
  },
});
