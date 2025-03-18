import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  noExternal: ['prompts', 'kolorist', 'cac'],
  external: [
    'fs',
    'path',
    'node:fs',
    'node:path',
    'os',
    'node:os',
    'readline',
    'node:readline',
  ],
  platform: 'node',
});
