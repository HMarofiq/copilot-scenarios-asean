---
id: gov-board-paper-013
title: { en: "Board paper from divisional inputs", id: "Usulan Keputusan Direksi dari masukan divisi", ms: "Kertas Lembaga daripada input bahagian" }
summary:
  en: "Assemble a board paper for a material acquisition from five divisional inputs in your template: bridge the numbers, flag the real conflict, the stale input and the missing section, check the approvals, and draft the note to the commissioners and the disclosure."
  id: "Susun Usulan Keputusan Direksi untuk akuisisi material dari lima masukan divisi dalam templat Anda: jembatani angka, tandai konflik yang sebenarnya, masukan yang usang dan bagian yang belum ada, periksa persetujuan, lalu siapkan memo ke Dewan Komisaris dan keterbukaan informasi."
  ms: "Susun kertas Lembaga untuk pengambilalihan material daripada lima input bahagian dalam templat anda: rapatkan angka, tandakan percanggahan sebenar, input lapuk dan bahagian yang tiada, semak kelulusan, kemudian sediakan memo kepada lembaga pengarah dan pengumuman."
industry: [government-soe]
department: [corporate-secretary, strategy]
persona: [corporate-secretary, strategy-office]
market: [ID, MY]
difficulty: 3
surface: [word]
licence: [m365-copilot]
inputs:
  - { name: "Board paper template: sections with a named owner for each", format: ".docx", where: "Corporate Secretary library", count: "1", kit: ["02_Template_Usulan_Keputusan_Direksi.docx"], steps: [2, 3] }
  - { name: "Divisional inputs: Strategy, Finance, Legal and Tax, Operations, Risk", format: ".docx", where: "Board paper working folder", count: "5", kit: ["03_Input_Strategy_Proyek_Kutub_v2.docx", "04_Input_Keuangan_Proyek_Kutub_v3.docx", "05_Input_Legal_Pajak_Proyek_Kutub.docx", "06_Input_Operasi_Proyek_Kutub.docx", "07_Input_Risiko_Proyek_Kutub_v1.docx"], steps: [2] }
  - { name: "The Corporate Secretary's request with the drafting rules", format: ".docx or email", where: "Email", count: "1", kit: ["01_Email_CorSec_Proyek_Kutub.docx"], steps: [2] }
objective: "Turn five divisional inputs into a board paper the Direksi can decide on, with every figure traceable and every gap flagged, then prepare the note to the Dewan Komisaris and the public disclosure, in about 40 minutes instead of two days."
run_time: "Part A about 25 min, Part B about 10 min"
data: { sensitivity: "Highly Confidential", customer_pii: false, signoff: "Corporate Secretary before circulation; Direksi before anything goes to the Dewan Komisaris" }
impact: { baseline: "2 to 3 days to consolidate and check", target: "Half a day, most of it chasing the open points", evidence: estimated }
card:
  problem: "Five divisions send inputs in five styles for a Rp1 trillion acquisition. One uses an old price, two disagree on EBITDA, one strays into another's area, and Human Capital has not sent anything. The Direksi meets on Wednesday."
  output: "A board paper in your template with the value bridge, the materiality test and approvals, every conflict and missing input flagged, all conditions precedent in the resolution, a pre-circulation check, and a draft note to the commissioners and disclosure."
limits:
  - "Copilot cannot tell which of two figures is right. It can show both and where each comes from; the divisions resolve it."
  - "Copilot needs to know who owns each section. Put a \"Pemilik bagian\" line under every heading, or it fills a missing section from another division's comments."
  - "Copilot drafts compliance points from your inputs, not from the regulations. Legal confirms the POJK, KPPU and articles of association analysis before circulation."
  - "Inside information needs care. Use a code name, keep drafts in a restricted library and follow your insider list and trading blackout."
source_refs:
  - "https://support.microsoft.com/en-us/word/welcome-to-copilot-in-word"
  - "https://adoption.microsoft.com/en-us/scenario-library/"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-09-30
