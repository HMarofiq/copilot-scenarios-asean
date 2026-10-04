import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as mr from '../kits/x-mgmt-report-011/build.mjs';
import * as cl from '../kits/bfsi-claims-012/build.mjs';
import * as bp from '../kits/gov-board-paper-013/build.mjs';
import * as cr from '../kits/x-contract-review-014/build.mjs';

test('mgmt report: consolidation, materiality and traps', () => {
  const k = mr.answerKey();
  const R = Object.fromEntries(k.rows.map((r) => [r.line, r]));
  assert.deepEqual(k.material, ['Revenue', 'Gross profit', 'Restructuring', 'Warehouse & logistics', 'IT & software', 'Marketing & promotion', 'Professional fees']);
  assert.deepEqual(k.materialBeforeJournals, ['Revenue', 'Gross profit', 'Warehouse & logistics', 'Marketing & promotion', 'Professional fees'], 'journals make Restructuring and IT material');
  assert.ok(mr.variance(R['Cost of sales']) > 0, 'cost below budget is favourable');
  assert.equal(mr.pct(R.Restructuring), null, 'zero budget has no %');
  assert.ok(!mr.material(R['Travel & entertainment']) && Math.abs(mr.pct(R['Travel & entertainment'])) > 0.1, 'big % but small amount is immaterial');
  assert.equal(k.icDifference, 139.2);
  assert.equal(k.unmappedAmount, 49.3);
  assert.equal(k.fxOnRevenue, 18340);
  assert.equal(R['Profit before tax'].actual, 384762.3);
  for (const e of ['CNN', 'CNM']) assert.equal(mr.trialBalance(e).reduce((s, r) => s + r.balance, 0), 0, e + ' trial balance sums to zero');
  const tb = mr.trialBalance('CNN');
  assert.equal(-tb.filter((r) => /^4/.test(r.account)).reduce((s, r) => s + r.balance, 0) / 1e6, mr.ACTUAL.CNN.Revenue, 'TB revenue ties to the model');
});
test('claims: missing document, unnamed driver, betterment', () => {
  assert.deepEqual(cl.CHECKLIST.filter((x) => !cl.RECEIVED.includes(x)), ['Copy of driving licence']);
  assert.equal(cl.ESTIMATE.filter((e) => !e.covered).length, 1);
  assert.equal(cl.ESTIMATE.filter((e) => e.covered).reduce((s, e) => s + e.amount, 0), 8_800_000);
});

test('board paper: bridge, materiality, stale input, conflict and missing section', () => {
  const k = bp.answerKey();
  assert.equal(k.ev - k.netDebt, k.equity100);
  assert.equal(k.equity100 * k.stake / 100, k.price);
  assert.equal(k.ratioNow, 21.25);
  assert.ok(k.material && !k.rupsNeeded);
  assert.ok(!k.materialIfStale, 'the stale LOI price would wrongly look non-material');
  assert.equal(k.conflict.gap, k.conflict.explainedBy, 'the EBITDA gap equals the one-off land gain');
  const t = Object.fromEntries(Object.entries(bp.TEXTS).map(([key, v]) => [key, bp.plain(v)]));
  assert.match(t.INPUT_OPERATIONS, /238/);
  for (const key of ['INPUT_FINANCE', 'INPUT_LEGAL_TAX', 'INPUT_STRATEGY', 'INPUT_RISK']) assert.doesNotMatch(t[key], /\b238\b/, `${key} must not carry the management EBITDA`);
  assert.match(t.INPUT_RISK, /19,58/);
  assert.match(t.INPUT_FINANCE, /1,020|1\.020/);
  assert.doesNotMatch(t.INPUT_STRATEGY, /1,020|1\.020/, 'Strategy only gives the EV');
  assert.match(t.INPUT_LEGAL_TAX, /Laras Pratiwi/);
  for (const cp of ['CDOB', 'Litware', 'Zava Logistik Nusantara']) assert.match(t.INPUT_LEGAL_TAX, new RegExp(cp));
  assert.equal(bp.SECTIONS.length, 10);
  assert.ok(!('INPUT_HC' in bp.TEXTS), 'Human Capital has not submitted');
});
test('contract review: 19 issues, verdict mix, clauses and traps present in the texts', () => {
  assert.equal(cr.ISSUES.length, 19);
  assert.deepEqual(cr.verdictCounts(), { redline: 5, beyond: 9, meets: 1, fallback1: 3, notAddressed: 1 });
  const msa = cr.MSA.filter((b) => typeof b === 'string');
  const clause = (n) => msa.find((b) => b.startsWith(`${n} `));
  for (const i of cr.ISSUES) for (const w of i.where.filter((x) => x.startsWith('MSA '))) {
    assert.ok(clause(w.slice(4).split(/[ (]/)[0]), `${i.id}: ${w} missing from the MSA`);
  }
  assert.match(clause('22.14'), /^22\.14 Notwithstanding/);
  assert.match(clause('14.2'), /sole and exclusive remedy/i);
  assert.match(cr.plain(cr.MSA), /three times \(3x\)/);
  assert.match(cr.plain(cr.TEXTS.ONLINE_TERMS), /train/i);
  const all = Object.values(cr.TEXTS).map(cr.plain).join('\n');
  assert.doesNotMatch(cr.plain(cr.MSA) + cr.plain(cr.TEXTS.ORDER_FORMS) + cr.plain(cr.TEXTS.ONLINE_TERMS), /insurance/i, 'P19 must be absent from the contract');
  assert.doesNotMatch(all, /copilot|\btrap\b/i);
  const heads = cr.TEXTS.PLAYBOOK.filter((b) => typeof b === 'string' && /^### P\d\d /.test(b)).map((b) => b.slice(4, 7));
  assert.deepEqual(heads, cr.ISSUES.map((i) => i.id), 'playbook has one position per issue, in order');
  assert.ok(cr.words(cr.MSA) > 14000, `MSA is long enough (${cr.words(cr.MSA)} words)`);
});
