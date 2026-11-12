import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Kelas dasar kolom isian — dipakai Input, Textarea, Select, dan SecretInput. */
export const fieldBase = [
  "w-full min-w-0 rounded-xl border-2 border-ornamen/15 bg-white/85 px-4 text-base text-ornamen",
  "shadow-[inset_0_1px_2px_rgb(86_47_0/0.06)] transition-[border-color,box-shadow,background-color] duration-200",
  "placeholder:text-ornamen/40 hover:border-ornamen/30",
  "focus-visible:border-jingga focus-visible:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-jingga/25",
  "aria-[invalid=true]:border-galat/70 aria-[invalid=true]:bg-[#fff8f7] aria-[invalid=true]:focus-visible:ring-galat/15",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-12 read-only:bg-mori-2/70", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-36 resize-y py-3 leading-relaxed", className)} {...props} />;
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-sm font-semibold text-ornamen", className)} {...props} />;
}
