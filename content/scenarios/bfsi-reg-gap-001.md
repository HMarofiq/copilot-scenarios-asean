---
id: bfsi-reg-gap-001
title: { en: "New regulation gap analysis", id: "Analisis kesenjangan regulasi baru", ms: "Analisis jurang peraturan baharu" }
summary:
  en: "Review a historical Malaysian vulnerable-consumer policy and evidence pack against selected BNM requirements; create a cited Excel tracker and an unsigned BRMC note."
  id: "Tinjau paket kebijakan dan bukti historis Malaysia tentang konsumen rentan terhadap persyaratan BNM terpilih; buat pelacak Excel bersumber dan nota BRMC tanpa tanda tangan."
  ms: "Semak pek dasar dan bukti sejarah Malaysia tentang pengguna rentan berbanding keperluan BNM terpilih; hasilkan penjejak Excel berujukan dan nota BRMC tanpa tandatangan."
industry: [banking-insurance]
department: [compliance, risk]
persona: [compliance-officer]
market: [ID, MY]
difficulty: 3
surface: [copilot-chat, excel, word]
licence: [m365-copilot]
inputs:
  - { name: "Historical scope and review request", format: ".docx", where: "Your dedicated OneDrive work folder", count: "1", kit: ["01_Contoso_MY_FTFC_Scope_Request.docx"], steps: [1, 2, 3] }
  - { name: "Authored BNM source-review brief, not the official PDF", format: ".pdf", where: "Your dedicated OneDrive work folder", count: "1", kit: ["02_BNM_FTFC_2024_Reviewed_Source_Brief.pdf"], steps: [1, 2, 3] }
  - { name: "Approved Malaysian policy with unapproved Annex B", format: ".docx", where: "Your dedicated OneDrive work folder", count: "1", kit: ["03_Contoso_MY_Policy_Pack_v1.0.docx"], steps: [1, 2, 3] }
  - { name: "Readiness evidence and steering minutes", format: ".docx", where: "Your dedicated OneDrive work folder", count: "1", kit: ["04_Contoso_MY_Readiness_Evidence_17Mar2025.docx"], steps: [1, 2, 3] }
  - { name: "Separate Indonesian entity SOP, for scope checking", format: ".docx", where: "Your dedicated OneDrive work folder", count: "1", kit: ["05_PT_Contoso_ID_SOP_Nasabah_Rentan_v2.docx"], steps: [1, 2, 3] }
  - { name: "Unsigned BRMC paper template", format: ".docx", where: "Upload to the same folder at step 5", count: "1", kit: ["06_Contoso_MY_BRMC_Paper_Template.docx"], steps: [5] }
objective: "Produce a source-cited first-pass readiness review, an Excel tracker and an unsigned BRMC note for human Head of Compliance review, not a compliance certification."
needs:
  - "Microsoft 365 Copilot licence and the Microsoft 365 Copilot app in Work mode"
  - "Your authorised work OneDrive folder; Excel and Word to open, check and save the generated files"
  - "The six fictional inputs; keep README.txt and ANSWER_KEY_gap_register.xlsx local and out of chat"
run_time: "Part A about 20 min; Part B about 10–15 min, plus human review"
data: { sensitivity: "Public", customer_pii: false, signoff: "Head of Compliance before any real use or distribution" }
impact: { baseline: "Several working days assembling and reconciling a first review", target: "A first-pass review in one working session, followed by source checks and owner decisions", evidence: estimated }
card:
  problem: "An approved policy looks ready, but operating evidence, an unsigned annex and a sister-entity SOP tell a different story."
  output: "A 16-row, source-cited readiness register, an Excel tracker with calculated counts, and an unsigned two-page BRMC note."
limits:
  - "Historical case: Monday 17 March 2025 at 18:00 MYT, before the 1 April 2025 effective date. Running it in October 2026 does not make the law newly issued."
  - "The kit supplies original paraphrases with official locators, not the full BNM policy document or legal authority. The 16 questions are a scoped sample, not all FTFC obligations."
  - "Approved design does not prove operation. Every conclusion needs entity-relevant evidence and human checking against source paragraph, printed page, policy section and evidence ID."
  - "The predecessor and related policy texts are absent. Clause-level changes remain Unknown; paragraph 16.28 cannot be concluded Covered from this pack."
  - "File creation and source availability depend on the tenant. Count attachments, open actual output files, check formulas and verify where files were saved."
  - "Chat counts drift even when every row is right. In testing, correct 16-row reviews still reported wrong totals, so all counting is left to the formula-based Excel Summary."
  - "Bahasa Indonesia and Bahasa Melayu are language variants of the Malaysian case, not country validation. In testing, the ID and BM runs still wrote the Word note in English, following the English template."
source_refs:
  - "https://www.bnm.gov.my/documents/20124/938039/pd-ftfc-mar24.pdf"
  - "https://ojk.go.id/id/regulasi/Pages/Pelindungan-Konsumen-dan-Masyarakat-di-Sektor-Jasa-Keuangan.aspx"
  - "https://ojk.go.id/id/berita-dan-kegiatan/siaran-pers/Pages/OJK-Perkuat-Peraturan-Pelindungan-Konsumen-dan-Masyarakat.aspx"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-10-04
validation_note: "Tested on 4 October 2026 in the Microsoft 365 Copilot app (Work), Excel and Word, with the exact EN, ID and BM prompts on this page. The final runs matched all 16 keyed rows in each language (48/48). The formula Summary showed the keyed readiness, design and operating counts. Each unsigned Word note was A4, 11 pt and two pages. Earlier runs miscounted totals, labelled the draft Annex B as approved and named owners vaguely; the prompts now address each of these. Impact is estimated; human legal and Head of Compliance review remains required."
---

## Situation

**The case.** It is Monday 17 March 2025. Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, is reviewing fictional Contoso Bank Malaysia Berhad’s vulnerable-consumer readiness.

**The pressure.** Head of Compliance reviews on 20 March at 15:00 MYT; the internal BRMC paper is due 21 March at noon. The relevant legal effective date is 1 April 2025, not the committee deadline.

