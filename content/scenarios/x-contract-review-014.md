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
  - { name: "Vendor agreement with its schedules (SLA, DPA)", format: ".docx", where: "Legal matter folder or the vendor's email", count: "1" }
  - { name: "Order Forms and the vendor's online terms (printed or saved as PDF on the day you review)", format: ".docx, text-based .pdf", where: "Procurement folder", count: "2 or more" }
  - { name: "Your contract playbook: positions, fallbacks, red lines, approvers", format: ".docx", where: "Legal library", count: "1" }
  - { name: "The vendor's cover note and the business request", format: ".docx or email", where: "Email", count: "2" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "General Counsel before any red line is conceded; Legal Counsel before the mark-up goes out" }
impact: { baseline: "1.5 to 2 days of counsel time for a vendor MSA of this size", target: "Half a day, most of it verifying clauses and deciding positions", evidence: estimated }
card:
  problem: "Vendor paper arrives four days before a go-live. The real terms sit in an order-of-precedence clause, a URL, a 'notwithstanding' at the end of the General clause and a DPA clock that starts at 'confirmation'. Procurement wants a list; the General Counsel wants a decision memo."
  output: "A Contract Review Record for all 19 playbook issues with clause references, verdicts and approvers; a reply to the vendor grouped by priority; an escalation memo per approver with a Bahasa Indonesia summary; and a first mark-up with a comment per change."
limits:
  - "This is a first review for a lawyer, not legal advice. A lawyer checks every clause reference and approves every position before anything goes to the vendor."
  - "When Copilot in Word edits with Track Changes on, the new text is tracked but the text it replaces or deletes is not kept. Mark up a copy and run Review > Compare in Word desktop against the vendor's original to get a full redline."
  - "Copilot checks what your playbook covers. Issues your playbook does not list are not checked, so keep the playbook complete."
  - "Online terms change. Print or save the vendor's web terms on the day you review and attach that copy; Copilot cannot tell what a URL said last month."
  - "Contracts are confidential. Work only in your organisation's Microsoft 365 tenant, never in consumer AI tools."
source_refs:
  - "https://support.microsoft.com/en-us/word/welcome-to-copilot-in-word"
  - "https://adoption.microsoft.com/en-us/scenario-library/legal/"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
status: validated
validated_on: 2026-09-30
validation_note: "Run end to end in a demo tenant with the kit (MSA with schedules 16,400 words plus Order Forms, Service Terms and playbook) in Word for the web: the review matched the answer key on 19 of 19 issues in the final run, including the clause 22.14 override of the DPA cap, the order of precedence that ranks the negotiated Special Conditions last, the AI-training right inside the online terms and the missing insurance clause; the vendor reply grouped all points without revealing approvers or fallbacks; the memo gave one table per approver and a Bahasa Indonesia summary; the mark-up changed six clauses with six comments tagged by issue ID. Found: deleted text is not kept as a tracked deletion; P12 came back once as Red line instead of Beyond fallback."
---

## Situation

It is Monday 28 September, 09:05. You are Legal Counsel (Commercial) at PT Contoso Niaga Nusantara Tbk, a listed distribution group with a Malaysian subsidiary. Procurement has agreed a three-year managed cloud deal with Tailspin Cloud Services in Singapore: USD 1,080,000 a year for the Indonesian parent and USD 144,000 for the Malaysian hub. Portal Mitra, the ordering portal for 1,200 retail partners, went down in September, and IT wants the migration to start on 1 November.

The vendor sent its standard ASEAN paper: a 22-clause Master Subscription and Managed Services Agreement, an SLA, a Data Processing Addendum, two Order Forms and a link to online Service Terms. Their counsel says it is "largely non-negotiable". Procurement is proud of two things it won in the Order Forms: Jakarta hosting and a price hold.

Your playbook has 19 issues, each with a standard, fallbacks, a red line and an approver. You need the review record, a reply to the vendor and an escalation memo by Thursday. The traps are the ones vendor paper always has: an order of precedence that puts the negotiated terms last, a "notwithstanding" at the end of the General clause, a breach-notice clock that starts when the vendor "confirms", and a clause about AI training that is not in the agreement at all.

## Steps

**1. Get the kit ready.** Download the kit and upload the files to one OneDrive folder. Open each file once in Word for the web. Keep an untouched copy of the agreement; you will need it for the redline in step 6.

