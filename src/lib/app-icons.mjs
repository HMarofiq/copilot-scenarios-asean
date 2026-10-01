const APPS = new Map([
  ['word', 'word'],
  ['excel', 'excel'],
  ['powerpoint', 'powerpoint'],
  ['outlook', 'outlook'],
  ['teams', 'teams'],
  ['copilot-chat', 'copilot'],
  // Cowork runs inside the Copilot app, so it uses that app's icon.
  ['cowork', 'copilot'],
]);

export function appIconUrl(base, surface) {
  const app = APPS.get(surface);
  return app ? `${base}approved/app-icons/${app}.svg` : null;
}
