import { z } from "zod";

/**
 * Validasi formulir pengaduan & aspirasi.
 * Kolom mengikuti SCHEMA E.6 `complaints` dan E.12 `aspirations`; batas panjang sama dengan
 * VARCHAR di database. Validasi akhir tetap dilakukan backend Go (ARCHITECTURE §11).
 */
export type Jenis = "pengaduan" | "aspirasi";

export const BATAS = {
  nama: 150,
  telepon: 30,
  email: 255,
  alamat: 300,
  kategori: 100,
  perihal: 200,
  uraianMin: 30,
  uraianMaks: 3000,
  lokasi: 300,
} as const;

const telepon = z
  .string()
  .trim()
  .min(1, "Nomor telepon/WhatsApp wajib diisi agar petugas dapat menghubungi Anda.")
  .max(BATAS.telepon, `Nomor maksimal ${BATAS.telepon} karakter.`)
  .refine((v) => /^(\+62|62|0)8\d{7,12}$/.test(v.replace(/[\s.-]/g, "")), "Gunakan nomor seluler Indonesia, mis. 0812-3456-7890.");

const emailOpsional = z
  .string()
  .trim()
  .max(BATAS.email, "Email terlalu panjang.")
  .refine((v) => v === "" || z.email().safeParse(v).success, "Format email belum benar, mis. nama@contoh.id.");

export function buatSchema(jenis: Jenis) {
  return z.object({
    nama: z
      .string()
      .trim()
      .min(3, "Nama lengkap wajib diisi (minimal 3 huruf).")
      .max(BATAS.nama, `Nama maksimal ${BATAS.nama} karakter.`),
    telepon,
    email: emailOpsional,
    alamat: z.string().trim().max(BATAS.alamat, `Alamat maksimal ${BATAS.alamat} karakter.`),
    kategori: z
      .string()
      .max(BATAS.kategori)
      // Kategori opsional untuk pengaduan, wajib untuk aspirasi (SCHEMA E.6 vs E.12).
      .refine((v) => jenis === "pengaduan" || v.length > 0, "Pilih kategori aspirasi."),
    perihal: z
      .string()
      .trim()
      .min(5, "Perihal minimal 5 karakter.")
      .max(BATAS.perihal, `Perihal maksimal ${BATAS.perihal} karakter.`),
    uraian: z
      .string()
      .trim()
      .min(BATAS.uraianMin, `Uraian minimal ${BATAS.uraianMin} karakter agar petugas memahami persoalannya.`)
      .max(BATAS.uraianMaks, `Uraian maksimal ${BATAS.uraianMaks} karakter.`),
    lokasi: z.string().trim().max(BATAS.lokasi, `Keterangan lokasi maksimal ${BATAS.lokasi} karakter.`),
    persetujuan: z.boolean().refine((v) => v, "Centang pernyataan ini untuk mengirim."),
    /** Honeypot — harus tetap kosong (ARCHITECTURE §11.4, AR-19). */
    website: z.string(),
  });
}

export type NilaiForm = z.infer<ReturnType<typeof buatSchema>>;

export const NILAI_AWAL: NilaiForm = {
  nama: "",
  telepon: "",
  email: "",
  alamat: "",
  kategori: "",
  perihal: "",
  uraian: "",
  lokasi: "",
  persetujuan: false,
  website: "",
};

/* ───────── Lampiran bukti (SCHEMA E.11) ───────── */
export const LAMPIRAN = {
  maksUkuran: 5_242_880, // 5 MiB per file
  maksJumlah: 3,
  tipe: {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  } as Record<string, string[]>,
} as const;

export const AKSEP_LAMPIRAN = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";

export function formatUkuran(byte: number) {
  if (byte < 1024) return `${byte} B`;
  if (byte < 1024 * 1024) return `${(byte / 1024).toLocaleString("id-ID", { maximumFractionDigits: 0 })} KB`;
  return `${(byte / 1024 / 1024).toLocaleString("id-ID", { maximumFractionDigits: 1 })} MB`;
}

/** Menyaring file baru terhadap aturan tipe, ukuran, jumlah, dan duplikat. */
export function saringLampiran(lama: File[], baru: File[]) {
  const diterima = [...lama];
  const galat: string[] = [];
  for (const f of baru) {
    const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
    const extCocok = LAMPIRAN.tipe[f.type]?.includes(ext);
    if (!extCocok) {
      galat.push(`${f.name}: format tidak didukung. Gunakan PDF, JPG, atau PNG.`);
    } else if (f.size > LAMPIRAN.maksUkuran) {
      galat.push(`${f.name}: ukuran ${formatUkuran(f.size)} melebihi batas 5 MB.`);
    } else if (f.size === 0) {
      galat.push(`${f.name}: file kosong.`);
    } else if (diterima.some((d) => d.name === f.name && d.size === f.size)) {
      galat.push(`${f.name}: file ini sudah ditambahkan.`);
    } else if (diterima.length >= LAMPIRAN.maksJumlah) {
      galat.push(`${f.name}: maksimal ${LAMPIRAN.maksJumlah} lampiran.`);
    } else {
      diterima.push(f);
    }
  }
  return { diterima, galat };
}
