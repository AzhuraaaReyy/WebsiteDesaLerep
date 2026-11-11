/**
 * Prefix basePath untuk aset statis di `public/`.
 *
 * Saat deploy ke GitHub Pages situs berada di subpath (mis. `/WebsiteDesaLerep`),
 * sedangkan Next.js tidak menambahkan basePath otomatis ke string seperti
 * `url(/images/...)`, `src` pada image loader custom, atau ikon metadata.
 * Di Docker/VPS `NEXT_PUBLIC_BASE_PATH` kosong sehingga path tidak berubah.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (basePath && path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
