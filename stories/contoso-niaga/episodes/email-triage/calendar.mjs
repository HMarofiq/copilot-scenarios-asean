export const EVENTS = [
  {
    key: 'weekly-coordination', organizer: 'adelia', subject: 'Weekly coordination - Technology operations and Direksi prep', attendees: ['carlos', 'lydia', 'kian', 'indra'], optional: [],
    start: { d: 0, t: '11:00' }, end: { d: 0, t: '11:45' }, location: 'Teams', online: true, categories: ['Triage'],
    body: `Agenda: weekly coordination moved from 13.00 to 11.00 because Adelia has the Direksi operations update at 14.00. Each person gets a 3-minute update: Carlos on overall Technology priorities and Proyek Nusa go/no-go readiness, Lydia on September uptime and P1 corrective actions, Kian on cutover resource readiness, and Indra on any security concerns from the incident review. Output needed: confirm which numbers are safe for the noon board-pack deadline and identify any blocker that needs escalation before 12.00.`
  },
  {
    key: 'direksi-meeting', organizer: 'adelia', subject: 'Direksi meeting - operations update', attendees: ['andre', 'mona', 'cecil'], optional: [],
    start: { d: 0, t: '14:00' }, end: { d: 0, t: '16:00' }, location: 'Menara Contoso - Boardroom', online: true, categories: ['Triage'],
    body: `Operations update for Direksi. Adelia will cover September service reliability, the Portal Mitra P1 incident and customer fallout, Proyek Nusa readiness, Q4 commercial priorities, and communications risks. Carlos is not an attendee; his input is expected in the pre-read by 12.00, with one page of summary and one backup table. Mona should be ready to address Wingtip sentiment and QBR plans. Andre will cover Q4 re-forecast timing and financial exposure.`
  },
  {
    key: 'erp-cutover', organizer: 'kian', subject: 'Proyek Nusa ERP cutover execution window', attendees: ['lydia', 'serena'], optional: ['carlos'],
    start: { w: 3, t: '08:00' }, end: { w: 3, t: '17:00' }, location: 'Teams bridge / Cutover room', online: true, showAs: 'tentative', categories: ['Triage'],
    body: `Execution window placeholder for Proyek Nusa cutover activities. The detailed runbook starts earlier with freeze and backup tasks, but this calendar block marks the core Saturday working window for migration, connector validation, regression testing, and reconciliation. Lydia owns infrastructure readiness, Serena owns Portal Mitra regression, and Kian coordinates workstream owners and Proseware contractors. Carlos is optional but should join for decision checkpoints if rollback, partner-impact, or resource escalation is required.`
  },
  {
    key: 'go-nogo-call', organizer: 'kian', subject: 'Go/no-go call - Proyek Nusa cutover', attendees: ['carlos', 'lydia', 'serena'], optional: [],
    start: { w: 2, t: '16:00' }, end: { w: 2, t: '16:45' }, location: 'Teams', online: true, categories: ['Triage'],
    body: `Decision call for Proyek Nusa weekend cutover. Agenda: confirm mock cutover 2 results, review 7 defects and remaining mitigations, validate regression results, confirm backup and restore approach, and decide whether resource coverage is sufficient. Go/no-go criteria: regression Portal Mitra clear for tax-code and inactive-partner cases, backup final and restore sample ready, and Saturday coverage confirmed including 9 internal staff overtime plus 12 Proseware contractors. Decision owner: Carlos; recommendation owner: Kian.`
  },
  {
    key: 'pir-meeting', organizer: 'lydia', subject: 'PIR INC-2026-0914-001 - Portal Mitra P1', attendees: ['carlos', 'adelia', 'mona', 'kian', 'indra'], optional: [],
    start: { d: -9, t: '14:00' }, end: { d: -9, t: '15:30' }, location: 'Teams', online: true, categories: ['Triage'],
    body: `Post-incident review for the Portal Mitra P1 incident. Agenda: align on timeline, confirm root cause, review business impact and security findings, agree corrective actions, and decide customer-facing follow-up. Required outputs: action owners for certificate monitoring, standby gateway certificate separation, quarterly failover testing, and partner notification playbook. Mona to bring Wingtip feedback; Indra to confirm there is no evidence of data breach; Kian to confirm application-side recovery and regression follow-up.`
  },
  {
    key: 'reforecast', organizer: 'babak', subject: 'Q4 re-forecast consolidation - Technology input', attendees: ['andre'], optional: ['carlos'],
    start: { d: 1, t: '14:00' }, end: { d: 1, t: '16:00' }, location: 'Finance Teams channel', online: true, categories: ['Triage'],
    body: `Finance consolidation session for Q4 re-forecast inputs. Babak will review division templates, resolve phasing questions, and prepare CFO challenge points for Andre. Carlos is optional but should be available if Technology assumptions need clarification: 6% YTD overspend mainly from cloud consumption, Portal Mitra load increase, post-incident logging, reserved-instance renewal in November with about IDR 410m annual saving potential, and one-off Proyek Nusa cutover overtime and contractor costs.`
  }
];