**The judgement.** Separate approved policy from operating proof, reject the Indonesian sister entity’s evidence, and expose missing approvals and unsupported service promises. This is a historical first-pass review for training, not a current-law assessment or compliance opinion.

## Steps

**1. Prepare the five review inputs.** Download the kit and use your own authorised work tenant.

1. Keep **README.txt** and **ANSWER_KEY_gap_register.xlsx** local. They contain spoilers; never upload or attach them as review sources.
2. Create one dedicated OneDrive folder. Upload **01–05 only**, using the exact filenames in **Your inputs**.
3. Open all five files once. If asked for a sensitivity label, use **Public** for these fictional documents where your tenant permits it; follow your organisation’s policy.
4. Keep **06_Contoso_MY_BRMC_Paper_Template.docx** local until step 5. Do not replace the authored brief with a live web search during this exercise.

**Part A: examine the supplied evidence (about 20 minutes).** Complete steps 1–3 before asking for output files.

**2. Attach the five sources.** Open a new chat in the **Microsoft 365 Copilot app**, signed into your work account, and select **Work**.

1. Select **Add and manage sources** > **Add content**.
2. In the dialog, use **Search** and the **Files** tab to find the exact filename.
3. Select the file from your dedicated folder, not a similarly named older copy. Repeat one at a time for inputs 01–05.
4. Count **five file chips** before sending the prompt. If your tenant’s interface differs, use its file-source picker and verify the same five files rather than assuming they attached.

**3. Review design and operating evidence.** Run the first prompt with those five sources, then inspect the result before continuing.

