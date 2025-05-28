"use client";

import { Card } from "@/lib/by/Div";
import { IProduct } from "@/type/homepage";
import Image from "next/image";

const CardProduct = ({ product }: { product: IProduct }) => {
  const discount =
    product.price > product.sale_price
      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
      : 0;

  return (
    <Card className="w-72 h-fit p-2.5 bg-white rounded-md inline-flex flex-col justify-start items-end gap-2.5 overflow-hidden">
      <Image
        className="self-stretch h-72 relative rounded-md object-cover"
        src={product.image_url}
        width={300}
        height={300}
        alt="product"
      />
      <div className="self-stretch flex-1 py-1.5 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="self-stretch px-2.5 inline-flex justify-between items-start overflow-hidden">
          <div className="inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
            <div className="justify-start">
              <span className="text-pink-400 text-2xl font-bold font-['Roboto']">
                {product.sale_price} VND
                <br />
              </span>
              <span className="text-neutral-500 text-base font-normal font-['Roboto'] line-through">
                {product.price} VND
              </span>
            </div>
          </div>
          <div className="px-2 py-1 bg-purple-500 rounded-md flex rounded-md justify-center items-center gap-2.5 overflow-hidden">
            <span className="justify-start text-white text-base font-semibold">
              -{discount}%
            </span>
          </div>
        </div>
        <div className="self-stretch p-2.5 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <div className="self-stretch justify-start text-zinc-800 text-2xl font-bold font-['Roboto']">
            {product.title}
          </div>
        </div>
        <div className="self-stretch px-2.5 inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <div className=" justify-start text-black text-base font-normal font-['Roboto']">
            {product.description}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardProduct;
