// Design spec for kit x-contract-review-014 (contract review against the playbook). Single source of truth for
// the writers and the answer key. Everything is fictional. Research basis: Common Paper cloud agreement benchmarks,
// UU 24/2009 + Nine AM, UU PDP 27/2022 (Art. 46, 56), PDPA 2010 as amended (s.12B, s.129), BANI/SIAC/AIAC,
// Copilot in Word long-document guidance (see the scenario page source_refs).

export const PARTIES = {
  provider: { name: 'Tailspin Cloud Services Pte. Ltd.', short: 'Tailspin', uen: '201912345K', address: '10 Marina Boulevard, #28-01, Singapore 018983', site: 'tailspin-cloud.example' },
  cn01: { name: 'PT Contoso Niaga Nusantara Tbk', short: 'Contoso Niaga', address: 'Menara Contoso, Jl. Jend. Sudirman Kav. 99, Jakarta Selatan 12190, Indonesia' },
  cm01: { name: 'Contoso Niaga Malaysia Sdn. Bhd.', short: 'Contoso Niaga Malaysia', regno: '201801012345 (1275431-X)', address: 'Level 12, Menara Johor, Jalan Wong Ah Fook, 80000 Johor Bahru, Malaysia' },
};

export const DEAL = {
  product: 'Tailspin Managed Cloud Platform (Kubernetes hosting, managed PostgreSQL, observability) and 24x7 Managed Operations',
  purpose: 'Re-platform Portal Mitra (the B2B ordering portal for about 1,200 retail partners) and the data warehouse after the September P1 outage.',
  msaTitle: 'Tailspin Master Subscription and Managed Services Agreement',
  msaVersion: 'MSA v4.2 (ASEAN) dated 15 September 2026',
  onlineTermsUrl: 'https://tailspin-cloud.example/legal/service-terms',
  aupUrl: 'https://tailspin-cloud.example/legal/aup',
  subprocessorUrl: 'https://tailspin-cloud.example/legal/subprocessors',
  orderForms: [
    { id: 'TS-OF-2026-0417', entity: 'cn01', feesPerYearUsd: 1080000, termMonths: 36, start: '1 November 2026', region: 'Jakarta (ID-JKT-1) primary, Singapore (SG-1) disaster recovery',
      special: [
        'SC-1 Hosting location: Provider shall host all production Customer Data in its Jakarta region (ID-JKT-1). Disaster-recovery copies may be held in Singapore (SG-1).',
        'SC-2 Price hold: the Fees in this Order Form are fixed for the Initial Subscription Term.',
        'SC-3 Onboarding: Provider will complete migration of Portal Mitra by 31 January 2027.' ] },
    { id: 'TS-OF-2026-0418', entity: 'cm01', feesPerYearUsd: 144000, termMonths: 36, start: '1 November 2026', region: 'Singapore (SG-1)',
      special: [
        'SC-1 Stamp duty: Customer shall bear all stamp duty payable on this Order Form and the Agreement in Malaysia.',
        'SC-2 Support hours for the Johor Bahru hub are aligned to Malaysia time (UTC+8).' ] },
  ],
};

// Canonical defined terms: every writer uses exactly these (capitalised) and no others for the same concepts.
export const DEFINED_TERMS = ['Agreement', 'Affiliate', 'Acceptable Use Policy', 'Customer Data', 'Customer Content', 'Usage Data', 'Data Processing Addendum or DPA',
  'Documentation', 'Effective Date', 'Emergency Maintenance', 'Fees', 'Initial Subscription Term', 'Renewal Term', 'Subscription Term', 'Online Terms', 'Order Form',
  'Personal Data', 'Professional Services', 'Regulator', 'Scheduled Maintenance', 'Security Incident', 'Service Credits', 'Service Levels', 'Services', 'Special Conditions',
  'Subprocessor', 'Support Policy', 'Laws'];

