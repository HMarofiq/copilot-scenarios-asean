// Holding portfolio review: 20 fictional subsidiaries reporting in inconsistent formats.
// Traps: one missing (late), one in millions instead of billions, one in USD, one scanned-style
// (image only, unreadable), and KPI labels that differ by subsidiary.
import { join } from 'node:path';
import { entity } from '../../canon/zava.mjs';

const HOLDING = entity('zid'); // PT Zava Indonesia Tbk
const HOLD_SHORT = HOLDING.short; // Zava Indonesia
import { rng, writeXlsx, writePptx, writeText, writeReadme, NOTICE } from '../lib.mjs';

const SECTORS = ['Energy', 'Logistics', 'Agribusiness', 'Property', 'Digital'];
const LABELS = [
  { rev: 'Revenue', ebitda: 'EBITDA', capex: 'Capex', hc: 'Headcount' },
  { rev: 'Pendapatan', ebitda: 'EBITDA', capex: 'Belanja Modal', hc: 'Jumlah Pegawai' },
  { rev: 'Net Sales', ebitda: 'Operating EBITDA', capex: 'Capital Expenditure', hc: 'FTE' },
  { rev: 'Total Revenue', ebitda: 'EBITDA (adj.)', capex: 'CAPEX', hc: 'Employees' },
];
export const TRAPS = { late: 'SUB-07', millions: 'SUB-11', usd: 'SUB-15', unreadable: 'SUB-19' };
const USD_RATE = 16_000; // IDR per USD for the exercise, stated in the target sheet

export function generate() {
  const r = rng(314);
  return Array.from({ length: 20 }, (_, i) => {
    const id = `SUB-${String(i + 1).padStart(2, '0')}`;
    const sector = SECTORS[i % 5];
    const target = { rev: r.int(300, 2400), ebitda: 0, capex: r.int(20, 300), hc: r.int(150, 4000) };
    target.ebitda = Math.round(target.rev * (0.12 + r.next() * 0.18));
    const perf = [0.78, 0.86, 0.93, 0.97, 1.02, 1.08][r.int(0, 5)];
    const actual = { rev: Math.round(target.rev * perf), ebitda: Math.round(target.ebitda * (perf - 0.03 + r.next() * 0.06)), capex: Math.round(target.capex * (0.6 + r.next() * 0.5)), hc: Math.round(target.hc * (0.95 + r.next() * 0.08)) };
    const pct = actual.rev / target.rev;
    const rag = pct < 0.9 ? 'Red' : pct <= 1 ? 'Amber' : 'Green';
    return { id, name: `Zava ${sector} ${String.fromCharCode(65 + Math.floor(i / 5))}`, sector, target, actual, rag, labels: LABELS[i % 4], format: i % 3 === 0 ? 'pptx' : 'xlsx' };
  });
}

