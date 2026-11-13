"use client";

import { useEffect, useRef, useState, type ComponentProps, type DragEvent, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  FileText,
  ImageIcon,
  Lightbulb,
  Lock,
  Megaphone,
  Pencil,
  Send,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { fieldBase, Input, Label, Textarea } from "@/components/ui/input";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { kirimPartisipasi } from "./api";
import { daftarLangkah, KOLOM_LANGKAH, KONTEN } from "./content";
import type { DataBukti } from "./pdf";
import { AKSEP_LAMPIRAN, BATAS, buatSchema, formatUkuran, LAMPIRAN, NILAI_AWAL, saringLampiran, type Jenis, type NilaiForm } from "./schema";
import { SuccessDialog } from "./SuccessDialog";

/* ───────────────────────── Bagian kecil ───────────────────────── */

/** Pembungkus kolom: label, penanda wajib/opsional, petunjuk, pesan galat, dan animasi masuk berjenjang. */
function Bidang({
  id,
  label,
  wajib,
  petunjuk,
  galat,
  penghitung,
  urutan = 0,
  children,
}: {
  id: string;
  label: string;
  wajib?: boolean;
  petunjuk?: string;
  galat?: string;
  penghitung?: ReactNode;
  urutan?: number;
  children: ReactNode;
}) {
  return (
    <div
      className="grid content-start gap-2 animate-in fade-in slide-in-from-bottom-3 duration-500 [animation-fill-mode:both]"
      style={{ animationDelay: `${80 + urutan * 70}ms` }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>
          {label}
          {wajib ? (
            <span className="text-galat" aria-hidden="true">
              {" "}
              *
            </span>
          ) : (
            <span className="font-normal text-ornamen/60"> (opsional)</span>
          )}
        </Label>
        {penghitung}
      </div>
      {children}
      {galat ? (
        <p id={`${id}-galat`} className="flex items-start gap-1.5 text-[0.82rem] font-medium text-galat animate-in fade-in slide-in-from-top-1 duration-300">
          <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {galat}
        </p>
      ) : (
        petunjuk && (
          <p id={`${id}-petunjuk`} className="text-xs leading-relaxed text-ornamen/70">
            {petunjuk}
          </p>
        )
      )}
    </div>
  );
}

function Penghitung({ nilai, maks }: { nilai: string; maks: number }) {
  const rasio = nilai.length / maks;
  return (
    <span
      className={cn(
        "text-xs tabular-nums transition-colors",
        rasio > 1 ? "font-semibold text-galat" : rasio > 0.9 ? "font-semibold text-kunyit-700" : "text-ornamen/55",
      )}
      aria-hidden="true"
    >
      {nilai.length}/{maks}
    </span>
  );
}

/** Kotak centang bergaya dengan animasi centang. */
function KotakCentang({ id, checked, children, galat, ...rest }: { id: string; checked: boolean; children: ReactNode; galat?: boolean } & Omit<ComponentProps<"input">, "type" | "id" | "checked">) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors",
        checked ? "border-jingga bg-jingga-muda/45" : galat ? "border-galat/50 bg-[#fff8f7]" : "border-ornamen/15 bg-white/70 hover:border-ornamen/30",
        "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-jingga/30",
      )}
    >
      <input id={id} type="checkbox" checked={checked} className="peer sr-only" {...rest} />
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-[background-color,border-color,scale] duration-200 group-active:scale-90",
          checked ? "border-ornamen bg-ornamen text-mori" : "border-ornamen/40 bg-white",
        )}
        aria-hidden="true"
      >
        <Check className={cn("size-4 transition-[opacity,scale] duration-200", checked ? "scale-100 opacity-100" : "scale-0 opacity-0")} strokeWidth={3} />
      </span>
      <span className="text-sm leading-relaxed text-ornamen">{children}</span>
    </label>
  );
}

/* ───────────────────────── Stepper ───────────────────────── */

