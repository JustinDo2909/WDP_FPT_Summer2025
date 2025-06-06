import { Container, Core } from "@/lib/by/Div";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Core className="flex min-h-screen max-w-7xl mx-auto bg-gray-50">
      {/* Sidebar */}
      <Container className="hidden md:block">
        {/* Sidebar will be imported here */}
      </Container>
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </Core>
  );
}
