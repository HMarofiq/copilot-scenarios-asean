// Model for tel-mkt-board-016: the September 2026 marketing campaign pack for the Direksi of a fictional telco group.
// Every number lives here once. build.mjs renders the kit files from it; tests assert answerKey().
// Amounts in full IDR (or MYR for the Malaysian opco). The board reports in IDR million, 1 decimal.

export const WORLD = {
  group: 'PT Relecloud Nusantara Tbk',
  groupShort: 'Relecloud',
  opcoID: 'PT Relecloud Seluler Indonesia',
  opcoMY: 'Relecloud Malaysia Sdn Bhd',
  ftthBrand: 'Relecloud Home',
  agency: 'PT Wide World Digital Indonesia',
  domain: 'relecloud.example',
  month: 'September 2026',
  closeDate: '2026-10-02',
  requestDate: 'Friday 2 October 2026',
  dueDate: 'Tuesday 6 October 2026, 12:00 WIB',
  boardDate: 'Wednesday 7 October 2026, 09:00 WIB',
};

export const PEOPLE = {
  user: { name: 'Nadia Rahman', title: 'Marketing Performance Manager, Group Marketing', email: 'nadia.rahman@relecloud.example' },
  cmo: { name: 'Dewi Kartika', title: 'Chief Marketing Officer', email: 'dewi.kartika@relecloud.example' },
  my: { name: 'Farah Aziz', title: 'Head of Marketing, Relecloud Malaysia', email: 'farah.aziz@relecloud-my.example' },
  rafm: { name: 'Budi Hartono', title: 'Head of Revenue Assurance & Fraud Management', email: 'budi.hartono@relecloud.example' },
  legal: { name: 'Sinta Wulandari', title: 'Senior Counsel, Legal & Regulatory', email: 'sinta.wulandari@relecloud.example' },
  agency: { name: 'Kevin Tan', title: 'Account Director', email: 'kevin.tan@wideworld-digital.example' },
  bi: { name: 'Elvia Atkins', title: 'BI & Data Platform Lead', email: 'elvia.atkins@relecloud.example' },
};

// Reporting rules (the tracker's Rules sheet). The answer key applies exactly these.
export const RULES = {
  agencyFeePct: 7, // agency fee on net media, excl. VAT
  ppnRate: 12, ppnDppNum: 11, ppnDppDen: 12, // PPN 12% on DPP nilai lain 11/12 (effective 11%)
  sstRate: 8, // Malaysia service tax on imported digital services
  fxBudgetMYR: 3600, // IDR per MYR, 2026 budget rate (board pack uses this, never spot)
  fxSpotMYR: 3742, // spot on 30 Sep 2026 used by the Malaysian team (wrong for the board pack)
  lights: {
    volume: { green: 100, amber: 90 }, // % of target: >=100 G, >=90 A, else R
    cost: { green: 0, amber: 10 }, // % over target: <=0 G, <=10 A, else R
    pacing: { green: 5, amber: 10 }, // spend % of total budget minus time % elapsed (points): <=5 G, <=10 A, else R
  },
};

