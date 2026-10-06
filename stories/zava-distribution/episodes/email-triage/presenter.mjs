// Presenter guide for the email-triage episode: the Copilot moments to show, in order, each grounded in
// seeded items (ids from spec.mjs, chats.mjs, files.mjs, calendar.mjs) with the expected result to check.
// English only for now. Rendered as a tab in the review page and as its own page (render-presenter.mjs).
// Expected results are an answer key for the presenter: they quote seeded facts, so they change if the story does.

export const PRESENTER = {
  seat: 'carlos',
  tier: 'Microsoft 365 Copilot (Premium)',
  when: { d: 0, t: '07:30' },
  pitch: 'A CTO opens 40 unread emails in three languages at 07:30. Copilot finds the six things he must act on today, including an approval hidden in the last paragraph of a CC thread, builds the board pack from files and chats his team already wrote, drafts the replies in the sender\'s language, and keeps a customer\'s ID number and a phishing link out of everything.',
  before: [
    'Run the seeder health check (status.ps1): all checks OK and the app back at read-only.',
    'Sign in as Carlos Slattery in an InPrivate window; confirm Copilot shows Premium (Work tab).',
    'Open Outlook: about 40 unread in the Inbox, newest the phishing email at 07:15.',
    'Open Uptime_Insiden_Sep2026.xlsx once from "Shared with me" so it is warm in the index.',
    'Keep the [Triage] Wingtip chat and the A2 cutover thread one click away.',
  ],
  moments: [
    {
      id: 'P1', surface: 'Copilot Chat', minutes: 3, grounds: ['A1', 'A7', 'A2', 'A3', 'A4', 'A5', 'A6', 'N5', 'N10', 'S1'],
      prompt: 'What do I need to act on today? Check my email, Teams chats and meetings, and list each item with who asked, what they need and the deadline.',
      expect: [
        'Direksi pack for Adelia by 12.00: September uptime per system, P1 summary with corrective actions, Proyek Nusa go/no-go; one page plus one backup table. Her 06:52 reminder is the same request, not a second item.',
        'Approve Saturday overtime for the cutover: 9 internal staff plus 12 Proseware contractors (IDR 38.4 million) by 15.00, from Lydia\'s long thread where Carlos is only in CC.',
        'SAP purchase order 4500123881 waiting for his approval, expiring at 17:00. The other SAP mail (PO 4500123790) is already approved and needs nothing.',
        'Wingtip escalation from Yohana: root cause, corrective actions and a statement they can use, by 17.00.',
        'Q4 IT re-forecast for Andre by tomorrow 10:00.',
        'Weekly coordination moved to 11.00 today; Carlos gives the Proyek Nusa go/no-go readiness.',
      ],
      watch: 'Point at the overtime approval: it is the last paragraph of a reply where Carlos is in CC. The "URGENT" ServerParts promo must not appear as a task, and the password email should be called out as suspicious, not as work.',
      fallback: 'If the overtime approval is missing, ask: "Did anyone ask me to approve something in a thread where I am only in CC?"',
    },
    {
      id: 'P2', surface: 'Outlook', minutes: 2, grounds: ['A2', 'H1', 'T2'],
      prompt: 'Summarise this thread and tell me exactly what Lydia needs from me.',
      expect: [
        'Approval of Saturday overtime: 9 internal staff (Technology overtime budget) and 12 Proseware contractors costing IDR 38.4 million.',
        'Deadline 15.00 today, because Proseware needs written confirmation by 16.00.',
        'Context: infrastructure readiness, backup timings and the rollback point before migration wave 1.',
      ],
      watch: 'Open the A2 email first (Lydia\'s reply to Kian\'s cutover plan) and use Summarise in Outlook, then the prompt.',
    },
    {
      id: 'P3', surface: 'Copilot Chat', minutes: 4, grounds: ['A1', 'uptime', 'pir', 'H3', 'H6', 'T1', 'T2', 'A4'],
      prompt: 'Draft the one-page Direksi update Adelia asked for, plus one backup table. Use Lydia\'s uptime file, the PIR and the Proyek Nusa cutover chat.',
      expect: [
        'Uptime: Portal Mitra 99.58% against 99.9% (181 minutes down) and Johor WAN link 99.71% (125 minutes) below target; SAP ECC, WMS and Microsoft 365 met target; Data warehouse exactly at 99.9%.',
        'P1 INC-2026-0914-001: 2 hours 53 minutes; 1,146 partner orders failed or queued, 212 of them Wingtip; about IDR 3.1 billion delayed; cause an expired internal mTLS certificate whose auto-renew failed silently.',
        'Corrective actions: certificate-expiry monitoring and separate standby certificates done; quarterly failover test scheduled; partner notification playbook in progress (Mona and Lydia).',
        'Proyek Nusa: mock cutover 2 took 31 hours against a 36-hour window, 7 defects, 0 critical; recommendation is to proceed if regression is clear, the backup/restore sample is valid and Saturday resources are confirmed.',
        'Wingtip escalation still open, statement due 17.00.',
      ],
      watch: 'Show the citations: the uptime workbook, the PIR document and the [Triage] chats are all owned by other people. That is the Premium difference: Basic has none of it.',
    },
    {
      id: 'P4', surface: 'Excel', minutes: 2, grounds: ['uptime'],
      prompt: 'Which systems missed their uptime target in September, by how much, and what caused it?',
      expect: [
        'Portal Mitra: 99.58% against 99.9%, 181 minutes, driven by P1 INC-2026-0914-001 (expired mTLS certificate).',
        'Johor WAN link: 99.71% against 99.9%, 125 minutes, from two link flaps during provider maintenance.',
        'Data warehouse is exactly at target (99.9%), not a miss.',
      ],
      watch: 'Open Uptime_Insiden_Sep2026.xlsx from "Shared with me" (owner Lydia Bauer) and use Copilot in Excel.',
    },
    {
      id: 'P5', surface: 'Teams', minutes: 2, grounds: ['T4'],
      prompt: 'Recap this chat: decisions, owners and open items.',
      expect: [
        'Partner notification playbook: Mona owns the customer wording, Lydia the technical trigger and a P1/P2/P3 severity matrix.',
        'First-wave partners: Wingtip, the Northwind retail group and other top-revenue partners.',
        'Escalation line for future P1s: the CTO office first, the Service Delivery Lead as delegate; final wording goes through Sales.',
        'Open: Wingtip wants Carlos at the QBR; Mona has limited email while she visits partners in Surabaya.',
      ],
      watch: 'Open the [Triage] Wingtip chat. Every message was posted by its author at its original time.',
    },
    {
      id: 'P6', surface: 'Word', minutes: 3, grounds: ['A4', 'pir', 'T4', 'H4'],
      prompt: 'Draft a short statement Wingtip can use with their customer about the delayed order, based on Yohana\'s email and PIR_INC-2026-0914-001.docx.',
      expect: [
        'An apology and a plain-language cause: a technical fault in the partner ordering connection, now fixed.',
        'What changed: monitoring and alerts, separate standby setup, regular failover tests, and faster partner notification.',
        'No national ID number (NIK) or mobile number from the case file, and no internal control detail or blame.',
      ],
      watch: 'Say out loud that Yohana\'s email contains the end customer\'s NIK and phone number, and that neither appears in the draft. Carlos said in the chat that final wording goes through Sales: offer to send the draft to Mona.',
    },
    {
      id: 'P7', surface: 'Outlook', minutes: 2, grounds: ['W1'],
      prompt: 'Draft a reply to Tan Mei Ling confirming the four maintenance windows.',
      expect: [
        'The reply is in Bahasa Melayu, matching her email.',
        'It confirms the four Johor hub windows with their dates and MYT/WIB times, and acknowledges the brief WAN failover.',
      ],
      watch: 'Open W1 (Bahasa Melayu) and use Draft with Copilot. If the draft comes back in English, ask for Bahasa Melayu.',
    },
    {
      id: 'P8', surface: 'Copilot Chat', minutes: 1, grounds: ['S1', 'F6', 'N5'],
      prompt: 'Is anything in my inbox suspicious?',
      expect: [
        'The 07:15 "password expires today" email: lookalike domain, generic greeting, two-hour urgency, asks for the old password. Do not open the link; report it to IT.',
        'The ServerParts "URGENT" email is marketing, not phishing.',
      ],
      watch: 'Link it to Cassandra\'s security awareness email from yesterday, which describes this exact pattern.',
    },
    {
      id: 'P9', surface: 'Cowork', minutes: 4, grounds: ['A1', 'A7', 'W1', 'S1'], kit: 'x-email-triage-015',
      prompt: 'Triage my unread inbox from the last 24 hours with my email triage skill.',
      expect: [
        'Groups: Act today 7 emails but 6 requests (the reminder merged), This week 6, FYI 12, Noise 14, Suspicious 1; total 40.',
        'Draft replies saved (not sent) for the Act today items; Noise moved to "Read later" only after asking.',
        'The Johor reply is This week, and its draft (if made) is in Bahasa Melayu.',
      ],
      watch: 'Needs Cowork (Frontier) and the Email triage skill from the scenario kit. Skip this moment if Cowork is not enabled in the tenant.',
    },
  ],
};
