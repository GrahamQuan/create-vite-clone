import { downloadTemplate } from './index.js';

// Example: Download the preact-ts template from Vite
async function main() {
  try {
    await downloadTemplate('react-ts', './my-demo-project');

    console.log('✅ Template downloaded successfully!');
    console.log('🚀 Next steps:');
    console.log('  cd my-project');
    console.log('  npm install (or yarn, pnpm)');
    console.log('  npm run dev');
  } catch (error) {
    console.error('Failed to create project:', error);
  }
}

main();
