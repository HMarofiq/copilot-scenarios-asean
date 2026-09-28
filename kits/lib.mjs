// Shared helpers for demo kit generators. Every file produced here is marked FICTIONAL.
//
// Fictional organisations (Microsoft's standard fictional names, extended):
//   Contoso Bank            banking & insurance (Contoso Bank Indonesia, Contoso Bank Malaysia Berhad)
//   Fabrikam Holding Group  state-owned-style holding with ~20 subsidiaries
//   Northwind Resources     nickel mining (Kalimantan) and palm oil estates (Sabah)
//   Northwind Financial Supervisory Board (NFSB)  fictional regulator. Never imitate OJK, BI or BNM.
import { mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
import { dirname, join } from 'node:path';
import * as docx from 'docx';
import ExcelJS from 'exceljs';
import PptxGenJS from 'pptxgenjs';
import PDFDocument from 'pdfkit';

export const NOTICE = 'FICTIONAL DEMO DATA. Not a real document. Any resemblance to real organisations or people is coincidental.';
export const SHORT = 'FICTIONAL DEMO DATA';

const ensure = (p) => mkdirSync(dirname(p), { recursive: true });

// Deterministic PRNG so kits are identical across builds (except date-relative kits).
export function rng(seed = 42) {
  let s = seed >>> 0;
  const next = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  return { next, int: (a, b) => a + Math.floor(next() * (b - a + 1)), pick: (arr) => arr[Math.floor(next() * arr.length)] };
}

export const addDays = (d, n) => { const x = new Date(d); x.setUTCDate(x.getUTCDate() + n); return x; };
export const iso = (d) => d.toISOString().slice(0, 10);
export const dmy = (d) => `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`;
export const money = (n) => n.toLocaleString('en-US');

/**
 * Word document from simple blocks:
 *   '# Title', '## Heading', '### Sub', '- bullet', '> note', plain paragraph,
 *   { table: [[header...], [row...]] }, { pageBreak: true }
 * **bold** inline is supported.
 */
export async function writeDocx(path, blocks, { title = '' } = {}) {
  const runs = (text) => text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((t) =>
    t.startsWith('**') ? new docx.TextRun({ text: t.slice(2, -2), bold: true }) : new docx.TextRun(t));
  const children = [];
  for (const b of blocks) {
    if (typeof b === 'object' && b.table) {
      const [head, ...rows] = b.table;
      const cell = (t, bold) => new docx.TableCell({ children: [new docx.Paragraph({ children: [new docx.TextRun({ text: String(t), bold })] })] });
      children.push(new docx.Table({
        width: { size: 100, type: docx.WidthType.PERCENTAGE },
        rows: [new docx.TableRow({ tableHeader: true, children: head.map((h) => cell(h, true)) }), ...rows.map((r) => new docx.TableRow({ children: r.map((c) => cell(c, false)) }))],
      }));
      children.push(new docx.Paragraph(''));
    } else if (typeof b === 'object' && b.pageBreak) children.push(new docx.Paragraph({ children: [new docx.PageBreak()] }));
    else if (b.startsWith('### ')) children.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_3, children: runs(b.slice(4)) }));
    else if (b.startsWith('## ')) children.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_2, children: runs(b.slice(3)) }));
    else if (b.startsWith('# ')) children.push(new docx.Paragraph({ heading: docx.HeadingLevel.HEADING_1, children: runs(b.slice(2)) }));
    else if (b.startsWith('- ')) children.push(new docx.Paragraph({ bullet: { level: 0 }, children: runs(b.slice(2)) }));
    else if (b.startsWith('> ')) children.push(new docx.Paragraph({ children: [new docx.TextRun({ text: b.slice(2), italics: true, color: '666666' })] }));
    else children.push(new docx.Paragraph({ children: runs(b), spacing: { after: 120 } }));
  }
  const stamp = (t) => new docx.Paragraph({ alignment: docx.AlignmentType.CENTER, children: [new docx.TextRun({ text: t, color: 'C00000', bold: true, size: 16 })] });
  const doc = new docx.Document({
    creator: 'Scenario Library demo kit', title, description: NOTICE,
    sections: [{ headers: { default: new docx.Header({ children: [stamp(NOTICE)] }) }, footers: { default: new docx.Footer({ children: [stamp(SHORT)] }) }, children }],
  });
  ensure(path);
  writeFileSync(path, await docx.Packer.toBuffer(doc));
}

/**
 * Excel workbook. Each sheet: { name, columns: [{header,key,width,numFmt}], rows: [..], table?: false }
 * A first sheet "README" carries the FICTIONAL notice so data sheets stay clean Excel tables.
 */