:::prompt
ABOUT: Produces a fixed, source-cited review of the historical Malaysian case, keeping design approval and operating evidence separate.
EN: Act as Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, reviewing fictional Contoso Bank Malaysia Berhad for training.
Use only attached inputs 01–05 and the historical cutoff Monday 17 March 2025, 18:00 MYT; do not use the date of this chat as the case date.
Do not browse, invent facts, edit sources, send messages or execute remediation; answer here in chat.
Read the whole pack, including the Board approval perimeter, Annex B, E01–E18 and Steering Minutes M1–M3.
Return exactly one row for each scoped question R01–R16 from input 01, in order; do not add or merge rows or call this an exhaustive legal review.
Use these columns: Review key | BNM paragraph | S/G | Scoped question | Applicability | Legal effective date | Change from predecessor.
Continue with: Documented design | Operating evidence | Readiness status | Reason and missing evidence | Responsible role | Remediation approval.
Finish with: Proposed action | Proposed due target | Source citations; preserve these fields even if you split the wide table into linked parts.
Use only these design labels: Approved, Draft, N/A; assess the implementing control procedure, not a policy statement requiring one. If the only implementing procedure is unapproved, use Draft even when the main policy is approved.
Missing deployment, funding, records or completed tests concern operation; do not relabel an approved procedure Draft because its execution is missing.
Use N/A for both design and operating fields on G rows; cite relevant context but do not grade guidance implementation.
Use only these operating labels: Evidenced, Partial, Not evidenced, Unverifiable, N/A; assess dated, relevant artifacts independently of design approval.
Use only these readiness labels and input 01 rules: Covered, Partial, Gap, Unverified, Guidance noted, N/A; keep the English labels unchanged.
For every judgement cite input 02 with BNM paragraph and official printed page, input 03 section or annex, and input 04 E-ID with any relevant minutes.
If no operating E-ID applies to a scope-only question, cite the entity scope in input 01 and explain why; never fabricate an E-ID or source quotation.
The brief is authored paraphrase, not legal authority; printed page equals official PDF page minus one, not the brief's own page number.
Distinguish the 27 March 2024 issue date, paragraph 4.1 exceptions effective 1 April 2025, and the internal 21 March 2025 noon MYT paper deadline.
Keep the Head of Compliance review on 20 March 2025 at 15:00 MYT separate; neither internal date is a regulatory filing deadline.
Record Unknown for every clause-level change because the 6 November 2019 predecessor is absent; do not invent related texts or a completed 16.28 cross-review.
Keep G guidance outside mandatory S counts and respect the bank-as-distributor, not insurer or takaful-underwriter, boundary; retain any partner handoff.
Exclude PT Bank Contoso Indonesia's SOP and E18 from proof of Malaysian operation, even if their training and monitoring are stronger.
Check the draft annex, expired authority, unsupported attestations and advertised channels against actual approvals, validity and availability.
Distinguish employee attendance, unfinished employees, unenrolled agents and the bank's internal skills check; do not invent a BNM pass mark.
Treat planned CRM, proposed spreadsheet schemas, future tests and proposed funding as plans, not live records, completed tests or spending approvals.
Take owner roles from the pack; propose actions and leave due targets blank or explicitly pending owner and Head of Compliance agreement, never committed.
After the table, list review keys grouped by readiness, design and operating label, without numeric totals.
List mandatory S and guidance G member keys separately; an R16 scope outcome must not enter the S group.
Flag contradictions and source-verification needs; defer every numeric count to the formula-based Excel Summary in the next step.
ID: Bertindaklah sebagai Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, yang meninjau Contoso Bank Malaysia Berhad fiktif untuk latihan.
Gunakan hanya input 01–05 terlampir dan batas bukti historis Senin 17 Maret 2025, pukul 18.00 MYT; jangan gunakan tanggal chat ini sebagai tanggal kasus.
Jangan menjelajah web, mengarang fakta, mengubah sumber, mengirim pesan atau menjalankan remediasi; jawab di chat ini.
Baca seluruh paket, termasuk batas persetujuan Dewan, Annex B, E01–E18 dan Steering Minutes M1–M3.
Hasilkan tepat satu baris untuk setiap pertanyaan R01–R16 dalam cakupan input 01, secara berurutan; jangan menambah atau menggabungkan baris atau menyebutnya tinjauan hukum menyeluruh.
Gunakan kolom: Review key | BNM paragraph | S/G | Scoped question | Applicability | Legal effective date | Change from predecessor.
Lanjutkan dengan: Documented design | Operating evidence | Readiness status | Reason and missing evidence | Responsible role | Remediation approval.
Akhiri dengan: Proposed action | Proposed due target | Source citations; pertahankan bidang ini meskipun tabel lebar dipecah menjadi bagian yang terhubung.
Gunakan hanya label desain: Approved, Draft, N/A; nilai prosedur pelaksana kontrol, bukan pernyataan kebijakan yang mewajibkannya. Jika satu-satunya prosedur pelaksana belum disetujui, gunakan Draft meskipun kebijakan utama disetujui.
Ketiadaan penerapan, pendanaan, catatan atau hasil pengujian berkaitan dengan operasi; jangan mengubah prosedur yang disetujui menjadi Draft karena pelaksanaannya belum terbukti.
Gunakan N/A untuk bidang desain dan bukti operasional pada baris G; rujuk konteks yang relevan, tetapi jangan menilai pelaksanaan panduan.
Gunakan hanya label bukti operasional: Evidenced, Partial, Not evidenced, Unverifiable, N/A; nilai artefak bertanggal dan relevan secara terpisah dari persetujuan desain.
Gunakan hanya label kesiapan dan aturan input 01: Covered, Partial, Gap, Unverified, Guidance noted, N/A; jangan mengubah label berbahasa Inggris.
Untuk setiap penilaian, rujuk input 02 dengan paragraf BNM dan halaman cetak resmi, bagian atau lampiran input 03, serta E-ID input 04 dan notulen yang relevan.
Jika tidak ada E-ID operasional untuk pertanyaan khusus cakupan, rujuk cakupan entitas di input 01 dan jelaskan alasannya; jangan mengarang E-ID atau kutipan sumber.
Ringkasan sumber adalah parafrasa penulis, bukan otoritas hukum; halaman cetak sama dengan halaman PDF resmi dikurangi satu, bukan nomor halaman ringkasan.
Bedakan tanggal penerbitan 27 Maret 2024, pengecualian paragraf 4.1 yang berlaku 1 April 2025, dan tenggat internal nota 21 Maret 2025 pukul 12.00 MYT.
Pisahkan tinjauan Head of Compliance pada 20 Maret 2025 pukul 15.00 MYT; kedua tanggal internal itu bukan tenggat pelaporan regulator.
Catat Unknown untuk semua perubahan per klausul karena naskah sebelumnya, 6 November 2019, tidak tersedia; jangan mengarang teks terkait atau tinjauan silang 16.28 yang selesai.
Keluarkan panduan G dari hitungan wajib S dan hormati batas bank sebagai distributor, bukan penanggung asuransi atau takaful; pertahankan tindak lanjut kepada mitra.
Kecualikan SOP PT Bank Contoso Indonesia dan E18 sebagai bukti operasional Malaysia, meskipun pelatihan dan pemantauannya lebih kuat.
Periksa draf lampiran, kewenangan kedaluwarsa, pernyataan tanpa dukungan dan saluran yang diiklankan terhadap persetujuan, validitas dan ketersediaan sebenarnya.
Bedakan kehadiran pegawai, pegawai belum selesai, agen belum terdaftar dan pemeriksaan keterampilan internal bank; jangan mengarang nilai kelulusan BNM.
Perlakukan rencana CRM, usulan skema spreadsheet, pengujian mendatang dan usulan pendanaan sebagai rencana, bukan catatan aktif, pengujian selesai atau persetujuan belanja.
Ambil peran pemilik dari paket; usulkan tindakan dan biarkan target kosong atau jelas menunggu kesepakatan pemilik dan Head of Compliance, bukan komitmen.
Setelah tabel, daftarkan kunci tinjauan menurut label kesiapan, desain dan bukti operasional, tanpa jumlah angka.
Daftarkan kunci anggota S wajib dan panduan G secara terpisah; hasil cakupan R16 tidak boleh masuk kelompok S.
Tandai pertentangan dan kebutuhan verifikasi sumber; serahkan seluruh hitungan angka kepada Excel Summary berbasis rumus pada langkah berikutnya.
BM: Bertindak sebagai Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, yang menyemak Contoso Bank Malaysia Berhad rekaan untuk latihan.
Gunakan hanya input 01–05 yang dilampirkan dan had bukti sejarah Isnin 17 Mac 2025, 18:00 MYT; jangan gunakan tarikh chat ini sebagai tarikh kes.
Jangan layari web, reka fakta, ubah sumber, hantar mesej atau laksanakan pemulihan; jawab di sini dalam chat.
Baca seluruh pek, termasuk had kelulusan Lembaga, Annex B, E01–E18 dan Steering Minutes M1–M3.
Hasilkan tepat satu baris bagi setiap soalan berskop R01–R16 daripada input 01, mengikut turutan; jangan tambah atau gabungkan baris atau gelarkannya semakan undang-undang menyeluruh.
Gunakan lajur: Review key | BNM paragraph | S/G | Scoped question | Applicability | Legal effective date | Change from predecessor.
Teruskan dengan: Documented design | Operating evidence | Readiness status | Reason and missing evidence | Responsible role | Remediation approval.
Akhiri dengan: Proposed action | Proposed due target | Source citations; kekalkan medan ini walaupun jadual lebar dipecahkan kepada bahagian yang dipautkan.
Gunakan label reka bentuk ini sahaja: Approved, Draft, N/A; nilai prosedur pelaksanaan kawalan, bukan pernyataan dasar yang mewajibkannya. Jika satu-satunya prosedur pelaksanaan belum diluluskan, gunakan Draft walaupun dasar utama diluluskan.
Ketiadaan pelaksanaan, pembiayaan, rekod atau ujian lengkap berkaitan dengan operasi; jangan ubah prosedur yang diluluskan kepada Draft kerana pelaksanaannya belum dibuktikan.
Gunakan N/A bagi medan reka bentuk dan bukti operasi pada baris G; rujuk konteks yang relevan tetapi jangan nilai pelaksanaan panduan.
Gunakan label bukti operasi ini sahaja: Evidenced, Partial, Not evidenced, Unverifiable, N/A; nilai artifak bertarikh dan relevan secara berasingan daripada kelulusan reka bentuk.
Gunakan label kesediaan ini: Covered, Partial, Gap, Unverified, Guidance noted, N/A, mengikut input 01. Gunakan N/A jika soalan tidak terpakai kepada aktiviti entiti; Guidance noted hanya untuk panduan yang terpakai. Kekalkan label bahasa Inggeris.
Bagi setiap pertimbangan, rujuk input 02 dengan perenggan BNM dan halaman bercetak rasmi, seksyen atau lampiran input 03, serta E-ID input 04 dan minit yang relevan.
Jika tiada E-ID operasi bagi soalan skop sahaja, rujuk skop entiti dalam input 01 dan jelaskan sebabnya; jangan reka E-ID atau petikan sumber.
Ringkasan sumber ialah parafrasa penulis, bukan autoriti undang-undang; halaman bercetak bersamaan halaman PDF rasmi tolak satu, bukan nombor halaman ringkasan.
Bezakan tarikh terbitan 27 Mac 2024, pengecualian perenggan 4.1 yang berkuat kuasa 1 April 2025, dan tarikh akhir dalaman kertas 21 Mac 2025 pada 12:00 MYT.
Asingkan semakan Head of Compliance pada 20 Mac 2025, 15:00 MYT; kedua-dua tarikh dalaman itu bukan tarikh akhir pelaporan pengawal selia.
Catat Unknown bagi setiap perubahan klausa kerana teks terdahulu 6 November 2019 tiada; jangan reka teks berkaitan atau semakan silang 16.28 yang telah selesai.
Asingkan panduan G daripada kiraan wajib S dan patuhi batas bank sebagai pengedar, bukan penanggung insurans atau takaful; kekalkan rujukan kepada rakan kongsi.
Kecualikan SOP PT Bank Contoso Indonesia dan E18 sebagai bukti operasi Malaysia, walaupun latihan dan pemantauannya lebih kukuh.
Semak draf lampiran, kuasa tamat tempoh, akuan tanpa sokongan dan saluran yang diiklankan berbanding kelulusan, kesahan dan ketersediaan sebenar.
Bezakan kehadiran pekerja, pekerja belum selesai, ejen belum didaftarkan dan semakan kemahiran dalaman bank; jangan reka markah lulus BNM.
Anggap CRM yang dirancang, cadangan skema hamparan, ujian akan datang dan cadangan pembiayaan sebagai rancangan, bukan rekod aktif, ujian selesai atau kelulusan belanja.
Ambil peranan pemilik daripada pek; cadangkan tindakan dan biarkan sasaran kosong atau jelas menunggu persetujuan pemilik dan Head of Compliance, bukan komitmen.
Selepas jadual, senaraikan kunci semakan mengikut label kesediaan, reka bentuk dan bukti operasi, tanpa jumlah angka.
Senaraikan kunci ahli S wajib dan panduan G secara berasingan; hasil skop R16 tidak boleh masuk kumpulan S.
Tandakan percanggahan dan keperluan pengesahan sumber; serahkan semua kiraan angka kepada Excel Summary berasaskan formula dalam langkah seterusnya.
:::

