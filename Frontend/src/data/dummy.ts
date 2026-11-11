/**
 * ⚠️ DATA DUMMY — hanya untuk pengembangan tampilan.
 * Seluruh angka, nama, dan dokumen di file ini adalah contoh dan WAJIB diganti
 * dengan data resmi Pemerintah Desa Lerep (via Golang API /api/v1) sebelum
 * website dievaluasi/dipublikasikan (PRD §14 & §19).
 */

/* ───────────────────────── PROFIL DESA ───────────────────────── */

export const sejarah = {
  ringkas:
    "Desa Lerep tumbuh di lereng timur Gunung Ungaran sebagai permukiman agraris yang hidup dari mata air, sawah terasering, dan kebun. Tradisi gotong-royong dan ritual syukur atas sumber air diwariskan turun-temurun hingga kini menjadi identitas desa wisata berbasis budaya.",
  linimasa: [
    { tahun: "Abad ke-19", judul: "Permukiman awal", isi: "Kelompok petani membuka lahan di sekitar sumber mata air lereng Ungaran." },
    { tahun: "1950-an", judul: "Desa definitif", isi: "Lerep ditetapkan sebagai desa dengan beberapa dusun di bawahnya." },
    { tahun: "2012", judul: "Rintisan desa wisata", isi: "Warga dan Pokdarwis mulai mengembangkan wisata alam, kuliner, dan budaya." },
    { tahun: "2019", judul: "Desa Wisata Lerep", isi: "Pengembangan Embung Sebligo, Pasar Jajanan Ndeso, dan homestay warga." },
  ],
};

export const visiMisi = {
  visi: "Terwujudnya Desa Lerep yang mandiri, sejahtera, dan berbudaya melalui tata kelola pemerintahan yang transparan dan pengembangan desa wisata berkelanjutan.",
  misi: [
    "Meningkatkan kualitas pelayanan publik yang cepat, mudah, dan transparan.",
    "Mengembangkan potensi wisata, budaya, dan ekonomi kreatif berbasis masyarakat.",
    "Memperkuat infrastruktur desa yang ramah lingkungan.",
    "Mendorong pemberdayaan UMKM, pertanian, dan peternakan warga.",
    "Melestarikan adat, tradisi, dan kearifan lokal Desa Lerep.",
  ],
};

export const wilayah = {
  fakta: [
    { label: "Luas Wilayah", nilai: "± 682 ha" },
    { label: "Ketinggian", nilai: "± 500–900 mdpl" },
    { label: "Jumlah Dusun", nilai: "8 dusun" },
    { label: "RT / RW", nilai: "48 RT · 10 RW" },
  ],
  batas: [
    { arah: "Utara", wilayah: "Kelurahan Ungaran" },
    { arah: "Timur", wilayah: "Desa Nyatnyono" },
    { arah: "Selatan", wilayah: "Kawasan Hutan Gunung Ungaran" },
    { arah: "Barat", wilayah: "Desa Keji" },
  ],
  dusun: [
    { nama: "Lerep", rw: "RW 01", ket: "Pusat pemerintahan desa" },
    { nama: "Karangbolo", rw: "RW 02", ket: "Sekretariat Pokdarwis" },
    { nama: "Indrokilo", rw: "RW 03", ket: "Kawasan Curug Indrokilo" },
    { nama: "Soka", rw: "RW 04", ket: "Sentra kopi & gula aren" },
    { nama: "Tegalrejo", rw: "RW 05", ket: "Pertanian sayur" },
    { nama: "Mapagan", rw: "RW 06", ket: "Peternakan sapi perah" },
    { nama: "Lorog", rw: "RW 07–08", ket: "Kampung homestay" },
    { nama: "Kretek", rw: "RW 09–10", ket: "Sanggar seni" },
  ],
};

export type Pejabat = { nama: string; jabatan: string; unit?: string };