validation_note: "Run end to end in a demo tenant with the kit in Word for the web (template plus six attached files). The final prompt passed 14 of 14 checks: EV to price bridge, EBITDA marked [KONFLIK], stale Risk figures superseded, Human Capital section [PERLU KONFIRMASI], KPPU position from Legal, 21.25% materiality with appraiser and no RUPS, recusal of the conflicted commissioner, all five conditions precedent, code name only, open points on the last page. The first run used unapproved markers and the target's name in the subject line; the published prompt fixes both. The check prompt found the remaining slips a Corporate Secretary would fix."
---

## Situation

**The deadline.** Zava Gudang Logistik's Direksi meets on Wednesday to decide on Proyek Kutub, a 60% acquisition. As Corporate Secretary, you need the draft by Tuesday 10.00.

**The inputs.** Five divisions sent inputs; Human Capital's will arrive too late. The template names each section's owner.

**The risks.** Figures use different bases, EBITDA conflicts and Risk's price is stale. Legal and Operations disagree on approvals, and a commissioner has a conflict of interest.

## Steps

**1. Get the kit ready.** Put the files in OneDrive and keep a clean copy of the template.

1. Download the kit and upload all files to one OneDrive folder.
2. Open each file once in Word for the web.
3. Make a copy of the template for each run.

**Part A: draft and check the paper (about 25 minutes).** Always do this part. You get the draft in your template and a check before it goes to the Direksi.

**2. Draft the paper in the template.** Open *02_Template_Usulan_Keputusan_Direksi.docx* in Word for the web and select **Copilot**.

1. Add a sensitivity label if your organisation asks for one.
2. Select **Add and manage sources** > **Upload images and files**.
3. Attach *01_Email_CorSec* and the five inputs *03* to *07*. You should see six file chips.
4. Run:

