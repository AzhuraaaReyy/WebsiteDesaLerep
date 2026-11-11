import Link from "next/link";
import { Eye, MoreHorizontal, Pencil, Plus, Search } from "lucide-react";
import type { ContentStatus } from "@/data/admin-dummy";
import { DummyTag, FilterTabs, PageHeader, Panel, StatusBadge, btn, contentStatus, td, th } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

const order: ContentStatus[] = ["draft", "review", "published", "archived"];

/** Daftar konten dengan lifecycle seragam Draft → (Review) → Published → Archived (SCHEMA §8.1). */
export function ContentTable({
  eyebrow,
  title,
  description,
  newHref,
  newLabel,
  columnMeta,
  rows,
}: {
  eyebrow: string;
  title: string;
  description: string;
  newHref?: string;
  newLabel: string;
  columnMeta: string;
  rows: { title: string; meta: string; updated: string; author: string; status: ContentStatus }[];
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        crumbs={[{ label: title }]}
        actions={
          <>
            <DummyTag />
            <Link href={newHref ?? "#"} className={btn.primary}>
              <Plus className="size-4" /> {newLabel}
            </Link>
          </>
        }
      />
      <Panel bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-emas-soft/70 p-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterTabs
            items={[{ label: "Semua", count: rows.length }, ...order.map((s) => ({ label: contentStatus[s].label, count: rows.filter((r) => r.status === s).length }))]}
            active="Semua"
          />
          <label className="relative lg:w-72">
            <span className="sr-only">Cari</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-tinta/50" />
            <input type="search" placeholder="Cari judul…" className="w-full rounded-full border border-emas-soft bg-white py-2 pl-9 pr-4 text-sm focus:border-kunyit focus:outline-none" />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead className="bg-mori-2/70">
              <tr>
                <th className={th}>Judul</th>
                <th className={th}>{columnMeta}</th>
                <th className={th}>Diperbarui</th>
                <th className={th}>Status</th>
                <th className={cn(th, "text-right")}>Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emas-soft/70">
              {rows.map((r) => (
                <tr key={r.title} className="hover:bg-mori-2/50">
                  <td className={cn(td, "max-w-sm font-semibold text-sogan-900")}>{r.title}</td>
                  <td className={cn(td, "text-xs text-tinta/80")}>{r.meta}</td>
                  <td className={cn(td, "whitespace-nowrap text-xs text-tinta/80")}>
                    {r.updated}
                    <span className="block text-tinta/50">{r.author}</span>
                  </td>
                  <td className={td}>
                    <StatusBadge {...contentStatus[r.status]} />
                  </td>
                  <td className={cn(td, "text-right")}>
                    <span className="inline-flex gap-1">
                      <button type="button" className={cn(btn.outline, "px-2.5")} aria-label="Pratinjau">
                        <Eye className="size-3.5" />
                      </button>
                      <Link href={newHref ?? "#"} className={cn(btn.outline, "px-2.5")} aria-label="Ubah">
                        <Pencil className="size-3.5" />
                      </Link>
                      <button type="button" className={cn(btn.outline, "px-2.5")} aria-label="Lainnya">
                        <MoreHorizontal className="size-3.5" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
