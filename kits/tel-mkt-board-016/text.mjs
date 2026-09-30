// Long texts for tel-mkt-board-016. Every number is computed from model.mjs, never typed.
import { WORLD as W, PEOPLE as P, CAMPAIGNS as C, RULES, LEGAL, HISTORY, GOOGLE_IVT_CREDIT, TIKTOK_EXPORT, answerKey } from './model.mjs';

const K = answerKey();
const RH = C.RH, MU = C.MU, MY = C.MY5G;
// Indonesian number style: dot thousands, comma decimals.
export const idn = (x, d = 0) => x.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
export const en = (x, d = 0) => x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const bn = (x) => idn(x / 1e9, 2); // "3,40" for Rp3,40 M (miliar)

const header = (from, to, cc, date, subject, att = []) => [
  `**From:** ${from}`, `**To:** ${to}`, ...(cc ? [`**Cc:** ${cc}`] : []), `**Sent:** ${date}`, `**Subject:** ${subject}`,
  ...(att.length ? [`**Attachments:** ${att.join('; ')}`] : []), '',
];
const who = (p) => `${p.name} <${p.email}>`;

export const EMAIL_CMO = [
  ...header(who(P.cmo), who(P.user), `${who(P.rafm)}; ${who(P.my)}; ${who(P.bi)}`, `${W.requestDate} 16:48 WIB`,
    'Board pack Marketing September 2026 - due Selasa 12:00'),
  'Nadia,',
  `Seperti biasa, Direksi minta update kampanye marketing bulanan di rapat Direksi ${W.boardDate}. Saya perlu draft deck di inbox saya paling lambat **${W.dueDate}** supaya sempat saya review sebelum dikirim ke Corporate Secretary jam 17:00.`,
  'Bulan ini tiga kampanye yang masih jalan di September: Rumah Terhubung (Relecloud Home), Merdeka Unlimited (prepaid, termasuk Ajak Teman), dan Hari Malaysia 5G dari tim Farah. Brand always-on tidak perlu masuk scorecard kampanye, cukup di lampiran "other spend".',
  '## Catatan dari rapat Direksi Agustus (tolong ditindaklanjuti di deck ini)',
  `- **Kredibilitas angka.** Pak Hendra (Direktur Keuangan) tanya kenapa agency melaporkan konversi jauh di atas aktivasi kita. Mulai bulan ini semua volume di deck harus dari BI extract (backend), bukan dari platform. Angka platform boleh ditampilkan sebagai pembanding, tapi jangan dijumlahkan.`,
  `- **CAGR Relecloud Home.** Bu Ratna (Direktur Utama) menanyakan kenapa slide growth kita bilang CAGR pelanggan FTTH 5 tahun cuma ${idn(K.cagr.wrongN5, 1)}%, padahal kesannya growth kita lebih tinggi. Tolong dicek ulang rumusnya dan jelaskan periodenya dengan jelas (tahun awal, tahun akhir). Angka 2026 masih year-to-date, jangan diperlakukan seperti setahun penuh.`,
  '- **Kualitas akuisisi prepaid.** Direksi minta angka gross adds yang "bersih", setelah dikurangi aktivasi yang di-flag RAFM. Mas Budi sudah kirim catatannya.',
  '- **Malaysia.** Semua angka Relecloud Malaysia dalam IDR pakai kurs budget sesuai Rules di tracker, dan tampilkan juga angka MYR-nya. Tolong pastikan definisi "new 5G customers" sama dengan target kita (new lines, bukan upgrade).',
  '## Yang saya butuhkan',
  '- Deck maksimal 10 slide dalam template board kita: ringkasan eksekutif satu halaman dengan traffic light per kampanye, hasil per kampanye vs target dan vs Agustus, growth (CAGR FTTH), concerns/risiko, insight dan usulan keputusan untuk Direksi.',
  '- Workbook pendukung (tracker) sudah terisi scorecard September dan cek rekonsiliasinya, supaya kalau Pak Hendra tanya angkanya bisa langsung ditunjukkan.',
  `- Semua spend sesuai Rules di tracker: net media ditambah agency fee, tanpa PPN/SST. Anggaran September untuk tiga kampanye totalnya Rp${bn(RH.budgetByMonth.Sep + MU.budgetByMonth.Sep + MY.budgetByMonthMYR.Sep * RULES.fxBudgetMYR)} M.`,
  '- Kalau ada yang belum jelas atau datanya bertentangan, tulis saja di deck sebagai catatan, jangan ditebak.',
  'Invoice Wide World sudah masuk tadi siang, BI extract dijadwalkan keluar Jumat pagi, dan export platform sudah ada di folder bersama. Kalau ada kendala kabari saya Senin pagi.',
  'Thanks,',
  'Dewi',
  '',
  `${P.cmo.name}`, `${P.cmo.title}`, W.group,
];

