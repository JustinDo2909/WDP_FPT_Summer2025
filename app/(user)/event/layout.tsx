"use client";

import Providers from "@/app/providers";

export default function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
