# Create Vite Clone

A lightweight, beginner-friendly clone of create-vite for scaffolding Vite projects with popular frameworks. This tool helps you set up a new frontend project with React, Vue, Preact, and other frameworks in seconds!

![Demo Preview](https://via.placeholder.com/800x400?text=Create+Vite+Clone+Demo)

## 📚 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [How It Works](#how-it-works)
- [Understanding Our Code](#understanding-our-code)
- [Why We Chose These Packages](#why-we-chose-these-packages)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

- 🚀 Scaffold projects with popular frameworks (React, Vue, Preact, Svelte, Lit, Solid)
- 🔄 Choose between JavaScript and TypeScript templates
- 📦 Minimal dependencies for fast installs
- 🧩 Interactive command-line interface
- 🎨 Beautiful terminal UI with colors
- 🔧 Automatic renaming of special files like `_gitignore` to `.gitignore`

## 🔍 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.18.0 or higher)
  - [Download from Node.js website](https://nodejs.org/)
  - To check your version: `node --version`

- **npm**, **yarn**, or **pnpm**
  - npm is included with Node.js
  - For yarn: `npm install -g yarn`
  - For pnpm: `npm install -g pnpm`

## 📥 Installation

### Global Installation

Installing globally allows you to use the command from anywhere on your system:

```bash
# Using npm
npm install -g create-vite-clone

# Using yarn
yarn global add create-vite-clone

# Using pnpm
pnpm add -g create-vite-clone
```

### Direct Usage (without installation)

You can use the tool without installing it using npx, yarn create, or pnpm create:

```bash
# Using npx (comes with npm)
npx create-vite-clone my-project

# Using yarn
yarn create vite-clone my-project

# Using pnpm
pnpm create vite-clone my-project
```

## 🚀 Usage Guide

### Interactive Mode (Recommended for Beginners)

Running the CLI without arguments will enter interactive mode with step-by-step prompts:

```bash
create-vite-clone
```

You'll be guided through the following options:

1. **Project name**: The name of your project (folder will be created)
2. **Framework selection**: Choose from React, Vue, Svelte, etc.
3. **Language variant**: JavaScript or TypeScript

### Command Line Arguments (For Advanced Users)

If you already know what you want, you can specify options directly:

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

### First Project Walk-through

Here's a complete walk-through for creating your first project:

1. Open your terminal/command prompt
2. Run: `npx create-vite-clone my-first-app`
3. Select a framework (e.g., React)
4. Choose a variant (JavaScript or TypeScript)
5. Wait for the template to download
6. Follow the on-screen instructions:
   ```bash
   cd my-first-app
   npm install
   npm run dev
   ```
7. Open your browser to the URL shown in the terminal (usually http://localhost:5173)
8. Start coding!

## 🔄 How It Works

This tool follows a simple workflow to create your project:

1. **Collect information**: Get project name, framework, and language variant
2. **Download template**: Use tiged (a degit fork) to download the template from Vite's GitHub repo
3. **Process files**: Rename special files (e.g., `_gitignore` to `.gitignore`)
4. **Configure project**: Update package.json with your chosen project name
5. **Provide instructions**: Show next steps for running your new project

### What is tiged/degit?

- **degit** is a project scaffolding tool that downloads a Git repository without its history
- **tiged** is a fork of degit that has been updated to work with ESM (ES Modules)
- We use tiged to download only the specific template you need, without the full Git history

## 🧠 Understanding Our Code

Our project structure is organized for clarity and maintainability:

```
create-vite-clone/
├── src/
│   ├── index.ts        # Main CLI entrypoint and command handling
│   ├── utils.ts        # Template download functionality
│   ├── constants.ts    # Framework and template definitions
│   ├── create.ts       # Simplified CLI for direct usage
│   └── sample.ts       # API usage example
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

### Key Files Explained:

- **src/index.ts**: The main entry point for the CLI application. It handles command-line arguments, interactive prompts, and orchestrates the overall flow.

- **src/utils.ts**: Contains the core functionality for downloading templates and processing files. The main `downloadTemplate` function is defined here.

- **src/constants.ts**: Defines the available frameworks and their variants (JS/TS). This centralized approach makes it easy to add new templates.

- **src/create.ts**: A simplified version of the CLI for demonstration purposes, showing how the core functions can be used directly.

- **src/sample.ts**: A basic example showing how to use the API programmatically.

## 📦 Why We Chose These Packages

We carefully selected our dependencies for specific reasons:

### Core Dependencies:

- **tiged (3.0.0-rc.0)**: A fork of degit that works with ES Modules. We use this to download templates without Git history, making the process much faster than git clone.
  
- **prompts**: A lightweight, beautiful and user-friendly interactive prompts library. We chose this over other prompt libraries like inquirer for its smaller size and simpler API.

- **cac**: A modern CLI framework for Node.js. Handles command-line arguments parsing with a clean API.

- **kolorist**: A tiny utility for terminal colors with no dependencies. Makes the CLI output colorful and easier to read.

- **ora**: Elegant terminal spinners that provide visual feedback during template download.

### Development Dependencies:

- **tsup**: A zero-config TypeScript bundler powered by esbuild. We use this to bundle our TypeScript code for distribution.

- **typescript**: Provides type-checking and modern JavaScript features, making the code more reliable and maintainable.

- **tsx**: A CLI command for running TypeScript files directly, useful during development.

### Why ESM (ES Modules) Instead of CommonJS?

We've built this tool using ES Modules (the `type: "module"` in package.json) because:

1. It's the modern standard for JavaScript modules
2. It offers better tree-shaking and static analysis
3. It's more aligned with how frontend code is written
4. It allows for top-level await and other modern features

## 🔧 Development Guide

Want to modify or extend this tool? Here's how to set up your development environment:

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/create-vite-clone.git
cd create-vite-clone

# Install dependencies
pnpm install
```

### Development Workflow

```bash
# Run in watch mode during development
pnpm dev

# Test the current version of your CLI
pnpm create

# Test the simplified API example
pnpm sample
```

### Building with tsup

We use [tsup](https://github.com/egoist/tsup) for bundling our TypeScript code:

1. **Why tsup?**
   - Zero-config TypeScript bundler
   - Based on esbuild (extremely fast)
   - Supports ES Modules
   - Generates type definitions (.d.ts files)

2. **Configuration (tsup.config.ts)**:
   ```typescript
   import { defineConfig } from 'tsup';

   export default defineConfig({
     entry: ['src/index.ts', 'src/utils.ts', 'src/create.ts'],
     format: ['esm'],
     dts: true,
     splitting: false,
     sourcemap: true,
     clean: true,
     minify: false,
     platform: 'node',
   });
   ```

3. **Building the project**:
   ```bash
   pnpm build
   ```

### Adding New Templates

To add support for a new framework:

1. Edit `src/constants.ts`
2. Add a new entry to the `FRAMEWORKS` array:
   ```typescript
   {
     name: 'your-framework',
     display: 'Your Framework',
     color: blue, // Choose a color from kolorist
     variants: [
       {
         name: 'your-framework',
         display: 'JavaScript',
         color: yellow,
       },
       {
         name: 'your-framework-ts',
         display: 'TypeScript',
         color: blue,
       },
     ],
   }
   ```

### Using the API Programmatically

You can also use the core functionality programmatically in your own projects:

```javascript
import { downloadTemplate } from 'create-vite-clone';

// Download a template to a specific directory
await downloadTemplate('react-ts', './my-project');

// Now you can do additional processing, setup, etc.
console.log('Project created!');
```

## ❓ Troubleshooting

### Common Issues

**Q: I'm getting a "command not found" error when trying to run create-vite-clone.**

A: Ensure you've installed the package globally (`npm install -g create-vite-clone`) or use npx to run it without installing (`npx create-vite-clone`).

**Q: The download fails with a "could not find commit hash" error.**

A: This error typically occurs if the template path is incorrect. Our tool uses the correct format for Vite templates, but if you're using a custom template, ensure it follows the format: `owner/repo/subdir#branch`.

**Q: I want to use a private repository as a template.**

A: Currently, this tool doesn't support authentication for private repositories. Consider making a public template repository or fork the code to add authentication support.

**Q: How do I customize the templates after download?**

A: After creating a project, you can modify any files in the project directory. The templates are just starting points.

## 📄 License

ISC 