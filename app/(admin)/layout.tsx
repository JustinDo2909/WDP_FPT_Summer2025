import Providers from "@/app/providers";
import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "./../../components/admin/Sidebar";
import { Core } from "@/lib/by/Div";

export const metadata: Metadata = {
  title: "Reco Ecommerce app for shoppers",
  description: "An Ecommerce app for education purposes",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Core className="flex h-screen bg-gray-50">
        <Sidebar /> {/* Sidebar nằm bên trái */}
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </Core>
    </Providers>
  );
}
