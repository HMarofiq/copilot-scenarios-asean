// Fictional exercise facts. Assessments are derived from evidence facets, not stored verdicts.
export const FILES = {
  scope: '01_Contoso_MY_FTFC_Scope_Request.docx',
  source: '02_BNM_FTFC_2024_Reviewed_Source_Brief.pdf',
  policy: '03_Contoso_MY_Policy_Pack_v1.0.docx',
  evidence: '04_Contoso_MY_Readiness_Evidence_17Mar2025.docx',
  indonesia: '05_PT_Contoso_ID_SOP_Nasabah_Rentan_v2.docx',
  template: '06_Contoso_MY_BRMC_Paper_Template.docx',
  key: 'ANSWER_KEY_gap_register.xlsx',
  readme: 'README.txt',
};

export const CASE = {
  entity: 'Contoso Bank Malaysia Berhad',
  sister: 'PT Bank Contoso Indonesia',
  author: 'Nurul Aina Rahman',
  role: 'Senior Manager, Regulatory Compliance Advisory',
  snapshot: 'Monday 17 March 2025',
  cutoff: '17 March 2025, 18:00 MYT',
  review: '20 March 2025, 15:00 MYT',
  paper: '21 March 2025, 12:00 MYT',
  effective: '1 April 2025',
  effectiveISO: '2025-04-01',
  issued: '27 March 2024',
  predecessor: '6 November 2019',
  policyApproval: '26 February 2025',
  policyRef: 'MY-CC-FV-001 v1.0',
  draftDate: '13 March 2025',
  employees: 1287,
  trained: 1184,
  agents: 120,
  waivers: 41,
  branches: 62,
  crm: '14 April 2025',
  webUat: '31 March 2025',
  testing: 'Q3 2025',
  budget: 380000,
  budgetLabel: 'RM380,000',
  steering: '11 March 2025',
  expired: '31 December 2024',
};
export const trainingPercent = () => (CASE.trained / CASE.employees * 100).toFixed(1);
export const untrained = () => CASE.employees - CASE.trained;

export const SOURCE = {
  title: 'Fair Treatment of Financial Consumers',
  issuer: 'Bank Negara Malaysia',
  reference: 'BNM/RH/PD 028-103',
  pdfPages: 54,
  pdf: 'https://www.bnm.gov.my/documents/20124/938039/pd-ftfc-mar24.pdf',
  previous: 'https://www.bnm.gov.my/-/policy-document-on-fair-treatment-of-financial-consumers',
  ojk: 'https://ojk.go.id/id/regulasi/Pages/Pelindungan-Konsumen-dan-Masyarakat-di-Sektor-Jasa-Keuangan.aspx',
  ojkContext: 'https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/OJK-Perkuat-Peraturan-Pelindungan-Konsumen-dan-Masyarakat.aspx',
  product: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview',
  exceptionParagraphs: '8.1(g), 10.3(f), 10.3(g), 10.4 and 16.1–16.28',
};

