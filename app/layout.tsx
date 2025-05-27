import type { Metadata } from "next";
import "./globals.css";
import Header from "@/lib/pattern/core/Header";
import Footer from "@/lib/pattern/core/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Reco Ecommerce app for shoppers",
  description: "An Ecommerce app for education purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#ffffff",
            },
          }}
        />
      </body>
    </html>
  );
}
