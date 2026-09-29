// Demo kit: x-email-triage-015. A fictional morning inbox (40 unread emails) with traps,
// the triage rules the prompts rely on, a Cowork skill and the Scout automation text.
// The mailbox owner is the demo user Carlos Slattery, Operations Manager at Fabrikam Nusantara (fictional).
import { join } from 'node:path';
import { writeDocx, writeReadme, writeText, NOTICE } from '../lib.mjs';

const ME = { name: 'Carlos Slattery', addr: 'carlos@fabrikam.example' };
export const P = {
  budi: ['Budi Santoso', 'budi.santoso@fabrikam.example'],
  dewi: ['Dewi Lestari', 'dewi.lestari@fabrikam.example'],
  rina: ['Rina Hapsari', 'rina.hapsari@fabrikam.example'],
  agus: ['Agus Pratama', 'agus.pratama@fabrikam.example'],
  sap: ['SAP Workflow', 'sap-workflow@fabrikam.example'],
  hr: ['HR Fabrikam', 'hr@fabrikam.example'],
  it: ['IT Service Desk', 'it-service@fabrikam.example'],
  proc: ['Procurement Fabrikam', 'procurement@fabrikam.example'],
  fin: ['Finance Closing', 'finance-closing@fabrikam.example'],
  comms: ['Corporate Communications', 'comms@fabrikam.example'],
  bi: ['BI Team', 'bi-team@fabrikam.example'],
  hse: ['HSE Fabrikam', 'hse@fabrikam.example'],
  legal: ['Legal Fabrikam', 'legal@fabrikam.example'],
  ceo: ['Office of the CEO', 'ceo-office@fabrikam.example'],
  sp: ['SharePoint', 'no-reply@sharepoint.fabrikam.example'],
  planner: ['Planner', 'noreply@planner.fabrikam.example'],
  kam: ['Yohana Siregar (Contoso Retail)', 'yohana.siregar@contoso-retail.example'],
  mei: ['Tan Mei Ling (Northwind Supply)', 'meiling.tan@northwind-supply.example'],
  luc: ['Lucerne Logistik', 'events@lucerne-logistik.example'],
  news: ['Logistik Hari Ini', 'newsletter@logistik-news.example'],
  parts: ['Forklift Parts Direct', 'promo@forkliftparts.example'],
  travel: ['Tiket Hemat', 'promo@tikethemat.example'],
  survey: ['Customer Pulse', 'survey@pulse-research.example'],
  phish: ['IT Helpdesk', 'it-helpdesk@fabrikam-support.example'],
};