export const EMAIL_MY = [
  ...header(who(P.my), who(P.user), who(P.cmo), 'Thursday 1 October 2026 19:05 MYT', 'RE: September numbers - Hari Malaysia 5G'),
  'Salam Nadia,',
  'Sorry for the late one, our finance only released the invoices this afternoon. Hari Malaysia 5G closed on 30 September and it was our best month this year. Quick summary for the board pack below; happy to jump on a call Monday.',
  '## Headline',
  `- **${en(K.my.wrongNew)} new 5G customers** in September against the 15,000 we planned (new + upgrade). Very strong Malaysia Day weekend, 16 to 20 Sept.`,
  `- **Total spend RM ${en(K.my.invoicedMYR)}** (as invoiced, incl. ${RULES.sstRate}% SST). In IDR that is **Rp ${en(K.my.wrongSpendM, 1)} million** at today's rate of ${en(RULES.fxSpotMYR)}.`,
  `- **Cost per 5G customer about RM ${en(Math.round(K.my.invoicedMYR / K.my.wrongNew))}**, well below the RM ${MY.target.costPerMYR} target.`,
  `- TikTok is our rising star: leads up **${Math.round((MY.tiktokLeads.sep / MY.tiktokLeads.aug - 1) * 100)}%** month on month (from ${MY.tiktokLeads.aug} to ${MY.tiktokLeads.sep}).`,
  '## Breakdown from our BSS report (cut-off 30 Sep 23:59 MYT)',
  { table: [
    ['Item', 'September', 'Target', 'Note'],
    ['New 5G postpaid lines (incl. port-ins)', en(MY.backend.newLines), en(MY.target.newLines), `of which MNP port-ins ${en(MY.backend.portIns)}`],
    ['Upgrades of existing customers to 5G plans', en(MY.backend.upgrades), en(MY.target.upgrades), `avg ARPU uplift RM ${MY.backend.upgradeArpuUpliftMYR}/month`],
    ['Total 5G customers', en(K.my.wrongNew), en(MY.target.newLines + MY.target.upgrades), ''],
    ['Spend incl. SST (RM)', en(K.my.invoicedMYR), en(MY.budgetByMonthMYR.Sep), 'Meta, Google, TikTok, agency fee'],
  ] },
  `August (launch week, from 25 Aug) spend was RM ${en(MY.actualPriorMYR.Aug)} net as you already have in the tracker.`,
  'One more thing: port-ins came mostly from one competitor after their network issue in Klang Valley on 12 Sept, so part of this might not repeat in October.',
  'Terima kasih dan selamat berhujung minggu,',
  'Farah',
  '', `${P.my.name}`, P.my.title, W.opcoMY,
];