// Facets describe the narrowly authored review question, not every legal duty in a paragraph.
export const REVIEW_UNITS = [
  { id: 'R01', type: 'S', para: '16.2', page: 37, section: '3.1', owner: 'Head of Customer Experience',
    question: 'Have vulnerable-consumer needs been assessed, translated into policy and communicated to relevant personnel?',
    facets: ['needs', 'policy', 'communication'], evidence: ['E01', 'E02'], approved: true,
    action: 'Retain the approved assessment and distribution record; confirm scope again if customer needs change.' },
  { id: 'R02', type: 'S', para: '16.5', page: 38, section: '3.2', owner: 'Head of Retail Products',
    question: 'Does the retail product design and approval process take vulnerable-consumer needs into account?',
    facets: ['design'], evidence: ['E03'], approved: true,
    action: 'Retain the signed product decision and apply the process to subsequent changes.' },
  { id: 'R03', type: 'S', para: '16.7', page: 38, section: '3.3', owner: 'Head of Retail Pricing',
    question: 'Are pricing and fees assessed for vulnerable consumers and supported by appropriate safeguards?',
    facets: ['pricing', 'safeguards'], evidence: ['E04', 'E05'], approved: true,
    action: 'Obtain a current pricing and fee review and renew the expired hardship guideline through approval.' },
  { id: 'R04', type: 'S', para: '16.9', page: 40, section: '3.4', owner: 'Head of Collections',
    question: 'Is prevention of predatory conduct towards vulnerable consumers demonstrated in operating checks?',
    facets: ['conductChecks'], evidence: ['E06'], approved: true,
    action: 'Obtain the underlying QA report and sampled results; verify the attestation before concluding.' },
  { id: 'R05', type: 'S', para: '16.12', page: 41, section: '3.5 / Annex B', owner: 'Head of Model Risk',
    question: 'Is due care for vulnerable consumers demonstrated in the production machine-learning credit assessment model?',
    facets: ['modelProcedure', 'modelTests'], evidence: ['E07'], approved: false,
    action: 'Escalate the live-model exposure; approve an appropriate procedure and perform documented testing.' },
  { id: 'R06', type: 'S', para: '16.15', page: 41, section: '3.6', owner: 'Head of Learning and Agent Oversight',
    question: 'Does training prepare relevant staff, representatives and agents to assist vulnerable consumers?',
    facets: ['employeeAttendance', 'allPersonnel', 'skills'], evidence: ['E08'], approved: true,
    action: 'Complete staff training, enrol outsourced agents and document the bank-required skills assessment.' },
  { id: 'R07', type: 'S', para: '16.19', page: 43, section: '3.7', owner: 'Head of CRM and Branch Operations',
    question: 'Are customer support needs recorded and available to relevant staff at service handoff?',
    facets: ['records', 'access'], evidence: ['E09'], approved: true,
    action: 'Agree and evidence a lawful interim recording and access process before relying on the future CRM release.' },
  { id: 'R08', type: 'S', para: '16.21', page: 43, section: '3.8', owner: 'Head of Service Operations',
    question: 'Do staff, representatives and agents have sufficient flexibility to respond to vulnerable-consumer needs?',
    facets: ['flexibility'], evidence: ['E10'], approved: true,
    action: 'Retain authority and exercise records; monitor practical use of the escalation route.' },
  { id: 'R09', type: 'S', para: '16.22', page: 43, section: '3.9', owner: 'Head of Contact Centre',
    question: 'Can customer service adapt to the needs of vulnerable consumers?',
    facets: ['adaptation'], evidence: ['E11'], approved: true,
    action: 'Retain deployment and operating tickets and check that adaptations remain available.' },
  { id: 'R10', type: 'S', para: '16.23', page: 43, section: '3.10', owner: 'Head of Customer Communications',
    question: 'Is accurate, accessible information about assistance available to vulnerable consumers?',
    facets: ['helpInformation', 'accurateChannels'], evidence: ['E12', 'E13'], approved: true,
    action: 'Correct unsupported assistance channels in the leaflet and evidence currently available information.' },
  { id: 'R11', type: 'S', para: '16.26', page: 44, section: '3.11', owner: 'Head of Customer Communications',
    question: 'Are lifecycle communications clear, periodically tested for effectiveness and accurate about available channels?',
    facets: ['clearTemplates', 'effectiveness', 'channelAwareness'], evidence: ['E12', 'E14'], approved: true,
    action: 'Correct channel claims and perform documented effectiveness testing rather than relying on template approval.' },
  { id: 'R12', type: 'S', para: '16.27', page: 45, section: '3.12', owner: 'Head of Conduct Risk',
    question: 'Are vulnerable-consumer outcomes monitored and evaluated, with improvements informed by results?',
    facets: ['monitoring', 'improvement'], evidence: ['E15'], approved: true,
    action: 'Establish an operating monitoring process and improvement records; seek a decision on the proposed budget.' },
  { id: 'R13', type: 'S', para: '16.28', page: 45, section: '3.13', owner: 'Head of Compliance Monitoring',
    question: 'Has the bank reviewed this policy document together with relevant related policy requirements?',
    facets: ['relatedReview'], evidence: ['E16'], approved: true,
    action: 'Obtain applicable related texts and versions, then complete and document the cross-policy review.' },
  { id: 'R14', type: 'S', para: '10.3(g)', page: 11, section: '3.14', owner: 'Chief Customer Experience Officer',
    question: 'Are accountability, policies and support for personnel assisting vulnerable consumers established?',
    facets: ['accountability'], evidence: ['E17'], approved: true,
    action: 'Retain Board authority and accountable-officer arrangements; do not infer implementation of other controls.' },
  { id: 'R15', type: 'G', para: '16.25', page: 44, section: '3.15', owner: 'Head of Channel Strategy',
    question: 'What would multiple communication channels contribute to support for vulnerable consumers?',
    facets: [], evidence: ['E12'], applicable: true,
    action: 'Discuss feasible channels as guidance; remove unsupported promises and do not impose an invented channel mandate.' },
  { id: 'R16', type: 'G', para: '16.8(g)', page: 40, section: '3.16', owner: 'Head of Bancassurance Partnerships / partner insurer or takaful operator',
    question: 'Does the longer free-look guidance for insurers and takaful operators apply to the bank as an underwriter?',
    facets: [], evidence: [], applicable: false,
    action: 'Retain a distribution handoff to the partner insurer or takaful operator for Legal confirmation; do not assign underwriting duties to the bank.' },
];

