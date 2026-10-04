const PIR_BLOCKS = [
  '# Post-Incident Review INC-2026-0914-001',
  '## Executive summary',
  'This document records the post-incident review for the Portal Mitra P1 incident. The incident began on {{d:-16:id}} at 09:12 WIB and was restored at 12:05 WIB. Portal Mitra could not submit partner orders because the API gateway could not establish the required mTLS connection to the ERP connector.',
  'The incident affected partner ordering, not identity, payment, or customer personal-data systems. Indra Permana and the Security team reviewed WAF, API gateway, and connector logs for the incident window and found no indication of data exfiltration or unauthorised access. The primary customer-facing impact was operational: orders failed, retried, or missed warehouse cut-off times.',
  '## Service and business impact',
  'Portal Mitra order submission was unavailable for 2 hours 53 minutes. A total of 1,146 partner orders failed or were queued, including 212 Wingtip orders. Approximate order value delayed was IDR 3.1 billion. The delay to fulfilment was 1 to 3 days depending on item availability, distribution-centre cut-off, and last-mile delivery commitments. Order data was reconciled against SAP ECC and WMS after restoration; no permanent order loss was found.',
  '## Timeline',
  { table: [
    ['Time WIB', 'Event', 'Primary owner'],
    ['09:12', 'Synthetic monitor and partner reports show Portal Mitra order-submit failures.', 'NOC / Sarah Perez'],
    ['09:18', 'P1 bridge opened; Carlos, Lydia, Kian, and Security notified.', 'Sarah Perez'],
    ['09:31', 'API gateway health checks pass, but ERP connector mTLS handshake fails.', 'Lydia Bauer'],
    ['10:05', 'Expired internal certificate identified; auto-renew job failure confirmed.', 'Lydia Bauer'],
    ['10:42', 'Certificate renewed manually on primary gateway; partial recovery begins.', 'Infrastructure & SRE'],
    ['11:20', 'Connector pool restarted in sequence; Wingtip test order and two control partner orders pass.', 'Kian Lambert'],
    ['12:05', 'Service restored; backlog processing and elevated monitoring continue.', 'Carlos Slattery']
  ] },
  '## Root cause',
  'The internal certificate used for mTLS between the API gateway and ERP connector expired. The auto-renew job had failed silently for 9 days after a service-account permission change prevented it from writing the renewed certificate into the secret store. The monitoring job checked only scheduler status, so it reported success even though no new certificate was available to the connector.',
  'A secondary design issue increased the impact. The standby gateway used the same certificate material as the primary gateway. When the team tested failover during diagnosis, the standby path failed for the same reason. The architecture therefore did not separate this certificate as an independent failure domain.',
  '## 5-whys',
  '- Why did partners fail to submit orders? The ERP connector rejected mTLS from the API gateway.',
  '- Why was mTLS rejected? The certificate had expired.',
  '- Why did the certificate expire? The renewal job failed after permission changes and did not alert.',
  '- Why did monitoring not alert? It checked the scheduler exit code rather than certificate age and secret-store update time.',
  '- Why did failover not restore service? Standby used the same certificate material as primary.',
  '## Corrective actions',
  { table: [
    ['No.', 'Action', 'Owner', 'Due / status'],
    ['1', 'Certificate expiry monitoring with 30/14/7-day alerts across API gateway, ERP connector, and service mesh certificates.', 'Lydia Bauer', 'Done'],
    ['2', 'Separate certificates for standby gateway so failover does not share the same certificate failure domain.', 'Lydia Bauer', 'Done'],
    ['3', 'Quarterly failover test for Portal Mitra to standby gateway, with the first test scheduled for {{d:+21:id-short}}.', 'Lydia Bauer / Kian Lambert', '{{d:+21:id-short}}'],
    ['4', 'Partner notification playbook covering first update, cadence, closure note, and approval flow for customer-facing wording.', 'Mona Kane with Lydia Bauer', 'In progress']
  ] },
  '## Lessons learned',
  'Monitoring must validate the outcome that matters, not the job that was supposed to produce it. In this case the system needed certificate-age and secret-store freshness alerts, not only a green scheduler. Standby components must be tested for dependency independence; otherwise a shared certificate, credential, DNS route, or secret store can make failover look available while it is functionally unavailable.',
  'The incident also showed that customer communication needs an operating model. Technical teams had good bridge discipline, but partner communication lagged because there was no agreed trigger, owner, or wording path for a Portal Mitra P1. Wingtip and other high-volume partners need an initial holding statement quickly, followed by regular updates even when root cause is still under analysis. The new playbook should define severity, audience tiers, approval, update cadence, and closure language.',
  '## Governance and closure',
  'Problem record PRB-2026-0031 tracked the corrective actions. The monitoring and standby-certificate items were verified before the problem record was closed by Problem Management on {{d:-1:id}}. The failover test remains scheduled for {{d:+21:id-short}}, and the partner notification playbook remains open with Mona Kane and Lydia Bauer. Until those items are complete, the weekly Technology coordination meeting should review status and any customer-facing commitments.'
];

