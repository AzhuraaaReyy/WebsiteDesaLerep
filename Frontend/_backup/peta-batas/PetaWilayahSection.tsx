"use client";

import { useState } from "react";
import { Check, MapPin, Minus, Plus } from "lucide-react";
import { CardCorners, Eyebrow, OrnamenPembatas } from "@/components/ornament/Ornaments";
import { statistikPeta, titikPeta, type TitikPeta } from "@/data/site";
import { cn } from "@/lib/utils";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Desa+Lerep+Ungaran+Barat+Kabupaten+Semarang";

function labelWidth(text: string) {
  return text.length * 6.1 + 18;
}

function Penanda({ t, active, onSelect }: { t: TitikPeta; active: boolean; onSelect: (id: string) => void }) {
  const w = labelWidth(t.name);
  const ly = t.label === "bottom" ? t.y + 20 : t.y - 38;
  const lx = Math.min(Math.max(t.x - w / 2, 6), 700 - w - 6);
  const fill = t.kind === "wisata" ? "var(--color-kunyit)" : "var(--color-sogan-900)";
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${t.name}: ${t.note}`}
      aria-pressed={active}
      onClick={() => onSelect(t.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(t.id);
        }
      }}
      className="cursor-pointer outline-none [&:focus-visible_.cincin]:opacity-100"
    >
      <circle className={cn("cincin transition-opacity", active ? "opacity-100" : "opacity-0")} cx={t.x} cy={t.y} r={19} fill={fill} fillOpacity={0.2} />
      <circle cx={t.x} cy={t.y} r={12} fill={fill} stroke="#fff" strokeWidth={2.5} />
      <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff" fontFamily="var(--font-poppins)">
        {t.code}
      </text>
      <rect x={lx} y={ly} width={w} height={20} rx={10} fill="var(--color-sogan-900)" />
      <text x={lx + w / 2} y={ly + 13.5} textAnchor="middle" fontSize={10} fontWeight={600} fill="var(--color-mori)" fontFamily="var(--font-poppins)">
        {t.name}
      </text>
    </g>
  );
}

export function PetaIlustrasi() {
  const [zoom, setZoom] = useState(1);
  const [active, setActive] = useState<string>("pasar");
  const selected = titikPeta.find((t) => t.id === active);

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border-[3px] border-sogan-900 bg-mori shadow-kartu">
        <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
        <svg
          viewBox="0 0 700 460"
          className="block h-auto w-full min-w-[620px] sm:min-w-0"
          role="group"
          aria-label="Peta ilustratif wilayah Desa Lerep"
        >
          <g style={{ transform: `scale(${zoom})`, transformOrigin: "350px 230px", transition: "transform .4s ease" }}>
            <rect width="700" height="460" fill="#fdf8ee" />
            {/* Bukit & lahan */}
            <path d="M420 0h280v250c-60-30-110-10-150-60S470 60 420 0z" fill="#f1e5cc" />
            <path d="M0 360c80-40 170-20 250-60s140 10 210 40 150 30 240 10v110H0z" fill="#efe3cb" />
            <path d="M0 0h230c-20 60-90 80-130 140S40 220 0 230z" fill="#f6ecda" />
            {/* Garis kontur */}
            <g fill="none" stroke="#d9c4a0" strokeWidth="1" strokeDasharray="3 5" opacity=".9">
              <path d="M450 0c30 70 80 110 140 130s90 40 110 70" />
              <path d="M500 0c20 50 60 80 110 95s70 25 90 45" />
              <path d="M0 300c90-20 150 0 230-30s150-10 230 30" />
              <path d="M0 120c60-10 110-50 150-110" />
            </g>
            {/* Sungai */}
            <path d="M372 -10c-14 60 10 110-6 170s-30 110-24 170-12 100-20 140" fill="none" stroke="#8cc9bf" strokeWidth="9" strokeLinecap="round" />
            <path d="M372 -10c-14 60 10 110-6 170s-30 110-24 170-12 100-20 140" fill="none" stroke="var(--color-tosca)" strokeWidth="3" strokeLinecap="round" opacity=".7" />
            {/* Jalan desa: garis tebal krem + garis tipis cokelat */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {[
                "M140 352 L278 292 L430 175 L575 40",
                "M372 52 L430 175",
                "M192 176 L278 292",
                "M352 234 Q430 280 510 324 L640 412",
              ].map((d) => (
                <g key={d}>
                  <path d={d} stroke="#e7c9a0" strokeWidth="9" />
                  <path d={d} stroke="#fdf8ee" strokeWidth="5" />
                  <path d={d} stroke="var(--color-emas)" strokeWidth="1" strokeDasharray="6 5" />
                </g>
              ))}
            </g>
            {titikPeta.map((t) => (
              <Penanda key={t.id} t={t} active={t.id === active} onSelect={setActive} />
            ))}
          </g>

          {/* Kompas (tidak ikut zoom) */}
          <g transform="translate(46 46)" aria-hidden="true">
            <circle r="18" fill="#fff" stroke="var(--color-emas-soft)" strokeWidth="1.5" />
            <path d="M0 -13 L5 0 L0 13 L-5 0z" fill="var(--color-sogan-900)" />
            <path d="M0 -13 L5 0 L-5 0z" fill="var(--color-kunyit)" />
            <text y="-21" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-sogan-900)">U</text>
          </g>

          {/* Legenda */}
          <g transform="translate(24 350)">
            <rect width="168" height="88" rx="10" fill="#fff" stroke="var(--color-emas-soft)" />
            <text x="14" y="22" fontSize="11" fontWeight="700" fill="var(--color-sogan-900)" fontFamily="var(--font-poppins)">Legenda Peta:</text>
            <circle cx="20" cy="40" r="5" fill="var(--color-kunyit)" />
            <text x="32" y="44" fontSize="10" fill="var(--color-tinta)" fontFamily="var(--font-poppins)">Destinasi Wisata</text>
            <circle cx="20" cy="58" r="5" fill="var(--color-sogan-900)" />
            <text x="32" y="62" fontSize="10" fill="var(--color-tinta)" fontFamily="var(--font-poppins)">Pemerintahan &amp; Fasilitas</text>
            <path d="M14 76h12" stroke="var(--color-emas)" strokeWidth="3" />
            <text x="32" y="80" fontSize="10" fill="var(--color-tinta)" fontFamily="var(--font-poppins)">Jalan Desa Lerep</text>
          </g>
        </svg>
        </div>

        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border border-emas-soft bg-white shadow">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)))}
            className="grid size-8 place-items-center text-sogan-900 hover:bg-mori-2 disabled:opacity-40"
            disabled={zoom >= 2}
            aria-label="Perbesar peta"
          >
            <Plus className="size-4" />
          </button>
          <span className="h-px bg-emas-soft" />
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
            className="grid size-8 place-items-center text-sogan-900 hover:bg-mori-2 disabled:opacity-40"
            disabled={zoom <= 1}
            aria-label="Perkecil peta"
          >
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-tinta/60 sm:hidden">Geser peta ke samping untuk melihat seluruh wilayah →</p>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Pilih lokasi">
        {titikPeta.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setActive(t.id)}
              aria-pressed={t.id === active}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                t.id === active
                  ? "border-sogan-900 bg-sogan-900 text-mori"
                  : "border-emas-soft bg-white text-sogan-900 hover:border-kunyit",
              )}
            >
              <span className={cn("size-2 rounded-full", t.kind === "wisata" ? "bg-kunyit" : "bg-sogan-soft")} />
              {t.name}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex min-h-6 items-start gap-2 text-sm text-tinta" aria-live="polite">
        <MapPin className="mt-0.5 size-4 shrink-0 text-kunyit-600" />
        {selected ? (
          <span>
            <strong className="font-semibold text-sogan-900">{selected.name}</strong> — {selected.note}
          </span>
        ) : (
          "Pilih penanda pada peta untuk melihat keterangan."
        )}
      </p>
    </div>
  );
}

export function PetaWilayahSection() {
  return (
    <section id="peta-wilayah" aria-labelledby="judul-peta" className="border-b border-emas-soft/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] border-2 border-kunyit-soft bg-mori px-4 py-8 shadow-kartu sm:p-10 lg:p-12">
          <CardCorners size="lg" />

          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="px-2 sm:px-0">
              <Eyebrow lines={["Navigasi Wisata & Fasilitas"]} align="left" />
              <h2 id="judul-peta" className="mt-3 font-serif text-[1.75rem] font-bold leading-tight text-sogan-900 sm:text-4xl">
                Peta Panduan Wilayah Desa Wisata
              </h2>
              <OrnamenPembatas align="left" className="mt-3" />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-tinta/85 sm:text-[0.95rem]">
                Petunjuk arah terintegrasi menuju sentra kebudayaan, homestay warga bersertifikasi, spot kuliner
                tradisional, dan fasilitas umum Desa Lerep.
              </p>
              <ul className="mt-7 space-y-4">
                {statistikPeta.map((s) => (
                  <li key={s.label} className="flex items-start gap-3.5">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-sogan-900 text-mori">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="leading-snug">
                      <span className="block text-sm font-bold text-sogan-900">{s.value}</span>
                      <span className="block text-sm font-semibold text-tinta">{s.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 flex w-full items-center justify-center rounded-full border-2 border-sogan-900/70 bg-kunyit px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-tombol transition hover:bg-kunyit-600 sm:max-w-md"
              >
                Buka Peta Digital Lengkap
              </a>
            </div>

            <div className="min-w-0">
              <PetaIlustrasi />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
