"use client";

import React from "react";
// Import komponen Card dari shadcn/ui jika Anda ingin membungkusnya,
// tapi untuk logo, div biasa dengan styling Tailwind sudah cukup.

import Image from "next/image";

// Data logo menggunakan gambar placeholder acak
const randomLogos = [
  // Menggunakan Placeholder.com dengan ukuran dan warna acak
  {
    src: "https://via.placeholder.com/120x40/3182CE/FFFFFF?text=Logo+A",
    alt: "Random Logo A",
  },
  {
    src: "https://via.placeholder.com/100x40/4C51BF/FFFFFF?text=Logo+B",
    alt: "Random Logo B",
  },
  {
    src: "https://via.placeholder.com/150x40/38A169/FFFFFF?text=Logo+C",
    alt: "Random Logo C",
  },
  {
    src: "https://via.placeholder.com/130x40/DD6B20/FFFFFF?text=Logo+D",
    alt: "Random Logo D",
  },
  {
    src: "https://via.placeholder.com/110x40/9F7AEA/FFFFFF?text=Logo+E",
    alt: "Random Logo E",
  },
  {
    src: "https://via.placeholder.com/140x40/E53E3E/FFFFFF?text=Logo+F",
    alt: "Random Logo F",
  },
];

// Gandakan logo untuk menciptakan efek Marquee yang mulus
const logos = [...randomLogos, ...randomLogos];

export default function LogoMarquee() {
  return (
    // Gunakan warna background yang sama dengan HeroSection
    <div className="w-full py-8 bg-[#0B0E14] overflow-hidden border-t border-b border-gray-700/50">
      {/* Container untuk pergerakan Marquee */}
      <div className="flex w-fit min-w-[200%] animate-marquee">
        {logos.map((logo, index) => (
          // flex-shrink-0 penting agar item tidak menyusut
          <div
            key={index}
            className="flex-shrink-0 mx-10 flex items-center justify-center transition duration-300"
          >
            {/* Container untuk logo */}
            <div className="w-32 h-10 relative opacity-60 hover:opacity-100 transition duration-300 filter grayscale hover:grayscale-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                // Menonaktifkan optimasi cache dan host untuk gambar placeholder
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Injecting CSS Keyframes directly for Marquee animation.
        Penting: Pastikan keyframe 'marquee' ini juga ada di globals.css Anda! 
      */}
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            /* Pindahkan separuh dari lebar total (karena digandakan) */
            transform: translateX(-50%);
          }
        }

        /* Kecepatan animasi 30 detik (lebih lambat) */
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
