"use client";

import "../globals.css";
import Header from "@/lib/pattern/core/Header";
import Footer from "@/lib/pattern/core/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/app/providers";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff",
          },
        }}
      />
    </Providers>
  );
}
