import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow, OrnamenPembatas } from "@/components/ornament/Ornaments";
import { asset } from "@/lib/asset";
import { CONTENT_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

/**
 * Banner halaman dalam (bukan beranda).
 * Palet: jingga-muda #FFCE99 (latar), jingga #FF9644 (aksen), ornamen #562F00 (teks & garis).
 * Elemen pendukung (penjor, burung hong, surya, pita tumpal) bersifat dekoratif — aria-hidden.
 */
export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(100deg,var(--color-jingga-muda)_0%,#ffdcb6_52%,#ffc387_100%)]">
      {/* Tekstur batik tipis */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.07] mix-blend-multiply [mask-image:linear-gradient(to_right,black_0%,black_45%,transparent_80%)]"
        style={{ backgroundImage: `url(${asset("/images/batik.jpg")})`, backgroundSize: "1100px" }}
        aria-hidden="true"
      />

      <div className={cn(CONTENT_CONTAINER, "relative pb-14 pt-8 sm:pb-16 sm:pt-10 md:min-h-[21rem] lg:min-h-[23rem]")}>
        {/* Panggung ilustrasi kanan */}
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full md:right-2 md:w-[48%] lg:right-4 lg:w-[46%]" aria-hidden="true">
          {/* Surya: cahaya + cincin konsentris */}
          <div className="absolute right-[8%] top-1/2 hidden size-[22rem] -translate-y-[46%] rounded-full bg-jingga/45 blur-2xl md:block lg:size-[26rem]" />
          <div className="absolute right-[12%] top-1/2 hidden size-[17rem] -translate-y-[44%] rounded-full border-[3px] border-ornamen/15 bg-jingga/35 md:block lg:size-[20rem]" />
          <div className="absolute right-[12%] top-1/2 hidden size-[17rem] -translate-y-[44%] scale-[1.18] rounded-full border border-dashed border-ornamen/25 md:block lg:size-[20rem]" />

          {/* Penjor — berdiri dari pita tumpal, berayun pelan */}
          <Image
            src="/images/penjor.webp"
            alt=""
            width={464}
            height={830}
            loading="eager"
            sizes="(min-width: 1024px) 180px, 150px"
            className="absolute bottom-[19px] right-[6%] hidden h-[17rem] w-auto origin-bottom drop-shadow-[0_10px_18px_rgb(86_47_0/0.25)] motion-safe:animate-[berayun_7s_ease-in-out_infinite] md:block lg:right-[9%] lg:h-[19.5rem]"
          />

          {/* Burung hong — melayang menuju penjor */}
          <Image
            src="/images/burung-hong.webp"
            alt=""
            width={480}
            height={767}
            loading="eager"
            sizes="(min-width: 1024px) 176px, (min-width: 768px) 144px, 96px"
            className="absolute right-2 top-3 w-20 opacity-20 drop-shadow-[0_8px_14px_rgb(86_47_0/0.3)] motion-safe:animate-[melayang_8s_ease-in-out_infinite] md:right-[34%] md:top-[18%] md:w-32 md:opacity-100 lg:right-[36%] lg:w-40"
          />
        </div>

        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 rounded-full border border-ornamen/15 bg-white/35 px-3 py-1.5 text-xs font-medium text-ornamen/80 backdrop-blur-sm">
            <li>
              <Link href="/" className="rounded-sm hover:text-ornamen hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ornamen">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="font-semibold text-ornamen">
              {title}
            </li>
          </ol>
        </nav>

        <div className="mt-8 max-w-xl md:mt-10 lg:max-w-2xl">
          <Eyebrow lines={[eyebrow]} align="left" tone="ornamen" />
          {/* Lebar ornamen mengikuti lebar judul */}
          <div className="mt-3 w-fit max-w-full">
            <h1 className="font-serif text-4xl font-bold leading-[1.08] text-ornamen [text-wrap:balance] sm:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            <OrnamenPembatas motif="garis" tone="ornamen" align="left" className="mt-4 w-full min-w-48 sm:w-full" />
          </div>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-ornamen/85 sm:text-base">{description}</p>
        </div>
      </div>

      {/* Pita tumpal + garis tepi bawah */}
      <div className="absolute inset-x-0 bottom-0" aria-hidden="true">
        <div className="pita-tumpal h-3.5" />
        <div className="h-1 bg-jingga" />
        <div className="h-[3px] bg-ornamen" />
      </div>
    </section>
  );
}
