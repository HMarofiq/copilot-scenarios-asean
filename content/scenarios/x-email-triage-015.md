---
id: x-email-triage-015
title: { en: "Morning email triage, from Copilot Chat to Cowork", id: "Triase email pagi, dari Copilot Chat hingga Cowork", ms: "Triaj e-mel pagi, daripada Copilot Chat hingga Cowork" }
summary:
  en: "Find what needs you in the morning inbox with your own rules: the requests due today, the ask hidden in a CC thread, the approval waiting in a system and the fake password email. Then see how Cowork sorts the whole inbox, moves the noise and drafts replies in the sender's language, never sending without you."
  id: "Temukan apa yang perlu Anda tangani di inbox pagi dengan aturan Anda sendiri: permintaan yang jatuh tempo hari ini, permintaan yang tersembunyi di thread CC, persetujuan yang menunggu di sistem, dan email password palsu. Lalu lihat bagaimana Cowork memilah seluruh inbox, memindahkan noise dan menyiapkan draf balasan dalam bahasa pengirim, tanpa pernah mengirim tanpa Anda."
  ms: "Cari apa yang memerlukan anda dalam peti masuk pagi dengan peraturan anda sendiri: permintaan yang perlu hari ini, permintaan yang tersembunyi dalam bebenang CC, kelulusan yang menunggu dalam sistem, dan e-mel kata laluan palsu. Kemudian lihat bagaimana Cowork menyusun seluruh peti masuk, mengalihkan hingar dan menyediakan draf balasan dalam bahasa pengirim, tanpa sekali-kali menghantar tanpa anda."
industry: [cross-industry]
department: [all-departments]
persona: [knowledge-worker, people-manager]
market: [ID, MY]
difficulty: 1
surface: [outlook, copilot-chat, cowork]
licence: [copilot-chat, m365-copilot, cowork]
tiers:
  - { key: basic, licence: copilot-chat, difficulty: 1, surface: [outlook], runs: "You ask Copilot in Outlook each morning", effort: "About 15 minutes" }
  - { key: premium, licence: m365-copilot, difficulty: 2, surface: [copilot-chat], runs: "Scheduled prompt each morning, result by email", effort: "About 10 minutes" }
  - { key: cowork, licence: cowork, difficulty: 2, surface: [cowork], runs: "Scheduled task, plus a trigger when an important email arrives", effort: "About 5 minutes to approve" }
inputs:
  - { name: "Your Inbox", format: "Outlook (Exchange Online)", where: "Your mailbox", count: "30-150 unread each morning" }
  - { name: "Your triage rules: manager, important senders, customer domain, what never to do", format: "Text you paste into the prompt", where: "Your notes", count: "1", kit: ["FICTIONAL_My_Triage_Rules.docx"] }
objective: "Start the day knowing exactly which emails need you today and which can wait, with the fake ones called out and replies drafted in the sender's language, in 5 to 15 minutes instead of 45."
data: { sensitivity: "Confidential", customer_pii: true, signoff: "None for your own mailbox. Your IT admin decides whether scheduled prompts and Cowork are enabled." }
impact: { baseline: "30-45 minutes every morning", target: "5-15 minutes depending on tier", evidence: estimated }
card:
  problem: "Every morning starts with 30 to 150 unread emails in three languages. The one request that matters is buried in a CC thread, next to marketing marked URGENT and a convincing fake password email."
  output: "A short list of what to act on today and this week, suspicious mail called out, and at the Cowork tier the whole inbox sorted, noise moved out of the way and replies drafted in the sender's language, never sent without you."
