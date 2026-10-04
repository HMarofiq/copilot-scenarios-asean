import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as tri from '../kits/x-email-triage-015/build.mjs';
import { INBOX_SPEC, HISTORY_SPEC, EPISODE } from '../stories/zava-distribution/episodes/email-triage/spec.mjs';
import { INBOX as INBOX_TEXT } from '../stories/zava-distribution/episodes/email-triage/inbox.mjs';
import { HISTORY } from '../stories/zava-distribution/episodes/email-triage/history.mjs';
import { CHATS } from '../stories/zava-distribution/episodes/email-triage/chats.mjs';
import { FILES } from '../stories/zava-distribution/episodes/email-triage/files.mjs';
import { EVENTS } from '../stories/zava-distribution/episodes/email-triage/calendar.mjs';
import { CAST } from '../stories/zava-distribution/cast.mjs';
import { assertNoHardDates, expand } from '../stories/lib/dates.mjs';

const walk = (v, f, path = '') => (typeof v === 'string' ? f(v, path) : v && typeof v === 'object' ? Object.entries(v).forEach(([k, x]) => walk(x, f, `${path}.${k}`)) : null);

test('email triage: 40 unread emails, groups add up', () => {
  const n = (b) => tri.INBOX.filter((m) => m.group === b).length;
  assert.equal(tri.INBOX.length, 40);
  assert.deepEqual([n('act'), n('week'), n('fyi'), n('noise'), n('suspicious')], [7, 6, 12, 14, 1]);
  assert.equal(new Set(tri.INBOX.map((m) => m.id)).size, 40);
});

test('email triage: traps are present in the text', () => {
  const m = Object.fromEntries(tri.INBOX.map((x) => [x.id, x]));
  const a2 = m.A2.body.split(/-----Original Message-----|From: Kian/)[0].trim().split(/\n\s*\n/);
  assert.ok(m.A2.cc.includes('carlos') && !m.A2.to.includes('carlos'), 'Carlos only in CC on A2');
  assert.match(a2.slice(-4).join('\n'), /Pak Carlos/, 'the ask to Carlos is at the end of A2');
  assert.equal(m.A7.same, 'A1');
  assert.match(m.A3.body, /17[:.]00/); assert.match(m.N10.body, /approved/i);
  assert.match(m.A4.body, /\b\d{16}\b/, 'A4 carries an NIK that must not be repeated');
  assert.match(m.N5.subject, /^URGENT/);
  assert.equal(m.F2.from, 'adelia');
  assert.match(m.S1.body, /zavva-helpdesk\.example/);
  assert.equal(m.W1.lang, 'ms');
});

test('story: no leaked shorthand, no hard dates, tags on every chat and file', () => {
  const texts = { inbox: INBOX_TEXT, history: HISTORY, chats: CHATS, files: FILES, events: EVENTS };
  walk(texts, (s, p) => {
    if (/(^|\.)(key|from|to|cc|owner|members|organizer|attendees|optional|sharedWith|at|start|end|group|how|arc|lang|same|replyTo|kind|id|must|trap|tags|categories|topic)(\.|$)/.test(p)) return;
    assert.doesNotMatch(s, /\bD[0+-]\d*\b/, `${p}: internal day shorthand`);
    assert.doesNotMatch(s, /\b(trap|copilot|fictional|canon)\b/i, `${p}: meta text leaked`);
    assertNoHardDates(s, p);
  });
  for (const c of CHATS) assert.ok(c.topic.startsWith(`[${EPISODE.tag}] `), `${c.key} topic`);
  for (const f of FILES) assert.match(f.tags, new RegExp(`^${EPISODE.tag};`), `${f.key} tags`);
  for (const e of EVENTS) assert.ok(e.categories.includes(EPISODE.tag), `${e.key} category`);
});

test('story: chats are chronological, by members, and all in the past before the demo morning', () => {
  for (const c of CHATS) {
    const ts = c.messages.map((m) => m.at.d * 1440 + Number(m.at.t.slice(0, 2)) * 60 + Number(m.at.t.slice(3)));
    assert.deepEqual([...ts].sort((a, b) => a - b), ts, `${c.key} chronological`);
    assert.equal(new Set(ts).size, ts.length, `${c.key} unique times`);
    for (const m of c.messages) assert.ok(c.members.includes(m.from), `${c.key}: ${m.from} not a member`);
    assert.ok(ts.at(-1) < 0, `${c.key} ends before the demo day`);
  }
});

test('story: every person referenced exists in the cast, and history matches its spec', () => {
  const ks = [...INBOX_SPEC, ...HISTORY_SPEC].flatMap((s) => [s.from, ...(s.to ?? []), ...(s.cc ?? [])]);
  for (const k of ks) assert.ok(k.startsWith('sys:') || ['allstaff', 'divheads', 'managers'].includes(k) || CAST[k], k);
  assert.deepEqual(HISTORY.map((h) => h.id), HISTORY_SPEC.map((h) => h.id));
  assert.match(expand('{{d:+3:id}}', tri.D0), /^Sabtu, /, 'cutover Saturday falls on a Saturday');
});

test('email triage: Scout automation is imperative and never sends or deletes', () => {
  assert.match(tri.SCOUT, /RUN THIS NOW, TOP TO BOTTOM/);
  assert.match(tri.SCOUT, /Never send/);
  assert.match(tri.SCOUT, /Never delete/);
});
