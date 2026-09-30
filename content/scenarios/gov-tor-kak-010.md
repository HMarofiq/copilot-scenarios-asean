---
id: gov-tor-kak-010
title: { en: "Procurement TOR (KAK) and bid evaluation", id: "Kerangka Acuan Kerja (KAK) dan evaluasi penawaran", ms: "Terma rujukan perolehan dan penilaian tawaran" }
summary:
  en: "Draft a vendor-neutral terms of reference (KAK) from a user department's memo under your procurement rules, then evaluate four real-looking bids for the committee: administrative and technical checks in Word, and price correction, VAT, currency and scoring in Excel."
  id: "Susun KAK yang netral dari nota dinas unit pengguna sesuai pedoman pengadaan, lalu evaluasi empat penawaran untuk Tim Evaluasi: pemeriksaan administrasi dan teknis di Word, serta koreksi harga, PPN, kurs dan penilaian di Excel."
  ms: "Sediakan terma rujukan yang neutral daripada memo jabatan pengguna mengikut peraturan perolehan, kemudian nilai empat tawaran untuk jawatankuasa: semakan pentadbiran dan teknikal dalam Word, serta pembetulan harga, cukai, mata wang dan pemarkahan dalam Excel."
industry: [government-soe]
department: [procurement]
persona: [procurement-officer]
market: [ID, MY]
difficulty: 3
surface: [word, excel]
licence: [m365-copilot]
inputs:
  - { name: "Requirement memo (Nota Dinas) from the user department", format: ".docx", where: "Procurement request folder", count: "1", kit: ["01_Nota_Dinas_Kebutuhan_EAM.docx"], steps: [2] }
  - { name: "Procurement rules and cloud standard (excerpt)", format: ".docx", where: "Procurement library", count: "1", kit: ["02_Pedoman_Pengadaan_dan_Standar_Cloud_kutipan.docx"], steps: [2, 3] }
  - { name: "KAK template", format: ".docx", where: "Procurement library", count: "1", kit: ["03_Template_KAK.docx"], steps: [2] }
  - { name: "Issued KAK and Addendum 1", format: ".docx", where: "Tender folder", count: "2", kit: ["04_KAK_EAM_Grup_final.docx", "05_Adendum_1_KAK.docx"], steps: [3] }
  - { name: "Vendor proposals: technical and administrative parts", format: ".docx or text-based .pdf", where: "Tender folder", count: "4", kit: ["06A_Penawaran_Vendor_A.docx", "06B_Penawaran_Vendor_B.docx", "06C_Penawaran_Vendor_C.docx", "06D_Penawaran_Vendor_D.docx"], steps: [3] }
  - { name: "Vendor price schedules (Daftar Kuantitas dan Harga)", format: ".xlsx", where: "Tender folder", count: "4", kit: ["07A_Daftar_Harga_Vendor_A.xlsx", "07B_Daftar_Harga_Vendor_B.xlsx", "07C_Daftar_Harga_Vendor_C.xlsx", "07D_Daftar_Harga_Vendor_D.xlsx"], steps: [4] }
  - { name: "Committee workbook: rules, confidential HPS, technical scores", format: ".xlsx", where: "Committee's restricted folder", count: "1", kit: ["08_Lembar_Evaluasi_Tim.xlsx"], steps: [4] }
objective: "Write a KAK the committee can issue without rework, then give the evaluation committee a checked, like-for-like comparison of every bid and a formula-driven ranking, in about 50 minutes instead of three days."
run_time: "Part A about 15 min, Part B about 35 min"
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Procurement committee (Tim Evaluasi); the authorised official decides the award" }
impact: { baseline: "2 to 3 days for the KAK and the evaluation", target: "Half a day, most of it the committee's review", evidence: estimated }
card:
  problem: "The user's memo names a favourite vendor, leaks the owner's estimate and allows offshore hosting. Four bids arrive with prices with and without VAT, one in dollars, one with a sum error, one with a yearly increase buried in the notes, and two tempting offers that break the rules."
  output: "A vendor-neutral KAK in your template with every conflict flagged, a pass/fail table for all four bids with quoted evidence, and an evaluation workbook with corrected prices, 11% effective VAT, the dollar conversion and a formula-driven ranking."
