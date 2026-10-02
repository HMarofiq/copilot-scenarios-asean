import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import remarkScenario from '../src/lib/remark-scenario.mjs';

const heading = (text) => ({ type: 'heading', depth: 2, children: [{ type: 'text', value: text }] });
const paragraph = (text) => ({ type: 'paragraph', children: [{ type: 'text', value: text }] });
const step = () => ({ type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: '1. Review mail.' }] }, { type: 'text', value: 'Read it.' }] });
const list = (text) => ({ type: 'list', children: [{ type: 'listItem', children: [paragraph(text)] }] });
const tier = (key, section, children) => ({ type: 'containerDirective', name: 'tier', attributes: { key, ...(section ? { section } : {}) }, children });
const frontmatter = {
  demo_kit: false,
  inputs: [{ name: 'Your inbox', format: 'Email', where: 'Outlook' }],
  licence: ['copilot-chat', 'm365-copilot'],
  surface: ['outlook', 'copilot-chat'],
  card: { output: 'Four groups.' },
  data: { sensitivity: 'Confidential', customer_pii: true, signoff: 'Review first' },
  tiers: [
    { key: 'basic', title: 'Copilot Chat', licence: 'copilot-chat', surface: ['outlook'], effort: '10 min', runs: 'In Outlook' },
    { key: 'premium', title: 'Microsoft 365 Copilot', licence: 'm365-copilot', surface: ['copilot-chat'], effort: '10 min', runs: 'In the app' },
  ],
};
const file = () => ({ data: { astro: { frontmatter } }, fail(message) { throw new Error(message); } });
const nodes = (tree) => {
  const out = [];
  const visit = (node) => { out.push(node); for (const child of node.children ?? []) visit(child); };
  visit(tree);
  return out;
};

test('workflow buttons link steps, checks and fixes; the first workflow is selected', () => {
  const tree = { type: 'root', children: [
    heading('Situation'), paragraph('Inbox context'), heading('Steps'),
    tier('basic', null, [step()]), tier('premium', null, [step()]),
    heading('Check it'), tier('basic', 'checks', [list('Basic check')]), tier('premium', 'checks', [list('Premium check')]),
    heading('When it goes wrong'), tier('basic', 'fixes', [list('Basic fix. (step 1)')]), tier('premium', 'fixes', [list('Premium fix. (step 1)')]),
  ] };
  remarkScenario()(tree, file());
  const all = nodes(tree);
  const rendered = all.filter((n) => n.type === 'html').map((n) => n.value).join('\n');
  assert.match(rendered, /role="tablist"/);
  assert.match(rendered, /id="tier-tab-basic"[^>]+aria-selected="true"[^>]+aria-controls="tier-basic tier-basic-checks tier-basic-fixes"/);
  assert.match(rendered, /id="tier-tab-premium"[^>]+aria-selected="false" tabindex="-1"/);
  assert.doesNotMatch(rendered, /tier-table|Download demo kit/);
  const panels = all.filter((n) => n.data?.hProperties?.dataTierContent);
  assert.equal(panels.length, 6);
  assert.ok(panels.filter((p) => p.data.hProperties.dataTierContent === 'basic').every((p) => p.data.hProperties.hidden === false));
  assert.ok(panels.filter((p) => p.data.hProperties.dataTierContent === 'premium').every((p) => p.data.hProperties.hidden === true));
  assert.match(rendered, /data-step="basic-1"/);
  assert.match(rendered, /data-step="premium-1"/);
  assert.match(rendered, /href="#fix-basic-1"/);
  assert.match(rendered, /href="#fix-premium-1"/);
  assert.equal(all.filter((n) => n.data?.hProperties?.className?.includes('checklist')).length, 2);
  assert.ok(all.some((n) => n.type === 'heading' && n.children[0]?.value === 'Your inputs'));
});

test('workflow blocks reject misplaced or duplicate supporting sections', () => {
  assert.throws(() => remarkScenario()({ type: 'root', children: [heading('Steps'), tier('basic', 'checks', [list('Check')])] }, file()), /must sit under Check it/);
  assert.throws(() => remarkScenario()({ type: 'root', children: [
    heading('Steps'), tier('basic', null, [step()]), tier('basic', null, [step()]),
  ] }, file()), /Duplicate workflow/);
});

test('triage uses the existing inbox, seven days and four quadrants with separate safety handling', () => {
  const text = readFileSync(new URL('../content/scenarios/x-email-triage-015.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const fm = parse(text.split(/^---$/m)[1]);
  assert.equal(fm.demo_kit, false);
  assert.deepEqual(fm.tiers.map((t) => t.key), ['basic', 'premium', 'cowork']);
  assert.ok(fm.inputs.every((i) => !i.kit));
  assert.match(fm.objective, /review aid, not an authoritative task tracker/i);
  assert.equal(fm.status, 'draft');
  assert.match(fm.validation_note, /errors after retries/);
  assert.doesNotMatch(text, /FICTIONAL_|Adelia|Carlos|Wingtip|Create a skill|upload all files/i);
  for (const key of ['basic', 'premium', 'cowork']) {
    const block = text.match(new RegExp(`::::tier\\{key="${key}"\\}\\n([\\s\\S]*?)\\n::::`))[1];
    assert.match(block, /last 7 days/);
    for (const q of ['Do now', 'Plan', 'Handle quickly', 'Read later']) assert.ok(block.includes(q));
    assert.match(block, /Only report here/);
    for (const section of ['checks', 'fixes']) assert.ok(text.includes(`::::tier{key="${key}" section="${section}"}`));
  }
  for (const prompt of text.matchAll(/:::prompt\n([\s\S]*?)\n:::/g)) {
    const languages = ['EN', 'ID', 'BM'].map((key) => {
      const start = prompt[1].indexOf(`${key}: `);
      const end = prompt[1].slice(start + 4).search(/\n(?:EN|ID|BM): /);
      return prompt[1].slice(start + 4, end < 0 ? undefined : start + 4 + end).trim().split('\n');
    });
    assert.equal(languages[0].length, languages[1].length);
    assert.equal(languages[0].length, languages[2].length);
    assert.ok(languages.flat().every((line) => line.length <= 350));
  }
});