:::prompt
ABOUT: Drafts the whole board paper in your template, with conflicts, gaps and superseded figures flagged instead of smoothed over.
EN: Draft the Usulan Keputusan Direksi for Proyek Kutub in this template, in Bahasa Indonesia, using only the five attached divisional inputs and the Corporate Secretary's email.
Fill every section in the template's order. Keep each "Pemilik bagian" line and write each section only from its owner's input.
Use only the code name Proyek Kutub in the Perihal line, never the target's company name.
Use only two markers: [KONFLIK] and [PERLU KONFIRMASI – <division>]. Do not invent other markers.
Where two divisions give different figures for the same item (for example EBITDA 2025), do not choose: show both with their source and date and mark [KONFLIK].
Figures that measure different things are not a conflict: if one input gives the enterprise value for 100% and another the price for the stake, show the bridge instead.
If an input is older than another input on the same figure, use the newer one and list the superseded figure with its date in Hal Terbuka.
If the owner of a section has not submitted an input, write [PERLU KONFIRMASI – <division>] as that section's only text, even if another division mentions the topic.
If a division states something outside its own area, follow the owner division and note the difference in Hal Terbuka.
In section 9, give the materiality test (price divided by equity), whether an independent appraiser and a RUPS are needed, every approval and filing with its timing, and any conflict of interest with what the conflicted person must do.
In section 10, write the draft resolution with every condition precedent from the Legal input, numbered.
Make the very last page "Hal Terbuka – untuk Corporate Secretary, hapus sebelum diedarkan", listing every [KONFLIK], [PERLU KONFIRMASI] and superseded figure with the division that must resolve it. Nothing may come after it.
ID: Susun Usulan Keputusan Direksi untuk Proyek Kutub di templat ini, dalam Bahasa Indonesia, hanya dari lima masukan divisi terlampir dan email Corporate Secretary.
Isi setiap bagian sesuai urutan templat. Pertahankan setiap baris "Pemilik bagian" dan tulis setiap bagian hanya dari masukan pemiliknya.
Gunakan hanya nama sandi Proyek Kutub di baris Perihal, jangan pernah nama perusahaan target.
Gunakan hanya dua penanda: [KONFLIK] dan [PERLU KONFIRMASI – <divisi>]. Jangan membuat penanda lain.
Jika dua divisi memberi angka berbeda untuk hal yang sama (misalnya EBITDA 2025), jangan memilih: tampilkan keduanya dengan sumber dan tanggalnya dan tandai [KONFLIK].
Angka yang mengukur hal berbeda bukan konflik: jika satu masukan memberi nilai perusahaan (enterprise value) 100% dan yang lain harga untuk porsi saham, tampilkan jembatannya.
Jika suatu masukan lebih lama dari masukan lain untuk angka yang sama, gunakan yang lebih baru dan cantumkan angka yang digantikan beserta tanggalnya di Hal Terbuka.
Jika pemilik suatu bagian belum mengirim masukan, tulis [PERLU KONFIRMASI – <divisi>] sebagai satu-satunya isi bagian itu, meskipun divisi lain menyinggung topiknya.
Jika suatu divisi menyatakan hal di luar bidangnya, ikuti divisi pemilik dan catat perbedaannya di Hal Terbuka.
Di bagian 9, cantumkan uji materialitas (harga dibagi ekuitas), apakah diperlukan penilai independen dan RUPS, setiap persetujuan dan pelaporan beserta waktunya, serta benturan kepentingan dan apa yang harus dilakukan pihak yang berbenturan.
Di bagian 10, tulis rancangan keputusan dengan setiap persyaratan pendahuluan (condition precedent) dari masukan Legal, bernomor.
Jadikan halaman paling akhir "Hal Terbuka – untuk Corporate Secretary, hapus sebelum diedarkan", berisi setiap [KONFLIK], [PERLU KONFIRMASI] dan angka yang digantikan beserta divisi yang harus menyelesaikannya. Tidak boleh ada apa pun setelahnya.
BM: Sediakan kertas cadangan keputusan (Usulan Keputusan Direksi) untuk Proyek Kutub dalam templat ini, dalam Bahasa Indonesia, hanya daripada lima input bahagian yang dilampirkan dan e-mel Setiausaha Syarikat.
Isi setiap bahagian mengikut susunan templat. Kekalkan setiap baris "Pemilik bagian" dan tulis setiap bahagian hanya daripada input pemiliknya.
Gunakan nama kod Proyek Kutub sahaja dalam baris Perihal, jangan sekali-kali nama syarikat sasaran.
Gunakan dua penanda sahaja: [KONFLIK] dan [PERLU KONFIRMASI – <bahagian>]. Jangan cipta penanda lain.
Jika dua bahagian memberi angka berbeza bagi perkara yang sama (contohnya EBITDA 2025), jangan pilih: tunjukkan kedua-duanya dengan sumber dan tarikhnya dan tandakan [KONFLIK].
Angka yang mengukur perkara berbeza bukan percanggahan: jika satu input memberi nilai perusahaan (enterprise value) 100% dan satu lagi harga bagi pegangan saham, tunjukkan jambatannya.
Jika sesuatu input lebih lama daripada input lain bagi angka yang sama, gunakan yang lebih baharu dan senaraikan angka yang diganti berserta tarikhnya dalam Hal Terbuka.
Jika pemilik sesuatu bahagian belum menghantar input, tulis [PERLU KONFIRMASI – <bahagian>] sebagai satu-satunya kandungan bahagian itu, walaupun bahagian lain menyentuh topiknya.
Jika sesuatu bahagian menyatakan perkara di luar bidangnya, ikut bahagian pemilik dan catat perbezaannya dalam Hal Terbuka.
Dalam bahagian 9, nyatakan ujian kematerialan (harga dibahagi ekuiti), sama ada penilai bebas dan RUPS diperlukan, setiap kelulusan dan pemfailan berserta masanya, serta sebarang konflik kepentingan dan apa yang mesti dilakukan oleh orang yang berkonflik.
Dalam bahagian 10, tulis draf resolusi dengan setiap syarat duluan (condition precedent) daripada input Legal, bernombor.
Jadikan halaman paling akhir "Hal Terbuka – untuk Corporate Secretary, hapus sebelum diedarkan", menyenaraikan setiap [KONFLIK], [PERLU KONFIRMASI] dan angka yang diganti berserta bahagian yang mesti menyelesaikannya. Tiada apa-apa boleh selepasnya.
:::

