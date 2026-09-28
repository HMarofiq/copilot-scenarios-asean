// Blocks content that must never be published.
//
// Two lists:
//  1. .github/banned-patterns.txt  PUBLIC regexes (tenant GUIDs, internal hosts, Microsoft emails).
//  2. PRIVATE customer and project names. Never commit these: the list itself would reveal who
//     the customers are. Supplied by the BANNED_TERMS Actions secret (one per line) in CI, or by
//     a gitignored .banned-terms.local file on your machine. Matches are reported as
//     "private term #n" so CI logs never echo the name.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const TEXT = /\.(md|mdx|astro|ts|mjs|js|json|ya?ml|txt|html|css|csv|svg)$/i;
const SKIP = new Set(['node_modules', 'dist', '.astro', '.git', 'package-lock.json']);
const SELF = new Set([join('.github', 'banned-patterns.txt'), '.banned-terms.local']);

const lines = (s) => s.replace(/^\uFEFF/, '').split(/\r?\n/).map((l) => l.replace(/^\uFEFF/, '').trim()).filter((l) => l && !l.startsWith('#'));
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rules = lines(readFileSync(join('.github', 'banned-patterns.txt'), 'utf8'))
  .map((p) => ({ re: new RegExp(p, 'i'), show: p }));
const privateSrc = process.env.BANNED_TERMS ?? (existsSync('.banned-terms.local') ? readFileSync('.banned-terms.local', 'utf8') : '');
lines(privateSrc).forEach((t, i) => rules.push({ re: new RegExp(`\\b${escape(t)}\\b`, 'i'), show: `private term #${i + 1}` }));
const privateCount = lines(privateSrc).length;

let problems = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    const rel = relative('.', p);
    if (!TEXT.test(name) || SELF.has(rel)) continue;
    readFileSync(p, 'utf8').split(/\r?\n/).forEach((line, i) => {
      for (const r of rules) if (r.re.test(line)) { console.error(`✗ ${rel}:${i + 1} matches ${r.show}`); problems++; }
    });
  }
}
walk('.');

if (!privateCount) console.warn('! No private terms loaded (BANNED_TERMS secret or .banned-terms.local). Customer names are NOT being checked.');
if (problems) process.exit(1);
console.log(`✓ banned terms: clean (${rules.length - privateCount} public patterns, ${privateCount} private terms)`);
if (process.env.CI && !privateCount) process.exit(1);
