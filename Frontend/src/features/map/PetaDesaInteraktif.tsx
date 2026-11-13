"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";
import {
  Compass,
  Download,
  Focus,
  GraduationCap,
  House,
  Info,
  Landmark,
  Layers,
  LocateFixed,
  Map as IkonPeta,
  Maximize,
  Minimize,
  Minus,
  Mountain,
  Plus,
  Search,
  Satellite,
  Stethoscope,
  Trees,
  X,
  type LucideIcon,
} from "lucide-react";
import { KATEGORI, WARNA_DUSUN, desaLerep, dusunPeta, titikPeta, type KategoriTitik } from "@/data/peta-lerep";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import type { DataBatas } from "./batas";
import type { Basemap } from "./PetaLeaflet";

const Memuat = () => (
  <div className="grid size-full place-items-center bg-[#2c2a20] text-mori/80">
    <span className="flex flex-col items-center gap-3 text-sm font-semibold">
      <span className="size-10 animate-spin rounded-full border-4 border-jingga/30 border-t-jingga" aria-hidden="true" />
      Memuat peta…
    </span>
  </div>
);
const PetaLeaflet = dynamic(() => import("./PetaLeaflet"), {
  ssr: false,
  loading: Memuat,
});
const PetaLokasi = dynamic(() => import("./PetaLeaflet").then((m) => m.PetaLokasi), { ssr: false });

const IKON_KATEGORI: Record<KategoriTitik, LucideIcon> = {
  pemerintahan: Landmark,
  pendidikan: GraduationCap,
  kesehatan: Stethoscope,
  fasilitas_umum: Trees,
  wisata: Mountain,
};
const SEMUA_KATEGORI = Object.keys(KATEGORI) as KategoriTitik[];
const LUAS_MAKS = Math.max(...dusunPeta.map((d) => d.luasHa));
const JUMLAH = Object.fromEntries(SEMUA_KATEGORI.map((k) => [k, titikPeta.filter((t) => t.kategori === k).length])) as Record<
  KategoriTitik,
  number
>;

const BASEMAP: { id: Basemap; label: string; ikon: LucideIcon }[] = [
  { id: "satelit", label: "Satelit", ikon: Satellite },
  { id: "jalan", label: "Jalan", ikon: IkonPeta },
  { id: "topografi", label: "Topografi", ikon: Layers },
];

type Tab = "lokasi" | "dusun" | "info";

function MawarAngin() {
  return (
    <svg viewBox="0 0 64 64" className="size-full drop-shadow-[0_2px_4px_rgb(0_0_0/0.45)]" aria-hidden="true">
      <circle cx="32" cy="32" r="22" fill="rgb(253 248 238 / 0.9)" stroke="#562f00" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="17" fill="none" stroke="#562f00" strokeOpacity="0.35" strokeDasharray="2 3" />
      <path d="M32 6 L37 32 L32 28 L27 32 Z" fill="#b42318" />
      <path d="M32 58 L27 32 L32 36 L37 32 Z" fill="#562f00" />
      <path d="M58 32 L32 27 L36 32 L32 37 Z" fill="#562f00" fillOpacity="0.55" />
      <path d="M6 32 L32 37 L28 32 L32 27 Z" fill="#562f00" fillOpacity="0.55" />
      <circle cx="32" cy="32" r="2.5" fill="#ff9644" stroke="#562f00" />
      <text
        x="32"
        y="5.5"
        textAnchor="middle"
        fontSize="7"
        fontWeight="800"
        fill="#fdf8ee"
        stroke="#562f00"
        strokeWidth="2.4"
        paintOrder="stroke"
      >
        U
      </text>
    </svg>
  );
}

function TombolKontrol({
  label,
  onClick,
  children,
  aktif,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  aktif?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={aktif}
      className="grid size-11 cursor-pointer place-items-center text-ornamen transition-colors hover:bg-jingga-muda focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga [&_svg]:size-[1.15rem]"
    >
      {children}
    </button>
  );
}

