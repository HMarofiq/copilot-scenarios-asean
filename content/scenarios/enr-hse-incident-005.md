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
  - "Files uploaded minutes ago may not be readable yet: in validation, Copilot reported 2 of 6 attached statements as excluded. Open each new file once in Word, then attach."
  - "Attach cloud files replaces files you already attached with /. Pick all files in one go."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run end to end in a demo tenant with the kit: all 12 timeline events cited correctly, both seeded conflicts found (stop time, personal lock), witness W1 never placed at the scene, both blank permit fields found, every root-cause step labelled hypothesis, 16 corrective actions in hierarchy order, report created with no names."
---

## Situation

After a site incident, turn statements, the permit to work and the JSA into an investigation draft. The investigation team determines the root cause.

## Steps

**1. Build the timeline and conflicts:**

:::prompt
EN: From the attached statements and incident report only, build a minute-by-minute timeline. For each entry cite which statement it comes from. Then list every point where statements disagree. Do not fill gaps with assumptions; write EVIDENCE GAP instead.
ID: Hanya dari keterangan saksi dan laporan insiden terlampir, susun kronologi per menit. Untuk setiap entri sebutkan sumber keterangannya. Lalu daftar setiap titik di mana keterangan saling bertentangan. Jangan mengisi kekosongan dengan asumsi; tulis CELAH BUKTI.
BM: Hanya daripada kenyataan saksi dan laporan insiden yang dilampirkan, bina kronologi minit demi minit. Nyatakan sumber kenyataan bagi setiap entri. Kemudian senaraikan setiap perkara di mana kenyataan bercanggah. Jangan isi kekosongan dengan andaian; tulis JURANG BUKTI.
:::

**2. Compare with the permit and draft the 5-Why.** In the same chat, attach the permit to work and JSA, then run:

:::prompt
EN: Now also use the attached permit to work and JSA. First, make a table comparing each JSA step and permit condition with what the timeline shows actually happened: Requirement, Evidence it was done, Evidence it was not done, Source. Then draft a 5-Why analysis of why the hand was caught. Label every Why SUPPORTED (with source) or HYPOTHESIS (no direct evidence). Do not state a root cause as fact; end with the questions the investigation team must answer.
ID: Sekarang gunakan juga izin kerja (PTW) dan JSA terlampir. Pertama, buat tabel yang membandingkan setiap langkah JSA dan syarat izin kerja dengan apa yang terjadi menurut kronologi: Persyaratan, Bukti dilakukan, Bukti tidak dilakukan, Sumber. Lalu susun analisis 5-Why mengapa tangan terjepit. Tandai setiap Why DIDUKUNG (dengan sumber) atau HIPOTESIS (tanpa bukti langsung). Jangan menyatakan akar masalah sebagai fakta; akhiri dengan pertanyaan yang harus dijawab tim investigasi.
BM: Sekarang gunakan juga permit kerja dan JSA yang dilampirkan. Pertama, bina jadual yang membandingkan setiap langkah JSA dan syarat permit dengan apa yang berlaku menurut kronologi: Keperluan, Bukti dilakukan, Bukti tidak dilakukan, Sumber. Kemudian sediakan analisis 5-Why mengapa tangan tersepit. Tandakan setiap Why DISOKONG (dengan sumber) atau HIPOTESIS (tiada bukti langsung). Jangan nyatakan punca utama sebagai fakta; akhiri dengan soalan yang mesti dijawab oleh pasukan siasatan.
:::

**3. Draft corrective actions.**

