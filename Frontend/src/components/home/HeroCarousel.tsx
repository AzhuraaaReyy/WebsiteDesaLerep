"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  src: string;
  alt: string;
  caption: string;
  /** kelas object-position Tailwind, mis. "object-[78%_center]" */
  position?: string;
};

/* Di layar lebar indikator dipindah ke bawah gunungan (#hero-titik) agar simetris. */
const KUERI_LEBAR = "(min-width: 1024px)";

/**
 * Latar foto hero yang berganti otomatis (crossfade + efek zoom pelan),
 * lengkap dengan indikator titik yang bisa diklik.
 */
export function HeroCarousel({ slides, interval = 5000 }: { slides: HeroSlide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovered || hidden;
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  // Cari wadah indikator setelah DOM siap; ikuti perubahan lebar layar.
  useEffect(() => {
    const mq = window.matchMedia(KUERI_LEBAR);
    const atur = () => setSlot(mq.matches ? document.getElementById("hero-titik") : null);
    const raf = window.requestAnimationFrame(atur);
    mq.addEventListener("change", atur);
    return () => {
      window.cancelAnimationFrame(raf);
      mq.removeEventListener("change", atur);
    };
  }, []);

  const goTo = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  // Ganti slide setiap `interval` ms; timer di-reset tiap kali slide berganti (termasuk saat diklik).
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setTimeout(() => goTo(index + 1), interval);
    return () => window.clearTimeout(id);
  }, [index, paused, interval, slides.length, goTo]);

  // Hentikan saat tab tidak terlihat agar tidak "lompat" ketika kembali.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const titik = (
    <div
      className="flex items-center gap-3 animate-in fade-in zoom-in-95 duration-700"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-ornamen/60" aria-hidden="true" />
      <span className="size-1.5 rotate-45 bg-ornamen/70" aria-hidden="true" />
      <div className="flex items-center rounded-full border border-mori/30 bg-sogan-900/60 px-2 py-1 shadow-[0_8px_20px_-8px_rgb(54_32_13/0.7)] backdrop-blur-sm">
        <ul className="flex items-center gap-1.5" aria-label="Pilih foto banner">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <li key={s.src}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1}: ${s.caption}`}
                  aria-current={active}
                  className="group grid h-6 cursor-pointer place-items-center px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jingga rounded-full"
                >
                  <span
                    className={cn(
                      "relative block h-2.5 overflow-hidden rounded-full transition-all duration-500",
                      active ? "w-8 bg-mori/35" : "w-2.5 bg-mori/60 group-hover:bg-mori",
                    )}
                  >
                    {active && (
                      <span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-kunyit"
                        style={{
                          animation: paused ? "none" : `hero-progress ${interval}ms linear forwards`,
                          width: paused ? "100%" : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <span className="size-1.5 rotate-45 bg-ornamen/70" aria-hidden="true" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-ornamen/60" aria-hidden="true" />
    </div>
  );

  return (
    <>
      {/* Panel foto */}
      <div
        className="absolute inset-y-0 right-0 -z-20 w-full [mask-image:linear-gradient(to_right,transparent,black_35%)] lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent_22%,black_65%)]"
        aria-live="off"
      >
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.src}
              className={cn("absolute inset-0 transition-opacity duration-[1200ms] ease-in-out", active ? "opacity-100" : "opacity-0")}
              aria-hidden={!active}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className={cn(
                  "object-cover transition-transform duration-[6000ms] ease-out motion-reduce:transition-none",
                  s.position ?? "object-center",
                  active ? "scale-100" : "scale-110",
                )}
              />
            </div>
          );
        })}
      </div>

      {/* Indikator titik: HP di tengah bawah banner, desktop tepat di bawah gunungan */}
      {slides.length > 1 &&
        (slot ? createPortal(titik, slot) : <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center lg:hidden">{titik}</div>)}
    </>
  );
}
