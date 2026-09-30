import { ROLES, FACET_KEYS, readState as parseState, writeState, rankScenario, matchesFilters, guideView } from '../lib/discovery.mjs';
import { toolIconUrl } from '../lib/tool-icons.mjs';

const root = document.getElementById('discovery');
const base = root.dataset.base;
const choices = JSON.parse(root.dataset.choices);
const labels = JSON.parse(root.dataset.labels);
const scenarios = JSON.parse(root.dataset.scenarios);
const byId = new Map(scenarios.map(s => [s.id, s]));
const cards = [...root.querySelectorAll('.scenario-card')];
const fields = [...root.querySelectorAll('[data-facet]')];
const input = document.getElementById('q');
const searchNote = document.getElementById('search-note');
const readState = (search, opts) => { const s = parseState(search, opts); s.view = guideView(s.view); return s; };
let state = readState(location.search, choices);
let searchModule;
let searchLoading;
let searchMatches = null;
let searchTerm = '';
let searchSequence = 0;
let searchTimer;
let searchWarning = '';

const label = (facet, value) => labels[facet]?.[value] || value;
const hasPersona = () => Boolean(state.role || state.departments.length || state.tools.length);

function saveUrl(push = false) {
  const params = new URLSearchParams(writeState(state));
  const theme = new URLSearchParams(location.search).get('scoutTheme');
  if (theme) params.set('scoutTheme', theme);
  const url = `${location.pathname}${params.size ? `?${params}` : ''}`;
  if (push && url !== `${location.pathname}${location.search}`) history.pushState(null, '', url);
  else history.replaceState(history.state, '', url);
}

function navigate(view, step = state.step) {
  clearTimeout(searchTimer);
  state.view = guideView(view);
  state.step = step;
  saveUrl(true);
  render(true);
}

function addToolIcon(node, tool) {
  const icon = document.createElement('span');
  icon.className = 'tool-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.style.setProperty('--tool-icon', `url("${toolIconUrl(base, tool)}")`);
  node.classList.add('tool-label');
  node.prepend(icon);
}

function chip(text, parent, tool) {
  const node = document.createElement('span');
  node.className = 'chip';
  node.textContent = text;
  if (tool) {
    node.classList.add('tool-chip');
    addToolIcon(node, tool);
  }
  parent.append(node);
}

function renderSummary() {
  const summary = document.getElementById('persona-chips');
  summary.replaceChildren();
  const role = ROLES.find(r => r.id === state.role);
  if (role) chip(role.title, summary);
  state.departments.forEach(value => chip(label('department', value), summary));
  state.tools.forEach(value => chip(label('surface', value), summary, value));
  if (!hasPersona()) chip('Open to all possibilities', summary);
}