:::prompt
EN: Draft corrective actions for every finding and hypothesis above, ordered by the hierarchy of controls: elimination, substitution, engineering, administrative, PPE. Table: Action, Control level, Finding it addresses, Owner role, Due (30, 60 or 90 days). Prefer higher-level controls; do not rely on training or PPE alone. Refer to people by role or witness code (W1 to W5), never by name, and do not assign blame to individuals.
ID: Susun tindakan perbaikan untuk setiap temuan dan hipotesis di atas, diurutkan menurut hierarki pengendalian: eliminasi, substitusi, rekayasa teknik, administratif, APD. Tabel: Tindakan, Tingkat pengendalian, Temuan yang ditangani, Peran pemilik, Tenggat (30, 60 atau 90 hari). Utamakan pengendalian tingkat tinggi; jangan hanya mengandalkan pelatihan atau APD. Sebut orang berdasarkan peran atau kode saksi (W1 sampai W5), jangan pernah dengan nama, dan jangan menyalahkan individu.
BM: Sediakan tindakan pembetulan bagi setiap penemuan dan hipotesis di atas, disusun mengikut hierarki kawalan: penghapusan, penggantian, kejuruteraan, pentadbiran, PPE. Jadual: Tindakan, Tahap kawalan, Penemuan yang ditangani, Peranan pemilik, Tarikh akhir (30, 60 atau 90 hari). Utamakan kawalan tahap tinggi; jangan bergantung pada latihan atau PPE sahaja. Rujuk orang mengikut peranan atau kod saksi (W1 hingga W5), jangan sekali-kali dengan nama, dan jangan menyalahkan individu.
:::

**4. Assemble the draft report.**

:::prompt
EN: Create a Word document: the draft investigation report for this incident, with sections Summary, Timeline, Statement conflicts and evidence gaps, Permit and JSA compliance, 5-Why (keep the SUPPORTED and HYPOTHESIS labels), Corrective actions, and Questions for the investigation team. Put "DRAFT: root cause to be confirmed by the investigation team" at the top. Use witness codes and roles, never names.
ID: Buat dokumen Word: draf laporan investigasi insiden ini, dengan bagian Ringkasan, Kronologi, Pertentangan keterangan dan celah bukti, Kepatuhan izin kerja dan JSA, 5-Why (pertahankan label DIDUKUNG dan HIPOTESIS), Tindakan perbaikan, dan Pertanyaan untuk tim investigasi. Tulis "DRAF: akar masalah akan dikonfirmasi oleh tim investigasi" di bagian atas. Gunakan kode saksi dan peran, jangan pernah nama.
BM: Bina dokumen Word: draf laporan siasatan insiden ini, dengan bahagian Ringkasan, Kronologi, Percanggahan kenyataan dan jurang bukti, Pematuhan permit kerja dan JSA, 5-Why (kekalkan label DISOKONG dan HIPOTESIS), Tindakan pembetulan, dan Soalan untuk pasukan siasatan. Letakkan "DRAF: punca utama akan disahkan oleh pasukan siasatan" di bahagian atas. Gunakan kod saksi dan peranan, jangan sekali-kali nama.
:::

Copilot saves the file under **OneDrive › Documents › Copilot › Created**. Copy the sections into your company investigation template.

## Check it

- Every timeline entry has a statement citation.
- The investigation team, not Copilot, confirms the root cause.
- Copilot lists the files it used at the end of its answer. If a statement is missing from that list, it was not read.
- A witness who was not at the scene must not appear in the timeline after they left.
- Search the report for every witness name before sharing. There should be none.

## When it goes wrong

- **The timeline fills gaps with plausible events.** Re-run with the EVIDENCE GAP instruction and delete any entry without a citation.
- **Handwritten statements are skipped.** Transcribe them into Word first.
- **Copilot says some statements were excluded, or / cannot find a file you just uploaded.** New files take time to become readable. Open each one once in Word for the web, wait a minute, then attach again.
- **Files you attached with / disappear.** Using Attach cloud files replaces them. Select all the files in the picker at once.
- **You cannot find the report.** Look in OneDrive under Documents › Copilot › Created. Copilot may save two copies; use the newest.

## Take it further

- **L4 Agent:** an HSE lessons-learned agent grounded on closed investigations across sites.

:::presenter
**Ask before you start:** Which investigation method do you use (5-Why, ICAM, TapRooT)? Who owns the template?

**Timing on the validation run:** each step about 45 seconds; the report about 2 minutes.

**Demo kit:** five fictional witness statements with two conflicts, the initial report, and a permit/JSA with two blank sign-off fields. Point out that Copilot keeps the root cause as a hypothesis and that W1 was not at the scene. Upload the kit at least 10 minutes before the session, and open each statement once, so every file is readable.
:::
