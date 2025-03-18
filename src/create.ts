#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import prompts from 'prompts';
import { red, green, blue, bold } from 'kolorist';
import { FRAMEWORKS } from './constants.js';
import { downloadTemplate } from './utils.js';

/**
 * Simple CLI command to create a project
 */
async function create() {
  console.log();
  console.log(`${bold(blue('◤◢'))} ${green('Create Vite Project')}`);
  console.log();

  // Project name prompt
  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name:',
    initial: 'my-vite-app',
  });

  if (!projectName) {
    console.log(red('✖') + ' Operation cancelled');
    return;
  }

  // Check if directory exists
  const targetDir = projectName;
  const cwd = process.cwd();
  const targetPath = path.join(cwd, targetDir);
  const exists = fs.existsSync(targetPath);

  if (exists) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Target directory "${targetDir}" already exists. Overwrite?`,
      initial: false,
    });

    if (!overwrite) {
      console.log(red('✖') + ' Operation cancelled');
      return;
    }
  }

  // Framework selection
  const { framework } = await prompts({
    type: 'select',
    name: 'framework',
    message: 'Select a framework:',
    choices: FRAMEWORKS.map((fw) => ({
      title: fw.color(fw.display),
      value: fw.name,
    })),
  });

  if (!framework) {
    console.log(red('✖') + ' Operation cancelled');
    return;
  }

  // Find the selected framework
  const selectedFramework = FRAMEWORKS.find((fw) => fw.name === framework);
  if (!selectedFramework) {
    console.log(red('✖') + ' Framework not found');
    return;
  }

  // Variant selection (JS/TS)
  const { variant } = await prompts({
    type: 'select',
    name: 'variant',
    message: 'Select a variant:',
    choices: selectedFramework.variants.map((v) => ({
      title: v.color(v.display),
      value: v.name,
    })),
  });

  if (!variant) {
    console.log(red('✖') + ' Operation cancelled');
    return;
  }

  // Create project directory if it doesn't exist
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  console.log();
  console.log(`Scaffolding project in ${bold(green(targetDir))}...`);
  console.log();

  try {
    // Download template
    await downloadTemplate(variant, targetPath);

    // Success!
    console.log();
    console.log(green('✓') + ' Project created successfully!');
    console.log();
    console.log('Next steps:');
    console.log(`  cd ${bold(targetDir)}`);
    console.log(`  ${bold('npm install')} (or yarn, pnpm)`);
    console.log(`  ${bold('npm run dev')}`);
    console.log();
  } catch (error) {
    console.error(
      red('✖') + ' Failed to create project:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

// Run the command when this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  create().catch((error) => {
    console.error(
      red('✖') + ' Error:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  });
}
