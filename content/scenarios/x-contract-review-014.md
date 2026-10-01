---
id: x-contract-review-014
title: { en: "Contract review against your playbook", id: "Tinjauan kontrak terhadap playbook perusahaan", ms: "Semakan kontrak berbanding buku panduan syarikat" }
summary:
  en: "Review a 16,000-word vendor cloud agreement, its Order Forms and online terms against your 19-issue contract playbook in Word, then draft the vendor reply, the escalation memo for the General Counsel and a first mark-up with comments, without missing the clause that quietly overrides another."
  id: "Tinjau perjanjian cloud vendor 16.000 kata beserta Order Form dan syarat online-nya terhadap playbook kontrak 19 isu di Word, lalu susun balasan ke vendor, memo eskalasi untuk General Counsel, dan mark-up pertama dengan komentar, tanpa melewatkan pasal yang diam-diam mengesampingkan pasal lain."
  ms: "Semak perjanjian awan vendor 16,000 perkataan berserta Order Form dan terma dalam talian berbanding buku panduan kontrak 19 isu dalam Word, kemudian sediakan balasan kepada vendor, memo eskalasi untuk Penasihat Undang-undang Am dan penandaan pertama dengan komen, tanpa terlepas klausa yang mengatasi klausa lain secara senyap."
industry: [cross-industry]
department: [legal-compliance, procurement]
persona: [legal-counsel]
market: [ID, MY]
difficulty: 3
surface: [word]
licence: [m365-copilot]
inputs:
  - { name: "Vendor agreement: the MSA with its SLA and DPA schedules", format: ".docx", where: "Legal matter folder or the vendor's email", count: "1", kit: ["03_Tailspin_MSA_v4.2_ASEAN_with_Schedules.docx"], steps: [2, 3, 6] }
  - { name: "Order Forms and the vendor's online terms (printed on the day you review)", format: ".docx, .pdf", where: "Procurement folder", count: "2", kit: ["04_Tailspin_Order_Forms_TS-OF-2026-0417_0418.docx", "05_Tailspin_Service_Terms_v2026.3_printed.pdf"], steps: [2] }
  - { name: "Your contract playbook: positions, fallbacks, red lines and approvers", format: ".docx", where: "Legal library", count: "1", kit: ["06_Contract_Playbook_Cloud_SaaS_v3.1.docx"], steps: [2, 6] }
  - { name: "The vendor's cover note and the request from Procurement", format: ".docx or email", where: "Email", count: "2", kit: ["02_Email_Tailspin_cover_note.docx", "01_Email_Procurement_request_Tailspin_review.docx"], steps: [2] }
objective: "Find every clause in the vendor's contract that breaks your playbook, then send the vendor a clear reply and give your General Counsel a decision memo, in about 40 minutes instead of two days."
needs:
  - "Word for the web, with Copilot in the Word pane"
  - "Word desktop for the final redline (Review > Compare), step 8"
run_time: "Part A about 25 min, Part B about 15 min"
data: { sensitivity: "Confidential", customer_pii: false, signoff: "General Counsel before any red line is conceded; Legal Counsel before the mark-up goes out" }
impact: { baseline: "1.5 to 2 days of counsel time for a vendor MSA of this size", target: "Half a day, most of it verifying clauses and deciding positions", evidence: estimated }
card:
  problem: "The vendor sends its own contract four days before go-live. The risky terms are hidden: a clause that ranks your negotiated terms last, a web link, a 'notwithstanding' at the very end, and a breach clock that starts late."
  output: "A review of all 19 playbook issues with clause numbers, verdicts and approvers; a reply to the vendor; an escalation memo for the General Counsel; and a first mark-up with comments."
limits:
  - "A lawyer still decides. This is a first review, not legal advice. Check every clause number and approve every position before anything goes to the vendor."
  - "Check the redline in the file you send. In Word for the web, Copilot's changes show as tracked insertions and deletions, but in our test the downloaded .docx kept the insertions and dropped the deleted text. Mark up a copy and finish with Compare in Word desktop."
  - "Copilot only checks what your playbook covers. Issues missing from your playbook are not checked."
  - "Web terms change. Print the vendor's online terms on the day you review and attach that copy; Copilot cannot know what a link said last month."
