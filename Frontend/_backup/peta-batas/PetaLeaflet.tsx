"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import type { Feature, FeatureCollection } from "geojson";
import { CircleMarker, GeoJSON, MapContainer, Marker, Popup, ScaleControl, TileLayer, Tooltip, useMap } from "react-leaflet";
import {
  IKON_DESA,
  IKON_DUSUN,
  KATEGORI,
  WARNA_DUSUN,
  batasDesa,
  batasDusun,
  desaLerep,
  dusunPeta,
  titikPeta,
  type DusunPeta,
  type KategoriTitik,
  type TitikPeta,
} from "@/data/peta-lerep";

export type Basemap = "satelit" | "jalan" | "topografi";

const LAPISAN: Record<Basemap, { url: string; attribution: string; maxNativeZoom: number; subdomains?: string }> = {
  satelit: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Citra &copy; Esri, Maxar, Earthstar Geographics",
    maxNativeZoom: 18,
  },
  jalan: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxNativeZoom: 19,
  },
  topografi: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, SRTM | &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxNativeZoom: 17,
    subdomains: "abc",
  },
};

/** Semua titik sebagai batas tampilan awal. */
export const BATAS_AWAL = L.latLngBounds([
  [desaLerep.lat, desaLerep.lng],
  ...dusunPeta.map((d) => [d.lat, d.lng] as [number, number]),
  ...titikPeta.map((t) => [t.lat, t.lng] as [number, number]),
]);

const ikonTitik = (t: TitikPeta, aktif: boolean) =>
  L.divIcon({
    className: "",
    html: `<span class="peta-pin${aktif ? " peta-pin--aktif" : ""}" style="--w:${KATEGORI[t.kategori].warna}"><span class="peta-pin__isi">${KATEGORI[t.kategori].ikon}</span></span>`,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -42],
    tooltipAnchor: [0, -40],
  });

const ikonDusun = (d: DusunPeta, warna: string, aktif: boolean) =>
  L.divIcon({
    className: "",
    html: `<span class="peta-dusun${aktif ? " peta-dusun--aktif" : ""}" style="--w:${warna}"><span class="peta-dusun__label">${IKON_DUSUN}<span>${d.nama}</span></span><span class="peta-dusun__titik"></span></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -34],
  });

const ikonDesa = L.divIcon({
  className: "",
  html: `<span class="peta-desa">${IKON_DESA}</span>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -14],
});

const persen = (ha: number) => ((ha / desaLerep.luasHa) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 });
const rute = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
const koordinat = (lat: number, lng: number) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

function Baris({ label, isi }: { label: string; isi?: string }) {
  if (!isi) return null;
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2 py-1 text-[0.78rem] leading-snug">
      <dt className="font-semibold text-ornamen/60">{label}</dt>
      <dd className="text-tinta">{isi}</dd>
    </div>
  );
}

