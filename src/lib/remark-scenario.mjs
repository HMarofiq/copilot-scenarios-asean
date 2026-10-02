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
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { toolIconUrl } from './tool-icons.mjs';
import { appIconUrl } from './app-icons.mjs';
import { formatKitTree } from './kit-tree.mjs';

const TAX = parse(readFileSync(join(process.cwd(), 'taxonomy', 'taxonomy.yml'), 'utf8'));
const lbl = (facet, v) => TAX[facet]?.[String(v)]?.en ?? String(v);

const LANGS = [['EN', 'en'], ['ID', 'id'], ['BM', 'ms']];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inputParts = (name) => {
  const match = name.match(/^(.*?)(?::\s+|\s+\()(.*?)\)?$/);
  return match ? [match[1], match[2]] : [name, ''];
};

function kitFolderLayout(fm) {
  if (fm.demo_kit === false || !fm.id || !existsSync(join(process.cwd(), 'public', 'kits', `${fm.id}.zip`))) return [];
  const path = join(process.cwd(), 'public', 'kits', `${fm.id}.manifest.json`);
  if (!existsSync(path)) throw new Error(`Missing demo kit manifest for ${fm.id}. Run npm run kits first.`);
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  const descriptions = new Map();
  for (const input of fm.inputs) {
    for (const name of input.kit ?? []) descriptions.set(name, inputParts(input.name)[0]);
  }
  if (manifest.entries.includes('README.txt')) descriptions.set('README.txt', 'Setup notes and answer key');
  const tree = formatKitTree(manifest, descriptions);
  const count = manifest.entries.filter((entry) => !entry.endsWith('/')).length;
  return [
    { type: 'heading', depth: 4, data: { hProperties: { className: ['kit-tree-heading'] } }, children: [{ type: 'text', value: 'Demo kit folder layout' }] },
    { type: 'html', value: `<p class="kit-tree-note">After extracting <code>${esc(fm.id)}.zip</code>, check all ${count} files against this list.</p>` +
      `<pre class="kit-tree" tabindex="0" role="region" aria-label="Demo kit folder structure"><code>${esc(tree)}</code></pre>` },
  ];
}

// "Before you start": what you need, data rules, files, heads-up. Rendered from frontmatter so it can't drift from the tags.
function beforeYouStart(fm, base) {
  const d = fm.data ?? {};
  const pii = d.customer_pii ? "Yes. Remove identifiers you don't need." : 'No';
  const icon = (x) => {
    const app = appIconUrl(base, x);
    return app ? `<img class="app-icon" src="${app}" alt="" width="24" height="24">` :
      `<span class="tool-icon" aria-hidden="true" style="--tool-icon: url('${toolIconUrl(base, x)}')"></span>`;
  };
  const row = (k, v) => `<div class="need"><dt>${k}</dt><dd>${v}</dd></div>`;
  const requirements = (licence, surface, extra, time) => '<dl>' +
    row('Licence', licence.map((x) => `<span class="chip lic">${esc(lbl('licence', x))}</span>`).join('')) +
    row('Apps', surface.map((x) => `<span class="chip tool-chip">${icon(x)}${esc(lbl('surface', x))}</span>`).join('')) +
    (extra?.length ? row('Also', extra.map((n) => `<span class="also">${esc(n)}</span>`).join('')) : '') +
    (time ? row('Time', esc(time)) : '') + '</dl>';
  const needs = '<div class="needs"><div class="needs-k">What you need to run this</div>' +
    (fm.tiers ? fm.tiers.map((t, i) => `<div data-tier-content="${esc(t.key)}"${i ? ' hidden' : ''}>` +
      requirements([t.licence], t.surface, t.needs ?? fm.needs, t.effort) + '</div>').join('') :
      requirements(fm.licence, fm.surface, fm.needs, fm.run_time)) + '</div>';
  const rules = '<div class="callout warn rules"><strong class="rules-k">Data rules: read before you paste anything</strong>' +
    `<p><strong>Sensitivity:</strong> ${esc(d.sensitivity)}</p>` +
    `<p><strong>Personal data:</strong> ${pii}</p>` +
    `<p><strong>Approval before use:</strong> ${esc(d.signoff)}</p>` +
    "<p>Use Copilot signed in with your work account, in your organisation's Microsoft 365 tenant. Never paste this content into consumer AI tools.</p></div>";
  const files = '<ul class="files">' + fm.inputs.map((i) => {
    const [title, detail] = inputParts(i.name);
    const extra = [detail && esc(detail), i.kit?.length && `Kit: ${i.kit.map((k) => `<code>${esc(k)}</code>`).join(', ')}`,
      i.steps?.length && `used in <a href="#step-${i.steps[0]}">step${i.steps.length > 1 ? 's' : ''} ${i.steps.join(', ')}</a>`].filter(Boolean).join(' · ');
    return `<li><strong>${esc(title)}</strong> <span class="fmeta">${i.count ? `×${esc(i.count)} · ` : ''}${esc(i.format)} · ${esc(i.where)}</span>` +
      (extra ? `<small>${extra}</small>` : '') + '</li>';
  }).join('') + '</ul>';
  // Heads-up: the first sentence of each limit is its point, so it leads in bold.
  const heads = '<ul class="headsup">' + (fm.limits ?? []).map((l) => {
    const m = l.match(/^(.+?[.!?])\s+(.*)$/);
    return `<li>${m ? `<strong>${esc(m[1])}</strong> ${esc(m[2])}` : esc(l)}</li>`;
  }).join('') + '</ul>';
  const h = (depth, text, id) => ({ type: 'heading', depth, data: id ? { hProperties: { id } } : undefined, children: [{ type: 'text', value: text }] });
  return [
    h(2, 'Before you start', 'before-you-start'),
    { type: 'html', value: `<div class="start-grid">${needs}${rules}</div>` },
    h(3, fm.demo_kit === false ? 'Your inputs' : 'Files'),
    { type: 'html', value: files },
    ...kitFolderLayout(fm),
    h(3, 'Heads-up'),
    { type: 'html', value: heads },
  ];
}