/** Struktur Organisasi dan Tata Kerja (SOTK) Pemerintah Desa — pola Permendagri 84/2015. */
export const struktur = {
  kepalaDesa: { nama: "Sumardi, S.T.", jabatan: "Kepala Desa" } as Pejabat,
  bpd: [
    { nama: "H. Mulyono", jabatan: "Ketua BPD" },
    { nama: "Sri Wahyuni", jabatan: "Wakil Ketua BPD" },
    { nama: "Agus Santoso", jabatan: "Sekretaris BPD" },
  ] as Pejabat[],
  sekretaris: { nama: "Bambang Sutrisno", jabatan: "Sekretaris Desa" } as Pejabat,
  kaur: [
    { nama: "Dwi Lestari", jabatan: "Kaur Tata Usaha & Umum" },
    { nama: "Siti Aminah, S.Pd.", jabatan: "Kaur Keuangan" },
    { nama: "Rudi Hartono", jabatan: "Kaur Perencanaan" },
  ] as Pejabat[],
  kasi: [
    { nama: "Eko Prasetyo", jabatan: "Kasi Pemerintahan" },
    { nama: "Joko Purnomo", jabatan: "Kasi Kesejahteraan" },
    { nama: "Ratna Dewi", jabatan: "Kasi Pelayanan" },
  ] as Pejabat[],
  kadus: [
    { nama: "Suparno", jabatan: "Kepala Dusun", unit: "Lerep" },
    { nama: "Wagiman", jabatan: "Kepala Dusun", unit: "Karangbolo" },
    { nama: "Slamet Riyadi", jabatan: "Kepala Dusun", unit: "Indrokilo" },
    { nama: "Kusnadi", jabatan: "Kepala Dusun", unit: "Soka" },
    { nama: "Tri Haryanto", jabatan: "Kepala Dusun", unit: "Tegalrejo" },
    { nama: "Sugeng", jabatan: "Kepala Dusun", unit: "Mapagan" },
    { nama: "Margono", jabatan: "Kepala Dusun", unit: "Lorog" },
    { nama: "Paryono", jabatan: "Kepala Dusun", unit: "Kretek" },
  ] as Pejabat[],
};

/* ───────────────────────── STATISTIK ───────────────────────── */

export const statistik = {
  periode: "Semester II 2026 (dummy)",
  ringkasan: [
    { label: "Jumlah Penduduk", nilai: 9842, satuan: "jiwa" },
    { label: "Kepala Keluarga", nilai: 3127, satuan: "KK" },
    { label: "Laki-laki", nilai: 4921, satuan: "jiwa" },
    { label: "Perempuan", nilai: 4921, satuan: "jiwa" },
  ],
  umur: [
    { label: "0–4", nilai: 612 },
    { label: "5–14", nilai: 1408 },
    { label: "15–24", nilai: 1536 },
    { label: "25–39", nilai: 2214 },
    { label: "40–54", nilai: 2061 },
    { label: "55–64", nilai: 1127 },
    { label: "65+", nilai: 884 },
  ],
  pendidikan: [
    { label: "Belum/Tidak Sekolah", nilai: 1186 },
    { label: "SD/Sederajat", nilai: 2894 },
    { label: "SMP/Sederajat", nilai: 2153 },
    { label: "SMA/Sederajat", nilai: 2611 },
    { label: "Diploma", nilai: 352 },
    { label: "S1/S2/S3", nilai: 646 },
  ],
  pekerjaan: [
    { label: "Petani/Pekebun", nilai: 1874 },
    { label: "Karyawan Swasta", nilai: 1652 },
    { label: "Wiraswasta/UMKM", nilai: 1203 },
    { label: "Buruh Harian", nilai: 948 },
    { label: "Peternak", nilai: 421 },
    { label: "PNS/TNI/Polri", nilai: 287 },
    { label: "Lainnya", nilai: 1105 },
  ],
  perDusun: [
    { dusun: "Lerep", kk: 512, l: 801, p: 812 },
    { dusun: "Karangbolo", kk: 438, l: 689, p: 676 },
    { dusun: "Indrokilo", kk: 356, l: 561, p: 549 },
    { dusun: "Soka", kk: 391, l: 612, p: 618 },
    { dusun: "Tegalrejo", kk: 347, l: 548, p: 541 },
    { dusun: "Mapagan", kk: 362, l: 571, p: 566 },
    { dusun: "Lorog", kk: 384, l: 602, p: 611 },
    { dusun: "Kretek", kk: 337, l: 537, p: 548 },
  ],
};

