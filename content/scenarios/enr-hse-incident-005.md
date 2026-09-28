---
id: enr-hse-incident-005
title: { en: "HSE incident investigation draft", id: "Draf investigasi insiden K3", ms: "Draf siasatan insiden KKP" }
summary:
  en: "Build a timeline, 5-Why analysis and corrective actions from witness statements, without letting AI decide the root cause."
  id: "Susun kronologi, analisis 5-Why, dan tindakan perbaikan dari keterangan saksi, tanpa membiarkan AI menentukan akar masalah."
  ms: "Bina kronologi, analisis 5-Why dan tindakan pembetulan daripada kenyataan saksi, tanpa membiarkan AI menentukan punca utama."
industry: [energy-resources]
department: [hse, operations]
persona: [hse-officer]
market: [ID, MY]
difficulty: 3
surface: [copilot-chat, word]
licence: [m365-copilot]
inputs:
  - { name: "Witness statements", format: ".docx (transcribe handwritten ones)", where: "HSE case folder", count: "3-8" }
  - { name: "Initial incident report", format: ".docx / form", where: "HSE system export", count: "1" }
  - { name: "Permit to work and JSA", format: ".pdf", where: "Site document control", count: "1-2" }
data: { sensitivity: "Confidential", customer_pii: true, signoff: "HSE Manager" }
impact: { baseline: "2-3 days to first draft", target: "Half a day to first draft", evidence: estimated }
card:
  problem: "A lost-time incident needs an investigation report, and the evidence is spread across statements and forms."
  output: "Timeline, statement conflicts, 5-Why draft marked with evidence gaps, and corrective actions by hierarchy of controls."
limits:
  - "Do not rely on Copilot to interpret site photos for technical cause."
  - "Statements contain personal and health data. Remove injured worker identifiers where not needed (UU PDP, PDPA)."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
validated_on: 2026-09-26
---

## Situation

After an incident on site, the HSE officer collects statements, the permit to work and the JSA, and drafts an investigation report for the investigation team. The root cause is the team's call; the draft saves them from starting at a blank page.

## Steps

**1. Build the timeline and conflicts:**

:::prompt
EN: From the attached statements and incident report only, build a minute-by-minute timeline. For each entry cite which statement it comes from. Then list every point where statements disagree. Do not fill gaps with assumptions; write EVIDENCE GAP instead.
ID: Hanya dari keterangan saksi dan laporan insiden terlampir, susun kronologi per menit. Untuk setiap entri sebutkan sumber keterangannya. Lalu daftar setiap titik di mana keterangan saling bertentangan. Jangan mengisi kekosongan dengan asumsi; tulis CELAH BUKTI.
BM: Hanya daripada kenyataan saksi dan laporan insiden yang dilampirkan, bina kronologi minit demi minit. Nyatakan sumber kenyataan bagi setiap entri. Kemudian senaraikan setiap perkara di mana kenyataan bercanggah. Jangan isi kekosongan dengan andaian; tulis JURANG BUKTI.
:::

**2. Draft the 5-Why,** asking Copilot to compare what the permit to work and JSA required against what the timeline shows happened.

**3. Draft corrective actions** ordered by hierarchy of controls (elimination to PPE), each with owner role and due date.

**4. Assemble the report** in the company investigation template in Word.

## Check it

- Every timeline entry has a statement citation.
- The investigation team, not Copilot, confirms the root cause.

## When it goes wrong

- **The timeline fills gaps with plausible events.** Re-run with the EVIDENCE GAP instruction and delete any entry without a citation.
- **Handwritten statements are skipped.** Transcribe them into Word first.

## Take it further

- **L4 Agent:** an HSE lessons-learned agent grounded on closed investigations across sites.

:::presenter
**Ask before you start:** Which investigation method do you use (5-Why, ICAM, TapRooT)? Who owns the template?
:::
