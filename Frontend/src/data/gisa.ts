/**
 * Layanan administrasi GisaLerep (Pelayanan Administrasi Desa Lerep).
 * Sumber tautan: https://linktr.ee/GisaLerep — diperiksa 12 November 2026.
 * Berkas di public/dokumen/layanan/ berasal dari folder "Dokumen Layanan" pengelola:
 * - persyaratan-*.pdf  → didesain ulang sesuai tema website, isi tidak diubah;
 * - format & surat edaran → dokumen asli (tidak didesain ulang).
 */
export type GisaIkon = "ahliWaris" | "nikah" | "penduduk" | "kelahiran" | "kematian";

export type DokumenLayanan = {
  id: string;
  judul: string;
  jenis: "Persyaratan" | "Format surat" | "Surat edaran";
  /** "desain" = disusun ulang bertema website; "asli" = file sumber apa adanya. */
  versi: "desain" | "asli";
  pdf: string;
  ukuranPdf: string;
  halaman: number;
  /** Gambar tiap halaman untuk penampil di HP / peramban tanpa penampil PDF. */
  pratinjau: string[];
  /** File tambahan yang dapat diunduh, mis. format Word yang bisa diisi. */
  unduhLain?: { label: string; href: string; ukuran: string };
  keterangan?: string;
};

export type GisaLayananItem = {
  id: string;
  ikon: GisaIkon;
  judul: string;
  isi: string;
  drive: string;
  dokumen: DokumenLayanan[];
};

const DIR = "/dokumen/layanan";
const hal = (nama: string, n: number) => Array.from({ length: n }, (_, i) => `${DIR}/pratinjau/${nama}-h${i + 1}.webp`);

const persyaratan = (nama: string, judul: string, halaman: number, ukuranPdf: string): DokumenLayanan => ({
  id: nama,
  judul,
  jenis: "Persyaratan",
  versi: "desain",
  pdf: `${DIR}/${nama}.pdf`,
  ukuranPdf,
  halaman,
  pratinjau: hal(nama, halaman),
});

const layanan: GisaLayananItem[] = [
  {
    id: "ahli-waris",
    ikon: "ahliWaris",
    judul: "Ahli Waris",
    isi: "Persyaratan, format surat pernyataan, dan surat edaran pengurusan ahli waris.",
    drive: "https://drive.google.com/drive/folders/1EUWukYlkY2CPvOiuwICGa-rOzekZWny5?usp=drive_link",
    dokumen: [
      persyaratan("persyaratan-ahli-waris", "Persyaratan Ahli Waris", 1, "464 KB"),
      {
        id: "format-surat-pernyataan-ahli-waris",
        judul: "Format Surat Pernyataan Ahli Waris",
        jenis: "Format surat",
        versi: "asli",
        pdf: `${DIR}/format-surat-pernyataan-ahli-waris.pdf`,
        ukuranPdf: "40 KB",
        halaman: 1,
        pratinjau: hal("format-surat-pernyataan-ahli-waris", 1),
        unduhLain: { label: "Word (.docx)", href: `${DIR}/format-surat-pernyataan-ahli-waris.docx`, ukuran: "20 KB" },
        keterangan: "Unduh versi Word untuk diisi. Pratinjau PDF dapat sedikit berbeda font dari file Word aslinya.",
      },
      {
        id: "surat-edaran-pernyataan-ahli-waris",
        judul: "Surat Edaran Penerbitan Surat Pernyataan Ahli Waris",
        jenis: "Surat edaran",
        versi: "asli",
        pdf: `${DIR}/surat-edaran-pernyataan-ahli-waris.pdf`,
        ukuranPdf: "2,6 MB",
        halaman: 7,
        pratinjau: hal("surat-edaran-pernyataan-ahli-waris", 7),
        keterangan: "Surat dari Sekretariat Daerah Kabupaten Semarang (September 2023), ditampilkan sesuai aslinya.",
      },
    ],
  },
  {
    id: "nikah",
    ikon: "nikah",
    judul: "Persyaratan Nikah",
    isi: "Berkas yang perlu disiapkan calon pengantin sebelum mendaftarkan pernikahan.",
    drive: "https://drive.google.com/file/d/1mC0yxGG3W-xe9aiaNqwTd-vkbao7hIT8/view?usp=sharing",
    dokumen: [persyaratan("persyaratan-nikah", "Persyaratan Nikah", 1, "444 KB")],
  },
  {
    id: "penduduk",
    ikon: "penduduk",
    judul: "Administrasi Penduduk",
    isi: "KTP, perubahan KK, pengantar & keterangan, serta pindah penduduk beserta alurnya.",
    drive: "https://drive.google.com/drive/folders/15joGBrvJ7fB-vHLf8F2dsgpD7ZR1oViR?usp=sharing",
    dokumen: [persyaratan("persyaratan-administrasi-penduduk", "Persyaratan Administrasi Penduduk", 2, "452 KB")],
  },
  {
    id: "akta-kelahiran",
    ikon: "kelahiran",
    judul: "Akta Kelahiran",
    isi: "Persyaratan akta kelahiran untuk 11 kondisi, dari normal hingga ganti barcode.",
    drive: "https://drive.google.com/drive/folders/1IKYl9gtAdzMRZp7XWQWfhw3uxlnElJ48?usp=sharing",
    dokumen: [persyaratan("persyaratan-akta-kelahiran", "Persyaratan Akta Kelahiran", 2, "568 KB")],
  },
  {
    id: "akta-kematian",
    ikon: "kematian",
    judul: "Akta Kematian",
    isi: "Persyaratan akta kematian untuk data normal maupun yang belum ada di database.",
    drive: "https://drive.google.com/drive/folders/10V16duzhPy31auYvtGLiE0gSnkiQMTM2?usp=sharing",
    dokumen: [persyaratan("persyaratan-akta-kematian", "Persyaratan Akta Kematian", 1, "456 KB")],
  },
];

export const gisa = {
  nama: "GisaLerep",
  deskripsi: "Pelayanan Administrasi Desa Lerep",
  slogan: "Urus sendiri, hindari calo",
  petugas: "Ainun Nuha",
  telepon: "0813-2770-7968",
  whatsapp: "https://wa.me/6281327707968",
  tanyaJawab: "https://wa.me/qr/4DGFT3NW6QFWH1",
  sumber: "https://linktr.ee/GisaLerep",
  diperiksa: "12 November 2026",
  layanan,
};
