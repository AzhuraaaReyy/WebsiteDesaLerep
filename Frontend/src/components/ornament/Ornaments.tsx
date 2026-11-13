import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pembatas ulir di bawah judul (aset `ornamen-pembatas.webp`, dipakai sebagai mask
 * sehingga warnanya mengikuti `currentColor`).
 */
const pembatasVariants = cva("block", {
  variants: {
    motif: { ulir: "ornamen-pembatas aspect-[595/95]", garis: "ornamen-garis aspect-[1002/118]" },
    align: { left: "w-44 sm:w-52", center: "mx-auto w-52 sm:w-64" },
    tone: { default: "text-sogan-soft", onDark: "text-kunyit-soft", ornamen: "text-ornamen" },
  },
  defaultVariants: { motif: "ulir", align: "center", tone: "default" },
});

export function OrnamenPembatas({ className, motif, align, tone }: { className?: string } & VariantProps<typeof pembatasVariants>) {
  return <span aria-hidden="true" className={cn(pembatasVariants({ motif, align, tone }), className)} />;
}

/**
 * Ornamen sudut emas (aset `ornamen-sudut.webp`). Gambar aslinya mengisi pojok kanan-bawah;
 * pojok lain didapat dengan memutar/mencerminkan.
 */
const sudutVariants = cva("ornamen-sudut pointer-events-none absolute", {
  variants: {
    position: {
      tl: "left-0 top-0 rotate-180",
      tr: "right-0 top-0 -scale-y-100",
      bl: "bottom-0 left-0 -scale-x-100",
      br: "bottom-0 right-0",
    },
    size: { sm: "size-11", md: "size-16", lg: "size-24 sm:size-28" },
    tone: { emas: "text-emas", terang: "text-kunyit-soft/90" },
    layer: { belakang: "-z-10", depan: "z-10" },
  },
  defaultVariants: { position: "br", size: "md", tone: "emas", layer: "belakang" },
});

type SudutProps = { className?: string } & Omit<VariantProps<typeof sudutVariants>, "position">;

export function CornerOrnament({ position, className, ...v }: SudutProps & Pick<VariantProps<typeof sudutVariants>, "position">) {
  return <span aria-hidden="true" className={cn(sudutVariants({ position, ...v }), className)} />;
}

/**
 * Pasangan ornamen sudut kiri-atas + kanan-bawah untuk kartu.
 * Induk wajib `relative isolate overflow-hidden` (layer "belakang" berada di balik isi
 * kartu sehingga teks tetap terbaca). Pakai layer "depan" bila pojok kartu berupa foto,
 * dan `tl`/`br` untuk mengatur satu pojok saja (mis. turun di bawah pita batik).
 */
export function CardCorners({ tl, br, ...props }: SudutProps & { tl?: SudutProps; br?: SudutProps }) {
  return (
    <>
      <CornerOrnament position="tl" {...props} {...tl} className={cn(props.className, tl?.className)} />
      <CornerOrnament position="br" {...props} {...br} className={cn(props.className, br?.className)} />
    </>
  );
}

/**
 * Label kecil di atas judul. Satu baris, tanpa glyph dekoratif. Rata kiri diberi garis
 * pendek sebagai penanda; rata tengah cukup teksnya saja.
 */
const eyebrowVariants = cva("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]", {
  variants: {
    align: { left: "justify-start", center: "justify-center text-center" },
    tone: { default: "text-kunyit-700", onDark: "text-kunyit-soft", ornamen: "text-ornamen" },
  },
  defaultVariants: { align: "center", tone: "default" },
});

export function Eyebrow({
  lines,
  align,
  tone,
  className,
}: { lines: string[]; className?: string } & VariantProps<typeof eyebrowVariants>) {
  return (
    <p className={cn(eyebrowVariants({ align, tone }), className)}>
      {align === "left" && <span aria-hidden="true" className="h-0.5 w-6 shrink-0 rounded-full bg-kunyit" />}
      <span>{lines.join(" ")}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
}: {
  eyebrow: string[];
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Eyebrow lines={eyebrow} />
      <h2 id={id} className="mt-2 font-serif text-[1.75rem] font-bold leading-tight text-sogan-900 sm:text-4xl">
        {title}
      </h2>
      <OrnamenPembatas className="mt-3" />
      {subtitle && <p className="mt-4 text-sm leading-relaxed text-tinta/80 sm:text-[0.95rem]">{subtitle}</p>}
    </div>
  );
}
