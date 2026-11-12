/**
 * Data Peta Desa Lerep — dikonversi apa adanya dari public/peta/desa-lerep.geojson
 * (titik dari Google Maps/Google Places, dicocokkan dengan data resmi desa, Kemendikdasmen, Pemkab; diperbarui 10 November 2026).
 * Belum ada poligon batas resmi desa/dusun: peta hanya menampilkan titik. Bila file batas (GeoJSON Polygon) tersedia,
 * isi `batasDesa`/`batasDusun` di bawah dan peta otomatis menggambarnya.
 */
import type { Feature, FeatureCollection } from "geojson";

export type KategoriTitik = "pemerintahan" | "pendidikan" | "kesehatan" | "fasilitas_umum" | "wisata";

export type TitikPeta = {
  id: string;
  nama: string;
  kategori: KategoriTitik;
  lat: number;
  lng: number;
  alamat?: string;
  jenis?: string;
  status?: string;
  catatan?: string;
  kode?: { label: string; nilai: string };
  sumber: string;
};

export type DusunPeta = {
  id: string;
  nama: string;
  lat: number;
  lng: number;
  luasHa: number;
  jenis: string;
  penanda?: string;
  catatan?: string;
  sumber: string;
};

export const desaLerep = {
  "nama": "Desa Lerep",
  "lat": -7.1377093,
  "lng": 110.3755648,
  "kecamatan": "Ungaran Barat",
  "kabupaten": "Semarang",
  "provinsi": "Jawa Tengah",
  "kodeWilayah": "33.22.18.2004",
  "kodePos": "50519",
  "luasHa": 682.32,
  "ketinggian": "310-940",
  "jumlahDusun": 8,
  "jumlahRw": 10,
  "jumlahRt": "65-72 (berbeda antar sumber; 68 menurut data 2024-2025)",
  "batas": {
    "utara": "Kel. Bandarjo (Ungaran Barat) dan Kel. Sumur Rejo (Gunungpati, Kota Semarang)",
    "timur": "Desa Nyatnyono dan Kel. Ungaran",
    "selatan": "Perhutani (Hutan Lindung Lereng Gunung Ungaran) dan Desa Nyatnyono",
    "barat": "Desa Keji dan Desa Kalisidi"
  },
  "sumber": "Google Maps (administrative_area_level_4); data atribut: RPJM Desa Lerep, BPS",
  "diperbarui": "10 November 2026"
} as const;

export const dusunPeta: DusunPeta[] = [
  {
    "id": "indrokilo",
    "nama": "Indrokilo",
    "lat": -7.1417359,
    "lng": 110.3723512,
    "luasHa": 119.42,
    "jenis": "Titik penanda dusun",
    "penanda": "Kampung Sapi Indrokilo, RT 03 RW 01",
    "catatan": "Dusun tertinggi di Desa Lerep",
    "sumber": "Google Maps"
  },
  {
    "id": "lerep",
    "nama": "Lerep",
    "lat": -7.134968,
    "lng": 110.3818058,
    "luasHa": 161.22,
    "jenis": "Titik penanda dusun",
    "penanda": "Desa Wisata Lerep, RT 02 RW 02",
    "sumber": "Google Maps"
  },
  {
    "id": "soka",
    "nama": "Soka",
    "lat": -7.1254463,
    "lng": 110.3918941,
    "luasHa": 108.56,
    "jenis": "Titik penanda dusun",
    "penanda": "Lapangan Desa Lerep (alamat Google: Dusun Soka)",
    "sumber": "Google Maps"
  },
  {
    "id": "tegalrejo",
    "nama": "Tegalrejo",
    "lat": -7.1221482,
    "lng": 110.3956731,
    "luasHa": 54.28,
    "jenis": "Titik tengah dusun (wilayah administratif Google)",
    "sumber": "Google Maps (administrative_area_level_5)"
  },
  {
    "id": "lorog",
    "nama": "Lorog",
    "lat": -7.1183152,
    "lng": 110.3940204,
    "luasHa": 59.71,
    "jenis": "Titik penanda dusun",
    "penanda": "Dsn. Lorog, Jl. Ismaya Raya No. 75, RW 06",
    "sumber": "Google Maps"
  },
  {
    "id": "karangbolo",
    "nama": "Karangbolo",
    "lat": -7.1258703,
    "lng": 110.3993176,
    "luasHa": 32.57,
    "jenis": "Titik penanda dusun",
    "penanda": "Dusun Karangbolo (Google Maps)",
    "catatan": "Sentra oleh-oleh (keripik tempe, rempeyek)",
    "sumber": "Google Maps"
  },
  {
    "id": "kretek",
    "nama": "Kretek",
    "lat": -7.1224897,
    "lng": 110.3999453,
    "luasHa": 65.14,
    "jenis": "Titik penanda dusun",
    "penanda": "Gapura Selamat Datang Kretek Kampung Lele",
    "catatan": "Dusun terendah di Desa Lerep",
    "sumber": "Google Maps"
  },
  {
    "id": "mapagan",
    "nama": "Mapagan",
    "lat": -7.1143753,
    "lng": 110.3986522,
    "luasHa": 81.42,
    "jenis": "Titik tengah dusun (wilayah administratif Google)",
    "sumber": "Google Maps (administrative_area_level_5)"
  }
];

