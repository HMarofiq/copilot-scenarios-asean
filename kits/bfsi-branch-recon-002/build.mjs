// Weekly branch reconciliation: GL export vs teller and ATM exports, with 14 seeded breaks.
import { join } from 'node:path';
import { rng, writeXlsx, writeCsv, writeReadme, money } from '../lib.mjs';
import { entity } from '../../canon/zava.mjs';

const BANK = entity('zbankid'); // PT Bank Zava Indonesia

export const SEEDED = { timing: 6, reversal: 4, investigate: 4 };

export function generate() {
  const r = rng(2026);
  const days = ['2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18', '2026-09-19', '2026-09-20'];
  const nextDay = (d) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + 1); return x.toISOString().slice(0, 10); };
  const amt = () => r.int(4, 400) * 50_000 * (r.next() < 0.55 ? 1 : -1);
  const gl = [], teller = [], atm = [], key = [];
  let tSeq = 41_200, aSeq = 880_100;

  // Clean teller items: GL reference has leading zeros (core banking), teller system drops them (the trap).
  for (let i = 0; i < 70; i++) {
    const d = r.pick(days), a = amt(), n = tSeq++;
    gl.push({ posting: d, value: d, ref: `000${n}`, channel: 'TELLER', desc: a > 0 ? 'Cash deposit' : 'Cash withdrawal', amount: a });
    teller.push([d, String(n), `TLR-0${r.int(1, 4)}`, a > 0 ? 'DEP' : 'WDL', a]);
  }
  // Clean ATM items.
  for (let i = 0; i < 44; i++) {
    const d = r.pick(days), a = -r.int(1, 50) * 100_000, n = aSeq++;
    gl.push({ posting: d, value: d, ref: `ATM${n}`, channel: 'ATM', desc: 'ATM withdrawal', amount: a });
    atm.push([d, `T-${r.int(101, 109)}`, `ATM${n}`, a]);
  }
  // 6 timing: ATM settles one day after the GL value date.
  for (let i = 0; i < SEEDED.timing; i++) {
    const d = days[r.int(0, 5)], a = -r.int(1, 50) * 100_000, n = aSeq++;
    gl.push({ posting: d, value: d, ref: `ATM${n}`, channel: 'ATM', desc: 'ATM withdrawal', amount: a });
    atm.push([nextDay(d), `T-${r.int(101, 109)}`, `ATM${n}`, a]);
    key.push({ ref: `ATM${n}`, status: 'Date difference', cause: 'timing', amount: a, note: `GL value date ${d}, ATM settlement ${nextDay(d)}` });
  }
  // 4 reversal pairs: teller transaction posted then reversed in GL; nothing in the teller file.
  for (let i = 0; i < SEEDED.reversal; i++) {
    const d = r.pick(days), a = amt(), n = tSeq++;
    gl.push({ posting: d, value: d, ref: `000${n}`, channel: 'TELLER', desc: 'Cash deposit', amount: Math.abs(a) });
    gl.push({ posting: d, value: d, ref: `000${n}`, channel: 'TELLER', desc: 'REVERSAL Cash deposit', amount: -Math.abs(a) });
    key.push({ ref: `000${n}`, status: 'Missing in Teller (x2 rows)', cause: 'reversal', amount: 0, note: `Posted and reversed same day, ${money(Math.abs(a))} each way` });
  }
  // 4 investigate: 2 transposed amounts, 1 GL-only teller item, 1 GL-only ATM item.
  const transposed = [[1_250_000, 1_520_000], [3_470_000, 3_740_000]];
  for (const [g, t] of transposed) {
    const d = r.pick(days), n = tSeq++;
    gl.push({ posting: d, value: d, ref: `000${n}`, channel: 'TELLER', desc: 'Cash deposit', amount: g });
    teller.push([d, String(n), 'TLR-02', 'DEP', t]);
    key.push({ ref: `000${n}`, status: 'Amount difference', cause: 'investigate', amount: g - t, note: `GL ${money(g)} vs teller ${money(t)} (digits transposed)` });
  }
  { const d = days[3], n = tSeq++; gl.push({ posting: d, value: d, ref: `000${n}`, channel: 'TELLER', desc: 'Cash withdrawal', amount: -2_000_000 }); key.push({ ref: `000${n}`, status: 'Missing in Teller', cause: 'investigate', amount: -2_000_000, note: 'No teller record and no reversal' }); }
  { const d = days[4], n = aSeq++; gl.push({ posting: d, value: d, ref: `ATM${n}`, channel: 'ATM', desc: 'ATM withdrawal', amount: -1_500_000 }); key.push({ ref: `ATM${n}`, status: 'Missing in ATM', cause: 'investigate', amount: -1_500_000, note: 'No switch settlement record' }); }

  // Shuffle GL deterministically, keep reversal pairs adjacent-ish by sorting on posting date then ref.
  gl.sort((a, b) => a.posting.localeCompare(b.posting) || a.ref.localeCompare(b.ref) || b.amount - a.amount);
  teller.sort((a, b) => a[0].localeCompare(b[0]));
  atm.sort((a, b) => a[0].localeCompare(b[0]));
  const control = gl.reduce((s, x) => s + x.amount, 0);
  return { gl, teller, atm, key, control };
}

