import { asset } from "./asset";

/**
 * Loader `next/image` untuk static export (GitHub Pages): tidak ada image
 * optimizer, jadi file asli disajikan apa adanya dengan prefix basePath.
 * Parameter `w` hanya agar tiap ukuran srcset punya URL unik.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const url = asset(src);
  return url.startsWith("/") ? `${url}?w=${width}` : url;
}
