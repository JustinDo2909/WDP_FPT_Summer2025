"use client";
import { Area, Yard } from "@/lib/by/Div";
import React from "react";
import { map } from "lodash";
import { listProductData } from "@/constants";
import { IProduct } from "@/type/homepage";
import CardProduct from "@/lib/pattern/share/CardProduct";

export default function Page() {
  return (
    <Area className="bg-zinc-100 gap-y-20">
      <Yard className="inline-flex flex-col justify-start items-start">
        <div className="w-full h-screen shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-[url('/images/backgroundBanner.png')] bg-no-repeat bg-cover flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch px-[520px] py-16 flex flex-col justify-center items-start gap-5 overflow-hidden">
            <div className="justify-start">
              <h1 className="inline text-pink-300 text-5xl font-bold font-['Laila']">
                Welcome{" "}
              </h1>
              <h2 className="inline text-black text-5xl font-bold font-['Laila']">
                to Take-Skincare,
              </h2>
            </div>
            <span className="w-full justify-start text-neutral-500 text-3xl font-bold font-['Roboto_Flex']">
              Where we believe in the power of natural ingredients and
              personalized care to help you achieve your skin goals
            </span>
            <span className="self-stretch text-right justify-start text-neutral-500 text-3xl font-normal font-['Roboto_Flex']">
              Your Journey to Radiant Skin Starts Here
            </span>
          </div>
        </div>
      </Yard>

      <div className=" px-40 py-5 inline-flex justify-start items-start gap-10 flex-wrap content-start overflow-hidden">
        <div className="p-2.5 inline-flex flex-col justify-start items-start gap-y-5 overflow-hidden">
          <h2 className="w-80 justify-start text-pink-400 text-5xl font-bold font-['Laila']">
            RADIANT SKIN STARTS HERE
          </h2>
          <span className="w-96 justify-start text-zinc-800 text-3xl font-normal font-['Roboto_Flex']">
            Discover our luxurious skincare collection designed to cleanse,
            nourish, and rejuvenate your face. From brightening cleansers to
            revitalizing eye creams, each product is crafted for flawless,
            porcelain-like beauty
          </span>
        </div>

        {map(listProductData, (product: IProduct, index: number) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </Area>
  );
}
