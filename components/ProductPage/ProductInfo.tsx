import { Star } from "lucide-react";
import { Row, RText, Wrap } from "@/lib/by/Div";
import { formatPrice } from '../../lib/share/formatPrice';

export function ProductInfo({ productData }: { productData: IProductPageData }) {
  const { product, category, brand } = productData;
  return (
    <>
      <RText className="text-pink-500 font-bold">{brand.title}</RText>
        <h1 className="text-3xl font-bold text-gray-900 leading-none">{product.title}</h1>

      <Row className="flex items-center justify-start gap-0">
        <Wrap className="flex-start flex">
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

      <Row className="justify-start space-x-2 flex items-center">
        <h2 className="text-3xl font-semibold text-primary">
          {formatPrice(product.sale_price)}
        </h2>
        {product.sale_price !== product.price && (
        <RText className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</RText>
        )}
      </Row>

      <RText>{product.description}</RText>

      <Row className="flex items-center"><RText className="text-right bg-pink-100 rounded-full px-2">{category.title}</RText></Row>

      
    </>
  );
}
