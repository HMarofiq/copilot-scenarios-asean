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

test('kak: price normalisation, traps and ranking', () => {
  const k = kak.answerKey();
  const R = Object.fromEntries(k.rows.map((r) => [r.id, r]));
  assert.equal(k.hpsIncl, 14_652_000_000);
  assert.equal(R.A.incl, 14_294_224_800, 'A: 3-year total with the 7% uplift, plus 11% effective PPN');
  assert.equal(R.C.arithmeticDiff, 63_000_000, 'C: training 20 x 18.5m typed as 307m');
  assert.equal(R.C.incl, 14_324_550_000);
  assert.ok(R.C.quoted < inclVatA(), 'before correction C looks cheaper than A');
  assert.equal(R.B.quoted, 12_768_000_000, 'B applied 12% on the full DPP');
  assert.equal(R.B.incl, 12_654_000_000);
  assert.equal(R.D.dpp, 9_099_280_000, 'D: USD 456,000 at JISDOR 16,380 plus IDR services');
  assert.ok(R.D.pctHps < 0.8, 'D is below 80% of HPS');
  assert.deepEqual(k.rows.filter((r) => r.passes).map((r) => r.id), ['A', 'C']);
  assert.ok(R.B.admin.length === 2 && R.D.admin.length === 2 && R.D.tech.length === 3);
  assert.deepEqual(k.ranking, ['C', 'A']);
  assert.deepEqual(kak.naiveRanking(), ['A', 'C'], 'ignoring the uplift flips the ranking');
  assert.equal(kak.memoUserSum(), 460);
  const kakText = kak.plain(kak.TEXTS.KAK_FINAL) + kak.plain(kak.TEXTS.TEMPLATE_KAK);
  assert.doesNotMatch(kakText, /Adatum|14,65|13\.200/, 'the issued KAK names no brand and no HPS');
  assert.match(kak.plain(kak.TEXTS.MEMO), /Adatum/);
  assert.doesNotMatch(kak.plain(kak.TEXTS.PROPOSAL_D), /Adendum 1/);
  function inclVatA() { return R.A.incl; }
});