**2. Open Copilot in the agreement and attach the rest.** Open *03_Tailspin_MSA_v4.2_ASEAN_with_Schedules.docx* in Word for the web, add a sensitivity label if your organisation asks for one, and select **Copilot**. Select **Add and manage sources** > **Upload images and files** (or **Attach cloud files**) and attach *06_Contract_Playbook*, *04_Tailspin_Order_Forms*, *05_Tailspin_Service_Terms* and *02_Email_Tailspin_cover_note*. Count the four file chips before you send anything.

**3. Build the Contract Review Record.** Run:

:::prompt
EN: Review this agreement (the MSA with Schedule 1 SLA and Schedule 2 DPA) for PT Contoso Niaga Nusantara Tbk against our playbook 06_Contract_Playbook_Cloud_SaaS_v3.1. The Order Forms (04) and the printed Service Terms (05) are part of the same contract, so use them too. Do not edit the document yet; answer here in chat. Give me a Contract Review Record as a table with one row for each playbook issue, P01 to P19, in order: Issue | Clause(s) | What the contract says (short quote) | Verdict | Approver. Use only these verdicts: Meets standard, Within fallback 1, Within fallback 2, Beyond fallback: escalate, Red line, Not addressed. Rules: Check the whole document, including both Schedules and every sub-clause of clause 22 (General). If a clause says "notwithstanding" or otherwise overrides another clause, judge the issue on the overriding clause and cite both. Check the order of precedence in clause 1.3 and say whether the Order Form Special Conditions actually win. If nothing in the documents deals with an issue, write Not addressed. Do not assume. Take the approver from the playbook. After the table, list the red lines, then the items that need escalation grouped by approver.
ID: Tinjau perjanjian ini (MSA beserta Schedule 1 SLA dan Schedule 2 DPA) untuk PT Contoso Niaga Nusantara Tbk terhadap playbook kami 06_Contract_Playbook_Cloud_SaaS_v3.1. Order Form (04) dan Service Terms yang dicetak (05) adalah bagian dari kontrak yang sama, jadi gunakan juga. Jangan mengubah dokumen dulu; jawab di chat. Buatkan Contract Review Record berupa tabel dengan satu baris untuk setiap isu playbook, P01 sampai P19, berurutan: Issue | Clause(s) | What the contract says (kutipan singkat) | Verdict | Approver. Gunakan hanya verdict berikut: Meets standard, Within fallback 1, Within fallback 2, Beyond fallback: escalate, Red line, Not addressed. Aturan: Periksa seluruh dokumen, termasuk kedua Schedule dan setiap sub-pasal pasal 22 (General). Jika suatu pasal menyebut "notwithstanding" atau mengesampingkan pasal lain, nilai isunya berdasarkan pasal yang mengesampingkan dan sebutkan keduanya. Periksa urutan prioritas dokumen di pasal 1.3 dan nyatakan apakah Special Conditions di Order Form benar-benar berlaku. Jika tidak ada ketentuan yang membahas suatu isu, tulis Not addressed. Jangan berasumsi. Ambil approver dari playbook. Setelah tabel, daftarkan red line, lalu isu yang perlu dieskalasi dikelompokkan per approver.
BM: Semak perjanjian ini (MSA berserta Schedule 1 SLA dan Schedule 2 DPA) untuk PT Contoso Niaga Nusantara Tbk berbanding buku panduan kami 06_Contract_Playbook_Cloud_SaaS_v3.1. Order Form (04) dan Service Terms yang dicetak (05) ialah sebahagian daripada kontrak yang sama, jadi gunakan juga. Jangan ubah dokumen lagi; jawab di sini dalam chat. Berikan Contract Review Record dalam bentuk jadual dengan satu baris bagi setiap isu buku panduan, P01 hingga P19, mengikut susunan: Issue | Clause(s) | What the contract says (petikan ringkas) | Verdict | Approver. Gunakan verdict ini sahaja: Meets standard, Within fallback 1, Within fallback 2, Beyond fallback: escalate, Red line, Not addressed. Peraturan: Semak seluruh dokumen, termasuk kedua-dua Schedule dan setiap subklausa klausa 22 (General). Jika sesuatu klausa menyebut "notwithstanding" atau mengatasi klausa lain, nilai isu itu berdasarkan klausa yang mengatasi dan nyatakan kedua-duanya. Semak susunan keutamaan dalam klausa 1.3 dan nyatakan sama ada Special Conditions dalam Order Form benar-benar terpakai. Jika tiada peruntukan yang menyentuh sesuatu isu, tulis Not addressed. Jangan membuat andaian. Ambil approver daripada buku panduan. Selepas jadual, senaraikan red line, kemudian perkara yang perlu dieskalasi mengikut approver.
:::