// "When it goes wrong": each fix gets an anchor, and a trailing "(step N)" becomes a tag
// plus a "Trouble with this step?" link inside that step's card.
function markFixes(list, prefix = '') {
  const fixes = {};
  if (!list) return fixes;
  list.data = { ...list.data, hProperties: { className: ['fixes'] } };
  list.children.forEach((li, k) => {
    const id = `fix-${prefix}${k + 1}`;
    li.data = { ...li.data, hProperties: { id } };
    const para = li.children?.[0];
    if (para?.type !== 'paragraph') return;
    const last = para.children[para.children.length - 1];
    const m = last?.type === 'text' && last.value.match(/\s*\((steps?)\s+([\d,\sand]+)\)\s*$/i);
    if (!m) return;
    last.value = last.value.slice(0, m.index);
    const nums = m[2].match(/\d+/g).map(Number);
    const symptom = para.children[0]?.type === 'strong' ? toString(para.children[0]).trim().replace(/[.:]$/, '') : '';
    para.children.splice(para.children[0]?.type === 'strong' ? 1 : 0, 0,
      { type: 'html', value: ` <span class="steptag">step ${nums.join(', ')}</span> ` });
    for (const n of nums) (fixes[n] ??= []).push({ id, symptom });
  });
  return fixes;
}
function collectFixes(tree) {
  const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'When it goes wrong');
  let list = null;
  for (let i = at + 1; at >= 0 && i < tree.children.length; i++) {
    const n = tree.children[i];
    if (n.type === 'heading' && n.depth <= 2) break;
    if (n.type === 'list') { list = n; break; }
  }
  return markFixes(list);
}

