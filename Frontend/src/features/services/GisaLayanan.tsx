import { ArrowUpRight, Headset, MessageCircle, ShieldAlert } from "lucide-react";
import { CardCorners } from "@/components/ornament/Ornaments";
import { buttonVariants } from "@/components/ui/button";
import { gisa } from "@/data/gisa";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { DaftarLayanan } from "./DaftarLayanan";

/**
 * Layanan pengajuan administrasi GisaLerep: panel kontak admin + kartu dokumen persyaratan
 * yang dapat dilihat dan diunduh. Data dari src/data/gisa.ts.
 */
export function GisaLayanan() {
  return (
    <div className="grid gap-6">
      {/* Panel GisaLerep */}
      <div className="relative isolate overflow-hidden rounded-[1.75rem] border-2 border-ornamen bg-ornamen px-6 py-7 text-mori shadow-[0_24px_60px_-28px_rgb(86_47_0/0.8)] animate-in fade-in slide-in-from-bottom-4 duration-700 sm:px-9 sm:py-8">
        <div
          className="absolute inset-0 -z-10 opacity-[0.13] mix-blend-screen"
          style={{ backgroundImage: `url(${asset("/images/batik.webp")})`, backgroundSize: "380px" }}
          aria-hidden="true"
        />
        <div className="absolute -left-16 -top-24 -z-10 size-72 rounded-full bg-jingga/25 blur-3xl" aria-hidden="true" />
        <CardCorners tone="terang" size="lg" />

        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex items-start gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-jingga text-ornamen shadow-[0_10px_24px_-8px_rgb(255_150_68/0.9)] motion-safe:animate-[ayun_3.2s_ease-in-out_infinite]">
              <Headset className="size-7" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-jingga-muda">{gisa.deskripsi}</p>
              <h3 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">{gisa.nama}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-mori/85">
                Lihat dan unduh persyaratan resmi, siapkan berkas, lalu konsultasikan langsung dengan admin pelayanan desa melalui WhatsApp.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-jingga/60 bg-jingga/15 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.08em] text-jingga-muda">
                <ShieldAlert className="size-4" aria-hidden="true" />
                {gisa.slogan}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={gisa.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "group border-jingga")}
            >
              <MessageCircle className="transition-transform group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
              Chat Admin {gisa.telepon}
              <span className="sr-only">(membuka WhatsApp di tab baru)</span>
            </a>
            <a
              href={gisa.tanyaJawab}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group border-mori/30 bg-white/5 text-mori hover:border-jingga hover:bg-white/10")}
            >
              Tanya Jawab Admin
              <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only">(membuka WhatsApp di tab baru)</span>
            </a>
          </div>
        </div>
        <div className="pita-tumpal absolute inset-x-0 bottom-0 h-3" aria-hidden="true" />
      </div>

      {/* Kartu layanan + dokumen (lihat & unduh) */}
      <DaftarLayanan />

      <p className="text-center text-xs leading-relaxed text-ornamen/65">
        Dokumen persyaratan disusun ulang dari berkas GisaLerep tanpa mengubah isinya; format surat dan surat edaran
        ditampilkan sesuai aslinya. Tautan dari{" "}
        <a href={gisa.sumber} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 hover:text-ornamen">
          linktr.ee/GisaLerep
        </a>{" "}
        · diperiksa {gisa.diperiksa}.
      </p>
    </div>
  );
}
