import React from "react";

// Definisi interface props untuk Footer (kosong karena tidak menerima props)
interface IFooterPropos {}

const Footer: React.FunctionComponent<IFooterPropos> = (props) => {
  return (
    // Tag <footer> lebih semantik daripada <div> untuk footer
    <footer
      // Kelas Tailwind untuk styling:
      // 1. bg-[#3A404A] atau bg-gray-700 untuk warna latar belakang abu-abu gelap
      // 2. text-white untuk warna teks
      // 3. text-center untuk menengahkan teks
      // 4. p-4 untuk padding vertikal dan horizontal
      className="bg-gray-700 text-white text-center p-4 w-full"
    >
      {/* Teks copyright sesuai dengan gambar */}
      <p className="text-sm">2025 DashAPP. All rights reserved</p>
    </footer>
  );
};

export default Footer;
