import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { CardCorners, Eyebrow, OrnamenPembatas } from "@/components/ornament/Ornaments";

export const metadata: Metadata = { title: "Masuk Admin", robots: { index: false, follow: false } };

/** Login admin (Supabase Auth). Tidak ada pendaftaran publik — akun dibuat manual (ARCHITECTURE §7.1). */
export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-mori lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/images/hero-gapura.jpg" alt="" fill priority sizes="55vw" className="object-cover object-[78%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-sogan-900/90 via-sogan-900/40 to-sogan-900/10" />
        <Image src="/images/gunungan.png" alt="" width={616} height={945} className="absolute -right-10 top-10 h-[70%] w-auto opacity-25 invert" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-mori">
          <Eyebrow lines={["Panel Pengelola"]} align="left" tone="onDark" />
          <h1 className="mt-3 font-serif text-5xl font-bold leading-tight">
            Desa Wisata
            <br />
            Lerep
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mori/85">
            Kelola informasi desa, pelayanan publik, dan transparansi secara amanah untuk seluruh warga.
          </p>
        </div>
        <div className="pita-batik absolute inset-x-0 bottom-0 h-2.5" aria-hidden="true" />
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="relative isolate w-full max-w-md overflow-hidden rounded-[1.75rem] border-2 border-kunyit-soft bg-white/70 p-8 shadow-kartu sm:p-10">
          <CardCorners />
          <div className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-sogan-900 p-2 ring-2 ring-emas/60 ring-offset-4 ring-offset-mori">
              <span className="grid size-full place-items-center rounded-full bg-mori p-1.5">
                <Image src="/images/logo-mark.png" alt="" width={48} height={48} className="size-full object-contain" />
              </span>
            </span>
            <h2 className="mt-5 font-serif text-2xl font-bold text-sogan-900">Masuk Admin</h2>
            <OrnamenPembatas className="mt-2 w-48 sm:w-52" />
            <p className="mt-2 text-sm text-tinta/75">Gunakan akun yang dibuat oleh pengelola sistem.</p>
          </div>
          <form className="mt-8 grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold text-sogan-900">
              Email
              <span className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-tinta/50" />
                <input type="email" name="email" autoComplete="username" placeholder="nama@desalerep.id" className="w-full rounded-xl border border-emas-soft bg-white py-3 pl-10 pr-4 text-sm font-normal focus:border-kunyit focus:outline-none" />
              </span>
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-sogan-900">
              Kata sandi
              <span className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-tinta/50" />
                <input type="password" name="password" autoComplete="current-password" placeholder="••••••••" className="w-full rounded-xl border border-emas-soft bg-white py-3 pl-10 pr-4 text-sm font-normal focus:border-kunyit focus:outline-none" />
              </span>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-tinta">
                <input type="checkbox" className="size-4 accent-[var(--color-kunyit)]" /> Ingat saya
              </label>
              <span className="text-tinta/60">Lupa sandi? Hubungi pengelola</span>
            </div>
            <Link
              href="/admin"
              className="mt-2 inline-flex items-center justify-center rounded-full border-2 border-sogan-900/70 bg-kunyit px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-tombol hover:bg-kunyit-600"
            >
              Masuk ke Dashboard
            </Link>
            <p className="text-center text-[0.7rem] text-tinta/60">Percobaan login dibatasi untuk keamanan akun.</p>
          </form>
          <Link href="/" className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold text-kunyit-600 hover:text-sogan">
            <ArrowLeft className="size-3.5" /> Kembali ke situs desa
          </Link>
        </div>
      </div>
    </main>
  );
}
