import { Block, Box, Column, Row, RText, Wrap } from "@/lib/by/Div";
import { formatPrice } from '../../lib/share/formatPrice';
import Image from "next/image";
import QuantityButton from "../ProductPage/QuantityButton";

export const CartItem = ({ item }: { item: ICartLineItem }) => {
  const { product, quantity } = item;
  const effectivePrice = product.sale_price ?? product.price;
  const totalPrice = effectivePrice * quantity;

  return (
    <Block className="flex border rounded-md p-4 justify-between items-center gap-4 flex-wrap md:flex-nowrap">
      <Box className="flex gap-4 items-start flex-shrink-0">
        <Image src={product.image_url} alt={product.title} width={64} height={64} />
        <Wrap className="w-[300px] max-w-[300px]">
          <RText className="text-sm text-gray-600  line-clamp-2">{product.title}</RText>
          <Row className="flex gap-4 text-sm mt-2 text-gray-500">
            {/* <button>♡ Favorite</button> */}
            <button className="hover:text-red-500">✕ Remove</button>
          </Row>
        </Wrap>
      </Box>

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

      <QuantityButton size="small" quantity={quantity} />

      <RText className="text-base font-semibold whitespace-nowrap text-pink-600">
        {formatPrice(totalPrice)}
      </RText>
    </Block>
  );
};
