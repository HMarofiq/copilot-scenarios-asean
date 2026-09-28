// Structural checks on the regulation gap kit.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as reg from '../kits/bfsi-reg-gap-001/build.mjs';

test('reg-gap: 14 obligations, statuses and SOP references are consistent', () => {
  const O = reg.OBLIGATIONS;
  assert.equal(O.length, 14);
  assert.equal(new Set(O.map((o) => o.clause)).size, 14, 'unique clauses');
  const n = (s) => O.filter((o) => o.status === s).length;
  assert.deepEqual([n('Covered'), n('Partial'), n('Not covered')], [6, 4, 4]);
  for (const o of O) {
    assert.ok(!('change' in o), `${o.clause}: no new/changed claim without the replaced circular`);
    if (o.status === 'Not covered') continue;
    assert.ok(reg.SOP_IDS.includes(o.sop), `${o.clause}: SOP ${o.sop} exists`);
    assert.ok(reg.sopSection(o.sop, o.section), `${o.clause}: section ${o.sop} ${o.section} exists`);
  }
  for (const d of ['SOP-IT-01', 'SOP-OPS-01']) assert.ok(!O.some((o) => o.sop === d), `${d} is a distractor`);
});

test('reg-gap: circular states every obligation exactly once and nothing undefined', () => {
  const text = reg.circularBlocks().filter((b) => typeof b === 'string').join('\n');
  assert.ok(!/undefined/.test(text), 'no undefined chapter titles');
  for (const o of reg.OBLIGATIONS) {
    const hits = text.split(o.text).length - 1;
    assert.equal(hits, 1, `${o.clause} appears ${hits} times`);
  }
});