limits:
  - "The committee decides, not Copilot. Copilot prepares the evidence and the calculation; the committee and the authorised official make every decision."
  - "Copilot compares what is written. It cannot verify a TKDN certificate, a vendor's legal standing or whether an attachment exists in the physical bid package."
  - "Check that every file is attached. In one of our runs Excel attached three of four price schedules and said so only in its answer. Count the file chips before sending."
  - "The owner's estimate (HPS) is confidential. Keep the committee workbook in the committee's restricted folder."
source_refs:
  - "https://support.microsoft.com/en-us/word/welcome-to-copilot-in-word"
  - "https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-09-30
validation_note: "Run end to end in a demo tenant with the kit. Word drafted the KAK in all 16 sections without the brand or the HPS, with DC and DRC in Indonesia, the user count flagged (400 vs 460) and a second inconsistency we had not planted (20 vs 16 subsidiaries). Word's bid check matched the key: A and C pass, B fails (60-day validity, TKDN for another product), D fails (no Addendum statement, no TKDN, 400 users, DRC Singapore). Excel built live formulas that corrected C's sum (+Rp63 million), applied A's 7% yearly increase, converted D's USD and ranked C 85.59 ahead of A 84.60. Found: Excel once attached only three of four schedules; one run overrode the committee's administrative result, so the workbook now carries it pre-filled."
---

## Situation

**The request.** Tuesday 1 September 2026. You are a procurement officer at PT Fabrikam Nusantara (Persero), a state-owned logistics holding with 20 subsidiaries. Group Asset Management wants one maintenance system for 18,400 assets at 63 sites, as a 3-year cloud subscription. Their memo is enthusiastic and messy.

**What is wrong with the memo.** It says "about 400 users" but its own table adds up to 460. It names the product they saw in a demo. It says hosting in Singapore is fine, which the group's cloud standard forbids. And it quotes the owner's estimate (HPS), which must never appear in a KAK.

**What happens next.** The KAK goes out, the aanwijzing raises the user count to 500 and makes an Indonesian disaster-recovery site mandatory, and four bids arrive on 21 September. Each looks reasonable on its own. Side by side they are not comparable: prices with and without VAT, one in US dollars, a sum error, a 7% yearly increase in the notes, and the two cheapest offers both break a rule.

**What you must deliver.** A KAK the committee can issue, then a pass/fail check and a price comparison the committee can defend, without picking the winner yourself.

## Steps

**1. Get the kit ready.** Put the files in OneDrive and open each once.

1. Download the kit and upload all files to one OneDrive folder.
2. Open each file once in Word or Excel for the web.
3. Keep a clean copy of the KAK template and of the committee workbook for each run.

**Part A: draft the KAK (about 15 minutes).** Do this when a user department sends you a request.

**2. Draft the KAK in the template.** Open *03_Template_KAK.docx* in Word for the web and select **Copilot**.

1. Add a sensitivity label if your organisation asks for one.
2. Select **Add and manage sources** > **Upload images and files**.
3. Attach *01_Nota_Dinas_Kebutuhan_EAM* and *02_Pedoman_Pengadaan*. You should see two file chips.
4. Run:

