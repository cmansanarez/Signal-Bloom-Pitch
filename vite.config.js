import { defineConfig } from 'vite'

// Static single-page build. Relative base so the artifact can be served
// from any path (subdirectory, file host, capstone server).
export default defineConfig({
  base: './',
  server: { port: 5180, open: false },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
})
