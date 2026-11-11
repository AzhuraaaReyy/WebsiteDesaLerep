/**
 * Konten statis beranda Desa Wisata Lerep.
 * Nantinya data ini bisa diganti dengan respons API backend
 * (NEXT_PUBLIC_API_URL) tanpa mengubah komponen tampilan.
 */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const siteConfig = {
  name: "Desa Wisata Lerep",
  tagline: "Kec. Ungaran Barat · Kab. Semarang",
  address: "Jl. Wisata Lerep No. 01, Dusun Karangbolo, Lerep, Ungaran Barat, Kab. Semarang, Jawa Tengah 50519",
  phone: "+62 812-3456-7890",
  phoneNote: "Pokdarwis Hotline",
  whatsapp: "https://wa.me/6281234567890",
  email: "info@desawisatalerep.id",
  hours: "Buka Setiap Hari: 08.00 – 17.00 WIB",
  socials: [
    { label: "FB", name: "Facebook", href: "https://facebook.com/" },
    { label: "IG", name: "Instagram", href: "https://instagram.com/" },
    { label: "YT", name: "YouTube", href: "https://youtube.com/" },
    { label: "WA", name: "WhatsApp", href: "https://wa.me/6281234567890" },
  ],
};

/**
 * Navigasi utama mengikuti PRD v1.0 §8 (Information Architecture):
 * Beranda, Profil Desa, Statistik Desa, Transparansi, Pelayanan Publik,
 * Berita & Informasi, Potensi Desa, Agenda & Kegiatan, Peta Desa,
 * Pusat Dokumen, Kontak. Agar navbar tetap ringkas, beberapa menu
 * dikelompokkan dalam dropdown; "Kontak" diwakili tombol "Hubungi Kami".
 */
export const mainNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil Desa",
    href: "/profil",
    children: [
      { label: "Sejarah & Asal-usul", href: "/profil#sejarah", description: "Riwayat dan kearifan lokal desa" },
      { label: "Visi & Misi", href: "/profil#visi-misi" },
      { label: "Wilayah & Dusun", href: "/profil#wilayah", description: "Lokasi, batas, dan daftar dusun" },
      { label: "Struktur Pemerintahan", href: "/profil#struktur", description: "Perangkat desa dan jabatan" },
      { label: "Statistik Desa", href: "/statistik", description: "Data kependudukan agregat" },
    ],
  },
  {
    label: "Transparansi",
    href: "/transparansi",
    children: [
      { label: "APBDes & Realisasi", href: "/transparansi#apbdes" },
      { label: "RPJM & RKP Desa", href: "/transparansi#perencanaan" },
      { label: "Dana Desa", href: "/transparansi#dana-desa" },
      { label: "Monitoring Pembangunan", href: "/transparansi#pembangunan" },
      { label: "Pusat Dokumen", href: "/dokumen", description: "Unduh dokumen publik desa" },
    ],
  },
  {
    label: "Pelayanan Publik",
    href: "/pelayanan",
    children: [
      { label: "Katalog Layanan", href: "/pelayanan#katalog", description: "Persyaratan dan SOP layanan" },
      { label: "Ajukan Layanan", href: "/pelayanan#ajukan" },
      { label: "Lacak Pengajuan", href: "/pelayanan#lacak", description: "Pakai nomor tiket & kode verifikasi" },
      { label: "Pengaduan", href: "/pelayanan#pengaduan" },
      { label: "Aspirasi", href: "/pelayanan#aspirasi" },
    ],
  },
  {
    label: "Informasi",
    href: "/berita",
    children: [
      { label: "Berita & Informasi", href: "/berita", description: "Kabar terbaru Desa Lerep" },
      { label: "Pengumuman", href: "/berita#pengumuman" },
      { label: "Agenda & Kegiatan", href: "/agenda", description: "Kalender kegiatan desa" },
    ],
  },
  {
    label: "Potensi Desa",
    href: "/potensi",
    children: [
      { label: "Wisata", href: "/potensi#wisata" },
      { label: "Kuliner", href: "/potensi#kuliner" },
      { label: "Budaya", href: "/potensi#budaya" },
      { label: "UMKM", href: "/potensi#umkm" },
      { label: "Pertanian & Peternakan", href: "/potensi#pertanian" },
      { label: "Sumber Daya Alam", href: "/potensi#sda" },
    ],
  },
  { label: "Peta Desa", href: "/peta" },
];

export const contactNav = { label: "Hubungi Kami", href: "/kontak" };

