/** Menu dashboard admin — modul mengikuti PRD v1.1 §9.2 + ARCHITECTURE §15.2. */
export type AdminNavItem = { label: string; href: string; icon: string; badge?: string };

export const adminNav: { group: string; items: AdminNavItem[] }[] = [
  { group: "Utama", items: [{ label: "Ringkasan", href: "/admin", icon: "LayoutDashboard" }] },
  {
    group: "Pelayanan",
    items: [
      { label: "Permohonan Layanan", href: "/admin/pelayanan", icon: "FileCheck2", badge: "10" },
      { label: "Mandat Persetujuan", href: "/admin/mandat", icon: "ShieldCheck" },
      { label: "Pengaduan", href: "/admin/pengaduan", icon: "Megaphone", badge: "4" },
      { label: "Aspirasi", href: "/admin/aspirasi", icon: "Lightbulb" },
    ],
  },
  {
    group: "Konten",
    items: [
      { label: "Berita", href: "/admin/berita", icon: "Newspaper" },
      { label: "Pengumuman", href: "/admin/pengumuman", icon: "BellRing" },
      { label: "Agenda", href: "/admin/agenda", icon: "CalendarDays" },
      { label: "Potensi & UMKM", href: "/admin/potensi", icon: "Store" },
      { label: "Galeri Media", href: "/admin/galeri", icon: "Images" },
      { label: "Polling", href: "/admin/polling", icon: "Vote" },
    ],
  },
  {
    group: "Data Desa",
    items: [
      { label: "Profil Desa", href: "/admin/profil", icon: "Landmark" },
      { label: "Statistik", href: "/admin/statistik", icon: "ChartColumn" },
      { label: "Transparansi", href: "/admin/transparansi", icon: "Scale" },
      { label: "Dokumen", href: "/admin/dokumen", icon: "FolderOpen" },
      { label: "Peta & Fasilitas", href: "/admin/fasilitas", icon: "MapPinned" },
    ],
  },
  {
    group: "Situs",
    items: [
      { label: "Beranda (CMS)", href: "/admin/beranda", icon: "PanelsTopLeft" },
      { label: "Analytics", href: "/admin/analytics", icon: "Activity" },
      { label: "Audit Log", href: "/admin/audit", icon: "ScrollText" },
      { label: "Pengaturan", href: "/admin/pengaturan", icon: "Settings" },
    ],
  },
];
