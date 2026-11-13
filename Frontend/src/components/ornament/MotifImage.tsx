import { asset } from "@/lib/asset";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Motif = "kuliner" | "budaya" | "alam";

const motifStyle: Record<Motif, { position: string; tint: string; art: "gunungan" | "burung" }> = {
  kuliner: { position: "20% 30%", tint: "from-kunyit/55 via-sogan/40 to-sogan-900/80", art: "burung" },
  budaya: { position: "70% 55%", tint: "from-sogan/50 via-sogan-700/55 to-sogan-900/85", art: "gunungan" },
  alam: { position: "40% 85%", tint: "from-tosca/45 via-sogan/45 to-sogan-900/80", art: "burung" },
};

/**
 * Bidang gambar kartu. Bila `src` diisi, foto asli ditampilkan;
 * bila kosong, dipakai komposisi motif batik + ilustrasi sebagai placeholder.
 */
export function MotifImage({
  src,
  alt,
  motif,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src?: string;
  alt: string;
  motif: Motif;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
    );
  }

  const m = motifStyle[motif];
  return (
    <div className={cn("relative overflow-hidden bg-sogan-900", className)} role="img" aria-label={alt}>
      <div
        className="absolute inset-0 scale-110 bg-cover transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundImage: `url(${asset("/images/batik.webp")})`, backgroundPosition: m.position }}
      />
      <div className={cn("absolute inset-0 bg-gradient-to-br", m.tint)} />
      <Image
        src={m.art === "gunungan" ? "/images/gunungan.png" : "/images/burung.png"}
        alt=""
        width={160}
        height={240}
        className={cn(
          "absolute bottom-[-12%] h-[115%] w-auto opacity-90 drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:-translate-y-2",
          m.art === "gunungan" ? "left-1/2 -translate-x-1/2" : "right-4",
        )}
      />
    </div>
  );
}
