"use client";

import { Block, Box, Column, Row, RText, Wrap } from "@/lib/by/Div";
import { formatPrice } from "../../lib/share/formatPrice";
import Image from "next/image";
import QuantityButton from "../ProductPage/QuantityButton";
import { useCartItemActions } from "./seg/useCartItemActions";

export const CartItem = ({
  item,
  isSimple = false,
  savings,
}: {
  item: ICartLineItem;
  isSimple?: boolean;
  savings: number;
}) => {
  const { product, quantity } = item;
  const { handleRemove, handleUpdateQuantity, isRemoving, isUpdating } =
    useCartItemActions();

  const effectivePrice = product.sale_price ?? product.price;
  const totalPrice = effectivePrice * quantity - savings;

  return (
    <Block
      className={`
        relative flex border rounded-md p-4 justify-between items-center gap-4 flex-wrap md:flex-nowrap
        ${savings > 0 ? "border-primary" : "border-gray-200"}
      `}
    >
      {/* Ribbon */}
      {savings > 0 && (
        <Wrap className="absolute -top-2 -left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded shadow z-10">
          Voucher Applied
        </Wrap>
      )}

      <Box className="flex gap-4 items-start flex-shrink-0">
        <Wrap className="w-16 h-16 relative">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="rounded object-cover"
          />
        </Wrap>
        <Wrap className="w-[300px] max-w-[300px]">
          <RText className="text-sm text-gray-600 line-clamp-2">
            {product.title}
          </RText>
          {!isSimple && (
            <Row className="flex gap-4 text-sm mt-2 text-gray-500">
              <button
                className="hover:text-red-500"
                onClick={() => handleRemove(product.id)}
                disabled={isRemoving}
              >
                ✕ Remove
              </button>
            </Row>
          )}
        </Wrap>
      </Box>

      <Box className="grid grid-cols-3 justify-between w-full lg:items-center items-end">
        {/* Price Column */}
        <Column className="flex flex-col items-start justify-start whitespace-nowrap">
          <RText className="text-xs text-gray-400">Price</RText>
          <RText className="text-base font-semibold">
            {formatPrice(effectivePrice)}
          </RText>
          {!!product.sale_price && (
            <RText className="line-through text-sm text-gray-400">
              {formatPrice(product.price)}
            </RText>
          )}
        </Column>

        {/* Quantity */}
        <Wrap className="flex justify-center">
          {!isSimple && (
            <QuantityButton
              decrement={() => handleUpdateQuantity(product.id, quantity - 1)}
              increment={() => handleUpdateQuantity(product.id, quantity + 1)}
              disabled={isUpdating}
              size="small"
              quantity={quantity}
            />
          )}
        </Wrap>

        {/* Total + Savings */}
        <Column className="flex flex-col items-end justify-start whitespace-nowrap">
          <RText className="text-xs text-gray-400 text-right">Total</RText>
          <RText className="text-base text-right font-semibold text-pink-600">
            {formatPrice(totalPrice)}
          </RText>
          {savings > 0 && (
            <RText className="text-xs text-green-600 mt-0.5 text-right">
              You saved {formatPrice(savings)}!
            </RText>
          )}
        </Column>
      </Box>
    </Block>
  );
};
