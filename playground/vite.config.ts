import { defineConfig } from 'vite'
import uniMcp from '@uni-helper/mcp'

export default defineConfig({
  plugins: [
    uniMcp({
      updateConfig: false,
    }),
  ],
  server: {
    port: 5200,
  },
})
