"use client";

import Link from "next/link";
import { Gamepad2, Sparkles } from "lucide-react";
import { Box, Group, RText } from "@/lib/by/Div";
import { useState } from "react";

export default function FloatingGameButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/game">
      <Group
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        <Group
          className={`absolute bottom-full right-0 mb-3 px-3 py-2 bg-gradient-to-r from-[#aa4444] to-[#ee4444] text-white text-sm font-semibold rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <RText>Play Mini Game!</RText>
          <Box className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#aa4444]"></Box>
        </Group>

        {/* Main Button */}
        <Group className="relative w-16 h-16 bg-gradient-to-br from-[#ffc6c6] to-[#ee4444] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group-hover:scale-110  hover:animate-none">
          {/* Sparkle Effects */}
          <Sparkles
            className={`absolute -top-1 -right-1 w-4 h-4 text-yellow-300 transition-all duration-500 ${
              isHovered ? "opacity-100 rotate-12 scale-125" : "opacity-70"
            }`}
          />
          <Sparkles
            className={`absolute -bottom-1 -left-1 w-3 h-3 text-yellow-200 transition-all duration-700 ${
              isHovered ? "opacity-100 -rotate-12 scale-110" : "opacity-50"
            }`}
          />

          {/* Game Icon */}
          <Gamepad2
            className={`w-8 h-8 text-white drop-shadow-lg transition-all duration-300 ${
              isHovered ? "scale-110 rotate-3" : ""
            }`}
          />

          {/* Pulsing Ring */}
          <Box className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></Box>
        </Group>

        {/* Background Glow */}
        <Box className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffc6c6] to-[#ee4444] blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10 scale-150"></Box>
      </Group>
    </Link>
  );
}
