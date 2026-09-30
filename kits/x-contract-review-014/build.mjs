// Demo kit x-contract-review-014: review a vendor-paper cloud MSA (with SLA, DPA, Order Forms and online
// Service Terms) against the customer's contract playbook. All verdicts come from spec.mjs; the long texts
// live in text/*.mjs and implement the spec clause by clause (tests check the clause numbers and traps).
import { join } from 'node:path';
import { writeDocx, writePdf, writeReadme } from '../lib.mjs';
import { ISSUES, RED_HERRINGS, VERDICT_LABEL, DEAL } from './spec.mjs';
import { MSA_PART1 } from './text/msa-part1.mjs';
import { MSA_PART2 } from './text/msa-part2.mjs';
import { SCHEDULE1_SLA, SCHEDULE2_DPA, ORDER_FORMS, ONLINE_TERMS } from './text/schedules.mjs';
import { PLAYBOOK, EMAIL_REQUEST, EMAIL_VENDOR } from './text/playbook.mjs';

export * from './spec.mjs';
export const MSA = [...MSA_PART1, ...MSA_PART2, { pageBreak: true }, ...SCHEDULE1_SLA, { pageBreak: true }, ...SCHEDULE2_DPA];
export const TEXTS = { MSA, ORDER_FORMS, ONLINE_TERMS, PLAYBOOK, EMAIL_REQUEST, EMAIL_VENDOR };
export const plain = (blocks) => blocks.map((b) => (typeof b === 'string' ? b : b.table ? b.table.map((r) => r.join(' | ')).join('\n') : '')).join('\n');
export const words = (blocks) => plain(blocks).split(/\s+/).filter(Boolean).length;
export const verdictCounts = () => ISSUES.reduce((m, i) => ({ ...m, [i.verdict]: (m[i.verdict] ?? 0) + 1 }), {});

export const FILES = {
  request: '01_Email_Procurement_request_Tailspin_review.docx',
  vendor: '02_Email_Tailspin_cover_note.docx',
  msa: '03_Tailspin_MSA_v4.2_ASEAN_with_Schedules.docx',
  orders: '04_Tailspin_Order_Forms_TS-OF-2026-0417_0418.docx',
  terms: '05_Tailspin_Service_Terms_v2026.3_printed.pdf',
  playbook: '06_Contract_Playbook_Cloud_SaaS_v3.1.docx',
};

const pdfBlocks = (blocks) => blocks.filter((b) => typeof b === 'string').map((b) => (b.startsWith('### ') ? `## ${b.slice(4)}` : b));

export default async function build({ dir }) {
  const opt = (title) => ({ title, creator: 'Contoso Niaga Legal & Procurement', keywords: 'contract review; playbook; fictional' });
  await writeDocx(join(dir, FILES.request), EMAIL_REQUEST, opt('Tailspin contract review request'));
  await writeDocx(join(dir, FILES.vendor), EMAIL_VENDOR, opt('Tailspin cover note'));
  await writeDocx(join(dir, FILES.msa), MSA, { title: 'Tailspin MSA v4.2 (ASEAN)', creator: 'Tailspin Cloud Services Legal', keywords: 'MSA; SLA; DPA; fictional' });
  await writeDocx(join(dir, FILES.orders), ORDER_FORMS, { title: 'Tailspin Order Forms', creator: 'Tailspin Cloud Services Sales Operations', keywords: 'order form; fictional' });
  await writePdf(join(dir, FILES.terms), pdfBlocks(ONLINE_TERMS), { title: 'Tailspin Service Terms v2026.3', author: 'Tailspin Cloud Services' });
  await writeDocx(join(dir, FILES.playbook), PLAYBOOK, opt('Contract Playbook: Cloud, SaaS and Managed IT Services v3.1'));

  const c = verdictCounts();
  writeReadme(dir, {
    title: 'Kit: Contract review against your playbook (Tailspin cloud MSA)',
    scenario: 'x-contract-review-014',
    contents: [
      `${FILES.request}: the ask from Procurement (deadline, what Legal must return)`,
      `${FILES.vendor}: the vendor's cover note ("standard paper, largely non-negotiable")`,
      `${FILES.msa}: the agreement, 22 clauses + Schedule 1 SLA + Schedule 2 DPA (${words(MSA).toLocaleString('en-US')} words)`,
      `${FILES.orders}: the two Order Forms with the negotiated Special Conditions`,
      `${FILES.terms}: the online Service Terms the MSA incorporates by URL`,
      `${FILES.playbook}: the company's positions, fallbacks, red lines and approvers for 19 issues`,
    ],
    setup: [
      'Upload all files to one OneDrive folder in a demo or test tenant. Open each file once so Copilot can read it.',
      'Apply a non-encrypting sensitivity label if your tenant asks for one before editing.',
      'Open the MSA in Word, turn on Track Changes (Review > Track Changes) before any edit-mode step.',
    ],
    spoilers: [
      `Verdicts: ${Object.entries(c).map(([k, n]) => `${n} ${VERDICT_LABEL[k]}`).join(', ')}.`,
      ...ISSUES.map((i) => `${i.id} ${i.topic} [${i.where.join(', ')}]: ${VERDICT_LABEL[i.verdict]}. ${i.approver ? `Approver: ${i.approver}.` : ''}`),
      'Red herrings (should NOT be flagged as problems): ' + RED_HERRINGS.join(' '),
      `Deal: ${DEAL.orderForms?.map?.((o) => o.id).join(' + ') ?? 'two Order Forms'}; the Special Conditions rank last under MSA 1.3.`,
    ],
  });
}