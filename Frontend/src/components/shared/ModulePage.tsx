import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { CornerOrnament } from "@/components/ornament/Ornaments";
import { PageHero } from "@/components/shared/PageHero";
import { modulePages } from "@/data/site";
import { CONTENT_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

/**
 * Kerangka halaman modul. Setiap seksi punya id sebagai target tautan navbar
 * (mis. /profil#sejarah). Konten akan diisi dari Golang API `/api/v1`;
 * sampai data resmi tersedia, seksi ditandai "Menunggu data resmi" (PRD §14).
 */
export function ModulePage({ slug }: { slug: keyof typeof modulePages }) {
  const page = modulePages[slug];
  if (!page) notFound();
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <div className={cn(CONTENT_CONTAINER, "py-14 sm:py-20")}>
        <div className="grid gap-5 sm:grid-cols-2">
          {page.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`judul-${s.id}`}
              className="relative scroll-mt-28 overflow-hidden rounded-2xl border border-emas-soft bg-mori shadow-kartu"
            >
              <div className="pita-batik h-2" aria-hidden="true" />
              <CornerOrnament position="br" />
              <div className="px-6 pb-8 pt-6 sm:px-7">
                <h2 id={`judul-${s.id}`} className="font-serif text-xl font-bold text-sogan-900">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-tinta/85">{s.body}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-kunyit/40 bg-kunyit-soft/60 px-3 py-1 text-xs font-semibold text-sogan-900">
                  <Clock className="size-3.5" />
                  Menunggu data resmi dari Pemerintah Desa
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