const record = (id, ref, owner, approval, date, attached, missing, validity, supports = {}, uncertain = []) =>
  ({ id, entity: CASE.entity, ref, owner, approval, date, attached, missing, validity, supports, uncertain });

export const EVIDENCE = [
  record('E01', 'MY-CX-NA-2025-01', 'Head of Customer Experience', 'Assessment v1.0 approved', '20 January 2025',
    'Signed needs assessment and policy-adoption record. Workshops covered retail products, branches, contact centre and outsourced servicing. Needs include more time, a trusted support person and information in a usable format. The assessment identifies owners and was incorporated into the approved policy.',
    'No later refresh is supplied; this record is not evidence that every downstream control is operating.',
    'Current Malaysian assessment within the review scope.', { R01: ['needs', 'policy'] }),
  record('E02', 'MY-HR-CIR-2025-03', 'Head of People Communications', 'Issued circular v1.0 with distribution extract', '3 March 2025',
    'Staff circular and dated intranet-distribution extract include the vulnerability policy, assistance routes and acknowledgement instructions. Recipient groups include branch and contact-centre teams, relevant representatives and outsourced servicing agents, and their managers. The distribution list and receipt acknowledgements are attached, not merely referred to.',
    'Distribution is not individual skills testing and does not replace the training population record.',
    'Current issued communication, linked to the Malaysian policy.', { R01: ['communication'] }),
  record('E03', 'MY-PROD-RA-2025-07', 'Head of Retail Products', 'Signed product approval v1.0', '10 March 2025',
    'Retail account refresh approval includes a completed needs-impact assessment, accessible service choices and a sign-off by Product, Customer Experience and Compliance. The signed decision records how the new retail product refresh addresses vulnerable-consumer needs and what features were revised before approval.',
    'The approval is for this product decision only, not every product in the bank.',
    'Current signed design decision, within the scoped product-design review.', { R02: ['design'] }),
  record('E04', 'MY-FEE-WAIVER-FEB25', 'Head of Retail Pricing', 'Operations-certified monthly extract v1', '28 February 2025',
    `Fee-waiver log records ${CASE.waivers} approved waivers for February, each with a reason, authorised reviewer and completion outcome. The supplied anonymised summary demonstrates actual use of individual relief safeguards. It records no customer identifiers and provides totals rather than customer-level financial data.`,
    'No current pricing or fee-structure review is attached; case relief alone does not demonstrate that review.',
    'Dated operating safeguard record; limited to the activity described.', { R03: ['safeguards'] }),
  record('E05', 'MY-HARDSHIP-INT-2024-02', 'Head of Retail Pricing', 'Interim guideline v0.9; expired, no extension', CASE.expired,
    'Interim hardship guideline includes a pricing-review checklist, escalation route and discretionary relief language. Its document-control panel expressly ends the authority on the expiry date. The pack retains the historical document because Pricing referred to it when preparing the implementation inventory.',
    'No renewal, current pricing review, replacement authority or signed extension is supplied.',
    'Expired; cannot establish a current pricing control.', {}),
  record('E06', 'MY-COLL-ATT-2025-03', 'Head of Collections', 'Signed management attestation v1', '12 March 2025',
    'The attestation states that collection calls avoid pressure selling and exploitative treatment and refers to a QA report as “to follow”. The signed assertion itself is attached. It contains no sampled call findings, testing population, exceptions or QA reviewer conclusions.',
    'The promised QA report and underlying conduct-check results are not attached.',
    'Authentic exercise attestation, but its operating claim cannot be verified from the pack.', {}, ['R04']),
  record('E07', 'MY-MODEL-VC-ANNEX-B', 'Head of Model Risk', 'Annex B v0.3 DRAFT; not approved', CASE.draftDate,
    'The draft annex proposes a polished fairness procedure for the machine-learning model already used in production retail credit assessment. It describes segmentation, proxy testing, challenge and escalation, but has an empty approval panel. The model is in production; the proposed annex is not.',
    'No approved model-specific procedure, executed fairness tests or completed independent challenge is attached.',
    'Draft only; proposed controls cannot be treated as approved or operating.', {}),
  record('E08', 'MY-LMS-VC-2025-03', 'Head of Learning and Agent Oversight', 'LMS attendance export v1; certified by Learning', '14 March 2025',
    `Attendance export shows ${CASE.trained.toLocaleString('en-US')} of ${CASE.employees.toLocaleString('en-US')} employees (${trainingPercent()}%) completed attendance; ${untrained()} have not. The separate population reconciliation lists ${CASE.agents} outsourced agents not yet enrolled. The export is attendance only. The bank policy requires demonstrated skills as well as attendance.`,
    'No skills-assessment results or agent completion records are attached. No regulatory assessment pass mark is asserted.',
    'Current but incomplete training evidence; populations must not be combined or omitted.', { R06: ['employeeAttendance'] }),
  record('E09', 'MY-CRM-CR2291', 'Head of CRM and Branch Operations', 'Change request and spreadsheet schema proposal v0.4', '11 March 2025',
    `CR2291 retains a ${CASE.crm} go-live target. An interim branch spreadsheet shows proposed fields for assistance preference, consent and handoff owner. It is a schema proposal only, with no filled operating records. No service team has been granted a handoff access route through that proposal.`,
    'No live CRM capability, interim operating records, granted staff access or completed handoff evidence is attached.',
    'Future project and design proposal, not an interim operating control.', {}),
  record('E10', 'MY-SVC-DAM-REV5', 'Head of Service Operations', 'Delegated Authority Matrix rev5 issued; signed pilot exercises', '5 March 2025',
    'Issued matrix authorises reasonable service flexibility, extra handling time and escalation outside standard scripts. Signed pilot exercise sheets show staff, representatives and agents using those authorities for support-person, pacing and appointment needs. Supervisors recorded the decision and the route used without unnecessary medical detail.',
    'The pilot is not a claim about all future customer encounters or all other readiness questions.',
    'Current authority with dated, signed exercises covering the relevant personnel categories.', { R08: ['flexibility'] }),
  record('E11', 'MY-CC-REL-2025-03', 'Head of Contact Centre', 'Release sign-off v1; UAT and operating tickets', '7 March 2025',
    'Deployment record confirms extended handling and callback options are enabled. Signed UAT and dated post-deployment operating tickets show an adviser using extra time and arranging a callback around a customer support need. Ticket summaries identify the workflow and supervisor review, without personal customer data.',
    'This release does not include WhatsApp or video relay and does not establish CRM needs-recording capability.',
    'Deployed service adaptations with corroborating operating records.', { R09: ['adaptation'] }),
  record('E12', 'MY-HELP-LEAFLET-2025-03', 'Head of Customer Communications', 'BM/EN print release v1 with distribution receipt', '10 March 2025',
    `Leaflet distribution receipts cover ${CASE.branches} branches. The Bahasa Melayu and English text gives accurate phone and branch assistance information, but also advertises WhatsApp and video-relay assistance. Those additional channels have no provider or funded deployment and are not available in 2025; see Steering Minutes M1.`,
    'No evidence supports the advertised digital assistance channels. The removal action remains open.',
    'Current distributed material contains both usable help information and unsupported channel claims.', { R10: ['helpInformation'] }),
  record('E13', 'MY-WEB-HELP-2025-01', 'Head of Digital Channels', 'Extra help webpage UAT plan v0.6', '11 March 2025',
    `The “Extra help” webpage has a UAT slot planned for ${CASE.webUat}. Attached materials are a content draft and test schedule only. Publishing remains contingent on test results and content approval. Neither a live service URL nor a successful production deployment record is included.`,
    'No currently live webpage or completed accessibility test is evidenced.',
    'Future plan, not current assistance availability.', {}),
  record('E14', 'MY-COMMS-LETTERS-2025-03', 'Head of Customer Communications', 'Three plain-language templates approved v1', '6 March 2025',
    `Approved letter templates cover joining, account servicing and closure, with plain-language explanations and assistance signposting. The attached approval records the wording review. Periodic effectiveness and comprehension testing is planned for ${CASE.testing}; no such test has yet been performed in this evidence pack.`,
    'No effectiveness results, comprehension testing or approved correction of the leaflet channel claims is attached.',
    'Approved lifecycle wording; testing remains future work.', { R11: ['clearTemplates'] }),
  record('E15', 'MY-CONDUCT-KPI-2025-02', 'Head of Conduct Risk', 'KPI and dashboard v0.2 proposal; CFO approval pending', '11 March 2025',
    `Proposal lists outcome measures, segmentation and an intended review cycle. The dashboard request is ${CASE.budgetLabel}, pending CFO decision, not an approved budget. The mock dashboard contains example headings only, not actual monitoring results. Steering Minutes M3 preserve the proposal as an unresolved decision.`,
    'No operating outcomes dashboard, monitoring return, evaluation or completed improvement record is attached.',
    'Unfunded proposal does not demonstrate operational monitoring.', {}),
  record('E16', 'MY-CMP-2025-PART-D', 'Head of Compliance Monitoring', 'Compliance Monitoring Plan approved v1', 'January 2025',
    `Approved plan schedules a Part D thematic review in ${CASE.testing}. Its cross-policy register labels related policy versions “TBC”. The plan does not contain those policy texts or a completed reconciliation with the FTFC requirements. It is an authorised work programme, not the resulting review.`,
    'Applicable related policy versions, underlying texts and a completed cross-policy review are absent.',
    'Related requirements cannot be verified from the attached source set.', {}, ['R13']),
  record('E17', 'MY-BOARD-MIN-2025-02', 'Company Secretary / Chief Customer Experience Officer', 'Approved Board minutes extract', CASE.policyApproval,
    `Board extract approves ${CASE.policyRef}, effective ${CASE.effective}, and names the Chief Customer Experience Officer (CCXO) accountable for the policy and support to relevant personnel. The approved organisation and escalation arrangements are included. The extract excludes Annex B from approval.`,
    'The minutes are not evidence of downstream deployment or testing; the budget proposal is not approved here.',
    'Current governance approval and accountable role are evidenced.', { R14: ['accountability'] }),
  { ...record('E18', 'ID-VC-Q4-2024 / ID-SOP-NR-v2', 'Kepala Kepatuhan Indonesia', 'Internal monitoring return and training record; SOP v2 approved', 'Q4 2024 / 1 January 2025',
    'Sister-entity pack includes strong employee and agent skills records, a reviewed outcomes dashboard and documented corrective follow-up. Its SOP is attached as file 05. The monitoring return and training summaries belong entirely to the separately licensed Indonesian entity and its customer and agent populations.',
    'No adoption, Malaysian population reconciliation or Malaysian execution evidence is supplied.',
    'Wrong legal entity and jurisdiction for proving Malaysian operation.', { R06: ['allPersonnel', 'skills'], R12: ['monitoring', 'improvement'] }), entity: CASE.sister },
];

