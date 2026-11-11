import Link from "next/link";
import { ArrowRight, FileCheck2, Megaphone, Newspaper, Plus, ShieldCheck, Signature, Upload } from "lucide-react";
import { auditLogs, delegations, kpi, serviceRequests, visitorTrend } from "@/data/admin-dummy";
import { DummyTag, PageHeader, Panel, StatusBadge, btn, requestStatus, td, th } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Ringkasan" };

const toneTile = {
  kunyit: "bg-kunyit text-white",
  sogan: "bg-sogan-900 text-mori",
  merah: "bg-[#b42318] text-white",
  tosca: "bg-[#0d6b5f] text-white",
};
const tileIcon = { kunyit: FileCheck2, sogan: Signature, merah: Megaphone, tosca: Newspaper };

export default function AdminHome() {
  const antrean = serviceRequests.filter((r) => ["pending_verification", "pending_approval", "needs_revision", "verified"].includes(r.status));
  const mandat = delegations.find((d) => !d.revokedAt)!;
  const maxV = Math.max(...visitorTrend.map((v) => v.nilai));
  return (
    <>
      <PageHeader
        eyebrow="Sugeng Rawuh"
        title="Selamat pagi, Dwi"
        description="Ringkasan pelayanan, konten, dan aktivitas Desa Lerep hari ini — Selasa, 10 November 2026."
        actions={
          <>
            <DummyTag />
            <Link href="/admin/berita/baru" className={btn.outline}>
              <Plus className="size-4" /> Tulis Berita
            </Link>
            <Link href="/admin/dokumen" className={btn.primary}>
              <Upload className="size-4" /> Unggah Dokumen
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpi.map((k) => {
          const Icon = tileIcon[k.tone];
          return (
            <Link
              key={k.label}
              href={k.href}
              className="group relative overflow-hidden rounded-2xl border border-emas-soft bg-white/70 p-5 shadow-kartu transition hover:-translate-y-0.5 hover:border-emas"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-tinta/75">{k.label}</p>
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", toneTile[k.tone])}>
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 font-serif text-4xl font-bold text-sogan-900">{k.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-tinta/70">
                {k.note} <ArrowRight className="size-3 opacity-0 transition group-hover:opacity-100" />
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel
          title="Antrean Permohonan"
          description="Permohonan yang perlu ditindaklanjuti"
          actions={
            <Link href="/admin/pelayanan" className="inline-flex items-center gap-1 text-xs font-semibold text-kunyit-600 hover:text-sogan">
              Semua permohonan <ArrowRight className="size-3.5" />
            </Link>
          }
          bodyClassName="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead className="bg-mori-2/70">
                <tr>
                  <th className={th}>Tiket</th>
                  <th className={th}>Layanan</th>
                  <th className={th}>Pemohon</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emas-soft/70">
                {antrean.map((r) => (
                  <tr key={r.ticket} className="hover:bg-mori-2/50">
                    <td className={cn(td, "whitespace-nowrap font-mono text-xs font-semibold text-sogan-900")}>
                      <Link href="/admin/pelayanan/detail" className="hover:text-kunyit-600">
                        {r.ticket}
                      </Link>
                    </td>
                    <td className={td}>
                      <span className="block font-medium text-sogan-900">{r.service}</span>
                      <span className="block text-xs text-tinta/60">{r.submittedAt}</span>
                    </td>
                    <td className={cn(td, "text-tinta")}>{r.applicant}</td>
                    <td className={td}>
                      <StatusBadge {...requestStatus[r.status]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="grid gap-6">
          <Panel title="Mandat Persetujuan Anda">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#0d6b5f] text-white">
                <ShieldCheck className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-sogan-900">
                  {mandat.id} · <span className="text-[#0d6b5f]">Berlaku</span>
                </p>
                <p className="mt-0.5 text-tinta/80">
                  Ditunjuk langsung oleh <strong className="font-semibold text-sogan-900">{mandat.official}</strong> ({mandat.officialRole}) sejak{" "}
                  {mandat.validFrom}.
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem] font-semibold">
                  <li className="rounded-full bg-mori-2 px-2.5 py-1 text-sogan-900">{mandat.scope}</li>
                  <li className="rounded-full bg-mori-2 px-2.5 py-1 text-sogan-900">Tanda tangan scan: diizinkan</li>
                  <li className="rounded-full bg-mori-2 px-2.5 py-1 text-sogan-900">Berlaku sampai dicabut</li>
                </ul>
              </div>
            </div>
            <Link href="/admin/mandat" className={cn(btn.outline, "mt-4 w-full")}>
              Kelola mandat
            </Link>
          </Panel>

          <Panel title="Pengunjung 7 hari" description="Sumber: Google Analytics 4 (contoh)">
            <figure>
              <div className="flex h-32 items-end gap-2" role="img" aria-label="Grafik pengunjung harian 4–10 November">
                {visitorTrend.map((v) => (
                  <div key={v.label} className="group relative flex h-full flex-1 flex-col items-center justify-end" title={`${v.label}: ${v.nilai} pengunjung`}>
                    <span className="mb-1 text-[0.62rem] font-semibold tabular-nums text-tinta opacity-0 transition group-hover:opacity-100">{v.nilai}</span>
                    <span className="w-full rounded-t-[4px] bg-grafik-2 transition group-hover:opacity-80" style={{ height: `${(v.nilai / maxV) * 100}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex gap-2 text-center text-[0.62rem] text-tinta/60">
                {visitorTrend.map((v) => (
                  <span key={v.label} className="flex-1">{v.label}</span>
                ))}
              </div>
              <figcaption className="mt-3 text-xs text-tinta/80">
                <strong className="font-semibold text-sogan-900">3.002</strong> pengunjung · puncak 8 Nov (Pasar Jajanan Ndeso)
              </figcaption>
            </figure>
          </Panel>
        </div>
      </div>

      <Panel
        className="mt-6"
        title="Aktivitas Terbaru"
        description="Diambil dari audit log aplikasi"
        actions={
          <Link href="/admin/audit" className="inline-flex items-center gap-1 text-xs font-semibold text-kunyit-600 hover:text-sogan">
            Buka audit log <ArrowRight className="size-3.5" />
          </Link>
        }
      >
        <ol className="relative space-y-4 border-l-2 border-emas-soft pl-6">
          {auditLogs.slice(0, 5).map((a) => (
            <li key={a.at + a.action} className="relative">
              <span className="absolute -left-[1.95rem] top-1 size-3.5 rounded-full border-2 border-white bg-kunyit" aria-hidden="true" />
              <p className="text-sm text-sogan-900">{a.desc}</p>
              <p className="mt-0.5 text-xs text-tinta/60">
                {a.at} · {a.user} · <code className="rounded bg-mori-2 px-1 py-0.5 text-[0.68rem]">{a.action}</code>
              </p>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
