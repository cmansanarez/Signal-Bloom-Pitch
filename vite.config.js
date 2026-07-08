import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// Static multi-page build. Relative base so the artifact can be served
// from any path (subdirectory, file host, capstone server).
export default defineConfig({
  base: './',
  server: { port: 5180, open: false },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        'visual-studies': fileURLToPath(new URL('./visual-studies.html', import.meta.url)),
      },
    },
  },
})
