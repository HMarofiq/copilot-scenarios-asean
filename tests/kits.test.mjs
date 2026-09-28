// Answer keys must be derivable from the kit data by following the scenario prompt literally.
// Each test re-solves the kit independently, then compares with what the generator claims.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as recon from '../kits/bfsi-branch-recon-002/build.mjs';
import * as permit from '../kits/enr-permit-watch-006/build.mjs';

test('recon: independent match reproduces the answer key', () => {
  const { gl, teller, atm, key, control } = recon.generate();
  const norm = (r) => String(r).replace(/^0+/, '');
  const T = new Map(teller.map(([date, ref, , , amount]) => [norm(ref), { date, amount }]));
  const A = new Map(atm.map(([date, , ref, amount]) => [norm(ref), { date, amount }]));
  const refCount = gl.reduce((m, g) => m.set(norm(g.ref), (m.get(norm(g.ref)) ?? 0) + 1), new Map());
  const reversed = (g) => refCount.get(norm(g.ref)) === 2 && gl.some((o) => o !== g && norm(o.ref) === norm(g.ref) && o.amount === -g.amount);

  const rows = gl.map((g) => {
    const other = (g.channel === 'ATM' ? A : T).get(norm(g.ref));
    const status = !other ? `Missing in ${g.channel === 'ATM' ? 'ATM' : 'Teller'}`
      : other.amount !== g.amount ? 'Amount difference'
      : other.date !== g.value ? 'Date difference' : 'Matched';
    const days = other ? Math.abs(Date.parse(other.date) - Date.parse(g.value)) / 864e5 : null;
    const cause = status === 'Matched' ? '' : status === 'Date difference' && days === 1 ? 'timing' : reversed(g) ? 'reversal' : 'investigate';
    return { ...g, status, cause };
  });
  const by = (c) => rows.filter((r) => r.cause === c);
  assert.equal(by('timing').length, recon.SEEDED.timing, 'timing rows');
  assert.equal(by('reversal').length, recon.SEEDED.reversal * 2, 'reversal rows (pairs)');
  assert.equal(by('investigate').length, recon.SEEDED.investigate, 'investigate rows');
  assert.equal(key.length, recon.SEEDED.timing + recon.SEEDED.reversal + recon.SEEDED.investigate, 'key entries');

  const keyRefs = new Set(key.map((k) => norm(k.ref)));
  assert.deepEqual(new Set(rows.filter((r) => r.cause).map((r) => norm(r.ref))), keyRefs, 'same refs as key');
  for (const k of key) assert.equal(k.cause, rows.find((r) => norm(r.ref) === norm(k.ref)).cause, `cause for ${k.ref}`);

  // Nothing orphaned on the other side, and the control total ties.
  const glRefs = new Set(gl.map((g) => norm(g.ref)));
  assert.equal([...T.keys(), ...A.keys()].filter((r) => !glRefs.has(r)).length, 0, 'no teller/ATM orphans');
  assert.equal(gl.reduce((s, g) => s + g.amount, 0), control);

  // The trap is real: without leading-zero handling every teller row fails to match.
  const tellerRefs = new Set(teller.map((t) => t[1]));
  const naive = gl.filter((g) => g.channel === 'TELLER' && !tellerRefs.has(g.ref));
  assert.equal(naive.length, gl.filter((g) => g.channel === 'TELLER').length, 'leading-zero trap unmatches all teller rows');
});

test('permit: register shape and seeded cases', () => {
  const today = new Date('2026-09-29T00:00:00Z'); // a Tuesday
  const rows = permit.generate(today);
  assert.equal(rows.length, 80);
  assert.equal(new Set(rows.map((r) => r.id)).size, 80, 'unique IDs');
  assert.equal(rows.filter((r) => !r.expiryIsDate).length, 1, 'one text-date trap');
  const days = rows.filter((r) => r.expiryIsDate).map((r) => Math.round((r.expiry - today) / 864e5));
  for (const d of [90, 60, 30]) assert.equal(days.filter((x) => x === d).length, 2, `two permits at ${d} days`);
  for (const d of [89, 88, 59, 29]) assert.ok(days.includes(d), `weekend crossing at ${d}`);
  assert.equal(days.filter((d) => d < 0).length, 2, 'two expired');
  for (const d of [31, 45, 120]) assert.ok(days.includes(d), `near-miss control at ${d}`);
});

test('permit: expected hits follow the prompt literally, weekday vs Monday', () => {
  const tue = new Date('2026-09-29T00:00:00Z'), mon = new Date('2026-10-05T00:00:00Z');
  const solve = (rows, runDate) => {
    const isMon = runDate.getUTCDay() === 1;
    const want = new Set([90, 60, 30, ...(isMon ? [88, 89, 58, 59, 28, 29] : [])]);
    return rows.filter((r) => r.expiryIsDate).filter((r) => { const d = Math.round((r.expiry - runDate) / 864e5); return d < 0 || want.has(d); }).map((r) => r.id).sort();
  };
  const rows = permit.generate(tue);
  const tueHits = permit.expectedHits(rows, tue).map((h) => h.id).sort();
  assert.deepEqual(tueHits, solve(rows, tue));
  assert.equal(tueHits.length, 8, 'Tuesday: 6 threshold + 2 expired');

  const monRows = permit.generate(mon);
  const monHits = permit.expectedHits(monRows, mon).map((h) => h.id).sort();
  assert.deepEqual(monHits, solve(monRows, mon));
  assert.equal(monHits.length, 12, 'Monday: 6 threshold + 4 weekend crossings + 2 expired');

  const nearMiss = monRows.filter((r) => r.expiryIsDate && [31, 45, 120].includes(Math.round((r.expiry - mon) / 864e5))).map((r) => r.id);
  assert.equal(nearMiss.filter((id) => monHits.includes(id)).length, 0, 'near misses never flagged');
});
