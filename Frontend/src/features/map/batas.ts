import type { Feature, FeatureCollection, Geometry, Position } from "geojson";
import { URL_BATAS } from "@/data/peta-lerep";
import { asset } from "@/lib/asset";

export type LatLng = [number, number];
/** Satu wilayah: daftar poligon, tiap poligon = [cincin luar, ...lubang]. */
export type Wilayah = {
  nama: string;
  poligon: LatLng[][][];
  props: Record<string, unknown>;
};
export type DataBatas = {
  desa: Wilayah | null;
  dusun: Wilayah[];
  tetangga: Wilayah[];
};

const cincin = (r: Position[]): LatLng[] => r.map(([lng, lat]) => [lat, lng]);
const poligonDari = (g: Geometry): LatLng[][][] => {
  if (g.type === "Polygon") return [g.coordinates.map(cincin)];
  if (g.type === "MultiPolygon") return g.coordinates.map((p) => p.map(cincin));
  return [];
};
const wilayah = (f: Feature): Wilayah => ({
  nama: String(f.properties?.nama ?? ""),
  poligon: poligonDari(f.geometry),
  props: f.properties ?? {},
});

function urai(fc: FeatureCollection): DataBatas {
  const per = (k: string) => fc.features.filter((f) => f.properties?.kategori === k && f.geometry);
  const desa = per("batas_desa")[0];
  return {
    desa: desa ? wilayah(desa) : null,
    dusun: per("batas_dusun").map(wilayah),
    tetangga: per("desa_tetangga").map(wilayah),
  };
}

let janji: Promise<DataBatas> | null = null;
/** Memuat poligon batas desa, dusun (perkiraan), dan desa tetangga — sekali per halaman. */
export function muatBatas(): Promise<DataBatas> {
  janji ??= fetch(asset(URL_BATAS))
    .then((r) => {
      if (!r.ok) throw new Error(`Gagal memuat batas (${r.status})`);
      return r.json() as Promise<FeatureCollection>;
    })
    .then(urai)
    .catch((e) => {
      janji = null;
      throw e;
    });
  return janji;
}

/** Nama dusun tanpa awalan "Dusun ". */
export const namaDusun = (w: Wilayah) => w.nama.replace(/^dusun\s+/i, "");