**After you run it:** expect **16 rows**, not proof of compliance. Open the cited paragraphs in the brief and the cited policy/evidence sections yourself. Check that assertions, future plans and authority dates have not become operating proof. If any row is missing, correct the review before creating files.

**Part B: create and reconcile outputs (about 10–15 minutes).** Stay in the same chat; the reviewed register is the common source for both files.

**4. Create the Excel tracker.** Run the second prompt, then open the actual workbook in Excel.

:::prompt
ABOUT: Creates a downloadable tracker with linked formula counts, not a second independent assessment or typed summary totals.
EN: From the same reviewed R01–R16 table above, create an actual downloadable .xlsx workbook, not just a chat table or instructions.
Keep one Register row per key, all 16 rows in order, all assessment fields, English status labels, owner roles, proposed actions and source citations unchanged.
Preserve BNM paragraph and printed page, policy section or annex, and E-ID or the justified scope citation so each judgement remains auditable.
Use a filterable Excel table named Register, wrap long text and keep header rows visible; do not drop fields just to reduce width.
Add a Summary sheet linked to Register with working COUNTIF and COUNTIFS formulas, not typed result values.
Calculate total rows, the 14-row mandatory S denominator and the two excluded G rows from the S/G column; verify the total is 16.
Calculate readiness counts for Covered, Partial, Gap, Unverified, Guidance noted and N/A from the actual Readiness status column.
Show mandatory-only readiness counts using COUNTIFS with S/G equal to S; keep G guidance outside the mandatory denominator.
Calculate design counts for Approved, Draft and N/A and operating counts for Evidenced, Partial, Not evidenced, Unverifiable and N/A independently.
Add a COUNTIFS cross-check for Approved design with Readiness status not equal to Covered; do not imply approval proves operation.
Keep source issue date, 1 April 2025 legal effective date and internal review/paper dates separate; every predecessor change remains Unknown.
Leave proposed due targets blank or explicitly pending owner and Head of Compliance agreement; proposed actions and resources are not authorised commitments.
Include an unsigned review note explaining the historical cutoff, scoped S/G sample, source-brief limits, wrong-entity exclusion and missing related texts.
Do not browse, edit the source inputs, invent evidence, send anything or claim compliance.
Provide the actual file link and report creation or formula limitations honestly; do not claim it was saved to OneDrive unless you can verify that location.
ID: Dari tabel R01–R16 yang sama dan sudah ditinjau di atas, buat workbook .xlsx yang benar-benar dapat diunduh, bukan hanya tabel chat atau petunjuk.
Pertahankan satu baris Register per kunci, seluruh 16 baris berurutan, semua bidang penilaian, label status Inggris, peran pemilik, usulan tindakan dan rujukan sumber tanpa perubahan.
Pertahankan paragraf BNM dan halaman cetak, bagian atau lampiran kebijakan, serta E-ID atau rujukan cakupan yang beralasan agar setiap penilaian dapat diaudit.
Gunakan tabel Excel bernama Register dengan filter, bungkus teks panjang dan pertahankan header terlihat; jangan menghapus bidang hanya untuk mengurangi lebar.
Tambahkan sheet Summary yang terhubung ke Register dengan rumus COUNTIF dan COUNTIFS yang berfungsi, bukan nilai hasil yang diketik.
Hitung total baris, penyebut wajib S sebanyak 14 baris dan dua baris G yang dikecualikan dari kolom S/G; pastikan totalnya 16.
Hitung kesiapan Covered, Partial, Gap, Unverified, Guidance noted dan N/A dari kolom Readiness status yang sebenarnya.
Tampilkan hitungan kesiapan wajib saja menggunakan COUNTIFS dengan S/G sama dengan S; keluarkan panduan G dari penyebut wajib.
Hitung desain Approved, Draft dan N/A serta bukti operasional Evidenced, Partial, Not evidenced, Unverifiable dan N/A secara terpisah.
Tambahkan pemeriksaan silang COUNTIFS untuk desain Approved dengan Readiness status tidak sama dengan Covered; jangan menyiratkan bahwa persetujuan membuktikan operasi.
Pisahkan tanggal penerbitan sumber, tanggal efektif hukum 1 April 2025 dan tanggal tinjauan/nota internal; semua perubahan dari naskah sebelumnya tetap Unknown.
Biarkan usulan target kosong atau jelas menunggu kesepakatan pemilik dan Head of Compliance; usulan tindakan dan sumber daya bukan komitmen yang disetujui.
Sertakan catatan tinjauan tanpa tanda tangan yang menjelaskan batas historis, sampel S/G berskop, keterbatasan ringkasan sumber, pengecualian entitas lain dan teks terkait yang tidak tersedia.
Jangan menjelajah web, mengubah input sumber, mengarang bukti, mengirim apa pun atau menyatakan kepatuhan.
Berikan tautan file sebenarnya dan laporkan keterbatasan pembuatan atau rumus dengan jujur; jangan mengklaim tersimpan di OneDrive kecuali lokasinya dapat diverifikasi.
BM: Daripada jadual R01–R16 yang sama dan telah disemak di atas, hasilkan buku kerja .xlsx yang benar-benar boleh dimuat turun, bukan sekadar jadual chat atau arahan.
Kekalkan satu baris Register bagi setiap kunci, kesemua 16 baris mengikut turutan, semua medan penilaian, label status Inggeris, peranan pemilik, cadangan tindakan dan rujukan sumber tanpa perubahan.
Kekalkan perenggan BNM dan halaman bercetak, seksyen atau lampiran dasar, serta E-ID atau rujukan skop yang berasas supaya setiap pertimbangan boleh diaudit.
Gunakan jadual Excel bernama Register dengan penapis, balut teks panjang dan pastikan baris pengepala kelihatan; jangan gugurkan medan semata-mata untuk mengecilkan lebar.
Tambah helaian Summary yang dipautkan kepada Register dengan formula COUNTIF dan COUNTIFS yang berfungsi, bukan nilai hasil yang ditaip.
Kira jumlah baris, penyebut wajib S sebanyak 14 baris dan dua baris G yang dikecualikan daripada lajur S/G; sahkan jumlahnya 16.
Kira kesediaan Covered, Partial, Gap, Unverified, Guidance noted dan N/A daripada lajur Readiness status sebenar.
Paparkan kiraan kesediaan wajib sahaja menggunakan COUNTIFS dengan S/G bersamaan S; asingkan panduan G daripada penyebut wajib.
Kira reka bentuk Approved, Draft dan N/A serta bukti operasi Evidenced, Partial, Not evidenced, Unverifiable dan N/A secara berasingan.
Tambah semakan silang COUNTIFS bagi reka bentuk Approved dengan Readiness status tidak sama dengan Covered; jangan bayangkan kelulusan membuktikan operasi.
Asingkan tarikh terbitan sumber, tarikh kuat kuasa undang-undang 1 April 2025 dan tarikh semakan/kertas dalaman; semua perubahan daripada teks terdahulu kekal Unknown.
Biarkan cadangan sasaran kosong atau jelas menunggu persetujuan pemilik dan Head of Compliance; cadangan tindakan dan sumber bukan komitmen yang diluluskan.
Sertakan nota semakan tanpa tandatangan yang menerangkan had sejarah, sampel S/G berskop, batas ringkasan sumber, pengecualian entiti lain dan teks berkaitan yang tiada.
Jangan layari web, ubah input sumber, reka bukti, hantar apa-apa atau dakwa pematuhan.
Berikan pautan fail sebenar dan laporkan batas penciptaan atau formula dengan jujur; jangan dakwa ia disimpan ke OneDrive melainkan lokasi itu dapat disahkan.
:::

