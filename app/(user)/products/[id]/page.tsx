import { ProductImages } from "@/components/ProductPage/ProductImages";
import { Container, Core } from "@/lib/by/Div";
import { product } from '../../../../constants/index';

const mockProduct = product.product;

const ProductPage = () => {
  return (
    <Core className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Container className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductImages images={mockProduct.image_url} discount={10} productName={mockProduct.title}/>
      </Container>
    </Core>
  );
};

export default ProductPage;