# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# WEBSITE DESA LEREP

| Informasi            | Keterangan                                                           |
| -------------------- | -------------------------------------------------------------------- |
| Nama Produk          | Website Desa Lerep                                                   |
| Versi Dokumen        | 1.1 – Final (Sinkronisasi)                                           |
| Status               | Final – Scope Locked                                                 |
| Tanggal              | 8 November 2026 (revisi sinkronisasi 10, 11, dan 12 November 2026)   |
| Dokumen Terkait      | ARCHITECTURE.md v1.2, SCHEMA.md v1.9.2-review                        |
| Periode Pengembangan | 7–22 November 2026                                                   |
| Lokasi               | Desa Lerep, Kecamatan Ungaran Barat, Kabupaten Semarang, Jawa Tengah |
| Platform             | Website Responsif + PWA Dasar                                        |
| Bahasa               | Bahasa Indonesia                                                     |
| Metode Pengembangan  | Evaluation-First, Production-Ready Later                             |

---

# 1. PRODUCT OVERVIEW

## 1.1 Deskripsi Produk

Website Desa Lerep merupakan platform informasi dan pelayanan digital yang dikembangkan untuk mendukung transparansi pemerintahan, penyampaian informasi publik, pelayanan masyarakat, publikasi potensi desa, serta partisipasi masyarakat secara digital.

Website ini memiliki dua tujuan utama:

1. **Tahap Evaluasi:** memenuhi indikator penilaian website desa berdasarkan aspek A–H.
2. **Tahap Operasional:** menjadi website resmi Desa Lerep yang dapat digunakan dan dikembangkan secara berkelanjutan oleh pemerintah desa.

Pengembangan menggunakan strategi **Evaluation-First, Production-Ready Later**, yaitu memprioritaskan fitur yang diperlukan untuk evaluasi, tetapi tetap memperhatikan struktur sistem, keamanan, dan kemampuan pengembangan jangka panjang.

## 1.2 Latar Belakang

Website desa perlu menjadi pusat informasi yang dapat diakses masyarakat secara mudah. Informasi mengenai profil desa, pemerintahan, anggaran, pelayanan, kegiatan, dan potensi wilayah harus disajikan secara terstruktur.

Selain menjadi media informasi, website juga perlu mendukung proses administrasi dan komunikasi masyarakat dengan pemerintah desa.

Oleh karena itu, Website Desa Lerep dirancang sebagai platform terpadu yang menggabungkan informasi publik, transparansi, pelayanan digital, dan promosi potensi desa.

## 1.3 Tujuan Produk

- Menyediakan pusat informasi resmi Desa Lerep.
- Mempermudah masyarakat memperoleh informasi dan layanan publik.
- Meningkatkan transparansi pemerintahan desa.
- Menyediakan informasi statistik dan pembangunan desa.
- Mempromosikan wisata, kuliner, budaya, dan UMKM.
- Menyediakan sarana pengaduan dan aspirasi masyarakat.
- Mempermudah pemerintah desa mengelola informasi melalui Admin Dashboard.
- Memenuhi kebutuhan evaluasi website desa berdasarkan kriteria A–H.

---

# 2. PRODUCT GOALS & SUCCESS METRICS

## 2.1 Tujuan Utama

| Tujuan                | Hasil yang Diharapkan                                            |
| --------------------- | ---------------------------------------------------------------- |
| Informasi desa        | Informasi profil, wilayah, pemerintahan, dan statistik tersedia  |
| Transparansi          | Dokumen dan informasi anggaran dapat diakses                     |
| Pelayanan publik      | Informasi layanan dan pengajuan digital tersedia                 |
| Pengelolaan informasi | Admin dapat mengelola berita, pengumuman, dan agenda             |
| Potensi desa          | Informasi wisata, kuliner, budaya, dan UMKM dapat dipublikasikan |
| Partisipasi           | Masyarakat memiliki kanal pengaduan dan aspirasi                 |
| Keamanan              | Data dan dokumen terlindungi                                     |
| Evaluasi              | Seluruh indikator A–H memiliki fitur dan bukti pendukung         |

## 2.2 Indikator Keberhasilan

1. Website dapat diakses melalui domain yang disiapkan.
2. Halaman utama dan navigasi berfungsi.
3. Modul utama dapat diakses masyarakat.
4. Admin dapat mengelola data melalui dashboard.
5. Formulir layanan dapat digunakan dan menghasilkan nomor permohonan.
6. Informasi transparansi dapat ditampilkan berdasarkan dokumen resmi.
7. Website responsif pada desktop, tablet, dan mobile.
8. HTTPS dan perlindungan data diterapkan.
9. Fitur prioritas telah diuji.
10. Bukti penilaian A–H terdokumentasi.

Target performa numerik akan ditetapkan melalui pengujian pada infrastruktur aktual, bukan menggunakan angka yang belum terukur.

---

# 3. TARGET USERS

| Pengguna                      | Kebutuhan                                                      |
| ----------------------------- | -------------------------------------------------------------- |
| Masyarakat Desa Lerep         | Informasi desa, pelayanan, pengaduan, aspirasi, dan pengumuman |
| Pemerintah dan Perangkat Desa | Pengelolaan informasi, dokumen, data, dan layanan              |
| Pengunjung Luar Desa          | Informasi wilayah, wisata, kuliner, budaya, dan fasilitas      |
| Tim Evaluator                 | Memeriksa kelengkapan fitur dan bukti penilaian                |

Tim evaluator merupakan pemangku kepentingan penilaian, bukan pengguna utama operasional.

---

# 4. PRODUCT SCOPE

## 4.1 Modul Utama

Website memiliki delapan modul fungsional:

1. Profil Desa.
2. Statistik Desa.
3. Transparansi Desa.
4. Pelayanan Publik.
5. Berita & Informasi.
6. Potensi Desa.
7. Agenda & Kegiatan.
8. Fitur Inovasi.

## 4.2 Kategori Prioritas

| Prioritas               | Definisi                                                             |
| ----------------------- | -------------------------------------------------------------------- |
| P0 – Must Have          | Fitur wajib untuk kebutuhan evaluasi dan fungsi utama website        |
| P1 – Should Have        | Fitur tambahan yang dikerjakan jika kapasitas dan waktu memungkinkan |
| P2 – Future Development | Pengembangan setelah tahap evaluasi                                  |

Prioritas merupakan keputusan implementasi, bukan penghapusan kebutuhan produk. Fitur P1 dan P2 tetap tercatat sebagai arah pengembangan.

---

# 5. FUNCTIONAL REQUIREMENTS

## 5.1 Modul Profil Desa

**Tujuan:** menyediakan informasi resmi mengenai identitas, wilayah, sejarah, dan pemerintahan Desa Lerep.

