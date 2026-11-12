"use client";

import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { SecretInput } from "@/components/ui/secret-input";
import { cn } from "@/lib/utils";

const JENIS_LACAK = [
  { id: "permohonan", label: "Permohonan", contoh: "mis. LRP-2026-000123", endpoint: "/api/v1/services/requests/track" },
  { id: "pengaduan", label: "Pengaduan", contoh: "mis. PGD-20261112-4K7Q9", endpoint: "/api/v1/complaints/track" },
  { id: "aspirasi", label: "Aspirasi", contoh: "mis. ASP-20261112-7HX2M", endpoint: "/api/v1/aspirations/track" },
] as const;

/**
 * Formulir pelacakan permohonan, pengaduan, dan aspirasi. Saat terhubung ke backend,
 * nomor tiket + kode verifikasi dikirim di body POST ke `endpoint` — tidak pernah di URL (ARCHITECTURE §9.5).
 */
export function TrackingForm() {
  const [jenis, setJenis] = useState<(typeof JENIS_LACAK)[number]["id"]>("permohonan");
  const [pesan, setPesan] = useState<string | null>(null);
  const aktif = JENIS_LACAK.find((j) => j.id === jenis) ?? JENIS_LACAK[0];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const tiket = String(data.get("tiket") ?? "").trim();
    const kode = String(data.get("kode") ?? "").replace(/[\s-]/g, "");
    if (!tiket || !kode) {
      setPesan("Isi nomor tiket dan kode verifikasi terlebih dahulu.");
      return;
    }
    setPesan(`Pelacakan ${aktif.label.toLowerCase()} ${tiket} akan tersedia setelah sistem terhubung ke server desa.`);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <fieldset>
        <legend className="text-sm font-semibold text-ornamen">Yang ingin dilacak</legend>
        <div className="mt-2 inline-flex flex-wrap gap-1 rounded-full border-2 border-ornamen/10 bg-white/70 p-1">
          {JENIS_LACAK.map((j) => (
            <label
              key={j.id}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-jingga/70",
                jenis === j.id ? "bg-ornamen text-mori shadow-sm" : "text-ornamen/75 hover:bg-jingga-muda/60 hover:text-ornamen",
              )}
            >
              <input
                type="radio"
                name="jenis"
                value={j.id}
                checked={jenis === j.id}
                onChange={() => {
                  setJenis(j.id);
                  setPesan(null);
                }}
                className="sr-only"
              />
              {j.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="lacak-tiket">Nomor tiket</Label>
          <Input id="lacak-tiket" name="tiket" required placeholder={aktif.contoh} autoComplete="off" className="font-mono" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lacak-kode">Kode verifikasi</Label>
          <SecretInput id="lacak-kode" name="kode" required placeholder="12 karakter" />
        </div>
      </div>
      <Button type="submit" size="lg" className="group sm:justify-self-start">
        <Search className="transition-transform group-hover:scale-110" aria-hidden="true" /> Lacak {aktif.label}
      </Button>
      <p className="min-h-5 text-sm text-ornamen" aria-live="polite">
        {pesan}
      </p>
    </form>
  );
}
