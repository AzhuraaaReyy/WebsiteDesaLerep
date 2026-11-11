import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { contentRows } from "@/data/admin-dummy";
import { ContentTable } from "@/features/admin/ContentTable";
import { DummyTag, PageHeader, Panel } from "@/features/admin/ui";

/** Modul konten berpola sama (daftar + lifecycle status) dan modul yang belum dirancang detail. */
const contentModules: Record<string, { title: string; eyebrow: string; desc: string; newLabel: string; meta: string }> = {
  pengumuman: { title: "Pengumuman", eyebrow: "Konten", desc: "Label Informasi/Penting/Darurat, jadwal tayang, kedaluwarsa, dan target wilayah.", newLabel: "Buat Pengumuman", meta: "Label · Target" },
  agenda: { title: "Agenda", eyebrow: "Konten", desc: "Jadwal kegiatan, lokasi, status kegiatan, dan tautan pendaftaran eksternal.", newLabel: "Tambah Agenda", meta: "Jadwal" },
  potensi: { title: "Potensi & UMKM", eyebrow: "Konten", desc: "Potensi wisata, kuliner, budaya, pertanian, SDA, dan katalog UMKM sederhana.", newLabel: "Tambah Potensi", meta: "Kategori" },
  galeri: { title: "Galeri Media", eyebrow: "Konten", desc: "Album foto & video (YouTube embed) yang dapat dipakai ulang di berita, agenda, dan potensi.", newLabel: "Buat Album", meta: "Isi" },
  dokumen: { title: "Dokumen Publik", eyebrow: "Data Desa", desc: "Unggah PDF resmi (APBDes, RKP, RPJM, Perdes). Hanya dokumen publik yang tampil di situs.", newLabel: "Unggah PDF", meta: "Kategori · Ukuran" },
  fasilitas: { title: "Peta & Fasilitas", eyebrow: "Data Desa", desc: "Direktori fasilitas umum beserta koordinat latitude/longitude untuk peta Leaflet.", newLabel: "Tambah Fasilitas", meta: "Kategori · Koordinat" },
};

const plannedModules: Record<string, { title: string; eyebrow: string; desc: string; features: string[] }> = {
  aspirasi: { title: "Aspirasi", eyebrow: "Pelayanan · P1", desc: "Usulan dan gagasan warga dengan nomor tiket & kode verifikasi.", features: ["Daftar aspirasi per kategori", "Status & tanggapan admin", "Riwayat status"] },
  polling: { title: "Polling", eyebrow: "Konten · P1", desc: "Polling warga dengan batas waktu dan hasil grafik.", features: ["Buat pertanyaan & pilihan", "Draft → Published → Closed → Archived", "Grafik hasil"] },
  profil: { title: "Profil Desa", eyebrow: "Data Desa", desc: "Sejarah, visi misi, wilayah, dusun, perangkat desa, dan lembaga.", features: ["Editor profil + versi", "Perangkat & struktur organisasi", "Daftar dusun & kepala dusun"] },
  statistik: { title: "Statistik", eyebrow: "Data Desa", desc: "Data kependudukan agregat per periode.", features: ["Input manual per indikator", "Impor CSV (P1)", "Periode & pratinjau grafik"] },
  transparansi: { title: "Transparansi", eyebrow: "Data Desa", desc: "APBDes, realisasi, Dana Desa, dan monitoring pembangunan.", features: ["Input anggaran per bidang", "Impor Excel/CSV dengan validasi", "Update progres pembangunan"] },
  analytics: { title: "Analytics", eyebrow: "Situs", desc: "Ringkasan GA4 & Search Console — tidak tampil di halaman publik.", features: ["Pengunjung & page views", "Halaman populer", "Sumber trafik & perangkat"] },
  pengaturan: { title: "Pengaturan", eyebrow: "Situs", desc: "Identitas situs, kontak resmi, dan tautan media sosial.", features: ["Kontak & jam pelayanan", "Tautan media sosial", "Metadata SEO bawaan"] },
};

export function generateStaticParams() {
  return [...Object.keys(contentModules), ...Object.keys(plannedModules)].map((modul) => ({ modul }));
}

export default async function ModulPage({ params }: { params: Promise<{ modul: string }> }) {
  const { modul } = await params;
  const c = contentModules[modul];
  if (c) {
    return <ContentTable eyebrow={c.eyebrow} title={c.title} description={c.desc} newLabel={c.newLabel} columnMeta={c.meta} rows={contentRows[modul] ?? []} />;
  }
  const p = plannedModules[modul];
  if (!p) notFound();
  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.desc} crumbs={[{ label: p.title }]} actions={<DummyTag />} />
      <Panel title="Rancangan modul" ornament>
        <ul className="grid gap-3 sm:grid-cols-3">
          {p.features.map((f) => (
            <li key={f} className="rounded-xl border border-emas-soft bg-mori p-4 text-sm font-semibold text-sogan-900">
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-kunyit-soft/60 px-3 py-1 text-xs font-semibold text-sogan-900">
          <Clock className="size-3.5" /> Layar detail menyusul
        </p>
      </Panel>
    </>
  );
}
