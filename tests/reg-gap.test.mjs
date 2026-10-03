import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import JSZip from 'jszip';
import { parse } from 'yaml';
import build, {
  CASE, SOURCE, FILES, REVIEW_UNITS, EVIDENCE, TRAPS, assess, answerRows, summary,
  trainingPercent, untrained, TEXTS, INPUTS, plain, words, readmeText, REGISTER_COLUMNS,
} from '../kits/bfsi-reg-gap-001/build.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const page = readFileSync(join(root, 'content', 'scenarios', 'bfsi-reg-gap-001.md'), 'utf8').replace(/\r\n/g, '\n');
const frontmatter = parse(page.split(/^---$/m)[1]);
const promptBlocks = [...page.matchAll(/^:::prompt\n([\s\S]*?)^:::/gm)].map((match) => {
  const variants = {};
  let lang;
  for (const line of match[1].trim().split('\n')) {
    const start = line.match(/^(EN|ID|BM): (.*)$/);
    if (start) { lang = start[1]; variants[lang] = [start[2]]; }
    else if (lang) variants[lang].push(line);
  }
  return variants;
});

// Independent oracle: changing the model and its derived summaries together must still fail.
const EXPECTED = [
  ['R01', 'S', '16.2', 37, '3.1', 'Approved', 'Evidenced', 'Covered', 'E01,E02'],
  ['R02', 'S', '16.5', 38, '3.2', 'Approved', 'Evidenced', 'Covered', 'E03'],
  ['R03', 'S', '16.7', 38, '3.3', 'Approved', 'Partial', 'Partial', 'E04,E05'],
  ['R04', 'S', '16.9', 40, '3.4', 'Approved', 'Unverifiable', 'Unverified', 'E06'],
  ['R05', 'S', '16.12', 41, '3.5 / Annex B', 'Draft', 'Not evidenced', 'Gap', 'E07'],
  ['R06', 'S', '16.15', 41, '3.6', 'Approved', 'Partial', 'Partial', 'E08'],
  ['R07', 'S', '16.19', 43, '3.7', 'Approved', 'Not evidenced', 'Gap', 'E09'],
  ['R08', 'S', '16.21', 43, '3.8', 'Approved', 'Evidenced', 'Covered', 'E10'],
  ['R09', 'S', '16.22', 43, '3.9', 'Approved', 'Evidenced', 'Covered', 'E11'],
  ['R10', 'S', '16.23', 43, '3.10', 'Approved', 'Partial', 'Partial', 'E12,E13'],
  ['R11', 'S', '16.26', 44, '3.11', 'Approved', 'Partial', 'Partial', 'E12,E14'],
  ['R12', 'S', '16.27', 45, '3.12', 'Approved', 'Not evidenced', 'Gap', 'E15'],
  ['R13', 'S', '16.28', 45, '3.13', 'Approved', 'Unverifiable', 'Unverified', 'E16'],
  ['R14', 'S', '10.3(g)', 11, '3.14', 'Approved', 'Evidenced', 'Covered', 'E17'],
  ['R15', 'G', '16.25', 44, '3.15', 'N/A', 'N/A', 'Guidance noted', 'E12'],
  ['R16', 'G', '16.8(g)', 40, '3.16', 'N/A', 'N/A', 'N/A', ''],
];
const EXPECTED_FILES = [
  '01_Contoso_MY_FTFC_Scope_Request.docx',
  '02_BNM_FTFC_2024_Reviewed_Source_Brief.pdf',
  '03_Contoso_MY_Policy_Pack_v1.0.docx',
  '04_Contoso_MY_Readiness_Evidence_17Mar2025.docx',
  '05_PT_Contoso_ID_SOP_Nasabah_Rentan_v2.docx',
  '06_Contoso_MY_BRMC_Paper_Template.docx',
  'ANSWER_KEY_gap_register.xlsx',
  'README.txt',
];

