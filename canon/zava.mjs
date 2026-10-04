// ZAVA GROUP CANON: the single fictional company behind every scenario that needs a company name.
// Kits import from here; never hard-code a Zava entity, person or external party name in a kit.
// Status: APPROVED by Huda on 4 Oct 2026, including the three DECISION defaults below.

export const RULES = [
  'Name the company only when the work product needs it (deck, board paper, report, contract, policy pack, tender, minutes).',
  'Scenarios that run on the user\'s own data (email, calendar, chats, meetings) use NO company: the prompt must fit anyone, any department, any industry.',
  'Prompts never contain a company name. They name the role and refer to "the fictional company in the attached files". Only kit files carry names.',
  'One name, one person: a person exists once in the whole group (see PEOPLE). Reuse them across scenarios instead of inventing look-alikes.',
  'Outside parties (vendors, customers, carriers, advisers, lenders, targets) are never Zava entities. Use EXTERNAL; their domains end in .example.',
  'Every kit file keeps the FICTIONAL DEMO DATA banner. Phones use 555. No real customer, regulator decision or real person.',
  'Governance words follow the entity\'s country: Indonesia Direksi / Dewan Komisaris / RUPS; Malaysia Board of Directors / Board committees / AGM; Singapore Board.',
  'Currency follows the operating company (IDR, MYR); only Zava Holdings reports group figures in USD.',
];

// DECISION 1 (head office): thin Singapore parent, two listed regional sub-holdings, operating companies below.
export const GROUP = {
  name: 'Zava Group',
  parent: { key: 'parent', legal: 'Zava Holdings Pte. Ltd.', city: 'Singapore', role: 'Group head office: strategy, capital allocation, group risk, group CFO. Reports in USD.', domain: 'zava.example' },
  subHoldings: [
    { key: 'zid', legal: 'PT Zava Indonesia Tbk', short: 'Zava Indonesia', city: 'Jakarta (Menara Zava, Jakarta Selatan)', listed: 'Indonesia Stock Exchange (fictional listing)', governance: 'Direksi and Dewan Komisaris', currency: 'IDR' },
    { key: 'zmy', legal: 'Zava Malaysia Berhad', short: 'Zava Malaysia', city: 'Kuala Lumpur (Zava Tower, KL Sentral)', listed: 'Bursa Malaysia Main Market (fictional listing)', governance: 'Board of Directors', currency: 'MYR' },
  ],
  size: 'About 38,000 employees in Indonesia, Malaysia and Singapore; group revenue about USD 6.1 billion (2025).',
  fiscalYear: 'Calendar year. Quarterly Business Reviews in the second week after quarter end; RKAP / annual budget approved in December.',
  languages: 'Indonesian entities work in Bahasa Indonesia with English for group reporting; Malaysian entities in English and Bahasa Melayu; the parent in English.',
};

