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
      { key: 'zseluler', legal: 'PT Zava Seluler Indonesia', parent: 'zid', brands: ['Rumah Terhubung (FTTH)', 'Merdeka Unlimited (prepaid)'] },
      { key: 'zconnectmy', legal: 'Zava Connect Malaysia Sdn. Bhd.', parent: 'zmy', brands: ['Zava 5G'] },
    ],
    replaces: ['Relecloud (PT Relecloud Nusantara Tbk, PT Relecloud Seluler Indonesia, Relecloud Malaysia)'],
    scenarios: ['tel-mkt-board-016'],
  },
  // DECISION 2 (government / state-owned scenarios): a state-linked arm, so state-enterprise rules apply credibly.
  infrastructure: {
    name: 'Zava Logistics & Infrastructure', what: 'Ports, trucking, warehousing and cold chain. Majority-owned by a fictional state investment fund, so state-enterprise procurement and governance rules apply.',
    entities: [
      { key: 'zlogistik', legal: 'PT Zava Logistik Nusantara', parent: 'zid', ownership: '51% Dana Kelola Nusantara (fictional state investment fund), 49% PT Zava Indonesia Tbk', governance: 'Direksi and Dewan Komisaris; RKAP; procurement under state-enterprise rules (KAK, HPS)', subsidiaries: ['PT Zava Pelabuhan Nusantara', 'PT Zava Truk Ekspres', 'PT Zava Gudang Logistik', 'PT Zava Rantai Dingin'] },
      { key: 'zinframy', legal: 'Zava Infra Malaysia Sdn. Bhd.', parent: 'zmy', ownership: '51% Dana Infrastruktur Malaysia (fictional government-linked fund), 49% Zava Malaysia Berhad', governance: 'GLC-style Board' },
    ],
    replaces: ['Fabrikam (PT Fabrikam Logistik Tbk, PT Fabrikam Nusantara and its subsidiaries)'],
    scenarios: ['gov-risalah-003', 'gov-portfolio-004', 'gov-kpi-narrative-008', 'gov-tor-kak-010', 'gov-board-paper-013'],
  },
};
// Room to add later: Zava Health (hospitals, pharmacy), Zava Manufacturing, Zava Property.

