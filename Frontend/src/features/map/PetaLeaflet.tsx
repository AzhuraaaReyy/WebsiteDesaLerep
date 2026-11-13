"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Marker, Polygon, Popup, ScaleControl, TileLayer, Tooltip, useMap } from "react-leaflet";
import {
  IKON_DESA,
  IKON_DUSUN,
  KATEGORI,
  WARNA_DUSUN,
  desaLerep,
  dusunPeta,
  titikPeta,
  type DusunPeta,
  type KategoriTitik,
  type TitikPeta,
} from "@/data/peta-lerep";
import { cn } from "@/lib/utils";
import { muatBatas, namaDusun, type DataBatas, type LatLng } from "./batas";

export type Basemap = "satelit" | "jalan" | "topografi";

const LAPISAN: Record<
  Basemap,
  {
    url: string;
    attribution: string;
    maxNativeZoom: number;
    subdomains?: string;
  }
> = {
  satelit: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Citra &copy; Esri, Maxar, Earthstar Geographics | Batas: Kemendagri 2020",
    maxNativeZoom: 18,
  },
  jalan: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Batas: Kemendagri 2020',
    maxNativeZoom: 19,
  },
  topografi: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, SRTM | &copy; <a href="https://opentopomap.org">OpenTopoMap</a> | Batas: Kemendagri 2020',
    maxNativeZoom: 17,
    subdomains: "abc",
  },
};

/** Batas cadangan dari titik-titik (dipakai sebelum poligon termuat). */
const BATAS_TITIK = L.latLngBounds([
  [desaLerep.lat, desaLerep.lng],
  ...dusunPeta.map((d) => [d.lat, d.lng] as LatLng),
  ...titikPeta.map((t) => [t.lat, t.lng] as LatLng),
]);

/** Batas tampilan desa: poligon Kemendagri bila tersedia, jika tidak dari titik. */
export const batasTampilan = (d: DataBatas | null) => (d?.desa ? L.latLngBounds(d.desa.poligon.flat(2)) : BATAS_TITIK.pad(0.15));
const PADDING: L.PointTuple = [28, 28];

/** Cincin besar di luar wilayah — dipakai sebagai "kertas" penutup yang dilubangi bentuk desa. */
const DUNIA: LatLng[] = [
  [-30, 80],
  [-30, 140],
  [20, 140],
  [20, 80],
];

const ikonTitik = (t: TitikPeta, aktif: boolean, i: number) =>
  L.divIcon({
    className: "",
    html: `<span class="peta-pin${aktif ? " peta-pin--aktif" : ""}" style="--w:${KATEGORI[t.kategori].warna};--i:${i}"><span class="peta-pin__isi">${KATEGORI[t.kategori].ikon}</span></span>`,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -42],
    tooltipAnchor: [0, -40],
  });

const ikonDusun = (d: DusunPeta, warna: string, aktif: boolean, i: number) =>
  L.divIcon({
    className: "",
    html: `<span class="peta-dusun${aktif ? " peta-dusun--aktif" : ""}" style="--w:${warna};--i:${i}"><span class="peta-dusun__label">${IKON_DUSUN}<span>${d.nama}</span></span><span class="peta-dusun__titik"></span></span>`,
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

const persen = (ha: number) =>
  ((ha / desaLerep.luasHa) * 100).toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  });
