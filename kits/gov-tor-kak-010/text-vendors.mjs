const p = (text) => text.trim().split('\n').map((line) => line.trim()).filter(Boolean);

export const PROPOSAL_A = [
  ...p(`
# Surat Penawaran
Nomor: 090/TRS-ZLN/EAM/IX/2026
Jakarta, 21 September 2026
Kepada Yth. Ketua Tim Evaluasi / Panitia Pengadaan PT Zava Logistik Nusantara
Perihal: Penawaran Pengadaan Sistem Enterprise Asset Management (EAM) Grup berbasis SaaS, Tender No. 0142/PGD-ZLN/VIII/2026
Dengan hormat, bersama surat ini PT Trey Riset Solusi menyampaikan penawaran teknis dan administrasi untuk penyediaan Trey Asset360 bagi lingkungan Zava Logistik Group. Penawaran kami disusun berdasarkan dokumen pengadaan, berita acara aanwijzing, serta klarifikasi yang diterima sampai batas pemasukan. Kami menyatakan telah menerima dan memahami Adendum 1 tanggal 11 September 2026 (Surat Pernyataan Menerima Adendum 1 bermeterai terlampir sebagai Lampiran 3) dan telah menyesuaikan kapasitas pengguna, arsitektur layanan, serta rencana implementasi dalam dokumen ini.
Penawaran ini berlaku selama 90 hari kalender sejak batas akhir pemasukan penawaran, yaitu sampai dengan 20 Desember 2026. Apabila kami ditetapkan sebagai penyedia, kami siap menandatangani kontrak dan memulai kick-off sesuai jadwal yang disepakati dengan PT Zava Logistik Nusantara.
Hormat kami,
**Raka Pramudya**
Direktur Utama, PT Trey Riset Solusi
Telepon: +62-21-555-0188 | surel: proposal@treyriset.example
## Daftar Isi
- Surat Penawaran
- Profil Perusahaan
- Pemahaman Lingkup Pekerjaan
- Solusi Trey Asset360
- Matriks Kepatuhan
- Hosting dan Keamanan
- Rencana Implementasi dan Jadwal
- Personel Inti dan Ringkasan CV
- Pernyataan TKDN
- Ringkasan Komersial
## Profil Perusahaan
PT Trey Riset Solusi adalah perusahaan teknologi informasi yang berfokus pada sistem manajemen aset, pemeliharaan, dan analitik operasi untuk industri logistik, utilitas, transportasi, dan fasilitas terpadu. Sejak 2014 kami mengembangkan platform Trey Asset360 sebagai layanan SaaS dengan konfigurasi proses kerja yang dapat diadaptasi untuk holding dan anak usaha. Tim kami berkantor di Jakarta Selatan dan Bandung, dengan pusat layanan pelanggan 555-0142 dan domain korespondensi treyriset.example.
Dalam tiga tahun terakhir kami menangani proyek EAM untuk operator gudang berpendingin, perusahaan pelabuhan kering, dan jaringan fasilitas distribusi nasional. Pengalaman tersebut relevan dengan kondisi Zava Logistik Group yang memiliki 20 anak usaha, lokasi operasional tersebar, serta kebutuhan konsolidasi data aset dari berbagai format spreadsheet. Pendekatan kami konservatif: memastikan data, kontrol akses, integrasi, dan tata kelola perubahan berjalan tertib sebelum perluasan penuh.
## Pemahaman Lingkup Pekerjaan
Kami memahami bahwa PT Zava Logistik Nusantara memerlukan Sistem Enterprise Asset Management Grup berbasis SaaS untuk 500 named users selama tiga tahun, mencakup pencatatan aset, preventive dan corrective maintenance, work order, spare part, inspeksi, dashboard manajemen, migrasi data, pelatihan, serta integrasi SAP S/4HANA melalui konektor API standar. Sistem harus mendukung 20 anak usaha, 63 lokasi, dan berbagai kelompok aset seperti dermaga, forklift, truk, cold room, conveyor, genset, dan fasilitas gudang.
Kunci keberhasilan menurut kami adalah keseragaman master data tanpa menghilangkan kebutuhan lokal. Oleh sebab itu, rancangan awal kami membagi konfigurasi menjadi tiga lapisan: standar grup, parameter anak usaha, dan hak akses per lokasi. Rapat desain akan melibatkan Direktorat Operasi, TI, Keuangan, dan key user anak usaha sehingga setiap keputusan konfigurasi dapat ditelusuri. Kami juga memahami perlunya audit trail, log persetujuan, serta pelaporan yang dapat dipertanggungjawabkan untuk lingkungan BUMN.
## Solusi Trey Asset360
Trey Asset360 v5 adalah platform EAM SaaS yang mencakup asset registry, maintenance planning, mobile work order, inventory issue, inspection checklist, warranty tracking, cost allocation, dan dashboard kinerja. Modul mobile mendukung pekerjaan lapangan dengan foto, tanda tangan digital, geotag terbatas, dan mode koneksi tidak stabil. Untuk Zava Logistik Group, kami menawarkan 500 named users yang dapat dialokasikan ke holding dan anak usaha berdasarkan daftar final dari pemilik pekerjaan.
Solusi kami menyediakan konektor API standar untuk SAP S/4HANA guna sinkronisasi cost center, vendor, material tertentu, dan posting referensi work order sesuai desain integrasi. Konektor standar sudah termasuk dalam harga. Namun pekerjaan khusus SAP di luar konektor API standar, termasuk perubahan BAPI, enhancement, atau mapping khusus yang tidak disepakati dalam desain awal, dikenakan biaya man-day sebesar IDR 12.500.000 dan berada di luar total penawaran.
## Matriks Kepatuhan
`),
  { table: [
    ['No.', 'Persyaratan', 'Status', 'Keterangan'],
    ['1', 'SaaS EAM untuk 500 named users', 'Comply', 'Ditawarkan 500 named users selama tiga tahun.'],
    ['2', 'Mendukung 20 anak usaha', 'Comply', 'Struktur tenant grup dan unit usaha tersedia.'],
    ['3', 'DC dan DRC di Indonesia', 'Comply', 'DC Jakarta (Cikarang), DRC Surabaya.'],
    ['4', 'ISO 27001', 'Comply', 'Operasional cloud mengikuti sertifikasi ISO 27001.'],
    ['5', 'Migrasi data spreadsheet', 'Comply', 'Termasuk cleansing template dan tiga siklus migrasi.'],
    ['6', 'Integrasi SAP S/4HANA', 'Comply', 'Konektor API standar termasuk; pekerjaan khusus dikenakan man-day.'],
    ['7', 'Audit trail dan role based access', 'Comply', 'Audit konfigurasi, transaksi, dan persetujuan tersedia.'],
    ['8', 'Pelatihan admin dan key user', 'Comply', '16 sesi sesuai daftar kuantitas.'],
    ['9', 'Laporan manajemen grup', 'Comply', 'Dashboard KPI, backlog, biaya, dan availability.'],
    ['10', 'Go-live bertahap', 'Comply', 'Pilot Desember 2026, roll-out setelah stabilisasi.'],
    ['11', 'Kustomisasi tanpa kendali perubahan', 'Partially', 'Kami mensyaratkan change request tertulis untuk perubahan besar.'],
  ] },
  ...p(`
## Hosting dan Keamanan
Layanan Trey Asset360 ditempatkan pada pusat data Cikarang untuk region Jakarta dengan disaster recovery center di Surabaya. Keduanya berada di Indonesia dan terhubung melalui replikasi terenkripsi. Target pemulihan disusun pada tahap desain rinci, dengan usulan awal RPO empat jam dan RTO delapan jam untuk layanan aplikasi. Data pelanggan dipisahkan secara logical tenant, terenkripsi saat transit menggunakan TLS, dan terenkripsi saat tersimpan menggunakan kunci yang dikelola oleh penyedia layanan cloud.
Pengendalian keamanan mencakup multi-factor authentication, integrasi SSO berbasis SAML atau OpenID Connect, prinsip least privilege, vulnerability scanning berkala, hardening image, serta pencatatan akses administratif. Organisasi operasi kami menerapkan ISO 27001 dan prosedur insiden 24x7. Laporan insiden, jika terjadi, akan disampaikan melalui kontak yang disepakati dan mencakup kronologi awal, dampak, tindakan korektif, serta pencegahan berulang.
## Rencana Implementasi dan Jadwal
`),
  { table: [
    ['Bulan', 'Tahap', 'Keluaran Utama'],
    ['1', 'Kick-off dan discovery', 'Project charter, daftar stakeholder, rencana mutu.'],
    ['2', 'Desain proses dan data', 'Blueprint konfigurasi, kamus data, rencana integrasi.'],
    ['3', 'Konfigurasi inti', 'Asset registry, work order, preventive maintenance.'],
    ['4', 'Migrasi awal dan integrasi', 'Data trial, konektor SAP standar di test environment.'],
    ['5', 'UAT gelombang 1', 'Daftar temuan, penyesuaian konfigurasi.'],
    ['6', 'Pilot Desember 2026', 'Pilot pada unit terpilih, laporan stabilisasi.'],
    ['7', 'Roll-out gelombang 1', 'Anak usaha prioritas dan dashboard grup.'],
    ['8', 'Roll-out gelombang 2', 'Sisa unit, pelatihan tambahan, cutover.'],
    ['9', 'Go-live grup dan hypercare', 'BAST, hypercare, transfer knowledge.'],
  ] },
  ...p(`
Rencana sembilan bulan tersebut mempertimbangkan jumlah anak usaha dan kesiapan data yang beragam. Kami tidak menyarankan big bang tanpa pilot, karena risiko perbedaan kode aset dan kebiasaan pencatatan maintenance di lapangan cukup tinggi. Pilot pada Desember menjadi titik validasi desain, bukan sekadar seremonial. Setelah pilot, backlog issue akan ditutup sebelum roll-out berikutnya.
## Personel Inti dan Ringkasan CV
`),
  { table: [
    ['Peran', 'Nama', 'Pengalaman', 'Sertifikasi / Ringkasan'],
    ['Project Manager', 'Ardiansyah Wibowo', '11 tahun', 'PMP, Scrum Master; memimpin 3 implementasi EAM untuk logistik dan fasilitas.'],
    ['Solution Architect', 'Maya Larasati', '10 tahun', 'Cloud Architecture Associate; desain multi-entity EAM dan integrasi ERP.'],
    ['Functional Lead', 'Nanda Permana', '8 tahun', 'Reliability maintenance, preventive planning, asset taxonomy.'],
    ['Integration Lead', 'Rizal Mahendra', '9 tahun', 'API management, SAP S/4HANA integration, message monitoring.'],
    ['Security Officer', 'Sekar Amalia', '7 tahun', 'ISO 27001 implementer, risk register, access review.'],
    ['Data Migration Lead', 'Bimo Prasetyo', '8 tahun', 'ETL, cleansing aset, rekonsiliasi master data.'],
  ] },
  ...p(`
Project Manager kami, Ardiansyah Wibowo, akan menjadi satu pintu koordinasi harian. Ia memiliki 11 tahun pengalaman proyek teknologi operasional dan telah menyelesaikan 3 implementasi EAM. Ringkasan CV lengkap disertakan dalam lampiran administrasi, termasuk riwayat proyek, pendidikan, sertifikasi, dan pernyataan ketersediaan selama masa implementasi.
## Pernyataan TKDN
PT Trey Riset Solusi melampirkan sertifikat TKDN untuk produk Trey Asset360 v5 atas nama PT Trey Riset Solusi dengan nilai TKDN 36,4% dan BMP 6,7%, sehingga total preferensi yang dinyatakan adalah 43,1%. Sertifikat tersebut berlaku sampai 14 Maret 2028. Komponen lokal berasal dari pengembangan aplikasi, dukungan implementasi, pusat layanan, dokumentasi, dan tenaga ahli dalam negeri. Kami bersedia memperlihatkan dokumen asli atau salinan terlegalisasi pada saat klarifikasi administrasi.
## Ringkasan Komersial
Rincian harga lengkap kami sampaikan dalam lampiran Excel **Daftar Kuantitas dan Harga**. Ringkasan nilai penawaran adalah **Rp12.877.680.000 belum termasuk PPN**. Harga mencakup langganan Trey Asset360 untuk 500 named users selama tiga tahun, implementasi, migrasi data, pelatihan, dan integrasi SAP S/4HANA melalui konektor API standar. harga langganan tahun ke-2 dan ke-3 naik 7% per tahun sebagaimana tercantum dalam Daftar Kuantitas dan Harga. Seluruh harga belum termasuk PPN, pajak diperlakukan sesuai ketentuan yang berlaku, dan pekerjaan custom SAP di luar konektor standar dikenakan IDR 12.500.000 per man-day di luar total penawaran.
Kami berharap pendekatan yang tertib, transparan, dan realistis ini memberi keyakinan kepada Tim Evaluasi bahwa Trey Riset Solusi mampu mendampingi Zava Logistik Group dalam membangun tata kelola aset yang konsisten lintas anak usaha. Komitmen kami bukan hanya menyediakan aplikasi, melainkan memastikan penggunaan sistem menjadi bagian dari ritme kerja operasi sehari-hari.
`),
];

