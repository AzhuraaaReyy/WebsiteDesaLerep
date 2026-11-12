import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-2xl border-2 p-4 text-sm [&>svg]:mt-0.5 [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        info: "border-jingga/45 bg-jingga-muda/45 text-ornamen [&>svg]:text-kunyit-700",
        sukses: "border-tosca-tua/30 bg-[#e4f5f1] text-[#0b4f46] [&>svg]:text-tosca-tua",
        galat: "border-galat/30 bg-[#fde9e7] text-[#7a1a12] [&>svg]:text-galat",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export function Alert({ className, variant, ...props }: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div role={variant === "galat" ? "alert" : "status"} className={cn(alertVariants({ variant }), className)} {...props} />;
}

export function AlertTitle({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("col-start-2 font-semibold leading-snug", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("col-start-2 leading-relaxed opacity-90", className)} {...props} />;
}
