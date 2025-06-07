"use client";

import Link from "next/link";
import { map } from "lodash";
import { ShoppingBag, User } from "lucide-react";
import React from "react";
import {
  Block,
  Container,
  Group,
  Row,
  RText,
  Section,
  Wrap,
} from "@/lib/by/Div";
import { useUser } from "@/hooks/useUser";
import { CartIndicatorWrapper } from "./CartIndicatorWrapper";

interface Header {
  title: string;
  href: string;
}

interface HeaderMenuProps {
  headers: Header[];
}

const HeaderMenu = ({ headers }: HeaderMenuProps) => {
  const { user, loading } = useUser();

  return (
    <Container className="w-full px-8 md:px-36 bg-white/95 backdrop-blur-md border-b border-[#ffc6c6]/30 shadow-lg inline-flex justify-between items-center sticky top-0 z-50">
      <Section className="w-fit inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-bold text-[#aa4444] hover:text-[#ee4444] transition-colors duration-300 tracking-tight drop-shadow-sm"
        >
          LOGO!
        </Link>
      </Section>

      <Section className="py-4 flex justify-start items-center gap-1">
        {map(headers, (header: Header, index: number) => (
          <Group key={index} className="flex items-center">
            <Link
              href={header.href}
              className="px-6 py-3 relative flex justify-center items-center gap-2.5 overflow-hidden rounded-lg text-slate-700 font-medium hover:text-[#aa4444] hover:bg-[#ffc6c6]/10 transition-all duration-300
               after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
               after:h-[3px] after:w-0 after:bg-gradient-to-r after:from-[#ffc6c6] after:to-[#ee4444] after:transition-all after:duration-300 after:rounded-full   
               hover:after:w-3/4"
            >
              {header.title}
            </Link>
            {index < headers.length - 1 && (
              <Block className="w-px h-6 bg-[#ffc6c6]/50 mx-2" />
            )}
          </Group>
        ))}

        <Block className="ml-4">
          <button className="px-4 py-2.5 bg-gradient-to-r from-[#aa4444] to-[#ee4444] hover:from-[#ee4444] hover:to-[#aa4444] rounded-full flex justify-center items-center gap-2.5 overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
            <span className="justify-start text-white text-sm font-semibold drop-shadow-sm">
              AI Chatbot
            </span>
          </button>
        </Block>
      </Section>

      <Section className="flex justify-start items-center gap-4 overflow-hidden px-2">
        <CartIndicatorWrapper>
          <Link
            href={user ? `/checkout/cart` : `/login`}
            className="flex p-3 justify-center items-center gap-2.5 overflow-hidden rounded-full text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-[#ffc6c6] hover:to-[#ee4444] transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
          >
            <ShoppingBag size={20} />
          </Link>
        </CartIndicatorWrapper>

        <Block className="w-px h-6 bg-[#ffc6c6]/50" />

        <Row className="flex justify-center items-center gap-3 overflow-hidden hover:cursor-pointer">
          <Wrap className="flex justify-center items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#ffc6c6]/10 transition-all duration-300">
            <Block className="p-2 rounded-full flex justify-center items-center gap-2.5 overflow-hidden text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-[#aa4444] hover:to-[#ee4444] transition-all duration-300">
              <Link href="/user">
                <User size={20} />
              </Link>
            </Block>

            <Block className="justify-start text-slate-700 text-sm font-medium hover:text-[#aa4444] transition-colors">
              {!loading &&
                (user ? (
                  <Link href={""}>
                    <RText>Logout</RText>
                  </Link>
                ) : (
                  <Link href="/login">
                    <RText>Login</RText>
                  </Link>
                ))}
            </Block>
          </Wrap>
        </Row>
      </Section>
    </Container>
  );
};

export default HeaderMenu;
