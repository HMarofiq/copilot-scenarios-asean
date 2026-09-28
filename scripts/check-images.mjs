// Raster images are only allowed in public/approved/ (screenshots from the demo tenant,
// reviewed via CODEOWNERS). Blocks accidental screenshots of real tenants or customers.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RASTER = /\.(png|jpe?g|gif|webp|avif|bmp|tiff?|heic)$/i;
const SKIP = new Set(['node_modules', 'dist', '.astro', '.git']);
const ALLOWED = join('public', 'approved') + sep;
let problems = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    const rel = relative('.', p);
    if (RASTER.test(name) && !rel.startsWith(ALLOWED)) { console.error(`✗ ${rel}: images must live in public/approved/`); problems++; }
    if (rel.startsWith(join('content', 'scenarios')) && name.endsWith('.md')) {
      for (const m of readFileSync(p, 'utf8').matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) {
        if (/^https?:/i.test(m[1])) { console.error(`✗ ${rel}: remote image ${m[1]} not allowed; add it to public/approved/`); problems++; }
        else if (!/(^|\/)approved\//.test(m[1])) { console.error(`✗ ${rel}: image ${m[1]} must point to /approved/`); problems++; }
      }
    }
  }
}
walk('.');
if (problems) process.exit(1);
console.log('✓ images: only approved images used');
