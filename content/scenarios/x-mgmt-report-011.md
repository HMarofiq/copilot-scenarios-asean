---
id: x-mgmt-report-011
title: { en: "Month-end close: consolidate two entities and write the Direksi commentary", id: "Tutup buku bulanan: konsolidasi dua entitas dan tulis komentar untuk Direksi", ms: "Tutup akaun bulanan: satukan dua entiti dan tulis ulasan untuk Lembaga" }
summary:
  en: "Turn two trial balances (IDR and MYR) into the group management P&L with Copilot in Excel, check it, then draft the one-page Direksi commentary in Word from budget holder notes, with every open item flagged instead of guessed."
  id: "Ubah dua neraca saldo (IDR dan MYR) menjadi laporan laba rugi manajemen grup dengan Copilot di Excel, periksa hasilnya, lalu susun komentar satu halaman untuk Direksi di Word dari catatan pemilik anggaran, dengan setiap hal terbuka ditandai, bukan ditebak."
  ms: "Tukar dua imbangan duga (IDR dan MYR) kepada penyata untung rugi pengurusan kumpulan dengan Copilot dalam Excel, semak hasilnya, kemudian sediakan ulasan satu halaman untuk Lembaga dalam Word daripada nota pemegang bajet, dengan setiap perkara terbuka ditandakan, bukan diteka."
industry: [cross-industry]
department: [finance]
persona: [finance-controller]
market: [ID, MY]
difficulty: 2
surface: [excel, word]
licence: [m365-copilot]
inputs:
  - { name: "Trial balances, one per entity (full currency, credits negative)", format: ".xlsx export from the ERP", where: "Finance close folder", count: "2" }
  - { name: "Group close pack: reporting policy, account mapping, FX rates, budget, last year, intercompany schedule, post-closing journals", format: ".xlsx", where: "Group reporting library", count: "1" }
  - { name: "Consolidated management P&L (if your consolidation system already produces it)", format: ".xlsx", where: "Group reporting library", count: "1" }
  - { name: "Budget holder notes, the CFO's request and last month's commentary", format: ".docx", where: "Close folder or email", count: "3" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "CFO before the pack is circulated" }
impact: { baseline: "2 to 3 days of FP&A time each month-end", target: "Half a day, most of it reviewing", evidence: estimated }
card:
  problem: "Every month-end, FP&A re-keys two trial balances into the group P&L, then writes the Direksi commentary line by line. Late journals, a stale owner note and an intercompany difference slip through."
  output: "A formula-driven consolidation with a Checks sheet, a variance table that labels costs correctly, and a one-page Direksi commentary with owners named and every gap listed as an open item."
limits:
  - "Copilot follows your rules. Put the materiality rule, sign convention and translation rate in the prompt or in a Policy sheet; without them it chooses its own."
  - "Excel's edit mode finds OneDrive files by name, but a file uploaded minutes ago may not be found yet. Attach the trial balances with Add work content > Upload images and files, which always works."
  - "Copilot only explains what the notes explain. It can tell you what part of a variance is still unexplained; the owner has to fill the gap."
  - "Copilot in Excel works with Automatic calculation only. Files that must be checked out in SharePoint need Excel for the web."
  - "Trial balances are confidential. Work only in your organisation's Microsoft 365 tenant, never in consumer AI tools."
source_refs:
  - "https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel"
  - "https://support.microsoft.com/en-us/excel/copilot/frequently-asked-questions-about-copilot-in-excel"
  - "https://support.microsoft.com/en-us/excel/copilot/copilot-in-excel-skills"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-09-29
validation_note: "Run end to end in a demo tenant with the kit: Excel built the variance sheet with live formulas (7 material lines, cost labels right, intercompany IDR 139.2 m flagged Open); Excel consolidated both trial balances to the system output on every line (profit before tax IDR 384,762 m), applied the three post-closing journals, mapped the new account 6995 provisionally and found the missing September intercompany booking; Word wrote the Direksi commentary with the ringgit effect (IDR 18.3 bn), owners named, unexplained amounts and the stale HR figure in open items. Found: Excel's name search missed a file uploaded minutes earlier; attaching it worked."
---

