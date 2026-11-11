"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { CARD } from "@/components/shared/Blocks";
import type { dokumen as DokumenData } from "@/data/dummy";
import { cn } from "@/lib/utils";

type Dokumen = (typeof DokumenData)[number];

/** Daftar dokumen publik dengan filter kategori, tahun, dan pencarian judul. */
export function DocumentList({ items }: { items: Dokumen[] }) {
  const [kategori, setKategori] = useState("Semua");
  const [tahun, setTahun] = useState("Semua");
  const [q, setQ] = useState("");
  const kategoriList = ["Semua", ...Array.from(new Set(items.map((d) => d.kategori)))];
  const tahunList = ["Semua", ...Array.from(new Set(items.map((d) => String(d.tahun)))).sort().reverse()];

  const hasil = useMemo(
    () =>
      items.filter(
        (d) =>
          (kategori === "Semua" || d.kategori === kategori) &&
          (tahun === "Semua" || String(d.tahun) === tahun) &&
          d.judul.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [items, kategori, tahun, q],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {kategoriList.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(k)}
              aria-pressed={kategori === k}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition",
                kategori === k ? "border-sogan-900 bg-sogan-900 text-mori" : "border-emas-soft bg-white text-sogan-900 hover:border-kunyit",
              )}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="filter-tahun">Tahun</label>
          <select
            id="filter-tahun"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="rounded-full border border-emas-soft bg-white px-4 py-2 text-xs font-semibold text-sogan-900 focus:border-kunyit focus:outline-none"
          >
            {tahunList.map((t) => (
              <option key={t} value={t}>
                {t === "Semua" ? "Semua tahun" : t}
              </option>
            ))}
          </select>
          <div className="relative flex-1 lg:w-64 lg:flex-none">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tinta/50" />
            <label className="sr-only" htmlFor="cari-dokumen">Cari dokumen</label>
            <input
              id="cari-dokumen"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari judul dokumen…"
              className="w-full rounded-full border border-emas-soft bg-white py-2 pl-9 pr-4 text-sm text-sogan-900 placeholder:text-tinta/50 focus:border-kunyit focus:outline-none"
            />
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-tinta/70" aria-live="polite">
        Menampilkan {hasil.length} dari {items.length} dokumen
      </p>

      {hasil.length === 0 ? (
        <div className={cn(CARD, "mt-3 p-10 text-center")}>
          <FileText className="mx-auto size-8 text-emas" />
          <p className="mt-3 font-serif text-lg font-bold text-sogan-900">Dokumen tidak ditemukan</p>
          <p className="mt-1 text-sm text-tinta/70">Coba ubah kata kunci atau filter.</p>
        </div>
      ) : (
        <ul className="mt-3 grid gap-3">
          {hasil.map((d) => (
            <li key={d.judul} className={cn(CARD, "flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5 hover:border-emas")}>
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sogan-900 text-mori">
                <FileText className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-base font-bold text-sogan-900 sm:text-lg">{d.judul}</span>
                <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-tinta/75">
                  <span className="rounded-full bg-kunyit-soft/70 px-2 py-0.5 font-semibold text-sogan-900">{d.kategori}</span>
                  <span>Tahun {d.tahun}</span>
                  <span>PDF · {d.ukuran}</span>
                  <span>Terbit {d.tanggal}</span>
                </span>
              </span>
              <button
                type="button"
                disabled
                title="Unduhan aktif setelah dokumen resmi diunggah"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-sogan-900/70 bg-kunyit px-4 py-2 text-xs font-semibold text-white shadow-tombol disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="size-4" /> Unduh
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
