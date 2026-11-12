"use client";

import { useState } from "react";
import { ArrowUpRight, Baby, Download, Eye, FileText, HeartHandshake, IdCard, ScrollText, type LucideIcon } from "lucide-react";
import { CardCorners } from "@/components/ornament/Ornaments";
import { gisa, type DokumenLayanan, type GisaIkon } from "@/data/gisa";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { PenampilDokumen } from "./PenampilDokumen";

const IKON: Record<GisaIkon, LucideIcon> = {
  ahliWaris: ScrollText,
  nikah: HeartHandshake,
  penduduk: IdCard,
  kelahiran: Baby,
  kematian: FileText,
};

/** Kartu layanan GisaLerep berisi dokumen yang bisa dilihat dan diunduh. */
export function DaftarLayanan() {
  const [aktif, setAktif] = useState<DokumenLayanan | null>(null);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Dokumen persyaratan layanan administrasi">
        {gisa.layanan.map((l, i) => {
          const Ikon = IKON[l.ikon];
          const banyak = l.dokumen.length > 1;
          return (
            <li
              key={l.id}
              className={cn(
                "group/kartu relative isolate flex flex-col overflow-hidden rounded-2xl border-2 border-jingga/40 bg-[linear-gradient(160deg,#fffaf3_0%,#ffeedb_100%)] p-5 text-ornamen sm:p-6",
                "shadow-[0_14px_34px_-22px_rgb(86_47_0/0.7)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-jingga hover:shadow-[0_22px_44px_-22px_rgb(255_150_68/0.95)]",
                "animate-in fade-in slide-in-from-bottom-6 duration-700 [animation-fill-mode:both]",
                banyak && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
              )}
              style={{ animationDelay: `${150 + i * 90}ms` }}
            >
              <CardCorners />
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ornamen text-jingga-muda transition-[background-color,color,rotate,scale] duration-300 group-hover/kartu:-rotate-6 group-hover/kartu:scale-110 group-hover/kartu:bg-jingga group-hover/kartu:text-ornamen">
                  <Ikon className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h4 className="font-serif text-lg font-bold leading-snug">{l.judul}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ornamen/80">{l.isi}</p>
                </div>
              </div>

              <ul className={cn("mt-5 grid gap-2.5", banyak && "sm:grid-cols-3 lg:grid-cols-1")}>
                {l.dokumen.map((d) => (
                  <li key={d.id} className="flex items-stretch gap-2">
                    <button
                      type="button"
                      onClick={() => setAktif(d)}
                      className="group/dok flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl border-2 border-ornamen/10 bg-white/80 px-3 py-2.5 text-left transition-[border-color,background-color,translate] duration-200 hover:translate-x-0.5 hover:border-jingga hover:bg-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-jingga-muda text-ornamen transition-colors group-hover/dok:bg-jingga">
                        <Eye className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold leading-snug">{banyak ? d.judul : `Lihat ${d.jenis.toLowerCase()}`}</span>
                        <span className="mt-0.5 block text-xs text-ornamen/60">
                          PDF · {d.halaman} hlm · {d.ukuranPdf}
                          {d.versi === "asli" && <span className="ml-1.5 rounded-full bg-mori-3 px-1.5 py-px font-semibold text-ornamen/75">Asli</span>}
                        </span>
                      </span>
                    </button>
                    <a
                      href={asset(d.pdf)}
                      download={`${d.judul} - Desa Lerep.pdf`}
                      className="grid w-11 shrink-0 place-items-center rounded-xl border-2 border-ornamen/10 bg-white/80 text-ornamen transition-[border-color,background-color] hover:border-jingga hover:bg-jingga-muda focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70"
                      aria-label={`Unduh ${d.judul} (PDF, ${d.ukuranPdf})`}
                      title="Unduh PDF"
                    >
                      <Download className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <span className="min-h-4 flex-1" aria-hidden="true" />
              <a
                href={l.drive}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 self-start rounded-md text-xs font-semibold text-kunyit-700 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70"
              >
                Folder Google Drive GisaLerep
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only">(membuka tab baru)</span>
              </a>
            </li>
          );
        })}
      </ul>

      <PenampilDokumen dokumen={aktif} onClose={() => setAktif(null)} />
    </>
  );
}
