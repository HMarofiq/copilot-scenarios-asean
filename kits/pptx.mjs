// Themed PowerPoint writer for story files. Real slide masters, speaker notes, no FICTIONAL banner on slides.
// Slide shapes (all optional except title):
//   { layout?, title, subtitle?, kicker?, bullets?: [string | { text, level }], table?: [[header...], [row...]], colW?: [inches],
//     left?: { heading?, bullets }, right?: { heading?, bullets }, metrics?: [{ value, label, note? }], source?, notes? }
// layout is inferred when missing: title (first slide without body), metrics, table, two, bullets, section.
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

// Zava tokens from brand/DESIGN.md (Deep Teal, Terracotta for the Distribution arm, Paper, Rice, Rattan).
export const THEMES = {
  zava: { org: 'PT Zava Niaga Nusantara', font: 'Aptos', bg: 'FBF7F0', primary: '183D4C', accent: 'B5512E', ink: '1F1A17', muted: '6F6359', rule: 'DCCFBB', band: 'F1E8D9', sand: 'F2C98A' },
  plain: { org: '', font: 'Calibri', bg: 'FFFFFF', primary: '1F3864', accent: '2E75B6', ink: '222222', muted: '666666', rule: 'D9D9D9', band: 'F2F2F2', sand: 'DCE6F2' },
};

export const LIMITS = { bullets: 7, bulletChars: 150, tableRows: 10, tableCols: 6, titleChars: 90, metrics: 4, columnBullets: 5 };
export const LAYOUTS = ['title', 'section', 'bullets', 'table', 'two', 'metrics'];

const W = 13.333;
const NUMERIC = /^[-+(]?(IDR|USD|MYR|Rp)?\s?[\d.,]+\s?(%|M|B|T|bn|jt|rb)?\)?$/i;

export function inferLayout(s, i) {
  if (s.layout) return s.layout;
  if (s.metrics) return 'metrics';
  if (s.table) return 'table';
  if (s.left || s.right) return 'two';
  if (s.bullets) return 'bullets';
  return i === 0 ? 'title' : 'section';
}

const bulletText = (b) => (typeof b === 'string' ? b : b.text);
const asRuns = (list, opt) => list.map((b) => ({ text: bulletText(b), options: { bullet: { indent: 20 }, indentLevel: typeof b === 'object' ? (b.level ?? 0) : 0, breakLine: true, ...opt } }));

