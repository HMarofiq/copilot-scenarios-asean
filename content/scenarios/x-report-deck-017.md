---
id: x-report-deck-017
title: { en: "Turn a quarterly report into a leadership deck", id: "Ubah laporan kuartalan menjadi deck untuk pimpinan", ms: "Tukar laporan suku tahunan kepada dek untuk pimpinan" }
summary:
  en: "You receive a long quarterly report, its KPI workbook and a late correction. Build a ten-slide leadership deck in your company template that reports the corrected numbers, not the report's best story."
  id: "Anda menerima laporan kuartalan panjang, KPI workbook dan koreksi susulan. Susun deck pimpinan 10 slide di template perusahaan dengan angka yang sudah dikoreksi, bukan versi terbaik laporan."
  ms: "Anda menerima laporan suku tahunan yang panjang, KPI workbook dan pembetulan lewat. Bina dek pimpinan 10 slaid dalam templat syarikat dengan angka yang telah dibetulkan, bukan cerita terbaik laporan."
industry: [cross-industry]
department: [all-departments, operations, strategy]
persona: [knowledge-worker, strategy-office, people-manager]
market: [ID, MY]
difficulty: 2
surface: [copilot-chat, powerpoint, cowork]
licence: [copilot-chat, m365-copilot, cowork]
tiers:
  - { key: basic, title: "Copilot Chat", licence: copilot-chat, difficulty: 2, surface: [copilot-chat, powerpoint], runs: "Copilot Chat reads the correction, then the request, report and workbook, recalculates the numbers and writes every slide and its notes. You paste them into the template.", effort: "About 40 min including building the slides", needs: ["Copilot Chat with file upload enabled by your organisation; PowerPoint to build the slides yourself"] }
  - { key: premium, title: "Microsoft 365 Copilot", licence: m365-copilot, difficulty: 2, surface: [powerpoint], runs: "Copilot in PowerPoint builds the ten slides in your template from four files, with notes and sources.", effort: "About 25 min including a 10-minute run and review", needs: ["Copilot in PowerPoint for the web with Allow editing; the files in your OneDrive for work"] }
  - { key: cowork, title: "Copilot Cowork", licence: cowork, difficulty: 2, surface: [cowork, powerpoint], runs: "Cowork reads the whole folder, builds the deck in a copy of the template, checks it against the standard and drafts the cover email.", effort: "About 30 min including review", needs: ["Copilot Cowork and usage billing enabled by your organisation; the kit folder in your OneDrive for work"] }
inputs:
  - { name: "Request from the Chief of Staff with the QBR deck standard", format: ".docx", where: "Email attachment, saved to your OneDrive folder", count: "1", kit: ["01_QBR_Request_and_Deck_Standard.docx"], steps: [1, 2] }
  - { name: "Quarterly report as received (v1.0)", format: ".docx", where: "Shared by the report owner", count: "1", kit: ["02_Q3_2026_Distribution_Operations_Report_v1.0.docx"], steps: [1, 2] }
  - { name: "KPI workbook issued with the report", format: ".xlsx", where: "Shared by the report owner", count: "1", kit: ["03_Q3_2026_Distribution_KPI_Workbook.xlsx"], steps: [1, 2] }
  - { name: "Late correction from Finance", format: ".docx", where: "Email the evening before", count: "1", kit: ["04_Email_Correction_Surabaya_Volume.docx"], steps: [1, 2] }
  - { name: "Last quarter's deck with the commitments", format: ".pptx", where: "Team site", count: "1", kit: ["05_Q2_2026_QBR_Distribution_Operations.pptx"], steps: [1] }
  - { name: "Company QBR template", format: ".pptx", where: "Brand library", count: "1", kit: ["06_Zava_Niaga_QBR_Template.pptx"], steps: [1, 2] }
objective: "Turn a report someone else wrote into a short leadership deck that uses the corrected figures, follows your company's deck rules and is honest about misses, in one working session instead of a day."
needs:
  - "A copy of the template (06) for each attempt, so you always start from the clean sample slides"
data: { sensitivity: "Internal", customer_pii: false, signoff: "You and the report owner check every number before the deck goes to leadership." }
impact: { baseline: "Most of a working day to read the report, rebuild the numbers and lay out slides", target: "About 30 minutes to a checked first deck", evidence: observed-in-pilot }
card:
  problem: "The report headlines its best month, changed a definition, missed a safety reclassification and was corrected the night before. Leadership wants ten slides by noon."
  output: "A ten-slide deck in your template: an executive summary with RAG scorecard, one message per slide, commitments and decisions requested, and speaker notes that cite every number."
limits:
  - "Copilot in PowerPoint takes at most four files per prompt. Attach the request, report, workbook and correction; the commitments the deck needs are quoted in the request (01)."
  - "Treat any report as the author's draft. Copilot reproduced the report's own story until the prompt told it to recalculate from the workbook and apply the correction."
  - "Status labels need definitions. Without a written rule for Done, Partly done and Not started, Copilot called a tender that was only discussed Partly done."
  - "Copilot may add estimates of its own. In our runs it annualised storage and freight costs and labelled them illustrative; check and keep only what you can defend."
  - "Cowork keeps its files in its own task folder (OneDrive > Documents > Cowork > Tasks). When an earlier prompt asked it to save next to the sources, three approved moves failed. Its tables also lost the template's RAG colour fills."
  - "Basic tier: Copilot Chat cannot edit your PowerPoint file. It writes the slide text and notes; you build the slides. It accepts at most three uploaded files per message, so the correction goes in a first message. It sometimes saves a .pptx to OneDrive, but in our test that file had one line per slide, no notes and an outdated figure."