export const PROPOSAL_B = [
  ...p(`
# Surat Penawaran
Nomor: 211/RSI-MAINT/ZLN/IX/2026
Jakarta, 21 September 2026
Kepada Yth. Ketua Tim Evaluasi / Panitia Pengadaan PT Zava Logistik Nusantara
Perihal: Penawaran Relecloud Maintain untuk Tender No. 0142/PGD-ZLN/VIII/2026 - Pengadaan Sistem Enterprise Asset Management (EAM) Grup berbasis SaaS
Dengan hormat, PT Relecloud Sistem Indonesia dengan bangga menyampaikan penawaran terbaik untuk mendukung transformasi manajemen aset Zava Logistik Group. Kami telah membaca dokumen pengadaan, mengikuti penjelasan pekerjaan, dan menyatakan bahwa kami telah menerima serta memahami Adendum 1 tanggal 11 September 2026; surat pernyataan terkait kami lampirkan. Relecloud Maintain kami posisikan sebagai platform modern, cepat diimplementasikan, dan mudah diterima pengguna lapangan karena tampilan yang sederhana dan alur kerja yang siap pakai.
Penawaran ini berlaku 60 hari kalender sejak batas akhir pemasukan, sampai 20 November 2026. Kami percaya masa berlaku tersebut cukup untuk proses evaluasi dan negosiasi yang efisien, serta kami siap memperbarui administrasi apabila diperlukan oleh Panitia. Proposal ini disusun dengan format ringkas agar Tim Evaluasi segera melihat nilai tambah, biaya total, dan kesiapan kami untuk bergerak cepat.
Hormat kami,
**Dewi Anggraini**
Direktur Komersial, PT Relecloud Sistem Indonesia
Telepon: +62-21-555-0260 | surel: tender@relecloud-id.example
## Daftar Isi
- Surat Penawaran
- Profil Perusahaan
- Pemahaman Kebutuhan Zava Logistik Group
- Solusi Relecloud Maintain
- Matriks Kepatuhan
- Hosting, Keamanan, dan Layanan
- Metodologi Implementasi
- Tim Proyek dan CV Singkat
- Pernyataan TKDN
- Ringkasan Harga
## Profil Perusahaan
PT Relecloud Sistem Indonesia adalah penyedia solusi cloud bisnis yang membantu organisasi besar mempercepat digitalisasi proses operasional. Portofolio kami meliputi aplikasi enterprise untuk sumber daya manusia, pemeliharaan aset, layanan pelanggan internal, workflow approval, dan pelaporan manajemen. Kami dikenal karena implementasi yang cepat, tampilan pengguna yang bersih, serta paket dukungan yang responsif melalui service desk 555-0277.
Relecloud Maintain dikembangkan dari pengalaman kami dalam membangun platform proses berskala besar. Untuk pelanggan holding, kami menyiapkan template multi-company, role matrix, dan dashboard eksekutif yang dapat digunakan sejak minggu awal. Nilai utama kami adalah membuat pengguna lapangan mau memakai sistem, bukan hanya menyelesaikan instalasi. Oleh karena itu desain layar, notifikasi, dan mobile checklist dibuat sesederhana mungkin.
## Pemahaman Kebutuhan Zava Logistik Group
Kami memahami Zava Logistik Group memerlukan satu sistem EAM berbasis SaaS untuk 500 named users yang tersebar pada holding dan 20 anak usaha. Sistem harus mencatat aset, menjadwalkan preventive maintenance, mengelola corrective work order, mendukung migrasi data spreadsheet, menyediakan dashboard grup, dan terhubung dengan SAP S/4HANA. Kebutuhan ini tidak hanya teknis, tetapi juga perubahan cara kerja dari pencatatan terpisah menjadi standar grup.
Bagi kami, tantangan terbesar adalah adopsi. Banyak proyek EAM gagal bukan karena fitur kurang, melainkan karena teknisi lapangan merasa sistem terlalu rumit. Relecloud Maintain menekankan tampilan mobile first, approval yang jelas, dan laporan yang otomatis tersusun dari transaksi harian. Dengan demikian manajemen memperoleh visibilitas, sementara pengguna lapangan tetap merasa pekerjaannya dibantu.
## Solusi Relecloud Maintain
Relecloud Maintain menyediakan modul asset registry, work request, work order, preventive maintenance, inspection checklist, material request, downtime log, SLA, dan dashboard. Paket yang kami tawarkan mencakup 500 named users selama tiga tahun. Hak akses dapat dibagi menjadi admin grup, admin anak usaha, planner, supervisor, teknisi, approver, auditor, dan viewer manajemen. Setiap transaksi memiliki jejak waktu, pengguna, status, dan lampiran.
Untuk integrasi SAP, kami menawarkan paket integrasi yang sudah termasuk dalam total harga. Tim kami akan memetakan master cost center, material, vendor, dan referensi biaya sesuai workshop. Relecloud Maintain juga menyediakan import template untuk data aset agar migrasi dari spreadsheet dapat dilakukan cepat. Kami menyediakan konfigurasi awal kategori aset yang umum di pelabuhan, pergudangan, trucking, dan cold storage sehingga waktu desain dapat dipersingkat.
## Matriks Kepatuhan
`),
  { table: [
    ['No.', 'Persyaratan', 'Status', 'Keterangan'],
    ['1', 'Jumlah pengguna 500 named users', 'Comply', 'Paket penawaran memuat 500 named users.'],
    ['2', 'SaaS selama 3 tahun', 'Comply', 'Langganan tiga tahun tercakup dalam harga.'],
    ['3', 'DC di Indonesia', 'Comply', 'Primary DC Jakarta.'],
    ['4', 'DRC di Indonesia', 'Comply', 'DRC Batam.'],
    ['5', 'Asset registry dan work order', 'Comply', 'Fitur standar Relecloud Maintain.'],
    ['6', 'Preventive maintenance', 'Comply', 'Calendar, meter based, dan checklist tersedia.'],
    ['7', 'Migrasi spreadsheet', 'Comply', 'Termasuk template, validasi, dan upload.'],
    ['8', 'Integrasi SAP S/4HANA', 'Comply', 'Termasuk paket integrasi dalam harga.'],
    ['9', 'Pelatihan pengguna', 'Comply', '10 sesi pelatihan kelas dan virtual.'],
    ['10', 'Sertifikat TKDN', 'Comply', 'Dilampirkan sertifikat Relecloud HRIS v4 atas nama perusahaan.'],
    ['11', 'Masa berlaku penawaran 90 hari', 'Partially', 'Penawaran berlaku 60 hari kalender sampai 20 November 2026.'],
  ] },
  ...p(`
## Hosting, Keamanan, dan Layanan
Arsitektur Relecloud Maintain ditempatkan pada primary data center Jakarta dengan disaster recovery center di Batam. Desain ini menjaga data tetap berada di Indonesia dan memberikan jalur pemulihan jika terjadi gangguan besar. Koneksi antarlokasi menggunakan replikasi terenkripsi. Kami menyediakan lingkungan produksi, staging, dan UAT sehingga perubahan konfigurasi dapat diuji sebelum diterapkan.
Keamanan layanan mencakup enkripsi TLS, enkripsi data tersimpan, role based access control, opsi SSO, kebijakan password, audit log, session timeout, backup harian, monitoring performa, dan prosedur eskalasi insiden. Service desk kami aktif pada jam kerja dengan opsi eskalasi kritikal di luar jam kerja. Laporan bulanan akan menampilkan availability, ticket, perubahan konfigurasi, dan rekomendasi perbaikan adopsi.
## Metodologi Implementasi
Metodologi Relecloud Sprint Adoption menekankan hasil yang terlihat sejak awal. Minggu pertama digunakan untuk kick-off, pengumpulan data, dan aktivasi tenant. Minggu berikutnya fokus pada konfigurasi proses utama, import data awal, dan tinjauan layar kepada key user. Setelah itu kami menjalankan UAT, pelatihan, cutover, dan pendampingan. Pendekatan ini membuat manajemen dapat melihat progres nyata tanpa menunggu akhir proyek.
`),
  { table: [
    ['Bulan', 'Tahap', 'Output'],
    ['1', 'Initiate', 'Kick-off, daftar user, project plan, risk log.'],
    ['2', 'Configure', 'Tenant, struktur anak usaha, role, workflow.'],
    ['3', 'Data First Load', 'Template aset dan lokasi, migrasi awal.'],
    ['4', 'Integration Setup', 'Mapping SAP dan uji konektivitas.'],
    ['5', 'UAT', 'Skenario uji, defect list, konfigurasi revisi.'],
    ['6', 'Training', '10 sesi untuk admin, planner, teknisi, dan manajemen.'],
    ['7', 'Pilot and Cutover', 'Pilot unit prioritas dan cutover bertahap.'],
    ['8', 'Roll-out', 'Perluasan ke anak usaha lain.'],
    ['9', 'Hypercare', 'Pendampingan, laporan adopsi, BAST.'],
  ] },
  ...p(`
Kami mengusulkan durasi implementasi sembilan bulan agar cukup bagi koordinasi 20 anak usaha, tetapi tetap agresif. Tim Relecloud akan menyiapkan papan kendali proyek yang menampilkan status aktivitas, risiko, isu, keputusan, dan kesiapan data. Untuk menjaga momentum, kami meminta setiap anak usaha menunjuk minimal satu process owner dan satu data owner sejak kick-off.
## Tim Proyek dan CV Singkat
`),
  { table: [
    ['Peran', 'Nama', 'Pengalaman', 'Sertifikasi / Ringkasan'],
    ['Project Manager', 'Fajar Wiratama', '9 tahun', 'Agile Project Lead; 2 proyek EAM, 5 proyek workflow enterprise.'],
    ['Engagement Director', 'Marina Salsabila', '13 tahun', 'Program governance, steering committee, eskalasi eksekutif.'],
    ['Solution Consultant', 'Bagus Kurnia', '8 tahun', 'Maintenance process, mobile adoption, user journey.'],
    ['SAP Integration Specialist', 'Tirta Nugroho', '7 tahun', 'API integration, middleware mapping, SAP data objects.'],
    ['Data Lead', 'Citra Wulandari', '6 tahun', 'Data cleansing, import template, validation report.'],
    ['Training Lead', 'Laras Putri', '8 tahun', 'Change management, training material, user coaching.'],
  ] },
  ...p(`
Project Manager Fajar Wiratama akan memimpin operasional harian. Ia memiliki 9 tahun pengalaman dan telah mengelola 2 proyek EAM, termasuk implementasi untuk operator fasilitas dan jaringan transportasi. Gaya manajemennya praktis: isu tidak menumpuk, keputusan dicatat, dan pengguna bisnis selalu diberi contoh layar yang mudah dipahami.
## Pernyataan TKDN
Sebagai bagian dari dokumen administrasi, PT Relecloud Sistem Indonesia melampirkan sertifikat TKDN untuk Relecloud HRIS v4 atas nama PT Relecloud Sistem Indonesia dengan nilai TKDN 38,2% dan BMP 7,5%, berlaku sampai 30 Juni 2027. Kami menyampaikan sertifikat tersebut sebagai bukti komitmen Relecloud terhadap pengembangan produk dan layanan di Indonesia. Dalam pelaksanaan Relecloud Maintain, tenaga implementasi, pelatihan, konfigurasi, dan dukungan pelanggan seluruhnya berasal dari tim lokal Indonesia.
## Ringkasan Harga
Rincian harga lengkap terdapat pada lampiran Excel **Daftar Kuantitas dan Harga**. Total harga penawaran kami adalah **Rp12.768.000.000 sudah termasuk PPN 12%**. Nilai tersebut mencakup langganan Relecloud Maintain untuk 500 named users selama tiga tahun, implementasi, migrasi data, pelatihan, integrasi SAP, dukungan go-live, dan hypercare sesuai ruang lingkup. Penawaran ini kami rancang sebagai pilihan paling menarik secara biaya dan paling cepat memberi manfaat operasional.
Kami yakin Relecloud Maintain akan memberikan pengalaman penggunaan yang nyaman bagi teknisi, data yang rapi bagi planner, dan indikator yang tajam bagi manajemen Zava Logistik Group. Dengan harga kompetitif, metodologi cepat, dan komitmen tim lokal, PT Relecloud Sistem Indonesia siap menjadi mitra transformasi EAM Zava Logistik Nusantara.
`),
];

