"use client";

import { Area, Group, RText, Section } from "@/lib/by/Div";
import Image from "next/image";

export default function ContentAbout() {
  return (
    <Area className="flex flex-col gap-24 py-16">
      <Section>
        <Group className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
          <Group className="flex flex-col gap-6 flex-1">
            <RText className="text-[#aa4444] text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              History
            </RText>
            <RText className="text-slate-600 text-xl font-normal leading-relaxed">
              Founded in 2010 by dermatologist Dr. Jane Doe, Glow Skin Care has
              been dedicated to providing high-quality, natural skin care
              products that transform and nurture your skin with the power of
              science and nature.
            </RText>
            <Group className="w-16 h-1 bg-gradient-to-r from-[#ffc6c6] to-[#ee4444] rounded-full"></Group>
          </Group>
          <Group className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={400}
              height={200}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </Group>
        </Group>
      </Section>

      <Section>
        <Group className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
          <Group className="flex-shrink-0 order-2 lg:order-1">
            <Image
              src="/images/aboutBanner.png"
              alt="faceCare"
              width={400}
              height={200}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </Group>
          <Group className="flex flex-col gap-6 flex-1 order-1 lg:order-2">
            <RText className="text-[#aa4444] text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Mission
            </RText>
            <RText className="text-slate-600 text-xl font-normal leading-relaxed">
              Our mission is to empower individuals to take control of their
              skin health with effective, safe, and sustainable products that
              deliver visible results while respecting both your skin and the
              environment.
            </RText>
            <Group className="w-16 h-1 bg-gradient-to-r from-[#aa4444] to-[#ee4444] rounded-full"></Group>
          </Group>
        </Group>
      </Section>

      <Section>
        <Group className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
          <Group className="flex flex-col gap-6 flex-1">
            <RText className="text-[#aa4444] text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Vision
            </RText>
            <RText className="text-slate-600 text-xl font-normal leading-relaxed">
              We envision a world where everyone has access to premium skincare
              that enhances natural beauty, promotes confidence, and supports
              overall wellness through innovative, scientifically-backed
              formulations.
            </RText>
            <Group className="w-16 h-1 bg-gradient-to-r from-[#ee4444] to-[#ffc6c6] rounded-full"></Group>
          </Group>
          <Group className="flex-shrink-0">
            <Image
              src="/images/backgroundBanner.png"
              alt="vision"
              width={400}
              height={200}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </Group>
        </Group>
      </Section>
    </Area>
  );
}
