import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeToggle from "@/components/core/compro/layouts/ThemeToggle";
import { Providers } from "@/components/core/compro/layouts/Providers";
import Lines from "@/components/core/Lines/Lines";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('/rest/v1', '') || "https://digiforma.com"),
  title: {
    default: "Digiforma Tech Solution | IT Consulting & Software House",
    template: "%s | Digiforma Tech Solution",
  },
  description:
    "Digiforma Tech Solution adalah perusahaan konsultasi TI dan software house terpercaya yang menyediakan solusi IT Master Plan (ITMP), Enterprise Architecture, COBIT 2019, dan pengembangan aplikasi kustom untuk transformasi digital bisnis Anda.",
  keywords: [
    "Digiforma Tech Solution",
    "IT Consulting",
    "Software House",
    "IT Master Plan",
    "ITMP",
    "Enterprise Architecture",
    "COBIT 2019",
    "Custom Software Development",
    "Digital Transformation",
    "IT Konsultasi Indonesia",
  ],
  authors: [{ name: "Digiforma Tech Solution" }],
  creator: "Digiforma Tech Solution",
  publisher: "Digiforma Tech Solution",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Digiforma Tech Solution",
    title: "Digiforma Tech Solution | IT Consulting & Software House",
    description:
      "Solusi teknologi lengkap untuk transformasi digital bisnis Anda. Konsultasi TI, Enterprise Architecture, dan pengembangan aplikasi kustom.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digiforma Tech Solution | IT Consulting & Software House",
    description:
      "Solusi teknologi lengkap untuk transformasi digital bisnis Anda.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="transition-colors duration-500 bg-white dark:bg-black"
      >
        <ThemeToggle />
        <Providers>
          <Lines />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