export const TRAPS = [
  { id: 'T1', rows: ['R05'], citation: '03 §3.5, Annex B; 04 E07', check: 'A perfect draft annex is still unapproved and untested.' },
  { id: 'T2', rows: ['R04'], citation: '04 E06', check: 'An attestation without the promised QA report is not operating proof.' },
  { id: 'T3', rows: ['R03'], citation: '04 E04–E05; 02 §2', check: 'Expired hardship authority and fee waivers do not prove a current pricing review; issue and effective dates differ.' },
  { id: 'T4', rows: ['R15'], citation: '02 §2, R15', check: 'G guidance is not an S standard and stays out of the mandatory denominator.' },
  { id: 'T5', rows: ['R16'], citation: '01 §2; 02 R16; 03 §3.16', check: 'A distribution partner is not the insurer or takaful underwriter; retain the partner handoff.' },
  { id: 'T6', rows: ['R06', 'R12'], citation: '04 E18; 05 §1, §6', check: 'Indonesian training and monitoring cannot establish Malaysian operation.' },
  { id: 'T7', rows: ['R06'], citation: '03 §3.6; 04 E08', check: 'Attendance, unfinished employees, skills and unenrolled agents are distinct evidence questions.' },
  { id: 'T8', rows: ['R07', 'R10', 'R11', 'R12'], citation: '04 E09, E12–E15; M1–M3', check: 'Future CRM and web plans, unsupported leaflet channels and pending funding are not live controls.' },
];

