const ICONS = new Map([
  ['outlook', 'mail'],
  ['teams', 'people_team'],
  ['word', 'document_text'],
  ['excel', 'table'],
  ['powerpoint', 'slide_text'],
  ['copilot-chat', 'chat_sparkle'],
  ['agent', 'bot'],
  ['cowork', 'arrow_sync'],
  ['scout', 'compass_northwest'],
]);

export function toolIconUrl(base, tool) {
  return `${base}approved/icons/${ICONS.get(tool) || 'document_text'}.svg`;
}
