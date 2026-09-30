const para = (text) => text.trim().split(/\n\s*\n/).map((s) => s.replace(/\s+/g, ' ').trim());

export const SCHEDULE1_SLA = [
  '# SCHEDULE 1: SERVICE LEVEL AGREEMENT',
  ...para(`
1.1 Provider will make the production Services available with Monthly Availability of at least 99.5% in each calendar month. This Service Level Agreement forms Schedule 1 to the Tailspin Master Subscription and Managed Services Agreement MSA v4.2 (ASEAN) and applies to the Services identified in an Order Form during the applicable Subscription Term. Capitalised terms not defined in this Schedule have the meanings given in the Agreement. This Schedule states the Service Levels, support response targets, claim process and Service Credits for the production instances of the Tailspin Managed Cloud Platform, managed PostgreSQL, observability and 24x7 Managed Operations purchased by Customer.

1.2 The Service Levels apply separately to each affected Service and, where an Order Form covers more than one Customer environment, separately to the production environment for the relevant Customer entity. Development, test, preview, sandbox, migration, Professional Services, beta features, third-party networks and Customer-operated components are not subject to the Monthly Availability commitment unless the Order Form expressly states otherwise. The commitment is an operational commitment only and is not a representation that the Services are uninterrupted, error-free or suitable for every Customer workflow.

1.3 The parties acknowledge that availability and support measurements are intended to provide a practical operational remedy for short interruptions to the Services. They do not change Customer's obligation to pay undisputed Fees in accordance with clause 6.2 of the Agreement, do not amend Customer responsibilities in clause 5, and do not create any service level warranty beyond the express terms of this Schedule and clause 14 of the Agreement.

2.1 Monthly Availability is measured by Provider's monitoring systems at the service edge for the affected Service. Availability for one Service does not determine availability for another Service, even where the Services are purchased under the same Order Form. Measurements exclude events described in clause 2.2 of this Schedule and are calculated after applying the Monthly Availability formula in this clause 2.

2.2 Monthly Availability means the percentage calculated for a calendar month using the following formula: Monthly Availability = ((Total Minutes in the Month - Excluded Minutes - Unavailable Minutes) / (Total Minutes in the Month - Excluded Minutes)) x 100. For this formula, Total Minutes in the Month means all minutes in the relevant calendar month, Excluded Minutes means minutes excluded under this clause 2.2, and Unavailable Minutes means minutes during which the affected Service is not capable of receiving and processing valid API requests or user sessions from the public service endpoint due to a failure of Provider-controlled systems. The following are excluded from Monthly Availability and do not give rise to Service Credits: (a) Scheduled Maintenance for which Provider gives at least five (5) days prior notice through the status page, email or the customer portal; (b) Emergency Maintenance, provided that Emergency Maintenance excluded under this paragraph will not exceed eight (8) hours in any calendar month for the affected Service; (c) acts or omissions of Customer, its Affiliates, users, contractors or agents, including configuration changes, unavailable Customer networks, identity provider failures, expired certificates, exhausted quotas, data corruption introduced by Customer, or failure to follow Documentation; (d) suspension permitted under clause 11.1 of the Agreement; (e) failures of third-party internet connectivity, telecommunications, domain name systems, public cloud services not controlled by Provider, or other services outside Provider's reasonable control; (f) force majeure events under clause 18 of the Agreement; (g) denial-of-service attacks, malware or security events where Provider has complied with the security measures required by the Agreement; and (h) beta, preview or trial features.

2.3 A minute is counted as unavailable only if more than fifty percent (50%) of valid synthetic transactions for the affected Service fail during that minute from at least two monitoring locations configured by Provider. Intermittent latency, degraded performance, isolated errors, individual database queries, rejected requests caused by quota, malformed traffic, rate limiting, maintenance windows and failures outside Provider-controlled systems do not count as Unavailable Minutes unless they render the affected Service unavailable under clause 2.2.

2.4 Scheduled Maintenance will be scheduled outside normal business hours for the primary hosting region where reasonably practicable. Provider may perform Emergency Maintenance without five (5) days prior notice where Provider reasonably determines that immediate action is required to protect the security, integrity, availability or legal compliance of the Services. Provider will use reasonable efforts to give prior notice of Emergency Maintenance, or prompt notice after commencement if prior notice is not practicable, and will keep the duration of Emergency Maintenance proportionate to the identified risk.

2.5 Provider's records of monitoring, incident management and maintenance notices will be the primary source for calculating Monthly Availability. Customer may submit reasonable evidence with a Service Credit claim, including timestamps, affected user groups, ticket numbers and diagnostic logs. If the parties' records differ, the parties will review them in good faith through the support escalation process, but no Service Credit is due unless the criteria in this Schedule are satisfied.

3.1 Subject to clauses 3.2 through 3.5 of this Schedule, if Monthly Availability for an affected Service in a calendar month is below the 99.5% commitment, Customer may claim the applicable Service Credit shown in the table below. Service Credits are calculated as a percentage of the monthly Fees for the affected Service only. If the Order Form states annual Fees, monthly Fees are one-twelfth of the annual Fees allocated to the affected Service.
  `),
  { table: [[
    'Monthly Availability for affected Service', 'Service Credit'
  ], [
    'Below 99.5% but equal to or above 99.0%', '5% of the monthly Fees for the affected Service'
  ], [
    'Below 99.0%', '10% of the monthly Fees for the affected Service'
  ]] },
  ...para(`
3.2 The aggregate Service Credits for all incidents, failures and claims relating to a calendar month will not exceed 10% of the monthly Fees for the affected Service. A Service Credit is calculated net of taxes, credits, discounts and one-time charges. Customer is not entitled to duplicate credits for the same event under more than one service level, service description or support plan.

3.3 To receive a Service Credit, Customer must submit a written claim to Provider within 15 days after the end of the calendar month in which the alleged failure occurred. The claim must identify the affected Service, Order Form, dates and times of the alleged unavailability, relevant support tickets, affected users or transactions, and reasonable supporting logs. Claims submitted after that 15 days period are forfeited and no Service Credit will be due for that month.

3.4 Service Credits will be applied only against future invoices for the affected Service under the same Order Form. Service Credits have no cash value, are not refundable, may not be transferred, and will not be paid as cash or set off against taxes, reimbursable expenses, Professional Services or amounts due under a different agreement. If no further invoice is due because the affected Order Form has expired or terminated, the unused Service Credit expires.

3.5 Service Credits are not available where Fees are overdue, where the affected Service is suspended in accordance with the Agreement, or where the event arose from an exclusion in clause 2.2. Provider may reject a claim if Customer materially fails to cooperate with the investigation or if Customer's own records demonstrate that the claimed unavailability did not satisfy the Monthly Availability definition.

4.1 The remedies in this Schedule are subject to clause 14.2 of the Agreement. Nothing in this Schedule grants Customer a right to terminate for chronic or repeated failure to meet a Service Level, and no additional remedy applies merely because a Service Level is missed in more than one month.

4.2 Support is available for incidents submitted through the customer portal, by email to support@tailspin-cloud.example, or by telephone for Severity 1 incidents. Provider will classify each request according to the descriptions below, taking into account the actual effect on production use of the Services. Provider may reclassify a ticket if the impact changes or if the initial classification is not supported by available information.
  `),
  { table: [[
    'Severity', 'Description', 'Initial response target', 'Support coverage'
  ], [
    'Severity 1', 'Critical production outage or material loss of core transaction processing for substantially all users of a production Service', '1 hour', '24x7, including public holidays'
  ], [
    'Severity 2', 'Major degradation of a production Service, material feature unavailable, or no reasonable workaround for a significant user group', '4 hours', '24x7 for initial triage; continued work according to impact'
  ], [
    'Severity 3', 'Non-critical production issue, minor degradation, single-user issue, configuration question, or workaround available', 'Next business day', 'Business hours in the applicable support region'
  ], [
    'Severity 4', 'General request, documentation question, enhancement request, administration task or planned change', '3 business days', 'Business hours in the applicable support region'
  ]] },
  ...para(`
4.3 Initial response means Provider's first substantive acknowledgement by a support engineer, incident manager or service desk analyst. It does not mean resolution, restoration, provision of a workaround or completion of a change. Response targets are measured from Provider's receipt of a complete support request containing sufficient information to begin triage. For Severity 1 incidents, Customer must remain available for joint troubleshooting and provide timely approvals for emergency changes where Customer approval is required.

4.4 Customer will use commercially reasonable efforts to classify tickets accurately, provide logs and reproduction steps, maintain current contact details, permit Provider to access relevant Service telemetry, and implement reasonable workarounds supplied by Provider. Customer's failure to provide required cooperation may pause response targets and may exclude affected minutes from the Monthly Availability calculation to the extent the failure prevents Provider from diagnosing or mitigating the incident.

4.5 Provider will use reasonable efforts to provide incident updates for Severity 1 incidents at least every two (2) hours until service restoration or severity reduction, and for Severity 2 incidents at reasonable intervals during active work. After a Severity 1 incident, Provider will provide a written summary of root cause, corrective actions and preventive measures within ten (10) Business Days after closure, unless the incident is caused by Customer-controlled systems or a third-party provider outside Provider's control.

5.1 Provider may revise operational procedures, monitoring locations, status page practices and support intake channels from time to time, provided that the revisions do not materially reduce the Service Levels during the then-current Subscription Term. Any material change to this Schedule must be made in accordance with the Agreement. This Schedule does not limit Provider's obligations under the DPA for Security Incidents or Customer Data, which are addressed separately in Schedule 2.

5.2 Where Customer purchases multiple SKUs under one Order Form, Provider may allocate Fees among affected Services based on the fee table, internal SKU allocation, consumption records or another reasonable method. That allocation is used only to calculate Service Credits and does not modify invoices, tax treatment or renewal pricing. Operational reports, incident summaries and root cause statements are supplied for service management and are not admissions of breach unless Provider expressly states so in writing.
  `),
];
export const SCHEDULE2_DPA = [
  '# SCHEDULE 2: DATA PROCESSING ADDENDUM',
  ...para(`
1.1 This Data Processing Addendum or DPA forms Schedule 2 to the Tailspin Master Subscription and Managed Services Agreement MSA v4.2 (ASEAN) and applies where Provider processes Personal Data contained in Customer Data in connection with the Services. This DPA is intended to allocate operational responsibilities between Customer and Provider for such processing. Capitalised terms not defined in this DPA have the meanings given in the Agreement.

1.2 In this DPA, Customer is the controller or equivalent decision-making party for Personal Data, and Provider is the processor or equivalent service provider acting on Customer's behalf. Where Customer acts as processor for another controller, Customer appoints Provider as sub-processor and remains responsible for ensuring that Customer has authority to give instructions to Provider. The parties will cooperate reasonably to reflect any equivalent concepts under applicable Data Protection Laws.

1.3 Customer determines the purposes and means of processing, the categories of Personal Data submitted to the Services, the lawful basis for processing, the contents of notices to data subjects, and the instructions given to Provider. Provider will not determine those purposes and means merely because it provides technical choices, configuration options, hosting locations or security controls within the Services.

2.1 Provider will process Customer Data only on documented instructions from Customer, including the Agreement, each Order Form, Documentation, Customer's configuration of the Services, support requests, written instructions through the customer portal, and other documented directions agreed by the parties. Provider may process Customer Data as necessary to provide, secure, monitor, support and improve the Services, to perform the Agreement, to comply with Laws, and as otherwise expressly permitted by this DPA or the Agreement.

2.2 If Provider reasonably believes an instruction infringes applicable Data Protection Laws, Provider will inform Customer unless prohibited by Law. Provider is not required to provide legal advice, assess Customer's lawful basis, monitor Customer's use of the Services, or determine whether Customer's instructions are appropriate for Customer's business, sector, data subjects or jurisdictions.

2.3 Customer will ensure that all Personal Data submitted to the Services has been collected and disclosed lawfully, that required notices and consents have been obtained, and that Customer's instructions comply with Data Protection Laws. Customer will not submit special categories of Personal Data, payment card primary account numbers, government identity images, health records, biometric templates, children's data or other regulated data unless the Order Form expressly permits that data and the parties have agreed any additional safeguards.

2.4 Provider may process Usage Data in accordance with the Agreement and the Online Terms, provided that this DPA governs Provider's processing of Personal Data contained in Customer Data where there is a conflict on data protection matters subject to clause 13.1 of this DPA.

3.1 Provider will ensure that personnel authorised to process Customer Data are bound by written confidentiality obligations or are subject to statutory confidentiality duties no less protective than those customarily imposed on personnel who handle confidential customer information. Those obligations will survive the end of their engagement to the extent permitted by Law.

3.2 Provider will restrict personnel access to Customer Data to those personnel who need access to provide, support, secure or operate the Services, to perform Professional Services, to respond to Customer requests, or to comply with Law. Provider will maintain reasonable processes for onboarding, access approval, role changes and offboarding of personnel with privileged access to production systems.

3.3 Provider remains responsible for its personnel's compliance with this DPA. Provider may use employees, contractors and consultants located in the countries where Provider or its Affiliates maintain facilities, subject to the transfer and Subprocessor provisions of this DPA. Provider will provide periodic privacy and security awareness training to personnel whose roles involve access to production systems or support records.

4.1 Taking into account the nature of the processing and the information available to Provider, Provider will provide reasonable assistance to Customer for Customer's response to requests by data subjects to exercise rights under applicable Data Protection Laws. Such assistance may include providing self-service export tools, correcting or deleting data through administrative features, retrieving records from backups in accordance with standard processes, or providing reasonable technical information.

4.2 Customer is responsible for receiving, authenticating and responding to data subject requests. Provider will not respond directly to a data subject request relating to Customer Data unless Customer instructs Provider to do so or Law requires Provider to respond. If Provider receives a request from a data subject relating to Customer Data, Provider will redirect the requester to Customer where practicable and legally permitted.

4.3 Assistance beyond standard features and support channels, including custom searches, restoration from archived backups, data transformation, bulk deletion, forensic support or preparation of formal response materials, may be treated as Professional Services and charged at Provider's then-current rates unless the Order Form states otherwise.

5.1 Taking into account the nature of processing and information available to Provider, Provider will provide reasonable assistance to Customer for Customer's obligations relating to data protection impact assessments, prior consultations, breach notifications and security of processing, in each case to the extent those obligations relate to Provider's processing of Customer Data under the Agreement.

5.2 Provider's assistance may include copies or summaries of security reports, descriptions of technical and organisational measures, answers to reasonable security questionnaires, information about Subprocessors, incident summaries and cooperation with Customer's risk assessments. Provider is not required to disclose information that would compromise the security of its systems, breach confidentiality obligations to other customers, reveal trade secrets, or exceed what is commercially reasonable for the Services purchased.

6.1 Customer acknowledges and agrees that Provider and Subprocessors may store, access, transfer and otherwise process Customer Data in any country where they maintain facilities, personnel or operations, including countries outside the country in which Customer or data subjects are located. Customer authorises those transfers for the purposes of providing, securing, supporting and improving the Services and performing the Agreement.

6.2 Where required by applicable Data Protection Laws, Provider's standard transfer terms apply to transfers of Personal Data under this DPA. Provider will make those standard transfer terms available on request or through the legal page for the Services. Customer authorises Provider to enter into such terms on Customer's behalf where necessary for onward transfers to Subprocessors.

6.3 Customer remains responsible for determining whether the Services, hosting regions, transfer mechanisms and Subprocessor locations are appropriate for Customer's use case. Provider will provide reasonable information about transfer locations and safeguards through the Documentation, security materials or subprocessor list, but Provider is not responsible for Customer's internal transfer register, customer notices or approvals unless expressly stated in an Order Form.

7.1 Customer grants Provider general authorisation to engage Subprocessors to process Customer Data for the purposes of providing, securing, supporting and improving the Services. Provider will enter into written agreements with Subprocessors imposing data protection obligations that are, in substance, no less protective than those in this DPA to the extent applicable to the nature of the services provided by the Subprocessor.

7.2 Provider will notify Customer of new Subprocessors by updating the list at https://tailspin-cloud.example/legal/subprocessors. Customers who subscribe to updates on that page will receive an email notification at least ten (10) days before a new Subprocessor begins processing Customer Data, except where an emergency replacement is required for security or continuity reasons. If Customer objects to a new Subprocessor on reasonable data protection grounds, Customer's only remedy is to terminate the affected Services without refund by written notice within thirty (30) days after the updated Subprocessor appears on that list. If Customer does not terminate within that period, Customer is deemed to have accepted the new Subprocessor.

7.3 Provider remains responsible for the performance of its Subprocessors' obligations to the same extent Provider would be responsible if performing the relevant processing itself, subject to the exclusions and limitations of liability in the Agreement. Provider may replace a Subprocessor where required for operational resilience, availability, security, legal compliance, commercial continuity or service improvement.

8.1 Provider will implement and maintain technical and organisational measures designed to protect Customer Data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access, as summarised in Annex 2. Those measures are intended to provide a level of security appropriate to the risk, taking into account the state of the art, costs of implementation, nature of processing and risks presented by the Services.

8.2 Provider will notify Customer without undue delay and in any event within seven (7) Business Days after Provider confirms a Security Incident. Notice may be given through the customer portal, email to Customer's security contact, or another agreed channel. Provider's notice will include information reasonably available to Provider at the time, which may include a description of the Security Incident, categories of Customer Data affected, known or likely consequences, measures taken or proposed, and contact point for follow-up.

8.3 Provider's obligation to notify is not an acknowledgement of fault or liability. Provider may provide information in phases as the investigation progresses. Customer is responsible for determining whether notification to data subjects, Regulators, business partners or other third parties is required, and for making any such notification. Provider will reasonably cooperate with Customer's notification efforts to the extent the notification relates to a confirmed Security Incident affecting Customer Data.

8.4 Customer will promptly notify Provider of any suspected compromise of Customer credentials, Customer systems, integrations, devices or networks that may affect the Services. Customer is responsible for maintaining appropriate security controls for its users, endpoints, identity providers, integrations, configurations and data uploaded to the Services.

9.1 Provider will make available to Customer, on reasonable request and subject to confidentiality, its then-current SOC 2 Type II report or bridge letter, ISO/IEC 27001 certificate or other substantially equivalent independent assurance materials for the Services. Provider may redact information that is not relevant to Customer, relates to other customers, would compromise security, or is commercially sensitive.

9.2 Customer agrees that the reports described in clause 9.1 are the primary audit mechanism for Provider's processing of Customer Data. If Customer reasonably requires additional information to demonstrate compliance with this DPA, Customer may submit a written request no more than once per year unless a Security Incident affecting Customer Data has occurred. Provider will respond through questionnaires, meetings or documentation as Provider reasonably considers appropriate.

9.3 On-site audits of Provider's facilities or systems are permitted only where required by a Regulator or after a Security Incident affecting Customer Data, and are subject to clause 17.2 of the Agreement. Any audit must be conducted on at least thirty (30) days prior notice, during normal business hours, in a manner that does not disrupt Provider's operations or compromise the security or confidentiality of other customers.

9.4 Customer will bear its own audit costs and reimburse Provider for reasonable time and expenses incurred in supporting any audit beyond provision of standard reports, unless the audit identifies a material breach of this DPA by Provider. Audit findings must be treated as Provider's Confidential Information and may be used only to assess compliance with this DPA.

10.1 During the Subscription Term, Customer may export Customer Data using the standard export functions of the Services. Customer is responsible for performing exports before expiry or termination and for validating that exported data is complete and usable for Customer's purposes.

10.2 Following expiry or termination of the applicable Order Form, Provider will make Customer Data available for export for fourteen (14) days in Provider's standard export format in accordance with clause 16.2 of the Agreement. After that fourteen (14) day period, Provider may delete Customer Data from active systems and will delete remaining copies in accordance with its standard deletion cycles, subject to backups, disaster recovery media, legal holds and records retained to comply with Law.

10.3 Customer may request return, deletion or a deletion confirmation through the customer portal. Provider is not required to retain Customer Data beyond the period stated in clause 10.2. Deletion from backups may occur on a delayed cycle, during which backups are protected from production use and overwritten in accordance with Provider's retention procedures.

11.1 Provider will reasonably cooperate with a Regulator in relation to Provider's processing of Customer Data where the cooperation is required by Law or where Customer reasonably requests assistance in connection with an inquiry relating to the Services. Provider may require the request to be in writing, to identify the legal basis for the inquiry, and to be limited to information relevant to Provider's processing of Customer Data.

11.2 If a Regulator contacts Provider directly regarding Customer Data, Provider may respond as required by Law and will notify Customer unless legally prohibited. Customer remains responsible for communications with Regulators concerning Customer's business, products, data subjects, lawful basis and instructions.

12.1 Provider's liability for breach of this DPA is limited to three times (3x) the limit in clause 13.2 of the Agreement. This clause 12.1 is subject to the exclusions, limitations, procedures and other liability provisions of the Agreement, including clause 13 of the Agreement.

12.2 Nothing in this DPA limits either party's liability to the extent such limitation is prohibited by Law. Claims under this DPA must be brought in accordance with the dispute resolution provisions of the Agreement. Service Credits under Schedule 1 do not apply to claims for breach of this DPA unless the same event independently satisfies Schedule 1.

13.1 If there is a conflict between this DPA and the MSA body regarding the processing of Personal Data, this DPA prevails for data protection matters subject to clause 1.3 of the Agreement. If there is a conflict between this DPA and an Order Form, the order of precedence in clause 1.3 of the Agreement applies unless the Order Form expressly amends this DPA by referring to the specific clause amended.

13.2 This DPA will remain in effect for as long as Provider processes Customer Data. Termination or expiry of an Order Form does not affect obligations that by their nature should survive, including confidentiality, deletion, audit record protection, liability and cooperation obligations relating to processing that occurred before termination or expiry.
  `),  '## Annex 1 - Processing Details',
  ...para(`
A1.1 Subject matter. Provider processes Customer Data to provide the Tailspin Managed Cloud Platform, managed PostgreSQL, observability, backup, managed operations, support, onboarding, migration assistance, security monitoring, incident response, billing administration and related Professional Services described in the Agreement and Order Forms. Processing also includes account administration, metering, invoicing, service health reporting, capacity planning and communications about operational matters.

A1.2 Duration. Processing begins when Customer first submits Customer Data to the Services or when Provider receives Customer Data during onboarding, and continues for the Subscription Term and any period during which Provider retains Customer Data for export, deletion, backup, legal compliance or dispute purposes in accordance with clause 10 of this DPA and clause 16.2 of the Agreement.

A1.3 Nature and purpose. Provider hosts, stores, transmits, retrieves, backs up, monitors, analyses, logs, secures, supports, restores, exports and deletes Customer Data as necessary to operate the Services. Provider also processes limited account, billing, support and Usage Data to administer the relationship, authenticate users, manage capacity, troubleshoot incidents, improve reliability and protect the Services.

A1.4 Categories of data subjects. The expected categories of data subjects are Customer's and Customer Affiliates' employees, contractors and authorised users; staff of retail partners, distributors, logistics providers and other business partners; end customers who interact with Customer's ordering or fulfilment processes; and individuals identified in support tickets, audit logs, order records, delivery records or communications submitted to the Services.

A1.5 Categories of Personal Data. The expected Personal Data includes names, business contact details, email addresses, telephone numbers, job titles, user identifiers, authentication metadata, IP addresses, device and browser information, delivery addresses, partner account identifiers, order history, order status, fulfilment information, support ticket content, operational logs and similar business records. No special categories of Personal Data are intended to be submitted to the Services.

A1.6 Frequency. Processing is continuous during operation of the Services, with additional processing during onboarding, migration, incident response, support, maintenance, backup, disaster recovery testing, service improvement and termination assistance. Some processing, such as log retention, backups and operational records, continues for limited periods after active use of the Services ends.

A1.7 Customer instructions. Customer's documented instructions include the Agreement, Order Forms, Customer configurations, role assignments, retention settings, data uploads, API calls, support tickets, written instructions in the customer portal, approved change requests and documented migration runbooks. Customer may update instructions by using Service features or by submitting written instructions accepted by Provider.
  `),
  '## Annex 2 - Security Policy Summary',
  ...para(`
A2.1 Governance. Provider maintains an information security management programme aligned to ISO/IEC 27001 and overseen by a security steering committee. The programme includes policies for access control, asset management, acceptable use, secure engineering, supplier management, incident response, business continuity, vulnerability management, logging, cryptography and personnel security. Provider maintains ISO/IEC 27001 certification for the core managed cloud operations scope.

A2.2 Access control. Provider uses role-based access controls, least privilege principles and documented approval workflows for access to production systems. Administrative access requires multi-factor authentication, is logged, and is reviewed periodically. Access is removed or adjusted following role changes, termination or completion of support activities. Customer controls its own user accounts, roles, credentials, identity provider and tenant configurations.

A2.3 Encryption. Provider encrypts Customer Data at rest using AES-256 or a substantially equivalent industry-standard algorithm for managed storage services. Customer Data in transit over public networks is protected using TLS 1.2 or higher where supported by the client and service endpoint. Encryption key management procedures include restricted access, separation of duties and key rotation practices appropriate to the service component.

A2.4 Network and platform security. Provider uses network segmentation, firewalls or security groups, hardened baseline images, configuration management, malware protection where appropriate, vulnerability scanning and secure administrative channels. Production changes follow change management procedures that include testing, approval and rollback planning proportionate to risk. Administrative connectivity is restricted and monitored according to the sensitivity of the environment.

A2.5 Logging and monitoring. Provider collects security, access, system and application logs for production services and monitors those logs for reliability, capacity, security events and operational anomalies. Logs are protected against unauthorised access and retained for periods determined by Provider's operational and compliance requirements. Customer-facing logs may be made available through standard Service features.

A2.6 Vulnerability management. Provider performs periodic vulnerability scanning, risk-based remediation, dependency review, threat monitoring and penetration testing or equivalent security assessments. Critical vulnerabilities affecting internet-facing production systems are prioritised for remediation based on exploitability, impact and available mitigations. Provider may apply Emergency Maintenance to address material security risk.

A2.7 Business continuity. Provider maintains business continuity and disaster recovery plans for core Services. The standard recovery point objective is twenty-four (24) hours and the standard recovery time objective is eight (8) hours for covered production platform components, subject to the architecture purchased, exclusions in the Agreement, and dependencies outside Provider's control. Plans are reviewed and tested periodically.

A2.8 Personnel and supplier controls. Provider performs background screening where permitted by Law and appropriate to role, requires security awareness training for personnel, and imposes confidentiality obligations. Suppliers that process Customer Data are assessed through a risk-based vendor management process and are subject to written contractual obligations. Provider maintains escalation contacts for material supplier incidents and may use supplier assurance reports as part of ongoing review.
  `),
  '## Annex 3 - Subprocessors',
  { table: [[
    'Subprocessor', 'Domain', 'Location', 'Processing activity'
  ], [
    'Straits Compute Grid Pte. Ltd.', 'straitscompute.example', 'Singapore', 'Primary cloud hosting, virtual compute, storage, managed network and disaster recovery infrastructure'
  ], [
    'Garuda Region Facilities PT Ltd.', 'garudaregion.example', 'Jakarta, Indonesia', 'Jakarta region colocation, physical hosting support and data centre operations'
  ], [
    'HarbourStack Database Services Pte. Ltd.', 'harbourstack.example', 'Singapore', 'Managed database replication, backup orchestration and platform support'
  ], [
    'Northstar Metrics LLC', 'northstarmetrics.example', 'United States', 'Observability SaaS, application telemetry, alerting, metrics and log analysis'
  ], [
    'Deccan Operations Support Private Limited', 'deccanops.example', 'India', '24x7 support centre, incident triage and managed operations escalation'
  ], [
    'Manila Ticketing Services Inc.', 'manilaticketing.example', 'Philippines', 'Support ticketing, customer communications workflow and service desk records'
  ], [
    'Pacific Mail Relay LLC', 'pacificmailrelay.example', 'United States', 'Transactional email delivery, service notices and notification routing'
  ], [
    'Equator Security Analytics Pte. Ltd.', 'equatorsec.example', 'Singapore', 'Security event correlation, vulnerability intelligence and managed detection support'
  ]] },
  ...para(`
A3.1 The table above is the Subprocessor list as of the Effective Date for the Services described in the Order Forms. Provider may update the list in accordance with clause 7.2 of this DPA. Subprocessors may process limited account, support, telemetry, log or Customer Data required for their listed activity and may access data remotely from the locations shown or other locations where they maintain facilities in accordance with clause 6.1.

A3.2 Customer may request additional information about a Subprocessor's role, location and safeguards through the customer portal. Provider may provide summaries, assurance materials or responses subject to confidentiality, security and commercial restrictions. Provider is not required to disclose full copies of subprocessor agreements or information that would compromise security or obligations to other customers.
  `),
];
export const ORDER_FORMS = [
  '# Order Form TS-OF-2026-0417',
  ...para(`
Tailspin Order Form ID: TS-OF-2026-0417. Customer: PT Contoso Niaga Nusantara Tbk, Menara Contoso, Jl. Jend. Sudirman Kav. 99, Jakarta Selatan 12190, Indonesia. Provider: Tailspin Cloud Services Pte. Ltd., UEN 201912345K, 10 Marina Boulevard, #28-01, Singapore 018983. Agreement: Tailspin Master Subscription and Managed Services Agreement MSA v4.2 (ASEAN) dated 15 September 2026. Effective date of this Order Form: the date of last signature below.

This Order Form is governed by the Tailspin Master Subscription and Managed Services Agreement MSA v4.2 (ASEAN), which is incorporated by reference. The Services are purchased for the re-platforming and managed operation of Portal Mitra, the B2B ordering portal and related data warehouse operated by Customer for retail partners. Capitalised terms not defined in this Order Form have the meanings given in the Agreement.

Customer contacts. Technical contact: Lydia Bauer, Enterprise IT Architect, lydia.bauer@contosoniaga.example, +62 21 5550 4100. Procurement contact: Charlotte Waltson, VP of Procurement, charlotte.waltson@contosoniaga.example, +62 21 5550 4101. Finance contact: Rudi Hartono, Finance Operations Manager, rudi.hartono@contosoniaga.example, +62 21 5550 4102. Security contact: Indra Permana, Chief Information Security Officer, indra.permana@contosoniaga.example.

Provider contacts. Account executive: Marcus Lee, Regional Account Director, marcus.lee@tailspin-cloud.example, +65 6800 1100. Service delivery manager: Amira Tan, Senior Service Delivery Manager, amira.tan@tailspin-cloud.example. Finance contact: billing-apac@tailspin-cloud.example. Legal notices: legal-notices@tailspin-cloud.example, with copy to Priya Raman, Senior Counsel APAC, priya.raman@tailspin-cloud.example.

Subscription Term. The Initial Subscription Term is thirty-six (36) months, commencing on 1 November 2026 and ending on 31 October 2029 unless renewed or terminated in accordance with the Agreement. Billing is annually in advance. Invoices are payable within thirty (30) days of invoice date under clause 6.2 of the Agreement. Fees are exclusive of VAT, withholding, bank charges and other taxes unless expressly stated otherwise.

Hosting region. The hosting region for production Services is Jakarta (ID-JKT-1) primary, Singapore (SG-1) disaster recovery, subject to the Agreement, the DPA and the Special Conditions below. Customer acknowledges that support, observability, ticketing, email delivery and managed operations components may be provided from other locations described in the Agreement, the Online Terms and the DPA.
  `),
  { table: [[
    'SKU', 'Service description', 'Quantity', 'Unit price', 'Annual Fees'
  ], [
    'TS-MCP-ID-ENT', 'Tailspin Managed Cloud Platform enterprise production cluster, Jakarta primary region', '1 platform', 'USD 420,000 per year', 'USD 420,000'
  ], [
    'TS-PG-MGD-XL', 'Managed PostgreSQL high availability database tier, production workloads', '4 database nodes', 'USD 72,000 per node per year', 'USD 288,000'
  ], [
    'TS-OBS-1200', 'Observability, log analytics and alerting for up to 1,200 partner tenants', '1,200 partner tenants', 'USD 150 per tenant per year', 'USD 180,000'
  ], [
    'TS-MOPS-24X7', '24x7 Managed Operations, incident response and platform administration', '1 managed operations package', 'USD 192,000 per year', 'USD 192,000'
  ], [
    '', 'Total annual Fees', '', '', 'USD 1,080,000'
  ]] },
  ...para(`
Special Conditions. SC-1 Hosting location: Provider shall host all production Customer Data in its Jakarta region (ID-JKT-1). Disaster-recovery copies may be held in Singapore (SG-1). SC-2 Price hold: the Fees in this Order Form are fixed for the Initial Subscription Term. SC-3 Onboarding: Provider will complete migration of Portal Mitra by 31 January 2027.

Implementation and assumptions. Customer will provide timely access to source systems, schema documentation, existing runbooks, network information, identity provider configuration, test users and business validation resources. Provider's migration obligation in SC-3 assumes that Customer provides required dependencies within agreed timelines and that material changes to scope, data model or security architecture are managed through the change process in the Agreement.

Commercial terms. Annual Fees for the first contract year are USD 1,080,000. The same annual Fees apply for each remaining year of the Initial Subscription Term subject to the Special Conditions and the Agreement. Usage beyond quantities stated in the table, additional environments, bespoke Professional Services, additional storage, excess log ingestion and out-of-scope migration activities are chargeable under a separate Order Form or approved change request.

Purchase administration. Customer will issue purchase orders for internal processing only. No purchase order term, supplier portal term or invoice processing condition modifies the Agreement, this Order Form or the Online Terms. Provider may include the Order Form ID, purchase order number, billing period and tax references on invoices. Customer must send billing questions to the Provider finance contact within fifteen (15) days of invoice date.

Service management. The parties will hold weekly migration governance meetings until production cutover and monthly service review meetings thereafter. Service review materials may include incident summaries, capacity trends, support ticket statistics, change calendars, action registers and commercial status. Meeting minutes are operational records and do not amend this Order Form unless signed by authorised representatives of both parties.

Signature blocks. For Customer: PT Contoso Niaga Nusantara Tbk. Name: ______________________________. Title: ______________________________. Signature: __________________________. Date: ______________________________. For Provider: Tailspin Cloud Services Pte. Ltd. Name: ______________________________. Title: ______________________________. Signature: __________________________. Date: ______________________________.
  `),
  { pageBreak: true },
  '# Order Form TS-OF-2026-0418',
  ...para(`
Tailspin Order Form ID: TS-OF-2026-0418. Customer: Contoso Niaga Malaysia Sdn. Bhd., registration number 201801012345 (1275431-X), Level 12, Menara Johor, Jalan Wong Ah Fook, 80000 Johor Bahru, Malaysia. Provider: Tailspin Cloud Services Pte. Ltd., UEN 201912345K, 10 Marina Boulevard, #28-01, Singapore 018983. Agreement: Tailspin Master Subscription and Managed Services Agreement MSA v4.2 (ASEAN) dated 15 September 2026.

This Order Form is governed by the Tailspin Master Subscription and Managed Services Agreement MSA v4.2 (ASEAN), which is incorporated by reference. This Order Form is entered by Customer as an Affiliate customer for the Johor Bahru hub and related Malaysia partner operations. Each Order Form is a separate contract incorporating the Agreement, and the Services under this Order Form are separately metered, invoiced and supported.

Customer contacts. Technical contact: Farah Lim, Regional Systems Manager, farah.lim@contosoniaga-my.example, +60 7 555 1200. Business contact: Daniel Omar, Head of Partner Operations, daniel.omar@contosoniaga-my.example. Finance contact: Mei Tan, Finance Controller, mei.tan@contosoniaga-my.example. Security contact: Cassandra Dunn, Compliance Manager and Data Protection Officer, cassandra.dunn@contosoniaga-my.example.

Provider contacts. Account executive: Marcus Lee, Regional Account Director, marcus.lee@tailspin-cloud.example, +65 6800 1100. Service delivery manager: Amira Tan, Senior Service Delivery Manager, amira.tan@tailspin-cloud.example. Finance contact: billing-apac@tailspin-cloud.example. Legal notices: legal-notices@tailspin-cloud.example, with copy to Priya Raman, Senior Counsel APAC, priya.raman@tailspin-cloud.example.

Subscription Term. The Initial Subscription Term is thirty-six (36) months, commencing on 1 November 2026 and ending on 31 October 2029 unless renewed or terminated in accordance with the Agreement. Billing is annually in advance in USD. Invoices are payable within thirty (30) days of invoice date under clause 6.2 of the Agreement. Fees are exclusive of SST, withholding, bank charges, duties and other taxes unless expressly stated otherwise.

Hosting region. The hosting region for production Services under this Order Form is Singapore (SG-1). Customer will connect Malaysia partner operations to the Singapore-hosted environment using Customer-managed network connectivity and identity services. Provider will provide support in accordance with the Agreement, Schedule 1 and the Malaysia-time support Special Condition below.
  `),
  { table: [[
    'SKU', 'Service description', 'Quantity', 'Unit price', 'Annual Fees'
  ], [
    'TS-MCP-SG-STD', 'Tailspin Managed Cloud Platform standard production cluster, Singapore region', '1 platform', 'USD 60,000 per year', 'USD 60,000'
  ], [
    'TS-PG-MGD-M', 'Managed PostgreSQL medium availability database tier', '2 database nodes', 'USD 18,000 per node per year', 'USD 36,000'
  ], [
    'TS-OBS-150', 'Observability, log analytics and alerting for up to 150 partner tenants', '150 partner tenants', 'USD 120 per tenant per year', 'USD 18,000'
  ], [
    'TS-MOPS-BIZPLUS', 'Managed Operations package with Malaysia-time coordination', '1 package', 'USD 30,000 per year', 'USD 30,000'
  ], [
    '', 'Total annual Fees', '', '', 'USD 144,000'
  ]] },
  ...para(`
Special Conditions. SC-1 Stamp duty: Customer shall bear all stamp duty payable on this Order Form and the Agreement in Malaysia. SC-2 Support hours for the Johor Bahru hub are aligned to Malaysia time (UTC+8).

Implementation and assumptions. Customer will designate a single Malaysia project manager, provide site connectivity information, complete user acceptance testing for partner workflows, and coordinate with the Indonesian programme team for shared integration decisions. Any request to add production capacity, move hosting regions, create additional environments or perform local data migration beyond the table above will require an approved change request or separate Order Form.

Commercial terms. Annual Fees for the first contract year are USD 144,000. The same annual Fees apply for each remaining year of the Initial Subscription Term subject to the Special Conditions and the Agreement. Fees for additional partner tenants, excess storage, bespoke reports, custom integrations, additional support entitlements and Professional Services are excluded unless expressly listed in the fee table.

Purchase administration. Customer will provide any required purchase order details before the first invoice. A delay in issuing a purchase order does not delay the Subscription Term start date, Service commencement or payment due date unless Provider expressly agrees in writing. Customer remains responsible for local duties, taxes, approvals and internal governance required to process payment.

Service management. The parties will use Malaysia time for Johor Bahru support coordination, weekly implementation check-ins and monthly operational reviews. Provider may consolidate platform-level reporting with the Indonesian programme where appropriate, provided that invoices, tickets and commercial records for this Order Form remain separately identifiable.

Signature blocks. For Customer: Contoso Niaga Malaysia Sdn. Bhd. Name: ______________________________. Title: ______________________________. Signature: __________________________. Date: ______________________________. For Provider: Tailspin Cloud Services Pte. Ltd. Name: ______________________________. Title: ______________________________. Signature: __________________________. Date: ______________________________.
  `),
];
export const ONLINE_TERMS = [
  '# Tailspin Service Terms',
  'Tailspin Service Terms (version 2026.3, last updated 1 August 2026). Printed from the web on 28 September 2026 from https://tailspin-cloud.example/legal/service-terms.',
  ...para(`
1. Scope. These Tailspin Service Terms are Online Terms for the Services made available by Tailspin Cloud Services Pte. Ltd. They apply to Customer's access to and use of Tailspin managed cloud, database, observability, support, portal, API, documentation and related service features. These Service Terms supplement the Agreement and each Order Form. If an Order Form identifies a specific Service, these Service Terms apply to that Service unless the Order Form expressly excludes them.

1.2 These Service Terms are written for standard cloud services used by business customers. They do not create a dedicated environment, bespoke security control, professional service deliverable, development commitment or regulatory undertaking unless the applicable Order Form says so. Capitalised terms not defined here have the meanings given in the Agreement. Service-specific attachments, support policies, acceptable use materials, subprocessor lists, security summaries and documentation pages may provide additional operational details for particular Services.

2. Accounts and administration. Customer is responsible for all activity under its accounts, API keys, tokens, identity integrations and administrator roles. Customer must keep account information current, protect credentials, configure appropriate access controls, and promptly disable access for users who no longer require the Services. Provider may rely on instructions submitted through authenticated accounts as Customer instructions.

2.2 Customer must ensure that its users comply with the Agreement, Documentation, Acceptable Use Policy and these Service Terms. Customer is responsible for Customer Content, configuration choices, retention settings, firewall rules, identity provider settings, integration endpoints, data mapping, workflow approvals and business decisions made through the Services. Customer must maintain current administrator contacts and emergency contacts in the customer portal.

3. Acceptable use. Customer must not use the Services to send unlawful, harmful, deceptive or infringing content; interfere with the integrity or security of the Services; probe or scan systems without authorisation; introduce malware; attempt to bypass usage limits; scrape or harvest data in violation of Law; or use the Services to operate critical safety systems where failure could lead to death, personal injury or severe environmental damage.

3.2 Provider may investigate suspected misuse and may remove or disable access to Customer Content or accounts where Provider reasonably believes action is necessary to protect the Services, comply with Law, or prevent harm to Provider, customers, users or third parties. Suspension and restoration are addressed in the Agreement. Customer must cooperate with Provider's investigation of misuse, including by preserving logs and identifying affected users where reasonably requested.

4. Service descriptions and documentation. Provider may publish Documentation, service descriptions, product guides, API references, release notes, security summaries and operational materials for the Services. Customer is responsible for reviewing applicable Documentation and using the Services in accordance with supported configurations, limits and instructions. Documentation is intended to describe operation of the Services and is not a legal warranty unless expressly incorporated into an Order Form.

4.2 Provider may make changes to the Services from time to time, including changes to features, user interfaces, APIs, dependencies, regions, limits and operational procedures. Provider will not materially decrease the core functionality of a generally available paid Service during the then-current Subscription Term, except where necessary for security, legal compliance, third-party dependency changes, end-of-life components or urgent operational reasons. Provider may provide notices of material changes through release notes, the customer portal or email.

5. Beta features. Provider may offer alpha, beta, preview, pilot, experimental or early access features. Beta features are provided as-is, may be modified or discontinued at any time, may be subject to additional limits, may not be covered by Service Levels, and should not be used for production workloads unless Provider expressly states otherwise. Customer uses beta features at its own risk.

5.2 Customer feedback about beta features may be used by Provider without restriction to improve the Services, develop roadmaps, fix defects, create documentation and evaluate market demand. Provider is not obligated to make any beta feature generally available or to preserve data stored only in a beta feature. Provider may require separate enablement, additional authentication, additional terms or technical prerequisites before Customer accesses beta features.

6. Third-party components. The Services may include, connect to or interoperate with third-party software, open source components, marketplaces, APIs, telecommunications networks, public internet services, certificate authorities, registries, email relays, observability tools and customer-selected integrations. Provider is not responsible for third-party services outside Provider's control, even if the Services interoperate with them or Provider provides configuration guidance.

6.2 Open source components included in the Services are licensed under their applicable open source licences. To the extent an open source licence requires terms that are inconsistent with these Service Terms, the open source licence controls for that component only. Customer must obtain its own licences for third-party software or services that Customer chooses to connect to the Services. Provider may update or replace components for security, supportability or performance reasons.

7. Data and AI. This section describes certain data rights and operational uses that apply in addition to the DPA where applicable. Customer retains ownership of Customer Content. Provider may host, copy, transmit, cache, index, transform and display Customer Content as necessary to provide, secure, support, troubleshoot and operate the Services, comply with Law, enforce the Agreement, and protect the Services and users.

7.1 Usage Data. Provider may collect Usage Data about configuration, consumption, performance, capacity, errors, telemetry, user activity, feature use, API calls, support interactions, device and browser attributes, approximate location derived from IP address, and operational events. Provider may use Usage Data to administer accounts, calculate fees, monitor availability, improve reliability, plan capacity, prevent abuse, provide support and develop service analytics.

7.2 Aggregated statistics. Provider may create aggregated or de-identified statistics from Customer Content, Usage Data and operational records, provided the statistics do not identify Customer or any individual. Provider may use and disclose those statistics for benchmarking, security research, product planning, marketing, reporting, financial analysis and service improvement. Aggregated statistics may be retained after termination of the Agreement.

7.3 Provider may use Customer Content and Usage Data to develop, train, test and improve its products, services and machine learning models. Provider applies internal controls designed to reduce unauthorised disclosure of Customer Content during such activities, but Customer is responsible for ensuring that Customer's submission of Customer Content to the Services is permitted for these purposes.

7.4 Customer may configure available retention, deletion, logging and export settings. Provider may retain copies of Customer Content in backups, logs, caches and security records for limited periods in accordance with standard retention practices. Deletion from active systems does not immediately remove all copies from backup or disaster recovery media. Customer should use available export tools before deleting content or terminating Services.

8. Support policy. Provider provides support through the customer portal, support email and other channels described in the Documentation or Order Form. Support covers incidents, configuration questions, billing routing, service requests and reasonable troubleshooting for supported Services. Provider may require Customer to provide logs, screenshots, timestamps, affected user details, reproduction steps and approval for changes.

8.2 Support does not include development of Customer applications, custom code review, end-user training, data cleansing, correction of Customer Content, third-party product administration, on-site support, or work outside supported configurations unless purchased as Professional Services. Provider may close tickets that are inactive, duplicated, resolved, outside scope or awaiting Customer information for an extended period. Response targets, if any, are stated in the applicable service level schedule or support plan.

9. Security and operational practices. Provider maintains administrative, technical and physical safeguards designed to protect the Services. Customer remains responsible for endpoint security, user access, identity provider controls, network connectivity, Customer Content, local backups, business continuity plans and compliance decisions. Security features must be configured by Customer where they are optional or tenant-specific.

9.2 Provider may monitor use of the Services for security, reliability, abuse prevention, capacity management and compliance with these Service Terms. Customer must not disable, interfere with or falsify monitoring, logging or metering mechanisms. Provider may throttle, rate limit or restrict traffic that threatens the integrity, security or availability of the Services. Provider may also block traffic from known malicious sources or unsupported clients.

10. Fees, metering and limits. Some Services are subject to usage limits, storage limits, retention limits, API limits, seat quantities, log ingestion limits, fair use thresholds or other entitlements. Provider may measure consumption using its systems. Usage beyond purchased quantities may be rejected, throttled, suspended or charged at the applicable rates in the Order Form, Documentation or then-current price list.

10.2 Customer is responsible for monitoring consumption and configuring alerts where available. Provider may provide dashboards or reports, but those materials are informational and do not amend invoice obligations. Free, trial or promotional credits may expire, may be subject to additional terms, and may be withdrawn if Customer violates the Agreement or these Service Terms. Provider may require an updated Order Form before enabling materially higher capacity.

11. Changes to these terms. Provider may update these Service Terms at any time by posting a revised version; the revised version applies from the date of posting. Provider may identify the version number and last updated date on the web page. Customer is responsible for reviewing the Service Terms periodically and ensuring that its use of the Services remains compliant.

11.2 Continued use of the Services after posting of revised Service Terms constitutes acceptance of the revised version. If Customer does not agree to a revised version, Customer must stop using the affected Services and may exercise any termination right expressly available under the Agreement. No purchase order, portal note, email footer or other Customer document modifies these Service Terms unless signed by Provider's authorised signatory.

12. General provisions. Provider may provide notices about these Service Terms through the website, customer portal, email, status page or Documentation. If any provision of these Service Terms is unenforceable, the remaining provisions remain in effect. Provider's failure to enforce a provision is not a waiver. Headings are for convenience only and do not affect interpretation.

12.2 These Service Terms are part of the Online Terms referenced in the Agreement. They do not amend an Order Form except as provided by the Agreement's order of precedence and online terms provisions. If Provider publishes translated or regional explanatory materials, the English version of these Service Terms controls unless the Agreement expressly states otherwise. Archived versions may be made available for reference but do not apply after a revised version is posted.

12.3 Customer should retain a copy of the version that applies on the date of signature for its own records. Provider's publication of examples, frequently asked questions, implementation guides or informal notes does not vary these Service Terms unless the material expressly states that it is a binding addendum issued by Provider's legal department.
  `),
];