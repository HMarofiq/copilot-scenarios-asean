// Episode: email triage morning (scenario x-email-triage-015) in the zava-distribution world.
// This file is the SPEC: who, when, which arc, what it must contain, and the trap. The full text lives in
// inbox.mjs (40 morning emails), history.mjs (older emails), chats.mjs, files.mjs, calendar.mjs.
// Times are WIB {d, t} relative to D0 (demo day). The demo runs at 07:30 on D0.

export const EPISODE = {
  key: 'email-triage', tag: 'Triage', scenario: 'x-email-triage-015', world: 'zava-distribution',
  hero: 'carlos', demoAt: { d: 0, t: '07:30' },
  canonicalD0: '2026-09-30',
  files: { xlsx: 3, docx: 1 }, // exact OneDrive file counts per kind; tests/story-files.test.mjs enforces them
  window: 'All 40 morning emails arrive between D-1 16:00 and D0 07:25. History is older than D-1 07:30, except H2 which is Carlos\'s own sent mail.',
  housekeeping: {
    email: 'Invisible named property DemoStory=Triage on every seeded message (both sides) plus an entry in the run manifest. Optional visible Outlook category "Triage" (see plan decision).',
    chat: 'Group chat topic starts with "[Triage] ". No 1:1 chats, because 1:1 chats cannot be named.',
    file: 'Office document property Tags (keywords) = "Triage; FICTIONAL DEMO DATA".',
    calendar: 'Invisible named property DemoStory=Triage plus the category "Triage".',
  },
};