// Three campaigns running in September 2026.
export const CAMPAIGNS = {
  RH: {
    code: 'RH-2607', name: 'Rumah Terhubung', market: 'ID', product: 'Relecloud Home FTTH (free installation + 50% off the first bill)',
    start: '2026-07-01', end: '2026-12-31', daysTotal: 184, daysToDate: 92,
    budgetTotal: 18_000_000_000,
    budgetByMonth: { Jul: 2_600_000_000, Aug: 3_000_000_000, Sep: 3_400_000_000, Oct: 3_000_000_000, Nov: 3_000_000_000, Dec: 3_000_000_000 },
    actualPrior: { Jul: 3_050_000_000, Aug: 3_480_000_000 },
    volumeKpi: 'Installs', costKpi: 'Cost per install',
    target: { orders: 9_000, installs: 7_200, costPer: 480_000 },
    media: { meta: 1_520_400_000, google: 1_395_750_000, tiktok: 684_300_000 },
    platformConv: { meta: 6_210, google: 5_480, tiktok: 1_905 },
    googleAllConv: 9_964,
    backend: { orders: 9_840, installs: 6_515, backlogOver14d: 2_870 },
    aug: { installs: 6_880, orders: 8_710 }, // August cost per install = Aug actual / installs (see augCost)
  },
  MU: {
    code: 'MU-2608', name: 'Merdeka Unlimited', market: 'ID', product: 'Prepaid unlimited data bundle (FUP 50 GB) with Ajak Teman referral bonus',
    start: '2026-08-01', end: '2026-09-30', daysTotal: 61, daysToDate: 61,
    budgetTotal: 9_500_000_000,
    budgetByMonth: { Aug: 4_500_000_000, Sep: 5_000_000_000 },
    actualPrior: { Aug: 4_380_000_000 },
    volumeKpi: 'Valid gross adds', costKpi: 'Cost per valid add',
    target: { validAdds: 150_000, costPer: 32_000 },
    media: { meta: 1_905_200_000, google: 842_600_000, tiktok: 1_612_800_000 },
    platformConv: { meta: 98_400, google: 41_250, tiktok: 88_900 },
    googleAllConv: 63_870,
    backend: { activations: 172_460, referral: 58_300, flagged: 31_880, flaggedReferral: 27_415, flaggedKab: 'Kabupaten Karawang' },
    aug: { validAdds: 131_950 },
    rgs30Aug: 61.4, // % of August activations with a revenue event in their first 30 days
  },
  MY5G: {
    code: 'MY5G-2608', name: 'Hari Malaysia 5G', market: 'MY', product: '5G postpaid plans (new lines incl. port-ins, plus upgrades of existing customers)',
    start: '2026-08-25', end: '2026-09-30', daysTotal: 37, daysToDate: 37,
    currency: 'MYR',
    budgetTotalMYR: 1_200_000, budgetByMonthMYR: { Aug: 250_000, Sep: 950_000 },
    actualPriorMYR: { Aug: 238_500 },
    volumeKpi: 'New 5G lines', costKpi: 'Cost per new line',
    target: { newLines: 7_000, upgrades: 8_000, costPerMYR: 150 },
    netSpendMYR: 946_000, // media + fee, excl. SST
    backend: { newLines: 6_480, portIns: 2_150, upgrades: 9_720, upgradeArpuUpliftMYR: 18 },
    aug: { newLines: 1_310 },
    tiktokLeads: { aug: 50, sep: 170 },
  },
};

// Not a campaign: always-on brand spend that also sits in the Meta account and on the invoice.
export const OTHER = { name: 'Relecloud Brand Always-On', metaMedia: 212_000_000 };

// Google credited invalid clicks on the September invoice, for AUGUST traffic (Merdeka Unlimited).
export const GOOGLE_IVT_CREDIT = { amount: -38_450_000, campaign: 'MU', trafficMonth: 'August 2026' };

// TikTok export was pulled at 18:12 WIB on 30 Sep, before the day closed. The invoice is final.
export const TIKTOK_EXPORT = { pulledAt: '2026-09-30 18:12 WIB', exportMedia: { RH: 661_915_400, MU: 1_561_230_000 } };

// FTTH subscribers (thousand, year-end) and the 2026 year-to-date figure.
export const HISTORY = {
  ftth: { 2021: 412.0, 2022: 538.3, 2023: 671.9, 2024: 802.6, 2025: 948.2 },
  ftthSep2026: 1_041.5,
};

// Legal: two TikTok creatives ran without the FUP line.
export const LEGAL = { creativesMissingFup: 2, creativesTotal: 6, from: '3 September', to: '12 September', fupComplaints: 412, complaintsAug: 96 };

// ---------- pure functions ----------
export const augCost = { RH: Math.round(3_480_000_000 / 6_880), MU: Math.round(4_380_000_000 / 131_950), MY: Math.round(238_500 / 1_310 * 10) / 10 };
export const round1 = (x) => Math.round(x * 10) / 10;
export const mIDR = (x) => round1(x / 1e6);
export const sumObj = (o) => Object.values(o).reduce((a, b) => a + b, 0);

export function spend(c) {
  const media = sumObj(c.media);
  const fee = Math.round(media * RULES.agencyFeePct / 100);
  return { media, fee, reported: media + fee };
}

export function light(kind, value) {
  const t = RULES.lights[kind];
  if (kind === 'volume') return value >= t.green ? 'Green' : value >= t.amber ? 'Amber' : 'Red';
  return value <= t.green ? 'Green' : value <= t.amber ? 'Amber' : 'Red';
}
const worst = (...ls) => (ls.includes('Red') ? 'Red' : ls.includes('Amber') ? 'Amber' : 'Green');