/** Halaman modul yang belum terhubung ke API — ditampilkan sebagai "menunggu data resmi". */
export const modulePages: Record<
  string,
  { title: string; eyebrow: string; description: string; sections: { id: string; title: string; body: string }[] }
> = {
  profil: {
    title: "Profil Desa",
    eyebrow: "Identitas & Pemerintahan",
    description: "Informasi resmi mengenai identitas, wilayah, sejarah, dan pemerintahan Desa Lerep.",
    sections: [
      { id: "sejarah", title: "Sejarah & Asal-usul", body: "Riwayat dan asal-usul Desa Lerep." },
      { id: "visi-misi", title: "Visi & Misi", body: "Visi dan misi pemerintah desa." },
      { id: "wilayah", title: "Wilayah & Dusun", body: "Lokasi, luas, batas wilayah, dan daftar dusun." },
      { id: "struktur", title: "Struktur Pemerintahan", body: "Struktur organisasi serta profil perangkat desa." },
    ],
  },
  statistik: {
    title: "Statistik Desa",
    eyebrow: "Data Kependudukan",
    description: "Gambaran kondisi kependudukan dalam bentuk data agregat — tanpa data pribadi warga.",
    sections: [
      { id: "ringkasan", title: "Ringkasan Penduduk", body: "Jumlah penduduk, kepala keluarga, dan jenis kelamin." },
      { id: "umur", title: "Kelompok Umur", body: "Sebaran penduduk berdasarkan kelompok umur." },
      { id: "pendidikan", title: "Pendidikan & Pekerjaan", body: "Tingkat pendidikan dan mata pencaharian." },
      { id: "dusun", title: "Per Dusun", body: "Distribusi penduduk per dusun bila tersedia." },
    ],
  },
  transparansi: {
    title: "Transparansi Desa",
    eyebrow: "Anggaran & Pembangunan",
    description: "Informasi anggaran, dokumen perencanaan, dan perkembangan pembangunan desa.",
    sections: [
      { id: "apbdes", title: "APBDes & Realisasi", body: "Ringkasan, grafik, dan tabel APBDes 2026 beserta realisasinya." },
      { id: "perencanaan", title: "RPJM & RKP Desa", body: "Dokumen perencanaan pembangunan jangka menengah dan tahunan." },
      { id: "dana-desa", title: "Dana Desa", body: "Informasi penerimaan dan penggunaan Dana Desa." },
      { id: "pembangunan", title: "Monitoring Pembangunan", body: "Daftar program, status, dan dokumentasi pembangunan." },
    ],
  },
  pelayanan: {
    title: "Pelayanan Publik",
    eyebrow: "Layanan Digital Warga",
    description: "Informasi layanan, pengajuan online, pelacakan, serta kanal pengaduan dan aspirasi.",
    sections: [
      { id: "katalog", title: "Katalog Layanan", body: "Daftar layanan beserta persyaratan, SOP, dan waktu penyelesaian." },
      { id: "ajukan", title: "Ajukan Layanan", body: "Formulir pengajuan dan unggah dokumen persyaratan." },
      { id: "lacak", title: "Lacak Pengajuan", body: "Cek status dengan nomor tiket dan kode verifikasi." },
      { id: "pengaduan", title: "Pengaduan", body: "Laporkan permasalahan dengan identitas dan kontak." },
      { id: "aspirasi", title: "Aspirasi", body: "Sampaikan usulan dan gagasan untuk desa." },
    ],
  },
  berita: {
    title: "Berita & Informasi",
    eyebrow: "Kabar Desa",
    description: "Berita, pengumuman, dan informasi resmi Pemerintah Desa Lerep.",
    sections: [
      { id: "terbaru", title: "Berita Terbaru", body: "Publikasi berita dan artikel desa." },
      { id: "pengumuman", title: "Pengumuman", body: "Pengumuman berlabel Informasi, Penting, dan Darurat." },
    ],
  },
  agenda: {
    title: "Agenda & Kegiatan",
    eyebrow: "Kalender Desa",
    description: "Jadwal kegiatan, acara budaya, dan agenda pemerintahan desa.",
    sections: [
      { id: "mendatang", title: "Agenda Mendatang", body: "Daftar kegiatan yang akan berlangsung." },
      { id: "arsip", title: "Arsip Kegiatan", body: "Dokumentasi kegiatan yang telah selesai." },
    ],
  },
  potensi: {
    title: "Potensi Desa",
    eyebrow: "Wisata, Budaya & Ekonomi",
    description: "Potensi wilayah dan ekonomi masyarakat Desa Lerep.",
    sections: [
      { id: "wisata", title: "Wisata", body: "Destinasi wisata alam dan edukasi." },
      { id: "kuliner", title: "Kuliner", body: "Kuliner khas dan tempo doeloe." },
      { id: "budaya", title: "Budaya", body: "Seni, tradisi, dan kesenian lokal." },
      { id: "umkm", title: "UMKM", body: "Katalog sederhana usaha masyarakat." },
      { id: "pertanian", title: "Pertanian & Peternakan", body: "Komoditas pertanian dan peternakan." },
      { id: "sda", title: "Sumber Daya Alam", body: "Mata air, hutan, dan potensi alam lainnya." },
    ],
  },
  peta: {
    title: "Peta Desa",
    eyebrow: "GIS Desa",
    description: "Peta interaktif (Leaflet + OpenStreetMap) lokasi fasilitas umum dan potensi desa.",
    sections: [
      { id: "fasilitas", title: "Fasilitas Umum", body: "Kantor desa, sekolah, tempat ibadah, dan fasilitas lain." },
      { id: "potensi", title: "Lokasi Potensi", body: "Lokasi wisata, kuliner, budaya, dan UMKM." },
    ],
  },
  dokumen: {
    title: "Pusat Dokumen",
    eyebrow: "Dokumen Publik",
    description: "Dokumen publik pemerintahan desa yang dapat dilihat dan diunduh.",
    sections: [
      { id: "anggaran", title: "Dokumen Anggaran", body: "APBDes, realisasi, dan laporan keuangan publik." },
      { id: "perencanaan", title: "Dokumen Perencanaan", body: "RPJM Desa dan RKP Desa." },
      { id: "regulasi", title: "Peraturan Desa", body: "Perdes dan keputusan kepala desa." },
    ],
  },
};

