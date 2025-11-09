"use client";
import React from "react";
import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
export default function DashboardPage() {
  const router = useRouter();
  const { userToken, _hasHydrated } = useAuthStore();
  React.useEffect(() => {
    if (!_hasHydrated) {
      router.push("/login");
    }
  }, [_hasHydrated, router]);
  if (!_hasHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2">Memuat sesi...</p>
      </div>
    );
  }

  if (!userToken) {
    return null;
  }

  return (
    <div className=" bg-gray-50">
      {/* <Navbar /> */}
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Selamat Datang di Dashboard!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Anda berhasil login dan melihat konten khusus pengguna.
        </p>
        <div className="mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-fuchsia-700">
            Konten Utama
          </h2>
          <p className="mt-2 text-gray-700">
            Di sinilah semua fitur utama aplikasi Bloggers Bro Anda akan berada.
          </p>
        </div>
      </main>
    </div>
  );
}