// Business arms. `replaces` records the old fictional names each arm absorbs (migration map).
export const ARMS = {
  distribution: {
    name: 'Zava Distribution', what: 'B2B distribution of consumer electronics and home appliances to modern retail chains.',
    entities: [
      { key: 'zniaga', legal: 'PT Zava Niaga Nusantara', parent: 'zid', sites: ['DC Cikarang (largest)', 'DC Surabaya', 'DC Medan'] },
      { key: 'zniagamy', legal: 'Zava Niaga Malaysia Sdn. Bhd.', parent: 'zmy', sites: ['Johor Bahru hub (serves Malaysia and Singapore retail)'] },
    ],
    replaces: ['Contoso Niaga (PT Contoso Niaga Nusantara, Contoso Niaga Malaysia Sdn Bhd)'],
    scenarios: ['x-mgmt-report-011', 'x-contract-review-014', 'x-report-deck-017', 'demo world for /demo-story and /demo-hydrate'],
  },
  financial: {
    name: 'Zava Financial', what: 'Retail and SME banking, general insurance, insurance and takaful distribution.',
    entities: [
      { key: 'zbankmy', legal: 'Zava Bank Malaysia Berhad', parent: 'zmy', note: 'Licensed bank (fictional). Distributes partner insurance and takaful; not an underwriter.' },
      { key: 'zbankid', legal: 'PT Bank Zava Indonesia', parent: 'zid', note: 'Commercial bank (fictional), 140 branches.' },
      { key: 'zasuransi', legal: 'PT Zava Asuransi Umum', parent: 'zid', note: 'General insurer: motor, property, marine cargo.' },
    ],
    replaces: ['Contoso Bank Malaysia Berhad', 'PT Bank Contoso Indonesia'],
    scenarios: ['bfsi-reg-gap-001', 'bfsi-branch-recon-002', 'bfsi-claims-012'],
  },
  energy: {
    name: 'Zava Energy & Resources', what: 'Nickel mining, palm oil plantations and mills, captive power.',
    entities: [
      { key: 'ztambang', legal: 'PT Zava Tambang Sulawesi', parent: 'zid', sites: ['Zava Nickel Mine, Sulawesi Tengah', 'Zava Smelter, Sulawesi Tengah', 'Zava Jetty and Port, Sulawesi Tengah'] },
      { key: 'zagro', legal: 'PT Zava Agro Lestari', parent: 'zid', sites: ['Zava Estate 1, Central Kalimantan', 'Zava Estate 2, Central Kalimantan', 'Zava Mill 1, Central Kalimantan'] },
      { key: 'zagromy', legal: 'Zava Agro Sabah Sdn. Bhd.', parent: 'zmy', sites: ['Zava Estate 3, Sabah', 'Zava Estate 5, Sabah', 'Zava Mill 3, Sabah', 'Zava Bulking Terminal, Sabah'] },
    ],
    replaces: ['Northwind (mining and plantation sites)'],
    scenarios: ['enr-hse-incident-005', 'enr-permit-watch-006', 'enr-induction-007', 'enr-maint-backlog-009'],
  },
  connect: {
    name: 'Zava Connect', what: 'Mobile, fixed broadband (FTTH) and enterprise connectivity.',
    entities: [
      { key: 'zseluler', legal: 'PT Zava Seluler Indonesia', parent: 'zid', brands: ['Zava Home (FTTH)', 'Merdeka Unlimited (prepaid)'] },
      { key: 'zconnectmy', legal: 'Zava Connect Malaysia Sdn. Bhd.', parent: 'zmy', brands: ['Zava 5G'] },
    ],
    replaces: ['Relecloud (PT Relecloud Nusantara Tbk, PT Relecloud Seluler Indonesia, Relecloud Malaysia)'],
    scenarios: ['tel-mkt-board-016'],
  },
  // DECISION 2 (government / state-owned scenarios): a state-linked arm, so state-enterprise rules apply credibly.
  infrastructure: {
    name: 'Zava Logistics & Infrastructure', what: 'Ports, trucking, warehousing and cold chain. Majority-owned by a fictional state investment fund, so state-enterprise procurement and governance rules apply.',
    entities: [
      { key: 'zlogistik', legal: 'PT Zava Logistik Nusantara', parent: 'zid', ownership: '51% Dana Kelola Nusantara (fictional state investment fund), 49% PT Zava Indonesia Tbk', governance: 'Direksi and Dewan Komisaris; RKAP; procurement under state-enterprise rules (KAK, HPS)', subsidiaries: ['PT Zava Pelabuhan Nusantara', 'PT Zava Truk Ekspres', 'PT Zava Gudang Logistik Tbk', 'PT Zava Depo Kontainer'], note: 'No cold-chain business yet: buying one is the board-paper scenario (Proyek Kutub).' },
      { key: 'zgudang', legal: 'PT Zava Gudang Logistik Tbk', parent: 'zlogistik', ticker: 'ZGLD', ownership: '65% PT Zava Logistik Nusantara, 35% public (fictional listing)', governance: 'Direksi and Dewan Komisaris with independent commissioners; listed-company rules apply', note: 'Dry logistics hubs (Cikarang, Surabaya, Medan, Makassar).' },
      { key: 'zinframy', legal: 'Zava Infra Malaysia Sdn. Bhd.', parent: 'zmy', ownership: '51% Dana Infrastruktur Malaysia (fictional government-linked fund), 49% Zava Malaysia Berhad', governance: 'GLC-style Board' },
    ],
    replaces: ['Fabrikam (PT Fabrikam Logistik Tbk, PT Fabrikam Nusantara and its subsidiaries)'],
    scenarios: ['gov-tor-kak-010', 'gov-board-paper-013'],
  },
  holding: {
    name: 'Zava Indonesia (sub-holding)', what: 'PT Zava Indonesia Tbk as a multi-sector holding: Direksi meetings, group KPI pack and the portfolio review of its Indonesian subsidiaries.',
    entities: [],
    replaces: ['Fabrikam Holding Group'],
    scenarios: ['gov-risalah-003', 'gov-portfolio-004', 'gov-kpi-narrative-008'],
  },
};
// Room to add later: Zava Health (hospitals, pharmacy), Zava Manufacturing, Zava Property.

