import { asset } from "@/lib/asset";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow, OrnamentDivider } from "@/components/ornament/Ornaments";
import { CONTENT_CONTAINER } from "@/lib/layout";
import { cn } from "@/lib/utils";

/** Judul halaman dalam (bukan beranda) dengan breadcrumb. */
export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-emas-soft/70 bg-mori-2">
      <div
        className="absolute inset-0 -z-10 opacity-[0.08] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        style={{ backgroundImage: `url(${asset("/images/batik.jpg")})`, backgroundSize: "420px" }}
        aria-hidden="true"
      />
      <div className={cn(CONTENT_CONTAINER, "py-12 sm:py-16")}>
        <nav aria-label="Breadcrumb" className="mb-6 text-xs font-medium text-tinta/70">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-kunyit-600">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="font-semibold text-sogan-900">
              {title}
            </li>
          </ol>
        </nav>
        <Eyebrow lines={[eyebrow]} align="left" />
        <h1 className="mt-3 font-serif text-3xl font-bold text-sogan-900 sm:text-5xl">{title}</h1>
        <OrnamentDivider align="left" className="mt-4 w-64" />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-tinta/85 sm:text-base">{description}</p>
      </div>
    </section>
  );
}
