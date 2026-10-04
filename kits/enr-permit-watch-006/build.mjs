// Permit register with expiry dates relative to the build date, so the demo always has live hits.
// The site redeploys nightly (deploy.yml schedule) so the downloadable kit stays current.
import { join } from 'node:path';
import { rng, addDays, iso, dmy, writeXlsx, writeReadme } from '../lib.mjs';
import { entity, GROUP, ARMS } from '../../canon/zava.mjs';

// Sites come from the Zava canon (Zava Energy & Resources).
const [MINE, SMELTER, JETTY] = entity('ztambang').sites;
const [ESTATE_ID] = entity('zagro').sites;
const [EST3, EST5, MILL, BULK] = entity('zagromy').sites;
const SITES = [
  { site: `${MINE} (ID)`, country: 'ID' },
  { site: `${SMELTER} (ID)`, country: 'ID' },
  { site: `${JETTY} (ID)`, country: 'ID' },
  { site: `${ESTATE_ID} (ID)`, country: 'ID' },
  { site: `${EST3} (MY)`, country: 'MY' },
  { site: `${EST5} (MY)`, country: 'MY' },
  { site: `${MILL} (MY)`, country: 'MY' },
  { site: `${BULK} (MY)`, country: 'MY' },
];
const PERMITS = {
  ID: [
    ['IUP Operasi Produksi', 'Ministry of Energy and Mineral Resources', 365],
    ['Persetujuan Lingkungan (AMDAL)', 'Ministry of Environment', 180],
    ['PPKH forest area use approval', 'Ministry of Forestry', 180],
    ['Persetujuan Teknis wastewater discharge', 'Provincial Environment Agency', 90],
    ['SLO power plant certificate', 'Electricity inspection body', 90],
    ['Explosives magazine permit', 'National Police', 120],
    ['Fuel storage permit', 'Oil and gas downstream regulator', 90],
    ['Radio frequency licence (ISR)', 'Communications ministry', 60],
    ['PROPER performance report submission', 'Ministry of Environment', 60],
    ['Hazardous waste storage approval', 'Provincial Environment Agency', 90],
  ],
  MY: [
    ['DOE EIA approval conditions compliance', 'Department of Environment', 180],
    ['Scheduled waste written permission', 'Department of Environment', 90],
    ['Water abstraction licence', 'State water resources authority', 120],
    ['State EPD environmental approval', 'State Environment Protection Department', 180],
    ['MPOB operating licence', 'Malaysian Palm Oil Board', 90],
    ['MSPO certificate', 'Certification body', 180],
    ['Boiler certificate of fitness', 'DOSH', 60],
    ['Diesel storage licence', 'Fire and Rescue Department', 60],
    ['Radio licence (apparatus assignment)', 'Communications regulator', 60],
    ['Temporary occupation licence (TOL)', 'State land office', 90],
  ],
};
const OWNERS = ['rina.kusuma', 'hendra.wijaya', 'yusuf.hakim', 'maya.sari', 'nur.aina', 'hafiz.rahim', 'tan.weiling', 'priya.nair'];
const THRESHOLDS = [90, 60, 30];

/** Which permits a correct run on `runDate` must draft reminders for. Mondays also catch weekend crossings. */
export function expectedHits(rows, runDate) {
  const monday = runDate.getUTCDay() === 1;
  return rows.filter((p) => p.expiryIsDate).map((p) => ({ ...p, days: Math.round((p.expiry - runDate) / 864e5) }))
    .map((p) => ({ ...p, t: THRESHOLDS.find((t) => p.days === t || (monday && (p.days === t - 1 || p.days === t - 2))) }))
    .filter((p) => p.days < 0 || p.t)
    .map((p) => ({ id: p.id, permit: p.permit, site: p.site, days: p.days, reason: p.days < 0 ? 'already expired' : `${p.t}-day threshold` }));
}

