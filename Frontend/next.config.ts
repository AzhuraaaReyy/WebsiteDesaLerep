import type { NextConfig } from "next";

/**
 * `GITHUB_PAGES=true` (diset oleh workflow GitHub Actions) menghasilkan static
 * export ke `out/` dengan basePath repo. Tanpa variabel itu konfigurasi tetap
 * `standalone` untuk image Docker (deploy VPS).
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: {
        loader: "custom",
        loaderFile: "./src/lib/image-loader.ts",
      },
    }
  : {
      output: "standalone",
    };

export default nextConfig;
