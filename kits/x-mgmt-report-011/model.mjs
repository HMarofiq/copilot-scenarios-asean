// Data model for the month-end close kit (x-mgmt-report-011). One source of truth: every kit file and the
// answer key are generated from these numbers. Group: PT Zava Niaga Nusantara (CNN, IDR) and its
// subsidiary Zava Niaga Malaysia Sdn. Bhd. (CNM, MYR). Period: September 2026 year to date (fictional).

export const PERIOD = 'September 2026 YTD';
export const FX = { avg: 3520, closing: 3585, budget: 3450 }; // IDR per 1 MYR
export const POLICY = { abs: 2500, pct: 0.05, always: ['Revenue', 'Gross profit'] }; // IDR million

// Management P&L lines, in report order. type: income or cost.
export const LINES = [
  { line: 'Revenue', type: 'income' },
  { line: 'Cost of sales', type: 'cost' },
  { line: 'Staff costs', type: 'cost' },
  { line: 'Restructuring', type: 'cost' },
  { line: 'Warehouse & logistics', type: 'cost' },
  { line: 'Rent & utilities', type: 'cost' },
  { line: 'IT & software', type: 'cost' },
  { line: 'Marketing & promotion', type: 'cost' },
  { line: 'Travel & entertainment', type: 'cost' },
  { line: 'Professional fees', type: 'cost' },
  { line: 'Depreciation & amortisation', type: 'cost' },
  { line: 'Intercompany management fee', type: 'income' },
  { line: 'Other income', type: 'income' },
  { line: 'Finance costs', type: 'cost' },
];

