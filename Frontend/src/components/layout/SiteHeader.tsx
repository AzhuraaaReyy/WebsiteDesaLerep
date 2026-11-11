"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { contactNav, mainNav, siteConfig, type NavItem } from "@/data/site";
import { cn } from "@/lib/utils";
import { EDGE_CONTAINER } from "@/lib/layout";

function isActive(item: NavItem, pathname: string) {
  if (item.href === "/") return pathname === "/";
  const base = (href: string) => href.split("#")[0];
  return [item.href, ...(item.children?.map((c) => c.href) ?? [])].some((h) => {
    const b = base(h);
    return b !== "/" && (pathname === b || pathname.startsWith(`${b}/`));
  });
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <header className={cn("sticky top-0 z-50 transition-shadow", scrolled && "shadow-[0_6px_24px_-12px_rgba(54,32,13,0.35)]")}>
      <div className="bg-mori/95 backdrop-blur supports-[backdrop-filter]:bg-mori/85">
        <div className={cn("flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6", EDGE_CONTAINER)}>
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Beranda Desa Wisata Lerep" onClick={close}>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sogan-900 p-1.5 ring-2 ring-emas/60 ring-offset-2 ring-offset-mori sm:size-11">
              <span className="grid size-full place-items-center rounded-full bg-mori p-1">
                <Image src="/images/logo-mark.png" alt="" width={40} height={40} className="size-full object-contain" priority />
              </span>
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-[0.95rem] font-bold tracking-wide text-sogan-900 min-[400px]:text-base sm:text-xl xl:text-lg 2xl:text-xl">
                DESA WISATA LEREP
              </span>
              <span className="block truncate text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-kunyit-600 sm:text-[0.6rem] sm:tracking-[0.2em] xl:tracking-[0.1em] 2xl:tracking-[0.2em]">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          {/* Navigasi desktop */}
          <nav aria-label="Navigasi utama" className="hidden xl:block">
            <ul className="flex items-center">
              {mainNav.map((item) => {
                const active = isActive(item, pathname);
                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1 rounded-full px-2 py-2 text-[0.8rem] font-semibold whitespace-nowrap transition-colors 2xl:px-3.5 2xl:text-[0.85rem]",
                        active ? "text-kunyit-600" : "text-sogan-900 hover:text-kunyit-600",
                      )}
                      aria-current={active && !item.children ? "page" : undefined}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                      )}
                      {active && <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-kunyit 2xl:inset-x-3.5" />}
                    </Link>
                    {item.children && (
                      <div className="invisible absolute left-1/2 top-full z-10 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                        <ul className="overflow-hidden rounded-2xl border border-emas-soft bg-mori p-2 shadow-kartu">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link
                                href={c.href}
                                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-mori-2 focus-visible:bg-mori-2"
                              >
                                <span className="block text-sm font-semibold text-sogan-900">{c.label}</span>
                                {c.description && <span className="block text-xs text-tinta/70">{c.description}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={contactNav.href}
              className="hidden items-center gap-3 rounded-full bg-sogan-900 px-5 py-2.5 xl:gap-2 xl:px-4 2xl:gap-3 2xl:px-5 text-sm font-semibold whitespace-nowrap text-mori shadow-[0_6px_18px_-6px_rgba(54,32,13,0.6)] ring-2 ring-kunyit/40 transition hover:bg-sogan sm:inline-flex"
              aria-current={pathname === contactNav.href ? "page" : undefined}
            >
              {contactNav.label}
              <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-emas-soft text-sogan-900 xl:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>
      <div className="pita-batik h-2.5 border-y border-sogan-900/30" aria-hidden="true" />

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[calc(4.5rem+0.625rem)] overflow-y-auto bg-mori transition-[opacity,visibility] duration-200 xl:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Navigasi mobile" className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <ul className="divide-y divide-emas-soft/70">
            {mainNav.map((item) => {
              const active = isActive(item, pathname);
              return (
                <li key={item.label} className="py-1">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between py-3 font-serif text-lg font-semibold",
                          active ? "text-kunyit-600" : "text-sogan-900",
                        )}
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                      >
                        {item.label}
                        <ChevronDown className={cn("size-5 transition-transform", expanded === item.label && "rotate-180")} />
                      </button>
                      {expanded === item.label && (
                        <ul className="mb-3 space-y-1 border-l-2 border-kunyit/50 pl-4">
                          <li>
                            <Link href={item.href} onClick={close} className="block py-2 text-sm font-semibold text-kunyit-600">
                              Semua {item.label}
                            </Link>
                          </li>
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link href={c.href} onClick={close} className="block py-2 text-sm font-medium text-tinta">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={close}
                      className={cn("block py-3 font-serif text-lg font-semibold", active ? "text-kunyit-600" : "text-sogan-900")}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href={contactNav.href}
            onClick={close}
            className="mt-6 flex items-center justify-center gap-3 rounded-full bg-sogan-900 px-5 py-3.5 text-sm font-semibold text-mori"
          >
            {contactNav.label} <ArrowRight className="size-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
