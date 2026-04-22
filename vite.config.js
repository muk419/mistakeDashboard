import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/sheet': {
        target: 'https://docs.google.com',
        changeOrigin: true,
        rewrite: () => '/spreadsheets/d/1K1FNC_wY4qnC6fl_9bnk2o6X4ds1sTmp50mpAPfj2as/gviz/tq?tqx=out:csv&gid=631594111',
        followRedirects: true,
      },
    },
  },
})
