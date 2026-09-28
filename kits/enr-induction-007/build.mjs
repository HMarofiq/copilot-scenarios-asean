// Contractor safety induction: site HSE rules (Rev 4) with a change log that still lists the
// superseded Rev 3 values. The trap: an induction deck built from the change log teaches the old rules.
import { join } from 'node:path';
import { writeDocx, writeReadme } from '../lib.mjs';

export const CURRENT = [
  { rule: 'Speed limit on site roads', value: '30 km/h', detail: '20 km/h within 50 m of workshops. Always give way to haul trucks.' },
  { rule: 'Rest between shifts', value: '10 hours', detail: 'Maximum shift length is 12 hours.' },
  { rule: 'Emergency muster point', value: 'Muster Point A, main gate car park', detail: 'Call internal 777 or radio channel 1.' },
  { rule: 'Blasting window', value: '12:00 to 12:30 daily', detail: 'Exclusion zone 500 m. Three long sirens before, one long siren for all clear.' },
  { rule: 'Alcohol', value: '0.00% BAC', detail: 'Random breath testing at the gate and on site.' },
  { rule: 'Working at height', value: 'Harness above 1.8 m', detail: 'Inspect the harness before every use.' },
  { rule: 'Hearing protection', value: 'Zones above 85 dB', detail: 'Zones are marked with blue signs.' },
  { rule: 'Isolation', value: 'Personal lock for every worker', detail: 'Never work under another person\'s lock.' },
  { rule: 'Mobile phones', value: 'Not while driving or walking in a haul road area', detail: 'Pull over in a designated bay to use a phone.' },
  { rule: 'Incident reporting', value: 'Before the end of your shift', detail: 'Report every incident and near miss to your supervisor.' },
];
export const SUPERSEDED = ['40 km/h', '8 hours', 'Muster Point B'];

export default async function build({ dir }) {
  await writeDocx(join(dir, 'FICTIONAL_Site_HSE_Rules_Rev4.docx'), [
    '# Northwind Nickel Mine (fictional): Site HSE Rules',
    '**Document:** NW-HSE-STD-001. **Revision:** 4. **Effective:** 1 September 2026. **Owner:** Site HSE Manager.',
    'Every contractor must complete induction on these rules before entering the site. These rules apply to all employees, contractors and visitors.',
    '## Current rules',
    { table: [['No', 'Rule', 'Requirement', 'Detail'], ...CURRENT.map((r, i) => [String(i + 1), r.rule, r.value, r.detail])] },
    '## Site PPE',
    'Minimum PPE everywhere outside offices: hard hat, safety glasses, steel-toe boots and a high-visibility vest.',
    { pageBreak: true },
    '## Change log',
    { table: [['Revision', 'Date', 'Change'], ['3', '1 March 2025', 'Speed limit 40 km/h on site roads. Rest between shifts 8 hours. Muster Point B at the old workshop.'], ['4', '1 September 2026', 'Speed limit reduced to 30 km/h. Rest between shifts increased to 10 hours. Muster Point B withdrawn (old workshop demolished); all personnel use Muster Point A.']] },
    '> Rev 3 values are shown for history only. They no longer apply.',
  ], { title: 'Site HSE Rules Rev 4' });

  writeReadme(dir, {
    title: 'Demo kit: Bilingual contractor safety induction deck', scenario: 'enr-induction-007',
    contents: ['FICTIONAL_Site_HSE_Rules_Rev4.docx (10 current rules plus a change log with superseded values)'],
    setup: ['Upload the rules to OneDrive in the demo tenant and open it once in Word for the web.', 'Run the scenario prompt in Copilot Chat or PowerPoint.'],
    spoilers: [
      'Every number on the slides must match the current rules table: ' + CURRENT.map((r) => `${r.rule} = ${r.value}`).join('; ') + '.',
      `TRAP: the change log still lists ${SUPERSEDED.join(', ')}. None of these may appear on a slide or in the quiz.`,
      'The quiz answers belong in the speaker notes, not on the slides.',
    ],
  });
}
