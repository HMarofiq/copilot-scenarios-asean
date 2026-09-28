---
id: x-mgmt-report-011
title: { en: "Monthly management report variance commentary", id: "Komentar varians laporan manajemen bulanan", ms: "Ulasan varians laporan pengurusan bulanan" }
summary:
  en: "Write the monthly P&L variance commentary for material lines only, with favourable and unfavourable right for costs, and explanations only from cost centre notes."
  id: "Tulis komentar varians laba rugi bulanan hanya untuk pos material, dengan favorable dan unfavorable yang benar untuk biaya, dan penjelasan hanya dari catatan pemilik cost center."
  ms: "Tulis ulasan varians untung rugi bulanan bagi baris material sahaja, dengan menguntungkan dan tidak menguntungkan yang betul untuk kos, dan penjelasan daripada nota pemilik pusat kos sahaja."
industry: [cross-industry]
department: [finance]
persona: [finance-controller]
market: [ID, MY]
difficulty: 2
surface: [copilot-chat, excel, word]
licence: [m365-copilot]
inputs:
  - { name: "Management accounts (P&L budget, actual, last year)", format: ".xlsx", where: "Finance library", count: "1" }
  - { name: "Cost centre owner notes", format: "Sheet in the same workbook", where: "Finance library", count: "1" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Finance Director" }
impact: { baseline: "1 day each month-end", target: "1 hour including review", evidence: estimated }
card:
  problem: "Month-end commentary is written line by line, and someone always calls a cost underspend unfavourable."
  output: "Commentary on material variances only, with the right favourable or unfavourable label, explanations from owner notes, and a full variance table."
limits:
  - "Copilot only explains what the notes explain. Lines without a note are marked for the owner."
  - "State your materiality rule in the prompt. Without it, Copilot comments on every line."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: all 10 lines labelled correctly, including the cost underspend as Favourable and the zero-budget line; exactly the 5 material lines; the 2 lines without notes kept as [Owner to explain]; profit against budget and last year correct in the Word brief."
---

## Situation

At month-end the finance controller or FP&A analyst writes commentary on the P&L: which lines moved against budget, why, and how they compare with last year. Only material variances should be explained, cost lines work the opposite way to income, and explanations must come from the cost centre owners.

## Steps

**1. Prepare the workbook.** One sheet with each P&L line, its type (Income or Cost), budget, actual and last year; a Notes sheet with the owners' explanations. Open it once in Excel for the web.

**2. Write the commentary.** In Copilot Chat, type `/` and pick the workbook, then run:

:::prompt
EN: Using this management accounts workbook, write the variance commentary for September year to date. For each line work out the variance against budget and say Favourable or Unfavourable: for Income lines, actual above budget is favourable; for Cost lines, actual below budget is favourable. Comment only on material lines: a variance of at least IDR 500 million and at least 5% of budget (if the budget is zero, IDR 500 million only). Explain each material line only from the Notes sheet; if there is no note, write [Owner to explain]. Add one phrase comparing with last year. End with a table of every line: variance, % of budget, Favourable or Unfavourable, and Material Yes or No.
ID: Dengan workbook laporan manajemen ini, tulis komentar varians untuk September year to date. Untuk setiap pos hitung varians terhadap anggaran dan sebutkan Favorable atau Unfavorable: untuk pos Income, realisasi di atas anggaran berarti favorable; untuk pos Cost, realisasi di bawah anggaran berarti favorable. Beri komentar hanya untuk pos material: varians minimal IDR 500 juta dan minimal 5% dari anggaran (jika anggaran nol, cukup IDR 500 juta). Jelaskan setiap pos material hanya dari sheet Notes; jika tidak ada catatan, tulis [Pemilik perlu menjelaskan]. Tambahkan satu frasa perbandingan dengan tahun lalu. Akhiri dengan tabel semua pos: varians, % dari anggaran, Favorable atau Unfavorable, dan Material Ya atau Tidak.
BM: Menggunakan buku kerja akaun pengurusan ini, tulis ulasan varians bagi September tahun hingga kini. Bagi setiap baris kira varians berbanding bajet dan nyatakan Menguntungkan atau Tidak menguntungkan: bagi baris Income, sebenar melebihi bajet adalah menguntungkan; bagi baris Cost, sebenar di bawah bajet adalah menguntungkan. Ulas baris material sahaja: varians sekurang-kurangnya IDR 500 juta dan sekurang-kurangnya 5% daripada bajet (jika bajet sifar, IDR 500 juta sahaja). Terangkan setiap baris material daripada helaian Notes sahaja; jika tiada nota, tulis [Pemilik perlu menerangkan]. Tambah satu frasa perbandingan dengan tahun lepas. Akhiri dengan jadual semua baris: varians, % daripada bajet, Menguntungkan atau Tidak menguntungkan, dan Material Ya atau Tidak.
:::

**3. Create the report.** In the same chat:

:::prompt
EN: Create a one-page Word document for the Direksi: a three-sentence summary of the result against budget, the commentary on material lines, and the full variance table. Keep every [Owner to explain] marker.
ID: Buat dokumen Word satu halaman untuk Direksi: ringkasan tiga kalimat hasil terhadap anggaran, komentar untuk pos material, dan tabel varians lengkap. Pertahankan setiap penanda [Pemilik perlu menjelaskan].
BM: Bina dokumen Word satu halaman untuk Lembaga Pengarah: ringkasan tiga ayat hasil berbanding bajet, ulasan baris material, dan jadual varians penuh. Kekalkan setiap penanda [Pemilik perlu menerangkan].
:::

## Check it

- For every Cost line, check the label by hand: below budget must be Favourable.
- Count the material lines against your rule, including the line with no budget.
- Every explanation must come from the Notes sheet, word for word in meaning.
- Chase every [Owner to explain] before the report goes out.

## When it goes wrong

- **A cost underspend is called unfavourable.** The Type column is missing or ignored. Add it and keep the Income and Cost sentence in the prompt.
- **Copilot explains a line nobody wrote a note for.** Delete it and ask the owner. Keep [Owner to explain] in the prompt.
- **A line with no budget has no variance or shows an error.** Say in the prompt how to treat a zero budget, as above.

## Take it further

- **L3 Scout:** on working day 2, check the Notes sheet and remind owners of material lines that have no note yet.
- **L2 Copilot in Excel:** add Variance, % and Material columns as formulas so the workbook flags lines itself.

:::presenter
**Ask before you start:** What is your materiality rule? Who writes the notes? How many P&L lines do you report?

**Demo kit:** a fictional 10-line P&L with a cost line under budget (favourable), a line with no budget, a one-off in the notes, and two material lines with no note.
:::
