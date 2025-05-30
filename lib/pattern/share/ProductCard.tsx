// components/ProductCard.tsx
import React from "react";
import { ShoppingBasketIcon, Star } from "lucide-react";
import Image from "next/image";
import { Card, Column, Cover, Row, RText, Wrap } from "@/lib/by/Div";
import { formatPrice } from "../../share/formatPrice";
import { times } from "lodash";
import Link from "next/link";

interface ProductCardProps {
  product: IProductPageData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`${product.product.product_id}`} className="flex-1 flex">
    <Card className="max-w-sm group p-2 cursor-pointer bg-white dark:bg-zinc-900 rounded-xl shadow flex flex-col gap-3">
      {/* Product Image */}
      <Cover className="relative aspect-square w-full overflow-hidden rounded-lg bg-pink-100">
        <Image
          src={product.product.image_url[0]}
          alt={product.product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </Cover>
      <Wrap className="flex flex-col p-2 !items-start flex-1 gap-2">
        <RText className="text-sm text-gray-500 uppercase tracking-wide">
          {product.brand.title}
        </RText>

        <Column className="justify-between items-center">
          <RText className="text-pink-600 font-semibold text-xl">
            {formatPrice(product.product.sale_price)}
          </RText>
          <p className="text-gray-400 line-through text-sm">
            {formatPrice(product.product.price)}
          </p>
          <h3 className="text-lg font-semibold line-clamp-2 leading-tight">
            {product.product.title}
          </h3>
        </Column>

        <p className="text-sm text-gray-700 line-clamp-2">
          {product.product.description}
        </p>

        {/* Rating & Favorite at the bottom */}
        <Row className="flex justify-between items-center w-full mt-auto">
          <Row className="flex items-center justify-center text-yellow-500">
            {times(5, (i: number) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(product.product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <RText className="text-sm text-gray-800 ml-1">
              {product.product.rating.toFixed(1)}
            </RText>
          </Row>
          <button className="text-pink-500">
            <ShoppingBasketIcon size={20} />
          </button>
        </Row>
      </Wrap>

      {/* Add to Cart Button */}
    </Card>
    </Link>
  );
};

export default ProductCard;
