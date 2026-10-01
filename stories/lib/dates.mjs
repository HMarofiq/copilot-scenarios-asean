// Story library: date tokens.
// Every explicit date in story text is written as {{d:OFFSET:FORMAT}}, relative to D0 (the demo day),
// so an episode can be seeded again on any day. Example: {{d:+3:id}} -> "Sabtu, 3 Oktober 2026".
//
// FORMAT: id | en | ms          full date with weekday, e.g. "Rabu, 30 September 2026" / "Wednesday, 30 September 2026"
//         id-short | en-short   e.g. "30 Sep" (en-short) / "30 Sep" (id-short)
//         day-id | day-en | day-ms   weekday only
//         dmy                   30/09/2026
//         iso                   2026-09-30
//         month-id | month-en   month name of that day

const DAYS = {
  id: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  ms: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
const MONTHS = {
  id: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  ms: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
const SHORT = { id: 'Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des'.split(' '), en: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ') };

export const addDays = (d0, n) => { const x = new Date(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), d0.getUTCDate())); x.setUTCDate(x.getUTCDate() + n); return x; };

export function fmt(d, f) {
  const [dd, m, y, w] = [d.getUTCDate(), d.getUTCMonth(), d.getUTCFullYear(), d.getUTCDay()];
  const p = (n) => String(n).padStart(2, '0');
  switch (f) {
    case 'id': return `${DAYS.id[w]}, ${dd} ${MONTHS.id[m]} ${y}`;
    case 'ms': return `${DAYS.ms[w]}, ${dd} ${MONTHS.ms[m]} ${y}`;
    case 'en': return `${DAYS.en[w]}, ${dd} ${MONTHS.en[m]} ${y}`;
    case 'id-short': return `${dd} ${SHORT.id[m]}`;
    case 'en-short': return `${dd} ${SHORT.en[m]}`;
    case 'day-id': return DAYS.id[w];
    case 'day-ms': return DAYS.ms[w];
    case 'day-en': return DAYS.en[w];
    case 'dmy': return `${p(dd)}/${p(m + 1)}/${y}`;
    case 'iso': return `${y}-${p(m + 1)}-${p(dd)}`;
    case 'month-id': return MONTHS.id[m];
    case 'month-en': return MONTHS.en[m];
    default: throw new Error(`unknown date format "${f}"`);
  }
}

const TOKEN = /\{\{d:([+-]?\d+):([a-z-]+)\}\}/g;
// Weekday-anchored offsets: the story canon assumes D0 is a Wednesday. {{w:N:FORMAT}} (and {w:N} in times) means
// 'the weekday that is N days after a Wednesday D0, in the same week', so Friday stays Friday when D0 is another weekday.
const TOKEN_W = /\{\{w:([+-]?\d+):([a-z-]+)\}\}/g;
export const CANON_WEEKDAY = 3;
export const wshift = (d0) => CANON_WEEKDAY - d0.getUTCDay();

// Replace every {{d:N:FORMAT}} in a string (or every string inside an object/array).
export function expand(value, d0) {
  if (typeof value === 'string') return value.replace(TOKEN, (_, n, f) => fmt(addDays(d0, Number(n)), f)).replace(TOKEN_W, (_, n, f) => fmt(addDays(d0, Number(n) + wshift(d0)), f));
  if (Array.isArray(value)) return value.map((v) => expand(v, d0));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, expand(v, d0)]));
  return value;
}

// {d:-1, t:'21:40'} in the story's time zone -> ISO UTC string.
export function at({ d, w, t }, d0, utcOffsetHours = 7) {
  if (w !== undefined) d = w + wshift(d0);
  const [hh, mm] = t.split(':').map(Number);
  const day = addDays(d0, d);
  return new Date(Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate(), hh - utcOffsetHours, mm)).toISOString();
}

// Throws if a string still contains something that looks like a hard-coded date (a month name next to a number).
export function assertNoHardDates(s, where) {
  const months = [...MONTHS.id, ...MONTHS.en, ...MONTHS.ms, ...SHORT.en, ...SHORT.id].join('|');
  const hit = s.replace(TOKEN, '').replace(TOKEN_W, '').match(new RegExp(`\\b\\d{1,2}\\s+(${months})\\b`));
  if (hit) throw new Error(`${where}: hard-coded date "${hit[0]}"; use a {{d:N:FORMAT}} token`);
}
