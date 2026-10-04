// x-report-deck-017: Q3 2026 Distribution Operations report -> Direksi QBR deck.
// Every number lives here once. build.mjs renders the files; tests/report-deck.test.mjs checks the answer key.

export const CASE = {
  company: 'PT Contoso Niaga Nusantara',
  short: 'Contoso Niaga',
  quarter: 'Q3 2026',
  reportDate: 'Thursday 1 October 2026',
  reportVersion: 'v1.0',
  erratumDate: 'Monday 5 October 2026, 17:42 WIB',
  safetyReclassified: 'Friday 2 October 2026',
  caseMoment: 'Tuesday 6 October 2026, 14:00 WIB',
  deckDue: 'Wednesday 7 October 2026, 12:00 WIB',
  qbr: 'Thursday 8 October 2026, 09:00 WIB',
  slot: '15 minutes plus 10 minutes of questions',
  maxSlides: 10,
  presenter: { name: 'Nadia Rahman', title: 'Business Planning Manager, Office of the COO' },
  requester: { name: 'Yusuf Hakim', title: 'Chief of Staff to the President Director' },
  author: { name: 'Dimas Pratama', title: 'Head of Distribution Operations' },
  controller: { name: 'Rudi Santoso', title: 'Operations Controller' },
  ceo: { name: 'Adelia Chin', title: 'President Director' },
};

export const DCS = [
  { code: 'CKR', name: 'Cikarang', label: 'DC Cikarang', head: 'Bambang Wijaya' },
  { code: 'SBY', name: 'Surabaya', label: 'DC Surabaya', head: 'Lestari Putri' },
  { code: 'MDN', name: 'Medan', label: 'DC Medan', head: 'Hendra Siregar' },
  { code: 'JHB', name: 'Johor Bahru', label: 'Johor Bahru hub', head: 'Farah Aziz' },
];
export const MONTHS = ['Jul', 'Aug', 'Sep'];

// Monthly operating data per DC, as first reported (v1.0). Cost in IDR million (warehouse + transport, Johor converted
// at the 2026 budget rate in the workbook). Utilisation is month-end % of pallet positions.
export const MONTHLY = {
  CKR: {
    orders: [7050, 6980, 7120], otif: [6270, 6330, 6660],
    cases: [598000, 612000, 641400], cost: [5120, 5190, 5390],
    linesOrdered: [96400, 95100, 97800], linesFilledLine: [87900, 86500, 89300], linesFilledCase: [90500, 89400, 92000],
    invDays: [32, 33, 30], util: [89.6, 91.0, 93.0], hours: [418000, 421000, 426000], complaints: [3, 2, 4],
  },
  SBY: {
    orders: [2980, 3010, 3050], otif: [2770, 2805, 2880],
    cases: [182000, 186500, 212400], cost: [1610, 1640, 1690],
    linesOrdered: [40300, 40900, 41500], linesFilledLine: [36700, 37200, 37900], linesFilledCase: [37900, 38500, 39100],
    invDays: [30, 31, 29], util: [85.0, 86.5, 86.5], hours: [196000, 198000, 201000], complaints: [2, 1, 2],
  },
  MDN: {
    orders: [1490, 1500, 1520], otif: [1395, 1410, 1440],
    cases: [92000, 93500, 96500], cost: [842, 851, 866],
    linesOrdered: [20100, 20300, 20600], linesFilledLine: [18200, 18500, 18800], linesFilledCase: [18900, 19100, 19400],
    invDays: [36, 35, 34], util: [78.0, 79.5, 79.5], hours: [104000, 105000, 106000], complaints: [1, 1, 0],
  },
  JHB: {
    orders: [1160, 1170, 1180], otif: [1092, 1102, 1124],
    cases: [71000, 72000, 74500], cost: [648, 655, 668],
    linesOrdered: [15800, 15900, 16100], linesFilledLine: [14500, 14600, 14800], linesFilledCase: [14900, 15000, 15200],
    invDays: [28, 29, 28], util: [83.0, 84.5, 84.5], hours: [86000, 87000, 88000], complaints: [0, 1, 1],
  },
};