**After you run it:** section 3 shows the bridge from Rp1,905 billion to Rp1,020 billion, section 7 contains only [PERLU KONFIRMASI – Human Capital], and the resolution lists five numbered conditions. This takes about two minutes.

**3. Check the draft before it goes to the Direksi.** In the same chat, run:

:::prompt
ABOUT: The Corporate Secretary's check: every figure traced to its source, stale inputs, the email's rules and what to chase.
EN: Do not edit the document; answer here in chat. Check the draft in this document before it goes to the Direksi, as the Corporate Secretary would.
(1) Make a table of every amount and percentage in the draft: Section | Figure | Source input and date | Matches the source? If a figure is not in any input, say "not in inputs".
(2) For EBITDA 2025, show every figure the inputs give, and check whether any other input explains the difference.
(3) List every place where the draft uses an input that is older than another input on the same point.
(4) Check the rules in the Corporate Secretary's email: code name used, classification line, markers used correctly, every Legal condition precedent in the resolution, open points on the last page.
(5) End with a numbered list of what I must fix or chase before circulation, with the division responsible.
ID: Jangan mengubah dokumen; jawab di chat. Periksa draf di dokumen ini sebelum diajukan ke Direksi, seperti yang dilakukan Corporate Secretary.
(1) Buat tabel setiap nilai dan persentase dalam draf: Bagian | Angka | Masukan sumber dan tanggalnya | Sesuai sumber? Jika suatu angka tidak ada di masukan mana pun, tulis "tidak ada di masukan".
(2) Untuk EBITDA 2025, tampilkan setiap angka yang diberikan masukan, dan periksa apakah ada masukan lain yang menjelaskan selisihnya.
(3) Daftarkan setiap bagian draf yang memakai masukan yang lebih lama dari masukan lain untuk hal yang sama.
(4) Periksa aturan dalam email Corporate Secretary: nama sandi, baris klasifikasi, penggunaan penanda, setiap condition precedent dari Legal ada di rancangan keputusan, dan hal terbuka di halaman terakhir.
(5) Akhiri dengan daftar bernomor hal yang harus saya perbaiki atau kejar sebelum diedarkan, beserta divisi yang bertanggung jawab.
BM: Jangan ubah dokumen; jawab di sini dalam chat. Semak draf dalam dokumen ini sebelum dihantar kepada Direksi, seperti yang dilakukan oleh Setiausaha Syarikat.
(1) Buat jadual setiap amaun dan peratusan dalam draf: Bahagian | Angka | Input sumber dan tarikhnya | Sepadan dengan sumber? Jika sesuatu angka tiada dalam mana-mana input, tulis "tiada dalam input".
(2) Bagi EBITDA 2025, tunjukkan setiap angka yang diberi oleh input, dan semak sama ada input lain menerangkan perbezaannya.
(3) Senaraikan setiap tempat draf menggunakan input yang lebih lama daripada input lain bagi perkara yang sama.
(4) Semak peraturan dalam e-mel Setiausaha Syarikat: nama kod, baris klasifikasi, penggunaan penanda, setiap condition precedent Legal dalam resolusi, dan perkara terbuka di halaman terakhir.
(5) Akhiri dengan senarai bernombor perkara yang mesti saya betulkan atau kejar sebelum diedarkan, berserta bahagian yang bertanggungjawab.
:::

**After you run it:** the table traces every figure to Finance, Legal, Operations or Strategy, and the list asks Human Capital for its input and Finance and Operations to reconcile EBITDA.

