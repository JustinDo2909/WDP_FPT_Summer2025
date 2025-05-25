import Providers from "@/app/providers";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Reco Ecommerce app for shoppers",
  description: "An Ecommerce app for education purposes",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
