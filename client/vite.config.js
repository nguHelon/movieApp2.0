import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://movie-app2-0-lubv9qbyk-nguhelons-projects.vercel.app",
        changeOrigin: true,
        secure: true
      }
    }
  },
  plugins: [react()],
})
