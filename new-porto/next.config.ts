import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me", "res.cloudinary.com", "images.unsplash.com"], // tambahkan domain eksternal untuk <Image />
  },
};

export default nextConfig;
