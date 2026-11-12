"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { fieldBase } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SecretInputProps = Omit<ComponentProps<"input">, "type"> & {
  /** Nama isian untuk label tombol aksesibel, mis. "kode verifikasi". */
  revealLabel?: string;
};

/**
 * Kolom rahasia dengan tombol tampilkan/sembunyikan (pola "show password").
 * Tombol memakai `aria-pressed` sehingga pembaca layar tahu keadaannya.
 */
export function SecretInput({ className, revealLabel = "kode verifikasi", ...props }: SecretInputProps) {
  const [shown, setShown] = useState(false);
  const label = shown ? `Sembunyikan ${revealLabel}` : `Tampilkan ${revealLabel}`;

  return (
    <div className="relative">
      <input
        type={shown ? "text" : "password"}
        autoComplete="off"
        spellCheck={false}
        data-1p-ignore=""
        data-lpignore="true"
        className={cn(fieldBase, "h-12 pr-13 font-mono tracking-[0.04em] read-only:bg-mori-2/70 min-[420px]:tracking-[0.14em]", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShown((s) => !s)}
        aria-pressed={shown}
        aria-label={label}
        title={label}
        className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-ornamen/70 transition-colors hover:bg-jingga-muda/70 hover:text-ornamen focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70"
      >
        <span className="relative size-5" aria-hidden="true">
          <Eye
            className={cn(
              "absolute inset-0 size-5 transition-[opacity,rotate,scale] duration-300",
              shown ? "rotate-45 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
            )}
          />
          <EyeOff
            className={cn(
              "absolute inset-0 size-5 transition-[opacity,rotate,scale] duration-300",
              shown ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-50 opacity-0",
            )}
          />
        </span>
      </button>
    </div>
  );
}