// "Check it" is the answer key: render it as a checklist the reader ticks off.
function markChecklist(list) {
  if (list?.type !== 'list') return;
  list.data = { ...list.data, hProperties: { className: ['checklist'] } };
  for (const li of list.children) {
    const para = li.children?.[0];
    if (para?.type === 'paragraph') para.children.unshift({ type: 'html', value: '<input type="checkbox" class="chk" aria-label="Checked">' });
  }
}
function checklist(tree) {
  const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Check it');
  markChecklist(at >= 0 ? tree.children[at + 1] : null);
}
// Workflow buttons are generated from frontmatter and control steps, checks and fixes.
function tierSelector(tiers, sections) {
  const buttons = tiers.map((t, i) => {
    const ids = [...sections.get(t.key)].map((section) => section === 'steps' ? `tier-${t.key}` : `tier-${t.key}-${section}`).join(' ');
    return `<button type="button" role="tab" id="tier-tab-${esc(t.key)}" data-select-tier="${esc(t.key)}" aria-selected="${!i}" tabindex="${i ? -1 : 0}" aria-controls="${esc(ids)}">` +
      `<strong>${esc(t.title ?? lbl('tier', t.key))}</strong><span>${esc(t.runs)}</span><small>${esc(t.effort)}</small></button>`;
  }).join('');
  return html(`<div class="tier-selector" role="tablist" aria-label="Choose how to organise your inbox">${buttons}</div>` +
    '<noscript><p>Enable JavaScript to switch workflows. The first workflow is shown below.</p></noscript>');
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

const el = (hName, className, children, extra = {}) => ({ type: 'scenarioBlock', data: { hName, hProperties: { className, ...extra } }, children });
const html = (value) => ({ type: 'html', value });
const firstSentence = (nodes) => { const s = nodes ? nodes.map((n) => toString(n)).join('').trim() : ''; const m = s.match(/^(.+?[.!?])(\s|$)/); return m ? m[1] : s; };

function wrapSteps(children, fixes = {}, prefix = '') {
  const out = [];
  const parts = [];
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
      const id = `part-${prefix}${part[1].split(/\s+/)[1].toLowerCase()}`;
      const [, name, mins] = part[2].replace(/\.\s*$/, '').match(/^(.*?)\s*(?:\((about [^)]+)\))?$/) ?? [null, part[2], null];
      const title = `${part[1]}: ${name}${mins ? ` · ${mins.replace(/minutes?/, 'min')}` : ''}`;
      parts.push({ id, label: part[1], name, mins, note: firstSentence(note), steps: [], at: out.length });
      out.push({ type: 'heading', depth: 3, data: { hProperties: { className: ['part'], id } }, children: [{ type: 'text', value: title }] });
      if (note) out.push(el('p', ['part-note'], note));
      i += 1;
      continue;
    }

    if (step) {
      found = true;
      const n = Number(step[1]);
      parts.at(-1)?.steps.push(n);
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
        if (next.type === 'paragraph' && /^after you (run|attach)/i.test(toString(next).trim())) {
          next.data = { ...next.data, hProperties: { ...next.data?.hProperties, className: ['after-run'] } };
        }
        body.push(next);
        i += 1;
      }
      const trouble = fixes[n]?.length
        ? [html(`<p class="trouble">Trouble with this step? ${fixes[n].map((f) => `<a href="#${f.id}">${esc(f.symptom)}</a>`).join(' · ')}</p>`)]
        : [];
      out.push(el('section', ['stepcard'], [
        el('div', ['stephead'], [
          el('span', ['num'], [{ type: 'text', value: step[1] }]),
          { type: 'heading', depth: 4, children: [{ type: 'text', value: step[2].replace(/\.\s*$/, '') }] },
          html(`<button type="button" class="done" data-step="${prefix}${n}" aria-pressed="false">Done</button>`),
        ]),
        ...body,
        ...trouble,
      ], { id: `step-${prefix}${n}` }));
      continue;
    }

    out.push(node);
    i += 1;
  }
  // Two or more parts: let the reader choose a route before the first part starts.
  if (parts.length > 1) {
    const range = (s) => (s.length > 1 ? `steps ${s[0]} to ${s.at(-1)}` : s.length ? `step ${s[0]}` : '');
    const cards = parts.map((p) => `<a class="route" href="#${p.id}"><strong>${esc(p.label)}${p.mins ? ` · ${esc(p.mins)}` : ''}</strong>` +
      `<span>${esc(p.name.charAt(0).toUpperCase() + p.name.slice(1))}. ${esc(p.note)}</span><em>${range(p.steps)} &darr;</em></a>`).join('');
    out.splice(parts[0].at, 0, { type: 'heading', depth: 3, data: { hProperties: { id: 'choose-your-route' } }, children: [{ type: 'text', value: 'Choose your route' }] },
      html(`<div class="routes">${cards}</div>`));
  }
  return found ? out : children;
}
export default function remarkScenario({ base = '/' } = {}) {
  return (tree, file) => {
    const fm = file.data?.astro?.frontmatter;
    const tierSections = new Map();
    const tierFixes = new Map();
    let currentSection = '';
    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === 2) currentSection = toString(node).trim();
      if (node.type !== 'containerDirective' || node.name !== 'tier') continue;
      const key = node.attributes?.key;
      if (!fm?.tiers?.some((t) => t.key === key)) file.fail(`Unknown workflow ${key}`, node);
      const section = node.attributes?.section ?? 'steps';
      const expected = { steps: 'Steps', checks: 'Check it', fixes: 'When it goes wrong' }[section];
      if (!expected || currentSection !== expected) file.fail(`Workflow ${key} section ${section} must sit under ${expected ?? 'a supported section'}`, node);
      const sections = tierSections.get(key) ?? new Set();
      if (sections.has(section)) file.fail(`Duplicate workflow ${key} section ${section}`, node);
      sections.add(section);
      tierSections.set(key, sections);
      if (section === 'fixes') tierFixes.set(key, markFixes(node.children.find((n) => n.type === 'list'), `${key}-`));
      if (section === 'checks') markChecklist(node.children.find((n) => n.type === 'list'));
    }
    for (const tier of fm?.tiers ?? []) {
      if (!tierSections.get(tier.key)?.has('steps')) file.fail(`Workflow ${tier.key} needs a Steps block`, tree);
    }
    if (fm?.inputs) {
      const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Steps');
      if (at < 0) file.fail('Scenario must have a "## Steps" section', tree);
      const meta = beforeYouStart(fm, base);
      tree.children.splice(at, 0, ...meta);
      if (fm.tiers) tree.children.splice(at + meta.length + 1, 0, tierSelector(fm.tiers, tierSections));
      // Situation opens with the objective: the end goal first, then the story.
      const sit = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Situation');
      if (sit >= 0) {
        tree.children[sit].children = [{ type: 'text', value: 'Objective and situation' }];
        tree.children[sit].data = { hProperties: { id: 'situation' } };
        tree.children.splice(sit + 1, 0, html(`<div class="objective"><div class="objective-k">Objective</div><p>${esc(fm.objective ?? fm.card.output)}</p></div>`));
      }
    }
    const fixes = collectFixes(tree);
    checklist(tree);
    // Structure the Steps section only: everything from "## Steps" to the next H2.
    const stepsAt = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Steps');
    if (stepsAt >= 0) {
      let end = tree.children.findIndex((n, i) => i > stepsAt && n.type === 'heading' && n.depth === 2);
      if (end < 0) end = tree.children.length;
      tree.children.splice(stepsAt + 1, end - stepsAt - 1, ...wrapSteps(tree.children.slice(stepsAt + 1, end), fixes));
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
        const caption = about ? `<p class="pabout">About: ${esc(about.charAt(0).toLowerCase() + about.slice(1))}</p>` : '';
        const inner = LANGS.map(([k, code]) => {
          const lines = byLang[k];
          // One authored line stays a paragraph; several become a scannable list. Both scroll inside the card.
          const body = lines.length > 1
            ? `<ul class="plines" tabindex="0" role="group" aria-label="Prompt text in ${k}, ${lines.length} instructions. Scrollable.">` +
              lines.map((l) => `<li>${esc(l)}</li>`).join('') + '</ul>'
            : `<p class="ptext" tabindex="0" aria-label="Prompt text in ${k}. Scrollable.">${esc(lines[0])}</p>`;
          return `<div class="prompt" data-lang="${code}">` +
            `<div class="phead"><span class="plabel">Prompt</span>` +
            `<button class="copy" type="button">Copy prompt</button></div>${caption}${body}</div>`;
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
        const section = node.attributes?.section ?? 'steps';
        const id = section === 'steps' ? `tier-${key}` : `tier-${key}-${section}`;
        node.data = { hName: 'section', hProperties: {
          className: ['tier'], id, dataTierContent: key, dataTierSection: section,
          role: 'tabpanel', ariaLabelledBy: `tier-tab-${key}`, hidden: fm.tiers[0].key !== key,
        } };
        if (section === 'steps') {
          node.children = wrapSteps(node.children, tierFixes.get(key) ?? fixes, `${key}-`);
          node.children.unshift({ type: 'heading', depth: 3, data: { hProperties: { id: `workflow-${key}` } }, children: [{ type: 'text', value: t.title ?? lbl('tier', key) }] });
        }
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
