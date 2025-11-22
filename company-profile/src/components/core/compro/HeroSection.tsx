"use client";

import React from "react";
import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  return (
    <section className="relative w-full  overflow-hidden bg-[#0B0E14] ">
      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/50 to-transparent z-10 pointer-events-none" />

      {/* CONTENT — DITURUNKAN */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 py-32 mt-20 ">
        <h1 className="text-5xl font-bold text-white leading-tight max-w-xl">
          Build an AI Driven Future <br /> for Your Business
        </h1>

        <p className="text-slate-300 mt-4 text-lg max-w-lg">
          Bring custom AI practice to any of your business processes, on
          premises.
        </p>

        <div className="flex items-center gap-4 mt-8">
          <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
            Get it for your business →
          </button>

          <button className="px-6 py-3 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition font-medium">
            Discover more →
          </button>
        </div>
        {/* SPLINE DI KANAN */}
        <div className="absolute top-11 -right-[80px]   h-full w-[50%] min-w-[500px] pointer-events-auto z-0">
          <Spline scene="/scene2.splinecode" />
        </div>
      </div>
    </section>
  );
}
