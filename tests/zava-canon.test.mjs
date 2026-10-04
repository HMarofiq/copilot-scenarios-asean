import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
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

// Scenarios already moved to Zava. Add an id here when its migration lands.
const MIGRATED = ['enr-hse-incident-005', 'enr-permit-watch-006', 'enr-induction-007', 'enr-maint-backlog-009', 'x-report-deck-017'];
// Old fictional names that used to be the scenario's own company (outside-party uses of Fabrikam, Northwind etc. stay legal).
const OLD_OWN = /Contoso|Northwind (Nickel|Smelter|Resources|Estate|Mill|Jetty|Bulking)|northwind\.example|PT Relecloud (Nusantara|Seluler)|Relecloud Malaysia|PT Fabrikam (Logistik Tbk|Nusantara)/;
const textOf = (id) => {
  const parts = [];
  const page = new URL(`../content/scenarios/${id}.md`, import.meta.url);
  if (existsSync(page)) parts.push(readFileSync(page, 'utf8'));
  const dir = new URL(`../kits/${id}/`, import.meta.url);
  if (existsSync(dir)) for (const f of readdirSync(dir).filter((x) => x.endsWith('.mjs'))) parts.push(readFileSync(new URL(f, dir), 'utf8'));
  return parts.join('\n');
};

test('zava canon: migrated scenarios no longer use their old company names', () => {
  for (const id of MIGRATED.filter((x) => scenarioIds.includes(x))) assert.doesNotMatch(textOf(id), OLD_OWN, id);
});

test('zava canon: a canon person appears only in the scenarios listed for them', () => {
  for (const id of MIGRATED.filter((x) => scenarioIds.includes(x))) {
    const t = textOf(id);
    for (const p of PEOPLE) if (t.includes(p.name)) assert.ok(p.scenarios?.includes(id), `${p.name} appears in ${id} but the canon does not list it`);
  }
});
