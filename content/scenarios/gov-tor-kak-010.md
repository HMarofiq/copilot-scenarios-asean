---
id: gov-tor-kak-010
title: { en: "Procurement TOR (KAK) and vendor proposal comparison", id: "Kerangka Acuan Kerja (KAK) dan perbandingan proposal penyedia", ms: "Terma rujukan perolehan dan perbandingan cadangan vendor" }
summary:
  en: "Draft the terms of reference from a requirement memo, then compare vendor proposals against it on price including VAT, validity, local content and data location."
  id: "Susun KAK dari memo kebutuhan, lalu bandingkan proposal penyedia terhadap KAK berdasarkan harga termasuk PPN, masa berlaku, TKDN, dan lokasi data."
  ms: "Sediakan terma rujukan daripada memo keperluan, kemudian bandingkan cadangan vendor berdasarkan harga termasuk cukai, tempoh sah, kandungan tempatan dan lokasi data."
industry: [government-soe]
department: [procurement]
persona: [procurement-officer]
market: [ID, MY]
difficulty: 2
surface: [copilot-chat, word, excel]
licence: [m365-copilot]
inputs:
  - { name: "Requirement memo from the user department", format: ".docx", where: "Procurement library", count: "1" }
  - { name: "TOR (KAK) template", format: ".docx", where: "Procurement library", count: "1" }
  - { name: "Vendor proposals", format: ".docx or .pdf (text-based)", where: "Tender folder", count: "3-6" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Procurement committee" }
impact: { baseline: "2-3 days for the KAK and comparison", target: "Half a day plus committee review", evidence: estimated }
card:
  problem: "Proposals quote prices with and without VAT, and one always has an expired validity date nobody spots."
  output: "A KAK draft in your template and a compliance table for every proposal, with prices normalised to include VAT and issues flagged."
limits:
  - "Copilot compares what is written in the proposals. It cannot check a vendor's TKDN certificate or legal standing."
  - "Scanned proposals cannot be read. Ask vendors for text-based PDFs or Word files."
  - "Copilot must not choose the winner. The evaluation committee decides."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: KAK drafted in all 8 template sections with the budget marked TO CONFIRM and nothing invented; comparison caught the expired validity, the TKDN shortfall, the offshore hosting and converted the price quoted without VAT; no winner recommended."
---

## Situation

A procurement officer at a state-owned holding writes the terms of reference (Kerangka Acuan Kerja, KAK) from a user department's memo, then compares the vendor proposals against it for the evaluation committee. Proposals quote prices differently, state local content (TKDN) and data hosting in different places, and validity dates are easy to miss.

## Steps

**1. Draft the KAK.** In Copilot Chat, type `/` and pick the requirement memo and your KAK template, then run:

:::prompt
EN: Using the attached memo, draft the terms of reference in the section headings of the attached KAK template, in the same order. Use only requirements stated in the memo. Where the memo gives no value (for example the budget), write [TO CONFIRM]. Put the mandatory requirements in the evaluation criteria as pass or fail.
ID: Dengan memo terlampir, susun KAK mengikuti judul bagian templat KAK terlampir, dengan urutan yang sama. Gunakan hanya kebutuhan yang disebutkan dalam memo. Jika memo tidak memberikan nilai (misalnya anggaran), tulis [PERLU KONFIRMASI]. Masukkan persyaratan wajib ke kriteria evaluasi sebagai lulus atau gugur.
BM: Menggunakan memo yang dilampirkan, sediakan terma rujukan mengikut tajuk bahagian templat yang dilampirkan, dalam susunan yang sama. Gunakan keperluan yang dinyatakan dalam memo sahaja. Jika memo tidak memberikan nilai (contohnya bajet), tulis [PERLU PENGESAHAN]. Masukkan keperluan wajib ke dalam kriteria penilaian sebagai lulus atau gagal.
:::

**2. Compare the proposals.** In the same chat, attach the vendor proposals with `/`, then run:

:::prompt
EN: Compare the attached proposals against the mandatory requirements in the KAK above. Table: one row per requirement, one column per vendor, each cell Compliant, Not compliant or Not stated, with the proposal section as evidence. Add rows for total price including VAT at the rate in the memo (convert any price quoted without VAT) and proposal validity date, flagging any validity that ends before the evaluation date. Do not recommend a winner; list the clarifications to request from each vendor.
ID: Bandingkan proposal terlampir dengan persyaratan wajib dalam KAK di atas. Tabel: satu baris per persyaratan, satu kolom per penyedia, setiap sel Memenuhi, Tidak memenuhi, atau Tidak disebutkan, dengan bagian proposal sebagai bukti. Tambahkan baris total harga termasuk PPN sesuai tarif di memo (konversikan harga yang belum termasuk PPN) dan masa berlaku proposal, tandai masa berlaku yang berakhir sebelum tanggal evaluasi. Jangan merekomendasikan pemenang; sebutkan klarifikasi yang perlu diminta dari setiap penyedia.
BM: Bandingkan cadangan yang dilampirkan dengan keperluan wajib dalam terma rujukan di atas. Jadual: satu baris bagi setiap keperluan, satu lajur bagi setiap vendor, setiap sel Mematuhi, Tidak mematuhi atau Tidak dinyatakan, dengan bahagian cadangan sebagai bukti. Tambah baris jumlah harga termasuk cukai pada kadar dalam memo (tukar harga yang tidak termasuk cukai) dan tarikh sah cadangan, tandakan tempoh sah yang tamat sebelum tarikh penilaian. Jangan cadangkan pemenang; senaraikan penjelasan yang perlu diminta daripada setiap vendor.
:::

**3. Hand over.** Ask Copilot to create a Word document with the KAK and a separate Excel file with the comparison table, then send both to the evaluation committee.

## Check it

- Recalculate every price that was quoted without VAT.
- Every validity date is compared with the evaluation date.
- Every Not compliant cell cites the proposal section it comes from.
- The KAK contains no requirement that is not in the memo, and the budget is [TO CONFIRM] until Finance confirms it.

## When it goes wrong

- **The cheapest vendor changes after VAT.** That is the point of the VAT row. Always compare prices including VAT.
- **A requirement shows Not stated for a vendor.** The proposal does not mention it, or uses a looser term (for example "work orders" instead of "preventive maintenance work orders"). Ask for a written clarification; do not assume compliance.
- **Copilot recommends a vendor.** Delete the recommendation. Keep "Do not recommend a winner" in the prompt.

## Take it further

- **L3 Scout:** after the submission deadline, collect all proposals from the tender folder, run the comparison and email the committee secretary a draft for review.
- **L4 Agent:** a procurement policy Q&A agent grounded on your procurement guidelines.

:::presenter
**Ask before you start:** Who writes the KAK today? How are prices compared? Who decides the winner?

**Timing on the validation run:** KAK about 35 seconds, comparison about 35 seconds.

**Demo kit:** a fictional requirement memo with no budget, a KAK template, and three fictional proposals: one quoted without VAT, one with an expired validity, one with TKDN below 40%, and one hosting data outside Indonesia. Show that the cheapest-looking offer is the most expensive after VAT.
:::