const rute = (lat: number, lng: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
const koordinat = (lat: number, lng: number) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
const hemat = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      <span
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white"
        style={{ background: k.warna }}
      >
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
      <span
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white"
        style={{ background: warna }}
      >
        Dusun
      </span>
      <h3 className="mt-1.5 font-serif text-base font-bold leading-snug text-ornamen">Dusun {d.nama}</h3>
      <div className="mt-2 rounded-xl bg-mori-2 p-2.5">
        <p className="flex items-baseline justify-between text-[0.78rem] text-ornamen/70">
          Luas wilayah <strong className="font-serif text-lg text-ornamen">{d.luasHa.toLocaleString("id-ID")} ha</strong>
        </p>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ornamen/10">
          <span
            className="block h-full rounded-full"
            style={{
              width: `${(d.luasHa / desaLerep.luasHa) * 100}%`,
              background: warna,
            }}
          />
        </div>
        <p className="mt-1 text-[0.7rem] text-ornamen/60">{persen(d.luasHa)}% dari luas Desa Lerep (data monografi)</p>
      </div>
      <dl className="mt-2 divide-y divide-ornamen/10 border-y border-ornamen/10">
        <Baris label="Penanda" isi={d.penanda} />
        <Baris label="Catatan" isi={d.catatan} />
        <Baris label="Batas di peta" isi="Perkiraan, bukan batas resmi dusun" />
        <Baris label="Sumber" isi={d.sumber} />
      </dl>
      <TombolRute lat={d.lat} lng={d.lng} />
    </div>
  );
}

/** Terbang ke item terpilih (dusun: ke seluruh wilayahnya) lalu membuka popup-nya. */
function Pengarah({
  terpilih,
  penanda,
  batasDusun,
  bukaPopup,
}: {
  bukaPopup: boolean;
  terpilih: string | null;
  penanda: React.RefObject<Map<string, L.Marker>>;
  batasDusun: Map<string, L.LatLngBounds>;
}) {
  const map = useMap();
  useEffect(() => {
    if (!terpilih) {
      map.closePopup();
      return;
    }
    const m = penanda.current.get(terpilih);
    const area = batasDusun.get(terpilih);
    if (!m && !area) return;
    const buka = () => bukaPopup && m?.openPopup();
    if (area) {
      map.once("moveend", buka);
      const opsi = {
        paddingTopLeft: [40, 170] as L.PointTuple,
        paddingBottomRight: [40, 30] as L.PointTuple,
        maxZoom: 17,
      };
      if (hemat()) map.fitBounds(area, opsi);
      else map.flyToBounds(area, { ...opsi, duration: 0.9 });
      return () => {
        map.off("moveend", buka);
      };
    }
    const tujuan = m!.getLatLng();
    const zoom = Math.max(map.getZoom(), 17);
    if (map.getBounds().pad(-0.2).contains(tujuan) && map.getZoom() >= zoom - 1) {
      buka();
      return;
    }
    map.once("moveend", buka);
    if (hemat()) map.setView(tujuan, zoom);
    else map.flyTo(tujuan, zoom, { duration: 0.9 });
    return () => {
      map.off("moveend", buka);
    };
  }, [terpilih, map, penanda, batasDusun, bukaPopup]);
  return null;
}

/**
 * Kamera & animasi pembuka: setelah poligon termuat dan peta terlihat di layar, peta "terbang" ke Desa Lerep,
 * lalu bergiliran: penutup luar desa memudar masuk → garis batas tergambar → wilayah dusun muncul → penanda jatuh.
 * Setelah itu tampilan dikunci di sekitar desa.
 */
function Kamera({ siap, batas, ringkas }: { siap: boolean; batas: L.LatLngBounds; ringkas: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!siap) return;
    const el = map.getContainer();
    const kunci = () => {
      const z = map.getBoundsZoom(batas, false, L.point(PADDING));
      map.setMinZoom(Math.max(11, Math.floor(z) - 1));
      map.setMaxBounds(batas.pad(0.5));
    };
    if (hemat()) {
      el.style.setProperty("--t0", "0s");
      el.classList.add("peta-mulai");
      map.fitBounds(batas, { padding: PADDING });
      kunci();
      return;
    }
    el.style.setProperty("--t0", "1s");
    map.setView(batas.getCenter(), Math.max(11, map.getBoundsZoom(batas) - 2), {
      animate: false,
    });
    let jeda: number | undefined;
    let akhir: number | undefined;
    const mulai = () => {
      el.classList.add("peta-mulai");
      map.once("moveend", kunci);
      map.flyToBounds(batas, {
        padding: PADDING,
        duration: 1.8,
        easeLinearity: 0.2,
      });
      akhir = window.setTimeout(() => el.style.setProperty("--t0", "0s"), 5200);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        jeda = window.setTimeout(mulai, ringkas ? 120 : 300);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(jeda);
      window.clearTimeout(akhir);
      map.off("moveend", kunci);
    };
  }, [siap, batas, ringkas, map]);
  return null;
}

