import { map } from "lodash";
import ProductCard from "@/lib/pattern/share/ProductCard";

export default function ListProductDisplay({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <>
      {map(products, (product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
