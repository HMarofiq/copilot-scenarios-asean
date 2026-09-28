// Monthly management accounts: P&L variance commentary by cost line. Traps: for cost lines a
// higher actual is unfavourable; a line with zero budget (no % variance); a one-off
// reclassification explained in Notes; materiality needs both % and absolute thresholds.
import { join } from 'node:path';
import { writeXlsx, writeReadme } from '../lib.mjs';

export const THRESH = { pct: 0.05, abs: 500 }; // IDR mn
export const LINES = [
  { line: 'Revenue', type: 'Income', budget: 42000, actual: 39900, ly: 38500 },
  { line: 'Cost of sales', type: 'Cost', budget: 27300, actual: 25700, ly: 25100 },
  { line: 'Staff costs', type: 'Cost', budget: 6200, actual: 6950, ly: 5900 },
  { line: 'Rent and utilities', type: 'Cost', budget: 1800, actual: 1830, ly: 1760 },
  { line: 'IT and software', type: 'Cost', budget: 1400, actual: 2150, ly: 1250 },
  { line: 'Marketing', type: 'Cost', budget: 900, actual: 620, ly: 850 },
  { line: 'Travel', type: 'Cost', budget: 450, actual: 470, ly: 430 },
  { line: 'Professional fees', type: 'Cost', budget: 0, actual: 780, ly: 120 },
  { line: 'Depreciation', type: 'Cost', budget: 1100, actual: 1105, ly: 1040 },
  { line: 'Other income', type: 'Income', budget: 300, actual: 290, ly: 410 },
];
export const NOTES = [
  { line: 'Staff costs', note: 'Includes IDR 500 mn one-off severance for the Surabaya branch closure.' },
  { line: 'IT and software', note: 'Cloud licences of IDR 600 mn were reclassified from Capex to Opex in September after audit review; the budget assumed Capex.' },
  { line: 'Professional fees', note: 'Legal advisers for the proposed acquisition; not budgeted.' },
];

export const variance = (l) => (l.type === 'Income' ? l.actual - l.budget : l.budget - l.actual); // positive = favourable
export const pct = (l) => (l.budget === 0 ? null : variance(l) / l.budget);
export const material = (l) => Math.abs(variance(l)) >= THRESH.abs && (pct(l) === null || Math.abs(pct(l)) >= THRESH.pct);

export default async function build({ dir }) {
  const c = (header, key, width = 14, numFmt) => ({ header, key, width, numFmt });
  await writeXlsx(join(dir, 'FICTIONAL_Management_Accounts_Sep2026.xlsx'), [
    { name: 'PL', columns: [c('Line', 'line', 22), c('Type', 'type', 9), c('Budget Sep YTD', 'budget', 14, '#,##0'), c('Actual Sep YTD', 'actual', 14, '#,##0'), c('Last year Sep YTD', 'ly', 16, '#,##0')], rows: LINES },
    { name: 'Notes', columns: [c('Line', 'line', 22), c('Note from cost centre owner', 'note', 90)], rows: NOTES },
  ], { readme: ['Contoso Group (fictional) management accounts, September 2026 year to date, IDR millions.', 'Materiality for commentary: variance at least IDR 500 mn AND at least 5% of budget (lines with no budget: IDR 500 mn only).'] });

  const m = LINES.filter(material);
  writeReadme(dir, {
    title: 'Demo kit: Monthly management report variance commentary', scenario: 'x-mgmt-report-011',
    contents: ['FICTIONAL_Management_Accounts_Sep2026.xlsx (PL and Notes sheets)'],
    setup: ['Upload the workbook to OneDrive in the demo tenant and open it once in Excel for the web.', 'Run the scenario prompt in Copilot Chat.'],
    spoilers: [
      `Material lines (${m.length}): ` + m.map((l) => `${l.line} ${variance(l) >= 0 ? 'favourable' : 'unfavourable'} ${Math.abs(variance(l))}`).join('; ') + '.',
      'TRAP: Cost of sales is BELOW budget, which is favourable (+1,600). Staff costs and IT are above budget, which is unfavourable.',
      'TRAP: Professional fees have no budget, so no % variance; the 780 variance is still material.',
      'Rent, Travel, Depreciation, Other income are immaterial and must not get commentary.',
      'Marketing: 280 under budget is 31% but below IDR 500 mn, so immaterial.',
      'Only Staff costs, IT and Professional fees have explanations. Revenue and Cost of sales must be marked for the owner to explain.',
    ],
  });
}
