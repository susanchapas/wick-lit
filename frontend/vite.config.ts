import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: { '/api': env.WICK_API_PROXY_TARGET || 'http://127.0.0.1:7071' },
    },
  }
})
