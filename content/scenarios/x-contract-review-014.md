---
id: x-contract-review-014
title: { en: "Contract review against your playbook", id: "Tinjauan kontrak terhadap playbook perusahaan", ms: "Semakan kontrak berbanding buku panduan syarikat" }
summary:
  en: "First-pass review of a vendor contract against your contract playbook, including clauses that quietly override others, with suggested redlines for the lawyer."
  id: "Tinjauan awal kontrak vendor terhadap playbook kontrak Anda, termasuk pasal yang diam-diam mengesampingkan pasal lain, dengan usulan redline untuk pengacara."
  ms: "Semakan awal kontrak vendor berbanding buku panduan kontrak anda, termasuk klausa yang mengatasi klausa lain secara senyap, dengan cadangan pindaan untuk peguam."
industry: [cross-industry]
department: [legal-compliance, procurement]
persona: [legal-counsel]
market: [ID, MY]
difficulty: 3
surface: [copilot-chat, word]
licence: [m365-copilot]
inputs:
  - { name: "Vendor contract", format: ".docx or text-based .pdf", where: "Legal matters folder", count: "1" }
  - { name: "Contract playbook (standard and fallback positions)", format: ".docx", where: "Legal library", count: "1" }
data: { sensitivity: "Confidential", customer_pii: false, signoff: "Legal Director" }
impact: { baseline: "2-4 hours per contract", target: "45 minutes including lawyer review", evidence: estimated }
card:
  problem: "Vendor contracts bury the real terms in definitions and miscellaneous clauses, and review queues are long."
  output: "A table per playbook topic: the clauses involved, what they say, the verdict against standard and fallback, and a suggested redline."
limits:
  - "This is a first review for a lawyer, not legal advice. A lawyer approves every redline."
  - "Copilot compares against your playbook only. Topics your playbook does not cover are not checked."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: 7 of 7 topics matched the answer key, including the data breach cap in another section that overrides the general cap and the data location gap; the vendor email listed 5 redlines and revealed no fallback."
---

## Situation

In-house legal counsel reviews vendor contracts against the company's playbook: standard positions and acceptable fallbacks for liability, law, term, payment, data and termination. Vendors often put the real terms in unexpected places, such as a cap override in a miscellaneous clause or an auto-renewal inside the term clause.

## Steps

**1. Open both files.** Upload the contract and your playbook to OneDrive and open each once in Word for the web.

**2. Review.** In Copilot Chat, type `/` and pick the contract and the playbook, then run:

:::prompt
EN: Review the attached contract against the attached playbook. For each playbook topic, find every clause that deals with it, including clauses in other sections that override or limit it. Give: topic, clause numbers, what the contract says (quote it), the playbook standard, verdict (Meets standard, Within fallback, Beyond fallback, or Not addressed), and a suggested redline for anything beyond fallback or not addressed. This is a first review for a lawyer, not legal advice.
ID: Tinjau kontrak terlampir terhadap playbook terlampir. Untuk setiap topik playbook, temukan setiap pasal yang mengaturnya, termasuk pasal di bagian lain yang mengesampingkan atau membatasinya. Berikan: topik, nomor pasal, bunyi kontrak (kutip), posisi standar playbook, penilaian (Sesuai standar, Dalam batas fallback, Di luar fallback, atau Tidak diatur), dan usulan redline untuk yang di luar fallback atau tidak diatur. Ini adalah tinjauan awal untuk pengacara, bukan nasihat hukum.
BM: Semak kontrak yang dilampirkan berbanding buku panduan yang dilampirkan. Bagi setiap topik buku panduan, cari setiap klausa yang berkaitan, termasuk klausa di bahagian lain yang mengatasi atau mengehadkannya. Berikan: topik, nombor klausa, apa yang dinyatakan kontrak (petik), kedudukan standard buku panduan, penilaian (Memenuhi standard, Dalam had sandaran, Melebihi had sandaran, atau Tidak dinyatakan), dan cadangan pindaan bagi yang melebihi had atau tidak dinyatakan. Ini semakan awal untuk peguam, bukan nasihat undang-undang.
:::

**3. Prepare the negotiation email.** After the lawyer approves the redlines, in the same chat:

:::prompt
EN: Draft a short, professional email to the vendor listing the changes we request, one line per clause with the clause number and our proposed wording. Do not mention our fallback positions.
ID: Susun email singkat dan profesional kepada vendor yang berisi perubahan yang kami minta, satu baris per pasal dengan nomor pasal dan usulan redaksi kami. Jangan menyebut posisi fallback kami.
BM: Sediakan e-mel ringkas dan profesional kepada vendor yang menyenaraikan perubahan yang kami minta, satu baris bagi setiap klausa dengan nombor klausa dan cadangan perkataan kami. Jangan sebut kedudukan sandaran kami.
:::

## Check it

- Every quoted clause matches the contract word for word.
- Search the contract for "notwithstanding", "subject to" and "in no event" and check each hit is in the review.
- A lawyer checks every "Meets standard" verdict, not only the deviations.
- The vendor email contains no fallback position.

## When it goes wrong

- **A clause override is missed.** Ask: "List every clause that starts with or contains notwithstanding, and what it overrides."
- **A topic shows Meets standard but you disagree.** Copilot compared wording, not intent. The lawyer's judgement wins; note it for the playbook.
- **The vendor email reveals your fallback.** Delete it. Keep "Do not mention our fallback positions" in the prompt.

## Take it further

- **L4 Agent:** a playbook Q&A agent so business teams can check a term before sending a contract to Legal.
- **L3 Scout:** watch the contracts inbox and run the first-pass review on every new vendor paper for the duty lawyer.

:::presenter
**Ask before you start:** Do you have a written playbook with fallbacks? How long is the review queue? Who can approve a deviation?

**Demo kit:** a fictional playbook with 7 positions and a vendor MSA with a 3-month liability cap, a data-breach cap override in clause 18.4, a 36-month auto-renewal inside the term clause, Singapore courts, 45-day payment, and no data-location clause.
:::
