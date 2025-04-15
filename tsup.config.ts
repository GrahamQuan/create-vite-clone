import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false, // we don't need this, because we're a cli tool
  sourcemap: true,
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['prompts', 'tiged', 'fs', 'node:fs', 'fs-extra', 'graceful-fs'],
  noExternal: ['kolorist', 'cac', 'ora'],
  treeshake: true,
  splitting: false,
  outDir: 'dist',
  platform: 'node',
  banner: {
    js: '#!/usr/bin/env node',
  },
});
