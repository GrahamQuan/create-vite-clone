# Create Vite Clone

A lightweight clone of create-vite for scaffolding Vite projects with popular frameworks like React, Vue, Preact, and more. 

## Features

- 🚀 Scaffold projects with popular frameworks (React, Vue, Preact, Svelte, Lit, Solid)
- 🔄 Choose between JavaScript and TypeScript templates
- 📦 Minimal dependencies for fast installs
- 🧩 Interactive command-line interface
- 🎨 Beautiful terminal UI with colors

## Installation

### Global Installation

```bash
# npm
npm install -g create-vite-clone

# yarn
yarn global add create-vite-clone

# pnpm
pnpm add -g create-vite-clone
```

### Direct Usage (via npx)

```bash
# npm
npx create-vite-clone my-project

# yarn
yarn create vite-clone my-project

# pnpm
pnpm create vite-clone my-project
```

## Usage

### Interactive Mode

Running the CLI without arguments will enter interactive mode:

```bash
create-vite-clone
```

This will prompt you for:
1. Project name
2. Framework selection
3. Language variant (JavaScript/TypeScript)

### Command Line Arguments

```bash
create-vite-clone [project-name] --template [template-name]
```

For example:

```bash
create-vite-clone my-react-app --template react-ts
```

### Available Templates

| Framework | JavaScript | TypeScript |
|-----------|------------|------------|
| Vanilla   | vanilla    | vanilla-ts |
| Vue       | vue        | vue-ts     |
| React     | react      | react-ts   |
| React + SWC | react-swc | react-swc-ts |
| Preact    | preact     | preact-ts  |
| Lit       | lit        | lit-ts     |
| Svelte    | svelte     | svelte-ts  |
| Solid     | solid      | solid-ts   |

## API Usage

You can also use the download function directly in your code:

```javascript
import { downloadTemplate } from 'create-vite-clone';

await downloadTemplate('react-ts', './my-project');
```

## Development

### Project Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/create-vite-clone.git
cd create-vite-clone

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run in development mode
pnpm dev
```

### Scripts

- `pnpm build` - Build the project
- `pnpm dev` - Development mode with watch
- `pnpm example` - Run the example script
- `pnpm prepublishOnly` - Build before publishing

## How It Works

This project uses [tiged](https://github.com/tiged/tiged) (a fork of degit) to download templates from Vite's repository and apply them locally.

The main features include:
1. Prompting the user for project configuration via `prompts`
2. Fetching templates from the Vite repository
3. Renaming special files like `_gitignore` to their proper names
4. Setting up project configuration

## License

ISC 