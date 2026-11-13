"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileText, Info, Maximize2, MoveHorizontal, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { DokumenLayanan } from "@/data/gisa";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

type Muat = "lebar" | "halaman";

/* Peramban dapat menampilkan PDF di dalam halaman? (desktop Chrome/Edge/Firefox/Safari = ya; HP umumnya tidak) */
const KUERI = "(min-width: 768px)";
const langganan = (cb: () => void) => {
  const mq = window.matchMedia(KUERI);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const bisaPdf = () => navigator.pdfViewerEnabled === true && window.matchMedia(KUERI).matches;

function HalamanGambar({ dokumen, muat }: { dokumen: DokumenLayanan; muat: Muat }) {
  return (
    <ol className={cn("mx-auto grid gap-5 p-3 sm:p-6", muat === "lebar" ? "max-w-4xl" : "justify-items-center")}>
      {dokumen.pratinjau.map((src, i) => (
        <li
          key={src}
          className={cn(
            "overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_-14px_rgb(86_47_0/0.55)] ring-1 ring-ornamen/10 animate-in fade-in slide-in-from-bottom-3 duration-500 [animation-fill-mode:both]",
            muat === "halaman" && "w-fit",
          )}
          style={{ animationDelay: `${80 + i * 80}ms` }}
        >
          <Image
            src={src}
            alt={`Halaman ${i + 1} dari ${dokumen.halaman} — ${dokumen.judul}`}
            width={1000}
            height={1414}
            sizes="(min-width: 1024px) 896px, 100vw"
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "block",
              muat === "lebar" ? "h-auto w-full" : "h-[calc(100dvh-15.5rem)] w-auto max-w-full object-contain",
            )}
          />
          {dokumen.halaman > 1 && (
            <p className="border-t border-ornamen/10 bg-mori-2/70 px-3 py-1.5 text-center text-xs font-semibold text-ornamen/70">
              Halaman {i + 1} dari {dokumen.halaman}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

function IsiPenampil({ dokumen, onClose }: { dokumen: DokumenLayanan; onClose: () => void }) {
  const modePdf = useSyncExternalStore(langganan, bisaPdf, () => false);
  const [muat, setMuat] = useState<Muat>("lebar");
  const pdf = asset(dokumen.pdf);

  return (
    <>
      {/* Kepala */}
      <header className="relative isolate flex items-center gap-3 overflow-hidden bg-ornamen px-4 pb-5 pt-3.5 text-mori sm:gap-4 sm:px-6">
        <div
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{ backgroundImage: `url(${asset("/images/batik.webp")})`, backgroundSize: "360px" }}
          aria-hidden="true"
        />
        <span className="hidden size-10 shrink-0 place-items-center rounded-xl bg-jingga text-ornamen sm:grid">
          <FileText className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="judul-dokumen" className="truncate font-serif text-base font-bold leading-snug sm:text-xl" title={dokumen.judul}>
            {dokumen.judul}
          </h2>
          <p id="meta-dokumen" className="truncate text-xs text-mori/75">
            {dokumen.jenis} · PDF · {dokumen.halaman} halaman · {dokumen.ukuranPdf}
            {dokumen.versi === "asli" ? " · dokumen asli" : ""}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 text-mori hover:bg-white/10" aria-label="Tutup penampil dokumen">
          <X aria-hidden="true" />
        </Button>
        <div className="pita-tumpal absolute inset-x-0 bottom-0 h-2.5" aria-hidden="true" />
      </header>

      {/* Bilah alat */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ornamen/10 bg-mori px-3 py-2.5 sm:px-6">
        <div className="inline-flex rounded-full border-2 border-ornamen/10 bg-white/70 p-0.5" role="group" aria-label="Ukuran tampilan">
          {(
            [
              { id: "lebar", label: "Pas lebar", ikon: MoveHorizontal },
              { id: "halaman", label: "Satu halaman penuh", ikon: Maximize2 },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMuat(m.id)}
              aria-pressed={muat === m.id}
              className={cn(
                "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                muat === m.id ? "bg-ornamen text-mori" : "text-ornamen/75 hover:bg-jingga-muda/60 hover:text-ornamen",
              )}
            >
              <m.ikon className="size-3.5" aria-hidden="true" />
              <span className={m.id === "halaman" ? "max-[380px]:sr-only" : undefined}>{m.label}</span>
            </button>
          ))}
        </div>
        <span className="flex-1" aria-hidden="true" />
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-9")}
          aria-label="Buka PDF di tab baru"
          title="Buka di tab baru"
        >
          <ExternalLink aria-hidden="true" />
        </a>
        {dokumen.unduhLain && (
          <a href={asset(dokumen.unduhLain.href)} download className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            <Download aria-hidden="true" /> {dokumen.unduhLain.label}
          </a>
        )}
        <a href={pdf} download={`${dokumen.judul} - Desa Lerep.pdf`} className={cn(buttonVariants({ size: "sm" }), "group")}>
          <Download className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" /> Unduh PDF
        </a>
      </div>

      {/* Dokumen: mengisi seluruh sisa tinggi dialog */}
      <div className="relative min-h-0 flex-1 bg-[#e9dcc8]">
        {modePdf ? (
          <iframe
            key={`${pdf}-${muat}`}
            src={`${pdf}#view=${muat === "lebar" ? "FitH" : "Fit"}&navpanes=0`}
            title={`Pratinjau ${dokumen.judul}`}
            className="absolute inset-0 size-full border-0 animate-in fade-in duration-500"
          />
        ) : (
          <div className="absolute inset-0 overflow-auto overscroll-contain">
            <HalamanGambar dokumen={dokumen} muat={muat} />
          </div>
        )}
      </div>

      {dokumen.keterangan && (
        <p className="flex items-start gap-2 border-t-2 border-ornamen/10 bg-mori px-4 py-2 text-xs leading-relaxed text-ornamen/80 sm:px-6">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {dokumen.keterangan}
        </p>
      )}
    </>
  );
}

/** Dialog penampil dokumen: PDF di desktop, gambar halaman di HP; dokumen mengisi tinggi penuh dialog. */
export function PenampilDokumen({ dokumen, onClose }: { dokumen: DokumenLayanan | null; onClose: () => void }) {
  return (
    <Dialog
      open={dokumen !== null}
      onClose={onClose}
      labelledBy="judul-dokumen"
      describedBy="meta-dokumen"
      className={cn(
        "h-[calc(100dvh-1.5rem)] max-h-none w-[min(calc(100%-1.5rem),72rem)] overflow-hidden open:flex open:flex-col",
        "max-sm:h-dvh max-sm:w-full max-sm:max-w-none max-sm:rounded-none max-sm:border-0",
      )}
    >
      {dokumen && <IsiPenampil key={dokumen.id} dokumen={dokumen} onClose={onClose} />}
    </Dialog>
  );
}
