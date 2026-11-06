// Teams and channel posts for story episodes (episodes/<ep>/channels.mjs exports TEAMS).
// checkTeams() validates the story, compileTeams() turns it into one 'team' op per team for the seeder runner.
//
// TEAMS = [{ key, name: '[Tag] Team name', description?, owner, members: [cast keys], channels: [{ name, description?, posts: [
//   { id, from, at: {d, t}, text, reactions?: [{ by, type, at? }], replies?: [{ id, from, at, text, reactions? }] } ] }] }]
// The first channel must be General. In text: {@castKey} mentions a member, {file:key} links to a seeded OneDrive file.
import { assertNoHardDates, at as atUtc } from './dates.mjs';

export const REACTIONS = ['like', 'heart', 'laugh', 'surprised', 'sad', 'angry'];
const BAD_CHANNEL_NAME = /[~#%&*{}+/\\:<>?|'"]/;
const TOKEN = /\{(@[a-z0-9_]+|file:[a-z0-9_-]+)\}/gi;
export const LIMITS = { members: 30, channels: 10, text: 4000, replies: 40, channelName: 50 };
const REF = '2026-11-04'; // a Wednesday: only the order of times matters for the checks

const flat = (team) => team.channels.flatMap((c) => c.posts.flatMap((p) => [{ ...p, root: true, channel: c.name }, ...(p.replies ?? []).map((r) => ({ ...r, root: false, parent: p, channel: c.name }))]));

export function checkTeams({ episode, teams = [], cast = {}, files = [] }) {
  const problems = [];
  const p = (m) => problems.push(m);
  const fileKeys = new Set(files.map((f) => f.key));
  const ids = new Set();
  const teamKeys = new Set();
  const when = (a) => new Date(atUtc(a, new Date(REF)));
  const demoAt = episode?.demoAt ? when(episode.demoAt) : null;

  for (const t of teams) {
    const tid = t.key ?? t.name ?? '(no key)';
    if (!t.key) p(`${tid}: missing key`);
    else if (teamKeys.has(t.key)) p(`${tid}: duplicate team key`);
    teamKeys.add(t.key);
    if (episode?.tag && !t.name?.startsWith(`[${episode.tag}] `)) p(`${tid}: team name must start with "[${episode.tag}] "`);
    if (!t.name || t.name.length > 256) p(`${tid}: name missing or longer than 256 characters`);
    const isInternal = (k) => cast[k] && !cast[k].external;
    if (!isInternal(t.owner)) p(`${tid}: owner "${t.owner}" is not an internal cast member`);
    const members = new Set(t.members ?? []);
    if (!members.has(t.owner)) p(`${tid}: owner must also be listed in members`);
    if (members.size < 2 || members.size > LIMITS.members) p(`${tid}: needs 2 to ${LIMITS.members} members, has ${members.size}`);
    for (const m of members) if (!isInternal(m)) p(`${tid}: member "${m}" is not an internal cast member`);

    if (!t.channels?.length) { p(`${tid}: no channels`); continue; }
    if (t.channels.length > LIMITS.channels) p(`${tid}: more than ${LIMITS.channels} channels`);
    if (t.channels[0].name !== 'General') p(`${tid}: first channel must be General`);
    const names = new Set();
    for (const c of t.channels) {
      const cid = `${tid}/${c.name}`;
      if (!c.name || c.name.length > LIMITS.channelName || BAD_CHANNEL_NAME.test(c.name)) p(`${cid}: channel name is empty, longer than ${LIMITS.channelName} or has characters Teams rejects`);
      if (names.has(c.name?.toLowerCase())) p(`${cid}: duplicate channel name`);
      names.add(c.name?.toLowerCase());
      if (!c.posts?.length) p(`${cid}: no posts`);
      let last = 0;
      for (const post of c.posts ?? []) {
        const x = when(post.at ?? { d: 0, t: '00:00' }).getTime();
        if (x < last) p(`${cid}: post ${post.id} is earlier than the post before it`);
        last = x;
      }
    }
    for (const m of flat(t)) {
      const mid = `${tid}/${m.channel}/${m.id ?? '(no id)'}`;
      if (!m.id) p(`${mid}: missing id`);
      else if (ids.has(m.id)) p(`${mid}: duplicate id`);
      ids.add(m.id);
      if (!members.has(m.from)) p(`${mid}: author "${m.from}" is not a team member`);
      if (!m.at?.t) { p(`${mid}: missing time`); continue; }
      if (!m.text?.trim()) p(`${mid}: empty text`);
      else {
        if (m.text.length > LIMITS.text) p(`${mid}: text is ${m.text.length} characters (max ${LIMITS.text})`);
        try { assertNoHardDates(m.text, mid); } catch (e) { p(String(e.message)); }
        for (const [, tok] of m.text.matchAll(TOKEN)) {
          if (tok.startsWith('@') && !members.has(tok.slice(1))) p(`${mid}: mention ${tok} is not a team member`);
          if (tok.startsWith('file:') && !fileKeys.has(tok.slice(5))) p(`${mid}: file link ${tok} is not in files.mjs`);
        }
      }
      const time = when(m.at);
      if (m.parent && time < when(m.parent.at)) p(`${mid}: reply is earlier than its post`);
      if (demoAt && time >= demoAt) p(`${mid}: is not before the demo time`);
      if (m.root && (m.replies?.length ?? 0) > LIMITS.replies) p(`${mid}: more than ${LIMITS.replies} replies`);
      for (const r of m.reactions ?? []) {
        if (!members.has(r.by)) p(`${mid}: reaction by "${r.by}" who is not a team member`);
        if (!REACTIONS.includes(r.type)) p(`${mid}: reaction "${r.type}" is not one of ${REACTIONS.join(', ')}`);
      }
    }
  }
  return problems;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// deps: { upn(key), name(key), T(at) -> ISO UTC, files (the episode FILES) }
export function compileTeams(teams, { upn, name, T, files }) {
  const fileName = Object.fromEntries(files.map((f) => [f.key, f.name]));
  return teams.map((t) => {
    const channels = t.channels.map((c) => {
      const items = [];
      let prev = 0;
      const push = (m, parentKey) => {
        let ms = new Date(T(m.at)).getTime();
        if (ms <= prev) ms = prev + 1000; // createdDateTime must be unique and rising inside one channel
        prev = ms;
        const mentions = [];
        const html = esc(m.text).replace(/\n/g, '<br>').replace(TOKEN, (_, tok) => {
          if (tok.startsWith('file:')) { const k = tok.slice(5); return `<a href="@@file:${k}@@">${esc(fileName[k])}</a>`; }
          const k = tok.slice(1); mentions.push({ id: mentions.length, text: name(k), user: upn(k) });
          return `<at id="${mentions.length - 1}">${esc(name(k))}</at>`;
        });
        const reactions = (m.reactions ?? []).map((r) => ({ type: r.type, user: upn(r.by), userName: name(r.by), createdUtc: new Date(ms + 60000).toISOString() }));
        items.push({ key: `post:${m.id}`, kind: parentKey ? 'reply' : 'post', parentKey: parentKey ?? null, from: upn(m.from), fromName: name(m.from), createdUtc: new Date(ms).toISOString(), html, mentions, reactions });
      };
      for (const post of c.posts) { push(post); for (const r of post.replies ?? []) push(r, `post:${post.id}`); }
      const first = new Date(Math.min(...items.map((i) => new Date(i.createdUtc).getTime())) - 2 * 3600 * 1000);
      return { key: `channel:${t.key}:${c.name}`, name: c.name, description: c.description ?? '', conversationCreatedUtc: first.toISOString(), items };
    });
    return { op: 'team', key: `team:${t.key}`, displayName: t.name, description: t.description ?? '', owner: upn(t.owner), members: t.members.map(upn), channels };
  });
}
