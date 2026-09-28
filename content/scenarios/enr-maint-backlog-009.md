---
id: enr-maint-backlog-009
title: { en: "Maintenance backlog analysis from an SAP PM export", id: "Analisis backlog pemeliharaan dari ekspor SAP PM", ms: "Analisis tunggakan penyelenggaraan daripada eksport SAP PM" }
summary:
  en: "Clean an SAP PM order export and see the real open backlog by planner group and priority, including overdue urgent work."
  id: "Bersihkan ekspor order SAP PM dan lihat backlog terbuka yang sebenarnya per planner group dan prioritas, termasuk pekerjaan mendesak yang terlambat."
  ms: "Bersihkan eksport pesanan SAP PM dan lihat tunggakan terbuka sebenar mengikut kumpulan perancang dan keutamaan, termasuk kerja segera yang lewat."
industry: [energy-resources]
department: [operations]
persona: [maintenance-planner]
market: [ID, MY]
difficulty: 2
surface: [excel]
licence: [m365-copilot]
inputs:
  - { name: "SAP PM order list (IW38 or IW39 export)", format: ".xlsx", where: "Planner's OneDrive", count: "1 (100-5,000 rows)" }
data: { sensitivity: "Internal", customer_pii: false, signoff: "Maintenance Superintendent" }
impact: { baseline: "Half a day each week", target: "20 minutes each week", evidence: estimated }
card:
  problem: "Every Monday the planner cleans the SAP export by hand before the backlog meeting."
  output: "Duplicates removed, completed orders excluded, age and overdue columns, and a pivot of open orders and hours by planner group and priority."
limits:
  - "SAP exports dates as text such as 05.03.2026. Tell Copilot the format, or ages will be wrong."
  - "Format the export as an Excel table first. Copilot in Excel works on tables."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in Copilot in Excel in a demo tenant with the kit: 6 duplicates removed (156 to 150 rows), completed orders excluded, dates parsed day first with LEFT, MID and RIGHT formulas, and the pivot matched the key exactly: 119 open orders, 2,745 hours, 29 overdue priority 1 orders."
---

## Situation

A maintenance planner at a mine or mill exports the open work orders from SAP PM every week for the backlog meeting. The export mixes open and technically completed orders, dates come out as text, and extracts are sometimes run twice. Cleaning it by hand takes half a day.

## Steps

**1. Export and open.** Export the order list from SAP (IW38 or IW39) to Excel, upload it to OneDrive, open it in Excel for the web and format the data as a table (Ctrl+T).

**2. Clean and classify.** Select a cell in the table, open Copilot, and run (replace the date with your extract date):

:::prompt
EN: This is an SAP PM order export. Dates are text in DD.MM.YYYY format. First remove rows that are exact duplicates. Then add a column Backlog: No if System Status contains TECO or CLSD, otherwise Yes. Add a column Age in days from Created On to 28 September 2026, and a column Overdue: Yes if Backlog is Yes and Basic Start is before 28 September 2026. Tell me how many duplicates you removed.
ID: Ini adalah ekspor order SAP PM. Tanggal berupa teks dengan format DD.MM.YYYY. Pertama hapus baris yang duplikat persis. Lalu tambahkan kolom Backlog: No jika System Status mengandung TECO atau CLSD, selain itu Yes. Tambahkan kolom Age dalam hari dari Created On sampai 28 September 2026, dan kolom Overdue: Yes jika Backlog Yes dan Basic Start sebelum 28 September 2026. Sebutkan berapa duplikat yang dihapus.
BM: Ini ialah eksport pesanan SAP PM. Tarikh ialah teks dalam format DD.MM.YYYY. Mula-mula buang baris yang pendua tepat. Kemudian tambah lajur Backlog: No jika System Status mengandungi TECO atau CLSD, jika tidak Yes. Tambah lajur Age dalam hari dari Created On hingga 28 September 2026, dan lajur Overdue: Yes jika Backlog Yes dan Basic Start sebelum 28 September 2026. Beritahu berapa pendua yang dibuang.
:::

**3. Summarise.** In the same Copilot pane:

:::prompt
EN: Create a PivotTable of rows where Backlog is Yes: count of orders and sum of Est. Hours by Planner Group and Priority. Then list the priority 1 orders that are overdue.
ID: Buat PivotTable untuk baris dengan Backlog Yes: jumlah order dan total Est. Hours per Planner Group dan Priority. Lalu tampilkan order prioritas 1 yang terlambat.
BM: Bina PivotTable bagi baris dengan Backlog Yes: bilangan pesanan dan jumlah Est. Hours mengikut Planner Group dan Priority. Kemudian senaraikan pesanan keutamaan 1 yang lewat.
:::

## Check it

- Rows before minus rows after must equal the number of duplicates Copilot reported.
- Filter System Status for TECO and CLSD: every one of those rows must show Backlog No.
- Spot-check the Age of two orders created in the first days of a month (for example 05.03.2026). A wrong age means the date was read month first.

## When it goes wrong

- **Ages are negative or huge.** The dates were read as month first. Keep "DD.MM.YYYY" in the prompt, or convert the columns with Data > Text to Columns first.
- **Completed orders still count as backlog.** Your SAP status text may differ (for example DLFL). Add it to the Backlog rule.
- **Copilot does not say how many duplicates it removed.** Compare the row count before and after, or ask it in the same pane.
- **The duplicate count is zero but you know the extract ran twice.** The duplicates are not exact (for example a changed status). Ask Copilot to find repeated order numbers instead.

## Take it further

- **L3 Scout:** every Monday at 06:00, pick up the new export from the folder, run the cleaning steps and leave the overdue priority 1 list in the planners' Teams channel.
- **L2 Copilot in Excel:** add a chart of backlog hours by week to see whether the backlog is growing.

:::presenter
**Ask before you start:** Which SAP transaction do you export from? How do you know an order is finished? How big is your weekly export?

**Timing on the validation run:** step 2 about 1 minute, step 3 about 2 minutes. Copilot writes Age and Overdue as formulas, so next week's export recalculates.

**Demo kit:** a fictional 156-row IW38-style export from a nickel mine with 6 duplicate rows, completed orders marked TECO and CLSD, and dates as text. Show the Age of an order created on 05.03.2026.
:::