export function generate(today) {
  const r = rng(77);
  const rows = [];
  let id = 1;
  // Background permits: comfortably far out, never inside a reminder window.
  for (const s of SITES) for (const [permit, authority, lead] of PERMITS[s.country]) {
    rows.push({ id: `PRM-${String(id++).padStart(3, '0')}`, permit, authority, site: s.site, owner: `${r.pick(OWNERS)}@${GROUP.parent.domain}`, lead, expiry: addDays(today, r.int(100, 900)), expiryIsDate: true });
  }
  // Seeded hits: exact thresholds, weekend crossings (only caught on Mondays), expired, and near-miss controls.
  const seeds = [90, 90, 60, 60, 30, 30, 89, 88, 59, 29, -5, -12, 45, 120, 31];
  seeds.forEach((d, i) => { rows[i * 5 + 2].expiry = addDays(today, d); });
  // Trap: inside the 30-day window, but the expiry was typed as text.
  const trap = rows[rows.length - 3];
  trap.expiry = addDays(today, 30); trap.expiryIsDate = false; trap.expiryText = dmy(trap.expiry);
  return rows;
}

export default async function build({ dir, today }) {
  const rows = generate(today);
  const c = (header, key, width = 16, numFmt) => ({ header, key, width, numFmt });
  await writeXlsx(join(dir, 'FICTIONAL_Permit_Register.xlsx'), [{
    name: 'Permits',
    columns: [c('Permit ID', 'id', 10), c('Permit', 'permit', 40), c('Authority', 'authority', 36), c('Site', 'site', 42), c('Owner email', 'owner', 30), c('Expiry date', 'expiry', 14, 'dd/mm/yyyy'), c('Renewal lead time (days)', 'lead', 12)],
    rows: rows.map((p) => ({ ...p, expiry: p.expiryIsDate ? p.expiry : p.expiryText })),
  }], { readme: [`${ARMS.energy.name} permit register (fictional). 80 permits across 4 Indonesian and 4 Malaysian sites.`, `Generated for ${iso(today)}. Expiry dates are relative to this date. The site rebuilds this kit every night.`, 'Owner emails use the reserved .example domain and cannot receive mail.'] });

  // Presenter key with live formulas, so it stays right on whatever day the demo runs.
  await writeXlsx(join(dir, 'ANSWER_KEY_live.xlsx'), [{
    name: 'Check', table: false,
    columns: [c('Permit ID', 'id', 10), c('Permit', 'permit', 40), c('Site', 'site', 42), c('Expiry date', 'expiry', 14, 'dd/mm/yyyy'), c('Days left (live)', 'days', 14), c('Expected today', 'flag', 34)],
    rows: rows.map((p, i) => {
      const n = i + 2;
      return {
        id: p.id, permit: p.permit, site: p.site, expiry: p.expiryIsDate ? p.expiry : p.expiryText,
        days: p.expiryIsDate ? { formula: `D${n}-TODAY()` } : 'TEXT DATE',
        flag: p.expiryIsDate
          ? { formula: `IF(E${n}<0,"EXPIRED",IF(OR(E${n}=90,E${n}=60,E${n}=30),"REMIND",IF(AND(WEEKDAY(TODAY(),2)=1,OR(AND(E${n}>=88,E${n}<=89),AND(E${n}>=58,E${n}<=59),AND(E${n}>=28,E${n}<=29))),"REMIND (weekend crossing)","")))` }
          : 'FLAG AS UNREADABLE',
      };
    }),
  }], { readme: ['Presenter answer key. Days left and Expected today recalculate from TODAY() when the file is opened.', 'Filter "Expected today" to non-blank: that list must match what the automation drafted, exactly.'] });

  const hits = expectedHits(rows, today);
  const t = rows.find((p) => !p.expiryIsDate);
  writeReadme(dir, {
    title: 'Demo kit: Permit and licence expiry watcher', scenario: 'enr-permit-watch-006',
    contents: ['FICTIONAL_Permit_Register.xlsx (80 permits, 8 sites)', 'ANSWER_KEY_live.xlsx (presenter only; recalculates on open)'],
    setup: ['Upload the register to a SharePoint library in the demo tenant.', 'Create the Scout automation from the scenario, pointing at that workbook.', 'Run it once manually. Open ANSWER_KEY_live.xlsx and compare.'],
    spoilers: [
      `Seeded: 2 permits each at 90, 60 and 30 days; 4 weekend crossings (89, 88, 59, 29) that only a Monday run should catch; 2 already expired; near-miss controls at 31, 45 and 120 days that must NOT be flagged.`,
      `On the build date ${iso(today)}, ${hits.length} reminders were expected. Use ANSWER_KEY_live.xlsx for the day you actually run it.`,
      `TRAP: ${t.id} ${t.permit} at ${t.site} has its expiry typed as text ("${t.expiryText}"), 30 days out. A correct run reports it as unreadable. A silent skip is the failure this scenario warns about.`,
    ],
  });
}
