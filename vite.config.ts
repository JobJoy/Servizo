import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', '');
  return {
    // IMPORTANT: Change '/servizo-app/' to your GitHub repository name.
    // For example, if your repo is 'my-awesome-app', set this to '/my-awesome-app/'.
    base: '/servizo/',
    plugins: [react()],
    define: {
      // Makes VITE_GEMINI_API_KEY available as process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    }
  }
})