**Part B: after the Direksi approves (about 10 minutes).** Do this once the Direksi has decided. It prepares the next two documents without changing the paper.

**4. Draft the note to the commissioners and the disclosure.** In the same chat, run:

:::prompt
ABOUT: Drafts the cover memo to the Dewan Komisaris and the public disclosure to publish after signing.
EN: Do not edit the document; answer here in chat. After the Direksi approves, I need two short texts in Bahasa Indonesia.
(1) A cover memo from the Direktur Utama to the Dewan Komisaris asking for approval at the meeting on 14 Oktober 2026: what is being approved, price and funding, why, the key risks, the conditions precedent, and a sentence that the conflicted commissioner will not take part. Maximum 350 words.
(2) A draft keterbukaan informasi to publish after the conditional share purchase agreement is signed: parties, object, value, funding, the appraiser's conclusion, why it is a material transaction and why no RUPS is needed, and when it must be published. Keep placeholders like [tanggal penandatanganan] for facts we do not know yet. Do not include any internal open points.
ID: Jangan mengubah dokumen; jawab di chat. Setelah Direksi menyetujui, saya memerlukan dua teks singkat dalam Bahasa Indonesia.
(1) Memo pengantar dari Direktur Utama kepada Dewan Komisaris untuk meminta persetujuan pada rapat 14 Oktober 2026: apa yang dimintakan persetujuan, harga dan pendanaan, alasannya, risiko utama, persyaratan pendahuluan, dan satu kalimat bahwa komisaris yang berbenturan kepentingan tidak ikut serta. Maksimum 350 kata.
(2) Draf keterbukaan informasi untuk dipublikasikan setelah perjanjian jual beli saham bersyarat ditandatangani: para pihak, objek, nilai, pendanaan, kesimpulan penilai, mengapa ini transaksi material dan mengapa tidak perlu RUPS, serta kapan harus dipublikasikan. Gunakan placeholder seperti [tanggal penandatanganan] untuk fakta yang belum diketahui. Jangan cantumkan hal terbuka internal.
BM: Jangan ubah dokumen; jawab di sini dalam chat. Selepas Direksi meluluskan, saya perlukan dua teks ringkas dalam Bahasa Indonesia.
(1) Memo iringan daripada Direktur Utama kepada Dewan Komisaris untuk memohon kelulusan pada mesyuarat 14 Oktober 2026: apa yang dipohon untuk diluluskan, harga dan pembiayaan, sebabnya, risiko utama, syarat duluan, dan satu ayat bahawa pesuruhjaya yang berkonflik tidak akan terlibat. Maksimum 350 perkataan.
(2) Draf pengumuman keterbukaan informasi untuk diterbitkan selepas perjanjian jual beli saham bersyarat ditandatangani: pihak-pihak, objek, nilai, pembiayaan, kesimpulan penilai, mengapa ini transaksi material dan mengapa RUPS tidak diperlukan, serta bila ia mesti diterbitkan. Kekalkan ruang kosong seperti [tanggal penandatanganan] untuk fakta yang belum diketahui. Jangan masukkan perkara terbuka dalaman.
:::

**After you run it:** the memo names the conflicted commissioner's recusal and all five conditions; the disclosure says 21.25% of equity, appraiser's opinion "wajar", no RUPS, and publication before the market opens on the next trading day.

## Check it