export async function writeDeck(path, slides, { title = '', author, keywords, theme = 'zava', subject } = {}) {
  const t = typeof theme === 'string' ? THEMES[theme] : theme;
  if (!t) throw new Error(`unknown pptx theme ${theme}`);
  const p = new PptxGenJS();
  p.layout = 'LAYOUT_WIDE';
  p.title = title;
  if (author) p.author = author;
  if (t.org) p.company = t.org;
  p.subject = subject ?? '';

  const foot = { x: 0.6, y: 7.02, w: 8, h: 0.3, fontSize: 10, color: t.muted, fontFace: t.font };
  p.defineSlideMaster({ title: 'DECK_CONTENT', background: { color: t.bg },
    objects: [{ rect: { x: 0, y: 0, w: W, h: 0.14, fill: { color: t.primary } } }, { rect: { x: 0, y: 0.14, w: 1.6, h: 0.05, fill: { color: t.accent } } },
      { line: { x: 0.6, y: 6.95, w: W - 1.2, h: 0, line: { color: t.rule, width: 0.75 } } }, { text: { text: t.org, options: foot } }],
    slideNumber: { x: W - 1.3, y: 7.02, w: 0.7, h: 0.3, fontSize: 10, color: t.muted, fontFace: t.font, align: 'right' } });
  p.defineSlideMaster({ title: 'DECK_TITLE', background: { color: t.primary },
    objects: [{ rect: { x: 0, y: 0, w: 0.35, h: 7.5, fill: { color: t.accent } } }] });

  slides.forEach((s, i) => {
    const layout = inferLayout(s, i);
    const sl = p.addSlide({ masterName: layout === 'title' || layout === 'section' ? 'DECK_TITLE' : 'DECK_CONTENT' });
    const font = { fontFace: t.font };

    if (layout === 'title' || layout === 'section') {
      const big = layout === 'title';
      sl.addText(s.title, { x: 1, y: big ? 2.2 : 2.9, w: 11.2, h: 1.6, fontSize: big ? 40 : 34, bold: true, color: 'FFFFFF', valign: 'bottom', ...font });
      if (s.subtitle) sl.addText(s.subtitle, { x: 1, y: big ? 3.95 : 4.6, w: 11.2, h: 0.9, fontSize: 20, color: t.sand, valign: 'top', ...font });
      if (s.kicker) sl.addText(s.kicker, { x: 1, y: 6.4, w: 11.2, h: 0.4, fontSize: 14, color: 'FFFFFF', ...font });
      if (big && t.org) sl.addText(t.org, { x: 1, y: 1.5, w: 11.2, h: 0.4, fontSize: 14, bold: true, color: t.sand, charSpacing: 2, ...font });
    } else {
      sl.addText(s.title, { x: 0.6, y: 0.42, w: W - 1.2, h: 0.95, fontSize: s.title.length > 60 ? 24 : 28, bold: true, color: t.primary, valign: 'top', ...font });
      if (s.subtitle) sl.addText(s.subtitle, { x: 0.6, y: 1.25, w: W - 1.2, h: 0.4, fontSize: 16, color: t.muted, ...font });
      const top = s.subtitle ? 1.9 : 1.6;
      if (layout === 'bullets') {
        const n = s.bullets.length;
        sl.addText(asRuns(s.bullets, { color: t.ink }), { x: 0.6, y: top, w: W - 1.2, h: 6.8 - top, fontSize: n <= 4 ? 22 : n <= 6 ? 20 : 18, valign: 'top', paraSpaceAfter: 10, ...font });
      } else if (layout === 'table') {
        const rows = s.table.map((r, ri) => r.map((c) => ({ text: String(c), options: {
          bold: ri === 0, color: ri === 0 ? 'FFFFFF' : t.ink, fill: { color: ri === 0 ? t.primary : ri % 2 ? t.bg : t.band },
          align: ri > 0 && NUMERIC.test(String(c).trim()) ? 'right' : 'left', valign: 'middle', fontFace: t.font } })));
        sl.addTable(rows, { x: 0.6, y: top, w: W - 1.2, colW: s.colW, fontSize: rows.length > 7 ? 12 : 14, border: { type: 'solid', pt: 0.5, color: t.rule }, rowH: 0.42, margin: [0.04, 0.1, 0.04, 0.1] });
      } else if (layout === 'two') {
        [s.left, s.right].forEach((col, ci) => {
          if (!col) return;
          const x = 0.6 + ci * 6.2;
          if (col.heading) sl.addText(col.heading, { x, y: top, w: 5.9, h: 0.5, fontSize: 20, bold: true, color: t.accent, ...font });
          sl.addText(asRuns(col.bullets ?? [], { color: t.ink }), { x, y: top + 0.6, w: 5.9, h: 6.8 - top - 0.6, fontSize: 18, valign: 'top', paraSpaceAfter: 8, ...font });
        });
      } else if (layout === 'metrics') {
        const n = s.metrics.length, gap = 0.3, cw = (W - 1.2 - gap * (n - 1)) / n;
        s.metrics.forEach((m, mi) => {
          const x = 0.6 + mi * (cw + gap);
          sl.addShape(p.ShapeType.rect, { x, y: top, w: cw, h: 2.1, fill: { color: t.band }, line: { color: t.rule, width: 0.75 } });
          sl.addText(String(m.value), { x: x + 0.15, y: top + 0.15, w: cw - 0.3, h: 0.9, fontSize: 34, bold: true, color: t.primary, ...font });
          sl.addText(m.label, { x: x + 0.15, y: top + 1.05, w: cw - 0.3, h: 0.45, fontSize: 15, bold: true, color: t.ink, ...font });
          if (m.note) sl.addText(m.note, { x: x + 0.15, y: top + 1.5, w: cw - 0.3, h: 0.5, fontSize: 12, color: t.muted, valign: 'top', ...font });
        });
        if (s.bullets) sl.addText(asRuns(s.bullets, { color: t.ink }), { x: 0.6, y: top + 2.4, w: W - 1.2, h: 6.8 - top - 2.4, fontSize: 18, valign: 'top', paraSpaceAfter: 8, ...font });
      } else throw new Error(`unknown slide layout ${layout}`);
      if (s.source) sl.addText(s.source, { x: 0.6, y: 6.62, w: W - 1.2, h: 0.3, fontSize: 10, italic: true, color: t.muted, ...font });
    }
    if (s.notes) sl.addNotes(s.notes);
  });

  const buf = await p.write({ outputType: 'nodebuffer' });
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, await patchCore(buf, { keywords, author }));
}

// pptxgenjs has no Tags property, so add cp:keywords to docProps/core.xml (what PowerPoint shows as Tags)
// and replace the default last-modified-by name.
async function patchCore(buf, { keywords, author }) {
  if (!keywords && !author) return buf;
  const zip = await JSZip.loadAsync(buf);
  let xml = await zip.file('docProps/core.xml').async('string');
  const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  if (keywords) xml = xml.replace('</cp:coreProperties>', `<cp:keywords>${esc(keywords)}</cp:keywords></cp:coreProperties>`);
  if (author) xml = xml.replace(/<cp:lastModifiedBy>.*?<\/cp:lastModifiedBy>/, `<cp:lastModifiedBy>${esc(author)}</cp:lastModifiedBy>`);
  zip.file('docProps/core.xml', xml);
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}
