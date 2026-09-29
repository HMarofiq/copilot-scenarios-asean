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

test('board paper: conflict is real', () => {
  assert.notEqual(bp.CONFLICT.finance, bp.CONFLICT.operations);
  assert.equal(bp.MISSING, 'Human Resources');
});

test('contract review: every playbook topic has an expected verdict', () => {
  assert.deepEqual(Object.keys(cr.EXPECTED).sort(), cr.PLAYBOOK.map((p) => p.topic).sort());
});
