---
id: x-email-triage-015
title: { en: "Morning email triage, from Copilot Chat to Scout", id: "Triase email pagi, dari Copilot Chat hingga Scout", ms: "Triaj e-mel pagi, daripada Copilot Chat hingga Scout" }
summary:
  en: "Sort the morning inbox into Act today, This week, FYI, Noise and Suspicious with your own rules, get replies drafted in the sender's language, and see how each licence tier takes more of the work off you."
  id: "Pilah inbox pagi menjadi Tindak hari ini, Minggu ini, FYI, Noise dan Mencurigakan dengan aturan Anda sendiri, siapkan draf balasan dalam bahasa pengirim, dan lihat bagaimana setiap tingkat lisensi mengambil alih lebih banyak pekerjaan."
  ms: "Susun peti masuk pagi kepada Tindakan hari ini, Minggu ini, FYI, Hingar dan Mencurigakan dengan peraturan anda sendiri, sediakan draf balasan dalam bahasa pengirim, dan lihat bagaimana setiap peringkat lesen mengambil alih lebih banyak kerja."
industry: [cross-industry]
department: [all-departments]
persona: [knowledge-worker, people-manager]
market: [ID, MY]
difficulty: 1
surface: [outlook, copilot-chat, cowork, scout, teams]
licence: [copilot-chat, m365-copilot, cowork, scout]
tiers:
  - { key: basic, licence: copilot-chat, difficulty: 1, surface: [outlook], runs: "You run one prompt in Outlook each morning", effort: "About 15 minutes" }
  - { key: premium, licence: m365-copilot, difficulty: 2, surface: [copilot-chat, outlook], runs: "Scheduled prompt at 07:30, result by email", effort: "About 10 minutes" }
  - { key: cowork, licence: cowork, difficulty: 2, surface: [cowork], runs: "Scheduled task, plus a trigger when an important email arrives", effort: "About 5 minutes to approve" }
  - { key: scout, licence: scout, difficulty: 3, surface: [scout, teams], runs: "Automation at 07:00, summary in Teams", effort: "About 5 minutes to review" }
inputs:
  - { name: "Your Inbox", format: "Outlook (Exchange Online)", where: "Your mailbox", count: "30-150 unread each morning" }
  - { name: "My triage rules: important senders, groups, what never to do", format: ".docx or text in the prompt", where: "OneDrive", count: "1" }
  - { name: "Email triage skill (Cowork tier only)", format: "SKILL.md", where: "OneDrive /Documents/Cowork/skills/", count: "1" }
data: { sensitivity: "Confidential", customer_pii: true, signoff: "None for your own mailbox. Your IT admin decides whether scheduled prompts, Cowork and Scout are enabled." }
impact: { baseline: "30-45 minutes every morning", target: "5-15 minutes depending on tier", evidence: estimated }
card:
  problem: "Every morning starts with 30 to 150 unread emails. The one request that matters is buried in a CC thread, next to marketing marked URGENT."
  output: "A short list of what to act on today and this week, noise moved out of the way, suspicious mail called out, and replies drafted in the sender's language, never sent without you."
limits:
  - "Copilot Chat (Basic) works on your mailbox through Copilot in Outlook. It does not use your Teams chats or files as context."
  - "Copilot sorts by your rules and what the email says. It does not know about the phone call or the corridor agreement."
  - "Automations run with your permissions. In this scenario they never send or delete, and you should keep it that way."
  - "Emails contain personal data (UU PDP, PDPA). Keep ID numbers, health and salary details out of your rules, skills and Copilot memory."
  - "Limits per person: 10 scheduled prompts in Copilot Chat, 25 scheduled prompts in Cowork."
source_refs:
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
  - "https://support.microsoft.com/en-us/outlook/copilot-outlook/chat-with-copilot-in-outlook"
  - "https://support.microsoft.com/en-us/microsoft-365-copilot/schedule-your-most-used-copilot-prompts"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/use-cowork"
  - "https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday"
status: draft
---

## Situation