export const NOTES = [
  '# Catatan pendukung board pack Marketing September 2026',
  '> Dikumpulkan oleh Group Marketing dari tiga unit. Dokumen internal.',
  '## 1. RAFM: aktivasi Merdeka Unlimited yang di-flag',
  `**Dari:** ${P.rafm.name}, ${P.rafm.title} | **Tanggal:** 2 Oktober 2026`,
  `Per BI extract 2 Oktober 07:00 WIB, dari ${idn(MU.backend.activations)} aktivasi berkode ${MU.code} di bulan September, sebanyak **${idn(MU.backend.flagged)} aktivasi (${idn(K.mu.flaggedPctOfActivations, 1)}%)** di-flag oleh rule RAFM. Flag ini sudah final untuk September; kolom flagged_rafm di extract sama dengan angka ini.`,
  `- ${idn(MU.backend.flaggedReferral)} flag berasal dari kanal referral Ajak Teman, yaitu ${idn(K.mu.flaggedReferralPct, 1)}% dari ${idn(MU.backend.referral)} aktivasi referral. Sisanya ${idn(MU.backend.flagged - MU.backend.flaggedReferral)} dari outlet.`,
  `- Polanya terkonsentrasi di ${MU.backend.flaggedKab}, mulai sekitar 14 September: satu NIK dipakai untuk banyak aktivasi referral dalam waktu singkat, nomor-nomor tersebut hanya menerima bonus kuota referral lalu tidak ada transaksi. Pola khas bonus farming.`,
  '- Rule yang dipakai: R-07 (lebih dari 3 aktivasi referral per NIK dalam 30 hari), R-11 (perangkat yang sama untuk lebih dari 5 SIM baru), R-14 (tidak ada event berbayar 7 hari setelah bonus diterima).',
  '- Aktivasi yang di-flag **tidak boleh dihitung sebagai gross adds valid**. Bonus referral untuk nomor tersebut sudah ditahan per 28 September.',
  `- Untuk referensi kualitas: kohort Agustus Merdeka Unlimited punya RGS30 ${idn(MU.rgs30Aug, 1)}%. Kohort September baru bisa diukur RGS30-nya akhir Oktober, jadi jangan dipakai angka Agustus sebagai angka September.`,
  'Usulan RAFM: batasi Ajak Teman maksimal 3 referral per NIK, tambah verifikasi perangkat di outlet Karawang, dan jangan perpanjang bonus referral setelah kampanye berakhir tanpa kontrol tambahan.',
  '## 2. Legal & Regulatory: klaim "unlimited" dan FUP',
  `**Dari:** ${P.legal.name}, ${P.legal.title} | **Tanggal:** 1 Oktober 2026`,
  `Selama ${LEGAL.from} sampai ${LEGAL.to} 2026, **${LEGAL.creativesMissingFup} dari ${LEGAL.creativesTotal} materi iklan TikTok** Merdeka Unlimited tayang tanpa baris keterangan FUP (kecepatan turun setelah 50 GB). Materi sudah diganti pada ${LEGAL.to} setelah kami menegur agency.`,
  `- Keluhan pelanggan terkait FUP naik menjadi **${idn(LEGAL.fupComplaints)} di September** dari ${LEGAL.complaintsAug} di Agustus (data contact centre, kategori "kecepatan turun / tidak unlimited").`,
  '- Sampai 2 Oktober belum ada surat atau teguran dari regulator maupun lembaga konsumen. Risiko tetap ada karena klaim "unlimited" wajib menjelaskan syaratnya secara jelas.',
  '- Rekomendasi Legal: Direksi perlu diinformasikan sebagai concern; semua materi berikutnya wajib lolos checklist klaim sebelum tayang, dan kampanye lanjutan tidak memakai kata "unlimited" tanpa keterangan FUP di materi yang sama.',
  '## 3. Field Operations: backlog instalasi Relecloud Home',
  `**Dari:** Field Operations Jabodetabek | **Tanggal:** 2 Oktober 2026`,
  `- Per 2 Oktober ada **${idn(RH.backend.backlogOver14d)} order Rumah Terhubung yang menunggu instalasi lebih dari 14 hari**, terutama di Bekasi dan Depok. Penyebabnya kapasitas teknisi: mitra instalasi kedua baru mulai 15 Oktober.`,
  '- Pelanggan yang menunggu lebih dari 14 hari punya tingkat pembatalan jauh lebih tinggi. Kami sarankan permintaan baru di Bekasi dan Depok tidak didorong lebih jauh sampai kapasitas bertambah.',
  `- Instalasi September: ${idn(RH.backend.installs)} (termasuk sebagian order Agustus).`,
];

