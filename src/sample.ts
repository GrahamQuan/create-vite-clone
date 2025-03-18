/**
 * Sample usage of the downloadTemplate function
 */

import { downloadTemplate } from './utils.js';

async function main() {
  try {
    // Download a template (e.g., React with TypeScript)
    console.log('Downloading React TypeScript template...');
    await downloadTemplate('react-ts', './my-react-app');

    console.log('✅ Template downloaded successfully!');
    console.log('🚀 Next steps:');
    console.log('  cd my-react-app');
    console.log('  npm install');
    console.log('  npm run dev');
  } catch (error) {
    console.error(
      '❌ Error:',
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the sample
main();
