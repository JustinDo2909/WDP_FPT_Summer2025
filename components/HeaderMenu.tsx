"use client";

import Link from "next/link";
import { map } from "lodash";
import { ShoppingBag, User } from "lucide-react";
import React from "react";
import { Block, Container, Group, Row, RText, Section } from "@/lib/by/Div";
import { useUser } from "@/hooks/useUser";

interface Header {
  title: string;
  href: string;
}

interface HeaderMenuProps {
  headers: Header[];
}

const HeaderMenu = ({ headers }: HeaderMenuProps) => {
  const { user } = useUser();

  return (
    <Container className="w-full px-36 bg-white border-b shadow-md inline-flex justify-between items-center">
      <Section className="w-fit inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
        <Link href="/">LOGO!</Link>
      </Section>

      <Section className="py-2.5 flex justify-start items-center gap-3">
        {map(headers, (header: Header, index: number) => (
          <Group key={index} className="flex items-center">
            <Link
              href={header.href}
              className="px-7 py-2 relative flex justify-center items-center gap-2.5 overflow-hidden rounded-sm
               after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
               after:h-[2px] after:w-0 after:bg-[#ffc6c6] after:transition-all after:duration-300    
               hover:after:w-full"
            >
              {header.title}
            </Link>
            {index < headers.length - 1 && (
              <Block className="w-px h-6 bg-gray-300 mx-3" />
            )}
          </Group>
        ))}

        <Block>
          <button className="p-2.5 bg-zinc-800 rounded-[50px] flex justify-center items-center gap-2.5 overflow-hidden">
            <span className="justify-start text-white text-sm font-bold font-['Inter']">
              AI Chatbot
            </span>
          </button>
        </Block>
      </Section>

      <Section className="flex justify-start items-center gap-7 overflow-hidden">
        <Link
          href="/cart"
          className="flex p-2 justify-center items-center gap-2.5 overflow-hidden rounded-full
        hover:bg-[#ffc6c6] transition-all hover:cursor-pointer"
        >
          <ShoppingBag size={20} />
        </Link>

        <Block className="w-px h-6 bg-gray-300" />

        <Row className="flex justify-center items-center gap-2.5 overflow-hidden hover:cursor-pointer">
          <Link
            href="/login"
            className="flex justify-center items-center gap-2.5"
          >
            <Block className="px-2 py-1.5 rounded-[10px] flex justify-center items-center gap-2.5 overflow-hidden">
              <User size={20} />
            </Block>

            <Block className="justify-start text-black text-sm font-normal font-['Inter']">
              {user ? <RText>Logout</RText> : <RText>Login</RText>}
            </Block>
          </Link>
        </Row>
      </Section>
    </Container>
  );
};

export default HeaderMenu;
