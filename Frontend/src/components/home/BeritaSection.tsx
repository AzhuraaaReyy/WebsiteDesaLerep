import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardCorners, SectionHeading } from "@/components/ornament/Ornaments";
import { MotifImage } from "@/components/ornament/MotifImage";
import { berita } from "@/data/site";

export function BeritaSection() {
  return (
    <section id="berita" aria-labelledby="judul-berita" className="tekstur-mori border-b border-emas-soft/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-berita"
          eyebrow={["Agenda", "Tradisi & Kabar Desa"]}
          title="Berita & Agenda Budaya"
          subtitle="Ikuti dinamika kebersamaan warga, festival adat, dan pembangunan berkelanjutan"
        />

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {berita.map((b) => (
            <article
              key={b.slug}
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-emas-soft bg-mori shadow-kartu transition duration-300 hover:-translate-y-1 md:max-lg:last:col-span-2 md:max-lg:last:grid md:max-lg:last:grid-cols-2"
            >
              <CardCorners layer="depan" tl={{ tone: "terang" }} />
              <div className="relative md:max-lg:group-last:h-full">
                <MotifImage alt={b.title} motif={b.motif} className="aspect-[16/8] md:max-lg:group-last:aspect-auto md:max-lg:group-last:h-full md:max-lg:group-last:min-h-56" />
                <time
                  className="absolute right-4 top-4 grid min-w-12 place-items-center rounded-lg bg-sogan-900 px-2 py-1.5 text-center text-mori shadow-md"
                  aria-label={`${b.day} ${b.month}`}
                >
                  <span className="text-lg font-bold leading-none">{b.day}</span>
                  <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-kunyit-soft">{b.month}</span>
                </time>
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
                <p className="font-serif text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-kunyit-600">{b.category}</p>
                <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-sogan-900">{b.title}</h3>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-tinta/85">{b.excerpt}</p>
                <div className="min-h-4 flex-1" aria-hidden="true" />
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-sogan-900 hover:text-kunyit-600"
                >
                  Baca Selengkapnya
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  <span className="sr-only">: {b.title}</span>
                </Link>
              </div>
              <div className="pita-batik h-2 md:max-lg:group-last:col-span-2" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
