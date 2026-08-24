import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this as a project site at
  // https://shirlyherscovici.github.io/shirly-portfolio-hero/ — everything
  // (script tags, and any literal "/assets/..." string used as a runtime
  // <img src>/<video src> pointing into /public) needs this prefix, not
  // just the root the dev server uses.
  base: '/shirly-portfolio-hero/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
