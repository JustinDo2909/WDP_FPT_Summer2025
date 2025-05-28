// components/ProductCard.tsx
import React from 'react';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { Card, Column, Cover, Row, RText } from '@/lib/by/Div';
import { formatPrice } from '../../../utils/formatPrice';
import { times } from 'lodash';

interface ProductCardProps {
  product: IProductPageData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="max-w-sm p-4 bg-white dark:bg-zinc-900 rounded-xl shadow flex flex-col gap-3">
      {/* Product Image */}
      <Cover className="relative aspect-4-3 w-full overflow-hidden rounded-lg bg-pink-100">
  <Image
    src={product.product.image_url[0]}
    alt={product.product.title}
    fill
    className="object-cover"
  />
</Cover>

<RText className="text-sm text-gray-500 uppercase tracking-wide">
  {product.brand.title}
</RText>

<Column className="justify-between items-center">
  <h3 className="text-lg font-semibold text-pink-600 line-clamp-1">
    {product.product.title}
  </h3>
  <p className="text-gray-400 line-through font-semibold">
    {formatPrice(product.product.price)}
  </p>
  <RText className="text-pink-600 font-semibold text-xl">
    {formatPrice(product.product.sale_price)}
  </RText>
</Column>

<p className="text-sm text-gray-700 line-clamp-2">
  {product.product.description}
</p>


      {/* Rating & Favorite */}
      <Row className="justify-between items-center">
        <Row className="items-center justify-center text-yellow-500">
          {times(5, (i: number) => (
            <Star
              key={i}
              size={16}
              className={` ${i < Math.floor(product.product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
            ))}
          <RText className="text-sm text-gray-800">
            {product.product.rating.toFixed(1)}
          </RText>
        </Row>
        <button
        //   onClick={() => onToggleFavorite?.(product.id)}
          className="text-pink-500"
        >
          <Heart
            size={20}
            fill={"red"}
            stroke='none'
          />
        </button>
      </Row>

      {/* Add to Cart Button */}
      
    </Card>
  );
};

export default ProductCard;