| ID     | Fitur                                      | Prioritas |
| ------ | ------------------------------------------ | --------- |
| PRF-01 | Sejarah dan asal-usul desa                 | P0        |
| PRF-02 | Visi dan misi                              | P0        |
| PRF-03 | Informasi lokasi dan wilayah desa          | P0        |
| PRF-04 | Daftar dusun dan deskripsi sederhana       | P0        |
| PRF-05 | Struktur organisasi pemerintah desa        | P0        |
| PRF-06 | Profil perangkat desa dan jabatan          | P0        |
| PRF-07 | Tugas dan fungsi perangkat                 | P1        |
| PRF-08 | Direktori lembaga desa terintegrasi        | P1        |
| PRF-09 | Ensiklopedia sejarah dan budaya multimedia | P2        |

Informasi sejarah, perangkat, lembaga, dan wilayah harus diverifikasi oleh pemerintah desa.

## 5.2 Modul Statistik Desa

**Tujuan:** menampilkan gambaran kondisi kependudukan dan wilayah secara informatif.

Data yang direncanakan:

- Jumlah penduduk.
- Jumlah kepala keluarga.
- Jenis kelamin.
- Kelompok umur.
- Tingkat pendidikan.
- Pekerjaan.
- Distribusi berdasarkan dusun jika tersedia.

| ID     | Fitur                                         | Prioritas |
| ------ | --------------------------------------------- | --------- |
| STA-01 | Ringkasan statistik penduduk                  | P0        |
| STA-02 | Grafik dan tabel statistik                    | P0        |
| STA-03 | Filter berdasarkan tahun                      | P1        |
| STA-04 | Perbandingan antarperiode                     | P1        |
| STA-05 | Input manual dan impor CSV                    | P1        |
| STA-06 | Visualisasi statistik berdasarkan wilayah GIS | P2        |

**Ketentuan privasi:** hanya data agregat yang boleh ditampilkan. NIK, nomor KK, alamat rinci, dan identitas pribadi warga tidak boleh dipublikasikan.

## 5.3 Modul Transparansi Desa

**Tujuan:** menyediakan informasi anggaran, dokumen pemerintahan, dan perkembangan pembangunan desa.

Informasi utama:

- APBDes 2026.
- Realisasi APBDes.
- RPJM Desa.
- RKP Desa 2026.
- Program pembangunan.
- Informasi Dana Desa.
- Dokumen publik pemerintahan.

| ID     | Fitur                               | Prioritas |
| ------ | ----------------------------------- | --------- |
| TRN-01 | Pusat dokumen transparansi          | P0        |
| TRN-02 | Upload dan download PDF             | P0        |
| TRN-03 | Ringkasan informasi anggaran        | P0        |
| TRN-04 | Grafik dan tabel anggaran           | P0        |
| TRN-05 | Arsip dan filter tahun              | P1        |
| TRN-06 | Impor Excel/CSV dengan validasi     | P1        |
| TRN-07 | Monitoring pembangunan terintegrasi | P1        |
| TRN-08 | Halaman khusus Dana Desa            | P1        |

Pengelolaan data menggunakan:

1. Input manual.
2. Impor Excel/CSV.
3. Upload dokumen PDF resmi.

Proses impor harus mendukung validasi format, pratinjau data, pemberitahuan kesalahan, dan pencatatan perubahan.

Angka anggaran dan realisasi hanya boleh ditampilkan jika bersumber dari dokumen resmi.

## 5.4 Modul Pelayanan Publik

**Tujuan:** menyediakan informasi dan sistem pengajuan pelayanan digital bagi masyarakat.

### 5.4.1 Kategori Pelayanan

Kategori layanan yang direncanakan:

1. Administrasi Kependudukan dan Surat-Menyurat.
2. Administrasi Pemerintahan Desa.
3. Sosial dan Kemasyarakatan.
4. Ekonomi dan Pemberdayaan Masyarakat.
5. Pengaduan, Aspirasi, dan Partisipasi Masyarakat.
6. Informasi Publik dan Transparansi Desa.

Kategori tersebut merupakan pengelompokan awal. Jenis layanan yang benar-benar disediakan atau difasilitasi Desa Lerep harus dikonfirmasi kepada pemerintah desa.

Setiap layanan diklasifikasikan menjadi:

- Layanan langsung Desa.
- Layanan fasilitasi Desa.
- Layanan rujukan ke instansi terkait.

Ketentuan klasifikasi tahap evaluasi (revisi 12 November 2026; dikoreksi bila pemerintah desa menetapkan lain):

- **Layanan langsung:** diselesaikan di kantor desa.
- **Layanan fasilitasi:** desa menerbitkan surat keterangan, lalu proses berlanjut ke kecamatan, dinas, atau instansi lain.
- **Layanan rujukan:** diurus langsung di instansi lain. Website menampilkan persyaratan dan tautan instansi, tetapi tidak menerima pengajuan.

Katalog awal berisi layanan surat keterangan sesuai Standar Pelayanan Desa Lerep yang terpasang di kantor desa, ditambah layanan administrasi kependudukan Disdukcapil Kabupaten Semarang sebagai layanan rujukan. Aplikasi pelayanan lain yang sudah dipakai desa (misalnya SMARD) merupakan pengembangan terpisah dan tidak diintegrasikan pada tahap evaluasi.

### 5.4.2 Informasi Layanan

Setiap layanan dapat memiliki:

- Nama dan deskripsi.
- Persyaratan.
- Prosedur atau SOP.
- Waktu penyelesaian.
- Biaya jika berlaku.
- Formulir.
- Dokumen persyaratan.
- Tautan instansi terkait.

Sistem layanan dirancang dinamis sehingga admin dapat menambah dan mengatur jenis layanan serta persyaratannya.

### 5.4.3 Sistem Pengajuan Online

Alur pengajuan:

1. Masyarakat memilih jenis layanan.
2. Sistem menampilkan persyaratan.
3. Masyarakat mengisi formulir.
4. Masyarakat mengunggah dokumen persyaratan.
5. Sistem membuat nomor permohonan.
6. Admin melakukan verifikasi.
7. Admin meminta perbaikan jika diperlukan.
8. Permohonan diproses.
9. Admin pemegang mandat persetujuan yang berlaku memberikan persetujuan atau penolakan (lihat §5.4.6).
10. Dokumen hasil layanan disampaikan kepada pemohon.

Setiap layanan dapat memiliki konfigurasi formulir dan persyaratan yang berbeda. Pengajuan online hanya tersedia untuk layanan langsung dan layanan fasilitasi.

### 5.4.4 Akun Masyarakat

Sistem menggunakan pendekatan hybrid:

- Informasi publik dapat diakses tanpa login.
- Akun masyarakat bersifat opsional.
- Pengajuan dapat mengikuti ketentuan masing-masing layanan.
- Pelacakan tanpa akun menggunakan nomor permohonan dan kode verifikasi. Istilah "kode verifikasi" berlaku seragam untuk pelacakan permohonan, pengaduan, dan aspirasi.
- Pengguna dengan akun dapat melihat riwayat permohonan.
- Registrasi dapat menggunakan email atau nomor telepon dengan verifikasi sesuai mekanisme yang tersedia.
- NIK tidak dikumpulkan kecuali diperlukan untuk layanan tertentu.

### 5.4.5 Status Permohonan

Status utama:

1. Menunggu Verifikasi.
2. Perlu Perbaikan.
3. Terverifikasi.
4. Sedang Diproses.
5. Menunggu Persetujuan.
6. Disetujui.
7. Selesai.

Status tambahan:

- Ditolak, dengan alasan.
- Dibatalkan, dengan penjelasan.

Setiap perubahan status harus mencatat waktu, petugas, dan catatan proses. Alasan penolakan dan pembatalan wajib dapat dilihat oleh pemohon melalui halaman pelacakan; catatan internal lain tetap privat.

### 5.4.6 Dokumen PDF dan Persetujuan

Sistem mendukung:

- Download formulir dan dokumen PDF.
- Pengisian formulir online.
- Pembuatan PDF otomatis berdasarkan data permohonan.

**Model persetujuan: penunjukan langsung admin oleh atasan.** Agar pelayanan tidak bergantung pada ketersediaan pejabat yang sering sibuk, persetujuan permohonan dilakukan oleh admin yang memegang **mandat persetujuan** dari Kepala Desa atau Carik sesuai kewenangannya.

- Penunjukan cukup diberikan **langsung oleh atasan** (Kepala Desa atau Carik), boleh secara lisan. **Surat mandat tidak wajib**; jika kelak ada surat, nomornya dapat ditambahkan.
- Admin mencatat penunjukan tersebut **satu kali** di dashboard: ditunjuk oleh siapa, sejak kapan, cakupan layanan (semua layanan, kategori tertentu, atau layanan tertentu), dan apakah boleh memakai tanda tangan scan. Masa berlaku boleh dikosongkan, artinya berlaku sampai dicabut.
- Selama mandat berlaku dan belum dicabut, admin menyetujui atau menolak setiap permohonan secara langsung **tanpa menunggu pejabat per permohonan**.
- Pejabat pemberi mandat tidak wajib memiliki akun di sistem.
- Sistem mencatat admin yang memproses, mandat yang menjadi dasar, dan waktu keputusan sehingga setiap persetujuan dapat ditelusuri.
- Mandat dapat dicabut atau diganti; mandat lama tetap tersimpan sebagai jejak historis.

Alur persetujuan:

1. Sistem menghasilkan PDF.
2. Admin memverifikasi.
3. Admin pemegang mandat yang berlaku menyetujui atau menolak; sistem menolak tindakan jika mandat tidak berlaku atau tidak mencakup layanan tersebut.
4. Sistem menerapkan gambar tanda tangan hasil scan setelah persetujuan tercatat, hanya jika izin penggunaan tanda tangan scan tercatat pada penunjukan admin.
5. Dokumen final disimpan secara aman.
6. Pemohon dapat mengakses dokumen sesuai hak akses.

**Batasan:** tanda tangan hasil scan bukan TTE tersertifikasi. Penggunaannya wajib atas persetujuan pejabat berwenang (cukup lisan, dicatat pada penunjukan admin) serta mengikuti ketentuan administrasi yang berlaku. Integrasi TTE tersertifikasi disiapkan sebagai pengembangan berikutnya.

### 5.4.7 Pengaduan Masyarakat

**Prioritas: P0** (mendukung indikator C).

- Pengaduan wajib mencantumkan identitas dan kontak.
- Pengaduan anonim tidak didukung.
- Pelapor dapat melampirkan bukti.
- Sistem menghasilkan nomor tiket dan kode verifikasi.
- Penolakan pengaduan wajib disertai tanggapan yang dapat dilihat pelapor.
- Pengaduan hanya dapat dilihat pelapor dan petugas berwenang.
- Statistik agregat dapat ditampilkan tanpa membuka identitas atau isi pengaduan.

### 5.4.8 Notifikasi

Tahap evaluasi:

- Notifikasi dalam website.
- Riwayat notifikasi pengajuan.

Pengembangan berikutnya:

- Notifikasi WhatsApp otomatis.
- Notifikasi email otomatis.

### 5.4.9 Kontak Resmi

- Alamat kantor desa.
- Nomor telepon dan WhatsApp resmi.
- Email resmi.
- Jam pelayanan.
- Peta lokasi kantor.
- Petunjuk arah Google Maps.
- Informasi petugas sesuai bidang jika tersedia.
- Kanal pelayanan dan pengaduan.

Kontak pribadi tidak ditampilkan tanpa izin.

## 5.5 Modul Berita & Informasi

**Tujuan:** menyediakan pusat publikasi berita, informasi pemerintahan, dan pengumuman desa.

### CMS Berita

- Buat, edit, dan hapus berita.
- Judul dan isi.
- Thumbnail dan galeri.
- Kategori dan tag.
- Penulis.
- Slug.
- Metadata SEO.
- Berita unggulan.
- Berita terkait.
- Arsip berita.

### Workflow Publikasi

`Draft → Preview → Publish`

Status:

- Draft.
- Review (disiapkan untuk multi-admin; pada tahap evaluasi Single Admin dapat langsung memublikasikan tanpa melalui Review).
- Published.
- Archived.

Admin harus melakukan publikasi secara manual setelah melihat pratinjau. Preview adalah tampilan pratinjau, bukan status tersimpan.

### Pencarian Berita

- Pencarian berdasarkan judul.
- Filter kategori.
- Filter tanggal publikasi.
- Pengurutan terbaru dan terlama.

### Pengumuman Prioritas

- Label Informasi, Penting, dan Darurat.
- Tanggal mulai dan berakhir.
- Status aktif, kedaluwarsa, dan arsip.
- Pengaturan prioritas.
- Target seluruh warga atau wilayah tertentu jika data tersedia.

Pengumuman ditampilkan sebagai banner atau section, tanpa popup otomatis.

### Berbagi Konten

- WhatsApp.
- Facebook.
- X.
- Salin tautan.
- Open Graph.

Komentar berita tidak disediakan pada tahap evaluasi.

## 5.6 Modul Potensi Desa

**Tujuan:** memperkenalkan potensi wilayah dan mendukung promosi ekonomi masyarakat.

