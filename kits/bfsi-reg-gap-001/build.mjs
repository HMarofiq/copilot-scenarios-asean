// New regulation gap analysis: a fictional regulator circular (12 obligations, 3 in annexes),
// 12 fictional SOPs with seeded coverage, and an answer key.
// The regulator is the fictional "Northwind Financial Supervisory Board" (NFSB).
// Deliberately NOT modelled on OJK, BI or BNM letterhead, numbering or format.
import { join } from 'node:path';
import { writePdf, writeDocx, writeXlsx, writeReadme } from '../lib.mjs';

// status: Covered | Partial | Not covered. `sop`/`section` point at the SOP text below.
export const OBLIGATIONS = [
  { clause: '4.1', text: 'Acknowledge every customer complaint within 1 business day of receipt, through the channel the customer used.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-CX-01', section: '3.2', status: 'Partial', why: 'SOP still says 2 business days' },
  { clause: '4.2', text: 'Resolve complaints within 10 business days; one extension of up to 10 further business days is allowed if the customer is told the reason in writing.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-CX-01', section: '3.4', status: 'Partial', why: 'SOP allows 20 business days and has no written-reason rule' },
  { clause: '4.3', text: 'Record a root-cause category for every closed complaint and report counts by category to the regulator quarterly.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-CX-01', section: '5.1', status: 'Covered', why: '' },
  { clause: '5.1', text: 'New accounts opened through digital channels must pass a liveness check during electronic identity verification.', applies: 'Banks offering digital onboarding', effective: '2027-01-01', sop: 'SOP-KYC-01', section: '4.3', status: 'Covered', why: '' },
  { clause: '5.2', text: 'Re-verify customer identity before completing the first transaction after a change of registered device.', applies: 'Banks offering mobile banking', effective: '2027-07-01', sop: '', section: '', status: 'Not covered', why: 'No SOP requires identity re-verification. Partial is acceptable only if it cites SOP-FRD-01 3.2 and says an OTP to the registered phone is not re-verification. Covered is wrong.' },
  { clause: '6.1', text: 'Review transaction monitoring alerts within 24 hours of generation.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-AML-01', section: '3.3', status: 'Partial', why: 'SOP says 48 hours' },
  { clause: '6.2', text: 'Submit suspicious transaction reports within 3 business days of the determination that a transaction is suspicious.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-AML-02', section: '2.4', status: 'Covered', why: '' },
  { clause: '7.1', text: 'Apply a 24-hour cooling-off period before the first transfer to a newly added payee above the equivalent of 10,000,000 in local currency.', applies: 'Banks offering digital transfers', effective: '2027-07-01', sop: 'SOP-FRD-01', section: '3.1', status: 'Covered', why: 'Already applied voluntarily' },
  { clause: '7.2', text: 'Notify the customer of every debit transaction through push notification or SMS within 1 minute.', applies: 'Banks offering digital channels', effective: '2027-01-01', sop: 'SOP-DIG-01', section: '2.2', status: 'Covered', why: '' },
  { clause: '8.1', text: 'Train all customer-facing and operations staff on digital fraud typologies at least once a year.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-HR-01', section: '4.2', status: 'Covered', why: '' },
  { clause: '9', text: 'Banks must submit a gap assessment and remediation plan to the Board of Commissioners or Board of Directors within 60 days of issue.', applies: 'All licensed banks', effective: '2026-11-14 (60 days after issue)', sop: '', section: '', status: 'Not covered', why: 'Transitional provision; no SOP covers it. Easy to miss because it is not in a numbered obligation chapter.' },
  { clause: 'Annex A.2', text: 'Screen accounts against the mule-account indicators in Annex A at onboarding and monthly thereafter.', applies: 'All licensed banks', effective: '2027-07-01', sop: '', section: '', status: 'Not covered', why: 'Annex obligation; no SOP references mule indicators' },
  { clause: 'Annex B.1', text: 'Present a fraud and complaints dashboard to the Board risk committee every month.', applies: 'All licensed banks', effective: '2027-01-01', sop: 'SOP-GOV-01', section: '3.1', status: 'Partial', why: 'SOP says quarterly' },
  { clause: 'Annex B.2', text: 'The dashboard must show complaint volumes by root cause, resolution times, fraud losses and recoveries.', applies: 'All licensed banks', effective: '2027-01-01', sop: '', section: '', status: 'Not covered', why: 'SOP-GOV-01 sets frequency only, not dashboard content' },
];

