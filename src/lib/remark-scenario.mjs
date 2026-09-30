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
import { toolIconUrl } from './tool-icons.mjs';

const TAX = parse(readFileSync(join(process.cwd(), 'taxonomy', 'taxonomy.yml'), 'utf8'));
const lbl = (facet, v) => TAX[facet]?.[String(v)]?.en ?? String(v);

const LANGS = [['EN', 'en'], ['ID', 'id'], ['BM', 'ms']];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// "Before you start": what you need, data rules, files, heads-up. Rendered from frontmatter so it can't drift from the tags.
function beforeYouStart(fm, base) {
  const d = fm.data ?? {};
  const pii = d.customer_pii ? "Yes. Remove identifiers you don't need." : 'No';
  const icon = (x) => `<span class="tool-icon" aria-hidden="true" style="--tool-icon: url('${toolIconUrl(base, x)}')"></span>`;
  const row = (k, v) => `<div class="need"><dt>${k}</dt><dd>${v}</dd></div>`;
  const needs = '<div class="needs"><div class="needs-k">What you need to run this</div><dl>' +
    row('Licence', fm.licence.map((x) => `<span class="chip lic">${esc(lbl('licence', x))}</span>`).join('')) +
    row('Apps', fm.surface.map((x) => `<span class="chip tool-chip">${icon(x)}${esc(lbl('surface', x))}</span>`).join('')) +
    (fm.needs?.length ? row('Also', fm.needs.map((n) => `<span class="also">${esc(n)}</span>`).join('')) : '') +
    (fm.run_time ? row('Time', esc(fm.run_time)) : '') + '</dl></div>';
  const rules = '<div class="callout warn rules"><strong class="rules-k">Data rules: read before you paste anything</strong>' +
    `<p><strong>Sensitivity:</strong> ${esc(d.sensitivity)} · <strong>Personal data:</strong> ${pii} · <strong>Approval before use:</strong> ${esc(d.signoff)}</p>` +
    "<p>Use Copilot signed in with your work account, in your organisation's Microsoft 365 tenant. Never paste this content into consumer AI tools.</p></div>";
  const files = '<ul class="files">' + fm.inputs.map((i) => {
    const m = i.name.match(/^(.*?)(?::\s+|\s+\()(.*?)\)?$/);
    const [title, detail] = m ? [m[1], m[2]] : [i.name, ''];
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
    h(3, 'Files'),
    { type: 'html', value: files },
    h(3, 'Heads-up'),
    { type: 'html', value: heads },
  ];
}

// "When it goes wrong": each fix gets an anchor, and a trailing "(step N)" becomes a tag
// plus a "Trouble with this step?" link inside that step's card.
function collectFixes(tree) {
  const fixes = {};
  const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'When it goes wrong');
  let list = null;
  for (let i = at + 1; at >= 0 && i < tree.children.length; i++) {
    const n = tree.children[i];
    if (n.type === 'heading' && n.depth <= 2) break;
    if (n.type === 'list') { list = n; break; }
  }
  if (!list) return fixes;
  list.data = { ...list.data, hProperties: { className: ['fixes'] } };
  list.children.forEach((li, k) => {
    const id = `fix-${k + 1}`;
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

// "Check it" is the answer key: render it as a checklist the reader ticks off.
function checklist(tree) {
  const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Check it');
  const list = at >= 0 ? tree.children[at + 1] : null;
  if (list?.type !== 'list') return;
  list.data = { ...list.data, hProperties: { className: ['checklist'] } };
  for (const li of list.children) {
    const para = li.children?.[0];
    if (para?.type === 'paragraph') para.children.unshift({ type: 'html', value: '<input type="checkbox" class="chk" aria-label="Checked">' });
  }
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

const el = (hName, className, children, extra = {}) => ({ type: 'scenarioBlock', data: { hName, hProperties: { className, ...extra } }, children });
const html = (value) => ({ type: 'html', value });
const firstSentence = (nodes) => { const s = nodes ? nodes.map((n) => toString(n)).join('').trim() : ''; const m = s.match(/^(.+?[.!?])(\s|$)/); return m ? m[1] : s; };

function wrapSteps(children, fixes = {}) {
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
      const id = `part-${part[1].split(/\s+/)[1].toLowerCase()}`;
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
          html(`<button type="button" class="done" data-step="${n}" aria-pressed="false">Done</button>`),
        ]),
        ...body,
        ...trouble,
      ], { id: `step-${n}` }));
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
    if (fm?.inputs) {
      const at = tree.children.findIndex((n) => n.type === 'heading' && n.depth === 2 && toString(n).trim() === 'Steps');
      if (at < 0) file.fail('Scenario must have a "## Steps" section', tree);
      const meta = beforeYouStart(fm, base);
      tree.children.splice(at, 0, ...meta);
      if (fm.tiers) tree.children.splice(at + meta.length + 1, 0, tierTable(fm.tiers));
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
        node.data = { hName: 'section', hProperties: { className: ['tier'], id: `tier-${key}`, dataTier: key } };
        node.children = wrapSteps(node.children, fixes);
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
