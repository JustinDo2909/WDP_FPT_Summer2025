"use client";

import { Area, Box, Group, RText, Section } from "@/lib/by/Div";
import { Mail, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <Area className="relative w-full py-20 bg-gradient-to-br from-[#ffc6c6] to-[#aa4444] rounded-3xl shadow-2xl overflow-hidden">
      <Box className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></Box>

      <Group className="relative z-10 flex flex-col justify-center items-center gap-8 px-8">
        <RText className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg text-center">
          CONTACT US
        </RText>
        <RText className="max-w-3xl text-white/90 text-lg md:text-xl text-center leading-relaxed drop-shadow-sm">
          We love to hear from you! Whether you have a question about our
          skincare, makeup, or just want to share your feedback, our team is
          ready to assist.
        </RText>
      </Group>

      <Section className="relative z-10 w-full mt-16">
        <Group className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <Box className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 pt-16 hover:scale-105">
            <Box className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[#aa4444] to-[#ee4444] rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </Box>
            <RText className="text-lg font-semibold text-slate-800 text-center mb-3">
              General Inquiries & Product Information
            </RText>
            <RText className="text-[#aa4444] font-medium text-center hover:text-[#ee4444] transition-colors">
              supportcosme@cosmeplay.com
            </RText>
          </Box>

          <Box className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 pt-16 hover:scale-105">
            <Box className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[#ee4444] to-[#ffc6c6] rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-6 h-6 text-white" />
            </Box>
            <RText className="text-lg font-semibold text-slate-800 text-center mb-3">
              Order Status & Returns
            </RText>
            <RText className="text-[#aa4444] font-medium text-center hover:text-[#ee4444] transition-colors">
              ordersCosme@cosmeplay.com
            </RText>
          </Box>

          <Box className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 pt-16 hover:scale-105">
            <Box className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[#ffc6c6] to-[#aa4444] rounded-full flex items-center justify-center shadow-lg">
              <Phone className="w-6 h-6 text-white" />
            </Box>
            <RText className="text-lg font-semibold text-slate-800 text-center mb-3">
              Prefer to talk?
            </RText>
            <Box className="text-center">
              <RText className="text-[#aa4444] font-medium block mb-1">
                +1-800-123-4567
              </RText>
              <RText className="text-sm text-slate-500">
                Monday - Friday, 9 AM - 5 PM
              </RText>
            </Box>
          </Box>
        </Group>
      </Section>
    </Area>
  );
}
