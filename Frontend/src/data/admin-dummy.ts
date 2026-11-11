/**
 * ⚠️ DATA DUMMY ADMIN — hanya untuk mockup tampilan dashboard.
 * Struktur field mengikuti SCHEMA.md v1.9.1 (nama kolom snake_case dipetakan
 * ke properti camelCase). Nanti diganti respons Golang API /api/v1 (admin).
 */

export type RequestStatus =
  | "pending_verification"
  | "needs_revision"
  | "verified"
  | "in_progress"
  | "pending_approval"
  | "approved"
  | "completed"
  | "rejected"
  | "cancelled";

export type ComplaintStatus = "submitted" | "under_review" | "in_progress" | "resolved" | "rejected" | "closed";
export type ContentStatus = "draft" | "review" | "published" | "archived";

export const adminUser = { name: "Dwi Lestari", role: "admin", email: "admin@desalerep.id" };

/* ───────── Permohonan layanan (E.3 service_requests) ───────── */
export const serviceRequests: {
  ticket: string;
  service: string;
  category: string;
  applicant: string;
  phone: string;
  submittedAt: string;
  status: RequestStatus;
}[] = [
  { ticket: "LRP-2611-0142", service: "Surat Keterangan Domisili", category: "Administrasi Kependudukan", applicant: "Ahmad Fauzi", phone: "0812-****-4410", submittedAt: "10 Nov 2026 · 08.14", status: "pending_verification" },
  { ticket: "LRP-2611-0141", service: "Surat Keterangan Usaha", category: "Ekonomi & Pemberdayaan", applicant: "Rina Kartika", phone: "0857-****-2291", submittedAt: "10 Nov 2026 · 07.52", status: "pending_approval" },
  { ticket: "LRP-2611-0139", service: "Surat Keterangan Tidak Mampu", category: "Sosial & Kemasyarakatan", applicant: "Slamet Widodo", phone: "0813-****-7782", submittedAt: "9 Nov 2026 · 15.30", status: "needs_revision" },
  { ticket: "LRP-2611-0137", service: "Pengantar KTP-el / KK", category: "Administrasi Kependudukan", applicant: "Sri Handayani", phone: "0821-****-0934", submittedAt: "9 Nov 2026 · 10.05", status: "in_progress" },
  { ticket: "LRP-2611-0135", service: "Surat Keterangan Domisili", category: "Administrasi Kependudukan", applicant: "Budi Santoso", phone: "0812-****-5561", submittedAt: "8 Nov 2026 · 13.41", status: "verified" },
  { ticket: "LRP-2611-0131", service: "Surat Keterangan Pindah", category: "Administrasi Kependudukan", applicant: "Yuliana Sari", phone: "0878-****-1120", submittedAt: "7 Nov 2026 · 09.18", status: "completed" },
  { ticket: "LRP-2611-0128", service: "Surat Keterangan Usaha", category: "Ekonomi & Pemberdayaan", applicant: "Hendra Gunawan", phone: "0815-****-6643", submittedAt: "6 Nov 2026 · 11.02", status: "rejected" },
  { ticket: "LRP-2611-0125", service: "Surat Keterangan Tidak Mampu", category: "Sosial & Kemasyarakatan", applicant: "Nur Aini", phone: "0819-****-3307", submittedAt: "5 Nov 2026 · 14.27", status: "approved" },
];

