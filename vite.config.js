import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/ecommerce': {
        target: 'http://192.168.1.76:8080',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