export default async function build({ dir }) {
  const subs = generate();
  const c = (header, key, width = 16, numFmt) => ({ header, key, width, numFmt });
  await writeXlsx(join(dir, 'FICTIONAL_KPI_Targets_FY2026.xlsx'), [{
    name: 'Targets',
    columns: [c('Subsidiary ID', 'id', 13), c('Name', 'name', 28), c('Sector', 'sector', 14), c('Revenue target (IDR bn)', 'rev', 14), c('EBITDA target (IDR bn)', 'ebitda', 14), c('Capex budget (IDR bn)', 'capex', 14), c('Headcount plan', 'hc', 12)],
    rows: subs.map((s) => ({ id: s.id, name: s.name, sector: s.sector, ...s.target })),
  }], { readme: [`${HOLDING.legal} (fictional). September 2026 year-to-date targets.`, 'All figures IDR billions unless stated. Exercise exchange rate: 1 USD = 16,000 IDR.'] });

  for (const s of subs) {
    const folder = join(dir, 'Portfolio Reports', `${s.id} ${s.name}`);
    if (s.id === TRAPS.late) { writeText(join(folder, 'README.txt'), `${NOTICE}\n\nSeptember report not yet uploaded.\n`); continue; }
    let a = { ...s.actual }, unit = 'IDR bn';
    if (s.id === TRAPS.millions) { a = { rev: a.rev * 1000, ebitda: a.ebitda * 1000, capex: a.capex * 1000, hc: a.hc }; unit = 'IDR mn'; }
    if (s.id === TRAPS.usd) { a = { rev: +(a.rev * 1e9 / USD_RATE / 1e6).toFixed(1), ebitda: +(a.ebitda * 1e9 / USD_RATE / 1e6).toFixed(1), capex: +(a.capex * 1e9 / USD_RATE / 1e6).toFixed(1), hc: a.hc }; unit = 'USD mn'; }
    const L = s.labels;
    if (s.id === TRAPS.unreadable) {
      await writePptx(join(folder, `FICTIONAL_${s.id}_Sept_Report.pptx`), [{ title: `${s.name}: September 2026` }, { title: 'KPI summary', bullets: ['[Scanned image of printed KPI table pasted here: no machine-readable text]'] }], { title: s.id });
      continue;
    }
    if (s.format === 'pptx') {
      await writePptx(join(folder, `FICTIONAL_${s.id}_Sept_Report.pptx`), [
        { title: `${s.name}: September 2026 management report` },
        { title: `KPI summary (${unit}, YTD)`, table: [['KPI', 'Actual'], [L.rev, a.rev], [L.ebitda, a.ebitda], [L.capex, a.capex], [L.hc, a.hc]] },
        { title: 'Highlights', bullets: ['Operations stable.', `${L.rev} ${s.actual.rev >= s.target.rev ? 'ahead of' : 'behind'} plan; see commentary.`] },
      ], { title: s.id });
    } else {
      await writeXlsx(join(folder, `FICTIONAL_${s.id}_Sept_Report.xlsx`), [{
        name: 'KPIs', columns: [c('KPI', 'k', 26), c(`Actual YTD (${unit})`, 'v', 18, '#,##0.0')],
        rows: [{ k: L.rev, v: a.rev }, { k: L.ebitda, v: a.ebitda }, { k: L.capex, v: a.capex }, { k: L.hc, v: a.hc }],
      }], { readme: [`${s.name} (fictional) September 2026 report.`] });
    }
  }

  await writeXlsx(join(dir, 'ANSWER_KEY_portfolio.xlsx'), [{
    name: 'Portfolio',
    columns: [c('Subsidiary', 'id', 11), c('Name', 'name', 28), c('Revenue actual (IDR bn)', 'rev', 14), c('Revenue target (IDR bn)', 'trev', 14), c('% of target', 'pct', 11, '0%'), c('RAG', 'rag', 8), c('Note', 'note', 50)],
    rows: subs.map((s) => ({ id: s.id, name: s.name, rev: s.actual.rev, trev: s.target.rev, pct: s.actual.rev / s.target.rev, rag: s.id === TRAPS.late || s.id === TRAPS.unreadable ? 'n/a' : s.rag,
      note: { [TRAPS.late]: 'No report uploaded: must appear on the could-not-read list', [TRAPS.millions]: 'Reported in IDR millions: divide by 1,000', [TRAPS.usd]: 'Reported in USD millions: convert at 16,000', [TRAPS.unreadable]: 'Image only: must appear on the could-not-read list' }[s.id] ?? '' })),
  }], { readme: ['Presenter answer key. RAG on revenue vs target: Red below 90%, Amber 90 to 100%, Green above 100%.'] });

  const counts = subs.filter((s) => ![TRAPS.late, TRAPS.unreadable].includes(s.id)).reduce((m, s) => ({ ...m, [s.rag]: (m[s.rag] ?? 0) + 1 }), {});
  writeReadme(dir, {
    title: 'Demo kit: Holding portfolio review from subsidiary reports', scenario: 'gov-portfolio-004',
    contents: ['FICTIONAL_KPI_Targets_FY2026.xlsx', 'Portfolio Reports/ (20 subsidiary folders, Excel and PowerPoint mix)', 'ANSWER_KEY_portfolio.xlsx (presenter only)'],
    setup: ['Create a SharePoint site called Portfolio Reports in the demo tenant.', 'Upload the 20 folders and the target sheet.', 'Run the Cowork prompt from the scenario.'],
    spoilers: [
      `Readable subsidiaries: ${counts.Red ?? 0} Red, ${counts.Amber ?? 0} Amber, ${counts.Green ?? 0} Green.`,
      `Could-not-read list must contain ${TRAPS.late} (not uploaded) and ${TRAPS.unreadable} (image only).`,
      `${TRAPS.millions} reports in IDR millions and ${TRAPS.usd} in USD millions. If either shows as a huge outlier or a tiny Red, units were not normalised.`,
      'KPI labels vary: Pendapatan, Net Sales, Total Revenue all mean revenue; FTE and Jumlah Pegawai mean headcount.',
    ],
  });
}