export default async function build({ dir }) {
  const { gl, teller, atm, key, control } = generate();
  const c = (header, key, width = 16, numFmt) => ({ header, key, width, numFmt });
  await writeXlsx(join(dir, 'FICTIONAL_GL_export_week38.xlsx'), [
    { name: 'GL', columns: [c('Posting Date', 'posting', 13), c('Value Date', 'value', 13), c('Reference No', 'ref', 14), c('Channel', 'channel', 10), c('Description', 'desc', 24), c('Amount IDR', 'amount', 16, '#,##0;[Red]-#,##0')], rows: gl },
    { name: 'Control', columns: [c('Item', 'k', 30), c('Value', 'v', 20, '#,##0;[Red]-#,##0')], rows: [{ k: 'GL control total (week 38)', v: control }, { k: 'Row count', v: gl.length }] },
  ], { readme: [`${BANK.legal}, demo branch 014. Core banking GL extract, 14 to 20 September 2026.`, 'Reference numbers keep leading zeros (core banking format).'] });
  writeCsv(join(dir, 'FICTIONAL_teller_cash_position_week38.csv'), ['Date', 'Ref', 'Teller ID', 'Txn Type', 'Amount'], teller);
  writeCsv(join(dir, 'FICTIONAL_ATM_switch_settlement_week38.csv'), ['Settlement Date', 'Terminal', 'Ref No', 'Amount'], atm);

  const col = (header, k, width = 18, numFmt) => ({ header, key: k, width, numFmt });
  await writeXlsx(join(dir, 'ANSWER_KEY_breaks.xlsx'), [
    { name: 'Breaks', columns: [col('Reference No', 'ref', 14), col('Expected Match Status', 'status', 28), col('Expected Likely Cause', 'cause', 18), col('Net amount IDR', 'amount', 16, '#,##0;[Red]-#,##0'), col('Why', 'note', 50)], rows: key },
  ], { readme: ['Presenter answer key. Do not share with participants before the exercise.', `GL control total: ${money(control)}. Matched total + break total must equal it.`] });

  writeReadme(dir, {
    title: 'Demo kit: Weekly branch reconciliation pack', scenario: 'bfsi-branch-recon-002',
    contents: ['FICTIONAL_GL_export_week38.xlsx (GL + Control sheets)', 'FICTIONAL_teller_cash_position_week38.csv', 'FICTIONAL_ATM_switch_settlement_week38.csv', 'ANSWER_KEY_breaks.xlsx (presenter only)'],
    setup: ['Upload the three data files to OneDrive in the demo tenant.', 'Open the GL workbook in Excel for the web and import the two CSVs as new sheets, each formatted as a table.', 'Follow the scenario steps.'],
    spoilers: [
      `${key.length} breaks: ${SEEDED.timing} timing, ${SEEDED.reversal} reversal pairs, ${SEEDED.investigate} to investigate.`,
      'Leading zeros: GL refs keep them (000412xx), the teller system drops them (412xx). The scenario prompt says "ignoring leading zeros". To demo the "When it goes wrong" case, run it once without that phrase: every teller row shows as unmatched.',
      'Investigate items: two transposed amounts (1,250,000 vs 1,520,000 and 3,470,000 vs 3,740,000), one GL-only withdrawal of 2,000,000, one GL-only ATM withdrawal of 1,500,000.',
    ],
  });
}
