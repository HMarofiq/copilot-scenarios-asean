// Fails if a scenario is missing a required section or block.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'content/scenarios';
const REQUIRED_H2 = ['Situation', 'Steps', 'Check it', 'When it goes wrong', 'Take it further'];
let problems = 0;

for (const f of readdirSync(DIR).filter((x) => x.endsWith('.md'))) {
  const text = readFileSync(join(DIR, f), 'utf8').replace(/\r\n/g, '\n');
  const body = text.split(/^---$/m).slice(2).join('---');
  const h2 = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const fail = (msg) => { console.error(`✗ ${f}: ${msg}`); problems++; };

  REQUIRED_H2.forEach((s) => h2.includes(s) || fail(`missing "## ${s}"`));
  const order = REQUIRED_H2.map((s) => h2.indexOf(s)).filter((i) => i >= 0);
  if (order.some((v, i) => i && v < order[i - 1])) fail(`sections out of order; expected ${REQUIRED_H2.join(' > ')}`);
  if (!/^:::prompt$/m.test(body)) fail('needs at least one :::prompt block');
  if (!/^:::presenter$/m.test(body)) fail('needs a :::presenter block');
  if ((f.replace('.md', '')) !== (text.match(/^id:\s*(\S+)/m) || [])[1]) fail('file name must match id');
}

if (problems) { console.error(`\n${problems} problem(s). See templates/scenario-template.md`); process.exit(1); }
console.log('✓ sections: all scenarios complete');
