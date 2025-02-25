import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000, 
    host: "0.0.0.0", // Ensures it listens on all network interfaces
  },
  build: {
    outDir: "dist",
  },
});
