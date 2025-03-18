import degit from 'tiged';
import ora from 'ora';
import fs from 'fs/promises';
import path from 'path';

/**
 * Downloads a subdirectory from a GitHub repository using tiged
 *
 * @param template - The template name (e.g., 'preact-ts')
 * @param targetDir - The local destination directory
 * @returns Promise that resolves when download is complete
 */
export async function downloadTemplate(template: string, targetDir: string) {
  const spinner = ora(`Downloading template ${template}...`).start();

  try {
    // For subdirectories, use the following format:
    // 'user/repo/subdir#branch'
    // Instead of 'user/repo#branch/subdir' which doesn't work properly

    // Parse the URL correctly for Vite templates
    const repo = 'vitejs/vite';
    const branch = 'main';
    const subdir = `packages/create-vite/template-${template}`;

    const emitter = degit(`${repo}/${subdir}#${branch}`, {
      verbose: true,
      force: true,
    });

    await emitter.clone(targetDir);

    // Rename special files (like _gitignore to .gitignore)
    await renameSpecialFiles(targetDir);

    spinner.succeed(`Successfully downloaded template: ${template}`);
  } catch (error) {
    spinner.fail(`Error downloading template: ${error}`);
    throw error;
  }
}

/**
 * Renames special files like _gitignore to .gitignore
 *
 * @param dir - The directory to process
 */
export async function renameSpecialFiles(dir: string) {
  // Map of special files to rename
  const filesToRename = {
    _gitignore: '.gitignore',
    // Add other special files if needed
    '_eslintrc.json': '.eslintrc.json',
    _npmrc: '.npmrc',
    _editorconfig: '.editorconfig',
  };

  // Walk through the directory and process files
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      await renameSpecialFiles(fullPath);
    } else if (filesToRename[entry.name as keyof typeof filesToRename]) {
      // Rename the file if it's in our map
      const newPath = path.join(
        dir,
        filesToRename[entry.name as keyof typeof filesToRename]
      );
      await fs.rename(fullPath, newPath);
    }
  }
}