Kategori:

- Wisata.
- UMKM dan Ekonomi Kreatif.
- Pertanian dan Peternakan.
- Budaya dan Kesenian.
- Kuliner.
- Sumber Daya Alam.

### Katalog UMKM Tahap Evaluasi

Dipilih versi sederhana:

- Nama UMKM.
- Kategori usaha.
- Deskripsi usaha atau produk.
- Foto produk.
- Alamat atau lokasi.
- Kontak pemilik jika diizinkan.

Admin mengelola data melalui dashboard.

Marketplace, transaksi internal, katalog produk lengkap, dan pendaftaran mandiri tidak termasuk tahap evaluasi.

## 5.7 Modul Agenda & Kegiatan

Fitur:

- Kalender kegiatan.
- Daftar agenda mendatang.
- Detail kegiatan.
- Tanggal dan waktu.
- Lokasi dan peta.
- Foto dan video.
- Kategori.
- Status kegiatan: upcoming, ongoing, completed, cancelled.
- Pencarian dan filter.
- Arsip kegiatan.

Pendaftaran kegiatan menggunakan tautan eksternal seperti Google Forms atau platform lain. Admin dapat menambahkan atau menonaktifkan tautan.

## 5.8 Modul Inovasi

### A. Peta GIS Desa

Teknologi:

- OpenStreetMap sebagai peta dasar.
- Leaflet sebagai library peta interaktif.
- Google Maps untuk navigasi eksternal.
- Struktur data GIS-ready.

Fitur:

- Lokasi fasilitas umum.
- Lokasi potensi desa.
- Lokasi wisata, kuliner, dan budaya.
- Informasi detail lokasi.
- Filter kategori.
- Pengelolaan koordinat oleh admin.
- Integrasi dengan profil wilayah.

Batas wilayah harus menggunakan data resmi. Penggunaan layanan tile peta wajib mengikuti kebijakan penyedia.

### B. Direktori Fasilitas Umum

- Nama fasilitas.
- Kategori.
- Alamat.
- Deskripsi.
- Foto.
- Koordinat.
- Informasi kontak dan jam operasional jika tersedia.
- Status fasilitas jika tersedia.
- Petunjuk arah.

### C. FAQ Terintegrasi

- Daftar pertanyaan dan jawaban.
- Kategori.
- Pencarian.
- Pertanyaan populer.
- FAQ kontekstual pada halaman terkait.
- Tautan menuju layanan dan dokumen.
- Pengelolaan melalui dashboard.

Struktur konten disiapkan untuk kemungkinan integrasi chatbot di masa depan. Chatbot tidak dibangun dalam tahap evaluasi.

### D. Polling Masyarakat

- Admin membuat pertanyaan dan pilihan jawaban.
- Satu suara per pemilih untuk setiap polling.
- Hasil ditampilkan dalam grafik.
- Polling memiliki batas waktu.
- Admin dapat mengaktifkan, menonaktifkan, dan mengarsipkan polling.

Mekanisme pembatasan suara ganda harus memperhatikan privasi.

### E. Aspirasi Masyarakat

**Prioritas: P1** (mendukung indikator G; dikerjakan setelah P0 stabil).

- Formulir aspirasi dengan identitas dan kontak.
- Kategori aspirasi.
- Nomor tiket dan kode verifikasi.
- Status dan tanggapan admin.
- Pelacakan melalui tiket atau akun opsional.

Aspirasi berbeda dari pengaduan. Aspirasi berisi usulan atau gagasan, sedangkan pengaduan melaporkan permasalahan.

---

# 6. CROSS-MODULE REQUIREMENTS

## 6.1 Homepage CMS

Admin dapat:

- Mengelola banner.
- Memilih berita unggulan.
- Menampilkan pengumuman prioritas.
- Menampilkan potensi unggulan.
- Menampilkan agenda.
- Mengaktifkan atau menonaktifkan section.
- Mengatur urutan section.
- Mengatur CTA.
- Melihat preview sebelum publikasi.

Pengaturan layout hanya menggunakan komponen yang disediakan, bukan mengubah kode secara bebas.

Pada tahap evaluasi, preview pengaturan section beranda ditampilkan di dashboard dari isian formulir sebelum disimpan; perubahan yang disimpan langsung berlaku. Banner beranda tetap mengikuti workflow status konten.

## 6.2 Pusat Dokumen Desa

- Upload PDF.
- Kategori dokumen.
- Pengelompokan tahun.
- Judul, deskripsi, tanggal publikasi, dan ukuran file.
- Preview PDF.
- Pencarian dan filter.
- Edit, arsip, dan hapus oleh admin.

Hanya dokumen publik yang boleh ditampilkan.

## 6.3 Media Gallery

- Galeri foto dan video.
- Album dan kategori.
- Metadata media.
- Penggunaan ulang media pada berita, agenda, wisata, dan budaya.
- YouTube embed.
- Optimasi gambar.
- Pengelolaan melalui dashboard.

## 6.4 Monitoring Pembangunan

- Daftar program pembangunan.
- Dokumentasi sebelum dan sesudah.
- Status pembangunan.
- Progres jika tersedia.
- Target dan realisasi waktu.
- Informasi anggaran berdasarkan dokumen resmi.
- Lokasi pembangunan.
- Integrasi dengan transparansi dan statistik.

## 6.5 Direktori Lembaga Desa

- Profil lembaga.
- Fungsi lembaga.
- Struktur kepengurusan.
- Penanggung jawab.
- Periode kepengurusan.
- Kontak resmi.
- Program kerja.
- Dokumentasi kegiatan.
- Status aktif atau tidak aktif.
- Riwayat kepengurusan.

Daftar final lembaga mengikuti data resmi yang tersedia.

## 6.6 Pengumuman

Pengumuman dapat memiliki:

- Kategori.
- Target pembaca.
- Jadwal publikasi.
- Tanggal kedaluwarsa.
- Status publikasi.
- Arsip.
- Prioritas tampilan.

## 6.7 Social Media Integration

- Tautan kanal resmi.
- YouTube embed.
- Tombol berbagi.
- Kontak WhatsApp resmi.
- Pengelolaan tautan melalui dashboard.

Publikasi otomatis melalui API tidak termasuk tahap evaluasi.

## 6.8 Visitor Analytics

Statistik pengunjung hanya ditampilkan pada Admin Dashboard:

- Jumlah pengunjung.
- Page views.
- Halaman populer.
- Sumber trafik.
- Jenis perangkat.
- Lokasi umum jika tersedia.
- Tren harian, mingguan, dan bulanan.

Google Analytics 4 dan Google Search Console digunakan. Integrasi API ke dashboard internal dapat dikembangkan kemudian.