const SOPS = [
  { id: 'SOP-CX-01', title: 'Complaint Handling', domain: 'Complaints', sections: [
    ['1', 'Purpose', 'This SOP sets how Contoso Bank receives, records, resolves and reports customer complaints across all channels.'],
    ['3.2', 'Acknowledgement', 'Every complaint is acknowledged within 2 business days of receipt. Acknowledgement is sent by email or SMS.'],
    ['3.4', 'Resolution time', 'Complaints are resolved within 20 business days. Complex cases may be extended with Head of Service Quality approval.'],
    ['5.1', 'Root cause and reporting', 'On closure, the case owner selects a root-cause category from the standard list. Service Quality reports counts by category to the regulator every quarter.'],
  ] },
  { id: 'SOP-CX-02', title: 'Customer Communication Standards', domain: 'Complaints', sections: [
    ['2.1', 'Tone and language', 'Customer letters use plain language in Bahasa Indonesia or Bahasa Melayu, with English on request.'],
    ['2.3', 'Channels', 'Written communication is sent to the customer\'s registered email address or by post.'],
  ] },
  { id: 'SOP-KYC-01', title: 'Customer Onboarding', domain: 'KYC', sections: [
    ['4.1', 'Identity documents', 'Branch onboarding requires the original national identity card or passport.'],
    ['4.3', 'Digital onboarding', 'Digital account opening uses electronic identity verification including a liveness check (active or passive) and face match against the identity document photo.'],
  ] },
  { id: 'SOP-KYC-02', title: 'Customer Due Diligence Review', domain: 'KYC', sections: [
    ['3.1', 'Periodic review', 'High-risk customers are reviewed yearly, medium-risk every 3 years, low-risk every 5 years.'],
    ['3.4', 'Trigger events', 'A review is triggered by a change of name, nationality, occupation or a large unexplained deposit.'],
  ] },
  { id: 'SOP-AML-01', title: 'Transaction Monitoring', domain: 'AML', sections: [
    ['3.1', 'Scenarios', 'The monitoring system runs the approved scenario library daily.'],
    ['3.3', 'Alert review', 'Analysts review each alert within 48 hours and either close it with a reason or escalate it.'],
  ] },
  { id: 'SOP-AML-02', title: 'Suspicious Transaction Reporting', domain: 'AML', sections: [
    ['2.4', 'Reporting deadline', 'Once the MLRO determines a transaction is suspicious, the report is filed within 3 business days.'],
  ] },
  { id: 'SOP-FRD-01', title: 'Payee Management and Fraud Controls', domain: 'Fraud', sections: [
    ['3.1', 'New payee cooling-off', 'The first transfer to a newly added payee above 10,000,000 is held for 24 hours. The customer is notified when the hold starts.'],
    ['3.2', 'Device binding', 'Mobile banking is bound to one device. A new device is registered with an OTP sent to the registered phone number.'],
  ] },
  { id: 'SOP-DIG-01', title: 'Digital Channel Notifications', domain: 'Digital', sections: [
    ['2.2', 'Transaction alerts', 'Every debit transaction triggers a push notification, or an SMS if push is disabled, within 60 seconds.'],
  ] },
  { id: 'SOP-HR-01', title: 'Mandatory Training', domain: 'People', sections: [
    ['4.2', 'Fraud awareness', 'All customer-facing and operations staff complete the digital fraud typologies module every year.'],
  ] },
  { id: 'SOP-GOV-01', title: 'Risk Reporting to the Board', domain: 'Governance', sections: [
    ['3.1', 'Frequency', 'The Chief Risk Officer presents the fraud and complaints dashboard to the Board risk committee every quarter.'],
  ] },
  { id: 'SOP-IT-01', title: 'Privileged Access Management', domain: 'IT', sections: [
    ['2.1', 'Access reviews', 'Privileged accounts are reviewed every month by the system owner.'],
  ] },
  { id: 'SOP-OPS-01', title: 'Branch Cash Handling', domain: 'Operations', sections: [
    ['2.1', 'Vault limits', 'Branch vault cash may not exceed the approved limit at close of business.'],
  ] },
];
export const SOP_IDS = SOPS.map((s) => s.id);
export const sopSection = (id, sec) => SOPS.find((s) => s.id === id)?.sections.find(([n]) => n === sec);

