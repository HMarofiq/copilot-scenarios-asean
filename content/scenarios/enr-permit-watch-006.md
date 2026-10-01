---
id: enr-permit-watch-006
title: { en: "Permit and licence expiry watcher", id: "Pemantau masa berlaku izin", ms: "Pemantau tamat tempoh permit dan lesen" }
summary:
  en: "A daily Scout automation that reads the permit register and drafts reminders at 90, 60 and 30 days before expiry."
  id: "Otomasi Scout harian yang membaca register izin dan menyiapkan draf pengingat 90, 60, dan 30 hari sebelum kedaluwarsa."
  ms: "Automasi Scout harian yang membaca daftar permit dan menyediakan draf peringatan 90, 60 dan 30 hari sebelum tamat tempoh."
industry: [energy-resources]
department: [legal-compliance, operations]
persona: [site-manager]
market: [ID, MY]
difficulty: 3
surface: [scout, excel, outlook, teams]
licence: [m365-copilot, scout]
inputs:
  - { name: "Permit register", format: ".xlsx", where: "SharePoint Legal library", count: "1 (80-300 rows)" }
data: { sensitivity: "Internal", customer_pii: false, signoff: "Site Manager" }
impact: { baseline: "Missed renewals found at audit", target: "Every permit flagged 90 days out", evidence: estimated }
card:
  problem: "IUP, environmental approvals and water licences expire on different cycles, and one lapse can stop operations."
  output: "Daily check, draft reminder emails to each permit owner, and a weekly digest in the site Teams channel."
limits:
  - "Scout runs on your desktop. The automation only runs while the app is running."
  - "Reminders are left as drafts for review, never sent automatically."
  - "If the register is in OneDrive or SharePoint with an encrypting sensitivity label, Scout reads it through Excel under your permissions. Keep the app signed in."
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
status: partly-validated
validated_on: 2026-09-28
validation_note: "Run as a Scout automation on a Monday against the demo kit: all 12 expected reminders drafted (6 thresholds, 4 weekend crossings, 2 expired), no false positives, text date caught. Drafts and the digest were written to files; creating Outlook drafts and posting to Teams were not exercised."
---

## Situation

Mining and plantation sites track Indonesian and Malaysian permits, environmental approvals and ratings in a register. A daily check should flag upcoming renewals before they are missed.

## Steps

**1. Clean the register.** One row per permit with Permit, Authority, Owner email, Expiry date, Renewal lead time (days).

**2. Create the Scout automation,** scheduled every weekday at 07:30, written as a top-down procedure:

:::prompt
EN: RUN THIS NOW, TOP TO BOTTOM. 1. Open the Permit Register workbook. 2. For each permit, work out days left as Expiry date minus today. If an Expiry date is typed as text instead of a date value, read it as day/month/year, use it, and add the permit to a Needs fixing list. If it cannot be read at all, add it to an Unreadable list. Never skip a permit silently. 3. Select permits where days left is exactly 90, 60 or 30, or below 0. If today is Monday, also select 88 or 89, 58 or 59, and 28 or 29 days, because this automation does not run on Saturday or Sunday. 4. For each selected permit, draft (do not send) an email to the Owner with permit name, authority, site, expiry date, days left and renewal lead time. 5. On Mondays, post a digest table to the Site Compliance channel. 6. Report what you drafted, the Needs fixing list and the Unreadable list.
ID: JALANKAN SEKARANG, DARI ATAS KE BAWAH. 1. Buka workbook Register Izin. 2. Untuk setiap izin, hitung sisa hari sebagai Tanggal kedaluwarsa dikurangi hari ini. Jika Tanggal kedaluwarsa diketik sebagai teks, bukan nilai tanggal, baca sebagai hari/bulan/tahun, gunakan, dan masukkan izin itu ke daftar Perlu Diperbaiki. Jika sama sekali tidak bisa dibaca, masukkan ke daftar Tidak Terbaca. Jangan pernah melewati izin diam-diam. 3. Pilih izin dengan sisa hari tepat 90, 60, atau 30, atau kurang dari 0. Jika hari ini Senin, pilih juga 88 atau 89, 58 atau 59, dan 28 atau 29 hari, karena otomasi ini tidak berjalan pada Sabtu dan Minggu. 4. Untuk setiap izin terpilih, buat draf (jangan kirim) email ke Pemilik berisi nama izin, instansi, lokasi, tanggal kedaluwarsa, sisa hari, dan waktu perpanjangan. 5. Setiap Senin, kirim tabel ringkasan ke kanal Site Compliance. 6. Laporkan draf yang dibuat, daftar Perlu Diperbaiki, dan daftar Tidak Terbaca.
BM: JALANKAN SEKARANG, DARI ATAS KE BAWAH. 1. Buka buku kerja Daftar Permit. 2. Bagi setiap permit, kira baki hari sebagai Tarikh tamat tempoh tolak hari ini. Jika Tarikh tamat tempoh ditaip sebagai teks, bukan nilai tarikh, baca sebagai hari/bulan/tahun, gunakannya, dan masukkan permit itu ke senarai Perlu Dibetulkan. Jika langsung tidak dapat dibaca, masukkan ke senarai Tidak Dapat Dibaca. Jangan sekali-kali melangkau permit secara senyap. 3. Pilih permit dengan baki hari tepat 90, 60 atau 30, atau kurang daripada 0. Jika hari ini Isnin, pilih juga 88 atau 89, 58 atau 59, dan 28 atau 29 hari, kerana automasi ini tidak berjalan pada Sabtu dan Ahad. 4. Bagi setiap permit yang dipilih, sediakan draf (jangan hantar) e-mel kepada Pemilik dengan nama permit, pihak berkuasa, tapak, tarikh tamat tempoh, baki hari dan tempoh pembaharuan. 5. Setiap Isnin, hantar jadual ringkasan ke saluran Site Compliance. 6. Laporkan draf yang disediakan, senarai Perlu Dibetulkan dan senarai Tidak Dapat Dibaca.
:::

**3. Run it once manually** and compare drafted reminders against a filter you build yourself in Excel.

## Check it

- The manual Excel filter and Scout's list must match exactly on the first run. The demo kit's answer key recalculates from today's date when you open it.
- Run it once on a Monday: permits that crossed a threshold over the weekend must appear.

## When it goes wrong

- **A permit that should be flagged is missing.** Its expiry date is stored as text and the run skipped it. With the prompt above it appears on the Needs fixing list instead; convert the column to real dates.
- **A text date is read as the wrong month.** Text such as 05/11/2026 is read as 5 November. If your register was typed month first, say so in step 2, or fix the column.
- **Reminders are missed after weekends.** The prompt only checked exact thresholds. Keep the Monday rule in step 3.
- **The automation did nothing.** Scout was not running at 07:30. Check the run history and keep the app open during working hours.

## Take it further

- **L4 Agent:** a permit Q&A agent grounded on the permit documents themselves, not only the register.

:::presenter
**Ask before you start:** Who owns the register? When was the last renewal that almost slipped?

**Demo kit:** an 80-permit register across 8 fictional sites, with expiry dates regenerated every night so there are always live hits, weekend crossings, a text-date trap and a self-updating answer key.
:::
