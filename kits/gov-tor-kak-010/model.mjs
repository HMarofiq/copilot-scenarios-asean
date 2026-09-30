// Model for gov-tor-kak-010 (v3): every number once. The documents, the price schedules, the answer key and the
// tests are all derived from here, so they cannot drift.
// World: Fabrikam Group (fictional state-owned logistics holding). Owner: PT Fabrikam Nusantara (Persero).
// Tender: Group Enterprise Asset Management (EAM) SaaS for 20 subsidiaries, 3-year subscription plus implementation.

export const OWNER = {
  name: 'PT Fabrikam Nusantara (Persero)', short: 'Fabrikam Nusantara', group: 'Fabrikam Group',
  what: 'state-owned logistics holding: ports, warehousing, trucking and cold storage through 20 subsidiaries',
  procurementRule: 'Pedoman Pengadaan Barang/Jasa, Keputusan Direksi No. KD-017/DIR/FN/2025',
  itRule: 'Standar Keamanan dan Tata Kelola Layanan Cloud, Keputusan Direksi No. KD-022/DIR/FN/2025',
  tender: 'Tender No. 0142/PGD-FN/VIII/2026', tenderName: 'Pengadaan Sistem Enterprise Asset Management (EAM) Grup berbasis SaaS',
};

export const PEOPLE = {
  requester: 'Bambang Wicaksono, VP Group Asset Management (Direktorat Operasi)',
  procurementHead: 'Ratna Kusumawati, SVP Pengadaan Korporat',
  officer: 'you, Procurement Officer (Divisi Pengadaan Korporat)',
  itGov: 'Dimas Prasetyo, VP IT Governance & Security',
  committeeChair: 'Hendro Saputra, Ketua Tim Evaluasi',
};

export const DATES = {
  memo: '1 September 2026', kakIssued: '3 September 2026', aanwijzing: '10 September 2026',
  addendum: '11 September 2026', closing: '21 September 2026', evaluation: '30 September 2026',
  validityRequiredUntil: '20 December 2026', // 90 calendar days after closing
  plannedAward: '16 November 2026',
};

export const RULES = {
  vatNominal: 0.12, dppFactor: 11 / 12, // PMK 131/2024: PPN 12% on DPP nilai lain 11/12, so effective 11%
  usdRate: 16_380, // JISDOR middle rate on the closing date, stated in the KAK
  hpsDpp: 13_200_000_000, // confidential owner estimate, 3 years, excluding PPN
  techWeight: 0.7, priceWeight: 0.3, passingGrade: 70,
  lowFactor: 0.8, // below 80% of HPS: price reasonableness clarification
  tkdnMin: 40, validityDays: 90, users: { original: 400, addendum: 500 }, years: 3,
  pmMinYears: 8, pmMinEamProjects: 2,
};
export const effVat = RULES.vatNominal * RULES.dppFactor; // 0.11
export const inclVat = (dpp) => Math.round(dpp * (1 + effVat));
export const HPS_INCL = inclVat(RULES.hpsDpp);

// Requirement memo facts (Part A traps)
export const MEMO = {
  userTableBySubsidiary: [
    ['PT Fabrikam Pelabuhan Nusantara', 118], ['PT Fabrikam Gudang Logistik', 96], ['PT Fabrikam Truk Ekspres', 84],
    ['PT Fabrikam Rantai Dingin', 52], ['Holding (Direktorat Operasi, Keuangan, TI)', 38], ['12 subsidiaries lainnya (total)', 72],
  ],
  userSaid: 400, // memo text says "sekitar 400 pengguna" but the table sums to 460
  subsidiariesSaid: 20, // the memo says 20 subsidiaries; its user table lists 4 named ones plus 12 others (16)
  assets: 18_400, sites: 63,
  brandMentioned: 'Adatum EAM Cloud', // must not appear in a KAK
  hostingSaid: 'Singapura juga tidak masalah', // conflicts with KD-022 (DC and DRC in Indonesia)
  hpsLeak: 'sekitar Rp14,65 miliar termasuk PPN', // must not appear in the KAK
};
export const memoUserSum = () => MEMO.userTableBySubsidiary.reduce((s, r) => s + r[1], 0);