/* ───────────────────────── TRANSPARANSI ───────────────────────── */

export const apbdes = {
  tahun: 2026,
  ringkasan: [
    { label: "Pendapatan", anggaran: 3_850_000_000, realisasi: 2_970_000_000 },
    { label: "Belanja", anggaran: 3_920_000_000, realisasi: 2_655_000_000 },
    { label: "Pembiayaan Netto", anggaran: 70_000_000, realisasi: 70_000_000 },
  ],
  perBidang: [
    { label: "Penyelenggaraan Pemerintahan", anggaran: 1_240_000_000, realisasi: 905_000_000 },
    { label: "Pembangunan Desa", anggaran: 1_610_000_000, realisasi: 1_046_000_000 },
    { label: "Pembinaan Kemasyarakatan", anggaran: 410_000_000, realisasi: 268_000_000 },
    { label: "Pemberdayaan Masyarakat", anggaran: 520_000_000, realisasi: 344_000_000 },
    { label: "Penanggulangan Bencana & Darurat", anggaran: 140_000_000, realisasi: 92_000_000 },
  ],
};

export const danaDesa = {
  pagu: 1_186_000_000,
  tersalur: [
    { tahap: "Tahap I", nilai: 474_400_000, status: "Tersalur" },
    { tahap: "Tahap II", nilai: 474_400_000, status: "Tersalur" },
    { tahap: "Tahap III", nilai: 237_200_000, status: "Proses" },
  ],
  prioritas: ["Ketahanan pangan & hewani", "Penanganan stunting", "Desa wisata & ekonomi kreatif", "Infrastruktur jalan usaha tani"],
};

export const pembangunan = [
  { nama: "Rabat beton jalan Dusun Soka", lokasi: "Dusun Soka", anggaran: 185_000_000, progres: 100, status: "Selesai" },
  { nama: "Talud saluran irigasi Tegalrejo", lokasi: "Dusun Tegalrejo", anggaran: 142_000_000, progres: 72, status: "Berjalan" },
  { nama: "Gazebo & toilet Embung Sebligo", lokasi: "Dusun Indrokilo", anggaran: 96_000_000, progres: 45, status: "Berjalan" },
  { nama: "Penerangan jalan tenaga surya", lokasi: "Seluruh dusun", anggaran: 120_000_000, progres: 0, status: "Direncanakan" },
];

/* ───────────────────────── DOKUMEN ───────────────────────── */

export const dokumen = [
  { judul: "APBDes Tahun Anggaran 2026", kategori: "Anggaran", tahun: 2026, ukuran: "1,2 MB", tanggal: "12 Jan 2026" },
  { judul: "Laporan Realisasi APBDes Semester I 2026", kategori: "Anggaran", tahun: 2026, ukuran: "860 KB", tanggal: "15 Jul 2026" },
  { judul: "RKP Desa Tahun 2026", kategori: "Perencanaan", tahun: 2026, ukuran: "2,4 MB", tanggal: "20 Des 2025" },
  { judul: "RPJM Desa 2020–2026", kategori: "Perencanaan", tahun: 2020, ukuran: "3,8 MB", tanggal: "3 Mar 2020" },
  { judul: "Perdes Pungutan Retribusi Wisata", kategori: "Peraturan", tahun: 2025, ukuran: "540 KB", tanggal: "8 Agu 2025" },
  { judul: "SK Kepala Desa tentang Pokdarwis", kategori: "Peraturan", tahun: 2025, ukuran: "320 KB", tanggal: "2 Feb 2025" },
  { judul: "Laporan Realisasi APBDes 2025", kategori: "Anggaran", tahun: 2025, ukuran: "1,1 MB", tanggal: "18 Jan 2026" },
];