// The negotiation issues. `where` = where the contract deals with it; `contract` = what the contract must say (writers
// must implement exactly this); `verdict` in {meets, fallback1, fallback2, beyond, redline, notAddressed}.
export const ISSUES = [
  { id: 'P01', topic: 'Order of precedence and online terms', where: ['MSA 1.3', 'MSA 1.4', 'Order Form SC-1, SC-2'], verdict: 'redline', approver: 'Not acceptable (exception: President Director on GC recommendation)',
    contract: '1.3 order of precedence: (a) Online Terms, (b) the body of this Agreement, (c) the Schedules, (d) the Order Form including Special Conditions. 1.4 Online Terms at the URL "as updated by Provider from time to time"; updates take effect when posted. Consequence: the negotiated Special Conditions in the Order Form (Jakarta hosting, price hold) rank last and are overridden by MSA 9.4 and 6.5.',
    standard: 'The signed documents govern. Order Form Special Conditions prevail over the MSA; the MSA prevails over any referenced online terms. No unilateral changes.',
    fallback1: 'Online terms only as a dated, versioned copy attached at signature; later changes apply only if they do not reduce Customer protections (Head of Legal).',
    fallback2: null, redline: 'Online terms that prevail over the signed agreement, or that the provider can change unilaterally.' },
  { id: 'P02', topic: 'Contract language (Indonesian entity)', where: ['MSA 22.9'], verdict: 'redline', approver: 'Not acceptable',
    contract: '22.9: Agreement in English only; English prevails; no Indonesian or other translation required; each party waives any challenge based on Law No. 24 of 2009 or Presidential Regulation No. 63 of 2019.',
    standard: 'For CN01: bilingual Indonesian and English, signed at the same time; English may prevail. For CM01: English is acceptable.',
    fallback1: 'Indonesian version delivered and signed within 30 days of signature, with an undertaking to cooperate (Head of Legal).', fallback2: null,
    redline: 'English-only agreement with an Indonesian party, or any waiver of Law 24/2009.' },
  { id: 'P03', topic: 'Term and renewal', where: ['MSA 4.2', 'MSA 4.3'], verdict: 'beyond', approver: 'General Counsel and CFO',
    contract: 'Initial Subscription Term per Order Form (36 months). 4.3: renews automatically for successive Renewal Terms of 36 months unless either party gives notice at least 90 days before the end of the current term.',
    standard: 'Initial term up to 36 months. Renewal only by written agreement.', fallback1: 'Automatic renewal for 12-month periods with at least 60 days notice and a written reminder from the provider 30 days before the notice deadline (Head of Legal).',
    fallback2: null, redline: null },
  { id: 'P04', topic: 'Price increases', where: ['MSA 6.5', 'Order Form SC-2'], verdict: 'beyond', approver: 'General Counsel and CFO',
    contract: '6.5: on each anniversary and each renewal, Provider may increase Fees by the greater of 9% or the CPI change, and at renewal may reset Fees to its then-current list price. Order Form SC-2 promises a price hold but ranks below 6.5 under 1.3.',
    standard: 'Fees fixed for the initial term. At renewal, increase capped at Indonesian CPI (BPS) and never more than 5%.', fallback1: 'Annual increase up to 5% from year 2 (CFO).',
    fallback2: 'Up to 7% at renewal only (General Counsel and CFO).', redline: null },
  { id: 'P05', topic: 'Payment terms', where: ['MSA 6.2'], verdict: 'meets', approver: 'Legal Counsel',
    contract: '6.2: invoices annually in advance; each correct and undisputed invoice payable within 30 days after receipt by Customer\'s accounts payable contact.', standard: 'Payment within 30 days of receipt of a correct invoice.', fallback1: '30 days from invoice date (Legal Counsel).',
    fallback2: null, redline: null, note: 'Red herring: a reviewer who reads quickly may flag payment terms; they meet the standard.' },
  { id: 'P06', topic: 'Suspension of service', where: ['MSA 11.1'], verdict: 'beyond', approver: 'General Counsel',
    contract: '11.1: (a) Provider may suspend all or any part of the Services immediately, with or without notice, if it reasonably suspects a breach of the Acceptable Use Policy or a threat to the Services (not limited to the affected component, no notice duty); (b) for non-payment only 5 days after written notice (shorter than the 15-day fallback).',
    standard: 'Suspension for non-payment only after 30 days written notice for undisputed amounts. Immediate suspension only for a genuine security emergency, limited to the affected component, with immediate notice.',
    fallback1: '15 days written notice for non-payment (Head of Legal).', fallback2: null, redline: 'Suspension of production systems without notice for commercial reasons.' },
  { id: 'P07', topic: 'Service levels and remedies', where: ['MSA 14.2', 'Schedule 1 (1.1, 2.2, 3.1, 3.3, 3.4, 4.1)'], verdict: 'beyond', approver: 'General Counsel and CISO',
    contract: 'Schedule 1: 99.5% monthly availability; excludes Scheduled Maintenance and Emergency Maintenance up to 8 hours per month; Service Credits 5% (below 99.5%) and 10% (below 99.0%) of the monthly fee, capped at 10%; claims within 15 days after month end; MSA 14.2: Service Credits are Customer\'s sole and exclusive remedy; no termination right for repeated failure.',
    standard: '99.9% monthly availability; credits up to 25% of the monthly fee; credits are not the sole remedy; right to terminate if availability is missed in 3 months out of any 6; claims within 60 days.',
    fallback1: '99.5% availability accepted only if credits are not the sole remedy AND the chronic-failure termination right is included (General Counsel and CISO).', fallback2: null, redline: null },
  { id: 'P08', topic: 'Limitation of liability (general cap)', where: ['MSA 13.2'], verdict: 'fallback1', approver: 'Head of Legal',
    contract: '13.2: each party\'s total aggregate liability is limited to the Fees paid or payable in the 12 months preceding the event giving rise to the claim.',
    standard: 'The greater of the Fees paid or payable in the 24 months preceding the claim, or USD 2,000,000.', fallback1: 'Fees paid or payable in the 12 months preceding the claim (Head of Legal).',
    fallback2: 'Fees paid or payable in the 12 months preceding the claim, with a minimum floor of USD 500,000 (General Counsel).', redline: 'Cap below 6 months of fees.' },
  { id: 'P09', topic: 'Excluded losses', where: ['MSA 13.1'], verdict: 'beyond', approver: 'General Counsel',
    contract: '13.1: neither party liable for indirect or consequential loss, "including loss or corruption of data, costs of restoring data, costs of procuring substitute services, and fines or penalties imposed by any Regulator".',
    standard: 'Costs of restoring data, breach notification and remediation costs, and regulatory fines caused by the provider\'s breach are recoverable direct losses.',
    fallback1: 'Same, but subject to the data-breach cap in P10 (General Counsel).', fallback2: null, redline: null },
  { id: 'P10', topic: 'Data breach liability', where: ['DPA 12.1', 'MSA 22.14 (override)'], verdict: 'redline', approver: 'Not acceptable',
    contract: 'DPA 12.1 looks good: liability for breach of the DPA capped at three times (3x) the cap in MSA 13.2. But MSA 22.14 (in the General clause): "Notwithstanding anything to the contrary in this Agreement, any Order Form or the DPA, Provider\'s total aggregate liability arising out of or in connection with any Security Incident or any breach of the DPA shall not exceed the Fees paid by Customer in the three (3) months immediately preceding the event giving rise to the claim." Net effect: data-breach cap is 3 months of fees, below the general cap.',
    standard: 'Uncapped, or a separate super-cap of at least 3x the general cap.', fallback1: 'Super-cap of 2x the general cap (General Counsel, CISO and DPO).', fallback2: null,
    redline: 'Any data-breach cap lower than the general cap.' },
  { id: 'P11', topic: 'Security incident notification', where: ['DPA 8.2'], verdict: 'redline', approver: 'Not acceptable (the clock starts at confirmation and can run past 72 hours); CISO and DPO to advise the General Counsel',
    contract: 'DPA 8.2: Provider notifies Customer without undue delay and in any event within seven (7) Business Days after Provider confirms a Security Incident.',
    standard: 'Notice within 24 hours of the provider becoming aware, with the information needed for Customer\'s own notifications (Indonesia: 3x24 hours to data subjects and the authority under UU PDP Art. 46; Malaysia: 72 hours to the Commissioner under PDPA s.12B).',
    fallback1: '48 hours from awareness (CISO and DPO).', fallback2: null, redline: 'Any clock that starts at "confirmation" or runs longer than 72 hours.' },
  { id: 'P12', topic: 'Data location, transfers and subprocessors', where: ['MSA 9.4', 'DPA 6.1', 'DPA 6.2', 'DPA 7.2', 'DPA Annex 3', 'Order Form SC-1'], verdict: 'beyond', approver: 'General Counsel and DPO',
    contract: 'MSA 9.4 and DPA 6.1: Provider and Subprocessors may store and process Customer Data in any country where they maintain facilities; DPA 6.2: Provider\'s standard transfer terms apply "where required"; DPA 7.2: new Subprocessors notified by updating the list at the URL, with 10 days email notice only for customers who subscribe to updates; Customer\'s only remedy is to terminate the affected Services without refund. Annex 3 lists subprocessors in Singapore, the United States, India and the Philippines. Order Form SC-1 promises Jakarta hosting but ranks last (P01).',
    standard: 'CN01 production data hosted in Indonesia; CM01 in Malaysia or Singapore. Transfers only with UU PDP Art. 56 safeguards / PDPA s.129 conditions, a transfer register and 30 days prior notice of new subprocessors with a right to object and terminate with a pro-rata refund.',
    fallback1: 'Hosting in Singapore for CN01 with documented Art. 56 safeguards, reporting support and a named, closed subprocessor list (General Counsel and DPO).', fallback2: null,
    redline: 'Unrestricted transfers to any country with no notice of new subprocessors.' },
  { id: 'P13', topic: 'Use of Customer Content for AI and product improvement', where: ['Online Terms 7.3 (incorporated by MSA 1.4)', 'MSA 9.5'], verdict: 'redline', approver: 'Not acceptable',
    contract: 'Online Terms 7.3: Provider may use Customer Content and Usage Data to develop, train and improve its products, services and machine learning models. MSA 9.5 only mentions Usage Data (aggregated). The AI clause is in the online terms, not the MSA.',
    standard: 'No use of Customer Content to train or improve any model or product. Usage Data only in aggregated, de-identified form for service operation.', fallback1: null, fallback2: null,
    redline: 'Any right to train models on Customer Content or Personal Data.' },
  { id: 'P14', topic: 'Exit, data return and transition', where: ['MSA 16.2', 'MSA 16.3'], verdict: 'beyond', approver: 'General Counsel and CISO',
    contract: '16.2: Customer Data available for export for 14 days after termination in Provider\'s standard export format, then deleted; 16.3: transition assistance at Provider\'s then-current Professional Services rates.',
    standard: '90 days to export in an open, documented format (CSV, JSON or Parquet for data; standard database dumps), deletion certificate afterwards; up to 6 months of transition assistance at contract rates.',
    fallback1: '60 days export window and transition assistance at contract rates for 3 months (Head of Legal).', fallback2: null, redline: null },
  { id: 'P15', topic: 'Termination for convenience', where: ['MSA 15.3'], verdict: 'beyond', approver: 'General Counsel and CFO',
    contract: '15.3: Customer may terminate for convenience on 90 days notice, but all Fees for the remainder of the Subscription Term become immediately due.',
    standard: 'After the first 12 months, termination for convenience on 90 days notice with no early termination fee.', fallback1: 'Early termination fee up to 50% of the remaining Fees (CFO).',
    fallback2: null, redline: null },
  { id: 'P16', topic: 'Audit and assurance', where: ['MSA 17.1', 'MSA 17.2'], verdict: 'fallback1', approver: 'Head of Legal',
    contract: '17.1: annual SOC 2 Type II report and ISO/IEC 27001 certificate on request; 17.2: on-site audit only where required by a Regulator or after a Security Incident affecting Customer Data, once a year, on 30 days notice, at Customer\'s cost.',
    standard: 'SOC 2 Type II and ISO 27001 reports, plus a right to audit once a year on 30 days notice.', fallback1: 'Reports, plus audits required by a Regulator and after a Security Incident (Head of Legal).',
    fallback2: null, redline: null },
  { id: 'P17', topic: 'Assignment and change of control', where: ['MSA 19.1', 'MSA 19.2'], verdict: 'beyond', approver: 'General Counsel',
    contract: '19.1: Customer may not assign without Provider consent, including to its Affiliates; 19.2: Provider may assign without consent to an Affiliate or to a successor in a merger, acquisition or change of control.',
    standard: 'Mutual consent for assignment; either party may assign to an Affiliate or successor with notice; Customer may terminate without penalty if Provider comes under the control of a competitor.',
    fallback1: 'Provider may assign to a successor with 30 days notice and Customer gets a termination right without fee (Head of Legal).', fallback2: null, redline: null },
  { id: 'P18', topic: 'Governing law and disputes', where: ['MSA 21.1', 'MSA 21.2'], verdict: 'fallback1', approver: 'Head of Legal',
    contract: '21.1: laws of Singapore; 21.2: SIAC arbitration seated in Singapore, one arbitrator, English.',
    standard: 'CN01: Indonesian law, BANI arbitration in Jakarta. CM01: Malaysian law, AIAC arbitration in Kuala Lumpur.',
    fallback1: 'Singapore law with SIAC arbitration seated in Singapore (Head of Legal). Note: enforcing the award in Indonesia needs an exequatur from the Central Jakarta District Court.',
    fallback2: null, redline: 'Foreign court jurisdiction (not arbitration) for CN01, because foreign court judgments are not enforceable in Indonesia.' },
  { id: 'P19', topic: 'Insurance', where: [], verdict: 'notAddressed', approver: 'Head of Legal',
    contract: 'The contract is silent on insurance. Do not include any insurance clause anywhere.',
    standard: 'Provider maintains cyber and technology errors-and-omissions insurance of at least USD 5,000,000 per claim and provides a certificate on request.',
    fallback1: 'USD 2,000,000 per claim (Head of Legal).', fallback2: null, redline: null },
];