// People. One name, one person. Minor background names inside a single kit (e.g. a picker list) need not be listed,
// but must never reuse a canon name. `alias` = existing demo-tenant user (the demo tenant is already branded Zava).
export const PEOPLE = [
  // Zava Distribution leadership = the demo-tenant users of the story world (stories/, /demo-story, /demo-hydrate).
  { name: 'Adelia Chin', title: 'President Director, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'achin', scenarios: ['x-report-deck-017'] },
  { name: 'Andre Lawson', title: 'Chief Financial Officer, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'AndreL', scenarios: ['x-mgmt-report-011', 'x-report-deck-017', 'x-contract-review-014'] },
  { name: 'Carlos Slattery', title: 'Chief Technology Officer, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'CarlosS', note: 'Main demo user' },
  { name: 'Indra Permana', title: 'Chief Information Security Officer, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'indrapr', scenarios: ['x-contract-review-014'] },
  { name: 'Cecil Folk', title: 'Chief Marketing & Communications Officer, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'CecilF', scenarios: ['x-mgmt-report-011'] },
  { name: 'Mona Kane', title: 'Chief Sales Officer, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'MonaK', scenarios: ['x-mgmt-report-011'] },
  { name: 'Elvia Atkins', title: 'Data Platform Lead, PT Zava Niaga Nusantara', entity: 'zniaga', alias: 'ElviaA' },
  { name: 'Babak Shammas', title: 'Head of Financial Consolidation, Zava Distribution', entity: 'zniaga', alias: 'BabakS', scenarios: ['x-mgmt-report-011'] },
  { name: 'Charlotte Waltson', title: 'VP of Procurement, Zava Distribution', entity: 'zniaga', alias: 'CharlotteW', scenarios: ['x-contract-review-014'] },
  { name: 'Lydia Bauer', title: 'Head of Infrastructure & SRE, Zava Distribution', entity: 'zniaga', alias: 'LydiaB', scenarios: ['x-mgmt-report-011', 'x-contract-review-014'] },
  { name: 'Kian Lambert', title: 'Application Development Manager (Proyek Nusa)', entity: 'zniaga', alias: 'KianL' },
  { name: 'Yusuf Hakim', title: 'Chief of Staff to the President Director, PT Zava Niaga Nusantara', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Putri Anggraini', title: 'Business Planning Manager, Office of the COO, PT Zava Niaga Nusantara', entity: 'zniaga', scenarios: ['x-report-deck-017'], note: 'Was Nadia Rahman in 017 (name clashed with 016).' },
  { name: 'Dimas Pratama', title: 'Head of Distribution Operations', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Rudi Santoso', title: 'Operations Controller', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Farah Aziz', title: 'Head, Johor Bahru hub, Zava Niaga Malaysia', entity: 'zniagamy', scenarios: ['x-report-deck-017', 'x-mgmt-report-011'] },
  { name: 'Bambang Wijaya', title: 'DC Cikarang Head', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Lestari Putri', title: 'DC Surabaya Head', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Hendra Siregar', title: 'DC Medan Head', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Agus Setiadi', title: 'Shift Supervisor, DC Surabaya (named only in a report appendix that must stay out of decks)', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  // Zava Financial
  { name: 'Nurul Aina Rahman', title: 'Senior Manager, Regulatory Compliance Advisory, Zava Bank Malaysia Berhad', entity: 'zbankmy', scenarios: ['bfsi-reg-gap-001'] },
  { name: 'Hafiz Ismail', title: 'Head of Compliance, Zava Bank Malaysia Berhad', entity: 'zbankmy' },
  { name: 'Teguh Saputra', title: 'Branch Operations Manager, PT Bank Zava Indonesia', entity: 'zbankid', scenarios: ['bfsi-branch-recon-002'] },
  { name: 'Melati Kurniawan', title: 'Motor Claims Handler, PT Zava Asuransi Umum', entity: 'zasuransi', scenarios: ['bfsi-claims-012'] },
  // Zava Energy & Resources
  { name: 'Agung Prasetyo', title: 'HSE Superintendent, PT Zava Tambang Sulawesi', entity: 'ztambang', scenarios: ['enr-hse-incident-005', 'enr-induction-007'] },
  { name: 'Wayan Sudarma', title: 'Maintenance Planner, PT Zava Tambang Sulawesi', entity: 'ztambang', scenarios: ['enr-maint-backlog-009'] },
  { name: 'Siti Aminah', title: 'Permits & Compliance Officer, Zava Energy & Resources', entity: 'zagro', scenarios: ['enr-permit-watch-006'] },
  { name: 'Jason Lim', title: 'Estate Manager, Zava Agro Sabah', entity: 'zagromy' },
  // Zava Connect
  { name: 'Dewi Kartika', title: 'Chief Marketing Officer, PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'] },
  { name: 'Anisa Putri', title: 'Marketing Performance Manager, Group Marketing, PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'], note: 'Was Nadia Rahman in 016.' },
  { name: 'Aisyah Kamal', title: 'Head of Marketing, Zava Connect Malaysia', entity: 'zconnectmy', scenarios: ['tel-mkt-board-016'], note: 'Was Farah Aziz in 016.' },
  { name: 'Wulan Sasmita', title: 'President Director (Direktur Utama), PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'], note: 'Was "Bu Ratna" in 016.' },
  { name: 'Bonar Simanjuntak', title: 'Finance Director, PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'], note: 'Was "Pak Hendra" in 016.' },
  { name: 'Budi Hartono', title: 'Head of Revenue Assurance & Fraud Management, PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'] },
  { name: 'Sinta Wulandari', title: 'Senior Counsel, Legal & Regulatory, PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'] },
  { name: 'Rizky Ananda', title: 'BI & Data Platform Lead, PT Zava Seluler Indonesia', entity: 'zseluler', scenarios: ['tel-mkt-board-016'], note: 'Was Elvia Atkins in 016 (Elvia is a distribution demo-tenant user).' },
  // Zava Logistics & Infrastructure
  { name: 'Laras Pratiwi', title: 'Independent Commissioner, PT Zava Gudang Logistik Tbk', entity: 'zgudang', scenarios: ['gov-board-paper-013'] },
  { name: 'Dewi Lestari', title: 'Corporate Secretary, PT Zava Gudang Logistik Tbk', entity: 'zgudang', scenarios: ['gov-board-paper-013'] },
  { name: 'Hendro Wibisono', title: 'Corporate Secretary, PT Zava Logistik Nusantara', entity: 'zlogistik' },
  { name: 'Ratna Sari', title: 'Head of Strategy Office / PMO, PT Zava Indonesia Tbk', entity: 'zid', scenarios: ['gov-portfolio-004', 'gov-kpi-narrative-008'] },
  { name: 'Siska Amalia', title: 'Corporate Secretary, PT Zava Indonesia Tbk', entity: 'zid', scenarios: ['gov-risalah-003'] },
  { name: 'Bayu Nugroho', title: 'Procurement Officer, PT Zava Logistik Nusantara', entity: 'zlogistik', scenarios: ['gov-tor-kak-010'] },
];

// Outside parties: never Zava. Microsoft fictional brands freed by the migration are reused here.
export const EXTERNAL = {
  wingtip: { name: 'PT Wingtip Retail Nusantara', role: 'Largest retail customer of Zava Distribution (180 stores)', domain: 'wingtip-retail.example' },
  tailspin: { name: 'Tailspin Cloud Services', role: 'SaaS vendor in the contract review', domain: 'tailspin-cloud.example' },
  fabrikam: { name: 'PT Fabrikam Logistik', role: 'Line-haul carrier for Zava Distribution', domain: 'fabrikam-logistik.example' },
  alpine: { name: 'PT Alpine Kargo', role: 'Line-haul carrier (Sumatra)', domain: 'alpine-kargo.example' },
  southridge: { name: 'PT Southridge Ekspres', role: 'Line-haul carrier (Jabodetabek, Bandung)', domain: 'southridge-ekspres.example' },
  coho: { name: 'PT Coho Rantai Dingin', role: 'Acquisition target (Proyek Kutub) in the board paper', domain: 'coho-cold.example' },
  blueyonder: { name: 'Blue Yonder Capital Fund II', role: 'Seller of Proyek Kutub', domain: 'blueyonder-capital.example' },
  margie: { name: 'PT Margie Frozen Nusantara', role: 'Alternative cold-chain target considered in the board paper', domain: 'margie-frozen.example' },
  humongous: { name: 'PT Humongous Cold Express', role: 'Alternative cold-chain target considered in the board paper', domain: 'humongous-cold.example' },
  lamna: { name: 'Kantor Hukum Lamna & Rekan', role: 'External legal counsel (Indonesian law)', domain: 'lamna-law.example' },
  vanarsdel: { name: 'VanArsdel Tax Advisory', role: 'External tax adviser', domain: 'vanarsdel-tax.example' },
  proseware: { name: 'PT Proseware Tenaga Ahli', role: 'IT staffing vendor (demo story world)', domain: 'proseware-ta.example' },
  woodgrove: { name: 'PT Bank Woodgrove Indonesia', role: 'Lender', domain: 'woodgrove.example' },
  lucerne: { name: 'KJPP Lucerne dan Rekan', role: 'Independent valuer', domain: 'lucerne-valuation.example' },
  litware: { name: 'PT Litware Data Center', role: 'Colocation provider', domain: 'litware-dc.example' },
  northwind: { name: 'Northwind Supply Sdn. Bhd.', role: 'Network integrator (Johor)', domain: 'northwind-supply.example' },
  wideworld: { name: 'PT Wide World Digital Indonesia', role: 'Media agency for Zava Connect (account director Kevin Tan)', domain: 'wideworld-digital.example' },
  bidders: { names: ['PT Trey Riset Solusi', 'PT Relecloud Sistem Indonesia', 'PT Adatum Teknologi Nusantara', 'PT Wide World Integrasi'], role: 'Bidders in the procurement TOR scenario' },
};

// Scenarios that must stay company-free (rule 2). Their pages and prompts mention no company.
export const COMPANY_FREE = ['x-email-triage-015'];

// DECISION 3 (demo world): stories/contoso-niaga becomes the Zava Distribution episode set (PT Zava Niaga Nusantara);
// cast, arcs and dates are kept, only names and domains change.

export const ALL_ENTITIES = [GROUP.parent, ...GROUP.subHoldings, ...Object.values(ARMS).flatMap((a) => a.entities)];
export const entity = (key) => ALL_ENTITIES.find((e) => e.key === key) ?? (() => { throw new Error(`unknown Zava entity ${key}`); })();
export const person = (name) => PEOPLE.find((p) => p.name === name) ?? (() => { throw new Error(`not in Zava canon: ${name}`); })();
