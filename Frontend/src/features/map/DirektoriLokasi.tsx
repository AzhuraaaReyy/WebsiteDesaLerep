import { ArrowUpRight, GraduationCap, Landmark, MapPin, Mountain, Stethoscope, Trees, type LucideIcon } from "lucide-react";
import { CARD } from "@/components/shared/Blocks";
import { KATEGORI, titikPeta, type KategoriTitik } from "@/data/peta-lerep";
import { cn } from "@/lib/utils";

const IKON: Record<KategoriTitik, LucideIcon> = {
  pemerintahan: Landmark,
  pendidikan: GraduationCap,
  kesehatan: Stethoscope,
  fasilitas_umum: Trees,
  wisata: Mountain,
};

/** Direktori lokasi resmi Desa Lerep (sumber: public/peta/desa-lerep.geojson). */
export function DirektoriLokasi() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {titikPeta.map((t) => {
        const k = KATEGORI[t.kategori];
        const Ikon = IKON[t.kategori];
        return (
          <li key={t.id} className={cn(CARD, "flex flex-col p-5 hover:-translate-y-1")}>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full text-white" style={{ background: k.warna }}>
                <Ikon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]" style={{ color: k.warna }}>
                  {k.label}
                </p>
                <h3 className="font-serif text-lg font-bold leading-snug text-sogan-900">{t.nama}</h3>
              </div>
            </div>
            {(t.alamat || t.catatan) && (
              <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-tinta/80">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-kunyit-600" aria-hidden="true" /> {t.alamat ?? t.catatan}
              </p>
            )}
            {t.kode && (
              <p className="mt-1 text-xs text-tinta/70">
                {t.kode.label}: <span className="font-semibold">{t.kode.nilai}</span>
              </p>
            )}
            <div className="min-h-4 flex-1" aria-hidden="true" />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border-2 border-sogan-900/70 bg-kunyit px-4 py-2 text-xs font-semibold text-white shadow-tombol transition-colors hover:bg-kunyit-600"
            >
              Petunjuk Arah <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only">(membuka Google Maps di tab baru)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