limits:
  - "Copilot Chat finds email by searching, not by reading the whole inbox. With 40 unread emails, Copilot in Outlook looked at only part of them in our test and once missed the fake password email. Compare its count with Outlook's unread count, and use the Copilot app or Cowork when you need everything covered."
  - "Copilot sorts by your rules and what the email says. It does not know about the phone call or the corridor agreement."
  - "Write dates in your own emails clearly. An email sent at 22:00 that says \"today\" means yesterday to Copilot the next morning."
  - "Cowork asks before it moves each email. \"Always allow\" is a permanent setting, so approve one by one until you trust the rules."
  - "Emails contain personal data (UU PDP, PDPA). Keep ID numbers, health and salary details out of your rules, skills and Copilot memory."
  - "Limits per person: 10 scheduled prompts in Copilot Chat, 25 scheduled tasks in Cowork."
source_refs:
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-overview"
  - "https://support.microsoft.com/en-us/outlook/copilot-outlook/chat-with-copilot-in-outlook"
  - "https://support.microsoft.com/en-us/microsoft-365-copilot/schedule-your-most-used-copilot-prompts"
  - "https://learn.microsoft.com/en-us/microsoft-365/copilot/cowork/use-cowork"
  - "https://www.microsoft.com/en-us/worklab/work-trend-index/breaking-down-infinite-workday"
status: validated
validated_on: 2026-10-01
validation_note: "Run in a demo tenant on a seeded inbox of 43 unread emails from the last 24 hours (40 planted in three languages plus 3 real notifications), as a user with a Microsoft 365 Copilot licence. Copilot in Outlook (Basic tier surface) found the main requests but looked at only part of the inbox and once missed the fake password email; flagging and Draft with Copilot (a Bahasa Melayu reply with [to confirm]) worked. In the Copilot app the same prompt started a background task that read all 43 emails and listed every planted request, the approval waiting in SAP, the ask in the CC thread and the phishing email; Schedule this prompt opened as described. Cowork created the skill from pasted rules (about 11 minutes), read every unread email, moved 18 to Read later with none that needed action, saved 11 drafts in the sender's language including Bahasa Melayu, left the phishing email untouched, and sent or deleted nothing; the schedule and trigger cards appeared as described and were cancelled. The Scout tier is not on this page until it has been run."
---

## Situation

**The morning.** A CTO opens 40 unread emails in Bahasa Indonesia, English and Bahasa Melayu.

**The requests.** Board input is due at 12.00, a customer escalation at 17.00. SAP needs approval, a CC thread hides an overtime ask, and a Malaysian vendor needs confirmation.

**The risks.** Noise and a fake password email bury the real work. Use your rules to find it; higher tiers automate more, but never send or delete.

## Steps

**Before any tier: write your rules once.** Name your manager, your important senders and your key customer's email domain. The kit has a ready example (*FICTIONAL_My_Triage_Rules.docx*).

::::tier{key="basic"}
**1. Ask Copilot in Outlook what needs you.** In the new Outlook or Outlook on the web, select **Copilot** at the top. Put your own names in the square brackets, then run:

:::prompt
ABOUT: Lists the requests that need you today and this week, plus suspicious emails, from the last 24 hours.
EN: Check every unread email in my Inbox received in the last 24 hours. If the search returns only part of them, keep going until you have read all of them, and tell me how many you read.
List only the ones where someone asks me for something: a decision, approval, reply, input or confirmation. Include an ask to me by name at the end of a long thread where I am only in CC, and system emails saying an approval is waiting for me.
Leave out newsletters, marketing, vendor event invitations, surveys and notifications that need nothing from me.
Put a request in Act today if it comes from [my manager], [important senders] or anyone at [customer domain], is due today or tomorrow, or is a customer complaint; otherwise put it in This week.
Treat a reminder as the same request. Give the sender, what is asked and the deadline, most urgent first.
Then list any email that asks for my password or to sign in through a link as Suspicious. Do not repeat ID numbers or phone numbers.
ID: Periksa setiap email belum dibaca di Inbox saya yang masuk dalam 24 jam terakhir. Jika hasil pencarian hanya sebagian, lanjutkan sampai Anda membaca semuanya, dan sebutkan berapa email yang Anda baca.
Daftarkan hanya email yang meminta sesuatu dari saya: keputusan, persetujuan, balasan, masukan atau konfirmasi. Termasuk permintaan kepada saya secara langsung di akhir thread panjang ketika saya hanya di CC, dan email sistem yang menyatakan ada persetujuan yang menunggu saya.
Abaikan newsletter, pemasaran, undangan acara vendor, survei dan notifikasi yang tidak memerlukan tindakan saya.
Masukkan permintaan ke Tindak hari ini jika datang dari [atasan saya], [pengirim penting] atau siapa pun di [domain pelanggan], jatuh tempo hari ini atau besok, atau berupa keluhan pelanggan; selain itu masukkan ke Minggu ini.
Anggap pengingat sebagai permintaan yang sama. Sebutkan pengirim, apa yang diminta dan tenggatnya, mulai dari yang paling mendesak.
Lalu daftarkan email yang meminta password saya atau meminta masuk lewat tautan sebagai Mencurigakan. Jangan tuliskan ulang nomor identitas atau nomor telepon.
BM: Semak setiap e-mel belum dibaca dalam Peti Masuk saya yang diterima dalam 24 jam lepas. Jika carian hanya memulangkan sebahagian, teruskan sehingga anda membaca semuanya, dan nyatakan berapa e-mel yang anda baca.
Senaraikan hanya e-mel yang meminta sesuatu daripada saya: keputusan, kelulusan, balasan, input atau pengesahan. Termasuk permintaan kepada saya secara langsung di hujung bebenang panjang apabila saya hanya dalam CC, dan e-mel sistem yang menyatakan kelulusan sedang menunggu saya.
Abaikan surat berita, pemasaran, jemputan acara vendor, tinjauan dan pemberitahuan yang tidak memerlukan tindakan saya.
Letakkan permintaan dalam Tindakan hari ini jika datang daripada [pengurus saya], [pengirim penting] atau sesiapa di [domain pelanggan], perlu hari ini atau esok, atau merupakan aduan pelanggan; jika tidak, letakkan dalam Minggu ini.
Anggap peringatan sebagai permintaan yang sama. Nyatakan pengirim, apa yang diminta dan tarikh akhir, bermula dengan yang paling mendesak.
Kemudian senaraikan e-mel yang meminta kata laluan saya atau meminta log masuk melalui pautan sebagai Mencurigakan. Jangan ulang nombor pengenalan atau nombor telefon.
:::

**After you run it:** a list of Act today and This week requests with sender, ask and deadline, and a Suspicious section. Compare the number it read with Outlook's unread count; if it is lower, see When it goes wrong.

**2. Flag the Act today emails.** In the same Copilot pane:

:::prompt
EN: Flag every email in the Act today group.
ID: Beri tanda (flag) pada setiap email di kelompok Tindak hari ini.
BM: Tandakan (flag) setiap e-mel dalam kumpulan Tindakan hari ini.
:::

**After you run it:** Copilot shows the emails it found and asks you to **Confirm**. Check the list first; remove anything that is not a real request.

**3. Draft the replies.** Open each flagged email and select **Reply**.

1. Under **Copilot suggested drafts**, select **Custom**.
2. Run:

:::prompt
EN: Draft a short, polite reply in the language of this email. Answer what is asked, and where I need to check something first, write [to confirm]. Do not repeat ID numbers or phone numbers.
ID: Buat draf balasan singkat dan sopan dalam bahasa email ini. Jawab apa yang diminta, dan jika saya perlu mengecek sesuatu dulu, tulis [perlu konfirmasi]. Jangan tuliskan ulang nomor identitas atau nomor telepon.
BM: Sediakan draf balasan ringkas dan sopan dalam bahasa e-mel ini. Jawab apa yang diminta, dan jika saya perlu menyemak sesuatu dahulu, tulis [perlu pengesahan]. Jangan ulang nombor pengenalan atau nombor telefon.
:::

**After you run it:** a reply in the sender's language with [to confirm] where you must check a fact. Edit it and send it yourself.