// Red herrings: look risky but meet the playbook (a good review must not flag them as deviations).
export const RED_HERRINGS = [
  'MSA 12.1: Provider IP indemnity (standard, meets policy).',
  'MSA 6.2: 30-day payment (P05 meets).',
  'MSA 18: force majeure includes cyberattacks only where the Provider followed its security obligations (acceptable).',
];

export const PEOPLE = {
  requester: 'Charlotte Waltson, VP of Procurement', businessOwner: 'Lydia Bauer, Enterprise IT Architect', reviewer: 'you, Legal Counsel (Commercial)',
  headOfLegal: 'Siti Rahmawati, Head of Legal & Compliance', gc: 'Hendra Wijaya, General Counsel & Corporate Secretary', cfo: 'Andre Lawson, Chief Financial Officer',
  ciso: 'Indra Permana, Chief Information Security Officer', dpo: 'Cassandra Dunn, Compliance Manager and Data Protection Officer', vendorCounsel: 'Priya Raman, Senior Counsel APAC, Tailspin Cloud Services',
};

export const VERDICT_LABEL = { meets: 'Meets standard', fallback1: 'Within fallback 1', fallback2: 'Within fallback 2', beyond: 'Beyond fallback: escalate', redline: 'Red line', notAddressed: 'Not addressed' };