export const INVOICE = (inv) => {
  const L = (c, p) => inv.lines.find((l) => l.campaign === c && l.platform === p).amount;
  const row = (a, b) => `| ${a.padEnd(58)} | ${b.padStart(16)} |`;
  return [
    '# INVOICE',
    `${W.agency} | Jl. Jend. Sudirman Kav. 99, Jakarta 12190 (fictional) | NPWP 00.000.000.0-000.000`,
    `Invoice No.: WWD/INV/2026/09/0418 | Date: 1 October 2026 | Due: 31 October 2026`,
    `Bill to: ${W.opcoID}, attn. Group Marketing (${P.user.name})`,
    'Period: 1 - 30 September 2026. Media billed at platform cost (net of platform tax); TikTok per TikTok billing statement dated 1 Oct 2026.',
    '## Charges (IDR)',
    row('Description', 'Amount'),
    row('-'.repeat(58), '-'.repeat(16)),
    row('Media Meta - RH-2607 Rumah Terhubung', idn(L('RH', 'meta'))),
    row('Media Google Ads - RH-2607 Rumah Terhubung', idn(L('RH', 'google'))),
    row('Media TikTok - RH-2607 Rumah Terhubung', idn(L('RH', 'tiktok'))),
    row('Media Meta - MU-2608 Merdeka Unlimited', idn(L('MU', 'meta'))),
    row('Media Google Ads - MU-2608 Merdeka Unlimited', idn(L('MU', 'google'))),
    row('Media TikTok - MU-2608 Merdeka Unlimited', idn(L('MU', 'tiktok'))),
    row('Media Meta - Brand Always-On', idn(L('OTHER', 'meta'))),
    row('Total media', idn(inv.media)),
    row(`Agency fee ${RULES.agencyFeePct}% of total media`, idn(inv.fee)),
    row(`Credit: Google Ads invalid activity (${GOOGLE_IVT_CREDIT.trafficMonth}, MU-2608)`, idn(inv.credit)),
    row('Subtotal', idn(inv.subtotal)),
    row(`DPP Nilai Lain (${RULES.ppnDppNum}/${RULES.ppnDppDen} x subtotal)`, idn(inv.dpp)),
    row(`PPN ${RULES.ppnRate}% x DPP`, idn(inv.ppn)),
    row('TOTAL DUE', idn(inv.total)),
    'Payment to Bank Contoso (fictional) a/c 000-000-0000. Please quote the invoice number.',
    { pageBreak: true },
    '# September 2026 performance recap',
    `Prepared by ${P.agency.name}, ${P.agency.title}, ${W.agency}. Source: platform dashboards (Meta, Google Ads, TikTok Ads Manager), default attribution per platform.`,
    `## Merdeka Unlimited: an outstanding close`,
    `- **${en(K.mu.platformSum)} conversions** across Meta, Google and TikTok, **${Math.round(K.mu.platformSum / MU.target.validAdds * 100)}% of the 150,000 target**.`,
    `- **Blended CPA IDR ${en(K.mu.agencyCpa)}**, 40% below the IDR ${en(MU.target.costPer)} target.`,
    '- TikTok delivered the lowest CPA; we recommend moving 30% of Q4 prepaid budget to TikTok.',
    `## Rumah Terhubung: demand is there`,
    `- **${en(K.rh.platformSum)} orders** tracked by pixel and Google tag, ${Math.round(K.rh.platformSum / RH.target.orders * 100)}% of the order target.`,
    '- We recommend increasing October FTTH media by 20% to capture 10.10 demand, focusing on Bekasi and Depok where response is strongest.',
    '## Notes',
    `- The Google credit on this invoice refunds invalid clicks from ${GOOGLE_IVT_CREDIT.trafficMonth}.`,
    `- TikTok figures in the dashboard export shared on 30 Sep were pulled at ${TIKTOK_EXPORT.pulledAt.split(' ')[1]} WIB, before the day closed; the invoice uses TikTok's final billing statement.`,
    '- Two TikTok creatives were updated on 12 Sep at the client\'s request.',
  ];
};

export const HISTORY_NOTE = `FTTH subscribers (Relecloud Home), thousand, year-end as published in the annual report. 2026 is year-to-date (30 Sep) and is NOT a full year.`;
export const AUG_CAGR_NOTE = `As presented to the Direksi on 9 Sep 2026: "5-year CAGR FTTH subscribers 2021-2025: ${en(K.cagr.wrongN5, 1)}%". Direksi questioned this figure (see CMO email).`;
export { HISTORY };