export const titikPeta: TitikPeta[] = [
  {
    "id": "balai-desa-lerep",
    "nama": "Balai Desa Lerep",
    "kategori": "pemerintahan",
    "lat": -7.1260119,
    "lng": 110.3918214,
    "alamat": "Jl. Kalimasada Raya No. 157, Lerep Satu",
    "sumber": "Google Maps",
    "kode": {
      "label": "Plus Code",
      "nilai": "V9FR+HPW"
    }
  },
  {
    "id": "kantor-kecamatan-ungaran-barat",
    "nama": "Kantor Kecamatan Ungaran Barat",
    "kategori": "pemerintahan",
    "lat": -7.129531,
    "lng": 110.3864296,
    "catatan": "Lerep adalah ibu kota Kecamatan Ungaran Barat",
    "sumber": "Google Maps",
    "kode": {
      "label": "Plus Code",
      "nilai": "V9CP+5HM"
    }
  },
  {
    "id": "puskesmas-lerep",
    "nama": "Puskesmas Lerep",
    "kategori": "kesehatan",
    "lat": -7.1146352,
    "lng": 110.3971639,
    "alamat": "Jl. Yudistira Raya KM 3, Mapagan",
    "jenis": "Puskesmas Rawat Jalan, Puskesmas Pedesaan",
    "sumber": "Google Maps; Pemkab Semarang"
  },
  {
    "id": "sd-negeri-lerep-01",
    "nama": "SD Negeri Lerep 01",
    "kategori": "pendidikan",
    "lat": -7.1294864,
    "lng": 110.3888175,
    "alamat": "Jl. Srikandi Raya No. 2",
    "sumber": "Google Maps; Kemendikdasmen",
    "kode": {
      "label": "NPSN",
      "nilai": "20320201"
    }
  },
  {
    "id": "sd-negeri-lerep-02",
    "nama": "SD Negeri Lerep 02",
    "kategori": "pendidikan",
    "lat": -7.1260867,
    "lng": 110.3915899,
    "alamat": "Jl. Kalimasada No. 08",
    "sumber": "Google Maps; Kemendikdasmen",
    "kode": {
      "label": "NPSN",
      "nilai": "20320200"
    }
  },
  {
    "id": "sd-negeri-lerep-05",
    "nama": "SD Negeri Lerep 05",
    "kategori": "pendidikan",
    "lat": -7.1227874,
    "lng": 110.393326,
    "alamat": "Jl. Ismaya Raya No. 19",
    "sumber": "Google Maps; Kemendikdasmen",
    "kode": {
      "label": "NPSN",
      "nilai": "20320198"
    }
  },
  {
    "id": "sd-negeri-lerep-06",
    "nama": "SD Negeri Lerep 06",
    "kategori": "pendidikan",
    "lat": -7.1155516,
    "lng": 110.3971296,
    "alamat": "Jl. Bima Raya, Mapagan",
    "sumber": "Google Maps; Kemendikdasmen",
    "kode": {
      "label": "NPSN",
      "nilai": "20320197"
    }
  },
  {
    "id": "smp-negeri-6-ungaran",
    "nama": "SMP Negeri 6 Ungaran (Satu Atap)",
    "kategori": "pendidikan",
    "lat": -7.1339492,
    "lng": 110.3812483,
    "alamat": "Desa Lerep RT 02 RW 02",
    "sumber": "Google Maps; Kemendikdasmen",
    "kode": {
      "label": "NPSN",
      "nilai": "20339207"
    }
  },
  {
    "id": "smp-alam-ungaran",
    "nama": "SMP Alam Ungaran",
    "kategori": "pendidikan",
    "lat": -7.1210522,
    "lng": 110.3895875,
    "alamat": "Dusun Lorog, RT 02 RW 06",
    "status": "Swasta",
    "sumber": "Google Maps"
  },
  {
    "id": "lapangan-desa-lerep",
    "nama": "Lapangan Desa Lerep",
    "kategori": "fasilitas_umum",
    "lat": -7.1254463,
    "lng": 110.3918941,
    "catatan": "Di depan Balai Desa",
    "sumber": "Google Maps"
  },
  {
    "id": "embung-lerep",
    "nama": "Embung Lerep (Embung Sebligo)",
    "kategori": "fasilitas_umum",
    "lat": -7.1392196,
    "lng": 110.3792753,
    "catatan": "Embung untuk pengairan sentra durian; lokasi pasar kuliner Minggu Pon",
    "sumber": "Google Maps (Wisata Embung Lerep)"
  },
  {
    "id": "desa-wisata-lerep",
    "nama": "Desa Wisata Lerep",
    "kategori": "wisata",
    "lat": -7.134968,
    "lng": 110.3818058,
    "alamat": "RT 02 RW 02, Dusun Lerep",
    "sumber": "Google Maps"
  }
];

