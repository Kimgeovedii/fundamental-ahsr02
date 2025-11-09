// Komponen ini secara default adalah Next.js Server Component,
// sehingga tidak memerlukan "use client"; kecuali untuk fungsi yang berinteraksi dengan state/hooks.

import axios from "axios";
import * as React from "react";
// Hapus import yang tidak relevan: { error } dari "console" dan { title } dari "process"

// ====================================
// 1. DEFINISI TIPE
// ====================================

// Tipe data yang dikembalikan oleh News API untuk satu artikel
interface Article {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  // Tambahkan properti lain yang mungkin kamu butuhkan
}

// Tipe props untuk halaman dinamis di Next.js App Router
export interface IDetailBlogProps {
  // params sudah berupa objek, BUKAN Promise.
  params: {
    title: string;
  };
}

// ====================================
// 2. FUNGSI PENGAMBIL DATA (DATA FETCHING)
// ====================================

// Fungsi ini mengambil artikel berdasarkan judul yang dicari
const getDataByTittle = async (title: string): Promise<Article | null> => {
  // Encode judul agar aman digunakan di URL
  const encodedTitle = encodeURIComponent(title);

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodedTitle}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}&pageSize=1`
    );

    const articles = response.data.articles;

    if (articles && articles.length > 0) {
      console.log("Artikel ditemukan:", articles[0].title);
      // PERBAIKAN #1: Mengembalikan elemen pertama dari array 'articles'
      return articles[0];
    } else {
      console.log(`Tidak ada artikel yang ditemukan untuk judul: ${title}`);
      return null;
    }
  } catch (e) {
    console.error("Gagal mengambil data dari News API:", e);
    // PERBAIKAN #2: Mengembalikan null saat terjadi error jaringan/API
    return null;
  }
};

// ====================================
// 3. KOMPONEN UTAMA (SERVER COMPONENT)
// ====================================

// Komponen page.tsx di App Router harus async jika melakukan fetching data
const DetailBlog: React.FunctionComponent<IDetailBlogProps> = async ({
  params,
}) => {
  // PERBAIKAN #3: Akses params.title secara langsung tanpa await/React.use()
  const articleTitle = params.title;

  // Ambil data
  const articleData = await getDataByTittle(articleTitle);

  // Penanganan jika data gagal diambil atau tidak ditemukan
  if (!articleData) {
    return (
      <div className="text-center p-20 min-h-screen bg-white text-gray-800">
        <h1 className="text-4xl font-extrabold mb-4">
          Artikel Tidak Ditemukan 😔
        </h1>
        <p className="text-lg">
          Maaf, data berita untuk **"{articleTitle}"** tidak dapat dimuat atau
          tidak ditemukan.
        </p>
      </div>
    );
  }

  // Tampilan utama
  return (
    <div className="p-8 md:p-12 lg:p-20 max-w-4xl mx-auto min-h-screen bg-white text-gray-900">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
        {articleData.title}
      </h1>
      <p className="text-lg text-gray-600 mb-6 italic">
        {articleData.description}
      </p>

      {/* Tampilkan gambar jika ada */}
      {articleData.urlToImage && (
        <img
          src={articleData.urlToImage}
          alt={articleData.title}
          className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-8"
        />
      )}

      {/* Konten Artikel */}
      <div className="text-gray-800 leading-relaxed text-base md:text-lg">
        <p>
          {articleData.content ||
            "Konten lengkap tidak tersedia melalui API ini."}
        </p>
      </div>

      {/* Kamu bisa menambahkan tombol "Kembali" atau link lain di sini */}
    </div>
  );
};

export default DetailBlog;