source_refs:
  - "https://support.microsoft.com/en-us/word/welcome-to-copilot-in-word"
  - "https://adoption.microsoft.com/en-us/scenario-library/legal/"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-09-30
validation_note: "Run end to end in a demo tenant with the kit (MSA with schedules 16,400 words plus Order Forms, Service Terms and playbook) in Word for the web: the review matched the answer key on 19 of 19 issues in the final run, including the clause 22.14 override of the DPA cap, the order of precedence that ranks the negotiated Special Conditions last, the AI-training right inside the online terms and the missing insurance clause; the vendor reply grouped all points without revealing approvers or fallbacks; the memo gave one table per approver and a Bahasa Indonesia summary; the mark-up changed six clauses with six comments tagged by issue ID. Found: Word for the web shows the full redline, but the .docx downloaded from OneDrive kept only the tracked insertions; P12 came back once as Red line instead of Beyond fallback. Test report with screenshots kept by the author."
---

## Situation

**The deal.** Contoso Niaga needs Legal's review of a three-year cloud deal covering Indonesia and Malaysia. After a portal outage, IT wants to move on 1 November.

**The inputs.** The vendor sent an agreement, schedules, order forms and online terms. Procurement negotiated Jakarta hosting and a price freeze.

**The risks.** Hidden overrides weaken those wins, breach protections and notice timing; online terms allow AI training on your data. By Thursday, deliver the 19-issue review, vendor reply and escalation memo.

## Steps

**1. Get the kit ready.** Put the files in OneDrive and keep one clean copy of the contract.

1. Download the kit and upload all files to one OneDrive folder.
2. Open each file once in Word for the web.
3. Leave the vendor's original contract untouched. You compare against it in step 8.

**Part A: review and decide (about 25 minutes).** Always do this part. It gives you the review, the vendor reply and the memo, and it does not change the contract.

**2. Attach the other files to Copilot.** Open *03_Tailspin_MSA_v4.2_ASEAN_with_Schedules.docx* in Word for the web and select **Copilot**.

1. Add a sensitivity label if your organisation asks for one.
2. Select **Add and manage sources** > **Upload images and files**.
3. Attach *06_Contract_Playbook*, *04_Tailspin_Order_Forms*, *05_Tailspin_Service_Terms* and *02_Email_Tailspin_cover_note*.

**After you attach them:** you should see four file chips. Do not send anything before that.

**3. Review the contract against the playbook.** Run:

:::prompt
ABOUT: Builds the review record: a verdict and an approver for each of the 19 playbook issues, with clause references.
EN: Review this agreement (the MSA with Schedule 1 SLA and Schedule 2 DPA) for PT Contoso Niaga Nusantara Tbk against our playbook 06_Contract_Playbook_Cloud_SaaS_v3.1.
The Order Forms (04) and the printed Service Terms (05) are part of the same contract, so use them too.
Do not edit the document yet; answer here in chat.
Give me a Contract Review Record as a table with one row for each playbook issue, P01 to P19, in order: Issue | Clause(s) | What the contract says (short quote) | Verdict | Approver.
Use only these verdicts: Meets standard, Within fallback 1, Within fallback 2, Beyond fallback: escalate, Red line, Not addressed.
Rules:
Check the whole document, including both Schedules and every sub-clause of clause 22 (General).
If a clause says "notwithstanding" or otherwise overrides another clause, judge the issue on the overriding clause and cite both.
Check the order of precedence in clause 1.3 and say whether the Order Form Special Conditions actually win.
If nothing in the documents deals with an issue, write Not addressed. Do not assume.
Take the approver from the playbook.
After the table, list the red lines, then the items that need escalation grouped by approver.
ID: Tinjau perjanjian ini (MSA beserta Schedule 1 SLA dan Schedule 2 DPA) untuk PT Contoso Niaga Nusantara Tbk terhadap playbook kami 06_Contract_Playbook_Cloud_SaaS_v3.1.
Order Form (04) dan Service Terms yang dicetak (05) adalah bagian dari kontrak yang sama, jadi gunakan juga.
Jangan mengubah dokumen dulu; jawab di chat.
Buatkan Contract Review Record berupa tabel dengan satu baris untuk setiap isu playbook, P01 sampai P19, berurutan: Issue | Clause(s) | What the contract says (kutipan singkat) | Verdict | Approver.
Gunakan hanya verdict berikut: Meets standard, Within fallback 1, Within fallback 2, Beyond fallback: escalate, Red line, Not addressed.
Aturan:
Periksa seluruh dokumen, termasuk kedua Schedule dan setiap sub-pasal pasal 22 (General).
Jika suatu pasal menyebut "notwithstanding" atau mengesampingkan pasal lain, nilai isunya berdasarkan pasal yang mengesampingkan dan sebutkan keduanya.
Periksa urutan prioritas dokumen di pasal 1.3 dan nyatakan apakah Special Conditions di Order Form benar-benar berlaku.
Jika tidak ada ketentuan yang membahas suatu isu, tulis Not addressed. Jangan berasumsi.
Ambil approver dari playbook.
Setelah tabel, daftarkan red line, lalu isu yang perlu dieskalasi dikelompokkan per approver.
BM: Semak perjanjian ini (MSA berserta Schedule 1 SLA dan Schedule 2 DPA) untuk PT Contoso Niaga Nusantara Tbk berbanding buku panduan kami 06_Contract_Playbook_Cloud_SaaS_v3.1.
Order Form (04) dan Service Terms yang dicetak (05) ialah sebahagian daripada kontrak yang sama, jadi gunakan juga.
Jangan ubah dokumen lagi; jawab di sini dalam chat.
Berikan Contract Review Record dalam bentuk jadual dengan satu baris bagi setiap isu buku panduan, P01 hingga P19, mengikut susunan: Issue | Clause(s) | What the contract says (petikan ringkas) | Verdict | Approver.
Gunakan verdict ini sahaja: Meets standard, Within fallback 1, Within fallback 2, Beyond fallback: escalate, Red line, Not addressed.
Peraturan:
Semak seluruh dokumen, termasuk kedua-dua Schedule dan setiap subklausa klausa 22 (General).
Jika sesuatu klausa menyebut "notwithstanding" atau mengatasi klausa lain, nilai isu itu berdasarkan klausa yang mengatasi dan nyatakan kedua-duanya.
Semak susunan keutamaan dalam klausa 1.3 dan nyatakan sama ada Special Conditions dalam Order Form benar-benar terpakai.
Jika tiada peruntukan yang menyentuh sesuatu isu, tulis Not addressed. Jangan membuat andaian.
Ambil approver daripada buku panduan.
Selepas jadual, senaraikan red line, kemudian perkara yang perlu dieskalasi mengikut approver.
:::

**After you run it:** read three clauses yourself to confirm the table: 1.3, 22.14 and Schedule 2 clause 8.2. Then compare the verdicts with **Check it** below.

**4. Draft the reply to the vendor.** In the same chat, run:

