"use client";
import { Area, Block, Group, Section, Yard } from "@/lib/by/Div";
import React from "react";
import { map } from "lodash";
import { listProductData } from "@/constants";
import CardProduct from "@/lib/pattern/share/CardProduct";

export default function Page() {
  return (
    <Area className="bg-zinc-100 gap-y-20">
      <Yard className="inline-flex flex-col justify-start items-start">
        <Section className="w-full h-screen shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[url('/images/backgroundBanner.png')] bg-no-repeat bg-cover flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <Section className="self-stretch px-[330px] py-16 flex flex-col justify-center items-start gap-1 overflow-hidden">
            <Group className="justify-start">
              <Block className="inline text-pink-300 text-5xl font-bold font-['Laila']">
                Welcome{" "}
              </Block>
              <Block className="inline text-black text-5xl font-bold font-['Laila']">
                to CosMePlay
              </Block>
            </Group>

            <Block className="w-full justify-start text-neutral-500 text-2xl text-justify font-bold font-['Roboto_Flex']">
              Where we believe in the power of natural ingredients and
              personalized care to help you achieve your skin goals
            </Block>

            <Block className="self-stretch text-right justify-start text-neutral-500 text-2xl  font-normal font-['Roboto_Flex']">
              Your Journey to Radiant Skin Starts Here
            </Block>
          </Section>
        </Section>
      </Yard>

      <Section className="px-40 py-5 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10 overflow-hidden">
        <Group className="lg:col-span-4 xl:col-span-1 p-2.5 flex flex-col justify-start items-start gap-y-5">
          <Block className="w-fit justify-start text-pink-400 text-4xl font-bold font-['Laila']">
            RADIANT SKIN STARTS HERE
          </Block>
          <Block className="w-fit justify-start text-zinc-800 text-xl font-normal font-['Roboto_Flex']">
            Discover our luxurious skincare collection designed to cleanse,
            nourish, and rejuvenate your face. From brightening cleansers to
            revitalizing eye creams, each product is crafted for flawless,
            porcelain-like beauty
          </Block>
        </Group>

        {map(listProductData, (product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </Section>
    </Area>
  );
}
