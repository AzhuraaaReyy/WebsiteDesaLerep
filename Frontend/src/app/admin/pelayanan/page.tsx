import Link from "next/link";
import { Download, Eye, Filter } from "lucide-react";
import { serviceRequests, type RequestStatus } from "@/data/admin-dummy";
import { DummyTag, FilterTabs, PageHeader, Panel, StatusBadge, btn, requestStatus, td, th } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Permohonan Layanan" };

const order: RequestStatus[] = [
  "pending_verification",
  "needs_revision",
  "verified",
  "in_progress",
  "pending_approval",
  "approved",
  "completed",
  "rejected",
  "cancelled",
];

export default function PelayananAdminPage() {
  const tabs = [
    { label: "Semua", count: serviceRequests.length },
    ...order.map((s) => ({ label: requestStatus[s].label, count: serviceRequests.filter((r) => r.status === s).length })),
  ];
  return (
    <>
      <PageHeader
        eyebrow="Pelayanan Publik"
        title="Permohonan Layanan"
        description="Verifikasi berkas, proses dokumen, dan putuskan permohonan warga. Setiap perubahan status tercatat di riwayat dan audit log."
        crumbs={[{ label: "Permohonan Layanan" }]}
        actions={
          <>
            <DummyTag />
            <button type="button" className={btn.outline}>
              <Download className="size-4" /> Ekspor CSV
            </button>
          </>
        }
      />
      <Panel bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-emas-soft/70 p-4 xl:flex-row xl:items-center xl:justify-between">
          <FilterTabs items={tabs} active="Semua" />
          <div className="flex shrink-0 gap-2">
            <select className="rounded-full border border-emas-soft bg-white px-3 py-2 text-xs font-semibold text-sogan-900" aria-label="Filter layanan">
              <option>Semua layanan</option>
              <option>Surat Keterangan Domisili</option>
              <option>Surat Keterangan Usaha</option>
            </select>
            <button type="button" className={btn.outline}>
              <Filter className="size-3.5" /> Tanggal
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-sm">
            <thead className="bg-mori-2/70">
              <tr>
                <th className={th}>Nomor Tiket</th>
                <th className={th}>Layanan</th>
                <th className={th}>Pemohon</th>
                <th className={th}>Diajukan</th>
                <th className={th}>Status</th>
                <th className={cn(th, "text-right")}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emas-soft/70">
              {serviceRequests.map((r) => (
                <tr key={r.ticket} className="hover:bg-mori-2/50">
                  <td className={cn(td, "whitespace-nowrap font-mono text-xs font-semibold text-sogan-900")}>{r.ticket}</td>
                  <td className={td}>
                    <span className="block font-medium text-sogan-900">{r.service}</span>
                    <span className="block text-xs text-tinta/60">{r.category}</span>
                  </td>
                  <td className={td}>
                    <span className="block text-sogan-900">{r.applicant}</span>
                    <span className="block text-xs text-tinta/60">{r.phone}</span>
                  </td>
                  <td className={cn(td, "whitespace-nowrap text-xs text-tinta/80")}>{r.submittedAt}</td>
                  <td className={td}>
                    <StatusBadge {...requestStatus[r.status]} />
                  </td>
                  <td className={cn(td, "text-right")}>
                    <Link href={`/admin/pelayanan/${r.ticket}`} className={btn.outline}>
                      <Eye className="size-3.5" /> Buka
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-emas-soft/70 px-4 py-3 text-xs text-tinta/70">
          <span>Menampilkan 1–8 dari 142 permohonan</span>
          <span className="flex gap-1">
            {["‹", "1", "2", "3", "…", "18", "›"].map((p) => (
              <span key={p} className={cn("grid size-7 place-items-center rounded-lg border", p === "1" ? "border-sogan-900 bg-sogan-900 text-mori" : "border-emas-soft bg-white")}>
                {p}
              </span>
            ))}
          </span>
        </div>
      </Panel>
      <p className="mt-4 text-xs text-tinta/60">
        Kontak pemohon disamarkan di daftar. Data lengkap hanya tampil di halaman detail untuk admin berwenang.
      </p>
    </>
  );
}
