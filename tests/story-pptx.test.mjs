import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import JSZip from 'jszip';
import { writeDeck } from '../kits/pptx.mjs';
import { checkEpisodeFiles } from '../stories/lib/check-files.mjs';

const slides = [
  { title: 'Q4 re-forecast', subtitle: 'Finance review', kicker: 'Prepared by Babak Shammas', notes: 'Open with the headline number.' },
  { title: 'Where we stand', metrics: [{ value: 'IDR 9.8T', label: 'Revenue run rate', note: 'Full year' }, { value: '94%', label: 'On-time delivery' }], bullets: ['Cikarang is the largest centre'] },
  { title: 'By distribution centre', table: [['Centre', 'Orders', 'Late'], ['Cikarang', '12.400', '3%'], ['Surabaya', '8.100', '5%']] },
  { title: 'Risks and actions', left: { heading: 'Risks', bullets: ['Port congestion'] }, right: { heading: 'Actions', bullets: ['Add a second carrier', { text: 'Review weekly', level: 1 }] } },
  { title: 'Next steps', bullets: ['Approve the plan', 'Book the carrier'], source: 'Source: Finance, September close' },
];

test('pptx: a themed deck renders every layout, notes and tags, with no fictional banner on slides', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-'));
  const file = path.join(dir, 'deck.pptx');
  try {
    await writeDeck(file, slides, { title: 'Q4 re-forecast', author: 'Babak Shammas', keywords: 'Triage; FICTIONAL DEMO DATA' });
    const zip = await JSZip.loadAsync(fs.readFileSync(file));
    const names = Object.keys(zip.files);
    assert.equal(names.filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n)).length, slides.length);
    const notes = await Promise.all(names.filter((n) => /^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(n)).map((n) => zip.file(n).async('string')));
    assert.equal(notes.filter((x) => x.includes('Open with the headline number.')).length, 1);
    const core = await zip.file('docProps/core.xml').async('string');
    assert.match(core, /<cp:keywords>Triage; FICTIONAL DEMO DATA<\/cp:keywords>/);
    assert.match(core, /<dc:creator>Babak Shammas<\/dc:creator>/);
    assert.match(core, /<cp:lastModifiedBy>Babak Shammas<\/cp:lastModifiedBy>/);
    for (const n of names.filter((x) => /^ppt\/slides\/slide\d+\.xml$/.test(x))) {
      assert.doesNotMatch(await zip.file(n).async('string'), /FICTIONAL/i, `${n} must not carry a banner`);
    }
    const all = (await Promise.all(names.filter((x) => /^ppt\/slides\/slide\d+\.xml$/.test(x)).map((n) => zip.file(n).async('string')))).join(' ');
    for (const text of ['IDR 9.8T', 'Cikarang', 'Port congestion', 'Review weekly', 'Source: Finance']) assert.ok(all.includes(text), text);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('pptx: the checker accepts a good deck and flags overlong or malformed slides', () => {
  const base = { key: 'd', name: 'Deck.pptx', kind: 'pptx', title: 't', owner: 'a', sharedWith: [], tags: 'T; FICTIONAL DEMO DATA' };
  const run = (deck) => checkEpisodeFiles({ episode: { tag: 'T', files: { pptx: 1 } }, files: [{ ...base, ...deck }], cast: { a: {} } });
  assert.deepEqual(run({ slides }), []);
  assert.match(run({ slides: [] }).join('\n'), /deck has no slides/);
  const bad = run({ slides: [
    { title: 'x'.repeat(95), bullets: Array(8).fill('ok') },
    { title: 'Long bullet', bullets: ['y'.repeat(160)] },
    { title: 'Big table', table: [['a', 'b', 'c', 'd', 'e', 'f', 'g'], ...Array(11).fill(['1', '2', '3', '4', '5', '6', '7'])] },
    { title: 'Ragged', table: [['a', 'b'], ['1']] },
    { title: 'Metrics', metrics: [] },
    { layout: 'carousel', title: 'Unknown' },
    { bullets: ['no title'] },
  ] }).join('\n');
  for (const re of [/title is 95 characters/, /8 bullets in bullets/, /bullet is longer than 150/, /11 rows \(max 10\)|has 12 rows/, /7 columns \(max 6\)/,
    /different column counts/, /metrics needs 1 to 4 cards/, /unknown layout "carousel"/, /slide 7: missing title/]) assert.match(bad, re);
});