// Vendor bids. Lines: [item, unit, qty, unitPrice, writtenTotal?]. Prices in IDR unless currency 'USD'.
export const VENDORS = [
  {
    id: 'A', name: 'PT Trey Riset Solusi', product: 'Trey Asset360', vatBasis: 'excl', currency: 'IDR',
    validityDays: 90, validityUntil: '20 December 2026', ackAddendum: true, users: 500, dc: 'Jakarta (Cikarang)', drc: 'Surabaya',
    tkdn: { tkdn: 36.4, bmp: 6.7, product: 'Trey Asset360 v5', validUntil: '14 March 2028', holder: 'PT Trey Riset Solusi' },
    pm: { years: 11, eamProjects: 3 }, uplift: 0.07, tech: 78.0,
    clarify: ['Custom SAP S/4HANA work beyond the standard API connector is charged per man-day (IDR 12,500,000), outside the quoted total.'],
    lines: [
      ['Langganan Trey Asset360, 500 named users, tahun 1', 'user/tahun', 500, 6_400_000],
      ['Langganan tahun 2 (kenaikan 7%)', 'user/tahun', 500, 6_848_000],
      ['Langganan tahun 3 (kenaikan 7%)', 'user/tahun', 500, 7_327_360],
      ['Implementasi dan konfigurasi', 'lot', 1, 1_450_000_000],
      ['Migrasi data dari spreadsheet anak usaha', 'lot', 1, 380_000_000],
      ['Pelatihan admin dan key user', 'sesi', 16, 15_000_000],
      ['Integrasi SAP S/4HANA (konektor API standar)', 'lot', 1, 520_000_000],
    ],
  },
  {
    id: 'B', name: 'PT Relecloud Sistem Indonesia', product: 'Relecloud Maintain', vatBasis: 'wrong12', currency: 'IDR',
    validityDays: 60, validityUntil: '20 November 2026', ackAddendum: true, users: 500, dc: 'Jakarta', drc: 'Batam',
    tkdn: { tkdn: 38.2, bmp: 7.5, product: 'Relecloud HRIS v4', validUntil: '30 June 2027', holder: 'PT Relecloud Sistem Indonesia' },
    pm: { years: 9, eamProjects: 2 }, uplift: 0, tech: null,
    clarify: [],
    lines: [
      ['Langganan Relecloud Maintain, 500 named users', 'user/tahun', 1500, 5_400_000],
      ['Implementasi', 'lot', 1, 1_300_000_000],
      ['Migrasi data', 'lot', 1, 350_000_000],
      ['Pelatihan', 'sesi', 10, 20_000_000],
      ['Integrasi SAP', 'lot', 1, 1_450_000_000],
    ],
  },
  {
    id: 'C', name: 'PT Adatum Teknologi Nusantara', product: 'Adatum EAM Cloud', vatBasis: 'correct', currency: 'IDR',
    validityDays: 120, validityUntil: '19 January 2027', ackAddendum: true, users: 500, dc: 'Jakarta', drc: 'Batam',
    tkdn: { tkdn: 34.7, bmp: 6.5, product: 'Adatum EAM Cloud v4', validUntil: '2 September 2027', holder: 'PT Adatum Teknologi Nusantara' },
    pm: { years: 9, eamProjects: 4 }, uplift: 0, tech: 79.5,
    clarify: [],
    lines: [
      ['Langganan Adatum EAM Cloud, 500 named users, 3 tahun', 'user/tahun', 1500, 6_850_000],
      ['Implementasi dan konfigurasi', 'lot', 1, 1_380_000_000],
      ['Migrasi data', 'lot', 1, 420_000_000],
      ['Pelatihan', 'sesi', 20, 18_500_000, 307_000_000], // arithmetic error: 20 x 18.5m = 370m
      ['Integrasi SAP S/4HANA', 'lot', 1, 460_000_000],
    ],
  },
  {
    id: 'D', name: 'Wide World Digital Pte. Ltd. (melalui PT Wide World Integrasi)', short: 'Wide World Digital', product: 'WWD Fleet & Facility', vatBasis: 'excl', currency: 'mixed',
    validityDays: 90, validityUntil: '20 December 2026', ackAddendum: false, users: 400, dc: 'Jakarta', drc: 'Singapore',
    tkdn: { tkdn: 30.0, bmp: 0, product: 'jasa implementasi lokal (bukan produk)', validUntil: null, holder: 'self-declared' },
    pm: { years: 12, eamProjects: 5 }, uplift: 0, tech: 64.0,
    clarify: ['SAP integration "via partner marketplace connector, priced separately": a qualified offer.'],
    lines: [
      ['WWD subscription, 400 named users, 3 years', 'user/year (USD)', 1200, 380, null, 'USD'],
      ['Implementasi', 'lot', 1, 1_150_000_000],
      ['Pelatihan', 'sesi', 12, 15_000_000],
      ['Migrasi data', 'lot', 1, 300_000_000],
    ],
  },
];

