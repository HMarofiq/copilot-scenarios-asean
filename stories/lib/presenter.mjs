// Presenter guide: load an episode's presenter.mjs, check it against the story, and render it as HTML.
// Used by render-review.mjs (a tab in the review page) and render-presenter.mjs (its own page).
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expand, at } from './dates.mjs';

export const SURFACES = ['Copilot Chat', 'Outlook', 'Teams', 'Word', 'Excel', 'PowerPoint', 'Cowork', 'Scout'];
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Everything a moment may point at, keyed by id: emails (spec ids), chats, files and meetings.
export function groundIndex({ inbox = [], history = [], chats = [], files = [], events = [] }) {
  const idx = {};
  for (const m of inbox) idx[m.id] = { kind: 'Email', label: m.subject };
  for (const m of history) idx[m.id] = { kind: 'Email (older)', label: m.subject };
  for (const c of chats) idx[c.key ?? c.id] = { kind: 'Teams chat', label: c.topic };
  for (const f of files) idx[f.key] = { kind: 'File', label: f.name };
  for (const e of events) idx[e.key] = { kind: 'Meeting', label: e.subject };
  return idx;
}

export function checkPresenter(P, idx) {
  const problems = [];
  if (!P?.moments?.length) return ['presenter.mjs has no moments'];
  const ids = new Set();
  for (const m of P.moments) {
    if (ids.has(m.id)) problems.push(`${m.id}: duplicate id`);
    ids.add(m.id);
    if (!SURFACES.includes(m.surface)) problems.push(`${m.id}: unknown surface "${m.surface}"`);
    if (!m.prompt?.trim()) problems.push(`${m.id}: missing prompt`);
    if (!(m.expect?.length >= 2)) problems.push(`${m.id}: needs at least 2 expected results`);
    if (!m.grounds?.length) problems.push(`${m.id}: grounds nothing`);
    for (const g of m.grounds ?? []) if (!idx[g]) problems.push(`${m.id}: grounds "${g}" is not a seeded item`);
  }
  return problems;
}

export async function loadPresenter(base, episode) {
  const p = resolve(base, 'episodes', episode, 'presenter.mjs');
  return existsSync(p) ? (await import(pathToFileURL(p).href)).PRESENTER : null;
}

export function presenterHtml(Praw, { D0, utcOffset, cast, idx }) {
  if (!Praw) return '<p class="muted">No presenter guide yet for this episode (add presenter.mjs).</p>';
  const P = expand(Praw, D0);
  const seat = cast[P.seat]?.name ?? P.seat;
  const start = P.when ? new Date(at(P.when, D0, utcOffset)).toLocaleString('en-GB', { timeZone: 'Asia/Jakarta', weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : '';
  const total = P.moments.reduce((n, m) => n + (m.minutes || 0), 0);
  const chip = (g) => `<span class="pill" title="${esc(idx[g]?.kind)}">${esc(g)} · ${esc(idx[g]?.label ?? '?')}</span>`;
  const head = `<div class="card"><h3 style="margin-top:0">The story in one breath</h3><p class="small">${esc(P.pitch)}</p>
    <p class="small muted">Seat: <b>${esc(seat)}</b> · ${esc(P.tier)}${start ? ` · ${esc(start)} WIB` : ''} · ${P.moments.length} moments, about ${total} minutes</p></div>`;
  const before = `<div class="card" style="margin-top:14px"><h3 style="margin-top:0">Before you start</h3><ol class="tight small">${P.before.map((b) => `<li>${esc(b)}</li>`).join('')}</ol></div>`;
  const run = `<div class="tbl" style="margin-top:14px"><table><thead><tr><th>#</th><th>Surface</th><th>Prompt</th><th>Min</th></tr></thead><tbody>${
    P.moments.map((m) => `<tr><td><a href="#pm-${esc(m.id)}">${esc(m.id)}</a></td><td>${esc(m.surface)}</td><td class="small">${esc(m.prompt)}</td><td>${m.minutes ?? ''}</td></tr>`).join('')}</tbody></table></div>`;
  const cards = P.moments.map((m) => `<div class="card" id="pm-${esc(m.id)}" style="margin-top:14px">
    <h3 style="margin-top:0">${esc(m.id)} · ${esc(m.surface)}${m.kit ? ` <span class="pill">kit ${esc(m.kit)}</span>` : ''}</h3>
    <p class="small muted" style="margin:0 0 6px">Prompt</p><div class="prompt mono small">${esc(m.prompt)}</div>
    <p class="small muted" style="margin:12px 0 6px">Expected result (check these)</p><ul class="tight small">${m.expect.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
    <p class="small muted" style="margin:12px 0 6px">What to point at</p><p class="small" style="margin:0">${esc(m.watch)}</p>
    ${m.fallback ? `<p class="small muted" style="margin:12px 0 6px">If it misses</p><p class="small" style="margin:0">${esc(m.fallback)}</p>` : ''}
    <p class="small muted" style="margin:12px 0 6px">Grounded in</p><div class="chips">${m.grounds.map(chip).join(' ')}</div></div>`).join('');
  return head + before + `<h2 style="margin-top:24px">Run of show</h2>` + run + cards;
}
