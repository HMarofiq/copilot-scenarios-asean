import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { groundIndex, checkPresenter } from '../stories/lib/presenter.mjs';
import { assertNoHardDates } from '../stories/lib/dates.mjs';

const root = path.resolve('stories');
const load = async (p) => (fs.existsSync(p) ? import(pathToFileURL(p).href) : {});
const episodes = [];
for (const world of fs.readdirSync(root)) {
  const dir = path.join(root, world, 'episodes');
  if (world === 'lib' || !fs.existsSync(dir)) continue;
  for (const ep of fs.readdirSync(dir)) if (fs.existsSync(path.join(dir, ep, 'presenter.mjs'))) episodes.push({ world, ep, dir: path.join(dir, ep) });
}

for (const { world, ep, dir } of episodes) {
  test(`presenter: ${world}/${ep} moments ground in seeded items and carry expected results`, async () => {
    const { PRESENTER } = await load(path.join(dir, 'presenter.mjs'));
    const { INBOX_SPEC = [], HISTORY_SPEC = [] } = await load(path.join(dir, 'spec.mjs'));
    const { INBOX = [] } = await load(path.join(dir, 'inbox.mjs'));
    const { HISTORY = [] } = await load(path.join(dir, 'history.mjs'));
    const { CHATS = [] } = await load(path.join(dir, 'chats.mjs'));
    const { FILES = [] } = await load(path.join(dir, 'files.mjs'));
    const { EVENTS = [] } = await load(path.join(dir, 'calendar.mjs'));
    const { CAST } = await load(path.join(root, world, 'cast.mjs'));
    const subj = (texts) => (s) => ({ id: s.id, subject: texts.find((t) => t.id === s.id)?.subject });
    const idx = groundIndex({ inbox: INBOX_SPEC.map(subj(INBOX)), history: HISTORY_SPEC.map(subj(HISTORY)), chats: CHATS, files: FILES, events: EVENTS });
    const problems = checkPresenter(PRESENTER, idx);
    assert.deepEqual(problems, [], problems.join('\n'));
    assert.ok(CAST[PRESENTER.seat], `seat "${PRESENTER.seat}" is not in the cast`);
    assertNoHardDates(JSON.stringify(PRESENTER), `${ep}/presenter.mjs`);
  });
}

test('presenter: the checker catches unknown grounds, surfaces and thin answer keys', () => {
  const idx = groundIndex({ inbox: [{ id: 'A1', subject: 's' }] });
  const P = { moments: [{ id: 'X', surface: 'Fax', prompt: 'p', expect: ['one'], grounds: ['A1', 'Z9'] }, { id: 'X', surface: 'Outlook', prompt: '', expect: [], grounds: [] }] };
  const out = checkPresenter(P, idx).join('\n');
  for (const re of [/unknown surface "Fax"/, /at least 2 expected/, /"Z9" is not a seeded item/, /X: duplicate id/, /missing prompt/, /grounds nothing/]) assert.match(out, re);
});
