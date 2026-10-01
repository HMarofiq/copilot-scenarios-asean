import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { parse } from 'yaml';
import { toolIconUrl } from '../src/lib/tool-icons.mjs';
import { appIconUrl } from '../src/lib/app-icons.mjs';

const layout = readFileSync(new URL('../src/layouts/Base.astro', import.meta.url), 'utf8');
const bootstrap = layout.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function initialTheme({ saved, query = '', unavailable = false } = {}) {
  const element = { dataset: {}, setAttribute(name, value) { this[name] = value; } };
  runInNewContext(bootstrap, {
    window: { location: { search: query }, matchMedia: () => ({ matches: true }) },
    URLSearchParams,
    document: { documentElement: element },
    localStorage: { getItem(key) { if (unavailable) throw new Error('Storage denied'); return key === 'sl:v1:theme' ? saved : 'en'; } },
    console: { warn() {} },
  });
  return element['data-theme'];
}

test('light is the default even when the OS prefers dark', () => {
  assert.equal(initialTheme(), 'light');
  assert.equal(initialTheme({ unavailable: true }), 'light');
});
test('explicit theme choices persist; invalid values do not become themes', () => {
  assert.equal(initialTheme({ saved: 'dark' }), 'dark');
  assert.equal(initialTheme({ saved: 'light' }), 'light');
  assert.equal(initialTheme({ saved: 'dark', query: '?scoutTheme=light' }), 'light');
  assert.equal(initialTheme({ saved: 'dark', query: '?scoutTheme=invalid' }), 'dark');
  assert.equal(initialTheme({ saved: 'invalid', query: '?scoutTheme=invalid' }), 'light');
});

function luminance(hex) {
  const rgb = hex.match(/[a-f\d]{2}/gi).map(channel => parseInt(channel, 16) / 255)
    .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}
function contrast(a, b) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}
for (const [theme, pattern] of [
  ['light', /:root \{([\s\S]*?)\n  \}/],
  ['dark', /html\[data-theme="dark"\] \{([\s\S]*?)\n  \}/],
]) {
  test(`${theme} palette keeps normal text at WCAG AA contrast without pure black or white surfaces`, () => {
    const colors = Object.fromEntries([...layout.match(pattern)[1].matchAll(/--cp-([\w-]+):\s*(#[a-f\d]{6});/gi)].map(match => [match[1], match[2]]));
    for (const background of ['bg', 'bg-elevated', 'surface', 'surface-soft']) {
      assert.ok(!['#ffffff', '#000000'].includes(colors[background]));
      for (const foreground of ['text', 'text-muted', 'text-soft', 'accent']) {
        const ratio = contrast(colors[foreground], colors[background]);
        assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
      }
    }
    assert.ok(contrast(colors['accent-fg'], colors.accent) >= 4.5);
    assert.ok(contrast(colors['accent-fg'], colors['accent-hover']) >= 4.5);
    assert.ok(contrast(colors['border-strong'], colors.surface) >= 3, 'Control boundaries remain distinct');
    if (theme === 'light') assert.equal(colors.accent, '#005a9e', 'Use the darker Microsoft blue accent');
  });
}
test('every tool has a local static SVG and the original MIT attribution', () => {
  const taxonomy = parse(readFileSync(new URL('../taxonomy/taxonomy.yml', import.meta.url), 'utf8'));
  for (const tool of Object.keys(taxonomy.surface)) {
    const path = toolIconUrl('/', tool);
    const svg = readFileSync(new URL(`../public${path}`, import.meta.url), 'utf8');
    assert.match(svg, /<svg\b/);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|\bon\w+=|(?:href|src)=/i);
  }
  const license = readFileSync(new URL('../public/approved/icons/LICENSE.txt', import.meta.url), 'utf8');
  assert.match(license, /Copyright \(c\) 2020 Microsoft Corporation/);
  assert.match(license, /Permission is hereby granted/);
  assert.equal(toolIconUrl('/library/', '../../unsafe'), '/library/approved/icons/document_text.svg');
});

test('branded app icons use local full-colour Brand Central assets without changing generic tool icons', () => {
  for (const app of ['word', 'excel', 'powerpoint', 'outlook', 'teams', 'copilot-chat', 'cowork']) {
    const path = appIconUrl('/', app);
    assert.match(path, /^\/approved\/app-icons\/[a-z]+\.svg$/);
    const svg = readFileSync(new URL(`../public${path}`, import.meta.url), 'utf8');
    assert.match(svg, /<svg\b/);
    assert.match(svg, /Gradient|fill="#/);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|\bon\w+=|(?:href|src)=["'](?:https?:|data:)/i);
  }
  assert.equal(appIconUrl('/library/', 'word'), '/library/approved/app-icons/word.svg');
  assert.equal(appIconUrl('/', 'cowork'), appIconUrl('/', 'copilot-chat'));
  assert.equal(appIconUrl('/', 'agent'), null);
  assert.equal(appIconUrl('/', 'scout'), null);
  assert.equal(appIconUrl('/', '../../unsafe'), null);
  const source = readFileSync(new URL('../public/approved/app-icons/SOURCE.txt', import.meta.url), 'utf8');
  assert.match(source, /Microsoft Brand Central/);
  assert.match(source, /not MIT-licensed/);
});
