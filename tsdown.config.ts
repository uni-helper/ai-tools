import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  dts: true,
  fixedExtension: true,
  clean: true,
  external: ['hnswlib-node'],
})