// Chart of accounts per entity: [account, name, line, share of the line total]. Shares may be negative for
// contra accounts (returns, rebates). Balance-sheet accounts have line null.
export const COA = {
  CNN: [
    ['1110', 'Kas dan setara kas / Cash and cash equivalents', null], ['1210', 'Piutang usaha / Trade receivables', null],
    ['1220', 'Piutang afiliasi - CNM / Due from CNM', null], ['1310', 'Persediaan barang dagang / Merchandise inventory', null],
    ['1510', 'Aset tetap - DC & bangunan / Property, DCs', null], ['1520', 'Aset tetap - kendaraan & MHE / Vehicles and MHE', null],
    ['1530', 'Aset tetap - perangkat TI / IT equipment', null], ['1590', 'Akumulasi penyusutan / Accumulated depreciation', null],
    ['2110', 'Utang usaha / Trade payables', null], ['2150', 'Biaya masih harus dibayar / Accrued expenses', null],
    ['2210', 'Utang pajak / Taxes payable', null], ['2310', 'Pinjaman bank / Bank borrowings', null],
    ['3100', 'Modal disetor / Share capital', null], ['3200', 'Saldo laba / Retained earnings', null],
    ['4110', 'Penjualan elektronik - modern retail / Sales, electronics', 'Revenue', 0.58],
    ['4120', 'Penjualan peralatan rumah tangga / Sales, home appliances', 'Revenue', 0.33],
    ['4130', 'Penjualan B2B via Portal Mitra / Sales, B2B portal', 'Revenue', 0.1],
    ['4190', 'Retur dan potongan penjualan / Sales returns and rebates', 'Revenue', -0.0099352],
    ['4910', 'Nota kredit keterlambatan pengiriman / Late-delivery credit notes', 'Revenue', -0.0000648],
    ['5110', 'HPP elektronik / COGS, electronics', 'Cost of sales', 0.585], ['5120', 'HPP peralatan rumah tangga / COGS, appliances', 'Cost of sales', 0.382],
    ['5130', 'Biaya angkut masuk / Freight-in', 'Cost of sales', 0.041], ['5140', 'Penyesuaian persediaan / Inventory adjustments', 'Cost of sales', 0.004],
    ['5150', 'Rebate pemasok / Supplier rebates', 'Cost of sales', -0.012],
    ['6110', 'Gaji pokok / Base salaries', 'Staff costs', 0.52], ['6120', 'Tunjangan / Allowances', 'Staff costs', 0.14],
    ['6130', 'Lembur / Overtime', 'Staff costs', 0.05], ['6140', 'BPJS Kesehatan & Ketenagakerjaan / Social security', 'Staff costs', 0.08],
    ['6150', 'Akrual bonus / Bonus accrual', 'Staff costs', 0.09], ['6160', 'THR / Religious holiday allowance', 'Staff costs', 0.1],
    ['6170', 'Pelatihan / Training', 'Staff costs', 0.02], ['6190', 'Biaya restrukturisasi / Restructuring costs', 'Restructuring', 1],
    ['6210', 'Tenaga kerja outsourcing gudang / Outsourced warehouse labour', 'Warehouse & logistics', 0.38],
    ['6220', 'Angkutan pihak ketiga / Third-party trucking', 'Warehouse & logistics', 0.34], ['6230', 'BBM dan tol / Fuel and tolls', 'Warehouse & logistics', 0.14],
    ['6240', 'Pemeliharaan forklift & MHE / MHE maintenance', 'Warehouse & logistics', 0.08], ['6250', 'Bahan kemasan / Packaging', 'Warehouse & logistics', 0.06],
    ['6310', 'Sewa gedung dan DC / Rent, offices and DCs', 'Rent & utilities', 0.71], ['6320', 'Listrik / Electricity', 'Rent & utilities', 0.22],
    ['6330', 'Air dan service charge / Water and service charges', 'Rent & utilities', 0.07],
    ['6410', 'Lisensi perangkat lunak / Software licences', 'IT & software', 0.31], ['6420', 'Cloud dan hosting / Cloud and hosting', 'IT & software', 0.36],
    ['6430', 'Telekomunikasi dan WAN / Telecoms and WAN', 'IT & software', 0.12], ['6440', 'Kolokasi data center / Data centre colocation', 'IT & software', 0.14],
    ['6450', 'Dukungan TI outsourcing / Outsourced IT support', 'IT & software', 0.07],
    ['6510', 'Promosi co-op mitra / Partner co-op promotions', 'Marketing & promotion', 0.46], ['6520', 'Iklan digital / Digital advertising', 'Marketing & promotion', 0.31],
    ['6530', 'Event dan pameran / Events and trade shows', 'Marketing & promotion', 0.15], ['6540', 'Materi POS / Point-of-sale material', 'Marketing & promotion', 0.08],
    ['6610', 'Perjalanan dinas domestik / Domestic travel', 'Travel & entertainment', 0.56], ['6620', 'Perjalanan dinas luar negeri / Overseas travel', 'Travel & entertainment', 0.29],
    ['6630', 'Jamuan / Entertainment', 'Travel & entertainment', 0.15],
    ['6710', 'Jasa hukum / Legal fees', 'Professional fees', 0.47], ['6720', 'Konsultan pajak / Tax advisory', 'Professional fees', 0.34],
    ['6730', 'Jasa audit / Audit fees', 'Professional fees', 0.19],
    ['6810', 'Penyusutan DC dan bangunan / Depreciation, DCs', 'Depreciation & amortisation', 0.41], ['6820', 'Penyusutan kendaraan & MHE / Depreciation, vehicles and MHE', 'Depreciation & amortisation', 0.27],
    ['6830', 'Penyusutan perangkat TI / Depreciation, IT', 'Depreciation & amortisation', 0.18], ['6840', 'Amortisasi perangkat lunak / Amortisation, software', 'Depreciation & amortisation', 0.14],
    ['7100', 'Pendapatan management fee - afiliasi / Management fee income, affiliates', 'Intercompany management fee', 1],
    ['7210', 'Pendapatan sewa / Rental income', 'Other income', 0.36], ['7220', 'Penjualan scrap / Scrap sales', 'Other income', 0.21], ['7230', 'Pendapatan bunga / Interest income', 'Other income', 0.43],
    ['8110', 'Beban bunga bank / Bank interest', 'Finance costs', 0.93], ['8120', 'Biaya administrasi bank / Bank charges', 'Finance costs', 0.07],
  ],
  CNM: [
    ['1000', 'Cash at bank', null], ['1100', 'Trade receivables', null], ['1200', 'Inventory', null], ['1500', 'Property, plant and equipment', null],
    ['1590', 'Accumulated depreciation', null], ['2000', 'Trade payables', null], ['2100', 'Accruals', null], ['2200', 'Due to Zava Niaga Nusantara', null],
    ['3000', 'Share capital', null], ['3100', 'Retained earnings', null],
    ['4000', 'Sales - Malaysia retail', 'Revenue', 0.77], ['4010', 'Sales - Singapore re-export', 'Revenue', 0.24], ['4090', 'Sales returns', 'Revenue', -0.01],
    ['5000', 'Cost of goods sold', 'Cost of sales', 0.96], ['5010', 'Freight and haulage in', 'Cost of sales', 0.035], ['5090', 'Stock adjustments', 'Cost of sales', 0.005],
    ['6000', 'Salaries and wages', 'Staff costs', 0.78], ['6010', 'EPF contributions', 'Staff costs', 0.11], ['6020', 'SOCSO and EIS', 'Staff costs', 0.02], ['6030', 'Bonus provision', 'Staff costs', 0.09],
    ['6100', 'Warehouse labour (outsourced)', 'Warehouse & logistics', 0.57], ['6110', 'Haulage out', 'Warehouse & logistics', 0.43],
    ['6200', 'Rent - Johor Bahru hub', 'Rent & utilities', 0.82], ['6210', 'Utilities', 'Rent & utilities', 0.18],
    ['6300', 'Software and cloud', 'IT & software', 0.48], ['6310', 'WAN and network services', 'IT & software', 0.52],
    ['6400', 'Promotions and listing fees', 'Marketing & promotion', 1], ['6500', 'Travel and accommodation', 'Travel & entertainment', 1],
    ['6600', 'Audit and tax fees', 'Professional fees', 0.72], ['6610', 'Legal and secretarial', 'Professional fees', 0.28],
    ['6800', 'Depreciation', 'Depreciation & amortisation', 1],
    ['6900', 'Management fee - Zava Niaga Nusantara', 'Intercompany management fee', 1],
    ['6995', 'Bank charges - FX conversion', 'Finance costs', 1],
    ['7000', 'Other operating income', 'Other income', 1],
  ],
};
// Account added by CNM in September and not yet in the group mapping (trap: must be flagged, not dropped).
export const UNMAPPED = { entity: 'CNM', account: '6995', line: 'Finance costs' };

