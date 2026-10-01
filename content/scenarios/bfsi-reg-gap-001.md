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
  - { name: "Circular it replaces (optional)", format: "PDF (text-based)", where: "Regulator website", count: "0-2" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Head of Compliance" }
impact: { baseline: "3-5 working days", target: "0.5 day draft + 1 day review", evidence: estimated }
card:
  problem: "A new circular lands and the board wants a gap assessment in 30 days."
  output: "Obligations tracker with an SOP citation on every row, plus a 2-page board note."
limits:
  - "Validated with 12 SOPs in one prompt. For 15 to 40, batch by domain; larger single batches were not tested."
  - "The / picker can silently fail to attach a file. Count the file chips before you press Enter."
  - "Copilot can only say what is new or changed if you attach the circular it replaces."
  - "Scanned (image) PDFs cannot be read. OCR them first."
  - "Files Copilot creates may need a sensitivity label before you can edit them."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run end to end in a demo tenant with the kit: all 12 keyed obligations plus 2 the key had missed, exact quotes and dates, 13 of 14 SOP mappings identical to the key (the device-change trap marked Partial with a correct explanation), no distractor SOP cited. Tracker and board note created as files and checked."
---

## Situation

A new circular gives Compliance about 30 days to report gaps to the board. Compare it with 15 to 40 SOPs and identify each affected procedure, gap and owner without building the tracker by hand.

## Steps

**1. Extract the obligations.** Open Copilot Chat (work account), type `/` and pick the circular (and the circular it replaces, if you have it), then run:

:::prompt
EN: List every obligation in this circular as a table: clause number, the exact clause text, the obligation in one sentence, who it applies to, and effective date. Include obligations in annexes and transitional provisions. If I attached the circular it replaces, add a column saying whether each obligation is new, changed or unchanged; otherwise leave that column out. Do not paraphrase numbers or deadlines.
ID: Buat tabel semua kewajiban dalam surat edaran ini: nomor pasal, teks pasal persis, kewajiban dalam satu kalimat, pihak yang wajib, dan tanggal berlaku. Sertakan kewajiban di lampiran dan ketentuan peralihan. Jika saya melampirkan surat edaran yang digantikan, tambahkan kolom apakah setiap kewajiban baru, berubah, atau tetap; jika tidak, jangan buat kolom itu. Jangan memparafrasekan angka atau tenggat waktu.
BM: Senaraikan setiap kewajipan dalam pekeliling ini dalam bentuk jadual: nombor klausa, teks klausa yang tepat, kewajipan dalam satu ayat, pihak yang terlibat, dan tarikh berkuat kuasa. Masukkan kewajipan dalam lampiran dan peruntukan peralihan. Jika saya melampirkan pekeliling yang digantikan, tambah lajur sama ada setiap kewajipan baharu, dipinda atau kekal; jika tidak, jangan buat lajur itu. Jangan ubah angka atau tarikh akhir.
:::

**2. Map obligations to SOPs.** In the same chat, reference the SOPs with `/`, one at a time. Up to 12 in one prompt worked in validation; with more, batch by domain (complaints, KYC, AML, then the rest) and Copilot merges the batches into one table. **Before you press Enter, count the file chips** (for example 3 shown + "+9" = 12). Then run:

:::prompt
EN: For each obligation in the table above, find the section of the attached SOPs that currently covers it. Return: obligation, SOP name, section, status (Covered, Partial, Not covered). Cite the SOP on every row. If nothing covers it, say Not covered. Do not guess.
ID: Untuk setiap kewajiban pada tabel di atas, temukan bagian SOP terlampir yang saat ini mengaturnya. Tampilkan: kewajiban, nama SOP, bagian, status (Terpenuhi, Sebagian, Belum diatur). Cantumkan rujukan SOP di setiap baris. Jika tidak ada, tulis Belum diatur. Jangan menebak.
BM: Bagi setiap kewajipan dalam jadual di atas, cari bahagian SOP yang dilampirkan yang meliputinya. Paparkan: kewajipan, nama SOP, bahagian, status (Dipatuhi, Separa, Tidak diliputi). Nyatakan rujukan SOP pada setiap baris. Jika tiada, tulis Tidak diliputi. Jangan meneka.
:::

**3. Build the tracker.** Still in the same chat:

:::prompt
EN: Create an Excel workbook from the mapping table above: one row per obligation with Clause, Obligation, Effective date, SOP, Section, Status, plus empty columns Owner, Action and Due date, and a column Risk (H for Not covered, M for Partial, L for Covered). Sort by Effective date, then Risk.
ID: Buat workbook Excel dari tabel pemetaan di atas: satu baris per kewajiban berisi Pasal, Kewajiban, Tanggal berlaku, SOP, Bagian, Status, ditambah kolom kosong Pemilik, Tindakan dan Tenggat, serta kolom Risiko (H untuk Belum diatur, M untuk Sebagian, L untuk Terpenuhi). Urutkan berdasarkan Tanggal berlaku, lalu Risiko.
BM: Bina buku kerja Excel daripada jadual pemetaan di atas: satu baris bagi setiap kewajipan dengan Klausa, Kewajipan, Tarikh berkuat kuasa, SOP, Bahagian, Status, serta lajur kosong Pemilik, Tindakan dan Tarikh akhir, dan lajur Risiko (H untuk Tidak diliputi, M untuk Separa, L untuk Dipatuhi). Susun mengikut Tarikh berkuat kuasa, kemudian Risiko.
:::

Copilot saves the workbook to your OneDrive. Open it, apply your sensitivity label if asked, and fill in Owner, Action and Due date with the process owners.

**4. Draft the board note.** Still in the same chat:

:::prompt
EN: Using the tracker above, create a Word document: a board note of no more than 2 pages on this circular. Sections: Summary (what it requires and by when), Top 5 gaps ranked by risk then effective date, Resourcing ask, and Timeline to the last effective date. Cite clause numbers. Do not claim what changed from earlier circulars unless I attached them.
ID: Dengan pelacak di atas, buat dokumen Word: nota untuk Direksi maksimal 2 halaman tentang surat edaran ini. Bagian: Ringkasan (apa yang diwajibkan dan kapan), 5 kesenjangan teratas diurutkan berdasarkan risiko lalu tanggal berlaku, Kebutuhan sumber daya, dan Linimasa sampai tanggal berlaku terakhir. Cantumkan nomor pasal. Jangan menyatakan apa yang berubah dari surat edaran sebelumnya kecuali saya melampirkannya.
BM: Menggunakan penjejak di atas, bina dokumen Word: nota Lembaga tidak melebihi 2 halaman tentang pekeliling ini. Bahagian: Ringkasan (apa yang diwajibkan dan bila), 5 jurang utama disusun mengikut risiko kemudian tarikh berkuat kuasa, Keperluan sumber, dan Garis masa hingga tarikh berkuat kuasa terakhir. Nyatakan nombor klausa. Jangan nyatakan apa yang berubah daripada pekeliling terdahulu melainkan saya melampirkannya.
:::

## Check it

- Spot-check 5 random clause quotes against the PDF, word for word.
- Every effective date must match the source exactly.
- A "Covered" row with no citation is unverified. Treat it as Not covered.
- Every SOP you attached should either be cited or be clearly irrelevant. An SOP you expected to see that is never cited may not have attached.
- Status counts in the board note must equal the counts in the tracker.

## When it goes wrong

- **Obligations in annexes are missed.** Re-run step 1 on the annex alone.
- **An obligation you know is covered shows Not covered.** The SOP that covers it probably did not attach. In validation, 1 of 6 files silently failed to attach; Copilot then correctly reported Not covered. Re-attach it and re-run.
- **The new or changed column says "not specified".** You did not attach the circular it replaces. That is the correct answer; attach it if you need the comparison.
- **A table in the board note runs off the page.** In Word, select the table, then Layout > AutoFit > AutoFit Window.
- **You cannot edit the tracker Copilot created.** Your tenant requires a sensitivity label first. Select one from the banner.

## Take it further

- **L4 Agent (Copilot Studio):** a Regulation Q&A agent grounded only on regulator texts and your SOPs.
- **L3 Scout:** watch the regulator publications page and draft the step 1 table when a new circular appears.

:::presenter
**20-minute flow:** context 3 min, steps 1 and 2 live 8 min, tracker 4 min, board note 3 min, Q&A 2 min.

**Ask before you start:** How many circulars did you handle last year? Where do SOPs live? Who signs off the gap assessment?

**Questions you'll get:** "Does Copilot train on our SOPs?" and "Where is data processed?" Answer with the public enterprise data protection and data residency docs.

**Timing on the validation run:** step 1 about 50 seconds, step 2 about 40 seconds per batch, tracker and board note about 90 seconds each.

**Demo kit:** fictional circular (14 obligations, 3 in annexes and transitional provisions), 12 fictional SOPs including 2 distractors, and an answer key. Show the device-change clause 5.2: a weak answer marks it Covered because an SOP mentions device binding by OTP.
:::
