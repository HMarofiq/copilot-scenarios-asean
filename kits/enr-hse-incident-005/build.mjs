// HSE incident investigation: a fictional hand injury during conveyor maintenance at a nickel
// processing plant. Five witness statements with deliberate conflicts and evidence gaps.
import { join } from 'node:path';
import { writeDocx, writePdf, writeXlsx, writeReadme } from '../lib.mjs';

export const TIMELINE = [
  { t: '07:00', event: 'Shift handover and toolbox talk. Conveyor CV-07 belt tracking fault logged.', source: 'W1, W4, Initial report' },
  { t: '07:40', event: 'Permit to work PTW-2026-1183 issued for CV-07 idler replacement.', source: 'PTW' },
  { t: '07:55', event: 'Isolation performed at MCC panel 3. Lock applied by W2.', source: 'W2' },
  { t: '08:05', event: 'W3 (injured person) begins work on the tail pulley guard.', source: 'W2, W3' },
  { t: '08:20', event: 'Belt moves briefly. W3 left hand caught between belt and idler.', source: 'W2, W3, W5' },
  { t: '08:22', event: 'Emergency stop pulled.', source: 'W2 says 08:22; W5 says 08:25 (CONFLICT)' },
  { t: '08:35', event: 'First aid given; W3 taken to site clinic.', source: 'W4, Initial report' },
  { t: '09:40', event: 'W3 transferred to hospital. Lost-time injury declared.', source: 'Initial report' },
];
export const CONFLICTS = [
  'Who applied a personal lock: W2 says "we both locked on"; W3 says he did not have his own lock with him that day.',
  'Time the emergency stop was pulled: W2 says 08:22, W5 says about 08:25.',
];
export const GAPS = [
  'No statement confirms a try-start (test for zero energy) after isolation. The JSA requires it; nobody says it was done or not done.',
  'Why the belt moved: gravity take-up rollback or re-energisation? No evidence either way.',
];

const S = {
  'W1 Shift Supervisor (Budi Santoso)': [
    'I ran the 07:00 handover and toolbox talk. We discussed the CV-07 tracking fault and the need for isolation. After that I went to the control room for the production meeting and was not at CV-07 when the incident happened.',
    'I was called at about 08:25 on the radio. When I arrived, the belt was stopped and first aid was being given.',
  ],
  'W2 Maintenance Fitter (Agus Pratama)': [
    'Permit was issued around 07:40. I isolated at MCC panel 3 at about 07:55 and put my lock on. We both locked on, as usual.',
    'Dedi (W3) started on the tail pulley guard at around 08:05. I was on the other side replacing the idler bracket.',
    'At 08:20 the belt jerked forward maybe 30 centimetres. Dedi shouted. I pulled the emergency stop cord straight away, it was 08:22 on my watch.',
  ],
  'W3 Injured Person (Dedi Kurniawan), taken in hospital': [
    'I started on the guard at about 08:05. Agus had done the isolation. I did not have my own lock with me that day because I left it in my other jacket, so I relied on his.',
    'I was reaching in to remove a bolt when the belt moved. My left hand was pulled between the belt and the idler.',
    'I do not remember exactly when the stop was pulled.',
  ],
  'W4 Site Medic (Sri Wahyuni)': [
    'Called at 08:27. Arrived at CV-07 at 08:33. Started first aid at 08:35: suspected fractures to two fingers of the left hand, bleeding controlled.',
    'Moved the patient to the site clinic at 08:50. Transferred to hospital at 09:40 after the doctor assessed him.',
  ],
  'W5 Process Operator (Rahmat Hidayat)': [
    'I was about 20 metres away checking the chute. I heard a shout and saw the belt had moved.',
    'Agus pulled the stop cord. I think it was about 08:25, I looked at the clock in the MCC room after.',
    'I noticed the take-up weight was higher than normal that morning. I do not know if that matters.',
  ],
};