## Situation

**The deadline.** After September close, the CFO needs the Direksi's year-to-date commentary by Wednesday 12.00.

**The inputs.** Indonesian and Malaysian trial balances, the close pack and budget-holder notes. Three late journals change the figures; some notes are stale and Legal's is missing.

**The risks.** Last month's draft reversed cost variances and missed an intercompany gap. Check the Excel calculations before drafting the Word commentary.

## Steps

**1. Get the kit ready.** Download the kit and upload the files to one OneDrive folder. Open each file once in Excel or Word for the web, and add a sensitivity label if your organisation asks for one. Copilot edits only files that are open for editing.

**Part A: variance and commentary (about 20 minutes).** Start here if your consolidation system already gives you the group P&L.

**2. Build the variance sheet in Excel.** Open *05_Group_Management_PL_Sep2026.xlsx*, select **Copilot**, and check the mode says **Allow editing**. Then run:

:::prompt
EN: Add a sheet called Variance that analyses the Consolidated sheet against budget. Keep every line in the same order, including the Gross profit and Profit before tax subtotals. Use formulas that refer to the Consolidated sheet, not typed values. Columns: Management line, Type, Actual, Budget, Variance (IDR m) where a positive number is favourable to profit (for Income lines and subtotals: actual minus budget; for Cost lines: budget minus actual), % of budget (blank when the budget is zero), F or U, and Material. Material is Yes for Revenue and Gross profit always; for other lines, Yes only if the absolute variance is at least 2,500 AND at least 5% of budget, or at least 2,500 when the budget is zero. Highlight the material rows and list them below the table. Then add a Checks section with a status of OK or Open: the Intercompany management fee must be zero in the group actual (if not, show the amount and say it is an open item for consolidation, not income); Gross profit equals Revenue minus Cost of sales; Profit before tax equals Gross profit minus cost lines plus income lines.
ID: Tambahkan sheet bernama Variance yang menganalisis sheet Consolidated terhadap budget. Pertahankan urutan semua baris, termasuk subtotal Gross profit dan Profit before tax. Gunakan rumus yang merujuk ke sheet Consolidated, bukan angka yang diketik. Kolom: Management line, Type, Actual, Budget, Variance (IDR m) di mana angka positif berarti menguntungkan laba (untuk baris Income dan subtotal: actual dikurangi budget; untuk baris Cost: budget dikurangi actual), % of budget (kosong jika budget nol), F atau U, dan Material. Material bernilai Yes untuk Revenue dan Gross profit selalu; untuk baris lain, Yes hanya jika nilai absolut variance minimal 2.500 DAN minimal 5% dari budget, atau minimal 2.500 jika budget nol. Sorot baris material dan daftarkan di bawah tabel. Lalu tambahkan bagian Checks dengan status OK atau Open: Intercompany management fee harus nol di group actual (jika tidak, tampilkan jumlahnya dan nyatakan sebagai hal terbuka konsolidasi, bukan pendapatan); Gross profit sama dengan Revenue dikurangi Cost of sales; Profit before tax sama dengan Gross profit dikurangi baris biaya ditambah baris pendapatan.
BM: Tambah helaian bernama Variance yang menganalisis helaian Consolidated berbanding bajet. Kekalkan susunan semua baris, termasuk subjumlah Gross profit dan Profit before tax. Gunakan formula yang merujuk helaian Consolidated, bukan nilai yang ditaip. Lajur: Management line, Type, Actual, Budget, Variance (IDR m) di mana nombor positif bermaksud menguntungkan keuntungan (bagi baris Income dan subjumlah: actual tolak budget; bagi baris Cost: budget tolak actual), % of budget (kosong jika bajet sifar), F atau U, dan Material. Material ialah Yes bagi Revenue dan Gross profit sentiasa; bagi baris lain, Yes hanya jika nilai mutlak varians sekurang-kurangnya 2,500 DAN sekurang-kurangnya 5% daripada bajet, atau sekurang-kurangnya 2,500 jika bajet sifar. Serlahkan baris material dan senaraikan di bawah jadual. Kemudian tambah bahagian Checks dengan status OK atau Open: Intercompany management fee mesti sifar dalam group actual (jika tidak, tunjukkan jumlahnya dan nyatakan sebagai perkara terbuka penyatuan, bukan pendapatan); Gross profit sama dengan Revenue tolak Cost of sales; Profit before tax sama dengan Gross profit tolak baris kos tambah baris pendapatan.
:::

