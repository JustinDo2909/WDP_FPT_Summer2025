"use client";
import { listProductData } from "@/constants/homepage";
import { Area, Group, RText, Section, Yard } from "@/lib/by/Div";
import CardProduct from "@/lib/pattern/share/CardProduct";
import Image from "next/image";
import FloatingGameButton from "@/components/floating_game_button";
import { map } from "lodash";

export default function Page() {
  return (
    <Area className=" gap-y-20 py-5">
      <Yard className="inline-flex flex-col justify-start items-start">
        <Section className="w-full h-screen shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[url('/images/backgroundBanner.png')] bg-no-repeat bg-cover flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <Section className="self-stretch px-[330px] py-16 flex flex-col justify-center items-start gap-1 overflow-hidden">
            <Group className="justify-start">
              <RText className="inline text-pink-300 text-5xl font-bold font-['Laila']">
                Welcome{" "}
              </RText>
              <RText className="inline text-black text-5xl font-bold font-['Laila']">
                to CosmePlay
              </RText>
            </Group>

            <RText className="w-full justify-start text-neutral-500 text-2xl text-justify font-bold font-['Roboto_Flex']">
              Where we believe in the power of natural ingredients and
              personalized care to help you achieve your skin goals
            </RText>

            <RText className="self-stretch text-right justify-start text-neutral-500 text-2xl  font-normal font-['Roboto_Flex']">
              Your Journey to Radiant Skin Starts Here
            </RText>
          </Section>
        </Section>
      </Yard>

      <Section className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">
        <Group className="lg:col-span-1 p-6 flex flex-col justify-start items-start gap-6 bg-gradient-to-br from-[#ffc6c6]/10 to-white rounded-2xl shadow-lg">
          <RText className="text-[#aa4444] text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            RADIANT SKIN STARTS HERE
          </RText>
          <RText className="text-slate-700 text-lg font-normal leading-relaxed">
            Discover our luxurious skincare collection designed to cleanse,
            nourish, and rejuvenate your face. From brightening cleansers to
            revitalizing eye creams, each product is crafted for flawless,
            porcelain-like beauty.
          </RText>
          <Group className="w-16 h-1 bg-gradient-to-r from-[#ffc6c6] to-[#ee4444] rounded-full"></Group>
        </Group>

        <Group className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {map(listProductData, (product, index) => (
            <CardProduct key={index} product={product} />
          ))}
        </Group>
      </Section>

      <Section className="px-6 w-full py-16 bg-gradient-to-r from-[#ffc6c6]/5 to-white">
        <Group className="flex max-w-6xl justify-between gap-16 items-center mx-auto flex-col lg:flex-row">
          <Group className="flex flex-col justify-center flex-1 text-center lg:text-left">
            <RText className="mb-6">
              <span className="text-[#aa4444] text-7xl md:text-9xl font-bold tracking-tight drop-shadow-lg">
                F
              </span>
              <span className="text-[#ffc6c6] text-6xl md:text-8xl font-bold tracking-tight drop-shadow-md">
                ace Care
              </span>
            </RText>
            <RText className="text-slate-600 text-lg leading-relaxed max-w-lg">
              A comprehensive approach to maintaining and improving the health
              and appearance of the skin on your face. It involves a variety of
              practices and products aimed at cleaning, protecting, and
              nourishing the skin to promote a healthy and radiant complexion.
            </RText>
            <Group className="w-20 h-1 bg-gradient-to-r from-[#aa4444] to-[#ee4444] rounded-full mt-6 mx-auto lg:mx-0"></Group>
          </Group>
          <Group className="flex-shrink-0">
            <Image
              src="/images/faceCare.png"
              alt="faceCare"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </Group>
        </Group>
      </Section>

      <Section className="bg-gradient-to-br from-[#ffc6c6]/10 to-[#aa4444]/5 rounded-3xl mx-auto max-w-7xl px-6 py-16 shadow-xl">
        <Group className="text-center mb-12">
          <RText className="text-[#aa4444] text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Featured Products
          </RText>
          <RText className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our carefully curated selection of premium skincare products
          </RText>
          <Group className="w-20 h-1 bg-gradient-to-r from-[#ffc6c6] to-[#ee4444] rounded-full mx-auto mt-4"></Group>
        </Group>
        <Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {map(listProductData, (product, index) => (
            <CardProduct key={index} product={product} />
          ))}
        </Group>
      </Section>

      <FloatingGameButton />
    </Area>
  );
}
