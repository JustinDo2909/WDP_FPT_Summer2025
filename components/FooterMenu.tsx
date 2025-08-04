"use client";

import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "lucide-react";
import { map } from "lodash";
import { Block, Container, Group, Row, RText, Section } from "@/lib/by/Div";

import Image from "next/image";
import { Footer, FooterProps, ILink } from "@/types";

const FooterMenu = ({ footers }: FooterProps) => {
  return (
    <Container className="w-full px-6 md:px-16 lg:px-32 py-12 bg-gradient-to-br from-[#ffc6c6] to-[#aa4444] flex flex-col items-center gap-10">
      {/* Top Grid */}
      <Section className="w-full flex flex-col md:flex-row justify-between items-start md:items-start gap-12">
        {/* Logo & Contact */}
        <Section className="flex flex-col gap-4 max-w-xs">
          <Image
            src="/images/footer-icon.png"
            alt="Logo"
            width={180}
            height={60}
            priority
            className="hover:scale-105 transition-transform"
          />

          <Group className="flex flex-col gap-1">
            <RText className="text-base font-semibold text-neutral-700">
              Contact Us
            </RText>
            <RText className="text-sm text-neutral-600">
              Phone: 077 961 456
            </RText>
            <RText className="text-sm text-neutral-600">
              Email: takeskincare@gmail.com
            </RText>
          </Group>

          <Row className="flex gap-4 mt-2">
            {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, idx) => (
              <Link href="#" key={idx}>
                <Group className="p-2 bg-white/30 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110 shadow">
                  <Icon size={20} className="text-neutral-700" />
                </Group>
              </Link>
            ))}
          </Row>
        </Section>

        {/* Links */}
        <Section className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl">
          {map(footers, (footer: Footer, index: number) => (
            <Group key={index} className="flex flex-col gap-2">
              <Block className="text-base font-semibold text-neutral-700 mb-1">
                {footer.title}
              </Block>
              {map(footer.links, (link: ILink, linkIndex: number) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-rose-600 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </Group>
          ))}
        </Section>
      </Section>

      {/* Divider */}
      <Block className="w-full h-px bg-[#aa4444]" />

      {/* Copyright */}
      <Block className="text-sm text-neutral-600 text-center">
        © 2025 Take-Skincare. All Rights Reserved.
      </Block>
    </Container>
  );
};

export default FooterMenu;
