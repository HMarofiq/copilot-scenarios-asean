import { join } from 'node:path';
import { writeDocx, writePdf, writeText, writeXlsx, NOTICE } from '../lib.mjs';
import { CASE, FILES, SOURCE, TRAPS, answerRows, summary, trainingPercent, untrained } from './model.mjs';
import { SCOPE, SOURCE_BRIEF, READINESS, TEMPLATE } from './text/inputs.mjs';
import { POLICY } from './text/policy.mjs';
import { INDONESIA } from './text/indonesia.mjs';

export * from './model.mjs';
export const TEXTS = { SCOPE, SOURCE_BRIEF, POLICY, READINESS, INDONESIA, TEMPLATE };
export const plain = (blocks) => blocks.map((b) => typeof b === 'string' ? b : b.table ? b.table.map((r) => r.join(' | ')).join('\n') : '').join('\n');
export const words = (blocks) => blocks.flatMap((b) => typeof b === 'string'
  ? [b.replace(/^(?:#{1,3}|-|>) /u, '').replace(/\*\*/g, '')]
  : b.table ? b.table.flat().map(String) : []).join(' ').split(/\s+/u).filter(Boolean).length;
export const INPUTS = [
  { file: FILES.scope, blocks: SCOPE, title: 'Malaysian FTFC scope and review request' },
  { file: FILES.source, blocks: SOURCE_BRIEF, title: 'Independently authored FTFC reviewed-source brief' },
  { file: FILES.policy, blocks: POLICY, title: 'Malaysian policy pack v1.0 with draft Annex B' },
  { file: FILES.evidence, blocks: READINESS, title: 'Malaysian readiness evidence and steering minutes' },
  { file: FILES.indonesia, blocks: INDONESIA, title: 'SOP nasabah rentan: separate Indonesian entity' },
  { file: FILES.template, blocks: TEMPLATE, title: 'Unsigned BRMC review-paper template' },
];

const distribution = (counts) => Object.entries(counts).map(([label, n]) => `${n} ${label}`).join(', ');

export function keyNotes(rows = answerRows()) {
  const counts = summary(rows);
  return [
    'PRESENTER ANSWERS — never attach this workbook or README.txt as grounding.',
    `Historical snapshot: ${CASE.cutoff}; fictional entity: ${CASE.entity}.`,
    `Source: ${SOURCE.issuer}, ${SOURCE.title}, ${SOURCE.reference}, issued ${CASE.issued}.`,
    `Official PDF: ${SOURCE.pdf}. Brief is original paraphrase, not legal authority or regulator endorsement.`,
    `Legal effective date: ${CASE.effective}; internal HoC review: ${CASE.review}; internal BRMC paper: ${CASE.paper}.`,
    `${counts.total} scoped review rows: ${counts.mandatory} S standards and ${counts.guidance} G guidance rows. Not an exhaustive legal inventory.`,
    `Readiness: ${distribution(counts.status)}.`,
    `Documented design: ${distribution(counts.design)}.`,
    `Operating evidence: ${distribution(counts.operating)}.`,
    `${counts.approvedNotCovered} approved designs are not Covered: approval and operation are independent dimensions.`,
    `All clause-level changes are Unknown because the ${CASE.predecessor} predecessor text is not supplied.`,
    'R13 stays Unverified: related policy texts and versions for 16.28 are absent; an approved monitoring plan is not a cross-policy review.',
    `Training: ${CASE.trained}/${CASE.employees} employees (${trainingPercent()}%); ${untrained()} not completed, plus ${CASE.agents} outsourced agents not enrolled. Skills evidence is separately missing.`,
    `CRM ${CASE.crm} is after ${CASE.effective}; interim spreadsheets are schema proposals only, not operating records or staff access.`,
    `Leaflet promises unsupported WhatsApp and video-relay channels; phone and branch assistance are available. Web UAT ${CASE.webUat} and ${CASE.testing} tests are plans.`,
    `${CASE.budgetLabel} is a proposal pending CFO decision, not approved expenditure. Head of Compliance sign-off remains unsigned.`,
    'Targets and remediation actions are proposed, not commitments; the exercise authorises no sending, policy edits or execution.',
    'Counts in this answer key are static values computed from the model. The participant-generated workbook must instead use linked Summary formulas.',
    'Tenant-tested on 4 October 2026 in EN, ID and BM: final runs matched all 16 keyed rows per language, the formula Summary and the two-page unsigned note. A matching run does not establish compliance; human review remains required.',
  ];
}

export function readmeText(rows = answerRows()) {
  return [
    'New regulation gap analysis — historical Malaysian FTFC training kit v3',
    NOTICE,
    '',
    `EXACT INVENTORY (${Object.keys(FILES).length} files)`,
    ...INPUTS.map((i) => `${i.file} — ${i.title}; ${words(i.blocks)} words.`),
    `${FILES.key} — presenter-only register, counts and trap checks.`,
    `${FILES.readme} — setup and presenter spoilers; do not attach.`,
    '',
    'SETUP — YOUR AUTHORISED WORK TENANT',
    'Use your own authorised Microsoft 365 work tenant with Microsoft 365 Copilot. A demo tenant is optional, not required.',
    'Only fictional, non-customer material is supplied. Follow your organisation’s upload and labelling policies.',
    '1. Keep README.txt and the answer key local and out of Copilot grounding.',
    '2. Upload inputs 01–05 only to one dedicated OneDrive work folder. Open each once; select Public for these fictional documents if asked and permitted by tenant policy.',
    '3. Start a new Copilot app chat in Work. Select Add and manage sources > Add content; use Search and the Files tab.',
    '4. Attach each input separately from the correct folder. Verify five file chips before running the analysis prompt.',
    '5. Run the three prompts on the scenario page in order: analysis, actual downloadable Excel, actual downloadable Word.',
    '6. Add input 06 (one template) at the Word step; upload it then if needed. Never add the answer key or this README.',
    '7. Open the generated outputs in Excel and Word, save to your work folder, label when asked, and reopen to verify persistence.',
    '8. Check all rows against the local answer key, inspect citations and formulas, and obtain human Head of Compliance sign-off before use.',
    '',
    'PRESENTER SPOILERS',
    ...keyNotes(rows),
    ...rows.map((r) => `${r.id} | ${r.type} ${r.para} | ${r.status} | design ${r.design} | operating ${r.operating}\n  ${r.source}\n  ${r.policy}; ${r.evidence}\n  ${r.action}`),
    ...TRAPS.map((t) => `${t.id}: ${t.check} [${t.citation}]`),
    '',
  ].join('\n');
}

export const REGISTER_COLUMNS = [
  ['Review key', 'id', 12], ['S/G', 'type', 8], ['BNM paragraph', 'para', 16],
  ['Scoped question', 'question', 62], ['Entity', 'entity', 38], ['Applicability', 'applicability', 48],
  ['Issue date', 'issueDate', 21], ['Legal effective date', 'effectiveDate', 22], ['Change from predecessor', 'change', 45],
  ['Documented design', 'design', 22], ['Operating evidence', 'operating', 22], ['Readiness status', 'status', 20],
  ['Reason / limitation', 'rationale', 85], ['Responsible role', 'owner', 45], ['Proposed action', 'action', 85],
  ['Proposed due target', 'target', 55], ['Remediation approval', 'approval', 55],
  ['Official source locator', 'source', 70], ['Official source URL', 'sourceUrl', 65],
  ['Policy citation', 'policy', 55], ['Evidence citation', 'evidence', 65],
].map(([header, key, width]) => ({ header, key, width }));

export default async function build({ dir }) {
  const rows = answerRows();
  const counts = summary(rows);
  for (const input of INPUTS) {
    const options = { title: input.title, stamp: true };
    if (input.file.endsWith('.pdf')) await writePdf(join(dir, input.file), input.blocks, options);
    else await writeDocx(join(dir, input.file), input.blocks, options);
  }
  await writeXlsx(join(dir, FILES.key), [
    { name: 'Register', columns: REGISTER_COLUMNS, rows },
    {
      name: 'Counts',
      columns: [{ header: 'Dimension', key: 'dimension', width: 28 }, { header: 'Measure', key: 'label', width: 32 }, { header: 'Count', key: 'value', width: 16 }],
      rows: [
        { dimension: 'Scope', label: 'All review rows', value: counts.total },
        { dimension: 'Scope', label: 'Mandatory S denominator', value: counts.mandatory },
        { dimension: 'Scope', label: 'G rows excluded', value: counts.guidance },
        ...['status', 'design', 'operating'].flatMap((dimension) => Object.entries(counts[dimension]).map(([label, value]) => ({ dimension, label, value }))),
        { dimension: 'Cross-check', label: 'Approved but not Covered', value: counts.approvedNotCovered },
      ],
    },
    {
      name: 'Trap checks',
      columns: [{ header: 'Trap', key: 'id', width: 12 }, { header: 'Review rows', key: 'rows', width: 25 }, { header: 'Check', key: 'check', width: 95 }, { header: 'Citation', key: 'citation', width: 48 }],
      rows: TRAPS.map((t) => ({ ...t, rows: t.rows.join(', ') })),
    },
  ], { stamp: true, title: 'Historical FTFC scoped answer key', readme: keyNotes(rows) });
  writeText(join(dir, FILES.readme), readmeText(rows));
}
