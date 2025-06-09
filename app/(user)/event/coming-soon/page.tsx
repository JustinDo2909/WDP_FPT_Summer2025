"use client";

import { Container, RText, Section, Box, Block } from "@/lib/by/Div";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <Container
      className="min-h-screen flex flex-col items-center justify-center
                          bg-gradient-to-br from-[#2A0A4A] via-black to-[#2A0A4A]
                          text-white p-4 sm:p-8 relative overflow-hidden"
    >
      <Box className="absolute inset-0 bg-black/30 z-0"></Box>
      <Box className="absolute inset-0 z-0 animate-pulse-light">
        <Box className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#FF1493] rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-float-one"></Box>
        <Box className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#E44] rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float-two"></Box>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#9747FF] rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-float-three"></Box>
      </Box>

      <Link
        href={"/event"}
        className="absolute top-8 left-8 flex items-center group z-10 text-lg font-semibold text-[#FFD700] hover:text-[#FFA500] transition-colors"
      >
        <ArrowLeft className="mr-2 group-hover:translate-x-[-4px] transition-transform" />
        Back
      </Link>

      <Section className="relative z-10 flex flex-col items-center justify-center text-center gap-6 max-w-4xl mx-auto py-12 px-6 bg-black/40 rounded-xl backdrop-blur-sm shadow-2xl border border-purple-800">
        <RText className="text-5xl md:text-7xl font-extrabold text-[#FFD700] drop-shadow-lg animate-fade-in-up">
          Coming Soon!
        </RText>

        <RText className="text-2xl md:text-4xl font-bold text-[#9747FF] animate-fade-in-up delay-200">
          Unleash Your Power!
        </RText>

        <RText className="text-base md:text-lg text-zinc-300 max-w-2xl mt-4 animate-fade-in-up delay-400">
          Get ready for an epic adventure! This game is currently under intense
          development to bring you the most exhilarating experience. Stay tuned
          for mind-blowing graphics, captivating storylines, and revolutionary
          gameplay.
        </RText>

        <Box className="mt-8 flex flex-col items-center gap-4">
          <RText className="text-xl md:text-2xl font-semibold text-pink-400 animate-fade-in-up delay-600">
            Expected Launch: Q4 2025
          </RText>
        </Box>

        <RText className="text-sm text-zinc-400 mt-8 animate-fade-in-up delay-800">
          Follow us on social media for exclusive sneak peeks and development
          updates!
        </RText>

        <Block className="flex gap-4 mt-4 animate-fade-in-up delay-1000">
          <Link
            href="#"
            className="text-pink-500 hover:text-pink-300 transition-colors"
          >
            Facebook
          </Link>
          <Link
            href="#"
            className="text-pink-500 hover:text-pink-300 transition-colors"
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-pink-500 hover:text-pink-300 transition-colors"
          >
            Discord
          </Link>
        </Block>
      </Section>
    </Container>
  );
}
