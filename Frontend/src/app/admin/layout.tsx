import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Dashboard Admin", template: "%s | Admin Desa Lerep" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AdminShell>{children}</AdminShell>;
}