function Siap({ onSiap }: { onSiap?: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => onSiap?.(map), [map, onSiap]);
  return null;
}

export type PetaLeafletProps = {
  basemap: Basemap;
  /** Tutup area di luar batas desa agar tampilan fokus ke Desa Lerep. */
  fokus?: boolean;
  /** Versi beranda: tanpa zoom gulir agar tidak mengganggu scroll halaman. */
  ringkas?: boolean;
  /** false = info ditampilkan di luar peta (mis. kartu di bawah peta), bukan popup. */
  popup?: boolean;
  kategoriAktif: ReadonlySet<KategoriTitik>;
  tampilDusun: boolean;
  terpilih: string | null;
  onPilih: (id: string | null) => void;
  onSiap?: (m: L.Map) => void;
  onBatas?: (d: DataBatas | null) => void;
};

/** Peta utama Leaflet (hanya di klien). */
export default function PetaLeaflet({
  basemap,
  fokus = true,
  ringkas = false,
  popup = true,
  kategoriAktif,
  tampilDusun,
  terpilih,
  onPilih,
  onSiap,
  onBatas,
}: PetaLeafletProps) {
  const penanda = useRef(new Map<string, L.Marker>());
  const pilihRef = useRef(terpilih);
  const [data, setData] = useState<DataBatas | null>(null);
  const [selesaiMuat, setSelesaiMuat] = useState(false);
  const [sorot, setSorot] = useState<string | null>(null);

  useEffect(() => {
    pilihRef.current = terpilih;
  }, [terpilih]);

  useEffect(() => {
    let hidup = true;
    muatBatas()
      .then((d) => {
        if (!hidup) return;
        setData(d);
        onBatas?.(d);
      })
      .catch(() => hidup && onBatas?.(null))
      .finally(() => hidup && setSelesaiMuat(true));
    return () => {
      hidup = false;
    };
  }, [onBatas]);

  const batas = useMemo(() => batasTampilan(data), [data]);
  const daftar = useMemo(() => titikPeta.filter((t) => kategoriAktif.has(t.kategori)), [kategoriAktif]);

  /** Wilayah dusun (perkiraan) dipasangkan dengan data dusun berdasarkan nama. */
  const areaDusun = useMemo(
    () =>
      (data?.dusun ?? [])
        .map((w) => {
          const i = dusunPeta.findIndex((d) => d.nama.toLowerCase() === namaDusun(w).toLowerCase());
          return i < 0
            ? null
            : {
                w,
                d: dusunPeta[i],
                i,
                id: `d:${dusunPeta[i].id}`,
                warna: WARNA_DUSUN[i % WARNA_DUSUN.length],
              };
        })
        .filter((x) => x !== null),
    [data],
  );
  const batasDusun = useMemo(() => new Map(areaDusun.map((a) => [a.id, L.latLngBounds(a.w.poligon.flat(2))])), [areaDusun]);

  const lubangDesa = useMemo(() => data?.desa?.poligon.map((p) => p[0]) ?? [], [data]);
  const gelap = basemap === "satelit";
  const lapisan = LAPISAN[basemap];

  // Ref hanya disentuh di dalam callback (ref/event), tidak saat render — aturan react-hooks/refs.
  const daftarkan = (id: string, m: L.Marker | null) => {
    if (m) penanda.current.set(id, m);
    else penanda.current.delete(id);
  };
  const pilih = (id: string) => {
    pilihRef.current = id;
    onPilih(id);
  };
  const tutupPopup = (id: string) => {
    if (pilihRef.current === id) {
      pilihRef.current = null;
      onPilih(null);
    }
  };

  return (
    <MapContainer
      bounds={BATAS_TITIK.pad(0.3)}
      minZoom={11}
      maxZoom={19}
      zoomControl={false}
      attributionControl
      scrollWheelZoom={!ringkas}
      zoomSnap={0.25}
      className={cn("size-full outline-none", gelap ? "bg-[#1a1006]" : "bg-mori-2")}
    >
      <TileLayer
        key={basemap}
        url={lapisan.url}
        attribution={lapisan.attribution}
        maxNativeZoom={lapisan.maxNativeZoom}
        maxZoom={19}
        subdomains={lapisan.subdomains ?? "abc"}
      />
      {basemap === "satelit" && (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
          maxNativeZoom={18}
          maxZoom={19}
          opacity={0.7}
        />
      )}
      <ScaleControl position="bottomleft" imperial={false} />
      <Siap onSiap={onSiap} />
      <Kamera siap={selesaiMuat} batas={batas} ringkas={ringkas} />
      <Pengarah terpilih={terpilih} penanda={penanda} batasDusun={batasDusun} bukaPopup={popup} />

      {/* 1. Penutup di luar batas desa */}
      {fokus && lubangDesa.length > 0 && (
        <Polygon
          className="peta-topeng"
          key={`topeng-${basemap}`}
          positions={[DUNIA, ...lubangDesa]}
          interactive={false}
          pathOptions={{
            stroke: false,
            fillColor: gelap ? "#140c04" : "#fdf8ee",
            fillOpacity: gelap ? 0.8 : 0.9,
          }}
        />
      )}

      {/* 2. Desa tetangga: garis tipis + nama */}
      {data?.tetangga.map((w) => (
        <Polygon
          className="peta-tetangga-garis"
          key={`${w.nama}-${basemap}-${fokus}`}
          positions={w.poligon}
          interactive={false}
          pathOptions={{
            color: gelap ? "#ffce99" : "#562f00",
            opacity: fokus ? 0.35 : 0.55,
            weight: 1,
            dashArray: "3 5",
            fill: false,
          }}
        >
          <Tooltip permanent direction="center" className={cn("peta-tetangga", gelap ? "peta-tetangga--terang" : "peta-tetangga--gelap")}>
            {w.nama.replace(/^Desa\/Kel\.\s*/, "")}
          </Tooltip>
        </Polygon>
      ))}

      {/* 3. Wilayah dusun (perkiraan) */}
      {tampilDusun &&
        areaDusun.map(({ w, d, i, id, warna }) => {
          const aktif = terpilih === id;
          const hover = sorot === id;
          return (
            <Polygon
              className={`peta-area peta-urut-${i}`}
              key={id}
              positions={w.poligon}
              pathOptions={{
                color: aktif ? "#fff" : "#fffaf0",
                weight: aktif ? 3.5 : hover ? 2.5 : 1.25,
                opacity: 0.95,
                fillColor: warna,
                fillOpacity: aktif ? 0.52 : hover ? 0.45 : gelap ? 0.3 : 0.38,
              }}
              eventHandlers={{
                click: () => pilih(id),
                mouseover: () => setSorot(id),
                mouseout: () => setSorot((s) => (s === id ? null : s)),
              }}
            >
              <Tooltip sticky direction="top" offset={[0, -8]} className="peta-tooltip">
                Dusun {d.nama} · klik untuk detail
              </Tooltip>
            </Polygon>
          );
        })}

      {/* 4. Garis batas desa: bayangan + garis putih yang "tergambar" */}
      {data?.desa && (
        <>
          <Polygon
            className="peta-garis-desa peta-garis-desa--bayang"
            positions={data.desa.poligon}
            interactive={false}
            pathOptions={{
              color: "#562f00",
              opacity: 0.85,
              weight: 8,
              fill: false,
              lineJoin: "round",
            }}
          />
          <Polygon
            className="peta-garis-desa"
            positions={data.desa.poligon}
            interactive={false}
            pathOptions={{
              color: "#ffce99",
              weight: 3,
              fill: false,
              lineJoin: "round",
            }}
          />
        </>
      )}

      {/* 5. Penanda */}
      <Marker position={[desaLerep.lat, desaLerep.lng]} icon={ikonDesa} ref={(m) => daftarkan("desa", m)} eventHandlers={{ click: () => pilih("desa"), popupclose: () => tutupPopup("desa") }}>
        <Tooltip direction="top" offset={[0, -14]} className="peta-tooltip">
          Titik tengah Desa Lerep
        </Tooltip>
        {popup && (
          <Popup className="peta-popup" maxWidth={300} autoPanPaddingTopLeft={[16, 64]} autoPanPaddingBottomRight={[64, 40]}>
            <div className="w-64">
              <span className="inline-flex rounded-full bg-ornamen px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-mori">
                Desa
              </span>
              <h3 className="mt-1.5 font-serif text-base font-bold text-ornamen">Desa Lerep</h3>
              <p className="text-[0.78rem] text-tinta">
                Kec. {desaLerep.kecamatan}, Kab. {desaLerep.kabupaten}, {desaLerep.provinsi}
              </p>
              <dl className="mt-2 divide-y divide-ornamen/10 border-y border-ornamen/10">
                <Baris label="Luas" isi={`${desaLerep.luasHa.toLocaleString("id-ID")} ha (RPJM Desa)`} />
                <Baris label="Ketinggian" isi={`${desaLerep.ketinggian} mdpl`} />
                <Baris label="Kode wilayah" isi={desaLerep.kodeWilayah} />
                <Baris label="Wilayah" isi={`${desaLerep.jumlahDusun} dusun · ${desaLerep.jumlahRw} RW`} />
                <Baris label="Garis batas" isi="Kemendagri 2020 (indikatif)" />
              </dl>
            </div>
          </Popup>
        )}
      </Marker>

      {tampilDusun &&
        dusunPeta.map((d, i) => {
          const id = `d:${d.id}`;
          const w = WARNA_DUSUN[i % WARNA_DUSUN.length];
          return (
            <Marker
              key={id}
              position={[d.lat, d.lng]}
              icon={ikonDusun(d, w, terpilih === id, i)}
              ref={(m) => daftarkan(id, m)}
              eventHandlers={{ click: () => pilih(id), popupclose: () => tutupPopup(id) }}
              zIndexOffset={terpilih === id ? 900 : 0}
              riseOnHover
            >
              {popup && (
                <Popup className="peta-popup" maxWidth={300} autoPanPaddingTopLeft={[16, 64]} autoPanPaddingBottomRight={[64, 40]}>
                  <IsiDusun d={d} warna={w} />
                </Popup>
              )}
            </Marker>
          );
        })}

      {daftar.map((t, i) => {
        const id = `t:${t.id}`;
        const aktif = terpilih === id;
        return (
          <Marker
            key={id}
            position={[t.lat, t.lng]}
            icon={ikonTitik(t, aktif, i + dusunPeta.length)}
            ref={(m) => daftarkan(id, m)}
            eventHandlers={{ click: () => pilih(id), popupclose: () => tutupPopup(id) }}
            zIndexOffset={aktif ? 1000 : 100}
            riseOnHover
          >
            <Tooltip direction="top" className="peta-tooltip">
              {t.nama}
            </Tooltip>
            {popup && (
              <Popup className="peta-popup" maxWidth={300} autoPanPaddingTopLeft={[16, 64]} autoPanPaddingBottomRight={[64, 40]}>
                <IsiTitik t={t} />
              </Popup>
            )}
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
      <CircleMarker
        center={[desaLerep.lat, desaLerep.lng]}
        radius={9}
        pathOptions={{
          color: "#fff",
          weight: 2,
          fillColor: "#b42318",
          fillOpacity: 0.9,
        }}
      />
    </MapContainer>
  );
}
