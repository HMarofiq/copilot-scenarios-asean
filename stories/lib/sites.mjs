// SharePoint team sites for story episodes (episodes/<ep>/sites.mjs exports SITES).
// A team site is a Microsoft 365 group with a site, so it can be private (members only) or public.
// Files join a site with `site: '<key>'`, optional `library` (default Documents) and `folder` in files.mjs;
// `owner` is then the author the file should show, and `modifiedAt: {d, t}` backdates it.
//
// SITES = [{ key, name: '[Tag] Site name', description?, visibility: 'private' | 'public', owner, members: [cast keys],
//            libraries?: ['Contracts'] }]
import { at as atUtc } from './dates.mjs';

export const VISIBILITY = ['private', 'public'];
export const LIMITS = { members: 20, libraries: 5, name: 256, folderDepth: 5 };
const BAD_PATH = /[\\:*?"<>|#%]|^\/|\/$|\/\/|^\s|\s$|\.$/;
const BAD_LIBRARY = /[~#%&*{}+/\\:<>?|'"]/;
const REF = '2026-11-04';

export const siteAlias = (tag, key) => `${tag}-${key}`.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60);

export function checkSites({ episode, sites = [], cast = {}, files = [] }) {
  const problems = [];
  const p = (m) => problems.push(m);
  const keys = new Set();
  const aliases = new Set();
  const isInternal = (k) => cast[k] && !cast[k].external;
  const demoAt = episode?.demoAt ? new Date(atUtc(episode.demoAt, new Date(REF))) : null;

  for (const s of sites) {
    const id = s.key ?? s.name ?? '(no key)';
    if (!s.key) p(`${id}: missing key`);
    else if (keys.has(s.key)) p(`${id}: duplicate site key`);
    keys.add(s.key);
    const alias = siteAlias(episode?.tag ?? '', s.key ?? '');
    if (aliases.has(alias)) p(`${id}: web address "${alias}" repeats another site`);
    aliases.add(alias);
    if (episode?.tag && !s.name?.startsWith(`[${episode.tag}] `)) p(`${id}: site name must start with "[${episode.tag}] "`);
    if (!s.name || s.name.length > LIMITS.name) p(`${id}: name missing or longer than ${LIMITS.name} characters`);
    if (!VISIBILITY.includes(s.visibility)) p(`${id}: visibility must be one of ${VISIBILITY.join(', ')}`);
    if (!isInternal(s.owner)) p(`${id}: owner "${s.owner}" is not an internal cast member`);
    const members = new Set(s.members ?? []);
    if (!members.has(s.owner)) p(`${id}: owner must also be listed in members`);
    if (members.size < 2 || members.size > LIMITS.members) p(`${id}: needs 2 to ${LIMITS.members} members, has ${members.size}`);
    for (const m of members) if (!isInternal(m)) p(`${id}: member "${m}" is not an internal cast member`);
    const libs = new Set(['Documents']);
    for (const l of s.libraries ?? []) {
      if (!l || BAD_LIBRARY.test(l) || l.length > 50) p(`${id}: library "${l}" is empty, too long or has characters SharePoint rejects`);
      if (libs.has(l)) p(`${id}: library "${l}" repeats or is the default Documents library`);
      libs.add(l);
    }
    if ((s.libraries?.length ?? 0) > LIMITS.libraries) p(`${id}: more than ${LIMITS.libraries} extra libraries`);

    for (const f of files.filter((x) => x.site === s.key)) {
      const fid = `${id}/${f.key ?? f.name}`;
      if (!members.has(f.owner)) p(`${fid}: author "${f.owner}" is not a site member`);
      if (!libs.has(f.library ?? 'Documents')) p(`${fid}: library "${f.library}" is not defined on the site`);
      if (f.folder && (BAD_PATH.test(f.folder) || f.folder.split('/').length > LIMITS.folderDepth)) p(`${fid}: folder "${f.folder}" is invalid or deeper than ${LIMITS.folderDepth} levels`);
      if (f.sharedWith?.length) p(`${fid}: sharedWith is for OneDrive files; site members already have access`);
      if (f.modifiedAt) {
        if (!f.modifiedAt.t) p(`${fid}: modifiedAt needs a time`);
        else if (demoAt && new Date(atUtc(f.modifiedAt, new Date(REF))) >= demoAt) p(`${fid}: modifiedAt is not before the demo time`);
      }
    }
  }
  for (const f of files) if (f.site && !keys.has(f.site)) p(`${f.key ?? f.name}: site "${f.site}" is not in sites.mjs`);
  return problems;
}

// deps: { upn(key), tag }
export function compileSites(sites, { upn, tag }) {
  return sites.map((s) => ({ op: 'site', key: `site:${s.key}`, displayName: s.name, alias: siteAlias(tag, s.key), description: s.description ?? '',
    visibility: s.visibility, owner: upn(s.owner), members: s.members.map(upn), libraries: s.libraries ?? [] }));
}
