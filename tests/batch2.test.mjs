import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as mr from '../kits/x-mgmt-report-011/build.mjs';
import * as cl from '../kits/bfsi-claims-012/build.mjs';
import * as bp from '../kits/gov-board-paper-013/build.mjs';
import * as cr from '../kits/x-contract-review-014/build.mjs';

test('mgmt report: sign convention and materiality', () => {
  const m = mr.LINES.filter(mr.material).map((l) => l.line);
  assert.deepEqual(m, ['Revenue', 'Cost of sales', 'Staff costs', 'IT and software', 'Professional fees']);
  const cos = mr.LINES.find((l) => l.line === 'Cost of sales');
  assert.ok(mr.variance(cos) > 0, 'cost below budget is favourable');
  assert.equal(mr.pct(mr.LINES.find((l) => l.line === 'Professional fees')), null, 'zero budget has no %');
  assert.ok(!mr.material(mr.LINES.find((l) => l.line === 'Marketing')), 'big % but small amount is immaterial');
  const explained = mr.NOTES.map((n) => n.line);
  assert.deepEqual(m.filter((x) => !explained.includes(x)), ['Revenue', 'Cost of sales'], 'two material lines need the owner');
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