**4. Clear the noise yourself.** Use **Sweep** or a rule in Outlook for newsletters and notifications. Report suspicious emails with **Report** > **Report phishing**. Do not open their links.
::::

::::tier{key="premium"}
**1. Run the same prompt in the Copilot app.** Open **Microsoft 365 Copilot** (m365.cloud.microsoft) with **Work** selected, put your names in the brackets and run:

:::prompt
ABOUT: The same morning check in the Copilot app, which keeps reading until it has covered every unread email.
EN: Check every unread email in my Inbox received in the last 24 hours. If the search returns only part of them, keep going until you have read all of them, and tell me how many you read.
List only the ones where someone asks me for something: a decision, approval, reply, input or confirmation. Include an ask to me by name at the end of a long thread where I am only in CC, and system emails saying an approval is waiting for me.
Leave out newsletters, marketing, vendor event invitations, surveys and notifications that need nothing from me.
Put a request in Act today if it comes from [my manager], [important senders] or anyone at [customer domain], is due today or tomorrow, or is a customer complaint; otherwise put it in This week.
Treat a reminder as the same request. Give the sender, what is asked and the deadline, most urgent first.
Then list any email that asks for my password or to sign in through a link as Suspicious. Do not repeat ID numbers or phone numbers.
ID: Periksa setiap email belum dibaca di Inbox saya yang masuk dalam 24 jam terakhir. Jika hasil pencarian hanya sebagian, lanjutkan sampai Anda membaca semuanya, dan sebutkan berapa email yang Anda baca.
Daftarkan hanya email yang meminta sesuatu dari saya: keputusan, persetujuan, balasan, masukan atau konfirmasi. Termasuk permintaan kepada saya secara langsung di akhir thread panjang ketika saya hanya di CC, dan email sistem yang menyatakan ada persetujuan yang menunggu saya.
Abaikan newsletter, pemasaran, undangan acara vendor, survei dan notifikasi yang tidak memerlukan tindakan saya.
Masukkan permintaan ke Tindak hari ini jika datang dari [atasan saya], [pengirim penting] atau siapa pun di [domain pelanggan], jatuh tempo hari ini atau besok, atau berupa keluhan pelanggan; selain itu masukkan ke Minggu ini.
Anggap pengingat sebagai permintaan yang sama. Sebutkan pengirim, apa yang diminta dan tenggatnya, mulai dari yang paling mendesak.
Lalu daftarkan email yang meminta password saya atau meminta masuk lewat tautan sebagai Mencurigakan. Jangan tuliskan ulang nomor identitas atau nomor telepon.
BM: Semak setiap e-mel belum dibaca dalam Peti Masuk saya yang diterima dalam 24 jam lepas. Jika carian hanya memulangkan sebahagian, teruskan sehingga anda membaca semuanya, dan nyatakan berapa e-mel yang anda baca.
Senaraikan hanya e-mel yang meminta sesuatu daripada saya: keputusan, kelulusan, balasan, input atau pengesahan. Termasuk permintaan kepada saya secara langsung di hujung bebenang panjang apabila saya hanya dalam CC, dan e-mel sistem yang menyatakan kelulusan sedang menunggu saya.
Abaikan surat berita, pemasaran, jemputan acara vendor, tinjauan dan pemberitahuan yang tidak memerlukan tindakan saya.
Letakkan permintaan dalam Tindakan hari ini jika datang daripada [pengurus saya], [pengirim penting] atau sesiapa di [domain pelanggan], perlu hari ini atau esok, atau merupakan aduan pelanggan; jika tidak, letakkan dalam Minggu ini.
Anggap peringatan sebagai permintaan yang sama. Nyatakan pengirim, apa yang diminta dan tarikh akhir, bermula dengan yang paling mendesak.
Kemudian senaraikan e-mel yang meminta kata laluan saya atau meminta log masuk melalui pautan sebagai Mencurigakan. Jangan ulang nombor pengenalan atau nombor telefon.
:::

