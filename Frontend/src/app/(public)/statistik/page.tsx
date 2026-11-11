import type { Metadata } from "next";
import { BarList, CARD, DummyNotice, Section, StatTile, formatAngka } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { statistik } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { cn } from "@/lib/utils";

const page = modulePages.statistik;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function StatistikPage() {
  const total = statistik.perDusun.reduce(
    (a, d) => ({ kk: a.kk + d.kk, l: a.l + d.l, p: a.p + d.p }),
    { kk: 0, l: 0, p: 0 },
  );
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />

      <Section
        id="ringkasan"
        eyebrow={["Data Agregat", "Kependudukan"]}
        title="Ringkasan Penduduk"
        subtitle={`Periode ${statistik.periode}. Hanya data agregat — tanpa NIK, nomor KK, atau identitas pribadi warga.`}
        tone="tekstur"
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statistik.ringkasan.map((r, i) => (
            <StatTile key={r.label} label={r.label} value={formatAngka(r.nilai)} note={r.satuan} accent={i === 0} />
          ))}
        </div>
      </Section>

      <Section id="umur" eyebrow={["Sebaran", "Usia Warga"]} title="Kelompok Umur">
        <div className="mx-auto max-w-3xl">
          <BarList title="Penduduk berdasarkan kelompok umur (tahun)" data={statistik.umur} unit="jiwa" />
        </div>
      </Section>

      <Section id="pendidikan" eyebrow={["Sumber Daya", "Manusia"]} title="Pendidikan & Pekerjaan" tone="tekstur">
        <div className="grid gap-6 lg:grid-cols-2">
          <BarList title="Tingkat pendidikan terakhir" data={statistik.pendidikan} unit="jiwa" />
          <BarList title="Mata pencaharian" data={statistik.pekerjaan} unit="jiwa" />
        </div>
      </Section>

      <Section id="dusun" eyebrow={["Persebaran", "Per Wilayah"]} title="Penduduk per Dusun">
        <div className={cn(CARD, "overflow-x-auto")}>
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">Jumlah kepala keluarga dan penduduk per dusun</caption>
            <thead className="bg-sogan-900 text-mori">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Dusun</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">KK</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Laki-laki</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Perempuan</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emas-soft">
              {statistik.perDusun.map((d) => (
                <tr key={d.dusun} className="transition-colors hover:bg-mori-2">
                  <th scope="row" className="px-5 py-3 font-semibold text-sogan-900">{d.dusun}</th>
                  <td className="px-5 py-3 text-right tabular-nums">{formatAngka(d.kk)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatAngka(d.l)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatAngka(d.p)}</td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums text-sogan-900">{formatAngka(d.l + d.p)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-mori-2 font-semibold text-sogan-900">
              <tr>
                <th scope="row" className="px-5 py-3">Total</th>
                <td className="px-5 py-3 text-right tabular-nums">{formatAngka(total.kk)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatAngka(total.l)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatAngka(total.p)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatAngka(total.l + total.p)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>
    </>
  );
}
