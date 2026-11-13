"use client";

import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity,
  BellRing,
  CalendarDays,
  ChartColumn,
  ExternalLink,
  FileCheck2,
  FolderOpen,
  Images,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  MapPinned,
  Megaphone,
  Menu,
  Newspaper,
  PanelsTopLeft,
  Scale,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Vote,
  X,
  Bell,
  type LucideIcon,
} from "lucide-react";
import { adminUser } from "@/data/admin-dummy";
import { cn } from "@/lib/utils";
import { adminNav } from "./nav";

const icons: Record<string, LucideIcon> = {
  Activity,
  BellRing,
  CalendarDays,
  ChartColumn,
  FileCheck2,
  FolderOpen,
  Images,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  MapPinned,
  Megaphone,
  Newspaper,
  PanelsTopLeft,
  Scale,
  ScrollText,
  Settings,
  ShieldCheck,
  Store,
  Vote,
};

function isActive(href: string, pathname: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

function Sidebar({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-sogan-900 text-mori">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-luminosity"
        style={{ backgroundImage: `url(${asset("/images/batik.webp")})`, backgroundSize: "380px" }}
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-3 px-5 pb-5 pt-6">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mori p-1.5 ring-2 ring-emas/60">
          <Image src="/images/logo-mark.png" alt="" width={32} height={32} className="size-full object-contain" />
        </span>
        <span className="leading-tight">
          <span className="block font-serif text-base font-bold tracking-wide">DESA LEREP</span>
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-kunyit-soft">Panel Admin</span>
        </span>
      </div>
      <div className="pita-batik relative mx-5 h-1.5 rounded-full opacity-80" aria-hidden="true" />

      <nav aria-label="Menu admin" className="relative flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:thin]">
        {adminNav.map((g) => (
          <div key={g.group} className="mb-4">
            <p className="px-3 pb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-kunyit-soft/80">{g.group}</p>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const Icon = icons[it.icon] ?? LayoutDashboard;
                const active = isActive(it.href, pathname);
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2 text-[0.82rem] font-medium transition",
                        active ? "bg-kunyit text-white shadow-tombol" : "text-mori/80 hover:bg-white/10 hover:text-mori",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="flex-1">{it.label}</span>
                      {it.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[0.62rem] font-bold leading-none",
                            active ? "bg-white/25 text-white" : "bg-kunyit/90 text-white",
                          )}
                        >
                          {it.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="relative border-t border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-kunyit-soft font-serif text-sm font-bold text-sogan-900">DL</span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-semibold">{adminUser.name}</span>
            <span className="block truncate text-[0.68rem] text-mori/60">{adminUser.email}</span>
          </span>
          <Link href="/login" className="grid size-8 place-items-center rounded-lg text-mori/70 hover:bg-white/10 hover:text-mori" aria-label="Keluar">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Kerangka dashboard admin. Akses wajib dilindungi Supabase Auth + verifikasi
 * role di Golang API (ARCHITECTURE §7, §15.1) — di mockup ini belum ada proteksi.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/admin";
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mori lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">
        <Sidebar pathname={pathname} />
      </aside>

      {/* Drawer HP/tablet */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "visible" : "invisible")}>
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
          className={cn("absolute inset-0 bg-sogan-900/50 transition-opacity", open ? "opacity-100" : "opacity-0")}
        />
        <div className={cn("absolute inset-y-0 left-0 w-72 transition-transform", open ? "translate-x-0" : "-translate-x-full")}>
          <Sidebar pathname={pathname} onNavigate={() => setOpen(false)} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-6 grid size-8 place-items-center rounded-lg text-mori/80 hover:bg-white/10"
            aria-label="Tutup menu"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-emas-soft bg-mori/90 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-xl border border-emas-soft text-sogan-900 lg:hidden"
              aria-label="Buka menu"
            >
              <Menu className="size-5" />
            </button>
            <label className="relative hidden max-w-md flex-1 sm:block">
              <span className="sr-only">Cari di dashboard</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-tinta/50" />
              <input
                type="search"
                placeholder="Cari nomor tiket, berita, dokumen…"
                className="w-full rounded-full border border-emas-soft bg-white py-2 pl-10 pr-4 text-sm text-sogan-900 placeholder:text-tinta/45 focus:border-kunyit focus:outline-none"
              />
            </label>
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/"
                className="hidden items-center gap-2 rounded-full border border-emas-soft bg-white px-4 py-2 text-xs font-semibold text-sogan-900 hover:border-kunyit sm:inline-flex"
              >
                <ExternalLink className="size-3.5" /> Lihat Situs
              </Link>
              <button
                type="button"
                className="relative grid size-10 place-items-center rounded-full border border-emas-soft bg-white text-sogan-900"
                aria-label="Notifikasi (3 baru)"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-kunyit ring-2 ring-white" />
              </button>
            </div>
          </div>
          <div className="pita-batik h-1.5 opacity-70" aria-hidden="true" />
        </header>
        <main id="konten" className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
