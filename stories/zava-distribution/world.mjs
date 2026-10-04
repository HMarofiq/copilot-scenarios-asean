// World: PT Zava Niaga Nusantara (fictional). The canon for every episode set in this world.
// Writers must not contradict anything here. Dates are day offsets from D0 (the demo day), written as {{d:N:FORMAT}}.
// Canonical D0 for the first seeding: Wednesday 30 September 2026. The world is set at the end of Q3; arcs assume
// the demo day falls in late September or October.

export const WORLD = {
  key: 'zava-distribution',
  tz: 'Asia/Jakarta', utcOffset: 7,
  company: {
    legalName: 'PT Zava Niaga Nusantara',
    shortName: 'Zava Niaga',
    what: 'B2B distributor of consumer electronics and home appliances to modern retail chains across Indonesia, with a Malaysian hub.',
    size: 'About 2,400 employees; revenue about IDR 9.8 trillion a year.',
    hq: 'Menara Zava, Jakarta Selatan (fictional).',
    sites: [
      'Distribution centre Cikarang (largest)', 'Distribution centre Surabaya', 'Distribution centre Medan',
      'Johor Bahru hub, run by subsidiary Zava Niaga Malaysia Sdn. Bhd. (serves Malaysian and Singapore retail)',
    ],
    fiscalYear: 'Calendar year. Q4 re-forecast runs in the first week of October.',
    languages: 'Head office works in Bahasa Indonesia with English for finance, security and anything that goes to the regional office. The Johor hub and Malaysian vendors write in Bahasa Melayu or English.',
    emailDomainNote: 'Internal people use their real demo-tenant addresses. Outside organisations use fictional .example domains.',
  },

  systems: {
    erp: 'SAP ECC 6.0 today; moving to SAP S/4HANA in "Proyek Nusa" (go-live this coming weekend).',
    portal: 'Portal Mitra: the B2B ordering portal used by about 1,200 retail partners. Runs behind an API gateway that talks to the ERP.',
    wms: 'Warehouse management system at the three DCs.',
    itsm: 'IT service desk portal (tickets INC/CHG/PRB numbers).',
    m365: 'Microsoft 365: Outlook, Teams, SharePoint, OneDrive, Planner.',
    datawarehouse: 'Data warehouse and BI dashboards (weekly IT operations dashboard).',
  },

  orgs: {
    wingtip: { name: 'PT Wingtip Retail Nusantara', domain: 'wingtip-retail.example', what: 'Largest retail partner: 180 stores, about 14% of Zava Niaga revenue. Orders through Portal Mitra.' },
    northwind: { name: 'Northwind Supply Sdn Bhd', domain: 'northwind-supply.example', what: 'Network and WAN integrator for the Johor Bahru hub.' },
    litware: { name: 'PT Litware Data Center', domain: 'litware-dc.example', what: 'Colocation provider (primary data centre, Cibitung).' },
    proseware: { name: 'PT Proseware Tenaga Ahli', domain: 'proseware-ta.example', what: 'IT staffing vendor; supplies contractors for Proyek Nusa.' },
    techweek: { name: 'TechWeek Nusantara', domain: 'techweek-nusantara.example', what: 'Tech industry newsletter.' },
    pulse: { name: 'Customer Pulse Research', domain: 'pulse-research.example', what: 'Survey panel company (spam-ish).' },
    serverparts: { name: 'Server Parts Direct', domain: 'serverparts-direct.example', what: 'Hardware reseller that sends marketing.' },
    tikethemat: { name: 'Tiket Hemat', domain: 'tikethemat.example', what: 'Travel promotions.' },
    phish: { name: 'fake "IT Helpdesk"', domain: 'zavva-helpdesk.example', what: 'Lookalike domain used for a phishing attempt (double v in zavva).' },
  },

  // Arcs: the running stories. Every seeded item belongs to one arc. Numbers here are canon.
  arcs: {
    outage: {
      title: 'P1 outage of Portal Mitra and the customer fallout',
      facts: [
        'P1 incident INC-2026-0914-001 on {{d:-16:id}}, 09:12 to 12:05 WIB (2 hours 53 minutes). Portal Mitra could not submit orders.',
        'Root cause: the internal mTLS certificate between the API gateway and the ERP connector expired; the auto-renew job had failed silently for 9 days. Failover to the standby gateway did not trigger because it used the same certificate.',
        'Impact: 1,146 partner orders failed or were queued; 212 of them from Wingtip; about IDR 3.1 billion of order value delayed by 1 to 3 days.',
        'Restored by manually renewing the certificate. Post-incident review (PIR) held {{d:-9:id}}, led by Lydia Bauer.',
        'Corrective actions: (1) certificate expiry monitoring with 30/14/7-day alerts, done; (2) separate certificates for standby gateway, done; (3) quarterly failover test, first one scheduled for {{d:+21:id-short}}; (4) partner notification playbook, in progress (owner: Mona Kane with Lydia).',
        'Problem record PRB-2026-0031 closed by Problem Management on {{d:-1:id}}.',
        'Fallout: a Wingtip store order for a home-delivered refrigerator was re-queued and delivered 3 days late; the end customer complained publicly and to Wingtip. Wingtip escalates on the morning of D0.',
      ],
    },
    board: {
      title: 'Direksi (board of directors) meeting at 14.00 on D0',
      facts: [
        'Adelia presents an operations update to the Direksi at 14.00 on D0. She needs from Carlos by 12.00: September uptime per system, the P1 summary with corrective actions, and the go/no-go status of Proyek Nusa.',
        'September uptime (target 99.90% for all): Portal Mitra 99.58%; SAP ECC 99.97%; WMS 99.95%; Microsoft 365 99.99%; Johor WAN link 99.71% (two link flaps); Data warehouse 99.90%.',
        'September incidents: 5 in total (1 P1, 2 P2, 2 P3). The two P2s: WMS slow picking screens at Surabaya ({{d:-23:id-short}}, 47 min) and Johor WAN link flap ({{d:-11:id-short}}, 38 min).',
        'Lydia keeps these numbers in Uptime_Insiden_Sep2026.xlsx; the last week of Johor data was still pending until D-1.',
      ],
    },
    cutover: {
      title: 'Proyek Nusa: SAP S/4HANA cutover weekend',
      facts: [
        'Change freeze from {{d:+2:id}} 18:00. Cutover from {{d:+3:id}} 06:00 to {{d:+4:id}} 18:00. Go/no-go call {{d:+2:day-id}} 16:00.',
        'Kian Lambert is cutover lead; Lydia Bauer owns infrastructure; Serena Davis owns Portal Mitra regression tests.',
        'Saturday needs overtime for 9 internal staff plus 12 contractors from PT Proseware Tenaga Ahli at IDR 3,200,000 per person per day (IDR 38,400,000 for the contractors). Proseware needs written confirmation by 16.00 on D0, so the team asks Carlos to approve by 15.00.',
        'Runbook: "Cutover runbook v3.xlsx" (Kian). Mock cutover 2 on {{d:-4:id-short}} ran 31 hours against a 36-hour window.',
      ],
    },
    reforecast: {
      title: 'Q4 re-forecast',
      facts: [
        'Andre Lawson (CFO) runs the Q4 re-forecast. Division inputs due {{d:+1:id}} 10:00; Babak Shammas consolidates that afternoon.',
        'IT opex year to date is 6% over budget, mainly cloud consumption after the Portal Mitra load increase. The reserved-instance renewal in November could save about IDR 410 million a year.',
        'Template: Q4_Reforecast_Template_IT.xlsx, split into licences, cloud, and staff and contractors, October to December.',
      ],
    },
    litwarePO: {
      title: 'Colocation purchase order',
      facts: [
        'PO 4500123881 to PT Litware Data Center, IDR 486,500,000: Q4 colocation for 12 racks plus 2 new cross-connects. Requested by Lydia Bauer. Waiting for Carlos\'s approval in SAP; the approval request expires at 17.00 on D0, after which it must be re-submitted and the Q4 rate lock is lost.',
        'Unrelated: PO 4500123790, IDR 74,250,000, software maintenance renewal, already approved by Andre Lawson on D-1.',
      ],
    },
    johor: {
      title: 'Johor Bahru hub network work (Northwind Supply)',
      facts: [
        'Northwind proposes four maintenance windows in October at the Johor hub: every Tuesday 23.00 to 02.00 MYT (22.00 to 01.00 WIB), starting {{d:+6:ms}}. Needs Zava Niaga\'s confirmation by {{d:+1:ms}} to book field engineers.',
        'Replacement core routers shipped: shipment MY-2211 left Port Klang on D-1, ETA Tanjung Priok {{d:+2:en-short}}.',
        'Tan Mei Ling is Northwind\'s project manager for the Johor account.',
      ],
    },
    vendorEval: { title: 'Annual vendor evaluation', facts: ['Charlotte Waltson (VP Procurement) needs the annual evaluation of PT Litware Data Center from Carlos by {{d:+5:en}}, in the procurement portal (5 criteria, 1 to 5 scores, comments required below 3).'] },
    security: {
      title: 'Security hygiene',
      facts: [
        'Quarterly user access review for IT systems due {{d:+2:en}}; Carlos must certify access for his 4 direct reports and 23 service accounts.',
        'Security awareness month: this week\'s theme is phishing that imitates the IT helpdesk and password expiry.',
        'Zava Niaga never asks for passwords by email; password changes happen only in the self-service portal.',
      ],
    },
    hr: { title: 'Mid-year performance cycle', facts: ['Mid-year review window closes {{d:+2:en}}. Carlos has 4 direct reports: Lydia Bauer, Kian Lambert, Sarah Perez, Elvia Atkins.'] },
    closing: { title: 'September closing', facts: ['Accruals due {{d:+2:en}}; final September numbers {{d:+7:en}}. Divisions only act if they have open POs above IDR 100 million without goods receipt.'] },
    qbr: { title: 'Wingtip quarterly business review', facts: ['Wingtip proposes QBR options: {{d:+13:id}}, {{d:+15:id}} or {{d:+20:id}}, 10.00 at Wingtip head office. They want Carlos there because of the outage.'] },
    maintenanceSlot: { title: 'Portal maintenance slot', facts: ['On D-2 Carlos confirmed to Wingtip a Portal Mitra maintenance slot on D0 from 23.00 to 01.00 WIB; Wingtip acknowledged on D-1.'] },
    tooling: { title: 'Developer tooling budget', facts: ['Kian proposes 4 additional CI runners and 6 developer tool licences, IDR 312 million a year, to shorten release pipelines after the outage (build queue waits average 42 minutes).'] },
    portalQuality: { title: 'Portal Mitra quality', facts: ['Load test on D-1 passed at 3x peak (2,700 orders per hour) with p95 response 1.8 s. Sprint 19 review held D-1.'] },
    comms: { title: 'Company announcements', facts: ['Q4 national holidays and cuti bersama announced by Corporate Communications. Town hall held D-2; recording posted.'] },
  },
};
