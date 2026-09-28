---
id: gov-portfolio-004
title: { en: "Holding portfolio review from subsidiary reports", id: "Tinjauan portofolio holding dari laporan anak usaha", ms: "Semakan portfolio syarikat induk daripada laporan anak syarikat" }
summary:
  en: "Delegate the monthly consolidation of 20 subsidiary reports into one portfolio pack with RAG status."
  id: "Delegasikan konsolidasi bulanan 20 laporan anak usaha menjadi satu paket portofolio dengan status RAG."
  ms: "Serahkan penyatuan bulanan 20 laporan anak syarikat kepada satu pek portfolio dengan status RAG."
industry: [government-soe]
department: [strategy, finance]
persona: [strategy-office]
market: [ID, MY]
difficulty: 2
surface: [cowork, excel, powerpoint]
licence: [m365-copilot, cowork]
inputs:
  - { name: "Subsidiary monthly reports", format: ".pptx / .xlsx mix", where: "SharePoint, one folder per subsidiary", count: "~20" }
  - { name: "KPI target sheet", format: ".xlsx", where: "Strategy office library", count: "1" }
data: { sensitivity: "Highly Confidential", customer_pii: false, signoff: "Head of Strategy" }
impact: { baseline: "3 analyst days per month", target: "0.5 day review", evidence: estimated }
card:
  problem: "Twenty subsidiaries report in twenty formats. The holding needs one view by the 10th."
  output: "Consolidated KPI table vs target, RAG status per subsidiary, and a 10-slide review deck."
limits:
  - "Subsidiaries that report as images or scanned PDFs are skipped and listed."
  - "Verify Cowork availability and current behaviour on the public docs before running."
  - "Cowork runs for a while: about 20 minutes in validation for 20 subsidiaries, most of it spent building and checking the deck. Start it and come back."
  - "Outputs are saved in OneDrive under Documents › Cowork › Tasks › <task name> › output."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run end to end as a Cowork task in a demo tenant with the kit: all 20 subsidiaries handled correctly, the missing and image-only reports listed as not read, IDR millions and USD converted with the rate from the target sheet, all 6 Reds right, portfolio and sector totals matched. The 10-slide deck used no invented drivers. About 20 minutes."
---

## Situation

A holding company's strategy office (PMO) consolidates monthly reports from its subsidiaries. Formats differ, KPIs are named differently and a few always arrive late.

## Steps

**1. Delegate the task to Cowork.** Open Copilot, select the **Cowork** tab, and give it a new task. If your reports are on a SharePoint site rather than in OneDrive, name the site and library in the prompt.

:::prompt
EN: Go through each subsidiary folder in the Portfolio Reports folder for September. Extract revenue, EBITDA, capex and headcount against the KPI target sheet in that folder. Convert every figure to the unit of the target sheet and say which subsidiaries you converted. Build one Excel table, one row per subsidiary, with RAG status (Red below 90% of target, Amber 90-100%, Green above). List subsidiaries you could not read and why. Then build a 10-slide deck: portfolio summary, top 3 reds with drivers, and one slide per sector.
ID: Periksa setiap folder anak usaha di folder Portfolio Reports untuk bulan September. Ambil pendapatan, EBITDA, capex, dan jumlah pegawai terhadap lembar target KPI di folder tersebut. Konversikan setiap angka ke satuan lembar target dan sebutkan anak usaha mana yang dikonversi. Buat satu tabel Excel, satu baris per anak usaha, dengan status RAG (Merah di bawah 90% target, Kuning 90-100%, Hijau di atas). Sebutkan anak usaha yang tidak terbaca beserta alasannya. Lalu buat deck 10 slide: ringkasan portofolio, 3 merah teratas beserta penyebabnya, dan satu slide per sektor.
BM: Semak setiap folder anak syarikat dalam folder Portfolio Reports bagi September. Ekstrak hasil, EBITDA, capex dan bilangan pekerja berbanding helaian sasaran KPI dalam folder itu. Tukar setiap angka kepada unit helaian sasaran dan nyatakan anak syarikat yang ditukar. Bina satu jadual Excel, satu baris setiap anak syarikat, dengan status RAG (Merah bawah 90% sasaran, Kuning 90-100%, Hijau melebihi). Senaraikan anak syarikat yang tidak dapat dibaca dan sebabnya. Kemudian bina dek 10 slaid: ringkasan portfolio, 3 merah teratas dengan puncanya, dan satu slaid bagi setiap sektor.
:::

**2. Review the "could not read" list first,** then chase those subsidiaries. Cowork also lists every unit conversion and KPI label it normalised, so check those next.

**3. Review the deck** against the table before it goes to the Direksi.

## Check it

- Pick 3 subsidiaries and trace each number back to the source file.
- Portfolio totals must equal the sum of rows.
- For every subsidiary Cowork converted (another currency or unit), check the factor and the exchange rate it used.
- A subsidiary that did not report must show as not read, never as zero or Red.

## When it goes wrong

- **Numbers look off for one subsidiary.** It reports in millions while others report in billions, or in another currency. The prompt above asks Cowork to convert and say what it converted; put the exchange rate on the target sheet so it does not have to guess.
- **A subsidiary is missing entirely.** Its folder name does not match. Give Cowork the exact folder list.

## Take it further

- **L3 Scout:** on the 5th of each month, remind subsidiaries who have not uploaded yet.

:::presenter
**Ask before you start:** How many entities? Is there a standard reporting template, and who ignores it?

**Demo kit:** 20 fictional subsidiary folders (Excel and PowerPoint), one with no report, one with an image-only slide, one in IDR millions and one in USD, plus mixed KPI labels (Pendapatan, Net Sales, FTE). Start the Cowork task at the beginning of the session and come back to it: it takes about 20 minutes.
:::
