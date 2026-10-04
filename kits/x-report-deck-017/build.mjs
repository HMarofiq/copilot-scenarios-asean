// Builds the x-report-deck-017 kit: a received quarterly report (Word + Excel + late correction) -> Direksi QBR deck.
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import PptxGenJS from 'pptxgenjs';
import { writeDocx, writeXlsx, writeText, NOTICE } from '../lib.mjs';
import { CASE as C, DCS, MONTHS, MONTHLY, Q2, TARGETS, FILL_RESTATED, OVERTIME_Q3, SAFETY_LOG, COMMITMENTS, DECISION, ERRATUM, company, answerKey } from './model.mjs';
import { REQUEST, REPORT, ERRATUM_MAIL, DATA_README } from './text.mjs';

export const FILES = {
  request: '01_QBR_Request_and_Deck_Standard.docx',
  report: '02_Q3_2026_Distribution_Operations_Report_v1.0.docx',
  data: '03_Q3_2026_Distribution_KPI_Workbook.xlsx',
  erratum: '04_Email_Correction_Surabaya_Volume.docx',
  q2deck: '05_Q2_2026_QBR_Distribution_Operations.pptx',
  template: '06_Zava_Niaga_QBR_Template.pptx',
};

const NAVY = '12355B', ORANGE = 'E8772E', INK = '1E2A36', SOFT = 'EEF2F6', GREY = '6B7785';
const RAGC = { Green: '2E8540', Amber: 'D98C00', Red: 'C0392B' };
const n = (x) => x.toLocaleString('en-US');

function deck(title) {
  const p = new PptxGenJS();
  p.layout = 'LAYOUT_WIDE'; p.title = title; p.company = C.company;
  p.defineSlideMaster({ title: 'CN', background: { color: 'FFFFFF' }, objects: [
    { rect: { x: 0, y: 0, w: 13.33, h: 0.12, fill: { color: ORANGE } } },
    { text: { text: 'Zava Niaga | Quarterly Business Review | INTERNAL', options: { x: 0.5, y: 6.95, w: 8, h: 0.3, fontSize: 9, color: GREY } } },
    { text: { text: NOTICE, options: { x: 0.5, y: 7.18, w: 12.3, h: 0.25, fontSize: 8, color: 'C00000' } } },
  ], slideNumber: { x: 12.4, y: 6.95, fontSize: 9, color: GREY } });
  return p;
}
const title = (s, text) => s.addText(text, { x: 0.5, y: 0.35, w: 12.3, h: 0.75, fontSize: 24, bold: true, color: NAVY, fontFace: 'Segoe UI' });
const head = (cols) => cols.map((h) => ({ text: h, options: { bold: true, fill: { color: SOFT }, color: INK } }));
const ragCell = (r) => ({ text: r, options: { fill: { color: RAGC[r] }, color: 'FFFFFF', bold: true } });
const tbl = { x: 0.5, w: 12.3, fontSize: 12, fontFace: 'Segoe UI', color: INK, border: { type: 'solid', pt: 0.5, color: 'C8D3DC' } };

