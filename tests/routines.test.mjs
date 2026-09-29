import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as tri from '../kits/x-email-triage-015/build.mjs';

test('email triage: 40 unread emails, groups add up', () => {
  const n = (b) => tri.INBOX.filter((m) => m.bucket === b).length;
  assert.equal(tri.INBOX.length, 40);
  assert.deepEqual([n('act'), n('week'), n('fyi'), n('noise'), n('suspicious')], [7, 6, 12, 14, 1]);
  assert.equal(new Set(tri.INBOX.map((m) => m.id)).size, 40);
});

test('email triage: traps are present', () => {
  const m = Object.fromEntries(tri.INBOX.map((x) => [x.id, x]));
  assert.ok(m.A2.cc && /@Carlos/.test(m.A2.body.split('-----Original')[0]), 'CC thread asks Carlos by name');
  assert.equal(m.A7.same, 'A1', 'reminder merges with the original');
  assert.match(m.A3.subject, /awaiting your approval/);
  assert.match(m.N10.subject, /has been approved/);
  assert.match(m.A4.body, /NIK \d{16}/, 'complaint carries personal data that must not be repeated');
  assert.match(m.N5.subject, /^URGENT/);
  assert.equal(m.F2.from, 'budi', 'manager FYI');
  assert.ok(!tri.P[m.S1.from][1].endsWith('@fabrikam.example'), 'phish uses a lookalike domain');
  assert.match(m.W1.body, /Mohon pengesahan pihak tuan/, 'Bahasa Melayu request');
});

test('email triage: Scout automation is imperative and never sends or deletes', () => {
  assert.match(tri.SCOUT, /RUN THIS NOW, TOP TO BOTTOM/);
  assert.match(tri.SCOUT, /Never send/);
  assert.match(tri.SCOUT, /Never delete/);
});
