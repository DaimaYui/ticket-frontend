import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
    server:{
    proxy:{
      '/api': {
        target: 'http://43.142.12.54:8080',
        changeOrigin: true,
      }
    }
  }
})