Tidak ada statistik pengunjung pada halaman publik.

## 6.9 Search

Pencarian global mencakup:

- Berita.
- Profil.
- Statistik.
- Transparansi.
- Potensi dan wisata.
- Kuliner.
- Budaya.
- Agenda.
- Pelayanan publik.

Filter kategori, lokasi, dan tanggal disediakan sesuai jenis konten.

## 6.10 Kontak dan Email/WhatsApp

- WhatsApp menggunakan tombol menuju nomor resmi desa.
- Email menggunakan tautan `mailto:`.
- Tidak menggunakan WhatsApp Business API pada tahap evaluasi.
- Tidak menggunakan pengiriman email otomatis pada tahap evaluasi.

---

# 7. USER FLOW

## 7.1 Pengunjung

`Homepage → Menu Utama → Halaman Informasi → Detail → Informasi Terkait`

## 7.2 Pengajuan Pelayanan

`Homepage → Pelayanan Publik → Pilih Layanan → Persyaratan → Formulir → Upload Dokumen → Kirim → Nomor Permohonan → Pelacakan → Hasil Layanan`

## 7.3 Pengaduan

`Homepage → Pengaduan → Isi Identitas → Isi Pengaduan → Kirim → Nomor Tiket → Admin Memproses → Pelapor Melihat Tanggapan`

## 7.4 Aspirasi

`Homepage → Aspirasi → Isi Formulir → Kirim → Nomor Tiket → Admin Meninjau → Tanggapan`

## 7.5 Admin

`Login → Dashboard → Pilih Modul → Kelola Data → Preview → Publish/Proses → Audit Log`

## 7.6 Pencarian Lokasi

`Homepage → Peta/Potensi → Pilih Kategori → Pilih Lokasi → Detail → Google Maps`

---

# 8. INFORMATION ARCHITECTURE

Navigasi utama:

1. Beranda.
2. Profil Desa.
3. Statistik Desa.
4. Transparansi.
5. Pelayanan Publik.
6. Berita & Informasi.
7. Potensi Desa.
8. Agenda & Kegiatan.
9. Peta Desa.
10. Pusat Dokumen.
11. Kontak.

Subkategori Potensi Desa:

- Wisata.
- Kuliner.
- Budaya.
- UMKM.
- Pertanian dan Peternakan.
- Sumber Daya Alam.

Navigasi harus ringkas, mudah dipahami, dan konsisten di desktop maupun mobile.

---

# 9. ADMIN DASHBOARD

## 9.1 Sistem Admin

Tahap evaluasi menggunakan Single Admin dengan akses penuh.

Database dan backend disiapkan untuk mendukung Multi Admin melalui Role-Based Access Control (RBAC).

## 9.2 Modul Dashboard

- Dashboard ringkasan.
- Profil desa.
- Statistik.
- Transparansi.
- Pelayanan publik.
- Berita.
- Pengumuman.
- Potensi desa.
- Agenda.
- Peta dan fasilitas.
- Dokumen.
- Media.
- Aspirasi dan pengaduan.
- Polling.
- Analytics.
- Pengaturan website.

## 9.3 RBAC

Tahap evaluasi:

- Satu akun admin.
- Hak akses penuh.

Pengembangan berikutnya:

- Super Admin.
- Admin Berita.
- Admin Pelayanan.
- Admin Data Desa.
- Admin Transparansi.
- Peran lain sesuai kebutuhan.

## 9.4 Workflow Konten

`Draft → (Review) → Preview → Publish → Archived`

Status konten yang digunakan seragam di seluruh modul: Draft, Review, Published, Archived. Review bersifat opsional pada tahap evaluasi (Single Admin) dan disiapkan untuk multi-admin.

Semua konten harus dikelola melalui dashboard dan memiliki validasi sebelum publikasi.

---

# 10. UI/UX REQUIREMENTS

1. Desain modern dan profesional.
2. Menggunakan template yang dipilih dan disesuaikan.
3. Responsif untuk desktop, tablet, dan mobile.
4. Mendukung Light Mode, Dark Mode, dan System Preference.
5. Bahasa Indonesia.
6. Navigasi ringkas.
7. Hierarki informasi jelas.
8. Kontras dan ukuran teks terbaca.
9. Formulir memiliki label dan validasi.
10. Gambar memiliki alt text.
11. Tombol dan tautan berfungsi.
12. Tidak menggunakan popup mengganggu.
13. Tidak menampilkan iklan judi, spam, atau konten yang merusak pengalaman pengguna.

Tidak ada panel aksesibilitas khusus. Standar dasar usability dan aksesibilitas tetap harus diterapkan.

---

# 11. TECHNICAL REQUIREMENTS

## 11.1 Technology Stack

| Lapisan         | Teknologi             |
| --------------- | --------------------- |
| Frontend        | Next.js               |
| Styling         | Tailwind CSS          |
| Backend         | Golang                |
| Database/BaaS   | Supabase              |
| Infrastruktur   | Docker + VPS          |
| Peta dasar      | OpenStreetMap         |
| Peta interaktif | Leaflet               |
| Navigasi        | Google Maps           |
| Analytics       | Google Analytics 4    |
| SEO monitoring  | Google Search Console |
| Deployment      | VPS + HTTPS           |

Versi dependensi dipilih berdasarkan kompatibilitas dan stabilitas ketika implementasi.

## 11.2 Arsitektur Sistem

Komponen utama:

1. Frontend website publik menggunakan Next.js.
2. Admin Dashboard menggunakan Next.js.
3. Backend API menggunakan Golang.
4. Database PostgreSQL melalui Supabase.
5. Penyimpanan file dan media.
6. Infrastruktur deployment menggunakan Docker dan VPS.

Backend menjadi pusat business logic, validasi, dan otorisasi. Akses database dan storage harus dikontrol sesuai kebutuhan aplikasi.

## 11.3 Database Requirements

Kelompok entitas:

- Users.
- Roles.
- Permissions.
- Village Profile.
- Dusun.
- Village Officials.
- Institutions.
- Population Statistics.
- Transparency Documents.
- Budget Records.
- Public Services.
- Service Forms.
- Service Applications.
- Application Documents.
- Application Status History.
- Approvals.
- Complaints.
- Aspirations.
- News.
- Categories.
- Tags.
- Announcements.
- Events.
- Potentials.
- UMKM.
- Public Facilities.
- GIS Locations.
- Media.
- FAQ.
- Polls.
- Poll Votes.
- Notifications.
- Audit Logs.

Skema final, relasi, indeks, dan constraint diturunkan dari kebutuhan P0 terlebih dahulu.

## 11.4 API Requirements

API minimal:

- Authentication dan authorization.
- Profil desa.
- Statistik.
- Transparansi.
- Pelayanan publik.
- Pengajuan dan pelacakan.
- Dokumen.
- Pengaduan dan aspirasi.
- Berita dan pengumuman.
- Potensi dan UMKM.
- Agenda.
- Peta dan fasilitas.
- Media.
- FAQ.
- Polling.
- Admin Dashboard.

Setiap API harus memiliki validasi, kontrol akses, respons error konsisten, dan dokumentasi.

---

# 12. SECURITY & PRIVACY

## 12.1 Authentication

- Login admin.
- Password disimpan menggunakan hashing aman (dikelola Supabase Auth; aplikasi tidak menyimpan password).
- Pembatasan percobaan login.
- Session/token dikelola secara aman.
- Otorisasi dilakukan pada backend.
- RBAC disiapkan untuk pengembangan berikutnya.

## 12.2 Public Form Protection

- Validasi frontend dan backend.
- Rate limiting.
- Honeypot.
- CAPTCHA pada formulir berisiko.
- Validasi tipe dan ukuran file.
- Pencegahan spam.
- Pembatasan upload.

## 12.3 Data Privacy

- Tidak menampilkan NIK dan nomor KK.
- NIK yang dikumpulkan untuk layanan tertentu disimpan terenkripsi di tingkat aplikasi dan hanya ditampilkan tersamar kepada petugas berwenang.
- Tidak mempublikasikan dokumen pribadi.
- Pengumpulan data sesuai kebutuhan layanan.
- Pengaduan hanya dapat diakses pihak berwenang dan pelapor.
- File permohonan disimpan secara privat.
- Kontak pribadi tidak ditampilkan tanpa persetujuan.

## 12.4 Audit Trail

Aktivitas yang dicatat:

- Login dan logout (dicatat melalui log audit Supabase Auth; lihat ARCHITECTURE §8.10).
- CRUD data penting.
- Identitas pelaku perubahan.
- Perubahan data sebelum dan sesudah.
- Akses dokumen sensitif (pembuatan akses ke file privat).
- Persetujuan dokumen dan mandat yang menjadi dasarnya.
- Pemberian dan pencabutan mandat persetujuan.
- Penerapan tanda tangan hasil scan.
- Perubahan role dan permission.

Password, token, kode verifikasi, dan isi dokumen sensitif mentah tidak boleh dimasukkan ke audit log.

## 12.5 HTTPS

Website wajib menggunakan HTTPS sebelum dipublikasikan.

---

# 13. NON-FUNCTIONAL REQUIREMENTS

| Aspek           | Persyaratan                                                             |
| --------------- | ----------------------------------------------------------------------- |
| Performance     | Optimasi gambar, aset, API, dan query                                   |
| Responsiveness  | Desktop, tablet, mobile                                                 |
| Availability    | Infrastruktur dapat dipantau dan dipulihkan                             |
| Maintainability | Kode terstruktur dan terdokumentasi                                     |
| Scalability     | Modul dapat dikembangkan secara bertahap                                |
| Security        | Validasi, kontrol akses, HTTPS, perlindungan file                       |
| Backup          | Backup database dan media terjadwal                                     |
| SEO             | Metadata, sitemap, robots.txt, Open Graph, Schema Markup, canonical URL |
| PWA             | Manifest, ikon, splash screen, caching dasar                            |
| Language        | Bahasa Indonesia                                                        |

## 13.1 Backup

- Backup database harian.
- Backup media secara berkala.
- Penyimpanan terpisah dari server utama.
- Retensi backup ditetapkan.
- Prosedur restore disiapkan dan diuji.

## 13.2 PWA

**Prioritas: P1.** Dikerjakan jika P0 sudah stabil; tidak memblokir kesiapan evaluasi. Jika dikerjakan, cakupannya:

- Installable ke home screen.
- App icon.
- Splash screen.
- Web manifest.
- Caching aset dasar.

Offline synchronization dan push notification tidak termasuk tahap evaluasi.

## 13.3 Integrasi Eksternal

| Integrasi                  | Tahap Evaluasi                 |
| -------------------------- | ------------------------------ |
| WhatsApp                   | Tombol menuju kontak resmi     |
| Email                      | Tautan mailto                  |
| Google Maps                | Navigasi eksternal             |
| OpenStreetMap              | Peta dasar                     |
| Leaflet                    | Peta interaktif                |
| Google Analytics 4         | Analitik                       |
| Google Search Console      | Monitoring SEO                 |
| Google Forms/platform lain | Pendaftaran kegiatan eksternal |

WhatsApp Business API, email otomatis, chatbot, dan publikasi otomatis media sosial tidak termasuk tahap evaluasi.

---

# 14. ACCEPTANCE CRITERIA

Website dinyatakan siap dievaluasi jika:

1. Homepage dapat diakses.
2. Navigasi utama berfungsi.
3. Profil desa tersedia.
4. Statistik desa dapat ditampilkan tanpa data pribadi.
5. Dokumen transparansi dapat dibuka dan diunduh.
6. Informasi layanan dan persyaratan dapat ditemukan.
7. Pengajuan layanan prioritas dapat menghasilkan nomor permohonan.
8. Admin dapat memverifikasi dan memperbarui status.
9. Dokumen PDF dapat dihasilkan untuk alur layanan yang telah diimplementasikan.
10. Berita dan pengumuman dapat dikelola admin.
11. Potensi desa dan agenda dapat ditampilkan.
12. Kontak resmi tersedia.
13. Peta lokasi prioritas dapat diakses.
14. Website responsif.
15. Validasi dan perlindungan spam diterapkan pada formulir.
16. HTTPS aktif.
17. Backup dan audit trail dasar tersedia.
18. Tautan, tombol, dan formulir utama telah diuji.
19. Bukti pemenuhan indikator A–H terdokumentasi.

Data yang belum tersedia dari pemerintah desa harus ditandai sebagai menunggu data resmi. Data fiktif tidak boleh dipublikasikan.

---

# 15. ASSESSMENT TRACEABILITY MATRIX

| Aspek | Indikator                             | Modul/Fitur                                      | Bukti                     |
| ----- | ------------------------------------- | ------------------------------------------------ | ------------------------- |
| A     | Profil dan kelengkapan informasi desa | Profil, Statistik, Potensi, Agenda               | Halaman dan dokumen       |
| B     | Transparansi dan Dana Desa            | Transparansi, Monitoring Pembangunan             | Dokumen, grafik, tabel    |
| C     | Pelayanan publik digital              | Pelayanan, Pengaduan, Kontak                     | Formulir, SOP, status     |
| D     | Pembaruan dan pengelolaan konten      | CMS, Berita, Agenda, Pengumuman                  | Dashboard dan konten      |
| E     | UX, navigasi, aksesibilitas, performa | UI/UX, Search, Responsive                        | Hasil pengujian           |
| F     | Inovasi dan integrasi digital         | GIS (P0), Statistik (P0); FAQ, Polling, PWA (P1) | Demo fitur                |
| G     | Partisipasi dan pemberdayaan          | UMKM, Potensi (P0); Aspirasi, Lembaga (P1)       | Katalog dan formulir      |
| H     | Keamanan, privasi, kepatuhan          | HTTPS, RBAC, Audit, Backup                       | Konfigurasi dan pengujian |

