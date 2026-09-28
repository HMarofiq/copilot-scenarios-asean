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
source_refs: ["https://learn.microsoft.com/copilot/microsoft-365/"]
validated_on: 2026-09-26
---

## Situation

Mining and plantation sites hold dozens of permits: IUP, environmental approval (AMDAL, persetujuan lingkungan), PROPER rating, and in Malaysia DOE EIA approvals and water abstraction licences. The register exists; nobody reads it daily.

## Steps

**1. Clean the register.** One row per permit with Permit, Authority, Owner email, Expiry date, Renewal lead time (days).

**2. Create the Scout automation,** scheduled every weekday at 07:30, written as a top-down procedure:

:::prompt
EN: RUN THIS NOW, TOP TO BOTTOM. 1. Open the Permit Register workbook. 2. Find permits where Expiry date minus today is 90, 60 or 30 days, or already past. 3. For each, draft (do not send) an email to the Owner with permit name, authority, expiry date and renewal lead time. 4. On Mondays, post a digest table to the Site Compliance channel. 5. Report what you drafted.
ID: JALANKAN SEKARANG, DARI ATAS KE BAWAH. 1. Buka workbook Register Izin. 2. Cari izin yang tanggal kedaluwarsanya 90, 60, atau 30 hari lagi, atau sudah lewat. 3. Untuk setiap izin, buat draf (jangan kirim) email ke Pemilik berisi nama izin, instansi, tanggal kedaluwarsa, dan waktu perpanjangan. 4. Setiap Senin, kirim tabel ringkasan ke kanal Site Compliance. 5. Laporkan draf yang dibuat.
BM: JALANKAN SEKARANG, DARI ATAS KE BAWAH. 1. Buka buku kerja Daftar Permit. 2. Cari permit yang tarikh tamat tempohnya 90, 60 atau 30 hari lagi, atau telah lepas. 3. Bagi setiap permit, sediakan draf (jangan hantar) e-mel kepada Pemilik dengan nama permit, pihak berkuasa, tarikh tamat dan tempoh pembaharuan. 4. Setiap Isnin, hantar jadual ringkasan ke saluran Site Compliance. 5. Laporkan draf yang disediakan.
:::

**3. Run it once manually** and compare drafted reminders against a filter you build yourself in Excel.

## Check it

- The manual Excel filter and Scout's list must match exactly on the first run.

## When it goes wrong

- **No reminders although permits are due.** Expiry dates are stored as text. Convert the column to real dates.
- **The automation did nothing.** Scout was not running at 07:30. Check the run history and keep the app open during working hours.

## Take it further

- **L4 Agent:** a permit Q&A agent grounded on the permit documents themselves, not only the register.

:::presenter
**Ask before you start:** Who owns the register? When was the last renewal that almost slipped?
:::
