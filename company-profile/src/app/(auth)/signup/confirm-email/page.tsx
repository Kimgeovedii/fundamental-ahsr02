import { Metadata } from "next";
import ConfirmEmailPageClient from "@/components/core/ConfirmEmailPageClient";

export const metadata: Metadata = {
  title: "Konfirmasi Email - Digiforma Tech Solution",
  description:
    "Silakan cek email Anda untuk konfirmasi akun. Klik link konfirmasi yang telah kami kirim untuk mengaktifkan akun Anda sebelum masuk.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Konfirmasi Email - Digiforma Tech Solution",
    description:
      "Cek email Anda untuk konfirmasi akun dan mulai menggunakan platform",
    type: "website",
  },
};

export default function ConfirmEmailPage() {
  return <ConfirmEmailPageClient />;
}
