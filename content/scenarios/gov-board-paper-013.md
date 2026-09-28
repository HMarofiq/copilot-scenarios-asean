---
id: gov-board-paper-013
title: { en: "Board paper from divisional inputs", id: "Kertas Direksi dari masukan divisi", ms: "Kertas Lembaga daripada input bahagian" }
summary:
  en: "Assemble a board paper from divisional inputs in your template, surfacing conflicting figures and missing inputs instead of smoothing them over."
  id: "Susun kertas Direksi dari masukan divisi dalam templat Anda, dengan menampilkan angka yang saling bertentangan dan masukan yang belum ada, bukan menutupinya."
  ms: "Susun kertas Lembaga daripada input bahagian dalam templat anda, dengan menonjolkan angka yang bercanggah dan input yang tiada, bukan menyembunyikannya."
industry: [government-soe]
department: [corporate-secretary, strategy]
persona: [corporate-secretary, strategy-office]
market: [ID, MY]
difficulty: 3
surface: [copilot-chat, word]
licence: [m365-copilot]
inputs:
  - { name: "Divisional inputs (Finance, Legal, Operations, Risk, HR)", format: ".docx", where: "Board paper working folder", count: "3-8" }
  - { name: "Board paper template, with a section owner under each heading", format: ".docx", where: "Corporate Secretary library", count: "1" }
data: { sensitivity: "Highly Confidential", customer_pii: false, signoff: "Corporate Secretary" }
impact: { baseline: "2-3 days to consolidate", target: "Half a day plus review", evidence: estimated }
card:
  problem: "Five divisions send inputs in five styles, two of them disagree on the numbers, and one is late."
  output: "A board paper in your template with a proposed resolution, every conflict and missing input flagged, and a list of open points."
limits:
  - "Copilot uses only what the inputs say. It cannot know which of two figures is correct."
  - "Copilot cannot tell which division owns a section unless the template says so. Put a section owner line under each heading."
  - "Board papers are Highly Confidential. Keep inputs and drafts in the Corporate Secretary's restricted library."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: validated
validated_on: 2026-09-28
validation_note: "Run in a demo tenant with the kit: both deal values kept and marked [CONFLICT]; only the People impact section marked [TO CONFIRM] for Human Resources once the template named section owners; the competition authority condition in the resolution; open points on a separate last page. Without section owners Copilot named the wrong division, now documented."
---

## Situation

For a major decision, such as an acquisition, the Corporate Secretary or strategy office collects inputs from Finance, Legal, Operations, Risk and HR and assembles one board paper. Inputs overlap, figures sometimes disagree, and a division may not have submitted by the deadline. The paper must show the board the facts, not paper over gaps.

## Steps

**1. Collect the inputs.** Put the divisional inputs and your template in one folder and open each once in Word for the web. Under each template heading, name the division that owns the section; write "Drafter" for the summary and resolution you write yourself.

**2. Draft the paper.** In Copilot Chat, type `/` and pick every input and the template, then run:

:::prompt
EN: Using the attached divisional inputs, draft the board paper in the section headings of the attached template, in the same order. Use only facts from the inputs and say which division each comes from. Where divisions give different figures for the same thing, do not choose one: show both with their source and mark [CONFLICT]. The template names the owner of each section. If the owner division has not submitted an input, write [TO CONFIRM] for that section and name the division, even if another division mentions the topic. Put any other missing detail in the open points, not in the sections. Draft the proposed resolution, including any condition that must be met before completion. End with a list of open points for the Corporate Secretary.
ID: Dengan masukan divisi terlampir, susun kertas Direksi mengikuti judul bagian templat terlampir, dengan urutan yang sama. Gunakan hanya fakta dari masukan dan sebutkan divisi sumbernya. Jika divisi memberi angka berbeda untuk hal yang sama, jangan memilih salah satu: tampilkan keduanya dengan sumbernya dan tandai [KONFLIK]. Templat menyebutkan pemilik setiap bagian. Jika divisi pemilik belum mengirim masukan, tulis [PERLU KONFIRMASI] untuk bagian itu dan sebutkan divisinya, meskipun divisi lain menyinggung topik tersebut. Masukkan kekurangan detail lainnya ke daftar hal terbuka, bukan ke dalam bagian. Susun usulan keputusan, termasuk syarat yang harus dipenuhi sebelum penyelesaian. Akhiri dengan daftar hal terbuka untuk Sekretaris Perusahaan.
BM: Menggunakan input bahagian yang dilampirkan, sediakan kertas Lembaga mengikut tajuk bahagian templat yang dilampirkan, dalam susunan yang sama. Gunakan fakta daripada input sahaja dan nyatakan bahagian sumbernya. Jika bahagian memberi angka berbeza bagi perkara yang sama, jangan pilih satu: tunjukkan kedua-duanya dengan sumbernya dan tandakan [CANGGAH]. Templat menamakan pemilik setiap bahagian. Jika bahagian pemilik belum menghantar input, tulis [PERLU PENGESAHAN] bagi bahagian itu dan namakan bahagian tersebut, walaupun bahagian lain menyentuh topik itu. Letakkan butiran lain yang tiada dalam senarai perkara terbuka, bukan dalam bahagian. Sediakan cadangan resolusi, termasuk syarat yang mesti dipenuhi sebelum penyelesaian. Akhiri dengan senarai perkara terbuka untuk Setiausaha Syarikat.
:::

**3. Create the document.** In the same chat:

:::prompt
EN: Create a Word document from the board paper above. Keep every [CONFLICT] and [TO CONFIRM] marker, and put the open points on a separate last page headed "For the Corporate Secretary, remove before circulation".
ID: Buat dokumen Word dari kertas Direksi di atas. Pertahankan setiap penanda [KONFLIK] dan [PERLU KONFIRMASI], dan letakkan hal terbuka di halaman terakhir terpisah berjudul "Untuk Sekretaris Perusahaan, hapus sebelum diedarkan".
BM: Bina dokumen Word daripada kertas Lembaga di atas. Kekalkan setiap penanda [CANGGAH] dan [PERLU PENGESAHAN], dan letakkan perkara terbuka pada halaman terakhir yang berasingan bertajuk "Untuk Setiausaha Syarikat, buang sebelum diedarkan".
:::

## Check it

- Every figure in the paper appears in at least one input. Search for each number.
- Every [CONFLICT] is resolved with the divisions before circulation.
- The people section is written from the HR input, not borrowed from another division.
- The resolution states every condition precedent from Legal.

## When it goes wrong

- **Only one of two conflicting figures appears.** Copilot picked one. Keep the [CONFLICT] instruction and search the inputs for the other number.
- **A section is filled in although that division did not submit.** Copilot used another division's comment. Check the template names the section owner, then replace it with [TO CONFIRM].
- **The sections you write yourself are marked [TO CONFIRM].** The template names your own team as owner. Mark those sections as written by the drafter from the other sections.
- **The resolution misses a condition.** Ask: "List every condition precedent in the Legal input and add each to the resolution."

## Take it further

- **L3 Scout:** a week before the board meeting, check which divisions have not submitted and draft reminders.
- **L2 Copilot in Word:** turn the paper into a two-slide summary for the chair.

:::presenter
**Ask before you start:** How many divisions contribute to a board paper? What happens when their numbers disagree? Who owns the template?

**Demo kit:** fictional inputs from Finance, Operations, Legal and Risk for a 30% stake acquisition. Finance says IDR 850 billion, Operations IDR 800 billion; HR has not submitted; Legal has a competition-authority condition precedent.
:::