export const STATUS_LABELS = ['Covered', 'Partial', 'Gap', 'Unverified', 'Guidance noted', 'N/A'];
export const DESIGN_LABELS = ['Approved', 'Draft', 'N/A'];
export const OPERATING_LABELS = ['Evidenced', 'Partial', 'Not evidenced', 'Unverifiable', 'N/A'];

export function assess(unit, evidence = EVIDENCE) {
  if (unit.type === 'G') return { design: 'N/A', operating: 'N/A', status: unit.applicable ? 'Guidance noted' : 'N/A' };
  const relevant = evidence.filter((e) => e.entity === CASE.entity && unit.evidence.includes(e.id));
  const supports = new Set(relevant.flatMap((e) => e.supports[unit.id] ?? []));
  const achieved = unit.facets.filter((f) => supports.has(f)).length;
  const uncertain = relevant.some((e) => e.uncertain.includes(unit.id));
  const design = unit.approved ? 'Approved' : 'Draft';
  const operating = achieved === unit.facets.length ? 'Evidenced' : achieved ? 'Partial' : uncertain ? 'Unverifiable' : 'Not evidenced';
  const status = !unit.approved ? 'Gap' : operating === 'Evidenced' ? 'Covered' : operating === 'Partial' ? 'Partial' : operating === 'Unverifiable' ? 'Unverified' : 'Gap';
  return { design, operating, status };
}