Before you go on, pick three rows and read the clauses yourself: 1.3, 22.14 and Schedule 2 clause 8.2 are good ones.

**4. Draft the reply to the vendor.** In the same chat, run:

:::prompt
EN: Don't edit the document. In chat, draft my reply to Priya Raman, Senior Counsel APAC at Tailspin, to her cover note (02_Email_Tailspin_cover_note) that the MSA is "largely non-negotiable". Base it on the review above. Open by confirming we want to sign before 1 November and that the commercial terms are agreed. Group our points: (1) must change before signature: the red lines; (2) need changes: the items beyond fallback; (3) can accept with small changes: the within-fallback items; (4) please add: anything the playbook requires that the contract does not address. For each point: clause number, the problem in one sentence, and our proposed wording or position from the playbook model clause. Explain why the Jakarta hosting and price hold in the Order Form Special Conditions do not work under clause 1.3 as drafted. Do not mention our internal approvers, fallback positions or the playbook itself. Propose a call on Wednesday 30 September or Thursday 1 October. Firm, polite, no more than 650 words.
ID: Jangan mengubah dokumen. Di chat, susun balasan saya kepada Priya Raman, Senior Counsel APAC di Tailspin, atas cover note-nya (02_Email_Tailspin_cover_note) yang menyatakan MSA "largely non-negotiable". Dasarkan pada tinjauan di atas. Awali dengan menegaskan bahwa kami ingin menandatangani sebelum 1 November dan ketentuan komersial sudah disepakati. Kelompokkan poin kami: (1) harus diubah sebelum penandatanganan: red line; (2) perlu diubah: isu yang melampaui fallback; (3) dapat diterima dengan sedikit perubahan: isu yang masih dalam fallback; (4) mohon ditambahkan: apa pun yang diwajibkan playbook tetapi tidak diatur dalam kontrak. Untuk setiap poin: nomor pasal, masalahnya dalam satu kalimat, dan usulan rumusan atau posisi kami dari model clause di playbook. Jelaskan mengapa hosting Jakarta dan price hold di Special Conditions Order Form tidak berlaku berdasarkan pasal 1.3 seperti yang dirumuskan. Jangan menyebut approver internal, posisi fallback, atau playbook itu sendiri. Usulkan panggilan pada Rabu 30 September atau Kamis 1 Oktober. Tegas, sopan, paling banyak 650 kata, dalam bahasa Inggris.
BM: Jangan ubah dokumen. Dalam chat, sediakan balasan saya kepada Priya Raman, Senior Counsel APAC di Tailspin, kepada nota iringannya (02_Email_Tailspin_cover_note) yang menyatakan MSA "largely non-negotiable". Asaskan pada semakan di atas. Mulakan dengan mengesahkan bahawa kami mahu menandatangani sebelum 1 November dan terma komersial telah dipersetujui. Kumpulkan perkara kami: (1) mesti diubah sebelum tandatangan: red line; (2) perlu diubah: perkara yang melepasi fallback; (3) boleh diterima dengan sedikit perubahan: perkara dalam fallback; (4) sila tambah: apa-apa yang dikehendaki buku panduan tetapi tidak disentuh dalam kontrak. Bagi setiap perkara: nombor klausa, masalahnya dalam satu ayat, dan cadangan perkataan atau kedudukan kami daripada model clause dalam buku panduan. Terangkan mengapa hosting Jakarta dan price hold dalam Special Conditions Order Form tidak berkesan di bawah klausa 1.3 seperti yang dirangka. Jangan sebut approver dalaman, kedudukan fallback atau buku panduan itu sendiri. Cadangkan panggilan pada Rabu 30 September atau Khamis 1 Oktober. Tegas, sopan, tidak lebih daripada 650 perkataan, dalam bahasa Inggeris.
:::

**5. Draft the escalation memo.** In the same chat, run:

