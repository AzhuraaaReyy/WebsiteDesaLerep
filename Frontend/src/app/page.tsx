import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TombolWhatsApp } from "@/components/layout/TombolWhatsApp";
import { HeroSection } from "@/components/home/HeroSection";
import { InfoDesaSection } from "@/components/home/InfoDesaSection";
import { DayaTarikSection } from "@/components/home/DayaTarikSection";
import { PetaWilayahSection } from "@/components/home/PetaWilayahSection";
import { BeritaSection } from "@/components/home/BeritaSection";
import { StrukturSection } from "@/components/home/StrukturSection";

export default function HomePage() {
  return (
    <>
      <a
        href="#konten"
        className="sr-only z-[60] rounded-full bg-sogan-900 px-4 py-2 text-mori focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Lewati ke konten
      </a>
      <SiteHeader />
      <main id="konten">
        <HeroSection />
        <InfoDesaSection />
        <DayaTarikSection />
        <PetaWilayahSection />
        <BeritaSection />
        <StrukturSection />
      </main>
      <SiteFooter />
      <TombolWhatsApp />
    </>
  );
}
