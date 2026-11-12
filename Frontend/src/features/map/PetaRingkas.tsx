"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";
import { ArrowUpRight, Focus, LocateFixed, Map as IkonPeta, MapPin, Minus, MousePointerClick, Plus, Satellite, X } from "lucide-react";
import { KATEGORI, WARNA_DUSUN, desaLerep, dusunPeta, titikPeta, type KategoriTitik } from "@/data/peta-lerep";
import { cn } from "@/lib/utils";
import type { DataBatas } from "./batas";
import type { Basemap } from "./PetaLeaflet";

const Memuat = () => (
  <div className="grid size-full place-items-center bg-[#1a1006] text-mori/80">
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

const SEMUA = new Set(Object.keys(KATEGORI) as KategoriTitik[]);

function Kontrol({ label, onClick, aktif, children }: { label: string; onClick: () => void; aktif?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={aktif}
      className="grid size-11 cursor-pointer place-items-center text-ornamen transition-colors hover:bg-jingga-muda focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga [&_svg]:size-[1.1rem]"
    >
      {children}
    </button>
  );
}

type Rincian = {
  warna: string;
  jenis: string;
  judul: string;
  baris: string[];
  lat: number;
  lng: number;
  luas?: number;
};

function rincianDari(id: string | null): Rincian | null {
  if (!id) return null;
  if (id === "desa")
    return {
      warna: "#562f00",
      jenis: "Desa",
      judul: "Desa Lerep",
      baris: [
        `Kec. ${desaLerep.kecamatan}, Kab. ${desaLerep.kabupaten}`,
        `${desaLerep.ketinggian} mdpl · ${desaLerep.jumlahDusun} dusun · ${desaLerep.jumlahRw} RW`,
      ],
      lat: desaLerep.lat,
      lng: desaLerep.lng,
      luas: desaLerep.luasHa,
    };
  if (id.startsWith("d:")) {
    const i = dusunPeta.findIndex((d) => `d:${d.id}` === id);
    const d = dusunPeta[i];
    if (!d) return null;
    return {
      warna: WARNA_DUSUN[i],
      jenis: "Dusun",
      judul: `Dusun ${d.nama}`,
      baris: [d.catatan, d.penanda].filter((x): x is string => Boolean(x)),
      lat: d.lat,
      lng: d.lng,
      luas: d.luasHa,
    };
  }
  const t = titikPeta.find((x) => `t:${x.id}` === id);
  if (!t) return null;
  return {
    warna: KATEGORI[t.kategori].warna,
    jenis: KATEGORI[t.kategori].label,
    judul: t.nama,
    baris: [t.alamat, t.catatan, t.kode ? `${t.kode.label}: ${t.kode.nilai}` : undefined].filter((x): x is string => Boolean(x)),
    lat: t.lat,
    lng: t.lng,
  };
}

/** Peta ringkas untuk beranda: fokus batas Desa Lerep, wilayah dusun, dan penanda lokasi. */
export function PetaRingkas() {
  const [peta, setPeta] = useState<L.Map | null>(null);
  const [batas, setBatas] = useState<DataBatas | null>(null);
  const [basemap, setBasemap] = useState<Basemap>("satelit");
  const [fokus, setFokus] = useState(true);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const onSiap = useCallback((m: L.Map) => setPeta(m), []);
  const onBatas = useCallback((d: DataBatas | null) => setBatas(d), []);
  const rinci = rincianDari(terpilih);

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

  return (
    <div>
      <div
        id="peta-ringkas"
        className="relative isolate h-[26rem] overflow-hidden rounded-2xl border-[3px] border-ornamen bg-[#1a1006] shadow-kartu sm:h-[30rem]"
      >
        <PetaLeaflet
          basemap={basemap}
          fokus={fokus}
          ringkas
          popup={false}
          kategoriAktif={SEMUA}
          tampilDusun
          terpilih={terpilih}
          onPilih={setTerpilih}
          onSiap={onSiap}
          onBatas={onBatas}
        />

        <div
          className="absolute left-3 top-3 z-[500] flex rounded-full border-2 border-ornamen/20 bg-mori/95 p-0.5 shadow-lg backdrop-blur"
          role="group"
          aria-label="Peta dasar"
        >
          {(
            [
              { id: "satelit", label: "Satelit", ikon: Satellite },
              { id: "jalan", label: "Jalan", ikon: IkonPeta },
            ] as const
          ).map((b) => (
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
              <b.ikon className="size-3.5" aria-hidden="true" /> {b.label}
            </button>
          ))}
        </div>

        <div className="absolute right-3 top-3 z-[500] flex flex-col divide-y-2 divide-ornamen/10 overflow-hidden rounded-2xl border-2 border-ornamen/20 bg-mori/95 shadow-lg backdrop-blur">
          <Kontrol label="Perbesar" onClick={() => peta?.zoomIn()}>
            <Plus aria-hidden="true" />
          </Kontrol>
          <Kontrol label="Perkecil" onClick={() => peta?.zoomOut()}>
            <Minus aria-hidden="true" />
          </Kontrol>
          <Kontrol label="Kembali ke seluruh desa" onClick={kembali}>
            <LocateFixed aria-hidden="true" />
          </Kontrol>
          <Kontrol
            label={fokus ? "Tampilkan area di luar desa" : "Fokus ke wilayah desa"}
            onClick={() => setFokus((v) => !v)}
            aktif={fokus}
          >
            <Focus aria-hidden="true" />
          </Kontrol>
        </div>

        {!terpilih && (
          <p className="pointer-events-none absolute bottom-9 left-1/2 z-[450] inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ornamen/85 px-3 py-1.5 text-[0.7rem] font-semibold text-mori shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
            <MousePointerClick className="size-3.5 text-jingga-muda motion-safe:animate-bounce" aria-hidden="true" />
            Klik wilayah dusun atau penanda
          </p>
        )}
      </div>

      {/* Rincian lokasi terpilih */}
      {rinci && (
        <div
          key={terpilih}
          className="relative mt-4 overflow-hidden rounded-2xl border-2 bg-white/80 p-4 pl-5 shadow-kartu animate-in fade-in slide-in-from-top-3 duration-300"
          style={{ borderColor: rinci.warna }}
          aria-live="polite"
        >
          <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: rinci.warna }} aria-hidden="true" />
          <button
            type="button"
            onClick={() => setTerpilih(null)}
            className="absolute right-2 top-2 grid size-9 cursor-pointer place-items-center rounded-full text-ornamen/60 transition-colors hover:bg-mori-2 hover:text-ornamen"
            aria-label="Tutup rincian"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
          <span
            className="inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white"
            style={{ background: rinci.warna }}
          >
            {rinci.jenis}
          </span>
          <h3 className="mt-1.5 pr-8 font-serif text-lg font-bold leading-snug text-ornamen">{rinci.judul}</h3>
          {rinci.luas !== undefined && (
            <div className="mt-2 max-w-sm">
              <p className="flex items-baseline justify-between text-xs text-ornamen/70">
                Luas wilayah <strong className="font-serif text-base text-ornamen">{rinci.luas.toLocaleString("id-ID")} ha</strong>
              </p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ornamen/10">
                <span
                  className="block h-full rounded-full transition-[width] duration-700"
                  style={{
                    width: `${(rinci.luas / desaLerep.luasHa) * 100}%`,
                    background: rinci.warna,
                  }}
                />
              </div>
            </div>
          )}
          {rinci.baris.map((b) => (
            <p key={b} className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-tinta/80">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-kunyit-600" aria-hidden="true" /> {b}
            </p>
          ))}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${rinci.lat},${rinci.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ornamen px-4 py-2 text-xs font-bold text-mori transition-colors hover:bg-kunyit-700"
          >
            Petunjuk arah <ArrowUpRight className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(membuka Google Maps di tab baru)</span>
          </a>
        </div>
      )}

      {/* Pilih dusun */}
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Pilih dusun di peta">
        {dusunPeta.map((d, i) => {
          const id = `d:${d.id}`;
          const aktif = terpilih === id;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => {
                  setTerpilih(aktif ? null : id);
                  const el = document.getElementById("peta-ringkas");
                  const r = el?.getBoundingClientRect();
                  if (el && r && (r.top < 64 || r.bottom > window.innerHeight)) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                aria-pressed={aktif}
                className={cn(
                  "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border-2 px-3 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70",
                  aktif ? "text-white shadow-md" : "border-ornamen/15 bg-white/70 text-ornamen hover:border-ornamen/30",
                )}
                style={
                  aktif
                    ? {
                        background: WARNA_DUSUN[i],
                        borderColor: WARNA_DUSUN[i],
                      }
                    : undefined
                }
              >
                <span className="size-2.5 rounded-full ring-2 ring-white" style={{ background: WARNA_DUSUN[i] }} aria-hidden="true" />
                {d.nama}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[0.7rem] leading-relaxed text-tinta/65">
        Garis batas desa: Kemendagri 2020 (indikatif). Wilayah dusun pada peta adalah perkiraan, bukan batas resmi.
      </p>
    </div>
  );
}