Select a cell in the Variance sheet and look at the formula bar: every number should be a formula, not a typed value.

**3. Draft the commentary in Word.** Create a Word document for the commentary, open **Copilot**, and use **Add work content** > **Upload images and files** (or **Attach cloud files**) to attach *05_Group_Management_PL*, *06_Budget_holder_notes*, *01_Email_CFO* and *07_Direksi_pack_Aug2026_commentary*. Count the four file chips, then run:

:::prompt
EN: Write the September 2026 YTD group management commentary for the Direksi in this document, below the title. Follow the CFO's email and use the same structure and style as the August commentary: a three-sentence headline; a table of the material variances only (line, actual, budget, variance, % of budget, F or U, in IDR billion with one decimal); one bullet of commentary per material line; and a list of open items. Take the numbers from the group management P&L, which already includes the post-closing journals, and apply the materiality rule in the email: always Revenue and Gross profit, other lines only if the variance is at least IDR 2,500 million and at least 5% of budget, or at least IDR 2,500 million when there is no budget. Favourable means better for profit. Explain each line only from the budget holder notes and name the owner. If a note is missing or explains only part of a variance, write [Owner to explain] with the amount still unexplained. Explain Gross profit and Profit before tax from the lines that drive them, not from a note. If a note explains a line but quotes a different figure or account than the P&L, keep the explanation, use the P&L figure and list the difference under open items; a note written for another line can explain the line where the P&L now shows the cost. For Malaysia, say how much of the revenue variance comes from the stronger ringgit (average rate 3,520 against budget rate 3,450). The intercompany management fee should be zero; any difference is an open item, not income. Do not comment on lines that are not material, even if a note exists.
ID: Tulis komentar manajemen grup September 2026 YTD untuk Direksi di dokumen ini, di bawah judul. Ikuti email CFO dan gunakan struktur serta gaya yang sama dengan komentar Agustus: headline tiga kalimat; tabel varians material saja (pos, aktual, budget, varians, % dari budget, F atau U, dalam miliar rupiah dengan satu desimal); satu poin komentar per pos material; dan daftar hal terbuka. Ambil angka dari laporan laba rugi manajemen grup, yang sudah mencakup jurnal setelah tutup buku, dan terapkan aturan materialitas di email: selalu Revenue dan Gross profit, pos lain hanya jika varians minimal IDR 2.500 juta dan minimal 5% dari budget, atau minimal IDR 2.500 juta jika tidak ada budget. Menguntungkan berarti lebih baik bagi laba. Jelaskan setiap pos hanya dari catatan pemilik anggaran dan sebutkan pemiliknya. Jika catatan tidak ada atau hanya menjelaskan sebagian varians, tulis [Owner to explain] beserta jumlah yang belum terjelaskan. Jelaskan Gross profit dan Profit before tax dari pos-pos penggeraknya, bukan dari catatan. Jika catatan menjelaskan suatu pos tetapi menyebut angka atau akun yang berbeda dari laporan laba rugi, pertahankan penjelasannya, gunakan angka laporan laba rugi, dan cantumkan perbedaannya di hal terbuka; catatan yang ditulis untuk pos lain dapat menjelaskan pos tempat biaya itu sekarang tercatat. Untuk Malaysia, sebutkan berapa bagian varians pendapatan yang berasal dari ringgit yang lebih kuat (kurs rata-rata 3.520 dibanding kurs budget 3.450). Intercompany management fee seharusnya nol; selisihnya adalah hal terbuka, bukan pendapatan. Jangan mengomentari pos yang tidak material, meskipun ada catatannya.
BM: Tulis ulasan pengurusan kumpulan September 2026 YTD untuk Lembaga dalam dokumen ini, di bawah tajuk. Ikut e-mel CFO dan gunakan struktur serta gaya yang sama dengan ulasan Ogos: tajuk utama tiga ayat; jadual varians material sahaja (baris, sebenar, bajet, varians, % daripada bajet, F atau U, dalam bilion rupiah dengan satu perpuluhan); satu poin ulasan bagi setiap baris material; dan senarai perkara terbuka. Ambil angka daripada penyata untung rugi pengurusan kumpulan, yang sudah merangkumi jurnal selepas tutup akaun, dan gunakan peraturan kematerialan dalam e-mel: sentiasa Revenue dan Gross profit, baris lain hanya jika varians sekurang-kurangnya IDR 2,500 juta dan sekurang-kurangnya 5% daripada bajet, atau sekurang-kurangnya IDR 2,500 juta jika tiada bajet. Menguntungkan bermaksud lebih baik untuk keuntungan. Terangkan setiap baris hanya daripada nota pemegang bajet dan namakan pemiliknya. Jika nota tiada atau hanya menerangkan sebahagian varians, tulis [Owner to explain] berserta jumlah yang belum diterangkan. Terangkan Gross profit dan Profit before tax daripada baris yang memacunya, bukan daripada nota. Jika nota menerangkan sesuatu baris tetapi menyebut angka atau akaun yang berbeza daripada penyata untung rugi, kekalkan penerangannya, gunakan angka penyata untung rugi dan senaraikan perbezaannya dalam perkara terbuka; nota yang ditulis untuk baris lain boleh menerangkan baris tempat kos itu kini direkodkan. Bagi Malaysia, nyatakan berapa bahagian varians hasil yang datang daripada ringgit yang lebih kukuh (kadar purata 3,520 berbanding kadar bajet 3,450). Intercompany management fee sepatutnya sifar; sebarang perbezaan ialah perkara terbuka, bukan pendapatan. Jangan ulas baris yang tidak material, walaupun ada nota.
:::