function TombolRute({ lat, lng }: { lat: number; lng: number }) {
  return (
    <a
      href={rute(lat, lng)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ornamen px-4 py-2 text-xs font-bold !text-mori transition-colors hover:bg-kunyit-700"
    >
      Petunjuk arah di Google Maps
      <span className="sr-only">(membuka tab baru)</span>
    </a>
  );
}

function IsiTitik({ t }: { t: TitikPeta }) {
  const k = KATEGORI[t.kategori];
  return (
    <div className="w-64">
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white" style={{ background: k.warna }}>
        {k.label}
      </span>
      <h3 className="mt-1.5 font-serif text-base font-bold leading-snug text-ornamen">{t.nama}</h3>
      <dl className="mt-2 divide-y divide-ornamen/10 border-y border-ornamen/10">
        <Baris label="Alamat" isi={t.alamat} />
        <Baris label="Jenis" isi={t.jenis} />
        <Baris label="Status" isi={t.status} />
        {t.kode && <Baris label={t.kode.label} isi={t.kode.nilai} />}
        <Baris label="Catatan" isi={t.catatan} />
        <Baris label="Koordinat" isi={koordinat(t.lat, t.lng)} />
        <Baris label="Sumber" isi={t.sumber} />
      </dl>
      <TombolRute lat={t.lat} lng={t.lng} />
    </div>
  );
}

function IsiDusun({ d, warna }: { d: DusunPeta; warna: string }) {
  return (
    <div className="w-64">
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white" style={{ background: warna }}>
        Dusun
      </span>
      <h3 className="mt-1.5 font-serif text-base font-bold leading-snug text-ornamen">Dusun {d.nama}</h3>
      <div className="mt-2 rounded-xl bg-mori-2 p-2.5">
        <p className="flex items-baseline justify-between text-[0.78rem] text-ornamen/70">
          Luas wilayah <strong className="font-serif text-lg text-ornamen">{d.luasHa.toLocaleString("id-ID")} ha</strong>
        </p>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ornamen/10">
          <span className="block h-full rounded-full" style={{ width: `${(d.luasHa / desaLerep.luasHa) * 100}%`, background: warna }} />
        </div>
        <p className="mt-1 text-[0.7rem] text-ornamen/60">{persen(d.luasHa)}% dari luas Desa Lerep</p>
      </div>
      <dl className="mt-2 divide-y divide-ornamen/10 border-y border-ornamen/10">
        <Baris label="Penanda" isi={d.penanda} />
        <Baris label="Catatan" isi={d.catatan} />
        <Baris label="Titik" isi={d.jenis} />
        <Baris label="Sumber" isi={d.sumber} />
      </dl>
      <TombolRute lat={d.lat} lng={d.lng} />
    </div>
  );
}

/** Terbang ke item terpilih lalu membuka popup-nya. */
function Pengarah({ terpilih, penanda }: { terpilih: string | null; penanda: React.RefObject<Map<string, L.Marker>> }) {
  const map = useMap();
  useEffect(() => {
    if (!terpilih) return;
    const m = penanda.current.get(terpilih);
    if (!m) return;
    const tujuan = m.getLatLng();
    const zoom = Math.max(map.getZoom(), terpilih.startsWith("d:") ? 16 : 17);
    const hemat = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buka = () => m.openPopup();
    if (map.getBounds().pad(-0.2).contains(tujuan) && map.getZoom() >= zoom - 1) {
      buka();
      return;
    }
    map.once("moveend", buka);
    if (hemat) map.setView(tujuan, zoom);
    else map.flyTo(tujuan, zoom, { duration: 0.9 });
    return () => {
      map.off("moveend", buka);
    };
  }, [terpilih, map, penanda]);
  return null;
}

function Siap({ onSiap }: { onSiap: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => onSiap(map), [map, onSiap]);
  return null;
}

export type PetaLeafletProps = {
  basemap: Basemap;
  kategoriAktif: ReadonlySet<KategoriTitik>;
  tampilDusun: boolean;
  terpilih: string | null;
  onPilih: (id: string | null) => void;
  onSiap: (m: L.Map) => void;
};

/** Peta utama Leaflet (hanya di klien). */
export default function PetaLeaflet({ basemap, kategoriAktif, tampilDusun, terpilih, onPilih, onSiap }: PetaLeafletProps) {
  const penanda = useRef(new Map<string, L.Marker>());
  const pilihRef = useRef(terpilih);
  useEffect(() => {
    pilihRef.current = terpilih;
  }, [terpilih]);

  const daftar = useMemo(() => titikPeta.filter((t) => kategoriAktif.has(t.kategori)), [kategoriAktif]);
  const lapisan = LAPISAN[basemap];

  const daftarkan = (id: string) => (m: L.Marker | null) => {
    if (m) penanda.current.set(id, m);
    else penanda.current.delete(id);
  };
  const peristiwa = (id: string) => ({
    click: () => {
      pilihRef.current = id;
      onPilih(id);
    },
    popupclose: () => {
      if (pilihRef.current === id) {
        pilihRef.current = null;
        onPilih(null);
      }
    },
  });

  return (
    <MapContainer
      bounds={BATAS_AWAL.pad(0.12)}
      maxBounds={BATAS_AWAL.pad(2.5)}
      minZoom={12}
      maxZoom={19}
      zoomControl={false}
      attributionControl
      scrollWheelZoom
      className="size-full bg-[#2c2a20] outline-none"
    >
      <TileLayer key={basemap} url={lapisan.url} attribution={lapisan.attribution} maxNativeZoom={lapisan.maxNativeZoom} maxZoom={19} subdomains={lapisan.subdomains ?? "abc"} />
      {basemap === "satelit" && (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
          maxNativeZoom={18}
          maxZoom={19}
          opacity={0.75}
        />
      )}
      <ScaleControl position="bottomleft" imperial={false} />
      <Siap onSiap={onSiap} />
      <Pengarah terpilih={terpilih} penanda={penanda} />

      {/* Poligon batas resmi — otomatis tampil jika data tersedia di src/data/peta-lerep.ts */}
      {batasDusun && (
        <GeoJSON
          data={batasDusun as FeatureCollection}
          style={(f) => {
            const i = dusunPeta.findIndex((d) => d.nama.toLowerCase() === String(f?.properties?.nama ?? "").replace(/^dusun\s+/i, "").toLowerCase());
            const w = WARNA_DUSUN[i] ?? "#d6a25c";
            return { color: "#fff", weight: 2, fillColor: w, fillOpacity: 0.32 };
          }}
        />
      )}
      {batasDesa && <GeoJSON data={batasDesa as Feature} style={{ color: "#fff", weight: 3, dashArray: "8 6", fillOpacity: 0 }} />}

      {/* Titik tengah desa */}
      <Marker position={[desaLerep.lat, desaLerep.lng]} icon={ikonDesa} ref={daftarkan("desa")} eventHandlers={peristiwa("desa")}>
        <Tooltip direction="top" offset={[0, -14]} className="peta-tooltip">
          Titik tengah Desa Lerep
        </Tooltip>
        <Popup className="peta-popup" maxWidth={300} autoPanPaddingTopLeft={[16, 64]} autoPanPaddingBottomRight={[64, 40]}>
          <div className="w-64">
            <span className="inline-flex rounded-full bg-ornamen px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-mori">Desa</span>
            <h3 className="mt-1.5 font-serif text-base font-bold text-ornamen">Desa Lerep</h3>
            <p className="text-[0.78rem] text-tinta">
              Kec. {desaLerep.kecamatan}, Kab. {desaLerep.kabupaten}, {desaLerep.provinsi}
            </p>
            <dl className="mt-2 divide-y divide-ornamen/10 border-y border-ornamen/10">
              <Baris label="Luas" isi={`${desaLerep.luasHa.toLocaleString("id-ID")} ha`} />
              <Baris label="Ketinggian" isi={`${desaLerep.ketinggian} mdpl`} />
              <Baris label="Kode wilayah" isi={desaLerep.kodeWilayah} />
              <Baris label="Wilayah" isi={`${desaLerep.jumlahDusun} dusun · ${desaLerep.jumlahRw} RW`} />
              <Baris label="Sumber" isi="Google Maps; RPJM Desa Lerep, BPS" />
            </dl>
          </div>
        </Popup>
      </Marker>

      {tampilDusun &&
        dusunPeta.map((d, i) => {
          const id = `d:${d.id}`;
          const w = WARNA_DUSUN[i % WARNA_DUSUN.length];
          return (
            <Marker key={id} position={[d.lat, d.lng]} icon={ikonDusun(d, w, terpilih === id)} ref={daftarkan(id)} eventHandlers={peristiwa(id)} zIndexOffset={terpilih === id ? 900 : 0} riseOnHover>
              <Popup className="peta-popup" maxWidth={300} autoPanPaddingTopLeft={[16, 64]} autoPanPaddingBottomRight={[64, 40]}>
                <IsiDusun d={d} warna={w} />
              </Popup>
            </Marker>
          );
        })}

      {daftar.map((t) => {
        const id = `t:${t.id}`;
        const aktif = terpilih === id;
        return (
          <Marker key={id} position={[t.lat, t.lng]} icon={ikonTitik(t, aktif)} ref={daftarkan(id)} eventHandlers={peristiwa(id)} zIndexOffset={aktif ? 1000 : 100} riseOnHover>
            <Tooltip direction="top" className="peta-tooltip">
              {t.nama}
            </Tooltip>
            <Popup className="peta-popup" maxWidth={300} autoPanPaddingTopLeft={[16, 64]} autoPanPaddingBottomRight={[64, 40]}>
              <IsiTitik t={t} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

/** Peta kecil penunjuk lokasi Desa Lerep di sekitar Kota/Kab. Semarang. */
export function PetaLokasi() {
  return (
    <MapContainer
      center={[desaLerep.lat, desaLerep.lng]}
      zoom={9}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      className="size-full bg-mori-2"
    >
      <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CircleMarker center={[desaLerep.lat, desaLerep.lng]} radius={9} pathOptions={{ color: "#fff", weight: 2, fillColor: "#b42318", fillOpacity: 0.9 }} />
    </MapContainer>
  );
}
