"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

/**
 * Formulir pelacakan pengajuan. Saat terhubung ke backend akan memanggil
 * POST /api/v1/services/requests/track (nomor tiket + kode verifikasi di body,
 * bukan di URL — ARCHITECTURE §9.5).
 */
export function TrackingForm() {
  const [pesan, setPesan] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const tiket = String(data.get("tiket") ?? "").trim();
    const kode = String(data.get("kode") ?? "").trim();
    if (!tiket || !kode) {
      setPesan("Isi nomor tiket dan kode verifikasi terlebih dahulu.");
      return;
    }
    setPesan(`Pelacakan tiket ${tiket} akan tersedia setelah sistem pelayanan terhubung ke server desa.`);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-sogan-900">
          Nomor tiket
          <input
            name="tiket"
            required
            placeholder="mis. LRP-2026-000123"
            autoComplete="off"
            className="rounded-xl border border-emas-soft bg-white px-4 py-3 text-sm font-normal placeholder:text-tinta/45 focus:border-kunyit focus:outline-none"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-sogan-900">
          Kode verifikasi
          <input
            name="kode"
            type="password"
            required
            placeholder="6 digit kode"
            autoComplete="off"
            className="rounded-xl border border-emas-soft bg-white px-4 py-3 text-sm font-normal placeholder:text-tinta/45 focus:border-kunyit focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sogan-900/70 bg-kunyit px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-tombol transition hover:bg-kunyit-600 sm:justify-self-start"
      >
        <Search className="size-4" /> Lacak Pengajuan
      </button>
      <p className="min-h-5 text-sm text-sogan-900" aria-live="polite">
        {pesan}
      </p>
    </form>
  );
}
