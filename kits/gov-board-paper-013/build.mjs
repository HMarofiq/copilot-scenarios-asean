// Demo kit gov-board-paper-013 (v3): assemble a Usulan Keputusan Direksi (board paper) for a material acquisition
// from five divisional inputs in the company template, with conflicts, a stale input and a missing section flagged
// instead of smoothed over. Numbers come from model.mjs; the long texts live in text.mjs.
import { join } from 'node:path';
import { writeDocx, writeReadme } from '../lib.mjs';
import * as M from './model.mjs';
import { EMAIL_REQUEST, TEMPLATE, INPUT_STRATEGY, INPUT_FINANCE, INPUT_LEGAL_TAX, INPUT_OPERATIONS, INPUT_RISK } from './text.mjs';

export * from './model.mjs';
export const TEXTS = { EMAIL_REQUEST, TEMPLATE, INPUT_STRATEGY, INPUT_FINANCE, INPUT_LEGAL_TAX, INPUT_OPERATIONS, INPUT_RISK };
export const plain = (blocks) => blocks.map((b) => (typeof b === 'string' ? b : b.table ? b.table.map((r) => r.join(' | ')).join('\n') : '')).join('\n');

export const FILES = {
  email: '01_Email_CorSec_Proyek_Kutub.docx',
  template: '02_Template_Usulan_Keputusan_Direksi.docx',
  strategy: '03_Input_Strategy_Proyek_Kutub_v2.docx',
  finance: '04_Input_Keuangan_Proyek_Kutub_v3.docx',
  legal: '05_Input_Legal_Pajak_Proyek_Kutub.docx',
  ops: '06_Input_Operasi_Proyek_Kutub.docx',
  risk: '07_Input_Risiko_Proyek_Kutub_v1.docx',
};

export default async function build({ dir }) {
  const opt = (title, creator) => ({ title, creator, keywords: 'Proyek Kutub; RAHASIA; fictional' });
  await writeDocx(join(dir, FILES.email), EMAIL_REQUEST, opt('Email Corporate Secretary', 'Corporate Secretary Office'));
  await writeDocx(join(dir, FILES.template), TEMPLATE, opt('Template Usulan Keputusan Direksi', 'Corporate Secretary Office'));
  await writeDocx(join(dir, FILES.strategy), INPUT_STRATEGY, opt('Project Kutub strategic rationale v2', 'Strategy & Business Development'));
  await writeDocx(join(dir, FILES.finance), INPUT_FINANCE, opt('Project Kutub transaction structure v3', 'Finance Directorate'));
  await writeDocx(join(dir, FILES.legal), INPUT_LEGAL_TAX, opt('Proyek Kutub due diligence hukum dan pajak', 'Legal dan Pajak'));
  await writeDocx(join(dir, FILES.ops), INPUT_OPERATIONS, opt('Proyek Kutub kajian operasional', 'Direktorat Operasi'));
  await writeDocx(join(dir, FILES.risk), INPUT_RISK, opt('Proyek Kutub kajian risiko awal v1', 'Risk Management'));

  const k = M.answerKey();
  writeReadme(dir, {
    title: 'Kit: Board paper from divisional inputs (Proyek Kutub acquisition)', scenario: 'gov-board-paper-013',
    contents: [
      `${FILES.email}: the Corporate Secretary's request and rules`, `${FILES.template}: the board paper template with section owners (open this one in Word)`,
      `${FILES.strategy}, ${FILES.finance}, ${FILES.legal}, ${FILES.ops}, ${FILES.risk}: the five divisional inputs`,
      'Human Capital has not submitted (on purpose).',
    ],
    setup: ['Upload all files to one OneDrive folder in a demo or test tenant and open each once.', 'Apply a non-encrypting sensitivity label if your tenant asks for one.', 'Make a copy of the template before each run.'],
    spoilers: [
      `Price: EV IDR ${k.ev} bn - net debt ${k.netDebt} = equity ${k.equity100}; ${k.stake}% = IDR ${k.price} bn. Strategy's "Rp1,9 triliun" is the 100% EV, not a conflict.`,
      `Real conflict: EBITDA 2025 audited ${k.conflict.finance} (Finance) vs ${k.conflict.ops} (Operations, management accounts). The gap ${k.conflict.gap} equals the Medan land gain in the Legal/Tax input. Mark [KONFLIK].`,
      `Stale input: ${k.stale}`,
      `Materiality: ${k.ratioNow}% of equity, material under POJK 17/2020 (appraiser and disclosure); ${k.noRups}`,
      `[PERLU KONFIRMASI]: ${k.toConfirm.join('; ')}.`,
      `Outside remit: ${k.outsideRemit}`,
      `Conflict of interest: ${k.recusal}`,
      `Resolution must carry all ${k.cps} conditions precedent: ${M.CPS.map((c, i) => `(${i + 1}) ${c}`).join(' ')}`,
      `Approvals and filings: ${k.approvals.join('; ')}.`,
    ],
  });
}