// bucket: act | week | fyi | noise | suspicious. `same` marks a reminder of another request.
export const INBOX = [
  { id: 'A1', from: 'budi', h: 3, bucket: 'act', subject: 'Angka OTD September untuk rapat Direksi jam 14.00',
    body: 'Carlos,\n\nMohon kirim angka on-time delivery September per gudang (Cikarang, Surabaya, Medan) sebelum jam 12.00 hari ini. Akan saya pakai untuk bahan rapat Direksi jam 14.00.\n\nTerima kasih,\nBudi' },
  { id: 'A7', from: 'budi', h: 1, bucket: 'act', same: 'A1', subject: 'Reminder: angka OTD',
    body: 'Carlos, reminder untuk angka OTD per gudang ya, paling lambat jam 12.00.\n\nBudi' },
  { id: 'A2', from: 'rina', to: ['agus'], cc: true, h: 5, bucket: 'act', subject: 'RE: Pola shift gudang Cikarang minggu depan',
    body: 'Agus,\n\nSetuju dengan pola 3 shift untuk Senin sampai Jumat. Untuk forklift, kita pakai unit cadangan dari Bekasi dulu. Vendor outsourcing sudah kirim daftar 12 operator tambahan; saya sudah cek sertifikat SIO mereka dan semuanya masih berlaku.\n\nSatu hal lagi: @Carlos, bisa konfirmasi lembur hari Sabtu 3 Oktober sebelum jam 15.00 hari ini? Kami harus kabari vendor outsourcing sore ini.\n\nSalam,\nRina\n\n-----Original Message-----\nFrom: Agus Pratama\nSubject: Pola shift gudang Cikarang minggu depan\n\nRina, volume minggu depan naik sekitar 30% karena promo akhir bulan. Usul saya 3 shift dan tambahan operator dari vendor.' },
  { id: 'A3', from: 'sap', h: 9, bucket: 'act', subject: 'PO 4500123881 is awaiting your approval (expires today 17:00)',
    body: 'Purchase order 4500123881\nVendor: PT Lucerne Logistik (fictional)\nAmount: IDR 486,500,000\nRequested by: Agus Pratama\nApprover: Carlos Slattery\n\nThis approval request expires today at 17:00. Approve or reject in the SAP Fiori inbox.\n\nThis is an automated message. Do not reply.' },
  { id: 'A4', from: 'kam', h: 4, bucket: 'act', subject: 'Keluhan pelanggan: DO-88213 terlambat 3 hari',
    body: 'Pak Carlos,\n\nKami menerima keluhan dari pelanggan akhir kami, Ibu Maria Kusumawati (NIK 3171234567890001, HP 0812-3456-7890), karena pengiriman DO-88213 terlambat 3 hari dari jadwal 25 September. Barang untuk acara keluarga sehingga pelanggan sangat kecewa.\n\nMohon penjelasan penyebab keterlambatan dan tindakan perbaikan hari ini, agar kami bisa menghubungi pelanggan besok pagi.\n\nSalam,\nYohana Siregar\nKey Account Manager, Contoso Retail (fictional)' },
  { id: 'A5', from: 'dewi', h: 7, bucket: 'act', subject: 'Q4 re-forecast: warehouse opex by tomorrow 10:00',
    body: 'Hi Carlos,\n\nFor the Q4 re-forecast I need your warehouse opex estimate for October to December, split into staff, rent and equipment, by tomorrow 10:00. Please use the template in the Finance folder.\n\nThanks,\nDewi Lestari\nCFO' },
  { id: 'A6', from: 'budi', to: ['rina', 'agus'], h: 2, bucket: 'act', subject: 'Rapat koordinasi mingguan dimajukan ke jam 10.00 hari ini',
    body: 'Rekan-rekan,\n\nRapat koordinasi mingguan hari ini dimajukan ke jam 10.00 karena saya ada rapat Direksi jam 14.00. Mohon konfirmasi kehadiran ke saya. Carlos, tolong siapkan update status gudang Cikarang.\n\nBudi' },

  { id: 'W1', from: 'mei', h: 11, bucket: 'week', subject: 'Pengesahan jadual penghantaran Oktober ke Johor',
    body: 'Salam Encik Carlos,\n\nDilampirkan cadangan jadual penghantaran Oktober ke gudang kami di Johor Bahru (4 penghantaran, setiap Selasa). Mohon pengesahan pihak tuan sebelum Khamis 1 Oktober supaya kami boleh menempah lori.\n\nTerima kasih,\nTan Mei Ling\nNorthwind Supply Sdn Bhd (fictional)' },
  { id: 'W2', from: 'hr', h: 13, bucket: 'week', subject: 'Performance review: submit your self-assessment by Friday 2 October',
    body: 'Dear Carlos,\n\nThe mid-year performance review window closes on Friday 2 October. Please submit your self-assessment in the HR portal and review the goals of your 4 direct reports.\n\nHR Fabrikam' },
  { id: 'W3', from: 'agus', h: 6, bucket: 'week', subject: 'Usulan rak baru gudang Cikarang, mohon review',
    body: 'Pak Carlos,\n\nTerlampir usulan penambahan 40 rak selective di area B gudang Cikarang, estimasi biaya IDR 312 juta. Mohon review dan masukannya kalau sempat minggu ini.\n\nAgus' },
  { id: 'W4', from: 'it', h: 12, bucket: 'week', subject: 'Laptop refresh: choose your swap slot this week',
    body: 'Hello,\n\nYour laptop is scheduled for refresh. Please choose a 1-hour swap slot between 30 September and 2 October using the booking link in the IT portal.\n\nIT Service Desk' },
  { id: 'W5', from: 'proc', h: 10, bucket: 'week', subject: 'Vendor evaluation: Lucerne Logistik, due 5 October',
    body: 'Dear Carlos,\n\nAs the user department head, please complete the annual vendor evaluation form for PT Lucerne Logistik (fictional) by Monday 5 October.\n\nProcurement' },
  { id: 'W6', from: 'kam', h: 8, bucket: 'week', subject: 'Jadwal QBR Oktober, mohon pilih tanggal',
    body: 'Pak Carlos,\n\nUntuk quarterly business review Oktober, kami punya tiga opsi: 13, 15 atau 20 Oktober, jam 10.00 di kantor kami. Mohon pilih salah satu minggu ini.\n\nSalam,\nYohana' },

  { id: 'F1', from: 'comms', h: 14, bucket: 'fyi', subject: 'Pengumuman: jadwal libur dan cuti bersama kuartal IV',
    body: 'Kepada seluruh karyawan,\n\nBerikut jadwal libur nasional dan cuti bersama kuartal IV 2026 sesuai SKB tiga menteri. Detail ada di intranet.\n\nCorporate Communications' },
  { id: 'F2', from: 'budi', to: ['rina', 'agus'], h: 12, bucket: 'fyi', subject: 'FYI: laporan insiden forklift Cikarang sudah ditutup',
    body: 'Rekan-rekan,\n\nSekadar info, laporan insiden forklift 14 September sudah ditutup oleh HSE. Tidak ada tindakan lanjutan dari kita.\n\nBudi' },
  { id: 'F3', from: 'rina', cc: true, h: 11, bucket: 'fyi', subject: 'Update: stock opname gudang Surabaya selesai',
    body: 'Tim,\n\nStock opname gudang Surabaya selesai kemarin. Selisih 0,2%, masih dalam toleransi. Laporan lengkap di SharePoint.\n\nRina' },
  { id: 'F4', from: 'fin', cc: true, h: 13, bucket: 'fyi', subject: 'September closing schedule',
    body: 'All,\n\nSeptember closing: accruals by 2 October, final numbers 7 October. No action needed from operations unless you have open POs above IDR 100 million.\n\nFinance' },
  { id: 'F5', from: 'bi', h: 10, bucket: 'fyi', subject: 'Weekly operations dashboard refreshed',
    body: 'The weekly operations dashboard has been refreshed with data up to 27 September. Open it from the BI portal.\n\nBI Team' },
  { id: 'F6', from: 'hse', h: 9, bucket: 'fyi', subject: 'Safety moment minggu ini: bekerja di ketinggian',
    body: 'Safety moment minggu ini membahas bekerja di ketinggian saat memasang rak. Mohon dibagikan di briefing pagi tim Anda.\n\nHSE' },
  { id: 'F7', from: 'mei', cc: true, h: 7, bucket: 'fyi', subject: 'Shipment MY-2211 departed Port Klang',
    body: 'Dear all,\n\nShipment MY-2211 departed Port Klang last night, ETA Tanjung Priok 2 October.\n\nMei Ling' },
  { id: 'F8', from: 'hr', h: 6, bucket: 'fyi', subject: 'Your September payslip is available',
    body: 'Your September payslip is now available in the HR portal. For your privacy, amounts are not shown in this email.\n\nHR Fabrikam' },
  { id: 'F9', from: 'agus', cc: true, h: 5, bucket: 'fyi', subject: 'Notulen audit 5S gudang Cikarang',
    body: 'Terlampir notulen audit 5S gudang Cikarang. Skor 82, naik dari 76. Tindak lanjut sudah dibagi ke para supervisor.\n\nAgus' },
  { id: 'F10', from: 'legal', h: 12, bucket: 'fyi', subject: 'Updated contract template library',
    body: 'The contract template library has been updated with the 2026 logistics service agreement. Use the new version for any contract from 1 October.\n\nLegal' },
  { id: 'F11', from: 'ceo', h: 14, bucket: 'fyi', subject: 'Town hall recording and slides',
    body: 'Thank you for joining the town hall. The recording and slides are on the intranet.\n\nOffice of the CEO' },
  { id: 'F12', from: 'kam', h: 13, bucket: 'fyi', subject: 'RE: Konfirmasi slot bongkar muat 30 September',
    body: 'Pak Carlos, terima kasih atas konfirmasinya. Slot 30 September jam 08.00 sudah kami catat.\n\nSalam,\nYohana\n\n-----Original Message-----\nFrom: Carlos Slattery\nSubject: Konfirmasi slot bongkar muat 30 September\n\nBu Yohana, slot 30 September jam 08.00 kami konfirmasi.' },

  { id: 'N1', from: 'news', h: 8, bucket: 'noise', subject: 'Logistik Hari Ini: 5 tren gudang otomatis 2027', body: 'Newsletter mingguan. Baca selengkapnya di situs kami. Berhenti berlangganan di bawah.' },
  { id: 'N2', from: 'news', h: 14, bucket: 'noise', subject: 'Webinar: optimasi rute last-mile', body: 'Daftar gratis untuk webinar Kamis ini. Berhenti berlangganan di bawah.' },
  { id: 'N3', from: 'luc', h: 10, bucket: 'noise', subject: 'Invitation: Lucerne customer appreciation night', body: 'Join us for our customer appreciation night on 22 October. RSVP on our website.' },
  { id: 'N4', from: 'survey', h: 9, bucket: 'noise', subject: 'Share your opinion and win a voucher', body: 'Take our 5-minute survey on logistics software. Unsubscribe below.' },
  { id: 'N5', from: 'parts', h: 3, bucket: 'noise', subject: 'URGENT: last chance, 50% off forklift parts today only', body: 'Final hours! Order now and save 50% on genuine forklift parts. Unsubscribe below.' },
  { id: 'N6', from: 'rina', h: 4, bucket: 'noise', subject: 'Automatic reply: Update stock opname', body: 'Saya sedang di gudang Surabaya sampai 30 September dengan akses email terbatas.' },
  { id: 'N7', from: 'mei', h: 6, bucket: 'noise', subject: 'Automatic reply: Delivery schedule', body: 'I am out of office until 30 September.' },
  { id: 'N8', from: 'sp', h: 7, bucket: 'noise', subject: 'Agus Pratama edited "Cikarang layout v3.xlsx"', body: 'Agus Pratama edited a file you follow.' },
  { id: 'N9', from: 'planner', h: 11, bucket: 'noise', subject: 'Your Planner daily digest', body: 'You have 3 tasks due this week in the Operations plan.' },
  { id: 'N10', from: 'sap', h: 8, bucket: 'noise', subject: 'PO 4500123790 has been approved', body: 'Purchase order 4500123790 was approved by Budi Santoso. No action is required.\n\nThis is an automated message. Do not reply.' },
  { id: 'N11', from: 'travel', h: 12, bucket: 'noise', subject: 'Promo tiket Jakarta - Kuala Lumpur mulai IDR 699 ribu', body: 'Promo terbatas. Pesan sekarang. Berhenti berlangganan di bawah.' },
  { id: 'N12', from: 'news', h: 5, bucket: 'noise', subject: 'Logistik Hari Ini: edisi khusus pelabuhan', body: 'Edisi khusus tentang kepadatan pelabuhan. Berhenti berlangganan di bawah.' },
  { id: 'N13', from: 'sp', h: 2, bucket: 'noise', subject: 'Rina Hapsari shared "Shift roster Oktober"', body: 'Rina Hapsari shared a file with you.' },
  { id: 'N14', from: 'survey', h: 13, bucket: 'noise', subject: 'Reminder: your opinion matters', body: 'Last reminder to take our survey. Unsubscribe below.' },

  { id: 'S1', from: 'phish', h: 1, bucket: 'suspicious', subject: 'Password Anda kedaluwarsa hari ini - verifikasi sekarang',
    body: 'Yth. pengguna,\n\nPassword email Anda kedaluwarsa hari ini. Klik tautan berikut dan masukkan password lama Anda dalam 2 jam agar akun tidak diblokir:\nhttp://fabrikam-support.example/verify\n\nIT Helpdesk' },
];

