import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Vite 8 built-in support for tsconfig paths (if you use them)
    tsconfigPaths: true 
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: {
      modules: {
        classNameStrategy: 'non-scoped' // keeps original class names in tests
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    server: {
      forwardConsole: true 
    }
  },
})