// Ledger line totals before post-closing journals. CNN in IDR million, CNM in MYR thousand.
// Positive numbers; the TB applies debit/credit signs. The intercompany line is income for CNN, cost for CNM.
export const ACTUAL = {
  CNN: { 'Revenue': 6480000, 'Cost of sales': 5508000, 'Staff costs': 312400, 'Restructuring': 0, 'Warehouse & logistics': 118600,
    'Rent & utilities': 41200, 'IT & software': 52300, 'Marketing & promotion': 64800, 'Travel & entertainment': 9850,
    'Professional fees': 7950, 'Depreciation & amortisation': 38700, 'Intercompany management fee': 1260, 'Other income': 6200, 'Finance costs': 22400 },
  CNM: { 'Revenue': 262000, 'Cost of sales': 214840, 'Staff costs': 11850, 'Restructuring': 0, 'Warehouse & logistics': 5420,
    'Rent & utilities': 2050, 'IT & software': 1020, 'Marketing & promotion': 3300, 'Travel & entertainment': 610,
    'Professional fees': 180, 'Depreciation & amortisation': 1450, 'Intercompany management fee': 318.4, 'Other income': 90, 'Finance costs': 14 },
};
export const IC_SIGN = { CNN: +1, CNM: -1 }; // CNN earns the fee, CNM pays it

// Budget: CNN in IDR million, CNM in MYR thousand (translated at the budget rate). Intercompany budgets net to zero.
export const BUDGET = {
  CNN: { 'Revenue': 6610000, 'Cost of sales': 5618500, 'Staff costs': 301500, 'Restructuring': 0, 'Warehouse & logistics': 109900,
    'Rent & utilities': 40800, 'IT & software': 50600, 'Marketing & promotion': 70000, 'Travel & entertainment': 8900,
    'Professional fees': 2400, 'Depreciation & amortisation': 38400, 'Intercompany management fee': 0, 'Other income': 4000, 'Finance costs': 21900 },
  CNM: { 'Revenue': 255000, 'Cost of sales': 209100, 'Staff costs': 11600, 'Restructuring': 0, 'Warehouse & logistics': 5300,
    'Rent & utilities': 2000, 'IT & software': 1000, 'Marketing & promotion': 3400, 'Travel & entertainment': 540,
    'Professional fees': 150, 'Depreciation & amortisation': 1450, 'Intercompany management fee': 0, 'Other income': 80, 'Finance costs': 0 },
};
// Last year, consolidated, IDR million.
export const LY = { 'Revenue': 6905300, 'Cost of sales': 5862100, 'Staff costs': 318700, 'Restructuring': 0, 'Warehouse & logistics': 119400,
  'Rent & utilities': 45900, 'IT & software': 47800, 'Marketing & promotion': 72600, 'Travel & entertainment': 9700, 'Professional fees': 3100,
  'Depreciation & amortisation': 41200, 'Intercompany management fee': 0, 'Other income': 5100, 'Finance costs': 24300 };

// Post-closing journals (CNN, IDR million), posted after the TB extract.
export const JOURNALS = [
  { id: 'PCJ-2026-09-001', date: '2026-10-05', by: 'Babak Shammas', dr: '6190', cr: '6110', amount: 3200,
    text: 'Reclassify severance for the Medan DC consolidation from base salaries to restructuring costs (per HR memo HR/2026/118).' },
  { id: 'PCJ-2026-09-002', date: '2026-10-05', by: 'Babak Shammas', dr: '6420', cr: '2150', amount: 1450,
    text: 'Accrue Q3 cloud consumption overage invoiced by the cloud provider on 3 October 2026.' },
  { id: 'PCJ-2026-09-003', date: '2026-10-05', by: 'Babak Shammas', dr: '2150', cr: '6510', amount: 900,
    text: 'Reverse duplicate August accrual for the Wingtip co-op promotion (accrued twice, 28 August and 31 August).' },
];