// Erratum (05 Oct): Surabaya September counted 18,400 inbound transfer cases from Cikarang as outbound shipments.
// Cikarang already counts them as its own shipments. Cost is unchanged.
export const ERRATUM = { dc: 'SBY', month: 2, transferCases: 18400 };

// Q2 2026 as presented at the Q2 QBR (deck 05). Fill rate in Q2 was order-line based.
export const Q2 = {
  otifPct: 91.3, costPerCase: 8530, fillLinePct: 90.4, invDays: 33.4, utilCkr: 88.9, lti: 0, ltifr: 0.0, complaints: 13,
  surabayaOvertimeHours: 41200,
};
// From Q3 the report measures fill rate by cases (more lenient). Workbook Definitions sheet restates both ways.
export const FILL_RESTATED = { q2CasePct: 93.3 };

export const TARGETS = {
  otifPct: 93.0, fillLinePct: 92.0, costPerCase: 8600, invDays: 32, ltifr: 0, complaints: 15,
  util: { greenMax: 88.0, amberMax: 92.0 },
};

// Safety log: one forklift injury at Medan on 19 Aug, recorded as medical treatment, reclassified to LTI on 2 Oct.
export const SAFETY_LOG = [
  { id: 'HSE-2026-071', dc: 'CKR', date: '2026-07-14', type: 'Near miss', desc: 'Pallet overhang in aisle 14, racking struck, no injury', lostDays: 0, cls: 'Near miss', updated: '2026-07-15' },
  { id: 'HSE-2026-083', dc: 'SBY', date: '2026-08-03', type: 'First aid', desc: 'Cut to hand from strapping band', lostDays: 0, cls: 'First aid', updated: '2026-08-03' },
  { id: 'HSE-2026-088', dc: 'MDN', date: '2026-08-19', type: 'Injury', desc: 'Foot crushed by forklift pallet jack at dock 3', lostDays: 3, cls: 'Lost time injury (reclassified from Medical treatment)', updated: '2026-10-02' },
  { id: 'HSE-2026-094', dc: 'CKR', date: '2026-09-09', type: 'Near miss', desc: 'Reach truck reversing alarm faulty, found on pre-use check', lostDays: 0, cls: 'Near miss', updated: '2026-09-10' },
  { id: 'HSE-2026-097', dc: 'JHB', date: '2026-09-22', type: 'First aid', desc: 'Eye irritation from shrink-wrap fumes', lostDays: 0, cls: 'First aid', updated: '2026-09-22' },
];

// Commitments made at the Q2 QBR (deck 05) and what actually happened (report 02 + workbook 03).
export const COMMITMENTS = [
  { id: 'C1', text: 'Complete the WMS upgrade at DC Medan by 31 August 2026', owner: 'Head of Distribution Operations', status: 'Done', evidence: 'Go-live 24 August 2026 (report section 6.1)' },
  { id: 'C2', text: 'Cut Surabaya overtime hours by 20% versus Q2 (41,200 hours)', owner: 'DC Surabaya Head', status: 'Partly done', evidence: 'Q3 overtime 37,500 hours = 9.0% lower, not 20% (workbook Overtime sheet)' },
  { id: 'C3', text: 'Retender line-haul carrier contracts before the end of Q3 2026', owner: 'VP of Procurement with Distribution Operations', status: 'Not started', evidence: 'Tender not issued; now planned for Q4 (report section 6.3)' },
];
export const OVERTIME_Q3 = { SBY: [12900, 12500, 12100] };

export const DECISION = {
  overflow: { what: 'Lease a 6,000-pallet overflow warehouse near Cikarang for 12 months', cost: 4.2, unit: 'IDR billion per year', status: 'Proposal for Direksi decision on 8 October; not approved' },
  carrier: { what: 'Approve issuing the line-haul carrier tender in October', status: 'Proposal for Direksi decision' },
};

// ---------- calculations ----------
const sum = (a) => a.reduce((x, y) => x + y, 0);
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

export function monthly(corrected = true) {
  const m = structuredClone(MONTHLY);
  if (corrected) m[ERRATUM.dc].cases[ERRATUM.month] -= ERRATUM.transferCases;
  return m;
}

