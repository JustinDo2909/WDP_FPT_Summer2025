import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    domains: [
      "res.cloudinary.com",
      "cdnd.lystit.com",
      "static.super-shop.com",
      "cdn.shopify.com",
      "images-eu.ssl-images-amazon.com",
      "www.dhgate.com",
      "i5.walmartimages.com",
      "picsum.photos",
      "hzjfxfzm26.ufs.sh", "example.com",
      "cdn.chiaki.vn"
    ],
  },
};

export default nextConfig;
