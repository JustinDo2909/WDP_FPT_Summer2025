"use client";

import Providers from "@/app/providers";
import "../globals.css";
import { Sidebar } from "./../../components/admin/Sidebar";
import { Core } from "@/lib/by/Div";
import AdminPageWrapper from "@/components/admin/AdminPageWrapper";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AdminPageWrapper>
        <Core className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </Core>
      </AdminPageWrapper>
    </Providers>
  );
}
