import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as mk from '../kits/tel-mkt-board-016/build.mjs';

test('telco board pack: spend basis, lights, currency and CAGR', () => {
  const k = mk.answerKey();
  assert.equal(k.rh.spendM, 3852.5);
  assert.equal(k.rh.costPer, 591325);
  assert.deepEqual([k.rh.lights.volume, k.rh.lights.cost, k.rh.lights.pacing, k.rh.overall], ['Amber', 'Red', 'Amber', 'Red']);
  assert.equal(k.rh.spendPct, 57.7);
  assert.equal(k.rh.timePct, 50);
  assert.equal(k.mu.validAdds, 140580);
  assert.equal(k.mu.costPerValid, 33190);
  assert.equal(k.mu.overall, 'Amber');
  assert.ok(k.mu.platformSum > k.mu.activations, 'summed platform conversions exceed real activations');
  assert.ok(k.mu.agencyCpa < mk.CAMPAIGNS.MU.target.costPer && k.mu.costPerValid > mk.CAMPAIGNS.MU.target.costPer, 'agency CPA looks green, real cost is amber');
  assert.notEqual(k.mu.wrongIfCreditNettedM, k.mu.spendM, 'netting the August credit changes September spend');
  assert.equal(k.my.netMYR, 946000);
  assert.equal(k.my.invoicedMYR, 1021680);
  assert.equal(k.my.spendM, 3405.6);
  assert.equal(k.my.wrongSpendM, 3823.1);
  assert.equal(k.my.newLines, 6480);
  assert.equal(k.my.overall, 'Amber');
  assert.equal(k.total.spendM, 11923.9);
  assert.equal(k.total.budgetM, 11820);
  assert.equal(k.cagr.right, 23.2);
  assert.equal(k.cagr.wrongN5, 18.1);
  assert.equal(k.tiktokGap.RH, 22384600);
  assert.equal(k.tiktokGap.MU, 51570000);
});

test('telco board pack: exports and BI extract tie to the model', () => {
  const C = mk.CAMPAIGNS;
  const meta = mk.metaRows(), g = mk.googleRows(), t = mk.tiktokRows(), bi = mk.biRows();
  const sum = (rows, f, key) => rows.filter(f).reduce((s, r) => s + r[key], 0);
  for (const k of ['RH', 'MU']) {
    assert.equal(sum(meta, (r) => r.camp.startsWith(k), 'spent'), C[k].media.meta);
    assert.equal(sum(meta, (r) => r.camp.startsWith(k), 'results'), C[k].platformConv.meta);
    assert.equal(sum(g, (r) => r.name.startsWith(k), 'cost'), C[k].media.google);
    assert.equal(sum(t, (r) => r.camp.startsWith(k), 'cost'), mk.TIKTOK_EXPORT.exportMedia[k]);
  }
  assert.equal(sum(bi.rh, () => true, 'orders'), C.RH.backend.orders);
  assert.equal(sum(bi.rh, () => true, 'installs'), C.RH.backend.installs);
  assert.equal(sum(bi.mu, () => true, 'activations'), C.MU.backend.activations);
  assert.equal(sum(bi.mu, () => true, 'flagged'), C.MU.backend.flagged);
  assert.equal(sum(bi.mu, (r) => r.channel === 'referral_ajak_teman', 'flagged'), C.MU.backend.flaggedReferral);
  assert.ok(bi.mu.every((r) => r.flagged <= r.activations && r.activations >= 0));
  const inv = mk.invoice();
  assert.equal(inv.media, C.RH.media.meta + C.RH.media.google + C.RH.media.tiktok + C.MU.media.meta + C.MU.media.google + C.MU.media.tiktok + mk.OTHER.metaMedia);
});