A CTO at an Indonesian distributor opens Outlook at 07:30 to 40 unread emails in Bahasa Indonesia, English and Bahasa Melayu. Somewhere in there: the CEO needs uptime and incident numbers for a Direksi meeting by 12.00, the largest retail customer escalates an outage complaint that must be answered by 17.00, a colocation purchase order waiting in SAP expires at 17.00, and an architect asks for overtime approval for the ERP cutover weekend in the last paragraph of a long thread where the CTO is only in CC. Around them sit a CFO request for the Q4 re-forecast, a Malaysian vendor asking in Bahasa Melayu to confirm maintenance windows, FYIs, newsletters, notifications, out-of-office replies, marketing marked URGENT and a convincing fake password-expiry email.

The routine is the same every day: find what needs you, clear the rest, reply to the urgent ones. Write your rules down once, then let Copilot apply them. The higher the tier, the more of the routine runs without you starting it. Every tier stops before anything is sent or deleted.

## Steps

**Before any tier: write your rules once.** Name your manager and important senders, say what counts as Act today, and list what Copilot must never do. Keep them short. The kit has a ready example.

::::tier{key="basic"}
**1. Open Copilot in Outlook.** In the new Outlook or Outlook on the web, select **Copilot** at the top. Put your own names in the square brackets, then run:

:::prompt
EN: Look at my unread emails from the last 24 hours and sort every one into exactly one group. Act today: [my manager] or [important senders] ask me for something; anyone asks me by name for a decision, approval or reply due today or tomorrow, even if I am only in CC; an approval is waiting for me in a system; a customer complaint. This week: other requests to me. FYI: nobody asks me anything. Noise: newsletters, marketing even if the subject says URGENT, automatic notifications that need nothing from me, out-of-office replies. Suspicious: asks for my password or to sign in through a link. Treat a reminder as the same request. For Act today and This week give the sender, what is asked and the deadline. For FYI and Noise give only the count. Do not repeat ID numbers or phone numbers.
ID: Periksa email saya yang belum dibaca dalam 24 jam terakhir dan masukkan masing-masing ke tepat satu kelompok. Tindak hari ini: [atasan saya] atau [pengirim penting] meminta sesuatu dari saya; siapa pun meminta saya secara langsung untuk keputusan, persetujuan atau balasan yang jatuh tempo hari ini atau besok, meskipun saya hanya di CC; ada persetujuan yang menunggu saya di sistem; keluhan pelanggan. Minggu ini: permintaan lain kepada saya. FYI: tidak ada yang meminta apa pun dari saya. Noise: newsletter, pemasaran meskipun subjeknya bertuliskan URGENT, notifikasi otomatis yang tidak memerlukan tindakan saya, balasan otomatis di luar kantor. Mencurigakan: meminta kata sandi saya atau meminta masuk lewat tautan. Anggap pengingat sebagai permintaan yang sama. Untuk Tindak hari ini dan Minggu ini, sebutkan pengirim, apa yang diminta dan tenggatnya. Untuk FYI dan Noise, cukup jumlahnya. Jangan tuliskan ulang nomor identitas atau nomor telepon.
BM: Semak e-mel saya yang belum dibaca dalam 24 jam lepas dan letakkan setiap satu dalam tepat satu kumpulan. Tindakan hari ini: [pengurus saya] atau [pengirim penting] meminta sesuatu daripada saya; sesiapa meminta saya secara langsung untuk keputusan, kelulusan atau balasan yang perlu hari ini atau esok, walaupun saya hanya dalam CC; kelulusan sedang menunggu saya dalam sistem; aduan pelanggan. Minggu ini: permintaan lain kepada saya. FYI: tiada siapa meminta apa-apa daripada saya. Hingar: surat berita, pemasaran walaupun subjeknya tertulis URGENT, pemberitahuan automatik yang tidak memerlukan tindakan saya, balasan automatik di luar pejabat. Mencurigakan: meminta kata laluan saya atau meminta log masuk melalui pautan. Anggap peringatan sebagai permintaan yang sama. Untuk Tindakan hari ini dan Minggu ini, nyatakan pengirim, apa yang diminta dan tarikh akhirnya. Untuk FYI dan Hingar, beri bilangan sahaja. Jangan ulang nombor pengenalan atau nombor telefon.
:::

**2. Flag the Act today emails.** In the same Copilot pane:

:::prompt
EN: Flag every email in the Act today group.
ID: Beri tanda (flag) pada setiap email di kelompok Tindak hari ini.
BM: Tandakan (flag) setiap e-mel dalam kumpulan Tindakan hari ini.
:::

