// File-count and file-shape checker for story episodes (idea borrowed from DemoIQ's Office
// multi-file contract). Pure function: returns a list of problems, empty when the episode is clean.
// Expected counts live in the episode spec: EPISODE.files = { docx: 1, xlsx: 3, pdf: 0, pptx: 0 }.

import { LIMITS, LAYOUTS, inferLayout } from '../../kits/pptx.mjs';

export const SUPPORTED_KINDS = ['docx', 'xlsx', 'pdf', 'pptx']; // what compile-ops.mjs can render today
const ALL_KINDS = ['docx', 'xlsx', 'pptx', 'pdf'];
const BAD_NAME = /[\\/:*?"<>|#%]|^\s|\s$|\.$/;

const countKinds = (files) => Object.fromEntries(ALL_KINDS.map(k => [k, files.filter(f => f.kind === k).length]));

export function checkEpisodeFiles({ episode, files = [], cast = {}, mails = [] }) {
  const problems = [];
  const p = (m) => problems.push(m);
  const ext = (n) => (n.match(/\.([a-z0-9]+)$/i)?.[1] ?? '').toLowerCase();

  // 1. Exact counts per kind against the spec.
  if (episode.files) {
    const got = countKinds(files);
    for (const k of new Set([...Object.keys(episode.files), ...ALL_KINDS])) {
      const want = episode.files[k] ?? 0;
      if (got[k] !== want) p(`count ${k}: spec says ${want}, files.mjs has ${got[k] ?? 0}`);
    }
  } else if (files.length) p('EPISODE.files (expected counts per kind) is missing from spec.mjs');

  // 2. Per-file shape.
  const keys = new Set();
  const names = new Map(); // lower-case name -> key (OneDrive is case-insensitive)
  for (const f of files) {
    const id = f.key ?? f.name ?? '(no key)';
    if (!f.key) p(`${id}: missing key`);
    else if (keys.has(f.key)) p(`${id}: duplicate key`);
    keys.add(f.key);
    if (!f.name) { p(`${id}: missing name`); continue; }
    if (BAD_NAME.test(f.name)) p(`${id}: name "${f.name}" has characters OneDrive rejects`);
    if (!SUPPORTED_KINDS.includes(f.kind)) p(`${id}: kind "${f.kind}" is not rendered by compile-ops (supported: ${SUPPORTED_KINDS.join(', ')})`);
    if (ext(f.name) !== f.kind) p(`${id}: name "${f.name}" does not end in .${f.kind}`);
    const lower = f.name.toLowerCase();
    if (names.has(lower)) p(`${id}: name "${f.name}" duplicates ${names.get(lower)}`);
    names.set(lower, id);
    if (!cast[f.owner]) p(`${id}: owner "${f.owner}" is not in the cast`);
    for (const s of f.sharedWith ?? []) {
      if (!cast[s]) p(`${id}: sharedWith "${s}" is not in the cast`);
      if (s === f.owner) p(`${id}: shared with its own owner`);
    }
    if (episode.tag && f.tags !== `${episode.tag}; FICTIONAL DEMO DATA`) p(`${id}: tags must be "${episode.tag}; FICTIONAL DEMO DATA"`);
    if (!f.title) p(`${id}: missing title`);
    if (f.kind === 'xlsx') {
      if (!f.sheets?.length) p(`${id}: workbook has no sheets`);
      for (const s of f.sheets ?? []) if (!s.rows?.length) p(`${id}: sheet "${s.name}" has no rows`);
    } else if (f.kind === 'pptx') checkSlides(id, f, p);
    else if (!f.blocks?.length) p(`${id}: document has no blocks`);
  }

  // 3. Mail attachments: right extension, supported kind, and not silently clashing with a OneDrive file.
  for (const m of mails) {
    for (const a of m.attachments ?? []) {
      const id = `${m.id}/${a.name}`;
      if (!SUPPORTED_KINDS.includes(a.kind)) p(`${id}: attachment kind "${a.kind}" is not rendered by compile-ops`);
      if (ext(a.name) !== a.kind) p(`${id}: attachment name does not end in .${a.kind}`);
      if (a.kind === 'pptx') checkSlides(id, a, p);
    }
  }
  return problems;
}

// Slide limits keep generated decks readable: pptxgenjs does not shrink text to fit.
function checkSlides(id, f, p) {
  if (!f.slides?.length) { p(`${id}: deck has no slides`); return; }
  f.slides.forEach((s, i) => {
    const sid = `${id} slide ${i + 1}`;
    if (!s.title) { p(`${sid}: missing title`); return; }
    if (s.title.length > LIMITS.titleChars) p(`${sid}: title is ${s.title.length} characters (max ${LIMITS.titleChars})`);
    const layout = inferLayout(s, i);
    if (!LAYOUTS.includes(layout)) p(`${sid}: unknown layout "${layout}"`);
    const long = (list, what) => {
      if (list.length > (what === 'column' ? LIMITS.columnBullets : LIMITS.bullets)) p(`${sid}: ${list.length} bullets in ${what} (max ${what === 'column' ? LIMITS.columnBullets : LIMITS.bullets})`);
      for (const b of list) if ((typeof b === 'string' ? b : b.text).length > LIMITS.bulletChars) p(`${sid}: a bullet is longer than ${LIMITS.bulletChars} characters`);
    };
    if (layout === 'bullets' && !s.bullets?.length) p(`${sid}: bullets layout without bullets`);
    if (s.bullets) long(s.bullets, 'bullets');
    for (const side of ['left', 'right']) if (s[side]) long(s[side].bullets ?? [], 'column');
    if (layout === 'two' && !(s.left || s.right)) p(`${sid}: two-column layout without left or right`);
    if (layout === 'metrics') {
      if (!s.metrics?.length || s.metrics.length > LIMITS.metrics) p(`${sid}: metrics needs 1 to ${LIMITS.metrics} cards`);
      for (const m of s.metrics ?? []) if (m.value === undefined || !m.label) p(`${sid}: every metric needs a value and a label`);
    }
    if (layout === 'table' || s.table) {
      const t = s.table ?? [];
      if (t.length < 2) p(`${sid}: table needs a header row and at least one row`);
      if (t.length > LIMITS.tableRows + 1) p(`${sid}: table has ${t.length - 1} rows (max ${LIMITS.tableRows})`);
      const cols = t[0]?.length ?? 0;
      if (cols > LIMITS.tableCols) p(`${sid}: table has ${cols} columns (max ${LIMITS.tableCols})`);
      if (t.some((r) => r.length !== cols)) p(`${sid}: table rows have different column counts`);
    }
  });
}

export function fileSummary(files = []) {
  const c = countKinds(files);
  return ALL_KINDS.filter(k => c[k]).map(k => `${c[k]} ${k}`).join(', ') || 'no files';
}