Setiap indikator perlu memiliki empat komponen:

1. Fitur yang memenuhi indikator.
2. Lokasi halaman.
3. Acceptance criteria.
4. Bukti pendukung untuk evaluator.

---

# 16. DEVELOPMENT PRIORITIES

## 16.1 P0 – MUST HAVE

Prioritas utama implementasi tahap evaluasi:

1. Setup project dan infrastruktur.
2. Homepage dan navigasi.
3. Profil desa.
4. Struktur organisasi dan perangkat desa.
5. Statistik desa dasar.
6. Transparansi dan pusat dokumen.
7. Informasi pelayanan publik.
8. Pengajuan layanan inti, termasuk persetujuan berbasis mandat.
9. Pengaduan masyarakat.
10. CMS berita dan pengumuman.
11. Potensi desa dan katalog UMKM sederhana.
12. Agenda kegiatan.
13. Kontak resmi.
14. Peta lokasi prioritas.
15. Admin Dashboard.
16. Authentication dan keamanan dasar.
17. Responsivitas.
18. Pengujian dan bukti penilaian.

## 16.2 P1 – SHOULD HAVE

Dikerjakan jika kebutuhan P0 sudah stabil:

- Aspirasi masyarakat.
- Monitoring pembangunan lebih lengkap.
- Direktori lembaga desa.
- FAQ kontekstual.
- Polling masyarakat.
- Media gallery terpusat.
- Statistik lanjutan.
- Peta GIS dengan layer lebih lengkap.
- Impor CSV.
- PWA dasar.
- Analytics dashboard lebih lengkap.
- Cetak halaman.
- Pengumuman terjadwal dan bertarget wilayah.

## 16.3 P2 – FUTURE DEVELOPMENT

Dikembangkan setelah tahap evaluasi:

- Multi-admin penuh.
- WhatsApp Business API.
- Email otomatis.
- TTE tersertifikasi.
- Chatbot.
- Marketplace UMKM.
- Pendaftaran kegiatan internal.
- GIS tingkat lanjut.
- Profil dusun lengkap.
- Ensiklopedia sejarah multimedia.
- Publikasi media sosial otomatis.
- Notifikasi publik berbasis akun.
- Offline synchronization dan push notification.

---

# 17. DEVELOPMENT TEAM

| Anggota | Tanggung Jawab                |
| ------- | ----------------------------- |
| Andhika | UI/UX dan Frontend            |
| Ilham   | Backend dan Infrastruktur     |
| Rizal   | Riset data, integrasi, dan QA |

Kolaborasi diperlukan pada integrasi frontend-backend, pengujian, dan deployment.

---

# 18. DEVELOPMENT TIMELINE

**Periode: 7–22 November 2026**

| Tanggal        | Fokus                                              | Output                     |
| -------------- | -------------------------------------------------- | -------------------------- |
| 7 November     | Kickoff dan penetapan kebutuhan                    | Tujuan dan pembagian tugas |
| 8 November     | Finalisasi PRD dan scope freeze                    | PRD v1.0                   |
| 9 November     | Sitemap, template, arsitektur, dan desain database | Acuan teknis               |
| 10 November    | Setup project dan fondasi UI/backend               | Project dasar berjalan     |
| 11 November    | Autentikasi dan integrasi frontend-backend         | Fondasi sistem             |
| 12–13 November | Homepage, profil, CMS, berita                      | Halaman publik dan CMS     |
| 14–15 November | Statistik, transparansi, dokumen                   | Modul data dan dokumen     |
| 16–17 November | Pelayanan publik dan formulir                      | Pengajuan layanan inti     |
| 18 November    | Potensi, agenda, kontak, peta                      | Modul pendukung            |
| 19 November    | Integrasi modul dan dashboard                      | Sistem terintegrasi        |
| 20 November    | Security, responsive, SEO, backup                  | Stabilitas sistem          |
| 21 November    | QA, perbaikan, bukti evaluasi                      | Hasil pengujian            |
| 22 November    | Deployment dan evaluasi akhir                      | Website siap diperiksa     |

Tanggal yang telah berlalu merupakan bagian dari jadwal awal. Mulai 8 November, pekerjaan yang belum selesai harus disesuaikan dengan kondisi aktual tim.

Jika terjadi keterlambatan, fitur P1 dan P2 ditunda terlebih dahulu. Stabilitas dan penyelesaian P0 menjadi prioritas.

---

# 19. DEPENDENCIES & DATA REQUIREMENTS

Informasi berikut membutuhkan konfirmasi atau dokumen resmi pemerintah desa:

1. Daftar layanan yang benar-benar disediakan atau difasilitasi desa.
2. Persyaratan dan SOP setiap layanan.
3. Data penduduk.
4. Dokumen APBDes dan realisasi.
5. Dokumen RPJM Desa dan RKP Desa.
6. Sejarah dan asal-usul desa.
7. Batas wilayah dan koordinat resmi.
8. Data perangkat dan lembaga desa.
9. Kontak resmi desa.
10. Persetujuan Kepala Desa atas penggunaan tanda tangan hasil scan dan file gambar tanda tangannya (persetujuan cukup lisan; dicatat admin di sistem).
11. Domain dan akses VPS.
12. Akun layanan pihak ketiga yang diperlukan.
13. Kop surat desa, format nomor surat, dan satu contoh surat keterangan yang sudah disamarkan, sebagai dasar template dokumen PDF hasil layanan (ARCHITECTURE AR-22).
14. Logo yang ditetapkan desa untuk website (ARCHITECTURE AR-21).

Surat mandat persetujuan **tidak** menjadi dependensi; penunjukan admin cukup langsung dari atasan (§5.4.6).

Data yang belum tersedia tidak boleh diisi dengan angka atau informasi rekaan. Gunakan data uji yang diberi label jelas selama pengembangan.

---

# 20. SCOPE FREEZE & CHANGE MANAGEMENT

PRD versi 1.1 (revisi sinkronisasi dari v1.0) menjadi acuan pengembangan tahap evaluasi.

Ketentuan:

1. Tidak menambah fitur baru tanpa kebutuhan yang jelas.
2. Perubahan harus berkaitan dengan penilaian, keamanan, kebutuhan inti, atau koreksi pihak desa.
3. Setiap perubahan dinilai berdasarkan waktu, risiko, dan beban tim.
4. Fitur P1/P2 dapat ditunda jika mengancam penyelesaian P0.
5. Data yang belum tersedia dicatat sebagai dependency.
6. Perubahan setelah scope freeze harus dicatat dan disetujui tim.

---

# 21. DEFINITION OF DONE

Fitur dianggap selesai apabila:

- Fungsi utama berjalan.
- Data tersimpan dan ditampilkan dengan benar.
- Validasi input tersedia.
- Hak akses sesuai.
- Tampilan responsif.
- Tidak ada bug kritis.
- Integrasi terkait berfungsi.
- Dokumentasi pengelolaan tersedia.
- Bukti pengujian dapat ditunjukkan.

---

# 22. FINAL PRODUCT DECISION

Website Desa Lerep dikembangkan sebagai platform informasi dan pelayanan publik yang berorientasi pada kebutuhan evaluasi, tetapi memiliki fondasi untuk menjadi website resmi desa.

Ruang lingkup tahap evaluasi berfokus pada:

- Kelengkapan informasi desa.
- Transparansi pemerintahan.
- Pelayanan publik digital.
- Pengelolaan konten.
- UX dan responsivitas.
- Inovasi digital.
- Partisipasi dan pemberdayaan masyarakat.
- Keamanan, privasi, dan kepatuhan.

Fitur yang belum memungkinkan dikerjakan dalam periode evaluasi tetap menjadi bagian dari roadmap pengembangan berikutnya.

**Dokumen ini menjadi acuan kebutuhan produk versi 1.1 untuk tim pengembang Website Desa Lerep.**

---

# 23. RIWAYAT PERUBAHAN

## v1.1 — revisi 12 November 2026 (Katalog dan klasifikasi layanan)

Perubahan dicatat sesuai §20 (koreksi berdasarkan data pihak desa: papan Standar Pelayanan di kantor desa dan leaflet Disdukcapil Kabupaten Semarang) dan menunggu persetujuan tim. Tidak ada fitur baru dan prioritas tidak berubah; klasifikasi rujukan dan tautan instansi sudah ada di §5.4.1–§5.4.2. Keputusan teknis dicatat sebagai ARCHITECTURE AR-28.

| No  | Bagian | Perubahan                                                                                                            | Alasan                                                                  |
| --- | ------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 13  | §5.4.1 | Menambah ketentuan klasifikasi layanan langsung, fasilitasi, dan rujukan                                             | Klasifikasi wajib di SCHEMA (`service_type`) tetapi belum didefinisikan |
| 14  | §5.4.1 | Menetapkan cakupan katalog awal (layanan desa dan rujukan Disdukcapil); aplikasi pelayanan lain tidak diintegrasikan | Sesuai Standar Pelayanan yang dipakai desa dan keterangan Carik         |
| 15  | §5.4.3 | Pengajuan online hanya untuk layanan langsung dan fasilitasi                                                         | Layanan rujukan diproses instansi lain                                  |

## v1.1 — revisi 11 November 2026 (Sinkronisasi dengan penutupan celah data lapangan)

Perubahan dicatat sesuai §20 dan menunggu persetujuan tim. Tidak ada fitur baru dan prioritas tidak berubah; perubahan hanya menyelaraskan rujukan dan dependensi data dengan ARCHITECTURE v1.2 (ADR AR-21–AR-27) dan SCHEMA v1.9.2-review.

| No  | Bagian          | Perubahan                                                                                          | Alasan                                                                  |
| --- | --------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 11  | Tabel informasi | Dokumen terkait diperbarui menjadi ARCHITECTURE.md v1.2 dan SCHEMA.md v1.9.2-review                | Sinkronisasi versi                                                      |
| 12  | §19             | Menambah dependensi no. 13 (kop surat, format nomor surat, contoh surat) dan no. 14 (logo website) | Dibutuhkan untuk §5.4.6 (PDF otomatis) dan §6.1 (beranda); AR-21, AR-22 |

## v1.1 — 10 November 2026 (Sinkronisasi PRD–Architecture–Schema)

Perubahan dicatat dan disetujui tim sesuai §20. Tidak ada fitur baru yang ditambahkan.

| No  | Bagian                 | Perubahan                                                                                                                                                                                                                     | Alasan                                                                                                               |
| --- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | §5.4.3, §5.4.6         | Persetujuan permohonan dilakukan admin yang ditunjuk langsung oleh Kepala Desa/Carik; surat mandat tidak wajib; penunjukan dicatat sekali di dashboard; pejabat tidak menyetujui per permohonan dan tidak wajib memiliki akun | Admin menjadi pelaksana utama agar pelayanan tidak terhambat kesibukan pejabat; selaras SCHEMA E.8–E.9 dan ADR AR-11 |
| 2   | §5.4.5                 | Alasan penolakan/pembatalan wajib terlihat oleh pemohon                                                                                                                                                                       | Selaras ARCHITECTURE §9.3                                                                                            |
| 3   | §5.4.7, §16.1          | Pengaduan ditetapkan P0                                                                                                                                                                                                       | Indikator C                                                                                                          |
| 4   | §5.8.E, §16.2          | Aspirasi ditetapkan P1                                                                                                                                                                                                        | Indikator G; menjaga fokus P0                                                                                        |
| 5   | §13.2, §15             | PWA dasar ditegaskan P1 dan tidak memblokir evaluasi                                                                                                                                                                          | Konsistensi dengan §16.2                                                                                             |
| 6   | §5.5, §9.4             | Status konten diseragamkan: Draft, Review (opsional), Published, Archived                                                                                                                                                     | Selaras ARCHITECTURE §14.1                                                                                           |
| 7   | §6.1                   | Mekanisme preview Homepage CMS diperjelas                                                                                                                                                                                     | Section beranda tidak memiliki status draft di schema                                                                |
| 8   | §5.4.4, §5.4.7, §5.8.E | Istilah "kode verifikasi" diseragamkan                                                                                                                                                                                        | Konsistensi penamaan                                                                                                 |
| 9   | §12.1, §12.3, §12.4    | Password dikelola Supabase Auth; NIK terenkripsi; sumber log login/logout; pencatatan mandat                                                                                                                                  | Selaras ARCHITECTURE §8.10–§8.11                                                                                     |
| 10  | §19                    | Surat mandat tidak menjadi dependensi; cukup persetujuan lisan atas penggunaan tanda tangan scan                                                                                                                              | Prinsip kemudahan bagi masyarakat dan pemerintah desa                                                                |
