// Authoring syntax for scenario files:
//
//   :::prompt              one prompt in three languages; the site toggle picks one
//   EN: ...
//   ID: ...
//   BM: ...
//   :::
//
//   :::presenter           collapsed "Running this as a session" block
//   any markdown
//   :::
//
//   ::::tier{key="basic"}  one way of doing the routine (frontmatter tiers); may contain :::prompt
//   any markdown
//   ::::
import { visit, SKIP } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const TAX = parse(readFileSync(join(process.cwd(), 'taxonomy', 'taxonomy.yml'), 'utf8'));
const lbl = (facet, v) => TAX[facet]?.[String(v)]?.en ?? String(v);

const LANGS = [['EN', 'en'], ['ID', 'id'], ['BM', 'ms']];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inputs, Data and controls, Know the limits: rendered from frontmatter so they can't drift from the tags.
function metaNodes(fm) {
  const rows = fm.inputs.map((i) => `<tr><td>${esc(i.name)}</td><td>${esc(i.format)}</td><td>${esc(i.where)}</td><td>${esc(i.count ?? '')}</td></tr>`).join('');
  const d = fm.data ?? {};
  const pii = d.customer_pii ? "Yes. Minimise it and remove identifiers you don't need." : 'No';
  const ctrl = [`<strong>Sensitivity:</strong> ${esc(d.sensitivity)}`, `<strong>Personal data:</strong> ${pii}`,
    `<strong>Approval before use:</strong> ${esc(d.signoff)}`, 'Use Copilot signed in with your work account. Never paste this content into consumer AI tools.'];
  const li = (a) => a.map((x) => `<li>${x}</li>`).join('');
  return [
    { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Inputs' }] },
    { type: 'html', value: `<table><thead><tr><th>File</th><th>Format</th><th>Where it lives</th><th>Count</th></tr></thead><tbody>${rows}</tbody></table>` },
    { type: 'html', value: `<div class="callout warn"><strong>Data and controls</strong><ul>${li(ctrl)}</ul></div>` },
    { type: 'html', value: `<div class="callout info"><strong>Know the limits</strong><ul>${li((fm.limits ?? []).map(esc))}</ul></div>` },
  ];
}

// "Pick your tier" comparison, rendered from frontmatter so it can't drift from the tier blocks.
function tierTable(tiers) {
  const rows = tiers.map((t) => `<tr data-tier="${esc(t.key)}"><td><a href="#tier-${esc(t.key)}">${esc(lbl('tier', t.key))}</a></td>` +
    `<td>${esc(lbl('difficulty', t.difficulty))}</td><td>${esc(t.runs)}</td><td>${esc(t.effort)}</td></tr>`).join('');
  return { type: 'html', value: `<table class="tier-table"><thead><tr><th>Tier</th><th>Level</th><th>How it runs</th><th>Your time</th></tr></thead><tbody>${rows}</tbody></table>` };
}

export default function remarkScenario() {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter;
    if (fm?.inputs) {
      const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Steps');
      if (at < 0) file.fail('Scenario must have a "## Steps" section', tree);
      tree.children.splice(at, 0, ...metaNodes(fm));
      if (fm.tiers) tree.children.splice(at + 5, 0, tierTable(fm.tiers));
    }
    visit(tree, (node, index, parent) => {
      if (node.type === 'containerDirective' && node.name === 'prompt') {
        const lines = toString(node, { includeHtml: false }).split(/\r?\n/);
        const byLang = {};
        let cur = null;
        for (const line of lines) {
          const m = line.match(/^(EN|ID|BM):\s*(.*)$/);
          if (m) { cur = m[1]; byLang[cur] = m[2]; } else if (cur && line.trim()) byLang[cur] += ' ' + line.trim();
        }
        const missing = LANGS.filter(([k]) => !byLang[k]).map(([k]) => k);
        if (missing.length) file.fail(`:::prompt is missing ${missing.join(', ')}`, node);
        const inner = LANGS.map(([k, code]) =>
          `<div class="prompt" data-lang="${code}"><span class="lang">${k}</span><p>${esc(byLang[k])}</p>` +
          `<button class="copy" type="button">Copy</button></div>`).join('');
        parent.children[index] = { type: 'html', value: `<div class="prompt-set">${inner}</div>` };
        return SKIP;
      }
      if (node.type === 'containerDirective' && node.name === 'presenter') {
        node.data = { hName: 'details', hProperties: { className: ['presenter'] } };
        node.children.unshift({ type: 'paragraph', data: { hName: 'summary' }, children: [{ type: 'text', value: 'Running this as a session' }] });
        return;
      }
      if (node.type === 'containerDirective' && node.name === 'tier') {
        const key = node.attributes?.key;
        const t = (fm?.tiers ?? []).find((x) => x.key === key);
        if (!t) file.fail(`::::tier{key="${key}"} has no matching entry in frontmatter tiers`, node);
        node.data = { hName: 'section', hProperties: { className: ['tier'], id: `tier-${key}`, dataTier: key } };
        node.children.unshift({ type: 'heading', depth: 3, children: [{ type: 'text', value: lbl('tier', key) }] },
          { type: 'html', value: `<p class="tier-meta">${esc(lbl('difficulty', t.difficulty))} · ${esc(t.runs)} · ${esc(t.effort)}</p>` });
        return;
      }
      if (node.type === 'containerDirective') file.fail(`Unknown block :::${node.name}. Use :::prompt, :::presenter or ::::tier.`, node);
      // remark-directive also parses things like ":30" or "Note:x" as directives; put them back as plain text.
      if (node.type === 'textDirective' || node.type === 'leafDirective') {
        const text = (node.type === 'leafDirective' ? '::' : ':') + node.name + (node.children?.length ? `[${toString(node)}]` : '');
        parent.children[index] = node.type === 'leafDirective'
          ? { type: 'paragraph', children: [{ type: 'text', value: text }] }
          : { type: 'text', value: text };
        return SKIP;
      }
    });
  };
}
