// Builds every demo kit: kits/<scenario-id>/build.mjs -> public/kits/<scenario-id>.zip
// Runs before `astro build` so the zips ship with the site. Outputs are gitignored.
import { existsSync, readdirSync, readFileSync, rmSync, mkdirSync, createWriteStream, statSync, writeFileSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ZipArchive } from 'archiver';
import { parse } from 'yaml';

const KITS = 'kits', TMP = '.kits-tmp', OUT = join('public', 'kits');
// Build date in Jakarta time, so date-relative kits (permit expiries) are correct for ID/MY users.
const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' })
  .formatToParts(new Date()).map((x) => [x.type, x.value]));
const today = new Date(`${p.year}-${p.month}-${p.day}T00:00:00Z`);

rmSync(TMP, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const z of readdirSync(OUT).filter((n) => n.endsWith('.zip') || n.endsWith('.manifest.json'))) rmSync(join(OUT, z));
const ids = readdirSync(KITS).filter((d) => existsSync(join(KITS, d, 'build.mjs')));
// Only ship kits for scenarios the site publishes (see src/lib/publish.ts).
const metadata = (id) => parse(readFileSync(join('content', 'scenarios', `${id}.md`), 'utf8').split(/^---\s*$/m)[1]);
let failed = false;

for (const id of ids) {
  if (!existsSync(join('content', 'scenarios', `${id}.md`))) { console.error(`✗ kits/${id}: no matching scenario content/scenarios/${id}.md`); failed = true; continue; }
  const fm = metadata(id);
  if (fm.demo_kit === false) { console.log(`- kit ${id}: no download needed`); continue; }
  if (process.env.PUBLISH_ALL !== '1' && fm.status !== 'validated') { console.log(`- kit ${id}: skipped (not published)`); continue; }
  const dir = join(TMP, id);
  mkdirSync(dir, { recursive: true });
  try {
    const mod = await import(pathToFileURL(resolve(KITS, id, 'build.mjs')).href);
    await mod.default({ dir, today });
    const zip = join(OUT, `${id}.zip`);
    await new Promise((res, rej) => {
      const out = createWriteStream(zip);
      const z = new ZipArchive({ zlib: { level: 9 } });
      z.on('error', rej); out.on('close', res);
      z.pipe(out); z.directory(dir + '/', `FICTIONAL_${id}`); z.finalize();
    });
    const entries = readdirSync(dir, { recursive: true }).map((f) => f.split(sep).join('/') + (statSync(join(dir, f)).isDirectory() ? '/' : '')).sort();
    const files = entries.filter((entry) => !entry.endsWith('/')).length;
    writeFileSync(join(OUT, `${id}.manifest.json`), JSON.stringify({ root: `FICTIONAL_${id}`, entries }, null, 2) + '\n', 'utf8');
    console.log(`✓ kit ${id}: ${files} files, ${(statSync(zip).size / 1024).toFixed(0)} KB`);
  } catch (e) { console.error(`✗ kit ${id}: ${e.stack ?? e}`); failed = true; }
}
if (failed) process.exit(1);
