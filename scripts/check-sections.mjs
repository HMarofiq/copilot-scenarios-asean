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

  // Tiered scenarios: every frontmatter tier has exactly one ::::tier block inside Steps, each with a prompt.
  const fmKeys = [...text.split(/^---$/m)[1].matchAll(/^\s*- \{ key: (\w+)/gm)].map((m) => m[1]);
  const blocks = [...body.matchAll(/^::::tier\{key="(\w+)"(?: section="(\w+)")?\}\n([\s\S]*?)^::::$/gm)];
  if (fmKeys.length || blocks.length) {
    const steps = body.slice(body.indexOf('## Steps'), body.indexOf('## Check it'));
    const stepBlocks = blocks.filter((m) => !m[2] || m[2] === 'steps');
    const bk = stepBlocks.map((m) => m[1]);
    if (fmKeys.join() !== bk.join()) fail(`tier blocks [${bk}] must match frontmatter tiers [${fmKeys}] in the same order`);
    for (const m of stepBlocks) {
      if (!steps.includes(m[0])) fail(`tier ${m[1]} must sit inside ## Steps`);
      if (!/^:::prompt$/m.test(m[3])) fail(`tier ${m[1]} needs at least one :::prompt`);
    }
    for (const section of ['checks', 'fixes']) {
      const group = blocks.filter((m) => m[2] === section);
      if (!group.length) continue;
      if (group.map((m) => m[1]).join() !== fmKeys.join()) fail(`every tier needs one ${section} block in frontmatter order`);
      const title = section === 'checks' ? 'Check it' : 'When it goes wrong';
      const start = body.indexOf(`## ${title}`);
      const end = body.indexOf('\n## ', start + 1);
      const content = body.slice(start, end < 0 ? body.length : end);
      for (const m of group) if (!content.includes(m[0])) fail(`tier ${m[1]} ${section} block must sit inside ## ${title}`);
    }
  }
}

if (problems) { console.error(`\n${problems} problem(s). See templates/scenario-template.md`); process.exit(1); }
console.log('✓ sections: all scenarios complete');