export function cagr(first, last, n) { return (Math.pow(last / first, 1 / n) - 1) * 100; }

export function invoice() {
  const lines = [];
  for (const k of ['RH', 'MU']) for (const p of ['meta', 'google', 'tiktok']) lines.push({ campaign: k, platform: p, amount: CAMPAIGNS[k].media[p] });
  lines.push({ campaign: 'OTHER', platform: 'meta', amount: OTHER.metaMedia });
  const media = lines.reduce((a, l) => a + l.amount, 0);
  const fee = Math.round(media * RULES.agencyFeePct / 100);
  const credit = GOOGLE_IVT_CREDIT.amount;
  const subtotal = media + fee + credit;
  const dpp = Math.round(subtotal * RULES.ppnDppNum / RULES.ppnDppDen);
  const ppn = Math.round(dpp * RULES.ppnRate / 100);
  return { lines, media, fee, credit, subtotal, dpp, ppn, total: subtotal + ppn };
}

export function answerKey() {
  const RH = CAMPAIGNS.RH, MU = CAMPAIGNS.MU, MY = CAMPAIGNS.MY5G;
  // Rumah Terhubung
  const rhS = spend(RH);
  const rhCost = Math.round(rhS.reported / RH.backend.installs);
  const rhCtd = RH.actualPrior.Jul + RH.actualPrior.Aug + rhS.reported;
  const rhCtdBudget = RH.budgetByMonth.Jul + RH.budgetByMonth.Aug + RH.budgetByMonth.Sep;
  const rhSpendPct = round1(rhCtd / RH.budgetTotal * 100);
  const rhTimePct = round1(RH.daysToDate / RH.daysTotal * 100);
  const rhVol = round1(RH.backend.installs / RH.target.installs * 100);
  const rhCostOver = round1((rhCost / RH.target.costPer - 1) * 100);
  const rhPace = round1(rhSpendPct - rhTimePct);
  const rhPlat = sumObj(RH.platformConv);
  const rh = {
    spend: rhS, spendM: mIDR(rhS.reported), budgetM: mIDR(RH.budgetByMonth.Sep), vsBudgetPct: round1(rhS.reported / RH.budgetByMonth.Sep * 100),
    ctdM: mIDR(rhCtd), ctdBudgetM: mIDR(rhCtdBudget), ctdVsBudgetPct: round1(rhCtd / rhCtdBudget * 100),
    spendPct: rhSpendPct, timePct: rhTimePct, pacePts: rhPace,
    orders: RH.backend.orders, installs: RH.backend.installs, installsPct: rhVol, costPer: rhCost, costOverPct: rhCostOver,
    platformSum: rhPlat, platformVsBackendPct: round1(rhPlat / RH.backend.orders * 100), backlog: RH.backend.backlogOver14d,
    lights: { volume: light('volume', rhVol), cost: light('cost', rhCostOver), pacing: light('pacing', rhPace) },
  };
  rh.overall = worst(rh.lights.volume, rh.lights.cost, rh.lights.pacing);

  // Merdeka Unlimited
  const muS = spend(MU);
  const valid = MU.backend.activations - MU.backend.flagged;
  const muCostValid = Math.round(muS.reported / valid);
  const muCostGross = Math.round(muS.reported / MU.backend.activations);
  const muCtd = MU.actualPrior.Aug + muS.reported;
  const muSpendPct = round1(muCtd / MU.budgetTotal * 100);
  const muTimePct = round1(MU.daysToDate / MU.daysTotal * 100);
  const muVol = round1(valid / MU.target.validAdds * 100);
  const muCostOver = round1((muCostValid / MU.target.costPer - 1) * 100);
  const muPace = round1(muSpendPct - muTimePct);
  const muPlat = sumObj(MU.platformConv);
  const muNetted = muS.reported + GOOGLE_IVT_CREDIT.amount;
  const mu = {
    spend: muS, spendM: mIDR(muS.reported), budgetM: mIDR(MU.budgetByMonth.Sep), vsBudgetPct: round1(muS.reported / MU.budgetByMonth.Sep * 100),
    ctdM: mIDR(muCtd), spendPct: muSpendPct, timePct: muTimePct, pacePts: muPace,
    activations: MU.backend.activations, flagged: MU.backend.flagged, validAdds: valid, validPct: muVol,
    flaggedPctOfActivations: round1(MU.backend.flagged / MU.backend.activations * 100),
    flaggedReferralPct: round1(MU.backend.flaggedReferral / MU.backend.referral * 100),
    costPerValid: muCostValid, costPerGross: muCostGross, costOverPct: muCostOver,
    platformSum: muPlat, platformVsBackendPct: round1(muPlat / MU.backend.activations * 100),
    agencyCpa: Math.round(sumObj(MU.media) / muPlat),
    wrongIfCreditNettedM: mIDR(muNetted), wrongCostIfNetted: Math.round(muNetted / valid),
    lights: { volume: light('volume', muVol), cost: light('cost', muCostOver), pacing: light('pacing', muPace) },
  };
  mu.overall = worst(mu.lights.volume, mu.lights.cost, mu.lights.pacing);

  // Hari Malaysia 5G
  const invoicedMYR = Math.round(MY.netSpendMYR * (1 + RULES.sstRate / 100));
  const myIDR = MY.netSpendMYR * RULES.fxBudgetMYR;
  const myWrongIDR = invoicedMYR * RULES.fxSpotMYR;
  const myBudgetIDR = MY.budgetByMonthMYR.Sep * RULES.fxBudgetMYR;
  const myCost = round1(MY.netSpendMYR / MY.backend.newLines);
  const myCtd = MY.actualPriorMYR.Aug + MY.netSpendMYR;
  const mySpendPct = round1(myCtd / MY.budgetTotalMYR * 100);
  const myVol = round1(MY.backend.newLines / MY.target.newLines * 100);
  const myCostOver = round1((myCost / MY.target.costPerMYR - 1) * 100);
  const myPace = round1(mySpendPct - 100);
  const my = {
    netMYR: MY.netSpendMYR, invoicedMYR, spendM: mIDR(myIDR), wrongSpendM: mIDR(myWrongIDR), budgetM: mIDR(myBudgetIDR),
    vsBudgetPct: round1(MY.netSpendMYR / MY.budgetByMonthMYR.Sep * 100),
    newLines: MY.backend.newLines, portIns: MY.backend.portIns, upgrades: MY.backend.upgrades, wrongNew: MY.backend.newLines + MY.backend.upgrades,
    newLinesPct: myVol, costPerMYR: myCost, costPerIDR: Math.round(myIDR / MY.backend.newLines), wrongCostMYR: round1(MY.netSpendMYR / (MY.backend.newLines + MY.backend.upgrades)),
    costOverPct: myCostOver, spendPct: mySpendPct, pacePts: myPace,
    lights: { volume: light('volume', myVol), cost: light('cost', myCostOver), pacing: light('pacing', myPace) },
  };
  my.overall = worst(my.lights.volume, my.lights.cost, my.lights.pacing);

  // Group total (three campaigns, IDR million)
  const totalSpend = rhS.reported + muS.reported + myIDR;
  const totalBudget = RH.budgetByMonth.Sep + MU.budgetByMonth.Sep + myBudgetIDR;

  // CAGR
  const f = HISTORY.ftth;
  const cagrRight = round1(cagr(f[2021], f[2025], 4));
  const cagrWrongN5 = round1(cagr(f[2021], f[2025], 5));
  const yoy = [2022, 2023, 2024, 2025].map((y) => (f[y] / f[y - 1] - 1) * 100);
  const avgGrowth = round1(yoy.reduce((a, b) => a + b, 0) / yoy.length);
  const cagrWithYtd = round1(cagr(f[2021], HISTORY.ftthSep2026, 5));

  const inv = invoice();
  const tiktokGap = { RH: RH.media.tiktok - TIKTOK_EXPORT.exportMedia.RH, MU: MU.media.tiktok - TIKTOK_EXPORT.exportMedia.MU };

  return {
    rh, mu, my,
    total: { spendM: mIDR(totalSpend), budgetM: mIDR(totalBudget), vsBudgetPct: round1(totalSpend / totalBudget * 100) },
    otherSpendM: mIDR(Math.round(OTHER.metaMedia * (1 + RULES.agencyFeePct / 100))),
    cagr: { right: cagrRight, wrongN5: cagrWrongN5, avgGrowth, withYtd: cagrWithYtd, first: f[2021], last: f[2025] },
    invoice: inv, tiktokGap,
    fx: { budget: RULES.fxBudgetMYR, spot: RULES.fxSpotMYR },
    legal: LEGAL,
  };
}
