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
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Header {
  title: string;
  href: string;
}

interface HeaderMenuProps {
  headers: Header[];
}

const HeaderMenu = ({ headers }: HeaderMenuProps) => {
  const { user, isLogged } = useUser();
  const router = useRouter();
  return (
    <Container className="w-full px-8 md:px-36 bg-white inline-flex justify-between items-center sticky top-0 z-50">
      <Image
        src="/images/icon.png"
        alt="Logo"
        width={100}
        height={100}
        priority
        className="hover:scale-105 transition-transform"
        onClick={() => router.push("/")}
      />

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
      </Section>

      <Section className="flex justify-start items-center gap-4 overflow-hidden px-2">
        <CartIndicatorWrapper>
          <Link
            href={user ? `/checkout/cart` : `/login`}
            className="flex p-3 justify-center items-center gap-2.5 overflow-hidden rounded-full text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-[#ffc6c6] hover:to-[#ee4444] transition-all duration-300 hover:scale-110  hover:shadow-md"
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
              {isLogged ? (
                <Link href={"/logout"}>
                  <RText>Logout</RText>
                </Link>
              ) : (
                <Link href="/login">
                  <RText>Login</RText>
                </Link>
              )}
            </Block>
          </Wrap>
        </Row>
      </Section>
    </Container>
  );
};

export default HeaderMenu;
