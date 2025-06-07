'use client'

import { Block, Box, Column, Row, RText, Wrap } from "@/lib/by/Div";
import { formatPrice } from '../../lib/share/formatPrice';
import Image from "next/image";
import QuantityButton from "../ProductPage/QuantityButton";
import { useCartItemActions } from "./seg/useCartItemActions";

export const CartItem = ({ item }: { item: ICartLineItem }) => {
  const { product, quantity } = item;
   const {
    handleRemove,
    handleUpdateQuantity,
    isRemoving,
    isUpdating,
  } = useCartItemActions();


  const effectivePrice = product.sale_price ?? product.price;
  const totalPrice = effectivePrice * quantity;

  return (
    <Block className="flex border rounded-md p-4 justify-between items-center gap-4 flex-wrap md:flex-nowrap">
      <Box className="flex gap-4 items-start flex-shrink-0">
        <Wrap className='w-16 h-16 relative'>
          <Image src={product.image_url} alt={product.title} fill/>
        </Wrap>
        <Wrap className="w-[300px] max-w-[300px]">
          <RText className="text-sm text-gray-600  line-clamp-2">{product.title}</RText>
          <Row className="flex gap-4 text-sm mt-2 text-gray-500">
            {/* <button>♡ Favorite</button> */}
            <button className="hover:text-red-500" onClick={() => handleRemove(product.id)} disabled={isRemoving}>✕ Remove</button>
          </Row>
        </Wrap>
      </Box>

      <Box className="grid grid-cols-3 flex-row justify-between w-full lg:items-center items-end ">

      <Column className="items-end whitespace-nowrap">
        <RText className="text-xs text-gray-400 ">
          Price
        </RText>
        <RText className="text-base font-semibold ">
          {formatPrice(effectivePrice)}
        </RText>
        {!!product.sale_price && (
          <RText className="line-through text-sm text-gray-400">
            {formatPrice(product.price)}
          </RText>
        )}
      </Column>

      <Wrap className="flex justify-center">

        <QuantityButton 
          decrement={() => handleUpdateQuantity(product.id, quantity - 1)} 
          increment={() => handleUpdateQuantity(product.id, quantity + 1)} 
          disabled={isUpdating}
          size="small" quantity={quantity}
        />
        </Wrap>

      <RText className="text-base text-right font-semibold whitespace-nowrap text-pink-600">
        {formatPrice(totalPrice)}
      </RText>
      </Box>
    </Block>
  );
};
