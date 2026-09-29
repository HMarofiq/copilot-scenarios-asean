// Compiles a story episode into a list of Microsoft Graph write operations (ops.json) plus rendered files.
// Tenant-neutral: the tenant's mail domain is passed in; nothing tenant-specific is written to the repo.
// Usage: node stories/lib/compile-ops.mjs <world> <episode> <D0 YYYY-MM-DD> <mailDomain> <runId> <outDir>
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expand, at } from './dates.mjs';
import { writeDocx, writeXlsx, writePdf } from '../../kits/lib.mjs';

const [world, episode, d0s, domain, runId, outDir] = process.argv.slice(2);
if (!outDir) throw new Error('usage: compile-ops <world> <episode> <D0> <mailDomain> <runId> <outDir>');
const base = resolve('stories', world);
const imp = (p) => import(pathToFileURL(resolve(base, p)).href);
const [{ WORLD }, { CAST, SYSTEM_SENDERS }, spec, { INBOX }, { HISTORY }, { CHATS }, { FILES }, { EVENTS }] = await Promise.all([
  imp('world.mjs'), imp('cast.mjs'), imp(`episodes/${episode}/spec.mjs`), imp(`episodes/${episode}/inbox.mjs`),
  imp(`episodes/${episode}/history.mjs`), imp(`episodes/${episode}/chats.mjs`), imp(`episodes/${episode}/files.mjs`), imp(`episodes/${episode}/calendar.mjs`),
]);
const { EPISODE, INBOX_SPEC, HISTORY_SPEC, GROUPS } = spec;
const D0 = new Date(d0s);
const X = (v) => expand(v, D0);
const T = (a) => at(a, D0, WORLD.utcOffset);
const TAG = EPISODE.tag;
mkdirSync(join(outDir, 'blobs'), { recursive: true });

const upn = (k) => `${CAST[k].alias}@${domain}`;
const isInternal = (k) => CAST[k] && !CAST[k].external;
const addr = (k) => {
  if (k.startsWith('sys:')) { const s = SYSTEM_SENDERS[k.slice(4)]; return { name: s.name, address: s.email }; }
  if (GROUPS[k]) return { name: GROUPS[k].name, address: `${k}@contoso-niaga.example` };
  const c = CAST[k]; return { name: c.name, address: c.external ? c.email : upn(k) };
};
// Internal people who get a copy: direct internal recipients plus members of recipient groups.
const ALLSTAFF_SEED = ['carlos', 'lydia', 'kian', 'serena', 'andre', 'babak'];
const expandRecipients = (ks) => [...new Set(ks.flatMap((k) => (k === 'allstaff' ? ALLSTAFF_SEED : GROUPS[k]?.members ?? [k])).filter(isInternal))];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const linkify = (s) => s.replace(/https:\/\/[^\s<)]+/g, (u) => `<a href="${u}">${u}</a>`);
const html = (text) => `<div style="font-family: Aptos, Calibri, Arial, sans-serif; font-size: 11pt; color: #222">${linkify(esc(text)).replace(/\n/g, '<br>\n')}</div>`;

