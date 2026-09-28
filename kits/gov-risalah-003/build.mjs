// Board minutes: a mixed Bahasa Indonesia / English board meeting script to record in the demo
// tenant (Teams needs a real recording to produce a transcript), plus agenda, template and key.
import { join } from 'node:path';
import { writeDocx, writeText, writeReadme, NOTICE } from '../lib.mjs';

const CAST = { PD: 'Direktur Utama (chair)', DK: 'Direktur Keuangan (CFO)', DO: 'Direktur Operasi', SP: 'Sekretaris Perusahaan' };
export const DECISIONS = [
  'Approve the 2027 capex envelope of 1.2 trillion, subject to the Board of Commissioners review in November.',
  'Defer the Sabah warehouse lease renewal decision to the October meeting pending a second quotation.',
  'Appoint the Director of Operations as sponsor for the fleet electrification pilot.',
];
export const ACTIONS = [
  { pic: 'Direktur Keuangan', action: 'Send capex breakdown by subsidiary to the Board of Commissioners', due: '15 October 2026' },
  { pic: 'Direktur Operasi', action: 'Obtain a second quotation for the Sabah warehouse lease', due: '9 October 2026' },
  { pic: 'Direktur Operasi', action: 'Present electrification pilot scope and KPIs', due: '[TO CONFIRM: "next meeting" or "end of October" said]' },
  { pic: 'Sekretaris Perusahaan', action: 'Circulate draft minutes to directors', due: '2 October 2026' },
];
const SCRIPT = [
  ['SP', 'Selamat pagi Bapak Ibu Direksi. Rapat Direksi Fabrikam Holding tanggal 28 September 2026 kami buka. Hadir empat dari lima direktur, jadi rapat kuorum. Direktur SDM berhalangan hadir.'],
  ['PD', 'Terima kasih. Kita mulai dengan agenda satu, capex 2027. Silakan, Pak CFO.'],
  ['DK', 'Thank you. The proposed 2027 capex envelope is 1.2 trillion rupiah. Sixty percent is for the two processing subsidiaries, the rest for logistics and digital.'],
  ['DO', 'Saya setuju secara prinsip, tapi porsi logistik agak kecil menurut saya. Kalau pilot elektrifikasi armada jalan, kita butuh lebih.'],
  ['DK', 'We can revisit logistics in the mid-year review. For now I suggest we approve the envelope subject to Dewan Komisaris review in November.'],
  ['PD', 'Baik. Setuju? Oke, disetujui dengan catatan review Dewan Komisaris bulan November. Pak CFO tolong kirim rincian per anak usaha ke Dekom paling lambat 15 Oktober.'],
  ['DK', 'Noted, fifteenth of October.'],
  ['PD', 'Agenda dua, perpanjangan sewa gudang di Sabah.'],
  ['DO', 'The landlord wants a twelve percent increase. I think we should get a second quote before we commit.'],
  ['PD', 'Setuju, kita tunda ke rapat Oktober. Pak Direktur Operasi, tolong dapatkan penawaran kedua sebelum tanggal 9 Oktober.'],
  ['PD', 'Agenda tiga, pilot elektrifikasi armada. Saya usulkan Direktur Operasi sebagai sponsor.'],
  ['DO', 'Siap. I will present the scope and KPIs at the next meeting, or latest end of October.'],
  ['PD', 'Oke. Ibu Sekper, tolong edarkan draf risalah paling lambat Jumat, 2 Oktober. Rapat saya tutup, terima kasih.'],
];

export default async function build({ dir }) {
  writeText(join(dir, 'MEETING_SCRIPT_to_record.txt'), [
    'MEETING SCRIPT: record this as a Teams meeting in the DEMO tenant with transcription on.', NOTICE, '',
    'Cast (4 speakers, each on their own device so the transcript attributes names):',
    ...Object.entries(CAST).map(([k, v]) => `  ${k} = ${v}`), '',
    'Set spoken language to Indonesian before starting. Read naturally; small ad-libs are fine.', '',
    ...SCRIPT.map(([k, t]) => `${k}: ${t}`), '',
  ].join('\n'));
  await writeDocx(join(dir, 'FICTIONAL_Agenda_Rapat_Direksi_2026-09-28.docx'), [
    '# Agenda Rapat Direksi / Board of Directors meeting agenda',
    '**Fabrikam Holding Group (fictional).** 28 September 2026, 09:00 WIB, Teams.',
    { table: [['No', 'Mata acara / Item', 'Presenter'], ['1', 'Capex 2027 envelope', 'Direktur Keuangan'], ['2', 'Sabah warehouse lease renewal', 'Direktur Operasi'], ['3', 'Fleet electrification pilot sponsor', 'Direktur Utama']] },
  ], { title: 'Agenda' });
  await writeDocx(join(dir, 'FICTIONAL_Template_Risalah_Rapat.docx'), [
    '# Risalah Rapat Direksi / Minutes of the Board of Directors meeting',
    '## 1. Waktu dan tempat / Date and venue', '[ ]',
    '## 2. Kehadiran dan kuorum / Attendance and quorum', '[ ]',
    '## 3. Pembahasan per mata acara / Discussion by agenda item', '[ ]',
    '## 4. Keputusan / Decisions', '[ ]',
    '## 5. Tindak lanjut / Action items', { table: [['PIC', 'Tindakan / Action', 'Tenggat / Due'], ['', '', '']] },
    '## 6. Pengesahan / Approval', 'Direktur Utama: ____________   Sekretaris Perusahaan: ____________',
  ], { title: 'Minutes template' });
  await writeDocx(join(dir, 'ANSWER_KEY_expected_minutes.docx'), [
    '# Expected minutes content (presenter only)',
    '**Attendance:** 4 of 5 directors present; Director of HR absent. Quorum confirmed by the Corporate Secretary.',
    '## Decisions', ...DECISIONS.map((d) => `- ${d}`),
    '## Action items', { table: [['PIC', 'Action', 'Due'], ...ACTIONS.map((a) => [a.pic, a.action, a.due])] },
    '## Traps',
    '- The Director of Operations disagreed on the logistics share. Minutes should record the concern neutrally, not as a decision.',
    '- The electrification deadline was ambiguous ("next meeting, or latest end of October"). Correct output marks it [TO CONFIRM].',
    '- 1.2 trillion was said in English as "1.2 trillion rupiah". Check the number survives the transcript exactly.',
  ], { title: 'Answer key' });
  writeReadme(dir, {
    title: 'Demo kit: Board meeting minutes from a Teams transcript', scenario: 'gov-risalah-003',
    contents: ['MEETING_SCRIPT_to_record.txt (13 lines, 4 speakers, about 4 minutes)', 'FICTIONAL_Agenda_Rapat_Direksi_2026-09-28.docx', 'FICTIONAL_Template_Risalah_Rapat.docx', 'ANSWER_KEY_expected_minutes.docx (presenter only)'],
    setup: ['Schedule a Teams meeting in the demo tenant with four demo accounts, each on its own device.', 'Turn on transcription, set spoken language to Indonesian, and read the script.', 'After the meeting, follow the scenario steps from the Recap tab.'],
    spoilers: [`${DECISIONS.length} decisions and ${ACTIONS.length} action items (one with an ambiguous due date).`, 'See ANSWER_KEY_expected_minutes.docx for the traps.'],
  });
}
