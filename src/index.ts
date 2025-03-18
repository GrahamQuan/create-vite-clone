#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import prompts from 'prompts';
import { cac } from 'cac';
import { red, green, bold, blue, cyan, yellow } from 'kolorist';
import { FRAMEWORKS } from './constants.js';
import { downloadTemplate } from './utils.js';

/**
 * Initialize the CLI
 */
async function init() {
  console.log();
  console.log(`${bold(cyan('◤◢'))} ${green('create-vite-clone')}`);
  console.log();

  // Parse command line arguments
  const cli = cac('create-vite-clone');

  cli
    .command('[project-name]', 'Create a new project')
    .option('--template [template]', 'Select a template')
    .action(async (projectName, options) => {
      let targetDir = projectName || '';
      let template = options.template;

      let result: {
        projectName?: string;
        overwrite?: boolean;
        packageName?: string;
        framework?: string;
        variant?: string;
      } = {};

      try {
        // Project name prompt
        if (!targetDir) {
          result = await prompts({
            type: 'text',
            name: 'projectName',
            message: 'Project name:',
            initial: 'vite-project',
          });

          targetDir = result.projectName || 'vite-project';
        }

        // Validate project name
        const cwd = process.cwd();
        const targetPath = path.join(cwd, targetDir);
        const exists = fs.existsSync(targetPath);

        // Prompt for overwrite if directory exists
        if (exists) {
          result = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `Target directory "${targetDir}" already exists. Overwrite?`,
            initial: false,
          });

          if (!result.overwrite) {
            console.log(red('✖') + ' Operation cancelled');
            return;
          }
        }

        // Package name prompt (uses directory name as default)
        const defaultPkgName = targetDir
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-');
        result = await prompts({
          type: 'text',
          name: 'packageName',
          message: 'Package name:',
          initial: defaultPkgName,
          validate: (value: string) =>
            /^[a-z0-9\-_@.]+$/.test(value) ||
            'Invalid package name. Use lowercase letters, numbers, and - _ @ .',
        });

        const packageName = result.packageName || defaultPkgName;

        // Framework selection prompt
        let framework = '';
        let variant = '';

        // Use template option if provided
        if (template) {
          // Find the template in available frameworks
          for (const f of FRAMEWORKS) {
            const foundVariant = f.variants.find((v) => v.name === template);
            if (foundVariant) {
              framework = f.name;
              variant = foundVariant.name;
              break;
            }
          }

          if (!framework) {
            console.log(red(`✖ Template "${template}" not found.`));
            return;
          }
        } else {
          // Framework selection prompt
          result = await prompts({
            type: 'select',
            name: 'framework',
            message: 'Select a framework:',
            choices: FRAMEWORKS.map((framework) => ({
              title: framework.color(framework.display),
              value: framework.name,
            })),
          });

          framework = result.framework || '';

          // Variant selection prompt (JS/TS)
          const selectedFramework = FRAMEWORKS.find(
            (f) => f.name === framework
          );
          if (!selectedFramework) {
            console.log(red('✖') + ' Operation cancelled');
            return;
          }

          result = await prompts({
            type: 'select',
            name: 'variant',
            message: 'Select a variant:',
            choices: selectedFramework.variants.map((variant) => ({
              title: variant.color(variant.display),
              value: variant.name,
            })),
          });

          variant = result.variant || '';
        }

        if (!variant) {
          console.log(red('✖') + ' Operation cancelled');
          return;
        }

        // Create project directory if doesn't exist
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }

        // Log selections
        console.log();
        console.log(`Scaffolding project in ${targetDir}...`);
        console.log();

        // Download template
        await downloadTemplate(variant, targetPath);

        // Update package.json name
        const pkgPath = path.join(targetPath, 'package.json');
        if (fs.existsSync(pkgPath)) {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
          pkg.name = packageName;
          fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        }

        // Success message and next steps
        console.log();
        console.log(green('✔') + ' Project scaffolded successfully!');
        console.log();
        console.log('Next steps:');
        console.log(`  ${bold(blue('cd'))} ${bold(targetDir)}`);
        console.log(
          `  ${bold(yellow('npm install'))} (or ${bold(green('yarn'))}, ${bold(
            cyan('pnpm')
          )}, ${bold(red('bun'))})`
        );
        console.log(
          `  ${bold(yellow('npm run dev'))} (or ${bold(green('yarn'))}, ${bold(
            cyan('pnpm')
          )}, ${bold(red('bun'))})`
        );
        console.log();
      } catch (error: unknown) {
        if (error instanceof Error && error.message) {
          console.log();
          console.log(red('✖') + ' ' + error.message);
        } else {
          console.log();
          console.log(red('✖') + ' An unknown error occurred');
        }
        process.exit(1);
      }
    });

  // Handle help and version
  cli.help();
  cli.version('1.0.0');

  // Parse CLI args
  cli.parse(process.argv, { run: false });

  // Run the appropriate command or help if no arguments
  if (!process.argv.slice(2).length) {
    await init();
  } else {
    cli.runMatchedCommand();
  }
}

// Export the downloadTemplate function for programmatic usage
export { downloadTemplate } from './utils.js';

// Run the CLI when this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  init().catch((error: unknown) => {
    console.error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
    process.exit(1);
  });
}
