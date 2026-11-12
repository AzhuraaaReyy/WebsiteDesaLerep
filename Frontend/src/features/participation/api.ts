import type { Jenis, NilaiForm } from "./schema";

export type HasilKirim = {
  jenis: Jenis;
  nomorTiket: string;
  /** Plaintext hanya ada di respons pengiriman; backend menyimpan HMAC-nya saja (AR-14). */
  kodeVerifikasi: string;
  dikirimPada: Date;
  /** true selama frontend belum terhubung ke backend Go. */
  simulasi: boolean;
};

/** Tanpa karakter ambigu (0/O, 1/I/L) — ARCHITECTURE §9.5. */
const ALFABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function acak(panjang: number) {
  const angka = new Uint32Array(panjang);
  crypto.getRandomValues(angka);
  return Array.from(angka, (n) => ALFABET[n % ALFABET.length]).join("");
}

function tanggalRingkas(d: Date) {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  return p.replaceAll("-", "");
}

/** Kelompokkan kode per 4 karakter agar mudah dibaca: ABCD-EFGH-JKMN. */
export function formatKode(kode: string) {
  return kode.match(/.{1,4}/g)?.join("-") ?? kode;
}

/**
 * Mengirim pengaduan/aspirasi.
 *
 * TODO(backend): ganti simulasi ini dengan
 *   - POST /api/v1/complaints   (multipart/form-data: data + lampiran)
 *   - POST /api/v1/aspirations  (application/json)
 * Backend yang membuat nomor tiket & kode verifikasi, memeriksa honeypot/CAPTCHA,
 * rate limit, dan validasi file (ext, MIME, signature, ukuran).
 */
export async function kirimPartisipasi(jenis: Jenis, data: NilaiForm, lampiran: File[]): Promise<HasilKirim> {
  void lampiran;
  await new Promise((r) => setTimeout(r, 1400));

  // Honeypot terisi → tolak dengan pesan generik (AR-19).
  if (data.website.trim() !== "") {
    throw new Error("Pengiriman gagal diproses. Silakan coba lagi beberapa saat lagi.");
  }

  const dikirimPada = new Date();
  const awalan = jenis === "pengaduan" ? "PGD" : "ASP";
  return {
    jenis,
    nomorTiket: `${awalan}-${tanggalRingkas(dikirimPada)}-${acak(5)}`,
    kodeVerifikasi: acak(12),
    dikirimPada,
    simulasi: true,
  };
}