/* ───────────────────────── PELAYANAN ───────────────────────── */

export const layanan = [
  {
    nama: "Surat Keterangan Domisili",
    jenis: "Layanan langsung desa",
    waktu: "1 hari kerja",
    biaya: "Gratis",
    syarat: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW"],
  },
  {
    nama: "Surat Keterangan Tidak Mampu",
    jenis: "Layanan langsung desa",
    waktu: "1 hari kerja",
    biaya: "Gratis",
    syarat: ["Fotokopi KTP & KK", "Surat pengantar RT/RW", "Foto rumah tampak depan"],
  },
  {
    nama: "Surat Keterangan Usaha",
    jenis: "Layanan langsung desa",
    waktu: "1–2 hari kerja",
    biaya: "Gratis",
    syarat: ["Fotokopi KTP", "Foto tempat usaha", "Surat pengantar RT/RW"],
  },
  {
    nama: "Pengantar KTP-el / KK",
    jenis: "Layanan fasilitasi desa",
    waktu: "1 hari kerja",
    biaya: "Gratis",
    syarat: ["KK asli", "Akta kelahiran", "Surat pengantar RT/RW"],
  },
  {
    nama: "Surat Keterangan Pindah",
    jenis: "Layanan fasilitasi desa",
    waktu: "2 hari kerja",
    biaya: "Gratis",
    syarat: ["KK & KTP asli", "Alamat tujuan lengkap", "Surat pengantar RT/RW"],
  },
  {
    nama: "Akta Kelahiran",
    jenis: "Rujukan Disdukcapil",
    waktu: "Sesuai Disdukcapil",
    biaya: "Gratis",
    syarat: ["Surat keterangan lahir", "KK & KTP orang tua", "Buku nikah orang tua"],
  },
];

export const alurPengajuan = [
  { judul: "Pilih layanan", isi: "Baca persyaratan dan SOP layanan." },
  { judul: "Isi formulir", isi: "Lengkapi data dan unggah dokumen." },
  { judul: "Dapatkan tiket", isi: "Simpan nomor tiket & kode verifikasi." },
  { judul: "Verifikasi", isi: "Petugas memeriksa kelengkapan berkas." },
  { judul: "Selesai", isi: "Dokumen diterbitkan dan dapat diambil." },
];

/* ───────────────────────── BERITA & AGENDA ───────────────────────── */

export const beritaList = [
  { slug: "festival-iriban", tanggal: "14 Des 2026", kategori: "Agenda Adat", judul: "Festival Iriban: Tradisi Merawat Sumber Kehidupan", ringkas: "Warga berkumpul membersihkan hulu mata air lereng Ungaran dilanjutkan doa bersama dan kenduri tumpeng agung.", motif: "budaya" as const },
  { slug: "pasar-jajanan-akhir-tahun", tanggal: "28 Des 2026", kategori: "Pariwisata", judul: "Semarak Pasar Jajanan Ndeso Spesial Akhir Tahun", ringkas: "Parade kuliner tempo doeloe dan pentas tari anak-anak sanggar seni desa menyambut wisatawan.", motif: "kuliner" as const },
  { slug: "pelatihan-batik-daun-kopi", tanggal: "5 Jan 2027", kategori: "Pemberdayaan UMKM", judul: "Pelatihan Membatik Pewarna Alami Daun Kopi", ringkas: "Inovasi kain batik khas Lerep memanfaatkan limbah daun kopi perkebunan lokal.", motif: "alam" as const },
  { slug: "posyandu-serentak", tanggal: "2 Nov 2026", kategori: "Kesehatan", judul: "Posyandu Serentak di 8 Dusun", ringkas: "Pemeriksaan tumbuh kembang balita dan pemberian makanan tambahan berbahan pangan lokal.", motif: "alam" as const },
  { slug: "musdes-rkp-2027", tanggal: "25 Okt 2026", kategori: "Pemerintahan", judul: "Musyawarah Desa Penyusunan RKP Desa 2027", ringkas: "Pemerintah desa, BPD, dan perwakilan warga membahas usulan prioritas pembangunan.", motif: "budaya" as const },
  { slug: "panen-raya-kopi", tanggal: "10 Okt 2026", kategori: "Pertanian", judul: "Panen Raya Kopi Robusta Lereng Ungaran", ringkas: "Kelompok tani Soka memanen kopi robusta dan memperkenalkan produk sangrai lokal.", motif: "kuliner" as const },
];

