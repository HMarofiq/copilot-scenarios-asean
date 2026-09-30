// Authoring syntax for scenario files:
//
//   :::prompt              one prompt in three languages; the site toggle picks one
//   ABOUT: ...            optional one-line caption, shown above every language
//   EN: ...
//   ID: ...
//   BM: ...
//   :::
//
//   A prompt written as one line stays one paragraph. Write one instruction per
//   line and it renders as a scannable, scrollable list instead; the copy button
//   always copies exactly what is on screen.
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

// --- Steps: turn the "**N. Title.**" authoring convention into real structure ---
// Readers get a heading per step and a card to work inside; nothing in the
// markdown has to change. Scenarios that don't use the convention are untouched.
const STEP_RE = /^(\d+)[.)]\s*(.+)$/;
const PART_RE = /^(Part\s+[A-Z0-9]+)\s*[:.]\s*(.*)$/i;

// The bold run that opens a paragraph, e.g. "2. Build the variance sheet in Excel."
function lead(node) {
  if (node?.type !== 'paragraph') return null;
  const first = node.children?.[0];
  if (first?.type !== 'strong') return null;
  return toString(first).trim().replace(/\s+/g, ' ').replace(/\\/g, '');
}

// Everything after the bold lead, with the joining space removed.
function tail(node) {
  const rest = node.children.slice(1).map((c) => ({ ...c }));
  if (rest[0]?.type === 'text') rest[0].value = rest[0].value.replace(/^\s+/, '');
  return rest.some((c) => toString(c).trim()) ? rest : null;
}

const el = (hName, className, children) => ({ type: 'scenarioBlock', data: { hName, hProperties: { className } }, children });

function wrapSteps(children) {
  const out = [];
  let found = false;
  let i = 0;
  while (i < children.length) {
    const node = children[i];
    const text = lead(node);
    const part = text && text.match(PART_RE);
    const step = text && !part && text.match(STEP_RE);

    if (part) {
      found = true;
      const note = tail(node);
      out.push({ type: 'heading', depth: 3, data: { hProperties: { className: ['part'] } },
        children: [{ type: 'text', value: `${part[1]}: ${part[2].replace(/\.\s*$/, '')}` }] });
      if (note) out.push(el('p', ['part-note'], note));
      i += 1;
      continue;
    }

    if (step) {
      found = true;
      const body = [];
      const first = tail(node);
      if (first) body.push(el('p', ['do'], first));
      i += 1;
      // A step owns everything up to the next step, part, heading or tier block.
      while (i < children.length) {
        const next = children[i];
        if (next.type === 'heading') break;
        if (next.type === 'containerDirective' && next.name !== 'prompt') break;
        const nextLead = lead(next);
        if (nextLead && (STEP_RE.test(nextLead) || PART_RE.test(nextLead))) break;
        // "After you run it: ..." is the step's own check; mark it so it can be styled.
        if (next.type === 'paragraph' && /^after you run it\b/i.test(toString(next).trim())) {
          next.data = { ...next.data, hProperties: { ...next.data?.hProperties, className: ['after-run'] } };
        }
        body.push(next);
        i += 1;
      }
      out.push(el('section', ['stepcard'], [
        el('div', ['stephead'], [
          el('span', ['num'], [{ type: 'text', value: step[1] }]),
          { type: 'heading', depth: 4, children: [{ type: 'text', value: step[2].replace(/\.\s*$/, '') }] },
        ]),
        ...body,
      ]));
      continue;
    }

    out.push(node);
    i += 1;
  }
  return found ? out : children;
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
    // Structure the Steps section only: everything from "## Steps" to the next H2.
    const stepsAt = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Steps');
    if (stepsAt >= 0) {
      let end = tree.children.findIndex((n, i) => i > stepsAt && n.type === 'heading' && n.depth === 2);
      if (end < 0) end = tree.children.length;
      tree.children.splice(stepsAt + 1, end - stepsAt - 1, ...wrapSteps(tree.children.slice(stepsAt + 1, end)));
    }
    visit(tree, (node, index, parent) => {
      if (node.type === 'containerDirective' && node.name === 'prompt') {
        const byLang = {};
        let about = '';
        let cur = null;
        for (const line of toString(node, { includeHtml: false }).split(/\r?\n/)) {
          const caption = line.match(/^ABOUT:\s*(.*)$/);
          if (caption) { cur = 'ABOUT'; about = caption[1].trim(); continue; }
          const marker = line.match(/^(EN|ID|BM):\s*(.*)$/);
          if (marker) { cur = marker[1]; byLang[cur] = marker[2].trim() ? [marker[2].trim()] : []; continue; }
          if (!line.trim()) continue;
          if (cur === 'ABOUT') about += ' ' + line.trim();
          else if (cur) byLang[cur].push(line.trim());
        }
        const missing = LANGS.filter(([k]) => !byLang[k]?.length).map(([k]) => k);
        if (missing.length) file.fail(`:::prompt is missing ${missing.join(', ')}`, node);
        const caption = about ? `<p class="pabout">${esc(about)}</p>` : '';
        const inner = LANGS.map(([k, code]) => {
          const lines = byLang[k];
          // One authored line stays a paragraph; several become a scannable list.
          const body = lines.length > 1
            ? `<ul class="plines" tabindex="0" role="group" aria-label="Prompt text in ${k}, ${lines.length} instructions. Scrollable.">` +
              lines.map((l) => `<li>${esc(l)}</li>`).join('') + '</ul>'
            : `<p class="ptext">${esc(lines[0])}</p>`;
          const count = lines.length > 1 ? `<span class="plen">${lines.length} lines</span>` : '';
          return `<div class="prompt" data-lang="${code}">` +
            `<div class="phead"><span class="lang">${k}</span>${count}` +
            `<button class="copy" type="button">Copy</button></div>${caption}${body}</div>`;
        }).join('');
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
        node.children = wrapSteps(node.children);
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