**After you run it:** open the download in **Excel**, inspect Summary formulas and check one count against a filtered Register. Save it in your work folder, apply a label if asked, and verify the location. A chat link alone does not prove a OneDrive save. Keep this reviewed register as the source for the note.

**5. Draft the unsigned BRMC note.** Upload **06_Contoso_MY_BRMC_Paper_Template.docx** to the same folder and open it once.

1. In the same chat, select **Add and manage sources** > **Add content**, find the template with **Search** / **Files**, and attach that one additional file.
2. Confirm the template is attached and the earlier review is still in the chat. Do not add the README or answer key.
3. Run the third prompt. Open the actual output in **Word** to check its page count, tables, citations and unsigned block.

:::prompt
ABOUT: Creates a concise, unsigned Word paper from the same register and the supplied template, preserving evidence limits and pending decisions.
EN: Create an actual downloadable Word .docx BRMC review note of no more than two pages using attached 06_Contoso_MY_BRMC_Paper_Template.docx.
Use A4 portrait, body and table text of at least 11 pt, dark text on light backgrounds and visible table headings; shorten wording rather than shrinking text.
Use the same reviewed R01–R16 register and Excel Summary above, not a fresh assessment; reconcile every count and source citation to that register.
Write for fictional Contoso Bank Malaysia Berhad, prepared by Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, for human Head of Compliance review.
Follow the template's sections: paper control and decision sought, scope and source limitation, register summary, priority risks/actions, resources/timeline, review and sign-off.
State the historical cutoff 17 March 2025 at 18:00 MYT, BNM issuer, Fair Treatment of Financial Consumers, reference BNM/RH/PD 028-103 and issue date 27 March 2024.
Distinguish the legal effective date 1 April 2025 from the internal HoC review 20 March at 15:00 MYT and BRMC paper deadline 21 March at noon MYT, all in 2025.
Explain that selected S standards and G guidance are a scoped sample, not exhaustive legal coverage; keep G outside mandatory counts and never claim compliance.
State that the brief is authored paraphrase, not legal authority; exclude Indonesian evidence and keep bank distribution distinct from partner underwriting duties.
Report readiness, design and operating counts consistently with Excel, explaining why approved design does not prove operation.
Prioritise Gap and Unverified issues, then material Partial actions; cite review key, BNM paragraph/printed page, policy section and E-ID or justified scope citation.
For each priority action use the responsible role and a blank or explicitly proposed target pending owner and Head of Compliance agreement, not an invented commitment.
Separate the RM380,000 proposal pending CFO decision from approved resources; do not invent expenditure approval or remediation quantities.
Disclose the unsupported WhatsApp and video-relay promises; do not describe them as available assistance or approved deployments.
Explain why the planned 14 April 2025 CRM release is after the legal effective date and why a spreadsheet schema alone is not an operating interim control.
Keep missing related-policy texts for 16.28 and Unknown changes from the absent 6 November 2019 predecessor explicit; do not fill these with assumptions.
Keep future testing, draft Annex B and unavailable operating proof distinct from completed work and approvals.
Leave the Head of Compliance signature and date blank, the review decision pending and the paper unsigned; do not invent a signature, approval or committee endorsement.
Do not browse, edit source inputs, send the paper or execute actions; provide the actual file link and disclose creation or layout limitations without inventing a page or word count.
ID: Buat nota tinjauan BRMC Word .docx yang benar-benar dapat diunduh, maksimal dua halaman, menggunakan 06_Contoso_MY_BRMC_Paper_Template.docx terlampir.
Gunakan A4 potret, teks isi dan tabel minimal 11 pt, teks gelap pada latar terang serta judul kolom terlihat; persingkat kalimat, bukan ukuran teks.
Gunakan register R01–R16 yang sama dan sudah ditinjau beserta Excel Summary di atas, bukan penilaian baru; cocokkan setiap hitungan dan rujukan sumber dengan register itu.
Tulis untuk Contoso Bank Malaysia Berhad fiktif, disusun oleh Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, untuk tinjauan manusia oleh Head of Compliance.
Ikuti bagian template: kendali nota dan keputusan diminta, cakupan dan batas sumber, ringkasan register, prioritas risiko/tindakan, sumber daya/linimasa, tinjauan dan tanda tangan.
Nyatakan batas historis 17 Maret 2025 pukul 18.00 MYT, penerbit BNM, Fair Treatment of Financial Consumers, referensi BNM/RH/PD 028-103 dan tanggal terbit 27 Maret 2024.
Bedakan tanggal efektif hukum 1 April 2025 dari tinjauan internal HoC 20 Maret pukul 15.00 MYT dan tenggat nota BRMC 21 Maret pukul 12.00 MYT, semuanya pada 2025.
Jelaskan bahwa standar S dan panduan G terpilih adalah sampel berskop, bukan cakupan hukum menyeluruh; keluarkan G dari hitungan wajib dan jangan menyatakan kepatuhan.
Nyatakan bahwa ringkasan sumber adalah parafrasa penulis, bukan otoritas hukum; kecualikan bukti Indonesia dan bedakan distribusi bank dari kewajiban penanggung mitra.
Laporkan hitungan kesiapan, desain dan bukti operasional secara konsisten dengan Excel, serta jelaskan mengapa persetujuan desain tidak membuktikan operasi.
Prioritaskan isu Gap dan Unverified, lalu tindakan Partial yang material; rujuk kunci tinjauan, paragraf/halaman cetak BNM, bagian kebijakan dan E-ID atau rujukan cakupan beralasan.
Untuk setiap tindakan prioritas, gunakan peran penanggung jawab dan target kosong atau jelas diusulkan menunggu kesepakatan pemilik dan Head of Compliance, bukan komitmen rekaan.
Pisahkan usulan RM380,000 yang menunggu keputusan CFO dari sumber daya yang disetujui; jangan mengarang persetujuan belanja atau jumlah remediasi.
Ungkapkan janji WhatsApp dan video-relay tanpa dukungan; jangan menggambarkannya sebagai bantuan tersedia atau penerapan yang disetujui.
Jelaskan mengapa rencana rilis CRM 14 April 2025 melewati tanggal efektif hukum dan mengapa skema spreadsheet saja bukan kontrol interim yang beroperasi.
Nyatakan dengan jelas teks kebijakan terkait 16.28 yang tidak tersedia dan perubahan Unknown dari naskah 6 November 2019 yang tidak ada; jangan mengisinya dengan asumsi.
Pisahkan pengujian mendatang, draf Annex B dan bukti operasional yang tidak tersedia dari pekerjaan selesai dan persetujuan.
Biarkan tanda tangan dan tanggal Head of Compliance kosong, keputusan tinjauan pending dan nota tanpa tanda tangan; jangan mengarang tanda tangan, persetujuan atau dukungan komite.
Jangan menjelajah web, mengubah input sumber, mengirim nota atau menjalankan tindakan; berikan tautan file sebenarnya dan ungkapkan batas pembuatan atau tata letak tanpa mengarang jumlah halaman atau kata.
BM: Hasilkan nota semakan BRMC Word .docx yang benar-benar boleh dimuat turun, tidak melebihi dua halaman, menggunakan 06_Contoso_MY_BRMC_Paper_Template.docx yang dilampirkan.
Gunakan A4 potret, teks isi dan jadual sekurang-kurangnya 11 pt, teks gelap pada latar cerah serta tajuk lajur kelihatan; ringkaskan ayat, bukan saiz teks.
Gunakan daftar R01–R16 yang sama dan telah disemak serta Excel Summary di atas, bukan penilaian baharu; padankan setiap kiraan dan rujukan sumber dengan daftar itu.
Tulis untuk Contoso Bank Malaysia Berhad rekaan, disediakan oleh Nurul Aina Rahman, Senior Manager, Regulatory Compliance Advisory, untuk semakan manusia oleh Head of Compliance.
Ikut seksyen templat: kawalan kertas dan keputusan diminta, skop dan batas sumber, ringkasan daftar, keutamaan risiko/tindakan, sumber/garis masa, semakan dan tandatangan.
Nyatakan had sejarah 17 Mac 2025 pada 18:00 MYT, penerbit BNM, Fair Treatment of Financial Consumers, rujukan BNM/RH/PD 028-103 dan tarikh terbitan 27 Mac 2024.
Bezakan tarikh kuat kuasa undang-undang 1 April 2025 daripada semakan dalaman HoC 20 Mac pada 15:00 MYT dan tarikh akhir kertas BRMC 21 Mac pada 12:00 MYT, semuanya pada 2025.
Jelaskan bahawa standard S dan panduan G terpilih ialah sampel berskop, bukan liputan undang-undang menyeluruh; asingkan G daripada kiraan wajib dan jangan dakwa pematuhan.
Nyatakan bahawa ringkasan sumber ialah parafrasa penulis, bukan autoriti undang-undang; kecualikan bukti Indonesia dan bezakan pengedaran bank daripada tugas penanggung rakan kongsi.
Laporkan kiraan kesediaan, reka bentuk dan bukti operasi secara konsisten dengan Excel, serta jelaskan mengapa kelulusan reka bentuk tidak membuktikan operasi.
Utamakan isu Gap dan Unverified, kemudian tindakan Partial yang material; rujuk kunci semakan, perenggan/halaman bercetak BNM, seksyen dasar dan E-ID atau rujukan skop berasas.
Bagi setiap tindakan utama, ulang peranan bertanggungjawab daripada daftar, termasuk setiap pemilik bagi baris gabungan; jangan tulis sekadar "pemilik berkaitan". Biarkan sasaran kosong atau jelas menunggu persetujuan pemilik dan Head of Compliance, bukan komitmen rekaan.
Asingkan cadangan RM380,000 yang menunggu keputusan CFO daripada sumber yang diluluskan; jangan reka kelulusan belanja atau kuantiti pemulihan.
Dedahkan janji WhatsApp dan video-relay tanpa sokongan; jangan gambarkannya sebagai bantuan tersedia atau pelaksanaan yang diluluskan.
Jelaskan mengapa pelepasan CRM yang dirancang pada 14 April 2025 melepasi tarikh kuat kuasa undang-undang dan mengapa skema hamparan sahaja bukan kawalan interim yang beroperasi.
Nyatakan dengan jelas teks dasar berkaitan 16.28 yang tiada dan perubahan Unknown daripada teks terdahulu 6 November 2019 yang tiada; jangan isi dengan andaian.
Asingkan ujian akan datang, draf Annex B dan bukti operasi yang tiada daripada kerja selesai dan kelulusan.
Biarkan tandatangan dan tarikh Head of Compliance kosong, keputusan semakan pending dan kertas tanpa tandatangan; jangan reka tandatangan, kelulusan atau sokongan jawatankuasa.
Jangan layari web, ubah input sumber, hantar kertas atau laksanakan tindakan; berikan pautan fail sebenar dan dedahkan batas penciptaan atau susun atur tanpa mereka jumlah halaman atau perkataan.
:::

