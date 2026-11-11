"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Dot = { x: number; y: number; tx: number; ty: number; r: number; accent: boolean; ph: number };

type Props = {
  text: string;
  className?: string;
  /** warna titik utama */
  dotColor?: string;
  /** warna titik aksen (sebagian kecil titik) */
  accentColor?: string;
  /** porsi titik aksen, 0–1 */
  accentRatio?: number;
  /** jarak antar titik dalam px; default menyesuaikan ukuran huruf */
  gap?: number;
  /** radius dorongan kursor dalam px */
  hoverRadius?: number;
};

const BLEED = 14;

/**
 * Teks "stipple": huruf digambar ulang dari ribuan titik di <canvas>.
 * Titik-titik berkumpul dari posisi acak saat pertama tampil, berdenyut halus,
 * dan menyebar menjauhi kursor. Teks asli tetap ada (transparan) untuk
 * pembaca layar, mesin pencari, dan sebagai cadangan jika JS mati.
 */
export function StippleText({
  text,
  className,
  dotColor = "#fdf8ee",
  accentColor = "#f28a2e",
  accentRatio = 0.14,
  gap,
  hoverRadius = 46,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const measure = textRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !measure || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let firstBuild = true;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = measure.getBoundingClientRect();
      if (rect.width === 0) return;
      W = Math.ceil(rect.width) + BLEED * 2;
      H = Math.ceil(rect.height) + BLEED * 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      // Gambar teks ke kanvas bayangan (resolusi Q× agar garis tipis tetap tertangkap)
      const cs = getComputedStyle(measure);
      const fontSize = parseFloat(cs.fontSize);
      const letterSpacing = parseFloat(cs.letterSpacing) || 0;
      const Q = 3;
      const off = document.createElement("canvas");
      off.width = W * Q;
      off.height = H * Q;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.scale(Q, Q);
      o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      o.textBaseline = "alphabetic";
      o.fillStyle = "#000";
      const m = o.measureText(text);
      const baseline = BLEED + (rect.height + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      let cx = BLEED;
      for (const ch of text) {
        o.fillText(ch, cx, baseline);
        cx += o.measureText(ch).width + letterSpacing;
      }

      // Bagi area menjadi sel; tiap sel yang tertutup huruf menjadi satu titik
      // dengan ukuran sebanding tingkat tutupannya (efek stipple/halftone).
      const data = o.getImageData(0, 0, W * Q, H * Q).data;
      const PW = W * Q;
      const step = gap ?? Math.max(2, fontSize / 15);
      const cellPx = Math.max(1, Math.round(step * Q));
      const next: Dot[] = [];
      const begin = firstBuild && !reduceMotion;
      for (let py = 0; py < H * Q; py += cellPx) {
        for (let px = 0; px < PW; px += cellPx) {
          let hit = 0;
          let total = 0;
          for (let yy = py; yy < Math.min(py + cellPx, H * Q); yy++) {
            for (let xx = px; xx < Math.min(px + cellPx, PW); xx++) {
              total++;
              if (data[(yy * PW + xx) * 4 + 3] > 110) hit++;
            }
          }
          const cov = hit / total;
          if (cov < 0.12) continue;
          const tx = (px + cellPx / 2) / Q + (Math.random() - 0.5) * step * 0.35;
          const ty = (py + cellPx / 2) / Q + (Math.random() - 0.5) * step * 0.35;
          next.push({
            tx,
            ty,
            x: begin ? Math.random() * W : tx,
            y: begin ? Math.random() * H : ty,
            r: Math.max(0.55, step * 0.56 * Math.sqrt(cov) * (0.8 + Math.random() * 0.35)),
            accent: Math.random() < accentRatio,
            ph: Math.random() * Math.PI * 2,
          });
        }
      }
      dots = next;
      firstBuild = false;
      setReady(true);
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const R2 = hoverRadius * hoverRadius;
      for (const pass of [false, true]) {
        ctx.fillStyle = pass ? accentColor : dotColor;
        ctx.beginPath();
        for (const d of dots) {
          if (d.accent !== pass) continue;
          if (!reduceMotion) {
            let tx = d.tx;
            let ty = d.ty;
            const dx = d.x - mouse.x;
            const dy = d.y - mouse.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < R2) {
              const dist = Math.sqrt(dist2) || 1;
              const force = ((hoverRadius - dist) / hoverRadius) * 16;
              tx += (dx / dist) * force;
              ty += (dy / dist) * force;
            }
            d.x += (tx - d.x) * 0.065;
            d.y += (ty - d.y) * 0.065;
          }
          const r = reduceMotion ? d.r : d.r * (0.82 + 0.18 * Math.sin(t / 650 + d.ph));
          ctx.moveTo(d.x + r, d.y);
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion || !visible) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      build();
      if (reduceMotion) draw(0);
      else start();
    };
    if (document.fonts?.ready) document.fonts.ready.then(init);
    else init();

    const ro = new ResizeObserver(() => {
      build();
      if (reduceMotion) draw(0);
    });
    ro.observe(measure);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelled = true;
      stop();
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [text, dotColor, accentColor, accentRatio, gap, hoverRadius]);

  return (
    <span ref={wrapRef} className={cn("relative inline-block", className)}>
      <span ref={textRef} className={cn("transition-colors duration-500", ready && "text-transparent")}>
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ left: -BLEED, top: -BLEED }}
      />
    </span>
  );
}