:::prompt
EN: Don't edit the document. In chat, draft an internal escalation memo from me to Hendra Wijaya, General Counsel, cc Siti Rahmawati (Head of Legal), Andre Lawson (CFO), Indra Permana (CISO) and Cassandra Dunn (DPO), about the Tailspin contract before signature. Start with a 3-sentence bottom line: can we sign on 1 November as drafted, and what must change first. Then one short table per approver from the playbook: Issue | Clause | Risk to us in one sentence | What we are asking Tailspin for | Decision needed from you. List red lines separately and say that only the President Director can accept a red line, on the General Counsel's recommendation, with Board Risk Committee notification. Mention the item the contract does not address at all. End with a 5-line summary in Bahasa Indonesia for the President Director. Use only facts from this contract and the attached files.
ID: Jangan mengubah dokumen. Di chat, susun memo eskalasi internal dari saya kepada Hendra Wijaya, General Counsel, cc Siti Rahmawati (Head of Legal), Andre Lawson (CFO), Indra Permana (CISO) dan Cassandra Dunn (DPO), tentang kontrak Tailspin sebelum penandatanganan. Mulai dengan kesimpulan tiga kalimat: apakah kita bisa menandatangani pada 1 November sesuai draf, dan apa yang harus diubah lebih dulu. Lalu satu tabel singkat per approver dari playbook: Issue | Clause | Risiko bagi kita dalam satu kalimat | Yang kita minta dari Tailspin | Keputusan yang dibutuhkan dari Anda. Daftarkan red line secara terpisah dan nyatakan bahwa hanya Presiden Direktur yang dapat menerima red line, atas rekomendasi General Counsel, dengan pemberitahuan kepada Board Risk Committee. Sebutkan isu yang sama sekali tidak diatur dalam kontrak. Akhiri dengan ringkasan 5 baris dalam Bahasa Indonesia untuk Presiden Direktur. Gunakan hanya fakta dari kontrak ini dan file terlampir.
BM: Jangan ubah dokumen. Dalam chat, sediakan memo eskalasi dalaman daripada saya kepada Hendra Wijaya, General Counsel, sk Siti Rahmawati (Head of Legal), Andre Lawson (CFO), Indra Permana (CISO) dan Cassandra Dunn (DPO), tentang kontrak Tailspin sebelum tandatangan. Mulakan dengan kesimpulan tiga ayat: bolehkah kita menandatangani pada 1 November seperti yang dirangka, dan apa yang mesti diubah dahulu. Kemudian satu jadual ringkas bagi setiap approver daripada buku panduan: Issue | Clause | Risiko kepada kita dalam satu ayat | Apa yang kita minta daripada Tailspin | Keputusan yang diperlukan daripada anda. Senaraikan red line secara berasingan dan nyatakan bahawa hanya Presiden Direktur boleh menerima red line, atas syor General Counsel, dengan pemberitahuan kepada Board Risk Committee. Sebut perkara yang langsung tidak disentuh oleh kontrak. Akhiri dengan ringkasan 5 baris dalam Bahasa Indonesia untuk Presiden Direktur. Gunakan fakta daripada kontrak ini dan fail yang dilampirkan sahaja.
:::

For a Malaysian approver, change the last line to "a 5-line summary in Bahasa Melayu".

**6. Prepare the first mark-up on a copy.** Save a copy of the agreement (**File** > **Save as** > **Save a copy**) and open the copy. On the **Review** tab, set **Track Changes** to **Everyone**. Open **Copilot**, attach the playbook again, then run:

