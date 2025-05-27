"use client";

import { Area, Container, Group, Row, Wrap } from "@/lib/by/Div";
import Link from "next/link";
import { map } from "lodash";
import { ShoppingCart, User } from "lucide-react";

interface Header {
  title: string;
  href: string;
}

interface HeaderMenuProps {
  headers: Header[];
}

const HeaderMenu = ({ headers }: HeaderMenuProps) => {
  return (
    <Container className="flex flex-row justify-between items-center py-2 border-b bg-white">
      <Row>
        <Area className="flex-row">
          <Link
            href="/"
            className="bg-pink-200 px-4 py-2 rounded-lg font-bold text-lg text-gray-800"
          >
            LOGO!
          </Link>
        </Area>

        <Area className="flex-row">
          <Group className="gap-8">
            {map(headers, (header, index) => (
              <Link
                key={index}
                href={header.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
              >
                {header.title}
              </Link>
            ))}
          </Group>
        </Area>

        <Area className="flex-row">
          <Group className="gap-4">
            <Link
              href="/chatbot"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-colors"
            >
              AI Chatbot
            </Link>

            <Link
              href="/cart"
              className="p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <ShoppingCart size={24} className="text-gray-700" />
            </Link>

            <Link
              href="/login"
              className="hover:bg-gray-50 rounded-md transition-colors"
            >
              <Wrap className="px-3 py-2">
                <User size={20} className="text-gray-700" />
                <span className="text-gray-700">Sign in</span>
              </Wrap>
            </Link>
          </Group>
        </Area>
      </Row>
    </Container>
  );
};

export default HeaderMenu;