function Stepper({ langkah, aktif }: { langkah: { label: string }[]; aktif: number }) {
  return (
    <nav aria-label="Langkah pengisian">
      <ol className="flex items-start">
        {langkah.map((l, i) => {
          const selesai = i < aktif;
          const kini = i === aktif;
          return (
            <li key={l.label} className="flex flex-1 items-start last:flex-none" aria-current={kini ? "step" : undefined}>
              <div className="flex flex-col items-center gap-2">
                <span className="relative grid size-10 place-items-center">
                  {kini && <span className="absolute inset-0 rounded-full bg-jingga/50 motion-safe:animate-ping [animation-duration:2s]" aria-hidden="true" />}
                  <span
                    className={cn(
                      "relative grid size-10 place-items-center rounded-full border-2 text-sm font-bold transition-[background-color,border-color,color,scale] duration-500",
                      selesai && "border-ornamen bg-ornamen text-mori",
                      kini && "scale-110 border-ornamen bg-jingga text-ornamen shadow-[0_6px_18px_-4px_rgb(255_150_68/0.9)]",
                      !selesai && !kini && "border-ornamen/20 bg-white/70 text-ornamen/45",
                    )}
                  >
                    {selesai ? <Check className="size-5 animate-in zoom-in-50 duration-300" strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                </span>
                <span className={cn("hidden max-w-24 text-center text-xs font-semibold leading-tight sm:block", kini ? "text-ornamen" : "text-ornamen/55")}>
                  {l.label}
                  <span className="sr-only">{selesai ? " (selesai)" : kini ? " (langkah saat ini)" : ""}</span>
                </span>
              </div>
              {i < langkah.length - 1 && (
                <span className="mx-1.5 mt-[1.15rem] h-1 flex-1 overflow-hidden rounded-full bg-ornamen/12 sm:mx-2" aria-hidden="true">
                  <span
                    className="block h-full origin-left rounded-full bg-[linear-gradient(90deg,var(--color-ornamen),var(--color-jingga))] transition-[scale] duration-700 ease-out"
                    style={{ scale: `${selesai ? 1 : 0} 1` }}
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-center text-xs font-semibold text-ornamen/70 sm:hidden">
        Langkah {aktif + 1} dari {langkah.length} — {langkah[aktif].label}
      </p>
    </nav>
  );
}

/* ───────────────────────── Formulir utama ───────────────────────── */

export function ParticipationForm({ jenis, onTutup }: { jenis: Jenis; onTutup: () => void }) {
  const k = KONTEN[jenis];
  const langkahList = daftarLangkah(jenis);
  const [langkah, setLangkah] = useState(0);
  const [arah, setArah] = useState<"maju" | "mundur">("maju");
  const [sopDibaca, setSopDibaca] = useState(false);
  const [galatSop, setGalatSop] = useState(false);
  const [lampiran, setLampiran] = useState<File[]>([]);
  const [galatLampiran, setGalatLampiran] = useState<string[]>([]);
  const [seret, setSeret] = useState(false);
  const [guncang, setGuncang] = useState(false);
  const [galatKirim, setGalatKirim] = useState<string | null>(null);
  const [bukti, setBukti] = useState<DataBukti | null>(null);
  const judulRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const sudahMulai = useRef(false);

  const {
    register,
    control,
    trigger,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NilaiForm>({
    resolver: zodResolver(buatSchema(jenis)),
    defaultValues: NILAI_AWAL,
    mode: "onTouched",
  });

  const nilai = useWatch({ control });
  const idLangkah = langkahList[langkah].id;

  // Fokus ke judul langkah setelah berpindah (pembaca layar & keyboard), dan pastikan panel terlihat.
  useEffect(() => {
    if (!sudahMulai.current) {
      sudahMulai.current = true;
      return;
    }
    judulRef.current?.focus({ preventScroll: true });
    const atas = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (atas < 0) {
      const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ behavior: kurangiGerak ? "auto" : "smooth", block: "start" });
    }
  }, [langkah]);

  const goyangkan = () => setGuncang(true);

  const pindah = (ke: number) => {
    setArah(ke > langkah ? "maju" : "mundur");
    setLangkah(ke);
  };

  const lanjut = async () => {
    if (idLangkah === "sop") {
      if (!sopDibaca) {
        setGalatSop(true);
        goyangkan();
        return;
      }
      pindah(1);
      return;
    }
    const valid = await trigger(KOLOM_LANGKAH[jenis][idLangkah], { shouldFocus: true });
    if (!valid) {
      goyangkan();
      return;
    }
    pindah(langkah + 1);
  };

  const kirim = handleSubmit(
    async (data) => {
      setGalatKirim(null);
      try {
        const lampiranKirim = jenis === "pengaduan" ? lampiran : [];
        const hasil = await kirimPartisipasi(jenis, data, lampiranKirim);
        setBukti({ hasil, data, lampiran: lampiranKirim.map((f) => ({ nama: f.name, ukuran: f.size })) });
      } catch (e) {
        setGalatKirim(e instanceof Error ? e.message : "Terjadi kesalahan. Silakan coba lagi.");
        goyangkan();
      }
    },
    () => goyangkan(),
  );

  const tambahLampiran = (files: FileList | null) => {
    if (!files?.length) return;
    const { diterima, galat } = saringLampiran(lampiran, Array.from(files));
    setLampiran(diterima);
    setGalatLampiran(galat);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setSeret(false);
    tambahLampiran(e.dataTransfer.files);
  };

  const selesai = () => {
    setBukti(null);
    reset(NILAI_AWAL);
    setLampiran([]);
    setSopDibaca(false);
    setLangkah(0);
    onTutup();
  };

  const aria = (nama: keyof NilaiForm, petunjuk = false) => ({
    "aria-invalid": errors[nama] ? true : undefined,
    "aria-describedby": errors[nama] ? `f-${nama}-galat` : petunjuk ? `f-${nama}-petunjuk` : undefined,
  });

  const Ikon = jenis === "pengaduan" ? Megaphone : Lightbulb;

  return (
    <section
      ref={panelRef}
      id="panel-partisipasi"
      aria-labelledby="judul-panel"
      className="relative isolate scroll-mt-28 overflow-hidden rounded-[1.75rem] border-2 border-jingga/45 bg-[linear-gradient(165deg,#fffaf3_0%,#fff3e3_100%)] shadow-[0_24px_60px_-28px_rgb(86_47_0/0.45)]"
    >
      {/* Kepala panel */}
      <header className="relative isolate overflow-hidden bg-ornamen px-5 pb-8 pt-6 text-mori sm:px-8">
        <div
          className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
          style={{ backgroundImage: `url(${asset("/images/batik.webp")})`, backgroundSize: "380px" }}
          aria-hidden="true"
        />
        <div className="absolute -right-10 -top-16 -z-10 size-56 rounded-full bg-jingga/25 blur-2xl" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-jingga text-ornamen shadow-[0_8px_20px_-6px_rgb(255_150_68/0.8)] motion-safe:animate-[ayun_3s_ease-in-out_infinite]">
              <Ikon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-jingga-muda">Formulir daring</p>
              <h3 id="judul-panel" className="font-serif text-xl font-bold leading-tight sm:text-2xl">
                {k.judul}
              </h3>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onTutup} aria-label="Tutup formulir" className="text-mori hover:bg-white/10">
            <X aria-hidden="true" />
          </Button>
        </div>
        <div className="pita-tumpal absolute inset-x-0 bottom-0 h-3" aria-hidden="true" />
      </header>

      <div className="px-5 pb-6 pt-7 sm:px-8 sm:pb-8">
        <Stepper langkah={langkahList} aktif={langkah} />

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (idLangkah === "tinjau") void kirim();
            else void lanjut();
          }}
          className={cn("mt-8", guncang && "motion-safe:animate-[guncang_0.45s_ease-in-out]")}
          onAnimationEnd={(e) => {
            if (e.animationName === "guncang") setGuncang(false);
          }}
        >
          {/* Honeypot — tersembunyi dari pengguna dan teknologi bantu */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label>
              Situs web
              <input tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <div
            key={idLangkah}
            className={cn(
              "animate-in fade-in duration-500",
              arah === "maju" ? "slide-in-from-right-10" : "slide-in-from-left-10",
            )}
          >
            <h4 ref={judulRef} tabIndex={-1} className="font-serif text-xl font-bold text-ornamen outline-none">
              {langkahList[langkah].label}
            </h4>

            {/* ── Langkah 1: SOP ── */}
            {idLangkah === "sop" && (
              <div className="mt-5 grid gap-6">
                <p className="text-sm leading-relaxed text-ornamen/80">{k.ringkas} Baca prosedur berikut sebelum mengisi formulir.</p>
                <ol className="relative grid gap-3">
                  {k.sop.map((s, i) => (
                    <li
                      key={s.judul}
                      className="group relative flex gap-4 rounded-2xl border-2 border-ornamen/10 bg-white/75 p-4 transition-[border-color,translate,box-shadow] duration-300 animate-in fade-in slide-in-from-left-4 [animation-fill-mode:both] hover:translate-x-1 hover:border-jingga/60 hover:shadow-[0_10px_24px_-14px_rgb(86_47_0/0.5)]"
                      style={{ animationDelay: `${120 + i * 90}ms`, animationDuration: "500ms" }}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ornamen font-serif text-sm font-bold text-jingga-muda ring-4 ring-jingga/25 transition-[background-color,color] group-hover:bg-jingga group-hover:text-ornamen">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-semibold text-ornamen">{s.judul}</span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-ornamen/80">{s.isi}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border-2 border-ornamen/10 bg-white/60 p-5 animate-in fade-in duration-500 [animation-delay:600ms] [animation-fill-mode:both]">
                    <p className="flex items-center gap-2 font-semibold text-ornamen">
                      <ShieldCheck className="size-5 text-kunyit-700" aria-hidden="true" /> Ketentuan
                    </p>
                    <ul className="mt-3 grid gap-2">
                      {k.ketentuan.map((t) => (
                        <li key={t} className="flex gap-2 text-sm leading-relaxed text-ornamen/85">
                          <Check className="mt-0.5 size-4 shrink-0 text-tosca-tua" aria-hidden="true" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border-2 border-ornamen/10 bg-white/60 p-5 animate-in fade-in duration-500 [animation-delay:700ms] [animation-fill-mode:both]">
                    <p className="flex items-center gap-2 font-semibold text-ornamen">
                      <Lock className="size-5 text-kunyit-700" aria-hidden="true" /> Alur status
                    </p>
                    <ol className="mt-3 flex flex-wrap items-center gap-1.5">
                      {k.alurStatus.map((s, i) => (
                        <li key={s} className="flex items-center gap-1.5">
                          <span className="rounded-full bg-jingga-muda px-3 py-1 text-xs font-semibold text-ornamen">{s}</span>
                          {i < k.alurStatus.length - 1 && <ArrowRight className="size-3.5 text-ornamen/50" aria-hidden="true" />}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 text-xs leading-relaxed text-ornamen/70">{k.statusLain}</p>
                  </div>
                </div>

                <Alert variant="info">
                  <AlertCircle aria-hidden="true" />
                  <AlertTitle>SOP sementara</AlertTitle>
                  <AlertDescription>Prosedur resmi dan waktu tanggapan menunggu penetapan Pemerintah Desa Lerep.</AlertDescription>
                </Alert>

                <KotakCentang
                  id="baca-sop"
                  checked={sopDibaca}
                  galat={galatSop && !sopDibaca}
                  onChange={(e) => {
                    setSopDibaca(e.target.checked);
                    if (e.target.checked) setGalatSop(false);
                  }}
                  aria-describedby={galatSop && !sopDibaca ? "baca-sop-galat" : undefined}
                >
                  Saya telah membaca dan memahami SOP {jenis === "pengaduan" ? "pengaduan" : "aspirasi"} di atas.
                </KotakCentang>
                {galatSop && !sopDibaca && (
                  <p id="baca-sop-galat" className="-mt-3 flex items-center gap-1.5 text-[0.82rem] font-medium text-galat animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="size-3.5" aria-hidden="true" /> Centang pernyataan ini untuk mulai mengisi formulir.
                  </p>
                )}
              </div>
            )}

            {/* ── Langkah 2: Identitas ── */}
            {idLangkah === "identitas" && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <p className="text-sm leading-relaxed text-ornamen/80 sm:col-span-2">
                  {jenis === "pengaduan" ? "Pengaduan tidak dapat dikirim secara anonim." : "Identitas diperlukan untuk klarifikasi."} Data
                  ini hanya dapat dilihat oleh petugas berwenang.
                </p>
                <Bidang id="f-nama" label="Nama lengkap" wajib galat={errors.nama?.message} urutan={0}>
                  <Input id="f-nama" autoComplete="name" placeholder="Nama sesuai identitas" aria-required {...aria("nama")} {...register("nama")} />
                </Bidang>
                <Bidang id="f-telepon" label="Telepon / WhatsApp" wajib galat={errors.telepon?.message} petunjuk="Untuk konfirmasi dari petugas." urutan={1}>
                  <Input
                    id="f-telepon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0812-3456-7890"
                    aria-required
                    {...aria("telepon", true)}
                    {...register("telepon")}
                  />
                </Bidang>
                <Bidang id="f-email" label="Email" galat={errors.email?.message} urutan={2}>
                  <Input id="f-email" type="email" inputMode="email" autoComplete="email" placeholder="nama@contoh.id" {...aria("email")} {...register("email")} />
                </Bidang>
                {jenis === "pengaduan" && (
                  <Bidang id="f-alamat" label="Alamat" galat={errors.alamat?.message} petunjuk="RT/RW dan dusun bila berdomisili di Lerep." urutan={3}>
                    <Input id="f-alamat" autoComplete="street-address" placeholder="RT 03 RW 02, Dusun …" {...aria("alamat", true)} {...register("alamat")} />
                  </Bidang>
                )}
              </div>
            )}

            {/* ── Langkah 3: Isi ── */}
            {idLangkah === "isi" && (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Bidang id="f-kategori" label="Kategori" wajib={jenis === "aspirasi"} galat={errors.kategori?.message} urutan={0}>
                  <div className="relative">
                    <select
                      id="f-kategori"
                      className={cn(fieldBase, "h-12 cursor-pointer appearance-none pr-11")}
                      aria-required={jenis === "aspirasi" || undefined}
                      {...aria("kategori")}
                      {...register("kategori")}
                    >
                      <option value="">{jenis === "aspirasi" ? "Pilih kategori" : "Pilih kategori (opsional)"}</option>
                      {k.kategori.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-ornamen/60" aria-hidden="true" />
                  </div>
                </Bidang>
                {jenis === "pengaduan" ? (
                  <Bidang id="f-lokasi" label="Lokasi kejadian" galat={errors.lokasi?.message} urutan={1}>
                    <Input id="f-lokasi" placeholder="mis. Depan Balai Dusun Karangbolo" {...aria("lokasi")} {...register("lokasi")} />
                  </Bidang>
                ) : (
                  <div className="hidden sm:block" aria-hidden="true" />
                )}
                <div className="sm:col-span-2">
                  <Bidang
                    id="f-perihal"
                    label={k.labelPerihal}
                    wajib
                    galat={errors.perihal?.message}
                    penghitung={<Penghitung nilai={nilai.perihal ?? ""} maks={BATAS.perihal} />}
                    urutan={2}
                  >
                    <Input id="f-perihal" placeholder={k.contohPerihal} maxLength={BATAS.perihal + 20} aria-required {...aria("perihal")} {...register("perihal")} />
                  </Bidang>
                </div>
                <div className="sm:col-span-2">
                  <Bidang
                    id="f-uraian"
                    label={k.labelUraian}
                    wajib
                    galat={errors.uraian?.message}
                    petunjuk={k.petunjukUraian}
                    penghitung={<Penghitung nilai={nilai.uraian ?? ""} maks={BATAS.uraianMaks} />}
                    urutan={3}
                  >
                    <Textarea id="f-uraian" rows={6} aria-required {...aria("uraian", true)} {...register("uraian")} />
                  </Bidang>
                </div>

                {jenis === "pengaduan" && (
                  <div className="grid gap-3 sm:col-span-2 animate-in fade-in slide-in-from-bottom-3 duration-500 [animation-delay:400ms] [animation-fill-mode:both]">
                    <p className="text-sm font-semibold text-ornamen" id="lampiran-label">
                      Lampiran bukti <span className="font-normal text-ornamen/60">(opsional)</span>
                    </p>
                    <label
                      htmlFor="f-lampiran"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setSeret(true);
                      }}
                      onDragLeave={() => setSeret(false)}
                      onDrop={onDrop}
                      className={cn(
                        "group relative flex cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed px-5 py-7 text-center transition-[border-color,background-color,scale] duration-300",
                        "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-jingga/30",
                        seret ? "scale-[1.01] border-jingga bg-jingga-muda/55" : "border-ornamen/25 bg-white/55 hover:border-jingga hover:bg-white/80",
                        lampiran.length >= LAMPIRAN.maksJumlah && "pointer-events-none opacity-60",
                      )}
                    >
                      <span className={cn("grid size-14 place-items-center rounded-full bg-jingga-muda text-ornamen transition-transform duration-300 group-hover:-translate-y-1", seret && "-translate-y-1 animate-bounce")}>
                        <UploadCloud className="size-7" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-ornamen">
                        {seret ? "Lepaskan file di sini" : (
                          <>
                            Seret file ke sini atau <span className="text-kunyit-700 underline underline-offset-4">pilih file</span>
                          </>
                        )}
                      </span>
                      <span className="text-xs text-ornamen/65">
                        PDF, JPG, atau PNG · maks. 5 MB per file · maks. {LAMPIRAN.maksJumlah} file
                      </span>
                      <input
                        id="f-lampiran"
                        type="file"
                        multiple
                        accept={AKSEP_LAMPIRAN}
                        className="sr-only"
                        aria-describedby="lampiran-label"
                        disabled={lampiran.length >= LAMPIRAN.maksJumlah}
                        onChange={(e) => {
                          tambahLampiran(e.target.files);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    {galatLampiran.length > 0 && (
                      <Alert variant="galat" className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <AlertCircle aria-hidden="true" />
                        <AlertTitle>Sebagian file tidak ditambahkan</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-4">
                            {galatLampiran.map((g) => (
                              <li key={g}>{g}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                    {lampiran.length > 0 && (
                      <ul className="grid gap-2" aria-label="Lampiran terpilih">
                        {lampiran.map((f) => {
                          const IkonFile = f.type === "application/pdf" ? FileText : ImageIcon;
                          return (
                            <li
                              key={f.name + f.size}
                              className="flex items-center gap-3 rounded-xl border-2 border-ornamen/10 bg-white/85 px-3 py-2.5 animate-in fade-in slide-in-from-left-3 duration-300"
                            >
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-jingga-muda text-ornamen">
                                <IkonFile className="size-4" aria-hidden="true" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-ornamen" title={f.name}>
                                  {f.name}
                                </span>
                                <span className="block text-xs text-ornamen/60">{formatUkuran(f.size)}</span>
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-9"
                                onClick={() => setLampiran((l) => l.filter((x) => x !== f))}
                                aria-label={`Hapus lampiran ${f.name}`}
                              >
                                <X aria-hidden="true" />
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Langkah 4: Tinjau ── */}
            {idLangkah === "tinjau" && (
              <div className="mt-5 grid gap-5">
                <p className="text-sm leading-relaxed text-ornamen/80">Periksa kembali isian Anda sebelum dikirim.</p>
                {[
                  {
                    judul: `Data ${k.pelaku}`,
                    ke: 1,
                    baris: [
                      ["Nama lengkap", getValues("nama")],
                      ["Telepon / WhatsApp", getValues("telepon")],
                      ["Email", getValues("email")],
                      ...(jenis === "pengaduan" ? [["Alamat", getValues("alamat")]] : []),
                    ],
                  },
                  {
                    judul: langkahList[2].label,
                    ke: 2,
                    baris: [
                      ["Kategori", getValues("kategori")],
                      [k.labelPerihal, getValues("perihal")],
                      ...(jenis === "pengaduan" ? [["Lokasi kejadian", getValues("lokasi")]] : []),
                      [k.labelUraian, getValues("uraian")],
                      ...(jenis === "pengaduan"
                        ? [["Lampiran", lampiran.length ? lampiran.map((f) => `${f.name} (${formatUkuran(f.size)})`).join(", ") : ""]]
                        : []),
                    ],
                  },
                ].map((g, gi) => (
                  <div
                    key={g.judul}
                    className="rounded-2xl border-2 border-ornamen/10 bg-white/75 animate-in fade-in slide-in-from-bottom-3 duration-500 [animation-fill-mode:both]"
                    style={{ animationDelay: `${120 + gi * 120}ms` }}
                  >
                    <div className="flex items-center justify-between gap-3 border-b-2 border-ornamen/10 px-5 py-3">
                      <p className="font-semibold text-ornamen">{g.judul}</p>
                      <Button variant="ghost" size="sm" onClick={() => pindah(g.ke)} aria-label={`Ubah ${g.judul}`}>
                        <Pencil aria-hidden="true" /> Ubah
                      </Button>
                    </div>
                    <dl className="divide-y divide-ornamen/8 px-5">
                      {g.baris.map(([label, isi]) => (
                        <div key={label} className="grid gap-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-ornamen/60">{label}</dt>
                          <dd className={cn("whitespace-pre-line text-sm [overflow-wrap:anywhere]", isi ? "text-ornamen" : "text-ornamen/45 italic")}>
                            {isi || "Tidak diisi"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}

                <KotakCentang
                  id="f-persetujuan"
                  checked={nilai.persetujuan ?? false}
                  galat={!!errors.persetujuan}
                  aria-describedby={errors.persetujuan ? "f-persetujuan-galat" : undefined}
                  onChange={(e) => setValue("persetujuan", e.target.checked, { shouldValidate: true })}
                >
                  Saya menyatakan data yang saya isi benar dan menyetujui pemrosesannya oleh Pemerintah Desa Lerep untuk
                  menindaklanjuti {jenis === "pengaduan" ? "pengaduan" : "aspirasi"} ini.
                </KotakCentang>
                {errors.persetujuan && (
                  <p id="f-persetujuan-galat" className="-mt-3 flex items-center gap-1.5 text-[0.82rem] font-medium text-galat animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="size-3.5" aria-hidden="true" /> {errors.persetujuan.message}
                  </p>
                )}

                {galatKirim && (
                  <Alert variant="galat" className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle aria-hidden="true" />
                    <AlertTitle>Gagal mengirim</AlertTitle>
                    <AlertDescription>{galatKirim}</AlertDescription>
                  </Alert>
                )}
                <p className="flex items-center gap-2 text-xs text-ornamen/65">
                  <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                  Formulir dilindungi anti-spam; verifikasi CAPTCHA aktif saat terhubung ke server desa.
                </p>
              </div>
            )}
          </div>

          {/* Navigasi langkah */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t-2 border-dashed border-ornamen/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {langkah === 0 ? (
              <Button variant="ghost" size="lg" onClick={onTutup}>
                Batal
              </Button>
            ) : (
              <Button variant="outline" size="lg" onClick={() => pindah(langkah - 1)} className="group" disabled={isSubmitting}>
                <ArrowLeft className="transition-transform group-hover:-translate-x-1" aria-hidden="true" /> Kembali
              </Button>
            )}
            {idLangkah === "tinjau" ? (
              <Button type="submit" size="lg" loading={isSubmitting} className="group min-w-52">
                {isSubmitting ? (
                  "Mengirim…"
                ) : (
                  <>
                    <Send className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /> {k.kataKerja}
                  </>
                )}
              </Button>
            ) : (
              <Button type="submit" size="lg" className="group min-w-52">
                {langkah === 0 ? "Mulai Mengisi" : "Lanjut"}
                <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            )}
          </div>
        </form>
      </div>

      <SuccessDialog bukti={bukti} onClose={selesai} />
    </section>
  );
}
