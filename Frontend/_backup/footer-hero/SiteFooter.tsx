import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import { IkonFacebook, IkonInstagram, IkonWhatsApp, IkonYoutube, type IkonMerek } from "@/components/icons/brand";
import { footerLinks, siteConfig } from "@/data/site";

const IKON_SOSMED: Record<string, IkonMerek> = {
  Facebook: IkonFacebook,
  Instagram: IkonInstagram,
  YouTube: IkonYoutube,
  WhatsApp: IkonWhatsApp,
};

function KolomTautan({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="border-b border-emas/30 pb-3 font-serif text-lg font-bold text-kunyit">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-mori/85 transition hover:text-kunyit-soft">
              <ChevronRight className="size-3.5 text-kunyit transition-transform group-hover:translate-x-0.5" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="kontak" className="relative isolate overflow-hidden bg-sogan-900 text-mori">
      <div className="pita-batik h-3 border-y border-black/30" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-luminosity"
        style={{ backgroundImage: `url(${asset("/images/batik.jpg")})`, backgroundSize: "520px" }}
        aria-hidden="true"
      />
      <Image
        src="/images/gunungan.png"
        alt=""
        width={616}
        height={945}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-0 -z-10 h-80 w-auto opacity-[0.08] invert"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.25fr] lg:px-8">
        <div>
          <p className="font-serif text-2xl font-bold tracking-wide">DESA WISATA LEREP</p>
          <p className="mt-3 inline-block rounded border border-kunyit/70 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-kunyit-soft">
            Desa Wisata Berkelanjutan
          </p>
          <p className="mt-4 text-sm leading-relaxed text-mori/80">
            Destinasi desa wisata berbasis kebudayaan, agrowisata, dan kearifan lokal lereng Gunung Ungaran. Dikelola
            berkelanjutan oleh Pokdarwis Gerbang Lentera &amp; Pemerintah Desa Lerep.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-kunyit-soft">
            <Star className="size-4" /> Didukung: Program CSR PLN Peduli
          </p>
        </div>

        <KolomTautan {...footerLinks.wisata} />
        <KolomTautan {...footerLinks.layanan} />

        <div>
          <h2 className="border-b border-emas/30 pb-3 font-serif text-lg font-bold text-kunyit">Sekretariat Desa</h2>
          <address className="mt-4 space-y-3.5 text-sm not-italic text-mori/85">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-kunyit" />
              {siteConfig.address}
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-kunyit" />
              <a href={siteConfig.whatsapp} className="hover:text-kunyit-soft">
                {siteConfig.phone} <span className="text-mori/60">({siteConfig.phoneNote})</span>
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-kunyit" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-kunyit-soft">
                {siteConfig.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-kunyit" />
              {siteConfig.hours}
            </p>
          </address>
          <ul className="mt-6 flex gap-3" aria-label="Media sosial">
            {siteConfig.socials.map((s) => {
              const Ikon = IKON_SOSMED[s.name];
              return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-11 place-items-center rounded-full border-2 border-kunyit-soft/70 text-mori transition-[background-color,border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-kunyit hover:bg-kunyit focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-kunyit/70"
                >
                  {Ikon ? <Ikon className="size-[1.15rem]" aria-hidden="true" /> : <span className="text-xs font-bold">{s.label}</span>}
                </a>
              </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-emas/25">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-mori/70 sm:px-6 md:flex-row md:items-center md:justify-between pb-24 sm:pb-28 md:pb-24 lg:px-8">
          <p>
            © {year} Pemerintah Desa Wisata Lerep &amp; Pokdarwis Gerbang Lentera. Seluruh Hak Cipta Dilindungi
            Undang-Undang.
          </p>
          <p className="font-semibold text-kunyit-soft">Harmoni Alam • Warisan Tradisi • Kearifan Budaya Jawa</p>
        </div>
      </div>
      <div className="pita-batik h-2" aria-hidden="true" />
    </footer>
  );
}
