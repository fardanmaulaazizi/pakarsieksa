import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    domains: ["images.unsplash.com"], // Menambahkan domain eksternal
  },
};

export default nextConfig;