/**
 * Peta interaktif Desa Lerep: citra satelit/jalan/topografi, titik resmi dari public/peta/desa-lerep.geojson,
 * filter kategori, daftar lokasi & dusun yang tersinkron dengan peta, dan mode layar penuh.
 */
export function PetaDesaInteraktif() {
  const [peta, setPeta] = useState<L.Map | null>(null);
  const [basemap, setBasemap] = useState<Basemap>("satelit");
  const [kategoriAktif, setKategoriAktif] = useState<ReadonlySet<KategoriTitik>>(() => new Set(SEMUA_KATEGORI));
  const [tampilDusun, setTampilDusun] = useState(true);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("lokasi");
  const [cari, setCari] = useState("");
  const [layarPenuh, setLayarPenuh] = useState(false);
  const [fokus, setFokus] = useState(true);
  const [batas, setBatas] = useState<DataBatas | null>(null);

  const onSiap = useCallback((m: L.Map) => setPeta(m), []);
  const onBatas = useCallback((d: DataBatas | null) => setBatas(d), []);

  // Mode layar penuh: kunci gulir halaman, Esc untuk keluar, sesuaikan ukuran peta.
  useEffect(() => {
    if (!layarPenuh) return;
    const awal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setLayarPenuh(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = awal;
      window.removeEventListener("keydown", esc);
    };
  }, [layarPenuh]);
  useEffect(() => {
    const t = window.setTimeout(() => peta?.invalidateSize(), 60);
    return () => window.clearTimeout(t);
  }, [layarPenuh, peta]);

  const ubahKategori = (k: KategoriTitik) => {
    setKategoriAktif((lama) => {
      const baru = new Set(lama);
      if (baru.has(k)) baru.delete(k);
      else baru.add(k);
      return baru;
    });
    if (terpilih?.startsWith("t:") && titikPeta.find((t) => `t:${t.id}` === terpilih)?.kategori === k) setTerpilih(null);
  };

  const pilih = (id: string) => {
    setTerpilih(id);
    if (window.matchMedia("(max-width: 1023px)").matches && !layarPenuh) {
      document.getElementById("peta-kanvas")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const kembali = () => {
    peta?.closePopup();
    setTerpilih(null);
    import("./PetaLeaflet").then(({ batasTampilan }) =>
      peta?.flyToBounds(batasTampilan(batas), {
        padding: [28, 28],
        duration: 0.8,
      }),
    );
  };

  const hasil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return titikPeta.filter(
      (t) => kategoriAktif.has(t.kategori) && (!q || `${t.nama} ${t.alamat ?? ""} ${t.catatan ?? ""}`.toLowerCase().includes(q)),
    );
  }, [cari, kategoriAktif]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border-2 border-ornamen bg-mori shadow-[0_28px_60px_-30px_rgb(86_47_0/0.75)]",
        layarPenuh ? "fixed inset-0 z-[80] rounded-none border-0" : "relative rounded-[1.75rem]",
      )}
      role={layarPenuh ? "dialog" : undefined}
      aria-modal={layarPenuh || undefined}
      aria-label={layarPenuh ? "Peta Desa Lerep layar penuh" : undefined}
    >
      {/* Kepala peta */}
      <header className="relative isolate flex flex-wrap items-center gap-3 overflow-hidden bg-ornamen px-4 pb-5 pt-4 text-mori sm:px-6">
        <div
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{
            backgroundImage: `url(${asset("/images/batik.webp")})`,
            backgroundSize: "360px",
          }}
          aria-hidden="true"
        />
        <span className="hidden size-11 shrink-0 place-items-center rounded-xl bg-jingga text-ornamen sm:grid">
          <Compass className="size-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-lg font-bold uppercase leading-tight tracking-[0.06em] sm:text-2xl">Peta Desa Lerep</p>
          <p className="truncate text-xs text-mori/75 sm:text-sm">
            Kec. {desaLerep.kecamatan} · Kab. {desaLerep.kabupaten} · {desaLerep.provinsi}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={asset("/peta/desa-lerep.geojson")}
            download="desa-lerep.geojson"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border-2 border-mori/25 px-3.5 text-xs font-semibold transition-colors hover:border-jingga hover:bg-white/10"
          >
            <Download className="size-4" aria-hidden="true" /> <span className="max-sm:sr-only">Unduh data</span>{" "}
            <span className="sr-only">(GeoJSON)</span>
          </a>
          <button
            type="button"
            onClick={() => setLayarPenuh((v) => !v)}
            className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full bg-jingga px-3.5 text-xs font-bold text-ornamen transition-colors hover:bg-jingga-muda focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga-muda"
          >
            {layarPenuh ? <Minimize className="size-4" aria-hidden="true" /> : <Maximize className="size-4" aria-hidden="true" />}
            <span className="max-sm:sr-only">{layarPenuh ? "Keluar layar penuh" : "Layar penuh"}</span>
          </button>
        </div>
        <div className="pita-tumpal absolute inset-x-0 bottom-0 h-2.5" aria-hidden="true" />
      </header>

      {/* Legenda interaktif / filter */}
      <div
        className="flex items-center gap-2 overflow-x-auto border-b-2 border-ornamen/10 bg-mori px-3 py-2.5 [scrollbar-width:none] sm:flex-wrap sm:px-6"
        role="group"
        aria-label="Tampilkan kategori di peta"
      >
        <span className="mr-1 shrink-0 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ornamen/60 max-sm:sr-only">Legenda</span>
        <button
          type="button"
          onClick={() => setTampilDusun((v) => !v)}
          aria-pressed={tampilDusun}
          className={cn(
            "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border-2 px-3 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
            tampilDusun ? "border-ornamen bg-ornamen text-mori" : "border-ornamen/15 bg-white/60 text-ornamen/50 line-through decoration-2",
          )}
        >
          <House className="size-3.5" aria-hidden="true" /> Dusun{" "}
          <span className="rounded-full bg-white/20 px-1.5 tabular-nums">{dusunPeta.length}</span>
        </button>
        {SEMUA_KATEGORI.map((k) => {
          const Ikon = IKON_KATEGORI[k];
          const on = kategoriAktif.has(k);
          return (
            <button
              key={k}
              type="button"
              onClick={() => ubahKategori(k)}
              aria-pressed={on}
              className={cn(
                "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border-2 px-3 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                on ? "text-white" : "border-ornamen/15 bg-white/60 text-ornamen/50 line-through decoration-2",
              )}
              style={
                on
                  ? {
                      background: KATEGORI[k].warna,
                      borderColor: KATEGORI[k].warna,
                    }
                  : undefined
              }
            >
              <Ikon className="size-3.5" aria-hidden="true" /> {KATEGORI[k].label}
              <span className={cn("rounded-full px-1.5 tabular-nums", on ? "bg-white/20" : "bg-ornamen/5")}>{JUMLAH[k]}</span>
            </button>
          );
        })}
      </div>

      <div
        className={cn("grid min-h-0 lg:grid-cols-[minmax(0,1fr)_22.5rem]", layarPenuh && "flex-1 max-lg:grid-rows-[minmax(0,1fr)_auto]")}
      >
        {/* Kanvas peta */}
        <div
          id="peta-kanvas"
          className={cn(
            "relative isolate",
            layarPenuh ? "min-h-[55dvh] lg:h-full" : "h-[68svh] min-h-[26rem] max-h-[44rem] lg:h-[42rem] lg:max-h-none",
          )}
        >
          <PetaLeaflet
            basemap={basemap}
            fokus={fokus}
            kategoriAktif={kategoriAktif}
            tampilDusun={tampilDusun}
            terpilih={terpilih}
            onPilih={setTerpilih}
            onSiap={onSiap}
            onBatas={onBatas}
          />

          {/* Pilihan peta dasar */}
          <div
            className="absolute left-3 top-3 z-[500] flex rounded-full border-2 border-ornamen/20 bg-mori/95 p-0.5 shadow-lg backdrop-blur"
            role="group"
            aria-label="Peta dasar"
          >
            {BASEMAP.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBasemap(b.id)}
                aria-pressed={basemap === b.id}
                className={cn(
                  "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                  basemap === b.id ? "bg-ornamen text-mori" : "text-ornamen/75 hover:bg-jingga-muda/70",
                )}
              >
                <b.ikon className="size-3.5" aria-hidden="true" />
                <span className={basemap === b.id ? undefined : "max-sm:sr-only"}>{b.label}</span>
              </button>
            ))}
          </div>

          {/* Kontrol */}
          <div className="absolute right-3 top-3 z-[500] flex flex-col divide-y-2 divide-ornamen/10 overflow-hidden rounded-2xl border-2 border-ornamen/20 bg-mori/95 shadow-lg backdrop-blur">
            <TombolKontrol label="Perbesar" onClick={() => peta?.zoomIn()}>
              <Plus aria-hidden="true" />
            </TombolKontrol>
            <TombolKontrol label="Perkecil" onClick={() => peta?.zoomOut()}>
              <Minus aria-hidden="true" />
            </TombolKontrol>
            <TombolKontrol label="Kembali ke seluruh desa" onClick={kembali}>
              <LocateFixed aria-hidden="true" />
            </TombolKontrol>
            <TombolKontrol
              label={fokus ? "Tampilkan area di luar desa" : "Fokus ke wilayah desa"}
              onClick={() => setFokus((v) => !v)}
              aktif={fokus}
            >
              <Focus aria-hidden="true" />
            </TombolKontrol>
          </div>

          {/* Keterangan garis */}
          <div className="pointer-events-none absolute left-3 top-[3.75rem] z-[450] hidden rounded-xl border-2 border-ornamen/15 bg-mori/90 px-3 py-2 text-[0.68rem] leading-relaxed text-ornamen shadow-lg backdrop-blur md:block">
            <p className="flex items-center gap-2">
              <span className="h-[3px] w-6 rounded-full bg-jingga-muda ring-2 ring-ornamen" aria-hidden="true" /> Batas Desa Lerep{" "}
              <span className="text-ornamen/55">(Kemendagri 2020)</span>
            </p>
            <p className="mt-1 flex items-center gap-2">
              <span
                className="h-3 w-6 rounded-sm bg-[linear-gradient(90deg,#2f6f9f,#c2571a,#2aa594,#8e5bb5)] opacity-70"
                aria-hidden="true"
              />{" "}
              Wilayah dusun <span className="text-ornamen/55">(perkiraan)</span>
            </p>
            <p className="mt-1 flex items-center gap-2">
              <span className="w-6 border-t-2 border-dashed border-ornamen/50" aria-hidden="true" /> Desa tetangga
            </p>
          </div>

          {/* Mawar angin */}
          <div className="pointer-events-none absolute bottom-10 right-3 z-[450] size-16 sm:size-[4.5rem]">
            <MawarAngin />
          </div>
        </div>

        {/* Panel samping */}
        <aside
          className={cn(
            "flex min-h-0 flex-col border-ornamen/10 bg-mori max-lg:border-t-2 lg:border-l-2",
            layarPenuh ? "max-lg:max-h-[38dvh] lg:h-full" : "lg:h-[42rem]",
          )}
        >
          <div className="flex gap-1 border-b-2 border-ornamen/10 p-2" role="tablist" aria-label="Isi panel peta">
            {(
              [
                { id: "lokasi", label: `Lokasi (${titikPeta.length})` },
                { id: "dusun", label: `Dusun (${dusunPeta.length})` },
                { id: "info", label: "Info Desa" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => setTab(t.id)}
                className={cn(
                  "h-10 flex-1 cursor-pointer rounded-xl text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                  tab === t.id ? "bg-ornamen text-mori" : "text-ornamen/70 hover:bg-jingga-muda/60",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain max-lg:max-h-[30rem]"
          >
            {tab === "lokasi" && (
              <div className="p-3">
                <label className="relative block">
                  <span className="sr-only">Cari lokasi</span>
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ornamen/50"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={cari}
                    onChange={(e) => setCari(e.target.value)}
                    placeholder="Cari sekolah, balai desa, embung…"
                    className="h-11 w-full rounded-full border-2 border-ornamen/15 bg-white pl-10 pr-10 text-sm text-ornamen placeholder:text-ornamen/45 focus:border-jingga focus:outline-none focus:ring-[3px] focus:ring-jingga/30"
                  />
                  {cari && (
                    <button
                      type="button"
                      onClick={() => setCari("")}
                      className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-ornamen/60 hover:bg-mori-2"
                      aria-label="Hapus pencarian"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  )}
                </label>
                <p className="mt-2 px-1 text-xs text-ornamen/60" aria-live="polite">
                  {hasil.length} lokasi ditampilkan
                </p>
                <ul className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1.5">
                  {hasil.map((t, i) => {
                    const id = `t:${t.id}`;
                    const Ikon = IKON_KATEGORI[t.kategori];
                    const aktif = terpilih === id;
                    return (
                      <li
                        key={id}
                        className="animate-in fade-in slide-in-from-right-2 duration-300 [animation-fill-mode:both]"
                        style={{ animationDelay: `${i * 30}ms` }}
                      >
                        <button
                          type="button"
                          onClick={() => pilih(id)}
                          aria-current={aktif || undefined}
                          className={cn(
                            "flex w-full cursor-pointer items-start gap-3 rounded-xl border-2 p-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                            aktif ? "border-jingga bg-jingga-muda/50" : "border-transparent hover:border-ornamen/10 hover:bg-white",
                          )}
                        >
                          <span
                            className="grid size-9 shrink-0 place-items-center rounded-lg text-white"
                            style={{ background: KATEGORI[t.kategori].warna }}
                          >
                            <Ikon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold leading-snug text-ornamen">{t.nama}</span>
                            <span className="mt-0.5 block truncate text-xs text-ornamen/60">
                              {t.alamat ?? t.catatan ?? KATEGORI[t.kategori].label}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {hasil.length === 0 && (
                  <p className="mt-4 rounded-xl bg-mori-2 p-4 text-center text-sm text-ornamen/70">
                    Tidak ada lokasi yang cocok. Coba kata lain atau aktifkan kategori di legenda.
                  </p>
                )}
              </div>
            )}

            {tab === "dusun" && (
              <div className="p-3">
                <div className="rounded-2xl bg-mori-2 p-3">
                  <p className="flex items-baseline justify-between text-xs font-semibold text-ornamen/70">
                    Luas Desa Lerep{" "}
                    <strong className="font-serif text-xl text-ornamen">{desaLerep.luasHa.toLocaleString("id-ID")} ha</strong>
                  </p>
                  <div className="mt-2 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
                    {dusunPeta.map((d, i) => (
                      <span
                        key={d.id}
                        style={{
                          width: `${(d.luasHa / desaLerep.luasHa) * 100}%`,
                          background: WARNA_DUSUN[i],
                        }}
                        title={`${d.nama}: ${d.luasHa} ha`}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[0.7rem] text-ornamen/60">Proporsi luas tiap dusun</p>
                </div>
                <ul className="mt-2 grid grid-cols-[minmax(0,1fr)] gap-1.5">
                  {[...dusunPeta]
                    .map((d, i) => ({ d, w: WARNA_DUSUN[i] }))
                    .sort((a, b) => b.d.luasHa - a.d.luasHa)
                    .map(({ d, w }) => {
                      const id = `d:${d.id}`;
                      const aktif = terpilih === id;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => {
                              setTampilDusun(true);
                              pilih(id);
                            }}
                            aria-current={aktif || undefined}
                            className={cn(
                              "w-full cursor-pointer rounded-xl border-2 p-2.5 text-left transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                              aktif ? "border-jingga bg-jingga-muda/50" : "border-transparent hover:border-ornamen/10 hover:bg-white",
                            )}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className="size-3 shrink-0 rounded-full ring-2 ring-white"
                                style={{ background: w }}
                                aria-hidden="true"
                              />
                              <span className="flex-1 text-sm font-semibold text-ornamen">Dusun {d.nama}</span>
                              <span className="text-xs font-bold tabular-nums text-ornamen/80">{d.luasHa.toLocaleString("id-ID")} ha</span>
                            </span>
                            <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-ornamen/10">
                              <span
                                className="block h-full rounded-full"
                                style={{
                                  width: `${(d.luasHa / LUAS_MAKS) * 100}%`,
                                  background: w,
                                }}
                              />
                            </span>
                            {(d.catatan || d.penanda) && (
                              <span className="mt-1 block truncate text-xs text-ornamen/60">{d.catatan ?? d.penanda}</span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {tab === "info" && (
              <div className="grid gap-3 p-3 text-sm">
                <dl className="grid grid-cols-2 gap-2">
                  {[
                    ["Luas", `${desaLerep.luasHa.toLocaleString("id-ID")} ha`],
                    ["Ketinggian", `${desaLerep.ketinggian} mdpl`],
                    ["Dusun / RW", `${desaLerep.jumlahDusun} / ${desaLerep.jumlahRw}`],
                    ["Kode pos", desaLerep.kodePos],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-mori-2 p-2.5">
                      <dt className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-ornamen/55">{l}</dt>
                      <dd className="mt-0.5 font-serif text-base font-bold text-ornamen">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-ornamen/70">
                  Kode wilayah <strong className="text-ornamen">{desaLerep.kodeWilayah}</strong> · RT: {desaLerep.jumlahRt}
                </p>
                <div>
                  <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ornamen/60">Batas wilayah</h3>
                  <dl className="mt-1.5 divide-y divide-ornamen/10 rounded-xl border-2 border-ornamen/10 bg-white/70">
                    {(["utara", "timur", "selatan", "barat"] as const).map((a) => (
                      <div key={a} className="grid grid-cols-[4.5rem_1fr] gap-2 px-3 py-2 text-xs leading-snug">
                        <dt className="font-bold capitalize text-kunyit-700">{a}</dt>
                        <dd className="text-tinta">{desaLerep.batas[a]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="overflow-hidden rounded-xl border-2 border-ornamen/10">
                  <div className="h-40">
                    <PetaLokasi />
                  </div>
                  <p className="bg-ornamen px-3 py-1.5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mori">
                    Lokasi Desa Lerep di Kab. Semarang
                  </p>
                </div>
                <p className="flex items-start gap-2 rounded-xl bg-jingga-muda/40 p-3 text-xs leading-relaxed text-ornamen/85">
                  <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  Garis batas desa dari data spasial Kemendagri (Batas Desa 2020) bersifat indikatif, belum tentu sama dengan Perbup
                  penegasan batas desa. Wilayah dusun pada peta adalah perkiraan dari titik penanda dusun, bukan batas resmi; luas dusun
                  memakai data monografi desa.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Kaki peta: sumber */}
      <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t-2 border-ornamen/10 bg-mori-2 px-4 py-2.5 text-[0.7rem] leading-relaxed text-ornamen/70 sm:px-6">
        <span>
          <strong className="text-ornamen">Sumber:</strong> batas desa Kemendagri GIS Dukcapil 2020 (indikatif) · titik Google Maps · RPJM
          Desa Lerep, BPS, Kemendikdasmen, Pemkab Semarang
        </span>
        <span>Datum WGS 84</span>
        <span>Diperbarui {desaLerep.diperbarui}</span>
      </footer>
    </div>
  );
}
