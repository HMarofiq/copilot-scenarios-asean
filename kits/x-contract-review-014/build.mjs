// Contract review against a playbook. Traps: a later clause quietly overrides the liability cap
// for data breaches; auto-renewal hidden in the term clause; data location is not addressed.
import { join } from 'node:path';
import { writeDocx, writeReadme } from '../lib.mjs';

export const PLAYBOOK = [
  { topic: 'Liability cap', standard: 'Cap of at least 12 months of fees paid', fallback: '6 months with Legal Director approval' },
  { topic: 'Data breach liability', standard: 'Uncapped, or at least 3x the general cap', fallback: 'None: escalate' },
  { topic: 'Governing law', standard: 'Indonesia (for Indonesian entities) or Malaysia (for Malaysian entities)', fallback: 'Singapore with SIAC arbitration' },
  { topic: 'Term and renewal', standard: 'Initial term up to 12 months; renewal only by written agreement', fallback: 'Auto-renewal up to 12 months with 90 days notice to cancel' },
  { topic: 'Payment terms', standard: '30 days from invoice', fallback: '45 days' },
  { topic: 'Data location', standard: 'Personal data stored in the entity\'s own country', fallback: 'None: escalate' },
  { topic: 'Termination for convenience', standard: 'Customer may terminate on 60 days notice', fallback: '90 days' },
];
export const EXPECTED = {
  'Liability cap': 'Deviation beyond fallback (3 months, clause 12.2)',
  'Data breach liability': 'Deviation, escalate (capped at IDR 100 million, clause 18.4 overrides 12.2)',
  'Governing law': 'Within fallback only if SIAC arbitration applies; clause 20.1 says Singapore courts: deviation',
  'Term and renewal': 'Deviation beyond fallback (auto-renews for 36 months, 30 days notice, clause 3.2)',
  'Payment terms': 'Within fallback (45 days, clause 7.1)',
  'Data location': 'Not addressed: escalate',
  'Termination for convenience': 'Meets standard (60 days, clause 15.3)',
};

export default async function build({ dir }) {
  await writeDocx(join(dir, 'FICTIONAL_Contract_Playbook.docx'), [
    '# Commercial contract playbook (fictional)', 'Fabrikam Holding Group Legal. Applies to software and services contracts.',
    { table: [['Topic', 'Standard position', 'Acceptable fallback'], ...PLAYBOOK.map((p) => [p.topic, p.standard, p.fallback])] },
    'Anything beyond the fallback, or marked escalate, needs Legal Director approval.',
  ], { title: 'Playbook' });
  await writeDocx(join(dir, 'FICTIONAL_Vendor_MSA_Contoso_Cloud.docx'), [
    '# Master Services Agreement (fictional)', 'Between Contoso Cloud Pte. Ltd. (fictional) ("Provider") and PT Fabrikam Digital (fictional) ("Customer").',
    '## 1. Definitions', '1.1 "Fees" means the fees payable by the Customer under an Order Form.',
    '## 3. Term', '3.1 This Agreement starts on the Effective Date and continues for an initial term of 12 months.', '3.2 Thereafter this Agreement renews automatically for successive periods of 36 months unless either party gives written notice at least 30 days before the end of the then-current term.',
    '## 7. Payment', '7.1 The Customer shall pay each invoice within 45 days of the invoice date.',
    '## 9. Data', '9.1 The Provider shall process Customer Data in accordance with the Customer\'s documented instructions and applicable law.', '9.2 The Provider shall implement appropriate technical and organisational security measures.',
    '## 12. Limitation of liability', '12.1 Neither party is liable for indirect or consequential loss.', '12.2 Each party\'s total liability under this Agreement is limited to the Fees paid in the three (3) months preceding the event giving rise to the claim.',
    '## 15. Termination', '15.1 Either party may terminate for material breach not cured within 30 days of notice.', '15.3 The Customer may terminate for convenience on 60 days written notice.',
    '## 18. Miscellaneous', '18.1 Notices must be in writing.', '18.4 Notwithstanding clause 12.2, the Provider\'s total liability for any breach of clause 9 (Data) is limited to IDR 100,000,000.',
    '## 20. Governing law', '20.1 This Agreement is governed by the laws of Singapore and the parties submit to the exclusive jurisdiction of the courts of Singapore.',
  ], { title: 'MSA' });
  writeReadme(dir, {
    title: 'Demo kit: Contract review against the playbook', scenario: 'x-contract-review-014',
    contents: ['FICTIONAL_Contract_Playbook.docx (7 positions)', 'FICTIONAL_Vendor_MSA_Contoso_Cloud.docx'],
    setup: ['Upload both to OneDrive in the demo tenant and open each once in Word for the web.', 'Run the scenario prompt in Copilot Chat or Word.'],
    spoilers: Object.entries(EXPECTED).map(([k, v]) => `${k}: ${v}.`).concat(['TRAP: clause 18.4 sits in Miscellaneous and caps data breach liability far below the general cap.', 'TRAP: the renewal is in 3.2, not in a separate renewal clause.']),
  });
}
