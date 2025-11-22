import * as React from "react";
// Asumsikan LoginCard sudah diimpor dengan benar
import { LoginCard } from "@/components/core/LoginCard";

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  return (
    // Container Utama: Grid 2 Kolom, memenuhi seluruh layar
    <div className="grid grid-cols-2 w-screen h-screen">
      {/* 🚀 KOLOM KIRI: MARKETING / BACKGROUND (Branding & Glassmorphism) */}
      <div
        className="w-full h-full flex flex-col justify-center items-center p-12"
        style={{
          // ✅ Gunakan style={{}} untuk background image yang tepat
          backgroundImage: "url('/img/corporate.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // Tambahkan sedikit overlay gelap agar teks di atasnya lebih jelas
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Konten Glassmorphism: Fokus Branding Digiforma */}
        <div
          className="
          w-full max-w-lg p-10 
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
          {/* Judul Utama (Branding) */}
          <h1 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-lg">
            DIGIFORMA
          </h1>

          {/* Slogan/Deskripsi - Tipografi Profesional */}
          <p className="text-xl font-light leading-relaxed text-white/90 drop-shadow-md">
            Partner Digitalisasi Bisnis B2B Anda.
            <br />
            Transformasi dimulai di sini.
          </p>
        </div>
      </div>

      {/* 💻 KOLOM KANAN: LOGIN FORM */}
      <div className="flex justify-center items-center flex-col w-full h-full bg-gray-50">
        <LoginCard />
        <div className="text-center p-4 pt-2 border-t border-gray-100 mt-4">
          <p className="text-xs text-gray-400">
            © 2025 Digiforma Tech Solution. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
