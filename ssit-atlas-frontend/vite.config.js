import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: '127.0.0.1', // Bind explicitly to IPv4 to prevent ERR_CONNECTION_REFUSED
  },
  // Force optimization of heavy 3D libraries
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei']
  }
})
