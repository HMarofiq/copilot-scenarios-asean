import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as ind from '../kits/enr-induction-007/build.mjs';
import * as kpi from '../kits/gov-kpi-narrative-008/build.mjs';
import * as mnt from '../kits/enr-maint-backlog-009/build.mjs';
import * as kak from '../kits/gov-tor-kak-010/build.mjs';

test('induction: current rules never contain a superseded value', () => {
  assert.equal(ind.CURRENT.length, 10);
  const text = ind.CURRENT.map((r) => `${r.rule} ${r.value} ${r.detail}`).join(' ');
  for (const s of ind.SUPERSEDED) assert.ok(!text.includes(s), `${s} must only be in the change log`);
});

test('kpi: polarity-aware statuses and top concerns', () => {
  const n = (s) => kpi.KPIS.filter((k) => kpi.status(k) === s).length;
  assert.deepEqual([n('Met'), n('Not met'), n('No target')], [5, 6, 1]);
  const lowerMet = kpi.KPIS.filter((k) => k.better === 'Lower' && kpi.status(k) === 'Met').map((k) => k.kpi);
  assert.deepEqual(lowerMet, ['Cost-to-income ratio', 'LTIFR', 'Energy intensity'], 'below target and good');
  // A naive "higher is better" reading gets at least 6 KPIs wrong: that is the trap.
  const naive = kpi.KPIS.filter((k) => k.target != null && (k.sep >= k.target ? 'Met' : 'Not met') !== kpi.status(k));
  assert.ok(naive.length >= 6);
  assert.deepEqual(kpi.topConcerns(), ['Days sales outstanding', 'Capex execution', 'Customer complaints']);
  assert.equal(kpi.KPIS.filter((k) => !k.comment).length, 4);
});

test('maintenance: independent re-solve matches, and month-first parsing would be wrong', () => {
  const { all, unique } = mnt.generate();
  assert.equal(all.length, 156);
  const s = mnt.solve(all);
  assert.equal(s.duplicates, 6);
  const open = unique.filter((x) => !['TECO', 'REL TECO', 'CLSD'].includes(x.status));
  assert.equal(s.open, open.length);
  assert.equal(s.hours, open.reduce((a, x) => a + x.hours, 0));
  assert.equal(s.overdue, open.filter((x) => x._start < mnt.AS_OF).length);
  const pivotTotal = Object.values(s.pivot).reduce((a, v) => a + v.orders, 0);
  assert.equal(pivotTotal, s.open);
  const monthFirst = (d) => { const [a, b, y] = d.split('.'); return `${y}-${a}-${b}`; };
  const wrong = open.filter((x) => Number(x.start.split('.')[0]) <= 12).filter((x) => (monthFirst(x.start) < mnt.AS_OF) !== (x._start < mnt.AS_OF));
  assert.ok(wrong.length > 0, 'the DD.MM trap changes at least one overdue flag');
});

test('kak: VAT normalisation and compliance issues', () => {
  const p = Object.fromEntries(kak.VENDORS.map((v) => [v.id, kak.priceInclVat(v)]));
  assert.equal(p.B, 4_218_000_000);
  assert.equal(Object.entries(p).sort((a, b) => b[1] - a[1])[0][0], 'B', 'B is most expensive after VAT');
  assert.equal(kak.VENDORS.reduce((m, v) => (v.price < m.price ? v : m)).id, 'B', 'B looks cheapest before VAT');
  assert.deepEqual(kak.VENDORS.map((v) => kak.issues(v).length), [1, 1, 1]);
});