**3. Draft the replies.** Open each flagged email, select **Copilot** > **Draft with Copilot**, and use:

:::prompt
EN: Draft a short, polite reply in the language of this email. Answer what is asked, and where I need to check something first, write [to confirm]. Do not repeat ID numbers or phone numbers.
ID: Buat draf balasan singkat dan sopan dalam bahasa email ini. Jawab apa yang diminta, dan jika saya perlu mengecek sesuatu dulu, tulis [perlu konfirmasi]. Jangan tuliskan ulang nomor identitas atau nomor telepon.
BM: Sediakan draf balasan ringkas dan sopan dalam bahasa e-mel ini. Jawab apa yang diminta, dan jika saya perlu menyemak sesuatu dahulu, tulis [perlu pengesahan]. Jangan ulang nombor pengenalan atau nombor telefon.
:::

**4. Clear the Noise yourself.** Use **Sweep** or a rule in Outlook for the senders Copilot listed as Noise. Report Suspicious emails with **Report** > **Report phishing**. Do not open their links.
::::

::::tier{key="premium"}
**1. Save your rules as a file.** Put them in a Word document in OneDrive, for example *My triage rules.docx*, and open it once in Word for the web so Copilot can read it.

**2. Run the triage.** In Copilot Chat, type `/`, pick your rules file, then run:

:::prompt
EN: Using my triage rules, sort every unread email in my Inbox from the last 24 hours into Act today, This week, FYI, Noise and Suspicious. Read the whole email, not only the subject, and treat a reminder as the same request. For each Act today item, check my Teams chats and files for related context, say what I need to prepare, and rank the items in the order I should respond. List This week with sender, ask and deadline. For FYI and Noise give the count, and check that all groups add up to the number of unread emails. List Suspicious emails with the reason. Do not repeat ID numbers, phone numbers or bank details.
ID: Dengan aturan triase saya, pilah setiap email belum dibaca di Inbox saya dalam 24 jam terakhir ke Tindak hari ini, Minggu ini, FYI, Noise dan Mencurigakan. Baca seluruh isi email, bukan hanya subjeknya, dan anggap pengingat sebagai permintaan yang sama. Untuk setiap item Tindak hari ini, cek chat Teams dan file saya untuk konteks terkait, sebutkan apa yang perlu saya siapkan, dan urutkan sesuai prioritas balasan. Daftarkan Minggu ini dengan pengirim, permintaan dan tenggat. Untuk FYI dan Noise sebutkan jumlahnya, dan pastikan semua kelompok berjumlah sama dengan email yang belum dibaca. Daftarkan email Mencurigakan beserta alasannya. Jangan tuliskan ulang nomor identitas, nomor telepon atau rekening bank.
BM: Menggunakan peraturan triaj saya, susun setiap e-mel yang belum dibaca dalam Peti Masuk saya dalam 24 jam lepas kepada Tindakan hari ini, Minggu ini, FYI, Hingar dan Mencurigakan. Baca keseluruhan e-mel, bukan subjek sahaja, dan anggap peringatan sebagai permintaan yang sama. Untuk setiap item Tindakan hari ini, semak sembang Teams dan fail saya untuk konteks berkaitan, nyatakan apa yang perlu saya sediakan, dan susun mengikut keutamaan balasan. Senaraikan Minggu ini dengan pengirim, permintaan dan tarikh akhir. Untuk FYI dan Hingar beri bilangannya, dan pastikan semua kumpulan berjumlah sama dengan e-mel yang belum dibaca. Senaraikan e-mel Mencurigakan beserta sebabnya. Jangan ulang nombor pengenalan, nombor telefon atau butiran bank.
:::

**3. Schedule it.** Hover over the prompt you just ran, select **Schedule this prompt**, choose weekdays at 07:30, and turn on the email notification. You'll find the result in **Chats** each morning. Manage it under **Settings and more** > **Scheduled prompts**.

**4. Draft the replies and clear the Noise.** Open each Act today email in Outlook and use **Draft with Copilot** with the Basic tier prompt. Move the Noise with **Sweep** or a rule.
::::