test('reg-gap: all 16 classifications and citations match an independent oracle', () => {
  const rows = answerRows();
  assert.equal(rows.length, 16);
  assert.equal(new Set(rows.map((r) => r.id)).size, 16);
  for (const [i, expected] of EXPECTED.entries()) {
    const u = REVIEW_UNITS[i];
    const r = rows[i];
    assert.deepEqual([r.id, r.type, r.para, u.page, u.section, r.design, r.operating, r.status, u.evidence.join(',')], expected);
    assert.equal(r.effectiveDate, '2025-04-01');
    assert.equal(r.issueDate, '27 March 2024');
    assert.equal(r.change, 'Unknown — predecessor text not supplied');
    assert.match(r.action, /^Proposed: /);
    assert.match(r.target, /not committed/);
    assert.match(r.approval, /pending.*no action authorised/);
    assert.ok(r.owner);
    assert.ok(r.source.includes(`printed p.${expected[3]} (PDF p.${expected[3] + 1})`));
    assert.ok(r.policy.includes(FILES.policy));
    assert.ok(r.policy.includes(expected[4]));
    for (const id of u.evidence) assert.ok(r.evidence.includes(id));
  }
});

test('reg-gap: exact independent counts keep S/G and design/operation separate', () => {
  assert.deepEqual(summary(), {
    total: 16, mandatory: 14, guidance: 2,
    status: { Covered: 5, Partial: 4, Gap: 3, Unverified: 2, 'Guidance noted': 1, 'N/A': 1 },
    design: { Approved: 13, Draft: 1, 'N/A': 2 },
    operating: { Evidenced: 5, Partial: 4, 'Not evidenced': 3, Unverifiable: 2, 'N/A': 2 },
    approvedNotCovered: 8,
  });
  assert.deepEqual(answerRows().filter((r) => r.type === 'G').map((r) => r.id), ['R15', 'R16']);
});

test('reg-gap: approval and operating evidence are independently evaluated', () => {
  const product = REVIEW_UNITS[1];
  assert.deepEqual(assess({ ...product, approved: false }), { design: 'Draft', operating: 'Evidenced', status: 'Gap' });
  assert.deepEqual(assess(product, []), { design: 'Approved', operating: 'Not evidenced', status: 'Gap' });
  assert.deepEqual(assess({ ...REVIEW_UNITS[4], approved: true }), { design: 'Approved', operating: 'Not evidenced', status: 'Gap' });
  const training = { ...REVIEW_UNITS[5], evidence: ['E08', 'E18'] };
  const monitoring = { ...REVIEW_UNITS[11], evidence: ['E15', 'E18'] };
  assert.equal(assess(training).operating, 'Partial', 'wrong-entity evidence must not complete Malaysian training');
  assert.equal(assess(monitoring).operating, 'Not evidenced', 'wrong-entity evidence must not establish Malaysian monitoring');
  assert.equal(assess(training, EVIDENCE.map((e) => e.id === 'E18' ? { ...e, entity: CASE.entity } : e)).operating, 'Evidenced', 'entity exclusion must be consequential');
});

test('reg-gap: dates, source identity and training arithmetic are fixed case facts', () => {
  assert.equal(CASE.snapshot, 'Monday 17 March 2025');
  assert.equal(CASE.cutoff, '17 March 2025, 18:00 MYT');
  assert.equal(CASE.review, '20 March 2025, 15:00 MYT');
  assert.equal(CASE.paper, '21 March 2025, 12:00 MYT');
  assert.equal(CASE.policyApproval, '26 February 2025');
  assert.equal(CASE.draftDate, '13 March 2025');
  assert.equal(SOURCE.reference, 'BNM/RH/PD 028-103');
  assert.equal(SOURCE.pdf, 'https://www.bnm.gov.my/documents/20124/938039/pd-ftfc-mar24.pdf');
  assert.equal(SOURCE.pdfPages, 54);
  assert.equal(SOURCE.exceptionParagraphs, '8.1(g), 10.3(f), 10.3(g), 10.4 and 16.1–16.28');
  assert.deepEqual([CASE.trained, CASE.employees, untrained(), trainingPercent(), CASE.agents], [1184, 1287, 103, '92.0', 120]);
  assert.deepEqual([CASE.crm, CASE.webUat, CASE.testing, CASE.budget, CASE.budgetLabel], ['14 April 2025', '31 March 2025', 'Q3 2025', 380000, 'RM380,000']);
});