**Part B: build the consolidation yourself (about 30 minutes).** Do this when you consolidate in Excel today, or to check what your system produced.

**4. Consolidate the two trial balances in Excel.** Open *04_Group_Close_Pack_Sep2026.xlsx*, select **Copilot**, then **Add work content** > **Upload images and files** and attach *02_TB_PT_Zava_Niaga_Nusantara* and *03_TB_Zava_Niaga_Malaysia*. For a first run, switch the mode to **Plan** to review the approach before it edits anything. Then run:

:::prompt
EN: Build the September 2026 YTD group management P&L in this workbook from the two attached trial balances (CN01 in full rupiah, CM01 in full ringgit), following the Policy sheet. Import each trial balance into its own sheet. Use only profit and loss accounts (account 4000 and above) and map them with the Mapping sheet. Show income and costs as positive amounts in IDR million; translate CM01 at the YTD average rate in FX rates. Apply every journal in Post-closing journals to CN01. Create a Consolidated sheet with the lines in the order of the Budget sheet and columns CN01, CM01, Group actual, Group budget and Last year, plus Gross profit and Profit before tax. Use formulas that refer to the imported sheets, not typed values. Then create a Checks sheet with a status of OK or Open for each check: each trial balance sums to zero; every P&L account is mapped (list any unmapped account, map it provisionally by its nature and mark it provisional); the intercompany line nets to zero, and if not, show the difference and the month missing in the Intercompany sheet; Group equals CN01 plus CM01 on every line. Do not adjust any difference; report it.
ID: Susun laporan laba rugi manajemen grup September 2026 YTD di workbook ini dari dua neraca saldo terlampir (CN01 dalam rupiah penuh, CM01 dalam ringgit penuh), mengikuti sheet Policy. Impor setiap neraca saldo ke sheet masing-masing. Gunakan hanya akun laba rugi (akun 4000 ke atas) dan petakan dengan sheet Mapping. Tampilkan pendapatan dan biaya sebagai angka positif dalam juta rupiah; translasikan CM01 dengan kurs rata-rata YTD di FX rates. Terapkan setiap jurnal di Post-closing journals ke CN01. Buat sheet Consolidated dengan urutan pos seperti sheet Budget dan kolom CN01, CM01, Group actual, Group budget dan Last year, ditambah Gross profit dan Profit before tax. Gunakan rumus yang merujuk ke sheet hasil impor, bukan angka yang diketik. Lalu buat sheet Checks dengan status OK atau Open untuk setiap pemeriksaan: setiap neraca saldo berjumlah nol; setiap akun laba rugi terpetakan (daftarkan akun yang belum terpetakan, petakan sementara sesuai sifatnya dan tandai provisional); pos intercompany bernilai nol, dan jika tidak, tampilkan selisih dan bulan yang hilang di sheet Intercompany; Group sama dengan CN01 ditambah CM01 di setiap pos. Jangan menyesuaikan selisih apa pun; laporkan saja.
BM: Bina penyata untung rugi pengurusan kumpulan September 2026 YTD dalam buku kerja ini daripada dua imbangan duga yang dilampirkan (CN01 dalam rupiah penuh, CM01 dalam ringgit penuh), mengikut helaian Policy. Import setiap imbangan duga ke helaian masing-masing. Gunakan akaun untung rugi sahaja (akaun 4000 dan ke atas) dan petakan dengan helaian Mapping. Tunjukkan pendapatan dan kos sebagai nilai positif dalam juta rupiah; tukar CM01 pada kadar purata YTD dalam FX rates. Gunakan setiap jurnal dalam Post-closing journals pada CN01. Cipta helaian Consolidated dengan baris mengikut susunan helaian Budget dan lajur CN01, CM01, Group actual, Group budget dan Last year, serta Gross profit dan Profit before tax. Gunakan formula yang merujuk helaian yang diimport, bukan nilai yang ditaip. Kemudian cipta helaian Checks dengan status OK atau Open bagi setiap semakan: setiap imbangan duga berjumlah sifar; setiap akaun untung rugi dipetakan (senaraikan akaun yang tidak dipetakan, petakan sementara mengikut sifatnya dan tandakan provisional); baris intercompany berjumlah sifar, dan jika tidak, tunjukkan perbezaan dan bulan yang tiada dalam helaian Intercompany; Group sama dengan CN01 tambah CM01 pada setiap baris. Jangan laraskan sebarang perbezaan; laporkan sahaja.
:::

