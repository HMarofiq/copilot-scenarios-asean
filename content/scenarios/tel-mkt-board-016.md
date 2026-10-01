---
id: tel-mkt-board-016
title: { en: "Monthly campaign report for the board", id: "Laporan kampanye bulanan untuk Direksi", ms: "Laporan kempen bulanan untuk Lembaga" }
summary:
  en: "Turn raw ad-platform exports, a BI extract, the agency invoice and a subsidiary's update into a checked campaign scorecard in Excel, with the right spend basis, currency, traffic lights and CAGR, then build the board deck in PowerPoint with results, concerns and decisions."
  id: "Olah export platform iklan, BI extract, invoice agency dan update anak usaha menjadi scorecard kampanye yang sudah dicek di Excel, dengan basis spend, kurs, traffic light dan CAGR yang benar, lalu susun deck Direksi di PowerPoint berisi hasil, concern dan usulan keputusan."
  ms: "Tukar eksport platform iklan, ekstrak BI, invois agensi dan kemas kini anak syarikat kepada kad skor kempen yang telah disemak dalam Excel, dengan asas perbelanjaan, mata wang, lampu isyarat dan CAGR yang betul, kemudian bina dek Lembaga dalam PowerPoint dengan keputusan, kebimbangan dan keputusan yang dipohon."
industry: [telco]
department: [marketing]
persona: [marketing-manager]
market: [ID, MY]
difficulty: 3
surface: [excel, powerpoint]
licence: [m365-copilot]
inputs:
  - { name: "The CMO's request with the board's questions from last month", format: ".docx or email", where: "Email", count: "1", kit: ["01_Email_CMO_Board_Pack_Sep2026.docx"], steps: [5] }
  - { name: "Marketing tracker: campaigns, budget phasing, reporting rules, 5-year history, last month's scorecard", format: ".xlsx", where: "Group Marketing SharePoint", count: "1", kit: ["02_Marketing_Tracker_2026.xlsx"], steps: [2, 3] }
  - { name: "Ad platform exports as downloaded (Meta, Google Ads, TikTok)", format: ".xlsx (save CSV exports as .xlsx)", where: "Shared folder", count: "3", kit: ["03_Meta_Ads_Export_Sep2026.xlsx", "04_Google_Ads_Export_Sep2026.xlsx", "05_TikTok_Ads_Export_Sep2026.xlsx"], steps: [3] }
  - { name: "BI extract of backend orders, installs, activations and fraud flags", format: ".xlsx", where: "BI team", count: "1", kit: ["06_BI_Extract_Campaign_Activations_Sep2026.xlsx"], steps: [3] }
  - { name: "Agency invoice with the agency's own performance recap", format: ".pdf", where: "Finance / email", count: "1", kit: ["07_WideWorld_Invoice_Recap_Sep2026.pdf"], steps: [3] }
  - { name: "The Malaysian subsidiary's monthly update", format: ".docx or email", where: "Email", count: "1", kit: ["08_Email_Malaysia_5G_Sep2026.docx"], steps: [3, 5] }
  - { name: "Notes from fraud management, legal and field operations", format: ".docx", where: "Email / Teams", count: "1", kit: ["09_Notes_RAFM_Legal_FieldOps_Sep2026.docx"], steps: [3, 5] }
  - { name: "Board deck template", format: ".pptx", where: "Corporate template library", count: "1", kit: ["10_Relecloud_Board_Template.pptx"], steps: [4, 5] }
objective: "Give the Direksi one trustworthy view of the campaigns running this month: spend, results and cost against target on the company's own rules, growth measured correctly, and the concerns and decisions that follow, in about 50 minutes instead of two days."
run_time: "Part A about 20 min, Part B about 25 min"
data: { sensitivity: "Confidential", customer_pii: false, signoff: "CMO before the deck goes to the Corporate Secretary; Finance for spend and currency" }
impact: { baseline: "2 days to reconcile exports, invoices and backend numbers and build the deck", target: "Under an hour, most of it reviewing", evidence: estimated }
card:
  problem: "Three campaigns, three ad platforms, an agency that sums everyone's conversions, a Malaysian team that reports at spot rate with tax and counts upgrades as new customers, a fraud spike, and a CAGR the board already doubted last month."
  output: "A scorecard with live formulas and a Checks sheet that shows every trap handled, and a board deck in your template: executive summary with traffic lights, one slide per campaign, growth, concerns and decisions, with speaker notes that name the source of every number."
