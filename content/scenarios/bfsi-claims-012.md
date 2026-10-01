---
id: bfsi-claims-012
title: { en: "Insurance claim file summary and next-action letter", id: "Ringkasan berkas klaim asuransi dan surat tindak lanjut", ms: "Ringkasan fail tuntutan insurans dan surat tindakan susulan" }
summary:
  en: "Summarise a motor claim file, check it against the checklist and the policy, and draft a letter requesting missing documents without deciding cover."
  id: "Ringkas berkas klaim kendaraan, periksa terhadap daftar dokumen dan polis, lalu susun surat permintaan dokumen yang kurang tanpa memutuskan pertanggungan."
  ms: "Ringkaskan fail tuntutan motor, semak berbanding senarai semak dan polisi, dan sediakan surat meminta dokumen yang kurang tanpa memutuskan perlindungan."
industry: [banking-insurance]
department: [operations]
persona: [claims-handler]
market: [ID, MY]
difficulty: 2
surface: [copilot-chat, word, outlook]
licence: [m365-copilot]
inputs:
  - { name: "Claim form, police report, workshop estimate, photos, registration", format: ".docx, .pdf, .xlsx", where: "Claim folder", count: "5-10" }
  - { name: "Policy schedule", format: ".docx or .pdf", where: "Policy system export", count: "1" }
  - { name: "Claims document checklist", format: ".docx", where: "Claims procedures library", count: "1" }
data: { sensitivity: "Confidential", customer_pii: true, signoff: "Claims Supervisor" }
impact: { baseline: "45 minutes per claim file", target: "10 minutes per claim file", evidence: estimated }
card:
  problem: "Each new claim file means reading six documents to find what is missing and what the policy says."
  output: "A claim summary, the missing documents, the excess that would apply, estimate items that may be excluded, and a letter to the policyholder."
limits:
  - "Copilot flags possible exclusions from the policy text. The coverage decision stays with the claims handler and assessor."
  - "Photos are not assessed. Damage assessment needs a surveyor."
  - "Claim files contain personal data. Work only in your insurer's Microsoft 365 tenant (UU PDP, PDPA)."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: the missing driving licence found, the unnamed driver matched to the extra excess in the schedule, the LED upgrade flagged under the betterment exclusion; no coverage decision; the bilingual letter quoted no cover, excess or amount. Photos held outside the attached files were listed as missing, now documented."
---

## Situation

Before a motor-claim assessment, check the claim form, police report, estimate, photos and registration against the policy and checklist. Identify missing evidence, driver restrictions, excess and exclusions, then draft the policyholder's follow-up.

## Steps

**1. Open the claim documents.** Make sure every file in the claim folder has been opened once in Word or Excel for the web, so Copilot can read it.

**2. Summarise and check.** In Copilot Chat, type `/` and pick every claim document, the policy schedule and the checklist, then run:

:::prompt
EN: Using the attached claim documents, summarise this claim: facts, driver, damage and estimate total. Check the documents received against the attached checklist and list anything missing. Check the driver against the named drivers in the policy schedule and state which excess would apply under the schedule. Check each estimate line against the policy exclusions and list any line that may not be covered, citing the clause. Do not make a coverage or payment decision.
ID: Dengan dokumen klaim terlampir, ringkas klaim ini: fakta, pengemudi, kerusakan, dan total estimasi. Periksa dokumen yang diterima terhadap daftar periksa terlampir dan sebutkan yang belum ada. Periksa pengemudi terhadap pengemudi yang disebut dalam ikhtisar polis dan sebutkan risiko sendiri yang berlaku menurut ikhtisar polis. Periksa setiap baris estimasi terhadap pengecualian polis dan sebutkan baris yang mungkin tidak ditanggung, dengan menyebut pasalnya. Jangan membuat keputusan pertanggungan atau pembayaran.
BM: Menggunakan dokumen tuntutan yang dilampirkan, ringkaskan tuntutan ini: fakta, pemandu, kerosakan dan jumlah anggaran. Semak dokumen yang diterima berbanding senarai semak yang dilampirkan dan senaraikan yang tiada. Semak pemandu berbanding pemandu yang dinamakan dalam jadual polisi dan nyatakan lebihan yang terpakai mengikut jadual. Semak setiap baris anggaran berbanding pengecualian polisi dan senaraikan baris yang mungkin tidak dilindungi, dengan menyebut klausanya. Jangan buat keputusan perlindungan atau pembayaran.
:::

**3. Draft the letter.** In the same chat:

:::prompt
EN: Draft a short, polite letter to the policyholder in Bahasa Indonesia and English requesting the missing documents, with the claim number. Say the claim is under review. Do not mention cover, excess or payment amounts.
ID: Susun surat singkat dan sopan kepada tertanggung dalam Bahasa Indonesia dan bahasa Inggris untuk meminta dokumen yang belum ada, dengan nomor klaim. Sebutkan bahwa klaim sedang ditinjau. Jangan menyebut pertanggungan, risiko sendiri, atau jumlah pembayaran.
BM: Sediakan surat ringkas dan sopan kepada pemegang polisi dalam Bahasa Melayu dan bahasa Inggeris untuk meminta dokumen yang tiada, dengan nombor tuntutan. Nyatakan tuntutan sedang disemak. Jangan sebut perlindungan, lebihan atau jumlah bayaran.
:::

Paste the letter into a new email in Outlook, check it, and send it from the claims mailbox.

## Check it

- The missing documents match your checklist exactly.
- The driver's name is compared with the named drivers in the schedule, and the excess quoted matches the schedule wording.
- Every possible exclusion cites a real clause in the policy.
- The letter confirms nothing about cover, excess or payment.
- Remove from the letter any document you already hold. In our test, photos kept outside the attached files were listed as missing and requested again.

## When it goes wrong

- **A document is reported missing that you can see in the folder.** It was not attached or not yet readable. Open it once in Word for the web and attach it again.
- **A document held in another system is reported missing.** Copilot sees only what you attach. Say in the prompt which documents are held elsewhere, for example: "The damage photos are in the claims system and count as received."
- **The letter promises payment or quotes the excess.** Delete that sentence. Keep "Do not mention cover, excess or payment amounts" in the prompt.
- **Copilot says an item "is not covered".** Rewrite it as "may not be covered under clause X, for assessor review". The decision is yours.

## Take it further

- **L4 Agent:** a claims procedures Q&A agent grounded on your claims manual and policy wordings.
- **L3 Scout:** every morning, check new claim folders against the checklist and draft the missing-document emails for review.

:::presenter
**Ask before you start:** How many new claims a day? Which documents are most often missing? Who decides cover?

**Demo kit:** a fictional motor claim with a driver who is not a named driver, a betterment item (LED headlamp upgrade) in the estimate, and a missing driving licence copy. The police report says a licence was shown, but no copy is on file.
:::
