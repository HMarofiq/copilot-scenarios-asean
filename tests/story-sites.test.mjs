import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { checkSites, compileSites, siteAlias } from '../stories/lib/sites.mjs';

const root = path.resolve('stories');
const load = async (p) => (fs.existsSync(p) ? import(pathToFileURL(p).href) : {});

for (const world of fs.readdirSync(root)) {
  const dir = path.join(root, world, 'episodes');
  if (world === 'lib' || !fs.existsSync(dir)) continue;
  for (const ep of fs.readdirSync(dir)) {
    if (!fs.existsSync(path.join(dir, ep, 'sites.mjs'))) continue;
    test(`story sites: ${world}/${ep} sites and their files are valid`, async () => {
      const { EPISODE } = await load(path.join(dir, ep, 'spec.mjs'));
      const { SITES = [] } = await load(path.join(dir, ep, 'sites.mjs'));
      const { FILES = [] } = await load(path.join(dir, ep, 'files.mjs'));
      const { CAST } = await load(path.join(root, world, 'cast.mjs'));
      const problems = checkSites({ episode: EPISODE, sites: SITES, cast: CAST, files: FILES });
      assert.deepEqual(problems, [], problems.join('\n'));
    });
  }
}

const cast = { a: {}, b: {}, c: {}, x: { external: true } };
const site = () => ({ key: 'repo', name: '[T] Contract Repository', visibility: 'private', owner: 'a', members: ['a', 'b'], libraries: ['Contracts'] });
const file = (o = {}) => ({ key: 'f1', name: 'MSA.docx', kind: 'docx', owner: 'b', site: 'repo', library: 'Contracts', folder: '2026/Vendors', modifiedAt: { d: -5, t: '10:00' }, ...o });
const ctx = { episode: { tag: 'T', demoAt: { d: 0, t: '08:00' } }, cast };

test('story sites: the checker accepts a good site and flags every kind of mistake', () => {
  assert.deepEqual(checkSites({ ...ctx, sites: [site()], files: [file()] }), []);
  const s = site();
  s.name = 'Repo'; s.visibility = 'secret'; s.owner = 'x'; s.members = ['b']; s.libraries = ['Documents', 'bad/name'];
  const bad = checkSites({ ...ctx, sites: [s], files: [file({ owner: 'c', library: 'Nope', folder: 'a:b', sharedWith: ['a'], modifiedAt: { d: 0, t: '09:00' } }), file({ key: 'f2', site: 'ghost' })] }).join('\n');
  for (const re of [/must start with "\[T\] "/, /visibility must be one of/, /owner "x" is not an internal/, /needs 2 to 20 members/, /repeats or is the default/, /library "bad\/name"/,
    /author "c" is not a site member/, /library "Nope" is not defined/, /folder "a:b" is invalid/, /sharedWith is for OneDrive/, /modifiedAt is not before the demo time/, /site "ghost" is not in sites.mjs/]) assert.match(bad, re);
  assert.match(checkSites({ ...ctx, sites: [site(), site()], files: [] }).join('\n'), /duplicate site key/);
});

test('story sites: compile gives a web address from the tag and key, and the members as logins', () => {
  assert.equal(siteAlias('Pilot', 'Contract_Repo 1'), 'pilot-contractrepo1');
  const [op] = compileSites([site()], { upn: (k) => `${k}@t.example`, tag: 'T' });
  assert.deepEqual(op, { op: 'site', key: 'site:repo', displayName: '[T] Contract Repository', alias: 't-repo', description: '', visibility: 'private',
    owner: 'a@t.example', members: ['a@t.example', 'b@t.example'], libraries: ['Contracts'] });
});
