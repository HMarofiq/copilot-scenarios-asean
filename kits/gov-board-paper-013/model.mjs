// Model for gov-board-paper-013 (v3): the facts every divisional input must agree or deliberately disagree on.
// World: Zava Group (fictional), see canon/zava.mjs. Acquirer: PT Zava Gudang Logistik Tbk (listed subsidiary of the state-linked
// PT Zava Logistik Nusantara). Target: PT Coho Rantai Dingin ("Project Kutub"). Amounts in IDR billion.

export const ACQ = {
  name: 'PT Zava Gudang Logistik Tbk', ticker: 'ZGLD', parent: 'PT Zava Logistik Nusantara', parentStake: 65,
  equity: 4_800, assets: 9_600, revenue: 7_200, statementDate: '30 Juni 2026 (laporan keuangan interim yang ditelaah)',
  netDebtToEbitda: 1.6, covenant: 3.0,
};
export const TARGET = {
  name: 'PT Coho Rantai Dingin', code: 'Proyek Kutub', seller: 'Blue Yonder Capital Fund II', sellerStake: 70, founderStake: 30,
  what: 'cold-chain logistics: 11 cold storage sites (Cikarang, Surabaya, Medan, Makassar and 7 others), 420 reefer trucks, pharmaceutical and food customers',
  revenue2025: 1_860, ebitdaAudited: 214, ebitdaMgmt: 238, disposalGain: 24, employees: 1_850,
  netDebt: 205, fleetAgeYears: 7.8, capexBacklog: 180,
};
export const DEAL = {
  stake: 60, multiple: 8.9, ev: 1_905, // EV = 8.9 x audited EBITDA 214 = 1,904.6, rounded to 1,905
  equity100: 1_700, price: 1_020, // (1,905 - 205) x 60%
  loiPrice: 940, loiDate: '12 Agustus 2026', // superseded by negotiation; the stale Risk input still uses it
  escrowPct: 5, escrow: 51, taxExposure: 38,
  funding: { cash: 408, loan: 612, lender: 'PT Bank Woodgrove Indonesia' }, proFormaNetDebtToEbitda: 2.3,
  appraiser: 'KJPP Lucerne dan Rekan', appraisalRange: [1_004, 1_048], fairness: 'wajar (fair)',
  synergyYear3: 45,
};
export const ratio = (price) => Math.round((price / ACQ.equity) * 10_000) / 100; // % of equity, 2 decimals
export const MATERIAL_THRESHOLD = 20;
export const RUPS_THRESHOLD = 50;

export const DATES = {
  today: 'Senin, 5 Oktober 2026', draftDue: 'Selasa, 6 Oktober 2026 pukul 10.00 WIB',
  direksiMeeting: 'Rabu, 7 Oktober 2026 pukul 09.00 WIB', dekomMeeting: 'Rabu, 14 Oktober 2026',
  circulateBy: 'Jumat, 9 Oktober 2026', signingTarget: 'akhir Oktober 2026', completionTarget: 'Desember 2026',
  riskInputDate: '4 September 2026', financeInputDate: '2 Oktober 2026', legalInputDate: '1 Oktober 2026',
  opsInputDate: '30 September 2026', strategyInputDate: '28 September 2026', cdobExpiry: '31 Oktober 2026',
};

export const PEOPLE = {
  presdir: 'Rizal Hakim, Direktur Utama',
  cfo: 'Maya Anggraini, Direktur Keuangan',
  corsec: 'Dewi Lestari, Corporate Secretary',
  drafter: 'you, Manager Corporate Secretary Office',
  strategy: 'Aditya Nugroho, VP Strategy & Business Development',
  legal: 'Yulia Siregar, VP Legal',
  tax: 'Ferry Gunawan, Head of Tax',
  ops: 'Heru Santoso, Direktur Operasi',
  risk: 'Nadia Putri, VP Risk Management',
  hc: 'Human Capital (VP Human Capital: Sri Wahyuni)',
  conflicted: 'Ibu Laras Pratiwi, Komisaris Independen',
};

