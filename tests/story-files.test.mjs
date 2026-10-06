import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { checkEpisodeFiles } from '../stories/lib/check-files.mjs';

const root = path.resolve('stories');
const load = async (p) => (fs.existsSync(p) ? import(pathToFileURL(p).href) : {});

const episodes = [];
for (const world of fs.readdirSync(root)) {
  const dir = path.join(root, world, 'episodes');
  if (world === 'lib' || !fs.existsSync(dir)) continue;
  for (const ep of fs.readdirSync(dir)) episodes.push({ world, ep, dir: path.join(dir, ep) });
}

test('story files: at least one episode is discovered', () => assert.ok(episodes.length > 0));

for (const { world, ep, dir } of episodes) {
  test(`story files: ${world}/${ep} matches its spec (counts, names, owners, tags)`, async () => {
    const { EPISODE } = await load(path.join(dir, 'spec.mjs'));
    const { FILES = [] } = await load(path.join(dir, 'files.mjs'));
    const { CAST } = await load(path.join(root, world, 'cast.mjs'));
    const { INBOX = [] } = await load(path.join(dir, 'inbox.mjs'));
    const { HISTORY = [] } = await load(path.join(dir, 'history.mjs'));
    const problems = checkEpisodeFiles({ episode: EPISODE, files: FILES, cast: CAST, mails: [...INBOX, ...HISTORY] });
    assert.deepEqual(problems, [], problems.join('\n'));
  });
}

test('story files: the checker catches wrong counts, extensions, duplicates and unknown owners', () => {
  const cast = { a: {}, b: {} };
  const episode = { tag: 'T', files: { xlsx: 1, docx: 1 } };
  const ok = { tags: 'T; FICTIONAL DEMO DATA', title: 't', owner: 'a', sharedWith: ['b'] };
  const files = [
    { ...ok, key: 'x1', name: 'Plan.xlsx', kind: 'xlsx', sheets: [{ name: 'S', rows: [{}] }] },
    { ...ok, key: 'x2', name: 'plan.XLSX', kind: 'xlsx', sheets: [{ name: 'S', rows: [{}] }] },
    { ...ok, key: 'd1', name: 'Memo.doc', kind: 'docx', blocks: ['x'], owner: 'z' },
    { ...ok, key: 'p1', name: 'Deck.pptx', kind: 'pptx', blocks: ['x'] }
  ];
  const problems = checkEpisodeFiles({ episode, files, cast, mails: [{ id: 'M1', attachments: [{ name: 'a.pdf', kind: 'docx' }] }] }).join('\n');
  for (const re of [/count xlsx: spec says 1, files.mjs has 2/, /count pptx: spec says 0/, /duplicates x1/, /does not end in \.docx/,
    /owner "z" is not in the cast/, /kind "pptx" is not rendered/, /M1\/a\.pdf: attachment name/]) assert.match(problems, re);
});