export const requestDetail = {
  ticket: "LRP-2611-0141",
  service: "Surat Keterangan Usaha",
  category: "Ekonomi & Pemberdayaan",
  submittedAt: "10 Nov 2026 · 07.52 WIB",
  status: "pending_approval" as RequestStatus,
  applicant: {
    name: "Rina Kartika",
    nik: "3322 •••• •••• 0021",
    phone: "0857-1234-2291",
    email: "rina.k@contoh.id",
    address: "RT 03 / RW 02, Dusun Karangbolo, Lerep",
  },
  form: [
    { label: "Nama usaha", value: "Kopi Sangrai Karangbolo" },
    { label: "Jenis usaha", value: "Pengolahan kopi bubuk" },
    { label: "Alamat usaha", value: "Dusun Karangbolo RT 03/RW 02" },
    { label: "Mulai beroperasi", value: "Maret 2024" },
  ],
  documents: [
    { name: "KTP Pemohon.jpg", size: "420 KB", type: "Gambar" },
    { name: "Foto tempat usaha.jpg", size: "1,1 MB", type: "Gambar" },
    { name: "Surat pengantar RT-RW.pdf", size: "180 KB", type: "PDF" },
  ],
  history: [
    { at: "10 Nov · 07.52", from: null, to: "pending_verification" as RequestStatus, by: "Sistem", note: "Permohonan diterima melalui website.", isPublic: true },
    { at: "10 Nov · 08.40", from: "pending_verification", to: "verified" as RequestStatus, by: "Dwi Lestari", note: "Berkas lengkap dan sesuai.", isPublic: true },
    { at: "10 Nov · 09.05", from: "verified", to: "in_progress" as RequestStatus, by: "Dwi Lestari", note: "Draf surat dibuat dari templat SKU.", isPublic: false },
    { at: "10 Nov · 09.20", from: "in_progress", to: "pending_approval" as RequestStatus, by: "Dwi Lestari", note: "PDF siap untuk keputusan.", isPublic: true },
  ],
};

/* ───────── Mandat persetujuan (E.8 service_approval_delegations) ───────── */
export type Delegation = {
  id: string;
  official: string;
  officialRole: string;
  delegate: string;
  scope: string;
  basis: "direct_appointment" | "written_letter";
  reference?: string;
  signatureScan: boolean;
  validFrom: string;
  validUntil?: string;
  revokedAt?: string;
  usedCount: number;
};

export const delegations: Delegation[] = [
  { id: "MDT-003", official: "Sumardi, S.T.", officialRole: "Kepala Desa", delegate: "Dwi Lestari", scope: "Semua layanan", basis: "direct_appointment", signatureScan: true, validFrom: "1 Nov 2026", usedCount: 18 },
  { id: "MDT-002", official: "Bambang Sutrisno", officialRole: "Sekretaris Desa (Carik)", delegate: "Ratna Dewi", scope: "Kategori: Administrasi Kependudukan", basis: "written_letter", reference: "141/12/X/2026", signatureScan: false, validFrom: "15 Okt 2026", validUntil: "31 Des 2026", usedCount: 6 },
  { id: "MDT-001", official: "Sumardi, S.T.", officialRole: "Kepala Desa", delegate: "Eko Prasetyo", scope: "Layanan: Surat Keterangan Tidak Mampu", basis: "direct_appointment", signatureScan: false, validFrom: "1 Agu 2026", revokedAt: "31 Okt 2026", usedCount: 11 },
];

/* ───────── Pengaduan (E.6 complaints) ───────── */
export const complaints: { ticket: string; subject: string; category: string; reporter: string; submittedAt: string; status: ComplaintStatus }[] = [
  { ticket: "ADU-2611-0058", subject: "Lampu jalan padam di jalur Soka–Tegalrejo", category: "Infrastruktur", reporter: "Agus Riyanto", submittedAt: "10 Nov 2026", status: "submitted" },
  { ticket: "ADU-2611-0057", subject: "Saluran air tersumbat dekat SD Lerep 01", category: "Lingkungan", reporter: "Siti Maryam", submittedAt: "9 Nov 2026", status: "under_review" },
  { ticket: "ADU-2611-0054", subject: "Antrean pelayanan surat terlalu lama", category: "Pelayanan", reporter: "Joko Susilo", submittedAt: "7 Nov 2026", status: "in_progress" },
  { ticket: "ADU-2611-0049", subject: "Sampah menumpuk di area Embung Sebligo", category: "Lingkungan", reporter: "Dewi Anggraini", submittedAt: "4 Nov 2026", status: "resolved" },
  { ticket: "ADU-2611-0046", subject: "Permintaan bantuan pribadi (di luar kewenangan)", category: "Lainnya", reporter: "Wahyu P.", submittedAt: "2 Nov 2026", status: "rejected" },
];

