// Lists scenarios whose validated_on is older than MAX_DAYS. Used by the weekly workflow
// to open a revalidation issue per scenario. Prints JSON for the workflow; human summary on stderr.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_DAYS = Number(process.env.MAX_DAYS ?? 90);
const DIR = 'content/scenarios';
const now = Date.now();

const stale = readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => {
  const t = readFileSync(join(DIR, f), 'utf8');
  const id = (t.match(/^id:\s*(\S+)/m) || [])[1];
  const title = (t.match(/^title:.*?en:\s*"([^"]+)"/m) || [])[1] ?? id;
  const v = (t.match(/^validated_on:\s*(\S+)/m) || [])[1];
  const age = v ? Math.floor((now - Date.parse(v)) / 864e5) : Infinity;
  return { id, title, validated_on: v ?? null, age_days: age };
}).filter((s) => s.age_days > MAX_DAYS);

stale.forEach((s) => console.error(`! ${s.id}: validated ${s.validated_on} (${s.age_days} days ago)`));
if (!stale.length) console.error(`✓ freshness: all scenarios validated within ${MAX_DAYS} days`);
console.log(JSON.stringify(stale));
