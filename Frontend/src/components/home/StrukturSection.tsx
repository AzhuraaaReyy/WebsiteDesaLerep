import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CardCorners, SectionHeading } from "@/components/ornament/Ornaments";
import { aparatur } from "@/data/site";

function inisial(nama: string) {
  return nama
    .replace(/,.*$/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function StrukturSection() {
  return (
    <section id="struktur" aria-labelledby="judul-struktur" className="relative overflow-hidden py-20 sm:py-24">
      <Image
        src="/images/gunungan.png"
        alt=""
        width={616}
        height={945}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-10 hidden h-56 w-auto opacity-[0.12] md:block"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="judul-struktur"
          eyebrow={["Pengayom", "Masyarakat Desa"]}
          title="Struktur Organisasi Pemerintahan Desa"
          subtitle="Aparatur Desa yang berdedikasi melayani dengan amanah dan menjaga kearifan lokal"
        />

        <ul className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:mt-12 lg:grid-cols-4">
          {aparatur.map((a) => (
            <li
              key={a.name}
              className="group relative rounded-2xl border-2 border-sogan/70 bg-mori p-1.5 shadow-kartu transition duration-300 hover:-translate-y-1"
            >
              <div className="relative isolate overflow-hidden rounded-xl border border-emas-soft px-4 pb-7 pt-8 text-center sm:px-6">
                <CardCorners />
                <div className="mx-auto grid size-24 place-items-center sm:size-28 overflow-hidden rounded-full border-[3px] border-kunyit bg-mori-2 ring-4 ring-mori">
                  {a.photo ? (
                    <Image src={a.photo} alt={`Foto ${a.name}`} width={112} height={112} className="size-full object-cover" />
                  ) : (
                    <span className="font-serif text-3xl font-bold text-sogan/70" aria-hidden="true">
                      {inisial(a.name)}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-serif text-base font-bold text-sogan-900 sm:text-lg">{a.name}</h3>
                <p className="mt-2 inline-block rounded-full bg-sogan-900 px-4 py-1.5 text-[0.7rem] font-semibold text-mori">
                  {a.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            href="/profil#struktur"
            className="inline-flex items-center gap-2 rounded-full border-2 border-sogan-900/70 bg-kunyit px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-tombol transition hover:bg-kunyit-600"
          >
            Lihat Struktur Lengkap <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
