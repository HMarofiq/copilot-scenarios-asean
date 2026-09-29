// Client script for the hydration review page. DATA is injected by render-review.mjs.
(() => {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const LABEL = { act: 'Act today', week: 'This week', fyi: 'FYI', noise: 'Noise', suspicious: 'Suspicious' };
  const tz = 'Asia/Jakarta';
  const dt = (iso, opt) => new Date(iso).toLocaleString('en-GB', { timeZone: tz, ...opt });
  const when = (iso) => dt(iso, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const S = DATA.stats;

  // Header and tabs
  $('#badges').innerHTML = [
    `<span class="badge accent">Tag: ${esc(DATA.episode.tag)}</span>`, `<span class="badge">Scenario ${esc(DATA.episode.scenario)}</span>`,
    `<span class="badge">World: ${esc(DATA.world.company.legalName)} (fictional)</span>`, `<span class="badge">Demo day: ${esc(DATA.d0)}, 07:30 WIB</span>`,
    '<span class="badge warn">Status: awaiting your approval</span>'].join('');
  $('#tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#tabs button').forEach((x) => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('on', p.id === `p-${b.dataset.p}`));
    window.scrollTo({ top: 0 });
  });
  $('#d0rec').textContent = `Recommended: ${DATA.d0}, seeded the evening before`;

  // Overview stats
  const stat = (n, l) => `<div class="card stat"><div class="n">${n}</div><div class="l">${l}</div></div>`;
  $('#stats').innerHTML = [
    stat(S.emails, `unread emails in Carlos's inbox: ${S.groups.act} act today, ${S.groups.week} this week, ${S.groups.fyi} FYI, ${S.groups.noise} noise, ${S.groups.suspicious} suspicious`),
    stat(S.dual, 'of them from colleagues, also written to the sender\'s Sent Items (and CC\'d colleagues)'),
    stat(S.history, 'older emails that give the story its history (outage review, cutover plan, re-forecast)'),
    stat(`${S.chats} · ${S.messages}`, '[Triage] Teams group chats · messages, each posted as its author'),
    stat(S.files, 'files owned by their authors in OneDrive, shared, tagged Triage'),
    stat(S.events, 'calendar events (past and upcoming)'),
    stat(S.writes, 'mailbox writes in total (each email lands in several mailboxes)'),
    stat(S.words.toLocaleString('en'), 'words of email and chat text'),
  ].join('');

  // Story
  $('#arcs').innerHTML = Object.values(DATA.arcs).map((a) => `<div class="card arc"><h3>${esc(a.title)}</h3><ul class="tight">${a.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>`).join('');
  $('#cast').innerHTML = DATA.cast.map((c) => `<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.title)}</td><td>${esc(c.org)}</td><td class="mono small">${esc(c.ext ? c.alias : c.alias + ' (demo tenant)')}</td><td class="small muted">${esc(c.style)}</td></tr>`).join('');

  // Mail reader (inbox and history)
  const names = (ps) => ps.map((p) => esc(p.name)).join(', ');
  const renderBlocks = (blocks) => {
    let html = '', inList = false;
    for (const raw of blocks) {
      const b = String(raw);
      const li = b.match(/^[-*] (.*)/);
      if (li && !inList) { html += '<ul>'; inList = true; }
      if (!li && inList) { html += '</ul>'; inList = false; }
      const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
      if (li) html += `<li>${inline(li[1])}</li>`;
      else if (b.startsWith('## ')) html += `<h2>${inline(b.slice(3))}</h2>`;
      else if (b.startsWith('# ')) html += `<h1>${inline(b.slice(2))}</h1>`;
      else if (b.trim()) html += `<p>${inline(b)}</p>`;
    }
    return html + (inList ? '</ul>' : '');
  };
  const renderSheets = (sheets) => sheets.map((sh) => `<div class="sheet"><h4>Sheet: ${esc(sh.name)}</h4><div class="tbl"><table><thead><tr>${sh.columns.map((c) => `<th>${esc(c.header)}</th>`).join('')}</tr></thead><tbody>${
    sh.rows.map((r) => `<tr>${sh.columns.map((c) => `<td>${esc(r[c.key])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`).join('');
  const attachment = (a) => `<div class="att"><b>📎 ${esc(a.name)}</b>${a.blocks ? `<div class="docx">${renderBlocks(a.blocks)}</div>` : ''}${a.sheets ? renderSheets(a.sheets) : ''}</div>`;

  function mailbox(items, listSel, readSel, filterSel) {
    const sorted = [...items].sort((a, b) => b.when.localeCompare(a.when));
    let filter = 'all', sel = sorted[0]?.id;
    const show = (e) => {
      const o = e.owners;
      const where = [o.sent.length ? `Sent Items of ${o.sent.map((k) => DATA.cast.find((c) => c.k === k).name).join(', ')}` : '',
        !e.sentOnly && o.inbox.length ? `Inbox of ${o.inbox.map((k) => DATA.cast.find((c) => c.k === k).name).join(', ')}` : ''].filter(Boolean).join(' · ');
      $(readSel).innerHTML = `<h2>${esc(e.subject)}</h2>
        <div class="hdr"><b>${esc(e.from.name)}</b> &lt;${esc(e.from.addr)}&gt;${e.from.org ? ` · ${esc(e.from.org)}` : ''}<br>
        To: ${names(e.toP)}${e.ccP.length ? `<br>Cc: ${names(e.ccP)}` : ''}<br>${esc(dt(e.when, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }))} WIB${e.importance === 'high' ? ' · <b>High importance</b>' : ''}
        <div style="margin-top:6px">${e.group ? `<span class="pill ${e.group}">${LABEL[e.group]}</span> ` : ''}<span class="pill ${e.how === 'dual' ? 'dual' : ''}">${e.how === 'dual' ? 'Both sides' : 'Inbox only'}</span> <span class="small">Written to: ${esc(where)}</span></div></div>
        <div class="body">${esc(e.body)}</div>${(e.attachments || []).map(attachment).join('')}
        <div class="why"><b>Why it's here (${esc(e.id)}${e.arc ? ` · arc: ${esc(DATA.arcs[e.arc]?.title || e.arc)}` : ''}):</b> ${esc(e.must)}${e.trap ? `<div class="trap">Trap: ${esc(e.trap)}</div>` : ''}${e.personalData ? '<div class="trap">Contains fictional personal data on purpose; it must never appear in a summary or draft.</div>' : ''}</div>`;
    };
    const list = () => {
      const rows = sorted.filter((e) => filter === 'all' || e.group === filter || (filter === 'trap' && e.trap));
      $(listSel).innerHTML = rows.map((e) => `<div class="item${e.id === sel ? ' sel' : ''}" data-id="${e.id}"><div class="row1"><span class="from">${esc(e.from.name)}</span><span class="time">${esc(when(e.when))}</span></div>
        <div class="subj">${esc(e.subject)}</div><div class="meta">${e.group ? `<span class="pill ${e.group}">${LABEL[e.group]}</span>` : ''}${e.how === 'dual' ? '<span class="pill dual">Both sides</span>' : ''}${e.trap ? '<span class="pill trap">Trap</span>' : ''}${(e.attachments || []).length ? '<span class="pill">📎</span>' : ''}<span class="pill">${esc(e.lang)}</span></div></div>`).join('');
    };
    $(listSel).addEventListener('click', (ev) => { const it = ev.target.closest('.item'); if (!it) return; sel = it.dataset.id; list(); show(items.find((x) => x.id === sel)); });
    if (filterSel) {
      const counts = (g) => items.filter((e) => e.group === g).length;
      $(filterSel).innerHTML = [['all', `All ${items.length}`], ...Object.keys(LABEL).map((g) => [g, `${LABEL[g]} ${counts(g)}`]), ['trap', `Traps ${items.filter((e) => e.trap).length}`]]
        .map(([k, l]) => `<button data-g="${k}" aria-pressed="${k === 'all'}">${l}</button>`).join('');
      $(filterSel).addEventListener('click', (ev) => { const b = ev.target.closest('button'); if (!b) return; filter = b.dataset.g;
        document.querySelectorAll(`${filterSel} button`).forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); list(); });
    }
    list(); if (sorted[0]) show(sorted[0]);
  }
  mailbox(DATA.inbox, '#inbox-list', '#inbox-read', '#inbox-f');
  mailbox(DATA.history, '#history-list', '#history-read');

  // Chats
  let chatSel = DATA.chats[0]?.key;
  const chatList = () => { $('#chat-list').innerHTML = DATA.chats.map((c) => `<div class="item${c.key === chatSel ? ' sel' : ''}" data-k="${c.key}"><div class="from">${esc(c.topic)}</div><div class="small muted">${esc(c.members.join(', '))}</div><div class="meta"><span class="pill">${c.messages.length} messages</span></div></div>`).join(''); };
  const chatShow = () => {
    const c = DATA.chats.find((x) => x.key === chatSel); let lastDay = '';
    $('#chat-read').innerHTML = `<h2>${esc(c.topic)}</h2><div class="small muted">${esc(c.members.join(', '))}</div>` + c.messages.map((m) => {
      const day = dt(m.when, { weekday: 'long', day: 'numeric', month: 'long' }); const sep = day !== lastDay ? `<div class="day">${esc(day)}</div>` : ''; lastDay = day;
      return `${sep}<div class="b${m.from === 'carlos' ? ' me' : ''}"><div class="w">${esc(m.who)} · ${esc(dt(m.when, { hour: '2-digit', minute: '2-digit' }))}</div><div class="t">${esc(m.text)}</div></div>`;
    }).join('');
  };
  $('#chat-list').addEventListener('click', (e) => { const it = e.target.closest('.item'); if (!it) return; chatSel = it.dataset.k; chatList(); chatShow(); });
  if (chatSel) { chatList(); chatShow(); }

  // Files
  let fileSel = DATA.files[0]?.key;
  const fileList = () => { $('#file-list').innerHTML = DATA.files.map((f) => `<div class="item${f.key === fileSel ? ' sel' : ''}" data-k="${f.key}"><div class="from">${esc(f.name)}</div><div class="small muted">Owner: ${esc(f.owner)}</div><div class="meta"><span class="pill">${esc(f.kind)}</span><span class="pill act">Tags: ${esc(f.tags)}</span></div></div>`).join(''); };
  const fileShow = () => {
    const f = DATA.files.find((x) => x.key === fileSel);
    $('#file-read').innerHTML = `<h2>${esc(f.name)}</h2><div class="hdr">Owner <b>${esc(f.owner)}</b> (OneDrive) · shared with ${esc(f.sharedWith.join(', '))}<br>Tags: <span class="mono">${esc(f.tags)}</span>${f.title ? ` · Title: ${esc(f.title)}` : ''}</div>` +
      (f.blocks ? `<div class="docx">${renderBlocks(f.blocks)}</div>` : '') + (f.sheets ? renderSheets(f.sheets) : '');
  };
  $('#file-list').addEventListener('click', (e) => { const it = e.target.closest('.item'); if (!it) return; fileSel = it.dataset.k; fileList(); fileShow(); });
  if (fileSel) { fileList(); fileShow(); }

  // Calendar
  $('#cal').innerHTML = [...DATA.events].sort((a, b) => a.s.localeCompare(b.s)).map((e) => `<tr><td class="small">${esc(dt(e.s, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }))} to ${esc(dt(e.e, { hour: '2-digit', minute: '2-digit' }))}</td>
    <td><b>${esc(e.subject)}</b>${e.showAs ? ` <span class="pill">${esc(e.showAs)}</span>` : ''}<div class="small muted">${esc(e.location || '')}</div></td><td>${esc(e.organizer)}</td>
    <td class="small">${esc(e.attendees.join(', '))}${e.optional.length ? `<br><span class="muted">Optional: ${esc(e.optional.join(', '))}</span>` : ''}</td><td class="small" style="white-space:pre-wrap">${esc(e.body)}</td></tr>`).join('');

  // Checks
  const g = S.groups;
  $('#checks').innerHTML = [
    ['Carlos\'s inbox', `${S.emails} new unread emails in the 24 hours before 07:30, on top of the count recorded before the run`],
    ['Group totals', `act ${g.act} · week ${g.week} · fyi ${g.fyi} · noise ${g.noise} · suspicious ${g.suspicious}`],
    ['Both sides', 'Every colleague email is in the sender\'s Sent Items and in each internal recipient\'s Inbox, with the same message ID'],
    ['Not drafts', 'No seeded email shows as a draft; sender, time and unread state are right; attachments open'],
    ['Tags', 'Every seeded email has DemoStory=Triage; every chat name starts with [Triage]; every file has Tags "Triage; FICTIONAL DEMO DATA"'],
    ['Teams', 'Every [Triage] chat is visible to all members, with the right authors and times, and no migration banner'],
    ['Copilot finds it (first time tested)', 'As Carlos: "What did Lydia say about the Johor data for the uptime file?" finds T1. As Adelia: "What did I ask Carlos for today?" finds A1'],
    ['Files', 'Each file is in its owner\'s OneDrive, in Carlos\'s "Shared with me", and opens in Copilot'],
    ['Access lowered', 'After the run, sending mail is refused and reading Carlos\'s Inbox still works'],
  ].map(([a, b]) => `<tr><td><b>${esc(a)}</b></td><td>${esc(b)}</td></tr>`).join('');
})();
