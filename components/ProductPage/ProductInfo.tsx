import { Star } from "lucide-react";
import { Area, Row, RText, Wrap } from "@/lib/by/Div";
import { ProductPageData } from "@/types";
import { formatPrice } from '../../utils/formatPrice';

export function ProductInfo({ productData }: { productData: ProductPageData }) {
  const { product, category } = productData;
  return (
    <>
      <Area>
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
      </Area>

      <Row className="items-center justify-start gap-0">
        <Wrap className="flex-start">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
          <RText className="w-auto">{product.rating}</RText>
          <RText className="text-gray-500">
          ({product.reviews_count} reviews)
        </RText>
        </Wrap>
      </Row>

      <Row className="justify-start space-x-2">
        <h2 className="text-3xl font-semibold text-primary">
          {formatPrice(product.sale_price)}
        </h2>
        {product.sale_price !== product.price && (
        <RText className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</RText>
        )}
      </Row>

      <RText>{product.description}</RText>

      <Row className="justify-between"><RText>Danh mục</RText><RText className="text-right">{category.title}</RText></Row>

      
    </>
  );
}