::::tier{key="cowork"}
**1. Add the triage skill.** In Cowork, open **Customize** > **Skills** > **Add** > **Upload skill** and upload the *SKILL.md* from the kit, edited with your names. Or tell Cowork: "Create a skill called Email triage from my rules file" and attach the file.

**2. Run it once and watch.** On the Cowork home page, run:

:::prompt
EN: Triage my Inbox now with my Email triage skill. Move Noise to the folder Read later, save draft replies for every Act today item in my Drafts folder, and never send or delete anything. Then give me the summary.
ID: Lakukan triase Inbox saya sekarang dengan skill Email triage saya. Pindahkan Noise ke folder Read later, simpan draf balasan untuk setiap item Tindak hari ini di folder Drafts, dan jangan pernah mengirim atau menghapus apa pun. Lalu berikan ringkasannya.
BM: Lakukan triaj Peti Masuk saya sekarang dengan skill Email triage saya. Alihkan Hingar ke folder Read later, simpan draf balasan untuk setiap item Tindakan hari ini dalam folder Drafts, dan jangan sekali-kali menghantar atau memadam apa-apa. Kemudian berikan ringkasannya.
:::

Cowork shows an approval card before it moves email. Check the list, then select the action button. Choose **Cancel** for anything that should stay.

**3. Schedule it.** In the same session:

:::prompt
EN: Run my Email triage skill every weekday at 07:00.
ID: Jalankan skill Email triage saya setiap hari kerja pukul 07.00.
BM: Jalankan skill Email triage saya setiap hari bekerja pada pukul 7.00 pagi.
:::

Select **Activate** on the draft schedule. It then appears under **Automations** > **Manage schedules**.

**4. Add a trigger for urgent mail.** For requests that can't wait until tomorrow morning:

:::prompt
EN: Whenever [my manager] or anyone at [customer domain] emails me asking for something, summarise it in two lines and draft a reply in the sender's language for my review. Do not send it.
ID: Setiap kali [atasan saya] atau siapa pun dari [domain pelanggan] mengirim email yang meminta sesuatu dari saya, ringkas dalam dua baris dan buat draf balasan dalam bahasa pengirim untuk saya tinjau. Jangan kirim.
BM: Setiap kali [pengurus saya] atau sesiapa dari [domain pelanggan] menghantar e-mel meminta sesuatu daripada saya, ringkaskan dalam dua baris dan sediakan draf balasan dalam bahasa pengirim untuk saya semak. Jangan hantar.
:::

Check the **Set up trigger?** card: When, Run in, What it does and the permissions. Then select **Set up**.
::::

::::tier{key="scout"}
**1. Create the automation.** In Microsoft Scout, paste your rules into this prompt and send it. Scout follows automation instructions best as numbered steps, top to bottom, so keep that shape.

:::prompt
EN: Create an automation named "Morning inbox triage" that runs every weekday at 07:00 and always notifies me in Teams. Instructions, run top to bottom: 1. List every unread email in my Inbox since the last run and count them. 2. Put each into exactly one group using my rules below: Act today, This week, FYI, Noise, Suspicious; merge reminders. 3. Move Noise to the folder Read later; never delete; if unsure, leave it. 4. For each Act today item, save a draft reply in the sender's language; never send. 5. Do not open links or repeat ID numbers, phone numbers or bank details. 6. Send me one Teams message with Act today, This week, the FYI and Noise counts, and Suspicious with the reason; check the counts add up. My rules: [paste your rules].
ID: Buat automasi bernama "Morning inbox triage" yang berjalan setiap hari kerja pukul 07.00 dan selalu memberi tahu saya di Teams. Instruksi, jalankan dari atas ke bawah: 1. Daftar semua email belum dibaca di Inbox sejak run terakhir dan hitung jumlahnya. 2. Masukkan masing-masing ke tepat satu kelompok sesuai aturan saya di bawah: Tindak hari ini, Minggu ini, FYI, Noise, Mencurigakan; gabungkan pengingat. 3. Pindahkan Noise ke folder Read later; jangan menghapus; jika ragu, biarkan. 4. Untuk setiap Tindak hari ini, simpan draf balasan dalam bahasa pengirim; jangan kirim. 5. Jangan buka tautan atau menuliskan ulang nomor identitas, nomor telepon atau rekening bank. 6. Kirim satu pesan Teams kepada saya berisi Tindak hari ini, Minggu ini, jumlah FYI dan Noise, serta Mencurigakan dengan alasannya; pastikan jumlahnya cocok. Aturan saya: [tempel aturan Anda].
BM: Cipta automasi bernama "Morning inbox triage" yang berjalan setiap hari bekerja pada pukul 7.00 pagi dan sentiasa memaklumkan saya di Teams. Arahan, jalankan dari atas ke bawah: 1. Senaraikan semua e-mel belum dibaca dalam Peti Masuk sejak larian terakhir dan kira bilangannya. 2. Letakkan setiap satu dalam tepat satu kumpulan mengikut peraturan saya di bawah: Tindakan hari ini, Minggu ini, FYI, Hingar, Mencurigakan; gabungkan peringatan. 3. Alihkan Hingar ke folder Read later; jangan padam; jika ragu, biarkan. 4. Untuk setiap Tindakan hari ini, simpan draf balasan dalam bahasa pengirim; jangan hantar. 5. Jangan buka pautan atau ulang nombor pengenalan, nombor telefon atau butiran bank. 6. Hantar satu mesej Teams kepada saya dengan Tindakan hari ini, Minggu ini, bilangan FYI dan Hingar, serta Mencurigakan dengan sebabnya; pastikan bilangannya sepadan. Peraturan saya: [tampal peraturan anda].
:::