**After you run it:** open the file in **Word**, save it to your work folder and label it if asked. Verify that it is no more than two pages; if not, shorten it without dropping source limitations, priority actions or the unsigned sign-off block. Do not send it.

**6. Verify and retain the review.** Open the local **ANSWER_KEY_gap_register.xlsx** only after completing the review.

1. Compare all 16 rows and their source locators with the key and supplied inputs; resolve disagreements using evidence, not the key alone.
2. Reconcile chat, Excel Register, formula-based Summary and Word counts. Check that pending decisions have not become approved commitments.
3. Close and reopen both saved outputs from the work folder. Confirm the content, location, label and unsigned review block persist.
4. Obtain a human Head of Compliance review and sign-off before any real use or distribution. The generated note remains a training draft until that review.

## Check it

- **Reconcile the scope and counts (step 6).** Exactly 16 keys: 14 S standards plus 2 G rows excluded from the mandatory denominator. Readiness: **5 Covered, 4 Partial, 3 Gap, 2 Unverified, 1 Guidance noted, 1 N/A**. These are scoped evidence outcomes, not a compliance percentage.
- **Keep the two dimensions (steps 3–6).** Design: **13 Approved, 1 Draft, 2 N/A**. Operation: **5 Evidenced, 4 Partial, 3 Not evidenced, 2 Unverifiable, 2 N/A**. Eight Approved rows are not Covered. Summary must calculate from Register; the supplied presenter key deliberately stores computed static values.
- **Check dates and locators (steps 3–6).** Source issued 27 March 2024; selected provisions effective 1 April 2025 under 4.1. Snapshot is 17 March 2025, 18:00 MYT; internal HoC review 20 March, 15:00, and paper 21 March, noon, are not regulator deadlines. Official PDF has 54 pages: printed page = PDF page minus one. Every row has BNM paragraph/printed page, policy section and E-ID, or the explicit scope-only citation.
- **T1 — read the approval boundary (step 3).** R05 is Gap / Draft / Not evidenced: 03 §3.5 and Annex B v0.3 dated 13 March; 04 E07. Board approval on 26 February excludes the annex. The production model has no supplied approved model procedure or executed fairness tests.
- **T2 — challenge an attestation (step 3).** R04 is Unverified: 03 §3.4; 04 E06 has a signed assertion but no promised QA report. Missing proof does not establish misconduct.
- **T3 — separate relief and current pricing (step 3).** R03 is Partial: 03 §3.3; 04 E04 records 41 fee waivers, while E05 expired 31 December 2024 and no current pricing review is supplied. Neither waivers nor the expired checklist proves that review.
- **T4 — do not promote guidance (steps 3–6).** R15, G 16.25, is Guidance noted, not a mandatory gap: 02 §2 and R15; 03 §3.15; 04 E12. Guidance does not mandate WhatsApp or video relay.
- **T5 — retain the entity boundary (step 3).** R16, G 16.8(g), is N/A to this bank as underwriter: 01 §2; 02 R16; 03 §3.16. Keep the insurer/takaful partner handoff for the bank’s distribution role.
- **T6 — reject wrong-entity proof (step 3).** 04 E18 and 05 §1/§6 belong to PT Bank Contoso Indonesia. Its stronger agent training and monitoring cannot close Malaysian R06 or R12.
- **T7 — reconcile people and skills (step 3).** R06 is Partial: 03 §3.6; 04 E08 has 1,184/1,287 employees, **92.0%**, leaving **103**, plus **120 unenrolled outsourced agents**. No skills results are supplied; the skills check is the bank’s control, not a BNM pass mark.
- **T8 — reject plans as operation (steps 3–6).** R07 is Gap: E09’s 14 April CRM target is after 1 April and the spreadsheet is only a schema. R10/R11 are Partial: E12 advertises unavailable WhatsApp/video relay; E13 web UAT on 31 March and E14 Q3 tests are future work. R12 is Gap: E15’s RM380,000 awaits CFO decision; no operating monitoring is supplied. Check M1–M3 and 03 §§3.7, 3.10–3.12.
- **Preserve unknowns (steps 3–6).** Every predecessor change is Unknown. R13 is Unverified, not Covered: 02 R13; 03 §3.13; 04 E16’s approved plan cannot replace absent related-policy texts and versions for 16.28.
- **Finish the handoff (steps 4–6).** Actual Excel and Word files open and persist. Source citations match the register; actions and due targets are proposed or pending; RM380,000 is not approved; the two-page Word note has no invented signature or endorsement.

