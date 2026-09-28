// Motor insurance claim file. Traps: the driver is not a named driver (extra excess applies),
// the workshop estimate includes a non-covered upgrade, and the driving licence copy is missing.
// The handler must not make a coverage decision in the letter.
import { join } from 'node:path';
import { writeDocx, writePdf, writeXlsx, writeReadme, money } from '../lib.mjs';

export const CHECKLIST = ['Claim form', 'Police report', 'Workshop estimate', 'Photos of damage', 'Copy of driving licence', 'Copy of vehicle registration'];
export const RECEIVED = ['Claim form', 'Police report', 'Workshop estimate', 'Photos of damage', 'Copy of vehicle registration'];
export const EXCESS = { standard: 300_000, unnamedDriver: 1_000_000 };
export const ESTIMATE = [
  { item: 'Front bumper replacement', amount: 2_400_000, covered: true },
  { item: 'Headlamp assembly (left)', amount: 3_100_000, covered: true },
  { item: 'Bonnet repair and repaint', amount: 1_850_000, covered: true },
  { item: 'Upgrade to LED headlamp kit', amount: 1_200_000, covered: false },
  { item: 'Labour', amount: 1_450_000, covered: true },
];

export default async function build({ dir }) {
  await writeDocx(join(dir, 'FICTIONAL_Claim_Form_MC-2026-08817.docx'), [
    '# Motor claim form (fictional)', '**Insurer:** Contoso General Insurance (fictional). **Claim no.:** MC-2026-08817.',
    { table: [['Field', 'Value'], ['Policyholder', 'Rina Kusuma'], ['Policy no.', 'MP-1102-4471'], ['Vehicle', 'B 1234 FIC, 2022 hatchback'], ['Date and time of accident', '19 September 2026, 21:40'], ['Location', 'Jl. Contoh Raya, Jakarta Selatan'], ['Driver at the time', 'Adi Kusuma (policyholder\'s son, age 20)'], ['Description', 'Hit a road divider while avoiding a motorcycle. No injuries. No other vehicle damaged.']] },
    'I declare the above is true. Signed: Rina Kusuma, 21 September 2026.',
  ], { title: 'Claim form' });
  await writePdf(join(dir, 'FICTIONAL_Police_Report_LP-4471.pdf'), [
    '# Police report LP/4471/IX/2026 (fictional)',
    'On 19 September 2026 at approximately 21:40 a hatchback, registration B 1234 FIC, driven by Adi Kusuma (20), struck the road divider on Jl. Contoh Raya. No injuries were reported. The driver stated he swerved to avoid a motorcycle. The driver presented a valid driving licence.',
  ], { title: 'Police report' });
  await writeDocx(join(dir, 'FICTIONAL_Policy_Schedule_MP-1102-4471.docx'), [
    '# Policy schedule MP-1102-4471 (fictional)',
    { table: [['Item', 'Detail'], ['Policyholder', 'Rina Kusuma'], ['Period', '1 March 2026 to 28 February 2027'], ['Cover', 'Comprehensive'], ['Named drivers', 'Rina Kusuma; Budi Kusuma'], ['Excess', `IDR ${money(EXCESS.standard)} per claim`], ['Unnamed driver excess', `Additional IDR ${money(EXCESS.unnamedDriver)} if the driver is not a named driver`], ['Exclusion 4.3', 'Upgrades, improvements and accessories not fitted at the time of the loss (betterment) are not covered.']] },
  ], { title: 'Policy schedule' });
  const c = (header, key, width = 18, numFmt) => ({ header, key, width, numFmt });
  await writeXlsx(join(dir, 'FICTIONAL_Workshop_Estimate_WS-5520.xlsx'), [{ name: 'Estimate', columns: [c('Item', 'item', 36), c('Amount IDR', 'amount', 16, '#,##0')], rows: ESTIMATE.map(({ item, amount }) => ({ item, amount })) }], { readme: ['Workshop estimate WS-5520 from Bengkel Contoso (fictional) for B 1234 FIC.'] });
  await writeDocx(join(dir, 'FICTIONAL_Photos_Note.docx'), ['# Damage photos (fictional)', 'Six photos were received by email on 21 September 2026 showing front bumper, left headlamp and bonnet damage. (Photos not included in this kit.)'], { title: 'Photos' });
  await writeDocx(join(dir, 'FICTIONAL_Vehicle_Registration_Copy.docx'), ['# Copy of vehicle registration (fictional)', 'Registration B 1234 FIC. Registered owner: Rina Kusuma.'], { title: 'Registration' });
  await writeDocx(join(dir, 'FICTIONAL_Claims_Checklist.docx'), ['# Motor own-damage claim checklist (fictional)', ...CHECKLIST.map((x) => `- ${x}`), 'The claims handler must not confirm cover or payment in writing until the assessor report is received.'], { title: 'Checklist' });

  const covered = ESTIMATE.filter((e) => e.covered).reduce((s, e) => s + e.amount, 0);
  writeReadme(dir, {
    title: 'Demo kit: Insurance claim file summary and next-action letter', scenario: 'bfsi-claims-012',
    contents: ['Claim form, police report (PDF), policy schedule, workshop estimate (Excel), photos note, registration copy, checklist'],
    setup: ['Upload the files to OneDrive in the demo tenant and open each once in Word or Excel for the web.', 'Run the scenario prompts in Copilot Chat.'],
    spoilers: [
      'Missing document: copy of driving licence (the police report says one was shown, but no copy is on file).',
      `TRAP: the driver, Adi Kusuma, is not a named driver. Excess is IDR ${money(EXCESS.standard)} plus IDR ${money(EXCESS.unnamedDriver)}.`,
      `TRAP: the LED headlamp upgrade (IDR ${money(1_200_000)}) is betterment under exclusion 4.3. Estimate total ${money(ESTIMATE.reduce((s, e) => s + e.amount, 0))}; items that may be covered ${money(covered)}.`,
      'The letter to the policyholder must request the missing document and must not confirm cover or payment.',
    ],
  });
}
