import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Eyebrow, OrnamentDivider } from "@/components/ornament/Ornaments";
import { TextHighlighter } from "@/components/ui/text-highlighter";
import { HERO_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { HeroCarousel, type HeroSlide } from "@/components/home/HeroCarousel";

/** Foto banner — berganti otomatis tiap 5 detik. Tambah/ubah urutan di sini. */
const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero-gapura.jpg",
    alt: "Gapura bambu bertuliskan Desa Wisata Lerep",
    caption: "Gapura Desa Wisata",
    position: "object-[78%_center] lg:object-[88%_center]",
  },
  {
    src: "/images/hero-kuliner.jpg",
    alt: "Rumah joglo di kawasan Wisata Kuliner berlatar hutan lereng Ungaran",
    caption: "Wisata Kuliner",
    position: "object-[62%_center] lg:object-[70%_center]",
  },
  {
    src: "/images/hero-budaya.jpg",
    alt: "Warga berpakaian adat Jawa bergembira bersama kerbau di sawah",
    caption: "Tradisi Warga",
    position: "object-[55%_center] lg:object-[65%_center]",
  },
];

export function HeroSection() {
  return (
    <section aria-labelledby="judul-hero" className="relative isolate overflow-hidden bg-mori-2">
      {/* Panel kanan: foto banner bergeser otomatis */}
      <HeroCarousel slides={HERO_SLIDES} interval={5000} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-mori via-mori/95 to-mori/75 lg:via-mori/80 lg:via-40% lg:to-mori/0" />
      <div
        className="absolute inset-y-0 left-0 -z-10 w-full opacity-[0.07] [mask-image:linear-gradient(to_right,black_45%,transparent)] lg:w-3/5"
        style={{ backgroundImage: `url(${asset("/images/batik.jpg")})`, backgroundSize: "420px" }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative grid items-center gap-10 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:min-h-[34rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:py-24 2xl:min-h-[38rem]",
          HERO_CONTAINER,
        )}
      >
        <div className="relative z-10 max-w-xl 2xl:max-w-2xl">
          <Eyebrow lines={["Jelajahi"]} align="left" />
          <h1 id="judul-hero" className="mt-4 font-serif font-bold leading-[1.02] text-sogan-900">
            <span className="block text-[2.6rem] min-[400px]:text-5xl sm:text-6xl xl:text-[4.25rem]">KEINDAHAN</span>
            <span className="block text-[2.6rem] min-[400px]:text-5xl sm:text-6xl xl:text-[4.25rem]">
              <span className="font-medium italic text-kunyit">&amp;</span> BUDAYA
            </span>
            <TextHighlighter
              as="span"
              className="mt-4 inline-block"
              triggerType="inView"
              direction="ltr"
              rounded="rounded-md"
              transition={{ type: "spring", duration: 1.1, delay: 0.35 }}
              highlightColor="linear-gradient(100deg, var(--color-kunyit) 0%, #f6a85a 55%, var(--color-kunyit-soft) 100%)"
              useInViewOptions={{ once: true, initial: false, amount: 0.3 }}
            >
              <span className="block px-2 py-1 text-[1.35rem] tracking-[0.04em] text-sogan-900 min-[400px]:text-2xl sm:text-3xl sm:tracking-[0.06em] xl:text-[2.1rem]">
                DESA WISATA LEREP
              </span>
            </TextHighlighter>
          </h1>
          <OrnamentDivider align="left" className="mt-5 w-64" />
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-tinta sm:text-base">
            Nikmati harmoni sejuknya alam lereng Gunung Ungaran, kehangatan tradisi lokal Jawa, kuliner tempo doeloe
            Pasar Sadon, dan pesona kearifan budaya warga desa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#daya-tarik"
              className="inline-flex items-center gap-6 rounded-full border-2 border-sogan-900/80 bg-kunyit px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-tombol transition hover:bg-kunyit-600"
            >
              Jelajahi Sekarang
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#info-desa"
              className="inline-flex items-center gap-2 rounded-full border border-kunyit/60 bg-kunyit-soft/80 px-5 py-3 text-xs font-semibold text-sogan-900 transition hover:bg-kunyit-soft"
            >
              <Sparkles className="size-3.5" />
              Warisan Budaya Nusantara
            </Link>
          </div>
        </div>

        {/* Gunungan sebagai tokoh visual */}
        <div className="pointer-events-none relative hidden h-full lg:block" aria-hidden="true">
          <Image
            src="/images/gunungan.png"
            alt=""
            width={616}
            height={945}
            priority
            className="absolute left-[8%] top-1/2 h-[92%] w-auto xl:left-[-14%] xl:h-[112%] -translate-y-1/2 opacity-60 drop-shadow-[0_20px_40px_rgba(54,32,13,0.45)]"
          />
        </div>
      </div>

      {/* Gunungan transparan sebagai watermark di layar kecil */}
      <Image
        src="/images/gunungan.png"
        alt=""
        width={616}
        height={945}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-[85%] w-auto opacity-15 lg:hidden"
      />
    </section>
  );
}
