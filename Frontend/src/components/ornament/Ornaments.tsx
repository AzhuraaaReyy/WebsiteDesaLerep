import { cn } from "@/lib/utils";

/** Garis pembatas berukir: garis — sulur — wajik — sulur — garis */
export function OrnamentDivider({ className, align = "center" }: { className?: string; align?: "center" | "left" }) {
  return (
    <svg
      viewBox="0 0 360 24"
      aria-hidden="true"
      className={cn("h-5 w-72 text-sogan-soft sm:w-[22rem]", align === "center" && "mx-auto", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M2 12h128" />
      <path d="M230 12h128" />
      {/* sulur kiri */}
      <path d="M130 12c8 0 10-7 17-7s9 5 5 8-8 0-6-3" />
      <path d="M150 12c-6 0-9 6-14 5" opacity=".7" />
      {/* sulur kanan */}
      <path d="M230 12c-8 0-10-7-17-7s-9 5-5 8 8 0 6-3" />
      <path d="M210 12c6 0 9 6 14 5" opacity=".7" />
      {/* wajik tengah */}
      <path d="M180 3l8 9-8 9-8-9z" className="fill-kunyit-soft stroke-kunyit-600" />
      <circle cx="180" cy="12" r="2" className="fill-kunyit-600" stroke="none" />
      <path d="M160 12h10M190 12h10" />
      <circle cx="163" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="197" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Siku ornamen ukir untuk sudut kartu. Putar dengan prop `position`. */
export function CornerOrnament({
  position = "tl",
  className,
}: {
  position?: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const rotate = { tl: "", tr: "rotate-90", br: "rotate-180", bl: "-rotate-90" }[position];
  const place = {
    tl: "left-2 top-2",
    tr: "right-2 top-2",
    br: "right-2 bottom-2",
    bl: "left-2 bottom-2",
  }[position];
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={cn("pointer-events-none absolute size-8 text-sogan-soft", place, rotate, className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      <path d="M3 37V3h34" strokeWidth="1.8" />
      <path d="M8 37V8h29" strokeWidth="1" opacity=".75" />
      <path d="M12 12c4 0 8 2 10 6 1.5 3-.5 6-3 5.5-2-.5-2-3 0-3.5" strokeWidth="1.3" className="text-kunyit-600" stroke="currentColor" />
      <path d="M12 12c0 4 2 8 6 10" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="1.8" className="fill-kunyit-600" stroke="none" />
    </svg>
  );
}

/** Teks kecil berspasi di atas judul seksi, diapit dua wajik. */
export function Eyebrow({ lines, align = "center", className }: { lines: string[]; align?: "center" | "left"; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-serif text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-kunyit-600 sm:text-[0.7rem] sm:tracking-[0.35em]",
        align === "center" ? "justify-center text-center" : "justify-start",
        className,
      )}
    >
      <span aria-hidden="true" className="text-[0.6rem]">◆</span>
      <span className="leading-relaxed">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </span>
      {align === "center" && <span aria-hidden="true" className="text-[0.6rem]">◆</span>}
    </div>
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
      <OrnamentDivider className="mt-3" />
      {subtitle && <p className="mt-4 text-sm leading-relaxed text-tinta/80 sm:text-[0.95rem]">{subtitle}</p>}
    </div>
  );
}