// Clause map of the MSA body (writers must use exactly these numbers and headings; sub-clauses listed are mandatory,
// others may be added in between as long as the listed numbers stay the same).
export const CLAUSE_MAP = [
  ['1', 'Definitions and interpretation', '1.1 definitions (use DEFINED_TERMS), 1.2 interpretation, 1.3 order of precedence (P01), 1.4 Online Terms (P01)'],
  ['2', 'Services', '2.1 provision, 2.2 Order Forms, 2.3 Documentation, 2.4 changes to Services (no material decrease in functionality during a Subscription Term: balanced)'],
  ['3', 'Affiliates', '3.1 Customer Affiliates may enter their own Order Forms; each Order Form is a separate contract incorporating this Agreement (CM01 joins this way)'],
  ['4', 'Term and renewal', '4.1 Agreement term, 4.2 Initial Subscription Term per Order Form, 4.3 automatic renewal 36 months / 90 days notice (P03)'],
  ['5', 'Customer responsibilities', '5.1 Acceptable Use Policy (by URL), 5.2 accounts and credentials, 5.3 Customer is responsible for its content'],
  ['6', 'Fees, invoicing and taxes', '6.1 Fees per Order Form, 6.2 annual invoices, payable 30 days from invoice date (P05), 6.3 late payment interest 1% per month, 6.4 taxes (fees exclusive of VAT/SST/withholding; gross-up), 6.5 fee increases greater of 9% or CPI + list-price reset at renewal (P04)'],
  ['7', 'Confidentiality', 'balanced mutual clause, 5 years survival'],
  ['8', 'Security', '8.1 Provider maintains the security measures in the Security Policy (Schedule 2 Annex 2), 8.2 Security Incidents are handled under the DPA'],
  ['9', 'Customer Data', '9.1 ownership stays with Customer, 9.2 Provider processes per the DPA, 9.3 backups daily with 7-day retention, 9.4 data location: any country where Provider or Subprocessors maintain facilities (P12), 9.5 Usage Data aggregated (P13 context)'],
  ['10', 'Intellectual property', 'balanced; feedback licence'],
  ['11', 'Suspension', '11.1 suspension with or without notice, 5 days late payment (P06), 11.2 restore promptly after cause resolved'],
  ['12', 'Warranties and indemnities', '12.1 Provider IP infringement indemnity (standard, red herring), 12.2 warranties (Services perform materially per Documentation), 12.3 disclaimer'],
  ['13', 'Limitation of liability', '13.1 excluded losses incl. loss of data, restoration costs, regulatory fines (P09), 13.2 general cap 12 months fees (P08), 13.3 exceptions (fraud, death/personal injury, payment obligations)'],
  ['14', 'Service levels', '14.1 Schedule 1 applies, 14.2 Service Credits are the sole and exclusive remedy (P07)'],
  ['15', 'Termination', '15.1 material breach 30 days cure, 15.2 insolvency, 15.3 Customer convenience 90 days but all remaining Fees due (P15)'],
  ['16', 'Effect of termination and exit', '16.1 accrued rights, 16.2 export window 14 days in standard export format then deletion (P14), 16.3 transition assistance at then-current rates (P14)'],
  ['17', 'Audit and assurance', '17.1 SOC 2 Type II + ISO 27001 on request, 17.2 on-site audit only if Regulator requires or after a Security Incident (P16)'],
  ['18', 'Force majeure', 'includes cyberattacks only where Provider complied with its security obligations (red herring: acceptable)'],
  ['19', 'Assignment and change of control', '19.1 Customer no assignment without consent incl. to Affiliates, 19.2 Provider may assign freely to Affiliate or successor (P17)'],
  ['20', 'Notices', 'email to legal notice addresses; Order Form contacts'],
  ['21', 'Governing law and dispute resolution', '21.1 Singapore law, 21.2 SIAC arbitration seated in Singapore, one arbitrator, English (P18), 21.3 escalation to senior executives for 30 days before arbitration'],
  ['22', 'General', '22.1 entire agreement, 22.2 amendments in writing (but see 1.4), 22.3 waiver, 22.4 severability, 22.5 independent contractors, 22.6 third-party rights, 22.7 counterparts and e-signature, 22.8 anti-bribery, 22.9 language: English only + waiver of Law 24/2009 and Perpres 63/2019 (P02), 22.10 export control, 22.11 publicity, 22.12 non-solicitation, 22.13 survival, 22.14 "Notwithstanding anything to the contrary..." data-breach cap of 3 months fees (P10)'],
];