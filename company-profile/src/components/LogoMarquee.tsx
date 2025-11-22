// ./src/components/LogoMarquee.js

"use client";

import Image from "next/image";

import Spotify from "../assets/img/Card.png";
import Amazon from "../assets/img/Card2.png";
import Chatgpt from "../assets/img/Card3.png";
import Zappier from "../assets/img/Zappier.png";
import Adobe from "../assets/img/Adobe.png";
import Google from "../assets/img/Card.svg";
const randomLogos = [
  {
    src: Spotify,
    alt: "Spotify Logo",
  },
  {
    src: Chatgpt,
    alt: "ChatGPT Logo",
  },
  {
    src: Amazon,
    alt: "Amazon Logo",
  },
  {
    src: Zappier,
    alt: "Zappier Logo",
  },
  {
    src: Adobe,
    alt: "Adobe Logo",
  },
  {
    src: Google,
    alt: "Google Logo",
  },
];

const logos = [...randomLogos, ...randomLogos];

export default function LogoMarquee() {
  return (
    <div className="w-full py-8 bg-[#0B0E14] overflow-hidden border-t border-b border-gray-700/50">
      <div className="flex flex-nowrap w-fit gap-x-20 animate-marquee">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center transition duration-300"
          >
            <div className="w-32 h-10 relative opacity-60 hover:opacity-100 transition duration-300 filter grayscale hover:grayscale-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                unoptimized={typeof logo.src === "string"}
              />
            </div>
          </div>
        ))}
      </div>

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