const lineIdr = (l) => (l[5] === 'USD' ? l[2] * l[3] * RULES.usdRate : l[2] * l[3]);
export const writtenTotal = (v) => v.lines.reduce((s, l) => s + (l[4] ?? l[2] * l[3]) * (l[5] === 'USD' ? RULES.usdRate : 1), 0);
export const correctedDpp = (v) => v.lines.reduce((s, l) => s + lineIdr(l), 0);
export const quotedTotal = (v) => (v.vatBasis === 'wrong12' ? Math.round(writtenTotal(v) * 1.12) : v.vatBasis === 'correct' ? inclVat(writtenTotal(v)) : writtenTotal(v));

export function adminIssues(v) {
  const out = [];
  if (v.validityDays < RULES.validityDays) out.push(`Bid validity ${v.validityDays} days (until ${v.validityUntil}); the KAK requires at least ${RULES.validityDays} days (until ${DATES.validityRequiredUntil}).`);
  if (!v.tkdn.validUntil) out.push(`No valid TKDN certificate for the offered product; self-declared ${v.tkdn.tkdn}% for local services only (minimum TKDN+BMP ${RULES.tkdnMin}%).`);
  else if (!v.tkdn.product.startsWith(v.product)) out.push(`TKDN certificate is for ${v.tkdn.product}, not the offered ${v.product}.`);
  else if (v.tkdn.tkdn + v.tkdn.bmp < RULES.tkdnMin) out.push(`TKDN+BMP ${(v.tkdn.tkdn + v.tkdn.bmp).toFixed(1)}% below ${RULES.tkdnMin}%.`);
  if (!v.ackAddendum) out.push('No statement acknowledging Addendum 1.');
  return out;
}
export function techIssues(v) {
  const out = [];
  if (!/Indonesia|Jakarta|Surabaya|Batam|Cikarang/.test(v.drc)) out.push(`DRC in ${v.drc}; Addendum 1 makes DC and DRC in Indonesia mandatory.`);
  if (v.users < RULES.users.addendum) out.push(`Offers ${v.users} named users; Addendum 1 requires ${RULES.users.addendum}.`);
  if (v.pm.years < RULES.pmMinYears || v.pm.eamProjects < RULES.pmMinEamProjects) out.push('Project manager below the minimum experience.');
  if (v.tech !== null && v.tech < RULES.passingGrade) out.push(`Technical score ${v.tech} below the passing grade ${RULES.passingGrade}.`);
  return out;
}
export const passes = (v) => adminIssues(v).length === 0 && techIssues(v).length === 0;

export function answerKey() {
  const rows = VENDORS.map((v) => {
    const dpp = correctedDpp(v);
    const incl = inclVat(dpp);
    return { id: v.id, name: v.short ?? v.name, quoted: quotedTotal(v), writtenDpp: writtenTotal(v), dpp, incl, pctHps: incl / HPS_INCL,
      admin: adminIssues(v), tech: techIssues(v), passes: passes(v), arithmeticDiff: dpp - writtenTotal(v) };
  });
  const ok = rows.filter((r) => r.passes);
  const low = Math.min(...ok.map((r) => r.incl));
  for (const r of ok) {
    const v = VENDORS.find((x) => x.id === r.id);
    r.priceScore = (low / r.incl) * 100;
    r.combined = v.tech * RULES.techWeight + r.priceScore * RULES.priceWeight;
  }
  const ranking = [...ok].sort((a, b) => b.combined - a.combined).map((r) => r.id);
  return { rows, ranking, hpsIncl: HPS_INCL };
}

// What a careless evaluation gets wrong (used by the tests and the README to show why the traps matter).
export function naiveRanking() {
  const a = VENDORS.find((v) => v.id === 'A');
  const c = VENDORS.find((v) => v.id === 'C');
  const aNoUplift = inclVat(a.lines.reduce((s, l, i) => s + l[2] * (i === 1 || i === 2 ? a.lines[0][3] : l[3]), 0));
  const cIncl = inclVat(correctedDpp(c));
  const low = Math.min(aNoUplift, cIncl);
  const score = (tech, p) => tech * RULES.techWeight + (low / p) * 100 * RULES.priceWeight;
  return score(a.tech, aNoUplift) > score(c.tech, cIncl) ? ['A', 'C'] : ['C', 'A'];
}
