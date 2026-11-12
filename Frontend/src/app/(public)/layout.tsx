import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TombolWhatsApp } from "@/components/layout/TombolWhatsApp";

/** Tata letak halaman publik (selain beranda): navbar + konten + footer. */
export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only z-[60] rounded-full bg-sogan-900 px-4 py-2 text-mori focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati ke konten
      </a>
      <SiteHeader />
      <main id="konten">{children}</main>
      <SiteFooter />
      <TombolWhatsApp />
    </>
  );
}
