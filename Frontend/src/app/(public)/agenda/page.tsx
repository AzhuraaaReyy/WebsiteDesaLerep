import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { CardCorners } from "@/components/ornament/Ornaments";
import { CARD, DummyNotice, Section } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { agendaArsip, agendaList } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { cn } from "@/lib/utils";

const page = modulePages.agenda;
export const metadata: Metadata = { title: page.title, description: page.description };

const statusStyle = {
  "Akan datang": "bg-tosca text-white",
  Selesai: "bg-mori-3 text-sogan-900",
  Dibatalkan: "bg-[#b42318] text-white",
} as const;

export default function AgendaPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section id="mendatang" eyebrow={["Kalender", "Kegiatan"]} title="Agenda Mendatang" tone="tekstur">
        <div className="grid gap-5 md:grid-cols-2">
          {agendaList.map((a) => (
            <article key={a.judul} className={cn(CARD, "flex gap-5 p-5 hover:-translate-y-1 sm:p-6")}>
              <CardCorners />
              <time className="grid h-20 w-16 shrink-0 place-items-center rounded-xl bg-sogan-900 text-center text-mori shadow-md">
                <span>
                  <span className="block text-2xl font-bold leading-none">{a.tanggal}</span>
                  <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-kunyit-soft">{a.bulan}</span>
                  <span className="block text-[0.6rem] text-mori/70">{a.tahun}</span>
                </span>
              </time>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-kunyit-600">{a.kategori}</span>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold", statusStyle[a.status])}>{a.status}</span>
                </div>
                <h3 className="mt-1.5 font-serif text-lg font-bold text-sogan-900">{a.judul}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-tinta/80">
                  <Clock className="size-3.5 text-kunyit-600" /> {a.waktu}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-tinta/80">
                  <MapPin className="size-3.5 text-kunyit-600" /> {a.lokasi}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="arsip" eyebrow={["Dokumentasi", "Kegiatan"]} title="Arsip Kegiatan">
        <div className={cn(CARD, "overflow-x-auto")}>
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-sogan-900 text-mori">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Tanggal</th>
                <th scope="col" className="px-5 py-3 font-semibold">Kegiatan</th>
                <th scope="col" className="px-5 py-3 font-semibold">Lokasi</th>
                <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emas-soft">
              {agendaArsip.map((a) => (
                <tr key={a.judul} className="hover:bg-mori-2">
                  <td className="px-5 py-3 whitespace-nowrap text-tinta/80">{a.tanggal}</td>
                  <th scope="row" className="px-5 py-3 font-semibold text-sogan-900">{a.judul}</th>
                  <td className="px-5 py-3 text-tinta/80">{a.lokasi}</td>
                  <td className="px-5 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold", statusStyle[a.status])}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