// People. One name, one person. `alias` = existing demo-tenant user (the demo tenant is already branded Zava).
export const PEOPLE = [
  // Group / parent
  { name: 'Adelia Chin', title: 'Group CEO, Zava Holdings', entity: 'parent', alias: 'achin' },
  { name: 'Andre Lawson', title: 'Group CFO, Zava Holdings', entity: 'parent', alias: 'AndreL' },
  { name: 'Carlos Slattery', title: 'Group CTO, Zava Holdings', entity: 'parent', alias: 'CarlosS', note: 'Main demo user' },
  { name: 'Indra Permana', title: 'Group CISO', entity: 'parent', alias: 'indrapr' },
  { name: 'Cecil Folk', title: 'Group Chief Marketing & Communications Officer', entity: 'parent', alias: 'CecilF' },
  { name: 'Mona Kane', title: 'Group Chief Sales Officer', entity: 'parent' },
  // Zava Distribution
  { name: 'Babak Shammas', title: 'Head of Financial Consolidation, Zava Distribution', entity: 'zniaga', alias: 'BabakS', scenarios: ['x-mgmt-report-011'] },
  { name: 'Charlotte Waltson', title: 'VP of Procurement, Zava Distribution', entity: 'zniaga', alias: 'CharlotteW' },
  { name: 'Lydia Bauer', title: 'Head of Infrastructure & SRE, Zava Distribution', entity: 'zniaga', alias: 'LydiaB' },
  { name: 'Kian Lambert', title: 'Application Development Manager (Proyek Nusa)', entity: 'zniaga', alias: 'KianL' },
  { name: 'Yusuf Hakim', title: 'Chief of Staff to the President Director, PT Zava Niaga Nusantara', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Putri Anggraini', title: 'Business Planning Manager, Office of the COO, PT Zava Niaga Nusantara', entity: 'zniaga', scenarios: ['x-report-deck-017'], note: 'Was Nadia Rahman in 017 (name clashed with 016).' },
  { name: 'Dimas Pratama', title: 'Head of Distribution Operations', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Rudi Santoso', title: 'Operations Controller', entity: 'zniaga', scenarios: ['x-report-deck-017'] },
  { name: 'Farah Aziz', title: 'Head, Johor Bahru hub, Zava Niaga Malaysia', entity: 'zniagamy', scenarios: ['x-report-deck-017'] },
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
  { name: 'Anisa Putri', title: 'Group Marketing Performance Lead, Zava Connect', entity: 'zseluler', scenarios: ['tel-mkt-board-016'], note: 'Was Nadia Rahman in 016.' },
  { name: 'Aisyah Kamal', title: 'Marketing Manager, Zava Connect Malaysia', entity: 'zconnectmy', scenarios: ['tel-mkt-board-016'], note: 'Was Farah Aziz in 016.' },
  // Zava Logistics & Infrastructure
  { name: 'Laras Pratiwi', title: 'Commissioner, PT Zava Logistik Nusantara', entity: 'zlogistik', scenarios: ['gov-board-paper-013'] },
  { name: 'Hendro Wibisono', title: 'Corporate Secretary, PT Zava Logistik Nusantara', entity: 'zlogistik', scenarios: ['gov-risalah-003', 'gov-board-paper-013'] },
  { name: 'Ratna Sari', title: 'Head of Strategy Office / PMO, PT Zava Logistik Nusantara', entity: 'zlogistik', scenarios: ['gov-portfolio-004', 'gov-kpi-narrative-008'] },
  { name: 'Bayu Nugroho', title: 'Procurement Officer, PT Zava Logistik Nusantara', entity: 'zlogistik', scenarios: ['gov-tor-kak-010'] },
];

// Outside parties: never Zava. Microsoft fictional brands freed by the migration are reused here.
export const EXTERNAL = {
  wingtip: { name: 'PT Wingtip Retail Nusantara', role: 'Largest retail customer of Zava Distribution (180 stores)', domain: 'wingtip-retail.example' },
  tailspin: { name: 'Tailspin Cloud Services', role: 'SaaS vendor in the contract review', domain: 'tailspin-cloud.example' },
  fabrikam: { name: 'PT Fabrikam Logistik', role: 'Line-haul carrier for Zava Distribution', domain: 'fabrikam-logistik.example' },
  alpine: { name: 'PT Alpine Kargo', role: 'Line-haul carrier (Sumatra)', domain: 'alpine-kargo.example' },
  coho: { name: 'PT Coho Rantai Dingin', role: 'Acquisition target (Proyek Kutub) in the board paper', domain: 'coho-cold.example' },
  woodgrove: { name: 'PT Bank Woodgrove Indonesia', role: 'Lender', domain: 'woodgrove.example' },
  lucerne: { name: 'KJPP Lucerne dan Rekan', role: 'Independent valuer', domain: 'lucerne-valuation.example' },
  litware: { name: 'PT Litware Data Center', role: 'Colocation provider', domain: 'litware-dc.example' },
  northwind: { name: 'Northwind Supply Sdn. Bhd.', role: 'Network integrator (Johor)', domain: 'northwind-supply.example' },
  wideworld: { name: 'PT Wide World Digital Indonesia', role: 'Media agency for Zava Connect', domain: 'wideworld-digital.example' },
  bidders: { names: ['PT Trey Riset Solusi', 'PT Relecloud Sistem Indonesia', 'PT Adatum Teknologi Nusantara', 'PT Wide World Integrasi'], role: 'Bidders in the procurement TOR scenario' },
};

// Scenarios that must stay company-free (rule 2). Their pages and prompts mention no company.
export const COMPANY_FREE = ['x-email-triage-015'];

// DECISION 3 (demo world): stories/contoso-niaga becomes the Zava Distribution episode set (PT Zava Niaga Nusantara);
// cast, arcs and dates are kept, only names and domains change.

export const ALL_ENTITIES = [GROUP.parent, ...GROUP.subHoldings, ...Object.values(ARMS).flatMap((a) => a.entities)];
export const entity = (key) => ALL_ENTITIES.find((e) => e.key === key) ?? (() => { throw new Error(`unknown Zava entity ${key}`); })();
export const person = (name) => PEOPLE.find((p) => p.name === name) ?? (() => { throw new Error(`not in Zava canon: ${name}`); })();