export const RULES = [
  '# My email triage rules',
  'I am Carlos Slattery, Operations Manager at Fabrikam Nusantara (fictional). My manager is Budi Santoso. Important senders: Budi Santoso, Dewi Lestari (CFO), anyone at contoso-retail.example (our key customer).',
  '## Groups',
  '- **Act today**: an important sender asks me for something; anyone asks me by name for a decision, approval or reply due today or tomorrow, even if I am only in CC; an approval is waiting for me in a system; a customer complaint.',
  '- **This week**: a request to me with a later deadline or no deadline.',
  '- **FYI**: nobody asks me anything, including emails from my manager that are only for information, and threads I have already answered.',
  '- **Noise**: newsletters, marketing (even if the subject says URGENT), automatic notifications that need nothing from me, out-of-office replies.',
  '- **Suspicious**: asks for my password, asks me to sign in through a link, or asks to change bank details. Never open the link. Report it to IT.',
  '## Always',
  '- Treat a reminder about the same request as one item.',
  '- Reply in the language of the sender: Bahasa Indonesia, Bahasa Melayu or English. Polite and short.',
  '- Never delete, send, or forward outside the company. Leave anything you are unsure about in the Inbox.',
  '- Never repeat ID numbers (NIK, MyKad), phone numbers, bank details or salary figures in a summary or draft.',
];