export const PROPOSAL_C = [
  ...p(`
# Surat Penawaran
Nomor: 147/ATN-EAM/ZLN/IX/2026
Jakarta, 20 September 2026
Kepada Yth. Ketua Tim Evaluasi / Panitia Pengadaan PT Zava Logistik Nusantara
Perihal: Penawaran Adatum EAM Cloud v4 untuk Tender No. 0142/PGD-ZLN/VIII/2026, Pengadaan Sistem Enterprise Asset Management (EAM) Grup berbasis SaaS
Dengan hormat, berdasarkan undangan dan dokumen pemilihan penyedia, PT Adatum Teknologi Nusantara menyampaikan proposal teknis dan administrasi untuk implementasi Adatum EAM Cloud v4 di lingkungan PT Zava Logistik Nusantara. Kami telah menelaah Kerangka Acuan Kerja, ketentuan pengadaan, dan hasil penjelasan pekerjaan, serta dengan ini menyatakan menerima seluruh ketentuan Adendum 1 tanggal 11 September 2026 (Surat Pernyataan Menerima Adendum 1 yang ditandatangani Direktur Utama terlampir sebagai Lampiran 2). Seluruh bagian proposal ini disusun untuk memenuhi kebutuhan 500 named users, tata kelola holding, dan operasional 20 anak usaha.
Penawaran ini berlaku selama 120 hari kalender sejak batas akhir pemasukan, yaitu sampai 19 Januari 2027. Masa berlaku yang lebih panjang kami berikan untuk memberi keleluasaan proses evaluasi, klarifikasi, persetujuan internal, dan penandatanganan kontrak. Kami menyatakan sanggup menjaga harga, komposisi tim, dan komitmen layanan selama masa berlaku tersebut.
Hormat kami,
**Hendra Kusnadi**
Direktur, PT Adatum Teknologi Nusantara
Telepon: +62-21-555-0344 | surel: procurement@adatum-id.example
## Daftar Isi
- Surat Penawaran
- Profil dan Pengalaman Perusahaan
- Pemahaman atas KAK
- Uraian Solusi Adatum EAM Cloud v4
- Matriks Kepatuhan
- Hosting, Keamanan, dan Kontinuitas
- Rencana Implementasi
- Personel dan Ringkasan CV
- Pernyataan TKDN
- Ringkasan Komersial
## Profil dan Pengalaman Perusahaan
PT Adatum Teknologi Nusantara merupakan perusahaan penyedia aplikasi enterprise cloud dengan fokus pada EAM, manajemen fasilitas, dan otomasi proses operasional. Produk Adatum EAM Cloud v4 telah digunakan oleh organisasi besar dengan struktur multi-site dan multi-entity. Kami memiliki tim implementasi di Jakarta dan Surabaya, service desk 555-0390, serta metodologi dokumentasi yang mengutamakan persetujuan formal setiap deliverable.
Dalam proyek EAM, kami menekankan kesesuaian proses bisnis, struktur data aset, dan kemampuan pelaporan jangka panjang. Kami tidak hanya memasang aplikasi, melainkan membantu pemilik pekerjaan menyusun standar penamaan aset, klasifikasi lokasi, status work order, prioritas pemeliharaan, serta tanggung jawab persetujuan. Prinsip kami adalah konfigurasi yang rapi sejak awal akan mengurangi biaya perubahan pada tahun kedua dan ketiga.
## Pemahaman atas KAK
Kami memahami ruang lingkup mencakup penyediaan SaaS EAM untuk 500 named users selama tiga tahun, implementasi, konfigurasi, migrasi data, integrasi SAP S/4HANA, pelatihan, dashboard, dokumentasi, dan dukungan pasca go-live. Sistem harus dapat dipakai oleh holding dan 20 anak usaha, mendukung lokasi operasional yang tersebar, serta memberi visibilitas atas kondisi aset, backlog pekerjaan, biaya pemeliharaan, dan kepatuhan jadwal preventive maintenance.
Kami juga memahami bahwa data awal berasal dari banyak spreadsheet. Risiko utama ada pada duplikasi kode, aset tanpa lokasi jelas, perbedaan istilah antar unit, dan data historis yang tidak lengkap. Oleh sebab itu, kami memasukkan kegiatan profiling data, cleansing, validasi bersama pemilik data, dan rekonsiliasi sebelum final load. Keputusan perubahan master data akan dicatat dalam issue log dan disetujui oleh pejabat yang ditunjuk.
## Uraian Solusi Adatum EAM Cloud v4
Adatum EAM Cloud v4 memiliki modul asset master, location hierarchy, maintenance strategy, work request, work order, preventive maintenance, inspection, spare part reference, warranty, downtime, labor capture, mobile execution, KPI dashboard, dan reporting export. Paket kami menawarkan 500 named users dengan pembagian peran granular. Pengguna lapangan dapat menerima tugas, memperbarui status, mengunggah foto, dan menutup checklist melalui perangkat mobile.
Untuk integrasi SAP S/4HANA, kami menyediakan integrasi standar melalui API gateway dan mapping table yang dikelola bersama. Objek yang umum disinkronkan meliputi cost center, material reference, vendor, dan nomor dokumen terkait biaya. Desain final akan disetujui melalui dokumen Interface Control Document. Kami menyiapkan audit log integrasi agar setiap kegagalan pengiriman dapat ditelusuri dan dikirim ulang setelah perbaikan.
## Matriks Kepatuhan
`),
  { table: [
    ['No.', 'Persyaratan', 'Status', 'Keterangan'],
    ['1', '500 named users', 'Comply', 'Paket sesuai kebutuhan pengguna setelah Adendum 1.'],
    ['2', 'Masa langganan 3 tahun', 'Comply', 'Dicantumkan dalam Daftar Kuantitas dan Harga.'],
    ['3', 'Primary DC Indonesia', 'Comply', 'Primary DC Jakarta.'],
    ['4', 'DRC Indonesia', 'Comply', 'DRC Batam.'],
    ['5', 'Asset registry dan hierarchy', 'Comply', 'Tersedia multi-company dan multi-location.'],
    ['6', 'Preventive dan corrective maintenance', 'Comply', 'Strategy, schedule, work request, work order.'],
    ['7', 'Mobile execution', 'Comply', 'Mobile checklist dan lampiran foto.'],
    ['8', 'Migrasi data', 'Comply', 'Profiling, cleansing, validation, final load.'],
    ['9', 'Integrasi SAP S/4HANA', 'Comply', 'API gateway dan Interface Control Document.'],
    ['10', 'Pelatihan pengguna', 'Comply', 'Disediakan 20 training sessions.'],
    ['11', 'Perubahan mayor tanpa CR', 'Partially', 'Perubahan di luar blueprint menggunakan change control.'],
  ] },
  ...p(`
## Hosting, Keamanan, dan Kontinuitas
Adatum EAM Cloud v4 untuk Zava Logistik Group akan ditempatkan pada primary data center Jakarta dengan disaster recovery center Batam. Desain layanan menggunakan segregasi tenant, load balancing, backup terjadwal, monitoring aplikasi, dan prosedur pemulihan. Parameter teknis RTO dan RPO akan ditetapkan dalam dokumen Service Level dan diuji melalui tabletop exercise setelah go-live.
Pengamanan sistem mencakup enkripsi data in transit dan at rest, role based access, SSO, MFA sesuai kebijakan pelanggan, audit trail, log administratif, serta pemantauan anomali. Kami menyiapkan akses terbatas untuk tim implementasi dan akan mencabut akses setelah pekerjaan selesai. Setiap perubahan konfigurasi akan melalui tiket yang disetujui. Laporan keamanan dan operasional disampaikan berkala kepada tim yang ditunjuk oleh PT Zava Logistik Nusantara.
## Rencana Implementasi
`),
  { table: [
    ['Fase', 'Periode', 'Deliverable'],
    ['1. Initiation', 'Bulan 1', 'Project charter, RACI, rencana komunikasi, risk register.'],
    ['2. Blueprint', 'Bulan 1-2', 'Process design, data dictionary, integration design.'],
    ['3. Build', 'Bulan 3-4', 'Konfigurasi modul, role, report, template migrasi.'],
    ['4. Data and Integration', 'Bulan 4-5', 'Load awal, API SAP, interface testing.'],
    ['5. UAT', 'Bulan 6', 'UAT script, defect log, sign-off.'],
    ['6. Training', 'Bulan 6-7', '20 training sessions untuk admin, key user, teknisi, manajemen.'],
    ['7. Pilot', 'Bulan 7', 'Pilot anak usaha terpilih dan stabilization report.'],
    ['8. Roll-out', 'Bulan 8', 'Deployment bertahap seluruh unit.'],
    ['9. Hypercare', 'Bulan 9', 'Issue closure, BAST, knowledge transfer.'],
  ] },
  ...p(`
Durasi sembilan bulan kami nilai memadai untuk mengelola cakupan grup tanpa mengorbankan kualitas data. Pada setiap fase terdapat gate persetujuan. Dokumen yang belum disetujui tidak akan dipakai sebagai dasar fase berikutnya, kecuali ada persetujuan tertulis dari Project Steering Committee. Pendekatan ini membuat tanggung jawab jelas dan mengurangi perbedaan tafsir pada saat serah terima.
## Personel dan Ringkasan CV
`),
  { table: [
    ['Peran', 'Nama', 'Pengalaman', 'Sertifikasi / Ringkasan'],
    ['Project Manager', 'Nugraha Setiadi', '9 tahun', 'PRINCE2 Practitioner; memimpin 4 implementasi EAM multi-site.'],
    ['Program Advisor', 'Ratih Maheswari', '15 tahun', 'Governance, quality assurance, steering committee.'],
    ['EAM Solution Architect', 'Yoga Firmansyah', '11 tahun', 'Asset taxonomy, maintenance strategy, reporting architecture.'],
    ['SAP Integration Lead', 'Anita Prameswari', '10 tahun', 'SAP API, middleware, ICD, interface monitoring.'],
    ['Data Migration Lead', 'Iqbal Ramadhan', '8 tahun', 'Data profiling, cleansing, reconciliation, cutover.'],
    ['Training and Change Lead', 'Meisya Putri', '9 tahun', 'Training plan, adoption survey, user guide.'],
  ] },
  ...p(`
Nugraha Setiadi sebagai Project Manager memiliki 9 tahun pengalaman dan telah memimpin 4 implementasi EAM. Ia terbiasa mengelola jadwal lintas lokasi, workshop dengan manajemen operasi, serta kontrol dokumen yang ketat. Setiap personel inti akan memiliki backup agar keberlangsungan proyek tidak bergantung pada satu orang.
## Pernyataan TKDN
PT Adatum Teknologi Nusantara melampirkan sertifikat TKDN untuk Adatum EAM Cloud v4 atas nama PT Adatum Teknologi Nusantara. Nilai TKDN adalah 34,7% dan BMP 6,5%, sehingga total TKDN dan BMP adalah 41,2%. Sertifikat berlaku sampai 2 September 2027. Komponen lokal meliputi pengembangan aplikasi, konfigurasi, implementasi, dukungan pelanggan, dokumentasi, dan pelatihan yang dilakukan oleh tenaga kerja Indonesia.
## Ringkasan Komersial
Rincian harga terdapat dalam lampiran Excel **Daftar Kuantitas dan Harga**. Dalam lampiran tersebut nilai disajikan dengan kolom DPP, PPN sesuai ketentuan 12% x 11/12, dan total. Nilai grand total penawaran yang kami cantumkan adalah **Rp14.254.620.000 termasuk PPN**. Ringkasan ini mencakup langganan Adatum EAM Cloud v4 untuk 500 named users selama tiga tahun, implementasi, migrasi data, 20 training sessions, integrasi SAP S/4HANA, dan dukungan hypercare sesuai cakupan.
Kami berkomitmen memberikan implementasi yang tertib, terdokumentasi, dan dapat diaudit. Bagi PT Adatum Teknologi Nusantara, keberhasilan proyek ini diukur dari kualitas data aset, konsistensi proses pemeliharaan, kesiapan pengguna, dan kemampuan manajemen Zava Logistik Group mengambil keputusan berdasarkan informasi yang akurat.
`),
];