export default async function build({ dir }) {
  for (const [who, paras] of Object.entries(S)) {
    const code = who.split(' ')[0];
    await writeDocx(join(dir, 'Statements', `FICTIONAL_Statement_${code}.docx`), [
      '# Witness statement',
      `**Incident:** INC-2026-0419, CV-07 conveyor, Northwind Smelter (fictional). **Date of incident:** 21 September 2026.`,
      `**Witness:** ${who}. **Taken by:** HSE Officer. **Date taken:** 22 September 2026.`,
      ...paras,
      '> I confirm this statement is true to the best of my knowledge.',
    ], { title: `Statement ${code}` });
  }
  await writeDocx(join(dir, 'FICTIONAL_Initial_Incident_Report_INC-2026-0419.docx'), [
    '# Initial incident report',
    { table: [['Field', 'Value'], ['Incident no.', 'INC-2026-0419'], ['Site', 'Northwind Smelter, East Kalimantan (fictional)'], ['Date / time', '21 September 2026, approx. 08:20'], ['Area', 'Conveyor CV-07, tail pulley'], ['Classification', 'Lost-time injury (LTI)'], ['Injury', 'Suspected fractures, two fingers, left hand'], ['Injured person', 'Maintenance technician (W3)'], ['Immediate actions', 'CV-07 isolated and tagged out of service. Area barricaded. Investigation team appointed.']] },
    '## Brief description',
    'During idler replacement under permit PTW-2026-1183, the conveyor belt moved while the technician was working near the tail pulley. His left hand was caught between the belt and an idler.',
  ], { title: 'Initial incident report INC-2026-0419' });
  await writePdf(join(dir, 'FICTIONAL_PTW-2026-1183_and_JSA.pdf'), [
    '# Permit to work PTW-2026-1183 (fictional)',
    '| Work        | Replace return idler and bracket, CV-07 tail section     |',
    '| Issued      | 21 Sep 2026 07:40 by Area Authority                      |',
    '| Valid until | 21 Sep 2026 16:00                                        |',
    '| Isolation   | MCC panel 3, CV-07 drive. Personal lock for EVERY worker. |',
    '| Energy      | Electrical; stored energy in gravity take-up             |',
    '## Job safety analysis (JSA) extract',
    '- Step 2: Isolate at MCC panel 3. Each person applies their own personal lock and tag.',
    '- Step 3: Try-start from the local control station to confirm zero energy. Record the try-start on the permit.',
    '- Step 4: Secure the gravity take-up with the mechanical pin before working at the tail pulley.',
    '- Step 5: Keep hands clear of in-running nip points. Use the long-reach tool for guard bolts.',
    '## Permit sign-off',
    '| Try-start recorded | [ blank ]                                              |',
    '| Take-up pinned     | [ blank ]                                              |',
  ], { title: 'PTW-2026-1183 and JSA' });

  const c = (header, key, width = 20) => ({ header, key, width });
  await writeXlsx(join(dir, 'ANSWER_KEY_timeline.xlsx'), [
    { name: 'Timeline', columns: [c('Time', 't', 8), c('Event', 'event', 70), c('Source', 'source', 40)], rows: TIMELINE },
    { name: 'Conflicts', columns: [c('Conflict', 'x', 110)], rows: CONFLICTS.map((x) => ({ x })) },
    { name: 'EvidenceGaps', columns: [c('Evidence gap', 'x', 110)], rows: GAPS.map((x) => ({ x })) },
  ], { readme: ['Presenter answer key. The root cause is for the investigation team, not Copilot.'] });

  writeReadme(dir, {
    title: 'Demo kit: HSE incident investigation draft', scenario: 'enr-hse-incident-005',
    contents: ['Statements/ (5 witness statements, Word)', 'FICTIONAL_Initial_Incident_Report_INC-2026-0419.docx', 'FICTIONAL_PTW-2026-1183_and_JSA.pdf', 'ANSWER_KEY_timeline.xlsx (presenter only)'],
    setup: ['Upload everything to one folder in the demo tenant.', 'Attach the statements and initial report for step 1; add the PTW/JSA for step 2.'],
    spoilers: [
      ...CONFLICTS.map((x) => `CONFLICT: ${x}`),
      ...GAPS.map((x) => `EVIDENCE GAP: ${x}`),
      'The permit shows try-start and take-up pinning as blank. A good 5-Why connects: no personal lock for W3, no recorded try-start, take-up not pinned (W5 noticed the take-up weight). A weak answer blames "operator error" or invents that the machine was re-energised.',
      'W1 was not present at the incident. If the timeline cites W1 for anything after 07:00, that is fabricated attribution.',
    ],
  });
}
