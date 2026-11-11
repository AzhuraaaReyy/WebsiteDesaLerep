import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lora, Poppins } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Desa Wisata Lerep — Kec. Ungaran Barat, Kab. Semarang",
    template: "%s | Desa Wisata Lerep",
  },
  description:
    "Website resmi Desa Wisata Lerep, Kecamatan Ungaran Barat, Kabupaten Semarang. Profil desa, destinasi wisata budaya, agenda, dan layanan warga.",
  icons: { icon: "/images/logo-mark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className={`${lora.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
