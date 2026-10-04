// Renders an episode into a self-contained HTML review page (Clawpilot theme).
// Usage: node stories/lib/render-review.mjs <world> <episode> <out.html> [D0=YYYY-MM-DD]
// Everything shown comes from the story files, so the review shows exactly what the seeder will write.
import { writeFileSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { expand, at, fmt, addDays } from './dates.mjs';

const [world = 'zava-distribution', episode = 'email-triage', out = 'review.html', d0s] = process.argv.slice(2);
const base = resolve('stories', world);
const imp = (p) => import(pathToFileURL(resolve(base, p)).href);
const [{ WORLD }, { CAST, SYSTEM_SENDERS }, spec, { INBOX }, { HISTORY }, { CHATS }, { FILES }, { EVENTS }] = await Promise.all([
  imp('world.mjs'), imp('cast.mjs'), imp(`episodes/${episode}/spec.mjs`), imp(`episodes/${episode}/inbox.mjs`),
  imp(`episodes/${episode}/history.mjs`), imp(`episodes/${episode}/chats.mjs`), imp(`episodes/${episode}/files.mjs`), imp(`episodes/${episode}/calendar.mjs`),
]);
const { EPISODE, INBOX_SPEC, HISTORY_SPEC, GROUPS } = spec;
const D0 = new Date(d0s || EPISODE.canonicalD0);
const X = (v) => expand(v, D0);

const person = (k) => {
  if (k.startsWith('sys:')) { const s = SYSTEM_SENDERS[k.slice(4)]; return { name: s.name, addr: s.email, kind: 'system' }; }
  if (GROUPS[k]) return { name: GROUPS[k].name, addr: 'distribution list', kind: 'group' };
  const c = CAST[k]; if (!c) throw new Error(`unknown person ${k}`);
  return c.external ? { name: c.name, addr: c.email, kind: 'external', org: WORLD.orgs[c.org]?.name } : { name: c.name, addr: `${c.alias}@<demo tenant>`, kind: 'internal', title: c.title };
};
const owners = (s) => {
  const internal = (ks) => ks.flatMap((k) => GROUPS[k]?.members ?? (GROUPS[k] ? [] : [k])).filter((k) => !k.startsWith('sys:') && CAST[k] && !CAST[k].external);
  const inbox = [...new Set(internal([...(s.to || []), ...(s.cc || [])]))];
  const sent = s.how === 'dual' && CAST[s.from] && !CAST[s.from].external ? [s.from] : [];
  return { sent, inbox };
};

const join = (specs, texts) => specs.map((s) => {
  const t = texts.find((x) => x.id === s.id); if (!t) throw new Error(`no text for ${s.id}`);
  return { ...s, ...X(t), must: X(s.must), when: at(s.at, D0, WORLD.utcOffset), from: person(s.from), toP: (s.to || []).map(person), ccP: (s.cc || []).map(person), owners: owners(s) };
});
const inbox = join(INBOX_SPEC, INBOX);
const history = join(HISTORY_SPEC, HISTORY);
const chats = X(CHATS).map((c) => ({ ...c, members: c.members.map((m) => CAST[m].name), messages: c.messages.map((m) => ({ ...m, who: CAST[m.from].name, when: at(m.at, D0, WORLD.utcOffset) })) }));
const files = X(FILES).map((f) => ({ ...f, owner: CAST[f.owner].name, sharedWith: f.sharedWith.map((k) => CAST[k].name) }));
const events = X(EVENTS).map((e) => ({ ...e, organizer: CAST[e.organizer].name, attendees: (e.attendees || []).map((k) => CAST[k].name), optional: (e.optional || []).map((k) => CAST[k].name), s: at(e.start, D0, WORLD.utcOffset), e: at(e.end, D0, WORLD.utcOffset) }));
const arcs = Object.fromEntries(Object.entries(WORLD.arcs).map(([k, a]) => [k, X(a)]));
const cast = Object.entries(CAST).map(([k, c]) => ({ k, name: c.name, title: c.title, ext: !!c.external, org: c.external ? WORLD.orgs[c.org].name : 'Zava Niaga', alias: c.alias || c.email, style: c.style }));

const words = (s) => (s || '').split(/\s+/).filter(Boolean).length;
const stats = {
  emails: inbox.length, dual: inbox.filter((e) => e.how === 'dual').length, history: history.length,
  chats: chats.length, messages: chats.reduce((n, c) => n + c.messages.length, 0), files: files.length, events: events.length,
  words: [...inbox, ...history].reduce((n, e) => n + words(e.body), 0) + chats.reduce((n, c) => n + c.messages.reduce((m, x) => m + words(x.text), 0), 0),
  groups: Object.fromEntries(['act', 'week', 'fyi', 'noise', 'suspicious'].map((g) => [g, inbox.filter((e) => e.group === g).length])),
  writes: inbox.reduce((n, e) => n + e.owners.sent.length + e.owners.inbox.length, 0) + history.reduce((n, e) => n + e.owners.sent.length + (e.sentOnly ? 0 : e.owners.inbox.length), 0),
};

const DATA = { episode: EPISODE, d0: fmt(D0, 'en'), d0iso: fmt(D0, 'iso'), world: { company: WORLD.company, orgs: WORLD.orgs }, arcs, cast, inbox, history, chats, files, events, stats };
const json = JSON.stringify(DATA).replace(/</g, '\\u003c');
const html = readFileSync(resolve('stories/lib/review-template.html'), 'utf8')
  .replace('/*CLIENT*/', () => readFileSync(resolve('stories/lib/review-client.js'), 'utf8'))
  .replace('/*DATA*/null', () => json)
  .replaceAll('%TITLE%', `Demo tenant hydration plan: ${EPISODE.tag} (${EPISODE.scenario})`);
writeFileSync(out, html, 'utf8');
console.log(`review: ${out}\n${JSON.stringify(stats)}`);
