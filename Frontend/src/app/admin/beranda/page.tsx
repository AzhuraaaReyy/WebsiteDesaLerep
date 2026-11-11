import Image from "next/image";
import { Eye, GripVertical, Plus } from "lucide-react";
import { homepageBanners, homepageSections } from "@/data/admin-dummy";
import { DummyTag, PageHeader, Panel, StatusBadge, btn, contentStatus } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Beranda (CMS)" };

export default function BerandaCmsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Situs"
        title="Pengaturan Beranda"
        description="Atur urutan dan tampil/sembunyi section beranda. Pratinjau dilihat sebelum disimpan; perubahan yang disimpan langsung berlaku. Banner tetap mengikuti status konten."
        crumbs={[{ label: "Beranda (CMS)" }]}
        actions={
          <>
            <DummyTag />
            <button type="button" className={btn.outline}>
              <Eye className="size-4" /> Pratinjau
            </button>
            <button type="button" className={btn.primary}>Simpan Perubahan</button>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <Panel title="Section Beranda" description="Seret untuk mengubah urutan">
          <ol className="grid gap-2">
            {homepageSections.map((s, i) => (
              <li key={s.key} className={cn("flex items-center gap-3 rounded-xl border bg-white px-3 py-3", s.active ? "border-emas-soft" : "border-dashed border-emas-soft opacity-70")}>
                <GripVertical className="size-4 shrink-0 cursor-grab text-tinta/40" />
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-mori-2 font-serif text-xs font-bold text-sogan-900">{i + 1}</span>
                <span className="flex-1 text-sm font-semibold text-sogan-900">{s.label}</span>
                <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition", s.active ? "bg-[#0d6b5f]" : "bg-mori-3")} role="switch" aria-checked={s.active} aria-label={`Tampilkan ${s.label}`}>
                  <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition", s.active ? "left-[1.375rem]" : "left-0.5")} />
                </span>
              </li>
            ))}
          </ol>
        </Panel>
        <Panel
          title="Banner Hero"
          description="Berganti otomatis setiap 5 detik di beranda"
          actions={
            <button type="button" className={btn.outline}>
              <Plus className="size-4" /> Tambah Banner
            </button>
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2">
            {homepageBanners.map((b, i) => (
              <li key={b.title} className="overflow-hidden rounded-xl border border-emas-soft bg-white">
                <div className="relative aspect-[16/9]">
                  <Image src={b.image} alt={b.title} fill sizes="320px" className="object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-sogan-900/85 px-2.5 py-1 text-[0.65rem] font-semibold text-mori">Urutan {i + 1}</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-3">
                  <span className="text-sm font-semibold text-sogan-900">{b.title}</span>
                  <StatusBadge {...contentStatus[b.status]} />
                </div>
              </li>
            ))}
            <li className="grid min-h-40 place-items-center rounded-xl border-2 border-dashed border-emas bg-mori text-center text-xs text-tinta/60">
              <span>
                <Plus className="mx-auto mb-1 size-5 text-kunyit-600" />
                Rasio 16:9 · min. 1600 px
              </span>
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