**2. Run it now once.** Ask Scout to run the automation now. Then check the Teams message, the *Read later* folder and your **Drafts** before you trust the schedule.

**3. Optional: watch for urgent mail.** Ask Scout for a condition automation that checks every 15 minutes and pings you in Teams only when your manager or a key customer asks for something due today.
::::

## Check it

Run your chosen tier next to your own manual sort for the first three mornings. Then check:

- The group counts add up to the number of unread emails. If they don't, something was skipped.
- A request addressed to you by name inside a CC thread is in Act today.
- A system email waiting for your approval is in Act today. One saying something was already approved is Noise.
- Marketing marked URGENT is Noise, and a reminder is merged with the original request.
- No ID number, phone number or bank detail appears in the summary or a draft.
- Nothing was sent or deleted. Drafts are in **Drafts**, and Noise is in *Read later*, not in Deleted Items.
- A fake password or sign-in email is called Suspicious, and nobody opened its link.

## When it goes wrong

- **A request in a long CC thread is missed.** Copilot judged by the first lines or by the To line. Keep "even if I am only in CC" and "read the whole email" in your rules.
- **Copilot covers only some of your unread emails.** Big inboxes can be summarised partly. Shorten the window ("since 17:00 yesterday"), and compare the counts with Outlook's unread number.
- **The scheduled prompt didn't run.** Check **Settings and more** > **Scheduled prompts**. Scheduled prompts need a Microsoft 365 Copilot licence, and your admin may have turned off optional connected experiences.
- **Cowork asks for approval every morning.** That's by design for moving and sending. **More options** can skip similar approvals, but only for the current session.
- **The Scout automation ran but did nothing.** The instructions probably read like a description, not steps. Rewrite them as numbered steps that start with a verb, top to bottom.
- **A draft reply is in the wrong language.** Add "Reply in the language of the sender: Bahasa Indonesia, Bahasa Melayu or English" to your rules.

## Take it further

- Turn repeat Noise senders into Outlook rules so tomorrow's inbox is smaller.
- Share your Email triage skill with your team from Cowork **Customize**, so everyone sorts by the same rules.
- Add a Friday check for requests you still owe people, which is the next routine in this library.

:::presenter
**Session length:** 25 minutes. **Setup:** load the kit inbox (40 unread emails) into the demo mailbox, and reset it between tiers.

1. Show the inbox: 40 unread, three languages. Ask the room which email they'd open first. (2 min)
2. Basic tier live in Outlook. Point out the CC-thread request and the fake password email. (6 min)
3. Premium: the same rules as a file, plus Teams context, then schedule it. (5 min)
4. Cowork: the approval card before moving email, and the Set up trigger card. (6 min)
5. Scout: the Teams summary and Drafts. Close with the tier table: same routine, less of your time. (6 min)
:::