export const infoDesa = [
  {
    icon: "book",
    title: "Sejarah Luhur",
    body: "Berakar dari kearifan lokal lereng Gunung Ungaran yang terjaga turun-temurun, dari tradisi Iriban hingga pelestarian situs budaya bersejarah.",
    link: { label: "Pelajari Selengkapnya", href: "/profil#sejarah" },
  },
  {
    icon: "mountain",
    title: "Geografis & Alam",
    body: "Terletak di kawasan perbukitan sejuk Kabupaten Semarang dengan panorama terasering subur, sumber mata air alami, dan perkebunan buah kopi.",
    link: { label: "Wilayah & Dusun", href: "/profil#wilayah" },
  },
  {
    icon: "landmark",
    title: "Pemerintahan Desa",
    body: "Tata kelola desa berbasis gotong-royong, memadukan transparansi modern dengan adat istiadat paguyuban masyarakat yang rukun lestari.",
    link: { label: "Struktur Pemerintahan", href: "/profil#struktur" },
  },
] as const;

export type Destinasi = {
  slug: string;
  category: string;
  title: string;
  body: string;
  tags: string[];
  schedule: string;
  /** Ganti dengan path foto asli, mis. "/images/wisata/pasar-jajanan.jpg" */
  image?: string;
  motif: "kuliner" | "budaya" | "alam";
};

export const destinasi: Destinasi[] = [
  {
    slug: "pasar-jajanan-ndeso",
    category: "Kuliner Tradisional",
    title: "Pasar Jajanan Ndeso",
    body: "Sensasi kuliner tempo doeloe dengan transaksi koin kreweng tanah liat. Menyajikan sego gono, dawet nganten, dan puluhan jajanan pasar autentik.",
    tags: ["Koin Kreweng", "Kuliner Tempo Doeloe", "Setiap Minggu Pon"],
    schedule: "Buka: Minggu Pon",
    motif: "kuliner",
  },
  {
    slug: "seni-tradisi-iriban",
    category: "Warisan Budaya",
    title: "Seni & Tradisi Iriban",
    body: "Ritual syukur pembersihan sumber mata air Iriban, pentas Tari Prajuritan, pertunjukan gamelan laras madya, dan workshop membatik khas Lerep.",
    tags: ["Tradisi Iriban", "Tari Prajuritan", "Batik Motif Kopi"],
    schedule: "Pentas Berkala",
    motif: "budaya",
  },
  {
    slug: "embung-sebligo-curug",
    category: "Wisata Alam & Edukasi",
    title: "Embung Sebligo & Curug",
    body: "Danau buatan asri di lereng bukit dengan wahana perahu kano, perkebunan buah naga organik, edukasi perah susu sapi, dan kesegaran Curug Indrokilo.",
    tags: ["Perahu Kano", "Kebun Buah Organik", "Spot Sunset"],
    schedule: "Buka Setiap Hari",
    motif: "alam",
  },
];