**After you run it:** with a full inbox, Copilot says the search returned only part of the emails and starts a **background task** that reads the rest (about 3 minutes). The answer says how many emails it read; it should match Outlook's unread count.

**2. Schedule it.** Hover over your prompt and select **Schedule this prompt**.

1. In **Create a schedule**, set the time (for example 07:30) and select the weekdays.
2. Set **Until** as far ahead as you need; the default ends after about two weeks.
3. Tick **Receive an email when responses are ready** and select **Save**.

**3. Flag, draft and clear the noise.** Use steps 2 to 4 of the Basic tier in Outlook.
::::

::::tier{key="cowork"}
**1. Create the triage skill.** In the Copilot app, select **Cowork** > **New task**. Paste your rules after this prompt and send it:

:::prompt
ABOUT: Turns your written rules into a reusable Email triage skill that Cowork tests before saving.
EN: Create a skill called Email triage from my rules below. It sorts my unread Inbox into Act today, This week, FYI, Noise and Suspicious using these rules, saves draft replies for Act today and gives me a one-screen summary.
[paste your rules]
ID: Buat skill bernama Email triage dari aturan saya di bawah. Skill ini memilah Inbox saya yang belum dibaca ke Tindak hari ini, Minggu ini, FYI, Noise dan Mencurigakan dengan aturan ini, menyimpan draf balasan untuk Tindak hari ini dan memberi saya ringkasan satu layar.
[tempel aturan Anda]
BM: Cipta skill bernama Email triage daripada peraturan saya di bawah. Skill ini menyusun Peti Masuk saya yang belum dibaca kepada Tindakan hari ini, Minggu ini, FYI, Hingar dan Mencurigakan menggunakan peraturan ini, menyimpan draf balasan untuk Tindakan hari ini dan memberi saya ringkasan satu skrin.
[tampal peraturan anda]
:::

**After you run it:** Cowork writes the skill and tests it in the background (about 10 minutes). Approve the **Copy file** card that saves it to your skills.

**2. Run it once and watch.** Start a **New task** and run:

:::prompt
ABOUT: Sorts the whole inbox with your skill, moves the noise and saves drafts; never sends or deletes.
EN: Triage my Inbox now with my Email triage skill. Move Noise to the folder Read later, save draft replies for every Act today item in my Drafts folder, and never send or delete anything. Then give me the summary.
ID: Lakukan triase Inbox saya sekarang dengan skill Email triage saya. Pindahkan Noise ke folder Read later, simpan draf balasan untuk setiap item Tindak hari ini di folder Drafts, dan jangan pernah mengirim atau menghapus apa pun. Lalu berikan ringkasannya.
BM: Lakukan triaj Peti Masuk saya sekarang dengan skill Email triage saya. Alihkan Hingar ke folder Read later, simpan draf balasan untuk setiap item Tindakan hari ini dalam folder Drafts, dan jangan sekali-kali menghantar atau memadam apa-apa. Kemudian berikan ringkasannya.
:::

**After you run it:** Cowork lists every unread email and shows a **Move this email?** card for each one it wants to move. Select **Move** or **Cancel** per email. After about 15 minutes you get the counts per group, the drafts are in **Drafts** and the noise is in *Read later*.

**3. Schedule it.** In the same task:

:::prompt
EN: Run my Email triage skill every weekday at 07:00.
ID: Jalankan skill Email triage saya setiap hari kerja pukul 07.00.
BM: Jalankan skill Email triage saya setiap hari bekerja pada pukul 7.00 pagi.
:::

**After you run it:** a **Create recurring task?** card with Weekdays at 7:00 AM. Select **Schedule**. It appears under **Automations**.

**4. Add a trigger for urgent mail.** For requests that can't wait until tomorrow morning:

:::prompt
EN: Whenever [my manager] or anyone at [customer domain] emails me asking for something, summarise it in two lines and draft a reply in the sender's language for my review. Do not send it.
ID: Setiap kali [atasan saya] atau siapa pun dari [domain pelanggan] mengirim email yang meminta sesuatu dari saya, ringkas dalam dua baris dan buat draf balasan dalam bahasa pengirim untuk saya tinjau. Jangan kirim.
BM: Setiap kali [pengurus saya] atau sesiapa dari [domain pelanggan] menghantar e-mel meminta sesuatu daripada saya, ringkaskan dalam dua baris dan sediakan draf balasan dalam bahasa pengirim untuk saya semak. Jangan hantar.
:::

**After you run it:** a **Set up trigger** card (When: I receive an email). Check the details, then select **Activate automation**.
::::

## Check it

- **Count:** the answer says how many emails it read, and that number matches Outlook's unread count for the last 24 hours.
- **CC thread:** a request to you by name at the end of a long thread where you are only in CC is in **Act today**.
- **Systems:** an email saying an approval is waiting for you is in **Act today**; one saying something was already approved is not a request.
- **Reminders:** a reminder is merged with the original request, not listed twice.
- **Suspicious:** a fake password or sign-in email is listed with the reason, and nobody opened its link.
- **Languages (Cowork, Draft with Copilot):** a Bahasa Melayu email gets a Bahasa Melayu draft, an Indonesian one an Indonesian draft.
- **Nothing lost:** nothing was sent or deleted. Drafts are in **Drafts**, and noise is in *Read later*, not in Deleted Items.
- **With the demo story:** Act today holds the President Director's board input (12.00, with her reminder), the 11.00 meeting update, the overtime approval in the CC thread, the customer escalation, the SAP purchase order and the CFO's re-forecast; the fake "IT Helpdesk" email is Suspicious.

## When it goes wrong

- **Copilot read fewer emails than you have unread.** Copilot in Outlook searches and can stop at part of the inbox. Run the prompt in the Copilot app, where it keeps going in a background task, or use Cowork. (step 1)
- **Copilot says there are no other emails when you ask a follow-up.** A follow-up in the same chat reuses the first search. Start a new chat. (step 1)
- **A digest or late-task notification lands in Act today.** Add the sender to "notifications that need nothing from me" in your rules. (step 1)
- **A deadline looks already passed.** The sender wrote "today" or "tomorrow" in an email sent the evening before. Check the sent time before you act. (step 1)
- **Cowork drafted a reply to a no-reply system address.** Add "do not draft replies to system or no-reply senders" to your rules and recreate the skill. (step 2)
- **Cowork asks for approval for every email it moves.** That is by design. **More options** > **Always allow Move message** stops asking permanently; use it only once you trust the rules. (step 2)
- **The scheduled prompt stopped after two weeks.** The **Until** date ended. Edit it under **Settings and more** > **Scheduled prompts**. (step 2)

## Take it further

- Turn repeat noise senders into Outlook rules so tomorrow's inbox is smaller.
- Share your Email triage skill with your team from Cowork **Customize**, so everyone sorts by the same rules.
- Add a Friday check for requests you still owe people, which is the next routine in this library.
- A Microsoft Scout version (an automation at 07:00 with the summary in Teams) is being tested and will be added here.

:::presenter
**Session length:** 25 minutes. **Setup:** seed the demo inbox (40 unread emails dated this morning) and reset it between sessions; check the presenter account has no other morning automations that touch the inbox.

1. Show the inbox: 40 unread, three languages. Ask the room which email they would open first. (2 min)
2. Basic tier in Outlook. Point out the CC-thread request and the fake password email, and compare the count with Outlook's unread number. (6 min)
3. Premium: the same prompt in the Copilot app, where it reads every email in a background task; then Schedule this prompt. (6 min)
4. Cowork: run the skill, approve two or three Move cards, open Drafts to show the Bahasa Melayu reply. (8 min)
5. Close with the tier table: same routine, less of your time, nothing sent without you. (3 min)
:::
