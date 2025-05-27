import { ProductImages } from "@/components/ProductPage/ProductImages";
import { Area, Card, Column, Container, Core } from "@/lib/by/Div";
import { product } from '../../../../constants/index';
import { ProductInfo } from "@/components/ProductPage/ProductInfo";
import { ProductDetailsTabs } from "@/components/ProductPage/ProductDetails";
import ProductActions from "@/components/ProductPage/ProductActions";
import { ShopGuarantees } from "@/components/ShopGuarantees";

const mockProduct = product.product;

const ProductPage = () => {

  return (
    <Core className="min-h-screen">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
       <Area className="grid lg:grid-cols-2 gap-4 lg:gap-6">
        <Column>
          <ProductImages images={mockProduct.image_url} discount={10} productName={mockProduct.title}/>
        </Column>
        <Card>
          <ProductInfo productData={product}/>
          <ProductActions totalStock={product.product.total_stock}/>
          <ShopGuarantees/>
        </Card>
        </Area> 
        <ProductDetailsTabs productData={product}/>
      </Container>
    </Core>
  );
};

export default ProductPage;