export const statistikPeta = [
  { value: "15+", label: "Titik Destinasi Wisata & Budaya Terdata" },
  { value: "30+", label: "Homestay Tradisional Rumah Joglo Warga" },
  { value: "Jalur", label: "Wisata Tracking Lereng Gunung Ungaran" },
  { value: "Sentra", label: "UMKM Kopi, Gula Jawa, & Kerajinan" },
];

export type TitikPeta = {
  id: string;
  code: string;
  name: string;
  kind: "wisata" | "fasilitas";
  x: number;
  y: number;
  /** posisi label relatif terhadap titik */
  label: "top" | "bottom";
  note: string;
};

/** Koordinat dalam viewBox SVG 700 × 460 (peta ilustratif, bukan skala). */
export const titikPeta: TitikPeta[] = [
  { id: "embung", code: "E", name: "Embung Sebligo", kind: "wisata", x: 372, y: 52, label: "bottom", note: "Danau buatan, perahu kano & spot sunset." },
  { id: "homestay", code: "H", name: "Kampung Homestay", kind: "fasilitas", x: 575, y: 40, label: "bottom", note: "30+ homestay joglo milik warga." },
  { id: "pasar", code: "P", name: "Pasar Jajanan Ndeso", kind: "wisata", x: 192, y: 176, label: "bottom", note: "Setiap Minggu Pon, transaksi koin kreweng." },
  { id: "sanggar", code: "S", name: "Sanggar Seni Dumi", kind: "wisata", x: 278, y: 292, label: "bottom", note: "Latihan tari Prajuritan & gamelan." },
  { id: "balai", code: "B", name: "Balai Desa Lerep", kind: "fasilitas", x: 510, y: 324, label: "bottom", note: "Pelayanan administrasi warga." },
  { id: "curug", code: "C", name: "Curug Indrokilo", kind: "wisata", x: 632, y: 408, label: "top", note: "Air terjun di kawasan hutan pinus." },
];

export const berita = [
  {
    slug: "festival-iriban",
    day: "14",
    month: "Des",
    category: "Agenda Adat",
    title: "Festival Iriban: Tradisi Merawat Sumber Kehidupan",
    excerpt: "Warga berkumpul membersihkan hulu mata air lereng Ungaran dilanjutkan doa bersama dan kenduri tumpeng agung.",
    motif: "budaya" as const,
  },
  {
    slug: "pasar-jajanan-akhir-tahun",
    day: "28",
    month: "Des",
    category: "Pariwisata",
    title: "Semarak Pasar Jajanan Ndeso Spesial Akhir Tahun",
    excerpt: "Nikmati parade kuliner angka tempo doeloe dan pentas tari anak-anak sanggar seni desa menyambut wisatawan.",
    motif: "kuliner" as const,
  },
  {
    slug: "pelatihan-batik-daun-kopi",
    day: "05",
    month: "Jan",
    category: "Pemberdayaan UMKM",
    title: "Pelatihan Membatik Pewarna Alami Daun Kopi",
    excerpt: "Inovasi kain batik khas Lerep memanfaatkan limbah daun kopi perkebunan lokal bernilai ekonomi tinggi ramah lingkungan.",
    motif: "alam" as const,
  },
];

export const aparatur = [
  { name: "Sumardi, S.T.", role: "Kepala Desa Lerep" },
  { name: "Bambang Sutrisno", role: "Sekretaris Desa" },
  { name: "Siti Aminah, S.Pd.", role: "Kaur Keuangan" },
  { name: "Joko Purnomo", role: "Kasi Kesejahteraan" },
] as { name: string; role: string; photo?: string }[];

export const footerLinks = {
  wisata: {
    title: "Potensi Desa",
    links: [
      { label: "Wisata Alam & Edukasi", href: "/potensi#wisata" },
      { label: "Kuliner Tempo Doeloe", href: "/potensi#kuliner" },
      { label: "Seni & Tradisi Budaya", href: "/potensi#budaya" },
      { label: "Katalog UMKM", href: "/potensi#umkm" },
      { label: "Peta Desa", href: "/peta" },
    ],
  },
  layanan: {
    title: "Layanan & Informasi",
    links: [
      { label: "Pelayanan Publik", href: "/pelayanan" },
      { label: "Lacak Pengajuan", href: "/pelayanan#lacak" },
      { label: "Transparansi Desa", href: "/transparansi" },
      { label: "Pusat Dokumen", href: "/dokumen" },
      { label: "Berita & Agenda", href: "/berita" },
    ],
  },
};
