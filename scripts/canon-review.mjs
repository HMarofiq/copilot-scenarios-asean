// Renders canon/zava.mjs plus a live scan of every scenario into one review page.
// Usage: node scripts/canon-review.mjs <out.html>
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { RULES, GROUP, ARMS, PEOPLE, EXTERNAL, COMPANY_FREE } from '../canon/zava.mjs';

const out = process.argv[2] ?? 'zava-canon-review.html';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const OLD = ['Contoso Niaga', 'Contoso', 'Northwind', 'Fabrikam', 'Relecloud', 'Wingtip', 'Tailspin', 'Coho', 'Woodgrove', 'Lucerne', 'Litware', 'Adatum', 'Trey', 'Wide World', 'Alpine', 'Blue Yonder'];
const ZAVA_RENAMED = ['Contoso Niaga', 'Contoso', 'Northwind', 'Fabrikam', 'Relecloud'];

const armOf = (id) => Object.entries(ARMS).find(([, a]) => a.scenarios.includes(id));
const scan = readdirSync('content/scenarios').filter((f) => f.endsWith('.md')).map((f) => {
  const id = f.replace('.md', '');
  const page = readFileSync(join('content/scenarios', f), 'utf8').replace(/\r\n/g, '\n');
  const title = (page.match(/title:\s*\{\s*en:\s*"([^"]+)"/) || [])[1] ?? id;
  const status = (page.match(/^status:\s*(\S+)/m) || [])[1];
  const prompts = [...page.matchAll(/^:::prompt\n([\s\S]*?)^:::/gm)].map((m) => m[1]).join('\n');
  const kitDir = join('kits', id);
  const kit = existsSync(kitDir) ? readdirSync(kitDir).filter((x) => x.endsWith('.mjs')).map((x) => readFileSync(join(kitDir, x), 'utf8')).join('\n') : '';
  const count = (txt, n) => (txt.match(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const inPrompt = ZAVA_RENAMED.filter((n) => count(prompts, n) > 0);
  const mentions = OLD.map((n) => [n, count(page, n) + count(kit, n)]).filter(([, c]) => c > 0);
  const arm = armOf(id);
  const people = PEOPLE.filter((p) => p.scenarios?.includes(id));
  return { id, title, status, inPrompt, mentions, arm, people, free: COMPANY_FREE.includes(id) };
});

const ent = (e) => `<div class="ent"><b>${esc(e.legal)}</b>${e.sites ? `<span>${esc(e.sites.join(' · '))}</span>` : ''}${e.brands ? `<span>Brands: ${esc(e.brands.join(', '))}</span>` : ''}${e.ownership ? `<span>${esc(e.ownership)}</span>` : ''}${e.governance ? `<span>${esc(e.governance)}</span>` : ''}${e.note ? `<span>${esc(e.note)}</span>` : ''}${e.subsidiaries ? `<span>Subsidiaries: ${esc(e.subsidiaries.join(', '))}</span>` : ''}<em>${e.parent === 'zid' ? 'Indonesia' : 'Malaysia'}</em></div>`;
const armCard = ([k, a]) => `<section class="card arm"><h3>${esc(a.name)}</h3><p>${esc(a.what)}</p><div class="ents">${a.entities.map(ent).join('')}</div>
<p class="small"><b>Replaces:</b> ${esc(a.replaces.join('; '))}<br><b>Scenarios:</b> ${a.scenarios.map((s) => `<code>${esc(s)}</code>`).join(' ')}</p></section>`;

const decisions = [
  { n: 1, t: 'Head office', pick: 'Thin Singapore parent (Zava Holdings Pte. Ltd., USD) over two listed regional sub-holdings: PT Zava Indonesia Tbk (Jakarta) and Zava Malaysia Berhad (KL). Scenarios run at operating-company level.', why: 'Keeps Direksi / Komisaris, IDR and Indonesian rules for ID scenarios and Board, MYR and BNM for MY scenarios, while still being genuinely multinational.', alt: 'Jakarta-headquartered group (simpler, but Malaysia becomes "foreign subsidiary"); KL-headquartered group (mirror image).' },
  { n: 2, t: 'Government and state-owned scenarios', pick: 'A state-linked arm, PT Zava Logistik Nusantara, 51% held by a fictional state investment fund (Dana Kelola Nusantara); Malaysian twin Zava Infra Malaysia as a GLC-style company.', why: 'Lets KAK/HPS procurement, RKAP, Direksi minutes and holding-portfolio scenarios stay realistic for BUMN and GLC audiences inside one group.', alt: 'Keep a separate fictional public body for these five (breaks "one company"); or treat Zava as fully private (procurement rules lose their basis).' },
  { n: 3, t: 'Demo-tenant story world', pick: 'Rename stories/contoso-niaga to the Zava Distribution episode set (PT Zava Niaga Nusantara). Cast, arcs and demo-tenant users stay.', why: 'The demo tenant is already branded Zava, so live demos and the public library tell one story.', alt: 'Keep Contoso Niaga for live demos only (two worlds to maintain).' },
];

const extRows = Object.values(EXTERNAL).map((x) => `<tr><td>${esc(x.names ? x.names.join(', ') : x.name)}</td><td>${esc(x.role)}</td><td>${x.domain ? `<code>${esc(x.domain)}</code>` : '-'}</td></tr>`).join('');
const pplRows = PEOPLE.map((p) => `<tr><td><b>${esc(p.name)}</b>${p.alias ? ` <span class="pill">tenant user</span>` : ''}</td><td>${esc(p.title)}</td><td>${(p.scenarios ?? []).map((s) => `<code>${esc(s)}</code>`).join(' ')}</td><td class="small">${esc(p.note ?? '')}</td></tr>`).join('');
const migRows = scan.map((s) => {
  const target = s.free ? '<span class="pill ok">No company</span>' : s.arm ? esc(s.arm[1].name) : '<span class="pill bad">Unmapped</span>';
  const rerun = s.inPrompt.length ? `<span class="pill warn">Yes: prompt names ${esc(s.inPrompt.join(', '))}</span>` : '<span class="pill ok">No: names only in files</span>';
  return `<tr><td><code>${esc(s.id)}</code><br><span class="small">${esc(s.title)}</span></td><td>${esc(s.status)}</td><td>${target}</td><td class="small">${s.mentions.map(([n, c]) => `${esc(n)} ${c}`).join(', ') || '-'}</td><td class="small">${s.people.map((p) => esc(p.name)).join(', ') || '-'}</td><td>${rerun}</td></tr>`;
}).join('');
const rerunCount = scan.filter((s) => s.inPrompt.length).length;

const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Zava Group canon: review</title>
<script>(() => { const param = new URLSearchParams(window.location.search).get("scoutTheme"); const theme = param || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); document.documentElement.setAttribute("data-theme", theme); })();</script>
<style>
:root{color-scheme:light;--cp-bg:#f7f4ef;--cp-bg-elevated:#fcfbf8;--cp-surface:#ffffff;--cp-surface-soft:#f5f5f5;--cp-border:#dedede;--cp-border-strong:#919191;--cp-text:#242424;--cp-text-muted:#5c5c5c;--cp-text-soft:#6f6f6f;--cp-accent:#b11f4b;--cp-accent-hover:#9a1a41;--cp-accent-soft:rgba(177,31,75,.08);--cp-accent-fg:#ffffff;--cp-success:#16a34a;--cp-danger:#dc2626;--cp-warning:#f59e0b;--cp-link:#0078d4;--cp-shadow:0 18px 48px rgba(0,0,0,.12);--cp-overlay:rgba(255,255,255,.8);--cp-panel:rgba(255,255,255,.86);--cp-panel-strong:rgba(255,255,255,.96);--cp-sheen:rgba(255,255,255,.55);--cp-highlight:rgba(177,31,75,.12)}
html[data-theme="dark"]{color-scheme:dark;--cp-bg:#3d3b3a;--cp-bg-elevated:#343231;--cp-surface:#292929;--cp-surface-soft:#2e2e2e;--cp-border:#474747;--cp-border-strong:#5f5f5f;--cp-text:#dedede;--cp-text-muted:#919191;--cp-text-soft:#b0b0b0;--cp-accent:#fd8ea1;--cp-accent-hover:#fb7b91;--cp-accent-soft:rgba(253,142,161,.14);--cp-accent-fg:#1a1a1a;--cp-success:#4ade80;--cp-danger:#f87171;--cp-warning:#fbbf24;--cp-link:#4da6ff;--cp-shadow:0 18px 48px rgba(0,0,0,.32);--cp-overlay:rgba(41,41,41,.88);--cp-panel:rgba(41,41,41,.72);--cp-panel-strong:rgba(41,41,41,.96);--cp-sheen:rgba(255,255,255,.04);--cp-highlight:rgba(253,142,161,.12)}
*{box-sizing:border-box}body{margin:0;background:var(--cp-bg);color:var(--cp-text);font:15px/1.55 "Segoe UI",Aptos,Calibri,-apple-system,BlinkMacSystemFont,sans-serif}
main{max-width:1180px;margin:0 auto;padding:32px 24px 64px}h1{margin:0 0 4px;font-size:28px}h2{margin:40px 0 12px;font-size:20px;border-bottom:1px solid var(--cp-border);padding-bottom:6px}h3{margin:0 0 6px;font-size:17px;color:var(--cp-accent)}
.lead{color:var(--cp-text-muted);margin:0 0 20px}.card{background:var(--cp-surface);border:1px solid var(--cp-border);border-radius:16px;padding:16px 18px;box-shadow:0 0 2px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.14)}
.grid{display:grid;gap:12px}.g2{grid-template-columns:repeat(auto-fit,minmax(340px,1fr))}.g3{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
.ents{display:grid;gap:8px;margin:10px 0}.ent{background:var(--cp-surface-soft);border:1px solid var(--cp-border);border-radius:.625rem;padding:8px 10px;display:flex;flex-direction:column;gap:2px}.ent span{color:var(--cp-text-muted);font-size:13px}.ent em{font-style:normal;font-size:12px;color:var(--cp-accent)}
.small{font-size:13px;color:var(--cp-text-muted)}code{font-family:Consolas,"Courier New",monospace;font-size:12px;background:var(--cp-surface-soft);border:1px solid var(--cp-border);border-radius:6px;padding:0 4px}
table{width:100%;border-collapse:collapse;background:var(--cp-surface);border:1px solid var(--cp-border);border-radius:.625rem;overflow:hidden}th,td{text-align:left;vertical-align:top;padding:8px 10px;border-bottom:1px solid var(--cp-border)}th{background:var(--cp-surface-soft);font-size:13px;color:var(--cp-text-muted)}
.pill{display:inline-block;font-size:12px;border-radius:999px;padding:1px 8px;border:1px solid var(--cp-border);background:var(--cp-surface-soft)}.pill.ok{color:var(--cp-success);border-color:var(--cp-success)}.pill.warn{color:var(--cp-warning);border-color:var(--cp-warning)}.pill.bad{color:var(--cp-danger);border-color:var(--cp-danger)}
.tree{font-family:Consolas,"Courier New",monospace;font-size:13px;white-space:pre;overflow:auto}.dec b.n{display:inline-block;background:var(--cp-accent);color:var(--cp-accent-fg);border-radius:999px;width:22px;height:22px;text-align:center;line-height:22px;margin-right:6px}
ol.rules li{margin:6px 0}.stats{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0}.stat{background:var(--cp-surface);border:1px solid var(--cp-border);border-radius:.625rem;padding:10px 14px}.stat b{display:block;font-size:22px;color:var(--cp-accent)}
</style></head><body><main>
<h1>Zava Group canon</h1><p class="lead">One fictional multinational for every scenario that needs a company. Proposed 4 Oct 2026, awaiting approval. Generated from <code>canon/zava.mjs</code> and a live scan of <code>content/scenarios</code>.</p>
<div class="stats"><div class="stat"><b>${Object.keys(ARMS).length}</b>business arms</div><div class="stat"><b>${Object.values(ARMS).reduce((a, x) => a + x.entities.length, 0)}</b>operating companies</div><div class="stat"><b>${PEOPLE.length}</b>named people</div><div class="stat"><b>${Object.keys(EXTERNAL).length}</b>outside parties</div><div class="stat"><b>${scan.length}</b>scenarios mapped</div><div class="stat"><b>${rerunCount}</b>need a prompt re-run</div></div>

<h2>1. The group</h2>
<div class="card"><div class="tree">${esc(`${GROUP.parent.legal}  (${GROUP.parent.city}; group HQ; USD)
├─ ${GROUP.subHoldings[0].legal}  (${GROUP.subHoldings[0].city}; ${GROUP.subHoldings[0].governance}; IDR)
│   ${Object.values(ARMS).flatMap((a) => a.entities.filter((e) => e.parent === 'zid').map((e) => `├─ ${e.legal}   [${a.name}]`)).join('\n│   ')}
└─ ${GROUP.subHoldings[1].legal}  (${GROUP.subHoldings[1].city}; ${GROUP.subHoldings[1].governance}; MYR)
    ${Object.values(ARMS).flatMap((a) => a.entities.filter((e) => e.parent === 'zmy').map((e) => `├─ ${e.legal}   [${a.name}]`)).join('\n    ')}`)}</div>
<p class="small">${esc(GROUP.size)} ${esc(GROUP.fiscalYear)}<br>${esc(GROUP.languages)}</p></div>

<h2>2. Decisions to confirm</h2>
<div class="grid g3">${decisions.map((d) => `<div class="card dec"><h3><b class="n">${d.n}</b>${esc(d.t)}</h3><p><b>Proposed:</b> ${esc(d.pick)}</p><p class="small"><b>Why:</b> ${esc(d.why)}</p><p class="small"><b>Alternatives:</b> ${esc(d.alt)}</p></div>`).join('')}</div>

<h2>3. Rules</h2>
<div class="card"><ol class="rules">${RULES.map((r) => `<li>${esc(r)}</li>`).join('')}</ol></div>

<h2>4. Business arms</h2>
<div class="grid g2">${Object.entries(ARMS).map(armCard).join('')}</div>
<p class="small">Room to add later: Zava Health, Zava Manufacturing, Zava Property.</p>

<h2>5. People</h2>
<p class="small">One name, one person across the whole library. "Tenant user" means an existing user in the demo tenant.</p>
<table><tr><th>Name</th><th>Role</th><th>Appears in</th><th>Note</th></tr>${pplRows}</table>

<h2>6. Outside parties</h2>
<p class="small">Never Zava. Microsoft fictional brands freed by the migration are reused here.</p>
<table><tr><th>Name</th><th>Role</th><th>Domain</th></tr>${extRows}</table>

<h2>7. Migration map (live scan)</h2>
<p class="small">Mentions = how often each old fictional name appears in the page and kit today. A re-run is needed where a published prompt contains a company name, because removing it changes the prompt.</p>
<table><tr><th>Scenario</th><th>Status</th><th>Becomes</th><th>Old names today</th><th>Canon people</th><th>Prompt re-run</th></tr>${migRows}</table>
</main></body></html>`;
writeFileSync(out, html, 'utf8');
console.log(`wrote ${out}: ${scan.length} scenarios, ${rerunCount} need re-run`);