// Intercompany management fee: CNN charges CNM MYR 39,800 a month; CNM books it at the average rate.
export const IC_MONTHLY = { cnnIdrM: 140, cnmMyrK: 39.8 };
export const IC_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
export const IC_CNM_MISSING = ['Sep']; // CNM has not accrued September

const r1 = (n) => Math.round(n * 10) / 10;
const lineOf = (entity, acct) => COA[entity].find((a) => a[0] === acct)?.[2] ?? null;

// Ledger totals after journals, in local currency units above.
export function adjusted(entity) {
  const t = { ...ACTUAL[entity] };
  if (entity !== 'CNN') return t;
  for (const j of JOURNALS) {
    const dl = lineOf('CNN', j.dr); const cl = lineOf('CNN', j.cr);
    if (dl) t[dl] += j.amount * (LINES.find((l) => l.line === dl).type === 'cost' ? 1 : -1);
    if (cl) t[cl] -= j.amount * (LINES.find((l) => l.line === cl).type === 'cost' ? 1 : -1);
  }
  return t;
}

// Consolidated management P&L in IDR million (positive amounts; the intercompany line nets CNN income and CNM cost).
export function consolidated({ journals = true, dropUnmapped = false } = {}) {
  const cnn = journals ? adjusted('CNN') : ACTUAL.CNN;
  const cnm = { ...ACTUAL.CNM };
  if (dropUnmapped) cnm['Finance costs'] -= ACTUAL.CNM['Finance costs'];
  const rows = LINES.map(({ line, type }) => {
    const a = line === 'Intercompany management fee' ? cnn[line] - (cnm[line] * FX.avg) / 1000 : cnn[line] + (cnm[line] * FX.avg) / 1000;
    const b = BUDGET.CNN[line] + (BUDGET.CNM[line] * FX.budget) / 1000;
    return { line, type, cnn: r1(cnn[line]), cnm: r1(((line === 'Intercompany management fee' ? -1 : 1) * cnm[line] * FX.avg) / 1000), actual: r1(a), budget: r1(b), ly: LY[line] };
  });
  return rows;
}

export const variance = (r) => r1(r.type === 'income' ? r.actual - r.budget : r.budget - r.actual); // + favourable
export const pct = (r) => (r.budget === 0 ? null : variance(r) / r.budget);
export const material = (r) => POLICY.always.includes(r.line) || (Math.abs(variance(r)) >= POLICY.abs && (pct(r) === null || Math.abs(pct(r)) >= POLICY.pct));

export function totals(rows) {
  const g = (k) => rows.find((r) => r.line === k);
  const sum = (k, type) => rows.filter((r) => r.type === type && !['Revenue', 'Cost of sales'].includes(r.line)).reduce((s, r) => s + r[k], 0);
  const out = {};
  for (const k of ['actual', 'budget', 'ly']) {
    const gp = g('Revenue')[k] - g('Cost of sales')[k];
    out[k] = { gp: r1(gp), pbt: r1(gp - sum(k, 'cost') + sum(k, 'income')) };
  }
  return out;
}

export function withGrossProfit(rows) {
  const t = totals(rows);
  const gp = { line: 'Gross profit', type: 'income', actual: t.actual.gp, budget: t.budget.gp, ly: t.ly.gp };
  const pbt = { line: 'Profit before tax', type: 'income', actual: t.actual.pbt, budget: t.budget.pbt, ly: t.ly.pbt };
  return [rows[0], rows[1], gp, ...rows.slice(2), pbt];
}

// Answer key for the page and the tests.
export function answerKey() {
  const rows = withGrossProfit(consolidated());
  const mat = rows.filter((r) => r.line !== 'Profit before tax' && material(r)).map((r) => r.line);
  const pre = withGrossProfit(consolidated({ journals: false }));
  const ic = consolidated().find((r) => r.line === 'Intercompany management fee').actual;
  const fxOnRevenue = r1((ACTUAL.CNM.Revenue * (FX.avg - FX.budget)) / 1000);
  return { rows, material: mat, materialBeforeJournals: pre.filter((r) => r.line !== 'Profit before tax' && material(r)).map((r) => r.line),
    icDifference: ic, unmappedAmount: r1((ACTUAL.CNM['Finance costs'] * FX.avg) / 1000), fxOnRevenue };
}
