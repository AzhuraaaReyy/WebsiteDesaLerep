import type { Metadata } from "next";
import { Section } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { modulePages } from "@/data/site";
import { DirektoriLokasi } from "@/features/map/DirektoriLokasi";
import { PetaDesaInteraktif } from "@/features/map/PetaDesaInteraktif";

const page = modulePages.peta;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function PetaPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />

      <Section
        id="peta-interaktif"
        eyebrow={["Navigasi", "Peta Interaktif"]}
        title="Jelajahi Wilayah Desa Lerep"
        subtitle="Klik dusun atau lokasi untuk melihat informasinya, saring per kategori di legenda, dan ganti tampilan satelit, jalan, atau topografi."
        tone="tekstur"
      >
        <PetaDesaInteraktif />
      </Section>

      <Section id="fasilitas" eyebrow={["Direktori", "Lokasi Penting"]} title="Direktori Lokasi">
        <DirektoriLokasi />
      </Section>
    </>
  );
}
