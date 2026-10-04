import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { GROUP, ARMS, PEOPLE, EXTERNAL, COMPANY_FREE, ALL_ENTITIES, entity, person } from '../canon/zava.mjs';

const scenarioIds = readdirSync(new URL('../content/scenarios/', import.meta.url)).filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));

test('zava canon: one name, one person', () => {
  const names = PEOPLE.map((p) => p.name);
  assert.equal(new Set(names).size, names.length, 'duplicate person');
  for (const p of PEOPLE) assert.ok(entity(p.entity), p.name);
  assert.throws(() => person('Nadia Rahman'));
});

test('zava canon: entities are unique, Zava-named and correctly parented', () => {
  const keys = ALL_ENTITIES.map((e) => e.key);
  assert.equal(new Set(keys).size, keys.length);
  for (const a of Object.values(ARMS)) for (const e of a.entities) {
    assert.match(e.legal, /Zava/);
    assert.ok(GROUP.subHoldings.some((s) => s.key === e.parent), e.legal);
  }
});

test('zava canon: outside parties are never Zava', () => {
  const ext = Object.values(EXTERNAL).flatMap((x) => x.names ?? [x.name]);
  for (const n of ext) assert.doesNotMatch(n, /Zava/);
  for (const x of Object.values(EXTERNAL)) if (x.domain) assert.match(x.domain, /\.example$/);
});

test('zava canon: every scenario has a home', () => {
  const mapped = new Set([...Object.values(ARMS).flatMap((a) => a.scenarios), ...COMPANY_FREE]);
  for (const id of scenarioIds) assert.ok(mapped.has(id), `${id} is not mapped to a Zava arm or COMPANY_FREE`);
});
