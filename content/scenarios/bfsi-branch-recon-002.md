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
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: draft
---

## Situation

Branch operations reconciles the general ledger against teller cash and ATM settlement every week. Breaks come from timing differences, reversed transactions and the occasional genuine shortage. Today this is VLOOKUP by hand across three files.

## Steps

**1. Put the three exports on one workbook,** one sheet each, each formatted as a table (Ctrl+T). Remove account numbers you don't need for matching.

**2. Find the breaks.** On the GL sheet, open Copilot in Excel:

:::prompt
EN: Compare this table with the Teller and ATM tables. Match on Reference No, ignoring leading zeros, then check Amount and date. Add a column Match Status with exactly one of: Matched, Date difference (same reference and amount, different date), Amount difference, Missing in Teller, Missing in ATM. Then add a column Likely Cause: timing (dates differ by 1 day), reversal (the same reference appears twice in this table with opposite signs), or investigate (anything else). Leave Likely Cause blank for Matched rows.
ID: Bandingkan tabel ini dengan tabel Teller dan ATM. Cocokkan berdasarkan No Referensi dengan mengabaikan angka nol di depan, lalu periksa Nominal dan tanggal. Tambahkan kolom Status Cocok berisi salah satu dari: Cocok, Beda tanggal (referensi dan nominal sama, tanggal berbeda), Selisih nominal, Tidak ada di Teller, Tidak ada di ATM. Lalu tambahkan kolom Dugaan Penyebab: waktu (tanggal beda 1 hari), pembalikan (referensi yang sama muncul dua kali di tabel ini dengan tanda berlawanan), atau perlu investigasi (selain itu). Kosongkan Dugaan Penyebab untuk baris yang Cocok.
BM: Bandingkan jadual ini dengan jadual Teller dan ATM. Padankan menggunakan No Rujukan dengan mengabaikan sifar di hadapan, kemudian semak Amaun dan tarikh. Tambah lajur Status Padanan dengan salah satu daripada: Sepadan, Beza tarikh (rujukan dan amaun sama, tarikh berbeza), Beza amaun, Tiada dalam Teller, Tiada dalam ATM. Kemudian tambah lajur Punca Mungkin: masa (tarikh berbeza 1 hari), pembalikan (rujukan yang sama muncul dua kali dalam jadual ini dengan tanda bertentangan), atau perlu siasatan (selain itu). Biarkan Punca Mungkin kosong bagi baris yang Sepadan.
:::

**3. Summarise.** Ask for a PivotTable of break count and total amount by Likely Cause.

**4. Send the pack.** In Outlook, draft to the area manager with Copilot, attaching the workbook, and list only the "investigate" items with amounts.

## Check it

- Matched total plus break total must equal the GL control total for the week.
- Re-count breaks with a COUNTIF on Match Status and compare with the pivot.

## When it goes wrong

- **Everything shows as unmatched.** Reference numbers are formatted differently between files (here, the GL keeps leading zeros and the teller system drops them). Keep "ignoring leading zeros" in the prompt, or ask Copilot to add a cleaned reference column first.
- **Timing breaks show as Matched.** The prompt had no "Date difference" status, so Copilot matched on reference and amount only. Use the prompt above as written.

## Take it further

- **L3 Scout:** every Monday at 07:00, pick up the three exports from the folder, run the match and leave a draft email for review.

:::presenter
**Ask before you start:** How many branches? Which core banking system? Who investigates breaks today?

**Demo kit:** three fictional exports with 14 seeded breaks (6 timing, 4 reversal pairs, 4 investigate), a leading-zero trap, and an answer key. Download it from the panel on this page.
:::
