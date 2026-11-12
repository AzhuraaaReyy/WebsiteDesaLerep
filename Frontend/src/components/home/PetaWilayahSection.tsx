import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CardCorners, Eyebrow, OrnamenPembatas } from "@/components/ornament/Ornaments";
import { desaLerep, titikPeta } from "@/data/peta-lerep";
import { PetaRingkas } from "@/features/map/PetaRingkas";

const STATISTIK = [
  {
    value: `${desaLerep.luasHa.toLocaleString("id-ID")} ha`,
    label: "Luas wilayah desa (RPJM Desa)",
  },
  {
    value: `${desaLerep.jumlahDusun} dusun · ${desaLerep.jumlahRw} RW`,
    label: "Wilayah administrasi",
  },
  {
    value: `${desaLerep.ketinggian.replace("-", "–")} mdpl`,
    label: "Ketinggian di lereng Gunung Ungaran",
  },
  {
    value: `${titikPeta.length} lokasi`,
    label: "Fasilitas umum, sekolah & wisata terpetakan",
  },
];

/** Seksi beranda: peta panduan wilayah dengan batas Desa Lerep yang interaktif. */
export function PetaWilayahSection() {
  return (
    <section id="peta-wilayah" aria-labelledby="judul-peta" className="border-b border-emas-soft/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] border-2 border-kunyit-soft bg-mori px-4 py-8 shadow-kartu sm:p-10 lg:p-12">
          <CardCorners size="lg" />

          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="px-2 sm:px-0">
              <Eyebrow lines={["Navigasi Wisata & Fasilitas"]} align="left" />
              <h2 id="judul-peta" className="mt-3 font-serif text-[1.75rem] font-bold leading-tight text-sogan-900 sm:text-4xl">
                Peta Panduan Wilayah Desa Wisata
              </h2>
              <OrnamenPembatas align="left" className="mt-3" />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-tinta/85 sm:text-[0.95rem]">
                Jelajahi wilayah Desa Lerep beserta kedelapan dusunnya. Klik wilayah dusun atau penanda untuk melihat informasi dan petunjuk
                arah.
              </p>
              <ul className="mt-7 space-y-4">
                {STATISTIK.map((s) => (
                  <li key={s.label} className="flex items-start gap-3.5">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-sogan-900 text-mori">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="leading-snug">
                      <span className="block text-sm font-bold text-sogan-900">{s.value}</span>
                      <span className="block text-sm font-semibold text-tinta">{s.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/peta"
                className="group mt-9 flex w-full items-center justify-center gap-2 rounded-full border-2 border-sogan-900/70 bg-kunyit px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-tombol transition hover:bg-kunyit-600 sm:max-w-md"
              >
                Buka Peta Desa Lengkap
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            <div className="min-w-0">
              <PetaRingkas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