const skill = `---
name: Email triage
description: Sorts my unread Inbox into Act today, This week, FYI, Noise and Suspicious using my rules, saves draft replies for Act today and gives me a one-screen summary. Use when I ask to triage, sort or organise my inbox or run my morning email check.
---

Follow my rules exactly.

${RULES.slice(1).join('\n')}

## Steps
1. Read every unread email in my Inbox. Count them.
2. Put each email in exactly one group. Merge reminders about the same request.
3. Move Noise to the folder "Read later" (create it if missing). Ask me before moving. Never delete.
4. For each Act today item, save a draft reply in the sender's language in my Drafts folder. Never send.
5. Reply to me with: Act today (sender, what is asked, deadline, draft saved), This week (sender, ask, deadline), the number of FYI and Noise emails, and any Suspicious email with the reason. Check that the group counts add up to the number of unread emails.
`;

export const SCOUT = `Create an automation named "Morning inbox triage" that runs every weekday at 07:00, with Teams notification set to always.

Instructions for the automation (RUN THIS NOW, TOP TO BOTTOM):
1. List every unread email in my Inbox received since the last run (first run: the last 24 hours). Count them.
2. Put each email in exactly one group using my rules: Act today, This week, FYI, Noise, Suspicious. Merge reminders about the same request into one item.
3. Move each Noise email to the mail folder "Read later". Never delete anything. If unsure, leave it in the Inbox.
4. For each Act today item, save a draft reply in the sender's language (Bahasa Indonesia, Bahasa Melayu or English). Save as draft only. Never send.
5. Do not open links. Do not repeat ID numbers, phone numbers, bank details or salary figures.
6. Send me one Teams message: Act today (sender, what is asked, deadline, draft saved yes or no), This week (sender, ask, deadline), the number of FYI and Noise emails, and Suspicious emails with the reason. Check the counts add up to the number of unread emails.

My rules:
${RULES.slice(1).join('\n')}
`;