async function renderFile(f, name) {
  const path = join(outDir, 'blobs', name);
  const opt = { title: f.title ?? '', stamp: false, keywords: f.tags ?? `${TAG}; FICTIONAL DEMO DATA`, creator: f.author };
  if (f.kind === 'xlsx') await writeXlsx(path, f.sheets, opt);
  else if (f.kind === 'docx') await writeDocx(path, f.blocks, opt);
  else if (f.kind === 'pdf') await writePdf(path, f.blocks, { title: opt.title, stamp: false, keywords: opt.keywords, author: f.author });
  else throw new Error(`unsupported file kind ${f.kind}`);
  return path;
}
const CT = { xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', pdf: 'application/pdf' };

const ops = [];

// 1. Files in their owners' OneDrive, shared without notification emails.
const FOLDER = { uptime: 'Operations Reports', reforecast: 'Finance/Q4 Re-forecast', runbook: 'Proyek Nusa/Cutover', pir: 'Incidents/INC-2026-0914-001' };
for (const f of X(FILES)) {
  const path = await renderFile({ ...f, author: CAST[f.owner].name }, `file-${f.key}-${f.name}`);
  ops.push({ op: 'file', key: `file:${f.key}`, owner: upn(f.owner), folder: FOLDER[f.key] ?? 'Documents', name: f.name, localPath: path,
    share: f.sharedWith.map((k) => ({ email: upn(k), role: 'write' })) });
}

// 2. Calendar events: organiser creates, attendees' copies are accepted silently and the invitation emails removed.
for (const e of X(EVENTS)) {
  ops.push({ op: 'event', key: `event:${e.key}`, organizer: upn(e.organizer), subject: e.subject, bodyHtml: html(e.body),
    startUtc: T(e.start), endUtc: T(e.end), location: e.location ?? '', online: !!e.online, showAs: e.showAs ?? 'busy', categories: [TAG],
    attendees: [...(e.attendees ?? []).map((k) => ({ email: upn(k), name: CAST[k].name, type: 'required' })), ...(e.optional ?? []).map((k) => ({ email: upn(k), name: CAST[k].name, type: 'optional' }))] });
}

// 3. Teams group chats, imported message by message as their authors.
for (const c of X(CHATS)) {
  if (!c.topic.startsWith(`[${TAG}] `)) throw new Error(`chat ${c.key} topic must start with [${TAG}]`);
  const messages = c.messages.map((m) => ({ from: upn(m.from), fromName: CAST[m.from].name, createdUtc: T(m.at), html: esc(m.text).replace(/\n/g, '<br>') }));
  const first = new Date(messages[0].createdUtc); first.setUTCHours(first.getUTCHours() - 2);
  ops.push({ op: 'chat', key: `chat:${c.key}`, topic: c.topic, members: c.members.map(upn), conversationCreatedUtc: first.toISOString(), messages });
}

// 4. Emails: history first, then the morning inbox, oldest first.
async function mailOp(s, t, kind) {
  const sentUtc = T(s.at);
  const copies = [];
  const senderInternal = isInternal(s.from) && s.how === 'dual';
  if (senderInternal) copies.push({ mailbox: upn(s.from), folder: 'sentitems', isRead: true });
  if (!s.sentOnly) for (const k of expandRecipients([...(s.to ?? []), ...(s.cc ?? [])])) {
    if (senderInternal && k === s.from) continue;
    copies.push({ mailbox: upn(k), folder: 'inbox', isRead: kind === 'history' ? true : false });
  }
  const attachments = [];
  for (const a of t.attachments ?? []) {
    const p = await renderFile({ ...a, title: a.name.replace(/\.[^.]+$/, '').replace(/_/g, ' '), author: CAST[s.from]?.name }, `att-${s.id}-${a.name}`);
    attachments.push({ name: a.name, localPath: p, contentType: CT[a.kind] });
  }
  return { op: 'mail', key: `mail:${s.id}`, id: s.id, kind, group: s.group ?? null, sentUtc, receivedUtc: sentUtc,
    internetMessageId: `<${s.id.toLowerCase()}.${EPISODE.key}.${runId}@contoso-niaga.example>`,
    subject: t.subject, bodyHtml: html(t.body), importance: t.importance ?? 'normal',
    from: addr(s.from), to: (s.to ?? []).map(addr), cc: (s.cc ?? []).map(addr), copies, attachments };
}
const hist = X(HISTORY); const inbox = X(INBOX);
const mails = [
  ...await Promise.all(HISTORY_SPEC.map((s) => mailOp(s, hist.find((h) => h.id === s.id), 'history'))),
  ...await Promise.all(INBOX_SPEC.map((s) => mailOp(s, inbox.find((m) => m.id === s.id), 'inbox'))),
].sort((a, b) => a.sentUtc.localeCompare(b.sentUtc));
ops.push(...mails);

const plan = { runId, world, episode, tag: TAG, d0: d0s, domain, created: new Date().toISOString(),
  props: { story: TAG, data: 'FICTIONAL', run: runId }, ops };
writeFileSync(join(outDir, 'ops.json'), JSON.stringify(plan, null, 2));
const n = (k) => ops.filter((o) => o.op === k).length;
console.log(JSON.stringify({ files: n('file'), events: n('event'), chats: n('chat'), chatMessages: ops.filter((o) => o.op === 'chat').reduce((s, o) => s + o.messages.length, 0),
  mails: n('mail'), mailboxWrites: mails.reduce((s, m) => s + m.copies.length, 0), mailboxes: [...new Set(mails.flatMap((m) => m.copies.map((c) => c.mailbox.split('@')[0])))].length }));