/* ───────── Konten (lifecycle 8.1) ───────── */
export const contentRows: Record<
  string,
  { title: string; meta: string; updated: string; author: string; status: ContentStatus }[]
> = {
  berita: [
    { title: "Festival Iriban: Tradisi Merawat Sumber Kehidupan", meta: "Agenda Adat · Unggulan", updated: "10 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Pelatihan Membatik Pewarna Alami Daun Kopi", meta: "Pemberdayaan UMKM", updated: "10 Nov 2026", author: "Dwi Lestari", status: "draft" },
    { title: "Musyawarah Desa Penyusunan RKP Desa 2027", meta: "Pemerintahan", updated: "9 Nov 2026", author: "Dwi Lestari", status: "review" },
    { title: "Semarak Pasar Jajanan Ndeso Spesial Akhir Tahun", meta: "Pariwisata", updated: "8 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Posyandu Serentak di 8 Dusun", meta: "Kesehatan", updated: "2 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Panen Raya Kopi Robusta 2025", meta: "Pertanian", updated: "12 Okt 2025", author: "Dwi Lestari", status: "archived" },
  ],
  pengumuman: [
    { title: "Jadwal pelayanan selama libur akhir tahun", meta: "Penting · Semua warga", updated: "10 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Waspada longsor jalur Curug Indrokilo", meta: "Darurat · Dusun Indrokilo", updated: "9 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Pendaftaran pelatihan pemandu wisata", meta: "Informasi · Pemuda", updated: "8 Nov 2026", author: "Dwi Lestari", status: "draft" },
  ],
  agenda: [
    { title: "Festival Iriban", meta: "14 Des 2026 · Akan datang", updated: "10 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Pasar Jajanan Ndeso — Minggu Pon", meta: "21 Des 2026 · Akan datang", updated: "9 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Kerja Bakti Embung Sebligo", meta: "18 Jan 2027 · Akan datang", updated: "8 Nov 2026", author: "Dwi Lestari", status: "draft" },
  ],
  potensi: [
    { title: "Embung Sebligo", meta: "Wisata", updated: "9 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Batik Daun Kopi Lerep", meta: "UMKM · Kerajinan", updated: "8 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Gula Aren Mapagan", meta: "UMKM · Pangan", updated: "7 Nov 2026", author: "Dwi Lestari", status: "review" },
    { title: "Hutan Pinus Indrokilo", meta: "Sumber Daya Alam", updated: "6 Nov 2026", author: "Dwi Lestari", status: "draft" },
  ],
  dokumen: [
    { title: "APBDes Tahun Anggaran 2026", meta: "Anggaran · PDF 1,2 MB", updated: "12 Jan 2026", author: "Dwi Lestari", status: "published" },
    { title: "Laporan Realisasi APBDes Semester I 2026", meta: "Anggaran · PDF 860 KB", updated: "15 Jul 2026", author: "Dwi Lestari", status: "published" },
    { title: "RKP Desa Tahun 2027 (rancangan)", meta: "Perencanaan · PDF 2,1 MB", updated: "9 Nov 2026", author: "Dwi Lestari", status: "draft" },
  ],
  fasilitas: [
    { title: "Kantor Desa Lerep", meta: "Pemerintahan · −7.1312, 110.3854", updated: "1 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Puskesmas Pembantu", meta: "Kesehatan · koordinat belum diisi", updated: "1 Nov 2026", author: "Dwi Lestari", status: "draft" },
  ],
  galeri: [
    { title: "Album Festival Iriban 2025", meta: "24 foto · 1 video YouTube", updated: "5 Nov 2026", author: "Dwi Lestari", status: "published" },
    { title: "Album Pasar Jajanan Ndeso", meta: "18 foto", updated: "3 Nov 2026", author: "Dwi Lestari", status: "draft" },
  ],
};

