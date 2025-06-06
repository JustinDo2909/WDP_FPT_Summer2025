"use client";

import { Block, Card, Group, Row, Section } from "@/lib/by/Div";
import { IProduct } from "@/type/homepage";
import Image from "next/image";

const CardProduct = ({ product }: { product: IProduct }) => {
  const discount =
    product.price > product.sale_price
      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
      : 0;

  return (
    <Card className="w-72 h-full p-2.5 bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-start items-end gap-1 overflow-hidden">
      <Image
        className="self-stretch w-full relative rounded-md object-"
        src={product.image_url || "/placeholder.svg"}
        width={200}
        height={200}
        alt="product"
      />

      <Section className="self-stretch flex-1 py-1.5 flex flex-col justify-start items-start gap-1 px-2 overflow-hidden">
        <Row className="self-stretch inline-flex justify-between items-start overflow-hidden">
          <Group className="inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
            <Block className="justify-start">
              <Block className="text-pink-400 text-lg font-bold font-['Roboto']">
                {product.sale_price.toLocaleString()} VND
              </Block>
              <Block className="text-neutral-500 text-sm font-normal font-['Roboto'] line-through">
                {product.price.toLocaleString()} VND
              </Block>
            </Block>
          </Group>

          <Block className="px-2 py-1 bg-purple-500 rounded-md flex justify-center items-center gap-2.5 overflow-hidden">
            <Block className="justify-start text-white text-sm font-semibold">
              -{discount}%
            </Block>
          </Block>
        </Row>

        <Section className="self-stretch flex-1 flex flex-col justify-start items-start gap-[5px] overflow-hidden">
          <Block className="self-stretch justify-start text-zinc-800 text-lg font-bold font-['Roboto'] line-clamp-2">
            {product.title}
          </Block>
        </Section>

        <Section className="self-stretch  inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <Block className="justify-start text-black text-sm font-normal font-['Roboto'] line-clamp-3">
            {product.description}
          </Block>
        </Section>
      </Section>
    </Card>
  );
};

export default CardProduct;
