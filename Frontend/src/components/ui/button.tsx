import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Tombol bergaya shadcn/ui dengan palet desa.
 * `primary` memakai jingga #FF9644 + teks #562F00 (kontras ±5,4:1, lolos AA).
 */
export const buttonVariants = cva(
  [
    "relative inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold",
    "transition-[background-color,border-color,color,box-shadow,translate,scale] duration-200 ease-out active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-jingga/70 focus-visible:ring-offset-2 focus-visible:ring-offset-mori",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-2 border-ornamen bg-jingga text-ornamen shadow-[0_8px_20px_-8px_rgb(255_150_68/0.9)] hover:-translate-y-0.5 hover:bg-kunyit hover:shadow-[0_12px_24px_-8px_rgb(255_150_68/0.95)]",
        dark: "border-2 border-ornamen bg-ornamen text-mori hover:-translate-y-0.5 hover:bg-sogan-700",
        outline: "border-2 border-ornamen/25 bg-white/70 text-ornamen hover:border-jingga hover:bg-white",
        ghost: "text-ornamen hover:bg-jingga-muda/60",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Menampilkan spinner dan menonaktifkan tombol selama proses async. */
    loading?: boolean;
  };

export function Button({ className, variant, size, loading = false, disabled, children, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
