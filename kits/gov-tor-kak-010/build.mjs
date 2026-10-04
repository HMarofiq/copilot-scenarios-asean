// Demo kit gov-tor-kak-010 (v3): draft the KAK from a requirement memo (Part A), then evaluate four bids for the
// evaluation committee (Part B): administrative and technical checks in Word, price normalisation and scoring in Excel.
// All numbers come from model.mjs; the long texts live in text-buyer.mjs and text-vendors.mjs.
import { join } from 'node:path';
import { writeDocx, writeXlsx, writeReadme, money } from '../lib.mjs';
import * as M from './model.mjs';
import { MEMO, PEDOMAN, TEMPLATE_KAK, KAK_FINAL, ADDENDUM_1 } from './text-buyer.mjs';
import { PROPOSAL_A, PROPOSAL_B, PROPOSAL_C, PROPOSAL_D } from './text-vendors.mjs';

export * from './model.mjs';
export const TEXTS = { MEMO, PEDOMAN, TEMPLATE_KAK, KAK_FINAL, ADDENDUM_1, PROPOSAL_A, PROPOSAL_B, PROPOSAL_C, PROPOSAL_D };
export const plain = (blocks) => blocks.map((b) => (typeof b === 'string' ? b : b.table ? b.table.map((r) => r.join(' | ')).join('\n') : '')).join('\n');

export const FILES = {
  memo: '01_Nota_Dinas_Kebutuhan_EAM.docx',
  pedoman: '02_Pedoman_Pengadaan_dan_Standar_Cloud_kutipan.docx',
  template: '03_Template_KAK.docx',
  kak: '04_KAK_EAM_Grup_final.docx',
  addendum: '05_Adendum_1_KAK.docx',
  proposal: (id) => `06${id}_Penawaran_Vendor_${id}.docx`,
  price: (id) => `07${id}_Daftar_Harga_Vendor_${id}.xlsx`,
  eval: '08_Lembar_Evaluasi_Tim.xlsx',
};
const PROPOSALS = { A: PROPOSAL_A, B: PROPOSAL_B, C: PROPOSAL_C, D: PROPOSAL_D };

// The vendor's own price schedule, typed the way that vendor typed it (including its mistakes).
function priceSheet(v) {
  const usd = v.currency === 'mixed';
  const columns = [
    { header: 'No', key: 'no', width: 5 }, { header: 'Uraian', key: 'item', width: 52 }, { header: 'Satuan', key: 'unit', width: 16 },
    { header: 'Volume', key: 'qty', width: 10, numFmt: '#,##0' },
    ...(usd ? [{ header: 'Mata uang', key: 'cur', width: 11 }] : []),
    { header: 'Harga Satuan', key: 'unitPrice', width: 18, numFmt: '#,##0' }, { header: 'Jumlah', key: 'total', width: 20, numFmt: '#,##0' },
  ];
  const rows = v.lines.map((l, i) => ({ no: i + 1, item: l[0], unit: l[1], qty: l[2], cur: l[5] ?? 'IDR', unitPrice: l[3], total: l[4] ?? l[2] * l[3] }));
  const dpp = M.writtenTotal(v);
  const foot = [];
  if (v.vatBasis === 'excl' && !usd) foot.push({ item: 'TOTAL (belum termasuk PPN)', total: dpp });
  if (v.vatBasis === 'wrong12') foot.push({ item: 'Sub total', total: dpp }, { item: 'PPN 12%', total: Math.round(dpp * 0.12) }, { item: 'TOTAL TERMASUK PPN', total: Math.round(dpp * 1.12) });
  if (v.vatBasis === 'correct') {
    const nl = Math.round(dpp * M.RULES.dppFactor);
    foot.push({ item: 'Jumlah (DPP)', total: dpp }, { item: 'DPP nilai lain (11/12 x DPP)', total: nl }, { item: 'PPN 12% x DPP nilai lain', total: Math.round(nl * 0.12) }, { item: 'TOTAL TERMASUK PPN', total: dpp + Math.round(nl * 0.12) });
  }
  if (usd) {
    const usdTotal = v.lines.filter((l) => l[5] === 'USD').reduce((s, l) => s + l[2] * l[3], 0);
    const idrTotal = v.lines.filter((l) => l[5] !== 'USD').reduce((s, l) => s + l[2] * l[3], 0);
    foot.push({ item: 'Subtotal subscription (USD, excluding VAT)', cur: 'USD', total: usdTotal }, { item: 'Subtotal services (IDR, excluding VAT)', cur: 'IDR', total: idrTotal });
  }
  const notes = {
    A: ['Harga belum termasuk PPN.', 'Harga langganan tahun ke-2 dan ke-3 naik 7% per tahun (sudah tercermin pada baris 2 dan 3).', 'Pekerjaan kustom SAP di luar konektor API standar: Rp12.500.000 per man-day, tidak termasuk dalam total.'],
    B: ['Harga sudah termasuk PPN 12%.', 'Masa berlaku penawaran 60 hari kalender.'],
    C: ['Harga termasuk PPN sesuai PMK 131/2024.', 'Pelatihan 20 sesi untuk admin dan key user anak usaha.'],
    D: ['Subscription in USD per named user per year, 400 named users, 3 years. Services in IDR.', 'All prices exclude VAT.', 'SAP integration via partner marketplace connector, priced separately upon scoping.'],
  }[v.id];
  return [{ name: 'Daftar Harga', table: false, columns, rows: [...rows, {}, ...foot, {}, ...notes.map((n) => ({ item: `Catatan: ${n}` }))] }];
}

