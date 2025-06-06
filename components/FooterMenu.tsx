"use client";

import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "lucide-react";
import { map } from "lodash";
import { Block, Container, Group, Row, RText, Section } from "@/lib/by/Div";
import { Footer, FooterProps, ILink } from "@/type/homepage";

const FooterMenu = ({ footers }: FooterProps) => {
  return (
    <Container className="w-full h-full px-8 md:px-36 py-16 bg-gradient-to-br from-[#ffc6c6] to-[#aa4444] inline-flex flex-col justify-center items-center gap-12 overflow-hidden">
      <Section className="self-stretch py-8 inline-flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <Section className="p-2.5 inline-flex flex-col justify-center items-start gap-y-8 overflow-hidden">
          <RText className="justify-start text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg">
            LOGO!
          </RText>

          <Group className="flex flex-col justify-start items-start gap-3">
            <RText className="justify-start text-slate-800 text-xl font-semibold">
              Contact Us
            </RText>
            <RText className="justify-start text-slate-700 text-lg font-normal hover:text-slate-900 transition-colors">
              Phone: 077 961 456
            </RText>
            <RText className="justify-start text-slate-700 text-lg font-normal hover:text-slate-900 transition-colors">
              Email: takeskincare@gmail.com
            </RText>
          </Group>

          <Row className="w-auto py-2 inline-flex justify-start items-center gap-x-6 overflow-hidden">
            <Group className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer hover:scale-110">
              <InstagramIcon size={24} className="text-slate-800" />
            </Group>
            <Group className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer hover:scale-110">
              <FacebookIcon size={24} className="text-slate-800" />
            </Group>
            <Group className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer hover:scale-110">
              <YoutubeIcon size={24} className="text-slate-800" />
            </Group>
          </Row>
        </Section>

        <Section className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-x-16 overflow-hidden">
          {map(footers, (footer: Footer, index: number) => (
            <Group key={index} className="flex flex-col gap-4 min-w-[150px]">
              <Block className="text-xl font-semibold text-slate-800 mb-2 drop-shadow-sm">
                {footer.title}
              </Block>
              {map(footer.links, (link: ILink, linkIndex: number) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  className="text-lg text-slate-700 hover:text-slate-900 hover:translate-x-1 transition-all duration-200 drop-shadow-sm"
                >
                  {link.title}
                </Link>
              ))}
            </Group>
          ))}
        </Section>
      </Section>

      <Block className="devider w-full h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      <Block className="self-stretch text-center justify-start text-slate-700 text-lg font-normal drop-shadow-sm">
        © 2025 Take-Skincare. All Rights Reserved
      </Block>
    </Container>
  );
};

export default FooterMenu;