## When it goes wrong

- **A file is missing or the wrong copy appears (step 2).** Reopen **Add and manage sources** > **Add content**, use **Search** / **Files**, confirm the folder and count five chips. If indexing is delayed, open the file and retry later; do not assume an attachment succeeded.
- **Every row is right but the totals are wrong (step 3).** Seen in testing: a correct 16-row review reported wrong summary counts. Do not fix the totals in chat; the prompt lists keys only, and the Excel Summary formulas do the counting in step 4.
- **R05 shows Approved because the main policy is approved (step 3).** Seen in testing. The only implementing procedure, Annex B v0.3, is a draft outside the Board approval, so R05's design is **Draft**. Ask Copilot to re-check R05 against 03 Annex B and 04 E07.
- **The note says "relevant owners" or uses small text (step 5).** Seen in testing. Ask Copilot to name each row's owner from the register and to keep body text at 11 pt or larger, then check the regenerated file in Word.
- **The review repeats the policy as proof (step 3).** Ask it to recheck approval and operating evidence separately for the affected keys, citing annex status, E-IDs and missing artifacts. Preserve all 16 keys and recalculate before continuing.
- **It changes the dates or invents a comparison (step 3).** Reground on 01 §1 and 02 §2: use the historical cutoff, the phased effective date and Unknown for the absent predecessor; do not browse to fill the gap.
- **It uses Indonesian evidence or treats G as mandatory (step 3).** Recheck entity names and S/G in each cited source, exclude E18 from Malaysian proof and preserve the bank/underwriter distinction.
- **Only a chat table appears (steps 4–5).** Ask for the actual downloadable file in this chat. If file creation is unavailable in your tenant, stop the file-generation exercise and record the limitation; do not pretend a table is a saved workbook or note.
- **Summary totals are typed or disagree (step 4).** Inspect the formulas in Excel, ensure references point to Register and retain English labels. Recalculate after any reviewed correction, then regenerate the Word summary from that register.
- **The Word note exceeds two pages (step 5).** Shorten repeated prose and use a compact action table; in Word, check table width and page breaks. Do not remove source limitations or manufacture a page count.
- **The file cannot be edited or its location is unclear (steps 4–6).** Apply the tenant-required label if prompted, use the app’s save controls and reopen from the chosen folder. Neither a generated link nor this draft recipe proves an automatic OneDrive save.