limits:
  - "Copilot follows the reporting rules you give it. Keep them in a Rules sheet: spend basis, where volumes come from, currency rate and light thresholds. Without them it takes the agency's or the subsidiary's numbers at face value."
  - "Platform conversions are not customers. Each platform counts the same person under its own attribution window, so their sum is higher than what your systems recorded. Use backend numbers for results."
  - "Excel downloads can lag behind the screen. Wait a minute or two after Copilot says it is done before you copy or download the workbook."
  - "PowerPoint builds charts and tables from what you attach. Check every number on the slides against the scorecard before the deck goes out; the speaker notes name the source to make that quick."
source_refs:
  - "https://support.microsoft.com/en-us/excel/copilot/get-started-with-copilot-in-excel"
  - "https://support.microsoft.com/en-us/powerpoint/edit-with-copilot-in-powerpoint"
  - "https://support.microsoft.com/en-us/powerpoint/copilot/keep-your-presentation-on-brand-with-copilot"
  - "https://support.google.com/google-ads/answer/3419678"
  - "https://support.google.com/google-ads/answer/11182074"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-09-30
validation_note: "Run end to end in a demo tenant with the kit, both prompts exactly as published, first run each. Excel (about 11 minutes) filled the scorecard with a source-inputs block and live formulas and matched every value in the answer key: spend from the invoice with the 7% fee and no PPN, the August Google credit excluded, 140,580 valid prepaid adds after RAFM flags, Malaysia net of SST at the budget rate (IDR 3,405.6 m, 6,480 new lines), lights Red / Amber / Amber, total IDR 11,923.9 m vs 11,820.0 m and FTTH CAGR 23.2% over 4 years; all ten checks OK. PowerPoint (about 11 minutes) replaced the sample slides with a 10-slide deck in the template: numbers copied exactly, native bar charts, the CAGR correction explained, all four risks from the notes with owners, decisions with owners and the unknown September RGS30 stated, and speaker notes citing the cell behind each number."
---

## Situation

**The deadline.** Relecloud's CMO needs the September campaign pack by Tuesday 12.00 for Wednesday's Direksi meeting. You report on three campaigns across Indonesia and Malaysia.

**The inputs.** Ad exports, backend results, the agency invoice and local-team notes feed a tracker with the group's reporting rules.

**The risks.** Platform conversions overlap, Malaysia mixes tax, currency and upgrades, and prepaid adds include fraud flags. An early export, an August credit and last month's wrong CAGR also need correcting.

## Steps

**1. Get the kit ready.** Put the files in OneDrive and keep a clean copy of the tracker.

1. Download the kit and upload all files to one OneDrive folder.
2. Open each file once, so Copilot can find it by name.
3. Make a copy of *02_Marketing_Tracker_2026.xlsx* before each run.

**Part A: the checked scorecard (about 20 minutes).** Always do this part. It gives you the numbers the deck and the board's questions depend on.

**2. Open the tracker in Excel.** Open *02_Marketing_Tracker_2026.xlsx* in Excel for the web and select **Copilot**. Check the mode says **Allow editing**.

1. Add a sensitivity label if your organisation asks for one.
2. Look at the **Rules** sheet: it is what Copilot will apply.

**3. Fill the scorecard and the checks.** Attach the seven source files, then run the prompt.

1. Select **Add content** > **Add work content**, type the start of a file name (for example *03_Meta*) and select the file.
2. Repeat for *04* to *09*, one at a time. Count seven file chips before you send.
3. Run:

:::prompt
ABOUT: Fills the September scorecard and the checks with live formulas, applying your reporting rules to every export, invoice and email.
EN: Fill the sheets Scorecard_Sep and Checks in this workbook for the September 2026 Direksi marketing pack. Keep every other sheet exactly as it is.
Sources: the attached Meta, Google and TikTok exports, the BI extract, the Wide World invoice (PDF), the Malaysia email and the notes, plus the sheets Campaigns, Budget_Phasing, Rules, History_FTTH and Scorecard_Aug in this workbook.
Apply the Rules sheet exactly. Where an email, the agency recap or an export says something different, follow the Rules and write the difference in the Notes column.
Spend: take media per campaign from the invoice lines, not from the exports; add the agency fee; leave out PPN and SST; put the Google credit in the month of the traffic it relates to.
Volumes: take them from the BI extract (for Malaysia from the table in the Malaysia email). For Merdeka Unlimited subtract the RAFM-flagged activations. Put the summed platform conversions only in the reference column.
Malaysia: remove SST from the invoiced MYR amount, convert at the budget rate in Rules (not spot), count only new lines as volume, and fill the Malaysia in MYR block.
Pacing: campaign-to-date spend includes the July and August actuals in Budget_Phasing; % of time elapsed = days from start to 30 September divided by days total.
Volume last month comes from Scorecard_Aug. Fill the Growth row: FTTH CAGR from History_FTTH with full years only, showing start year, end year and number of years.
Set the three lights and the overall light with the thresholds in Rules. Fill the Total row for spend and budget.
Put source values in cells and calculate the rest with Excel formulas that point to those cells, so the numbers stay live.
In Checks fill Expected, Found, Status (OK or Flag) and a one-line Comment for every check.
Finish with a short summary here in chat: the three overall lights, total spend vs budget, and anything you could not verify.
ID: Isi sheet Scorecard_Sep dan Checks di workbook ini untuk board pack marketing Direksi September 2026. Biarkan sheet lain persis seperti adanya.
Sumber: export Meta, Google dan TikTok terlampir, BI extract, invoice Wide World (PDF), email Malaysia dan catatan, ditambah sheet Campaigns, Budget_Phasing, Rules, History_FTTH dan Scorecard_Aug di workbook ini.
Terapkan sheet Rules secara persis. Jika email, recap agency atau export menyebut hal yang berbeda, ikuti Rules dan tulis perbedaannya di kolom Notes.
Spend: ambil media per kampanye dari baris invoice, bukan dari export; tambahkan agency fee; jangan masukkan PPN dan SST; masukkan kredit Google ke bulan traffic yang terkait.
Volume: ambil dari BI extract (untuk Malaysia dari tabel di email Malaysia). Untuk Merdeka Unlimited kurangi aktivasi yang di-flag RAFM. Jumlah konversi platform hanya di kolom referensi.
Malaysia: keluarkan SST dari nilai MYR di invoice, konversi dengan kurs budget di Rules (bukan spot), hitung hanya new lines sebagai volume, dan isi blok Malaysia in MYR.
Pacing: spend campaign-to-date termasuk aktual Juli dan Agustus di Budget_Phasing; % waktu berjalan = hari dari mulai sampai 30 September dibagi total hari.
Volume bulan lalu dari Scorecard_Aug. Isi baris Growth: CAGR FTTH dari History_FTTH dengan tahun penuh saja, tampilkan tahun awal, tahun akhir dan jumlah tahun.
Tentukan tiga light dan overall light dengan ambang batas di Rules. Isi baris Total untuk spend dan budget.
Taruh nilai sumber di sel dan hitung sisanya dengan rumus Excel yang merujuk ke sel tersebut, supaya angkanya tetap hidup.
Di Checks isi Expected, Found, Status (OK atau Flag) dan satu baris Comment untuk setiap cek.
Akhiri dengan ringkasan singkat di chat: tiga overall light, total spend vs budget, dan apa pun yang tidak bisa Anda verifikasi.
BM: Isi helaian Scorecard_Sep dan Checks dalam buku kerja ini untuk pek pemasaran Lembaga September 2026. Kekalkan helaian lain tepat seperti asal.
Sumber: eksport Meta, Google dan TikTok yang dilampirkan, ekstrak BI, invois Wide World (PDF), e-mel Malaysia dan nota, serta helaian Campaigns, Budget_Phasing, Rules, History_FTTH dan Scorecard_Aug dalam buku kerja ini.
Gunakan helaian Rules dengan tepat. Jika e-mel, ringkasan agensi atau eksport menyatakan sesuatu yang berbeza, ikut Rules dan tulis perbezaannya dalam lajur Notes.
Perbelanjaan: ambil media setiap kempen daripada baris invois, bukan daripada eksport; tambah yuran agensi; jangan masukkan PPN dan SST; letakkan kredit Google dalam bulan trafik yang berkaitan.
Volum: ambil daripada ekstrak BI (untuk Malaysia daripada jadual dalam e-mel Malaysia). Untuk Merdeka Unlimited tolak pengaktifan yang ditanda RAFM. Jumlah penukaran platform hanya dalam lajur rujukan.
Malaysia: keluarkan SST daripada amaun MYR yang diinvois, tukar pada kadar bajet dalam Rules (bukan kadar semasa), kira hanya talian baharu sebagai volum, dan isi blok Malaysia in MYR.
Pacing: perbelanjaan kempen setakat ini termasuk sebenar Julai dan Ogos dalam Budget_Phasing; % masa berlalu = hari dari mula hingga 30 September dibahagi jumlah hari.
Volum bulan lepas daripada Scorecard_Aug. Isi baris Growth: CAGR FTTH daripada History_FTTH dengan tahun penuh sahaja, tunjukkan tahun mula, tahun akhir dan bilangan tahun.
Tetapkan tiga lampu dan lampu keseluruhan dengan ambang dalam Rules. Isi baris Total untuk perbelanjaan dan bajet.
Letakkan nilai sumber dalam sel dan kira selebihnya dengan formula Excel yang merujuk sel tersebut, supaya angka kekal hidup.
Dalam Checks isi Expected, Found, Status (OK atau Flag) dan satu baris Comment untuk setiap semakan.
Akhiri dengan ringkasan pendek di sini dalam sembang: tiga lampu keseluruhan, jumlah perbelanjaan berbanding bajet, dan apa-apa yang tidak dapat anda sahkan.
:::

