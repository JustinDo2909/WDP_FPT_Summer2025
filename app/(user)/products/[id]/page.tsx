import { ProductImages } from "@/components/ProductPage/ProductImages";
import { Area, Card, Column, Container, Core, RText } from "@/lib/by/Div";
import { product } from "../../../../constants/index";
import { ProductInfo } from "@/components/ProductPage/ProductInfo";
import { ProductDetailsTabs } from "@/components/ProductPage/ProductDetails";
import ProductActions from "@/components/ProductPage/ProductActions";
import { ShopGuarantees } from "@/components/ShopGuarantees";
import ProductCard from "@/lib/pattern/share/ProductCard";

const mockProduct = product.product;

const ProductPage = () => {
  return (
    <Core className="min-h-screen bg-gray-100">
      <Container className="flex flex-col flex-1 py-4 px-6 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Area className="grid lg:grid-cols-2 gap-2 lg:gap-4">
          <Column>
            <ProductImages
              images={mockProduct.image_url}
              discount={10}
              productName={mockProduct.title}
            />
          </Column>
          <Card className="p-4 space-y-2">
            <ProductInfo productData={product} />
            <ProductActions totalStock={product.product.total_stock} />
            <ShopGuarantees />
          </Card>
        </Area>
        <Area className="flex !flex-row gap-2 lg:gap-4">
          <ProductDetailsTabs productData={product} />
          <Card className="w-[25%] p-4">
            <RText className="font-bold text-xl text-pink-500 ">You might also like: </RText>
            <ProductCard product={product}/>
          </Card>
        </Area>
      </Container>
    </Core>
  );
};

export default ProductPage;
