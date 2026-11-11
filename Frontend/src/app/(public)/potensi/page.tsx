import type { Metadata } from "next";
import { CornerOrnament } from "@/components/ornament/Ornaments";
import { MotifImage } from "@/components/ornament/MotifImage";
import { CARD, DummyNotice, Section } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { potensi } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { cn } from "@/lib/utils";

const page = modulePages.potensi;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function PotensiPage() {
  const entries = Object.entries(potensi);
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      {/* Lompat cepat antar kategori */}
      <nav aria-label="Kategori potensi" className="sticky top-[5.1rem] z-30 border-b border-emas-soft/70 bg-mori/90 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {entries.map(([id, k]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="block whitespace-nowrap rounded-full border border-emas-soft bg-white px-4 py-1.5 text-xs font-semibold text-sogan-900 transition hover:border-kunyit hover:text-kunyit-600"
              >
                {k.judul}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {entries.map(([id, k], idx) => (
        <Section key={id} id={id} eyebrow={["Potensi", k.judul]} title={k.judul} subtitle={k.subjudul} tone={idx % 2 === 0 ? "tekstur" : "plain"} className="scroll-mt-40">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {k.items.map((it) => (
              <article key={it.nama} className={cn(CARD, "group flex flex-col hover:-translate-y-1")}>
                <div className="relative">
                  <MotifImage src={it.image} alt={it.nama} motif={it.motif} className="aspect-[16/9] border-b-[3px] border-sogan-900" />
                  <span className="absolute left-4 top-4 rounded-full bg-sogan-900/90 px-3 py-1 font-serif text-[0.7rem] font-semibold text-mori">
                    {it.tag}
                  </span>
                  <CornerOrnament position="tr" className="text-mori/90" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-bold text-sogan-900 sm:text-xl">{it.nama}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-tinta/85">{it.isi}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
