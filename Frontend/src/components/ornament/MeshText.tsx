"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Node = { gx: number; gy: number; x: number; y: number; ox: number; oy: number; ph: number };

type Props = {
  text: string;
  className?: string;
  /** warna garis & simpul jaring */
  lineColor?: string;
  /** warna sorotan di sekitar kursor */
  highlightColor?: string;
  /** jarak antar simpul (px); default menyesuaikan ukuran huruf */
  cell?: number;
  /** radius pengaruh kursor (px) */
  hoverRadius?: number;
};

const BLEED = 16;

/**
 * Mesh lettering: huruf disusun ulang menjadi jaring (wireframe) simpul dan garis
 * di <canvas>. Jaring "mengendap" ke bentuk huruf saat pertama tampil, bergelombang
 * pelan seperti kain, dan melengkung/menyala saat didekati kursor.
 * Teks asli tetap ada (transparan) untuk aksesibilitas, SEO, dan cadangan tanpa JS.
 */
export function MeshText({
  text,
  className,
  lineColor = "#fdf8ee",
  highlightColor = "#f28a2e",
  cell,
  hoverRadius = 52,
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
    let nodes: Node[] = [];
    let edges: Uint32Array = new Uint32Array(0);
    let W = 0;
    let H = 0;
    let dpr = 1;
    let step = 3;
    let raf = 0;
    let running = false;
    let visible = true;
    let bornAt = 0;
    let firstBuild = true;
    const mouse = { x: -9999, y: -9999, k: 0 };

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

      // 1) Gambar teks di kanvas bayangan beresolusi Q× dengan font CSS yang sama
      const cs = getComputedStyle(measure);
      const fontSize = parseFloat(cs.fontSize);
      const letterSpacing = parseFloat(cs.letterSpacing) || 0;
      const Q = 3;
      const PW = W * Q;
      const PH = H * Q;
      const off = document.createElement("canvas");
      off.width = PW;
      off.height = PH;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.scale(Q, Q);
      o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      o.textBaseline = "alphabetic";
      const m = o.measureText(text);
      const baseline = BLEED + (rect.height + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      let cx = BLEED;
      for (const ch of text) {
        o.fillText(ch, cx, baseline);
        cx += o.measureText(ch).width + letterSpacing;
      }
      const data = o.getImageData(0, 0, PW, PH).data;

      // 2) Grid simpul; simpul dipakai bila area sekitarnya cukup tertutup huruf
      step = cell ?? Math.max(2.2, fontSize / 13);
      const cols = Math.floor(W / step) + 1;
      const rows = Math.floor(H / step) + 1;
      const half = Math.max(1, Math.round((step * Q) / 2));
      const index = new Int32Array(cols * rows).fill(-1);
      const next: Node[] = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = Math.round(i * step * Q);
          const py = Math.round(j * step * Q);
          let hit = 0;
          let total = 0;
          for (let yy = Math.max(0, py - half); yy < Math.min(PH, py + half); yy += 2) {
            for (let xx = Math.max(0, px - half); xx < Math.min(PW, px + half); xx += 2) {
              total++;
              if (data[(yy * PW + xx) * 4 + 3] > 100) hit++;
            }
          }
          if (total === 0 || hit / total < 0.28) continue;
          index[j * cols + i] = next.length;
          const gx = i * step;
          const gy = j * step;
          next.push({ gx, gy, x: gx, y: gy, ox: 0, oy: 0, ph: Math.random() * Math.PI * 2 });
        }
      }

      // 3) Sisi jaring: kanan, bawah, dan diagonal (membentuk segitiga)
      const list: number[] = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = index[j * cols + i];
          if (a < 0) continue;
          const r = i + 1 < cols ? index[j * cols + i + 1] : -1;
          const b = j + 1 < rows ? index[(j + 1) * cols + i] : -1;
          const d = i + 1 < cols && j + 1 < rows ? index[(j + 1) * cols + i + 1] : -1;
          if (r >= 0) list.push(a, r);
          if (b >= 0) list.push(a, b);
          if (d >= 0 && (r >= 0 || b >= 0)) list.push(a, d);
        }
      }
      nodes = next;
      edges = Uint32Array.from(list);
      if (firstBuild) bornAt = performance.now();
      firstBuild = false;
      setReady(true);
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Intro: gelombang besar yang mereda selama ±1,4 detik
      const age = reduceMotion ? 99 : (t - bornAt) / 1000;
      const intro = Math.max(0, 1 - age / 1.4);
      const amp = reduceMotion ? 0 : step * (0.22 + intro * intro * 4);
      mouse.k += ((mouse.x > -999 ? 1 : 0) - mouse.k) * 0.12;
      const R = hoverRadius;

      for (const n of nodes) {
        const wx = Math.sin(t * 0.0017 + n.gy * 0.32 + n.ph * intro) * amp;
        const wy = Math.cos(t * 0.0013 + n.gx * 0.21) * amp * 0.8;
        let px = 0;
        let py = 0;
        if (mouse.k > 0.01) {
          const dx = n.gx - mouse.x;
          const dy = n.gy - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < R) {
            // tonjolan seperti lensa: simpul terdorong keluar dari kursor
            const f = Math.sin((1 - dist / R) * Math.PI * 0.5) * step * 2.6 * mouse.k;
            px = (dx / dist) * f;
            py = (dy / dist) * f;
          }
        }
        n.ox += (wx + px - n.ox) * 0.2;
        n.oy += (wy + py - n.oy) * 0.2;
        n.x = n.gx + n.ox;
        n.y = n.gy + n.oy;
      }

      // Garis dasar
      ctx.lineWidth = Math.max(0.6, step * 0.24);
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = 0.78;
      ctx.beginPath();
      for (let e = 0; e < edges.length; e += 2) {
        const a = nodes[edges[e]];
        const b = nodes[edges[e + 1]];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      // Sorotan di sekitar kursor
      if (mouse.k > 0.01) {
        ctx.strokeStyle = highlightColor;
        ctx.globalAlpha = 0.95 * mouse.k;
        ctx.lineWidth = Math.max(0.8, step * 0.3);
        ctx.beginPath();
        const R2 = (R * 0.8) ** 2;
        for (let e = 0; e < edges.length; e += 2) {
          const a = nodes[edges[e]];
          if ((a.gx - mouse.x) ** 2 + (a.gy - mouse.y) ** 2 > R2) continue;
          const b = nodes[edges[e + 1]];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.stroke();
      }

      // Simpul
      ctx.globalAlpha = 1;
      ctx.fillStyle = lineColor;
      ctx.beginPath();
      const nr = Math.max(0.55, step * 0.2);
      for (const n of nodes) {
        ctx.moveTo(n.x + nr, n.y);
        ctx.arc(n.x, n.y, nr, 0, Math.PI * 2);
      }
      ctx.fill();
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
  }, [text, lineColor, highlightColor, cell, hoverRadius]);

  return (
    <span ref={wrapRef} className={cn("relative inline-block", className)}>
      <span ref={textRef} className={cn("transition-colors duration-700", ready && "text-transparent")}>
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