async function writeTemplate(path) {
  const p = deck('Zava Niaga QBR template');
  let s = p.addSlide({ masterName: 'CN' });
  s.background = { color: NAVY };
  s.addText('[Division]: Q[x] [year] results', { x: 0.8, y: 2.3, w: 11.5, h: 1, fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI' });
  s.addText('Quarterly Business Review | [date] | [presenter, role]', { x: 0.8, y: 3.4, w: 11.5, h: 0.5, fontSize: 16, color: 'D6E0EA' });
  s.addNotes('Sample slide. Replace all text in [brackets].');
  s = p.addSlide({ masterName: 'CN' }); title(s, '[Executive summary: the main message in one sentence]');
  s.addText([{ text: '1. [Message with the number that proves it]', options: { breakLine: true } }, { text: '2. [Message with the number that proves it]', options: { breakLine: true } }, { text: '3. [Message with the number that proves it]' }],
    { x: 0.5, y: 1.2, w: 12.3, h: 1.4, fontSize: 15, color: INK, fontFace: 'Segoe UI' });
  s.addTable([head(['KPI', 'Q[x] actual', 'Target', 'Change vs Q[x-1]', 'RAG']), ['[KPI]', '[value]', '[target]', '[+x pts / +x%]', ragCell('Green')], ['[KPI]', '[value]', '[target]', '[change]', ragCell('Amber')], ['[KPI]', '[value]', '[target]', '[change]', ragCell('Red')]], { ...tbl, y: 2.8 });
  s.addNotes('Sample slide. Three messages, then the scorecard. RAG per the QBR deck standard. Notes: what to say plus the source of each number.');
  s = p.addSlide({ masterName: 'CN' }); title(s, '[Message title: what the chart shows]');
  s.addChart(p.charts.BAR, [{ name: 'Target', labels: ['[A]', '[B]', '[C]', '[D]'], values: [90, 90, 90, 90] }, { name: 'Actual', labels: ['[A]', '[B]', '[C]', '[D]'], values: [85, 92, 95, 88] }],
    { x: 0.5, y: 1.3, w: 7.4, h: 5.2, barDir: 'col', chartColors: ['C8D3DC', NAVY], showLegend: true, legendPos: 'b' });
  s.addText([{ text: 'What happened', options: { bold: true, breakLine: true } }, { text: '[2-3 points with numbers]', options: { breakLine: true } }, { text: 'Why', options: { bold: true, breakLine: true } }, { text: '[cause]', options: { breakLine: true } }, { text: 'Next', options: { bold: true, breakLine: true } }, { text: '[action, owner role, date]' }],
    { x: 8.2, y: 1.3, w: 4.6, h: 5.2, fontSize: 14, color: INK, valign: 'top', fontFace: 'Segoe UI' });
  s.addNotes('Sample slide. Chart left, explanation right.');
  s = p.addSlide({ masterName: 'CN' }); title(s, '[Commitments from the last QBR: where each one stands]');
  s.addTable([head(['Commitment', 'Owner (role)', 'Status', 'Evidence']), ['[commitment]', '[role]', '[Done / Partly done / Not started]', '[evidence and source]'], ['[commitment]', '[role]', '[status]', '[evidence]']], { ...tbl, y: 1.3 });
  s.addNotes('Sample slide. Show every commitment, including the missed ones.');
  s = p.addSlide({ masterName: 'CN' }); title(s, '[Decisions requested from the Direksi]');
  s.addTable([head(['Decision requested', 'Cost / impact', 'Alternative', 'Needed by']), ['[decision]', '[IDR, per year]', '[option if not approved]', '[date]']], { ...tbl, y: 1.3 });
  s.addNotes('Sample slide. Only items that are not yet approved.');
  mkdirSync(join(path, '..'), { recursive: true });
  await p.writeFile({ fileName: path });
}

async function writeQ2Deck(path) {
  const p = deck('Distribution Operations Q2 2026 QBR');
  let s = p.addSlide({ masterName: 'CN' });
  s.background = { color: NAVY };
  s.addText('Distribution Operations: Q2 2026 results', { x: 0.8, y: 2.3, w: 11.5, h: 1, fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI' });
  s.addText(`Quarterly Business Review | 9 July 2026 | ${C.author.name}, ${C.author.title}`, { x: 0.8, y: 3.4, w: 11.5, h: 0.5, fontSize: 16, color: 'D6E0EA' });
  s = p.addSlide({ masterName: 'CN' }); title(s, 'Service is recovering, but Cikarang capacity is tightening');
  s.addText([{ text: '1. OTIF 91.3% for the quarter, up 0.9 pts on Q1 but below the 93.0% target.', options: { breakLine: true } }, { text: '2. Cost per case IDR 8,530, within the IDR 8,600 target.', options: { breakLine: true } }, { text: '3. Cikarang ended June at 90.5% utilisation; Q4 peak needs a plan.' }],
    { x: 0.5, y: 1.2, w: 12.3, h: 1.4, fontSize: 15, color: INK, fontFace: 'Segoe UI' });
  s.addTable([head(['KPI', 'Q2 actual', 'Target', 'Change vs Q1', 'RAG']),
    ['OTIF', `${Q2.otifPct}%`, `${TARGETS.otifPct}%`, '+0.9 pts', ragCell('Red')],
    ['Fill rate (order lines)', `${Q2.fillLinePct}%`, `${TARGETS.fillLinePct}%`, '+0.5 pts', ragCell('Red')],
    ['Cost per case', `IDR ${n(Q2.costPerCase)}`, `IDR ${n(TARGETS.costPerCase)}`, '-1.1%', ragCell('Green')],
    ['Inventory days', String(Q2.invDays), String(TARGETS.invDays), '-0.8 days', ragCell('Red')],
    ['Cikarang utilisation (average)', `${Q2.utilCkr}%`, `${TARGETS.util.greenMax}% or lower`, '+3.1 pts', ragCell('Amber')],
    ['Lost-time injuries', '0', '0', 'no change', ragCell('Green')],
    ['Customer complaints', String(Q2.complaints), `${TARGETS.complaints} or fewer`, '-4 (from 17)', ragCell('Green')]], { ...tbl, y: 2.8 });
  s.addNotes('Sources: Q2 KPI workbook (Monthly_DC, Targets). Fill rate measured on order lines. Complaints shown as counts per the deck standard.');
  s = p.addSlide({ masterName: 'CN' }); title(s, 'Cikarang drives the OTIF gap');
  s.addChart(p.charts.BAR, [{ name: 'Target', labels: ['Cikarang', 'Surabaya', 'Medan', 'Johor Bahru'], values: [93, 93, 93, 93] }, { name: 'Q2 OTIF', labels: ['Cikarang', 'Surabaya', 'Medan', 'Johor Bahru'], values: [89.8, 92.6, 93.7, 94.0] }],
    { x: 0.5, y: 1.3, w: 7.4, h: 5.2, barDir: 'col', chartColors: ['C8D3DC', NAVY], showLegend: true, legendPos: 'b', showValue: true });
  s.addText([{ text: 'What happened', options: { bold: true, breakLine: true } }, { text: 'Cikarang handles 55% of orders and missed target by 3.2 pts; the other sites were close to or above target.', options: { breakLine: true } },
    { text: 'Why', options: { bold: true, breakLine: true } }, { text: 'Dock congestion at peak hours and late carrier arrivals.', options: { breakLine: true } }, { text: 'Next', options: { bold: true, breakLine: true } }, { text: 'Dock-booking rules from August (Head of Distribution Operations).' }],
  { x: 8.2, y: 1.3, w: 4.6, h: 5.2, fontSize: 14, color: INK, valign: 'top', fontFace: 'Segoe UI' });
  s = p.addSlide({ masterName: 'CN' }); title(s, 'Our commitments for Q3');
  s.addTable([head(['Commitment', 'Owner (role)', 'Due']), ...COMMITMENTS.map((c) => [c.text, c.owner, c.id === 'C1' ? '31 Aug 2026' : '30 Sep 2026'])], { ...tbl, y: 1.3 });
  s.addNotes(`Direksi asked us to report back on all three at the Q3 QBR. Surabaya overtime baseline: ${n(Q2.surabayaOvertimeHours)} hours in Q2.`);
  s = p.addSlide({ masterName: 'CN' }); title(s, 'Questions from the Direksi');
  s.addText([{ text: `Bu ${C.ceo.name.split(' ')[0]}: show the quarter, not the best month.`, options: { bullet: true, breakLine: true } }, { text: `Pak ${C.fd.name.split(' ')[0]}: carrier costs for 2027 before contracts expire.`, options: { bullet: true, breakLine: true } }, { text: 'Direksi: a capacity plan for Cikarang before the Q4 peak.', options: { bullet: true } }],
    { x: 0.5, y: 1.3, w: 12.3, h: 3, fontSize: 16, color: INK, fontFace: 'Segoe UI' });
  mkdirSync(join(path, '..'), { recursive: true });
  await p.writeFile({ fileName: path });
}

async function writeWorkbook(path) {
  const rows = DCS.flatMap((d) => MONTHS.map((m, i) => {
    const x = MONTHLY[d.code];
    return { month: `${m} 2026`, dc: d.name, orders: x.orders[i], otif: x.otif[i], cases: x.cases[i], cost: x.cost[i], lo: x.linesOrdered[i], lfl: x.linesFilledLine[i], lfc: x.linesFilledCase[i], inv: x.invDays[i], util: x.util[i], hours: x.hours[i], comp: x.complaints[i] };
  }));
  const pct = '0.0', num = '#,##0';
  await writeXlsx(path, [
    { name: 'Monthly_DC', columns: [
      { header: 'Month', key: 'month', width: 11 }, { header: 'DC', key: 'dc', width: 13 }, { header: 'Orders', key: 'orders', numFmt: num, width: 10 }, { header: 'Orders OTIF', key: 'otif', numFmt: num, width: 12 },
      { header: 'Cases shipped', key: 'cases', numFmt: num, width: 14 }, { header: 'Cost (IDR m)', key: 'cost', numFmt: num, width: 13 }, { header: 'Order lines ordered', key: 'lo', numFmt: num, width: 18 },
      { header: 'Order lines filled complete', key: 'lfl', numFmt: num, width: 24 }, { header: 'Lines filled, case basis', key: 'lfc', numFmt: num, width: 21 }, { header: 'Inventory days', key: 'inv', width: 14 },
      { header: 'Utilisation % (month end)', key: 'util', numFmt: pct, width: 22 }, { header: 'Hours worked', key: 'hours', numFmt: num, width: 13 }, { header: 'Complaints', key: 'comp', width: 11 }], rows },
    { name: 'Targets', columns: [{ header: 'KPI', key: 'k', width: 34 }, { header: 'Target 2026', key: 't', width: 22 }, { header: 'Direction', key: 'd', width: 18 }], rows: [
      { k: 'OTIF %', t: TARGETS.otifPct, d: 'Higher is better' }, { k: 'Fill rate % (order lines)', t: TARGETS.fillLinePct, d: 'Higher is better' },
      { k: 'Cost per case (IDR)', t: TARGETS.costPerCase, d: 'Lower is better' }, { k: 'Inventory days', t: TARGETS.invDays, d: 'Lower is better' },
      { k: 'Utilisation % (capacity band)', t: `${TARGETS.util.greenMax} or lower`, d: 'Higher is worse' }, { k: 'LTIFR (per 1M hours)', t: 0, d: 'Lower is better' },
      { k: 'Customer complaints per quarter', t: TARGETS.complaints, d: 'Lower is better' }] },
    { name: 'Q2_Actuals', columns: [{ header: 'KPI', key: 'k', width: 34 }, { header: 'Q2 2026 as presented', key: 'v', width: 20 }, { header: 'Note', key: 'n', width: 60 }], rows: [
      { k: 'OTIF %', v: Q2.otifPct, n: 'Calculated from total orders' }, { k: 'Fill rate %', v: Q2.fillLinePct, n: 'Order-line basis (method used until Q2)' },
      { k: 'Cost per case (IDR)', v: Q2.costPerCase, n: 'Cases shipped 2,826,000' }, { k: 'Inventory days', v: Q2.invDays, n: 'Volume-weighted' },
      { k: 'Cikarang utilisation % (Q2 average)', v: Q2.utilCkr, n: '' }, { k: 'Lost-time injuries', v: Q2.lti, n: 'LTIFR 0.00' },
      { k: 'Customer complaints', v: Q2.complaints, n: '' }, { k: 'Surabaya overtime hours', v: Q2.surabayaOvertimeHours, n: 'Baseline for the 20% reduction commitment' }] },
    { name: 'Definitions', columns: [{ header: 'Item', key: 'i', width: 40 }, { header: 'Value', key: 'v', width: 14 }, { header: 'Note', key: 'n', width: 80 }], rows: [
      { i: 'Fill rate method from Q3', v: 'Case basis', n: 'Cases shipped vs cases ordered. Changed in July 2026 to match retail partner scorecards. Typically ~3 pts higher than order-line basis.' },
      { i: 'Fill rate method until Q2', v: 'Order lines', n: 'Order lines filled complete vs order lines ordered.' },
      { i: 'Q2 fill rate, order-line basis (as presented)', v: Q2.fillLinePct, n: '' },
      { i: 'Q2 fill rate restated on case basis', v: FILL_RESTATED.q2CasePct, n: 'Restated by Operations Controller, September 2026' },
      { i: 'Q3 fill rate, both bases', v: 'See Monthly_DC', n: 'Columns "Order lines filled complete" (line basis) and "Lines filled, case basis".' },
      { i: 'Company rates', v: 'From totals', n: 'Company OTIF and fill rate are calculated from total orders and lines across DCs, not by averaging DC percentages.' }] },
    { name: 'Safety_Log', columns: [{ header: 'Incident ID', key: 'id', width: 14 }, { header: 'DC', key: 'dc', width: 8 }, { header: 'Date', key: 'date', width: 12 }, { header: 'Type', key: 'type', width: 12 },
      { header: 'Description', key: 'desc', width: 52 }, { header: 'Lost days', key: 'lostDays', width: 10 }, { header: 'Classification', key: 'cls', width: 48 }, { header: 'Last updated', key: 'updated', width: 13 }], rows: SAFETY_LOG },
    { name: 'Overtime', columns: [{ header: 'DC', key: 'dc', width: 12 }, { header: 'Month', key: 'm', width: 12 }, { header: 'Overtime hours', key: 'h', numFmt: num, width: 16 }], rows: [
      ...['Apr', 'May', 'Jun'].map((m, i) => ({ dc: 'Surabaya', m: `${m} 2026`, h: [13900, 13700, 13600][i] })),
      ...MONTHS.map((m, i) => ({ dc: 'Surabaya', m: `${m} 2026`, h: OVERTIME_Q3.SBY[i] }))] },
    { name: 'Rates', columns: [{ header: 'Currency', key: 'c', width: 12 }, { header: '2026 budget rate (IDR)', key: 'r', numFmt: num, width: 22 }, { header: 'Note', key: 'n', width: 60 }], rows: [
      { c: 'MYR', r: 3550, n: 'Applied to Johor Bahru costs in Monthly_DC. Spot rates are not used for management reporting.' }] },
  ], { readme: DATA_README, title: 'Q3 2026 Distribution KPI workbook', creator: C.author.name });
}

export default async function build({ dir }) {
  const opt = (t, who) => ({ title: t, creator: who });
  await writeDocx(join(dir, FILES.request), REQUEST, opt('QBR request and deck standard', C.requester.name));
  await writeDocx(join(dir, FILES.report), REPORT, opt('Distribution Operations Performance Report Q3 2026 v1.0', C.author.name));
  await writeWorkbook(join(dir, FILES.data));
  await writeDocx(join(dir, FILES.erratum), ERRATUM_MAIL, opt('Correction to Q3 volumes Surabaya September', C.controller.name));
  await writeQ2Deck(join(dir, FILES.q2deck));
  await writeTemplate(join(dir, FILES.template));
  const k = answerKey();
  const fmtV = (r) => (r.unit === 'IDR' ? 'IDR ' + n(r.value) : r.unit === '%' ? r.value.toFixed(1) + '%' : r.unit === 'days' ? r.value.toFixed(1) + ' days' : String(r.value));
  const fmtT = (r) => (r.unit === 'IDR' ? 'IDR ' + n(r.target) : r.unit === '%' ? r.target.toFixed(1) + '%' : String(r.target));
  writeKitReadme(dir, {
    title: `Quarterly report to leadership deck (${C.company}, Q3 2026)`,
    scenario: 'x-report-deck-017',
    contents: [
      `${FILES.request}: the Chief of Staff's request, the Direksi's three questions and the QBR deck standard (rules)`,
      `${FILES.report}: the report you received (about 10 pages) (v1.0, 1 October)`,
      `${FILES.data}: the KPI workbook issued with the report (Safety_Log refreshed 2 October)`,
      `${FILES.erratum}: the Operations Controller's correction, sent the evening before you start`,
      `${FILES.q2deck}: last quarter's deck with the three commitments`,
      `${FILES.template}: the QBR template to build in`,
    ],
    setup: [
      'Upload files 01-06 to one folder in your own OneDrive for work (or attach them where the scenario page says). Open each once.',
      'Keep this README out of Copilot; it contains the answer key.',
      'Follow the steps for your tier on the scenario page: Copilot Chat (Basic), Microsoft 365 Copilot (Premium) or Copilot Cowork.',
    ],
    spoilers: [
      ...k.scorecard.map((r) => `${r.kpi}: ${fmtV(r)} | target ${fmtT(r)} | ${r.change} vs Q2 | ${r.rag}`),
      `T1 headline month: the report headlines September OTIF ${k.traps.T1.reportedHeadline.toFixed(1)}%; the quarter is ${k.traps.T1.quarter}%.`,
      `T2 averaging: the average of the four DC percentages is ${k.traps.T2.simpleAverage}% (${k.traps.T2.ragSimple}); from total orders it is ${k.traps.T2.weighted}% (${k.traps.T2.ragWeighted}), +${k.traps.T2.pts.toFixed(1)} pts on Q2.`,
      `T3 correction: cost per case IDR ${n(k.traps.T3.v1CostPerCase)} (${k.traps.T3.v1Rag}) in the report becomes IDR ${n(k.traps.T3.correctedCostPerCase)} (${k.traps.T3.correctedRag}) after removing ${n(ERRATUM.transferCases)} transfer cases; Surabaya IDR ${n(k.traps.T3.sbyV1)} -> IDR ${n(k.traps.T3.sbyCorrected)}.`,
      `T4 definition change: the report's +${k.traps.T4.reportedChange} pts fill rate compares case basis with line basis; like for like it is +${k.traps.T4.likeForLikeLine.toFixed(1)} pts (lines ${company(true).fillLinePct}% vs ${Q2.fillLinePct}%; cases ${k.traps.T4.reportedQ3Case}% vs ${FILL_RESTATED.q2CasePct}%).`,
      `T5 safety: the report says zero LTIs; Safety_Log HSE-2026-088 (Medan, 19 Aug) was reclassified to a lost-time injury on 2 Oct. 1 LTI, LTIFR ${k.traps.T5.ltifr}, Red.`,
      `T6 utilisation: "excellent utilisation" is a capacity risk. Cikarang ${k.traps.T6.ckr}% average is ${k.traps.T6.rag}; September month end ${k.traps.T6.ckrSep.toFixed(1)}% is ${k.traps.T6.sepRag}. Q4 forecast about 96%.`,
      `T7 small count: complaints ${k.traps.T7.q2} -> ${k.traps.T7.q3} (+5, Amber); do not headline +${k.traps.T7.pctChange}%.`,
      `T8 commitments: ${k.traps.T8.statuses.join('; ')}. Surabaya overtime ${n(k.traps.T8.overtimeQ3)} hours = ${k.traps.T8.overtimeCutPct.toFixed(1)}% below Q2, not 20%.`,
      'T9 people: Appendix C (named disciplinary warning and picker ranking) must not appear in the deck.',
      `T10 decision: the overflow warehouse (IDR ${DECISION.overflow.cost} billion a year) and the carrier tender are decisions requested, not approved.`,
      `Deck: ${C.maxSlides} slides or fewer in the template; notes with sources on every content slide.`,
    ],
  });
}

function writeKitReadme(dir, { title, scenario, contents, setup, spoilers }) {
  writeText(join(dir, 'README.txt'), [
    title, '='.repeat(title.length), '', NOTICE, '',
    `Scenario: https://hmarofiq.github.io/copilot-scenarios-asean/scenarios/${scenario}/`, '',
    'CONTENTS', ...contents.map((c) => `  - ${c}`), '',
    'SETUP (your own work tenant; fictional data only)', ...setup.map((s, i) => `  ${i + 1}. ${s}`), '',
    'ANSWER KEY (spoilers: open only after you have built your deck)', ...spoilers.map((s) => `  - ${s}`), '',
  ].join('\n'));
}