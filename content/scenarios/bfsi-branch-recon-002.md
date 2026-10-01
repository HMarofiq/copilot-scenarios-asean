---
id: bfsi-branch-recon-002
title: { en: "Weekly branch reconciliation pack", id: "Paket rekonsiliasi cabang mingguan", ms: "Pek penyesuaian cawangan mingguan" }
summary:
  en: "Match core banking, teller and ATM settlement exports, classify breaks and send the Monday pack to the area manager."
  id: "Cocokkan data core banking, teller, dan settlement ATM, klasifikasikan selisih, lalu kirim paket Senin ke area manager."
  ms: "Padankan eksport perbankan teras, juruwang dan penyelesaian ATM, kelaskan perbezaan dan hantar pek Isnin kepada pengurus kawasan."
industry: [banking-insurance]
department: [operations, finance]
persona: [branch-ops-manager]
market: [ID, MY]
difficulty: 2
surface: [excel, outlook]
licence: [m365-copilot]
inputs:
  - { name: "Core banking GL export", format: ".xlsx", where: "Ops shared drive", count: "1 per week" }
  - { name: "Teller cash position", format: ".csv", where: "Teller system export", count: "1 per week" }
  - { name: "ATM switch settlement", format: ".csv", where: "Switch operator portal", count: "1 per week" }
data: { sensitivity: "Confidential", customer_pii: true, signoff: "Branch Operations Manager" }
impact: { baseline: "4 hours per week", target: "1 hour per week", evidence: estimated }
card:
  problem: "Every Monday the branch ops manager hand-matches three exports before 10am."
  output: "Break list classified by cause, with totals that tie to the GL control total, plus a summary email."
limits:
  - "Format each export as an Excel table first. Copilot in Excel works on tables."
  - "Very large exports should be trimmed to the week with Power Query before prompting."
  - "If your tenant requires a sensitivity label, Excel asks for one before you can edit. Copilot works on the labelled, encrypted workbook."
  - "An encrypting label can block Export, Download and Print. Share the workbook as a link instead of attaching a copy."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run end to end in a demo tenant on a Confidential (encrypted) workbook: 132 of 132 GL rows classified correctly, all 14 seeded breaks found, no false positives. Pivot totals and the email's four investigate items matched the answer key."
---

## Situation

Branch operations matches the ledger, teller cash and ATM settlement each week. Replace manual VLOOKUPs across three files with a reconciliation that separates timing, reversals and genuine shortages.

## Steps

**1. Put the three exports on one workbook,** one sheet each, each formatted as a table (Ctrl+T) and named GL, Teller and ATM. Remove account numbers you don't need for matching. If Excel asks for a sensitivity label, choose your bank's Confidential label.

**2. Find the breaks.** On the GL sheet, open Copilot in Excel:

:::prompt
EN: Compare this table with the Teller and ATM tables. Match on Reference No, ignoring leading zeros, then check Amount and date. Add a column Match Status with exactly one of: Matched, Date difference (same reference and amount, different date), Amount difference, Missing in Teller, Missing in ATM. Then add a column Likely Cause: timing (dates differ by 1 day), reversal (the same reference appears twice in this table with opposite signs), or investigate (anything else). Leave Likely Cause blank for Matched rows.
ID: Bandingkan tabel ini dengan tabel Teller dan ATM. Cocokkan berdasarkan No Referensi dengan mengabaikan angka nol di depan, lalu periksa Nominal dan tanggal. Tambahkan kolom Status Cocok berisi salah satu dari: Cocok, Beda tanggal (referensi dan nominal sama, tanggal berbeda), Selisih nominal, Tidak ada di Teller, Tidak ada di ATM. Lalu tambahkan kolom Dugaan Penyebab: waktu (tanggal beda 1 hari), pembalikan (referensi yang sama muncul dua kali di tabel ini dengan tanda berlawanan), atau perlu investigasi (selain itu). Kosongkan Dugaan Penyebab untuk baris yang Cocok.
BM: Bandingkan jadual ini dengan jadual Teller dan ATM. Padankan menggunakan No Rujukan dengan mengabaikan sifar di hadapan, kemudian semak Amaun dan tarikh. Tambah lajur Status Padanan dengan salah satu daripada: Sepadan, Beza tarikh (rujukan dan amaun sama, tarikh berbeza), Beza amaun, Tiada dalam Teller, Tiada dalam ATM. Kemudian tambah lajur Punca Mungkin: masa (tarikh berbeza 1 hari), pembalikan (rujukan yang sama muncul dua kali dalam jadual ini dengan tanda bertentangan), atau perlu siasatan (selain itu). Biarkan Punca Mungkin kosong bagi baris yang Sepadan.
:::

