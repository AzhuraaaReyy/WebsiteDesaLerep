"use client";

import { useState } from "react";
import { AlertTriangle, Check, CheckCircle2, Copy, Download, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui/input";
import { SecretInput } from "@/components/ui/secret-input";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { formatKode } from "./api";
import { KONTEN } from "./content";
import { buatBuktiPdf, formatWaktu, type DataBukti } from "./pdf";

function TombolSalin({ nilai, label, onSalin }: { nilai: string; label: string; onSalin: () => void }) {
  const [status, setStatus] = useState<"diam" | "ok" | "gagal">("diam");
  const salin = async () => {
    try {
      await navigator.clipboard.writeText(nilai);
      setStatus("ok");
      onSalin();
    } catch {
      setStatus("gagal");
    }
    window.setTimeout(() => setStatus("diam"), 2200);
  };
  return (
    <>
      <Button variant="outline" size="icon" className="size-12 shrink-0 rounded-xl" onClick={salin} aria-label={`Salin ${label}`} title={`Salin ${label}`}>
        <span className="relative size-4" aria-hidden="true">
          <Copy className={cn("absolute inset-0 transition-[opacity,scale] duration-300", status === "ok" ? "scale-50 opacity-0" : "scale-100 opacity-100")} />
          <Check className={cn("absolute inset-0 text-tosca-tua transition-[opacity,scale] duration-300", status === "ok" ? "scale-100 opacity-100" : "scale-50 opacity-0")} />
        </span>
      </Button>
      <span className="sr-only" aria-live="polite">
        {status === "ok" ? `${label} disalin` : status === "gagal" ? `Gagal menyalin ${label}, salin secara manual` : ""}
      </span>
    </>
  );
}

/** Centang beranimasi: lingkaran riak + garis centang yang tergambar. */
function CentangSukses() {
  return (
    <span className="relative grid size-20 place-items-center" aria-hidden="true">
      <span className="absolute inset-0 rounded-full bg-jingga/40 motion-safe:animate-[riak_1.6s_ease-out_0.2s_both]" />
      <span className="absolute inset-0 rounded-full bg-jingga/30 motion-safe:animate-[riak_1.6s_ease-out_0.55s_both]" />
      <span className="relative grid size-20 place-items-center rounded-full border-4 border-mori bg-jingga shadow-[0_10px_30px_-6px_rgb(255_150_68/0.9)] animate-in zoom-in-50 duration-500">
        <svg viewBox="0 0 24 24" className="size-10 text-ornamen" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} className="[stroke-dasharray:1] [stroke-dashoffset:0] motion-safe:animate-[gambar-centang_0.6s_ease-out_0.35s_both]" />
        </svg>
      </span>
    </span>
  );
}

