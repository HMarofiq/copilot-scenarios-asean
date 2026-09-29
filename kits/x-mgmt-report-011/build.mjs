// Demo kit x-mgmt-report-011: September month-end close for a two-entity group (Indonesia + Malaysia).
// Part A: variance analysis and Direksi commentary from the consolidated management P&L.
// Part B: build that consolidation in Excel from the two trial balances with Copilot in Excel.
// All numbers come from model.mjs, so the files and the answer key always agree.
import { join } from 'node:path';
import { writeDocx, writeXlsx, writeReadme, writeText, rng } from '../lib.mjs';
import * as M from './model.mjs';

export * from './model.mjs';
const r1 = (n) => Math.round(n * 10) / 10;
const bn = (m) => (m / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const idr = (m) => r1(m).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const MUL = { CNN: 1e6, CNM: 1e3 }; // model units -> full currency (IDR, MYR)

// Trial balance in full currency: debit positive, credit negative, sums to zero.
export function trialBalance(entity) {
  const rand = rng(entity === 'CNN' ? 11 : 29).next;
  const rows = [];
  for (const line of M.LINES) {
    const accts = M.COA[entity].filter((a) => a[2] === line.line);
    const total = Math.round(M.ACTUAL[entity][line.line] * MUL[entity]);
    const sign = line.line === 'Intercompany management fee' ? (M.IC_SIGN[entity] > 0 ? -1 : 1) : line.type === 'income' ? -1 : 1;
    // Contra accounts (negative share) are exact; others get a little noise; the largest account takes the rounding remainder.
    const big = accts.reduce((m, a) => (a[3] > m[3] ? a : m), accts[0] ?? [null, null, null, 0]);
    const amts = accts.map((a) => (a === big ? 0 : Math.round(total * a[3] * (a[3] < 0 ? 1 : 1 + (rand() - 0.5) * 0.03))));
    amts[accts.indexOf(big)] = total - amts.reduce((s, x) => s + x, 0);
    accts.forEach((a, i) => rows.push({ account: a[0], name: a[1], balance: sign * amts[i] }));
  }
  const pl = rows.reduce((s, r) => s + r.balance, 0);
  const bs = entity === 'CNN'
    ? { '1110': 412580331904, '1210': 1284993210550, '1220': 420000000, '1310': 1036440120300, '1510': 612300000000, '1520': 148900000000,
      '1530': 96450000000, '1590': -398700440210, '2110': -1152330901442, '2150': -84210330120, '2210': -46880120400, '2310': -620000000000, '3100': -500000000000 }
    : { '1000': 18420331, '1100': 41380220, '1200': 36220140, '1500': 22400000, '1590': -9310420, '2000': -38850210, '2100': -4120300, '2200': -119400, '3000': -10000000 };
  const re = entity === 'CNN' ? '3200' : '3100';
  bs[re] = -(pl + Object.values(bs).reduce((s, v) => s + v, 0));
  const bsRows = M.COA[entity].filter((a) => !a[2]).map((a) => ({ account: a[0], name: a[1], balance: bs[a[0]] }));
  return [...bsRows, ...rows].map((r) => ({ ...r, debit: r.balance > 0 ? r.balance : 0, credit: r.balance < 0 ? -r.balance : 0 }))
    .sort((a, b) => a.account.localeCompare(b.account));
}

export default async function build({ dir }) {
  const key = M.answerKey();
  const rows = key.rows;
  const R = Object.fromEntries(rows.map((r) => [r.line, r]));
  const tbCNN = trialBalance('CNN');
  const credit4910 = tbCNN.find((r) => r.account === '4910').debit / 1e6;

  // 01 Request from the CFO
  await writeDocx(join(dir, '01_Email_CFO_Direksi_pack_Sep2026.docx'), [
    '**From:** Andre Lawson, Chief Financial Officer',
    '**To:** Group FP&A',
    '**Cc:** Babak Shammas, Head of Financial Consolidation',
    '**Sent:** Monday, 5 October 2026 08:12',
    '**Subject:** Direksi pack, September 2026 YTD: management commentary by Wednesday 12:00',
    'Team,',
    'The Direksi meeting is on Thursday 8 October. I need the September YTD management commentary and the variance table from you by **Wednesday 7 October, 12:00**, so I can review it before the pre-read goes out at 17:00.',
    'Please follow the usual rules, and a few reminders from the August cycle:',
    '- **Numbers:** use the consolidated management P&L after the post-closing journals Babak posted this morning (PCJ-2026-09-001 to 003). Do not use the TB extract from 2 October for commentary.',
    '- **Materiality:** always comment on Revenue and Gross profit. For every other line, comment only if the variance to budget is at least IDR 2,500 million AND at least 5% of budget. If a line has no budget, IDR 2,500 million alone is enough.',
    '- **Direction:** favourable means better for profit. Income above budget is favourable; costs below budget are favourable. In August two cost lines were labelled the wrong way round in the draft, please check.',
    '- **Explanations:** only from the budget holders\' notes. If a note is missing or covers only part of a variance, write [Owner to explain] with the amount still unexplained. Do not fill the gap with our own guesses.',
    '- **Conflicts:** if a note quotes a number that does not match the ledger, use the ledger and flag it.',
    '- **Malaysia:** the MYR has been stronger than our budget rate. Please show how much of the Malaysian revenue variance is currency, so the Direksi do not read it as volume.',
    '- **Intercompany:** the management fee should net to zero on consolidation. If it does not, it is an open item for Babak, not income.',
    '- **Format:** same one-page structure as the August commentary: headline, variance table, commentary on material lines, open items.',
    'Budget holder notes are compiled in the notes file. Legal has still not sent theirs; chase them, but do not hold the pack.',
    'Thanks,',
    'Andre',
    'Andre Lawson | Chief Financial Officer | PT Contoso Niaga Nusantara',
  ], { title: 'Email from the CFO' });

  // 02, 03 Trial balances
  const tbCols = [{ header: 'Company code', key: 'cc', width: 13 }, { header: 'Account', key: 'account', width: 10 }, { header: 'Account name', key: 'name', width: 58 },
    { header: 'Debit', key: 'debit', width: 20, numFmt: '#,##0' }, { header: 'Credit', key: 'credit', width: 20, numFmt: '#,##0' }, { header: 'Balance', key: 'balance', width: 20, numFmt: '#,##0;(#,##0)' }];
  await writeXlsx(join(dir, '02_TB_PT_Contoso_Niaga_Nusantara_Sep2026.xlsx'), [{ name: 'TB', columns: tbCols, rows: tbCNN.map((r) => ({ cc: 'CN01', ...r })) }], {
    readme: ['Trial balance, PT Contoso Niaga Nusantara (company code CN01), period 01.2026 to 09.2026.', 'Currency: IDR (full rupiah). Balance = debit minus credit; credits are negative.',
      'Extracted from SAP ECC report S_ALR_87012277 on 2 October 2026 at 18:04. Post-closing journals posted after this extract are NOT included.'] });
  const tbCNM = trialBalance('CNM');
  await writeXlsx(join(dir, '03_TB_Contoso_Niaga_Malaysia_Sep2026.xlsx'), [{ name: 'TB', columns: tbCols, rows: tbCNM.map((r) => ({ cc: 'CM01', ...r })) }], {
    readme: ['Trial balance, Contoso Niaga Malaysia Sdn Bhd (company code CM01), January to September 2026.', 'Currency: MYR (full ringgit). Balance = debit minus credit; credits are negative.',
      'Extracted 2 October 2026 by the Johor Bahru finance team. Account 6995 was opened in September 2026.'] });

  // 04 Group close pack
  const mapRows = ['CNN', 'CNM'].flatMap((e) => M.COA[e].filter((a) => a[2] && !(e === M.UNMAPPED.entity && a[0] === M.UNMAPPED.account))
    .map((a) => ({ entity: e === 'CNN' ? 'CN01' : 'CM01', account: a[0], name: a[1], line: a[2], type: M.LINES.find((l) => l.line === a[2]).type === 'income' && a[2] !== 'Intercompany management fee' ? 'Income' : a[2] === 'Intercompany management fee' ? 'Intercompany' : 'Cost' })));
  const budgetRows = M.LINES.map((l) => ({ line: l.line, type: l.type === 'income' ? 'Income' : 'Cost', cnn: M.BUDGET.CNN[l.line], cnm_myr: M.BUDGET.CNM[l.line], cnm: r1(M.BUDGET.CNM[l.line] * M.FX.budget / 1000), group: R[l.line].budget }));
  const icRows = M.IC_MONTHS.map((mo) => {
    const booked = !M.IC_CNM_MISSING.includes(mo);
    return { month: `${mo} 2026`, cnn: M.IC_MONTHLY.cnnIdrM, cnm_myr: booked ? M.IC_MONTHLY.cnmMyrK * 1000 : '', status: booked ? 'Agreed' : 'Invoice IC-CN01-2026-09 sent 30 Sep; not yet booked by CM01' };
  });
  await writeXlsx(join(dir, '04_Group_Close_Pack_Sep2026.xlsx'), [
    { name: 'Policy', columns: [{ header: 'Rule', key: 'k', width: 26 }, { header: 'Group reporting policy (FIN-POL-07, rev. 3)', key: 'v', width: 120 }], rows: [
      { k: 'Reporting currency', v: 'IDR million, one decimal.' },
      { k: 'Sign convention', v: 'Trial balances: debit positive, credit negative. Management P&L: all lines shown as positive amounts; the Type column says whether a line is income or cost.' },
      { k: 'Translation (P&L)', v: 'Subsidiary P&L translated at the year-to-date average rate. Budget is held at the budget rate. The closing rate is used for the balance sheet only.' },
      { k: 'Mapping', v: 'Every P&L account must map to one management line. An account that is not in the Mapping sheet is reported to Group Reporting and mapped provisionally by its nature; it is never left out.' },
      { k: 'Post-closing journals', v: 'Journals posted after the TB extract must be applied before reporting (see Post-closing journals).' },
      { k: 'Intercompany', v: 'Intercompany management fees must net to zero in the Group column. A difference is reported as an open item to the Head of Financial Consolidation. FP&A does not adjust it.' },
      { k: 'Materiality for commentary', v: 'Always comment on Revenue and Gross profit. Other lines: variance to budget at least IDR 2,500 million AND at least 5% of budget; if budget is zero, IDR 2,500 million alone.' },
      { k: 'Favourable', v: 'Income above budget, or cost below budget.' },
    ], table: false },
    { name: 'Mapping', columns: [{ header: 'Entity', key: 'entity', width: 8 }, { header: 'Account', key: 'account', width: 9 }, { header: 'Account name', key: 'name', width: 58 },
      { header: 'Management line', key: 'line', width: 30 }, { header: 'Type', key: 'type', width: 13 }], rows: mapRows },
    { name: 'FX rates', columns: [{ header: 'Rate', key: 'k', width: 34 }, { header: 'IDR per 1 MYR', key: 'v', width: 16, numFmt: '#,##0' }, { header: 'Use', key: 'u', width: 60 }], rows: [
      { k: 'YTD average Jan-Sep 2026', v: M.FX.avg, u: 'Translate CM01 profit and loss' }, { k: 'Closing 30 Sep 2026', v: M.FX.closing, u: 'Balance sheet only' },
      { k: 'Budget 2026', v: M.FX.budget, u: 'Budget translation' }] },
    { name: 'Budget', columns: [{ header: 'Management line', key: 'line', width: 30 }, { header: 'Type', key: 'type', width: 9 }, { header: 'CN01 budget (IDR m)', key: 'cnn', width: 20, numFmt: '#,##0.0' },
      { header: 'CM01 budget (MYR k)', key: 'cnm_myr', width: 20, numFmt: '#,##0.0' }, { header: 'CM01 budget (IDR m, budget rate)', key: 'cnm', width: 30, numFmt: '#,##0.0' }, { header: 'Group budget (IDR m)', key: 'group', width: 21, numFmt: '#,##0.0' }], rows: budgetRows },
    { name: 'Last year', columns: [{ header: 'Management line', key: 'line', width: 30 }, { header: 'Group Sep 2025 YTD (IDR m)', key: 'ly', width: 26, numFmt: '#,##0.0' }], rows: M.LINES.map((l) => ({ line: l.line, ly: M.LY[l.line] })) },
    { name: 'Intercompany', columns: [{ header: 'Month', key: 'month', width: 12 }, { header: 'CN01 fee income (IDR m)', key: 'cnn', width: 24, numFmt: '#,##0.0' },
      { header: 'CM01 fee expense (MYR)', key: 'cnm_myr', width: 22, numFmt: '#,##0' }, { header: 'Status', key: 'status', width: 62 }], rows: icRows },
    { name: 'Post-closing journals', columns: [{ header: 'Journal', key: 'id', width: 18 }, { header: 'Entity', key: 'e', width: 8 }, { header: 'Posted', key: 'date', width: 12 }, { header: 'Posted by', key: 'by', width: 16 },
      { header: 'Debit account', key: 'dr', width: 13 }, { header: 'Credit account', key: 'cr', width: 14 }, { header: 'Amount (IDR)', key: 'amt', width: 18, numFmt: '#,##0' }, { header: 'Description', key: 'text', width: 90 }],
      rows: M.JOURNALS.map((j) => ({ ...j, e: 'CN01', amt: j.amount * 1e6 })) },
  ], { readme: ['Group close pack, September 2026 YTD. Owner: Babak Shammas, Head of Financial Consolidation.', 'Sheets: Policy, Mapping, FX rates, Budget, Last year, Intercompany, Post-closing journals.'] });

  // 05 Consolidation system output (Part A input, and the reference Part B is checked against)
  const out = rows.map((r) => ({ line: r.line, type: ['Gross profit', 'Profit before tax'].includes(r.line) ? 'Subtotal' : r.type === 'income' ? 'Income' : 'Cost',
    cnn: r.cnn ?? '', cnm: r.cnm ?? '', actual: r.actual, budget: r.budget, ly: r.ly }));
  for (const t of out) if (t.type === 'Subtotal') { const g = t.line === 'Gross profit'; const s = (k) => (g ? R.Revenue[k] - R['Cost of sales'][k] : null); if (g) { t.cnn = r1(s('cnn')); t.cnm = r1(s('cnm')); } }
  const pbt = out.find((t) => t.line === 'Profit before tax');
  pbt.cnn = r1(M.LINES.reduce((s, l) => s + (l.type === 'income' ? 1 : -1) * R[l.line].cnn, 0));
  pbt.cnm = r1(M.LINES.reduce((s, l) => s + (l.line === 'Intercompany management fee' ? 1 : l.type === 'income' ? 1 : -1) * R[l.line].cnm, 0));
  await writeXlsx(join(dir, '05_Group_Management_PL_Sep2026.xlsx'), [
    { name: 'Consolidated', columns: [{ header: 'Management line', key: 'line', width: 30 }, { header: 'Type', key: 'type', width: 10 },
      { header: 'CN01 (IDR m)', key: 'cnn', width: 16, numFmt: '#,##0.0' }, { header: 'CM01 (IDR m)', key: 'cnm', width: 16, numFmt: '#,##0.0' },
      { header: 'Group actual (IDR m)', key: 'actual', width: 20, numFmt: '#,##0.0' }, { header: 'Group budget (IDR m)', key: 'budget', width: 20, numFmt: '#,##0.0' },
      { header: 'Last year (IDR m)', key: 'ly', width: 18, numFmt: '#,##0.0' }], rows: out },
  ], { readme: ['Group management P&L, September 2026 YTD, IDR million. Output of the group consolidation run of 6 October 2026, 09:30.',
    'Includes post-closing journals PCJ-2026-09-001 to 003. CM01 translated at the YTD average rate of IDR 3,520 per MYR; budget at IDR 3,450.',
    'All lines are positive amounts; Type shows income, cost or subtotal. The intercompany line is CN01 fee income less CM01 fee expense and should be zero.'] });

  // 06 Budget holder notes
  const wh = { cnn: M.adjusted('CNN')['Warehouse & logistics'] - M.BUDGET.CNN['Warehouse & logistics'] };
  await writeDocx(join(dir, '06_Budget_holder_notes_Sep2026.docx'), [
    '# Budget holder notes, September 2026 YTD',
    'Compiled by Group FP&A from the notes submitted in the close portal. Amounts as written by each budget holder. Status as of Tuesday 6 October 2026, 09:00.',
    { table: [['Line', 'Owner', 'Received'], ['Revenue (Indonesia)', 'Mona Kane, Chief Sales Officer', '5 Oct'], ['Revenue (Malaysia)', 'Farah Aziz, Country Manager Malaysia', '5 Oct'],
      ['Staff costs', 'Rini Wulandari, HR Director', '29 Sep'], ['Warehouse & logistics', 'Rudi Hartono, Head of Distribution', '5 Oct'], ['IT & software', 'Lydia Bauer, Enterprise IT Architect', '5 Oct'],
      ['Marketing & promotion', 'Cecil Folk, Chief Marketing & Communications Officer', '5 Oct'], ['Travel & entertainment', 'Yusuf Pratama, Head of General Affairs', '2 Oct'],
      ['Professional fees', 'Legal Division', 'Not received']] },
    '## Revenue, Indonesia (Mona Kane, 5 Oct)',
    `Indonesia revenue closed at IDR ${bn(M.ACTUAL.CNN.Revenue)} bn against a budget of IDR ${bn(M.BUDGET.CNN.Revenue)} bn. Two things explain most of the gap. First, home-appliance sell-in was softer in Q3, about IDR 70 bn below plan, mainly refrigerators and washing machines at two regional chains. Second, average selling prices on televisions fell after the August price cut by our main brand principal, about IDR 45 bn. The Portal Mitra outage on 14 September had only a small direct effect on revenue: 1,146 partner orders worth about IDR 3.1 bn shipped one to three days late, and we issued late-delivery credit notes of IDR ${idr(credit4910)} million. The rest of the gap is spread across many partners.`,
    '## Revenue, Malaysia (Farah Aziz, 5 Oct)',
    `Malaysia revenue for January to September is MYR ${(M.ACTUAL.CNM.Revenue / 1000).toFixed(1)} million against a budget of MYR ${(M.BUDGET.CNM.Revenue / 1000).toFixed(1)} million, ahead by ${(((M.ACTUAL.CNM.Revenue - M.BUDGET.CNM.Revenue) / M.BUDGET.CNM.Revenue) * 100).toFixed(1)}%. The growth comes from Singapore re-export, where we added a new customer in June. Please note that group reporting translates the ringgit at the average rate, which has been stronger than the budget rate this year, so the rupiah figure will look better than our local result.`,
    '## Staff costs (Rini Wulandari, 29 Sep)',
    'Staff costs are over budget mainly because of the severance for the Medan DC consolidation, estimated at IDR 3.5 bn and booked to base salaries in September. Excluding the severance, staff costs are slightly over budget because of THR timing.',
    '## Warehouse & logistics (Rudi Hartono, 5 Oct)',
    `Biaya gudang dan logistik Indonesia di atas budget. Penyebab utama adalah pemulihan backlog setelah outage Portal Mitra 14 September: lembur tenaga outsourcing gudang dan truk pihak ketiga tambahan selama 14 sampai 21 September sebesar IDR 6,1 miliar. Sisanya masih kami analisis bersama Finance; kemungkinan terkait penyesuaian tarif angkutan, tetapi belum bisa kami pastikan.`,
    '## IT & software (Lydia Bauer, 5 Oct)',
    'IT & software is over budget because cloud consumption increased after we added capacity to Portal Mitra following the September outage. The Q3 cloud overage of IDR 1.45 bn was invoiced on 3 October and accrued by Finance on 5 October. The reserved-instance renewal in November should save about IDR 410 million a year from Q4.',
    '## Marketing & promotion (Cecil Folk, 5 Oct)',
    'Marketing is under budget. The Wingtip co-op campaign planned for September moved to October and November at Wingtip\'s request, so about IDR 5.3 bn will be spent in Q4. Finance also reversed a duplicate August accrual of IDR 0.9 bn for the same campaign on 5 October.',
    '## Travel & entertainment (Yusuf Pratama, 2 Oct)',
    'Travel is above budget because of more trips to the Johor Bahru hub for the network upgrade and site visits for Proyek Nusa.',
    '## Professional fees',
    'Note not received from Legal as of 6 October, 09:00.',
  ], { title: 'Budget holder notes' });

  // 07 Prior month commentary (house style)
  await writeDocx(join(dir, '07_Direksi_pack_Aug2026_commentary.docx'), [
    '# Group management commentary, August 2026 YTD',
    'PT Contoso Niaga Nusantara and subsidiary | IDR billion unless stated | Prepared by Group FP&A, reviewed by the CFO',
    '## Headline',
    'Group revenue for August YTD is IDR 6,512.4 bn, 0.6% below budget, with gross margin steady at 15.3%. Profit before tax is IDR 351.8 bn, 4.1% below budget, mainly because of higher warehouse and IT costs in Indonesia. Malaysia continues to trade ahead of plan.',
    '## Material variances against budget',
    { table: [['Line', 'Actual', 'Budget', 'Variance', '%', 'F/U'], ['Revenue', '6,512.4', '6,551.8', '(39.4)', '(0.6%)', 'U'], ['Gross profit', '998.1', '1,004.9', '(6.8)', '(0.7%)', 'U'],
      ['Warehouse & logistics', '110.6', '105.2', '(5.4)', '(5.1%)', 'U'], ['Marketing & promotion', '63.9', '67.8', '3.9', '5.8%', 'F']] },
    '## Commentary',
    '- **Revenue, IDR 39.4 bn (0.6%) unfavourable.** Home-appliance sell-in in Indonesia below plan at two regional chains (Mona Kane). Malaysia ahead of plan on Singapore re-export (Farah Aziz).',
    '- **Gross profit, IDR 6.8 bn (0.7%) unfavourable.** Driven by the revenue shortfall; gross margin unchanged at 15.3%.',
    '- **Warehouse & logistics, IDR 5.4 bn (5.1%) unfavourable.** Third-party trucking rates increased from July (Rudi Hartono).',
    '- **Marketing & promotion, IDR 3.9 bn (5.8%) favourable.** Timing of the Q3 digital campaign, now running in September (Cecil Folk).',
    '## Open items',
    '- Legal fees note outstanding (owner: Legal).',
    '- Intercompany management fee agreed for January to August.',
    '*Draft for CFO review. Numbers from the group consolidation after post-closing journals.*',
  ], { title: 'August commentary' });

  // Copilot in Excel custom skill (Take it further)
  writeText(join(dir, 'Excel_custom_skill', 'monthly-close-consolidation', 'SKILL.md'), `---
name: monthly-close-consolidation
description: Use when I ask to consolidate the monthly trial balances of CN01 and CM01 into the group management P&L, or to run the monthly close checks.
---

# Monthly close consolidation (CN01 + CM01)

Follow the rules in the Policy sheet of the group close pack. Use formulas that reference the source sheets, never typed values.

## Steps
1. Import the P&L accounts of both trial balances (account 4000 and above). Keep the company code and account number.
2. Map every account with the Mapping sheet. List any account that is not in the mapping on the Checks sheet, map it provisionally by its nature and mark it "provisional".
3. Flip signs so income and costs are positive amounts. Convert CN01 from IDR to IDR million and CM01 from MYR to IDR million at the YTD average rate.
4. Apply every journal in the Post-closing journals sheet to CN01.
5. Build the Consolidated sheet by management line in the order of the Budget sheet, with CN01, CM01, Group, Budget and Last year, plus Gross profit and Profit before tax.
6. Build the Checks sheet: each trial balance sums to zero; every P&L account is mapped; the intercompany line nets to zero, and if not, the difference and the month it comes from; Group equals CN01 plus CM01 on every line.
7. Do not adjust intercompany differences. Report them.
`);

  const k = key;
  writeReadme(dir, {
    title: 'Demo kit: Month-end close and Direksi commentary (two entities)', scenario: 'x-mgmt-report-011',
    contents: [
      '01_Email_CFO_Direksi_pack_Sep2026.docx: the request and the rules',
      '02_TB_PT_Contoso_Niaga_Nusantara_Sep2026.xlsx: Indonesian trial balance, full IDR, before post-closing journals',
      '03_TB_Contoso_Niaga_Malaysia_Sep2026.xlsx: Malaysian trial balance, full MYR',
      '04_Group_Close_Pack_Sep2026.xlsx: policy, mapping, FX, budget, last year, intercompany, post-closing journals',
      '05_Group_Management_PL_Sep2026.xlsx: the consolidated management P&L (system output); Part A starts here, Part B is checked against it',
      '06_Budget_holder_notes_Sep2026.docx: explanations from budget holders',
      '07_Direksi_pack_Aug2026_commentary.docx: last month\'s commentary, the house style to follow',
      'Excel_custom_skill/monthly-close-consolidation/SKILL.md: optional Copilot in Excel custom skill',
    ],
    setup: ['Upload the files to one OneDrive folder and open each one once in the browser (Excel or Word for the web) so Copilot can find it.'],
    spoilers: [
      `Material lines (${k.material.length}): ${k.material.join(', ')}. Before the post-closing journals only ${k.materialBeforeJournals.join(', ')} would be material: journals make Restructuring and IT & software material.`,
      ...k.rows.filter((r) => k.material.includes(r.line)).map((r) => `${r.line}: actual ${idr(r.actual)}, budget ${idr(r.budget)}, variance ${idr(M.variance(r))} (${M.pct(r) === null ? 'no budget' : (M.pct(r) * 100).toFixed(1) + '%'}) ${M.variance(r) >= 0 ? 'favourable' : 'unfavourable'}.`),
      'TRAP: Cost of sales below budget is favourable; not material on its own, but Gross profit is always commented.',
      'TRAP: Staff costs are NOT material after the severance moves to Restructuring (PCJ-001). The HR note is stale: it says IDR 3.5 bn in base salaries; the ledger says IDR 3.2 bn in Restructuring. Use the ledger and flag it.',
      `TRAP: Warehouse & logistics: the note explains IDR 6.1 bn of IDR ${bn(-M.variance(R['Warehouse & logistics']))} bn; IDR ${bn(-M.variance(R['Warehouse & logistics']) - 6100)} bn is [Owner to explain]. (Indonesia alone is IDR ${bn(wh.cnn)} bn over.)`,
      'TRAP: Professional fees are material with no note: [Owner to explain], Legal to chase.',
      'TRAP: Travel is 11.5% over budget but only IDR 1.2 bn: not material, so no commentary even though a note exists. Other income is 52% over but IDR 2.2 bn: not material.',
      `TRAP: Intercompany management fee nets to IDR ${idr(k.icDifference)} m, not zero: CM01 has not booked the September fee. Open item for Babak Shammas, not income.`,
      `TRAP: Malaysian revenue in IDR is helped by the MYR: IDR ${bn(k.fxOnRevenue)} bn of the Malaysian variance is currency (MYR 262.0 m x (3,520 - 3,450)).`,
      `Part B: account CM01 6995 (bank charges, FX conversion) is not in the Mapping sheet: IDR ${idr(k.unmappedAmount)} m, belongs in Finance costs. Dropping it makes Finance costs IDR ${idr(k.unmappedAmount)} m lower than the system output.`,
      'Part B: trial balances are in full currency with credits negative; the report is in IDR million with positive amounts.',
    ],
  });
}