function evalWorkbook() {
  const R = M.RULES;
  const rules = [
    ['Tender', M.OWNER.tender], ['Paket', M.OWNER.tenderName], ['Tanggal batas akhir pemasukan', M.DATES.closing],
    ['HPS (DPP, 3 tahun, belum PPN) - RAHASIA', R.hpsDpp], ['HPS termasuk PPN - RAHASIA', M.HPS_INCL],
    ['PPN nominal', R.vatNominal], ['DPP nilai lain (faktor)', '11/12'], ['PPN efektif', R.vatNominal * R.dppFactor],
    ['Kurs JISDOR pada tanggal penutupan (IDR per USD)', R.usdRate], ['Jumlah named user (Adendum 1)', R.users.addendum],
    ['Masa kontrak (tahun)', R.years], ['Bobot teknis', R.techWeight], ['Bobot harga', R.priceWeight], ['Ambang batas teknis', R.passingGrade],
    ['Batas bawah kewajaran harga (x HPS)', R.lowFactor], ['Skor harga', '(harga evaluasi terendah / harga evaluasi) x 100'],
    ['Nilai akhir', '0,7 x skor teknis + 0,3 x skor harga'], ['Koreksi aritmatik', 'Harga satuan yang menentukan'],
  ];
  const tech = [
    ['A', 'PT Trey Riset Solusi', 77.0, 79.5, 77.5, ''], ['B', 'PT Relecloud Sistem Indonesia', null, null, null, 'Gugur administrasi, tidak dinilai'],
    ['C', 'PT Adatum Teknologi Nusantara', 80.0, 78.5, 80.0, ''], ['D', 'Wide World Digital Pte. Ltd.', 66.0, 62.5, 63.5, 'DRC Singapura: persyaratan wajib Adendum 1 tidak terpenuhi'],
  ];
  return [
    { name: 'Aturan', table: false, columns: [{ header: 'Parameter', key: 'k', width: 52 }, { header: 'Nilai', key: 'v', width: 40 }], rows: rules.map(([k, v]) => ({ k, v })) },
    { name: 'Skor Teknis', columns: [{ header: 'Kode', key: 'id', width: 7 }, { header: 'Peserta', key: 'n', width: 36 }, { header: 'Evaluator 1', key: 'e1', width: 12 }, { header: 'Evaluator 2', key: 'e2', width: 12 }, { header: 'Evaluator 3', key: 'e3', width: 12 }, { header: 'Catatan', key: 'c', width: 48 }],
      rows: tech.map(([id, n, e1, e2, e3, c]) => ({ id, n, e1, e2, e3, c })) },
    { name: 'Evaluasi Harga', table: false, columns: ['Kode', 'Peserta', 'Total ditawarkan', 'Basis PPN dalam penawaran', 'DPP terkoreksi (IDR)', 'Total termasuk PPN (IDR)', '% terhadap HPS', 'Catatan'].map((h) => ({ header: h, key: h, width: 20 })), rows: [] },
    { name: 'Rekap', table: false, columns: ['Kode', 'Peserta', 'Administrasi', 'Skor teknis', 'Skor harga', 'Nilai akhir', 'Peringkat', 'Catatan'].map((h) => ({ header: h, key: h, width: 18 })),
      rows: [['A', 'PT Trey Riset Solusi', 'Lulus'], ['B', 'PT Relecloud Sistem Indonesia', 'Gugur', 'Masa berlaku penawaran 60 hari; sertifikat TKDN untuk produk lain'], ['C', 'PT Adatum Teknologi Nusantara', 'Lulus'], ['D', 'Wide World Digital Pte. Ltd.', 'Gugur', 'Tanpa pernyataan Adendum 1 dan sertifikat TKDN; 400 user; DRC Singapura']]
        .map(([k, p, a, c]) => ({ Kode: k, Peserta: p, Administrasi: a, Catatan: c ?? '' })) },
    { name: 'Checks', table: false, columns: [{ header: 'Pemeriksaan', key: 'k', width: 60 }, { header: 'Status (OK / Open)', key: 's', width: 18 }, { header: 'Keterangan', key: 'n', width: 60 }],
      rows: ['Setiap daftar harga dijumlah ulang (volume x harga satuan)', 'Semua harga pada satu basis PPN (DPP + PPN efektif)', 'Harga USD dikonversi dengan kurs JISDOR', 'Semua tahun langganan termasuk kenaikan tahunan', 'Hanya peserta yang lulus administrasi dan ambang teknis diberi peringkat'].map((k) => ({ k })) },
  ];
}

