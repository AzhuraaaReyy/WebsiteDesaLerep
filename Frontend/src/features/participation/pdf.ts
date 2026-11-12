/**
 * Generator PDF ringan tanpa dependensi (PDF 1.4, font standar Helvetica/Courier,
 * WinAnsiEncoding). Dipakai untuk bukti pengiriman pengaduan/aspirasi di peramban.
 */
import { formatKode, type HasilKirim } from "./api";
import { KONTEN } from "./content";
import { formatUkuran, type NilaiForm } from "./schema";

type Warna = [number, number, number];
type Font = "F1" | "F2" | "F3"; // Helvetica, Helvetica-Bold, Courier-Bold

const hex = (h: string): Warna => [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255) as Warna;
const C = {
  ornamen: hex("#562F00"),
  jingga: hex("#FF9644"),
  jinggaMuda: hex("#FFCE99"),
  krem: hex("#FFF4E6"),
  tinta: hex("#4B3A2C"),
  redup: hex("#7A5233"),
  garis: hex("#ECD3A8"),
  putih: hex("#FFFFFF"),
};

/* Lebar glyph (per 1000 unit) untuk karakter 32–126, dari metrik AFM standar. */
// prettier-ignore
const LEBAR_REG = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
// prettier-ignore
const LEBAR_BOLD = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];

function lebarTeks(teks: string, ukuran: number, font: Font) {
  if (font === "F3") return teks.length * 600 * (ukuran / 1000);
  const tabel = font === "F2" ? LEBAR_BOLD : LEBAR_REG;
  let w = 0;
  for (const ch of teks) {
    const c = ch.charCodeAt(0);
    w += c >= 32 && c <= 126 ? tabel[c - 32] : 556;
  }
  return (w * ukuran) / 1000;
}

/** Ubah ke Latin-1 (WinAnsi); karakter di luar jangkauan diganti. */
function latin1(s: string) {
  return s
    .normalize("NFC")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/\t/g, "    ")
    .replace(/[^\n\x20-\x7E\xA0-\xFF]/g, "?");
}

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
const n = (v: number) => (Math.round(v * 100) / 100).toString();
const rgb = (w: Warna) => w.map(n).join(" ");

/** Pecah teks menjadi baris yang muat pada lebar tertentu. */
function bungkus(teks: string, lebar: number, ukuran: number, font: Font) {
  const hasil: string[] = [];
  for (const paragraf of latin1(teks).split("\n")) {
    let baris = "";
    for (const kata of paragraf.split(/ +/)) {
      const coba = baris ? `${baris} ${kata}` : kata;
      if (lebarTeks(coba, ukuran, font) <= lebar) {
        baris = coba;
        continue;
      }
      if (baris) hasil.push(baris);
      // Kata yang lebih panjang dari satu baris dipotong per karakter.
      let sisa = kata;
      while (lebarTeks(sisa, ukuran, font) > lebar) {
        let i = sisa.length;
        while (i > 1 && lebarTeks(sisa.slice(0, i), ukuran, font) > lebar) i--;
        hasil.push(sisa.slice(0, i));
        sisa = sisa.slice(i);
      }
      baris = sisa;
    }
    hasil.push(baris);
  }
  return hasil;
}

const LEBAR_HAL = 595.28;
const TINGGI_HAL = 841.89;

class Dokumen {
  private halaman: string[][] = [];

  baru() {
    this.halaman.push([]);
  }

  private get isi() {
    return this.halaman[this.halaman.length - 1];
  }

  /** `y` diukur dari tepi atas halaman (lebih intuitif untuk tata letak). */
  teks(x: number, y: number, s: string, ukuran = 10, font: Font = "F1", warna: Warna = C.tinta) {
    this.isi.push(`BT /${font} ${n(ukuran)} Tf ${rgb(warna)} rg ${n(x)} ${n(TINGGI_HAL - y)} Td (${esc(latin1(s))}) Tj ET`);
  }

  teksKanan(xKanan: number, y: number, s: string, ukuran = 10, font: Font = "F1", warna: Warna = C.tinta) {
    this.teks(xKanan - lebarTeks(latin1(s), ukuran, font), y, s, ukuran, font, warna);
  }

  kotak(x: number, y: number, w: number, h: number, isi?: Warna, garis?: Warna, tebal = 1) {
    const op = isi && garis ? "B" : isi ? "f" : "S";
    this.isi.push(
      `${isi ? `${rgb(isi)} rg ` : ""}${garis ? `${rgb(garis)} RG ${n(tebal)} w ` : ""}${n(x)} ${n(TINGGI_HAL - y - h)} ${n(w)} ${n(h)} re ${op}`,
    );
  }

  garis(x1: number, y: number, x2: number, warna: Warna = C.garis, tebal = 0.8) {
    this.isi.push(`${rgb(warna)} RG ${n(tebal)} w ${n(x1)} ${n(TINGGI_HAL - y)} m ${n(x2)} ${n(TINGGI_HAL - y)} l S`);
  }