**3. Summarise.** In the same Copilot pane:

:::prompt
EN: Create a PivotTable of break count and total amount by Likely Cause.
ID: Buat PivotTable jumlah selisih dan total nominal per Dugaan Penyebab.
BM: Bina PivotTable bilangan perbezaan dan jumlah amaun mengikut Punca Mungkin.
:::

**4. Draft the pack.** Open Copilot Chat (in Outlook or at m365.cloud.microsoft), type `/` and pick the workbook, then run the prompt below. Paste the result into a new email and share the workbook as a link.

:::prompt
EN: Using this workbook, draft an email to the area manager about this week's reconciliation. Open with one sentence giving the number of breaks and total amount for each Likely Cause. Then show only the rows where Likely Cause is investigate, as a table with Reference No, Match Status and Amount IDR. End by asking for an owner for each investigate item by Wednesday. Keep it under 150 words. Do not include customer names or account numbers.
ID: Dengan workbook ini, buat draf email kepada area manager tentang rekonsiliasi minggu ini. Awali dengan satu kalimat berisi jumlah selisih dan total nominal untuk setiap Dugaan Penyebab. Lalu tampilkan hanya baris dengan Dugaan Penyebab perlu investigasi, dalam tabel berisi No Referensi, Status Cocok, dan Nominal. Tutup dengan meminta penanggung jawab untuk setiap item investigasi paling lambat hari Rabu. Maksimal 150 kata. Jangan cantumkan nama nasabah atau nomor rekening.
BM: Menggunakan buku kerja ini, sediakan draf e-mel kepada pengurus kawasan tentang penyesuaian minggu ini. Mulakan dengan satu ayat yang menyatakan bilangan perbezaan dan jumlah amaun bagi setiap Punca Mungkin. Kemudian paparkan hanya baris dengan Punca Mungkin perlu siasatan, dalam jadual dengan No Rujukan, Status Padanan dan Amaun. Akhiri dengan meminta pemilik bagi setiap item siasatan selewat-lewatnya hari Rabu. Tidak melebihi 150 patah perkataan. Jangan masukkan nama pelanggan atau nombor akaun.
:::

> Copilot writes the Match Status and Likely Cause columns as formulas, not typed values. Next week, paste the new exports into the same tables and the columns recalculate. Check the formulas once (click a cell in Match Status) so you know what they test.

## Check it

- Matched total plus break total must equal the GL control total for the week.
- Re-count breaks with a COUNTIF on Match Status and compare with the pivot.
- Every reference number in the email must exist in the workbook. Search for each one (Ctrl+F) before you send.

## When it goes wrong

- **Everything shows as unmatched.** Reference numbers are formatted differently between files (here, the GL keeps leading zeros and the teller system drops them). Keep "ignoring leading zeros" in the prompt, or ask Copilot to add a cleaned reference column first.
- **Timing breaks show as Matched.** The prompt had no "Date difference" status, so Copilot matched on reference and amount only. Use the prompt above as written.
- **Copilot says it is retrying.** It sometimes reads a table the wrong way first and corrects itself. Wait for Done before checking the result.
- **Export and Download are greyed out.** Your sensitivity label blocks copies. This is expected; share a link to the workbook instead.
- **Typing `/` in the email body does nothing.** File references work in Copilot Chat, not in the inline Help me write box. Use Copilot Chat for step 4.

## Take it further

- **L3 Scout:** every Monday at 07:00, pick up the three exports from the folder, run the match and leave a draft email for review.

:::presenter
**Ask before you start:** How many branches? Which core banking system? Who investigates breaks today?

**Timing on the validation run:** step 2 took about 1 minute, step 3 about 1 minute, step 4 about 40 seconds.

**Demo kit:** three fictional exports with 14 seeded breaks (6 timing, 4 reversal pairs, 4 investigate), a leading-zero trap, and an answer key. Download it from the panel on this page.
:::
