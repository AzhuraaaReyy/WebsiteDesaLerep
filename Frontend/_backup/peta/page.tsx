import type { Metadata } from "next";
import { Building2, Clock, MapPin } from "lucide-react";
import { PetaIlustrasi } from "@/components/home/PetaWilayahSection";
import { CARD, DummyNotice, OrnateCard, Section } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { fasilitas } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { cn } from "@/lib/utils";

const page = modulePages.peta;
export const metadata: Metadata = { title: page.title, description: page.description };

const gmaps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${q} Lerep Ungaran Barat`)}`;

export default function PetaPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section
        id="potensi"
        eyebrow={["Navigasi", "Wisata & Fasilitas"]}
        title="Peta Panduan Wilayah"
        subtitle="Peta ilustratif sementara. Versi interaktif Leaflet + OpenStreetMap akan memakai koordinat resmi dari admin."
        tone="tekstur"
      >
        <div className="mx-auto max-w-4xl">
          <OrnateCard>
            <PetaIlustrasi />
          </OrnateCard>
        </div>
      </Section>

      <Section id="fasilitas" eyebrow={["Direktori", "Fasilitas Umum"]} title="Fasilitas Umum">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitas.map((f) => (
            <li key={f.nama} className={cn(CARD, "flex flex-col p-5 hover:-translate-y-1")}>
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sogan-900 text-mori">
                  <Building2 className="size-4" />
                </span>
                <div>
                  <p className="font-serif text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-kunyit-600">{f.kategori}</p>
                  <h3 className="font-serif text-lg font-bold text-sogan-900">{f.nama}</h3>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-tinta/80">
                <MapPin className="size-3.5 text-kunyit-600" /> {f.alamat}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-tinta/80">
                <Clock className="size-3.5 text-kunyit-600" /> {f.jam}
              </p>
              <div className="min-h-4 flex-1" aria-hidden="true" />
              <a
                href={gmaps(f.nama)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex self-start rounded-full border-2 border-sogan-900/70 bg-kunyit px-4 py-2 text-xs font-semibold text-white shadow-tombol hover:bg-kunyit-600"
              >
                Petunjuk Arah
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