export function SuccessDialog({ bukti, onClose }: { bukti: DataBukti | null; onClose: () => void }) {
  const [sudahDisimpan, setSudahDisimpan] = useState(false);
  const [konfirmasiTutup, setKonfirmasiTutup] = useState(false);
  const [mengunduh, setMengunduh] = useState(false);

  const tutup = () => {
    if (!sudahDisimpan && !konfirmasiTutup) {
      setKonfirmasiTutup(true);
      return;
    }
    setSudahDisimpan(false);
    setKonfirmasiTutup(false);
    onClose();
  };

  const unduh = () => {
    if (!bukti) return;
    setMengunduh(true);
    try {
      const blob = buatBuktiPdf(bukti);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bukti-${bukti.hasil.jenis}-${bukti.hasil.nomorTiket}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      setSudahDisimpan(true);
      setKonfirmasiTutup(false);
    } finally {
      setMengunduh(false);
    }
  };

  const k = bukti ? KONTEN[bukti.hasil.jenis] : null;

  return (
    <Dialog open={bukti !== null} onClose={tutup} labelledBy="judul-sukses" describedBy="desk-sukses" dismissible={false}>
      {bukti && k && (
        <div className="relative">
          {/* Kepala */}
          <div className="relative isolate overflow-hidden bg-ornamen px-6 pb-9 pt-8 text-center text-mori">
            <div
              className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-screen"
              style={{ backgroundImage: `url(${asset("/images/batik.jpg")})`, backgroundSize: "360px" }}
              aria-hidden="true"
            />
            <div className="flex justify-center">
              <CentangSukses />
            </div>
            <h2
              id="judul-sukses"
              className="mt-5 font-serif text-2xl font-bold animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:250ms] [animation-fill-mode:both] sm:text-[1.7rem]"
            >
              {bukti.hasil.jenis === "pengaduan" ? "Pengaduan berhasil dikirim" : "Aspirasi berhasil dikirim"}
            </h2>
            <p
              id="desk-sukses"
              className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-mori/85 animate-in fade-in duration-500 [animation-delay:400ms] [animation-fill-mode:both]"
            >
              Terima kasih, {bukti.data.nama.split(" ")[0]}. Dikirim pada {formatWaktu(bukti.hasil.dikirimPada)}.
            </p>
            <div className="pita-tumpal absolute inset-x-0 bottom-0 h-3" aria-hidden="true" />
          </div>

          <div className="grid gap-5 px-5 pb-6 pt-6 sm:px-7">
            <Alert variant="sukses" className="animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:450ms] [animation-fill-mode:both]">
              <CheckCircle2 aria-hidden="true" />
              <AlertTitle>Berhasil terkirim ke Pemerintah Desa Lerep</AlertTitle>
              <AlertDescription>
                Status awal: <strong>{k.alurStatus[0]}</strong>. Simpan nomor tiket dan kode verifikasi — kode hanya ditampilkan sekali
                dan tidak dapat dipulihkan.
              </AlertDescription>
            </Alert>

            <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:550ms] [animation-fill-mode:both]">
              <Label htmlFor="sukses-tiket">Nomor tiket</Label>
              <div className="flex gap-2">
                <Input id="sukses-tiket" readOnly value={bukti.hasil.nomorTiket} className="font-mono font-semibold tracking-[0.08em]" />
                <TombolSalin nilai={bukti.hasil.nomorTiket} label="nomor tiket" onSalin={() => undefined} />
              </div>
            </div>

            <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 [animation-delay:650ms] [animation-fill-mode:both]">
              <Label htmlFor="sukses-kode">Kode verifikasi</Label>
              <div className="flex gap-2">
                <div className="min-w-0 flex-1">
                  <SecretInput id="sukses-kode" readOnly value={formatKode(bukti.hasil.kodeVerifikasi)} aria-describedby="sukses-kode-petunjuk" />
                </div>
                <TombolSalin nilai={bukti.hasil.kodeVerifikasi} label="kode verifikasi" onSalin={() => setSudahDisimpan(true)} />
              </div>
              <p id="sukses-kode-petunjuk" className="text-xs text-ornamen/70">
                Tekan ikon mata untuk melihat kode. Jangan bagikan kode ini kepada siapa pun.
              </p>
            </div>

            {konfirmasiTutup && (
              <Alert variant="galat" className="animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertTriangle aria-hidden="true" />
                <AlertTitle>Anda belum menyimpan kode verifikasi</AlertTitle>
                <AlertDescription>
                  Tanpa kode ini Anda tidak dapat melacak tanggapan. Unduh bukti PDF atau salin kode, atau tekan <strong>Tutup</strong> sekali
                  lagi bila sudah mencatatnya.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col-reverse gap-3 pt-1 animate-in fade-in duration-500 [animation-delay:750ms] [animation-fill-mode:both] sm:flex-row sm:justify-end">
              <Button variant="outline" size="lg" onClick={tutup}>
                Tutup
              </Button>
              <Button size="lg" onClick={unduh} loading={mengunduh} className="group">
                {!mengunduh && <Download className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />}
                {sudahDisimpan ? "Unduh Ulang Bukti PDF" : "Unduh Bukti PDF"}
              </Button>
            </div>

            {bukti.hasil.simulasi && (
              <p className="flex gap-2 rounded-xl bg-mori-2/80 px-3 py-2.5 text-xs leading-relaxed text-ornamen/80">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                Mode pengembangan: nomor tiket dibuat di peramban dan belum tersimpan di server desa.
              </p>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}
