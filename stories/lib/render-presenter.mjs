// Renders an episode's presenter guide as its own self-contained page (same theme as the review page).
// Usage: node stories/lib/render-presenter.mjs <world> <episode> <out.html> [D0=YYYY-MM-DD]
import { writeFileSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { expand, fmt } from './dates.mjs';
import { loadPresenter, groundIndex, checkPresenter, presenterHtml } from './presenter.mjs';

const [world = 'zava-distribution', episode = 'email-triage', out = 'presenter.html', d0s] = process.argv.slice(2);
const base = resolve('stories', world);
const imp = (p) => import(pathToFileURL(resolve(base, p)).href);
const [{ WORLD }, { CAST }, { EPISODE }, { INBOX }, { HISTORY }, { CHATS }, { FILES }, { EVENTS }] = await Promise.all([
  imp('world.mjs'), imp('cast.mjs'), imp(`episodes/${episode}/spec.mjs`), imp(`episodes/${episode}/inbox.mjs`),
  imp(`episodes/${episode}/history.mjs`), imp(`episodes/${episode}/chats.mjs`), imp(`episodes/${episode}/files.mjs`), imp(`episodes/${episode}/calendar.mjs`),
]);
const D0 = new Date(d0s || EPISODE.canonicalD0);
const P = await loadPresenter(base, episode);
if (!P) throw new Error(`no presenter.mjs for ${world}/${episode}`);
const idx = groundIndex({ inbox: expand(INBOX, D0), history: expand(HISTORY, D0), chats: CHATS, files: FILES, events: EVENTS });
const problems = checkPresenter(P, idx);
if (problems.length) throw new Error(`presenter.mjs:\n${problems.join('\n')}`);

const tpl = readFileSync(resolve('stories/lib/review-template.html'), 'utf8');
const style = tpl.match(/<style>[\s\S]*?<\/style>/)[0];
const title = `Presenter guide: ${EPISODE.tag} (${EPISODE.scenario})`;
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>${style}
<style>@media print { .card { break-inside: avoid; box-shadow: none; } a { color: inherit; text-decoration: none; } }</style></head>
<body><div class="wrap"><header><h1>${title}</h1>
<p class="muted">${WORLD.company.legalName} (fictional) · demo day ${fmt(D0, 'en')} · every expected result is the answer key for that moment.</p></header>
${presenterHtml(P, { D0, utcOffset: WORLD.utcOffset, cast: CAST, idx })}
</div></body></html>`;
writeFileSync(out, html, 'utf8');
console.log(`presenter: ${out} (${P.moments.length} moments)`);
