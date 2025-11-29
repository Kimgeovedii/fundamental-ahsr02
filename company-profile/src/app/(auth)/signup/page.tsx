import { Metadata } from "next";
import { SignUpCard } from "@/components/core/SignUpCard";
import * as React from "react";

export const metadata: Metadata = {
  title: "Daftar - Digiforma Tech Solution",
  description:
    "Daftar akun baru di Digiforma Tech Solution. Bergabunglah dengan komunitas dan akses semua fitur platform termasuk Digi-Share untuk berbagi artikel.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Daftar - Digiforma Tech Solution",
    description: "Buat akun baru untuk bergabung dengan platform Digiforma",
    type: "website",
  },
};

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900">
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
