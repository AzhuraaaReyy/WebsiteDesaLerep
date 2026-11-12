import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { CardCorners, SectionHeading } from "@/components/ornament/Ornaments";
import { CONTENT_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

/** Kelas kartu standar — sama dengan kartu di beranda. */
export const CARD =
  "relative isolate overflow-hidden rounded-2xl border border-emas-soft bg-mori shadow-kartu transition duration-300";

export function formatRupiah(n: number, compact = false) {
  if (compact) {
    if (n >= 1e9) return `Rp ${(n / 1e9).toLocaleString("id-ID", { maximumFractionDigits: 2 })} M`;
    if (n >= 1e6) return `Rp ${(n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 0 })} jt`;
  }
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export const formatAngka = (n: number) => n.toLocaleString("id-ID");

/** Penanda bahwa isi halaman masih data contoh. */
export function DummyNotice() {
  return (
    <div className="border-b border-kunyit/30 bg-kunyit-soft/45">
      <p className={cn(CONTENT_CONTAINER, "flex items-start gap-2.5 py-3 text-xs leading-relaxed text-sogan-900 sm:items-center sm:text-sm")}>
        <Info className="mt-0.5 size-4 shrink-0 text-kunyit-600 sm:mt-0" />
        <span>
          <strong className="font-semibold">Data contoh (dummy).</strong> Konten halaman ini untuk keperluan pengembangan
          tampilan dan akan diganti dengan data resmi Pemerintah Desa Lerep.
        </span>
      </p>
    </div>
  );
}

/** Seksi halaman dengan judul berornamen — pola yang sama dengan seksi beranda. */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "plain",
  children,
  className,
}: {
  id: string;
  eyebrow: string[];
  title: string;
  subtitle?: string;
  tone?: "plain" | "tekstur";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`judul-${id}`}
      className={cn("scroll-mt-24 border-b border-emas-soft/70 py-16 sm:py-20", tone === "tekstur" && "tekstur-mori", className)}
    >
      <div className={CONTENT_CONTAINER}>
        <SectionHeading id={`judul-${id}`} eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

/** Kartu ringkas berisi satu angka utama. */
export function StatTile({ label, value, note, accent = false }: { label: string; value: string; note?: string; accent?: boolean }) {
  return (
    <div className={cn(CARD, "px-5 pb-5 pt-6")}>
      <div className={cn("absolute inset-x-0 top-0 h-1.5", accent ? "bg-kunyit" : "pita-batik")} aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-wider text-kunyit-600">{label}</p>
      <p className="mt-2 font-serif text-2xl font-bold text-sogan-900 sm:text-3xl">{value}</p>
      {note && <p className="mt-1 text-xs text-tinta/70">{note}</p>}
    </div>
  );
}

/** Kartu konten bergaya beranda dengan pita batik & ornamen sudut. */
export function OrnateCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(CARD, className)}>
      <div className="pita-batik h-2" aria-hidden="true" />
      <CardCorners tl={{ className: "top-2" }} />
      <div className="px-6 pb-7 pt-6">{children}</div>
    </div>
  );
}

/**
 * Grafik batang horizontal satu seri (besaran). Satu warna, nilai tertulis di ujung
 * batang, tooltip saat hover/fokus, dan tabel data tersedia untuk pembaca layar.
 */
