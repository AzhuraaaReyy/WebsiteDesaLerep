import { Eye, Lock, MessageSquareReply } from "lucide-react";
import { complaints, type ComplaintStatus } from "@/data/admin-dummy";
import { DummyTag, FilterTabs, PageHeader, Panel, StatusBadge, btn, complaintStatus, td, th } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Pengaduan" };

const order: ComplaintStatus[] = ["submitted", "under_review", "in_progress", "resolved", "rejected", "closed"];

export default function PengaduanAdminPage() {
  const sel = complaints[1];
  return (
    <>
      <PageHeader
        eyebrow="Pelayanan Publik"
        title="Pengaduan Masyarakat"
        description="Pengaduan bersifat privat — hanya pelapor dan petugas berwenang yang dapat melihat isinya. Pelapor hanya melihat tanggapan publik."
        crumbs={[{ label: "Pengaduan" }]}
        actions={<DummyTag />}
      />
      <div className="grid gap-6 2xl:grid-cols-[1.4fr_1fr]">
        <Panel bodyClassName="p-0">
          <div className="border-b border-emas-soft/70 p-4">
            <FilterTabs
              items={[{ label: "Semua", count: complaints.length }, ...order.map((s) => ({ label: complaintStatus[s].label, count: complaints.filter((c) => c.status === s).length }))]}
              active="Semua"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm">
              <thead className="bg-mori-2/70">
                <tr>
                  <th className={th}>Tiket</th>
                  <th className={th}>Perihal</th>
                  <th className={th}>Pelapor</th>
                  <th className={th}>Status</th>
                  <th className={th} />
                </tr>
              </thead>
              <tbody className="divide-y divide-emas-soft/70">
                {complaints.map((c) => (
                  <tr key={c.ticket} className={cn("hover:bg-mori-2/50", c === sel && "bg-kunyit-soft/25")}>
                    <td className={cn(td, "whitespace-nowrap font-mono text-xs font-semibold text-sogan-900")}>{c.ticket}</td>
                    <td className={td}>
                      <span className="block font-medium text-sogan-900">{c.subject}</span>
                      <span className="block text-xs text-tinta/60">
                        {c.category} · {c.submittedAt}
                      </span>
                    </td>
                    <td className={cn(td, "text-tinta")}>{c.reporter}</td>
                    <td className={td}>
                      <StatusBadge {...complaintStatus[c.status]} />
                    </td>
                    <td className={cn(td, "text-right")}>
                      <button type="button" className={btn.outline} aria-label={`Buka ${c.ticket}`}>
                        <Eye className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title={sel.subject} description={`${sel.ticket} · ${sel.category}`} ornament>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge {...complaintStatus[sel.status]} />
            <span className="inline-flex items-center gap-1 rounded-full bg-mori-2 px-2.5 py-1 text-[0.65rem] font-semibold text-tinta">
              <Lock className="size-3" /> Privat
            </span>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-tinta/60">Pelapor</dt>
              <dd className="font-medium text-sogan-900">{sel.reporter} · 0812-3456-1188</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-tinta/60">Isi pengaduan</dt>
              <dd className="mt-0.5 leading-relaxed text-tinta">
                Saluran air di depan SD Negeri Lerep 01 tersumbat sampah daun sehingga meluap ke jalan setiap hujan deras. Mohon dibersihkan sebelum musim hujan puncak.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-tinta/60">Lampiran</dt>
              <dd className="mt-1 flex gap-2">
                {[1, 2].map((i) => (
                  <span key={i} className="grid h-14 w-20 place-items-center rounded-lg border border-emas-soft bg-mori text-[0.6rem] font-semibold text-tinta/60">
                    foto-{i}.jpg
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <label className="mt-5 grid gap-1.5 text-xs font-semibold text-sogan-900">
            Ubah status
            <select defaultValue="in_progress" className="rounded-xl border border-emas-soft bg-white px-3.5 py-2.5 text-sm font-normal">
              {order.map((s) => (
                <option key={s} value={s}>
                  {complaintStatus[s].label}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 grid gap-1.5 text-xs font-semibold text-sogan-900">
            Tanggapan publik untuk pelapor
            <textarea
              rows={3}
              defaultValue="Terima kasih. Laporan diteruskan ke Kasi Pemerintahan dan dijadwalkan kerja bakti Sabtu, 14 November."
              className="rounded-xl border border-emas-soft bg-white p-3 text-sm font-normal focus:border-kunyit focus:outline-none"
            />
          </label>
          <button type="button" className={cn(btn.primary, "mt-4 w-full")}>
            <MessageSquareReply className="size-4" /> Simpan & Kirim Tanggapan
          </button>
        </Panel>
      </div>
    </>
  );
}
