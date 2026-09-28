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
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
validated_on: 2026-09-26
---

## Situation

A holding company's strategy office (PMO) consolidates monthly reports from its subsidiaries. Formats differ, KPIs are named differently and a few always arrive late.

## Steps

**1. Delegate the task to Cowork:**

:::prompt
EN: Go through each subsidiary folder in the Portfolio Reports site for September. Extract revenue, EBITDA, capex and headcount against the KPI target sheet. Build one Excel table, one row per subsidiary, with RAG status (Red below 90% of target, Amber 90-100%, Green above). List subsidiaries you could not read and why. Then build a 10-slide deck: portfolio summary, top 3 reds with drivers, and one slide per sector.
ID: Periksa setiap folder anak usaha di situs Portfolio Reports untuk bulan September. Ambil pendapatan, EBITDA, capex, dan jumlah pegawai terhadap lembar target KPI. Buat satu tabel Excel, satu baris per anak usaha, dengan status RAG (Merah di bawah 90% target, Kuning 90-100%, Hijau di atas). Sebutkan anak usaha yang tidak terbaca beserta alasannya. Lalu buat deck 10 slide.
BM: Semak setiap folder anak syarikat dalam laman Portfolio Reports bagi September. Ekstrak hasil, EBITDA, capex dan bilangan pekerja berbanding helaian sasaran KPI. Bina satu jadual Excel, satu baris setiap anak syarikat, dengan status RAG (Merah bawah 90% sasaran, Kuning 90-100%, Hijau melebihi). Senaraikan anak syarikat yang tidak dapat dibaca dan sebabnya. Kemudian bina dek 10 slaid.
:::

**2. Review the "could not read" list first,** then chase those subsidiaries.

**3. Review the deck** against the table before it goes to the Direksi.

## Check it

- Pick 3 subsidiaries and trace each number back to the source file.
- Portfolio totals must equal the sum of rows.

## When it goes wrong

- **Numbers look off for one subsidiary.** It reports in millions while others report in thousands, or in another currency. Add a Units column to the KPI target sheet and ask Cowork to normalise.
- **A subsidiary is missing entirely.** Its folder name does not match. Give Cowork the exact folder list.

## Take it further

- **L3 Scout:** on the 5th of each month, remind subsidiaries who have not uploaded yet.

:::presenter
**Ask before you start:** How many entities? Is there a standard reporting template, and who ignores it?
:::
