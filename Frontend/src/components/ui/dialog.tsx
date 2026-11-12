"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Dialog modal berbasis elemen <dialog> bawaan peramban: focus trap, tombol Esc,
 * dan lapisan teratas sudah ditangani peramban. Fokus kembali ke pemicu saat ditutup.
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  dismissible = true,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  /** false = klik latar dan tombol Esc tidak menutup dialog. */
  dismissible?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && el.open) {
      el.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={(e) => {
        e.preventDefault();
        if (dismissible) onClose();
      }}
      onClick={(e) => {
        if (dismissible && e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-1.5rem)] w-[min(calc(100%-1.5rem),36rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border-2 border-jingga/50 bg-mori p-0 text-ornamen shadow-[0_30px_80px_-20px_rgb(86_47_0/0.55)]",
        "backdrop:bg-ornamen/55 backdrop:backdrop-blur-[3px]",
        "open:animate-in open:fade-in open:zoom-in-90 open:slide-in-from-bottom-4 open:duration-500",
        className,
      )}
    >
      {open && children}
    </dialog>
  );
}
