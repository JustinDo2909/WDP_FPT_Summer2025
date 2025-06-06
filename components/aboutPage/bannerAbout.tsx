"use client";

import { Area, Box, Group, RText } from "@/lib/by/Div";

export default function BannerAbout() {
  return (
    <Area className="relative w-full h-screen bg-gradient-to-br from-[#ffc6c6]/20 via-white to-[#aa4444]/10 flex items-center justify-center overflow-hidden">
      <Box className="absolute inset-0 bg-[url('/images/aboutBanner.png')] bg-cover bg-center bg-no-repeat opacity-50"></Box>
      <Box className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/60"></Box>

      <Group className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <RText className="text-[#aa4444] text-6xl md:text-8xl font-bold tracking-tight mb-6 drop-shadow-lg">
          About Us
        </RText>
        <RText className="text-slate-700 text-xl md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
          Discover the story behind CosmePlay and our commitment to bringing you
          the finest skincare products
        </RText>
        <Group className="w-24 h-1 bg-gradient-to-r from-[#ffc6c6] to-[#ee4444] rounded-full mx-auto mt-8"></Group>
      </Group>
    </Area>
  );
}
