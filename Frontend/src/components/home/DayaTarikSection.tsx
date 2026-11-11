import Image from "next/image";
import Link from "next/link";
import { CornerOrnament, SectionHeading } from "@/components/ornament/Ornaments";
import { MotifImage } from "@/components/ornament/MotifImage";
import { destinasi } from "@/data/site";

export function DayaTarikSection() {
  return (
    <section id="daya-tarik" aria-labelledby="judul-daya-tarik" className="relative border-b border-emas-soft/70 py-20 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Burung hias di kedua sisi judul */}
        <Image
          src="/images/burung.png"
          alt=""
          width={120}
          height={200}
          aria-hidden="true"
          className="pointer-events-none absolute left-8 top-0 hidden h-28 w-auto -scale-x-100 opacity-60 md:block lg:left-24"
        />
        <Image
          src="/images/burung.png"
          alt=""
          width={120}
          height={200}
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-0 hidden h-28 w-auto opacity-60 md:block lg:right-24"
        />

        <SectionHeading
          id="judul-daya-tarik"
          eyebrow={["Destinasi", "Wisata Budaya Unggulan"]}
          title="Daya Tarik Utama"
          subtitle="Nikmati keaslian tradisi Jawa, kuliner tempo doeloe, dan panorama pegunungan yang asri"
        />

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {destinasi.map((d) => (
            <article
              key={d.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-emas-soft bg-mori shadow-kartu transition duration-300 hover:-translate-y-1 md:max-lg:last:col-span-2 md:max-lg:last:grid md:max-lg:last:grid-cols-2"
            >
              <div className="relative md:max-lg:group-last:h-full">
                <MotifImage src={d.image} alt={d.title} motif={d.motif} className="aspect-[16/9] border-b-[3px] border-sogan-900 md:max-lg:group-last:aspect-auto md:max-lg:group-last:h-full md:max-lg:group-last:min-h-64 md:max-lg:group-last:border-b-0 md:max-lg:group-last:border-r-[3px]" />
                <span className="absolute left-4 top-4 rounded-full bg-sogan-900/90 px-3 py-1 font-serif text-[0.7rem] font-semibold text-mori">
                  {d.category}
                </span>
                <CornerOrnament position="tr" className="text-mori/90" />
              </div>

              <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
                <h3 className="font-serif text-lg font-bold text-sogan-900 sm:text-xl">{d.title}</h3>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-tinta/85">{d.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Kata kunci">
                  {d.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-kunyit/40 bg-kunyit-soft/70 px-3 py-1 text-[0.7rem] font-semibold text-sogan-900"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="min-h-5 flex-1" aria-hidden="true" />
                <div className="flex items-center justify-between gap-3 border-t border-dashed border-emas pt-4">
                  <span className="text-xs font-bold text-sogan-900">{d.schedule}</span>
                  <Link
                    href="/potensi"
                    className="rounded-full border-2 border-sogan-900/70 bg-kunyit px-4 py-2 text-xs font-semibold text-white shadow-tombol transition hover:bg-kunyit-600"
                  >
                    Detail Wisata
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
