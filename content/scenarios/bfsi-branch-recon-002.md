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
validated_on: 2026-09-26
---

## Situation

Branch operations reconciles the general ledger against teller cash and ATM settlement every week. Breaks come from timing differences, reversed transactions and the occasional genuine shortage. Today this is VLOOKUP by hand across three files.

## Steps

**1. Put the three exports on one workbook,** one sheet each, each formatted as a table (Ctrl+T). Remove account numbers you don't need for matching.

**2. Find the breaks.** On the GL sheet, open Copilot in Excel:

:::prompt
EN: Compare this table with the Teller and ATM tables using Reference No and Amount. Add a column Match Status with Matched, Amount difference, Missing in Teller, Missing in ATM. Then add a column Likely Cause using: timing (value date differs by 1 day), reversal (same ref, opposite sign), or investigate.
ID: Bandingkan tabel ini dengan tabel Teller dan ATM berdasarkan No Referensi dan Nominal. Tambahkan kolom Status Cocok berisi Cocok, Selisih nominal, Tidak ada di Teller, Tidak ada di ATM. Lalu tambahkan kolom Dugaan Penyebab: waktu (tanggal valuta beda 1 hari), pembalikan (referensi sama, tanda berlawanan), atau perlu investigasi.
BM: Bandingkan jadual ini dengan jadual Teller dan ATM menggunakan No Rujukan dan Amaun. Tambah lajur Status Padanan: Sepadan, Beza amaun, Tiada dalam Teller, Tiada dalam ATM. Kemudian tambah lajur Punca Mungkin: masa (tarikh nilai berbeza 1 hari), pembalikan (rujukan sama, tanda bertentangan), atau perlu siasatan.
:::

**3. Summarise.** Ask for a PivotTable of break count and total amount by Likely Cause.

**4. Send the pack.** In Outlook, draft to the area manager with Copilot, attaching the workbook, and list only the "investigate" items with amounts.

## Check it

- Matched total plus break total must equal the GL control total for the week.
- Re-count breaks with a COUNTIF on Match Status and compare with the pivot.

## When it goes wrong

- **Everything shows as unmatched.** Reference numbers have leading zeros in one file and not the other. Ask Copilot to add a cleaned reference column first.

## Take it further

- **L3 Scout:** every Monday at 07:00, pick up the three exports from the folder, run the match and leave a draft email for review.

:::presenter
**Ask before you start:** How many branches? Which core banking system? Who investigates breaks today?

**Demo kit:** three fictional exports with 14 seeded breaks (6 timing, 4 reversal, 4 investigate).
:::
