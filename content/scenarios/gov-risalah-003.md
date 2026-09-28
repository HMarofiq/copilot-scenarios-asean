---
id: gov-risalah-003
title: { en: "Board meeting minutes from a Teams transcript", id: "Risalah rapat Direksi dari transkrip Teams", ms: "Minit mesyuarat Lembaga daripada transkrip Teams" }
summary:
  en: "Turn a bilingual Direksi or Board meeting into structured minutes with decisions, PIC and due dates."
  id: "Ubah rapat Direksi atau Dewan Komisaris dua bahasa menjadi risalah terstruktur berisi keputusan, PIC, dan tenggat."
  ms: "Tukar mesyuarat Lembaga dwibahasa kepada minit berstruktur dengan keputusan, PIC dan tarikh akhir."
industry: [government-soe]
department: [corporate-secretary, exec-office]
persona: [corporate-secretary]
market: [ID, MY]
difficulty: 1
surface: [teams, word]
licence: [m365-copilot]
inputs:
  - { name: "Teams meeting with transcription on", format: "Teams recording + transcript", where: "Meeting chat", count: "1" }
  - { name: "Agenda", format: ".docx", where: "Meeting invite", count: "1" }
  - { name: "Minutes template", format: ".dotx", where: "Corporate Secretary library", count: "1" }
data: { sensitivity: "Highly Confidential", customer_pii: false, signoff: "Corporate Secretary" }
impact: { baseline: "1-2 days after each meeting", target: "2 hours including review", evidence: estimated }
card:
  problem: "Minutes are due within days, and the discussion mixed Bahasa and English."
  output: "Draft minutes in your template: attendance, quorum, per-agenda discussion, decisions, action items with PIC and due date."
limits:
  - "Mixed Bahasa and English speech lowers transcript accuracy. Set the spoken language before the meeting."
  - "People speaking from one room device are not separately attributed."
  - "An attendee who never speaks does not appear in the transcript. Take attendance from the meeting roster, not from Copilot."
source_refs: ["https://learn.microsoft.com/microsoftteams/copilot-teams-transcription"]
status: partly-validated
validated_on: 2026-09-28
validation_note: "Steps 2 and 3 run in a demo tenant on a Teams-style transcript of the kit meeting: all 3 decisions and 4 actions right, the ambiguous deadline and a silent attendee marked [TO CONFIRM], 1.2 trillion kept exact, minutes filled into the template headings in order. Recording a live Teams meeting (step 1) was not exercised."
---

## Situation

The Corporate Secretary (Sekretaris Perusahaan) owes signed minutes after every Direksi or Board meeting. The draft is the legal record's starting point, so structure and accuracy matter more than prose.

## Steps

**1. Before the meeting,** make sure transcription is on and the spoken language is set to the dominant language.

**2. After the meeting,** open the meeting Recap and use Copilot there, or download the transcript and attach it with the agenda in Copilot Chat:

:::prompt
EN: Using the transcript and the attached agenda, draft minutes with: attendees and absentees, quorum statement, then for each agenda item: summary of discussion (neutral, no speaker opinions attributed unless stated as a position), decisions taken, and action items as a table with PIC, action, due date. Mark anything unclear as [TO CONFIRM].
ID: Berdasarkan transkrip dan agenda terlampir, susun risalah rapat berisi: daftar hadir dan tidak hadir, pernyataan kuorum, lalu untuk setiap mata acara: ringkasan pembahasan (netral), keputusan rapat, dan tindak lanjut dalam tabel berisi PIC, tindakan, tenggat. Tandai yang tidak jelas dengan [PERLU KONFIRMASI].
BM: Menggunakan transkrip dan agenda yang dilampirkan, sediakan minit mesyuarat: kehadiran dan ketidakhadiran, kenyataan korum, dan bagi setiap perkara agenda: ringkasan perbincangan (neutral), keputusan, dan tindakan susulan dalam jadual dengan PIC, tindakan, tarikh akhir. Tandakan perkara yang tidak jelas sebagai [PERLU PENGESAHAN].
:::

**3. Move it into the template.** In the same chat, attach your minutes template with `/`, then run:

:::prompt
EN: Create a Word document from the minutes above using the section headings of the attached template, in the same order. Keep every [TO CONFIRM] marker. Leave the approval signature lines blank.
ID: Buat dokumen Word dari risalah di atas dengan judul bagian dari templat terlampir, dengan urutan yang sama. Pertahankan setiap penanda [PERLU KONFIRMASI]. Biarkan baris tanda tangan pengesahan kosong.
BM: Bina dokumen Word daripada minit di atas menggunakan tajuk bahagian templat yang dilampirkan, mengikut susunan yang sama. Kekalkan setiap penanda [PERLU PENGESAHAN]. Biarkan baris tandatangan pengesahan kosong.
:::

Copilot saves the file under **OneDrive › Documents › Copilot › Created**.

## Check it

- Every decision must be traceable to a transcript timestamp. Click the citation.
- Numbers (budget, limits, dates) are checked against the board paper, not the transcript.
- Resolve every [TO CONFIRM] before the minutes go for signature. In validation these were an ambiguous deadline and an attendee who never spoke.

## When it goes wrong

- **Names are wrong.** Attendees joined from a boardroom device. Add names manually from the attendance sheet.
- **A director is missing from attendance.** They attended but never spoke, so the transcript does not show them. Use the meeting roster.
- **Copilot cannot find the transcript you just downloaded and uploaded.** Open it once in Word for the web, wait a minute, then attach it again.

## Take it further

- **L2 Scout:** after each board meeting, collect action items into a tracker and remind PICs a week before due.

:::presenter
**Ask before you start:** Is transcription allowed by your board charter? Who reviews before signing?

**Demo kit:** a fictional 13-line Direksi meeting script in mixed Bahasa Indonesia and English to record with four demo accounts, plus the same meeting as a ready-made transcript file for when you cannot record live. Agenda, minutes template and answer key included.

**Timing on the validation run:** minutes about 35 seconds, template document about 90 seconds.
:::
