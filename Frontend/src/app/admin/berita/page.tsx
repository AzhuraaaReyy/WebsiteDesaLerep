import { contentRows } from "@/data/admin-dummy";
import { ContentTable } from "@/features/admin/ContentTable";

export const metadata = { title: "Berita" };

export default function BeritaAdminPage() {
  return (
    <ContentTable
      eyebrow="Konten"
      title="Berita"
      description="Tulis, pratinjau, dan publikasikan berita desa. Single Admin dapat langsung memublikasikan; status Review disiapkan untuk multi-admin."
      newHref="/admin/berita/baru"
      newLabel="Tulis Berita"
      columnMeta="Kategori"
      rows={contentRows.berita}
    />
  );
}