Copilot may show a card asking which files it may use. Select only the trial balances and the close folder, not the finished group P&L, or it may copy the answer instead of building it.

**5. Compare with the system output.** Put your Consolidated sheet next to *05_Group_Management_PL_Sep2026.xlsx*. Every line should match to within 0.1 because of rounding: Group revenue IDR 7,402,240.0 m, gross profit IDR 1,138,003.2 m and profit before tax IDR 384,762.3 m. Then read the Checks sheet: two open items, and no other failures.

## Check it

- **Signs:** Cost of sales is below budget and must show F. Warehouse, IT and professional fees are over budget and must show U.
- **Materiality:** exactly seven lines are material: Revenue, Gross profit, Restructuring, Warehouse & logistics, IT & software, Marketing & promotion and Professional fees. Profit before tax is also flagged, which is correct. Staff costs, travel (11.5% over but only IDR 1.2 bn) and other income are not.
- **Late journals:** without the post-closing journals, Restructuring and IT & software would not be material. If Part B shows IT at IDR 55,890 m, a journal is missing.
- **Currency:** IDR 18.3 bn of the Malaysian revenue variance comes from the stronger ringgit (MYR 262.0 m × (3,520 − 3,450)). It is not volume.
- **Open items:** you should see:
  - the intercompany IDR 139.2 m, because CM01 has not booked the September fee
  - the Legal note, which is missing
  - the HR note, which says IDR 3.5 bn in salaries while the ledger shows IDR 3.2 bn in Restructuring
  - IDR 3.4 bn of warehouse cost still unexplained