export async function writeXlsx(path, sheets, { readme = [] } = {}) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Scenario Library demo kit';
  wb.description = NOTICE;
  const r = wb.addWorksheet('README');
  r.getColumn(1).width = 110;
  [SHORT, NOTICE, '', ...readme].forEach((line, i) => {
    const row = r.addRow([line]);
    if (i < 2) row.font = { bold: true, color: { argb: 'FFC00000' } };
  });
  for (const s of sheets) {
    const ws = wb.addWorksheet(s.name);
    if (s.table !== false) {
      ws.addTable({
        name: s.name.replace(/[^A-Za-z0-9]/g, '') || 'Data',
        ref: 'A1', headerRow: true, style: { theme: 'TableStyleMedium2', showRowStripes: true },
        columns: s.columns.map((c) => ({ name: c.header, filterButton: true })),
        rows: s.rows.map((row) => s.columns.map((c) => row[c.key] ?? null)),
      });
    } else {
      ws.addRow(s.columns.map((c) => c.header)).font = { bold: true };
      s.rows.forEach((row) => ws.addRow(s.columns.map((c) => row[c.key] ?? null)));
    }
    s.columns.forEach((c, i) => { const col = ws.getColumn(i + 1); col.width = c.width ?? 16; if (c.numFmt) col.numFmt = c.numFmt; });
  }
  ensure(path);
  await wb.xlsx.writeFile(path);
}

export function writeCsv(path, header, rows) {
  const esc = (v) => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  ensure(path);
  writeFileSync(path, [header, ...rows].map((r) => r.map(esc).join(',')).join('\n') + '\n', 'utf8');
}

/** PDF with a diagonal FICTIONAL watermark on every page. Blocks as in writeDocx; '| a | b |' lines render monospaced. */
export function writePdf(path, blocks, { title = '' } = {}) {
  ensure(path);
  return new Promise((resolve) => {
    const pdf = new PDFDocument({ size: 'A4', margins: { top: 64, bottom: 64, left: 64, right: 64 }, info: { Title: title, Subject: NOTICE } });
    const stream = createWriteStream(path);
    pdf.pipe(stream);
    const mark = () => {
      const { x, y } = pdf;
      pdf.save().rotate(-35, { origin: [300, 420] }).fontSize(54).fillColor('#C00000').opacity(0.12)
        .text('FICTIONAL DEMO', 60, 380, { width: 480, align: 'center', lineBreak: false }).restore().opacity(1).fillColor('black');
      pdf.fontSize(7).fillColor('#C00000').text(NOTICE, 64, 30, { width: 467, align: 'center' }).fillColor('black');
      pdf.x = 64; pdf.y = Math.max(64, y === undefined ? 64 : 64);
    };
    mark();
    pdf.on('pageAdded', mark);
    for (const b of blocks) {
      if (typeof b === 'object' && b.pageBreak) { pdf.addPage(); continue; }
      if (b.startsWith('# ')) pdf.moveDown(0.5).font('Helvetica-Bold').fontSize(15).text(b.slice(2)).moveDown(0.4);
      else if (b.startsWith('## ')) pdf.moveDown(0.6).font('Helvetica-Bold').fontSize(11.5).text(b.slice(3)).moveDown(0.2);
      else if (b.startsWith('- ')) pdf.font('Helvetica').fontSize(10).text(`•  ${b.slice(2)}`, { indent: 10 });
      else if (b.startsWith('| ')) pdf.font('Courier').fontSize(8.5).text(b);
      else pdf.font('Helvetica').fontSize(10).text(b.replace(/\*\*/g, ''), { align: 'justify' }).moveDown(0.35);
    }
    pdf.end();
    stream.on('finish', resolve);
  });
}

/** PowerPoint: slides = [{ title, bullets?: [], table?: [[...]] }] */
export async function writePptx(path, slides, { title = '' } = {}) {
  const p = new PptxGenJS();
  p.layout = 'LAYOUT_WIDE';
  p.title = title;
  for (const s of slides) {
    const sl = p.addSlide();
    sl.addText(NOTICE, { x: 0.3, y: 7.05, w: 12.7, h: 0.3, fontSize: 9, color: 'C00000', align: 'center' });
    sl.addText(s.title, { x: 0.5, y: 0.35, w: 12.3, h: 0.8, fontSize: 26, bold: true, color: '1F3864' });
    if (s.bullets) sl.addText(s.bullets.map((t) => ({ text: t, options: { bullet: true, breakLine: true } })), { x: 0.6, y: 1.4, w: 12, h: 5.2, fontSize: 18, valign: 'top' });
    if (s.table) sl.addTable(s.table.map((r, i) => r.map((c) => ({ text: String(c), options: { bold: i === 0, fill: { color: i === 0 ? 'DCE6F2' : 'FFFFFF' } } }))),
      { x: 0.6, y: 1.5, w: 12, fontSize: 14, border: { type: 'solid', pt: 0.5, color: 'BFBFBF' } });
  }
  ensure(path);
  await p.writeFile({ fileName: path });
}

export function writeText(path, text) { ensure(path); writeFileSync(path, text.replace(/\r\n/g, '\n'), 'utf8'); }

/** Standard kit README. `spoilers` is the answer key summary for presenters. */
export function writeReadme(dir, { title, scenario, contents, setup, spoilers }) {
  writeText(join(dir, 'README.txt'), [
    title, '='.repeat(title.length), '', NOTICE, '',
    `Scenario: https://hmarofiq.github.io/copilot-scenarios-asean/scenarios/${scenario}/`, '',
    'CONTENTS', ...contents.map((c) => `  - ${c}`), '',
    'SETUP (demo tenant only, never a customer or production tenant)', ...setup.map((s, i) => `  ${i + 1}. ${s}`), '',
    'PRESENTER ANSWER KEY (what the seeded data should surface)', ...spoilers.map((s) => `  - ${s}`), '',
  ].join('\n'));
}