**After you run it:** Copilot works for about 10 minutes. Scorecard_Sep has a source-inputs block under the table, every result is a formula, the lights read **Red, Amber, Amber**, and all ten checks say **OK**. Wait a minute before you copy or download the file.

**Part B: the board deck (about 25 minutes).** Do this when the scorecard is right. PowerPoint builds the deck from the tracker and the notes.

**4. Start the deck from the template.** Make a copy of *10_Relecloud_Board_Template.pptx*, name it *Board_Pack_Marketing_Sep2026.pptx*, open it in PowerPoint for the web and select **Copilot**.

1. Add a sensitivity label if your organisation asks for one.
2. Check the mode says **Allow editing**.

**5. Build the deck.** Attach the filled tracker and three documents, then run the prompt.

1. Select **Add content** > **Add work content** and attach the tracker you filled in step 3, *01_Email_CMO*, *08_Email_Malaysia* and *09_Notes*. Pick the tracker you just opened, not the clean copy.
2. Count four file chips.
3. Run:

:::prompt
ABOUT: Builds the Direksi deck in your template from the filled scorecard: summary with lights, campaign slides, growth, concerns and decisions.
EN: Build the September 2026 marketing campaign pack for the Direksi in this presentation, in Bahasa Indonesia, using this template's layouts and style. Replace the sample slides.
Use only the attached files: the tracker (sheets Scorecard_Sep, Checks, Rules, Scorecard_Aug), the CMO's email, the Malaysia email and the notes. Copy numbers exactly as they appear in Scorecard_Sep; do not recalculate them.
Make at most 10 slides: (1) title; (2) executive summary with a one-sentence message and a table of the three campaigns with spend vs budget, volume vs target, cost vs target and the overall light; (3) to (5) one slide per campaign: actual vs target and vs August, why, next steps.
(6) FTTH growth: the CAGR with its start and end year and why it differs from the figure shown in August; (7) concerns and risks; (8) insights and decisions requested from the Direksi; (9) appendix: definitions, spend basis, exchange rate and data sources.
Volumes are backend numbers. Platform or agency conversion figures may appear only as a labelled comparison, never as results.
Show Malaysia in IDR at the budget rate with MYR next to it, and show upgrades separately from new 5G lines.
Concerns: take every risk in the notes, every Flag in Checks and every Red or Amber light, each with its number and owner.
Decisions: propose only what the numbers and notes support, each with an owner. Where something is not known yet, say so instead of guessing.
Add short speaker notes to every slide naming the sheet or file behind each number.
ID: Susun board pack kampanye marketing September 2026 untuk Direksi di presentasi ini, dalam Bahasa Indonesia, dengan layout dan gaya template ini. Ganti slide contoh.
Gunakan hanya file terlampir: tracker (sheet Scorecard_Sep, Checks, Rules, Scorecard_Aug), email CMO, email Malaysia dan catatan. Salin angka persis seperti di Scorecard_Sep; jangan hitung ulang.
Maksimal 10 slide: (1) judul; (2) ringkasan eksekutif dengan pesan satu kalimat dan tabel tiga kampanye berisi spend vs budget, volume vs target, biaya vs target dan overall light; (3) sampai (5) satu slide per kampanye: aktual vs target dan vs Agustus, penyebab, langkah berikut.
(6) growth FTTH: CAGR dengan tahun awal dan akhir, dan kenapa berbeda dari angka yang ditampilkan di Agustus; (7) concern dan risiko; (8) insight dan keputusan yang diminta dari Direksi; (9) lampiran: definisi, basis spend, kurs dan sumber data.
Volume adalah angka backend. Angka konversi platform atau agency hanya boleh tampil sebagai pembanding berlabel, tidak pernah sebagai hasil.
Tampilkan Malaysia dalam IDR dengan kurs budget dan MYR di sebelahnya, dan tampilkan upgrade terpisah dari new 5G lines.
Concern: ambil setiap risiko di catatan, setiap Flag di Checks dan setiap light Red atau Amber, masing-masing dengan angka dan pemiliknya.
Keputusan: usulkan hanya yang didukung angka dan catatan, masing-masing dengan pemilik. Jika sesuatu belum diketahui, katakan begitu, jangan menebak.
Tambahkan speaker notes singkat di setiap slide yang menyebut sheet atau file sumber setiap angka.
BM: Bina pek kempen pemasaran September 2026 untuk Lembaga dalam persembahan ini, dalam Bahasa Indonesia, menggunakan susun atur dan gaya templat ini. Gantikan slaid contoh.
Gunakan hanya fail yang dilampirkan: penjejak (helaian Scorecard_Sep, Checks, Rules, Scorecard_Aug), e-mel CMO, e-mel Malaysia dan nota. Salin angka tepat seperti dalam Scorecard_Sep; jangan kira semula.
Paling banyak 10 slaid: (1) tajuk; (2) ringkasan eksekutif dengan mesej satu ayat dan jadual tiga kempen dengan perbelanjaan berbanding bajet, volum berbanding sasaran, kos berbanding sasaran dan lampu keseluruhan; (3) hingga (5) satu slaid setiap kempen: sebenar berbanding sasaran dan Ogos, sebab, langkah seterusnya.
(6) pertumbuhan FTTH: CAGR dengan tahun mula dan akhir, dan sebab ia berbeza daripada angka yang ditunjukkan pada Ogos; (7) kebimbangan dan risiko; (8) pandangan dan keputusan yang dipohon daripada Lembaga; (9) lampiran: definisi, asas perbelanjaan, kadar pertukaran dan sumber data.
Volum ialah angka sistem dalaman. Angka penukaran platform atau agensi hanya boleh muncul sebagai perbandingan berlabel, bukan sebagai keputusan.
Tunjukkan Malaysia dalam IDR pada kadar bajet dengan MYR di sebelahnya, dan tunjukkan naik taraf berasingan daripada talian 5G baharu.
Kebimbangan: ambil setiap risiko dalam nota, setiap Flag dalam Checks dan setiap lampu Red atau Amber, masing-masing dengan angka dan pemiliknya.
Keputusan: cadangkan hanya yang disokong oleh angka dan nota, masing-masing dengan pemilik. Jika sesuatu belum diketahui, nyatakan begitu, jangan meneka.
Tambah nota penceramah pendek pada setiap slaid yang menamakan helaian atau fail di sebalik setiap angka.
:::