export function circularBlocks() {
  const main = OBLIGATIONS.filter((o) => !o.clause.startsWith('Annex') && o.clause !== '9'); // clause 9 is written in the transitional chapter below
  const byChapter = {};
  for (const o of main) (byChapter[o.clause.split('.')[0]] ??= []).push(o);
  const chapters = { 4: 'Complaint handling', 5: 'Identity verification in digital channels', 6: 'Transaction monitoring and reporting', 7: 'Transfer controls and customer alerts', 8: 'Staff competence' };
  return [
    '# Northwind Financial Supervisory Board (fictional)',
    'Circular 2026-07: Customer Protection and Financial Crime Controls in Digital Channels',
    'Issued: 15 September 2026. Applies to: licensed banks. Replaces: Circular 2023-11 (complaints) and Circular 2024-03 (digital onboarding).',
    '## 1. Purpose',
    'This circular strengthens customer protection and financial crime controls as more banking moves to digital channels.',
    '## 2. Definitions',
    'Business day means a day on which banks are open for general business. Registered device means the mobile device bound to the customer\'s mobile banking profile.',
    '## 3. Effective dates',
    'Chapters 4, 6, 8 and Annex B take effect on 1 January 2027. Clause 5.2, clause 7.1 and Annex A take effect on 1 July 2027. All other provisions take effect on 1 January 2027.',
    ...Object.entries(byChapter).flatMap(([ch, os]) => [`## ${ch}. ${chapters[ch]}`, ...os.map((o) => `${o.clause}  ${o.text}`)]),
    '## 9. Transitional provisions',
    OBLIGATIONS.find((o) => o.clause === '9').text,
    { pageBreak: true },
    '# Annex A: Mule account indicators',
    'A.1  The indicators below are signs that an account may be used to receive and move the proceeds of fraud.',
    '- Many incoming transfers from unrelated senders followed by rapid outgoing transfers',
    '- Account opened recently with little activity, then sudden high volume',
    '- Login from many devices or locations in a short period',
    `A.2  ${OBLIGATIONS.find((o) => o.clause === 'Annex A.2').text}`,
    '# Annex B: Board reporting',
    `B.1  ${OBLIGATIONS.find((o) => o.clause === 'Annex B.1').text}`,
    `B.2  ${OBLIGATIONS.find((o) => o.clause === 'Annex B.2').text}`,
  ];
}

export default async function build({ dir }) {
  await writePdf(join(dir, 'FICTIONAL_NFSB_Circular_2026-07.pdf'), circularBlocks(), { title: 'FICTIONAL NFSB Circular 2026-07' });

  // ── SOPs ─────────────────────────────────────────────────────────────────
  for (const s of SOPS) {
    await writeDocx(join(dir, 'SOPs', `FICTIONAL_${s.id}_${s.title.replace(/\W+/g, '_')}.docx`), [
      `# ${s.id} ${s.title}`,
      `**Owner:** ${s.domain} function, Contoso Bank. **Version:** 3.2. **Last reviewed:** March 2026.`,
      ...s.sections.flatMap(([n, h, t]) => [`## ${n} ${h}`, t]),
    ], { title: `${s.id} ${s.title}` });
  }

  // ── Answer key ───────────────────────────────────────────────────────────
  const c = (header, key, width = 18) => ({ header, key, width });
  await writeXlsx(join(dir, 'ANSWER_KEY_gap_tracker.xlsx'), [{
    name: 'Tracker',
    columns: [c('Clause', 'clause', 11), c('Obligation', 'text', 70), c('Effective', 'effective', 22), c('SOP', 'sop', 12), c('Section', 'section', 9), c('Status', 'status', 12), c('Why', 'why', 44)],
    rows: OBLIGATIONS,
  }], { readme: ['Presenter answer key for the fictional NFSB Circular 2026-07.', 'SOP-IT-01 and SOP-OPS-01 are distractors: they should not be cited for any obligation.', 'There is no replaced circular in this kit, so a correct step 1 does not say what is new or changed.'] });

  const n = (s) => OBLIGATIONS.filter((o) => o.status === s).length;
  writeReadme(dir, {
    title: 'Demo kit: New regulation gap analysis', scenario: 'bfsi-reg-gap-001',
    contents: ['FICTIONAL_NFSB_Circular_2026-07.pdf (fictional regulator, 14 obligations: 3 in annexes, 1 transitional)', 'SOPs/ (12 fictional Contoso Bank SOPs, Word)', 'ANSWER_KEY_gap_tracker.xlsx (presenter only)'],
    setup: ['Upload the circular and the SOPs folder to a SharePoint library in the demo tenant.', 'Batch the SOPs as the scenario suggests: Complaints (CX-01, CX-02), KYC (KYC-01, KYC-02), AML (AML-01, AML-02), then the rest.'],
    spoilers: [
      `${OBLIGATIONS.length} obligations: ${n('Covered')} Covered, ${n('Partial')} Partial, ${n('Not covered')} Not covered.`,
      'Partial items are tightened deadlines (acknowledge 2 to 1 day, resolve 20 to 10 days, alerts 48 to 24 hours, board dashboard quarterly to monthly). Check Copilot quotes the numbers exactly.',
      'Annex A.2, B.1 and B.2 sit in annexes and clause 9 in the transitional chapter. If step 1 lists fewer than 14 obligations, check those four first.',
      'No replaced circular is included. If step 1 claims an obligation is new or changed, that is invented.',
      'Clause 5.2 (device change) is the trap. SOP-FRD-01 3.2 mentions device binding with OTP. Covered is wrong; Partial with that explanation, or Not covered, are both acceptable.',
      'Effective dates: 5.2, 7.1 and Annex A.2 are 1 July 2027; clause 9 is 60 days after issue (14 November 2026); everything else 1 January 2027. They are stated in chapter 3, not next to each clause.',
    ],
  });
}