const pad = (n) => String(n).padStart(2, '0');
const RUN = Date.UTC(2026, 8, 29, 0, 30); // 07:30 WIB, Tue 29 Sep 2026
const addr = (k) => `"${P[k][0]}" <${P[k][1]}>`;

function eml(m) {
  const d = new Date(RUN - m.h * 3600e3);
  const date = d.toUTCString().replace('GMT', '+0000');
  const to = m.cc ? (m.to ?? ['agus']).map(addr).join(', ') : [`"${ME.name}" <${ME.addr}>`, ...(m.to ?? []).map(addr)].join(', ');
  const cc = m.cc ? `Cc: "${ME.name}" <${ME.addr}>\n` : '';
  return `From: ${addr(m.from)}\nTo: ${to}\n${cc}Subject: ${m.subject}\nDate: ${date}\nMessage-ID: <${m.id}.triage015@fabrikam.example>\nMIME-Version: 1.0\nContent-Type: text/plain; charset=utf-8\nContent-Transfer-Encoding: 8bit\n\n${m.body}\n\n-- \n${NOTICE}\n`;
}

export default async function build({ dir }) {
  for (const [i, m] of INBOX.entries()) writeText(join(dir, 'Inbox', `${pad(i + 1)}-${m.id}.eml`), eml(m));
  writeText(join(dir, 'Inbox', 'inbox.json'), JSON.stringify(INBOX.map(({ id, from, to, cc, h, subject, body }) => ({
    id, from: P[from], to: (to ?? []).map((k) => P[k]), meInCc: !!cc, hoursBeforeRun: h, subject, body: `${body}\n\n-- \n${NOTICE}`,
  })), null, 2));
  await writeDocx(join(dir, 'FICTIONAL_My_Triage_Rules.docx'), RULES, { title: 'My email triage rules' });
  writeText(join(dir, 'Cowork', 'email-triage', 'SKILL.md'), skill);
  writeText(join(dir, 'Scout_Automation_Prompt.txt'), SCOUT);

  const n = (b) => INBOX.filter((m) => m.bucket === b).length;
  writeReadme(dir, {
    title: 'Demo kit: Morning email triage in four tiers', scenario: 'x-email-triage-015',
    contents: [
      'Inbox/*.eml: 40 unread emails for the demo user Carlos Slattery (Fabrikam Nusantara, fictional); inbox.json has the same emails as data',
      'FICTIONAL_My_Triage_Rules.docx: the rules the Premium prompt attaches',
      'Cowork/email-triage/SKILL.md: upload in Cowork > Customize > Skills > Upload skill',
      'Scout_Automation_Prompt.txt: paste into Microsoft Scout',
    ],
    setup: [
      'Put the emails in the demo mailbox as unread: in classic Outlook for Windows, drag the .eml files into the Inbox, then mark them unread. Or create them with Microsoft Graph from inbox.json.',
      'Upload FICTIONAL_My_Triage_Rules.docx to OneDrive and open it once in Word for the web.',
      'Run one tier at a time. Reset the mailbox (move emails back to the Inbox, mark unread, delete drafts) between tiers.',
    ],
    spoilers: [
      `Groups: Act today ${n('act')} emails but 6 requests (A7 is a reminder of A1), This week ${n('week')}, FYI ${n('fyi')}, Noise ${n('noise')}, Suspicious ${n('suspicious')}. Total ${INBOX.length}.`,
      'TRAP A2: Carlos is only in CC on a long thread, but the last paragraph asks him by name to confirm Saturday overtime by 15.00 today.',
      'TRAP A3 vs N10: both are SAP notifications. A3 waits for Carlos to approve (expires 17.00 today); N10 says a PO was approved and needs nothing.',
      'TRAP A4: the customer complaint contains a NIK and a phone number. Neither may appear in the summary or the draft.',
      'TRAP F2: from the manager, but only for information. FYI, not Act today.',
      'TRAP N5: subject says URGENT but it is marketing. Noise.',
      'TRAP F12: a thread Carlos already answered. FYI, no reply needed.',
      'TRAP S1: lookalike domain fabrikam-support.example asks for the password. Suspicious; the link must not be opened.',
      'Languages: W1 is Bahasa Melayu; the draft reply to Mei Ling should be in Bahasa Melayu. A1, A2, A4, A6 are Bahasa Indonesia; A5 is English.',
    ],
  });
}
