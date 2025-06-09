"use client";

import { BannerEvent } from "@/components/Event/BannerSection";
import { MenuGame } from "@/components/Event/MenuGame";
import { games } from "@/constants";
import { Area, Container } from "@/lib/by/Div";

export default function Event() {
  return (
    <Container className="min-h-screen flex flex-col bg-gradient-to-b from-[#2A0A4A] to-black">
      <Area className="flex-1 flex flex-col gap-24 relative overflow-hidden pb-24">
        <BannerEvent />
        <MenuGame listGame={games} />
      </Area>
    </Container>
  );
}
