import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { checkTeams, compileTeams } from '../stories/lib/channels.mjs';
import { at } from '../stories/lib/dates.mjs';

const root = path.resolve('stories');
const load = async (p) => (fs.existsSync(p) ? import(pathToFileURL(p).href) : {});

for (const world of fs.readdirSync(root)) {
  const dir = path.join(root, world, 'episodes');
  if (world === 'lib' || !fs.existsSync(dir)) continue;
  for (const ep of fs.readdirSync(dir)) {
    if (!fs.existsSync(path.join(dir, ep, 'channels.mjs'))) continue;
    test(`story channels: ${world}/${ep} teams are valid`, async () => {
      const { EPISODE } = await load(path.join(dir, ep, 'spec.mjs'));
      const { TEAMS = [] } = await load(path.join(dir, ep, 'channels.mjs'));
      const { FILES = [] } = await load(path.join(dir, ep, 'files.mjs'));
      const { CAST } = await load(path.join(root, world, 'cast.mjs'));
      const problems = checkTeams({ episode: EPISODE, teams: TEAMS, cast: CAST, files: FILES });
      assert.deepEqual(problems, [], problems.join('\n'));
    });
  }
}

const cast = { a: { name: 'Ann A' }, b: { name: 'Bo B' }, c: { name: 'Cy C' }, x: { external: true } };
const good = () => ({ key: 't', name: '[T] Ops', owner: 'a', members: ['a', 'b'], channels: [
  { name: 'General', posts: [{ id: 'g1', from: 'a', at: { d: -2, t: '09:00' }, text: 'Hello {@b}, see {file:f1}.', reactions: [{ by: 'b', type: 'like' }],
    replies: [{ id: 'g2', from: 'b', at: { d: -2, t: '09:00' }, text: 'Thanks' }] }] },
  { name: 'War room', posts: [{ id: 'w1', from: 'b', at: { d: -1, t: '10:00' }, text: 'Update' }] }] });
const ctx = { episode: { tag: 'T', demoAt: { d: 0, t: '08:00' } }, cast, files: [{ key: 'f1', name: 'Plan.xlsx' }] };

test('story channels: the checker accepts a good team and flags every kind of mistake', () => {
  assert.deepEqual(checkTeams({ ...ctx, teams: [good()] }), []);
  const t = good();
  t.name = 'Ops'; t.owner = 'x'; t.members = ['b'];
  t.channels[0].name = 'Main'; t.channels[1].name = 'bad/name';
  t.channels[0].posts[0].from = 'c';
  t.channels[0].posts[0].text = 'Meet on 12 November {@zz} {file:nope}';
  t.channels[0].posts[0].reactions = [{ by: 'b', type: 'thumbs' }];
  t.channels[1].posts[0].at = { d: 0, t: '09:00' };
  t.channels[1].posts.push({ id: 'w2', from: 'b', at: { d: -3, t: '09:00' }, text: ' ' });
  const bad = checkTeams({ ...ctx, teams: [t] }).join('\n');
  for (const re of [/must start with "\[T\] "/, /owner "x" is not an internal/, /needs 2 to 30 members/, /first channel must be General/, /channel name is empty/,
    /author "c" is not a team member/, /hard-coded date/, /mention @zz/, /file link file:nope/, /reaction "thumbs"/, /not before the demo time/, /earlier than the post before/, /empty text/]) assert.match(bad, re);
  const dup = good(); dup.channels[1].posts[0].id = 'g1';
  assert.match(checkTeams({ ...ctx, teams: [dup] }).join('\n'), /duplicate id/);
});

test('story channels: compile gives rising unique times, mentions, file placeholders and reactions', () => {
  const d0 = new Date('2026-11-06');
  const [op] = compileTeams([good()], { upn: (k) => `${k}@t.example`, name: (k) => cast[k].name, T: (a) => at(a, d0), files: ctx.files });
  assert.equal(op.op, 'team');
  assert.equal(op.owner, 'a@t.example');
  assert.deepEqual(op.channels.map((c) => c.name), ['General', 'War room']);
  const [root, reply] = op.channels[0].items;
  assert.equal(reply.parentKey, root.key);
  assert.ok(new Date(reply.createdUtc) > new Date(root.createdUtc), 'same-minute reply is pushed later');
  assert.match(root.html, /<at id="0">Bo B<\/at>/);
  assert.equal(root.mentions[0].user, 'b@t.example');
  assert.match(root.html, /<a href="@@file:f1@@">Plan\.xlsx<\/a>/);
  assert.equal(root.reactions[0].type, 'like');
  assert.ok(new Date(op.channels[0].conversationCreatedUtc) < new Date(root.createdUtc));
});
