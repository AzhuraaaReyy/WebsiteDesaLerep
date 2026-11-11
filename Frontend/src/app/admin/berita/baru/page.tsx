import {
  Bold,
  Eye,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Send,
  Undo2,
  Upload,
} from "lucide-react";
import { DummyTag, PageHeader, Panel, btn } from "@/features/admin/ui";
import { cn } from "@/lib/utils";

export const metadata = { title: "Tulis Berita" };

const input = "w-full rounded-xl border border-emas-soft bg-white px-3.5 py-2.5 text-sm font-normal text-sogan-900 focus:border-kunyit focus:outline-none";

export default function EditorBeritaPage() {
  const tools = [Bold, Italic, Heading2, List, ListOrdered, Quote, Link2, ImageIcon, Undo2, Redo2];
  return (
    <>
      <PageHeader
        eyebrow="Konten · Berita"
        title="Tulis Berita"
        crumbs={[{ label: "Berita", href: "/admin/berita" }, { label: "Tulis Berita" }]}
        actions={
          <>
            <DummyTag />
            <button type="button" className={btn.outline}>Simpan Draft</button>
            <button type="button" className={btn.outline}>
              <Eye className="size-4" /> Pratinjau
            </button>
            <button type="button" className={btn.primary}>
              <Send className="size-4" /> Publikasikan
            </button>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel>
          <label className="grid gap-1.5 text-xs font-semibold text-sogan-900">
            Judul berita
            <input defaultValue="Pelatihan Membatik Pewarna Alami Daun Kopi" className={cn(input, "font-serif text-xl font-bold")} />
          </label>
          <p className="mt-2 text-xs text-tinta/60">
            Slug: <code className="rounded bg-mori-2 px-1.5 py-0.5">/berita/pelatihan-membatik-pewarna-alami-daun-kopi</code>
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-emas-soft bg-white">
            <div className="flex flex-wrap gap-1 border-b border-emas-soft bg-mori-2/60 p-2" role="toolbar" aria-label="Format teks">
              {tools.map((T, i) => (
                <button key={i} type="button" className={cn("grid size-8 place-items-center rounded-lg text-sogan-900 hover:bg-white", i === 0 && "bg-white shadow-sm")}>
                  <T className="size-4" />
                </button>
              ))}
            </div>
            <div className="prose-sm min-h-80 space-y-4 p-5 text-sm leading-relaxed text-tinta">
              <p>
                Kelompok perajin batik Desa Lerep menggelar pelatihan membatik dengan pewarna alami dari limbah daun kopi. Kegiatan diikuti 24 peserta dari delapan dusun.
              </p>
              <h3 className="font-serif text-lg font-bold text-sogan-900">Inovasi dari kebun sendiri</h3>
              <p>
                Daun kopi yang selama ini terbuang direbus untuk menghasilkan warna cokelat keemasan yang khas. Hasilnya diharapkan menjadi produk unggulan UMKM desa.
              </p>
              <blockquote className="border-l-4 border-kunyit bg-mori-2/60 py-2 pl-4 font-serif italic text-sogan-900">
                “Warna dari kebun sendiri membuat batik Lerep punya cerita.”
              </blockquote>
            </div>
          </div>
          <p className="mt-2 text-[0.7rem] text-tinta/60">Editor Tiptap · disimpan sebagai JSON terstruktur, disanitasi di backend (tanpa HTML/script bebas).</p>
        </Panel>

        <div className="grid content-start gap-6">
          <Panel title="Publikasi">
            <div className="grid gap-3 text-xs font-semibold text-sogan-900">
              <label className="grid gap-1.5">
                Status
                <select className={input} defaultValue="draft">
                  <option value="draft">Draft</option>
                  <option value="review">Review</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="grid gap-1.5">
                Kategori
                <select className={input}>
                  <option>Pemberdayaan UMKM</option>
                  <option>Pemerintahan</option>
                  <option>Pariwisata</option>
                </select>
              </label>
              <label className="grid gap-1.5">
                Tag
                <input defaultValue="batik, UMKM, kopi" className={input} />
              </label>
              <label className="flex items-center gap-2 font-normal text-tinta">
                <input type="checkbox" className="size-4 accent-[var(--color-kunyit)]" /> Jadikan berita unggulan di beranda
              </label>
            </div>
          </Panel>
          <Panel title="Gambar Utama">
            <div className="grid place-items-center rounded-xl border-2 border-dashed border-emas bg-mori px-4 py-8 text-center">
              <Upload className="size-6 text-kunyit-600" />
              <p className="mt-2 text-sm font-semibold text-sogan-900">Tarik foto ke sini atau pilih file</p>
              <p className="text-xs text-tinta/60">JPG/PNG/WebP · maks. 5 MB · wajib alt text</p>
            </div>
            <label className="mt-3 grid gap-1.5 text-xs font-semibold text-sogan-900">
              Alt text
              <input placeholder="Deskripsikan isi foto" className={input} />
            </label>
          </Panel>
          <Panel title="SEO & Berbagi">
            <div className="grid gap-3 text-xs font-semibold text-sogan-900">
              <label className="grid gap-1.5">
                Meta deskripsi
                <textarea rows={3} defaultValue="Pelatihan batik pewarna alami daun kopi untuk UMKM Desa Lerep." className={input} />
              </label>
              <div className="rounded-xl border border-emas-soft bg-white p-3 font-normal">
                <p className="text-[0.65rem] uppercase tracking-wider text-tinta/50">Pratinjau Open Graph</p>
                <p className="mt-1 text-sm font-semibold text-[#1a0dab]">Pelatihan Membatik Pewarna Alami Daun Kopi</p>
                <p className="text-xs text-[#0d6b5f]">desalerep.id/berita/…</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