export const PROPOSAL_D = [
  ...p(`
# Proposal Cover Letter
Ref. No.: WWD/SG-ID/ZLN-EAM/0920/2026
Singapore and Jakarta, 20 September 2026
To: Chairman of the Evaluation Team / Procurement Committee, PT Zava Logistik Nusantara
Subject: Proposal for Group Enterprise Asset Management (EAM) SaaS, Tender No. 0142/PGD-ZLN/VIII/2026
Dear Sir or Madam, Wide World Digital Pte. Ltd., together with our Indonesian delivery partner PT Wide World Integrasi, is pleased to submit this technical and administrative proposal for WWD Fleet & Facility. Our proposal addresses the requirements for a group-wide asset management SaaS platform serving the operating companies of Zava Logistik Group. We bring a mature global platform, implementation discipline, and practical experience from transport, ports, facility management, and fleet-intensive enterprises.
This proposal is valid for 90 calendar days from the submission closing date, until 20 December 2026. During this validity period, we will maintain the commercial terms, proposed core team, and service assumptions stated in this document. If selected, Wide World Digital and PT Wide World Integrasi are ready to proceed with contract finalisation, mobilisation, and project initiation immediately after award.
Yours faithfully,
**Jonathan Halim**
Regional Director, Wide World Digital Pte. Ltd.
Through local partner: PT Wide World Integrasi
Phone: +65-555-0190 / +62-21-555-0410 | email: proposals@wideworlddigital.example
## Table of Contents
- Proposal Cover Letter
- Company Profile
- Understanding of the Assignment
- Proposed Solution
- Compliance Matrix
- Hosting and Security
- Implementation Approach and Timeline
- Key Personnel and CV Summaries
- Local Content and Administrative Statement
- Commercial Summary
## Company Profile
Wide World Digital Pte. Ltd. is a Singapore-headquartered enterprise SaaS principal serving asset-intensive organisations in logistics, public transport, property operations, and industrial services. Our WWD Fleet & Facility platform is used to manage fleet assets, facilities, maintenance teams, inspections, warranties, spare part references, and executive performance dashboards. For Indonesia engagements, we work through PT Wide World Integrasi, a Jakarta-based implementation and support partner with consultants experienced in enterprise workflow, data migration, and bilingual user enablement.
Our operating model combines global product governance with local implementation accountability. Product engineering, roadmap control, and security assurance are led by Wide World Digital, while PT Wide World Integrasi provides local project management support, business analysis, configuration, training, and first-line hypercare. This arrangement gives Zava Logistik Group access to a mature platform and a local team that can work closely with operating companies.
## Understanding of the Assignment
We understand that PT Zava Logistik Nusantara is seeking a cloud-based Group Enterprise Asset Management system for the holding company and its subsidiaries. The required scope includes asset registration, maintenance planning, work orders, inspection execution, data migration, user training, management reporting, and integration with enterprise systems. The original planning figure we have used for commercial sizing is 400 named users distributed across the holding and operating companies.
The operating environment is complex because assets are spread across ports, warehouses, trucking operations, and cold storage facilities. Different subsidiaries may use different asset codes, maintenance calendars, and approval practices. A successful platform must therefore support common group controls while preserving operational flexibility. Our recommendation is to establish a group template first, then apply subsidiary parameters during phased deployment rather than forcing all units into one unmanaged configuration.
## Proposed Solution
WWD Fleet & Facility provides asset hierarchy, location management, maintenance plans, work requests, mobile work orders, inspection forms, downtime recording, service provider assignment, document attachments, dashboards, and exportable reports. The platform is designed for operational users who need fast screens, clear task ownership, and reliable mobile access. Supervisors can review backlog, overdue preventive tasks, asset history, and resource allocation without requesting manual spreadsheet consolidation.
For Zava Logistik Group, we propose 400 named users for a three-year subscription. User roles include group administrator, subsidiary administrator, planner, maintenance supervisor, technician, finance viewer, auditor, and executive viewer. The standard product includes API capabilities for master data and transaction exchange. SAP integration is available via our partner marketplace connector, priced separately upon scoping, because final effort depends on the SAP landscape, interface objects, middleware, and security model confirmed during design.
## Compliance Matrix
`),
  { table: [
    ['No.', 'Requirement', 'Status', 'Remarks'],
    ['1', 'Group EAM SaaS platform', 'Comply', 'WWD Fleet & Facility is a production SaaS platform.'],
    ['2', 'Named users for group deployment', 'Partially', 'Commercial offer is sized for 400 named users.'],
    ['3', 'Asset register and hierarchy', 'Comply', 'Multi-site asset and location hierarchy available.'],
    ['4', 'Preventive maintenance', 'Comply', 'Calendar and rule-based scheduling supported.'],
    ['5', 'Corrective work order', 'Comply', 'Request, assignment, execution, closure, and history.'],
    ['6', 'Mobile technician execution', 'Comply', 'Mobile web application with attachments and checklist.'],
    ['7', 'Data migration from spreadsheets', 'Comply', 'Included as a service workstream.'],
    ['8', 'SAP integration', 'Partially', 'Available via partner marketplace connector, priced separately upon scoping.'],
    ['9', 'Primary hosting in Indonesia', 'Comply', 'Primary hosting is in Jakarta region.'],
    ['10', 'Disaster recovery in Indonesia', 'Partially', 'Regional disaster recovery is in Singapore.'],
    ['11', 'Product TKDN certificate', 'Not comply', 'Global SaaS platform does not hold a TKDN certificate.'],
  ] },
  ...p(`
## Hosting and Security
The proposed primary hosting location is the Jakarta region. Our regional DR site in Singapore ensures business continuity through resilient infrastructure, tested recovery procedures, and operational support from our regional cloud team. Production, staging, and implementation environments are logically separated. Backup schedules, monitoring thresholds, and recovery tests will be confirmed during the service readiness phase.
Security controls include encryption in transit, encryption at rest, role-based access control, configurable password policies, optional single sign-on, administrative audit logs, vulnerability management, and segregation of duties for privileged access. Wide World Digital operates a global security programme aligned to enterprise SaaS expectations, including secure development practices, change approval, incident response playbooks, and periodic penetration testing by qualified assessors. Customer data is used only to provide the contracted service and is not shared with unrelated parties.
## Implementation Approach and Timeline
Our implementation approach is structured but pragmatic. We begin with an executive alignment session to confirm priorities, then conduct process workshops, data assessment, configuration, integration design, migration, user acceptance testing, training, pilot operation, and phased roll-out. We recommend a steering committee meeting every month and a working project meeting every week. Decisions are recorded in a decision log to prevent repeated discussions and uncontrolled changes.
`),
  { table: [
    ['Month', 'Phase', 'Key Deliverables'],
    ['1', 'Mobilisation and discovery', 'Project charter, stakeholder map, work plan, risk register.'],
    ['2', 'Solution design', 'Group template, role model, data migration design.'],
    ['3', 'Configuration', 'Core modules, workflows, reports, environments.'],
    ['4', 'Data preparation', 'Data templates, cleansing rules, first migration load.'],
    ['5', 'Integration design', 'SAP connector scoping, API design, interface assumptions.'],
    ['6', 'UAT', 'Test scripts, defect management, sign-off support.'],
    ['7', 'Pilot', 'Pilot subsidiary deployment and adoption review.'],
    ['8', 'Roll-out', 'Wave deployment to remaining operating companies.'],
    ['9', 'Hypercare and transition', 'Operational handover, support model, closure report.'],
  ] },
  ...p(`
The proposed nine-month schedule assumes timely availability of business process owners, data owners, IT security reviewers, and SAP interface representatives. Where data quality is weaker than expected, we will provide options: proceed with minimum viable data and enrich later, or extend cleansing before cutover. We will make these choices transparent so Zava Logistik Group can balance speed and data confidence.
## Key Personnel and CV Summaries
`),
  { table: [
    ['Role', 'Name', 'Experience', 'Certifications / Summary'],
    ['Project Manager', 'Melissa Tan', '12 years', 'PMP; led 5 asset and facility management implementations.'],
    ['Local Delivery Lead', 'Arya Wisesa', '10 years', 'Enterprise workflow, Indonesian stakeholder coordination.'],
    ['Solution Architect', 'Daniel Koh', '14 years', 'Fleet and facility SaaS architecture, API design.'],
    ['Data Migration Lead', 'Sofia Lestari', '8 years', 'Spreadsheet consolidation, validation rules, migration cutover.'],
    ['Security and Compliance Lead', 'Prakash Nair', '11 years', 'Cloud security, incident management, access governance.'],
    ['Training Lead', 'Mira Santoso', '9 years', 'Bilingual user training, adoption measurement, floor support.'],
  ] },
  ...p(`
Melissa Tan will serve as Project Manager. She has 12 years of enterprise delivery experience and has managed 5 asset management or facility management projects across transport, property operations, and regional service organisations. Her role will include schedule control, issue escalation, executive reporting, and coordination between Wide World Digital, PT Wide World Integrasi, and Zava Logistik stakeholders.
## Local Content and Administrative Statement
As a global SaaS principal we do not hold a TKDN certificate for the platform; our local partner's implementation services represent approximately 30% local content (self-declared). PT Wide World Integrasi will provide local consultants, project coordination, training delivery, first-line support, and Indonesian-language user assistance. We are prepared to discuss documentary support for the local services component during clarification.
## Commercial Summary
The detailed price breakdown is provided in the attached Excel **Daftar Kuantitas dan Harga**. Our commercial summary is **USD 456,000 for the 3-year subscription plus IDR 1,630,000,000 for services, excluding VAT**. The subscription is quoted at USD 380 per named user per year for 400 named users over three years. Services are quoted in IDR and cover implementation, training, and data migration. SAP integration through the partner marketplace connector is priced separately upon scoping and is not included in the services amount above.
Wide World Digital offers a polished, proven platform with global references and a local partner prepared to work closely with Zava Logistik Group. We believe our combination of mature SaaS capability, disciplined delivery, and practical operational focus will help the holding company create consistent visibility across assets, work orders, maintenance performance, and management reporting.
`),
];
