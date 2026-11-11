import { History, Plus, ShieldCheck, ShieldOff } from "lucide-react";
import { delegations } from "@/data/admin-dummy";
import { DummyTag, PageHeader, Panel, StatusBadge, btn, td, th } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Mandat Persetujuan" };

const inputCls = "w-full rounded-xl border border-emas-soft bg-white px-3.5 py-2.5 text-sm font-normal text-sogan-900 focus:border-kunyit focus:outline-none";

export default function MandatPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pelayanan Publik"
        title="Mandat Persetujuan"
        description="Catat sekali penunjukan langsung dari Kepala Desa atau Carik. Selama mandat berlaku, admin penerima dapat menyetujui atau menolak permohonan tanpa menunggu pejabat."
        crumbs={[{ label: "Mandat Persetujuan" }]}
        actions={<DummyTag />}
      />

      <div className="grid gap-6 2xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Daftar Mandat" description="Mandat yang sudah pernah dipakai tidak dapat dihapus — ubah dengan mencabut lalu membuat mandat baru." bodyClassName="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] text-sm">
              <thead className="bg-mori-2/70">
                <tr>
                  <th className={th}>Mandat</th>
                  <th className={th}>Pemberi → Penerima</th>
                  <th className={th}>Cakupan</th>
                  <th className={th}>Masa Berlaku</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emas-soft/70">
                {delegations.map((d) => {
                  const active = !d.revokedAt;
                  return (
                    <tr key={d.id} className="align-top hover:bg-mori-2/50">
                      <td className={td}>
                        <span className="block font-mono text-xs font-semibold text-sogan-900">{d.id}</span>
                        <span className="mt-1 block text-[0.7rem] text-tinta/60">Dipakai {d.usedCount}×</span>
                      </td>
                      <td className={td}>
                        <span className="block font-medium text-sogan-900">{d.official}</span>
                        <span className="block text-xs text-tinta/60">{d.officialRole}</span>
                        <span className="mt-1 block text-xs text-tinta">→ {d.delegate}</span>
                      </td>
                      <td className={td}>
                        <span className="block text-sogan-900">{d.scope}</span>
                        <span className="mt-1 flex flex-wrap gap-1 text-[0.62rem] font-semibold">
                          <span className="rounded-full bg-mori-2 px-2 py-0.5 text-tinta">
                            {d.basis === "direct_appointment" ? "Penunjukan langsung" : `Surat ${d.reference}`}
                          </span>
                          <span className={cn("rounded-full px-2 py-0.5", d.signatureScan ? "bg-tosca/12 text-[#0d6b5f]" : "bg-mori-2 text-tinta")}>
                            TTD scan: {d.signatureScan ? "ya" : "tidak"}
                          </span>
                        </span>
                      </td>
                      <td className={cn(td, "text-xs text-tinta/80")}>
                        {d.validFrom} – {d.revokedAt ? `dicabut ${d.revokedAt}` : d.validUntil ?? "sampai dicabut"}
                      </td>
                      <td className={td}>
                        {active ? <StatusBadge label="Berlaku" tone="tosca" /> : <StatusBadge label="Dicabut" tone="abu" />}
                        {active && (
                          <button type="button" className="mt-2 flex items-center gap-1 text-[0.7rem] font-semibold text-[#912018] hover:underline">
                            <ShieldOff className="size-3" /> Cabut
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Catat Penunjukan Baru" description="Surat mandat tidak wajib — penunjukan lisan cukup dicatat di sini." ornament>
          <form className="grid gap-4 text-xs font-semibold text-sogan-900">
            <label className="grid gap-1.5">
              Pejabat pemberi mandat
              <select className={inputCls} defaultValue="kades">
                <option value="kades">Sumardi, S.T. — Kepala Desa</option>
                <option value="carik">Bambang Sutrisno — Sekretaris Desa (Carik)</option>
              </select>
            </label>
            <label className="grid gap-1.5">
              Admin penerima mandat
              <select className={inputCls}>
                <option>Dwi Lestari (admin)</option>
                <option>Ratna Dewi (admin)</option>
              </select>
            </label>
            <fieldset className="grid gap-2">
              <legend className="mb-1.5">Cakupan layanan</legend>
              {["Semua layanan", "Kategori layanan tertentu", "Layanan tertentu"].map((s, i) => (
                <label key={s} className="flex items-center gap-2 rounded-xl border border-emas-soft bg-white px-3 py-2.5 font-normal text-tinta">
                  <input type="radio" name="scope" defaultChecked={i === 0} className="accent-[var(--color-kunyit)]" /> {s}
                </label>
              ))}
            </fieldset>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1.5">
                Berlaku sejak
                <input type="date" defaultValue="2026-11-10" className={inputCls} />
              </label>
              <label className="grid gap-1.5">
                Berlaku sampai
                <input type="date" className={inputCls} />
                <span className="font-normal text-tinta/60">Kosong = sampai dicabut</span>
              </label>
            </div>
            <fieldset className="grid gap-2">
              <legend className="mb-1.5">Dasar penunjukan</legend>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 rounded-xl border border-sogan-900 bg-mori-2 px-3 py-2.5 font-normal text-sogan-900">
                  <input type="radio" name="basis" defaultChecked className="accent-[var(--color-kunyit)]" /> Langsung / lisan
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-emas-soft bg-white px-3 py-2.5 font-normal text-tinta">
                  <input type="radio" name="basis" className="accent-[var(--color-kunyit)]" /> Surat (opsional)
                </label>
              </div>
            </fieldset>
            <label className="flex items-start gap-3 rounded-xl border border-emas-soft bg-white p-3 font-normal text-tinta">
              <input type="checkbox" className="mt-0.5 size-4 accent-[var(--color-kunyit)]" />
              <span>
                <span className="block font-semibold text-sogan-900">Izinkan tanda tangan scan</span>
                Gambar tanda tangan pejabat diterapkan pada dokumen hasil setelah persetujuan. Bukan TTE tersertifikasi.
              </span>
            </label>
            <button type="button" className={btn.primary}>
              <Plus className="size-4" /> Simpan Mandat
            </button>
            <p className="flex items-center gap-1.5 font-normal text-tinta/60">
              <History className="size-3.5" /> Pencatatan & pencabutan mandat masuk audit log.
            </p>
          </form>
        </Panel>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emas-soft bg-mori-2/70 p-4 text-sm text-tinta">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-kunyit-600" />
        <p>
          Wewenang menyetujui berasal dari <strong className="font-semibold text-sogan-900">mandat</strong>, bukan dari role akun. Sistem menolak keputusan bila mandat belum berlaku, sudah berakhir/dicabut, tidak mencakup layanan, atau ada dua mandat aktif yang tumpang tindih.
        </p>
      </div>
    </>
  );
}