test('reg-gap: source and policy locators resolve in original, scoped input text', () => {
  const brief = plain(TEXTS.SOURCE_BRIEF);
  const policy = plain(TEXTS.POLICY);
  assert.match(brief, /original authored PARAPHRASES/);
  assert.match(brief, /not quotations, official translations or regulator-endorsed/);
  assert.match(brief, /Paragraph 4\.1/);
  assert.match(brief, /Paragraph 5\.2/);
  assert.match(brief, /Paragraph 6\.2/);
  assert.ok(brief.replace(/\n/g, '').includes(SOURCE.pdf));
  for (const [id, type, para, pageNumber, section] of EXPECTED) {
    const heading = `## ${id}. ${type} ${para} | printed p.${pageNumber} | PDF p.${pageNumber + 1}`;
    assert.equal(brief.split(heading).length - 1, 1, `${id} has one official source locator`);
    assert.ok(policy.includes(`### ${section.split(' / ')[0]} `), `${id} policy section exists`);
  }
  assert.match(brief, /No related-policy texts/);
  assert.match(brief, /not an exhaustive legal inventory/);
});

test('reg-gap: believable inputs preserve all eight traps without answer verdicts', () => {
  assert.ok(words(TEXTS.POLICY) >= 3000 && words(TEXTS.POLICY) <= 4000);
  assert.ok(words(TEXTS.INDONESIA) >= 850 && words(TEXTS.INDONESIA) <= 1050);
  assert.ok(words(TEXTS.READINESS) >= 1800);
  const policy = plain(TEXTS.POLICY);
  const evidence = plain(TEXTS.READINESS);
  const idPolicy = plain(TEXTS.INDONESIA);
  assert.match(policy, /Annex B.*expressly excluded/);
  assert.match(policy, /Version v0\.3, prepared 13 March 2025/);
  assert.match(policy, /Approver: \[blank\]. Approval date: \[blank\]/);
  assert.match(policy, /Board, 26 February 2025/);
  assert.match(policy, /internal practical skills check/);
  assert.match(policy, /not a claimed BNM examination pass mark/);
  assert.equal(EVIDENCE.length, 18);
  assert.equal(new Set(EVIDENCE.map((e) => e.id)).size, 18);
  for (const e of EVIDENCE) {
    assert.ok(e.owner && e.approval && e.date && e.attached && e.missing && e.validity);
    assert.equal(evidence.split(`### ${e.id}. `).length - 1, 1);
  }
  const byId = Object.fromEntries(EVIDENCE.map((e) => [e.id, e]));
  assert.equal(byId.E05.date, '31 December 2024');
  assert.deepEqual(byId.E05.supports, {});
  assert.match(byId.E05.missing, /No renewal, current pricing review/);
  assert.match(byId.E06.missing, /QA report/);
  assert.match(byId.E09.attached, /schema proposal only, with no filled operating records/);
  assert.match(byId.E12.attached, /not available in 2025/);
  assert.match(byId.E15.attached, /pending CFO decision, not an approved budget/);
  assert.match(byId.E16.missing, /versions, underlying texts/);
  assert.equal(byId.E18.entity, 'PT Bank Contoso Indonesia');
  assert.match(evidence, /### M1\./);
  assert.match(evidence, /### M2\./);
  assert.match(evidence, /### M3\./);
  assert.match(idPolicy, /berlaku secara internal mulai 1 Januari 2025/);
  assert.match(idPolicy, /Nomor 22 Tahun 2023/);
  assert.match(idPolicy, /bukan tanggal transisi yang diklaim berasal dari OJK/);
  assert.match(idPolicy, /Tidak ada keputusan adopsi untuk Malaysia/);
  assert.match(idPolicy, /pegawai dan agen Indonesia/);
  assert.equal(TRAPS.length, 8);
  for (const trap of TRAPS) {
    assert.ok(page.includes(`**${trap.id} —`));
    for (const id of trap.rows) assert.ok(EXPECTED.some((r) => r[0] === id));
  }
  for (const [name, blocks] of Object.entries(TEXTS)) {
    const text = plain(blocks);
    assert.doesNotMatch(text, /\bundefined\b|\[object Object\]/);
    assert.doesNotMatch(text, /ANSWER_KEY|PRESENTER ANSWERS|5 Covered|4 Partial|3 Gap|2 Unverified/);
    assert.doesNotMatch(text, /R\d{2} (?:is|=|:)\s*(?:Covered|Partial|Gap|Unverified|Guidance noted|N\/A)/, `${name} must not state expected verdicts`);
  }
});

test('reg-gap: inventory, draft metadata and historical scenario framing are complete', () => {
  assert.deepEqual(Object.values(FILES), EXPECTED_FILES);
  assert.equal(frontmatter.status, 'draft');
  assert.equal(frontmatter.validated_on, undefined);
  assert.equal(frontmatter.publish_draft, undefined);
  assert.equal(frontmatter.impact.evidence, 'estimated');
  assert.match(frontmatter.validation_note, /not yet tenant-tested/);
  assert.deepEqual(frontmatter.market, ['ID', 'MY']);
  assert.equal(frontmatter.difficulty, 3);
  assert.deepEqual(frontmatter.licence, ['m365-copilot']);
  assert.deepEqual(frontmatter.inputs.flatMap((i) => i.kit), EXPECTED_FILES.slice(0, 6));
  assert.deepEqual(frontmatter.inputs.at(-1).steps, [5]);
  assert.match(frontmatter.objective, /first-pass.*not a compliance certification/);
  const situation = page.split('## Situation\n')[1].split('## Steps')[0];
  assert.ok(situation.split(/\s+/u).filter(Boolean).length <= 110);
  assert.equal([...situation.matchAll(/\*\*[^*]+\*\*/g)].length, 3);
  const headings = [...page.matchAll(/^\*\*(\d)\. ([^*]+)\.\*\*/gm)];
  assert.deepEqual(headings.map((m) => m[1]), ['1', '2', '3', '4', '5', '6']);
  for (const h of headings) assert.ok(h[2].split(/\s+/).length <= 8);
  assert.ok(page.includes('**Add and manage sources** > **Add content**'));
  assert.doesNotMatch(page, /Add work content|status: validated|validated_on:|publish_draft:/);
  assert.match(page, /40-minute flow/);
  assert.match(page, /Pasal/);
  for (const bullet of page.split('## When it goes wrong\n')[1].split('## Take it further')[0].split('\n').filter((l) => l.startsWith('- '))) {
    assert.match(bullet, /\(steps? [2-6](?:[–-][2-6])?\)/);
  }
});

test('reg-gap: three full prompt translations preserve line parity and safe labels', () => {
  assert.equal(promptBlocks.length, 3);
  const expectedLines = [24, 15, 18];
  for (const [i, variants] of promptBlocks.entries()) {
    assert.deepEqual(Object.keys(variants), ['EN', 'ID', 'BM']);
    for (const [lang, lines] of Object.entries(variants)) {
      assert.equal(lines.length, expectedLines[i], `prompt ${i + 1} ${lang}: line-for-line parity`);
      for (const line of lines) {
        assert.ok(line.length > 0 && line.length <= 350, `prompt ${i + 1} ${lang}: ${line.length} characters`);
        assert.doesNotMatch(line, /^(?:- |\d+\. )/);
        assert.doesNotMatch(line, /\$\{|\{\{/);
      }
      const prompt = lines.join('\n');
      assert.match(prompt, /R01–R16/);
      assert.match(prompt, /Unknown/);
      assert.match(prompt, /Head of Compliance/);
      assert.match(prompt, /1 April 2025/);
      assert.match(prompt, /E-ID/);
      assert.doesNotMatch(prompt, /5 Covered|4 Partial|3 Gap|2 Unverified/);
      if (i < 2) {
        for (const label of ['Covered', 'Partial', 'Gap', 'Unverified', 'Guidance noted', 'N/A', 'Approved', 'Draft', 'Evidenced', 'Not evidenced', 'Unverifiable']) {
          assert.ok(prompt.includes(label), `${lang}: ${label}`);
        }
      }
      if (i === 0) for (const marker of ['E01–E18', 'M1–M3', 'Annex B', '16.28', 'PT Bank Contoso Indonesia']) assert.ok(prompt.includes(marker));
      if (i === 1) for (const marker of ['.xlsx', 'COUNTIF', 'COUNTIFS', 'Summary', 'Register', '14', '16', 'OneDrive']) assert.ok(prompt.includes(marker));
      if (i === 2) for (const marker of ['.docx', 'BNM/RH/PD 028-103', 'RM380,000', 'CFO', 'WhatsApp', 'video-relay', '14 April 2025', '16.28', 'Annex B']) assert.ok(prompt.includes(marker));
    }
  }
});

test('reg-gap: build persists exactly eight readable, stamped files and a static computed answer key', async () => {
  const dir = resolve(root, '.kits-tmp', 'bfsi-reg-gap-001');
  rmSync(dir, { recursive: true, force: true });
  await build({ dir });
  assert.deepEqual(readdirSync(dir).sort(), [...EXPECTED_FILES].sort());
  for (const input of INPUTS.filter((i) => i.file.endsWith('.docx'))) {
    const zip = await JSZip.loadAsync(readFileSync(join(dir, input.file)));
    const text = await zip.file('word/document.xml').async('string');
    const headerPaths = Object.keys(zip.files).filter((p) => /^word\/header\d+\.xml$/.test(p));
    const headers = (await Promise.all(headerPaths.map((p) => zip.file(p).async('string')))).join('\n');
    assert.match(headers, /FICTIONAL DEMO DATA/);
    assert.match(text, /<w:body>/);
    assert.doesNotMatch(text, /undefined|\[object Object\]/);
    const bodyText = [...text.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)].map((m) => m[1]).join(' ');
    assert.equal(words(input.blocks), bodyText.split(/\s+/u).filter(Boolean).length, 'README word count excludes formatting markers');
    for (const block of input.blocks.filter((b) => typeof b === 'string' && b.startsWith('### '))) {
      const prefix = block.slice(4).split(' ')[0];
      assert.ok(text.includes(prefix), `${input.file}: ${prefix}`);
    }
  }
  assert.ok(readFileSync(join(dir, FILES.source)).subarray(0, 5).equals(Buffer.from('%PDF-')));
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(join(dir, FILES.key));
  assert.deepEqual(wb.worksheets.map((s) => s.name), ['README', 'Register', 'Counts', 'Trap checks']);
  assert.match(wb.getWorksheet('README').getCell('A1').value, /FICTIONAL/);
  const register = wb.getWorksheet('Register');
  assert.equal(register.rowCount, 17);
  for (const [i, row] of answerRows().entries()) {
    for (const [col, field] of REGISTER_COLUMNS.entries()) {
      assert.equal(register.getCell(i + 2, col + 1).value, row[field.key], `${row.id} ${field.key}`);
    }
  }
  assert.equal(register.getCell('J6').value, 'Draft');
  assert.equal(register.getCell('L14').value, 'Unverified');
  assert.equal(wb.getWorksheet('Trap checks').rowCount, 9);
  const counts = wb.getWorksheet('Counts');
  assert.deepEqual([counts.getCell('C2').value, counts.getCell('C3').value, counts.getCell('C4').value], [16, 14, 2]);
  for (const sheet of wb.worksheets) sheet.eachRow((row) => row.eachCell((cell) => assert.equal(cell.type === ExcelJS.ValueType.Formula, false)));
  const readme = readFileSync(join(dir, FILES.readme), 'utf8');
  assert.equal(readme, readmeText());
  assert.match(readme, /YOUR AUTHORISED WORK TENANT/);
  assert.doesNotMatch(readme, /demo tenant only|never a customer or production tenant/);
  for (const name of EXPECTED_FILES) assert.ok(readme.includes(name));
  for (const row of answerRows()) assert.ok(readme.includes(`${row.id} | ${row.type} ${row.para} | ${row.status}`));
});
