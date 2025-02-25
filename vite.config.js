import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000, // Use Railway-assigned port
    host: "0.0.0.0", // Allows external access
    strictPort: true,
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["ontherocks-production.up.railway.app"], // Explicitly allow this host
  },
  build: {
    outDir: "dist",
  },
});
