"use client";

import "../globals.css";
import Header from "@/lib/pattern/core/Header";
import Footer from "@/lib/pattern/core/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/app/providers";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isEventRoute = pathname.startsWith("/event");

  return (
    <Providers>
      {!isEventRoute && <Header />}
      {children}
      {!isEventRoute && <Footer />}
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
