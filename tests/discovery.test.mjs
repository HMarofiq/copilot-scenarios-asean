import test from 'node:test';
import assert from 'node:assert/strict';
import { FACET_KEYS, readState, writeState, rankScenario, matchesFilters, GUIDE_ENABLED, guideView } from '../src/lib/discovery.mjs';

const choices = Object.fromEntries(FACET_KEYS.map(key => [key, []]));
Object.assign(choices, { department: ['finance', 'it'], surface: ['excel', 'teams'], persona: ['people-manager'], licence: ['m365-copilot'] });
const scenario = { ...Object.fromEntries(FACET_KEYS.map(key => [key, []])), department: ['finance'], surface: ['excel'], persona: ['people-manager'], licence: ['m365-copilot'] };

test('fresh visitors land on the two-route homepage; legacy facet links still browse', () => {
  assert.equal(readState('', choices).view, 'home');
  assert.equal(readState('?department=finance', choices).view, 'all');
  assert.equal(readState('?q=budget', choices).view, 'all');
  assert.equal(readState('?scoutTheme=dark', choices).view, 'home');
});
test('guided answers, search and filters survive a URL round trip', () => {
  const state = readState('?view=recommended&role=manager&departments=finance&tools=excel,teams&licence=m365-copilot&q=budget&more=1', choices);
  assert.deepEqual(readState(writeState(state), choices), state);
});
test('returning home with retained filters remains home after refresh', () => {
  const state = readState('?department=finance&q=budget', choices);
  state.view = 'home';
  assert.equal(readState(writeState(state), choices).view, 'home');
});
test('unknown or duplicate input is normalized without selectors or markup interpolation', () => {
  const state = readState('?view=guide&step=99&role=invalid&departments=finance,finance,invalid&surface=%22%5D', choices);
  assert.equal(state.step, 1);
  assert.equal(state.role, '');
  assert.deepEqual(state.departments, ['finance']);
  assert.deepEqual(state.filters.surface, []);
});
test('recommendations are weighted matches, not tool or licence exclusions', () => {
  const state = readState('?role=manager&departments=finance&tools=teams', choices);
  const result = rankScenario(scenario, state);
  assert.equal(result.score, 9);
  assert.deepEqual(result.departments, ['finance']);
  assert.deepEqual(result.tools, []);
  assert.equal(result.roleMatch, true);
});
test('unanswered or unmatched personas do not invent a match', () => {
  assert.equal(rankScenario(scenario, readState('', choices)).score, 0);
  assert.equal(rankScenario(scenario, readState('?role=it&tools=teams', choices)).score, 0);
});
test('explicit filters use OR within facets and AND between facets', () => {
  const state = readState('?department=finance,it&surface=teams', choices);
  assert.equal(matchesFilters(scenario, state.filters), false);
  assert.equal(matchesFilters(scenario, state.filters, 'surface'), true);
  state.filters.surface = ['excel', 'teams'];
  assert.equal(matchesFilters(scenario, state.filters), true);
});

test('guided discovery links fall back to the full library while the guide is switched off', () => {
  if (GUIDE_ENABLED) return;
  assert.equal(guideView('guide'), 'all');
  assert.equal(guideView('recommended'), 'all');
  assert.equal(guideView('home'), 'home');
  assert.equal(guideView('all'), 'all');
});
