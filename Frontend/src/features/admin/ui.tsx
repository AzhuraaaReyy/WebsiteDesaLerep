import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { CardCorners, Eyebrow } from "@/components/ornament/Ornaments";
import type { ComplaintStatus, ContentStatus, RequestStatus } from "@/data/admin-dummy";
import { cn } from "@/lib/utils";

/* ───────── Label status (SCHEMA §8) — selalu teks + titik, tidak hanya warna ───────── */
type Tone = "kunyit" | "oranye" | "tosca" | "toscaTua" | "sogan" | "merah" | "abu";

const toneCls: Record<Tone, string> = {
  kunyit: "bg-kunyit-soft/70 text-sogan-900 [&>i]:bg-kunyit",
  oranye: "bg-[#fde3c8] text-[#8a3b00] [&>i]:bg-[#d9731a]",
  tosca: "bg-tosca/12 text-[#0d6b5f] [&>i]:bg-tosca",
  toscaTua: "bg-[#0d6b5f] text-white [&>i]:bg-white",
  sogan: "bg-sogan-900 text-mori [&>i]:bg-kunyit",
  merah: "bg-[#fde2e0] text-[#912018] [&>i]:bg-[#b42318]",
  abu: "bg-mori-3/70 text-tinta [&>i]:bg-tinta/50",
};

export const requestStatus: Record<RequestStatus, { label: string; tone: Tone }> = {
  pending_verification: { label: "Menunggu Verifikasi", tone: "kunyit" },
  needs_revision: { label: "Perlu Perbaikan", tone: "oranye" },
  verified: { label: "Terverifikasi", tone: "tosca" },
  in_progress: { label: "Sedang Diproses", tone: "abu" },
  pending_approval: { label: "Menunggu Persetujuan", tone: "sogan" },
  approved: { label: "Disetujui", tone: "tosca" },
  completed: { label: "Selesai", tone: "toscaTua" },
  rejected: { label: "Ditolak", tone: "merah" },
  cancelled: { label: "Dibatalkan", tone: "abu" },
};

export const complaintStatus: Record<ComplaintStatus, { label: string; tone: Tone }> = {
  submitted: { label: "Masuk", tone: "kunyit" },
  under_review: { label: "Ditinjau", tone: "sogan" },
  in_progress: { label: "Ditindaklanjuti", tone: "abu" },
  resolved: { label: "Selesai", tone: "toscaTua" },
  rejected: { label: "Ditolak", tone: "merah" },
  closed: { label: "Ditutup", tone: "abu" },
};

export const contentStatus: Record<ContentStatus, { label: string; tone: Tone }> = {
  draft: { label: "Draft", tone: "abu" },
  review: { label: "Review", tone: "kunyit" },
  published: { label: "Published", tone: "tosca" },
  archived: { label: "Archived", tone: "abu" },
};

export function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.7rem] font-semibold", toneCls[tone])}>
      <i className="size-1.5 rounded-full" aria-hidden="true" />
      {label}
    </span>
  );
}

/* ───────── Tata letak ───────── */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs = [],
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav aria-label="Breadcrumb" className="mb-2 text-xs text-tinta/70">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/admin" className="hover:text-kunyit-600">
                Dashboard
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="size-3" aria-hidden="true" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-kunyit-600">
                    {c.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-sogan-900">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow lines={[eyebrow]} align="left" />
        <h1 className="mt-1 font-serif text-2xl font-bold text-sogan-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-tinta/80">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
  ornament = false,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  ornament?: boolean;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden rounded-2xl border border-emas-soft bg-white/70 shadow-kartu", className)}>
      <div className="pita-batik h-1.5" aria-hidden="true" />
      {ornament && <CardCorners tl={{ className: "top-1.5" }} />}
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-emas-soft/70 px-5 py-4">
          <div>
            {title && <h2 className="font-serif text-lg font-bold text-sogan-900">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-tinta/70">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ───────── Tombol ───────── */
const btnBase = "inline-flex items-center justify-center gap-2 rounded-full text-xs font-semibold transition whitespace-nowrap";
export const btn = {
  primary: cn(btnBase, "border-2 border-sogan-900/70 bg-kunyit px-4 py-2 text-white shadow-tombol hover:bg-kunyit-600"),
  dark: cn(btnBase, "bg-sogan-900 px-4 py-2.5 text-mori hover:bg-sogan"),
  outline: cn(btnBase, "border border-emas-soft bg-white px-4 py-2 text-sogan-900 hover:border-kunyit"),
  danger: cn(btnBase, "border border-[#b42318]/40 bg-[#fde2e0] px-4 py-2 text-[#912018] hover:bg-[#fbd0cc]"),
  success: cn(btnBase, "bg-[#0d6b5f] px-4 py-2.5 text-white hover:bg-[#0a5a50]"),
};

/* ───────── Tab filter (tautan) ───────── */
export function FilterTabs({ items, active }: { items: { label: string; count?: number }[]; active: string }) {
  return (
    <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]" role="tablist" aria-label="Filter status">
      {items.map((t) => {
        const on = t.label === active;
        return (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={on}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
              on ? "border-sogan-900 bg-sogan-900 text-mori" : "border-emas-soft bg-white text-sogan-900 hover:border-kunyit",
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={cn("rounded-full px-1.5 text-[0.62rem]", on ? "bg-white/20" : "bg-mori-2 text-tinta")}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export const th = "px-4 py-3 text-left text-[0.68rem] font-semibold uppercase tracking-wider text-tinta/70";
export const td = "px-4 py-3.5 align-middle";

/** Kotak label "data dummy" kecil untuk mockup. */
export function DummyTag() {
  return (
    <span className="rounded-full border border-dashed border-kunyit/60 bg-kunyit-soft/40 px-2.5 py-1 text-[0.65rem] font-semibold text-sogan-900">
      Data dummy
    </span>
  );
}
