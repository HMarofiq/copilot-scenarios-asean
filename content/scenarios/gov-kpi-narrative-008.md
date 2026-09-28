---
id: gov-kpi-narrative-008
title: { en: "Monthly KPI performance narrative and deck", id: "Narasi dan deck kinerja KPI bulanan", ms: "Naratif dan dek prestasi KPI bulanan" }
summary:
  en: "Turn the monthly KPI pack into a correct narrative and a short deck, handling KPIs where lower is better and KPIs without a target."
  id: "Ubah paket KPI bulanan menjadi narasi yang benar dan deck singkat, termasuk KPI yang lebih baik bila lebih rendah dan KPI tanpa target."
  ms: "Tukar pek KPI bulanan kepada naratif yang tepat dan dek ringkas, termasuk KPI yang lebih baik apabila lebih rendah dan KPI tanpa sasaran."
industry: [government-soe]
department: [strategy, finance]
persona: [strategy-office]
market: [ID, MY]
difficulty: 2
surface: [copilot-chat, excel, powerpoint]
licence: [m365-copilot]
inputs:
  - { name: "Monthly KPI pack", format: ".xlsx", where: "Strategy office library", count: "1" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Head of Strategy" }
impact: { baseline: "1 day to write the narrative each month", target: "1 hour including review", evidence: estimated }
card:
  problem: "The KPI narrative is due to the Direksi every month, and someone always calls a lower cost ratio a miss."
  output: "A status line for every KPI, the top 3 concerns ranked by gap to target, and a 5-slide deck."
limits:
  - "Copilot needs a column that says whether higher or lower is better. Without it, it assumes higher is better."
  - "Copilot can only explain a result that someone has commented on. Blank comments stay blank."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: all 12 statuses correct including 6 lower-is-better KPIs, restated August used, blank comments reported as such, top 3 concerns right, and the 5-slide deck matched. The first run miscounted Met in its headline and misread a blank target cell; filling n/a and asking for counts at the end fixed both."
---

## Situation

The strategy office (PMO) of a holding company sends a KPI narrative to the Direksi each month: which KPIs met target, what moved since last month, and the biggest concerns. The pack mixes KPIs where higher is better (revenue) with KPIs where lower is better (cost ratios, safety rates, collection days), and some figures are restated after audit.

## Steps

**1. Check the pack.** Make sure it has a *Better when* column (Higher or Lower), that restated figures are already in the actual columns, and that a KPI with no target shows **n/a** rather than an empty cell.

**2. Write the narrative.** In Copilot Chat, type `/` and pick the KPI pack, then run:

:::prompt
EN: Using this KPI pack, write the monthly performance narrative. For every KPI give: status against target (Met, Not met, or No target), using the Better when column: for Lower, being below target is good. Show September against target and against August, using the restated August figures. Explain movements only with the Comment column; if a comment is blank, write "No explanation provided". Then list the top 3 concerns, ranked by how far each Not met KPI is from its target in percentage terms. Finish with the number of KPIs in each status, counted from your list above.
ID: Dengan paket KPI ini, tulis narasi kinerja bulanan. Untuk setiap KPI berikan: status terhadap target (Tercapai, Tidak tercapai, atau Tanpa target), dengan memakai kolom Better when: untuk Lower, di bawah target berarti baik. Tampilkan September terhadap target dan terhadap Agustus, memakai angka Agustus yang sudah disajikan ulang. Jelaskan pergerakan hanya dari kolom Comment; jika kosong, tulis "Tidak ada penjelasan". Lalu sebutkan 3 perhatian utama, diurutkan berdasarkan seberapa jauh setiap KPI yang tidak tercapai dari targetnya dalam persentase. Akhiri dengan jumlah KPI pada setiap status, dihitung dari daftar Anda di atas.
BM: Menggunakan pek KPI ini, tulis naratif prestasi bulanan. Bagi setiap KPI berikan: status berbanding sasaran (Dicapai, Tidak dicapai, atau Tiada sasaran), menggunakan lajur Better when: bagi Lower, di bawah sasaran bermaksud baik. Tunjukkan September berbanding sasaran dan berbanding Ogos, menggunakan angka Ogos yang telah dinyatakan semula. Terangkan pergerakan hanya daripada lajur Comment; jika kosong, tulis "Tiada penjelasan diberikan". Kemudian senaraikan 3 kebimbangan utama, disusun mengikut sejauh mana setiap KPI yang tidak dicapai daripada sasarannya dalam peratusan. Akhiri dengan bilangan KPI bagi setiap status, dikira daripada senarai anda di atas.
:::

**3. Create the deck.** In the same chat:

:::prompt
EN: Create a 5-slide PowerPoint from the narrative above: headline summary with the Met and Not met counts, the top 3 concerns with their numbers, KPIs that improved since August, KPIs without a target, and next steps. Use only figures from the KPI pack.
ID: Buat PowerPoint 5 slide dari narasi di atas: ringkasan utama dengan jumlah Tercapai dan Tidak tercapai, 3 perhatian utama beserta angkanya, KPI yang membaik sejak Agustus, KPI tanpa target, dan langkah selanjutnya. Gunakan hanya angka dari paket KPI.
BM: Bina PowerPoint 5 slaid daripada naratif di atas: ringkasan utama dengan bilangan Dicapai dan Tidak dicapai, 3 kebimbangan utama dengan angkanya, KPI yang bertambah baik sejak Ogos, KPI tanpa sasaran, dan langkah seterusnya. Gunakan angka daripada pek KPI sahaja.
:::

## Check it

- For every KPI where lower is better, check the status by hand: below target must be Met.
- A KPI with no target must never be called met or missed.
- August figures must be the restated ones.
- The Met and Not met counts must equal the lines in the list. Count them yourself.
- Every explanation must come from the Comment column.

## When it goes wrong

- **A falling cost ratio is reported as a miss.** The Better when column is missing or was ignored. Add it, and keep the sentence about Lower in the prompt.
- **Copilot explains a result nobody commented on.** Delete the explanation and ask the KPI owner. Keep "No explanation provided" in the prompt.
- **The headline counts do not match the list.** In validation the first run said 6 met when the list showed 5. Keep "counted from your list above" in the prompt, and count the lines yourself.
- **The values for one KPI look shifted, or a target appears where there is none.** An empty target cell was read as the next number. Write n/a in empty cells.
- **The pre-restatement August figure appears.** Put restated figures in the actual column and the old ones only in a note, not in a second column.

## Take it further

- **L3 Scout:** on the 3rd working day of each month, check the KPI pack is complete and remind KPI owners whose comment is blank.
- **L2 Copilot in Excel:** add a Status column with a formula so the pack itself shows Met and Not met.

:::presenter
**Ask before you start:** Who writes the narrative today? Which KPIs are "lower is better"? How often are figures restated?

**Timing on the validation run:** narrative about 45 seconds, deck about 90 seconds.

**Demo kit:** a fictional 12-KPI pack with 6 lower-is-better KPIs, one KPI without a target, a restated August revenue, and four blank comments. Point out the cost-to-income ratio: below target, and correctly reported as Met.
:::