export const FILES = [
  {
    key: 'uptime', owner: 'lydia', name: 'Uptime_Insiden_Sep2026.xlsx', kind: 'xlsx', sharedWith: ['carlos', 'adelia'], tags: 'Triage; FICTIONAL DEMO DATA', title: 'September uptime and incident summary',
    sheets: [
      { name: 'Uptime', columns: [
        { header: 'System', key: 'system', width: 24 }, { header: 'Target %', key: 'target', width: 12 }, { header: 'Actual %', key: 'actual', width: 12 }, { header: 'Downtime minutes', key: 'downtime', width: 18 }, { header: 'Incidents count', key: 'incidents', width: 16 }, { header: 'Status vs target', key: 'status', width: 18 }, { header: 'Comment', key: 'comment', width: 52 }
      ], rows: [
        { system: 'Portal Mitra', target: 99.90, actual: 99.58, downtime: 181, incidents: 1, status: 'Below target', comment: 'P1 INC-2026-0914-001 drove nearly all downtime; uptime tool includes synthetic check failures around restore.' },
        { system: 'SAP ECC', target: 99.90, actual: 99.97, downtime: 13, incidents: 1, status: 'Met target', comment: 'One P3 batch-delay ticket; no customer-facing outage.' },
        { system: 'WMS', target: 99.90, actual: 99.95, downtime: 22, incidents: 1, status: 'Met target', comment: 'P2 slow picking screens at Surabaya lasted 47 min; availability impact measured at 22 min.' },
        { system: 'Microsoft 365', target: 99.90, actual: 99.99, downtime: 4, incidents: 0, status: 'Met target', comment: 'No material business interruption; telemetry rounded to 4 minutes.' },
        { system: 'Johor WAN link', target: 99.90, actual: 99.71, downtime: 125, incidents: 1, status: 'Below target', comment: 'Two link flaps; last-week Johor data added on {{d:-1:id-short}}.' },
        { system: 'Data warehouse', target: 99.90, actual: 99.90, downtime: 43, incidents: 1, status: 'At target', comment: 'One P3 dashboard-refresh delay; business reports caught up same day.' }
      ] },
      { name: 'Insiden', columns: [
        { header: 'Incident', key: 'incident', width: 22 }, { header: 'Date', key: 'date', width: 18 }, { header: 'System', key: 'system', width: 22 }, { header: 'Priority', key: 'priority', width: 10 }, { header: 'Duration minutes', key: 'duration', width: 18 }, { header: 'Root cause summary', key: 'root', width: 60 }, { header: 'Status', key: 'status', width: 18 }
      ], rows: [
        { incident: 'INC-2026-0914-001', date: '{{d:-16:id-short}}', system: 'Portal Mitra', priority: 'P1', duration: 173, root: 'Expired internal mTLS certificate between API gateway and ERP connector; auto-renew job failed silently.', status: 'Closed; PRB-2026-0031' },
        { incident: 'INC-2026-0907-014', date: '{{d:-23:id-short}}', system: 'WMS', priority: 'P2', duration: 47, root: 'Slow picking screens at Surabaya after database statistics drift; mitigated by stats refresh.', status: 'Closed' },
        { incident: 'INC-2026-0919-006', date: '{{d:-11:id-short}}', system: 'Johor WAN link', priority: 'P2', duration: 38, root: 'Primary link flap during provider maintenance; traffic failed over with packet loss.', status: 'Closed; vendor follow-up' },
        { incident: 'INC-2026-0923-002', date: '{{d:-7:id-short}}', system: 'Data warehouse', priority: 'P3', duration: 43, root: 'Dashboard refresh delayed by ETL queue backlog after month-end trial load.', status: 'Closed' },
        { incident: 'INC-2026-0925-011', date: '{{d:-5:id-short}}', system: 'SAP ECC', priority: 'P3', duration: 13, root: 'Nightly batch dependency waited on file-lock release; no partner-facing impact.', status: 'Closed' }
      ] },
      { name: 'Tindakan korektif', columns: [
        { header: 'No.', key: 'no', width: 8 }, { header: 'Action', key: 'action', width: 72 }, { header: 'Owner', key: 'owner', width: 24 }, { header: 'Due / status', key: 'due', width: 24 }, { header: 'Status', key: 'status', width: 18 }
      ], rows: [
        { no: 1, action: 'Certificate expiry monitoring with 30/14/7-day alerts', owner: 'Lydia Bauer', due: 'Done', status: 'Done' },
        { no: 2, action: 'Separate certificates for standby gateway', owner: 'Lydia Bauer', due: 'Done', status: 'Done' },
        { no: 3, action: 'Quarterly failover test, first one scheduled for {{d:+21:id-short}}', owner: 'Lydia Bauer / Kian Lambert', due: '{{d:+21:id-short}}', status: 'Scheduled' },
        { no: 4, action: 'Partner notification playbook', owner: 'Mona Kane with Lydia Bauer', due: 'In progress', status: 'In progress' }
      ] },
      { name: 'Catatan', columns: [ { header: 'Note', key: 'note', width: 100 } ], rows: [
        { note: 'All figures are for September reporting and target is 99.90% for every system.' },
        { note: 'Downtime minutes assume a 30-day month, 43,200 total minutes, rounded to nearest minute.' },
        { note: 'Johor last week data added {{d:-1:id-short}} after Northwind raw logs arrived; final Johor WAN link uptime is 99.71%.' },
        { note: 'Use this workbook as the source for the Direksi pack; do not paste draft chat numbers if they conflict.' }
      ] }
    ]
  },
  {
    key: 'reforecast', owner: 'andre', name: 'Q4_Reforecast_Template_IT.xlsx', kind: 'xlsx', sharedWith: ['carlos', 'babak'], tags: 'Triage; FICTIONAL DEMO DATA', title: 'Q4 re-forecast template for Technology',
    sheets: [
      { name: 'Instructions', table: false, columns: [ { header: 'Instruction', key: 'instruction', width: 120 } ], rows: [
        { instruction: 'Complete Oct, Nov, and Dec forecast columns by {{d:+1:id}} 10:00 WIB.' },
        { instruction: 'Use IDR million. Keep one-off Proyek Nusa cutover costs visible in the comment column.' },
        { instruction: 'Provide two-line explanation for YTD 6% overspend and identify mitigation for Q4.' },
        { instruction: 'Reserved-instance renewal in November may save about IDR 410m per year; include as mitigation only if Technology intends to proceed.' }
      ] },
      { name: 'IT Opex', columns: [
        { header: 'Category', key: 'category', width: 22 }, { header: 'Line', key: 'line', width: 36 }, { header: 'Budget Q4 IDR m', key: 'budget', width: 18 }, { header: 'Oct IDR m', key: 'oct', width: 14 }, { header: 'Nov IDR m', key: 'nov', width: 14 }, { header: 'Dec IDR m', key: 'dec', width: 14 }, { header: 'Total IDR m', key: 'total', width: 14 }, { header: 'Comment', key: 'comment', width: 60 }
      ], rows: [
        { category: 'Licences', line: 'ERP and integration licences', budget: 1180, oct: '', nov: '', dec: '', total: '', comment: 'Include S/4HANA transition overlap if applicable.' },
        { category: 'Licences', line: 'Developer tools and CI runners', budget: 210, oct: '', nov: '', dec: '', total: '', comment: 'Do not include proposed new licences unless approved.' },
        { category: 'Licences', line: 'Security and monitoring subscriptions', budget: 330, oct: '', nov: '', dec: '', total: '', comment: 'Certificate monitoring expansion may sit here.' },
        { category: 'Cloud', line: 'Portal Mitra production workloads', budget: 1620, oct: '', nov: '', dec: '', total: '', comment: 'Reflect higher load and post-incident logging.' },
        { category: 'Cloud', line: 'Data warehouse and BI capacity', budget: 720, oct: '', nov: '', dec: '', total: '', comment: 'Include month-end closing capacity.' },
        { category: 'Cloud', line: 'Reserved-instance renewal', budget: 980, oct: '', nov: '', dec: '', total: '', comment: 'November renewal could save about IDR 410m per year.' },
        { category: 'Staff & contractors', line: 'Proyek Nusa cutover contractors', budget: 260, oct: '', nov: '', dec: '', total: '', comment: 'Saturday Proseware contractors are IDR 38.4m if approved.' },
        { category: 'Staff & contractors', line: 'Internal overtime and on-call', budget: 185, oct: '', nov: '', dec: '', total: '', comment: 'Separate recurring support from one-off cutover.' },
        { category: 'Staff & contractors', line: 'Run support contractors', budget: 540, oct: '', nov: '', dec: '', total: '', comment: 'Baseline run support for Portal Mitra and ERP.' }
      ] },
      { name: 'YTD', columns: [
        { header: 'Category', key: 'category', width: 24 }, { header: 'Jan-Sep Budget IDR m', key: 'budget', width: 22 }, { header: 'Jan-Sep Actual IDR m', key: 'actual', width: 22 }, { header: 'Variance IDR m', key: 'variance', width: 18 }, { header: 'Variance %', key: 'pct', width: 14 }, { header: 'Comment', key: 'comment', width: 64 }
      ], rows: [
        { category: 'Licences', budget: 3650, actual: 3710, variance: 60, pct: '1.6%', comment: 'Minor true-up on integration and monitoring licences.' },
        { category: 'Cloud', budget: 5750, actual: 6450, variance: 700, pct: '12.2%', comment: 'Main driver: Portal Mitra load increase and additional post-incident logging.' },
        { category: 'Staff & contractors', budget: 3050, actual: 3037, variance: -13, pct: '-0.4%', comment: 'Underspend before Proyek Nusa cutover weekend.' },
        { category: 'Total IT Opex', budget: 12450, actual: 13197, variance: 747, pct: '6.0%', comment: 'Overall YTD overspend is about 6%, mainly cloud.' }
      ] }
    ]
  },
  {
    key: 'runbook', owner: 'kian', name: 'Cutover runbook v3.xlsx', kind: 'xlsx', sharedWith: ['carlos', 'lydia', 'serena'], tags: 'Triage; FICTIONAL DEMO DATA', title: 'Proyek Nusa cutover runbook v3',
    sheets: [
      { name: 'Runbook', columns: [
        { header: 'Step no', key: 'step', width: 10 }, { header: 'Phase', key: 'phase', width: 20 }, { header: 'Start offset', key: 'offset', width: 14 }, { header: 'Duration', key: 'duration', width: 12 }, { header: 'Owner', key: 'owner', width: 24 }, { header: 'Task', key: 'task', width: 62 }, { header: 'Dependency', key: 'dependency', width: 34 }, { header: 'Rollback point', key: 'rollback', width: 16 }
      ], rows: [
        { step: 1, phase: 'Freeze', offset: 'T-36h', duration: '30m', owner: 'Kian Lambert', task: 'Confirm change freeze and publish cutover bridge details.', dependency: 'Go/no-go call approved', rollback: 'No' },
        { step: 2, phase: 'Freeze', offset: 'T-35h', duration: '45m', owner: 'Sarah Perez', task: 'Update service desk banner and partner support script.', dependency: 'Step 1', rollback: 'No' },
        { step: 3, phase: 'Backup', offset: 'T-33h', duration: '3h', owner: 'Lydia Bauer', task: 'Run final SAP ECC database backup and verify checksum.', dependency: 'Freeze active', rollback: 'Yes' },
        { step: 4, phase: 'Backup', offset: 'T-30h', duration: '1h', owner: 'Lydia Bauer', task: 'Run Portal Mitra configuration export and secure copy to recovery share.', dependency: 'Step 3', rollback: 'Yes' },
        { step: 5, phase: 'Backup', offset: 'T-29h', duration: '1h', owner: 'Elvia Atkins', task: 'Snapshot data warehouse integration state.', dependency: 'Step 4', rollback: 'Yes' },
        { step: 6, phase: 'Pre-check', offset: 'T-28h', duration: '45m', owner: 'Serena Davis', task: 'Validate partner inactive and tax-code reference tables.', dependency: 'Backups complete', rollback: 'Yes' },
        { step: 7, phase: 'Pre-check', offset: 'T-27h', duration: '30m', owner: 'Lydia Bauer', task: 'Confirm connector certificate health and monitoring alerts are green.', dependency: 'Step 6', rollback: 'Yes' },
        { step: 8, phase: 'Migration wave 1', offset: 'T-24h', duration: '2h', owner: 'Kian Lambert', task: 'Start master-data migration wave 1.', dependency: 'Pre-check clear', rollback: 'Yes' },
        { step: 9, phase: 'Migration wave 1', offset: 'T-22h', duration: '1h', owner: 'Serena Davis', task: 'Validate 25 sample partner records after wave 1.', dependency: 'Step 8', rollback: 'Yes' },
        { step: 10, phase: 'Migration wave 1', offset: 'T-21h', duration: '1h', owner: 'Proseware contractors', task: 'Run data-quality exception report and assign defects.', dependency: 'Step 9', rollback: 'Yes' },
        { step: 11, phase: 'Migration wave 2', offset: 'T-19h', duration: '3h', owner: 'Kian Lambert', task: 'Migrate pricing, terms, and partner hierarchy deltas.', dependency: 'Exceptions under threshold', rollback: 'Yes' },
        { step: 12, phase: 'Migration wave 2', offset: 'T-16h', duration: '1h', owner: 'Serena Davis', task: 'Run consignment tax-code regression pack.', dependency: 'Step 11', rollback: 'Yes' },
        { step: 13, phase: 'Integration', offset: 'T-15h', duration: '1h', owner: 'Lydia Bauer', task: 'Restart connector pool with S/4HANA endpoint configuration.', dependency: 'Step 12', rollback: 'Yes' },
        { step: 14, phase: 'Integration', offset: 'T-14h', duration: '1h', owner: 'Serena Davis', task: 'Execute Portal Mitra order-submit smoke test.', dependency: 'Step 13', rollback: 'Yes' },
        { step: 15, phase: 'Integration', offset: 'T-13h', duration: '45m', owner: 'Lydia Bauer', task: 'Run API gateway latency and mTLS certificate checks.', dependency: 'Step 14', rollback: 'Yes' },
        { step: 16, phase: 'Batch', offset: 'T-12h', duration: '2h', owner: 'Elvia Atkins', task: 'Run inventory delta batch and dashboard feed dry run.', dependency: 'Step 15', rollback: 'No' },
        { step: 17, phase: 'Batch', offset: 'T-10h', duration: '1h', owner: 'Lydia Bauer', task: 'Verify batch restart health check introduced after mock cutover 2.', dependency: 'Step 16', rollback: 'No' },
        { step: 18, phase: 'Reconciliation', offset: 'T-9h', duration: '2h', owner: 'Proseware contractors', task: 'Reconcile pricing totals and inventory counts.', dependency: 'Step 17', rollback: 'No' },
        { step: 19, phase: 'Reconciliation', offset: 'T-7h', duration: '1h', owner: 'Kian Lambert', task: 'Review reconciliation exceptions and decide fix-forward vs rollback.', dependency: 'Step 18', rollback: 'Yes' },
        { step: 20, phase: 'Decision', offset: 'T-6h', duration: '30m', owner: 'Carlos Slattery', task: 'Checkpoint: continue to partner validation or rollback to SAP ECC.', dependency: 'Step 19', rollback: 'Yes' },
        { step: 21, phase: 'Validation', offset: 'T-5h', duration: '1h', owner: 'Serena Davis', task: 'Run 84-case Portal Mitra regression pack.', dependency: 'Step 20 continue', rollback: 'No' },
        { step: 22, phase: 'Validation', offset: 'T-4h', duration: '45m', owner: 'Kian Lambert', task: 'Business validation with sample orders from Wingtip and two other partners.', dependency: 'Step 21', rollback: 'No' },
        { step: 23, phase: 'Validation', offset: 'T-3h', duration: '30m', owner: 'Lydia Bauer', task: 'Confirm monitoring dashboard and alert routing.', dependency: 'Step 22', rollback: 'No' },
        { step: 24, phase: 'Opening', offset: 'T-2h', duration: '45m', owner: 'Sarah Perez', task: 'Prepare service desk opening note and known-issues statement.', dependency: 'Step 23', rollback: 'No' },
        { step: 25, phase: 'Opening', offset: 'T-1h', duration: '30m', owner: 'Kian Lambert', task: 'Final bridge check and owner roll call.', dependency: 'Step 24', rollback: 'No' },
        { step: 26, phase: 'Go live', offset: 'T', duration: '30m', owner: 'Carlos Slattery', task: 'Approve opening Portal Mitra against S/4HANA connector.', dependency: 'Steps 1-25 complete', rollback: 'No' },
        { step: 27, phase: 'Hypercare', offset: 'T+1h', duration: '2h', owner: 'Serena Davis', task: 'Monitor order-submit success rate and p95 response.', dependency: 'Go live', rollback: 'No' },
        { step: 28, phase: 'Hypercare', offset: 'T+3h', duration: '2h', owner: 'Lydia Bauer', task: 'Monitor infrastructure load, connector errors, and certificate alerts.', dependency: 'Go live', rollback: 'No' },
        { step: 29, phase: 'Closure', offset: 'T+5h', duration: '30m', owner: 'Kian Lambert', task: 'Publish cutover closure note and defect summary.', dependency: 'Hypercare green', rollback: 'No' },
        { step: 30, phase: 'Closure', offset: 'T+6h', duration: '30m', owner: 'Carlos Slattery', task: 'Confirm exit from cutover bridge or extend hypercare.', dependency: 'Step 29', rollback: 'No' }
      ] },
      { name: 'Contacts', columns: [
        { header: 'Role', key: 'role', width: 32 }, { header: 'Name', key: 'name', width: 28 }, { header: 'Organisation', key: 'org', width: 34 }, { header: 'Contact', key: 'contact', width: 26 }
      ], rows: [
        { role: 'Cutover lead', name: 'Kian Lambert', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 2301' },
        { role: 'Technology approver', name: 'Carlos Slattery', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 1101' },
        { role: 'Infrastructure owner', name: 'Lydia Bauer', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 2401' },
        { role: 'Portal Mitra regression', name: 'Serena Davis', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 2601' },
        { role: 'Security contact', name: 'Indra Permana', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 1701' },
        { role: 'Data warehouse feed', name: 'Elvia Atkins', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 2501' },
        { role: 'Service desk coordination', name: 'Sarah Perez', org: 'PT Zava Niaga Nusantara', contact: 'Teams / 5550 2200' },
        { role: 'Contractor dispatcher', name: 'Rafi Pratama', org: 'PT Proseware Tenaga Ahli', contact: '+62 21 5550 6601' }
      ] },
      { name: 'Go-NoGo', columns: [
        { header: 'Criterion', key: 'criterion', width: 58 }, { header: 'Owner', key: 'owner', width: 24 }, { header: 'Required state', key: 'required', width: 52 }, { header: 'Current status', key: 'status', width: 38 }
      ], rows: [
        { criterion: 'Portal Mitra regression for tax code and inactive partner cases', owner: 'Serena Davis', required: 'All critical and high cases passed', status: 'Passed in re-run; cosmetic item remains' },
        { criterion: 'Final backup and restore sample', owner: 'Lydia Bauer', required: 'Backup checksum valid and restore sample completed before migration wave 1', status: 'Ready for freeze window' },
        { criterion: 'Saturday resource coverage', owner: 'Kian Lambert', required: '9 internal staff overtime and 12 Proseware contractors confirmed', status: 'Needs Carlos approval by {{d:0:day-en}} 15.00; Proseware confirmation by {{d:0:day-en}} 16.00' },
        { criterion: 'Rollback decision point', owner: 'Carlos Slattery', required: 'Clear rollback point before partner validation', status: 'Defined in step 20' },
        { criterion: 'Monitoring and certificate alerts', owner: 'Lydia Bauer', required: 'Dashboards green; mTLS certificate checks active', status: 'Ready' }
      ] }
    ]
  },
  {
    key: 'pir', owner: 'lydia', name: 'PIR_INC-2026-0914-001.docx', kind: 'docx', sharedWith: ['carlos', 'adelia', 'mona', 'kian', 'indra'], tags: 'Triage; FICTIONAL DEMO DATA', title: 'Post-incident review INC-2026-0914-001',
    blocks: PIR_BLOCKS
  }
];
