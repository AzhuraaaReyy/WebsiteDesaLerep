import type { Metadata } from "next";
import { CheckCircle2, Clock, Wallet } from "lucide-react";
import { CARD, DummyNotice, OrnateCard, Section, StepNumber } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { alurPengajuan, layanan } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { ParticipationHub } from "@/features/participation/ParticipationHub";
import { GisaLayanan } from "@/features/services/GisaLayanan";
import { TrackingForm } from "@/features/services/TrackingForm";
import { cn } from "@/lib/utils";

const page = modulePages.pelayanan;
export const metadata: Metadata = { title: page.title, description: page.description };

const jenisStyle: Record<string, string> = {
  "Layanan langsung desa": "bg-sogan-900 text-mori",
  "Layanan fasilitasi desa": "bg-kunyit text-white",
  "Rujukan Disdukcapil": "bg-tosca text-white",
};

export default function PelayananPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section id="katalog" eyebrow={["Katalog", "Layanan Desa"]} title="Jenis Layanan" subtitle="Persyaratan, waktu penyelesaian, dan biaya setiap layanan." tone="tekstur">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {layanan.map((l) => (
            <article key={l.nama} className={cn(CARD, "flex flex-col hover:-translate-y-1")}>
              <div className="pita-batik h-2" aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <span className={cn("self-start rounded-full px-3 py-1 text-[0.68rem] font-semibold", jenisStyle[l.jenis])}>{l.jenis}</span>
                <h3 className="mt-3 font-serif text-lg font-bold text-sogan-900">{l.nama}</h3>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-kunyit-600">Persyaratan</p>
                <ul className="mt-2 space-y-1.5">
                  {l.syarat.map((s) => (
                    <li key={s} className="flex gap-2 text-sm text-tinta">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-tosca" /> {s}
                    </li>
                  ))}
                </ul>
                <div className="min-h-5 flex-1" aria-hidden="true" />
                <div className="flex items-center justify-between gap-3 border-t border-dashed border-emas pt-4 text-xs font-semibold text-sogan-900">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-kunyit-600" /> {l.waktu}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wallet className="size-3.5 text-kunyit-600" /> {l.biaya}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="ajukan"
        eyebrow={["Pengajuan", "Layanan"]}
        title="Ajukan Layanan Administrasi"
        subtitle="Lihat persyaratan resmi setiap layanan, siapkan berkas, lalu hubungi admin GisaLerep untuk mengurusnya sendiri tanpa perantara."
      >
        <GisaLayanan />

        <h3 className="mt-14 text-center font-serif text-2xl font-bold text-sogan-900">Alur Pengajuan Layanan</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {alurPengajuan.map((a, i) => (
            <li key={a.judul} className={cn(CARD, "p-5")}>
              <StepNumber n={i + 1} />
              <h3 className="mt-4 font-serif text-lg font-bold text-sogan-900">{a.judul}</h3>
              <p className="mt-1 text-sm text-tinta/85">{a.isi}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-center text-sm text-tinta/80">
          Formulir pengajuan online dengan unggah berkas akan dibuka setelah layanan dikonfirmasi pemerintah desa. Sementara itu,
          gunakan persyaratan dan kanal WhatsApp GisaLerep di atas.
        </p>
      </Section>

      <Section id="lacak" eyebrow={["Status", "Permohonan"]} title="Lacak Pengajuan" subtitle="Lacak permohonan, pengaduan, atau aspirasi dengan nomor tiket dan kode verifikasi yang Anda terima." tone="tekstur">
        <div className="mx-auto max-w-2xl">
          <OrnateCard>
            <TrackingForm />
          </OrnateCard>
        </div>
      </Section>

      <Section
        id="pengaduan"
        eyebrow={["Partisipasi", "Masyarakat"]}
        title="Pengaduan & Aspirasi"
        subtitle="Pilih jenis laporan yang ingin Anda sampaikan. Baca SOP terlebih dahulu, lalu isi formulir secara bertahap."
      >
        <ParticipationHub />
      </Section>
    </>
  );
}
