import Link from "next/link";
import { ArrowRight, BookOpen, Landmark, Mountain } from "lucide-react";
import { CardCorners, SectionHeading } from "@/components/ornament/Ornaments";
import { infoDesa } from "@/data/site";

const icons = { book: BookOpen, mountain: Mountain, landmark: Landmark };

export function InfoDesaSection() {
  return (
    <section id="info-desa" aria-labelledby="judul-info" className="tekstur-mori border-b border-emas-soft/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-info"
          eyebrow={["Prasasti", "& Kearifan Lokal"]}
          title="Info Desa"
          subtitle="Sekilas profil, sejarah luhur, dan potensi keunggulan Desa Wisata Lerep"
        />

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {infoDesa.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.title}
                className="group relative isolate overflow-hidden rounded-2xl border border-emas-soft bg-mori shadow-kartu transition duration-300 hover:-translate-y-1 hover:border-emas sm:max-lg:last:col-span-2"
              >
                <div className="pita-batik h-2" aria-hidden="true" />
                <CardCorners tl={{ className: "top-2" }} />
                <div className="px-6 pb-8 pt-10 sm:px-7">
                  <span className="grid size-12 place-items-center rounded-full bg-sogan-900 text-mori ring-4 ring-kunyit-soft/70 transition group-hover:bg-kunyit">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-bold text-sogan-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-tinta/85">{item.body}</p>
                  <Link
                    href={item.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-kunyit-600 hover:text-sogan"
                  >
                    {item.link.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
