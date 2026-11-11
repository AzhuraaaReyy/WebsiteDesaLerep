import { CornerOrnament } from "@/components/ornament/Ornaments";
import type { Pejabat } from "@/data/dummy";
import { struktur } from "@/data/dummy";
import { cn } from "@/lib/utils";

function inisial(nama: string) {
  return nama
    .replace(/^H\.\s*/, "")
    .replace(/,.*$/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Kartu pejabat — gaya sama dengan kartu aparatur di beranda. */
function KartuPejabat({ p, size = "md", tone = "default" }: { p: Pejabat; size?: "lg" | "md" | "sm"; tone?: "default" | "bpd" }) {
  const avatar = { lg: "size-24 text-3xl", md: "size-16 text-xl", sm: "size-12 text-base" }[size];
  return (
    <div
      className={cn(
        "relative h-full rounded-2xl border-2 bg-mori p-1.5 shadow-kartu transition duration-300 hover:-translate-y-1",
        tone === "bpd" ? "border-tosca/50" : "border-sogan/70",
      )}
    >
      <div
        className={cn(
          "relative flex h-full flex-col items-center rounded-xl border border-emas-soft text-center",
          size === "lg" ? "px-6 pb-6 pt-7" : size === "md" ? "px-4 pb-5 pt-5" : "px-3 pb-4 pt-4",
        )}
      >
        {size !== "sm" && <CornerOrnament position="tl" className="size-6" />}
        {size !== "sm" && <CornerOrnament position="br" className="size-6" />}
        <div
          className={cn(
            "grid shrink-0 place-items-center overflow-hidden rounded-full border-[3px] bg-mori-2 font-serif font-bold text-sogan/70 ring-4 ring-mori",
            tone === "bpd" ? "border-tosca" : "border-kunyit",
            avatar,
          )}
          aria-hidden="true"
        >
          {inisial(p.nama)}
        </div>
        <p className={cn("mt-3 font-serif font-bold text-sogan-900", size === "lg" ? "text-lg" : "text-sm sm:text-[0.95rem]")}>
          {p.nama}
        </p>
        <p
          className={cn(
            "mt-1.5 max-w-full rounded-2xl px-2.5 py-1 text-[0.66rem] font-semibold leading-tight break-words text-mori sm:px-3",
            tone === "bpd" ? "bg-tosca" : "bg-sogan-900",
          )}
        >
          {p.jabatan}
          {p.unit && ` ${p.unit}`}
        </p>
      </div>
    </div>
  );
}

/** Garis penghubung vertikal antar tingkat bagan. */
function Konektor({ className }: { className?: string }) {
  return <div className={cn("mx-auto h-8 w-0.5 bg-emas", className)} aria-hidden="true" />;
}

function JudulKelompok({ children }: { children: string }) {
  return (
    <p className="mb-4 text-center font-serif text-xs font-semibold uppercase tracking-[0.25em] text-kunyit-600">{children}</p>
  );
}

/**
 * Bagan Struktur Organisasi Pemerintah Desa (SOTK).
 * Desktop: bagan berjenjang dengan garis penghubung. HP: kelompok bertumpuk.
 */
export function OrgChart() {
  const { kepalaDesa, bpd, sekretaris, kaur, kasi, kadus } = struktur;
  return (
    <div>
      {/* Tingkat 1: Kepala Desa (+ BPD sebagai mitra) */}
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div className="hidden lg:block" />
        <div className="mx-auto w-full max-w-xs">
          <KartuPejabat p={kepalaDesa} size="lg" />
        </div>
        <div className="relative">
          {/* garis koordinasi putus-putus ke BPD */}
          <div className="absolute -left-6 top-1/2 hidden w-6 border-t-2 border-dashed border-tosca/60 lg:block" aria-hidden="true" />
          <div className="rounded-2xl border border-dashed border-tosca/50 bg-tosca/5 p-4">
            <JudulKelompok>Badan Permusyawaratan Desa</JudulKelompok>
            <div className="grid grid-cols-2 gap-2 min-[440px]:grid-cols-3">
              {bpd.map((p) => (
                <KartuPejabat key={p.nama} p={p} size="sm" tone="bpd" />
              ))}
            </div>
            <p className="mt-3 text-center text-[0.7rem] text-tinta/70">Garis koordinasi — mitra pemerintah desa</p>
          </div>
        </div>
      </div>

      <Konektor />

      {/* Tingkat 2: Sekretaris Desa */}
      <div className="mx-auto w-full max-w-[15rem]">
        <KartuPejabat p={sekretaris} />
      </div>

      {/* Tingkat 3: Kaur (di bawah Sekdes) & Kasi (pelaksana teknis) */}
      <Konektor />
      <div className="relative">
        <div className="absolute inset-x-[25%] top-0 hidden h-0.5 bg-emas md:block" aria-hidden="true" />
        <div className="grid gap-8 md:grid-cols-2 md:gap-6 md:pt-8">
          <div className="relative">
            <div className="absolute -top-8 left-1/2 hidden h-8 w-0.5 bg-emas md:block" aria-hidden="true" />
            <div className="rounded-2xl border border-emas-soft bg-mori-2/60 p-4">
              <JudulKelompok>Sekretariat · Kepala Urusan</JudulKelompok>
              <div className="grid grid-cols-2 gap-2 min-[440px]:grid-cols-3 sm:gap-3">
                {kaur.map((p) => (
                  <KartuPejabat key={p.nama} p={p} size="sm" />
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 left-1/2 hidden h-8 w-0.5 bg-emas md:block" aria-hidden="true" />
            <div className="rounded-2xl border border-emas-soft bg-mori-2/60 p-4">
              <JudulKelompok>Pelaksana Teknis · Kepala Seksi</JudulKelompok>
              <div className="grid grid-cols-2 gap-2 min-[440px]:grid-cols-3 sm:gap-3">
                {kasi.map((p) => (
                  <KartuPejabat key={p.nama} p={p} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tingkat 4: Pelaksana Kewilayahan */}
      <Konektor className="h-10" />
      <div className="rounded-2xl border border-emas-soft bg-mori-2/60 p-4 sm:p-5">
        <JudulKelompok>Pelaksana Kewilayahan · Kepala Dusun</JudulKelompok>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {kadus.map((p) => (
            <KartuPejabat key={p.unit} p={p} size="sm" />
          ))}
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-tinta/80" aria-label="Keterangan bagan">
        <li className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-emas" /> Garis komando
        </li>
        <li className="flex items-center gap-2">
          <span className="w-6 border-t-2 border-dashed border-tosca/60" /> Garis koordinasi
        </li>
      </ul>
    </div>
  );
}