:::prompt
EN: Now prepare our first mark-up to Tailspin. Track Changes is on. Use the Model clause wording from the playbook 06_Contract_Playbook_Cloud_SaaS_v3.1 and change only these clauses: 1. Clause 1.3: reverse the order of precedence so the Order Form (including its Special Conditions) prevails, then the Schedules, then the body of this Agreement, with the Online Terms last. 2. Clause 1.4: the Online Terms apply only as the dated version 2026.3 attached at signature; later changes apply only if they do not reduce Customer's protections. 3. Clause 22.14: delete it, and remove the reference to clause 22.14 in clause 13.4. 4. Schedule 2 (DPA) clause 8.2: replace with the playbook P11 model clause. 5. Clause 9.4: replace with the playbook P12 model clause on hosting location and transfers. 6. Clause 13.1: remove loss or corruption of data, costs of restoring data and regulatory fines from the excluded losses. Keep the defined terms and clause numbers exactly as they are. Do not change any other clause. For each change, add a comment that starts with the playbook issue ID (for example "P10:") and gives the reason in one sentence.
ID: Sekarang siapkan mark-up pertama kami untuk Tailspin. Track Changes sudah aktif. Gunakan rumusan Model clause dari playbook 06_Contract_Playbook_Cloud_SaaS_v3.1 dan ubah hanya pasal-pasal ini: 1. Pasal 1.3: balik urutan prioritas sehingga Order Form (termasuk Special Conditions) yang berlaku lebih dulu, lalu Schedules, lalu isi Perjanjian ini, dan Online Terms paling akhir. 2. Pasal 1.4: Online Terms hanya berlaku dalam versi bertanggal 2026.3 yang dilampirkan saat penandatanganan; perubahan selanjutnya hanya berlaku jika tidak mengurangi perlindungan Customer. 3. Pasal 22.14: hapus, dan hapus rujukan ke pasal 22.14 di pasal 13.4. 4. Schedule 2 (DPA) pasal 8.2: ganti dengan model clause P11 dari playbook. 5. Pasal 9.4: ganti dengan model clause P12 dari playbook tentang lokasi hosting dan transfer. 6. Pasal 13.1: hapus kehilangan atau kerusakan data, biaya pemulihan data, dan denda regulator dari daftar kerugian yang dikecualikan. Pertahankan istilah yang didefinisikan dan nomor pasal persis seperti semula. Jangan ubah pasal lain. Untuk setiap perubahan, tambahkan komentar yang diawali ID isu playbook (misalnya "P10:") dan berikan alasannya dalam satu kalimat bahasa Inggris.
BM: Sekarang sediakan penandaan pertama kami kepada Tailspin. Track Changes telah dihidupkan. Gunakan perkataan Model clause daripada buku panduan 06_Contract_Playbook_Cloud_SaaS_v3.1 dan ubah klausa-klausa ini sahaja: 1. Klausa 1.3: terbalikkan susunan keutamaan supaya Order Form (termasuk Special Conditions) diutamakan, kemudian Schedules, kemudian isi Perjanjian ini, dengan Online Terms paling akhir. 2. Klausa 1.4: Online Terms terpakai hanya dalam versi bertarikh 2026.3 yang dilampirkan semasa tandatangan; perubahan kemudian terpakai hanya jika tidak mengurangkan perlindungan Customer. 3. Klausa 22.14: padamkan, dan buang rujukan kepada klausa 22.14 dalam klausa 13.4. 4. Schedule 2 (DPA) klausa 8.2: gantikan dengan model clause P11 daripada buku panduan. 5. Klausa 9.4: gantikan dengan model clause P12 daripada buku panduan tentang lokasi hosting dan pemindahan. 6. Klausa 13.1: buang kehilangan atau kerosakan data, kos memulihkan data dan denda pengawal selia daripada kerugian yang dikecualikan. Kekalkan istilah yang ditakrifkan dan nombor klausa tepat seperti asal. Jangan ubah klausa lain. Bagi setiap perubahan, tambah komen yang bermula dengan ID isu buku panduan (contohnya "P10:") dan berikan sebabnya dalam satu ayat bahasa Inggeris.
:::

Then open the copy in Word desktop and use **Review** > **Compare** > **Compare Documents** with the vendor's original as the original document. The compared document shows every insertion and deletion; send that one.

## Check it

The answer key for the kit (19 issues):

| Verdict | Issues |
|---|---|
| Red line (5) | P01 order of precedence and online terms (1.3, 1.4); P02 English-only with a waiver of Law 24/2009 (22.9); P10 data-breach cap: 22.14 overrides the DPA's 3x cap with three months of fees; P11 breach notice 7 Business Days after the vendor "confirms" (DPA 8.2); P13 AI training on Customer Content (Service Terms 7.3) |
| Beyond fallback: escalate (9) | P03 36-month auto-renewal; P04 9% or CPI plus list-price reset; P06 suspension; P07 99.5% SLA as sole remedy; P09 excluded losses include data and fines; P12 any-country processing and subprocessors; P14 14-day exit; P15 convenience termination with all fees due; P17 vendor may assign freely |
| Within fallback 1 (3) | P08 12-month cap; P16 audit only for regulators or after an incident; P18 Singapore law and SIAC |
| Meets standard (1) | P05 payment 30 days after receipt of a correct invoice |
| Not addressed (1) | P19 insurance |