export function dcQuarter(code, corrected = true) {
  const d = monthly(corrected)[code];
  return {
    orders: sum(d.orders), otifOrders: sum(d.otif), otifPct: r1((sum(d.otif) / sum(d.orders)) * 100),
    cases: sum(d.cases), cost: sum(d.cost), costPerCase: Math.round((sum(d.cost) * 1e6) / sum(d.cases)),
    fillLinePct: r1((sum(d.linesFilledLine) / sum(d.linesOrdered)) * 100),
    fillCasePct: r1((sum(d.linesFilledCase) / sum(d.linesOrdered)) * 100),
    invDays: r1(sum(d.invDays) / 3), util: r1(sum(d.util) / 3), hours: sum(d.hours), complaints: sum(d.complaints),
  };
}

export function company(corrected = true) {
  const m = monthly(corrected);
  const all = (k) => sum(DCS.map((d) => sum(m[d.code][k])));
  const byMonth = (k, i) => sum(DCS.map((d) => m[d.code][k][i]));
  const lti = SAFETY_LOG.filter((e) => e.cls.startsWith('Lost time')).length;
  const hours = all('hours');
  const casesW = DCS.map((d) => sum(m[d.code].cases));
  return {
    orders: all('orders'), otifPct: r1((all('otif') / all('orders')) * 100),
    otifSimpleAvgPct: r1(DCS.reduce((a, d) => a + dcQuarter(d.code, corrected).otifPct, 0) / DCS.length),
    otifByMonth: MONTHS.map((_, i) => r1((byMonth('otif', i) / byMonth('orders', i)) * 100)),
    cases: all('cases'), cost: all('cost'), costPerCase: Math.round((all('cost') * 1e6) / all('cases')),
    fillLinePct: r1((all('linesFilledLine') / all('linesOrdered')) * 100),
    fillCasePct: r1((all('linesFilledCase') / all('linesOrdered')) * 100),
    invDays: r1(DCS.reduce((a, d, i) => a + dcQuarter(d.code, corrected).invDays * casesW[i], 0) / sum(casesW)),
    hours, lti, ltifr: r2((lti * 1e6) / hours), complaints: all('complaints'),
    overtimeSby: sum(OVERTIME_Q3.SBY),
  };
}

export function ragUtil(u) { return u > TARGETS.util.amberMax ? 'Red' : u > TARGETS.util.greenMax ? 'Amber' : 'Green'; }
// QBR standard: Green meets target; Amber within 1 pt (% metrics) or 2% (others) of target; Red beyond.
export function rag(metric, v) {
  switch (metric) {
    case 'otifPct': return v >= TARGETS.otifPct ? 'Green' : v >= TARGETS.otifPct - 1 ? 'Amber' : 'Red';
    case 'fillLinePct': return v >= TARGETS.fillLinePct ? 'Green' : v >= TARGETS.fillLinePct - 1 ? 'Amber' : 'Red';
    case 'costPerCase': return v <= TARGETS.costPerCase ? 'Green' : v <= TARGETS.costPerCase * 1.02 ? 'Amber' : 'Red';
    case 'invDays': return v <= TARGETS.invDays ? 'Green' : v <= TARGETS.invDays * 1.02 ? 'Amber' : 'Red';
    case 'ltifr': return v <= TARGETS.ltifr ? 'Green' : 'Red';
    case 'complaints': return v <= TARGETS.complaints ? 'Green' : v <= TARGETS.complaints + 3 ? 'Amber' : 'Red';
    default: throw new Error(metric);
  }
}

