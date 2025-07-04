import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  // Load env file based on current mode (development or production)
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    server: {
      proxy: {
        '/api': env.VITE_BACKEND_URL
      }
    },
    plugins: [react(), tailwindcss()]
  })
}
