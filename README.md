# Vite CLI Clone

A lightweight utility for downloading Vite templates from GitHub.

## Installation

```bash
pnpm install
```

## Usage

This package provides a utility function to download template repositories or subdirectories from GitHub, similar to how Vite's CLI works.

### API

```typescript
async function downloadTemplate(
  repoPath: string,
  destination: string,
  options?: {
    verbose?: boolean;
    force?: boolean;
    mode?: [number, number];
  }
): Promise<void>
```

#### Parameters

- `repoPath`: The path to the GitHub repository in the format `owner/repo#branch/subdirectory`
- `destination`: The local directory where the template will be downloaded
- `options`: 
  - `verbose`: Show detailed logs during download
  - `force`: Overwrite existing files
  - `mode`: Set file permissions

### Example

```typescript
import { downloadTemplate } from 'vite-cli-clone';

// Download the Preact TypeScript template from Vite
await downloadTemplate(
  'vitejs/vite#main/packages/create-vite/template-preact-ts',
  './my-preact-project'
);
```

### Command Line Example

Run the example script:

```bash
pnpm tsx src/example.ts
```

## How to Format GitHub Paths for Templates

For a GitHub URL like:
```
https://github.com/vitejs/vite/tree/main/packages/create-vite/template-preact-ts
```

Use the following format with tiged/degit:
```
vitejs/vite#main/packages/create-vite/template-preact-ts
```

Components:
- `vitejs/vite`: Repository owner and name
- `#main`: Branch (after #)
- `/packages/create-vite/template-preact-ts`: Subdirectory path 