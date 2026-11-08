import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

async function createFixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'handwriting-copy-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const script = path.join(root, 'copy.mjs');
  await cp(new URL('../posts/handwriting_worksheets/copy.mjs', import.meta.url), script);
  const source = path.join(root, 'source');
  await mkdir(path.join(source, 'src/worksheet'), { recursive: true });
  for (const file of ['src/index.html', 'src/styles.css', 'src/app.js', 'src/worksheet/index.js', 'LICENSE']) {
    await writeFile(path.join(source, file), file);
  }
  await writeFile(path.join(source, 'README.md'), 'Not a runtime asset');
  return { root, script, source };
}

test('copies runtime assets and license, replacing stale files', async (t) => {
  const { root, script, source } = await createFixture(t);
  const output = path.join(root, 'app');
  await mkdir(output);
  await writeFile(path.join(output, 'stale.js'), 'stale');
  const result = spawnSync(process.execPath, [script, source], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual((await readdir(output)).sort(), ['LICENSE', 'app.js', 'index.html', 'styles.css', 'worksheet']);
  assert.equal(await readFile(path.join(output, 'worksheet/index.js'), 'utf8'), 'src/worksheet/index.js');
  assert.equal(await readFile(path.join(output, 'LICENSE'), 'utf8'), 'LICENSE');
});

test('missing source argument explains usage', async (t) => {
  const { script } = await createFixture(t);
  const result = spawnSync(process.execPath, [script], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Usage: npm run copy:handwriting/);
});

test('invalid source fails before deleting existing assets', async (t) => {
  const { root, script, source } = await createFixture(t);
  await rm(path.join(source, 'LICENSE'));
  await mkdir(path.join(root, 'app'));
  await writeFile(path.join(root, 'app/index.html'), 'existing app');
  const result = spawnSync(process.execPath, [script, source], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.equal(await readFile(path.join(root, 'app/index.html'), 'utf8'), 'existing app');
});
