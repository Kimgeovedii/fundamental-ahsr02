import { Metadata } from "next";
import * as React from "react";
import { LoginCard } from "@/components/core/LoginCard";

export const metadata: Metadata = {
  title: "Masuk - Digiforma Tech Solution",
  description:
    "Masuk ke akun Digiforma Tech Solution untuk mengakses layanan dan fitur eksklusif. Login ke Digi-Share untuk mulai berbagi artikel dan insights.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Masuk - Digiforma Tech Solution",
    description: "Login ke akun Anda untuk mengakses platform Digiforma",
    type: "website",
  },
};

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-screen min-h-screen">
      <div
        className="hidden lg:flex w-full h-full flex-col justify-center items-center p-8 lg:p-12"
        style={{
          backgroundImage: "url('/img/corporate.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div
          className="
          w-full max-w-lg p-8 lg:p-10 
          rounded-2xl 
          shadow-2xl 
          border border-white/30 
          bg-white/10        
          backdrop-blur-xl     
          backdrop-saturate-150 
          
          text-white 
          text-center
        "
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
            DIGIFORMA
          </h1>

          <p className="text-lg lg:text-xl font-light leading-relaxed text-white/90 drop-shadow-md">
            Partner Digitalisasi Bisnis B2B Anda.
            <br />
            Transformasi dimulai di sini.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col w-full min-h-screen py-8 lg:py-0 bg-gray-50 dark:bg-gray-900 px-4">
        <LoginCard />
        <div className="text-center p-4 pt-2 border-t border-gray-200 dark:border-gray-700 mt-4 w-full max-w-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Digiforma Tech Solution. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
