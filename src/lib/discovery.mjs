export const ROLES = [
  { id: 'individual', title: 'Individual contributor', description: 'Research, analyse, write and deliver work.', personas: ['knowledge-worker', 'compliance-officer', 'credit-analyst', 'relationship-manager', 'claims-handler', 'internal-auditor', 'procurement-officer', 'legal-counsel', 'policy-analyst', 'hse-officer', 'maintenance-planner', 'esg-analyst', 'hr-business-partner'] },
  { id: 'manager', title: 'Team manager', description: 'Coordinate people, priorities and delivery.', personas: ['people-manager', 'branch-ops-manager', 'risk-manager', 'site-manager', 'plant-manager', 'commercial-lead'] },
  { id: 'leader', title: 'Business leader', description: 'Make decisions and see the bigger picture.', personas: ['corporate-secretary', 'strategy-office', 'commercial-lead', 'plant-manager'] },
  { id: 'frontline', title: 'Frontline or site employee', description: 'Keep day-to-day operations moving.', personas: ['site-manager', 'hse-officer', 'maintenance-planner', 'branch-ops-manager', 'claims-handler'] },
  { id: 'it', title: 'IT or adoption specialist', description: 'Help others use tools and work effectively.', personas: [] },
];

export const FACET_KEYS = ['industry', 'department', 'persona', 'difficulty', 'surface', 'licence', 'market', 'evidence'];

export function readState(search, choices) {
  const params = new URLSearchParams(search);
  const pick = (key, allowed) => [...new Set((params.get(key) || '').split(',').filter(v => allowed.includes(v)))];
  const filters = Object.fromEntries(FACET_KEYS.map(key => [key, pick(key, choices[key] || [])]));
  const hasFilters = params.has('q') || FACET_KEYS.some(key => params.has(key));
  const requestedView = params.get('view');
  const view = ['home', 'guide', 'recommended', 'all'].includes(requestedView) ? requestedView : hasFilters ? 'all' : 'home';
  const rawStep = Number(params.get('step') || 1);
  return {
    view, step: [1, 2, 3].includes(rawStep) ? rawStep : 1,
    role: ROLES.some(role => role.id === params.get('role')) ? params.get('role') : '',
    departments: pick('departments', choices.department || []),
    tools: pick('tools', choices.surface || []),
    filters, query: params.get('q') || '', expanded: params.get('more') === '1',
  };
}

export function writeState(state) {
  const params = new URLSearchParams();
  if (state.view !== 'home' || state.query || FACET_KEYS.some(key => state.filters[key]?.length)) params.set('view', state.view);
  if (state.view === 'guide') params.set('step', String(state.step));
  if (state.role) params.set('role', state.role);
  if (state.departments.length) params.set('departments', state.departments.join(','));
  if (state.tools.length) params.set('tools', state.tools.join(','));
  if (state.expanded) params.set('more', '1');
  for (const key of FACET_KEYS) {
    if (state.filters[key]?.length) params.set(key, state.filters[key].join(','));
  }
  if (state.query) params.set('q', state.query);
  return params.toString();
}

export function rankScenario(scenario, state) {
  const role = ROLES.find(role => role.id === state.role);
  const departments = scenario.department.filter(value => state.departments.includes(value));
  const tools = scenario.surface.filter(value => state.tools.includes(value));
  const roleMatch = Boolean(role && (scenario.persona.some(value => role.personas.includes(value)) || (role.id === 'it' && scenario.department.includes('it'))));
  // Multiple selected tools should not outweigh a match to the visitor's work.
  return { score: (departments.length ? 6 : 0) + (roleMatch ? 3 : 0) + (tools.length ? 2 : 0), departments, tools, roleMatch };
}

export function matchesFilters(scenario, filters, skip) {
  return FACET_KEYS.every(key => key === skip || !filters[key]?.length || filters[key].some(value => scenario[key].includes(value)));
}
