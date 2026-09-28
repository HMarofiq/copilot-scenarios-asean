// SAP PM work-order export (IW38-style) for a nickel mine. Traps: dates as dd.mm.yyyy text,
// exact duplicate rows from a double extract, and TECO/CLSD orders that are not backlog.
import { join } from 'node:path';
import { rng, writeXlsx, writeReadme } from '../lib.mjs';

export const AS_OF = '2026-09-28';
const PG = ['M01', 'E01', 'I01'];
const STATUS_OPEN = ['CRTD', 'REL', 'REL MACM', 'REL PCNF'];
const STATUS_DONE = ['TECO', 'REL TECO', 'CLSD'];
const EQUIP = ['CV-07 Conveyor', 'CR-02 Crusher', 'KL-01 Kiln', 'PU-14 Slurry pump', 'GE-03 Generator', 'CM-05 Compressor', 'SC-11 Screen', 'FA-02 ID fan'];
const dmy = (iso) => { const [y, m, d] = iso.split('-'); return `${d}.${m}.${y}`; };
const addDays = (iso, n) => { const x = new Date(iso + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };

export function generate() {
  const r = rng(909);
  const rows = [];
  for (let i = 0; i < 150; i++) {
    const created = addDays('2026-01-05', r.int(0, 255));
    const start = addDays(created, r.int(3, 60));
    const done = r.next() < 0.22;
    rows.push({
      order: String(40012000 + i), type: r.pick(['PM01', 'PM01', 'PM02', 'PM03']), equipment: r.pick(EQUIP), priority: r.int(1, 4),
      created: dmy(created), start: dmy(start), status: done ? r.pick(STATUS_DONE) : r.pick(STATUS_OPEN), pg: r.pick(PG), hours: r.int(2, 40),
      _created: created, _start: start,
    });
  }
  // Double extract: six orders appear twice, identical.
  const dups = [3, 17, 42, 64, 88, 121].map((i) => ({ ...rows[i] }));
  const all = [...rows, ...dups].sort((a, b) => a.order.localeCompare(b.order));
  return { all, unique: rows };
}

export function solve(all) {
  const seen = new Set();
  const uniq = all.filter((x) => { const k = JSON.stringify([x.order, x.type, x.equipment, x.priority, x.created, x.start, x.status, x.pg, x.hours]); if (seen.has(k)) return false; seen.add(k); return true; });
  const open = uniq.filter((x) => !/\b(TECO|CLSD)\b/.test(x.status));
  const toIso = (d) => d.split('.').reverse().join('-');
  const overdue = open.filter((x) => toIso(x.start) < AS_OF);
  const pivot = {};
  for (const x of open) { const k = `${x.pg} P${x.priority}`; pivot[k] ??= { orders: 0, hours: 0 }; pivot[k].orders++; pivot[k].hours += x.hours; }
  return { duplicates: all.length - uniq.length, excluded: uniq.length - open.length, open: open.length, hours: open.reduce((s, x) => s + x.hours, 0), overdue: overdue.length, p1Overdue: overdue.filter((x) => x.priority === 1).map((x) => x.order), pivot };
}

export default async function build({ dir }) {
  const { all } = generate();
  const s = solve(all);
  const c = (header, key, width = 12) => ({ header, key, width });
  await writeXlsx(join(dir, 'FICTIONAL_IW38_Order_Export_28.09.2026.xlsx'), [{
    name: 'Export',
    columns: [c('Order', 'order'), c('Order Type', 'type', 10), c('Equipment', 'equipment', 20), c('Priority', 'priority', 8), c('Created On', 'created'), c('Basic Start', 'start'), c('System Status', 'status', 14), c('Planner Group', 'pg', 12), c('Est. Hours', 'hours', 10)],
    rows: all,
  }], { readme: ['Northwind Nickel Mine (fictional) SAP PM order list, extracted 28.09.2026.', 'Dates are text in SAP format DD.MM.YYYY. The extract was run twice by mistake, so some orders are duplicated.', 'Planner groups: M01 Mechanical, E01 Electrical, I01 Instrumentation. Priority 1 = urgent, 4 = low.'] });

  writeReadme(dir, {
    title: 'Demo kit: Maintenance backlog analysis from an SAP PM export', scenario: 'enr-maint-backlog-009',
    contents: ['FICTIONAL_IW38_Order_Export_28.09.2026.xlsx (' + all.length + ' rows, formatted as an Excel table)'],
    setup: ['Upload the workbook to OneDrive in the demo tenant and open it in Excel for the web.', 'Select a cell in the table and open Copilot.'],
    spoilers: [
      `${s.duplicates} exact duplicate rows; ${s.excluded} TECO or CLSD orders; ${s.open} open orders, ${s.hours} estimated hours.`,
      `${s.overdue} open orders are overdue (Basic Start before 28.09.2026), of which ${s.p1Overdue.length} are priority 1: ${s.p1Overdue.join(', ')}.`,
      'TRAP: dates are text. Reading 05.03.2026 as 3 May instead of 5 March gives wrong ages and a wrong overdue count.',
      'Pivot (open orders / hours): ' + Object.entries(s.pivot).sort().map(([k, v]) => `${k} ${v.orders}/${v.hours}`).join(', ') + '.',
    ],
  });
}