source_refs:
  - "https://support.microsoft.com/en-us/PowerPoint/copilot/create-a-new-presentation-with-copilot-in-powerpoint"
  - "https://support.microsoft.com/en-us/PowerPoint/welcome-to-copilot-in-powerpoint"
  - "https://support.microsoft.com/en-us/PowerPoint/frequently-asked-questions-about-copilot-in-powerpoint"
  - "https://adoption.microsoft.com/en-us/copilot/prompt-gallery/?steps=create-a-business-review"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/use-cowork"
status: validated
validated_on: 2026-10-05
validation_note: "Tested on 4 October 2026. Premium: the exact EN, ID and BM prompts in Copilot in PowerPoint for the web each produced a deck matching all 22 answer-key checks. Cowork: the published prompt produced a 22/22 deck, a checks file and an unsent email draft. Basic (5 October 2026, Copilot Chat without a Copilot licence, account with personal custom instructions): the original one-message prompt silently dropped the fourth file, so the correction now goes first. With the published two-message steps, 6 runs (EN, ID, BM 3 times) gave the corrected quarter, like-for-like fill rate, 1 LTI Red, utilisation as a risk, decisions as requested and no Appendix C names every time, and correct commitment statuses in all 6; the misses were one rounding slip (Surabaya 8,781), one LTIFR of 0.54 from missing hours, and one BM run that stopped before the slides. An earlier wording without calculation and status rules misread fill rate (92.5%) and status calls, so those rules are in the prompt."
---

## Situation

**The ask.** Tuesday, 14:00. You are the business planning manager. The Chief of Staff wants your division's section of Thursday's Quarterly Business Review by Wednesday noon: ten slides at most, in the company template.

**What you received.** A 10-page report and KPI workbook from a manager now on leave, plus a correction from Finance last night. The report headlines its best month, changed a definition and still claims zero lost-time injuries.

**What good looks like.** The corrected quarter, like-for-like comparisons, honest commitment status, decisions marked as requested, and notes that cite every number.

## Steps

**1. Prepare the folder.** Do this once, whichever tier you use.

1. Download the kit and copy files **01 to 06** into one folder in your OneDrive for work. Keep **README.txt** out of it: it holds the answer key.
2. Open each file once so it appears in search. If your organisation requires a sensitivity label before editing, apply your lowest internal label.
3. For each attempt, make a copy of **06_Zava_Niaga_QBR_Template.pptx** and give it a new name. Never build in the original.

::::tier{key="basic"}
**2. Give Copilot Chat the correction first.** Copilot Chat accepts at most three uploaded files per message, so send the correction on its own. Open **Copilot Chat** with your work account, select **+** > **Upload images and files**, add **04** only, then run:

:::prompt
ABOUT: Sends the late correction first, because Copilot Chat takes at most three uploaded files per message.
EN: This is correction email 04 for the Q3 2026 Distribution Operations report. Tell me in two lines what it corrects. I will send the other files and my request next.
ID: Ini email koreksi 04 untuk laporan Distribution Operations Q3 2026. Jelaskan dalam dua baris apa yang dikoreksi. Saya akan mengirim file lain dan permintaan saya berikutnya.
BM: Ini e-mel pembetulan 04 untuk laporan Distribution Operations Q3 2026. Terangkan dalam dua baris apa yang dibetulkan. Saya akan menghantar fail lain dan permintaan saya selepas ini.
:::

**After you run it:** two lines saying the 18,400 transfer cases were removed from Surabaya's September volume.

**3. Have Copilot Chat rebuild the numbers and write the slides.** In the same chat, upload **01**, **02** and **03**, then run:

:::prompt
ABOUT: Recalculates the report from the workbook and correction, then writes every slide and its notes for you to paste.
EN: Act as the Business Planning Manager named in request 01, preparing the Distribution Operations section of the Q3 2026 QBR deck for the Direksi of the fictional company in the files.
Use only these files: 01 request with the QBR deck standard, 02 Q3 report v1.0 and 03 KPI workbook uploaded with this message, and 04 correction email from my previous message. Do not search the web.
Treat report 02 as the author's draft: recalculate every KPI from workbook 03, apply the correction in 04 and follow the deck standard in 01 exactly.
Report the quarter, not the best month. Calculate company OTIF and fill rate from total orders and order lines, not by averaging the DC percentages.
Compare fill rate like with like (order-line basis, or both bases from the Definitions sheet) and say so.
Remove the 18,400 Surabaya transfer cases from September volume, then recalculate network and Surabaya cost per case.
Check Safety_Log for incidents reclassified after the report; treat utilisation as a capacity risk where higher is worse; show complaints as counts.
First give me a scorecard table: OTIF, fill rate, cost per case, inventory days, Cikarang utilisation, lost-time injuries and complaints, with Q3 value, target, change vs Q2, RAG and source. Calculate every KPI with code from the workbook rows, and in the source column show the totals and the formula you used; for lost-time injuries also give LTIFR.
Then write the deck slide by slide, at most 10 slides: slide title as a one-sentence message, 3 to 5 short bullets with numbers, and speaker notes with the source of each number.
Answer the three Direksi questions in 01, show each Q2 commitment from 01 as Done, Partly done or Not started using the definitions in the standard word for word (drafts, discussions and plans do not count as started; a missed target is not Done), and show the two decisions requested with annual cost and alternative.
Name owners by role only; leave out report Appendix C and any named employee, disciplinary matter or ranking.
End with a list of every figure that differs from report v1.0 and why. If you can create a downloadable .pptx file, create one as well; otherwise say so.
ID: Bertindaklah sebagai Business Planning Manager yang disebut dalam permintaan 01, yang menyiapkan bagian Distribution Operations untuk deck QBR Q3 2026 bagi Direksi perusahaan fiktif dalam file.
Gunakan hanya file berikut: 01 permintaan beserta QBR deck standard, 02 laporan Q3 v1.0 dan 03 KPI workbook yang diunggah bersama pesan ini, serta 04 email koreksi dari pesan saya sebelumnya. Jangan mencari di web.
Perlakukan laporan 02 sebagai draf penulisnya: hitung ulang setiap KPI dari workbook 03, terapkan koreksi di 04 dan ikuti deck standard di 01 persis.
Laporkan kuartal, bukan bulan terbaik. Hitung OTIF dan fill rate perusahaan dari total order dan order line, bukan dengan merata-ratakan persentase DC.
Bandingkan fill rate secara setara (basis order line, atau kedua basis dari sheet Definitions) dan sebutkan hal ini.
Keluarkan 18.400 case transfer Surabaya dari volume September, lalu hitung ulang cost per case jaringan dan Surabaya.
Periksa Safety_Log untuk insiden yang direklasifikasi setelah laporan; perlakukan utilisasi sebagai risiko kapasitas (makin tinggi makin buruk); tampilkan keluhan sebagai jumlah.
Pertama, berikan tabel scorecard: OTIF, fill rate, cost per case, inventory days, utilisasi Cikarang, lost-time injury dan keluhan, dengan nilai Q3, target, perubahan vs Q2, RAG dan sumber. Hitung setiap KPI dengan kode dari baris workbook, dan di kolom sumber tampilkan total dan rumus yang digunakan; untuk lost-time injury berikan juga LTIFR.
Lalu tulis deck slide demi slide, maksimal 10 slide: judul slide berupa pesan satu kalimat, 3 sampai 5 poin singkat dengan angka, dan speaker notes berisi sumber setiap angka.
Jawab tiga pertanyaan Direksi di 01, tampilkan setiap komitmen Q2 dari 01 sebagai Done, Partly done atau Not started sesuai definisi di standard secara harfiah (draf, diskusi dan rencana tidak dihitung sebagai dimulai; target yang tidak tercapai bukan Done), dan tampilkan dua keputusan yang diminta dengan biaya tahunan dan alternatif.
Sebut pemilik hanya dengan jabatan; jangan masukkan Lampiran C laporan maupun nama karyawan, perkara disiplin atau peringkat.
Akhiri dengan daftar setiap angka yang berbeda dari laporan v1.0 beserta alasannya. Jika Anda dapat membuat file .pptx yang bisa diunduh, buat juga; jika tidak, sebutkan.
BM: Bertindak sebagai Business Planning Manager yang dinamakan dalam permintaan 01, yang menyediakan bahagian Distribution Operations bagi dek QBR Q3 2026 untuk Lembaga Pengarah syarikat rekaan dalam fail.
Gunakan hanya fail berikut: 01 permintaan bersama QBR deck standard, 02 laporan Q3 v1.0 dan 03 KPI workbook yang dimuat naik bersama mesej ini, serta 04 e-mel pembetulan daripada mesej saya sebelum ini. Jangan cari di web.
Anggap laporan 02 sebagai draf penulisnya: kira semula setiap KPI daripada workbook 03, gunakan pembetulan dalam 04 dan ikut deck standard dalam 01 dengan tepat.
Laporkan suku tahun, bukan bulan terbaik. Kira OTIF dan fill rate syarikat daripada jumlah pesanan dan order line, bukan dengan mempuratakan peratusan DC.
Bandingkan fill rate secara setara (asas order line, atau kedua-dua asas daripada sheet Definitions) dan nyatakannya.
Keluarkan 18,400 case pindahan Surabaya daripada volum September, kemudian kira semula cost per case rangkaian dan Surabaya.
Semak Safety_Log untuk insiden yang diklasifikasikan semula selepas laporan; anggap penggunaan sebagai risiko kapasiti (lebih tinggi lebih buruk); tunjukkan aduan sebagai bilangan.
Mula-mula, berikan jadual scorecard: OTIF, fill rate, cost per case, inventory days, penggunaan Cikarang, lost-time injury dan aduan, dengan nilai Q3, sasaran, perubahan berbanding Q2, RAG dan sumber. Kira setiap KPI dengan kod daripada baris workbook, dan dalam lajur sumber tunjukkan jumlah dan formula yang digunakan; bagi lost-time injury berikan juga LTIFR.
Kemudian tulis dek slaid demi slaid, paling banyak 10 slaid: tajuk slaid sebagai mesej satu ayat, 3 hingga 5 poin ringkas dengan angka, dan speaker notes dengan sumber setiap angka.
Jawab tiga soalan Lembaga dalam 01, tunjukkan setiap komitmen Q2 daripada 01 sebagai Done, Partly done atau Not started mengikut definisi dalam standard secara tepat (draf, perbincangan dan rancangan tidak dikira sebagai dimulakan; sasaran yang tidak dicapai bukan Done), dan tunjukkan dua keputusan yang dipohon dengan kos tahunan dan alternatif.
Namakan pemilik mengikut jawatan sahaja; jangan masukkan Lampiran C laporan atau sebarang nama pekerja, perkara tatatertib atau kedudukan.
Akhiri dengan senarai setiap angka yang berbeza daripada laporan v1.0 dan sebabnya. Jika anda boleh mencipta fail .pptx yang boleh dimuat turun, cipta juga; jika tidak, nyatakannya.
:::

**After you run it:** a scorecard whose source column shows totals and formulas, ten slides of text with notes, and a list of what changed from the report. Check the scorecard against **Check it** before you build anything.

**4. Build the slides in your template copy.** Open your copy of **06** in PowerPoint. Replace the sample text slide by slide: titles, bullets and the scorecard table; paste each slide's notes into the **Notes** pane. Keep the template's colours and RAG cells. Delete unused sample slides.
::::

::::tier{key="premium"}
**2. Build the deck in your template copy.** Open your copy of **06** in **PowerPoint for the web**, select **Editing**, then **Copilot**. Check that the pane shows **Allow editing**.

