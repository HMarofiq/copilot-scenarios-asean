import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readdirSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import { parse } from 'yaml';
import build, { FILES } from '../kits/x-report-deck-017/build.mjs';
import { company, dcQuarter, answerKey, MONTHLY, DCS, Q2, ERRATUM, COMMITMENTS } from '../kits/x-report-deck-017/model.mjs';
import { REPORT } from '../kits/x-report-deck-017/text.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const pagePath = join(root, 'content', 'scenarios', 'x-report-deck-017.md');
const k = answerKey();
const text = REPORT.filter((b) => typeof b === 'string').join('\n');

// Independent oracle: hard-coded expected values, so a model change must be deliberate.
test('report-deck: scorecard answer key', () => {
  assert.deepEqual(k.scorecard.map((r) => [r.value, r.change, r.rag]), [
    [92.3, '+1.0 pts', 'Amber'], [91.2, '+0.8 pts', 'Amber'], [8639, '+1.3%', 'Amber'], [31.4, '-2.0 days', 'Green'],
    [91.2, '+2.3 pts', 'Amber'], [0.41, '1 LTI vs 0', 'Red'], [18, '+5 (from 13)', 'Amber'],
  ]);
});

test('report-deck: each trap changes the answer', () => {
  assert.equal(k.traps.T1.reportedHeadline, 94.0);
  assert.notEqual(k.traps.T1.reportedHeadline, k.traps.T1.quarter);
  assert.equal(k.traps.T2.simpleAverage, 93.3);
  assert.equal(k.traps.T2.ragSimple, 'Green');
  assert.equal(k.traps.T2.ragWeighted, 'Amber');
  assert.deepEqual([k.traps.T3.v1CostPerCase, k.traps.T3.v1Rag, k.traps.T3.correctedCostPerCase, k.traps.T3.correctedRag], [8585, 'Green', 8639, 'Amber']);
  assert.deepEqual([k.traps.T3.sbyV1, k.traps.T3.sbyCorrected], [8504, 8782]);
  assert.equal(k.traps.T4.reportedChange, 3.7);
  assert.equal(k.traps.T4.likeForLikeLine, 0.8);
  assert.equal(k.traps.T4.likeForLikeCase, 0.8);
  assert.deepEqual([k.traps.T5.lti, k.traps.T5.ltifr], [1, 0.41]);
  assert.deepEqual([k.traps.T6.rag, k.traps.T6.sepRag], ['Amber', 'Red']);
  assert.equal(k.traps.T7.pctChange, 38.5);
  assert.deepEqual(k.traps.T8.statuses, ['C1 Done', 'C2 Partly done', 'C3 Not started']);
  assert.equal(k.traps.T8.overtimeCutPct, 9.0);
});

test('report-deck: numbers tie', () => {
  const c = company(true), v1 = company(false);
  assert.equal(v1.cases - c.cases, ERRATUM.transferCases);
  assert.equal(c.cost, DCS.reduce((a, d) => a + dcQuarter(d.code).cost, 0));
  assert.equal(c.cost, 25170);
  for (const d of DCS) {
    const m = MONTHLY[d.code];
    m.otif.forEach((x, i) => assert.ok(x <= m.orders[i]));
    m.linesFilledLine.forEach((x, i) => assert.ok(x <= m.linesFilledCase[i] && m.linesFilledCase[i] <= m.linesOrdered[i]));
  }
  assert.equal(Math.round((24106 * 1e6) / 2826000), Q2.costPerCase);
  assert.equal(c.complaints, 18);
});

test('report-deck: report states the trap claims the deck must correct', () => {
  assert.match(text, /OTIF reached 94\.0% in September/);
  assert.match(text, /fill rate improved by 3\.7 points to \*\*94\.1%\*\*/);
  assert.match(text, /Cost per case was IDR 8,585/);
  assert.match(text, /zero lost-time injuries/);
  assert.match(text, /excellent utilisation of 91\.2%/);
  assert.match(text, /approved in principle/);
  assert.match(text, /Agus Setiadi/);
  assert.match(text, /6,000/);
  assert.equal(COMMITMENTS.length, 3);
});

test('report-deck: kit builds the six inputs and a README with the key', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'rd017-'));
  try {
    await build({ dir, today: new Date('2026-10-04T00:00:00Z') });
    assert.deepEqual(readdirSync(dir).sort(), [...Object.values(FILES), 'README.txt'].sort());
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(join(dir, FILES.data));
    assert.deepEqual(wb.worksheets.map((w) => w.name), ['README', 'Monthly_DC', 'Targets', 'Q2_Actuals', 'Definitions', 'Safety_Log', 'Overtime', 'Rates']);
    assert.equal(wb.getWorksheet('Monthly_DC').rowCount, 13);
    const readme = readFileSync(join(dir, 'README.txt'), 'utf8');
    assert.match(readme, /IDR 8,639/);
    assert.match(readme, /your own work tenant/);
    assert.doesNotMatch(readme, /demo tenant only/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('report-deck: page frontmatter and prompts', { skip: !existsSync(pagePath) }, () => {
  const page = readFileSync(pagePath, 'utf8').replace(/\r\n/g, '\n');
  const fm = parse(page.split(/^---$/m)[1]);
  assert.deepEqual(fm.tiers.map((t) => t.key), ['basic', 'premium', 'cowork']);
  assert.deepEqual(fm.inputs.flatMap((i) => i.kit ?? []), Object.values(FILES));
  for (const block of page.matchAll(/^:::prompt\n([\s\S]*?)^:::/gm)) {
    const langs = [...block[1].matchAll(/^(EN|ID|BM): /gm)].map((m) => m[1]);
    assert.deepEqual(langs, ['EN', 'ID', 'BM']);
  }
});
