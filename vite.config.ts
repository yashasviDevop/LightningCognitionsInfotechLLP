import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/LightningCognitionsInfotechLLP/",   // ✅ ADD THIS LINE
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
