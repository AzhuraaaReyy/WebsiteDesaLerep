"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, Check, Lightbulb, Lock, Megaphone, ShieldCheck, Ticket, Users } from "lucide-react";
import { CardCorners } from "@/components/ornament/Ornaments";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { KONTEN } from "./content";
import { ParticipationForm } from "./ParticipationForm";
import type { Jenis } from "./schema";

/* Hash URL (#aspirasi / #form-pengaduan) dibaca tanpa setState di dalam effect. */
const langgananHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const jenisDariHash = (): Jenis | null => {
  const h = window.location.hash;
  return h === "#aspirasi" ? "aspirasi" : h === "#form-pengaduan" ? "pengaduan" : null;
};

const PILIHAN: {
  jenis: Jenis;
  ikon: typeof Megaphone;
  label: string;
  fitur: { ikon: typeof Megaphone; teks: string }[];
}[] = [
  {
    jenis: "pengaduan",
    ikon: Megaphone,
    label: "Ajukan Pengaduan",
    fitur: [
      { ikon: ShieldCheck, teks: "Identitas wajib" },
      { ikon: Lock, teks: "Privat" },
      { ikon: Ticket, teks: "Tiket + kode" },
    ],
  },
  {
    jenis: "aspirasi",
    ikon: Lightbulb,
    label: "Sampaikan Aspirasi",
    fitur: [
      { ikon: Users, teks: "Usulan warga" },
      { ikon: Check, teks: "Ditanggapi" },
      { ikon: Ticket, teks: "Tiket + kode" },
    ],
  },
];

/** Pilihan aksi Pengaduan / Aspirasi + formulir bertahap yang muncul di bawahnya. */
export function ParticipationHub() {
  const dariHash = useSyncExternalStore(langgananHash, jenisDariHash, () => null);
  const [pilihan, setPilihan] = useState<Jenis | null | undefined>(undefined);
  const jenis = pilihan === undefined ? dariHash : pilihan;
  const panelRef = useRef<HTMLDivElement>(null);
  const sudahGulir = useRef(false);

  useEffect(() => {
    if (!jenis || !sudahGulir.current) {
      sudahGulir.current = true;
      return;
    }
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({ behavior: kurangiGerak ? "auto" : "smooth", block: "start" });
  }, [jenis]);

  const pilih = (j: Jenis) => {
    sudahGulir.current = true;
    setPilihan(j);
    window.history.replaceState(null, "", j === "aspirasi" ? "#aspirasi" : "#form-pengaduan");
  };

  const tutup = () => {
    setPilihan(null);
    window.history.replaceState(null, "", "#pengaduan");
    document.getElementById("pengaduan")?.scrollIntoView({ block: "start" });
  };

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2" role="group" aria-label="Pilih jenis laporan">
        {PILIHAN.map((p, i) => {
          const k = KONTEN[p.jenis];
          const aktif = jenis === p.jenis;
          const gelap = p.jenis === "pengaduan";
          const Ikon = p.ikon;
          return (
            <button
              key={p.jenis}
              id={p.jenis === "aspirasi" ? "aspirasi" : undefined}
              type="button"
              onClick={() => pilih(p.jenis)}
              aria-expanded={aktif}
              aria-controls="panel-partisipasi"
              className={cn(
                "group relative isolate flex scroll-mt-28 flex-col overflow-hidden rounded-[1.6rem] border-2 p-6 text-left sm:p-7",
                "cursor-pointer transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jingga/60 focus-visible:ring-offset-4 focus-visible:ring-offset-mori",
                "animate-in fade-in slide-in-from-bottom-6 duration-700 [animation-fill-mode:both]",
                gelap
                  ? "border-ornamen bg-ornamen text-mori shadow-[0_22px_50px_-26px_rgb(86_47_0/0.9)]"
                  : "border-jingga/60 bg-[linear-gradient(150deg,#fff6ea_0%,var(--color-jingga-muda)_100%)] text-ornamen shadow-[0_22px_50px_-28px_rgb(255_150_68/0.95)]",
                aktif && "-translate-y-1.5 border-jingga ring-4 ring-jingga/45",
              )}
              style={{ animationDelay: `${i * 140}ms` }}
            >
              {/* Tekstur batik + cahaya */}
              <span
                className={cn("absolute inset-0 -z-10", gelap ? "opacity-[0.13] mix-blend-screen" : "opacity-[0.07] mix-blend-multiply")}
                style={{ backgroundImage: `url(${asset("/images/batik.jpg")})`, backgroundSize: "340px" }}
                aria-hidden="true"
              />
              <span
                className="absolute -right-16 -top-20 -z-10 size-60 rounded-full bg-jingga/30 blur-2xl transition-[scale,opacity] duration-500 group-hover:scale-125"
                aria-hidden="true"
              />
              <CardCorners tone={gelap ? "terang" : "emas"} />

              {aktif && (
                <span className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-jingga text-ornamen shadow-md animate-in zoom-in-0 spin-in-45 duration-300">
                  <Check className="size-5" strokeWidth={3} aria-hidden="true" />
                </span>
              )}

              <span
                className={cn(
                  "grid size-14 place-items-center rounded-2xl transition-[rotate,scale] duration-300 group-hover:-rotate-6 group-hover:scale-110",
                  gelap ? "bg-jingga text-ornamen" : "bg-ornamen text-jingga-muda",
                )}
              >
                <Ikon className="size-7 group-hover:motion-safe:animate-[ayun_0.9s_ease-in-out]" aria-hidden="true" />
              </span>

              <span className="mt-5 block font-serif text-2xl font-bold sm:text-[1.7rem]">{p.jenis === "pengaduan" ? "Pengaduan" : "Aspirasi"}</span>
              <span className={cn("mt-2 block text-sm leading-relaxed", gelap ? "text-mori/85" : "text-ornamen/85")}>{k.ringkas}</span>

              <span className="mt-5 flex flex-wrap gap-2">
                {p.fitur.map((f) => (
                  <span
                    key={f.teks}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                      gelap ? "bg-white/10 text-jingga-muda" : "bg-white/70 text-ornamen",
                    )}
                  >
                    <f.ikon className="size-3.5" aria-hidden="true" />
                    {f.teks}
                  </span>
                ))}
              </span>

              <span className="min-h-6 flex-1" aria-hidden="true" />
              <span
                className={cn(
                  "mt-6 inline-flex h-12 items-center gap-2 self-start rounded-full border-2 px-6 text-sm font-semibold transition-[background-color,gap] duration-300 group-hover:gap-3",
                  gelap ? "border-jingga bg-jingga text-ornamen" : "border-ornamen bg-ornamen text-mori",
                )}
              >
                {aktif ? "Formulir dibuka" : p.label}
                <ArrowRight className={cn("size-4 transition-transform duration-300", aktif ? "rotate-90" : "group-hover:translate-x-0.5")} aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>

      {jenis && (
        <div ref={panelRef} key={jenis} className="mt-10 scroll-mt-28 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <ParticipationForm jenis={jenis} onTutup={tutup} />
        </div>
      )}
    </div>
  );
}