:::prompt
ABOUT: Drafts the reply to the vendor's counsel, grouped by priority, without revealing your playbook or approvers.
EN: Don't edit the document. In chat, draft my reply to Priya Raman, Senior Counsel APAC at Tailspin, to her cover note (02_Email_Tailspin_cover_note) that the MSA is "largely non-negotiable". Base it on the review above.
Open by confirming we want to sign before 1 November and that the commercial terms are agreed.
Group our points: (1) must change before signature: the red lines; (2) need changes: the items beyond fallback; (3) can accept with small changes: the within-fallback items; (4) please add: anything the playbook requires that the contract does not address.
For each point: clause number, the problem in one sentence, and our proposed wording or position from the playbook model clause.
Explain why the Jakarta hosting and price hold in the Order Form Special Conditions do not work under clause 1.3 as drafted.
Do not mention our internal approvers, fallback positions or the playbook itself.
Propose a call on Wednesday 30 September or Thursday 1 October.
Firm, polite, no more than 650 words.
ID: Jangan mengubah dokumen. Di chat, susun balasan saya kepada Priya Raman, Senior Counsel APAC di Tailspin, atas cover note-nya (02_Email_Tailspin_cover_note) yang menyatakan MSA "largely non-negotiable". Dasarkan pada tinjauan di atas.
Awali dengan menegaskan bahwa kami ingin menandatangani sebelum 1 November dan ketentuan komersial sudah disepakati.
Kelompokkan poin kami: (1) harus diubah sebelum penandatanganan: red line; (2) perlu diubah: isu yang melampaui fallback; (3) dapat diterima dengan sedikit perubahan: isu yang masih dalam fallback; (4) mohon ditambahkan: apa pun yang diwajibkan playbook tetapi tidak diatur dalam kontrak.
Untuk setiap poin: nomor pasal, masalahnya dalam satu kalimat, dan usulan rumusan atau posisi kami dari model clause di playbook.
Jelaskan mengapa hosting Jakarta dan price hold di Special Conditions Order Form tidak berlaku berdasarkan pasal 1.3 seperti yang dirumuskan.
Jangan menyebut approver internal, posisi fallback, atau playbook itu sendiri.
Usulkan panggilan pada Rabu 30 September atau Kamis 1 Oktober.
Tegas, sopan, paling banyak 650 kata, dalam bahasa Inggris.
BM: Jangan ubah dokumen. Dalam chat, sediakan balasan saya kepada Priya Raman, Senior Counsel APAC di Tailspin, kepada nota iringannya (02_Email_Tailspin_cover_note) yang menyatakan MSA "largely non-negotiable". Asaskan pada semakan di atas.
Mulakan dengan mengesahkan bahawa kami mahu menandatangani sebelum 1 November dan terma komersial telah dipersetujui.
Kumpulkan perkara kami: (1) mesti diubah sebelum tandatangan: red line; (2) perlu diubah: perkara yang melepasi fallback; (3) boleh diterima dengan sedikit perubahan: perkara dalam fallback; (4) sila tambah: apa-apa yang dikehendaki buku panduan tetapi tidak disentuh dalam kontrak.
Bagi setiap perkara: nombor klausa, masalahnya dalam satu ayat, dan cadangan perkataan atau kedudukan kami daripada model clause dalam buku panduan.
Terangkan mengapa hosting Jakarta dan price hold dalam Special Conditions Order Form tidak berkesan di bawah klausa 1.3 seperti yang dirangka.
Jangan sebut approver dalaman, kedudukan fallback atau buku panduan itu sendiri.
Cadangkan panggilan pada Rabu 30 September atau Khamis 1 Oktober.
Tegas, sopan, tidak lebih daripada 650 perkataan, dalam bahasa Inggeris.
:::

**After you run it:** the email has four groups, explains why clause 1.3 cancels the Jakarta hosting and price freeze, and asks for an insurance clause. It never mentions your playbook.

**5. Draft the memo for the General Counsel.** In the same chat, run:

:::prompt
ABOUT: Drafts the internal memo for the General Counsel: one table per approver, the red lines and a Bahasa Indonesia summary.
EN: Don't edit the document. In chat, draft an internal escalation memo from me to Hendra Wijaya, General Counsel, cc Siti Rahmawati (Head of Legal), Andre Lawson (CFO), Indra Permana (CISO) and Cassandra Dunn (DPO), about the Tailspin contract before signature.
Start with a 3-sentence bottom line: can we sign on 1 November as drafted, and what must change first.
Then one short table per approver from the playbook: Issue | Clause | Risk to us in one sentence | What we are asking Tailspin for | Decision needed from you.
List red lines separately and say that only the President Director can accept a red line, on the General Counsel's recommendation, with Board Risk Committee notification.
Mention the item the contract does not address at all.
End with a 5-line summary in Bahasa Indonesia for the President Director.
Use only facts from this contract and the attached files.
ID: Jangan mengubah dokumen. Di chat, susun memo eskalasi internal dari saya kepada Hendra Wijaya, General Counsel, cc Siti Rahmawati (Head of Legal), Andre Lawson (CFO), Indra Permana (CISO) dan Cassandra Dunn (DPO), tentang kontrak Tailspin sebelum penandatanganan.
Mulai dengan kesimpulan tiga kalimat: apakah kita bisa menandatangani pada 1 November sesuai draf, dan apa yang harus diubah lebih dulu.
Lalu satu tabel singkat per approver dari playbook: Issue | Clause | Risiko bagi kita dalam satu kalimat | Yang kita minta dari Tailspin | Keputusan yang dibutuhkan dari Anda.
Daftarkan red line secara terpisah dan nyatakan bahwa hanya Presiden Direktur yang dapat menerima red line, atas rekomendasi General Counsel, dengan pemberitahuan kepada Board Risk Committee.
Sebutkan isu yang sama sekali tidak diatur dalam kontrak.
Akhiri dengan ringkasan 5 baris dalam Bahasa Indonesia untuk Presiden Direktur.
Gunakan hanya fakta dari kontrak ini dan file terlampir.
BM: Jangan ubah dokumen. Dalam chat, sediakan memo eskalasi dalaman daripada saya kepada Hendra Wijaya, General Counsel, sk Siti Rahmawati (Head of Legal), Andre Lawson (CFO), Indra Permana (CISO) dan Cassandra Dunn (DPO), tentang kontrak Tailspin sebelum tandatangan.
Mulakan dengan kesimpulan tiga ayat: bolehkah kita menandatangani pada 1 November seperti yang dirangka, dan apa yang mesti diubah dahulu.
Kemudian satu jadual ringkas bagi setiap approver daripada buku panduan: Issue | Clause | Risiko kepada kita dalam satu ayat | Apa yang kita minta daripada Tailspin | Keputusan yang diperlukan daripada anda.
Senaraikan red line secara berasingan dan nyatakan bahawa hanya Presiden Direktur boleh menerima red line, atas syor General Counsel, dengan pemberitahuan kepada Board Risk Committee.
Sebut perkara yang langsung tidak disentuh oleh kontrak.
Akhiri dengan ringkasan 5 baris dalam Bahasa Indonesia untuk Presiden Direktur.
Gunakan fakta daripada kontrak ini dan fail yang dilampirkan sahaja.
:::

**After you run it:** the memo lists five red lines, names insurance as missing and ends with five lines in Bahasa Indonesia. For a Malaysian approver, ask for Bahasa Melayu instead.

**Part B: mark up the contract (about 15 minutes).** Do this after Part A, when you are ready to send changes. You work on a copy, so the Part A review stays valid.

**6. Make a copy with Track Changes on.** Never edit the vendor's original.

1. Select **File** > **Save as** > **Save a copy**, and open the copy.
2. On the **Review** tab, set **Track Changes** to **Everyone**.
3. Open **Copilot** and attach *06_Contract_Playbook* again.

**7. Rewrite six clauses with comments.** Run:

:::prompt
ABOUT: Rewrites six clauses with the playbook's model wording and adds a comment tagged with the issue ID for each change.
EN: Now prepare our first mark-up to Tailspin. Track Changes is on.
Use the Model clause wording from the playbook 06_Contract_Playbook_Cloud_SaaS_v3.1 and change only these clauses:
(1) Clause 1.3: reverse the order of precedence so the Order Form (including its Special Conditions) prevails, then the Schedules, then the body of this Agreement, with the Online Terms last.
(2) Clause 1.4: the Online Terms apply only as the dated version 2026.3 attached at signature; later changes apply only if they do not reduce Customer's protections.
(3) Clause 22.14: delete it, and remove the reference to clause 22.14 in clause 13.4.
(4) Schedule 2 (DPA) clause 8.2: replace with the playbook P11 model clause.
(5) Clause 9.4: replace with the playbook P12 model clause on hosting location and transfers.
(6) Clause 13.1: remove loss or corruption of data, costs of restoring data and regulatory fines from the excluded losses.
Keep the defined terms and clause numbers exactly as they are. Do not change any other clause.
For each change, add a comment that starts with the playbook issue ID (for example "P10:") and gives the reason in one sentence.
ID: Sekarang siapkan mark-up pertama kami untuk Tailspin. Track Changes sudah aktif.
Gunakan rumusan Model clause dari playbook 06_Contract_Playbook_Cloud_SaaS_v3.1 dan ubah hanya pasal-pasal ini:
(1) Pasal 1.3: balik urutan prioritas sehingga Order Form (termasuk Special Conditions) yang berlaku lebih dulu, lalu Schedules, lalu isi Perjanjian ini, dan Online Terms paling akhir.
(2) Pasal 1.4: Online Terms hanya berlaku dalam versi bertanggal 2026.3 yang dilampirkan saat penandatanganan; perubahan selanjutnya hanya berlaku jika tidak mengurangi perlindungan Customer.
(3) Pasal 22.14: hapus, dan hapus rujukan ke pasal 22.14 di pasal 13.4.
(4) Schedule 2 (DPA) pasal 8.2: ganti dengan model clause P11 dari playbook.
(5) Pasal 9.4: ganti dengan model clause P12 dari playbook tentang lokasi hosting dan transfer.
(6) Pasal 13.1: hapus kehilangan atau kerusakan data, biaya pemulihan data, dan denda regulator dari daftar kerugian yang dikecualikan.
Pertahankan istilah yang didefinisikan dan nomor pasal persis seperti semula. Jangan ubah pasal lain.
Untuk setiap perubahan, tambahkan komentar yang diawali ID isu playbook (misalnya "P10:") dan berikan alasannya dalam satu kalimat bahasa Inggris.
BM: Sekarang sediakan penandaan pertama kami kepada Tailspin. Track Changes telah dihidupkan.
Gunakan perkataan Model clause daripada buku panduan 06_Contract_Playbook_Cloud_SaaS_v3.1 dan ubah klausa-klausa ini sahaja:
(1) Klausa 1.3: terbalikkan susunan keutamaan supaya Order Form (termasuk Special Conditions) diutamakan, kemudian Schedules, kemudian isi Perjanjian ini, dengan Online Terms paling akhir.
(2) Klausa 1.4: Online Terms terpakai hanya dalam versi bertarikh 2026.3 yang dilampirkan semasa tandatangan; perubahan kemudian terpakai hanya jika tidak mengurangkan perlindungan Customer.
(3) Klausa 22.14: padamkan, dan buang rujukan kepada klausa 22.14 dalam klausa 13.4.
(4) Schedule 2 (DPA) klausa 8.2: gantikan dengan model clause P11 daripada buku panduan.
(5) Klausa 9.4: gantikan dengan model clause P12 daripada buku panduan tentang lokasi hosting dan pemindahan.
(6) Klausa 13.1: buang kehilangan atau kerosakan data, kos memulihkan data dan denda pengawal selia daripada kerugian yang dikecualikan.
Kekalkan istilah yang ditakrifkan dan nombor klausa tepat seperti asal. Jangan ubah klausa lain.
Bagi setiap perubahan, tambah komen yang bermula dengan ID isu buku panduan (contohnya "P10:") dan berikan sebabnya dalam satu ayat bahasa Inggeris.
:::

**After you run it:** you see six comments, starting P01, P01, P09, P10, P11 and P12. Clause 22.14 is gone, and 13.4 no longer mentions it.

**8. Create the redline you send.** Word for the web shows Copilot's deletions, but the downloaded file may not keep them, so let Word desktop rebuild the redline.

1. Open the marked-up copy in Word desktop.
2. Select **Review** > **Compare** > **Compare Documents**.
3. Pick the vendor's original as the original and your copy as the revised document.
4. Send the result to the vendor. It shows every change and your comments.

## Check it

