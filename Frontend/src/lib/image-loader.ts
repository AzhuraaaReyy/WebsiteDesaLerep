import { asset } from "./asset";
import manifest from "./image-manifest.json";

/** Lebar asli tiap gambar di `public/images` (dibuat oleh `scripts/optimize-images.mjs`). */
const lebarAsli: Record<string, number> = manifest;

/**
 * Loader `next/image` untuk static export (GitHub Pages).
 *
 * GitHub Pages tidak punya image optimizer, jadi varian WebP responsif dibuat saat build oleh
 * `npm run images:optimize` ke `public/_img/`. Loader memilih varian selebar `width`, dibatasi
 * lebar asli — sehingga gambar yang sama dari komponen berbeda memakai URL yang sama (sekali unduh).
 * Gambar yang tidak ada di manifest (mis. URL eksternal) disajikan apa adanya.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const asli = lebarAsli[src];
  if (!asli) return asset(src);
  const w = Math.min(width, asli);
  return asset(`/_img${src.replace(/\.[^./]+$/, "")}-${w}.webp`);
}