export function answerKey() {
  const c = company(true), v1 = company(false);
  const sby = dcQuarter('SBY', true), sbyV1 = dcQuarter('SBY', false), ckr = dcQuarter('CKR', true);
  const sign = (x) => (x >= 0 ? '+' : '');
  const f1 = (x) => r1(x).toFixed(1);
  return {
    scorecard: [
      { kpi: 'OTIF (orders on time in full)', value: c.otifPct, unit: '%', target: TARGETS.otifPct, q2: Q2.otifPct, change: `${sign(c.otifPct - Q2.otifPct)}${f1(c.otifPct - Q2.otifPct)} pts`, rag: rag('otifPct', c.otifPct) },
      { kpi: 'Fill rate (order lines, like for like)', value: c.fillLinePct, unit: '%', target: TARGETS.fillLinePct, q2: Q2.fillLinePct, change: `${sign(c.fillLinePct - Q2.fillLinePct)}${f1(c.fillLinePct - Q2.fillLinePct)} pts`, rag: rag('fillLinePct', c.fillLinePct) },
      { kpi: 'Cost per case (corrected volume)', value: c.costPerCase, unit: 'IDR', target: TARGETS.costPerCase, q2: Q2.costPerCase, change: `${sign(c.costPerCase - Q2.costPerCase)}${f1(((c.costPerCase - Q2.costPerCase) / Q2.costPerCase) * 100)}%`, rag: rag('costPerCase', c.costPerCase) },
      { kpi: 'Inventory days (volume-weighted)', value: c.invDays, unit: 'days', target: TARGETS.invDays, q2: Q2.invDays, change: `${sign(c.invDays - Q2.invDays)}${f1(c.invDays - Q2.invDays)} days`, rag: rag('invDays', c.invDays) },
      { kpi: 'Cikarang utilisation (Q3 average)', value: ckr.util, unit: '%', target: TARGETS.util.greenMax, q2: Q2.utilCkr, change: `${sign(ckr.util - Q2.utilCkr)}${f1(ckr.util - Q2.utilCkr)} pts`, rag: ragUtil(ckr.util) },
      { kpi: 'Lost-time injury frequency (per 1M hours)', value: c.ltifr, unit: '', target: 0, q2: Q2.ltifr, change: `${c.lti} LTI vs ${Q2.lti}`, rag: rag('ltifr', c.ltifr) },
      { kpi: 'Customer complaints (count)', value: c.complaints, unit: '', target: TARGETS.complaints, q2: Q2.complaints, change: `${sign(c.complaints - Q2.complaints)}${c.complaints - Q2.complaints} (from ${Q2.complaints})`, rag: rag('complaints', c.complaints) },
    ],
    traps: {
      T1: { reportedHeadline: c.otifByMonth[2], quarter: c.otifPct },
      T2: { weighted: c.otifPct, simpleAverage: c.otifSimpleAvgPct, ragWeighted: rag('otifPct', c.otifPct), ragSimple: rag('otifPct', c.otifSimpleAvgPct), pts: r1(c.otifPct - Q2.otifPct) },
      T3: { v1CostPerCase: v1.costPerCase, correctedCostPerCase: c.costPerCase, v1Rag: rag('costPerCase', v1.costPerCase), correctedRag: rag('costPerCase', c.costPerCase), sbyV1: sbyV1.costPerCase, sbyCorrected: sby.costPerCase, casesV1: v1.cases, casesCorrected: c.cases },
      T4: { reportedQ3Case: c.fillCasePct, q2Line: Q2.fillLinePct, reportedChange: r1(c.fillCasePct - Q2.fillLinePct), likeForLikeLine: r1(c.fillLinePct - Q2.fillLinePct), likeForLikeCase: r1(c.fillCasePct - FILL_RESTATED.q2CasePct) },
      T5: { lti: c.lti, ltifr: c.ltifr, reportSays: 0 },
      T6: { ckr: ckr.util, ckrSep: MONTHLY.CKR.util[2], rag: ragUtil(ckr.util), sepRag: ragUtil(MONTHLY.CKR.util[2]) },
      T7: { q2: Q2.complaints, q3: c.complaints, pctChange: r1(((c.complaints - Q2.complaints) / Q2.complaints) * 100) },
      T8: { statuses: COMMITMENTS.map((x) => `${x.id} ${x.status}`), overtimeQ3: c.overtimeSby, overtimeCutPct: r1(((Q2.surabayaOvertimeHours - c.overtimeSby) / Q2.surabayaOvertimeHours) * 100) },
    },
  };
}
