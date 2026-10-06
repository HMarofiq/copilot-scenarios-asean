// File-count and file-shape checker for story episodes (idea borrowed from DemoIQ's Office
// multi-file contract). Pure function: returns a list of problems, empty when the episode is clean.
// Expected counts live in the episode spec: EPISODE.files = { docx: 1, xlsx: 3, pdf: 0, pptx: 0 }.

export const SUPPORTED_KINDS = ['docx', 'xlsx', 'pdf']; // what compile-ops.mjs can render today
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
    } else if (!f.blocks?.length) p(`${id}: document has no blocks`);
  }

  // 3. Mail attachments: right extension, supported kind, and not silently clashing with a OneDrive file.
  for (const m of mails) {
    for (const a of m.attachments ?? []) {
      const id = `${m.id}/${a.name}`;
      if (!SUPPORTED_KINDS.includes(a.kind)) p(`${id}: attachment kind "${a.kind}" is not rendered by compile-ops`);
      if (ext(a.name) !== a.kind) p(`${id}: attachment name does not end in .${a.kind}`);
    }
  }
  return problems;
}

export function fileSummary(files = []) {
  const c = countKinds(files);
  return ALL_KINDS.filter(k => c[k]).map(k => `${c[k]} ${k}`).join(', ') || 'no files';
}