/* ───────── Audit log (L.1 audit_logs) ───────── */
export const auditLogs = [
  { at: "10 Nov 2026 · 09.31", user: "Dwi Lestari", action: "service_request.approve", entity: "service_requests · LRP-2611-0125", desc: "Menyetujui permohonan berdasarkan mandat MDT-003" },
  { at: "10 Nov 2026 · 09.31", user: "Dwi Lestari", action: "signature_scan.apply", entity: "service_request_result_documents", desc: "Menerapkan tanda tangan scan Kepala Desa (izin pada MDT-003)" },
  { at: "10 Nov 2026 · 09.20", user: "Dwi Lestari", action: "service_request.status_change", entity: "service_requests · LRP-2611-0141", desc: "in_progress → pending_approval" },
  { at: "10 Nov 2026 · 08.55", user: "Dwi Lestari", action: "private_file.signed_url", entity: "service_request_documents", desc: "Membuka KTP pemohon (signed URL 5 menit, URL tidak disimpan)" },
  { at: "10 Nov 2026 · 08.12", user: "Dwi Lestari", action: "news_article.publish", entity: "news_articles", desc: "Mempublikasikan “Festival Iriban: Tradisi Merawat Sumber Kehidupan”" },
  { at: "1 Nov 2026 · 10.00", user: "Dwi Lestari", action: "delegation.create", entity: "service_approval_delegations · MDT-003", desc: "Mencatat penunjukan langsung dari Kepala Desa, semua layanan" },
  { at: "31 Okt 2026 · 16.45", user: "Dwi Lestari", action: "delegation.revoke", entity: "service_approval_delegations · MDT-001", desc: "Mencabut mandat Eko Prasetyo" },
];

/* ───────── Beranda CMS (J.8 homepage_sections, J.9 homepage_banners) ───────── */
export const homepageSections = [
  { key: "hero", label: "Banner / Hero", active: true },
  { key: "info_desa", label: "Info Desa", active: true },
  { key: "daya_tarik", label: "Daya Tarik Utama", active: true },
  { key: "pengumuman", label: "Pengumuman Prioritas", active: false },
  { key: "peta", label: "Peta Panduan Wilayah", active: true },
  { key: "berita", label: "Berita & Agenda", active: true },
  { key: "struktur", label: "Struktur Organisasi", active: true },
];

export const homepageBanners = [
  { title: "Gapura Desa Wisata", image: "/images/hero-gapura.jpg", status: "published" as ContentStatus },
  { title: "Wisata Kuliner", image: "/images/hero-kuliner.jpg", status: "published" as ContentStatus },
  { title: "Tradisi Warga", image: "/images/hero-budaya.jpg", status: "published" as ContentStatus },
];

/* ───────── Ringkasan dashboard ───────── */
export const kpi = [
  { label: "Menunggu Verifikasi", value: "7", note: "permohonan", tone: "kunyit" as const, href: "/admin/pelayanan" },
  { label: "Menunggu Persetujuan", value: "3", note: "siap diputuskan", tone: "sogan" as const, href: "/admin/pelayanan" },
  { label: "Pengaduan Baru", value: "4", note: "perlu ditinjau", tone: "merah" as const, href: "/admin/pengaduan" },
  { label: "Konten Draft", value: "9", note: "berita, agenda, potensi", tone: "tosca" as const, href: "/admin/berita" },
];

export const visitorTrend = [
  { label: "4 Nov", nilai: 312 },
  { label: "5 Nov", nilai: 284 },
  { label: "6 Nov", nilai: 401 },
  { label: "7 Nov", nilai: 455 },
  { label: "8 Nov", nilai: 620 },
  { label: "9 Nov", nilai: 588 },
  { label: "10 Nov", nilai: 342 },
];
