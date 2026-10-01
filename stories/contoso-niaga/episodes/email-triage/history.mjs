const PIR_BLOCKS = [
  '# Post-Incident Review INC-2026-0914-001',
  '## Ringkasan eksekutif',
  'Pada {{d:-16:id}} pukul 09:12 WIB, Portal Mitra tidak dapat mengirim order ke SAP ECC karena koneksi dari API gateway ke ERP connector gagal pada validasi mTLS. Layanan order submission kembali normal pada 12:05 WIB setelah certificate internal diperbarui manual dan connector pool direstart bertahap. Insiden diklasifikasikan P1 karena berdampak langsung ke partner retail dan menghentikan proses order selama 2 jam 53 menit.',
  'Dampak bisnis terukur: 1.146 partner orders gagal atau masuk antrean retry, termasuk 212 order Wingtip; nilai order tertunda sekitar IDR 3,1 miliar; pemenuhan order bergeser 1 sampai 3 hari bergantung pada cut-off gudang dan jadwal pengiriman. Tidak ada indikasi data breach; Indra dan tim Security sudah meninjau log API gateway, WAF, dan ERP connector untuk periode insiden.',
  '## Timeline',
  { table: [
    ['Waktu WIB', 'Peristiwa', 'Owner'],
    ['09:12', 'Synthetic monitoring mencatat error submit order Portal Mitra; beberapa partner melaporkan HTTP 502.', 'NOC / Sarah Perez'],
    ['09:18', 'Incident bridge dibuka dan diklasifikasikan P1; Carlos, Lydia, Kian, dan Indra diinformasikan.', 'Sarah Perez'],
    ['09:31', 'API gateway sehat, namun ERP connector menolak handshake mTLS.', 'Lydia Bauer'],
    ['10:05', 'Akar masalah diarahkan ke certificate internal yang expired; auto-renew job tidak membuat alert.', 'Lydia Bauer'],
    ['10:42', 'Certificate diperbarui manual di primary gateway; antrean order mulai bergerak namun masih ada retry error.', 'Infrastructure & SRE'],
    ['11:20', 'Connector pool direstart bertahap; validasi dengan order test Wingtip dan dua partner lain berhasil.', 'Kian Lambert'],
    ['12:05', 'Layanan dinyatakan restored; backlog diproses dan monitoring diperketat sampai akhir hari.', 'Carlos Slattery']
  ] },
  '## Root cause',
  'Root cause teknis adalah certificate internal mTLS antara API gateway dan ERP connector yang expired. Auto-renew job gagal diam-diam selama 9 hari karena credential service account untuk job tersebut kehilangan izin menulis ke secret store setelah rotasi akses. Failover ke standby gateway tidak memulihkan layanan karena standby memakai certificate yang sama, sehingga desain failover tidak cukup independen untuk skenario certificate expiry.',
  '## 5-whys',
  '- Mengapa order gagal? ERP connector menolak koneksi mTLS dari API gateway.',
  '- Mengapa koneksi ditolak? Certificate internal sudah expired.',
  '- Mengapa certificate expired? Auto-renew job gagal dan tidak ada alert expiry 30/14/7 hari.',
  '- Mengapa job gagal tidak terlihat? Monitoring hanya memeriksa exit code scheduler, bukan bukti certificate baru di secret store.',
  '- Mengapa failover tidak membantu? Standby gateway menggunakan certificate yang sama sehingga failure domain tidak dipisahkan.',
  '## Impact',
  'Portal Mitra tidak dapat submit order selama 2 jam 53 menit. Total 1.146 order partner gagal atau tertahan di retry queue; 212 berasal dari Wingtip. Perkiraan nilai order yang tertunda adalah IDR 3,1 miliar. Sebagian besar order selesai diproses hari yang sama, tetapi pemenuhan fisik beberapa item bergeser 1 sampai 3 hari karena melewati cut-off gudang dan jadwal pengiriman. Tidak ada kehilangan order permanen setelah rekonsiliasi dengan SAP ECC dan WMS.',
  '## Tindakan korektif',
  { table: [
    ['No.', 'Tindakan', 'Owner', 'Due / status'],
    ['1', 'Certificate expiry monitoring dengan alert 30/14/7 hari untuk API gateway, ERP connector, dan service mesh.', 'Lydia Bauer', 'Done'],
    ['2', 'Pisahkan certificate standby gateway agar failover tidak berbagi failure domain yang sama.', 'Lydia Bauer', 'Done'],
    ['3', 'Quarterly failover test untuk Portal Mitra ke standby gateway; sesi pertama dijadwalkan {{d:+21:id-short}}.', 'Lydia Bauer / Kian Lambert', '{{d:+21:id-short}}'],
    ['4', 'Partner notification playbook untuk komunikasi P1, termasuk template update awal, update berkala, dan closure note.', 'Mona Kane with Lydia Bauer', 'In progress']
  ] },
  '## Lessons learned',
  'Pertama, monitoring expiry harus berdiri sendiri dari job renewal; sukses scheduler bukan bukti certificate aman. Kedua, komponen standby harus memutus shared dependency yang dapat menjadi single point of failure, termasuk certificate dan secret. Ketiga, partner besar seperti Wingtip membutuhkan komunikasi yang konsisten bahkan saat teknis masih diselidiki; update awal yang jelas lebih baik daripada menunggu root cause lengkap. Keempat, metrik bisnis seperti order value delayed perlu muncul di incident bridge sejak awal agar prioritas pemulihan dan komunikasi selaras.',
  '## Follow-up governance',
  'Problem record PRB-2026-0031 dipakai untuk melacak tindakan korektif dan ditutup oleh Problem Management pada {{d:-1:id}} setelah item monitoring dan standby certificate selesai diverifikasi. Item failover test dan partner notification playbook tetap dilaporkan dalam forum weekly coordination sampai selesai.'
];

