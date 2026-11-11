import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { CARD, DummyNotice, GroupedBars, OrnateCard, Section, StatTile, formatRupiah } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { apbdes, danaDesa, dokumen, pembangunan } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { cn } from "@/lib/utils";

const page = modulePages.transparansi;
export const metadata: Metadata = { title: page.title, description: page.description };

const statusStyle: Record<string, string> = {
  Selesai: "bg-tosca text-white",
  Berjalan: "bg-kunyit text-white",
  Direncanakan: "bg-mori-3 text-sogan-900",
  Tersalur: "bg-tosca text-white",
  Proses: "bg-kunyit text-white",
};

export default function TransparansiPage() {
  const perencanaan = dokumen.filter((d) => d.kategori === "Perencanaan");
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section
        id="apbdes"
        eyebrow={["Anggaran Pendapatan", "& Belanja Desa"]}
        title={`APBDes ${apbdes.tahun}`}
        subtitle="Ringkasan anggaran dan realisasi. Angka resmi hanya ditampilkan bila bersumber dari dokumen APBDes."
        tone="tekstur"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {apbdes.ringkasan.map((r, i) => (
            <StatTile
              key={r.label}
              label={r.label}
              value={formatRupiah(r.anggaran, true)}
              note={`Realisasi ${formatRupiah(r.realisasi, true)} · ${Math.round((r.realisasi / r.anggaran) * 100)}%`}
              accent={i === 0}
            />
          ))}
        </div>
        <div className="mt-8">
          <GroupedBars title="Belanja per bidang" data={apbdes.perBidang} />
        </div>
      </Section>

      <Section id="perencanaan" eyebrow={["Dokumen", "Perencanaan"]} title="RPJM & RKP Desa">
        <div className="grid gap-5 md:grid-cols-2">
          {perencanaan.map((d) => (
            <OrnateCard key={d.judul}>
              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sogan-900 text-mori">
                  <FileText className="size-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-sogan-900">{d.judul}</h3>
                  <p className="mt-1 text-xs text-tinta/70">
                    PDF · {d.ukuran} · Terbit {d.tanggal}
                  </p>
                  <Link href="/dokumen" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-kunyit-600 hover:text-sogan">
                    Lihat di Pusat Dokumen <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </OrnateCard>
          ))}
        </div>
      </Section>

      <Section id="dana-desa" eyebrow={["Transfer", "Pemerintah Pusat"]} title="Dana Desa" tone="tekstur">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className={cn(CARD, "bg-sogan-900 p-7 text-mori")}>
            <p className="text-xs font-semibold uppercase tracking-wider text-kunyit-soft">Pagu Dana Desa {apbdes.tahun}</p>
            <p className="mt-2 font-serif text-4xl font-bold">{formatRupiah(danaDesa.pagu, true)}</p>
            <p className="mt-6 text-sm font-semibold text-kunyit-soft">Fokus penggunaan</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {danaDesa.prioritas.map((p) => (
                <li key={p} className="rounded-full border border-mori/25 px-3 py-1 text-xs">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <OrnateCard>
            <h3 className="font-serif text-xl font-bold text-sogan-900">Penyaluran per tahap</h3>
            <ul className="mt-4 divide-y divide-emas-soft">
              {danaDesa.tersalur.map((t) => (
                <li key={t.tahap} className="flex items-center justify-between gap-4 py-3.5">
                  <span>
                    <span className="block font-semibold text-sogan-900">{t.tahap}</span>
                    <span className="block text-sm tabular-nums text-tinta/80">{formatRupiah(t.nilai)}</span>
                  </span>
                  <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", statusStyle[t.status])}>{t.status}</span>
                </li>
              ))}
            </ul>
          </OrnateCard>
        </div>
      </Section>

      <Section id="pembangunan" eyebrow={["Monitoring", "Pembangunan"]} title="Program Pembangunan">
        <div className="grid gap-5 md:grid-cols-2">
          {pembangunan.map((p) => (
            <article key={p.nama} className={cn(CARD, "p-6 hover:-translate-y-1")}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg font-bold text-sogan-900">{p.nama}</h3>
                <span className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-semibold", statusStyle[p.status])}>{p.status}</span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-tinta/80">
                <MapPin className="size-3.5 text-kunyit-600" /> {p.lokasi} · {formatRupiah(p.anggaran, true)}
              </p>
              <div className="mt-5">
                <div className="flex justify-between text-xs font-semibold text-sogan-900">
                  <span>Progres fisik</span>
                  <span className="tabular-nums">{p.progres}%</span>
                </div>
                <div
                  className="mt-1.5 h-2.5 rounded-full bg-mori-3/60"
                  role="progressbar"
                  aria-valuenow={p.progres}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Progres ${p.nama}`}
                >
                  <div className="h-full rounded-full bg-grafik-1" style={{ width: `${p.progres}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
