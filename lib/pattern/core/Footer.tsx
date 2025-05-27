"use client";

import {
  Area,
  Container,
  Group,
  Row,
  Begin,
  Content,
  Yard,
} from "@/lib/by/Div";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { footerData } from "@/constants";

const Footer = () => {
  return (
    <Container className="bg-pink-200 mt-auto">
      <Yard className="py-8">
        <Row className="justify-between items-start">
          {/* Brand and Contact Section */}
          <Begin className="flex-col gap-4 flex-1">
            <Area className="flex-row">
              <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
                TAKE-SKINCARE
              </h2>
            </Area>

            <Area className="flex-col gap-2">
              <h3 className="font-semibold text-gray-800">Contact Us</h3>
              <Area className="flex-col gap-1">
                <span className="text-gray-700">Phone: 077 961 456</span>
                <span className="text-gray-700">
                  Email: takeskincare@gmail.com
                </span>
              </Area>
            </Area>

            <Area className="flex-row">
              <Group className="gap-3">
                <Link
                  href="#"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Instagram size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                ></Link>
              </Group>
            </Area>
          </Begin>

          {/* Footer Links */}
          <Content className="flex-row justify-end gap-16">
            {footerData.map((section, index) => (
              <Area key={index} className="flex-col gap-3">
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
                <Area className="flex-col gap-2">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  ))}
                </Area>
              </Area>
            ))}
          </Content>
        </Row>

        {/* Copyright */}
        <Area className="flex-row justify-center mt-8 pt-6 border-t border-gray-400">
          <span className="text-gray-700 text-sm">
            © 2025 Take-Skincare. All Rights Reserved
          </span>
        </Area>
      </Yard>
    </Container>
  );
};

export default Footer;
