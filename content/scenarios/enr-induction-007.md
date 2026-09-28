---
id: enr-induction-007
title: { en: "Bilingual contractor safety induction deck", id: "Deck induksi keselamatan kontraktor dua bahasa", ms: "Dek induksi keselamatan kontraktor dwibahasa" }
summary:
  en: "Turn the current site HSE rules into a Bahasa and English induction deck with a quiz, without teaching rules that were superseded."
  id: "Ubah aturan K3 lokasi yang berlaku menjadi deck induksi Bahasa dan Inggris lengkap dengan kuis, tanpa memuat aturan yang sudah diganti."
  ms: "Tukar peraturan KKP tapak semasa kepada dek induksi Bahasa dan Inggeris dengan kuiz, tanpa mengajar peraturan yang telah digantikan."
industry: [energy-resources]
department: [hse, operations]
persona: [hse-officer, site-manager]
market: [ID, MY]
difficulty: 1
surface: [copilot-chat, powerpoint]
licence: [m365-copilot]
inputs:
  - { name: "Site HSE rules (current revision)", format: ".docx", where: "HSE document library", count: "1" }
data: { sensitivity: "Internal", customer_pii: false, signoff: "Site HSE Manager" }
impact: { baseline: "1-2 days to rebuild the deck after each rule change", target: "30 minutes plus review", evidence: estimated }
card:
  problem: "Contractors arrive every week, and the induction deck still shows last year's speed limit."
  output: "A 10-slide bilingual induction deck built from the current rules only, with a 5-question quiz and answers in the speaker notes."
limits:
  - "Copilot reads the whole document, including change logs. Tell it to use the current rules only."
  - "Company slide templates and logos are not applied automatically. Paste the slides into your template afterwards."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: 10 slides, every current value correct, none of the three superseded values used. The first deck said the quiz answers were in the speaker notes but the notes were empty; the follow-up prompt fixed it."
---

## Situation

Every mine and plantation site inducts new contractors before they enter the site. The HSE officer keeps an induction deck, but when the site rules change it is rebuilt by hand, and old numbers survive on some slides. Contractors need the rules in Bahasa and in English.

## Steps

**1. Open the current rules.** Make sure the file in OneDrive is the current revision, and open it once in Word for the web.

**2. Create the deck.** In Copilot Chat, type `/` and pick the rules document, then run:

:::prompt
EN: Create a 10-slide PowerPoint contractor safety induction from this document. Use only the current rules; ignore the change log and any superseded values. One rule or topic per slide, with the text in Bahasa Indonesia first and English below. Keep every number, time and place exactly as written. End with a 5-question quiz slide, and put the answers in the speaker notes.
ID: Buat PowerPoint induksi keselamatan kontraktor 10 slide dari dokumen ini. Gunakan hanya aturan yang berlaku; abaikan catatan perubahan dan nilai yang sudah diganti. Satu aturan atau topik per slide, teks dalam Bahasa Indonesia terlebih dahulu dan bahasa Inggris di bawahnya. Pertahankan setiap angka, waktu, dan lokasi persis seperti tertulis. Akhiri dengan slide kuis 5 pertanyaan, dan letakkan jawabannya di catatan pembicara.
BM: Bina PowerPoint induksi keselamatan kontraktor 10 slaid daripada dokumen ini. Gunakan peraturan semasa sahaja; abaikan log perubahan dan sebarang nilai yang telah digantikan. Satu peraturan atau topik bagi setiap slaid, dengan teks dalam Bahasa Melayu dahulu dan bahasa Inggeris di bawahnya. Kekalkan setiap angka, masa dan lokasi tepat seperti yang ditulis. Akhiri dengan slaid kuiz 5 soalan, dan letakkan jawapannya dalam nota penceramah.
:::

**3. Review and brand.** Open the deck, compare every number with the rules table, then paste the slides into your site template.

## Check it

- Every number, time and place on the slides matches the current rules table exactly.
- Search the deck for the old values listed in the change log. None should appear.
- Open the speaker notes of the quiz slide and read them. In validation, the slide said "answers are in the speaker notes" but the notes were empty the first time.

## When it goes wrong

- **An old value appears on a slide.** Copilot picked it up from the change log. Re-run with the instruction to ignore the change log, or remove the change log from a copy of the document.
- **The Bahasa text is a literal translation that reads awkwardly.** Ask a native speaker on site to review the Bahasa lines before first use.
- **The deck has fewer slides than asked.** Ask Copilot to split the densest slide in two.
- **The quiz slide points to the speaker notes, but they are empty.** Run the follow-up below in the same chat.

:::prompt
EN: The speaker notes of the quiz slide are empty. Put the five quiz answers, in Bahasa Indonesia and English, into the speaker notes of the quiz slide, and save the deck again.
ID: Catatan pembicara pada slide kuis kosong. Masukkan lima jawaban kuis, dalam Bahasa Indonesia dan bahasa Inggris, ke catatan pembicara slide kuis, lalu simpan ulang deck-nya.
BM: Nota penceramah pada slaid kuiz kosong. Masukkan lima jawapan kuiz, dalam Bahasa Melayu dan bahasa Inggeris, ke dalam nota penceramah slaid kuiz, dan simpan semula dek itu.
:::

## Take it further

- **L2 Copilot Chat:** ask for a one-page printable version of the rules for the gate.
- **L4 Agent:** an induction Q&A agent grounded on the current rules, for contractors to ask questions in Bahasa.

:::presenter
**Ask before you start:** How many contractors do you induct each month? Who approves a new revision of the site rules?

**Timing on the validation run:** deck about 2 minutes, notes fix about 2 minutes.

**Demo kit:** fictional site rules (Revision 4) with a change log that still lists three superseded values: 40 km/h, 8 hours rest, and Muster Point B. Show that the deck uses 30 km/h, 10 hours and Muster Point A.
:::