export const pengumuman = [
  { label: "Penting" as const, judul: "Jadwal pelayanan administrasi selama libur akhir tahun", berlaku: "20 Des 2026 – 2 Jan 2027" },
  { label: "Informasi" as const, judul: "Pendaftaran pelatihan pemandu wisata untuk pemuda desa", berlaku: "s.d. 30 Nov 2026" },
  { label: "Darurat" as const, judul: "Waspada longsor di jalur Curug Indrokilo saat hujan deras", berlaku: "Musim hujan 2026/2027" },
];

export const agendaList = [
  { tanggal: "14", bulan: "Des", tahun: "2026", judul: "Festival Iriban", waktu: "07.00 – 12.00 WIB", lokasi: "Sumber air Dusun Indrokilo", kategori: "Budaya", status: "Akan datang" as const },
  { tanggal: "21", bulan: "Des", tahun: "2026", judul: "Pasar Jajanan Ndeso — Minggu Pon", waktu: "06.00 – 11.00 WIB", lokasi: "Kawasan Wisata Kuliner", kategori: "Pariwisata", status: "Akan datang" as const },
  { tanggal: "05", bulan: "Jan", tahun: "2027", judul: "Pelatihan Batik Daun Kopi", waktu: "09.00 – 15.00 WIB", lokasi: "Balai Desa Lerep", kategori: "UMKM", status: "Akan datang" as const },
  { tanggal: "18", bulan: "Jan", tahun: "2027", judul: "Kerja Bakti Embung Sebligo", waktu: "07.00 – 10.00 WIB", lokasi: "Embung Sebligo", kategori: "Lingkungan", status: "Akan datang" as const },
];

export const agendaArsip = [
  { tanggal: "2 Nov 2026", judul: "Posyandu Serentak", lokasi: "8 dusun", status: "Selesai" as const },
  { tanggal: "25 Okt 2026", judul: "Musyawarah Desa RKP 2027", lokasi: "Balai Desa Lerep", status: "Selesai" as const },
  { tanggal: "12 Okt 2026", judul: "Pentas Tari Prajuritan", lokasi: "Sanggar Seni Dumi", status: "Dibatalkan" as const },
];

/* ───────────────────────── POTENSI ───────────────────────── */

export type Potensi = { nama: string; isi: string; tag: string; motif: "kuliner" | "budaya" | "alam"; image?: string };