function render(focus = false) {
  const library = ['all', 'recommended'].includes(state.view);
  const recommended = state.view === 'recommended';
  root.querySelectorAll('[data-view]').forEach(section => {
    section.hidden = section.dataset.view !== (library ? 'library' : state.view);
  });
  root.querySelectorAll('[data-step]').forEach(field => { field.hidden = Number(field.dataset.step) !== state.step; });
  root.querySelectorAll('[data-step-marker]').forEach(marker => {
    if (Number(marker.dataset.stepMarker) === state.step) marker.setAttribute('aria-current', 'step');
    else marker.removeAttribute('aria-current');
  });
  root.querySelectorAll('input[name="role"]').forEach(control => { control.checked = control.value === state.role; });
  for (const name of ['departments', 'tools']) {
    root.querySelectorAll(`input[name="${name}"]`).forEach(control => { control.checked = state[name].includes(control.value); });
  }
  document.getElementById('step-label').textContent = `STEP ${state.step} OF 3`;
  document.getElementById('continue').textContent = state.step === 3 ? 'Find my scenarios \u2192' : 'Continue \u2192';
  document.getElementById('show-now').hidden = state.step === 3;
  document.getElementById('results-title').textContent = recommended ? 'A starting point for your work' : 'Explore all scenarios';
  document.getElementById('results-eyebrow').textContent = recommended ? 'CHOSEN AROUND YOUR WORK' : 'THE SCENARIO LIBRARY';
  document.getElementById('results-description').textContent = recommended
    ? 'Suggestions based on your choices. Familiar tools first, with room to discover something new.'
    : 'Find a practical starting point for the work in front of you.';
  document.getElementById('persona-summary').hidden = !recommended;
  document.getElementById('edit-persona').textContent = recommended ? 'Explore all scenarios' : 'Find scenarios for my persona';
  document.getElementById('sort-label').textContent = recommended ? 'Sorted by relevance' : 'Browse the library';
  document.title = `${state.view === 'guide' ? `Step ${state.step} of 3: Find your persona` : library ? recommended ? 'Your suggestions' : 'All scenarios' : 'Find your next Copilot scenario'} \u00b7 Copilot Scenario Library ASEAN`;
  renderSummary();
  fields.forEach(field => field.querySelectorAll('input').forEach(control => {
    control.checked = state.filters[field.dataset.facet].includes(control.value);
  }));
  if (FACET_KEYS.some(key => !['department', 'surface'].includes(key) && state.filters[key].length)) {
    document.querySelector('.more-filters').open = true;
  }
  input.value = state.query;
  if (library) runSearch();
  else ++searchSequence;
  if (focus) {
    const heading = state.view === 'guide' ? root.querySelector(`[data-step="${state.step}"] legend`) : library ? document.getElementById('results-title') : root.querySelector('.welcome h1');
    heading.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function textMatches(scenario) {
  const term = state.query.trim().toLowerCase();
  return !term || (searchMatches && searchTerm === term ? searchMatches.has(scenario.id) : scenario.text.includes(term));
}

function paintResults() {
  const recommended = state.view === 'recommended';
  const ranked = cards.map(card => ({ card, scenario: byId.get(card.dataset.id), rank: rankScenario(byId.get(card.dataset.id), state) }));
  if (recommended) ranked.sort((a, b) => b.rank.score - a.rank.score || a.scenario.id.localeCompare(b.scenario.id));
  const matching = ranked.filter(({ scenario }) => matchesFilters(scenario, state.filters) && textMatches(scenario));
  const visible = new Set((recommended && !state.expanded ? matching.slice(0, 3) : matching).map(item => item.scenario.id));
  const grid = document.getElementById('scenario-grid');
  const focusedElement = document.activeElement;
  const focusedCard = focusedElement?.closest('.scenario-card');
  for (const [index, { card, scenario, rank }] of ranked.entries()) {
    card.hidden = !visible.has(scenario.id);
    const reason = card.querySelector('.match-reason');
    reason.hidden = !recommended;
    const reasons = [];
    if (rank.departments.length) reasons.push(rank.departments.map(value => label('department', value)).join(', '));
    if (rank.roleMatch) reasons.push('your role');
    if (rank.tools.length) reasons.push(rank.tools.map(value => label('surface', value)).join(', '));
    reason.textContent = reasons.length ? `Matches ${reasons.join(' + ')}` : hasPersona() ? 'Broader suggestion: explore a different way to work.' : 'Explore this possibility.';
    const returnParams = new URLSearchParams({ library: writeState(state) });
    card.href = `${base}scenarios/${scenario.id}/?${returnParams}`;
    if (grid.children[index] !== card) grid.insertBefore(card, grid.children[index] || null);
  }
  if (focusedCard?.hidden) document.getElementById('result-count').focus({ preventScroll: true });
  else if (focusedCard && document.activeElement !== focusedElement) focusedElement.focus({ preventScroll: true });
  document.getElementById('result-count').textContent = recommended && !state.expanded
    ? `${visible.size} suggestions to start with \u00b7 ${matching.length} scenarios to explore`
    : `${matching.length} of ${scenarios.length} scenarios`;
  document.getElementById('empty').hidden = matching.length > 0;
  const more = document.getElementById('show-more');
  more.hidden = !recommended || state.expanded || matching.length <= 3;
  more.textContent = `See ${Math.max(0, matching.length - 3)} more suggestions`;
  if (recommended && matching.length && !matching.some(item => item.rank.score > 0)) {
    document.getElementById('results-description').textContent = hasPersona()
      ? 'No close matches to your selections yet. Here are broader possibilities to explore; you can change your answers at any time.'
      : 'No answers needed. Explore a few possibilities, or change your answers for more tailored suggestions.';
  } else if (recommended) {
    document.getElementById('results-description').textContent = 'Suggestions based on your choices. Familiar tools first, with room to discover something new.';
  }
  fields.forEach(field => field.querySelectorAll('label').forEach(option => {
    const value = option.querySelector('input').value;
    const facet = field.dataset.facet;
    const count = scenarios.filter(scenario => matchesFilters(scenario, state.filters, facet) && textMatches(scenario) && scenario[facet].includes(value)).length;
    option.querySelector('.n').textContent = count;
    option.classList.toggle('zero', count === 0);
  }));
  const active = document.getElementById('active-filters');
  active.replaceChildren();
  for (const facet of FACET_KEYS) {
    state.filters[facet].forEach(value => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = `${label(facet, value)} \u00d7`;
      if (facet === 'surface') addToolIcon(button, value);
      button.setAttribute('aria-label', `Remove ${label(facet, value)} filter`);
      button.addEventListener('click', () => {
        state.filters[facet] = state.filters[facet].filter(item => item !== value);
        saveUrl();
        render();
        input.focus({ preventScroll: true });
      });
      active.append(button);
    });
  }
}

async function loadSearch() {
  if (root.dataset.dev === 'true') {
    searchWarning = 'Preview search covers titles, summaries and outcomes. Full-text prompt search is available in the production build.';
    return null;
  }
  if (!searchLoading) {
    searchLoading = import(/* @vite-ignore */ `${base}pagefind/pagefind.js`)
      .then(async module => { await module.init(); searchModule = module; return module; })
      .catch(error => {
        console.warn('Full-text search could not load:', error);
        searchWarning = 'Full-text search is unavailable. Searching titles, summaries and outcomes instead.';
        return null;
      });
  }
  return searchModule || searchLoading;
}

async function runSearch() {
  const sequence = ++searchSequence;
  const term = state.query.trim().toLowerCase();
  if (!term) {
    searchMatches = null;
    searchTerm = '';
    searchNote.hidden = true;
    document.getElementById('scenario-grid').removeAttribute('aria-busy');
    paintResults();
    return;
  }
  if (searchTerm === term && searchMatches) {
    searchNote.textContent = searchWarning;
    searchNote.hidden = !searchWarning;
    document.getElementById('scenario-grid').removeAttribute('aria-busy');
    paintResults();
    return;
  }
  searchNote.hidden = false;
  searchNote.textContent = 'Searching the library...';
  document.getElementById('scenario-grid').setAttribute('aria-busy', 'true');
  paintResults();
  try {
    const module = await loadSearch();
    if (sequence !== searchSequence) return;
    if (module) {
      const result = await module.search(term);
      const results = await Promise.all(result.results.map(hit => hit.data()));
      if (sequence !== searchSequence) return;
      searchMatches = new Set(results.map(hit => hit.url.match(/\/scenarios\/([^/]+)\//)?.[1]).filter(Boolean));
    } else searchMatches = null;
    searchTerm = term;
  } catch (error) {
    if (sequence !== searchSequence) return;
    console.warn('Full-text search failed:', error);
    searchMatches = null;
    searchWarning = 'Full-text search is unavailable. Searching titles, summaries and outcomes instead.';
  } finally {
    if (sequence === searchSequence) {
      document.getElementById('scenario-grid').removeAttribute('aria-busy');
      searchNote.textContent = searchWarning;
      searchNote.hidden = !searchWarning;
      paintResults();
    }
  }
}

function captureAnswers() {
  state.role = root.querySelector('input[name="role"]:checked')?.value || '';
  for (const name of ['departments', 'tools']) {
    state[name] = [...root.querySelectorAll(`input[name="${name}"]:checked`)].map(control => control.value);
  }
  state.expanded = false;
}

function recommend() {
  captureAnswers();
  state.filters = Object.fromEntries(FACET_KEYS.map(key => [key, []]));
  state.query = '';
  navigate('recommended');
}

root.querySelectorAll('[data-route]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  navigate(link.dataset.route, 1);
}));
document.getElementById('guide-form').addEventListener('change', () => { captureAnswers(); saveUrl(); });
document.getElementById('guide-form').addEventListener('submit', event => {
  event.preventDefault();
  captureAnswers();
  if (state.step < 3) navigate('guide', state.step + 1);
  else recommend();
});
document.getElementById('guide-back').addEventListener('click', () => navigate(state.step > 1 ? 'guide' : 'home', Math.max(1, state.step - 1)));
document.getElementById('skip-question').addEventListener('click', () => {
  const name = ['role', 'departments', 'tools'][state.step - 1];
  root.querySelectorAll(`input[name="${name}"]`).forEach(control => { control.checked = false; });
  captureAnswers();
  saveUrl();
  if (state.step < 3) navigate('guide', state.step + 1);
  else recommend();
});
document.getElementById('show-now').addEventListener('click', recommend);
document.getElementById('change-answers').addEventListener('click', () => navigate('guide', 1));
document.getElementById('edit-persona').addEventListener('click', () => navigate(state.view === 'recommended' ? 'all' : 'guide', 1));
document.getElementById('show-more').addEventListener('click', () => {
  state.expanded = true;
  saveUrl();
  paintResults();
  const next = [...document.querySelectorAll('.scenario-card:not([hidden])')][3];
  next?.focus({ preventScroll: true });
});
fields.forEach(field => field.addEventListener('change', () => {
  state.filters[field.dataset.facet] = [...field.querySelectorAll('input:checked')].map(control => control.value);
  saveUrl();
  paintResults();
}));
input.addEventListener('input', () => {
  state.query = input.value;
  ++searchSequence;
  saveUrl();
  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, 150);
});
input.addEventListener('focus', loadSearch, { once: true });
function clearFilters() {
  state.filters = Object.fromEntries(FACET_KEYS.map(key => [key, []]));
  state.query = '';
  saveUrl();
  render();
}
document.getElementById('clear').addEventListener('click', clearFilters);
document.getElementById('empty-clear').addEventListener('click', clearFilters);
window.addEventListener('popstate', () => {
  clearTimeout(searchTimer);
  state = readState(location.search, choices);
  render(true);
});
if (window.matchMedia('(max-width: 640px)').matches) document.querySelector('.filter-disclosure').open = false;
render();
