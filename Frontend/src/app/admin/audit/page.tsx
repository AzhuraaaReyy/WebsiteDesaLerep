import { Download, Filter, Info } from "lucide-react";
import { auditLogs } from "@/data/admin-dummy";
import { DummyTag, PageHeader, Panel, btn, td, th } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Audit Log" };

export default function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Situs · Keamanan"
        title="Audit Log"
        description="Catatan append-only aktivitas penting: perubahan konten, keputusan permohonan, mandat, tanda tangan scan, dan akses file privat."
        crumbs={[{ label: "Audit Log" }]}
        actions={
          <>
            <DummyTag />
            <button type="button" className={btn.outline}>
              <Filter className="size-4" /> Filter
            </button>
            <button type="button" className={btn.outline}>
              <Download className="size-4" /> Ekspor
            </button>
          </>
        }
      />
      <Panel bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[56rem] text-sm">
            <thead className="bg-mori-2/70">
              <tr>
                <th className={th}>Waktu (WIB)</th>
                <th className={th}>Pengguna</th>
                <th className={th}>Aksi</th>
                <th className={th}>Entitas</th>
                <th className={th}>Ringkasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emas-soft/70">
              {auditLogs.map((a) => (
                <tr key={a.at + a.action} className="align-top hover:bg-mori-2/50">
                  <td className={cn(td, "whitespace-nowrap text-xs text-tinta/80")}>{a.at}</td>
                  <td className={cn(td, "font-medium text-sogan-900")}>{a.user}</td>
                  <td className={td}>
                    <code className="rounded-md bg-sogan-900 px-2 py-1 text-[0.68rem] text-mori">{a.action}</code>
                  </td>
                  <td className={cn(td, "text-xs text-tinta/80")}>{a.entity}</td>
                  <td className={cn(td, "text-tinta")}>{a.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="mt-4 flex items-start gap-2 text-xs text-tinta/70">
        <Info className="mt-0.5 size-3.5 shrink-0 text-kunyit-600" />
        <p>
          Log login/logout bersumber dari audit Supabase Auth. Audit log tidak menyimpan password, token, kode verifikasi, NIK, signed URL, atau isi dokumen privat.
        </p>
      </div>
    </>
  );
}
