import { ProductImages } from "@/components/ProductPage/ProductImages";
import { Area, Card, Column, Container, Core, RText } from "@/lib/by/Div";
import { ProductInfo } from "@/components/ProductPage/ProductInfo";
import { ProductDetailsTabs } from "@/components/ProductPage/ProductDetails";
import ProductActions from "@/components/ProductPage/ProductActions";
import { ShopGuarantees } from "@/components/ShopGuarantees";
import ProductCard from "@/lib/pattern/share/ProductCard";
import { fetchProducts } from "../seg"; // Added fetchProduct import
import { fetchProductById } from "./seg";
import { mproduct } from "@/constants";

// Generate static parameters for static site generation
export async function generateStaticParams() {
  const products: PaginatedResponse<IProduct, 'products'> = await fetchProducts({});
  return products.products.map((p) => ({
    id: p.id,
  }));
}

// Define props interface for ProductPage
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Make ProductPage an async function component
export default async function ProductPage({ params }: ProductPageProps) {
  const {id} = await params
  const res = await fetchProductById(id); 
  const product:IProduct = res.product

  return (
    <Core className="min-h-screen bg-gray-100">
      <Container className="flex flex-col flex-1 py-4 px-6 gap-4 max-w-7xl mx-auto sm:px-6 lg:px-8 sm:py-8">
        <Area className="grid lg:grid-cols-2 gap-2 lg:gap-4">
          <Column className="flex flex-col">
            <ProductImages
              images={[product.image_url, ...(mproduct.image_url || [])]}
              discount={10}
              productName={product.title}
            />
          </Column>
          <Card className="flex flex-col gap-2 shadow-md bg-white rounded-lg p-4 space-y-2">
            <ProductInfo productData={product} />
            <ProductActions totalStock={product.total_stock} productId={product.id} />
            <ShopGuarantees />
          </Card>
        </Area>
        <Area className="flex flex-col lg:flex-row gap-2 lg:gap-4">
          <ProductDetailsTabs productData={product} />
          <Card className="flex flex-col gap-2 shadow-md bg-white rounded-lg lg:w-[25%] p-4">
            <RText className="font-bold text-xl text-pink-500">You might also like:</RText>
            <ProductCard product={product} />
          </Card>
        </Area>
      </Container>
    </Core>
  );
}