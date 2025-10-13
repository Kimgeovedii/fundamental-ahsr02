// global.d.ts atau declarations.d.ts

declare module "*.css" {
  // Anda bisa menggunakan ini untuk deklarasi sederhana:
  const content: string;
  export default content;
}

// Tambahkan juga untuk tipe aset lain yang Anda impor
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
