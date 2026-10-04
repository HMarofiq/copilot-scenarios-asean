// Monthly KPI narrative for a holding company. Traps: KPIs where lower is better, a KPI with no
// target, August restated after audit, and blank comments that must not be filled with invented causes.
import { join } from 'node:path';
import { entity } from '../../canon/zava.mjs';

const HOLDING = entity('zid'); // PT Zava Indonesia Tbk
const HOLD_SHORT = HOLDING.short; // Zava Indonesia
import { writeXlsx, writeReadme } from '../lib.mjs';

export const KPIS = [
  { kpi: 'Revenue', unit: 'IDR bn', better: 'Higher', target: 2100, aug: 1980, sep: 2050, comment: 'Two large contracts slipped to October.' },
  { kpi: 'EBITDA margin', unit: '%', better: 'Higher', target: 20, aug: 19.2, sep: 19.8, comment: '' },
  { kpi: 'Cost-to-income ratio', unit: '%', better: 'Lower', target: 55, aug: 57, sep: 54, comment: 'Shared-services savings started in September.' },
  { kpi: 'LTIFR', unit: 'per million hours', better: 'Lower', target: 0.5, aug: 0.62, sep: 0.41, comment: 'No lost-time injury in September.' },
  { kpi: 'Days sales outstanding', unit: 'days', better: 'Lower', target: 45, aug: 49, sep: 51, comment: 'Two state customers paid late.' },
  { kpi: 'On-time delivery', unit: '%', better: 'Higher', target: 95, aug: 93, sep: 96, comment: '' },
  { kpi: 'Capex execution', unit: '% of plan', better: 'Higher', target: 70, aug: 58, sep: 61, comment: 'Tender for plant upgrade re-issued.' },
  { kpi: 'Employee engagement index', unit: 'points', better: 'Higher', target: null, aug: 71, sep: 73, comment: 'Target to be set after survey redesign.' },
  { kpi: 'Customer complaints', unit: 'count', better: 'Lower', target: 120, aug: 140, sep: 131, comment: '' },
  { kpi: 'Energy intensity', unit: 'GJ per tonne', better: 'Lower', target: 3.2, aug: 3.4, sep: 3.1, comment: 'New kiln burner commissioned.' },
  { kpi: 'Digital adoption', unit: '% of users', better: 'Higher', target: 60, aug: 52, sep: 63, comment: '' },
  { kpi: 'Working capital days', unit: 'days', better: 'Lower', target: 60, aug: 58, sep: 62, comment: 'Inventory build ahead of Q4 shutdown.' },
];
export const AUG_REVENUE_BEFORE_RESTATEMENT = 2010;

export const status = (k) => (k.target == null ? 'No target' : (k.better === 'Higher' ? k.sep >= k.target : k.sep <= k.target) ? 'Met' : 'Not met');
// Relative gap in the bad direction (positive = worse than target).
export const gap = (k) => (k.target == null ? null : k.better === 'Higher' ? (k.target - k.sep) / k.target : (k.sep - k.target) / k.target);
export const topConcerns = () => KPIS.filter((k) => status(k) === 'Not met').sort((a, b) => gap(b) - gap(a)).slice(0, 3).map((k) => k.kpi);

export default async function build({ dir }) {
  const c = (header, key, width = 14) => ({ header, key, width });
  await writeXlsx(join(dir, 'FICTIONAL_Zava_KPI_Pack_Sep2026.xlsx'), [{
    name: 'KPIs',
    columns: [c('KPI', 'kpi', 28), c('Unit', 'unit', 18), c('Better when', 'better', 12), c('Target Sep', 'target', 11), c('Actual Aug (restated)', 'aug', 14), c('Actual Sep', 'sep', 11), c('Comment', 'comment', 48)],
    rows: KPIS.map((k) => ({ ...k, target: k.target ?? 'n/a', comment: k.comment })),
  }], { readme: [`${HOLDING.legal} (fictional) monthly KPI pack, September 2026 year to date.`, `August revenue was restated from ${AUG_REVENUE_BEFORE_RESTATEMENT} to ${KPIS[0].aug} (IDR bn) after an audit adjustment. Use the restated figure.`, 'Better when: Higher means above target is good; Lower means below target is good.', 'A KPI with no target shows n/a in Target Sep.'] });

  const met = KPIS.filter((k) => status(k) === 'Met').map((k) => k.kpi);
  const notMet = KPIS.filter((k) => status(k) === 'Not met').map((k) => k.kpi);
  writeReadme(dir, {
    title: 'Demo kit: Monthly KPI performance narrative and deck', scenario: 'gov-kpi-narrative-008',
    contents: ['FICTIONAL_Zava_KPI_Pack_Sep2026.xlsx (12 KPIs with polarity, restated August, comments)'],
    setup: ['Upload the workbook to OneDrive in the demo tenant and open it once in Excel for the web.', 'Run the scenario prompts in Copilot Chat.'],
    spoilers: [
      `Met (${met.length}): ${met.join(', ')}.`,
      `Not met (${notMet.length}): ${notMet.join(', ')}.`,
      'No target (1): Employee engagement index. It must not be called met or missed.',
      'TRAP: Cost-to-income, LTIFR and Energy intensity are BELOW target, which is good. Days sales outstanding, Complaints and Working capital days are ABOVE target, which is bad.',
      `Top 3 concerns by relative gap: ${topConcerns().join(', ')}.`,
      `TRAP: August revenue is ${KPIS[0].aug} (restated), not ${AUG_REVENUE_BEFORE_RESTATEMENT}.`,
      'Four KPIs have no comment. The narrative must say no explanation was provided, not invent one.',
    ],
  });
}
