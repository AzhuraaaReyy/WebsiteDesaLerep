import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Bell, Info } from "lucide-react";
import { CardCorners } from "@/components/ornament/Ornaments";
import { MotifImage } from "@/components/ornament/MotifImage";
import { CARD, DummyNotice, Section } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { beritaList, pengumuman } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { cn } from "@/lib/utils";

const page = modulePages.berita;
export const metadata: Metadata = { title: page.title, description: page.description };

const labelStyle = {
  Informasi: { cls: "bg-tosca text-white", icon: Info },
  Penting: { cls: "bg-kunyit text-white", icon: Bell },
  Darurat: { cls: "bg-[#b42318] text-white", icon: AlertTriangle },
} as const;

export default function BeritaPage() {
  const [utama, ...lainnya] = beritaList;
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section id="pengumuman" eyebrow={["Pengumuman", "Prioritas"]} title="Pengumuman Desa">
        <ul className="grid gap-3">
          {pengumuman.map((p) => {
            const L = labelStyle[p.label];
            return (
              <li key={p.judul} className={cn(CARD, "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5")}>
                <span className={cn("inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-bold sm:self-auto", L.cls)}>
                  <L.icon className="size-3.5" /> {p.label}
                </span>
                <span className="flex-1 font-serif text-base font-bold text-sogan-900 sm:text-lg">{p.judul}</span>
                <span className="text-xs text-tinta/75">Berlaku: {p.berlaku}</span>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="terbaru" eyebrow={["Kabar", "Terbaru Desa"]} title="Berita Terbaru" tone="tekstur">
        <article className={cn(CARD, "group grid overflow-hidden md:grid-cols-2")}>
          <CardCorners layer="depan" tl={{ tone: "terang" }} />
          <MotifImage alt={utama.judul} motif={utama.motif} className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-72" />
          <div className="relative flex flex-col justify-center p-6 sm:p-8">
            <p className="font-serif text-xs font-semibold uppercase tracking-[0.18em] text-kunyit-600">
              Berita Utama · {utama.kategori}
            </p>
            <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-sogan-900 sm:text-3xl">{utama.judul}</h3>
            <p className="mt-3 text-sm leading-relaxed text-tinta/85">{utama.ringkas}</p>
            <p className="mt-4 text-xs text-tinta/70">{utama.tanggal}</p>
            <Link href="/berita" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sogan-900 hover:text-kunyit-600">
              Baca Selengkapnya <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lainnya.map((b) => (
            <article key={b.slug} className={cn(CARD, "group flex flex-col hover:-translate-y-1")}>
              <MotifImage alt={b.judul} motif={b.motif} className="aspect-[16/8]" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="font-serif text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-kunyit-600">{b.kategori}</p>
                <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-sogan-900">{b.judul}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-tinta/85">{b.ringkas}</p>
                <div className="min-h-4 flex-1" aria-hidden="true" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tinta/70">{b.tanggal}</span>
                  <Link href="/berita" className="inline-flex items-center gap-1 font-bold text-sogan-900 hover:text-kunyit-600">
                    Baca <ArrowRight className="size-3.5" />
                    <span className="sr-only">: {b.judul}</span>
                  </Link>
                </div>
              </div>
              <div className="pita-batik h-2" aria-hidden="true" />
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