export const sourceLocator = (u) => `${SOURCE.reference}, ${u.type} ${u.para}, printed p.${u.page} (PDF p.${u.page + 1}); brief ${u.id}; effective under §4.1`;
export const policyLocator = (u) => `${FILES.policy}, §${u.section}`;
export const evidenceLocator = (u) => u.evidence.length ? `${FILES.evidence}, ${u.evidence.join(', ')}` : `${FILES.scope}, §2 (entity scope); ${FILES.policy}, §${u.section}`;
export const countBy = (rows, key, labels) => Object.fromEntries(labels.map((label) => [label, rows.filter((r) => r[key] === label).length]));

export function answerRows(units = REVIEW_UNITS, evidence = EVIDENCE) {
  return units.map((u) => {
    const assessment = assess(u, evidence);
    const missing = evidence.filter((e) => u.evidence.includes(e.id)).map((e) => `${e.id}: ${e.missing}`).join(' ');
    return {
      id: u.id, type: u.type, para: u.para, question: u.question,
      entity: CASE.entity, applicability: u.type === 'S' ? 'Scoped Malaysian bank standard' : u.applicable ? 'Guidance discussion only' : 'N/A to bank as underwriter; distribution handoff retained',
      issueDate: CASE.issued, effectiveDate: CASE.effectiveISO, change: 'Unknown — predecessor text not supplied',
      ...assessment, source: sourceLocator(u), sourceUrl: SOURCE.pdf,
      policy: policyLocator(u), evidence: evidenceLocator(u),
      rationale: u.type === 'G' ? u.action : `${assessment.design} design; ${assessment.operating.toLowerCase()} operating evidence. ${missing}`,
      owner: u.owner, action: `Proposed: ${u.action}`, target: 'Proposed target: for owner and Head of Compliance agreement; not committed',
      approval: 'Remediation approval pending; no action authorised by this register',
    };
  });
}

export function summary(rows = answerRows()) {
  return {
    total: rows.length, mandatory: rows.filter((r) => r.type === 'S').length, guidance: rows.filter((r) => r.type === 'G').length,
    status: countBy(rows, 'status', STATUS_LABELS),
    design: countBy(rows, 'design', DESIGN_LABELS),
    operating: countBy(rows, 'operating', OPERATING_LABELS),
    approvedNotCovered: rows.filter((r) => r.design === 'Approved' && r.status !== 'Covered').length,
  };
}
