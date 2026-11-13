/**
 * Optimasi gambar untuk static export (GitHub Pages) — tanpa mengubah tampilan.
 *
 * GitHub Pages tidak punya image optimizer Next.js, jadi script ini menyiapkan:
 * 1. Varian WebP responsif untuk setiap gambar `public/images/*` yang dipakai `next/image`
 *    → `public/_img/images/<nama>-<lebar>.webp` (tidak di-commit, dibuat saat build).
 *    Lebar mengikuti daftar bawaan Next.js (imageSizes + deviceSizes), dibatasi lebar asli.
 * 2. `src/lib/image-manifest.json`: lebar asli tiap gambar, dipakai `image-loader.ts`
 *    agar tidak pernah meminta file yang lebih besar dari aslinya.
 * 3. Versi ringan untuk gambar yang dipakai lewat CSS (latar/mask) dan favicon
 *    → disimpan di `public/images/` dan di-commit (dipakai juga oleh build Docker).
 *
 * Jalankan: `npm run images:optimize` (otomatis di workflow GitHub Pages sebelum build).
 */
import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SUMBER = path.join(ROOT, "public/images");
const KELUARAN = path.join(ROOT, "public/_img/images");
const MANIFEST = path.join(ROOT, "src/lib/image-manifest.json");
/** Hash sumber yang sudah diproses — cache CI tetap berlaku walau mtime file berubah. */
const CATATAN = path.join(ROOT, "public/_img/.catatan.json");

/** Default Next.js 16: images.imageSizes + images.deviceSizes. */
const LEBAR = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/** Kualitas WebP: foto tanpa alpha vs ornamen/logo dengan alpha (alpha tetap lossless). */
const OPSI_FOTO = { quality: 82, effort: 6 };
const OPSI_ALPHA = { quality: 88, alphaQuality: 100, effort: 6 };

/**
 * Gambar yang dipakai lewat CSS/inline style → versi WebP di samping file asli (di-commit).
 * `tinggi` memperkecil gambar bila ukuran tampilnya memang kecil; `opsi` menimpa kualitas bawaan.
 */
const VERSI_CSS = [
  // Satu file untuk semua pemakaian (latar tipis & MotifImage) agar cukup diunduh sekali lalu ter-cache.
  { sumber: "batik.jpg", keluaran: "batik.webp" },
  // Pita `.pita-batik` sengaja tetap ukuran asli: versi yang diperkecil mengubah detail motifnya (pola moiré).
  { sumber: "border-batik-h.jpg", keluaran: "border-batik-h.webp" },
  { sumber: "border-floral-h.jpg", keluaran: "border-floral-h.webp" },
  { sumber: "ornamen-garis.png", keluaran: "ornamen-garis.webp" },
  { sumber: "ornamen-pembatas.png", keluaran: "ornamen-pembatas.webp" },
  { sumber: "ornamen-sudut.png", keluaran: "ornamen-sudut.webp" },
];

const EKSTENSI = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const FAVICON = "logo-mark-64.png";
/** File turunan buatan script ini — bukan sumber, jadi dilewati. */
const TURUNAN = new Set([...VERSI_CSS.map((v) => v.keluaran), FAVICON]);

const ada = (p) => access(p).then(() => true, () => false);

/** Sidik jari isi sumber + pengaturan; berubah bila gambar atau opsi kompresi berubah. */
async function sidik(sumber, ...pengaturan) {
  return createHash("sha1").update(await readFile(sumber)).update(JSON.stringify(pengaturan)).digest("hex");
}

async function main() {
  await mkdir(KELUARAN, { recursive: true });
  const berkas = (await readdir(SUMBER)).filter((f) => EKSTENSI.has(path.extname(f).toLowerCase()) && !TURUNAN.has(f)).sort();
  const manifest = {};
  const lama = JSON.parse(await readFile(CATATAN, "utf8").catch(() => "{}"));
  const catatan = {};
  let dibuat = 0;

  for (const f of berkas) {
    const sumber = path.join(SUMBER, f);
    const meta = await sharp(sumber).metadata();
    const opsi = meta.hasAlpha ? OPSI_ALPHA : OPSI_FOTO;
    const nama = f.slice(0, -path.extname(f).length);
    manifest[`/images/${f}`] = meta.width;

    // 1) Varian responsif: semua lebar < asli, ditambah lebar asli.
    const daftar = [...LEBAR.filter((w) => w < meta.width), meta.width];
    const hash = await sidik(sumber, opsi, daftar);
    catatan[f] = hash;
    const segar = lama[f] === hash;
    for (const w of daftar) {
      const target = path.join(KELUARAN, `${nama}-${w}.webp`);
      if (segar && (await ada(target))) continue;
      await sharp(sumber).resize({ width: w, withoutEnlargement: true }).webp(opsi).toFile(target);
      dibuat++;
    }
  }

  // 3) Versi untuk CSS — dibuat ulang bila sumber atau pengaturannya berubah.
  for (const v of VERSI_CSS) {
    const sumber = path.join(SUMBER, v.sumber);
    const target = path.join(SUMBER, v.keluaran);
    const opsi = v.opsi ?? ((await sharp(sumber).metadata()).hasAlpha ? OPSI_ALPHA : OPSI_FOTO);
    const hash = await sidik(sumber, v, opsi);
    catatan[`css:${v.keluaran}`] = hash;
    if (lama[`css:${v.keluaran}`] === hash && (await ada(target))) continue;
    const gambar = sharp(sumber);
    if (v.tinggi) gambar.resize({ height: v.tinggi });
    await gambar.webp(opsi).toFile(target);
    dibuat++;
  }

  // Favicon: logo 387 px → 64 px PNG (favicon tidak perlu lebih besar).
  const favicon = path.join(SUMBER, FAVICON);
  if (lama["logo-mark.png"] !== catatan["logo-mark.png"] || !(await ada(favicon))) {
    await sharp(path.join(SUMBER, "logo-mark.png")).resize({ width: 64 }).png({ compressionLevel: 9 }).toFile(favicon);
    dibuat++;
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(CATATAN, JSON.stringify(catatan));
  console.log(`optimize-images: ${berkas.length} gambar sumber, ${dibuat} file dibuat/diperbarui.`);
}

await main();