/** Poligon batas resmi (belum tersedia). Format: GeoJSON Polygon/MultiPolygon, koordinat [lng, lat]. */
export const batasDesa: Feature | null = null;
export const batasDusun: FeatureCollection | null = null;

/** Warna & ikon kategori (ikon = SVG Lucide, dipakai pada penanda peta). */
export const KATEGORI: Record<KategoriTitik, { label: string; warna: string; ikon: string }> = {
  pemerintahan: { label: "Pemerintahan", warna: "#9a2c1b", ikon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 18v-7\"></path><path d=\"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z\"></path><path d=\"M14 18v-7\"></path><path d=\"M18 18v-7\"></path><path d=\"M3 22h18\"></path><path d=\"M6 18v-7\"></path></svg>" },
  pendidikan: { label: "Pendidikan", warna: "#d0680f", ikon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z\"></path><path d=\"M22 10v6\"></path><path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\"></path></svg>" },
  kesehatan: { label: "Kesehatan", warna: "#0d6b5f", ikon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11 2v2\"></path><path d=\"M5 2v2\"></path><path d=\"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1\"></path><path d=\"M8 15a6 6 0 0 0 12 0v-3\"></path><circle cx=\"20\" cy=\"10\" r=\"2\"></circle></svg>" },
  fasilitas_umum: { label: "Fasilitas Umum", warna: "#6b4fa0", ikon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z\"></path><path d=\"M7 16v6\"></path><path d=\"M13 19v3\"></path><path d=\"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5\"></path></svg>" },
  wisata: { label: "Wisata", warna: "#b07415", ikon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m8 3 4 8 5-5 5 15H2L8 3z\"></path></svg>" },
};

export const IKON_DUSUN = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"></path><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path></svg>";
export const IKON_DESA = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.25\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"></path></svg>";

/** Warna penanda tiap dusun (urutan sama dengan dusunPeta). */
export const WARNA_DUSUN = ["#2f6f9f", "#c2571a", "#2aa594", "#8e5bb5", "#b0802a", "#4f8a3b", "#c0467a", "#5a6fc0"];
