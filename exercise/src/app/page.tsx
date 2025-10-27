"use client";

// import { Link } from "lucide-react";
import React, { FC } from "react";
// Import Link tidak digunakan, jadi bisa dihapus
import Link from "next/link";

const Page: FC = () => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-[#f9f9fb] text-[#333]">
      {/* Banner Section */}
      <Link
        href={"/dashboard"}
        className="w-full h-[100vh] bg-cover bg-center pt-[70px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/assets/bg-img/Bitmap.svg')",
        }}
      >
        <div
          // Menghilangkan href karena bukan lagi Link
          className="text-white text-[36px] tracking-[10px] w-[50%] font-extrabold"
        >
          {/* Menggunakan tag marquee di sekitar teks */}
          <marquee behavior="scroll" direction="left" scrollamount="10">
            <h1>Welcome To Todo APPS By Kim Geovedi</h1>
          </marquee>
        </div>
      </Link>
    </main>
  );
};

export default Page;
