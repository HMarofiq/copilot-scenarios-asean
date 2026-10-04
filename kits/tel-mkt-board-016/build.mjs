// Demo kit tel-mkt-board-016 (v3): the September 2026 marketing campaign pack for the Direksi of a fictional telco group.
// Part A: Copilot in Excel fills the scorecard and checks in the tracker from raw exports, the BI extract, the agency invoice,
// the Malaysian update and the notes. Part B: Copilot writes the board brief in Word and builds a new deck in PowerPoint.
import { join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import ExcelJS from 'exceljs';
import PptxGenJS from 'pptxgenjs';
import { writeDocx, writePdf, writeReadme, rng, NOTICE, SHORT } from '../lib.mjs';
import * as M from './model.mjs';
import { EMAIL_CMO, EMAIL_MY, NOTES, INVOICE, HISTORY_NOTE, AUG_CAGR_NOTE, en } from './text.mjs';

export * from './model.mjs';
export const TEXTS = { EMAIL_CMO, EMAIL_MY, NOTES };
export const plain = (blocks) => blocks.map((b) => (typeof b === 'string' ? b : b.table ? b.table.map((r) => r.join(' | ')).join('\n') : '')).join('\n');

export const FILES = {
  email: '01_Email_CMO_Board_Pack_Sep2026.docx',
  tracker: '02_Marketing_Tracker_2026.xlsx',
  meta: '03_Meta_Ads_Export_Sep2026.xlsx',
  google: '04_Google_Ads_Export_Sep2026.xlsx',
  tiktok: '05_TikTok_Ads_Export_Sep2026.xlsx',
  bi: '06_BI_Extract_Campaign_Activations_Sep2026.xlsx',
  invoice: '07_WideWorld_Invoice_Recap_Sep2026.pdf',
  my: '08_Email_Malaysia_5G_Sep2026.docx',
  notes: '09_Notes_RAFM_Legal_FieldOps_Sep2026.docx',
  template: '10_Zava_Connect_Board_Template.pptx',
};

const C = M.CAMPAIGNS, K = M.answerKey(), P = M.PEOPLE;
const R = rng(2609);

/** Split total into integer parts proportional to weights; the rounding remainder goes to the largest part. */
export function split(total, weights) {
  const s = weights.reduce((a, b) => a + b, 0);
  const parts = weights.map((w) => Math.floor(total * w / s));
  const rest = total - parts.reduce((a, b) => a + b, 0);
  parts[weights.indexOf(Math.max(...weights))] += rest;
  return parts;
}
/** Allocate total over slots proportional to weights without exceeding caps (integers, exact total). */
export function allocateCapped(total, weights, caps) {
  const out = new Array(weights.length).fill(0);
  let rest = total;
  for (let guard = 0; rest > 0 && guard < 50; guard++) {
    const open = weights.map((w, i) => (out[i] < caps[i] && w > 0 ? w : 0));
    if (!open.some((w) => w > 0)) throw new Error('allocateCapped: capacity too small');
    const add = split(rest, open);
    add.forEach((a, i) => { const take = Math.min(a, caps[i] - out[i]); out[i] += take; rest -= take; });
  }
  if (rest !== 0) throw new Error('allocateCapped: did not converge');
  return out;
}
const jitter = (n, lo = 0.75, hi = 1.25) => Array.from({ length: n }, () => lo + R.next() * (hi - lo));
const days = Array.from({ length: 30 }, (_, i) => `2026-09-${String(i + 1).padStart(2, '0')}`);

function stampBook(wb, readme) {
  wb.creator = 'Scenario Library demo kit'; wb.description = NOTICE;
  const r = wb.addWorksheet('README');
  r.getColumn(1).width = 120;
  [SHORT, NOTICE, '', ...readme].forEach((line, i) => { const row = r.addRow([line]); if (i < 2) row.font = { bold: true, color: { argb: 'FFC00000' } }; });
}
function table(ws, name, columns, rows, at = 'A1') {
  ws.addTable({ name, ref: at, headerRow: true, style: { theme: 'TableStyleMedium2', showRowStripes: true },
    columns: columns.map((c) => ({ name: c.header, filterButton: true })), rows: rows.map((r) => columns.map((c) => r[c.key] ?? null)) });
  columns.forEach((c, i) => { const col = ws.getColumn(i + 1); col.width = c.width ?? 16; if (c.numFmt) col.numFmt = c.numFmt; });
}
const bold = (ws, r) => { ws.getRow(r).font = { bold: true }; };

// ---------- 03 Meta export ----------
export function metaRows() {
  const sets = {
    RH: ['RH-2607 | Prospecting | Jabodetabek 25-45', 'RH-2607 | Prospecting | Bandung-Surabaya', 'RH-2607 | Retargeting | Coverage checkers 30d', 'RH-2607 | Lead form | Free installation'],
    MU: ['MU-2608 | Prospecting | Jawa 18-34', 'MU-2608 | Prospecting | Sumatera 18-34', 'MU-2608 | Ajak Teman | Referral boost', 'MU-2608 | Retargeting | App visitors 14d', 'MU-2608 | Advantage+ | Starter pack'],
  };
  const names = { RH: 'RH-2607_FTTH_RumahTerhubung_Conv', MU: 'MU-2608_Prepaid_MerdekaUnlimited_Conv' };
  const indicator = { RH: 'offsite_conversion.fb_pixel_custom.order_submitted', MU: 'offsite_conversion.fb_pixel_purchase' };
  const rows = [];
  for (const k of ['RH', 'MU']) {
    const w = jitter(sets[k].length, 0.6, 1.4);
    const sp = split(C[k].media.meta, w);
    const cv = split(C[k].platformConv.meta, w.map((x) => x * (0.8 + R.next() * 0.4)));
    sets[k].forEach((s, i) => {
      const cpm = k === 'RH' ? R.int(24000, 34000) : R.int(12000, 19000);
      const impr = Math.round(sp[i] / cpm * 1000);
      const clicks = Math.round(impr * (k === 'RH' ? 0.008 + R.next() * 0.006 : 0.011 + R.next() * 0.008));
      rows.push({ start: '2026-09-01', end: '2026-09-30', camp: names[k], set: s, delivery: 'Active', attr: '7-day click or 1-day view',
        results: cv[i], ind: indicator[k], reach: Math.round(impr / (1.6 + R.next())), impr, cpr: Math.round(sp[i] / cv[i] * 100) / 100,
        spent: sp[i], clicks, cpc: Math.round(sp[i] / clicks * 100) / 100, ctr: Math.round(clicks / impr * 10000) / 100 });
    });
  }
  const bsp = split(M.OTHER.metaMedia, [1.3, 0.7]);
  ['BRAND | Reach | Nasional', 'BRAND | Video views | Merdeka film'].forEach((s, i) => {
    const impr = Math.round(bsp[i] / R.int(6000, 9000) * 1000); const clicks = Math.round(impr * 0.003);
    rows.push({ start: '2026-09-01', end: '2026-09-30', camp: 'BRAND_AlwaysOn_Reach_2026', set: s, delivery: 'Active', attr: '7-day click or 1-day view',
      results: i ? Math.round(impr * 0.21) : Math.round(impr / 1.9), ind: i ? 'video_thruplay_watched_actions' : 'reach', reach: Math.round(impr / 1.9), impr,
      cpr: 0, spent: bsp[i], clicks, cpc: Math.round(bsp[i] / clicks * 100) / 100, ctr: Math.round(clicks / impr * 10000) / 100 });
  });
  rows.forEach((r) => { if (!r.cpr) r.cpr = Math.round(r.spent / r.results * 100) / 100; });
  return rows;
}

// ---------- 04 Google export ----------
export function googleRows() {
  const parts = {
    RH: [['RH-2607 | Search | Brand + Home', 'Search'], ['RH-2607 | Search | Generic fibre', 'Search'], ['RH-2607 | PMax | Coverage areas', 'Performance Max']],
    MU: [['MU-2608 | Search | Paket unlimited', 'Search'], ['MU-2608 | Demand Gen | Merdeka video', 'Demand Gen'], ['MU-2608 | PMax | Starter pack', 'Performance Max']],
  };
  const rows = [];
  for (const k of ['RH', 'MU']) {
    const w = jitter(3, 0.6, 1.4);
    const cost = split(C[k].media.google, w);
    const conv = split(C[k].platformConv.google, w.map((x) => x * (0.8 + R.next() * 0.4)));
    const all = split(C[k].googleAllConv, w);
    parts[k].forEach(([name, type], i) => {
      const cpc = k === 'RH' ? R.int(2600, 4200) : R.int(700, 1400);
      const clicks = Math.round(cost[i] / cpc);
      const impr = Math.round(clicks / (type === 'Search' ? 0.045 + R.next() * 0.03 : 0.009 + R.next() * 0.006));
      rows.push({ name, status: 'Enabled', type, cur: 'IDR', clicks, impr, ctr: `${(clicks / impr * 100).toFixed(2)}%`,
        cpc: Math.round(cost[i] / clicks), cost: cost[i], conv: conv[i] + 0.0, cpconv: Math.round(cost[i] / conv[i]), all: all[i] + 0.0, value: 0 });
    });
  }
  return rows;
}

// ---------- 05 TikTok export ----------
export function tiktokRows() {
  const groups = { RH: ['RH-2607_Home_Keluarga_Jabodetabek', 'RH-2607_Home_WFH_Surabaya'], MU: ['MU-2608_Unlimited_GenZ_Jawa', 'MU-2608_Unlimited_Gamer_Nasional', 'MU-2608_AjakTeman_Creator'] };
  const rows = [];
  for (const k of ['RH', 'MU']) {
    const w = jitter(groups[k].length, 0.6, 1.4);
    const cost = split(M.TIKTOK_EXPORT.exportMedia[k], w);
    // platform conversions as seen at 18:12 (slightly below the final platformConv, which only the agency recap uses)
    const seen = Math.round(C[k].platformConv.tiktok * M.TIKTOK_EXPORT.exportMedia[k] / C[k].media.tiktok);
    const conv = split(seen, w.map((x) => x * (0.8 + R.next() * 0.4)));
    groups[k].forEach((g, i) => {
      const cpm = k === 'RH' ? R.int(16000, 24000) : R.int(8000, 13000);
      const impr = Math.round(cost[i] / cpm * 1000); const clicks = Math.round(impr * (0.007 + R.next() * 0.006));
      rows.push({ camp: k === 'RH' ? 'RH-2607_RumahTerhubung' : 'MU-2608_MerdekaUnlimited', group: g, cost: cost[i], cpm: Math.round(cost[i] / impr * 1000),
        impr, clicks, ctr: `${(clicks / impr * 100).toFixed(2)}%`, conv: conv[i], cpa: Math.round(cost[i] / conv[i]), cur: 'IDR' });
    });
  }
  return rows;
}

// ---------- 06 BI extract ----------
export function biRows() {
  const RH = C.RH, MU = C.MU;
  const rhSrc = ['paid_meta', 'paid_google', 'paid_tiktok', 'organic_web_app', 'retail_store', 'call_centre'];
  const rhW = [0.2, 0.22, 0.07, 0.24, 0.17, 0.1];
  const rhOrd = split(RH.backend.orders, rhW), rhIns = split(RH.backend.installs, rhW.map((x) => x * (0.9 + R.next() * 0.2)));
  const rh = [];
  rhSrc.forEach((s, j) => {
    const dw = days.map((d, i) => (new Date(d).getUTCDay() % 6 === 0 ? 1.3 : 1) * (0.8 + R.next() * 0.4) * (i >= 15 && i <= 20 ? 1.2 : 1));
    const o = split(rhOrd[j], dw), n = split(rhIns[j], dw.map((x) => x * (0.7 + R.next() * 0.6)));
    days.forEach((d, i) => rh.push({ date: d, code: RH.code, source: s, orders: o[i], installs: n[i] }));
  });
  const muCh = ['paid_meta', 'paid_google', 'paid_tiktok', 'app_organic', 'referral_ajak_teman', 'outlet'];
  const regions = ['DKI Jakarta', 'Jawa Barat - Kab. Karawang', 'Jawa Barat - lainnya', 'Jawa Tengah & DIY', 'Jawa Timur', 'Sumatera Utara'];
  const referral = MU.backend.referral;
  const others = MU.backend.activations - referral;
  const chTot = [...split(others, [0.26, 0.12, 0.25, 0.17, 0, 0.2].map((x, i) => (i === 4 ? 0 : x))).map((v, i) => (i === 4 ? referral : v))];
  // flagged: referral 27,415 mostly Karawang from 14 Sep; outlet remainder Karawang
  const flagRef = MU.backend.flaggedReferral, flagOut = MU.backend.flagged - flagRef;
  const mu = [];
  muCh.forEach((ch, j) => {
    const rw = ch === 'referral_ajak_teman' ? [0.12, 0.52, 0.14, 0.08, 0.09, 0.05] : ch === 'outlet' ? [0.12, 0.3, 0.18, 0.14, 0.16, 0.1] : [0.25, 0.05, 0.22, 0.17, 0.2, 0.11];
    const byReg = split(chTot[j], rw);
    regions.forEach((rg, r) => {
      const karawang = r === 1 && (ch === 'referral_ajak_teman' || ch === 'outlet');
      const dw = days.map((d, i) => (karawang && i >= 13 ? 2.4 : 1) * (0.8 + R.next() * 0.4) * (i === 8 || i === 16 ? 1.3 : 1));
      const a = split(byReg[r], dw);
      let f = new Array(30).fill(0);
      if (karawang) {
        const ft = ch === 'referral_ajak_teman' ? Math.round(flagRef * 0.9) : flagOut;
        f = allocateCapped(ft, days.map((_, i) => (i >= 13 ? a[i] : a[i] * 0.05)), a.map((x) => Math.floor(x * 0.92)));
      } else if (ch === 'referral_ajak_teman') {
        const share = split(flagRef - Math.round(flagRef * 0.9), [0.3, 0, 0.25, 0.15, 0.2, 0.1])[r];
        f = allocateCapped(share, a, a.map((x) => Math.floor(x * 0.5)));
      }
      days.forEach((d, i) => mu.push({ date: d, code: MU.code, channel: ch, region: rg, activations: a[i], flagged: f[i] }));
    });
  });
  const backlog = [
    { bucket: '0-7 days', open: 3_410 }, { bucket: '8-14 days', open: 2_215 }, { bucket: 'More than 14 days', open: RH.backend.backlogOver14d },
  ];
  return { rh, mu, backlog };
}

// ---------- 10 Board template ----------
async function writeTemplate(path) {
  const p = new PptxGenJS();
  p.layout = 'LAYOUT_WIDE'; p.title = 'Zava Connect Direksi board pack template';
  const TEAL = '006B6B', INK = '1B2A3A', SOFT = 'EEF5F5';
  p.defineSlideMaster({ title: 'ZAVA', background: { color: 'FFFFFF' }, objects: [
    { rect: { x: 0, y: 0, w: 13.33, h: 0.18, fill: { color: TEAL } } },
    { text: { text: 'Zava Connect | Direksi board pack | RAHASIA / CONFIDENTIAL', options: { x: 0.5, y: 6.95, w: 8, h: 0.3, fontSize: 9, color: '6B7B8C' } } },
    { text: { text: NOTICE, options: { x: 0.5, y: 7.18, w: 12.3, h: 0.25, fontSize: 8, color: 'C00000' } } },
  ], slideNumber: { x: 12.4, y: 6.95, fontSize: 9, color: '6B7B8C' } });
  const t = (s, text) => s.addText(text, { x: 0.5, y: 0.4, w: 12.3, h: 0.7, fontSize: 26, bold: true, color: INK, fontFace: 'Segoe UI' });
  let s = p.addSlide({ masterName: 'ZAVA' });
  s.background = { color: TEAL };
  s.addText('[Judul laporan / Report title]', { x: 0.8, y: 2.4, w: 11.5, h: 1, fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI' });
  s.addText('[Rapat Direksi, tanggal] | [Nama, jabatan]', { x: 0.8, y: 3.5, w: 11.5, h: 0.5, fontSize: 16, color: 'D9F2F2' });
  s = p.addSlide({ masterName: 'ZAVA' }); t(s, 'Ringkasan eksekutif (sample layout)');
  s.addText([{ text: '[Pesan utama dalam satu kalimat]', options: { bold: true, breakLine: true } }, { text: '[Tiga poin pendukung, masing-masing dengan angka]' }],
    { x: 0.5, y: 1.2, w: 12.3, h: 0.9, fontSize: 16, color: INK });
  const head = ['Kampanye', 'Spend vs budget', 'Volume vs target', 'Biaya per unit vs target', 'Status'];
  const row = (st, c) => ['[Kampanye]', '[x%]', '[x%]', '[x%]', { text: st, options: { fill: { color: c }, color: 'FFFFFF', bold: true } }];
  s.addTable([head.map((h) => ({ text: h, options: { bold: true, fill: { color: SOFT } } })), row('Green', '2E8540'), row('Amber', 'D98C00'), row('Red', 'C0392B')],
    { x: 0.5, y: 2.3, w: 12.3, fontSize: 13, border: { type: 'solid', pt: 0.5, color: 'C8D3DC' } });
  s = p.addSlide({ masterName: 'ZAVA' }); t(s, '[Kampanye]: hasil vs target (sample layout)');
  s.addChart(p.charts.BAR, [{ name: 'Target', labels: ['Jul', 'Aug', 'Sep'], values: [100, 100, 100] }, { name: 'Actual', labels: ['Jul', 'Aug', 'Sep'], values: [90, 95, 102] }],
    { x: 0.5, y: 1.3, w: 7.2, h: 5.2, barDir: 'col', chartColors: ['C8D3DC', TEAL], showLegend: true, legendPos: 'b' });
  s.addText([{ text: 'Apa yang terjadi', options: { bold: true, breakLine: true } }, { text: '[2-3 poin dengan angka]', options: { breakLine: true } },
    { text: 'Kenapa', options: { bold: true, breakLine: true } }, { text: '[penyebab]', options: { breakLine: true } }, { text: 'Langkah berikut', options: { bold: true, breakLine: true } }, { text: '[aksi, pemilik, tanggal]' }],
  { x: 8, y: 1.3, w: 4.8, h: 5.2, fontSize: 14, color: INK, valign: 'top' });
  s = p.addSlide({ masterName: 'ZAVA' }); t(s, 'Concerns dan usulan keputusan (sample layout)');
  s.addTable([['Concern', 'Dampak', 'Mitigasi / keputusan yang diminta', 'Pemilik'].map((h) => ({ text: h, options: { bold: true, fill: { color: SOFT } } })),
    ['[concern]', '[angka]', '[usulan]', '[nama]'], ['[concern]', '[angka]', '[usulan]', '[nama]']],
  { x: 0.5, y: 1.3, w: 12.3, fontSize: 13, border: { type: 'solid', pt: 0.5, color: 'C8D3DC' } });
  s = p.addSlide({ masterName: 'ZAVA' }); t(s, 'Lampiran: definisi dan sumber data (sample layout)');
  s.addText('[Definisi KPI, basis spend, kurs, sumber data dan tanggal extract]', { x: 0.5, y: 1.3, w: 12.3, h: 1, fontSize: 14, color: INK });
  mkdirSync(join(path, '..'), { recursive: true });
  await p.writeFile({ fileName: path });
}

// ---------- 02 Tracker ----------
export const SCORE_COLS = ['Campaign', 'Market', 'Spend Sep (IDR m)', 'Budget Sep (IDR m)', 'Spend vs budget %', 'Campaign-to-date spend (IDR m)', '% of total budget spent', '% of time elapsed', 'Pacing gap (pts)',
  'Volume KPI', 'Volume actual', 'Volume target', 'Volume vs target %', 'Volume last month', 'Cost KPI', 'Cost per unit (IDR)', 'Cost target (IDR)', 'Cost vs target %',
  'Light volume', 'Light cost', 'Light pacing', 'Overall', 'Platform-claimed conversions (reference only)', 'Notes'];
export const CHECKS = [
  'Media spend per campaign and platform matches the Wide World invoice (final), not the platform exports; explain any difference',
  'Google invalid-activity credit on the September invoice is treated per the Rules (month of the traffic)',
  'Spend excludes PPN and SST; agency fee included',
  'Volumes come from the BI extract; platform-claimed conversions are not summed into volumes',
  'Merdeka Unlimited valid adds = activations minus RAFM-flagged; both tie to the BI extract',
  'Malaysia: MYR net of SST, converted at the budget rate from Rules',
  'Malaysia: new 5G lines exclude upgrades of existing customers',
  'FTTH CAGR uses full years only and the right number of years',
  'Total row equals the sum of the three campaigns; Brand Always-On excluded (other spend)',
  'Traffic lights follow the thresholds in Rules',
];

async function writeTracker(path) {
  const wb = new ExcelJS.Workbook();
  stampBook(wb, ['Group Marketing tracker 2026. Owner: ' + P.user.name + '. Update monthly after BI extract and agency invoice are in.',
    'Sheets: Campaigns, Budget_Phasing, Rules, History_FTTH, Scorecard_Aug (as presented), Scorecard_Sep (to fill), Checks (to fill).']);
  const RH = C.RH, MU = C.MU, MY = C.MY5G;
  let ws = wb.addWorksheet('Campaigns');
  table(ws, 'Campaigns', [
    { header: 'Code', key: 'code', width: 12 }, { header: 'Campaign', key: 'name', width: 20 }, { header: 'Market', key: 'mkt', width: 8 }, { header: 'Product / offer', key: 'prod', width: 58 },
    { header: 'Start', key: 'start', width: 12 }, { header: 'End', key: 'end', width: 12 }, { header: 'Days total', key: 'dt', width: 10 }, { header: 'Currency', key: 'cur', width: 9 },
    { header: 'Total budget (local)', key: 'bt', width: 18, numFmt: '#,##0' }, { header: 'Volume KPI', key: 'vk', width: 18 }, { header: 'Sep volume target', key: 'vt', width: 16, numFmt: '#,##0' },
    { header: 'Cost KPI', key: 'ck', width: 18 }, { header: 'Cost target (local)', key: 'ct', width: 16, numFmt: '#,##0' }, { header: 'Owner', key: 'own', width: 16 },
  ], [
    { code: RH.code, name: RH.name, mkt: 'ID', prod: RH.product, start: RH.start, end: RH.end, dt: RH.daysTotal, cur: 'IDR', bt: RH.budgetTotal, vk: RH.volumeKpi, vt: RH.target.installs, ck: RH.costKpi, ct: RH.target.costPer, own: 'Home marketing' },
    { code: MU.code, name: MU.name, mkt: 'ID', prod: MU.product, start: MU.start, end: MU.end, dt: MU.daysTotal, cur: 'IDR', bt: MU.budgetTotal, vk: MU.volumeKpi, vt: MU.target.validAdds, ck: MU.costKpi, ct: MU.target.costPer, own: 'Prepaid marketing' },
    { code: MY.code, name: MY.name, mkt: 'MY', prod: MY.product, start: MY.start, end: MY.end, dt: MY.daysTotal, cur: 'MYR', bt: MY.budgetTotalMYR, vk: MY.volumeKpi, vt: MY.target.newLines, ck: MY.costKpi, ct: MY.target.costPerMYR, own: `${M.PEOPLE.my.name} (MY)` },
  ]);
  ws = wb.addWorksheet('Budget_Phasing');
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  table(ws, 'BudgetPhasing', [{ header: 'Code', key: 'code', width: 12 }, { header: 'Line', key: 'line', width: 22 }, { header: 'Currency', key: 'cur', width: 9 },
    ...months.map((m) => ({ header: m, key: m, width: 15, numFmt: '#,##0' }))], [
    { code: RH.code, line: 'Budget', cur: 'IDR', ...RH.budgetByMonth },
    { code: RH.code, line: 'Actual (reported)', cur: 'IDR', ...RH.actualPrior },
    { code: MU.code, line: 'Budget', cur: 'IDR', ...MU.budgetByMonth },
    { code: MU.code, line: 'Actual (reported)', cur: 'IDR', ...MU.actualPrior },
    { code: MY.code, line: 'Budget', cur: 'MYR', ...MY.budgetByMonthMYR },
    { code: MY.code, line: 'Actual (reported, net)', cur: 'MYR', ...MY.actualPriorMYR },
  ]);
  ws.addRow([]); ws.addRow(['Actuals are filled after the month closes. September actuals: see Scorecard_Sep.']);
  ws = wb.addWorksheet('Rules');
  ws.getColumn(1).width = 6; ws.getColumn(2).width = 140;
  ws.addRow(['#', 'Reporting rules for the Direksi marketing pack (approved by CMO and Finance, January 2026)']); bold(ws, 1);
  [
    `Spend = net media (platform cost, excluding PPN or SST) + agency fee ${M.RULES.agencyFeePct}% of net media. Never include PPN or SST. Amounts in the board pack in IDR million, one decimal.`,
    'The agency invoice is the final source for media spend. Platform exports are for reference and may be pulled before the day closes.',
    'Credits and refunds (e.g. invalid-activity credits) belong to the month of the traffic they relate to, not the month of the invoice.',
    'Volumes come only from the BI extract (backend). Platform-claimed conversions may be shown for reference but are never added up and never used for cost per unit.',
    `Rumah Terhubung: volume KPI = installs; cost per install = spend / installs.`,
    'Merdeka Unlimited: volume KPI = valid gross adds = activations with the campaign code minus activations flagged by RAFM; cost per valid add = spend / valid gross adds.',
    'Hari Malaysia 5G: volume KPI = new 5G postpaid lines (including port-ins). Upgrades of existing customers are reported separately and are not gross adds. Cost per new line = spend / new lines.',
    `Currency: Malaysian amounts are converted to IDR at the 2026 budget rate of IDR ${en(M.RULES.fxBudgetMYR)} per MYR. Show MYR alongside. Do not use spot rates.`,
    `Malaysian invoices include ${M.RULES.sstRate}% SST on imported digital services; remove it (net = invoiced / 1.${String(M.RULES.sstRate).padStart(2, '0')}).`,
    `Traffic lights. Volume vs target: Green >= ${M.RULES.lights.volume.green}%, Amber >= ${M.RULES.lights.volume.amber}%, Red below. Cost vs target: Green at or below target, Amber up to ${M.RULES.lights.cost.amber}% over, Red above. Pacing gap = % of total campaign budget spent to date minus % of campaign days elapsed: Green <= ${M.RULES.lights.pacing.green} pts, Amber <= ${M.RULES.lights.pacing.amber} pts, Red above. Overall = the worst of the three.`,
    'CAGR = (end value / start value)^(1 / number of years) - 1, where number of years = end year - start year. Use full years only; year-to-date values are not a year.',
    'Brand Always-On is not a campaign: report it as "other spend" in the appendix only.',
  ].forEach((t, i) => ws.addRow([i + 1, t]));
  ws.getColumn(2).alignment = { wrapText: true, vertical: 'top' };
  ws = wb.addWorksheet('History_FTTH');
  table(ws, 'HistoryFTTH', [{ header: 'Year', key: 'y', width: 10 }, { header: 'FTTH subscribers (thousand)', key: 'v', width: 26, numFmt: '#,##0.0' }, { header: 'Basis', key: 'b', width: 28 }],
    [...Object.entries(M.HISTORY.ftth).map(([y, v]) => ({ y: Number(y), v, b: 'Full year (31 Dec)' })), { y: 2026, v: M.HISTORY.ftthSep2026, b: 'Year to date (30 Sep)' }]);
  ws.getCell('E2').value = HISTORY_NOTE; ws.getColumn(5).width = 90;
  ws = wb.addWorksheet('Scorecard_Aug');
  ws.addRow(['Scorecard August 2026 (as presented to the Direksi on 9 Sep 2026)']); bold(ws, 1);
  ws.addRow(['Campaign', 'Market', 'Spend Aug (IDR m)', 'Budget Aug (IDR m)', 'Volume KPI', 'Volume actual', 'Volume target', 'Cost per unit (IDR)', 'Overall']); bold(ws, 2);
  ws.addRow([RH.name, 'ID', 3480.0, 3000.0, RH.volumeKpi, RH.aug.installs, 7000, M.augCost.RH, 'Amber']);
  ws.addRow([MU.name, 'ID', 4380.0, 4500.0, MU.volumeKpi, MU.aug.validAdds, 140000, M.augCost.MU, 'Amber']);
  ws.addRow([MY.name, 'MY', M.round1(MY.actualPriorMYR.Aug * M.RULES.fxBudgetMYR / 1e6), M.round1(MY.budgetByMonthMYR.Aug * M.RULES.fxBudgetMYR / 1e6), MY.volumeKpi, MY.aug.newLines, 1500, Math.round(MY.actualPriorMYR.Aug * M.RULES.fxBudgetMYR / MY.aug.newLines), 'Amber']);
  ws.addRow([]); ws.addRow(['Growth slide']); bold(ws, 7); ws.addRow([AUG_CAGR_NOTE]);
  ws.columns.forEach((c) => { c.width = 18; }); ws.getColumn(1).width = 22;
  ws = wb.addWorksheet('Scorecard_Sep');
  ws.addRow(['Scorecard September 2026 (to fill: same basis as Rules)']); bold(ws, 1);
  ws.addRow(SCORE_COLS); bold(ws, 2);
  [RH, MU, MY].forEach((c) => ws.addRow([c.name, c.market]));
  ws.addRow(['Total (three campaigns)']);
  ws.addRow([]); ws.addRow(['Malaysia in MYR']); bold(ws, 8);
  ws.addRow(['Item', 'MYR', 'IDR m (budget rate)']); bold(ws, 9);
  ['Spend Sep (net of SST)', 'Budget Sep', 'New 5G lines', 'Upgrades (not gross adds)', 'Cost per new line'].forEach((t) => ws.addRow([t]));
  ws.addRow([]); ws.addRow(['Growth']); bold(ws, 16);
  ws.addRow(['Metric', 'Start year', 'Start value', 'End year', 'End value', 'Years', 'CAGR %', 'Note']); bold(ws, 17);
  ws.addRow(['FTTH subscribers (thousand)']);
  ws.columns.forEach((c) => { c.width = 16; }); ws.getColumn(1).width = 28; ws.getColumn(24).width = 60;
  ws = wb.addWorksheet('Checks');
  ws.addRow(['#', 'Check', 'Expected', 'Found', 'Status (OK / Flag)', 'Comment']); bold(ws, 1);
  CHECKS.forEach((t, i) => ws.addRow([i + 1, t]));
  ws.getColumn(2).width = 90; [3, 4, 5, 6].forEach((i) => { ws.getColumn(i).width = 22; }); ws.getColumn(6).width = 60;
  mkdirSync(join(path, '..'), { recursive: true });
  await wb.xlsx.writeFile(path);
}

async function writeMeta(path) {
  const wb = new ExcelJS.Workbook(); stampBook(wb, ['Export from Meta Ads Manager, ad account "Zava Seluler ID" (act_000000000), level: ad set, 1-30 Sep 2026, time zone Asia/Jakarta.']);
  const ws = wb.addWorksheet('Raw Data Report');
  const cols = [['Reporting starts', 'start'], ['Reporting ends', 'end'], ['Campaign name', 'camp'], ['Ad set name', 'set'], ['Ad set delivery', 'delivery'], ['Attribution setting', 'attr'],
    ['Results', 'results'], ['Result indicator', 'ind'], ['Reach', 'reach'], ['Impressions', 'impr'], ['Cost per results', 'cpr'], ['Amount spent (IDR)', 'spent'],
    ['Link clicks', 'clicks'], ['CPC (cost per link click) (IDR)', 'cpc'], ['CTR (link click-through rate)', 'ctr']];
  ws.addRow(cols.map((c) => c[0])); bold(ws, 1);
  metaRows().forEach((r) => ws.addRow(cols.map((c) => r[c[1]])));
  cols.forEach((_, i) => { ws.getColumn(i + 1).width = i === 3 || i === 2 ? 44 : 18; });
  await wb.xlsx.writeFile(path);
}
async function writeGoogle(path) {
  const wb = new ExcelJS.Workbook(); stampBook(wb, ['Downloaded from Google Ads, account Zava Seluler ID (000-000-0000), campaign report, time zone (GMT+07:00) Jakarta.']);
  const ws = wb.addWorksheet('Campaign report');
  ws.addRow(['Campaign report']); ws.addRow(['1 September 2026 - 30 September 2026']);
  const cols = [['Campaign', 'name'], ['Campaign status', 'status'], ['Campaign type', 'type'], ['Currency code', 'cur'], ['Clicks', 'clicks'], ['Impr.', 'impr'], ['CTR', 'ctr'],
    ['Avg. CPC', 'cpc'], ['Cost', 'cost'], ['Conversions', 'conv'], ['Cost / conv.', 'cpconv'], ['All conv.', 'all'], ['Conv. value', 'value']];
  ws.addRow(cols.map((c) => c[0])); bold(ws, 3);
  const rows = googleRows();
  rows.forEach((r) => ws.addRow(cols.map((c) => r[c[1]])));
  const sum = (k) => rows.reduce((a, r) => a + r[k], 0);
  ws.addRow(['Total: Campaigns', '', '', 'IDR', sum('clicks'), sum('impr'), '', '', sum('cost'), sum('conv'), '', sum('all'), 0]);
  ws.addRow(['Total: Account', '', '', 'IDR', sum('clicks'), sum('impr'), '', '', sum('cost'), sum('conv'), '', sum('all'), 0]);
  cols.forEach((_, i) => { ws.getColumn(i + 1).width = i === 0 ? 40 : 14; });
  await wb.xlsx.writeFile(path);
}
async function writeTiktok(path) {
  const wb = new ExcelJS.Workbook(); stampBook(wb, [`Export from TikTok Ads Manager, advertiser Zava Seluler ID, ad group level, 2026-09-01 to 2026-09-30, UTC+07:00. Data as of ${M.TIKTOK_EXPORT.pulledAt}.`]);
  const ws = wb.addWorksheet('Ad group data');
  const cols = [['Campaign name', 'camp'], ['Ad group name', 'group'], ['Cost', 'cost'], ['CPM', 'cpm'], ['Impressions', 'impr'], ['Clicks (destination)', 'clicks'], ['CTR (destination)', 'ctr'],
    ['Conversions', 'conv'], ['Cost per conversion', 'cpa'], ['Currency', 'cur']];
  ws.addRow(cols.map((c) => c[0])); bold(ws, 1);
  tiktokRows().forEach((r) => ws.addRow(cols.map((c) => r[c[1]])));
  ws.addRow([]); ws.addRow([`Data as of ${M.TIKTOK_EXPORT.pulledAt}. Metrics for the current day may be incomplete.`]);
  cols.forEach((_, i) => { ws.getColumn(i + 1).width = i < 2 ? 36 : 16; });
  await wb.xlsx.writeFile(path);
}
async function writeBI(path) {
  const { rh, mu, backlog } = biRows();
  const wb = new ExcelJS.Workbook(); stampBook(wb, ['BI extract: campaign-coded activations, September 2026. Extracted 2026-10-02 07:00 WIB from the data warehouse (source: BSS/CRM, RAFM case system). Owner: ' + P.bi.name + ', BI & Data Platform.',
    'Definitions: order = FTTH order submitted with campaign code; install = FTTH line installed and activated; activation = prepaid SIM registered (NIK + KK) and first data session, with campaign code. flagged_rafm = activation flagged by RAFM rules (final for September).',
    'Malaysian results are not in this warehouse; see the Malaysia BSS report.']);
  let ws = wb.addWorksheet('RH_daily');
  table(ws, 'RHdaily', [{ header: 'activity_date', key: 'date', width: 13 }, { header: 'campaign_code', key: 'code', width: 14 }, { header: 'source', key: 'source', width: 18 },
    { header: 'orders', key: 'orders', width: 10 }, { header: 'installs', key: 'installs', width: 10 }], rh);
  ws = wb.addWorksheet('MU_daily');
  table(ws, 'MUdaily', [{ header: 'activation_date', key: 'date', width: 14 }, { header: 'campaign_code', key: 'code', width: 14 }, { header: 'channel', key: 'channel', width: 20 },
    { header: 'region', key: 'region', width: 28 }, { header: 'activations', key: 'activations', width: 12 }, { header: 'flagged_rafm', key: 'flagged', width: 13 }], mu);
  ws = wb.addWorksheet('RH_backlog_2Oct');
  table(ws, 'RHbacklog', [{ header: 'order_age', key: 'bucket', width: 20 }, { header: 'open_orders', key: 'open', width: 14 }], backlog);
  await wb.xlsx.writeFile(path);
}

export default async function build({ dir }) {
  const opt = (title, creator) => ({ title, creator, keywords: 'Zava Connect; board pack; fictional' });
  await writeDocx(join(dir, FILES.email), EMAIL_CMO, opt('Email CMO board pack September 2026', P.cmo.name));
  await writeTracker(join(dir, FILES.tracker));
  await writeMeta(join(dir, FILES.meta));
  await writeGoogle(join(dir, FILES.google));
  await writeTiktok(join(dir, FILES.tiktok));
  await writeBI(join(dir, FILES.bi));
  await writePdf(join(dir, FILES.invoice), INVOICE(K.invoice), { title: 'Wide World Digital invoice and recap September 2026', author: 'PT Wide World Digital Indonesia' });
  await writeDocx(join(dir, FILES.my), EMAIL_MY, opt('Email Malaysia 5G September 2026', P.my.name));
  await writeDocx(join(dir, FILES.notes), NOTES, opt('Notes RAFM Legal Field Ops September 2026', 'Group Marketing'));
  await writeTemplate(join(dir, FILES.template));

  writeReadme(dir, {
    title: 'Kit: Monthly marketing campaign pack for the Direksi (Zava Connect telco, September 2026)', scenario: 'tel-mkt-board-016',
    contents: [
      `${FILES.email}: the CMO's request, the Direksi's questions from August and the deadline`,
      `${FILES.tracker}: the tracker with Rules, budgets, FTTH history, August scorecard, and the empty Scorecard_Sep and Checks sheets (open this one in Excel)`,
      `${FILES.meta}, ${FILES.google}, ${FILES.tiktok}: platform exports as downloaded`,
      `${FILES.bi}: backend activations, orders, installs and RAFM flags`,
      `${FILES.invoice}: agency invoice (final media) and the agency's own recap`,
      `${FILES.my}: the Malaysian team's September update`,
      `${FILES.notes}: RAFM, Legal and Field Operations notes`,
      `${FILES.template}: the board deck template (start Part B here)`,
    ],
    setup: ['Upload all files to one OneDrive folder in a demo or test tenant and open each once.', 'Apply a non-encrypting sensitivity label if your tenant asks for one.', 'Keep an untouched copy of the tracker before each run.'],
    spoilers: [
      `Rumah Terhubung: spend IDR ${en(K.rh.spendM, 1)} m vs budget ${en(K.rh.budgetM, 1)} m (${K.rh.vsBudgetPct}%); installs ${en(K.rh.installs)} vs ${en(C.RH.target.installs)} (${K.rh.installsPct}%, Amber); cost per install IDR ${en(K.rh.costPer)} vs ${en(C.RH.target.costPer)} (+${K.rh.costOverPct}%, Red); pacing ${K.rh.spendPct}% spent at ${K.rh.timePct}% time (+${K.rh.pacePts} pts, Amber). Overall Red. Backlog ${en(K.rh.backlog)} orders over 14 days.`,
      `Merdeka Unlimited: spend IDR ${en(K.mu.spendM, 1)} m; activations ${en(K.mu.activations)} minus flagged ${en(K.mu.flagged)} = valid ${en(K.mu.validAdds)} (${K.mu.validPct}%, Amber); cost per valid add IDR ${en(K.mu.costPerValid)} (+${K.mu.costOverPct}%, Amber); pacing Green. Overall Amber. Agency's CPA ${en(K.mu.agencyCpa)} uses ${en(K.mu.platformSum)} summed platform conversions (${K.mu.platformVsBackendPct}% of real activations).`,
      `Hari Malaysia 5G: RM ${en(K.my.invoicedMYR)} incl. SST -> net RM ${en(K.my.netMYR)} x ${M.RULES.fxBudgetMYR} = IDR ${en(K.my.spendM, 1)} m (not ${en(K.my.wrongSpendM, 1)} m at spot incl. SST). New lines ${en(K.my.newLines)} (${K.my.newLinesPct}%, Amber), not ${en(K.my.wrongNew)}; cost per new line RM ${K.my.costPerMYR} (Green). Overall Amber.`,
      `Total three campaigns: IDR ${en(K.total.spendM, 1)} m vs budget ${en(K.total.budgetM, 1)} m (${K.total.vsBudgetPct}%). Brand Always-On IDR ${en(K.otherSpendM, 1)} m is other spend.`,
      `Google credit ${en(M.GOOGLE_IVT_CREDIT.amount)} belongs to August: do not net it (else MU spend ${en(K.mu.wrongIfCreditNettedM, 1)} m). TikTok export is ${en(K.tiktokGap.RH)} (RH) and ${en(K.tiktokGap.MU)} (MU) below the invoice because it was pulled at 18:12.`,
      `FTTH CAGR 2021-2025 = ${K.cagr.right}% (4 years), not ${K.cagr.wrongN5}% (August deck used 5). Using 2026 YTD as a year gives ${K.cagr.withYtd}% (wrong).`,
      `Concerns: FTTH overspend and install backlog; referral bonus farming in Karawang (${K.mu.flaggedReferralPct}% of referral activations flagged); FUP line missing on ${M.LEGAL.creativesMissingFup} of ${M.LEGAL.creativesTotal} TikTok creatives, complaints ${M.LEGAL.complaintsAug} -> ${M.LEGAL.fupComplaints}; Malaysian port-in spike may not repeat.`,
    ],
  });
}
