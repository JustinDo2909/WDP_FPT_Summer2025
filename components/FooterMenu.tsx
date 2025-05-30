"use client";

import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "lucide-react";
import { map } from "lodash";
import { Block, Container, Group, Row, RText, Section } from "@/lib/by/Div";
import { Footer, FooterProps, ILink } from "@/type/homepage";

const FooterMenu = ({ footers }: FooterProps) => {
  return (
    <Container className="w-full px-36 py-10 bg-[#ffc6c6] inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
      <Section className="self-stretch py-5 inline-flex justify-between items-center">
        <Section className="p-2.5 inline-flex flex-col justify-center items-start gap-y-6 overflow-hidden">
          <RText className="justify-start text-pink-400 text-5xl font-bold">
            LOGO!
          </RText>

          <Group className="flex flex-col justify-start items-start gap-2">
            <RText className="justify-start text-black text-xl font-bold font-['Roboto_Flex']">
              Contact Us
            </RText>
            <RText className="justify-start text-zinc-800 text-xl font-normal font-['Roboto_Flex']">
              Phone: 077 961 456
            </RText>
            <RText className="justify-start text-zinc-800 text-xl font-normal font-['Roboto_Flex']">
              Email: takeskincare@gmail.com
            </RText>
          </Group>

          <Row className="w-auto py-1.5 inline-flex justify-start items-center gap-x-14 overflow-hidden">
            <InstagramIcon size={30} />
            <FacebookIcon size={30} />
            <YoutubeIcon size={30} />
          </Row>
        </Section>

        <Section className="flex justify-between items-start gap-x-40 overflow-hidden">
          {map(footers, (footer: Footer, index: number) => (
            <Group key={index} className="flex flex-col gap-5">
              <Block className="text-xl font-bold">{footer.title}</Block>
              {map(footer.links, (link: ILink, linkIndex: number) => (
                <Link
                  key={linkIndex}
                  href={link.href}
                  className="text-xl text-black hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </Group>
          ))}
        </Section>
      </Section>

      <Block className="devider w-full h-0.5 bg-[#777]" />

      <Block className="self-stretch text-center justify-start text-[#777] text-xl font-normal font-['Roboto_Flex']">
        © 2025 Take-Skincare. All Rights Reserved
      </Block>
    </Container>
    // <div className=" w-full px-24 py-10 bg-[#ffc6c6] inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
    //   <div className="self-stretch py-5 inline-flex justify-between items-center">
    //     <div className="p-2.5 inline-flex flex-col justify-center items-start gap-y-6 overflow-hidden">
    //       <div className="justify-start text-pink-400 text-5xl font-bold">
    //         LOGO!
    //       </div>
    //       <div className="flex flex-col justify-start items-start gap-2">
    //         <span className="justify-start text-black text-xl font-bold font-['Roboto_Flex']">
    //           Contact Us
    //         </span>
    //         <span className="justify-start text-zinc-800 text-xl font-normal font-['Roboto_Flex']">
    //           Phone: 077 961 456
    //         </span>
    //         <span className="justify-start text-zinc-800 text-xl font-normal font-['Roboto_Flex']">
    //           Email: takeskincare@gmail.com
    //         </span>
    //       </div>
    //       <div className="w-auto py-1.5 inline-flex justify-start items-center gap-x-14 overflow-hidden">
    //         <InstagramIcon size={30} />
    //         <FacebookIcon size={30} />
    //         <YoutubeIcon size={30} />
    //       </div>
    //     </div>
    //     <div className="flex justify-between items-start gap-x-40 overflow-hidden">
    //       {map(footers, (footer: Footer, index: number) => (
    //         <div key={index} className="flex flex-col gap-5">
    //           <h4 className="text-xl font-bold">{footer.title}</h4>
    //           {map(footer.links, (link: Link, linkIndex: number) => (
    //             <Link
    //               key={linkIndex}
    //               href={link.href}
    //               className="text-xl text-black hover:underline"
    //             >
    //               {link.title}
    //             </Link>
    //           ))}
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="devider w-full h-0.5 bg-[#777]" />
    //   <span className="self-stretch text-center justify-start text-[#777] text-xl font-normal font-['Roboto_Flex']">
    //     © 2025 Take-Skincare. All Rights Reserved
    //   </span>
    // </div>
  );
};

export default FooterMenu;