  /** Deret segitiga tumpal menghadap ke atas, alas pada `yAlas`. */
  tumpal(yAlas: number, tinggi: number, lebar: number, warna: Warna) {
    const yb = TINGGI_HAL - yAlas;
    const p: string[] = [`${rgb(warna)} rg`];
    for (let x = 0; x < LEBAR_HAL; x += lebar) {
      p.push(`${n(x)} ${n(yb)} m ${n(x + lebar / 2)} ${n(yb + tinggi)} l ${n(x + lebar)} ${n(yb)} l f`);
    }
    this.isi.push(p.join(" "));
  }

  get jumlahHalaman() {
    return this.halaman.length;
  }

  /** Salinan operasi gambar pada halaman aktif. */
  operasi() {
    return [...this.isi];
  }

  tambahKeHalaman(indeks: number, operasi: string[]) {
    this.halaman[indeks].push(...operasi);
  }

  hasilkan(): Uint8Array<ArrayBuffer> {
    const objek: string[] = [];
    const tambah = (s: string) => objek.push(s) && objek.length;

    const idKatalog = tambah("");
    const idHalaman = tambah("");
    const idF1 = tambah("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const idF2 = tambah("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const idF3 = tambah("<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>");

    const anak: number[] = [];
    for (const ops of this.halaman) {
      const stream = ops.join("\n");
      const idIsi = tambah(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
      anak.push(
        tambah(
          `<< /Type /Page /Parent ${idHalaman} 0 R /MediaBox [0 0 ${n(LEBAR_HAL)} ${n(TINGGI_HAL)}] ` +
            `/Resources << /Font << /F1 ${idF1} 0 R /F2 ${idF2} 0 R /F3 ${idF3} 0 R >> >> /Contents ${idIsi} 0 R >>`,
        ),
      );
    }
    objek[idKatalog - 1] = `<< /Type /Catalog /Pages ${idHalaman} 0 R >>`;
    objek[idHalaman - 1] = `<< /Type /Pages /Kids [${anak.map((a) => `${a} 0 R`).join(" ")}] /Count ${anak.length} >>`;

    let keluar = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    const offset: number[] = [];
    objek.forEach((o, i) => {
      offset.push(keluar.length);
      keluar += `${i + 1} 0 obj\n${o}\nendobj\n`;
    });
    const xref = keluar.length;
    keluar += `xref\n0 ${objek.length + 1}\n0000000000 65535 f \n`;
    keluar += offset.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
    keluar += `trailer\n<< /Size ${objek.length + 1} /Root ${idKatalog} 0 R /Info << /Producer (Website Desa Lerep) >> >>\nstartxref\n${xref}\n%%EOF`;

    const bytes = new Uint8Array(new ArrayBuffer(keluar.length));
    for (let i = 0; i < keluar.length; i++) bytes[i] = keluar.charCodeAt(i) & 0xff;
    return bytes;
  }
}

export type DataBukti = {
  hasil: HasilKirim;
  data: NilaiForm;
  lampiran: { nama: string; ukuran: number }[];
};

export function formatWaktu(d: Date) {
  return `${new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Jakarta" }).format(d)} WIB`;
}

/** Membuat PDF bukti pengiriman berisi seluruh isian, nomor tiket, dan kode verifikasi. */
export function buatBuktiPdf({ hasil, data, lampiran }: DataBukti): Blob {
  const k = KONTEN[hasil.jenis];
  const pdf = new Dokumen();
  const M = 48; // margin
  const KANAN = LEBAR_HAL - M;
  const BATAS_BAWAH = TINGGI_HAL - 72;
  const KOL_LABEL = 138;
  let y = 0;

  const kepalaPenuh = () => {
    pdf.kotak(0, 0, LEBAR_HAL, 98, C.ornamen);
    pdf.teks(M, 42, "PEMERINTAH DESA LEREP", 16, "F2", C.putih);
    pdf.teks(M, 60, "Kecamatan Ungaran Barat · Kabupaten Semarang · Jawa Tengah", 9, "F1", C.jinggaMuda);
    pdf.teksKanan(KANAN, 40, "BUKTI PENGIRIMAN", 8.5, "F2", C.jinggaMuda);
    pdf.teksKanan(KANAN, 57, hasil.jenis === "pengaduan" ? "PENGADUAN MASYARAKAT" : "ASPIRASI WARGA", 12, "F2", C.putih);
    pdf.kotak(0, 98, LEBAR_HAL, 7, C.jingga);
    pdf.tumpal(98, 7, 12, C.ornamen);
    y = 140;
  };

  const kepalaLanjutan = () => {
    pdf.kotak(0, 0, LEBAR_HAL, 30, C.ornamen);
    pdf.teks(M, 19, `Bukti ${k.judul} · ${hasil.nomorTiket}`, 9, "F2", C.putih);
    pdf.kotak(0, 30, LEBAR_HAL, 4, C.jingga);
    y = 62;
  };

  const pastikan = (tinggi: number) => {
    if (y + tinggi > BATAS_BAWAH) {
      pdf.baru();
      kepalaLanjutan();
    }
  };

  const judulBagian = (judul: string) => {
    pastikan(40);
    y += 10;
    pdf.kotak(M, y - 10, 4, 14, C.jingga);
    pdf.teks(M + 12, y + 1, judul.toUpperCase(), 10.5, "F2", C.ornamen);
    y += 12;
    pdf.garis(M, y, KANAN, C.jinggaMuda, 1.2);
    y += 16;
  };

  const baris = (label: string, nilai: string) => {
    const lebarNilai = KANAN - M - KOL_LABEL;
    const isi = nilai.trim() === "" ? ["-"] : bungkus(nilai, lebarNilai, 10, "F1");
    pastikan(Math.min(isi.length, 3) * 14 + 8);
    pdf.teks(M, y, label, 9, "F1", C.redup);
    for (const b of isi) {
      if (y + 14 > BATAS_BAWAH) {
        pdf.baru();
        kepalaLanjutan();
        pdf.teks(M, y, `${label} (lanjutan)`, 9, "F1", C.redup);
      }
      pdf.teks(M + KOL_LABEL, y, b, 10, "F1", C.tinta);
      y += 14;
    }
    y += 4;
    pdf.garis(M, y - 6, KANAN);
    y += 6;
  };

  /* ── Halaman 1 ── */
  pdf.baru();
  kepalaPenuh();

  pdf.teks(M, y, `Bukti Pengiriman ${k.judul}`, 17, "F2", C.ornamen);
  y += 18;
  pdf.teks(M, y, `Dikirim pada ${formatWaktu(hasil.dikirimPada)}`, 9.5, "F1", C.redup);
  y += 18;

  // Kotak tiket + kode verifikasi
  const tinggiKotak = 104;
  pdf.kotak(M, y, KANAN - M, tinggiKotak, C.krem, C.jingga, 1.4);
  const tengah = M + (KANAN - M) / 2;
  pdf.teks(M + 18, y + 24, "NOMOR TIKET", 8, "F2", C.redup);
  pdf.teks(M + 18, y + 46, hasil.nomorTiket, 16, "F3", C.ornamen);
  pdf.teks(tengah + 6, y + 24, "KODE VERIFIKASI", 8, "F2", C.redup);
  pdf.teks(tengah + 6, y + 46, formatKode(hasil.kodeVerifikasi), 16, "F3", C.ornamen);
  pdf.garis(M + 18, y + 60, KANAN - 18, C.jinggaMuda, 1);
  const catatan = bungkus(
    "Simpan kode verifikasi dengan aman dan jangan dibagikan. Kode hanya ditampilkan sekali dan diperlukan bersama nomor tiket untuk melacak status serta tanggapan petugas.",
    KANAN - M - 36,
    8.5,
    "F1",
  );
  catatan.forEach((b, i) => pdf.teks(M + 18, y + 76 + i * 11, b, 8.5, "F1", C.tinta));
  y += tinggiKotak + 26;

  judulBagian(`Data ${k.pelaku}`);
  baris("Nama lengkap", data.nama);
  baris("Telepon / WhatsApp", data.telepon);
  baris("Email", data.email);
  if (hasil.jenis === "pengaduan") baris("Alamat", data.alamat);

  judulBagian(hasil.jenis === "pengaduan" ? "Isi Pengaduan" : "Isi Aspirasi");
  baris("Kategori", data.kategori);
  baris(hasil.jenis === "pengaduan" ? "Perihal" : "Judul", data.perihal);
  if (hasil.jenis === "pengaduan") baris("Lokasi kejadian", data.lokasi);
  baris(hasil.jenis === "pengaduan" ? "Uraian" : "Isi usulan", data.uraian);
  if (hasil.jenis === "pengaduan") {
    baris(
      "Lampiran bukti",
      lampiran.length ? lampiran.map((l, i) => `${i + 1}. ${l.nama} (${formatUkuran(l.ukuran)})`).join("\n") : "Tidak ada lampiran",
    );
  }

  judulBagian("Status & Pelacakan");
  baris("Status saat ini", hasil.jenis === "pengaduan" ? "Masuk" : "Terkirim");
  baris("Cara melacak", "Buka halaman Pelayanan Publik > Lacak, lalu masukkan nomor tiket dan kode verifikasi di atas.");

  /* ── Kaki halaman di setiap halaman ── */
  const total = pdf.jumlahHalaman;
  for (let i = 0; i < total; i++) {
    const yk = TINGGI_HAL - 44;
    const sementara = new Dokumen();
    sementara.baru();
    sementara.garis(M, yk - 12, KANAN, C.garis, 0.8);
    sementara.teks(M, yk, "Dokumen ini dibuat otomatis oleh Website Desa Lerep sebagai bukti pengiriman, bukan surat resmi.", 7.5, "F1", C.redup);
    if (hasil.simulasi) {
      sementara.teks(M, yk + 11, "MODE PENGEMBANGAN: nomor tiket dibuat di peramban dan belum tersimpan di server desa.", 7.5, "F2", C.ornamen);
    }
    sementara.teksKanan(KANAN, yk, `Halaman ${i + 1} dari ${total}`, 7.5, "F1", C.redup);
    pdf.tambahKeHalaman(i, sementara.operasi());
  }

  return new Blob([pdf.hasilkan()], { type: "application/pdf" });
}
