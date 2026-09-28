// Board paper from divisional inputs for a proposed 30% stake acquisition. Traps: Finance and
// Operations quote different deal values; one input (HR) is missing; Legal has a condition
// precedent; Risk rates the deal High. The paper must surface conflicts, not resolve them.
import { join } from 'node:path';
import { writeDocx, writeReadme } from '../lib.mjs';

export const CONFLICT = { finance: 'IDR 850 billion', operations: 'IDR 800 billion' };
const inputs = {
  Finance: ['# Divisional input: Finance', 'Proposal: acquire a 30% stake in PT Northwind Logistik (fictional) for IDR 850 billion, funded 60% from internal cash and 40% from a bank facility.', 'Expected IRR 14.2% against a hurdle rate of 12%. Payback 7 years.', 'Dividend policy of the target: 40% of net profit.'],
  Operations: ['# Divisional input: Operations', 'The stake (valued at IDR 800 billion in the latest term sheet) gives us access to 12 cold-chain warehouses in Java and Sumatra.', 'Integration: shared fleet scheduling from month 6; no redundancies planned.'],
  Legal: ['# Divisional input: Legal', 'Condition precedent: approval of the competition authority (KPPU notification) before completion.', 'Shareholder agreement gives us two of seven board seats and a veto on new debt above IDR 200 billion.', 'Due diligence found one pending tax dispute of IDR 35 billion at the target.'],
  Risk: ['# Divisional input: Risk', 'Overall risk rating: High.', 'Key risks: integration of IT systems; customer concentration (top 3 customers are 48% of the target\'s revenue); pending tax dispute.', 'Mitigations: price adjustment mechanism for the tax dispute; 100-day integration plan.'],
};
export const MISSING = 'Human Resources';

export default async function build({ dir }) {
  for (const [div, blocks] of Object.entries(inputs)) await writeDocx(join(dir, 'Inputs', `FICTIONAL_Input_${div}.docx`), [...blocks, `**Submitted:** 22 September 2026. **Division:** ${div}. **Fabrikam Holding Group (fictional).**`], { title: `Input ${div}` });
  await writeDocx(join(dir, 'FICTIONAL_Template_Board_Paper.docx'), [
    '# Board paper / Kertas Dewan', '**Meeting:** Board of Directors, [date]. **Agenda item:** [ ]. **Presented by:** [ ]. **Classification:** Highly Confidential.',
    ...[['1. Purpose', 'Finance'], ['2. Executive summary', 'Drafter, from the other sections'], ['3. Background', 'Operations'], ['4. Proposal', 'Finance'], ['5. Financial impact', 'Finance'],
      ['6. Risks and mitigations', 'Risk'], ['7. Legal and regulatory', 'Legal'], ['8. People impact', 'Human Resources'], ['9. Proposed resolution', 'Drafter, from the other sections']]
      .flatMap(([h, owner]) => [`## ${h}`, `*Section owner: ${owner}*`, '[ ]']),
  ], { title: 'Board paper template' });
  writeReadme(dir, {
    title: 'Demo kit: Board paper from divisional inputs', scenario: 'gov-board-paper-013',
    contents: ['Inputs/ (Finance, Operations, Legal, Risk: HR has not submitted)', 'FICTIONAL_Template_Board_Paper.docx'],
    setup: ['Upload to OneDrive in the demo tenant and open each file once in Word for the web.', 'Run the scenario prompts in Copilot Chat.'],
    spoilers: [
      `TRAP: Finance says ${CONFLICT.finance}, Operations says ${CONFLICT.operations}. The paper must flag this for the Corporate Secretary, not pick one.`,
      `TRAP: ${MISSING} did not submit an input. People impact must be [TO CONFIRM]; "no redundancies planned" comes from Operations, not HR.`,
      'Condition precedent (competition authority approval) must appear in Legal and in the resolution.',
      'Risk rating High and the IDR 35 bn tax dispute must appear in Risks.',
    ],
  });
}