:::prompt
ABOUT: Drafts a vendor-neutral KAK in your template, applies the procurement rules and flags what the user must confirm.
EN: Draft the Kerangka Acuan Kerja (KAK) for the Group EAM system in this template, in Bahasa Indonesia, from the attached Nota Dinas of the user department and the attached Pedoman Pengadaan and cloud standard.
Fill every section of the template in its order. Use only facts from the two attached documents.
Follow the Pedoman where it is stricter than the Nota Dinas, and note each such change in a short list at the end headed "Catatan untuk Pengguna".
The KAK must be vendor-neutral: do not name any product, brand or vendor, even if the Nota Dinas does.
Do not state the HPS or any budget amount; state only the source of funds.
Write the functional requirements as a table with a column M (mandatory) or D (diutamakan).
If the Nota Dinas gives two different figures for the same thing, do not choose: write [PERLU KONFIRMASI] with both figures.
Take the evaluation method, bid validity, TKDN rule, price comparison rules and hosting requirements from the Pedoman and the cloud standard.
ID: Susun Kerangka Acuan Kerja (KAK) untuk sistem EAM Grup di templat ini, dalam Bahasa Indonesia, dari Nota Dinas unit pengguna terlampir serta Pedoman Pengadaan dan standar cloud terlampir.
Isi setiap bagian templat sesuai urutannya. Gunakan hanya fakta dari dua dokumen terlampir.
Ikuti Pedoman jika lebih ketat dari Nota Dinas, dan catat setiap perubahan tersebut dalam daftar singkat di akhir berjudul "Catatan untuk Pengguna".
KAK harus netral: jangan menyebut produk, merek atau penyedia apa pun, meskipun Nota Dinas menyebutnya.
Jangan mencantumkan HPS atau nilai anggaran; cukup sebutkan sumber dana.
Tulis kebutuhan fungsional dalam tabel dengan kolom M (wajib) atau D (diutamakan).
Jika Nota Dinas memberi dua angka berbeda untuk hal yang sama, jangan memilih: tulis [PERLU KONFIRMASI] dengan kedua angka.
Ambil metode evaluasi, masa berlaku penawaran, ketentuan TKDN, aturan perbandingan harga dan persyaratan hosting dari Pedoman dan standar cloud.
BM: Sediakan Kerangka Acuan Kerja (KAK) untuk sistem EAM Kumpulan dalam templat ini, dalam Bahasa Indonesia, daripada memo jabatan pengguna yang dilampirkan serta Pedoman Pengadaan dan standard awan yang dilampirkan.
Isi setiap bahagian templat mengikut susunannya. Gunakan fakta daripada dua dokumen yang dilampirkan sahaja.
Ikut Pedoman apabila ia lebih ketat daripada memo, dan catat setiap perubahan itu dalam senarai ringkas di hujung bertajuk "Catatan untuk Pengguna".
KAK mesti neutral: jangan namakan sebarang produk, jenama atau vendor, walaupun memo menamakannya.
Jangan nyatakan HPS atau sebarang amaun bajet; nyatakan sumber dana sahaja.
Tulis keperluan fungsian dalam jadual dengan lajur M (wajib) atau D (diutamakan).
Jika memo memberi dua angka berbeza bagi perkara yang sama, jangan pilih: tulis [PERLU KONFIRMASI] dengan kedua-dua angka.
Ambil kaedah penilaian, tempoh sah tawaran, peraturan TKDN, peraturan perbandingan harga dan keperluan hosting daripada Pedoman dan standard awan.
:::

**After you run it:** no brand name and no HPS amount anywhere, DC and DRC required in Indonesia, and "400 or 460 users" marked [PERLU KONFIRMASI]. The last list tells the user what changed and why.

**Part B: evaluate the bids (about 35 minutes).** Do this after the closing date, with the issued KAK and Addendum 1.

**3. Check the bids against the KAK.** Open *04_KAK_EAM_Grup_final.docx* in Word for the web and select **Copilot**.

1. Select **Add and manage sources** > **Upload images and files**.
2. Attach *05_Adendum_1_KAK*, *02_Pedoman_Pengadaan* and the four proposals *06A* to *06D*. You should see six file chips.
3. Run:

:::prompt
ABOUT: Checks every bid for the administrative and mandatory technical rules, quoting each proposal, without ranking.
EN: Do not edit the document; answer here in chat. This document is the issued KAK. Using it, the attached Adendum 1 and the Pedoman Pengadaan, check the four attached proposals (Vendor A, B, C, D) for the evaluation committee.
(1) Administrative check, pass/fail per vendor: bid validity against the minimum from the closing date, a statement accepting Adendum 1, and a valid TKDN certificate for the product actually offered with TKDN+BMP of at least 40%. Quote the proposal's own words for each.
(2) Technical mandatory requirements after Adendum 1: number of named users, DC and DRC location, and the project manager's experience against the KAK minimum.
(3) List anything that needs clarification, such as conditional prices, work excluded from the total or prices not in rupiah.
Give one table: Vendor | Validity | Adendum 1 | TKDN | Users | DC/DRC | PM | Result (Lulus / Gugur, with the rule) | Clarification.
Do not rank the vendors or recommend a winner; the committee decides.
ID: Jangan mengubah dokumen; jawab di chat. Dokumen ini adalah KAK yang telah diterbitkan. Berdasarkan dokumen ini, Adendum 1 dan Pedoman Pengadaan terlampir, periksa empat penawaran terlampir (Vendor A, B, C, D) untuk Tim Evaluasi.
(1) Pemeriksaan administrasi, lulus/gugur per vendor: masa berlaku penawaran terhadap batas minimum sejak batas akhir pemasukan, pernyataan menerima Adendum 1, dan sertifikat TKDN yang berlaku untuk produk yang benar-benar ditawarkan dengan TKDN+BMP minimal 40%. Kutip kalimat penawaran itu sendiri untuk setiap butir.
(2) Persyaratan teknis wajib setelah Adendum 1: jumlah named user, lokasi DC dan DRC, dan pengalaman manajer proyek terhadap batas minimum KAK.
(3) Daftarkan hal yang perlu diklarifikasi, seperti harga bersyarat, pekerjaan di luar total harga atau harga yang tidak dalam rupiah.
Berikan satu tabel: Vendor | Masa berlaku | Adendum 1 | TKDN | User | DC/DRC | PM | Hasil (Lulus / Gugur, dengan aturannya) | Klarifikasi.
Jangan memberi peringkat atau merekomendasikan pemenang; Tim Evaluasi yang memutuskan.
BM: Jangan ubah dokumen; jawab di sini dalam chat. Dokumen ini ialah KAK yang telah dikeluarkan. Berdasarkan dokumen ini, Adendum 1 dan Pedoman Pengadaan yang dilampirkan, semak empat tawaran yang dilampirkan (Vendor A, B, C, D) untuk jawatankuasa penilaian.
(1) Semakan pentadbiran, lulus/gagal bagi setiap vendor: tempoh sah tawaran berbanding minimum dari tarikh tutup, kenyataan menerima Adendum 1, dan sijil TKDN yang sah bagi produk yang sebenarnya ditawarkan dengan TKDN+BMP sekurang-kurangnya 40%. Petik ayat tawaran itu sendiri bagi setiap perkara.
(2) Keperluan teknikal wajib selepas Adendum 1: bilangan named user, lokasi DC dan DRC, dan pengalaman pengurus projek berbanding minimum KAK.
(3) Senaraikan perkara yang perlu penjelasan, seperti harga bersyarat, kerja yang dikecualikan daripada jumlah atau harga yang bukan dalam rupiah.
Berikan satu jadual: Vendor | Tempoh sah | Adendum 1 | TKDN | Pengguna | DC/DRC | PM | Keputusan (Lulus / Gugur, dengan peraturannya) | Penjelasan.
Jangan beri kedudukan atau cadangkan pemenang; jawatankuasa yang memutuskan.
:::

**After you run it:** A and C pass; B fails on the 60-day validity and the certificate for a different product; D fails on the missing Addendum statement, no TKDN certificate, 400 users and a DRC in Singapore.

**4. Correct, compare and score the prices.** Open *08_Lembar_Evaluasi_Tim.xlsx* in Excel for the web and select **Copilot**. Check the mode says **Allow editing**.

1. Select **Add content** > **Upload images and files** and attach the four price schedules *07A* to *07D*, one at a time.
2. Count four file chips before you send anything.
3. Run:

:::prompt
ABOUT: Builds the price evaluation with live formulas: sum correction, one VAT basis, dollar conversion, scores and rank.
EN: Fill the sheets Evaluasi Harga, Rekap and Checks in this workbook from the four attached price schedules (Vendor A, B, C, D), following the Aturan sheet exactly.
Copy every price line of the four schedules into one sheet called Rincian Harga (vendor code, item, volume, currency, unit price, the vendor's typed total), and work only with formulas that refer to Rincian Harga, Skor Teknis and Aturan.
Arithmetic correction: recompute every line as volume x unit price; the unit price governs. Show the vendor's typed total, the corrected total and the difference.
Put every price on the same basis: DPP excluding PPN for the full 3 years, then add PPN at the effective rate in Aturan. If a vendor included PPN, remove it first; if a vendor applied PPN wrongly, recompute it. Convert any USD amount at the JISDOR rate in Aturan. Include every year of the subscription, including any yearly increase.
In Evaluasi Harga give: Kode, Peserta, Total ditawarkan, Basis PPN dalam penawaran, DPP terkoreksi, Total termasuk PPN, % terhadap HPS, Catatan (above HPS, below 80% of HPS, not for 500 users, anything excluded from the price).
In Rekap, keep the Administrasi column exactly as the committee filled it. Only for vendors marked Lulus that also reach the passing grade, calculate the technical score as the average of the three evaluators in Skor Teknis, the price score and the final score with the weights in Aturan, and the rank by final score (1 = highest) with a RANK formula. Leave the others blank and keep the reason in Catatan.
In Checks, set each status to OK or Open with a short explanation.
The rank is input for the committee: do not name a winner or recommend an award.
ID: Isi sheet Evaluasi Harga, Rekap dan Checks di workbook ini dari empat daftar harga terlampir (Vendor A, B, C, D), dengan mengikuti sheet Aturan secara persis.
Salin setiap baris harga dari keempat daftar ke satu sheet bernama Rincian Harga (kode vendor, uraian, volume, mata uang, harga satuan, jumlah yang diketik vendor), dan gunakan hanya rumus yang merujuk ke Rincian Harga, Skor Teknis dan Aturan.
Koreksi aritmatik: hitung ulang setiap baris sebagai volume x harga satuan; harga satuan yang menentukan. Tampilkan jumlah yang diketik vendor, jumlah terkoreksi dan selisihnya.
Samakan basis semua harga: DPP tanpa PPN untuk 3 tahun penuh, lalu tambahkan PPN dengan tarif efektif di Aturan. Jika vendor sudah memasukkan PPN, keluarkan dulu; jika vendor salah menghitung PPN, hitung ulang. Konversikan setiap nilai USD dengan kurs JISDOR di Aturan. Masukkan setiap tahun langganan, termasuk kenaikan tahunan.
Di Evaluasi Harga cantumkan: Kode, Peserta, Total ditawarkan, Basis PPN dalam penawaran, DPP terkoreksi, Total termasuk PPN, % terhadap HPS, Catatan (di atas HPS, di bawah 80% HPS, bukan untuk 500 user, apa pun yang tidak termasuk dalam harga).
Di Rekap, pertahankan kolom Administrasi persis seperti diisi Tim Evaluasi. Hanya untuk vendor yang Lulus dan mencapai ambang teknis, hitung skor teknis sebagai rata-rata tiga evaluator di Skor Teknis, skor harga dan nilai akhir dengan bobot di Aturan, serta peringkat berdasarkan nilai akhir (1 = tertinggi) dengan rumus RANK. Kosongkan yang lain dan pertahankan alasannya di Catatan.
Di Checks, isi setiap status dengan OK atau Open beserta penjelasan singkat.
Peringkat adalah masukan bagi Tim Evaluasi: jangan menyebut pemenang atau merekomendasikan penetapan.
BM: Isi helaian Evaluasi Harga, Rekap dan Checks dalam buku kerja ini daripada empat jadual harga yang dilampirkan (Vendor A, B, C, D), dengan mengikut helaian Aturan dengan tepat.
Salin setiap baris harga daripada keempat-empat jadual ke satu helaian bernama Rincian Harga (kod vendor, item, kuantiti, mata wang, harga seunit, jumlah yang ditaip vendor), dan gunakan hanya formula yang merujuk Rincian Harga, Skor Teknis dan Aturan.
Pembetulan aritmetik: kira semula setiap baris sebagai kuantiti x harga seunit; harga seunit yang menentukan. Tunjukkan jumlah yang ditaip vendor, jumlah yang dibetulkan dan perbezaannya.
Letakkan semua harga pada asas yang sama: DPP tanpa PPN untuk 3 tahun penuh, kemudian tambah PPN pada kadar efektif dalam Aturan. Jika vendor sudah memasukkan PPN, keluarkan dahulu; jika vendor tersalah mengira PPN, kira semula. Tukar sebarang amaun USD pada kadar JISDOR dalam Aturan. Masukkan setiap tahun langganan, termasuk kenaikan tahunan.
Dalam Evaluasi Harga berikan: Kode, Peserta, Total ditawarkan, Basis PPN dalam penawaran, DPP terkoreksi, Total termasuk PPN, % terhadap HPS, Catatan (melebihi HPS, di bawah 80% HPS, bukan untuk 500 pengguna, apa-apa yang dikecualikan daripada harga).
Dalam Rekap, kekalkan lajur Administrasi tepat seperti yang diisi jawatankuasa. Hanya bagi vendor Lulus yang juga mencapai markah lulus, kira markah teknikal sebagai purata tiga penilai dalam Skor Teknis, markah harga dan markah akhir dengan wajaran dalam Aturan, dan kedudukan mengikut markah akhir (1 = tertinggi) dengan formula RANK. Biarkan yang lain kosong dan kekalkan sebabnya dalam Catatan.
Dalam Checks, tetapkan setiap status sebagai OK atau Open dengan penerangan ringkas.
Kedudukan ialah input untuk jawatankuasa: jangan namakan pemenang atau cadangkan anugerah.
:::

**After you run it:** click any total: it is a formula. C's training line shows **+Rp63,000,000**; C ranks 1 (85.59) and A ranks 2 (84.60); B and D have no score. This takes about three minutes.

## Check it

- **KAK (Part A):** no **Adatum** or other brand; no **HPS** amount; **DC and DRC in Indonesia**; users **400 vs 460** as [PERLU KONFIRMASI]; **TKDN+BMP 40%**, **70/30** with passing grade **70**, **90-day** validity. Copilot may also flag **20 vs 16 subsidiaries**; that is correct.
- **Tempting but out:** **B** looks cheapest (Rp12.77 bn "incl. 12% VAT") but fails on **60-day validity** and a TKDN certificate for **Relecloud HRIS**, not the offered product.
- **Too cheap to compare:** **D** is **68.9% of HPS** but offers **400 users**, a **Singapore DRC**, no TKDN certificate, no Addendum statement, and SAP integration "priced separately".
- **Sum error:** **C** typed training as Rp307 m; 20 x Rp18.5 m = **Rp370 m**. Corrected DPP **Rp12,905,000,000**.
- **Hidden increase:** **A** raises the subscription **7% a year**. The 3-year DPP is **Rp12,877,680,000**, not 3 x year 1.
- **One VAT basis:** totals including 11% effective VAT: **A Rp14,294,224,800**, **C Rp14,324,550,000**, B Rp12,654,000,000, D Rp10,100,200,800. HPS including VAT **Rp14,652,000,000**.
- **Dollars:** D's USD 456,000 at JISDOR **16,380** = **Rp7,469,280,000**.
- **Ranking:** **C 85.59** first, **A 84.60** second. If A's increase is ignored the order flips, which is why the check matters.
- **No winner named:** the committee ranks; the authorised official awards.

## When it goes wrong

- **Copilot names the vendor from the memo.** Keep "do not name any product, brand or vendor, even if the Nota Dinas does". (step 2)
- **The KAK repeats the HPS from the memo.** Keep "Do not state the HPS or any budget amount". (step 2)
- **A bid fails because the Addendum statement "is not evidenced".** Copilot reads strictly: a sentence saying "we have read Addendum 1" is not a signed acceptance. That is correct; ask the committee whether the statement is in the bid package. (step 3)
- **Excel says a vendor's price file was not provided.** Only three schedules were attached. Attach them one at a time and count four chips before sending. (step 4)
- **Excel changes a vendor's administrative result.** Keep "keep the Administrasi column exactly as the committee filled it"; the committee's result is already in the workbook. (step 4)
- **No rank appears.** "Do not choose a winner" was read as "do not rank". Keep the sentence "The rank is input for the committee". (step 4)
- **The Checks block is missing.** Use the Checks sheet in the kit workbook; Copilot fills an existing sheet more reliably than it creates one. (step 4)

## Take it further

- **Now with your own tender.** Put your procurement rules in a short excerpt document and your evaluation parameters (VAT, rate, weights, passing grade, HPS) in an Aturan sheet; the prompts stay the same.
- **Minutes for the committee.** In Word, ask Copilot to turn the step 3 table and the Rekap sheet into a Berita Acara Evaluasi draft for the committee to sign.
- **Clarification letters.** Ask Copilot in Word to draft a clarification request to each passing vendor from the Clarification column, one letter per vendor.
- **Malaysia.** Replace the PPN and TKDN rules in the Aturan sheet with SST and your local-content and Bumiputera rules; the structure of the evaluation is the same.

:::presenter
**Session length:** 45 minutes. **Setup:** kit in the presenter's OneDrive, each file opened once, clean copies of the KAK template and the committee workbook.

1. Set the scene: the user's memo. Read the three sentences that must not reach the KAK (the brand, the HPS, Singapore). (4 min)
2. Step 2 live. Show that the KAK names no brand and flags 400 vs 460 users. (8 min)
3. Step 3: the pass/fail table. Point at B (cheapest, but a 60-day validity and the wrong certificate) and D (400 users, Singapore). (10 min)
4. Step 4 in Excel. While it runs (about three minutes), open vendor A's price schedule and find the 7% increase in the notes. Then click C's training line in Rincian Harga: the formula corrects the sum. (15 min)
5. Show the rank and the flip if the increase is ignored. Close: the committee decides; Copilot made every number checkable. (8 min)
:::
