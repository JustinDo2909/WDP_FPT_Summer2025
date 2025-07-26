import { Column, Container, Core, Section } from "@/lib/by/Div";
import React from "react";
import UserSidebar from "./UserSidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Core className="flex min-h-screen max-w-7xl mx-auto bg-gray-50">
      {/* Sidebar */}
      <Container className="hidden md:block">
        {/* Sidebar will be imported here */}
      </Container>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <Section className="flex">
          <Column className="hidden md:block">
            <UserSidebar />
          </Column>

          {children}
        </Section>
      </main>
    </Core>
  );
}