- **Value bridge:** EV **Rp1,905 bn** (8.9 x audited EBITDA 214) minus net debt **205** = equity **1,700**; 60% = **Rp1,020 bn**. Strategy's "Rp1.9 trillion" is the EV, **not a conflict**.
- **The real conflict:** EBITDA 2025 **214** (Finance, audited) vs **238** (Operations, management accounts), marked **[KONFLIK]**. The Rp24 bn Medan land gain in the Legal input is a clue, but only Finance can confirm it; the draft must not assume.
- **Stale input:** Risk (4 September) uses the LOI price **Rp940 bn**, 100% cash and **19.58%**, "not material". Finance (2 October) supersedes it: **Rp1,020 bn**, 40% cash and 60% loan, **21.25%**.
- **Materiality:** **21.25%** of equity is above 20%: material transaction, **independent appraiser** needed (KJPP range Rp1,004 to 1,048 bn, fair). Below 50% and fair, so **no RUPS**.
- **Missing section:** section 7 (people) is **[PERLU KONFIRMASI – Human Capital]** only, even though Operations mentions 1,850 employees and 120 overlapping roles.
- **Outside remit:** Operations says KPPU must approve before signing; Legal (the owner) says **notification within 30 working days after completion**, not a condition. The paper follows Legal.
- **Conflict of interest:** **Ibu Laras Pratiwi** sits on the seller's investment committee and must not take part in the commissioners' approval.
- **Conditions precedent (5):** commissioners' approval, **Persero** shareholder approval, **Litware** landlord consent, **CDOB** renewal, **no material adverse change**.
- **Housekeeping:** Perihal uses **Proyek Kutub** only; markers are only [KONFLIK] and [PERLU KONFIRMASI]; Hal Terbuka is the **last page**.

## When it goes wrong

- **The draft invents markers like [PERLU VALIDASI].** Copilot creates its own labels when it is unsure. Keep the sentence "Use only two markers" in the prompt. (step 2)
- **The Perihal names the target company.** Keep "Use only the code name Proyek Kutub in the Perihal line". It happened in our first run. (step 2)
- **EBITDA shows as "to confirm" instead of [KONFLIK].** The rule about "figures that measure different things" was applied too widely. Keep the EBITDA example in the conflict sentence. (step 2)
- **Section 7 is filled from the Operations input.** The template must name Human Capital as the owner. Check the "Pemilik bagian" line is still there. (step 2)
- **The Risk section repeats Finance's new numbers.** Copilot updated a section with another division's input. The check prompt flags this; ask Risk for an updated input rather than rewriting it yourself. (step 3)
- **The check links the EBITDA gap to the land gain.** A good check refuses to assume it. If it does, ask Finance and Operations to reconcile; do not write it in the paper. (step 3)
- **The disclosure includes internal open points.** Keep "Do not include any internal open points" and read it before Legal does. (step 4)

## Take it further

- **Now with your own board paper.** Add a "Pemilik bagian" line under each heading of your template and put the drafting rules in the request email. Copilot follows them.
- **Chase the missing inputs.** Ask in the same chat: "Draft a short email to each division with open points, in Bahasa Indonesia, due Tuesday 15.00."
- **A Malaysian board paper.** Use the same prompt with your Malaysian template headings (Purpose, Background, Proposal, Rationale, Financial Effects, Risk Factors, Approvals Required, Recommendation, Board Resolution) and the Bursa percentage ratios instead of POJK 17.
- **Presentation for the chair.** In PowerPoint, ask Copilot to create a five-slide summary from the final paper.

:::presenter
**Session length:** 40 minutes. **Setup:** kit in the presenter's OneDrive, each file opened once, and two copies of the template (one per run).

1. Set the scene: Rp1 trillion acquisition, five inputs, Direksi on Wednesday, one division missing. Ask the room how they check that numbers agree today. (4 min)
2. Step 2 live. While it runs (about two minutes), open the Strategy input and read "about Rp1.9 trillion". Ask: conflict or not? (8 min)
3. Show section 3 (the bridge), section 7 (Human Capital marker) and section 10 (five conditions). Then the last page: every open point with an owner. (8 min)
4. Step 3, the check. Point at the EBITDA row and the Risk figures that were superseded. (8 min)
5. Step 4: the memo to the commissioners and the disclosure. Read the recusal sentence. (7 min)
6. Close: the Corporate Secretary still decides what circulates; Copilot did the reading, the bridging and the first draft. (5 min)
:::
