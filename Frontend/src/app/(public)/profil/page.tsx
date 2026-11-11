import type { Metadata } from "next";
import { Compass, MapPin, Target } from "lucide-react";
import { CornerOrnament } from "@/components/ornament/Ornaments";
import { CARD, DummyNotice, OrnateCard, Section, StatTile } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { sejarah, visiMisi, wilayah } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { OrgChart } from "@/features/village/OrgChart";
import { cn } from "@/lib/utils";

const page = modulePages.profil;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function ProfilPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section id="sejarah" eyebrow={["Prasasti", "& Asal-usul"]} title="Sejarah Desa Lerep" tone="tekstur">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <OrnateCard>
            <p className="font-serif text-lg leading-relaxed text-sogan-900">{sejarah.ringkas}</p>
          </OrnateCard>
          <ol className="relative space-y-6 border-l-2 border-emas pl-8">
            {sejarah.linimasa.map((l) => (
              <li key={l.tahun} className="relative">
                <span className="absolute -left-[2.6rem] top-1 grid size-5 place-items-center rounded-full bg-kunyit ring-4 ring-mori" aria-hidden="true" />
                <p className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-kunyit-600">{l.tahun}</p>
                <h3 className="mt-1 font-serif text-lg font-bold text-sogan-900">{l.judul}</h3>
                <p className="mt-1 text-sm leading-relaxed text-tinta/85">{l.isi}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="visi-misi" eyebrow={["Arah", "Pembangunan Desa"]} title="Visi & Misi">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className={cn(CARD, "bg-sogan-900 p-7 text-mori")}>
            <CornerOrnament position="tl" className="text-kunyit-soft" />
            <CornerOrnament position="br" className="text-kunyit-soft" />
            <Target className="size-8 text-kunyit" />
            <h3 className="mt-4 font-serif text-2xl font-bold">Visi</h3>
            <p className="mt-3 font-serif text-lg leading-relaxed text-mori/90">“{visiMisi.visi}”</p>
          </div>
          <OrnateCard>
            <div className="flex items-center gap-3">
              <Compass className="size-6 text-kunyit-600" />
              <h3 className="font-serif text-2xl font-bold text-sogan-900">Misi</h3>
            </div>
            <ol className="mt-5 space-y-4">
              {visiMisi.misi.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-kunyit-soft font-serif text-sm font-bold text-sogan-900">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed text-tinta">{m}</span>
                </li>
              ))}
            </ol>
          </OrnateCard>
        </div>
      </Section>

      <Section id="wilayah" eyebrow={["Geografis", "& Kewilayahan"]} title="Wilayah & Dusun" tone="tekstur">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {wilayah.fakta.map((f) => (
            <StatTile key={f.label} label={f.label} value={f.nilai} />
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <OrnateCard>
            <h3 className="font-serif text-xl font-bold text-sogan-900">Batas Wilayah</h3>
            <dl className="mt-4 divide-y divide-emas-soft">
              {wilayah.batas.map((b) => (
                <div key={b.arah} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <dt className="font-semibold text-kunyit-600">{b.arah}</dt>
                  <dd className="text-right text-sogan-900">{b.wilayah}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-tinta/70">Batas resmi mengikuti data yang diverifikasi pemerintah desa.</p>
          </OrnateCard>
          <div>
            <h3 className="mb-4 font-serif text-xl font-bold text-sogan-900">Daftar Dusun</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {wilayah.dusun.map((d) => (
                <li key={d.nama} className={cn(CARD, "flex items-start gap-3 p-4 hover:-translate-y-0.5 hover:border-emas")}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sogan-900 text-mori">
                    <MapPin className="size-4" />
                  </span>
                  <span>
                    <span className="block font-serif font-bold text-sogan-900">
                      Dusun {d.nama} <span className="font-sans text-xs font-medium text-kunyit-600">· {d.rw}</span>
                    </span>
                    <span className="block text-xs text-tinta/80">{d.ket}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="struktur"
        eyebrow={["Pengayom", "Masyarakat Desa"]}
        title="Struktur Organisasi Pemerintahan Desa"
        subtitle="Susunan lengkap Pemerintah Desa Lerep beserta Badan Permusyawaratan Desa (BPD) sebagai mitra."
      >
        <OrgChart />
      </Section>
    </>
  );
}