export function BarList({
  title,
  data,
  unit = "",
  format = formatAngka,
}: {
  title: string;
  data: { label: string; nilai: number }[];
  unit?: string;
  format?: (n: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.nilai));
  const total = data.reduce((a, d) => a + d.nilai, 0);
  return (
    <figure className={cn(CARD, "p-5 sm:p-6")}>
      <figcaption className="font-serif text-lg font-bold text-sogan-900">{title}</figcaption>
      <ul className="mt-5 space-y-3">
        {data.map((d) => {
          const pct = (d.nilai / total) * 100;
          return (
            <li key={d.label} className="group relative grid grid-cols-[minmax(6.5rem,9rem)_1fr] items-center gap-3 text-sm" tabIndex={0}>
              <span className="truncate text-tinta">{d.label}</span>
              <span className="flex items-center gap-2">
                <span className="h-3 flex-1 rounded-r-[4px] bg-mori-3/40">
                  <span
                    className="block h-full rounded-r-[4px] bg-grafik-2 transition-opacity group-hover:opacity-80"
                    style={{ width: `${(d.nilai / max) * 100}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right text-xs font-semibold tabular-nums text-sogan-900">{format(d.nilai)}</span>
              </span>
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-[9.5rem] z-10 hidden rounded-lg bg-sogan-900 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-mori shadow-lg group-hover:block group-focus:block"
              >
                {d.label}: {format(d.nilai)} {unit} · {pct.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%
              </span>
            </li>
          );
        })}
      </ul>
      <details className="mt-5 text-sm">
        <summary className="cursor-pointer text-xs font-semibold text-kunyit-600 hover:text-sogan">Lihat tabel data</summary>
        <table className="mt-3 w-full text-left text-xs">
          <thead className="text-tinta/70">
            <tr>
              <th className="py-1.5 font-semibold">Kategori</th>
              <th className="py-1.5 text-right font-semibold">Jumlah</th>
              <th className="py-1.5 text-right font-semibold">%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emas-soft">
            {data.map((d) => (
              <tr key={d.label}>
                <td className="py-1.5">{d.label}</td>
                <td className="py-1.5 text-right tabular-nums">{format(d.nilai)}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {((d.nilai / total) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/** Dua seri (anggaran vs realisasi) per kategori — legenda + label nilai langsung. */
export function GroupedBars({
  title,
  data,
}: {
  title: string;
  data: { label: string; anggaran: number; realisasi: number }[];
}) {
  const max = Math.max(...data.map((d) => Math.max(d.anggaran, d.realisasi)));
  return (
    <figure className={cn(CARD, "p-5 sm:p-6")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <figcaption className="font-serif text-lg font-bold text-sogan-900">{title}</figcaption>
        <ul className="flex items-center gap-4 text-xs text-tinta" aria-label="Legenda">
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-grafik-1" /> Anggaran
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-grafik-2" /> Realisasi
          </li>
        </ul>
      </div>
      <ul className="mt-6 space-y-5">
        {data.map((d) => {
          const pct = Math.round((d.realisasi / d.anggaran) * 100);
          return (
            <li key={d.label} className="group" tabIndex={0}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-sogan-900">{d.label}</span>
                <span className="shrink-0 text-xs font-semibold text-tinta">{pct}% terealisasi</span>
              </div>
              <div className="mt-2 space-y-[2px]">
                {(["anggaran", "realisasi"] as const).map((k) => (
                  <div key={k} className="flex items-center gap-2">
                    <span className="h-2.5 flex-1">
                      <span
                        className={cn("block h-full rounded-r-[4px]", k === "anggaran" ? "bg-grafik-1" : "bg-grafik-2")}
                        style={{ width: `${(d[k] / max) * 100}%` }}
                        title={`${k === "anggaran" ? "Anggaran" : "Realisasi"}: ${formatRupiah(d[k])}`}
                      />
                    </span>
                    <span className="w-20 shrink-0 text-right text-[0.7rem] tabular-nums text-tinta">{formatRupiah(d[k], true)}</span>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <details className="mt-5 text-sm">
        <summary className="cursor-pointer text-xs font-semibold text-kunyit-600 hover:text-sogan">Lihat tabel data</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-xs">
            <thead className="text-tinta/70">
              <tr>
                <th className="py-1.5 font-semibold">Bidang</th>
                <th className="py-1.5 text-right font-semibold">Anggaran</th>
                <th className="py-1.5 text-right font-semibold">Realisasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emas-soft">
              {data.map((d) => (
                <tr key={d.label}>
                  <td className="py-1.5">{d.label}</td>
                  <td className="py-1.5 text-right tabular-nums">{formatRupiah(d.anggaran)}</td>
                  <td className="py-1.5 text-right tabular-nums">{formatRupiah(d.realisasi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

/** Nomor urut bulat bergaya tombol ikon beranda. */
export function StepNumber({ n }: { n: number }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sogan-900 font-serif text-base font-bold text-mori ring-4 ring-kunyit-soft/70">
      {n}
    </span>
  );
}
