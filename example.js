#!/usr/bin/env node

import inquirer from 'inquirer';
import { downloadTemplate } from './src/index.js';
import { FRAMEWORKS } from './src/constants.js';
import { green, red, blue } from 'kolorist';

async function main() {
  try {
    // Get project name
    const { projectName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name:',
        default: 'my-vite-app',
      },
    ]);

    // Select framework
    const { framework } = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Select a framework:',
        choices: FRAMEWORKS.map((fw) => ({
          name: fw.display,
          value: fw.name,
        })),
      },
    ]);

    // Find the selected framework
    const selectedFramework = FRAMEWORKS.find((fw) => fw.name === framework);
    if (!selectedFramework) {
      console.log(red('Framework not found'));
      process.exit(1);
    }

    // Select variant (JS/TS)
    const { variant } = await inquirer.prompt([
      {
        type: 'list',
        name: 'variant',
        message: 'Select a variant:',
        choices: selectedFramework.variants.map((v) => ({
          name: v.display,
          value: v.name,
        })),
      },
    ]);

    console.log();
    console.log(
      `Downloading ${green(variant)} template to ${blue(projectName)}...`
    );

    // Download the template
    await downloadTemplate(variant, projectName);

    console.log();
    console.log(green('✓') + ' Project created successfully!');
    console.log();
    console.log('Next steps:');
    console.log(`  cd ${projectName}`);
    console.log('  npm install (or yarn, pnpm)');
    console.log('  npm run dev');
    console.log();
  } catch (error) {
    console.error(red('Error:'), error.message);
    process.exit(1);
  }
}

main();
