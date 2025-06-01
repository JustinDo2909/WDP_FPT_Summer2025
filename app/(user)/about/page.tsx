"use client";

import BannerAbout from "@/components/aboutPage/bannerAbout";
import ContactUs from "@/components/aboutPage/contactUs";
import ContentAbout from "@/components/aboutPage/contentAbout";
import { Container, Core } from "@/lib/by/Div";

export default function About() {
  return (
    <Core className="flex flex-col w-full min-h-screen bg-gradient-to-b from-white to-[#ffc6c6]/5">
      <Container className="flex-1">
        <BannerAbout />
      </Container>

      <Container className="px-4 py-16 flex-1">
        <ContentAbout />
      </Container>

      <Container className="pb-20 pt-8">
        <ContactUs />
      </Container>

      <Container className="h-24 bg-transparent"></Container>
    </Core>
  );
}
