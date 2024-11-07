import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"], // Menambahkan domain eksternal
  },
  output: "export",
};

export default nextConfig;