**After you run it:** Copilot works for about 10 minutes, then the sample slides are replaced by about 10 slides in the template: title, executive summary with the traffic-light table, one slide per campaign with a bar chart, FTTH growth, concerns, decisions and an appendix. Open **Notes** under a slide to see where each number came from.

## Check it

- **Lights:** Rumah Terhubung **Red** (cost per install **IDR 591,325** vs 480,000, +23.2%), Merdeka Unlimited **Amber**, Hari Malaysia 5G **Amber**.
- **Total:** **IDR 11,923.9 m** against a budget of **11,820.0 m** (**100.9%**) for the three campaigns. Brand Always-On (IDR 212.0 m media) is other spend, not in the total.
- **Spend basis:** Rumah Terhubung **3,852.5 m** and Merdeka Unlimited **4,665.8 m** are invoice media plus the 7% fee, **without PPN**. The **-38.45 m** Google credit belongs to **August**; if you see 4,627.4 m, it was netted by mistake.
- **TikTok export vs invoice:** the export is **22.4 m** (Rumah Terhubung) and **51.6 m** (Merdeka Unlimited) below the invoice because it was pulled at 18:12 on 30 September. The invoice wins.
- **Prepaid quality:** **172,460** activations minus **31,880** RAFM flags = **140,580** valid adds (93.7% of target); cost per valid add **IDR 33,190**. The agency's "CPA IDR 19,079" divides by **228,550** summed platform conversions, more than the real activations.
- **Pacing:** Rumah Terhubung has spent **57.7%** of its July to December budget at **50.0%** of the time (**+7.7 points**, Amber), with **2,870** orders waiting over 14 days for installation.
- **Malaysia:** RM 1,021,680 including SST becomes **RM 946,000** net, x 3,600 = **IDR 3,405.6 m** (not 3,823.1 m at spot with tax). **6,480** new lines (not 16,200: the 9,720 upgrades are separate); cost per new line **RM 146.0**.
- **CAGR:** FTTH subscribers **412.0 thousand (2021)** to **948.2 thousand (2025)** over **4 years** = **23.2%**. August's "5-year CAGR 18.1%" used 5 periods; using 2026 year-to-date as a year is also wrong.
- **Concerns in the deck:** FTTH overspend and install backlog; referral bonus farming in Karawang (**47%** of referral activations flagged); FUP line missing in **2 of 6** TikTok ads with complaints up from **96 to 412**; Malaysian port-ins after a competitor's outage may not repeat.

