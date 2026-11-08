import { access, cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = process.argv[2];
if (!source) {
  throw new Error('Usage: npm run copy:handwriting -- /path/to/HandwritingWorksheets');
}

const sourceDir = path.resolve(source);
const outputDir = fileURLToPath(new URL('./app/', import.meta.url));
for (const file of ['src/index.html', 'src/styles.css', 'src/app.js', 'src/worksheet/index.js', 'LICENSE']) {
  await access(path.join(sourceDir, file));
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(path.join(sourceDir, 'src'), outputDir, { recursive: true });
await cp(path.join(sourceDir, 'LICENSE'), path.join(outputDir, 'LICENSE'));
console.log('Copied HandwritingWorksheets into posts/handwriting_worksheets/app/');
