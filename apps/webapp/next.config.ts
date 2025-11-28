import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "q8a0jhjw1u.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "w5z4pkjtzs.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "4ctc36zdopsyz0ok.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
