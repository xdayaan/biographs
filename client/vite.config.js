import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,         // Run on port 80
    host: '0.0.0.0',  // Make the server accessible externally if needed
  },
})
