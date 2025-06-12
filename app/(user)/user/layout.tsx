import Providers from "@/app/providers";
import type { Metadata } from "next";
import "../../globals.css";
import { Core } from "@/lib/by/Div";
import UserLayout from "@/components/UserPage/UserLayout";

export const metadata: Metadata = {
  title: "Reco Ecommerce app for shoppers",
  description: "An Ecommerce app for education purposes",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Core className="min-h-screen bg-gray-50">
        <UserLayout>
        <main className="flex-1 flex  overflow-hidden">{children}</main>
        </UserLayout>
      </Core>
    </Providers>
  );
}