## Take it further

- **Use your own Malaysian files.** Replace the fictional request, policy and evidence with authorised material, obtain the authoritative BNM texts and applicable versions, and have Legal define the full review inventory and scope. Add the predecessor if you need a verified change analysis; never reuse these training counts as your result.
- **Adapt for Indonesia, not just Bahasa Indonesia.** Obtain actual primary OJK texts for your entity and activity, verify each relevant **Pasal** and transition, then rebuild the scope and evidence map. The official POJK 22/2023 landing page and public explanation establish name and context here, not numerical legal duties. Do not borrow Malaysian S/G labels or effective dates.
- **Keep the review human-led.** A language translation is not country validation. Larger source sets, different tenants and automated monitoring need separate testing and governance; no Scout or Cowork workflow is claimed as tested by this page.

:::presenter
**40-minute flow:** context and historical boundary 4 min; upload and source selection 5 min; analysis 11 min; Excel 6 min; Word 6 min; answer-key reconciliation 6 min; discussion 2 min. Allow extra time for tenant indexing and human review.

**Set the scene:** this is fictional Contoso Bank Malaysia Berhad, not a real licensed-bank document or regulator-endorsed exercise. The law source is real; the bank, people, evidence and decisions are fictional. Say “historical 17 March 2025 readiness review,” not “a new law issued today.”

**Keep the reveal clean:** attach only 01–05 for analysis and add 06 for Word. README and answer key stay local. Show the evidence contradiction before showing the keyed status: draft Annex B, missing QA, expired authority, S/G, insurer boundary, Indonesian evidence, training populations and future/unfunded controls.

**Ask before you start:** Who owns the legal interpretation? Where are approval and operating records kept? Who signs off the committee paper? Which requirements lie outside this scoped exercise?

**What is and is not validated:** the exact EN, ID and BM prompts were tested in the demo tenant on 4 October 2026. The final runs matched the key, the Excel formula counts and the unsigned two-page note. Earlier runs miscounted and mislabelled R05, so show the Excel Summary, not chat totals. Timing and impact are estimates; do not promise perfect source recall or claim that generated files automatically save in OneDrive. EN/ID/BM prompts retain the same Malaysian case and English classification labels.

**Close on judgement:** approved policy is not operational readiness. Compare every key and citation, check formula counts and the unsigned note, and obtain Head of Compliance sign-off before real use. Never send the training paper as a regulatory submission.
:::