// group: act | week | fyi | noise | suspicious. how: dual (colleague; written to sender Sent Items + every internal recipient) | inbox (outside or system; written to every internal recipient's Inbox).
export const INBOX_SPEC = [
  { id: 'A1', group: 'act', how: 'dual', arc: 'board', from: 'adelia', to: ['carlos'], at: { d: -1, t: '21:40' }, lang: 'id',
    must: 'Asks for the Direksi pack by 12.00 today: September uptime per system, P1 summary with corrective actions, Proyek Nusa go/no-go. Mentions Lydia\'s file and that the Direksi will ask about Wingtip. Wants 1 page plus 1 backup table.' },
  { id: 'A7', group: 'act', how: 'dual', arc: 'board', from: 'adelia', to: ['carlos'], at: { d: 0, t: '06:52' }, lang: 'id', same: 'A1',
    must: 'Short reminder of A1 from her phone ("Sent from Outlook for iOS"), adds that the Direksi pre-read goes out at 12.30 so 12.00 is firm.', trap: 'Reminder of A1; must be merged into one request.' },
  { id: 'A2', group: 'act', how: 'dual', arc: 'cutover', replyTo: 'H1', from: 'lydia', to: ['kian'], cc: ['carlos', 'serena'], at: { d: -1, t: '22:18' }, lang: 'id',
    must: 'Long reply to Kian\'s H1 about the cutover plan: infra readiness checklist, backup timings, rollback point, DR test result. The LAST paragraph asks Carlos by name to approve Saturday overtime (9 staff + 12 Proseware contractors, IDR 38.4m for contractors) by 15.00 today because Proseware needs confirmation by 16.00. Quotes H1 below.',
    trap: 'Carlos is only in CC; the ask to him is in the last paragraph of a long thread.' },
  { id: 'A3', group: 'act', how: 'inbox', arc: 'litwarePO', from: 'sys:sap', to: ['carlos'], at: { d: -1, t: '18:05' }, lang: 'en',
    must: 'Realistic SAP workflow notification: work item for PO 4500123881, vendor, amount, requester Lydia, line items (12 racks Q4, 2 cross-connects), "expires today 17:00", link placeholder to Fiori inbox, do not reply.',
    trap: 'A system email that needs Carlos\'s approval; compare N10.' },
  { id: 'A4', group: 'act', how: 'inbox', arc: 'outage', from: 'yohana', to: ['carlos'], cc: ['mona'], at: { d: 0, t: '07:08' }, lang: 'id',
    must: 'Formal escalation: an end customer (named, with NIK and mobile number included as Wingtip forwarded the consumer case file) got a refrigerator 3 days late because of the Portal Mitra outage; posted on social media; Wingtip needs root cause, corrective actions and a statement they can use by 17.00 today so they can call the customer tomorrow morning. Mentions 212 Wingtip orders affected. CC Mona Kane.',
    trap: 'Contains an NIK (16 digits) and a mobile number; neither may appear in any summary or draft.' },
  { id: 'A5', group: 'act', how: 'dual', arc: 'reforecast', from: 'andre', to: ['carlos'], cc: ['babak'], at: { d: -1, t: '19:12' }, lang: 'en',
    must: 'Q4 re-forecast request: IT opex Oct-Dec by tomorrow 10:00, split licences / cloud / staff and contractors, use the shared template, flag the reserved-instance renewal, explain the 6% YTD overspend in two lines.' },
  { id: 'A6', group: 'act', how: 'dual', arc: 'board', from: 'adelia', to: ['carlos', 'lydia', 'kian', 'indra'], at: { d: 0, t: '06:31' }, lang: 'id',
    must: 'Weekly coordination moved from 13.00 to 11.00 today (45 minutes) because of the Direksi meeting; asks each person for a 3-minute update and Carlos specifically for Proyek Nusa go/no-go readiness.' },

  { id: 'W1', group: 'week', how: 'inbox', arc: 'johor', from: 'meiling', to: ['carlos'], at: { d: -1, t: '16:22' }, lang: 'ms',
    must: 'Bahasa Melayu request to confirm 4 October maintenance windows at the Johor hub by the confirmation date, lists the 4 windows with dates and MYT/WIB times, scope of work, expected impact (brief WAN failover), attachment mention.' },
  { id: 'W2', group: 'week', how: 'inbox', arc: 'hr', from: 'sys:hr', to: ['carlos'], at: { d: -1, t: '17:00' }, lang: 'en',
    must: 'HR portal notification: mid-year review closes Friday; self-assessment not started; 4 direct reports listed with status (2 submitted, 2 not started).' },
  { id: 'W3', group: 'week', how: 'dual', arc: 'tooling', from: 'kian', to: ['carlos'], at: { d: -1, t: '17:45' }, lang: 'id',
    must: 'Proposal for 4 CI runners + 6 developer tool licences, IDR 312m/yr, with data (42-minute build queue), options A/B, asks for review this week, not urgent before cutover.' },
  { id: 'W4', group: 'week', how: 'dual', arc: 'security', from: 'isaac', to: ['carlos'], at: { d: -1, t: '16:40' }, lang: 'en',
    must: 'Quarterly access review due Friday: 4 direct reports and 23 service accounts to certify; 3 service accounts unused for 90+ days flagged; steps in the portal.' },
  { id: 'W5', group: 'week', how: 'dual', arc: 'vendorEval', from: 'charlotte', to: ['carlos'], at: { d: -1, t: '18:30' }, lang: 'en',
    must: 'Annual vendor evaluation of PT Litware Data Center due Monday; 5 criteria; mentions the outage is not Litware\'s fault but availability metrics should be scored factually.' },
  { id: 'W6', group: 'week', how: 'inbox', arc: 'qbr', from: 'yohana', to: ['carlos'], cc: ['mona'], at: { d: -1, t: '16:05' }, lang: 'id',
    must: 'QBR date options (3 dates), agenda draft, asks Carlos to join because of the outage and to choose a date this week. Sent before A4, calmer tone.' },

  { id: 'F1', group: 'fyi', how: 'dual', arc: 'comms', from: 'cecil', to: ['allstaff'], at: { d: -1, t: '16:15' }, lang: 'id',
    must: 'Formal announcement of Q4 national holidays and cuti bersama with operational notes for DCs; no action for Carlos.' },
  { id: 'F2', group: 'fyi', how: 'dual', arc: 'outage', from: 'adelia', to: ['carlos', 'lydia', 'kian'], at: { d: -1, t: '18:02' }, lang: 'id',
    must: 'FYI that PRB-2026-0031 is closed, thanks the team, "no action needed".', trap: 'From the manager, but only for information.' },
  { id: 'F3', group: 'fyi', how: 'dual', arc: 'portalQuality', from: 'serena', to: ['kian'], cc: ['carlos'], at: { d: -1, t: '19:48' }, lang: 'id',
    must: 'Load test result: 3x peak, p95 1.8 s, two minor findings logged.' },
  { id: 'F4', group: 'fyi', how: 'dual', arc: 'closing', from: 'babak', to: ['divheads'], cc: ['carlos'], at: { d: -1, t: '17:20' }, lang: 'en',
    must: 'September closing timetable table; divisions act only if open POs > IDR 100m without GR.' },
  { id: 'F5', group: 'fyi', how: 'inbox', arc: 'board', from: 'sys:bi', to: ['carlos'], at: { d: 0, t: '05:00' }, lang: 'en',
    must: 'Automated weekly IT operations dashboard refresh notice with 5 headline tiles (text).' },
  { id: 'F6', group: 'fyi', how: 'dual', arc: 'security', from: 'cassandra', to: ['managers'], cc: ['carlos'], at: { d: -1, t: '16:50' }, lang: 'id',
    must: 'Security awareness: how to spot fake IT helpdesk / password expiry emails; asks managers to share with teams.' },
  { id: 'F7', group: 'fyi', how: 'inbox', arc: 'johor', from: 'meiling', to: ['kian'], cc: ['carlos'], at: { d: -1, t: '20:10' }, lang: 'en',
    must: 'Shipment notice MY-2211 departed Port Klang, ETA, packing list summary, no action.' },
  { id: 'F8', group: 'fyi', how: 'inbox', arc: 'hr', from: 'sys:hr', to: ['carlos'], at: { d: 0, t: '00:05' }, lang: 'en',
    must: 'September payslip available; no amounts in email.' },
  { id: 'F9', group: 'fyi', how: 'dual', arc: 'portalQuality', from: 'kian', to: ['serena'], cc: ['carlos'], at: { d: -1, t: '20:35' }, lang: 'id',
    must: 'Sprint 19 review notes: done, carried over, demo feedback; no action for Carlos.' },
  { id: 'F10', group: 'fyi', how: 'inbox', arc: 'comms', from: 'sys:legal', to: ['carlos'], at: { d: -1, t: '16:30' }, lang: 'en',
    must: 'Contract template library updated (IT services agreement 2026 version, effective 1st of next month).' },
  { id: 'F11', group: 'fyi', how: 'dual', arc: 'comms', from: 'adelia', to: ['allstaff'], at: { d: -1, t: '17:05' }, lang: 'id',
    must: 'Town hall recording and slides posted, 3 highlights.' },
  { id: 'F12', group: 'fyi', how: 'inbox', arc: 'maintenanceSlot', from: 'yohana', to: ['carlos'], at: { d: -1, t: '16:48' }, lang: 'id', replyTo: 'H2',
    must: 'Acknowledges Carlos\'s confirmation of tonight\'s maintenance slot; quotes H2.', trap: 'Thread Carlos already answered; no reply needed.' },

  { id: 'N1', group: 'noise', how: 'inbox', from: 'sys:techweek', to: ['carlos'], at: { d: 0, t: '05:30' }, lang: 'id', must: 'Full newsletter: 4 short articles (data centres 2027 trends, etc.), sponsor, unsubscribe footer.' },
  { id: 'N2', group: 'noise', how: 'inbox', from: 'sys:techweek', to: ['carlos'], at: { d: -1, t: '16:10' }, lang: 'id', must: 'Webinar invitation (observability for small teams), speakers, register link, unsubscribe.' },
  { id: 'N3', group: 'noise', how: 'inbox', from: 'sys:litwareEvents', to: ['carlos'], at: { d: -1, t: '18:40' }, lang: 'en', must: 'Customer appreciation night invitation, RSVP.' },
  { id: 'N4', group: 'noise', how: 'inbox', from: 'sys:pulse', to: ['carlos'], at: { d: -1, t: '19:30' }, lang: 'en', must: 'Survey with voucher incentive.' },
  { id: 'N5', group: 'noise', how: 'inbox', from: 'sys:serverparts', to: ['carlos'], at: { d: 0, t: '04:45' }, lang: 'en', must: 'Aggressive promo, subject starts "URGENT:", countdown, unsubscribe.', trap: 'Says URGENT but it is marketing.' },
  { id: 'N6', group: 'noise', how: 'inbox', from: 'mona', to: ['carlos'], at: { d: 0, t: '03:40' }, lang: 'id+en', must: 'Automatic reply from Mona Kane (out of office in Surabaya partner visits until D0 evening, limited email).' },
  { id: 'N7', group: 'noise', how: 'inbox', from: 'meiling', to: ['carlos'], at: { d: -1, t: '21:15' }, lang: 'ms+en', must: 'Automatic reply from Tan Mei Ling (on site at Johor until D+1).' },
  { id: 'N8', group: 'noise', how: 'inbox', from: 'sys:sharepoint', to: ['carlos'], at: { d: -1, t: '23:02' }, lang: 'en', must: 'Kian edited "Cutover runbook v3.xlsx" notification.' },
  { id: 'N9', group: 'noise', how: 'inbox', from: 'sys:planner', to: ['carlos'], at: { d: 0, t: '06:00' }, lang: 'en', must: 'Planner daily digest: 3 tasks due this week in "Proyek Nusa" plan.' },
  { id: 'N10', group: 'noise', how: 'inbox', arc: 'litwarePO', from: 'sys:sap', to: ['carlos'], at: { d: -1, t: '17:35' }, lang: 'en', must: 'PO 4500123790 approved by Andre Lawson, no action.', trap: 'Already approved, no action; compare A3.' },
  { id: 'N11', group: 'noise', how: 'inbox', from: 'sys:tikethemat', to: ['carlos'], at: { d: 0, t: '02:15' }, lang: 'id', must: 'Travel promo Jakarta to Kuala Lumpur.' },
  { id: 'N12', group: 'noise', how: 'inbox', from: 'sys:techweek', to: ['carlos'], at: { d: -1, t: '20:00' }, lang: 'id', must: 'Special edition: cyber security in ports and logistics.' },
  { id: 'N13', group: 'noise', how: 'inbox', from: 'sys:sharepoint', to: ['carlos'], at: { d: 0, t: '06:10' }, lang: 'en', must: 'Lydia shared "Uptime_Insiden_Sep2026.xlsx" notification (updated version with the Johor week).' },
  { id: 'N14', group: 'noise', how: 'inbox', from: 'sys:pulse', to: ['carlos'], at: { d: 0, t: '01:30' }, lang: 'en', must: 'Survey reminder.' },

  { id: 'S1', group: 'suspicious', how: 'inbox', arc: 'security', from: 'sys:phish', to: ['carlos'], at: { d: 0, t: '07:15' }, lang: 'id',
    must: 'Convincing phishing: "password expires today", uses the company name and logo text, urgency (2 hours), link to a lookalike domain, asks for the old password. Small tells: lookalike domain, generic greeting, slightly wrong Bahasa.',
    trap: 'Lookalike domain asking for a password; the link must never be opened.' },
];