- **Verdict count:** **5 Red line**, **9 Beyond fallback**, **3 Within fallback 1**, **1 Meets standard**, **1 Not addressed**.
- **Red lines:** P01 terms ranking and online terms (1.3, 1.4); P02 English only, waiving Law 24/2009 (22.9); P10 data-breach cap (22.14 overrides DPA 12.1); P11 breach notice 7 business days after the vendor "confirms" (DPA 8.2); P13 AI training on your data (Service Terms 7.3).
- **Beyond fallback:** P03 36-month auto-renewal; P04 9% or CPI increases plus list-price reset; P06 suspension; P07 99.5% SLA as the only remedy; P09 data and fines excluded from losses; P12 data in any country; P14 14 days to exit; P15 all fees due on early exit; P17 vendor can assign freely.
- **Within fallback 1:** P08 12-month cap; P16 audits only for regulators or after an incident; P18 Singapore law and SIAC.
- **The hidden override:** P10 cites **both DPA 12.1 and MSA 22.14**. If it says "3x the cap, within policy", Copilot missed the last clause.
- **Your wins don't count yet:** the order form terms **do not win**. Jakarta hosting is overridden by 9.4 and the price freeze by 6.5.
- **Outside the contract:** P13 comes from the **Service Terms PDF**. If P13 says "Not addressed", the PDF was not attached.
- **Nothing made up:** P19 insurance is **Not addressed**. A row quoting an insurance clause is invented.
- **Not a problem:** P05 payment terms (**Meets standard**), the IP indemnity in 12.1 and force majeure in clause 18.
- **Approvers:** **CFO** for P03, P04, P15; **CISO** for P07, P14; **DPO** for P12; **Head of Legal** for P08, P16, P18, P19.

## When it goes wrong

- **Copilot edits the contract instead of answering.** Word's Copilot edits by default. Keep "Do not edit the document yet; answer here in chat" in the prompt. To undo, press **Undo** or restore from **File** > **Info** > **Version history**. (step 3)
- **P13 says Not addressed, or the order forms are ignored.** A file was not attached. Attach it and ask: "Also use the attached Service Terms; re-check P01, P04, P12 and P13." (step 2)
- **P12 shows Red line instead of Beyond fallback.** It happened in one of our runs. The vendor gives 10 days' notice of new subprocessors, but only to customers who subscribe. Both answers are defensible; the lawyer decides. (step 3)
- **A row is vague or quotes the wrong clause.** Long contracts get less attention in the middle. Ask about one issue: "Quote clause 22.14 in full and tell me which clauses it overrides." (step 3)
- **The vendor reply mentions "our playbook" or "fallback".** Keep the sentence "Do not mention our internal approvers, fallback positions or the playbook itself." (step 4)
- **The verdicts changed when you ran the review again.** Copilot reads the contract as it is now. If you marked up the original, restore it from Version history and do Part B on a copy. (step 6)
- **The downloaded file has no strike-through for clause 22.14.** Word for the web shows it, but in our test the saved .docx kept only the insertions. Finish with Compare Documents in Word desktop and send that file. (step 8)

## Take it further

- **Now with your own contract.** Use your own playbook. If it is a long list without approvers, ask Copilot in Word to turn it into a table with Standard, Fallback, Red line, Approver and Look for columns, and have your Head of Legal confirm it.
- **Track the negotiation.** When the vendor sends a second draft, attach your mark-up and ask: "Compare this draft with our mark-up: which changes did Tailspin accept, reject or change, and what new changes did they make?"
- **An agent for your legal team.** Put the playbook and past reviews in a SharePoint library and build a Copilot agent on it, so colleagues get a first answer before they come to Legal.
- **Save the prompt.** Save the step 3 prompt in Copilot's prompt gallery so every lawyer starts from the same review.

:::presenter
**Session length:** 45 minutes. **Setup:** kit in the presenter's OneDrive, each file opened once, the contract labelled, and a second copy of the contract for Part B.

1. Set the scene: 16,000 words, four documents, "non-negotiable", signature in four days. Ask the room where they would look first. (4 min)
2. Step 3 live. While it runs (about a minute), open the playbook and show one issue: standard, fallbacks, red line, approver, Look for. Then read the P10 row aloud and scroll to clause 22.14 to prove it. (10 min)
3. Point at P01: the Jakarta hosting Procurement won ranks last. Then P13: the AI-training right is in a PDF, not the contract. (5 min)
4. Step 4, the vendor reply. Show group 4 (insurance) and that the playbook is never mentioned. (6 min)
5. Step 5, the memo. Read the Bahasa Indonesia summary. (6 min)
6. Steps 6 to 8 on the copy with Track Changes on. Show the comments tagged P01 to P12, point out that the downloaded file loses the deletions, and show Compare in Word desktop. (10 min)
7. Close: the lawyer still decides every position; Copilot did the reading and the drafting. (4 min)
:::
