import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import remarkScenario from '../src/lib/remark-scenario.mjs';

const heading = (text) => ({ type: 'heading', depth: 2, children: [{ type: 'text', value: text }] });

test('prompt containers preserve clock minutes and colon-delimited references', () => {
  const children = [
    { type: 'text', value: 'EN: Review at 18' },
    { type: 'textDirective', name: '00', children: [] },
    { type: 'text', value: ' MYT and Note' },
    { type: 'textDirective', name: 'source', children: [] },
    { type: 'text', value: '.\nID: Tinjau pada 18' },
    { type: 'textDirective', name: '00', children: [] },
    { type: 'text', value: ' MYT.\nBM: Semak pada 18' },
    { type: 'textDirective', name: '00', children: [] },
    { type: 'text', value: ' MYT.' },
  ];
  const tree = { type: 'root', children: [{ type: 'containerDirective', name: 'prompt', children: [{ type: 'paragraph', children }] }] };
  remarkScenario()(tree, { fail(message) { throw new Error(message); } });
  const html = tree.children[0].value;
  assert.equal(html.split('18:00 MYT').length - 1, 3);
  assert.match(html, /Note:source/);
});

test('Before you start keeps requirements and one-line data rules together with branded app icons', () => {
  const tree = { type: 'root', children: [heading('Situation'), heading('Steps')] };
  remarkScenario({ base: '/library/' })(tree, {
    data: { astro: { frontmatter: {
      licence: ['m365-copilot'],
      surface: ['word', 'cowork', 'agent'],
      inputs: [],
      card: { output: 'Review & approve.' },
      data: { sensitivity: 'Confidential', customer_pii: true, signoff: 'Legal & Finance' },
    } } },
    fail(message) { throw new Error(message); },
  });
  const html = tree.children.filter((node) => node.type === 'html').map((node) => node.value).join('\n');
  assert.match(html, /class="start-grid"><div class="needs">[\s\S]*<div class="callout warn rules">/);
  for (const label of ['Sensitivity:', 'Personal data:', 'Approval before use:']) {
    assert.match(html, new RegExp(`<p><strong>${label}</strong>`));
  }
  assert.match(html, /Legal &amp; Finance/);
  assert.match(html, /src="\/library\/approved\/app-icons\/word\.svg" alt="" width="24" height="24"/);
  assert.match(html, /src="\/library\/approved\/app-icons\/copilot\.svg"/);
  assert.match(html, /approved\/icons\/bot\.svg/);
});

test('the summary card has no duplicated requirements and Before you start is always vertical', () => {
  const page = readFileSync(new URL('../src/pages/scenarios/[id].astro', import.meta.url), 'utf8');
  const card = page.match(/<section class="card60">([\s\S]*?)<\/section>/)[1];
  assert.doesNotMatch(card, /meta60|data60|d\.licence|d\.surface|d\.data/);
  assert.match(page, /\.start-grid\)[^\n]+grid-template-columns:minmax\(0, 1fr\)/);
});

test('scenario pages keep an open article with boxed summaries, steps and sidebar', () => {
  const page = readFileSync(new URL('../src/pages/scenarios/[id].astro', import.meta.url), 'utf8');
  assert.match(page, /<Base title=\{d\.title\.en\} scenario>/);
  for (const selector of ['article', '.quick-start', '.objective', '.onthispage']) {
    const rule = page.split('\n').find((line) => line.includes(`${selector}${selector === '.objective' ? ')' : ' '}`) && line.includes('background:transparent'));
    assert.ok(rule, `${selector} must not introduce another filled container`);
    assert.match(rule, /border:0/);
  }
  assert.match(page, /\.card60 \{[^\n]+border:1px solid var\(--line\)/);
  assert.match(page, /\.stepcard\) \{[^\n]+border:1px solid var\(--line\)/);
  assert.match(page, /\.side \{[^\n]+border:1px solid var\(--line\)/);
  assert.match(page, /\.needs\)[^\n]+border:1px solid var\(--line\)/);
  assert.match(page, /\.rules\)[^\n]+border-left-width:3px/);
  assert.match(page, /\.route\)[^\n]+border:1px solid var\(--line\)/);
  assert.match(page, /new ResizeObserver\(updateAnchorOffset\)\.observe\(header\)/);
  assert.match(page, /scroll-margin-top:var\(--scenario-anchor-offset, 104px\)/);
  const layout = readFileSync(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8');
  assert.match(layout, /\.prompt \{[^\n]+background:var\(--cp-surface-soft\)/);
});

test('scenario situations stay short enough to scan', () => {
  const dir = new URL('../content/scenarios/', import.meta.url);
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
    const markdown = readFileSync(new URL(file, dir), 'utf8');
    const situation = markdown.match(/## Situation\s*([\s\S]*?)\s*## Steps/)[1];
    const words = situation.trim().split(/\s+/).length;
    assert.ok(words <= 100, `${file}: ${words} words`);
  }
});
