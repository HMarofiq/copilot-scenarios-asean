// Procurement TOR (KAK) and vendor comparison for a holding company's asset management system.
// Traps: one price excludes VAT, one proposal's validity has expired, one misses the local content
// (TKDN) minimum, one hosts data outside Indonesia. The memo leaves the budget open.
import { join } from 'node:path';
import { writeDocx, writeReadme, money } from '../lib.mjs';

export const EVAL_DATE = '28 September 2026';
export const VAT = 0.11;
export const VENDORS = [
  { id: 'A', name: 'PT Contoso Solusi Digital', price: 4_200_000_000, inclVat: true, validity: '15 September 2026', expired: true, tkdn: 45, hosting: 'Jakarta data centre', months: 10, sap: 'Certified SAP connector' },
  { id: 'B', name: 'PT Fabrikam Teknologi', price: 3_800_000_000, inclVat: false, validity: '31 December 2026', expired: false, tkdn: 35, hosting: 'Jakarta data centre', months: 12, sap: 'Integration through middleware' },
  { id: 'C', name: 'PT Northwind Sistem', price: 3_950_000_000, inclVat: true, validity: '30 November 2026', expired: false, tkdn: 42, hosting: 'Cloud region in Singapore', months: 9, sap: 'Certified SAP connector' },
];
export const priceInclVat = (v) => (v.inclVat ? v.price : Math.round(v.price * (1 + VAT)));
export const issues = (v) => [
  v.expired && 'Proposal validity expired before the evaluation date',
  v.tkdn < 40 && `TKDN ${v.tkdn}% below the 40% minimum`,
  !/Jakarta|Indonesia/.test(v.hosting) && 'Data hosted outside Indonesia',
].filter(Boolean);

const proposal = (v) => [
  `# Technical and commercial proposal: ${v.name} (fictional)`,
  `Submitted to Fabrikam Holding Group (fictional) for the Group Asset Management System tender.`,
  '## Solution',
  `Cloud asset management platform for up to 500 users across subsidiaries, with mobile inspection and work orders. SAP integration: ${v.sap}.`,
  '## Implementation',
  `Implementation in ${v.months} months from contract signature, including data migration from subsidiary spreadsheets and training.`,
  '## Hosting and data',
  `Production and backup environments are hosted in the ${v.hosting}.`,
  '## Local content',
  `Our TKDN (local content) value for this offer is ${v.tkdn}%.`,
  '## Commercial',
  `Total price: IDR ${money(v.price)} ${v.inclVat ? 'including VAT' : 'excluding VAT'}.`,
  `This proposal is valid until ${v.validity}.`,
];

export default async function build({ dir }) {
  await writeDocx(join(dir, 'FICTIONAL_Memo_Kebutuhan_Sistem_Aset.docx'), [
    '# Internal memo: Group Asset Management System (fictional)',
    '**From:** Head of Group Operations. **To:** Procurement. **Date:** 1 September 2026.',
    'Our 20 subsidiaries track assets in separate spreadsheets. We need one group asset management system for about 400 users, with mobile inspections, preventive maintenance work orders and a group dashboard.',
    'Requirements: integration with our SAP finance system; all data stored in Indonesia; implementation within 12 months; vendor local content (TKDN) of at least 40%; training for subsidiary admins.',
    'Budget: to be confirmed by the Finance Director.',
    `Proposals will be evaluated on ${EVAL_DATE}. Prices must be compared including VAT at 11%.`,
  ], { title: 'Memo' });
  await writeDocx(join(dir, 'FICTIONAL_Template_KAK.docx'), [
    '# Kerangka Acuan Kerja (KAK) / Terms of Reference',
    '## 1. Latar belakang / Background', '[ ]',
    '## 2. Maksud dan tujuan / Purpose and objectives', '[ ]',
    '## 3. Ruang lingkup pekerjaan / Scope of work', '[ ]',
    '## 4. Keluaran / Deliverables', '[ ]',
    '## 5. Jangka waktu / Timeline', '[ ]',
    '## 6. Kualifikasi penyedia / Vendor qualifications', '[ ]',
    '## 7. Kriteria evaluasi / Evaluation criteria', '[ ]',
    '## 8. Anggaran / Budget', '[ ]',
  ], { title: 'KAK template' });
  for (const v of VENDORS) await writeDocx(join(dir, 'Proposals', `FICTIONAL_Proposal_Vendor_${v.id}.docx`), proposal(v), { title: `Proposal ${v.id}` });

  writeReadme(dir, {
    title: 'Demo kit: Procurement TOR (KAK) and vendor proposal comparison', scenario: 'gov-tor-kak-010',
    contents: ['FICTIONAL_Memo_Kebutuhan_Sistem_Aset.docx (requirement memo)', 'FICTIONAL_Template_KAK.docx', 'Proposals/ (3 fictional vendor proposals)'],
    setup: ['Upload everything to OneDrive in the demo tenant and open each file once in Word for the web.', 'Run step 1 with the memo and template, then step 2 with the KAK and the three proposals.'],
    spoilers: [
      'Step 1: the budget must be marked [TO CONFIRM]; the memo gives no figure.',
      ...VENDORS.map((v) => `Vendor ${v.id}: IDR ${money(priceInclVat(v))} incl. VAT${v.inclVat ? '' : ' (quoted excl. VAT)'}; ${issues(v).join('; ') || 'no compliance issue'}.`),
      'TRAP: Vendor B looks cheapest (3.8 bn) until VAT is added; it is then the most expensive.',
      'The comparison must not recommend a winner. The evaluation panel decides.',
    ],
  });
}
