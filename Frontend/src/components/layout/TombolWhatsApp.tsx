import { IkonWhatsApp } from "@/components/icons/brand";
import { gisa } from "@/data/gisa";

/** Tombol mengambang "Hubungi Admin" via WhatsApp di pojok kanan bawah semua halaman publik. */
export function TombolWhatsApp() {
  return (
    <a
      href={gisa.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Hubungi admin desa lewat WhatsApp (${gisa.telepon}), membuka tab baru`}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] p-3 text-white shadow-[0_12px_28px_-10px_rgb(18_140_126/0.85)] ring-4 ring-white/70 transition-[translate,box-shadow] duration-300 animate-in fade-in slide-in-from-bottom-6 [animation-delay:600ms] [animation-fill-mode:both] hover:-translate-y-1 hover:shadow-[0_18px_34px_-10px_rgb(18_140_126/0.95)] focus-visible:outline-none focus-visible:ring-[#128C7E] sm:bottom-6 sm:right-6 sm:pr-5"
    >
      <span className="relative grid size-8 place-items-center">
        <span className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-ping" aria-hidden="true" />
        <IkonWhatsApp className="relative size-8" aria-hidden="true" />
      </span>
      <span className="hidden text-sm font-bold leading-tight sm:block">
        Hubungi Admin
        <span className="block text-[0.7rem] font-semibold text-white/85">Chat via WhatsApp</span>
      </span>
    </a>
  );
}
