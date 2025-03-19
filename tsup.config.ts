import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  noExternal: ['prompts', 'kolorist', 'cac', 'tiged', 'ora'],
  treeshake: true,
  splitting: false,
  outDir: 'dist',
  platform: 'node',
  // banner: {
  //   js: '#!/usr/bin/env node',
  // },
});