1. In the message box, type **/** and the start of each file name, then select it: **01**, **02**, **03** and **04**. Four is the maximum; leave 05 and 06 out.
2. Put the cursor after the last file, press **Shift+Enter**, paste the prompt for your language and send.
3. Wait. The run took about ten minutes in our tests. Do not close the pane while it works.

:::prompt
ABOUT: Builds the ten-slide deck in the open template from four files, applying the correction and the deck standard, with cited notes.
EN: You are the Business Planning Manager named in request 01, building the Distribution Operations section of the Q3 2026 QBR for the Direksi of the fictional company in the attached files.
Use only the four attached files: 01 request with the QBR deck standard, 02 Q3 report v1.0, 03 KPI workbook and 04 correction email. Build in this open template; replace its sample slides and keep its design.
Follow the deck standard in 01 exactly: at most 10 slides including the title, one message per slide written as the slide title, English slide text.
Treat report 02 as the author's draft, not the final truth: recalculate every KPI from workbook 03 and apply the correction in 04 before you write any slide.
Report the quarter, never the best month. Calculate company OTIF and fill rate from total orders and total order lines, not by averaging the DC percentages.
Fill rate changed method in Q3: compare like with like on the order-line basis (or show both bases from the Definitions sheet) and say so on the slide.
Remove the 18,400 Surabaya transfer cases from September volume, then recalculate network and Surabaya cost per case.
Check the Safety_Log sheet for any incident reclassified after the report was written, and apply the standard's safety RAG rule.
Treat warehouse utilisation as a capacity risk where higher is worse, use the bands in the standard, and show the Q4 forecast from the report.
Show complaints as a count and the change in count. Show rate changes in percentage points and cost changes in percent.
Slide 2 is the executive summary: three messages with numbers, then a scorecard of OTIF, fill rate, cost per case, inventory days, Cikarang utilisation, lost-time injuries and complaints with Q3 value, target, change vs Q2 and RAG.
Answer the three Direksi questions in 01: service across the quarter, why Cikarang is full and what must be decided before the Q4 peak, and what happened to the three Q2 commitments.
Show every Q2 commitment listed in 01 as Done, Partly done or Not started using the definitions in the standard, with evidence; calculate the Surabaya overtime change from the Overtime sheet.
Show the overflow warehouse lease and the carrier tender as decisions requested, with annual cost, alternative and date needed; never describe them as approved.
Name owners by role only. Leave out report Appendix C and any named employee, disciplinary matter or individual ranking.
Add speaker notes to every content slide: 3 to 5 sentences to say, then the source of each number (file and section or sheet) and what changed from report v1.0.
Finish with a short list in chat of every figure where the deck differs from report v1.0 and why, plus anything you could not verify.
ID: Anda adalah Business Planning Manager yang disebut dalam permintaan 01, yang menyusun bagian Distribution Operations untuk QBR Q3 2026 di depan Direksi perusahaan fiktif dalam file terlampir.
Gunakan hanya empat file terlampir: 01 permintaan beserta QBR deck standard, 02 laporan Q3 v1.0, 03 KPI workbook dan 04 email koreksi. Bangun di template yang sedang terbuka ini; ganti slide contohnya dan pertahankan desainnya.
Ikuti deck standard di 01 persis: maksimal 10 slide termasuk judul, satu pesan per slide yang ditulis sebagai judul slide, teks slide dalam bahasa Inggris.
Perlakukan laporan 02 sebagai draf penulisnya, bukan kebenaran akhir: hitung ulang setiap KPI dari workbook 03 dan terapkan koreksi di 04 sebelum menulis slide apa pun.
Laporkan kuartal, bukan bulan terbaik. Hitung OTIF dan fill rate perusahaan dari total order dan total order line, bukan dengan merata-ratakan persentase DC.
Metode fill rate berubah di Q3: bandingkan secara setara dengan basis order line (atau tampilkan kedua basis dari sheet Definitions) dan sebutkan hal ini di slide.
Keluarkan 18.400 case transfer Surabaya dari volume September, lalu hitung ulang cost per case jaringan dan Surabaya.
Periksa sheet Safety_Log untuk insiden yang direklasifikasi setelah laporan ditulis, dan terapkan aturan RAG keselamatan dari standard.
Perlakukan utilisasi gudang sebagai risiko kapasitas (makin tinggi makin buruk), gunakan rentang di standard, dan tampilkan prakiraan Q4 dari laporan.
Tampilkan keluhan sebagai jumlah dan perubahan jumlahnya. Tampilkan perubahan rasio dalam poin persentase dan perubahan biaya dalam persen.
Slide 2 adalah ringkasan eksekutif: tiga pesan dengan angka, lalu scorecard OTIF, fill rate, cost per case, inventory days, utilisasi Cikarang, lost-time injury dan keluhan dengan nilai Q3, target, perubahan vs Q2 dan RAG.
Jawab tiga pertanyaan Direksi di 01: layanan sepanjang kuartal, mengapa Cikarang penuh dan apa yang harus diputuskan sebelum puncak Q4, serta nasib tiga komitmen Q2.
Tampilkan setiap komitmen Q2 yang tercantum di 01 sebagai Done, Partly done atau Not started sesuai definisi di standard, dengan bukti; hitung perubahan lembur Surabaya dari sheet Overtime.
Tampilkan sewa gudang overflow dan tender carrier sebagai keputusan yang diminta, dengan biaya tahunan, alternatif dan tanggal dibutuhkan; jangan pernah menyebutnya sudah disetujui.
Sebut pemilik hanya dengan jabatan. Jangan masukkan Lampiran C laporan maupun nama karyawan, perkara disiplin atau peringkat individu.
Tambahkan speaker notes di setiap slide isi: 3 sampai 5 kalimat yang akan diucapkan, lalu sumber setiap angka (file dan bagian atau sheet) dan apa yang berubah dari laporan v1.0.
Akhiri dengan daftar singkat di chat berisi setiap angka di deck yang berbeda dari laporan v1.0 beserta alasannya, ditambah hal yang tidak dapat Anda verifikasi.
BM: Anda ialah Business Planning Manager yang dinamakan dalam permintaan 01, yang menyediakan bahagian Distribution Operations bagi QBR Q3 2026 untuk Lembaga Pengarah syarikat rekaan dalam fail yang dilampirkan.
Gunakan hanya empat fail yang dilampirkan: 01 permintaan bersama QBR deck standard, 02 laporan Q3 v1.0, 03 KPI workbook dan 04 e-mel pembetulan. Bina dalam templat yang sedang dibuka ini; gantikan slaid contohnya dan kekalkan reka bentuknya.
Ikut deck standard dalam 01 dengan tepat: paling banyak 10 slaid termasuk tajuk, satu mesej bagi setiap slaid yang ditulis sebagai tajuk slaid, teks slaid dalam bahasa Inggeris.
Anggap laporan 02 sebagai draf penulisnya, bukan kebenaran muktamad: kira semula setiap KPI daripada workbook 03 dan gunakan pembetulan dalam 04 sebelum menulis sebarang slaid.
Laporkan suku tahun, bukan bulan terbaik. Kira OTIF dan fill rate syarikat daripada jumlah pesanan dan jumlah order line, bukan dengan mempuratakan peratusan DC.
Kaedah fill rate berubah pada Q3: bandingkan secara setara pada asas order line (atau tunjukkan kedua-dua asas daripada sheet Definitions) dan nyatakannya pada slaid.
Keluarkan 18,400 case pindahan Surabaya daripada volum September, kemudian kira semula cost per case rangkaian dan Surabaya.
Semak sheet Safety_Log untuk insiden yang diklasifikasikan semula selepas laporan ditulis, dan gunakan peraturan RAG keselamatan dalam standard.
Anggap penggunaan gudang sebagai risiko kapasiti (lebih tinggi lebih buruk), gunakan julat dalam standard, dan tunjukkan ramalan Q4 daripada laporan.
Tunjukkan aduan sebagai bilangan dan perubahan bilangan. Tunjukkan perubahan kadar dalam mata peratusan dan perubahan kos dalam peratus.
Slaid 2 ialah ringkasan eksekutif: tiga mesej dengan angka, kemudian scorecard OTIF, fill rate, cost per case, inventory days, penggunaan Cikarang, lost-time injury dan aduan dengan nilai Q3, sasaran, perubahan berbanding Q2 dan RAG.
Jawab tiga soalan Lembaga dalam 01: perkhidmatan sepanjang suku tahun, mengapa Cikarang penuh dan apa yang mesti diputuskan sebelum puncak Q4, serta status tiga komitmen Q2.
Tunjukkan setiap komitmen Q2 yang disenaraikan dalam 01 sebagai Done, Partly done atau Not started mengikut definisi dalam standard, dengan bukti; kira perubahan kerja lebih masa Surabaya daripada sheet Overtime.
Tunjukkan pajakan gudang limpahan dan tender pengangkut sebagai keputusan yang dipohon, dengan kos tahunan, alternatif dan tarikh diperlukan; jangan sekali-kali menyatakannya telah diluluskan.
Namakan pemilik mengikut jawatan sahaja. Jangan masukkan Lampiran C laporan atau sebarang nama pekerja, perkara tatatertib atau kedudukan individu.
Tambah speaker notes pada setiap slaid kandungan: 3 hingga 5 ayat untuk disampaikan, kemudian sumber setiap angka (fail dan bahagian atau sheet) dan apa yang berubah daripada laporan v1.0.
Akhiri dengan senarai ringkas dalam chat bagi setiap angka dalam dek yang berbeza daripada laporan v1.0 dan sebabnya, serta perkara yang tidak dapat anda sahkan.
:::

**After you run it:** ten slides in your template and a chat list of every figure that changed from the report. In our runs the deck matched all 22 answer-key checks; the first run, before the status definitions were added, called the carrier tender Partly done.

**3. Review the deck, then tidy it.** Read every slide and its notes against **Check it**. Fix wording yourself or ask Copilot for one change at a time, for example "On slide 8, keep the table but shorten the evidence column to one line per commitment."
::::

::::tier{key="cowork"}
**2. Give Cowork the whole job.** Open **Copilot Cowork** > **New task**. Replace **[your folder name]** with your OneDrive folder and run:

:::prompt
ABOUT: Reads all six files, builds the deck in a copy of the template, checks it against the standard and drafts the cover email for your approval.
EN: Act as the Business Planning Manager named in request 01, at the fictional company in the folder. Build the Distribution Operations section of the Q3 2026 QBR deck for the Direksi meeting on Thursday 8 October.
Work only from the OneDrive folder [your folder name]: 01 request and QBR deck standard, 02 Q3 report v1.0, 03 KPI workbook, 04 correction email, 05 Q2 QBR deck and 06 QBR template. Read all six before you start.
Build the deck in a copy of 06 named Q3_QBR_Distribution_Ops_Cowork.pptx saved in this task's output; replace the sample slides, keep the design, and never edit or move files 01 to 06.
Follow the deck standard in 01 exactly: at most 10 slides including the title, one message per slide written as the slide title, English slide text, RAG rules as written.
Treat report 02 as the author's draft: recalculate every KPI from workbook 03 and apply the correction in 04 before you write any slide.
Report the quarter, not the best month. Calculate company OTIF and fill rate from total orders and order lines, not by averaging DC percentages.
Compare fill rate like with like: the method changed in Q3, so use the order-line basis or both bases from the Definitions sheet, and say so.
Remove the 18,400 Surabaya transfer cases from September volume, then recalculate network and Surabaya cost per case.
Check Safety_Log for incidents reclassified after the report date; treat utilisation as a capacity risk where higher is worse; show complaints as counts.
Slide 2: three messages with numbers, then a scorecard of OTIF, fill rate, cost per case, inventory days, Cikarang utilisation, lost-time injuries and complaints with Q3, target, change vs Q2 and RAG.
Answer the three Direksi questions in 01. Show each Q2 commitment as Done, Partly done or Not started using the definitions in the standard, with evidence; use the Overtime sheet for Surabaya.
Show the overflow warehouse and carrier tender as decisions requested with annual cost, alternative and date needed; never as approved.
Name owners by role only; leave out report Appendix C and any named employee, disciplinary matter or ranking.
Add speaker notes to every content slide: what to say in 3 to 5 sentences, the source of each number, and what changed from report v1.0.
Then check your own deck against every rule in the standard and fix what fails. Save a short Word file Q3_QBR_Checks.docx next to the deck, listing each check, pass or fail, and every figure that differs from report v1.0.
Finally draft, but do not send, an email to the Chief of Staff who sent request 01, with the deck link and three lines on what changed from the report. Show me the draft and wait for my approval.
ID: Bertindaklah sebagai Business Planning Manager yang disebut dalam permintaan 01, di perusahaan fiktif dalam folder. Susun bagian Distribution Operations untuk deck QBR Q3 2026 bagi rapat Direksi hari Kamis 8 Oktober.
Bekerja hanya dari folder OneDrive [nama folder Anda]: 01 permintaan dan QBR deck standard, 02 laporan Q3 v1.0, 03 KPI workbook, 04 email koreksi, 05 deck QBR Q2 dan 06 template QBR. Baca keenamnya sebelum mulai.
Bangun deck di salinan 06 bernama Q3_QBR_Distribution_Ops_Cowork.pptx yang disimpan di output tugas ini; ganti slide contoh, pertahankan desain, dan jangan pernah mengubah atau memindahkan file 01 sampai 06.
Ikuti deck standard di 01 persis: maksimal 10 slide termasuk judul, satu pesan per slide yang ditulis sebagai judul slide, teks slide dalam bahasa Inggris, aturan RAG sesuai tertulis.
Perlakukan laporan 02 sebagai draf penulisnya: hitung ulang setiap KPI dari workbook 03 dan terapkan koreksi di 04 sebelum menulis slide apa pun.
Laporkan kuartal, bukan bulan terbaik. Hitung OTIF dan fill rate perusahaan dari total order dan order line, bukan dengan merata-ratakan persentase DC.
Bandingkan fill rate secara setara: metodenya berubah di Q3, jadi gunakan basis order line atau kedua basis dari sheet Definitions, dan sebutkan hal ini.
Keluarkan 18.400 case transfer Surabaya dari volume September, lalu hitung ulang cost per case jaringan dan Surabaya.
Periksa Safety_Log untuk insiden yang direklasifikasi setelah tanggal laporan; perlakukan utilisasi sebagai risiko kapasitas (makin tinggi makin buruk); tampilkan keluhan sebagai jumlah.
Slide 2: tiga pesan dengan angka, lalu scorecard OTIF, fill rate, cost per case, inventory days, utilisasi Cikarang, lost-time injury dan keluhan dengan Q3, target, perubahan vs Q2 dan RAG.
Jawab tiga pertanyaan Direksi di 01. Tampilkan setiap komitmen Q2 sebagai Done, Partly done atau Not started sesuai definisi di standard, dengan bukti; gunakan sheet Overtime untuk Surabaya.
Tampilkan gudang overflow dan tender carrier sebagai keputusan yang diminta dengan biaya tahunan, alternatif dan tanggal dibutuhkan; jangan sebagai yang sudah disetujui.
Sebut pemilik hanya dengan jabatan; jangan masukkan Lampiran C laporan maupun nama karyawan, perkara disiplin atau peringkat.
Tambahkan speaker notes di setiap slide isi: yang akan diucapkan dalam 3 sampai 5 kalimat, sumber setiap angka, dan apa yang berubah dari laporan v1.0.
Lalu periksa deck Anda sendiri terhadap setiap aturan di standard dan perbaiki yang gagal. Simpan file Word singkat Q3_QBR_Checks.docx di samping deck, berisi setiap pemeriksaan, lulus atau gagal, dan setiap angka yang berbeda dari laporan v1.0.
Terakhir, buat draf email untuk Chief of Staff pengirim permintaan 01, tetapi jangan kirim, berisi tautan deck dan tiga baris tentang apa yang berubah dari laporan. Tunjukkan drafnya kepada saya dan tunggu persetujuan saya.
BM: Bertindak sebagai Business Planning Manager yang dinamakan dalam permintaan 01, di syarikat rekaan dalam folder. Bina bahagian Distribution Operations bagi dek QBR Q3 2026 untuk mesyuarat Lembaga Pengarah pada Khamis 8 Oktober.
Bekerja hanya daripada folder OneDrive [nama folder anda]: 01 permintaan dan QBR deck standard, 02 laporan Q3 v1.0, 03 KPI workbook, 04 e-mel pembetulan, 05 dek QBR Q2 dan 06 templat QBR. Baca keenam-enamnya sebelum bermula.
Bina dek dalam salinan 06 bernama Q3_QBR_Distribution_Ops_Cowork.pptx yang disimpan dalam output tugasan ini; gantikan slaid contoh, kekalkan reka bentuk, dan jangan sekali-kali mengubah atau mengalihkan fail 01 hingga 06.
Ikut deck standard dalam 01 dengan tepat: paling banyak 10 slaid termasuk tajuk, satu mesej bagi setiap slaid yang ditulis sebagai tajuk slaid, teks slaid dalam bahasa Inggeris, peraturan RAG seperti yang tertulis.
Anggap laporan 02 sebagai draf penulisnya: kira semula setiap KPI daripada workbook 03 dan gunakan pembetulan dalam 04 sebelum menulis sebarang slaid.
Laporkan suku tahun, bukan bulan terbaik. Kira OTIF dan fill rate syarikat daripada jumlah pesanan dan order line, bukan dengan mempuratakan peratusan DC.
Bandingkan fill rate secara setara: kaedahnya berubah pada Q3, jadi gunakan asas order line atau kedua-dua asas daripada sheet Definitions, dan nyatakannya.
Keluarkan 18,400 case pindahan Surabaya daripada volum September, kemudian kira semula cost per case rangkaian dan Surabaya.
Semak Safety_Log untuk insiden yang diklasifikasikan semula selepas tarikh laporan; anggap penggunaan sebagai risiko kapasiti (lebih tinggi lebih buruk); tunjukkan aduan sebagai bilangan.
Slaid 2: tiga mesej dengan angka, kemudian scorecard OTIF, fill rate, cost per case, inventory days, penggunaan Cikarang, lost-time injury dan aduan dengan Q3, sasaran, perubahan berbanding Q2 dan RAG.
Jawab tiga soalan Lembaga dalam 01. Tunjukkan setiap komitmen Q2 sebagai Done, Partly done atau Not started mengikut definisi dalam standard, dengan bukti; gunakan sheet Overtime untuk Surabaya.
Tunjukkan gudang limpahan dan tender pengangkut sebagai keputusan yang dipohon dengan kos tahunan, alternatif dan tarikh diperlukan; bukan sebagai telah diluluskan.
Namakan pemilik mengikut jawatan sahaja; jangan masukkan Lampiran C laporan atau sebarang nama pekerja, perkara tatatertib atau kedudukan.
Tambah speaker notes pada setiap slaid kandungan: apa yang perlu disampaikan dalam 3 hingga 5 ayat, sumber setiap angka, dan apa yang berubah daripada laporan v1.0.
Kemudian semak dek anda sendiri terhadap setiap peraturan dalam standard dan betulkan yang gagal. Simpan fail Word ringkas Q3_QBR_Checks.docx di sebelah dek, yang menyenaraikan setiap semakan, lulus atau gagal, dan setiap angka yang berbeza daripada laporan v1.0.
Akhir sekali, draf tetapi jangan hantar e-mel kepada Chief of Staff yang menghantar permintaan 01, dengan pautan dek dan tiga baris tentang apa yang berubah daripada laporan. Tunjukkan draf kepada saya dan tunggu kelulusan saya.
:::

**After you run it:** the deck and a checks file in the task's **Output** panel (OneDrive > Documents > Cowork > Tasks), and an email draft shown for approval. Files 01 to 06 stay unchanged.

**3. Review, then approve or edit the email.** Open the deck and the checks file side by side and compare them with **Check it**. Approve the email draft only when you would send it yourself.
::::

## Check it

::::tier{key="basic" section="checks"}
- **Scorecard:** OTIF **92.3%** Amber (+1.0 pts); fill rate **91.2%** on order lines Amber (+0.8 pts); cost per case **IDR 8,639** Amber (+1.3%); inventory days **31.4** Green; Cikarang utilisation **91.2%** Amber (+2.3 pts); **1** lost-time injury, Red; complaints **18** Amber (+5 from 13).
- **Quarter, not September:** the headline is **92.3%**, not the report's 94.0% for September. The plain average of the four DC rates, 93.3%, is wrong.
- **Correction applied:** cost per case **IDR 8,639**, not 8,585; Surabaya **IDR 8,782**, not 8,504.
- **Fill rate like for like:** **+0.8 pts**, not +3.7. The report compared the new case basis with last quarter's order-line basis.
- **Safety:** HSE-2026-088 (Medan, 19 August) was reclassified to a lost-time injury on 2 October: **1 LTI**, LTIFR **0.41**, Red. The report still says zero.
- **Utilisation is a risk:** 91.2% is Amber, September's 93.0% and November's forecast of about 96% are Red. Nothing calls it "excellent".
- **Commitments:** WMS at Medan **Done**; Surabaya overtime **Partly done** (37,500 hours, **9.0%** lower, not 20%); carrier retender **Not started**.
- **Decisions:** the overflow warehouse (about **IDR 4.2 billion a year**) and the carrier tender are **requested, not approved**.
- **People:** no names from report Appendix C (the disciplinary warning and picker ranking); owners by role.
::::

::::tier{key="premium" section="checks"}
- **Scorecard (slide 2):** OTIF **92.3%** Amber (+1.0 pts); fill rate **91.2%** on order lines Amber (+0.8 pts); cost per case **IDR 8,639** Amber (+1.3%); inventory days **31.4** Green; Cikarang utilisation **91.2%** Amber (+2.3 pts); **1** lost-time injury, Red; complaints **18** Amber (+5 from 13).
- **Quarter, not September:** the headline is **92.3%**, not the report's 94.0% for September. The plain average of the four DC rates, 93.3%, is wrong.
- **Correction applied:** cost per case **IDR 8,639**, not 8,585; Surabaya **IDR 8,782**, not 8,504.
- **Fill rate like for like:** **+0.8 pts**, not +3.7. The report compared the new case basis with last quarter's order-line basis.
- **Safety:** HSE-2026-088 (Medan, 19 August) was reclassified to a lost-time injury on 2 October: **1 LTI**, LTIFR **0.41**, Red. The report still says zero.
- **Utilisation is a risk:** 91.2% is Amber, September's 93.0% and November's forecast of about 96% are Red. Nothing calls it "excellent".
- **Commitments:** WMS at Medan **Done**; Surabaya overtime **Partly done** (37,500 hours, **9.0%** lower, not 20%); carrier retender **Not started**.
- **Decisions:** the overflow warehouse (about **IDR 4.2 billion a year**) and the carrier tender are **requested, not approved**.
- **People and notes:** no names from report Appendix C; owners by role; every content slide has notes citing the file and sheet for its numbers.
::::

::::tier{key="cowork" section="checks"}
- **Scorecard (slide 2):** OTIF **92.3%** Amber (+1.0 pts); fill rate **91.2%** on order lines Amber (+0.8 pts); cost per case **IDR 8,639** Amber (+1.3%); inventory days **31.4** Green; Cikarang utilisation **91.2%** Amber (+2.3 pts); **1** lost-time injury, Red; complaints **18** Amber (+5 from 13).
- **Traps:** headline is the quarter (**92.3%**), not September (94.0%) or the DC average (93.3%); corrected cost **IDR 8,639** and Surabaya **IDR 8,782**; fill rate **+0.8 pts** like for like; **1 LTI**; utilisation treated as a risk.
- **Commitments:** WMS **Done**; Surabaya overtime **Partly done** (37,500 hours, **9.0%** lower); carrier retender **Not started**.
- **Decisions:** overflow warehouse (about **IDR 4.2 billion a year**) and carrier tender are **requested, not approved**.
- **Files and email:** files 01 to 06 unchanged; the checks file lists every rule with pass or fail; the email is a draft waiting for your approval, not sent.
::::

## When it goes wrong

::::tier{key="basic" section="fixes"}
- **Copilot Chat cannot read the workbook.** Upload the .xlsx again on its own and ask for the Monthly_DC totals first; if it still fails, export Monthly_DC, Safety_Log and Overtime to one PDF and upload that. (step 3)
- **Only three files attach, or Copilot says the correction is missing.** Copilot Chat takes three uploaded files per message and drops the fourth without a warning. Send 04 first (step 2), then 01 to 03 (step 3).
- **Copilot says it cannot read the whole workbook and stops before the slides.** Seen once in six runs. Ask: "Use the Monthly_DC, Safety_Log and Overtime sheets you can read and continue with the scorecard and all slides." (step 3)
- **A .pptx appears in OneDrive > Copilot > Created.** It is a skeleton: one line per slide and no notes. Build from the chat text instead. (step 3)
- **The scorecard repeats the report.** Ask: "Recalculate every KPI from workbook 03 after removing the 18,400 transfer cases, and show the formula for each." (step 3)
- **LTIFR differs from 0.41.** Copilot left out a site's hours. Ask it to sum hours worked for all four DCs from the workbook and recalculate. (step 3)
::::

::::tier{key="premium" section="fixes"}
- **"You've added the maximum number of files."** Copilot in PowerPoint accepts four files. Attach 01 to 04 only; the Q2 commitments are quoted in 01. (step 2)
- **A file does not appear after typing /.** Files uploaded minutes ago may not be indexed yet. Open the file once in the browser, wait a few minutes and try again. (step 2)
- **The carrier tender shows Partly done.** This happened before the deck standard defined the statuses. Ask Copilot to re-check slide 8 against the status definitions in 01. (step 3)
- **Copilot adds annualised costs of its own.** In our runs it added storage and freight estimates labelled illustrative. Keep them only if you can defend them, or ask Copilot to remove them. (step 3)
- **Copilot asks whether to keep the current style.** Choose **Keep current QBR style** and **Confirm**: the deck standard requires the template. (step 2)
- **Editing is greyed out.** Your organisation may require a sensitivity label first. Select a label, then switch to **Editing**. (step 2)
::::

::::tier{key="cowork" section="fixes"}
- **Cowork edits the template itself.** Keep "Make a copy of 06" and "never edit files 01 to 06" in the prompt. Restore the original from the kit if it was changed. (step 2)
- **Cowork wants to send the email.** Decline. The prompt asks for a draft shown for approval; send it yourself when ready. (step 3)
- **The checks file says everything passed.** Compare it with **Check it** yourself; a self-check is not independent proof. (step 3)
- **Cowork asks to move the deck and the move fails.** Seen three times in our tests. Cancel, open the deck from the task's **Output** panel and move it yourself if needed. (step 2)
- **RAG cells lost their colours.** Cowork kept the RAG words but not the template's fills. Recolour the cells in PowerPoint, or ask Copilot in PowerPoint to "apply the template's Green, Amber and Red fills to the RAG column". (step 3)
::::

## Take it further

- **Use your own report.** Replace the kit with the next report you receive. Keep the four-part shape: the request with your deck rules, the report, its data and any later correction. Write your own status definitions and RAG rules into the request.
- **Make the deck rules reusable.** Save your company's deck standard as one short Word file and attach it every time; for Cowork, turn it into a skill so every deck is checked against the same rules.
- **Compare with Microsoft's own scenarios.** Microsoft's Scenario Library has one-slide guides for **Conduct a business review** and **Prepare for an all-hands meeting**. This scenario adds the files, traps and answer key.

:::presenter
**40-minute flow:** the situation and the deck standard 5 min; prepare the folder and template copy 5 min; run the Premium prompt (start it, then talk through the traps while it runs) 15 min; check slide 2 and slide 8 against the answer key 10 min; show the Cowork or Basic variant and discuss 5 min.

**Show the trap before the answer:** open the report's executive summary first. Ask the room what they would put on the scorecard. Then show the correction email, the Safety_Log reclassification and the fill-rate definition change.

**Say what Copilot did not know:** without the written status definitions it judged a discussed tender "Partly done". Rules in the request make the result repeatable.

**Close on ownership:** the deck is a draft until the presenter and the report owner sign off every number.
:::