- **Part B:** CM01 account 6995 (bank charges, FX conversion, IDR 49.3 m) is not in the mapping. It must appear on the Checks sheet and land in Finance costs, not disappear.
- **Formulas:** click into any Consolidated or Variance number. It should be a formula that points to the imported sheet or the Consolidated sheet.

## When it goes wrong

- **Excel says it cannot find a trial balance, or marks part of the work BLOCKED.** Its name search missed a file you uploaded recently. Attach the file with **Add work content** > **Upload images and files** and ask it to finish. In our run it resumed from where it stopped.
- **A card asks which files it may use and lists the finished group P&L.** Untick it. Otherwise Copilot can copy the answer instead of consolidating.
- **A cost underspend shows U.** The Type column was ignored. Keep the Income and Cost rule in the prompt, word for word.
- **The intercompany line shows F and nobody notices.** A variance label is not a check. Keep the Checks section in the prompt, so it shows Open.
- **The commentary asks someone to explain Gross profit or Profit before tax.** Those are subtotals. Keep the sentence "Explain Gross profit and Profit before tax from the lines that drive them".
- **A line is marked [Owner to explain] although a note explains it.** This happens when the note names a different account or amount, like the HR severance note. Keep the sentence about notes that quote a different figure or account.
- **The document runs to two pages.** Ask: "Shorten the commentary to one page; keep the table and the open items."

## Take it further

- **Make it monthly.** Save the Part B prompt as a Copilot in Excel custom skill, so next month you only type @monthly-close-consolidation. The kit includes a ready SKILL.md: in Copilot, open **...** > **Manage plugins & skills** > **Custom skills**, create the OneDrive skills folder and put the *monthly-close-consolidation* folder in it.
- **Add workbook rules.** Use **Add work content** > **Create workbook rules** to store the sign convention and materiality rule in the close pack, so every prompt in that workbook follows them.
- **Now with your own files.** Replace the kit with your own trial balance exports, your mapping and your policy. Keep the policy on its own sheet and change the numbers in the prompts to your rules. Run Part B next to your current process for one month before relying on it.
- **Bahasa Indonesia commentary.** Ask Word Copilot: "Create a Bahasa Indonesia version of this commentary for the Direksi, keeping the numbers and the table unchanged."

:::presenter
**Session length:** 40 minutes. **Setup:** kit uploaded to the presenter's OneDrive and each file opened once. A fresh copy of the close pack for Part B.

1. Set the scene: two trial balances, 99 accounts, two currencies, three late journals, notes of mixed quality. Ask the room how long this takes them today. (3 min)
2. Part A step 2 live in Excel. Click into a formula to show nothing is typed. Point at Cost of sales = F and the intercompany check = Open. (7 min)
3. Part A step 3 in Word. Read out the Malaysia sentence (the ringgit effect), the [Owner to explain] amounts and the stale HR note in open items. (10 min)
4. Part B in Excel with Plan mode first, then Allow editing. While it runs (5 to 10 minutes), show the Policy and Mapping sheets and the untick-the-answer card. (12 min)
5. Checks sheet: the unmapped account 6995 and the missing September intercompany month. Close with the custom skill for next month. (8 min)
:::
