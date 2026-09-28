---
id: bfsi-reg-gap-001
title: { en: "New regulation gap analysis", id: "Analisis kesenjangan regulasi baru", ms: "Analisis jurang peraturan baharu" }
summary:
  en: "Map a new OJK or BNM circular against your internal SOPs and produce a cited gap tracker plus a board note."
  id: "Petakan surat edaran OJK atau BNM yang baru terhadap SOP internal dan hasilkan pelacak kesenjangan bersumber serta nota untuk Direksi."
  ms: "Petakan pekeliling baharu OJK atau BNM terhadap SOP dalaman dan hasilkan penjejak jurang berserta rujukan dan nota kepada Lembaga."
industry: [banking-insurance]
department: [compliance, risk]
persona: [compliance-officer]
market: [ID, MY]
difficulty: 3
surface: [copilot-chat, word, excel]
licence: [m365-copilot]
inputs:
  - { name: "Regulator circular", format: "PDF (text-based)", where: "Regulator website", count: "1" }
  - { name: "Internal SOPs", format: ".docx", where: "SharePoint Compliance library", count: "15-40" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Head of Compliance" }
impact: { baseline: "3-5 working days", target: "0.5 day draft + 1 day review", evidence: estimated }
card:
  problem: "A new circular lands and the board wants a gap assessment in 30 days."
  output: "Obligations tracker with an SOP citation on every row, plus a 2-page board note."
limits:
  - "Map 5-8 SOPs per prompt; larger batches silently drop documents."
  - "Scanned (image) PDFs cannot be read. OCR them first."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: draft
---

## Situation

A regulator issues a new circular. Compliance has roughly 30 days to show the board which SOPs are affected, where the gaps are and who owns each fix. Today one officer reads the circular clause by clause against 15 to 40 SOPs and builds the tracker by hand.

## Steps

**1. Extract the obligations.** Open Copilot Chat (work account), attach the circular, then run:

:::prompt
EN: List every obligation in this circular as a table: clause number, the obligation in one sentence, who it applies to, effective date, and whether it is new, changed or unchanged versus prior rules. Quote the clause text exactly. Do not paraphrase numbers or deadlines.
ID: Buat tabel semua kewajiban dalam surat edaran ini: nomor pasal, kewajiban dalam satu kalimat, pihak yang wajib, tanggal berlaku, dan apakah kewajiban ini baru, berubah, atau tetap dibanding ketentuan sebelumnya. Kutip teks pasal secara persis. Jangan memparafrasekan angka atau tenggat waktu.
BM: Senaraikan setiap kewajipan dalam pekeliling ini dalam bentuk jadual: nombor klausa, kewajipan dalam satu ayat, pihak yang terlibat, tarikh berkuat kuasa, dan sama ada ia baharu, dipinda atau kekal berbanding peraturan terdahulu. Petik teks klausa dengan tepat. Jangan ubah angka atau tarikh akhir.
:::

**2. Map obligations to SOPs, in batches.** Group SOPs by domain (AML, KYC, complaints). Reference one batch of 5 to 8 with `/` and run:

:::prompt
EN: For each obligation in the table above, find the section of the attached SOPs that currently covers it. Return: obligation, SOP name, section, status (Covered, Partial, Not covered). Cite the SOP on every row. If nothing covers it, say Not covered. Do not guess.
ID: Untuk setiap kewajiban pada tabel di atas, temukan bagian SOP terlampir yang saat ini mengaturnya. Tampilkan: kewajiban, nama SOP, bagian, status (Terpenuhi, Sebagian, Belum diatur). Cantumkan rujukan SOP di setiap baris. Jika tidak ada, tulis Belum diatur. Jangan menebak.
BM: Bagi setiap kewajipan dalam jadual di atas, cari bahagian SOP yang dilampirkan yang meliputinya. Paparkan: kewajipan, nama SOP, bahagian, status (Dipatuhi, Separa, Tidak diliputi). Nyatakan rujukan SOP pada setiap baris. Jika tiada, tulis Tidak diliputi. Jangan meneka.
:::

**3. Build the tracker.** Paste each batch result into one Excel table. Ask Copilot in Excel to add *Owner*, *Action*, *Due date* and *Risk (H/M/L)* columns and sort by effective date.

**4. Draft the board note.** In Word, use *Draft with Copilot*, reference the tracker and ask for a 2-page note: summary, top 5 gaps, resourcing ask, timeline.

## Check it

- Spot-check 5 random clause quotes against the PDF, word for word.
- Every effective date must match the source exactly.
- A "Covered" row with no citation is unverified. Treat it as Not covered.

## When it goes wrong

- **Obligations in annexes are missed.** Re-run step 1 on the annex alone.
- **Too many "Not covered" rows.** Your batch was probably too large. Re-run with fewer SOPs.

## Take it further

- **L4 Agent (Copilot Studio):** a Regulation Q&A agent grounded only on regulator texts and your SOPs.
- **L3 Scout:** watch the regulator publications page and draft the step 1 table when a new circular appears.

:::presenter
**20-minute flow:** context 3 min, steps 1 and 2 live 8 min, tracker 4 min, board note 3 min, Q&A 2 min.

**Ask before you start:** How many circulars did you handle last year? Where do SOPs live? Who signs off the gap assessment?

**Questions you'll get:** "Does Copilot train on our SOPs?" and "Where is data processed?" Answer with the public enterprise data protection and data residency docs.

**Demo kit:** fictional circular, 12 fictional SOPs, finished tracker.
:::