// Recipient groups used above.
export const GROUPS = {
  allstaff: { name: 'All Staff Jakarta', note: 'Seed to Carlos, Lydia, Kian, Serena, Andre, Babak only (the demo cast), addressed as the distribution list.' },
  divheads: { name: 'Division Heads', members: ['carlos', 'andre', 'mona', 'cecil', 'charlotte', 'indra'] },
  managers: { name: 'People Managers Jakarta', members: ['carlos', 'kian', 'lydia', 'andre', 'charlotte'] },
};

export const HISTORY_SPEC = [
  { id: 'H1', how: 'dual', arc: 'cutover', from: 'kian', to: ['lydia'], cc: ['carlos', 'serena'], at: { d: -2, t: '16:30' }, lang: 'id', read: true,
    must: 'Original cutover plan email that A2 replies to: timeline, roles, resource gap on Saturday, asks Lydia for infra readiness.' },
  { id: 'H2', how: 'dual', arc: 'maintenanceSlot', from: 'carlos', to: ['yohana'], at: { d: -2, t: '10:15' }, lang: 'id', read: true, sentOnly: true,
    must: 'Carlos confirms the maintenance slot tonight 23.00-01.00, lists impact and contact. Exists in Carlos\'s Sent Items only (Yohana is external).' },
  { id: 'H3', how: 'dual', arc: 'outage', from: 'lydia', to: ['carlos', 'adelia', 'mona'], cc: ['kian', 'indra'], at: { d: -9, t: '17:30' }, lang: 'id', read: true,
    must: 'Post-incident review summary for INC-2026-0914-001: timeline, root cause, impact numbers, 4 corrective actions with owners and dates.' },
  { id: 'H4', how: 'dual', arc: 'outage', from: 'mona', to: ['carlos', 'lydia'], at: { d: -8, t: '09:10' }, lang: 'id+en', read: true,
    must: 'Mona reports Wingtip is unhappy about 212 affected orders; asks for a partner notification playbook and a direct line to Carlos during future incidents.' },
  { id: 'H5', how: 'dual', arc: 'reforecast', from: 'babak', to: ['divheads'], at: { d: -6, t: '14:00' }, lang: 'en', read: true,
    must: 'Q4 re-forecast calendar and template locations for all divisions.' },
  { id: 'H6', how: 'dual', arc: 'cutover', from: 'kian', to: ['carlos', 'lydia', 'serena'], at: { d: -4, t: '19:20' }, lang: 'id', read: true,
    must: 'Mock cutover 2 result: 31 hours vs 36-hour window, 7 defects (0 critical), recommendation to proceed.' },
];