## When it goes wrong

- **The downloaded or copied workbook has empty sheets.** Excel for the web had not saved yet. Wait one or two minutes after Copilot says it is done. (step 3)
- **A column shows ##### in the source block.** The amount is wider than the column. Double-click the column border to widen it; the value is there. (step 3)
- **The search shows the tracker twice.** You kept a clean copy. Pick the one you filled in step 3 (it shows "Opened by you"), or PowerPoint builds the deck from empty sheets. (step 5)
- **Clicking the message box opens a file preview.** The click landed on a file chip. Close the preview tab and click at the end of the text in the box before you type. (step 5)

## Take it further

- **Make the rules permanent.** In Excel select **Add content** > **Create workbook rules** and paste the Rules sheet, so every Copilot request in the tracker follows them.
- **Next month.** Save a copy of the tracker, let September's filled scorecard become last month's, add an empty scorecard for October with the same headings, and run the same two prompts with the month and sheet names changed.
- **Now with your own campaigns.** Keep the structure: one Rules sheet (spend basis, where volumes come from, exchange rate, light thresholds), an empty scorecard and a Checks sheet, and your template with a few sample slides.
- **Malaysia board.** Ask PowerPoint for the deck in Bahasa Melayu or English with MYR first and IDR alongside; the scorecard does not change.

:::presenter
**Session length:** 40 minutes. **Setup:** kit in the presenter's OneDrive, each file opened once, a clean copy of the tracker and of the template.

1. Set the scene with the agency recap: "228,550 conversions, CPA 19,079, 40% below target". Ask the room if they would put that in front of the board. (4 min)
2. Show the Rules sheet: this is the only thing Copilot is told to trust. (3 min)
3. Step 3 live. While it runs (about 10 minutes), open the Malaysia email and find the three traps: tax, spot rate, upgrades counted as new. (13 min)
4. Walk the result: lights, the Checks sheet, then click the CAGR cell to show the 4-year formula. (6 min)
5. Step 5 live, or show a deck made earlier. Open the concerns slide and read the risks with owners, then the speaker notes of the summary slide. (10 min)
6. Close: Copilot did the reconciliation; the marketer owns the story and the decisions. (4 min)
:::
