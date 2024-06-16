import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      cachedChecks: false
    }
  },
  base: "https://d0vak1n.github.io/ProjectColabo"
})