export default async function build({ dir }) {
  const opt = (title) => ({ title, creator: 'Divisi Pengadaan Korporat, PT Zava Logistik Nusantara', keywords: 'KAK; tender; fictional' });
  await writeDocx(join(dir, FILES.memo), MEMO, opt('Nota Dinas kebutuhan EAM'));
  await writeDocx(join(dir, FILES.pedoman), PEDOMAN, opt('Kutipan Pedoman Pengadaan'));
  await writeDocx(join(dir, FILES.template), TEMPLATE_KAK, opt('Template KAK'));
  await writeDocx(join(dir, FILES.kak), KAK_FINAL, opt('KAK EAM Grup'));
  await writeDocx(join(dir, FILES.addendum), ADDENDUM_1, opt('Adendum 1'));
  for (const v of M.VENDORS) {
    await writeDocx(join(dir, FILES.proposal(v.id)), PROPOSALS[v.id], { title: `Penawaran ${v.name}`, creator: v.short ?? v.name, keywords: 'penawaran; fictional' });
    await writeXlsx(join(dir, FILES.price(v.id)), priceSheet(v), { title: `Daftar Kuantitas dan Harga ${v.id}`, creator: v.short ?? v.name, readme: [`Daftar Kuantitas dan Harga, ${v.name}, ${M.OWNER.tender}.`] });
  }
  await writeXlsx(join(dir, FILES.eval), evalWorkbook(), { title: 'Lembar Evaluasi Tim', readme: ['Lembar kerja Tim Evaluasi. RAHASIA: memuat HPS.', 'Isi sheet Evaluasi Harga dan Rekap sesuai sheet Aturan.'] });

  const k = M.answerKey();
  const b = (n) => `IDR ${money(n)}`;
  writeReadme(dir, {
    title: 'Kit: Procurement KAK and bid evaluation (Group EAM SaaS)', scenario: 'gov-tor-kak-010',
    contents: [
      `${FILES.memo}: the user department's request (Part A input)`, `${FILES.pedoman}: procurement rules and the cloud standard`,
      `${FILES.template}: the KAK template (Part A)`, `${FILES.kak} and ${FILES.addendum}: the issued KAK and Addendum 1 (Part B)`,
      '06A-06D: the four technical/administrative proposals', '07A-07D: the four price schedules (Excel)', `${FILES.eval}: the committee workbook with rules, HPS and technical scores`,
    ],
    setup: ['Upload all files to one OneDrive folder in a demo or test tenant and open each once.', 'Apply a non-encrypting sensitivity label if your tenant asks for one.'],
    spoilers: [
      `Part A: the KAK must not name Adatum or any brand, must not show the HPS (${MEMO_HPS}), must require DC and DRC in Indonesia (KD-022), must mark the user count [TO CONFIRM] (memo says ${M.MEMO.userSaid}, table sums to ${M.memoUserSum()}), must include TKDN+BMP >= 40% and the 70/30 evaluation with passing grade 70. Copilot may also flag 20 subsidiaries in the text vs 16 in the user table; that is correct.`,
      ...k.rows.map((r) => `Vendor ${r.id} ${r.name}: quoted ${r.id === 'D' ? 'USD 456,000 + IDR 1,630,000,000 excl. VAT' : b(r.quoted)}; corrected DPP ${b(r.dpp)}; incl. PPN 11% effective ${b(r.incl)} (${(r.pctHps * 100).toFixed(1)}% of HPS). ${r.passes ? `Passes. Price score ${r.priceScore.toFixed(2)}, final ${r.combined.toFixed(2)}.` : `Fails: ${[...r.admin, ...r.tech].join(' ')}`}`),
      `Ranking among passing bids: ${k.ranking.join(' then ')}. Ignoring vendor A's 7% uplift reverses it (${M.naiveRanking().join(' then ')}).`,
      `Vendor C arithmetic: training 20 x 18,500,000 = 370,000,000, typed as 307,000,000; unit price governs (+${b(k.rows.find((r) => r.id === 'C').arithmeticDiff)}), which makes C more expensive than A.`,
      'Vendor B looks cheapest and Vendor D is below 80% of HPS, but both fail. The committee ranks; it does not pick the winner.',
    ],
  });
}
const MEMO_HPS = M.MEMO.hpsLeak;
