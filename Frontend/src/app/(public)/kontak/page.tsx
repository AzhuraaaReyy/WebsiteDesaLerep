import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { CornerOrnament } from "@/components/ornament/Ornaments";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/data/site";
import { CONTENT_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Alamat, nomor telepon, WhatsApp, email, dan jam pelayanan Pemerintah Desa Lerep.",
};

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kantor+Desa+Lerep+Ungaran+Barat+Kabupaten+Semarang";

export default function KontakPage() {
  const items = [
    { icon: MapPin, label: "Alamat Kantor Desa", value: siteConfig.address },
    { icon: Phone, label: "Telepon", value: `${siteConfig.phone} (${siteConfig.phoneNote})`, href: siteConfig.whatsapp },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Clock, label: "Jam Pelayanan", value: siteConfig.hours },
  ];
  return (
    <>
      <PageHero
        eyebrow="Kontak Resmi"
        title="Hubungi Kami"
        description="Kanal resmi Pemerintah Desa Lerep untuk informasi, pelayanan, pengaduan, dan aspirasi masyarakat."
      />
      <div className={cn(CONTENT_CONTAINER, "grid gap-6 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]")}>
        <section aria-labelledby="judul-kontak" className="relative rounded-2xl border border-emas-soft bg-mori p-6 shadow-kartu sm:p-8">
          <CornerOrnament position="tr" />
          <h2 id="judul-kontak" className="font-serif text-2xl font-bold text-sogan-900">
            Sekretariat Desa
          </h2>
          <ul className="mt-6 space-y-5">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sogan-900 text-mori">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-kunyit-600">{label}</span>
                  {href ? (
                    <a href={href} className="mt-0.5 block text-sm text-sogan-900 hover:text-kunyit-600 sm:text-base">
                      {value}
                    </a>
                  ) : (
                    <span className="mt-0.5 block text-sm text-sogan-900 sm:text-base">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-xl border border-dashed border-emas bg-mori-2 px-4 py-3 text-xs text-tinta/80">
            Data kontak di atas masih contoh dari mockup — ganti dengan kontak resmi dari Pemerintah Desa sebelum website
            dipublikasikan.
          </p>
        </section>

        <aside className="flex flex-col gap-4">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border-2 border-sogan-900/70 bg-kunyit p-5 text-white shadow-tombol transition hover:bg-kunyit-600"
          >
            <MessageCircle className="size-7 shrink-0" />
            <span>
              <span className="block font-serif text-lg font-bold">Chat WhatsApp</span>
              <span className="block text-sm text-white/90">Kontak resmi pelayanan desa</span>
            </span>
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-emas-soft bg-mori p-5 text-sogan-900 shadow-kartu transition hover:border-kunyit"
          >
            <Navigation className="size-7 shrink-0 text-kunyit-600" />
            <span>
              <span className="block font-serif text-lg font-bold">Petunjuk Arah</span>
              <span className="block text-sm text-tinta/80">Buka lokasi kantor desa di Google Maps</span>
            </span>
          </a>
        </aside>
      </div>
    </>
  );
}
