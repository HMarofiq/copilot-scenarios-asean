// Astro logs Markdown render failures as [ERROR] but still exits 0, which would ship
// a broken scenario page with a green CI tick. This wrapper makes any [ERROR] fatal.
import { spawn } from 'node:child_process';

const run = (cmd, args) => new Promise((resolve) => {
  let failed = false;
  const p = spawn(cmd, args, { shell: true, env: process.env });
  const scan = (chunk, out) => {
    out.write(chunk);
    if (/\[ERROR\]/.test(chunk.toString())) failed = true;
  };
  p.stdout.on('data', (c) => scan(c, process.stdout));
  p.stderr.on('data', (c) => scan(c, process.stderr));
  p.on('close', (code) => resolve(code !== 0 || failed));
});

if (await run('node', ['scripts/build-kits.mjs'])) {
  console.error('\nBuild failed: a demo kit could not be generated.');
  process.exit(1);
}
if (await run('npx', ['astro', 'build'])) {
  console.error('\nBuild failed: Astro reported errors above.');
  process.exit(1);
}
if (await run('npx', ['pagefind', '--site', 'dist'])) process.exit(1);