export const HISTORY = [
  {
    id: 'H1',
    subject: 'Rencana cutover Proyek Nusa akhir pekan ini',
    importance: 'normal',
    body: `Halo Lydia, Pak Carlos, Serena,

Saya kirim rencana cutover Proyek Nusa versi kerja untuk akhir pekan ini supaya infra readiness bisa dikunci sebelum kita masuk freeze. Targetnya tetap change freeze mulai {{w:+2:id}} pukul 18:00, cutover dimulai {{w:+3:id}} pukul 06:00, dan window selesai maksimal {{w:+4:id}} pukul 18:00. Runbook yang dipakai adalah Cutover runbook v3.xlsx; saya update langkah aplikasi, sequencing batch, dan checkpoint rollback setelah hasil mock cutover 2.

Ringkas timeline: Jumat malam freeze dan final backup; Sabtu pagi export master data, konfigurasi delta, lalu migration wave 1; Sabtu sore integrasi Portal Mitra dan pricing; Minggu pagi reconciliation, regression smoke test, lalu business validation. Rollback point utama ada setelah backup final sebelum migration wave 1, dan satu decision point lagi setelah reconciliation sebelum Portal Mitra dibuka untuk partner.

Peran saat ini: saya cutover lead, Lydia owner infrastructure dan backup/restore, Serena owner regression Portal Mitra, Sarah koordinasi service desk, dan Elvia standby untuk data warehouse feed. Gap terbesar masih hari Sabtu: kita butuh 9 internal staff overtime dan 12 contractor Proseware untuk data validation serta batch monitoring. Biaya contractor sesuai rate Proseware adalah IDR 38.400.000 untuk satu hari, dan mereka minta konfirmasi tertulis paling lambat {{d:0:day-id}} pukul 16.00.

Lydia, boleh bantu review infra readiness: backup timing, DR status, kapasitas connector, monitoring, dan risiko shared certificate setelah pelajaran dari insiden Portal Mitra. Kalau ada blocker, saya ingin masukkan ke materi go/no-go call {{w:+2:day-id}} pukul 16.00.

Terima kasih,
Kian

Kian Lambert
Application Development Manager
Proyek Nusa - Cutover Lead`,
    attachments: []
  },
  {
    id: 'H2',
    subject: 'Konfirmasi slot maintenance Portal Mitra {{d:0:id-short}}',
    importance: 'normal',
    body: `Yth. Ibu Yohana,

Terima kasih untuk koordinasinya. Kami konfirmasi slot maintenance Portal Mitra pada {{d:0:id}} pukul 23.00-01.00 WIB. Window ini dipilih supaya tidak mengganggu cut-off order utama Wingtip dan partner lain.

Dampak yang diperkirakan: partner masih dapat login dan melihat katalog, tetapi submit order dapat mengalami intermittent error atau antrean selama pekerjaan connector berlangsung. Tim Contoso akan menahan perubahan bila validasi awal tidak memenuhi checklist, dan rollback dilakukan sebelum pukul 00.30 WIB jika ada risiko ke order pagi.

Kami tidak menjadwalkan perubahan pricing, katalog, atau akun partner pada window ini. Tujuan maintenance hanya stabilisasi connector dan validasi antrean order.

Kontak eskalasi selama window: Service Desk 5550 2200, lalu saya dan Lydia sebagai escalation bridge. Kami akan kirim update pembukaan dan closure melalui email thread ini.

Thanks,
Carlos

Carlos Slattery
Chief Technology Officer
PT Contoso Niaga Nusantara`,
    attachments: []
  },
  {
    id: 'H3',
    subject: 'Ringkasan PIR INC-2026-0914-001 dan tindakan korektif',
    importance: 'normal',
    body: `Halo Pak Carlos, Bu Adelia, Bu Mona,

Berikut ringkasan formal post-incident review untuk INC-2026-0914-001. Dokumen lengkap saya lampirkan sebagai PIR_INC-2026-0914-001.docx. PIR dilakukan pada {{d:-9:id}} dengan peserta Technology, Security, Sales, dan perwakilan service delivery. Kesimpulan utama: insiden disebabkan certificate internal mTLS antara API gateway dan ERP connector yang expired; auto-renew job gagal diam-diam selama 9 hari; failover tidak membantu karena standby gateway memakai certificate yang sama.

Timeline utama (WIB):
| 09:12 | Monitoring dan partner report menunjukkan order submit Portal Mitra gagal. |
| 09:18 | Bridge P1 dibuka; incident commander ditunjuk. |
| 09:31 | API gateway sehat, tetapi handshake ke ERP connector gagal. |
| 10:05 | Certificate expiry dikonfirmasi sebagai akar masalah. |
| 10:42 | Certificate diperbarui manual di primary gateway. |
| 11:20 | Connector pool direstart bertahap dan order test berhasil. |
| 12:05 | Layanan restored dan backlog diproses. |

Impact terukur: Portal Mitra tidak dapat submit order selama 2 jam 53 menit. Total 1.146 partner orders gagal atau masuk antrean retry, termasuk 212 order Wingtip. Nilai order tertunda sekitar IDR 3,1 miliar dan fulfillment bergeser 1 sampai 3 hari untuk sebagian order. Tidak ada indikasi data breach; Indra sudah meninjau log WAF, API gateway, dan connector untuk periode terkait.

Root cause teknis: certificate internal mTLS antara API gateway dan ERP connector expired. Auto-renew job tidak berhasil menulis certificate baru ke secret store setelah perubahan permission service account, tetapi monitoring hanya melihat scheduler exit code sehingga tidak membuat alert. Standby gateway juga memakai certificate yang sama, jadi failover tidak memutus failure domain. Ini bukan issue kapasitas, bukan perubahan release Portal Mitra, dan bukan gangguan SAP ECC.

Tindakan korektif:
1. Certificate expiry monitoring dengan alert 30/14/7 hari - owner Lydia - status done.
2. Certificate standby gateway dipisahkan dari primary - owner Lydia - status done.
3. Quarterly failover test Portal Mitra; sesi pertama dijadwalkan {{d:+21:id-short}} - owner Lydia/Kian.
4. Partner notification playbook - owner Mona with Lydia - status in progress.

Untuk governance, saya sarankan Direksi pack memakai empat action ini apa adanya supaya konsisten dengan PRB-2026-0031. Dua action sudah selesai dan diverifikasi melalui monitoring dashboard; satu action dijadwalkan sebagai failover test; satu action masih customer-facing playbook bersama Sales. Bila Wingtip meminta statement, kita bisa menyampaikan fakta impact, tindakan selesai, dan komitmen playbook tanpa menyebut detail internal secret store.

Lessons learned: monitoring renewal harus memvalidasi certificate baru, bukan hanya exit code job; standby harus punya failure domain independen; dan partner besar perlu update komunikasi lebih cepat meskipun root cause final belum lengkap. Problem record PRB-2026-0031 tetap menjadi tracking item sampai semua action selesai dan closure formal.

Salam,
Lydia

Lydia Bauer
Enterprise IT Architect | Infrastructure & SRE
PT Contoso Niaga Nusantara`,
    attachments: [
      { name: 'PIR_INC-2026-0914-001.docx', kind: 'docx', blocks: PIR_BLOCKS }
    ]
  },
  {
    id: 'H4',
    subject: 'Wingtip meminta playbook notifikasi partner untuk insiden P1',
    importance: 'normal',
    body: `Pak Carlos, Lydia,

Saya baru selesai call dengan Yohana dan tim operations Wingtip. Mereka appreciate restorasi teknisnya, tapi terus terang mereka masih sangat unhappy dengan cara komunikasi saat outage. Dari 212 order Wingtip yang terdampak, beberapa masuk ke kategori home delivery dengan janji ke end customer. Mereka merasa tahu ada masalah dari store dan customer duluan, bukan dari kita. Itu yang membuat trust issue-nya lebih besar daripada downtime 2 jam 53 menit.

Saya minta kita treat ini sebagai customer recovery, bukan sekadar PIR teknis. Wingtip minta dua hal konkret: pertama, partner notification playbook untuk P1 yang menjelaskan kapan update awal dikirim, siapa yang menyetujui wording, cadence update, dan closure note; kedua, direct escalation line ke Pak Carlos atau delegate yang jelas bila Portal Mitra berhenti menerima order. Saya bisa own relationship dan wording customer-facing, tetapi butuh input Lydia untuk fakta teknis dan severity trigger.

QBR Wingtip akan datang, dan saya tidak mau meeting itu berubah menjadi daftar keluhan tanpa tindakan. Kalau kita punya playbook dan escalation line sebelum QBR, pesannya lebih kuat: we listened, and we changed the operating model.

Saya juga minta satu halaman talking points untuk account team: apa yang terjadi, apa yang sudah selesai, dan apa yang berubah ke depan. Jangan terlalu teknis, tapi cukup spesifik supaya Wingtip merasa kita tidak menutup-nutupi.

Terima kasih,
Mona

Mona Kane
Chief Sales Officer`,
    attachments: []
  },
  {
    id: 'H5',
    subject: 'Q4 re-forecast calendar and template locations',
    importance: 'normal',
    body: `Division Heads,

Q4 re-forecast is now open. **Deadline: division inputs are due {{d:+1:id}} at 10:00 WIB.** Finance will consolidate the same afternoon, so late submissions will be reflected as central assumptions rather than division-owned inputs.

Template locations:
1. Finance SharePoint: /Finance/Forecast/Q4/Q4_Reforecast_Template_IT.xlsx for Technology.
2. /Finance/Forecast/Q4/Q4_Reforecast_Template_Sales.xlsx for Sales.
3. /Finance/Forecast/Q4/Q4_Reforecast_Template_Corp.xlsx for corporate functions.

Calendar:
| {{d:-5:day-en}} | Templates available and current YTD actuals locked. |
| {{d:-3:day-en}} | Finance office hours for questions on accruals and phasing. |
| {{d:+1:day-en}} 10:00 | Division submissions due. |
| {{d:+1:day-en}} 14:00-16:00 | Consolidation working session. |
| {{w:+2:day-en}} | CFO review and challenge questions issued. |

For IT, please split Oct-Dec across licences, cloud, and staff & contractors. The YTD sheet already shows the 6% overspend trend, mainly cloud consumption. Please call out any mitigation, including the reserved-instance renewal in November if Technology plans to proceed.

Please keep assumptions in the workbook rather than separate email threads. If a number is still pending, enter the best current estimate and mark the comment as provisional. Finance will use the workbook version saved at the deadline for the first consolidation pass.

Babak Shammas
Head of Financial Consolidation
Finance Division`,
    attachments: []
  },
  {
    id: 'H6',
    subject: 'Hasil mock cutover 2 Proyek Nusa dan rekomendasi proceed',
    importance: 'normal',
    body: `Pak Carlos, Lydia, Serena,

Mock cutover 2 selesai dan hasilnya cukup solid untuk dibawa ke go/no-go. Total elapsed time 31 jam dibanding window produksi 36 jam, jadi masih ada buffer 5 jam untuk issue handling dan business validation. Bottleneck terbesar tetap reconciliation pricing dan batch inventory, tetapi dua-duanya sudah turun dari mock pertama karena parallelisation dan pre-check data duplicate.

Ringkasan defect: total 7 defect, 0 critical, 2 high, 3 medium, 2 low. High defect pertama adalah mapping tax code untuk skenario consignment yang gagal di 18 sample order; owner Serena, fix sudah masuk branch release dan menunggu regression. High defect kedua adalah batch inventory delta yang restart manual setelah network hiccup; owner Lydia, mitigation masuk runbook dengan health check sebelum batch dimulai. Medium defect: label format di WMS outbound, latency API pricing pada peak replay, dan missing validation message untuk partner inactive. Low defect: typo di screen confirmation dan warna status di dashboard cutover.

Rekomendasi saya: proceed dengan syarat tiga go/no-go criteria dipenuhi. Satu, regression Portal Mitra clear untuk tax code dan inactive partner. Dua, backup final dan restore sample tervalidasi sebelum migration wave 1. Tiga, resource Sabtu dikunci, termasuk 9 internal staff overtime dan 12 contractor Proseware. Tanpa resource tambahan, buffer 5 jam bisa habis hanya untuk manual reconciliation.

Saya sudah update Cutover runbook v3.xlsx dengan defect actions, rollback point, dan owner per fase. Kalau ada concern, mohon kirim sebelum call {{w:+2:day-id}} pukul 16.00 supaya tidak dibahas pertama kali saat go/no-go.

Terima kasih,
Kian

Kian Lambert
Application Development Manager
Proyek Nusa - Cutover Lead`,
    attachments: []
  }
];