export const potensi: Record<string, { judul: string; subjudul: string; items: Potensi[] }> = {
  wisata: {
    judul: "Wisata",
    subjudul: "Alam, edukasi, dan petualangan di lereng Ungaran",
    items: [
      { nama: "Embung Sebligo", isi: "Danau buatan dengan perahu kano dan panorama matahari terbenam.", tag: "Wisata Alam", motif: "alam", image: "/images/hero-gapura.jpg" },
      { nama: "Curug Indrokilo", isi: "Air terjun di kawasan hutan pinus dengan jalur tracking ringan.", tag: "Petualangan", motif: "alam" },
      { nama: "Edukasi Sapi Perah", isi: "Belajar memerah susu dan mengolah pakan ternak bersama warga.", tag: "Edukasi", motif: "budaya" },
    ],
  },
  kuliner: {
    judul: "Kuliner",
    subjudul: "Rasa tempo doeloe dari dapur warga",
    items: [
      { nama: "Pasar Jajanan Ndeso", isi: "Transaksi koin kreweng, sego gono, dan puluhan jajanan pasar.", tag: "Minggu Pon", motif: "kuliner", image: "/images/hero-kuliner.jpg" },
      { nama: "Dawet Nganten", isi: "Minuman dawet khas Lerep yang disajikan dalam upacara adat.", tag: "Minuman", motif: "kuliner" },
      { nama: "Kopi Robusta Soka", isi: "Kopi lereng Ungaran yang disangrai tradisional oleh kelompok tani.", tag: "Oleh-oleh", motif: "alam" },
    ],
  },
  budaya: {
    judul: "Budaya",
    subjudul: "Tradisi yang dirawat lintas generasi",
    items: [
      { nama: "Tradisi Iriban", isi: "Ritual syukur pembersihan sumber mata air bersama seluruh warga.", tag: "Ritual Adat", motif: "budaya", image: "/images/hero-budaya.jpg" },
      { nama: "Tari Prajuritan", isi: "Tarian rakyat yang dipentaskan sanggar seni pada acara desa.", tag: "Kesenian", motif: "budaya" },
      { nama: "Gamelan Laras Madya", isi: "Kelompok karawitan warga yang aktif berlatih setiap pekan.", tag: "Musik", motif: "budaya" },
    ],
  },
  umkm: {
    judul: "UMKM",
    subjudul: "Katalog sederhana usaha warga",
    items: [
      { nama: "Batik Daun Kopi Lerep", isi: "Kain batik pewarna alami dari limbah daun kopi.", tag: "Kerajinan", motif: "budaya" },
      { nama: "Gula Aren Mapagan", isi: "Gula aren cetak dan semut produksi rumah tangga.", tag: "Pangan", motif: "kuliner" },
      { nama: "Anyaman Bambu Kretek", isi: "Tampah, besek, dan dekorasi bambu buatan tangan.", tag: "Kerajinan", motif: "alam" },
    ],
  },
  pertanian: {
    judul: "Pertanian & Peternakan",
    subjudul: "Sumber penghidupan utama warga",
    items: [
      { nama: "Sayur Organik Tegalrejo", isi: "Kebun sayur organik untuk pasar lokal dan wisata petik.", tag: "Pertanian", motif: "alam" },
      { nama: "Buah Naga Organik", isi: "Kebun buah naga yang terbuka untuk wisata petik.", tag: "Hortikultura", motif: "kuliner" },
      { nama: "Sapi Perah Mapagan", isi: "Kelompok ternak sapi perah dengan produksi susu segar harian.", tag: "Peternakan", motif: "budaya" },
    ],
  },
  sda: {
    judul: "Sumber Daya Alam",
    subjudul: "Kekayaan alam yang dijaga bersama",
    items: [
      { nama: "Mata Air Lereng Ungaran", isi: "Sumber air bersih warga yang dirawat melalui tradisi Iriban.", tag: "Air", motif: "alam" },
      { nama: "Hutan Pinus Indrokilo", isi: "Kawasan hijau penyangga yang menjadi jalur wisata alam.", tag: "Hutan", motif: "alam" },
      { nama: "Lahan Terasering", isi: "Sawah dan kebun berundak dengan pemandangan lembah.", tag: "Lahan", motif: "budaya" },
    ],
  },
};

/* ───────────────────────── PETA / FASILITAS ───────────────────────── */

export const fasilitas = [
  { nama: "Kantor Desa Lerep", kategori: "Pemerintahan", alamat: "Dusun Lerep", jam: "Senin–Jumat 08.00–15.00" },
  { nama: "Puskesmas Pembantu", kategori: "Kesehatan", alamat: "Dusun Karangbolo", jam: "Senin–Sabtu 08.00–13.00" },
  { nama: "SD Negeri Lerep 01", kategori: "Pendidikan", alamat: "Dusun Lerep", jam: "Senin–Sabtu" },
  { nama: "Masjid Jami' Lerep", kategori: "Ibadah", alamat: "Dusun Lerep", jam: "Setiap hari" },
  { nama: "Lapangan Desa", kategori: "Olahraga", alamat: "Dusun Soka", jam: "Setiap hari" },
  { nama: "Pos Kamling Indrokilo", kategori: "Keamanan", alamat: "Dusun Indrokilo", jam: "Malam hari" },
];
