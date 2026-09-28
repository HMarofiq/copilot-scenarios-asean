// Builds every demo kit: kits/<scenario-id>/build.mjs -> public/kits/<scenario-id>.zip
// Runs before `astro build` so the zips ship with the site. Outputs are gitignored.
import { existsSync, readdirSync, readFileSync, rmSync, mkdirSync, createWriteStream, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ZipArchive } from 'archiver';

const KITS = 'kits', TMP = '.kits-tmp', OUT = join('public', 'kits');
// Build date in Jakarta time, so date-relative kits (permit expiries) are correct for ID/MY users.
const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' })
  .formatToParts(new Date()).map((x) => [x.type, x.value]));
const today = new Date(`${p.year}-${p.month}-${p.day}T00:00:00Z`);

rmSync(TMP, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const z of readdirSync(OUT).filter((n) => n.endsWith('.zip'))) rmSync(join(OUT, z));
const ids = readdirSync(KITS).filter((d) => existsSync(join(KITS, d, 'build.mjs')));
// Only ship kits for scenarios the site publishes (see src/lib/publish.ts).
const statusOf = (id) => (readFileSync(join('content', 'scenarios', `${id}.md`), 'utf8').match(/^status:\s*(\S+)/m) || [])[1];
const published = (id) => process.env.PUBLISH_ALL === '1' || statusOf(id) === 'validated';
let failed = false;

for (const id of ids) {
  if (!existsSync(join('content', 'scenarios', `${id}.md`))) { console.error(`✗ kits/${id}: no matching scenario content/scenarios/${id}.md`); failed = true; continue; }
  if (!published(id)) { console.log(`- kit ${id}: skipped (not published)`); continue; }
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
    const files = readdirSync(dir, { recursive: true }).filter((f) => statSync(join(dir, f)).isFile()).length;
    console.log(`✓ kit ${id}: ${files} files, ${(statSync(zip).size / 1024).toFixed(0)} KB`);
  } catch (e) { console.error(`✗ kit ${id}: ${e.stack ?? e}`); failed = true; }
}
if (failed) process.exit(1);
