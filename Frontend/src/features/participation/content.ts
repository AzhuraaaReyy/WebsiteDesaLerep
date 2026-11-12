import type { Jenis, NilaiForm } from "./schema";

/**
 * Konten SOP & label formulir.
 * SOP ini SEMENTARA, disusun dari PRD v1.1 §5.4.7 & §5.8.E serta ARCHITECTURE §9.5–9.6.
 * Isi resmi (termasuk waktu tanggapan) menunggu konfirmasi Pemerintah Desa Lerep (PRD §19).
 */
export type Konten = {
  judul: string;
  ringkas: string;
  kataKerja: string;
  pelaku: string;
  sop: { judul: string; isi: string }[];
  ketentuan: string[];
  alurStatus: string[];
  statusLain: string;
  kategori: string[];
  labelPerihal: string;
  contohPerihal: string;
  labelUraian: string;
  petunjukUraian: string;
};

export const KONTEN: Record<Jenis, Konten> = {
  pengaduan: {
    judul: "Pengaduan Masyarakat",
    ringkas: "Laporkan permasalahan pelayanan, fasilitas, atau lingkungan di Desa Lerep.",
    kataKerja: "Kirim Pengaduan",
    pelaku: "Pelapor",
    sop: [
      {
        judul: "Siapkan identitas & kontak",
        isi: "Pengaduan tidak dapat dikirim tanpa nama dan nomor telepon/WhatsApp aktif. NIK tidak diminta.",
      },
      {
        judul: "Uraikan masalah dengan jelas",
        isi: "Tulis apa yang terjadi, kapan, dan di mana. Lampirkan bukti foto atau dokumen bila ada (PDF/JPG/PNG, maks. 5 MB per file).",
      },
      {
        judul: "Simpan nomor tiket & kode verifikasi",
        isi: "Setelah terkirim Anda menerima nomor tiket dan kode verifikasi. Kode hanya ditampilkan sekali — unduh bukti PDF atau catat dengan aman.",
      },
      {
        judul: "Petugas meninjau & menindaklanjuti",
        isi: "Petugas berwenang memeriksa pengaduan. Bila ditolak, alasannya disampaikan sebagai tanggapan yang dapat Anda baca.",
      },
      {
        judul: "Pantau tanggapan",
        isi: "Lacak status dan tanggapan memakai nomor tiket + kode verifikasi pada bagian Lacak.",
      },
    ],
    ketentuan: [
      "Pengaduan anonim tidak dilayani.",
      "Identitas dan isi pengaduan hanya dapat dilihat oleh Anda dan petugas berwenang.",
      "Sampaikan fakta; hindari fitnah, ujaran kebencian, dan unsur SARA.",
      "Waktu tanggapan mengikuti ketetapan Pemerintah Desa Lerep (menunggu data resmi).",
    ],
    alurStatus: ["Masuk", "Ditinjau", "Ditindaklanjuti", "Selesai"],
    statusLain: "Pengaduan juga dapat Ditolak (selalu disertai tanggapan) atau Ditutup.",
    kategori: [
      "Pelayanan administrasi",
      "Jalan & infrastruktur",
      "Kebersihan & lingkungan",
      "Keamanan & ketertiban",
      "Fasilitas umum",
      "Sosial & kemasyarakatan",
      "Lainnya",
    ],
    labelPerihal: "Perihal pengaduan",
    contohPerihal: "mis. Lampu jalan padam di Dusun Karangbolo",
    labelUraian: "Uraian pengaduan",
    petunjukUraian: "Ceritakan kronologi singkat: apa, kapan, di mana, dan dampaknya.",
  },
  aspirasi: {
    judul: "Aspirasi Warga",
    ringkas: "Sampaikan usulan atau gagasan untuk kemajuan Desa Lerep.",
    kataKerja: "Kirim Aspirasi",
    pelaku: "Pengusul",
    sop: [
      {
        judul: "Siapkan identitas & kontak",
        isi: "Aspirasi disertai nama dan nomor telepon/WhatsApp aktif agar petugas dapat meminta klarifikasi.",
      },
      {
        judul: "Pilih kategori & tulis gagasan",
        isi: "Jelaskan usulan, alasan, dan manfaatnya bagi warga. Semakin jelas, semakin mudah ditindaklanjuti.",
      },
      {
        judul: "Simpan nomor tiket & kode verifikasi",
        isi: "Kode verifikasi hanya ditampilkan sekali. Unduh bukti PDF untuk arsip Anda.",
      },
      {
        judul: "Peninjauan oleh pemerintah desa",
        isi: "Aspirasi ditinjau dan dapat diterima, perlu klarifikasi, atau belum dapat diterima — selalu dengan tanggapan.",
      },
      {
        judul: "Pantau tanggapan",
        isi: "Gunakan nomor tiket + kode verifikasi untuk melihat status dan tanggapan admin.",
      },
    ],
    ketentuan: [
      "Aspirasi berisi usulan/gagasan; laporkan masalah melalui Pengaduan.",
      "Status Diterima belum berarti langsung direalisasikan.",
      "Data kontak Anda tidak ditampilkan di halaman publik.",
      "Gunakan bahasa yang santun dan membangun.",
    ],
    alurStatus: ["Terkirim", "Ditinjau", "Diterima", "Ditindaklanjuti", "Selesai"],
    statusLain: "Aspirasi juga dapat berstatus Perlu Klarifikasi atau Tidak Diterima (selalu disertai tanggapan).",
    kategori: [
      "Pembangunan & infrastruktur",
      "Ekonomi & UMKM",
      "Wisata & budaya",
      "Pendidikan & kepemudaan",
      "Kesehatan & sosial",
      "Lingkungan hidup",
      "Tata kelola desa",
      "Lainnya",
    ],
    labelPerihal: "Judul aspirasi",
    contohPerihal: "mis. Usulan pelatihan pemasaran digital untuk UMKM",
    labelUraian: "Isi usulan atau gagasan",
    petunjukUraian: "Jelaskan usulan, alasan, dan manfaatnya bagi warga desa.",
  },
};

export type IdLangkah = "sop" | "identitas" | "isi" | "tinjau";

export function daftarLangkah(jenis: Jenis): { id: IdLangkah; label: string }[] {
  return [
    { id: "sop", label: "Baca SOP" },
    { id: "identitas", label: `Data ${KONTEN[jenis].pelaku}` },
    { id: "isi", label: jenis === "pengaduan" ? "Isi Pengaduan" : "Isi Aspirasi" },
    { id: "tinjau", label: "Tinjau & Kirim" },
  ];
}

/** Kolom yang divalidasi pada tiap langkah sebelum boleh lanjut. */
export const KOLOM_LANGKAH: Record<Jenis, Record<IdLangkah, (keyof NilaiForm)[]>> = {
  pengaduan: {
    sop: [],
    identitas: ["nama", "telepon", "email", "alamat"],
    isi: ["kategori", "perihal", "uraian", "lokasi"],
    tinjau: ["persetujuan"],
  },
  aspirasi: {
    sop: [],
    identitas: ["nama", "telepon", "email"],
    isi: ["kategori", "perihal", "uraian"],
    tinjau: ["persetujuan"],
  },
};