- **The override:** P10 must cite both DPA 12.1 and MSA 22.14. If it says "3x the cap, within policy", Copilot missed the last clause of the General section.
- **Precedence:** the answer must say the Special Conditions do not win. Jakarta hosting (SC-1) is displaced by 9.4 and the price hold (SC-2) by 6.5.
- **Outside the agreement:** P13 comes from the Service Terms PDF, not the MSA. If P13 says "not addressed", the Service Terms were not attached.
- **Nothing invented:** P19 must be Not addressed. A row that quotes an insurance clause is a hallucination.
- **Red herrings:** P05 payment terms, the IP indemnity in 12.1 and the force majeure in clause 18 are fine. They should not be flagged.
- **Approvers:** CFO for P03, P04 and P15; CISO for P07 and P14; DPO for P12; Head of Legal for P08, P16, P18 and P19.
- **Vendor reply:** four groups, the precedence explanation, insurance under "please add", and no mention of approvers, fallbacks or the playbook.
- **Mark-up:** six changes, six comments starting P01, P01, P09, P10, P11 and P12, and no stray reference to 22.14 left in 13.4.

## When it goes wrong

- **Copilot starts editing when you wanted a table.** Word's Copilot pane edits by default. Keep "Do not edit the document yet; answer here in chat" in the prompt. If it edited anyway, press **Undo** or restore the version from **File** > **Info** > **Version history**.
- **The deleted clause 22.14 is simply gone, with no red strike-through.** Copilot keeps its new text as tracked insertions but does not keep what it deleted or replaced. That is why step 6 works on a copy and ends with Compare Documents.
- **P12 comes back as Red line instead of Beyond fallback.** In one of our runs it did. The red line is "unrestricted transfers with no notice of new subprocessors"; the contract gives 10 days' email notice, but only to customers who subscribe. Both readings are defensible; it is your call as the lawyer. That is why a lawyer signs off.
- **A row is vague, or quotes the wrong clause.** Long agreements get less attention in the middle. Ask about one issue at a time: "Quote clause 22.14 in full and tell me which clauses it overrides."
- **You ran the review after the mark-up and the verdicts changed.** Copilot reads the document as it is now. Run the review, the reply and the memo on the vendor's original; do the mark-up last, on a copy.
- **The Order Forms or Service Terms are ignored.** Count the file chips before sending. If one is missing, attach it and say "Also use the attached Service Terms; re-check P01, P04, P12 and P13."
- **The vendor reply mentions "our playbook" or "fallback".** Keep the sentence "Do not mention our internal approvers, fallback positions or the playbook itself."

## Take it further

- **Now with your own contract.** Use your own playbook. If it is a long list without approvers, first ask Copilot in Word to turn it into a table with Standard, Fallback, Red line, Approver and Look for columns, and have your Head of Legal confirm it.
- **Track the negotiation.** When the vendor sends its second draft, attach your first mark-up and ask: "Compare this draft with our mark-up: which of our changes did Tailspin accept, reject or change, and which new changes did they make?"
- **Agent for the legal team.** Put the playbook and past review records in a SharePoint library and build a Copilot agent grounded on it, so business users get a first answer before they come to Legal.
- **Save a prompt.** Save the step 3 prompt in Copilot's prompt gallery so every counsel starts from the same review format.

:::presenter
**Session length:** 45 minutes. **Setup:** kit uploaded to the presenter's OneDrive, each file opened once, the agreement labelled, and a second copy of the agreement for the mark-up.

1. Set the scene: 16,000 words, four documents, the vendor says "non-negotiable", signature in four days. Ask the room where they would look first. (4 min)
2. Step 3 live. While it runs (about a minute), open the playbook and show one issue: standard, fallbacks, red line, approver, Look for. Then read the P10 row aloud and scroll to clause 22.14 to prove it. (10 min)
3. Point at P01: the Jakarta hosting Procurement won is ranked last. Then P13: the AI-training right is in a PDF, not the agreement. (5 min)
4. Step 4, the vendor reply. Show group 4 (insurance) and that the playbook is never mentioned. (6 min)
5. Step 5, the memo. Read the Bahasa Indonesia summary. (6 min)
6. Step 6 on the copy with Track Changes on. Show the comments tagged P01 to P12, then point out that deleted text is not kept, and show Compare in Word desktop. (10 min)
7. Close: the lawyer still decides every position; Copilot did the reading and the drafting. (4 min)
:::