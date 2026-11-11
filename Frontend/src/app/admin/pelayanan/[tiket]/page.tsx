import { CircleCheck, CircleX, Eye, FileText, Image as ImageIcon, Lock, ShieldCheck, TriangleAlert } from "lucide-react";
import { delegations, requestDetail } from "@/data/admin-dummy";
import { DummyTag, PageHeader, Panel, StatusBadge, btn, requestStatus } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Detail Permohonan" };

export function generateStaticParams() {
  return [{ tiket: requestDetail.ticket }];
}

export default async function DetailPermohonanPage({ params }: { params: Promise<{ tiket: string }> }) {
  const { tiket } = await params;
  const r = { ...requestDetail, ticket: tiket || requestDetail.ticket };
  const mandat = delegations.find((d) => !d.revokedAt)!;
  return (
    <>
      <PageHeader
        eyebrow="Detail Permohonan"
        title={r.service}
        description={`Tiket ${r.ticket} · ${r.category} · diajukan ${r.submittedAt}`}
        crumbs={[{ label: "Permohonan Layanan", href: "/admin/pelayanan" }, { label: r.ticket }]}
        actions={
          <>
            <DummyTag />
            <StatusBadge {...requestStatus[r.status]} />
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <div className="grid gap-6">
          <Panel title="Data Pemohon">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {[
                ["Nama", r.applicant.name],
                ["NIK", r.applicant.nik],
                ["Telepon", r.applicant.phone],
                ["Email", r.applicant.email],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-tinta/60">{k}</dt>
                  <dd className="mt-0.5 flex items-center gap-2 font-medium text-sogan-900">
                    {v}
                    {k === "NIK" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-mori-2 px-2 py-0.5 text-[0.62rem] font-semibold text-tinta">
                        <Lock className="size-3" /> terenkripsi · tersamar
                      </span>
                    )}
                  </dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-tinta/60">Alamat</dt>
                <dd className="mt-0.5 font-medium text-sogan-900">{r.applicant.address}</dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Isian Formulir" description="Snapshot konfigurasi layanan saat pengajuan disimpan bersama permohonan">
            <dl className="divide-y divide-emas-soft/70 text-sm">
              {r.form.map((f) => (
                <div key={f.label} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between">
                  <dt className="text-tinta/70">{f.label}</dt>
                  <dd className="font-medium text-sogan-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel title="Dokumen Persyaratan" description="Disimpan di bucket privat · dibuka lewat signed URL 5 menit dan tercatat di audit log">
            <ul className="grid gap-3 sm:grid-cols-3">
              {r.documents.map((d) => (
                <li key={d.name} className="rounded-xl border border-emas-soft bg-mori p-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-sogan-900 text-mori">
                    {d.type === "PDF" ? <FileText className="size-4" /> : <ImageIcon className="size-4" />}
                  </span>
                  <p className="mt-2 truncate text-sm font-semibold text-sogan-900">{d.name}</p>
                  <p className="text-xs text-tinta/60">
                    {d.type} · {d.size}
                  </p>
                  <button type="button" className={cn(btn.outline, "mt-3 w-full py-1.5")}>
                    <Eye className="size-3.5" /> Pratinjau
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Riwayat Status" description="Append-only · catatan publik terlihat oleh pemohon di halaman pelacakan">
            <ol className="relative space-y-5 border-l-2 border-emas pl-6">
              {r.history.map((h) => (
                <li key={h.at} className="relative">
                  <span className="absolute -left-[1.95rem] top-0.5 size-3.5 rounded-full border-2 border-white bg-kunyit" aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge {...requestStatus[h.to]} />
                    <span className={cn("rounded-full px-2 py-0.5 text-[0.62rem] font-semibold", h.isPublic ? "bg-tosca/12 text-[#0d6b5f]" : "bg-mori-3/70 text-tinta")}>
                      {h.isPublic ? "Catatan publik" : "Internal"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-sogan-900">{h.note}</p>
                  <p className="text-xs text-tinta/60">
                    {h.at} · {h.by}
                  </p>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="grid content-start gap-6 xl:sticky xl:top-24">
          <Panel title="Keputusan Persetujuan" ornament>
            <div className="rounded-xl border border-[#0d6b5f]/30 bg-tosca/8 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#0d6b5f]">
                <ShieldCheck className="size-4" /> Mandat berlaku untuk layanan ini
              </p>
              <dl className="mt-3 grid gap-1.5 text-xs text-tinta">
                <div className="flex justify-between gap-3"><dt>Mandat</dt><dd className="font-semibold text-sogan-900">{mandat.id}</dd></div>
                <div className="flex justify-between gap-3"><dt>Pemberi</dt><dd className="text-right font-semibold text-sogan-900">{mandat.official} · {mandat.officialRole}</dd></div>
                <div className="flex justify-between gap-3"><dt>Dasar</dt><dd className="font-semibold text-sogan-900">Penunjukan langsung</dd></div>
                <div className="flex justify-between gap-3"><dt>Cakupan</dt><dd className="font-semibold text-sogan-900">{mandat.scope}</dd></div>
                <div className="flex justify-between gap-3"><dt>Tanda tangan scan</dt><dd className="font-semibold text-[#0d6b5f]">Diizinkan</dd></div>
              </dl>
            </div>

            <div className="mt-4 rounded-xl border border-emas-soft bg-mori p-3">
              <p className="text-xs font-semibold text-sogan-900">Pratinjau dokumen hasil</p>
              <div className="mt-2 flex items-center gap-3">
                <span className="grid h-14 w-11 place-items-center rounded-md border border-emas-soft bg-white text-[0.55rem] font-bold text-tinta/60">PDF</span>
                <div className="text-xs">
                  <p className="font-semibold text-sogan-900">SKU_{r.ticket}.pdf</p>
                  <p className="text-tinta/60">Dibuat dari templat · belum ditandatangani</p>
                </div>
              </div>
              <label className="mt-3 flex items-center gap-2 text-xs text-tinta">
                <input type="checkbox" defaultChecked className="size-4 accent-[var(--color-kunyit)]" /> Terapkan tanda tangan scan Kepala Desa
              </label>
            </div>

            <label className="mt-4 grid gap-1.5 text-xs font-semibold text-sogan-900">
              Catatan / alasan publik
              <textarea
                rows={3}
                placeholder="Wajib diisi bila menolak — akan terlihat oleh pemohon."
                className="rounded-xl border border-emas-soft bg-white p-3 text-sm font-normal placeholder:text-tinta/45 focus:border-kunyit focus:outline-none"
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" className={btn.danger}>
                <CircleX className="size-4" /> Tolak
              </button>
              <button type="button" className={btn.success}>
                <CircleCheck className="size-4" /> Setujui
              </button>
            </div>
            <p className="mt-3 flex gap-2 text-[0.7rem] leading-relaxed text-tinta/70">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-kunyit-600" />
              Sistem memverifikasi mandat saat keputusan diambil. Keputusan, status, riwayat, dan audit log ditulis dalam satu transaksi.
            </p>
          </Panel>

          <Panel title="Tindakan Lain">
            <div className="grid gap-2">
              <button type="button" className={btn.outline}>Minta perbaikan berkas</button>
              <button type="button" className={btn.outline}>Batalkan permohonan</button>
            </div>
            <label className="mt-4 grid gap-1.5 text-xs font-semibold text-sogan-900">
              Catatan internal
              <textarea rows={2} placeholder="Hanya terlihat oleh admin" className="rounded-xl border border-emas-soft bg-white p-3 text-sm font-normal placeholder:text-tinta/45 focus:border-kunyit focus:outline-none" />
            </label>
          </Panel>
        </div>
      </div>
    </>
  );
}