// Template sections and owners. The drafter writes 1 and 10 from the others.
export const SECTIONS = [
  ['1', 'Ringkasan Eksekutif', 'Drafter (Corporate Secretary Office)'],
  ['2', 'Latar Belakang dan Rasional Strategis', 'Strategy & Business Development'],
  ['3', 'Struktur dan Nilai Transaksi', 'Keuangan'],
  ['4', 'Analisis Keuangan dan Pendanaan', 'Keuangan'],
  ['5', 'Hasil Due Diligence Hukum dan Perpajakan', 'Legal dan Pajak'],
  ['6', 'Operasional dan Rencana Integrasi', 'Operasi'],
  ['7', 'Dampak terhadap SDM', 'Human Capital'],
  ['8', 'Analisis Risiko dan Mitigasi', 'Risk Management'],
  ['9', 'Kepatuhan dan Persetujuan yang Diperlukan', 'Legal dan Corporate Secretary'],
  ['10', 'Rekomendasi dan Usulan Keputusan Direksi', 'Drafter (Corporate Secretary Office)'],
];

export const CPS = [
  'Persetujuan Dewan Komisaris ZGLD sesuai Anggaran Dasar (Komisaris Independen yang memiliki benturan kepentingan tidak ikut memberikan persetujuan).',
  'Persetujuan tertulis pemegang saham utama PT Zava Logistik Nusantara sesuai Anggaran Dasar ZGLD untuk penyertaan di atas Rp500 miliar.',
  'Persetujuan pemilik lahan (PT Litware Properti) atas perubahan pengendalian untuk sewa gudang berpendingin Cikarang.',
  `Sertifikat CDOB (Cara Distribusi Obat yang Baik) rantai dingin dari BPOM milik target diperpanjang dan berlaku pada tanggal penyelesaian (sertifikat saat ini berakhir ${'31 Oktober 2026'}).`,
  'Tidak terjadi perubahan merugikan yang material (no material adverse change) sampai tanggal penyelesaian.',
];

// The answer key: what a correct board paper and Corporate Secretary check must show.
export function answerKey() {
  return {
    price: DEAL.price, ev: DEAL.ev, equity100: DEAL.equity100, netDebt: TARGET.netDebt, stake: DEAL.stake,
    ratioNow: ratio(DEAL.price), ratioStale: ratio(DEAL.loiPrice),
    material: ratio(DEAL.price) >= MATERIAL_THRESHOLD, materialIfStale: ratio(DEAL.loiPrice) >= MATERIAL_THRESHOLD,
    rupsNeeded: ratio(DEAL.price) > RUPS_THRESHOLD,
    conflict: { what: 'EBITDA 2025', finance: TARGET.ebitdaAudited, ops: TARGET.ebitdaMgmt, gap: TARGET.ebitdaMgmt - TARGET.ebitdaAudited, explainedBy: TARGET.disposalGain },
    notAConflict: `Strategy's "Rp1,9 triliun" is the 100% enterprise value (${DEAL.ev}), not the price: ${DEAL.ev} - net debt ${TARGET.netDebt} = equity ${DEAL.equity100}; 60% = ${DEAL.price}.`,
    stale: `Risk input (${DATES.riskInputDate}) uses the LOI price ${DEAL.loiPrice} (ratio ${ratio(DEAL.loiPrice)}%, "not material") and 100% internal funding; superseded by Finance (${DATES.financeInputDate}): ${DEAL.price}, ${ratio(DEAL.price)}%, 40% cash / 60% loan.`,
    toConfirm: ['7 Dampak terhadap SDM (Human Capital has not submitted; Operations mentions headcount but does not own the section)'],
    outsideRemit: 'Operations says KPPU approval is needed before signing; Legal (the owner) says post-completion notification within 30 working days. Follow Legal; flag the difference.',
    recusal: `${PEOPLE.conflicted} sits on the investment committee of ${TARGET.seller}: conflict of interest (POJK 42/2020 procedures), she must not take part in the Dewan Komisaris approval.`,
    cps: CPS.length,
    approvals: ['Dewan Komisaris ZGLD', 'PT Zava Logistik Nusantara as majority shareholder', 'Independent appraiser report and fairness opinion (material transaction, POJK 17/2020)', 'Public disclosure after signing (POJK 17/2020; material information rules as amended by POJK 45/2024)', 'KPPU notification within 30 working days after completion (not a condition precedent)'],
    noRups: 'RUPS approval not required: 21.25% is below 50% of equity and the fairness opinion says fair.',
  };
}
