"use client";

import { Container, RText, Section } from "@/lib/by/Div";
import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <Container className="flex items-center justify-center min-h-screen bg-gray-100">
      <Section className="flex flex-col items-center justify-center">
        <Image
          src="/images/footer-icon.png"
          alt="Logo"
          width={540}
          height={180}
          priority
          className="hover:scale-105 transition-transform"
        />
        <RText className="text-4xl md:text-2xl font-light text-slate-900 leading-tight">
          Loading data ...
        </RText>
      </Section>
    </Container>
  );
}
